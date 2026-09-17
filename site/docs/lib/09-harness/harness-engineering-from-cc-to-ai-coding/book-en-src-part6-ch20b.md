---
title: "Chapter 20b: Teams and Multi-Process Collaboration"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part6/ch20b.md"
sourceRel: "book-en/src/part6/ch20b.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part6/ch20b.md"
sourceSha256: "359383a7e80f5a7c43720bb943bf4f42bcfe6fa8f7aeb358b989686783030859"
pageSha256: "359383a7e80f5a7c43720bb943bf4f42bcfe6fa8f7aeb358b989686783030859"
contentMode: "local-full"
zh: ""
---

# Chapter 20b: Teams and Multi-Process Collaboration

> **Positioning**: This chapter analyzes Claude Code's Swarm team collaboration mechanism -- a flat-structured multi-Agent collaboration model. Prerequisites: Chapter 20. Target audience: readers who want a deep understanding of CC's Swarm team collaboration mechanism -- including TaskList scheduling, DAG dependencies, and Mailbox communication.

## Why Discuss Teams Separately

Chapter 20 introduced Claude Code's three Agent spawning modes -- Subagent, Fork, and Coordinator -- which share the common characteristic of a "parent spawns child" hierarchical relationship. Teams (the teammate system) is a different dimension: it creates a **flat-structured team** where Agents collaborate through message passing rather than hierarchical calls. This difference manifests not only in architecture but also in engineering implementations of communication protocols, permission synchronization, and lifecycle management.

---

## 20b.1 Teammate Agents (Agent Swarms)

The teammate system is another dimension of Agent orchestration. Unlike the "parent spawns child" model of subagents, the teammate system creates a **flat-structured team** where Agents collaborate through message passing.

### TeamCreateTool: Team Creation

`TeamCreateTool` (`tools/TeamCreateTool/TeamCreateTool.ts`) is used to create new teams:

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

Team information is persisted to a `TeamFile` containing the team name, member list, Leader info, etc. Team names must be unique -- conflicts trigger automatic generation of a word slug (lines 64-72).

### TeammateAgentContext: Teammate Context

Teammates use the `TeammateAgentContext` type (`agentContext.ts` lines 60-85), containing rich team coordination information:

```typescript
// utils/agentContext.ts:60-85
export type TeammateAgentContext = {
  agentId: string          // Full ID, e.g., "researcher@my-team"
  agentName: string        // Display name, e.g., "researcher"
  teamName: string         // Team membership
  agentColor?: string      // UI color
  planModeRequired: boolean // Whether plan approval is needed
  parentSessionId: string  // Leader's session ID
  isTeamLead: boolean      // Whether this is the Leader
  agentType: 'teammate'
}
```

Teammate IDs use the format `name@team-name`, making it easy to identify an Agent's identity and affiliation at a glance in logs and communications.

### Flat Structure Constraint

The teammate system has an important architectural constraint: **teammates cannot spawn other teammates** (lines 272-274):

```typescript
// tools/AgentTool/AgentTool.tsx:272-274
if (isTeammate() && teamName && name) {
  throw new Error('Teammates cannot spawn other teammates — the team roster is flat.');
}
```

This is a deliberate design -- the team roster is a flat array, and nested teammates would create entries in the roster without source information, confusing the Leader's coordination logic.

Similarly, in-process teammates cannot spawn background Agents (lines 278-280) because their lifecycle is bound to the Leader's process.

---

## 20b.2 Inter-Agent Communication

### SendMessageTool: Message Routing

`SendMessageTool` (`tools/SendMessageTool/SendMessageTool.ts`) is the core of inter-Agent communication. Its `to` field supports multiple addressing modes:

```typescript
// tools/SendMessageTool/SendMessageTool.ts:69-76
to: z.string().describe(
  feature('UDS_INBOX')
