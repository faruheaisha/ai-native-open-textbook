---
title: "第20章：Agent 派生与编排"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md"
zh: ""
---

# 第20章：Agent 派生与编排

> **定位**：本章分析 Claude Code 如何通过子 Agent、Fork 和协调者三种模式实现多 Agent 派生与编排。前置依赖：第3章、第4章。适用场景：想了解 CC 如何派生子 Agent（Subagent/Fork/Coordinator）的读者，或想构建多 Agent 系统的开发者。

## 为什么需要多 Agent

单个 Agent Loop 的上下文窗口是有限资源。当任务规模超过单次对话所能承载的信息量——例如"调查这个 bug 的根因、修复它、跑测试、写 PR"——单 Agent 要么被迫在上下文中塞满中间结果，要么不断做压缩丢失细节。更本质的问题是：**单 Agent 无法并行**，而软件工程任务天然适合分治。

Claude Code 提供了三种递进的多 Agent 模式，从轻量到重量分别是：**子 Agent（Subagent）**、**Fork 模式** 和 **协调者模式（Coordinator Mode）**。它们共享同一个入口——`AgentTool`，但在上下文继承、执行模型和生命周期管理上有根本差异。本章将逐层解剖这三种模式，以及围绕它们构建的验证 Agent 和工具池组装逻辑。

队友系统（Teams）详见第20b章，Ultraplan 远程规划详见第20c章。

---

> **交互式版本**：[点击查看 Agent 派生动画](https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book/src/part6/agent-spawn-viz.html) — 观看主 Agent 如何派生 3 个子 Agent 并行工作，上下文传递与隔离。

## 20.1 AgentTool：统一的 Agent 派生入口

所有 Agent 派生都通过同一个工具完成。`AgentTool` 在 `tools/AgentTool/AgentTool.tsx` 中定义，它的 `name` 是 `'Agent'`（第 226 行），别名为旧的 `'Task'`（第 228 行）。

### 输入 Schema 的动态组合

AgentTool 的输入 Schema 不是静态的——它根据 Feature Flag 和运行时条件动态组合：

```typescript
// tools/AgentTool/AgentTool.tsx:82-88
const baseInputSchema = lazySchema(() => z.object({
  description: z.string().describe('A short (3-5 word) description of the task'),
  prompt: z.string().describe('The task for the agent to perform'),
  subagent_type: z.string().optional(),
  model: z.enum(['sonnet', 'opus', 'haiku']).optional(),
  run_in_background: z.boolean().optional()
}));
```

基础 Schema 包含五个字段。当多 Agent 特性（Agent Swarms）启用时，还会合并 `name`、`team_name`、`mode` 字段（第 93-97 行）；`isolation` 字段支持 `'worktree'`（所有构建）或 `'remote'`（内部构建）；当后台任务被禁用或 Fork 模式启用时，`run_in_background` 字段会被 `.omit()` 移除（第 122-124 行）。

这种 Schema 动态组合有一个重要的设计意图：**模型看到的参数列表精确反映它当前可以使用的能力**。当 Fork 模式开启时，模型不会看到 `run_in_background`，因为 Fork 模式下所有 Agent 都自动后台化（第 557 行），模型无需也不应显式控制。

### AsyncLocalStorage 上下文隔离

当多个 Agent 在同一进程中并发运行时（例如用户按 Ctrl+B 将一个 Agent 放入后台后立即启动另一个），如何隔离它们的身份信息？答案是 `AsyncLocalStorage`。

```typescript
// utils/agentContext.ts:24
import { AsyncLocalStorage } from 'async_hooks'

// utils/agentContext.ts:93
const agentContextStorage = new AsyncLocalStorage<AgentContext>()

// utils/agentContext.ts:108-109
export function runWithAgentContext<T>(context: AgentContext, fn: () => T): T {
  return agentContextStorage.run(context, fn)
}
```

源码注释（`agentContext.ts` 第 17-21 行）直接解释了为什么不用 `AppState`：

> When agents are backgrounded (ctrl+b), multiple agents can run concurrently in the same process. AppState is a single shared state that would be overwritten, causing Agent A's events to incorrectly use Agent B's context. AsyncLocalStorage isolates each async execution chain, so concurrent agents don't interfere with each other.

`AgentContext` 是一个判别联合类型（discriminated union），通过 `agentType` 字段区分两种上下文：

| 上下文类型 | `agentType` 值 | 用途 | 关键字段 |
|:---:|:---:|:---|:---|
| `SubagentContext` | `'subagent'` | Agent 工具派生的子 Agent | `agentId`, `subagentName`, `isBuiltIn` |
| `TeammateAgentContext` | `'teammate'` | 队友 Agent（Swarm 成员） | `agentName`, `teamName`, `planModeRequired`, `isTeamLead` |

两种上下文都有 `invokingRequestId` 字段（第 43-49 行、第 77-83 行），用于追踪是谁派生了这个 Agent。`consumeInvokingRequestId()` 函数（第 163-178 行）实现了"稀疏边"语义：每次 spawn/resume 只在第一个 API 事件上发出一次 `invokingRequestId`，之后返回 `undefined`，避免重复标记。

---

## 20.2 三种 Agent 模式

### 模式一：标准子 Agent

这是最基本的模式。模型在调用 `Agent` 工具时指定 `subagent_type`，AgentTool 从已注册的 Agent 定义中查找匹配项，然后启动一个**全新的**对话。

路由逻辑在 `AgentTool.tsx` 第 322-356 行：

```typescript
// tools/AgentTool/AgentTool.tsx:322-323
const effectiveType = subagent_type
  ?? (isForkSubagentEnabled() ? undefined : GENERAL_PURPOSE_AGENT.agentType);
```

当 `subagent_type` 未指定且 Fork 模式关闭时，默认使用 `general-purpose` 类型。

内置 Agent 定义在 `builtInAgents.ts` 中注册（第 45-72 行），包括：

| Agent 类型 | 用途 | 工具限制 | 模型 |
|:---:|:---|:---|:---:|
| `general-purpose` | 通用任务：搜索、分析、多步骤操作 | 所有工具 | 默认 |
| `verification` | 验证实现正确性 | 禁止编辑工具 | 继承 |
| `Explore` | 代码探索 | - | - |
| `Plan` | 规划任务 | - | - |
| `claude-code-guide` | 使用指南 | - | - |

子 Agent 的关键特征是**上下文隔离**：它从零开始，只看到父 Agent 传入的 `prompt`。系统提示词也是独立生成的（第 518-534 行）。这意味着子 Agent 不知道父 Agent 的对话历史——它就像"一个刚走进房间的聪明同事"。

### 模式二：Fork 模式

Fork 模式是一个实验性特性，通过 `feature('FORK_SUBAGENT')` 构建时门控和运行时条件共同控制：

```typescript
// tools/AgentTool/forkSubagent.ts:32-39
export function isForkSubagentEnabled(): boolean {
  if (feature('FORK_SUBAGENT')) {
    if (isCoordinatorMode()) return false
    if (getIsNonInteractiveSession()) return false
    return true
  }
  return false
}
```

Fork 模式与标准子 Agent 的根本区别在于**上下文继承**。Fork 子进程继承父 Agent 的完整对话上下文和系统提示词：

```typescript
// tools/AgentTool/forkSubagent.ts:60-71
export const FORK_AGENT = {
  agentType: FORK_SUBAGENT_TYPE,
  tools: ['*'],
  maxTurns: 200,
  model: 'inherit',
  permissionMode: 'bubble',
  source: 'built-in',
  baseDir: 'built-in',
  getSystemPrompt: () => '',  // 未使用——继承父级的系统提示词
} satisfies BuiltInAgentDefinition
```

注意 `model: 'inherit'` 和 `getSystemPrompt: () => ''`——Fork 子进程使用父 Agent 的模型（保持上下文长度一致）和父 Agent 已渲染的系统提示词（保持字节完全一致以最大化提示词缓存命中）。

#### 提示词缓存共享

Fork 模式的核心价值在于**提示词缓存共享**。`buildForkedMessages()` 函数（`forkSubagent.ts` 第 107-164 行）构造的消息结构确保所有 Fork 子进程产生字节相同的 API 请求前缀：

1. 保留父 Agent 完整的 assistant 消息（所有 `tool_use` 块、thinking、text）
2. 为每个 `tool_use` 块构造相同的占位 `tool_result`（第 142-150 行，使用固定文本 `'Fork started — processing in background'`）
3. 只在最后追加一个 per-child 的指令文本块

```
[...历史消息, assistant(所有 tool_use 块), user(占位 tool_result..., 指令)]
```

只有最后一个文本块因 child 不同而不同，最大化缓存命中率。

#### 递归 Fork 防护

Fork 子进程的工具池中保留了 `Agent` 工具（为了缓存一致性），但在调用时会被拦截（第 332-334 行）：

```typescript
// tools/AgentTool/AgentTool.tsx:332-334
if (toolUseContext.options.querySource === `agent:builtin:${FORK_AGENT.agentType}`
    || isInForkChild(toolUseContext.messages)) {
  throw new Error('Fork is not available inside a forked worker.');
}
```
