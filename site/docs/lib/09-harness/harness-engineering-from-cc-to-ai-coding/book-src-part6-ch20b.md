---
title: "第20b章：Teams 与多进程协作"
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

# 第20b章：Teams 与多进程协作

> **定位**：本章分析 Claude Code 的 Swarm 团队协作机制——平面结构的多 Agent 协作模型。前置依赖：第20章。适用场景：想深入了解 CC 的 Swarm 团队协作机制——包括 TaskList 调度、DAG 依赖、Mailbox 通信的读者。

## 为什么单独讨论 Teams

第20章介绍了 Claude Code 的三种 Agent 派生模式——子 Agent、Fork 和协调者——它们的共同点是"父派生子"的层级关系。Teams（队友系统）是一个不同的维度：它创建一个**平面结构的团队**，团队中的 Agent 通过消息传递协作，而非层级调用。这种差异不仅体现在架构上，更体现在通信协议、权限同步和生命周期管理等工程实现中。

---

## 20b.1 队友 Agent（Agent Swarms）

队友系统是 Agent 编排的另一个维度。与子 Agent 的"父派生子"模型不同，队友系统创建一个**平面结构的团队**，团队中的 Agent 通过消息传递协作。

### TeamCreateTool：团队创建

`TeamCreateTool`（`tools/TeamCreateTool/TeamCreateTool.ts`）用于创建新团队：

```typescript
// tools/TeamCreateTool/TeamCreateTool.ts:37-49
const inputSchema = lazySchema(() =>
  z.strictObject({
    team_name: z.string().describe('Name for the new team to create.'),
    description: z.string().optional(),
    agent_type: z.string().optional()
      .describe('Type/role of the team lead'),
  }),
)
```

团队信息持久化到 `TeamFile` 中，包含团队名称、成员列表、Leader 信息等。团队名称需要唯一——如果冲突则自动生成一个 word slug（第 64-72 行）。

### TeammateAgentContext：队友上下文

队友使用 `TeammateAgentContext` 类型（`agentContext.ts` 第 60-85 行），包含丰富的团队协调信息：

```typescript
// utils/agentContext.ts:60-85
export type TeammateAgentContext = {
  agentId: string          // 完整 ID，如 "researcher@my-team"
  agentName: string        // 显示名称，如 "researcher"
  teamName: string         // 所属团队
  agentColor?: string      // UI 颜色
  planModeRequired: boolean // 是否需要计划审批
  parentSessionId: string  // Leader 的会话 ID
  isTeamLead: boolean      // 是否是 Leader
  agentType: 'teammate'
}
```

队友的 ID 格式是 `name@team-name`，这种格式使得在日志和通信中可以一眼看出 Agent 的身份和归属。

### 平面结构约束

队友系统有一个重要的架构约束：**队友不能派生其他队友**（第 272-274 行）：

```typescript
// tools/AgentTool/AgentTool.tsx:272-274
if (isTeammate() && teamName && name) {
  throw new Error('Teammates cannot spawn other teammates — the team roster is flat.');
}
```

这是刻意的设计——团队名册是一个扁平数组，嵌套的队友会导致名册中出现没有来源信息的条目，混淆 Leader 的协调逻辑。

同样，进程内队友（in-process teammate）不能派生后台 Agent（第 278-280 行），因为它们的生命周期绑定在 Leader 的进程上。

---

## 20b.2 Agent 间通信

### SendMessageTool：消息路由

`SendMessageTool`（`tools/SendMessageTool/SendMessageTool.ts`）是 Agent 间通信的核心。它的 `to` 字段支持多种寻址方式：

```typescript
// tools/SendMessageTool/SendMessageTool.ts:69-76
to: z.string().describe(
  feature('UDS_INBOX')
