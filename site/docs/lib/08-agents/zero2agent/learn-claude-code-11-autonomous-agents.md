---
title: "Autonomous Agents：自组织团队"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-claude-code/11-autonomous-agents/index.md"
sourceRel: "learn-claude-code/11-autonomous-agents/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-claude-code/11-autonomous-agents/index.md"
sourceSha256: "562b6043f6b1d19f8929467aa49900a3ea63612eda4f6a01253870c30890370a"
pageSha256: "562b6043f6b1d19f8929467aa49900a3ea63612eda4f6a01253870c30890370a"
contentMode: "local-full"
zh: ""
---

# Autonomous Agents：自组织团队

s09-s10 的团队需要 Leader 手动分配任务。这一节移除这个限制：**让 Agent 自己扫描任务、自己认领工作、自己记忆经验**。

Claude Code 在这个方向上已经走得很远：Coordinator Mode 让主 Agent 自动调度 Worker；Dream Task 在后台整理记忆；Memory Extraction 在每轮对话后自动提取经验。

本文分两条线：

- **源码实证** --- 直接读 Claude Code 源码，看真实架构怎么做
- **从零实现** --- 用 Python 从头搭建一个自治 Agent 系统

---

## 一、Coordinator Mode 源码实证

> 源文件：`src/coordinator/coordinatorMode.ts`

### 1.1 Feature Flag 双重门控

Coordinator Mode 不是默认开启的。它需要两道门：

```typescript
// coordinatorMode.ts
export function isCoordinatorMode(): boolean {
  if (feature('COORDINATOR_MODE')) {
    return isEnvTruthy(process.env.CLAUDE_CODE_COORDINATOR_MODE)
  }
  return false
}
```

第一道：编译时 feature flag `COORDINATOR_MODE`（Bun bundle 阶段决定）。第二道：运行时环境变量 `CLAUDE_CODE_COORDINATOR_MODE`。两道都通过才开启。

这种 **编译时 + 运行时** 双重门控在大型 Agent 系统中很常见 --- 编译时决定代码是否打包进产物，运行时决定是否激活。

### 1.2 Session Mode 恢复

恢复一个旧 session 时，当前环境变量可能和 session 创建时不同：

```typescript
export function matchSessionMode(
  sessionMode: 'coordinator' | 'normal' | undefined,
): string | undefined {
  const currentIsCoordinator = isCoordinatorMode()
  const sessionIsCoordinator = sessionMode === 'coordinator'

  if (currentIsCoordinator === sessionIsCoordinator) {
    return undefined
  }

  // 翻转环境变量，让 isCoordinatorMode() 实时匹配
  if (sessionIsCoordinator) {
    process.env.CLAUDE_CODE_COORDINATOR_MODE = '1'
  } else {
    delete process.env.CLAUDE_CODE_COORDINATOR_MODE
  }
  // ...
}
```

关键设计：**session 的模式优先于当前环境变量**。恢复 session 时直接改 `process.env`，因为 `isCoordinatorMode()` 是实时读取的，没有缓存。

### 1.3 Coordinator 的 System Prompt

`getCoordinatorSystemPrompt()` 返回一个完整的系统提示词，定义了 Coordinator 的行为规范：

**角色定义**：

> You are a **coordinator**. Your job is to help the user achieve their goal, direct workers to research/implement/verify code changes, synthesize results and communicate with the user.

**核心工具**：

| 工具 | 用途 |
|------|------|
| `Agent` | 创建新 Worker |
| `SendMessage` | 给已有 Worker 发后续指令 |
| `TaskStop` | 终止一个 Worker |

**Worker 结果如何回来**：
