---
title: "Quick Reference"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/reference.md"
sourceRel: "en/docs/reference.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/reference.md"
sourceSha256: "e556b7003e011b6fce1d01e4f095a1afd5800e8ed4b540bb7a6457f4876bd6a1"
pageSha256: "e556b7003e011b6fce1d01e4f095a1afd5800e8ed4b540bb7a6457f4876bd6a1"
contentMode: "local-full"
zh: ""
---

# Quick Reference

> All in one page: core concepts, common tools, key source code entry points.

## Core Concepts Quick Reference

| Concept | One-Sentence Explanation | Details |
|---------|--------------------------|---------|
| **Agent Loop** | A cycle of user input → model decision → tool execution → result injection, until the model returns plain text | [Chapter 2](/lib/09-harness/how-claude-code-works/en-docs-02-agent-loop) |
| **query()** | The async generator implementation of the core loop, containing 7 continue sites handling different resume strategies | [Section 2.4](/lib/09-harness/how-claude-code-works/en-docs-02-agent-loop#_24-query核心循环的实现) |
| **QueryEngine** | A session-level manager that drives query() and handles budgets, permissions, and structured output | [Section 2.3](/lib/09-harness/how-claude-code-works/en-docs-02-agent-loop#_23-queryengine会话生命周期管理) |
| **Autocompact** | An automatic compaction mechanism triggered when token usage approaches the context window (~93% of the effective window, ~83% of the raw window) | [Section 3.6](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/index#_36-autocompact-自动全量压缩) |
| **Context Collapse** | A projection-based read-only context folding mechanism that doesn't modify original messages and can safely roll back | [Section 3.7](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/index#_37-context-collapse-上下文折叠) |
| **CLAUDE.md** | A project-level instruction file, discovered by traversing the directory tree upward from CWD, supporting multiple levels | [Section 3.2](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/index#_32-系统提示词的构建) |
| **buildTool()** | A tool factory function that merges TOOL_DEFAULTS (fail-closed defaults) with tool definitions | [Section 4.1](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/index#_41-tool-接口定义) |
| **MCP** | Model Context Protocol, an external tool extension protocol supporting 6 transport mechanisms (8 server config types) | [Section 4.9](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/index#_49-mcp-工具集成) |
| **ToolSearch** | A lazy-loading mechanism that loads only needed tools on demand from 50+, reducing prompt size per API call | [Section 4.10](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/index#_410-工具搜索与延迟加载) |
| **search-and-replace** | The editing strategy of FileEditTool, requiring old_string to match uniquely within the file | [Chapter 10](/lib/09-harness/how-claude-code-works/en-docs-05-code-editing-strategy) |
| **Defense in Depth** | 7 independent security check layers, where bypassing any single layer is not fatal | [Chapter 12](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/index) |
| **Plan Mode** | Two-phase execution: read-only exploration → user approval → writable implementation | [Section 8.6](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/index#_86-plan-mode-two-phase-execution) |
| **Coordinator Mode** | The main Agent only orchestrates without executing, completing actual tasks through Workers | [Section 8.3](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/index#_83-coordinator-mode) |
| **Hooks** | An event-driven extension mechanism that injects custom logic at key points in the tool execution lifecycle | [Chapter 7](/lib/09-harness/how-claude-code-works/en-docs-06-hooks-extensibility) |

## Common Tools List

### File Operations

| Tool | Read-Only | Concurrency-Safe | Description |
|------|:---------:|:----------------:|-------------|
| **Read** (FileReadTool) | ✅ | ✅ | Read files, supports line ranges, PDF, images |
| **Write** (FileWriteTool) | ❌ | ❌ | Write/create files |
| **Edit** (FileEditTool) | ❌ | ❌ | search-and-replace editing, requires unique match |
| **NotebookEdit** | ❌ | ❌ | Jupyter Notebook editing |

### Search and Navigation

| Tool | Read-Only | Concurrency-Safe | Description |
|------|:---------:|:----------------:|-------------|
| **Glob** (GlobTool) | ✅ | ✅ | Filename pattern matching search |
| **Grep** (GrepTool) | ✅ | ✅ | File content regex search (based on ripgrep) |
| **ToolSearch** (ToolSearchTool) | ✅ | ✅ | Dynamically discover lazily-loaded tools |

### Execution and System

| Tool | Read-Only | Concurrency-Safe | Description |
|------|:---------:|:----------------:|-------------|
| **Bash** (BashTool) | ❌ | ❌ | Execute shell commands, tree-sitter AST + 23 static security checks |
| **Agent** (AgentTool) | ❌ | ❌ | Spawn sub-Agents to execute independent tasks |
| **SendMessage** | ❌ | ❌ | Send messages to existing Agents or teammates |
| **TaskStop** | ❌ | ❌ | Terminate a sub-Agent |

### Mode Control

| Tool | Description |
|------|-------------|
| **EnterPlanMode** | Enter Plan mode (read-only exploration phase) |
| **ExitPlanMode** | Exit Plan mode and submit the plan for approval |

## Key Source Code Entry Points

| Module | Entry File | Lines | Responsibility |
|--------|-----------|-------|----------------|
| **CLI Entry** | `src/main.tsx` | ~4,700 | Commander.js argument parsing, run mode dispatching |
| **Agent Loop** | `src/query.ts` | ~1,730 | Async generator implementation of the core loop |
| **Session Management** | `src/QueryEngine.ts` | ~1,300 | Conversation lifecycle management |
| **Tool Interface** | `src/Tool.ts` | ~790 | Tool type definitions and buildTool factory |
| **System Prompts** | `src/constants/prompts.ts` | ~910 | System prompt templates |
| **Permission System** | `src/utils/permissions/` | ~multiple files | Multi-layer permission checks and rule matching |
| **Bash Security** | `src/tools/BashTool/bashSecurity.ts` | ~2,600 | 23 static security validators |
| **Context Assembly** | `src/context.ts` | ~190 | System/user context construction |
| **Compaction Service** | `src/services/compact/` | ~multiple files | Autocompact, Snip, Context Collapse |
| **MCP Client** | `src/services/mcp/client.ts` | ~3,350 | MCP connection management and tool registration |
| **Hooks Engine** | `src/hooks/` | ~multiple files | Hook event dispatching and execution |
| **Multi-Agent** | `src/coordinator/coordinatorMode.ts` | ~370 | Coordinator mode implementation |
| **Swarm Backend** | `src/utils/swarm/backends/` | ~multiple files | Tmux/iTerm2/InProcess execution backends |

## Key Thresholds and Constants

| Constant | Value | Source | Purpose |
|----------|-------|--------|---------|
| `AUTOCOMPACT_BUFFER_TOKENS` | 13,000 | autoCompact.ts | Auto-compaction trigger buffer |
| `MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES` | 3 | autoCompact.ts | Compaction circuit breaker threshold |
| `CAPPED_DEFAULT_MAX_TOKENS` | 8,000 | context.ts | Default output token cap (saves slots) |
| `ESCALATED_MAX_TOKENS` | 64,000 | context.ts | Escalated output cap after truncation |
| `MAX_OUTPUT_TOKENS_FOR_SUMMARY` | 20,000 | autoCompact.ts | Reserved output space for compaction summary |
| `DEFAULT_MAX_RESULT_SIZE_CHARS` | 50,000 | toolLimits.ts | Maximum characters for tool results |
| `MAX_TOOL_RESULT_TOKENS` | 100,000 | toolLimits.ts | Maximum tokens for tool results |
| `DENIAL_LIMITS.maxConsecutive` | 3 | denialTracking.ts | Fall back to interactive confirmation after consecutive denials |
| `DENIAL_LIMITS.maxTotal` | 20 | denialTracking.ts | Upper limit on total denials |
| `WARNING_THRESHOLD` | 0.7 (70%) | rateLimitMessages.ts | Rate limit warning threshold |
| `POST_MAX_RETRIES` | 10 | SSETransport.ts | Maximum retry count for POST requests |
| `RECONNECT_GIVE_UP_MS` | 600,000 (10min) | SSETransport.ts | SSE reconnection give-up time |
| `LIVENESS_TIMEOUT_MS` | 45,000 | SSETransport.ts | Heartbeat timeout (server sends every 15s) |

---

Back to: [Quick Start](/lib/09-harness/how-claude-code-works/en-docs-quick-start) | [Home](/lib/09-harness/how-claude-code-works/overview)
