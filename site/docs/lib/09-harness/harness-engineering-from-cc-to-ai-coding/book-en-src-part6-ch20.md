---
title: "Chapter 20: Agent Spawning and Orchestration"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part6/ch20.md"
sourceRel: "book-en/src/part6/ch20.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part6/ch20.md"
sourceSha256: "83aa8039814b923a9a324d8fe4016487e3737d01208f1ee685a9c8784e32a799"
pageSha256: "83aa8039814b923a9a324d8fe4016487e3737d01208f1ee685a9c8784e32a799"
contentMode: "local-full"
zh: ""
---

# Chapter 20: Agent Spawning and Orchestration

> **Positioning**: This chapter analyzes how Claude Code implements multi-Agent spawning and orchestration through three modes: Subagent, Fork, and Coordinator. Prerequisites: Chapters 3 and 4. Target audience: readers who want to understand how CC spawns sub-Agents (Subagent/Fork/Coordinator), or developers building multi-Agent systems.

## Why Multiple Agents Are Needed

A single Agent Loop's context window is a finite resource. When task scale exceeds what a single conversation can hold -- for example, "investigate the root cause of this bug, fix it, run tests, write a PR" -- a single Agent must either cram intermediate results into the context or repeatedly compress and lose details. The more fundamental issue is: **a single Agent cannot parallelize**, yet software engineering tasks are naturally suited to divide-and-conquer.

Claude Code provides three progressively heavier multi-Agent patterns: **Subagent**, **Fork Mode**, and **Coordinator Mode**. They share a single entry point -- `AgentTool` -- but have fundamental differences in context inheritance, execution model, and lifecycle management. This chapter will dissect these three modes layer by layer, along with the verification Agent and tool pool assembly logic built around them.

The Teams system is covered in Chapter 20b, and Ultraplan remote planning in Chapter 20c.

---

> **Interactive version**: [Click to view the Agent spawning animation](https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part6/agent-spawn-viz.html) -- Watch as the main Agent spawns 3 subagents to work in parallel, with context passing and isolation.

## 20.1 AgentTool: The Unified Agent Spawning Entry Point

All Agent spawning goes through a single tool. `AgentTool` is defined in `tools/AgentTool/AgentTool.tsx`, with `name` set to `'Agent'` (line 226) and an alias for the legacy `'Task'` (line 228).

### Dynamic Schema Composition

AgentTool's input Schema is not static -- it is dynamically composed based on Feature Flags and runtime conditions:

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

The base Schema contains five fields. When multi-Agent features (Agent Swarms) are enabled, `name`, `team_name`, and `mode` fields are also merged (lines 93-97); the `isolation` field supports `'worktree'` (all builds) or `'remote'` (internal builds); when background tasks are disabled or Fork mode is enabled, the `run_in_background` field is `.omit()`-removed (lines 122-124).

This dynamic Schema composition has an important design intent: **the parameter list the model sees precisely reflects the capabilities it can currently use**. When Fork mode is enabled, the model doesn't see `run_in_background` because in Fork mode all Agents are automatically backgrounded (line 557) -- the model doesn't need to and shouldn't explicitly control this.

### AsyncLocalStorage Context Isolation

When multiple Agents run concurrently in the same process (e.g., the user presses Ctrl+B to background one Agent and immediately starts another), how do you isolate their identity information? The answer is `AsyncLocalStorage`.

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

The source code comment (`agentContext.ts` lines 17-21) directly explains why `AppState` isn't used:

> When agents are backgrounded (ctrl+b), multiple agents can run concurrently in the same process. AppState is a single shared state that would be overwritten, causing Agent A's events to incorrectly use Agent B's context. AsyncLocalStorage isolates each async execution chain, so concurrent agents don't interfere with each other.

`AgentContext` is a discriminated union type, distinguished by the `agentType` field:

| Context Type | `agentType` Value | Purpose | Key Fields |
|:---:|:---:|:---|:---|
| `SubagentContext` | `'subagent'` | Subagent spawned by the Agent tool | `agentId`, `subagentName`, `isBuiltIn` |
| `TeammateAgentContext` | `'teammate'` | Teammate Agent (Swarm member) | `agentName`, `teamName`, `planModeRequired`, `isTeamLead` |

Both context types have an `invokingRequestId` field (lines 43-49, lines 77-83), used to track who spawned this Agent. The `consumeInvokingRequestId()` function (lines 163-178) implements "sparse edge" semantics: each spawn/resume emits `invokingRequestId` only on the first API event, then returns `undefined` afterward, avoiding duplicate marking.

---

## 20.2 Three Agent Modes

### Mode One: Standard Subagent

This is the most basic mode. The model specifies `subagent_type` when calling the `Agent` tool, AgentTool looks up a matching definition from registered Agent definitions, then starts a **brand new** conversation.

The routing logic is at `AgentTool.tsx` lines 322-356:

```typescript
// tools/AgentTool/AgentTool.tsx:322-323
const effectiveType = subagent_type
  ?? (isForkSubagentEnabled() ? undefined : GENERAL_PURPOSE_AGENT.agentType);
```

When `subagent_type` is not specified and Fork mode is off, the default `general-purpose` type is used.

Built-in Agent definitions are registered in `builtInAgents.ts` (lines 45-72), including:

| Agent Type | Purpose | Tool Restrictions | Model |
|:---:|:---|:---|:---:|
| `general-purpose` | General tasks: search, analysis, multi-step operations | All tools | Default |
| `verification` | Verify implementation correctness | Edit tools prohibited | Inherited |
| `Explore` | Code exploration | - | - |
| `Plan` | Task planning | - | - |
| `claude-code-guide` | Usage guide | - | - |

The key characteristic of subagents is **context isolation**: they start from scratch and only see the `prompt` passed by the parent Agent. System prompts are also independently generated (lines 518-534). This means the subagent doesn't know the parent Agent's conversation history -- it's like "a smart colleague who just walked into the room."

### Mode Two: Fork Mode

Fork mode is an experimental feature, jointly controlled by build-time gating via `feature('FORK_SUBAGENT')` and runtime conditions:

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

The fundamental difference between Fork mode and standard subagents is **context inheritance**. Fork child processes inherit the parent Agent's complete conversation context and system prompt:

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
  getSystemPrompt: () => '',  // Not used -- inherits parent's system prompt
} satisfies BuiltInAgentDefinition
```

Note `model: 'inherit'` and `getSystemPrompt: () => ''` -- Fork child processes use the parent Agent's model (maintaining consistent context length) and the parent Agent's already-rendered system prompt (maintaining byte-identical content to maximize prompt cache hits).

#### Prompt Cache Sharing

The core value of Fork mode lies in **prompt cache sharing**. The `buildForkedMessages()` function (`forkSubagent.ts` lines 107-164) constructs a message structure that ensures all Fork child processes produce byte-identical API request prefixes:

1. Preserve the parent Agent's complete assistant messages (all `tool_use` blocks, thinking, text)
2. Construct identical placeholder `tool_result` for each `tool_use` block (lines 142-150, using fixed text `'Fork started — processing in background'`)
3. Only append a per-child instruction text block at the end

```
[...history messages, assistant(all tool_use blocks), user(placeholder tool_results..., instruction)]
```

Only the last text block differs per child, maximizing cache hit rate.

#### Recursive Fork Protection

Fork child processes retain the `Agent` tool in their tool pool (for cache consistency), but calls are intercepted at invocation time (lines 332-334):

```typescript
// tools/AgentTool/AgentTool.tsx:332-334
if (toolUseContext.options.querySource === `agent:builtin:${FORK_AGENT.agentType}`
    || isInForkChild(toolUseContext.messages)) {
  throw new Error('Fork is not available inside a forked worker.');
}
```
