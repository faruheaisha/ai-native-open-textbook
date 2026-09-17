---
title: "11. Multi-Agent Architecture"
sourceId: "09-harness/claude-code-from-scratch"
sourceTitle: "Claude Code From Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch"
entryUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch/blob/0b452360866433fde0dc77cd37ada9d303546592/en/docs/11-multi-agent.md"
sourceRel: "en/docs/11-multi-agent.md"
rawUrl: "/raw/09-harness/claude-code-from-scratch/en/docs/11-multi-agent.md"
sourceSha256: "b73737f15130d237960bcdb5ad27e4e5abc1321fd1ab20c69df14e27e079d42b"
pageSha256: "b73737f15130d237960bcdb5ad27e4e5abc1321fd1ab20c69df14e27e079d42b"
contentMode: "local-full"
zh: ""
---

# 11. Multi-Agent Architecture

## Chapter Goals

Plan Mode makes the agent plan before acting, but no amount of planning gets around one thing: cram a big task into one agent and the context fills up fast. This chapter builds sub-agents so the main agent can farm work out.

The main agent spawns an independent sub-agent to chew on a sub-task — exploring code, planning, or general work. The sub-agent has its own clean context and brings back only the result, instead of pouring all the intermediate steps back into the main conversation. That's divide and conquer, and it's the way out when the main agent's context runs short.

```mermaid
graph TB
    User[User request] --> Main[Main Agent]
    Main -->|agent tool_use| Dispatch{type?}
    Dispatch -->|explore| Explore[Explore Sub-Agent<br/>Read-only · Fast search]
    Dispatch -->|plan| Plan[Plan Sub-Agent<br/>Read-only · Structured planning]
    Dispatch -->|general| General[General Sub-Agent<br/>Full tool set]

    Explore --> Result[Return text result]
    Plan --> Result
    General --> Result
    Result --> Main

    subgraph Sub-Agent Sandbox
        Explore
        Plan
        General
    end

    style Main fill:#7c5cfc,color:#fff
    style Dispatch fill:#e8e0ff
    style Result fill:#e8e0ff
```

> ▶ **Run this chapter**: `node steps/run.mjs 11` (no API key) — watch the main agent send a sub-agent to check a file. Add `--diff` to see what it added over the previous chapter. To run your own prompt against a real model, add `--live` (it reads the key from `.env`; `--py` runs the Python version).

## Our Implementation

Cram a big task into one agent and the context fills up fast. This chapter builds sub-agents: the main agent, through an `agent` tool, forks an independent sub-agent to chew on a sub-task — the sub-agent has its own clean context, runs a small read-only loop in-process (recursion), and brings back only the result. Relative to last chapter, it adds a `subagent.ts`, and the agent loop intercepts the `agent` tool:

A sub-agent is just a read-only mini-loop — give it only the read tools, and report back the final text when it is done:

Run it: the main agent sends a sub-agent to read `greeting.txt`, the sub-agent reports back, and the main agent answers:

```
$ node steps/run.mjs 11
▶ step 11 demo (no API key — local mock model)   sandbox: <sandbox>
  you: Use a sub-agent to find out what greeting.txt says.

  → agent({"task":"Read greeting.txt and report its contents."})
The sub-agent reports greeting.txt says: hello from the subagent demo.
```

> That is the whole runnable step for this chapter — everything `node steps/run.mjs` actually executes here is above. Below is how the repo's production mini-claude does the same thing in full: more edge cases and engineering detail. Read it as an **optional deep-dive**; it is not the code the runnable step runs.

With **~199 lines** in `subagent.ts` plus minor changes to the Agent class, we implement the core of the Sub-Agent pattern.

| Claude Code | Our Implementation | Simplification Reason |
|-------------|-------------------|----------------------|
| 5-stage execution pipeline | Direct new Agent + runOnce | No need for fork processes, cache sharing |
| 4-layer tool filter pipeline | 1 Set + filter | Only 3 fixed types |
| Haiku model for Explore | Unified main model | Reduces configuration complexity |
| deny-by-default context isolation | Natural isolation (independent Agent instances) | new Agent comes with independent message history |

## Key Code

### 1. Agent Type Configuration -- `subagent.ts`

Why no shell at all? Explore only does code exploration, and `read_file`, `list_files`, and `grep_search` are enough — so we simply don't include `run_shell`, cutting off any chance of a destructive command at the tool layer, which is safer than a prompt reminding it to "only run read-only commands." The system prompt restates the read-only contract too:

The Plan Agent is also read-only, but its prompt guides it to produce structured plans:

The General Agent gets all tools except `agent`:

### 2. Agent Tool Definition -- `tools.ts`

`agent` is registered as a regular tool. `type` is not required -- when the LLM is unsure, it can omit it and fall back to `general`:

### 3. Agent Class Modifications -- `agent.ts`

Only 4 changes are needed to make the same Agent class serve both the main Agent and sub-agents.

#### 3a. Constructor: Accept Custom Configuration

When `customTools` is `None`, it falls back to the full tool list, with zero impact on the main Agent.

#### 3b. Output Capture: emitText + outputBuffer

Sub-agent text output can't be printed directly; it needs to be collected and returned to the main Agent:

`outputBuffer` has three states: `null` = main Agent mode (print directly), `[]` = sub-agent mode (start collecting), `[...]` = accumulating. The streaming callback only needs to call `emitText`, completely unaware of which mode it's running in.

#### 3c. runOnce: One-Shot Execution Entry Point

Tokens are calculated incrementally (post-run minus pre-run) because the Agent instance's counters are cumulative. `chat()` is fully reused -- it doesn't care whether it's running in the main Agent or a sub-agent, since the tool set and output destination were already configured in the constructor.

#### 3d. executeAgentTool: Execute Sub-Agent

When a sub-agent errors, it returns an error string rather than crashing the parent Agent -- the parent Agent's LLM sees the error message and can decide on its own whether to retry or try a different strategy.

Permission inheritance: Sub-agents default to `bypassPermissions` (the main Agent has already been authorized, so sub-agents don't need to ask the user again), but Plan Mode must be inherited -- otherwise sub-agents could bypass the read-only restriction, which would be a security hole.

The `agent` tool requires special dispatch because it needs access to the current Agent instance's state (model, permissionMode, token counters) and can't go through the stateless generic dispatch function:

### 4. The isSubAgent Flag

Sub-agents skip three operations that are only meaningful for the main Agent:

- Dividers: Sub-agent output is captured by the buffer and won't appear in the terminal
- Session saving: Sub-agents are one-time tasks; saving their session is pointless and could overwrite the main Agent's file
- Cost printing: Tokens are already aggregated to the parent Agent; sub-agents printing their own cost would create a false impression of double billing

### 5. Terminal UI -- `ui.ts`

### 6. Custom Agent Types: `.claude/agents/*.md`

An extension mechanism identical to Claude Code's `.claude/agents/`:

```markdown

---
name: reviewer
description: Reviews code for bugs and style issues
allowed-tools: read_file, list_files, grep_search, run_shell
---
You are a code reviewer. Analyze the code thoroughly and report:
1. Bugs and potential issues
2. Style inconsistencies
3. Performance concerns
```

Discovery mechanism: Project-level (`.claude/agents/`) has higher priority than user-level (`~/.claude/agents/`), with same-name override. Frontmatter reuses `parseFrontmatter()`, sharing the same parser with Memory and Skills.

## What the Real Claude Code Does Beyond This

Our sub-agents have just one mode: fork-return — send one out, get a result back. Claude Code's multi-agent system also has coordinator and swarm modes, where agents communicate peer-to-peer and explore in parallel.

Claude Code's multi-agent system is implemented in `src/tools/AgentTool/`, supporting three collaboration modes:

| Mode | Characteristics |
|------|----------------|
| **Sub-Agent** (fork-return) | Forks to execute independently, returns result on completion |
| **Coordinator** | A coordinator assigns tasks to multiple Workers |
| **Swarm Team** | Multiple Agents collaborate as peers, communicating via mailboxes |

We implement the Sub-Agent mode, which is also the most commonly used.

### Built-in Agent Types

- **Explore**: Uses Haiku model (cheaper), read-only tool set, specialized for code search
- **Plan**: Read-only + structured output, designs implementation plans
- **General**: Full tool set (except it cannot recursively create sub-agents)
- **Custom**: Defined via `.claude/agents/*.md` files

### Key Design of Coordinator Mode

Coordinator turns the main Agent into a **pure orchestrator** -- its tool set is hard-limited to only `Agent` (spawn Workers) and `SendMessage` (continue a Worker), with absolutely no ability to perform file operations. This hard constraint prevents the coordinator from "being too lazy to delegate and doing it itself," which would cause it to degrade into a regular single Agent.

The standard workflow has four phases: **Research (parallel, read-only) -> Synthesize (coordinator, serial comprehension) -> Implement (serial, by file set) -> Verify**.

The synthesis phase has a counter-intuitive constraint: the prompt explicitly forbids writing "based on your findings." This forces the coordinator to genuinely understand and make research results concrete (including file paths, line numbers), rather than passing the comprehension work to the next Worker.

Each Worker is an independent Agent starting from scratch that cannot see the coordinator's conversation with the user, so the prompt the coordinator writes for Workers must be self-contained -- this is the biggest pitfall in Coordinator mode.

### Tool Filtering: 4-Layer Pipeline

Sub-agent tool access goes through a 4-layer filter, implementing defense in depth:

1. Remove meta-tools (`TaskOutput`, `EnterPlanMode`, `AskUserQuestion`, etc.) -- sub-agents should not control Agent execution flow
2. Additional restrictions for custom Agents -- user-defined types don't get the same trust level as built-in types
3. Async Agents use a whitelist mode -- background execution can't display interactive UI, requiring strict limits
4. Agent-type-level `disallowedTools` -- e.g., Explore explicitly excludes write tools

The first three layers are global policies; the fourth is type-level policy. Even if a custom Agent sets `disallowedTools: []`, the first three layers still apply.

### Context Isolation

Sub-agents use deny-by-default: message history is completely independent, `abortController` propagates one-way (parent abort -> child abort, but not the reverse), and sub-agent state changes don't propagate to the parent UI by default. There's only one exception: background processes started by Bash must be registered in the root store, or they become zombie processes.

### Worktree Isolation

When multiple Agents write files in parallel, Claude Code assigns each writing Agent an independent Git Worktree -- sharing the `.git` directory but with independent working directories, completely conflict-free, with much less overhead than `git clone`.

## Key Design Decisions

### Why Is Fork-Return a Better Starting Point Than Coordinator?

Fork-return's advantages are simple: no shared state (impossible to pollute the main Agent's context), deterministic control flow (send request, wait for result), and simple fault tolerance (sub-agent errors, main Agent keeps working). Coordinator is stronger at task parallelization but requires handling information sharing between Workers, conflict resolution -- an order of magnitude more complex.

### Why Can't Sub-Agents Create Sub-Agents?

The General Agent's tool list filters out `agent`. Without this restriction, recursive nesting of A creating B, B creating C would consume tokens exponentially -- each level has its own system prompt and message history. Claude Code has the same restriction; in practice, 1 level covers the vast majority of scenarios.

### Why Do Explore/Plan Get Only Three Read-Only Tools, No Shell?

`read_file`, `list_files`, and `grep_search` already cover the vast majority of code exploration. We simply leave out `run_shell`, cutting off any chance of a destructive command at the tool layer — the teaching version takes the safer path. The real Claude Code's Explore Agent does allow read-only shell (`git log`, `find`, `wc` are genuinely useful for exploration), constrained by system prompt to read-only commands; the two approaches trade off differently.

### Why Use a Buffer to Collect Output Instead of Callbacks?

A callback approach would require passing `onText` into the constructor and adding checks throughout the agent loop. The buffer approach only modifies `emitText` in one place: `runOnce` opens it, `chat` writes to it, `runOnce` collects and closes it. The lifecycle boundaries are clear, with zero impact on existing code.

---

The core insight of the entire implementation: **a sub-agent is essentially just an Agent instance with different configuration**. By adding a few optional parameters to the Agent class (`customTools`, `customSystemPrompt`, `isSubAgent`), the same agent loop serves both the main Agent and sub-agents, avoiding code duplication.

> **Next chapter**: Connecting the Agent to external tool servers -- MCP integration.
