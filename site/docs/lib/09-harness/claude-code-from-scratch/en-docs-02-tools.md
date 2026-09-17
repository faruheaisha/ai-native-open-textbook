---
title: "2. Tool System"
sourceId: "09-harness/claude-code-from-scratch"
sourceTitle: "Claude Code From Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch"
entryUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch/blob/0b452360866433fde0dc77cd37ada9d303546592/en/docs/02-tools.md"
sourceRel: "en/docs/02-tools.md"
rawUrl: "/raw/09-harness/claude-code-from-scratch/en/docs/02-tools.md"
sourceSha256: "8e010335c35a71ed720921c0749cd08f9d0edac9fa3bb39648a8a8f8b2e67a12"
pageSha256: "8e010335c35a71ed720921c0749cd08f9d0edac9fa3bb39648a8a8f8b2e67a12"
contentMode: "local-full"
zh: ""
---

# 2. Tool System

## Chapter Goals

Last chapter's loop already catches a tool call, runs it, and feeds the result back — but there's not a single tool yet, so the model has nothing to read even when it wants to. This chapter builds the tools.

A tool is really just three things: a name, a description for the model, and a function that does the work. Start from the smallest one, `read_file`, build the six core tools (read, write, edit, list, search, Shell), then add extensions like `web_fetch`, `skill`, `agent`. Along the way `edit_file` hits two traps — editing the wrong place, and clobbering someone's just-made change — plugged with read-before-edit and an mtime check. As the tool count grows, deferred (lazy-loaded) tools keep the token cost of the tool list down.

```mermaid
graph LR
    LLM[LLM Response] --> |tool_use block| Dispatch[executeTool<br/>Dispatcher]
    Dispatch --> RF[read_file]
    Dispatch --> WF[write_file]
    Dispatch --> EF[edit_file]
    Dispatch --> LF[list_files]
    Dispatch --> GS[grep_search]
    Dispatch --> RS[run_shell]
    Dispatch --> SK[skill]
    Dispatch --> AG[agent]
    Dispatch --> WEB[web_fetch]
    Dispatch --> TS[tool_search]
    Dispatch --> EP[enter_plan_mode<br/>deferred]
    Dispatch --> XP[exit_plan_mode<br/>deferred]
    RF --> Result[Tool Result String]
    WF --> Result
    EF --> Result
    LF --> Result
    GS --> Result
    RS --> Result
    SK --> Result
    AG --> Result
    WEB --> Result
    TS --> Result
    EP --> Result
    XP --> Result

    style Dispatch fill:#7c5cfc,color:#fff
    style EF fill:#e8e0ff
    style RF fill:#e8e0ff
```

> ▶ **Run this chapter**: `node steps/run.mjs 2` (no API key — a local mock model). Add `--py` for Python; add `--diff` to see what it added over the previous chapter. To run your own prompt against a real model, add `--live` (it reads the key from `.env`; `--py` runs the Python version).

## Our Implementation

A tool is three things: a name, a description for the model, and a function that does the work. The first two go in a static array (already in the exact shape the API wants); the third is an ordinary function, dispatched by name through a switch. Definitions first, then execution, then a walk through each tool — with the focus on `edit_file`, the one tool in this chapter with a real trap in it.

Last chapter's agent only had `read_file` — ask it to create a file and it has no `write_file` to reach for. This chapter adds the other five to `tools.ts` (write, edit, list, search, Shell). Relative to Chapter 1, here's what this chapter adds:

With those in place, the same "create a file" request now works:

```
$ node steps/run.mjs 2
▶ step 2 demo (no API key — local mock model)   sandbox: <sandbox>
  you: Create a file notes.txt containing the text remember-this.

I'll create the file.
  → write_file({"file_path":"notes.txt","content":"remember-this"})
Created notes.txt.

  ✓ verified: notes.txt contains "remember-this"
```

### Tool Definitions: Static Array

These definitions are passed directly to the Anthropic API's `tools` parameter -- the format is exactly the same, no conversion needed.

**Why a static array instead of classes?** Claude Code uses a class hierarchy because 66+ tools need inheritance, polymorphism, and independent testing. For 6 tools, an array + a switch statement is sufficient -- simplicity itself is a value.

### Tool Execution: Switch Dispatcher

The `default` branch returns `Unknown tool: $\{name\}` instead of throwing an exception -- embodying the "errors are data" design, allowing the model to self-correct hallucinated tool names.

### Tool-by-Tool Walkthrough

#### read_file

Line numbers are added so the LLM can locate code positions, but `edit_file` matches against the actual content string, not line numbers.

#### edit_file -- The Most Critical Tool

The unique match check is the core: 0 occurrences means the model's memory of the file contents is wrong (hallucination detection); >1 occurrences requires the model to provide more context to uniquely identify the edit point. "Better to fail than to guess" -- silently replacing the first match is far more dangerous than reporting failure.

#### Quote Tolerance + Diff Output

LLM tokenization may map straight quotes to curly quotes (`"` -> `"`). Without a tolerance mechanism, such edits would fail 100% of the time.

Key detail: after a successful match, the **original string from the file** is returned, not the normalized version, preserving the file's original character style during replacement.

After a successful edit, a simple diff is generated, with line numbers calculated by counting `\n` characters before the `old_string`:

```
Successfully edited src/app.ts (matched via quote normalization)

@@ -15,1 +15,1 @@
- const msg = "hello";
+ const msg = "world";
```

#### write_file

Auto-creating parent directories (`mkdir -p` effect) avoids the model needing an extra shell command. The System Prompt tells the LLM to prefer `edit_file` and only use `write_file` for new files.

#### grep_search

`--color=never` disables ANSI color codes (the output is for the model, not for human eyes). The Python version's `--` separator ensures patterns starting with `-` aren't misinterpreted as grep options.

grep exit code 1 means "no matches" which isn't an error; 2+ is a real error -- they need to be handled separately. Results are truncated to the first 100 entries, with a `... and N more matches` note appended.

Claude Code uses ripgrep (`rg`); we use system `grep` -- functionally sufficient, one fewer dependency.

#### run_shell

On failure, both stdout and stderr are returned -- many compilers output errors on stderr while stdout may contain useful partial output. `"(no output)"` prevents the model from getting confused when a command succeeds but produces no output (`mkdir`, `touch`).

Claude Code's BashTool spans 18 source files, with AST command parsing, sandboxed execution, and 23 safety checks. We only do timeout protection (safety mechanisms are detailed in Chapter 6).

### Tool Result Truncation

Keeping both head and tail rather than just the head, because many commands produce critical output at the end (compilation error summaries, test result statistics). The truncation notice explicitly tells the model that content was truncated, so the model can decide whether to use `grep_search` or `read_file` to get the full content.

### WebFetch Tool

Lets the Agent access URLs to retrieve content -- looking up documentation, reading API responses, scraping web information:

Design choices:
- **30-second timeout**: Prevents the model from blocking the entire loop on slow or unresponsive URLs
- **HTML tag stripping**: LLMs don't need to see HTML tags; plain text is more efficient
- **50KB limit**: Prevents web content from crowding out the context window
- Marked as `CONCURRENCY_SAFE_TOOLS` (read-only, no side effects), can be executed in parallel

### Read-before-edit + mtime Protection

An important safety mechanism from Claude Code: **a file must be read before it can be edited**. This prevents the model from blindly modifying files without knowing their current contents, and detects external modifications to avoid overwriting the user's manual edits.

Three key points:
- **readFileState Map** is maintained in the Agent instance, with absolute paths as keys and `mtimeMs` at last read as values
- **New files skip the check**: When `existsSync(absPath)` is false, reading first isn't required -- creating a new file doesn't need a prior read
- **mtime comparison**: Records mtime at read time, compares before writing. If they don't match, it means the file was modified by the user or another process after the Agent read it, returning a warning rather than silently overwriting

This aligns with Claude Code's `readFileTimestamps` mechanism -- edits must be based on known state, no "blind writes."

### ToolSearch Deferred Loading

When the number of tools grows large (66+), sending all tool schemas to the API wastes significant tokens. Claude Code's approach is **deferred loading**: infrequently used tools only have their names sent, and the model activates them on demand via `ToolSearch`.

Workflow:
1. During API calls, `getActiveToolDefinitions()` filters out unactivated deferred tools (only names sent, no schemas)
2. The system prompt uses `getDeferredToolNames()` to tell the model which tools can be activated via `tool_search`
3. When needed, the model calls `tool_search`, and matching tools are added to the `activatedTools` Set
4. The next API call automatically includes the full schemas of activated tools

We only have 2 deferred tools (plan mode), but this mechanism becomes critical when scaling to 20+ tools.

## What the Real Claude Code Does Beyond This

The tools above needed one array entry and one function each. Every tool in the real Claude Code is a full behavioral contract, an eight-stage execution pipeline, and a concurrency scheduler — and that gap is exactly the distance between a toy tool system and one running in production.

### Tool Interface -- The Complete Contract for Each Tool

Every tool in Claude Code follows a unified `Tool` generic interface -- not a simple function signature, but a complete behavioral contract:

```typescript
type Tool<Input, Output, P extends ToolProgressData> = {
  name: string
  aliases?: string[]              // Deprecated aliases for smooth migration
  maxResultSizeChars: number      // Persists to disk if exceeded

  call(args, context, canUseTool, parentMessage, onProgress?): Promise<ToolResult<Output>>

  description(input, options): Promise<string>  // Tool description sent to API
  prompt(options): Promise<string>              // Usage guide injected into system prompt

  inputSchema: Input              // Zod Schema (runtime validation + type inference)
  inputJSONSchema?: ToolInputJSONSchema

  isConcurrencySafe(input): boolean   // Takes input: same tool with different args can have different safety semantics
  isReadOnly(input): boolean
  isDestructive?(input): boolean
  checkPermissions(input, context): Promise<PermissionResult>

  renderToolUseMessage(input, options): React.ReactNode  // Each tool has its own rendering
  renderToolResultMessage?(content, progress, options): React.ReactNode
}
```

Several design highlights:

**`isConcurrencySafe(input)` takes parameters** -- this means the same tool can have different safety semantics for different inputs. BashTool returns `isReadOnly: true` for `ls` and `false` for `rm`. Far more precise than labeling an entire tool.

**`prompt()` method** -- each tool can inject its own usage guide into the system prompt. FileEditTool injects "exact match" rules, BashTool injects safe execution reminders. Tool behavior guidelines are tightly coupled with tool definitions, rather than scattered across a global prompt file.

**Rendering methods** -- each tool carries its own rendering logic; adding new tools doesn't require modifying global rendering code.

### buildTool Factory -- Fail-Closed Defaults

```typescript
const TOOL_DEFAULTS = {
  isConcurrencySafe: () => false,    // Not concurrency-safe by default
  isReadOnly: () => false,           // Has write side effects by default
  isDestructive: () => false,
  checkPermissions: () => ({ behavior: 'allow', updatedInput }),
}
```

This is a **fail-closed** design: incorrectly marking a "read-only" tool as "non-read-only" results in unnecessary permission prompts (annoying but safe); the reverse error -- incorrectly marking a "write" tool as "read-only" -- could let it execute concurrently without permission checks (dangerous and subtle). Defaults can only go in the safe direction.

### Tool Registration -- Three-Layer Pipeline

```mermaid
flowchart TD
    L1["Layer 1: getAllBaseTools()<br/>Core tools via direct import<br/>+ Feature-gated conditional imports"] --> L2["Layer 2: getTools()<br/>Runtime context filtering<br/>SIMPLE mode / deny rules / isEnabled()"]
    L2 --> L3["Layer 3: assembleToolPool()<br/>Built-in tools + MCP bridge tools<br/>Partitioned sorting + deduplication"]
    L3 --> Final[Final Tool Pool]
```

Layer 1's feature-gated tools load via conditional `require()`:

```typescript
const SleepTool = feature('PROACTIVE') || feature('KAIROS')
  ? require('./tools/SleepTool/SleepTool.js').SleepTool
  : null
```

`feature()` is a compile-time macro for the Bun bundler. It evaluates to `false` in external builds, and the entire `require()` is eliminated as dead code -- internal tools physically don't exist in the external binary.

Layer 3's partitioned sorting: built-in tools come first in alphabetical order, MCP tools are appended after, with no global sorting. The reason is that the API server sets a cache breakpoint after the last built-in tool, so partitioning ensures that adding MCP tools doesn't affect cache hits for built-in tools.

### Tool Execution Lifecycle -- 8 Stages

```mermaid
flowchart TD
    Input[Model outputs tool_use block] --> Find["1. Tool Lookup"]
    Find --> Validate["2. Input Validation (Zod + business logic)"]
    Validate --> Parallel["3. Parallel Launch"]

    subgraph Parallel
        Hook["Pre-Tool Hook"]
        Classifier["Bash Safety Classifier"]
    end

    Parallel --> Hook
    Parallel --> Classifier
    Hook --> Perm["4. Permission Check (Hook->Tool->Rules->Classifier->Interactive Confirmation)"]
    Classifier --> Perm

    Perm --> Exec["5. tool.call() (streaming progress)"]
    Exec --> Result["6. Result Processing (large results persisted to disk)"]
    Result --> PostHook["7. Post-Tool Hook"]
    PostHook --> Emit["8. tool_result returned to model"]
```

Several stages worth noting:

**Stage 2 Two-Phase Validation**: Phase 1 is Zod Schema (field types), Phase 2 is business logic (e.g., FileEditTool checks whether old_string is unique). Separating them ensures low-cost checks run first, reducing unnecessary disk I/O.

**Stage 3 Parallel Launch**: Pre-Tool Hook and Bash classifier start simultaneously, each taking tens to hundreds of milliseconds. Parallelization reduces total permission check latency.

**Stage 6 Large Result Handling**: When results exceed `maxResultSizeChars`, the full content is saved to `~/claude-code/tool-results/`, and the model receives a file path + truncation indicator. It can actively retrieve content via FileReadTool when needed.

> **Core design philosophy: errors are data, not exceptions.** Errors at any stage are converted into `tool_result` with `is_error: true` and returned to the model, letting the model self-correct.

### Concurrency Control

```typescript
private canExecuteTool(isConcurrencySafe: boolean): boolean {
  const executingTools = this.tools.filter(t => t.status === 'executing')
  return (
    executingTools.length === 0 ||
    (isConcurrencySafe && executingTools.every(t => t.isConcurrencySafe))
  )
}
```

The rule is simple: non-concurrency-safe tools must execute exclusively; multiple concurrency-safe tools can run simultaneously. `StreamingToolExecutor` doesn't wait for the model to finish outputting all tool_use blocks -- as soon as it detects a complete block, it starts execution immediately. Tool execution latency is about 1 second, while model streaming output lasts 5-30 seconds, so most tools can be completely hidden within the streaming window.

Concurrency cap: `MAX_TOOL_USE_CONCURRENCY = 10`.

### edit_file's Core Design

FileEditTool has 14 validation steps before execution (ordered by I/O cost: check in-memory state first, then access disk), with three being most critical:

**Read prerequisite check**: A code-level hard constraint, not just a prompt suggestion. Execution is refused if the file hasn't been read first, ensuring the model edits based on the file's current state rather than stale memory.

**External modification detection**: Uses mtime to detect whether the file was modified externally after being read (e.g., the user edited the same file in their IDE), solving a real race condition.

**Config file protection**: For files like `.claude/settings.json`, validation simulates the edit and runs JSON Schema validation afterward, preventing seemingly reasonable edits from corrupting configuration format.

### Why Search-and-Replace

Before settling on search-and-replace, several alternatives were considered:

| Approach | Fatal Flaw |
|----------|-----------|
| Line-number editing | Position-dependent: after inserting 3 lines the first time, all subsequent line numbers shift, requiring complex recalculation for multi-step edits |
| AST editing | Files with syntax errors are exactly the ones that need editing most, but AST parsers error out on syntax errors |
| Unified diff | LLMs perform poorly generating strict formats: any error in hunk header line numbers, `+`/`-`/space prefixes makes the patch inapplicable |
| Full file rewrite | Wastes tokens on large files; model may omit unchanged code; users can't quickly review |
| **String replacement** | None of the above flaws |

The most underrated advantage of search-and-replace is **hallucination safety**: if the model provides a string that doesn't exist in the file, the tool simply fails, and the model re-reads the file to correct its memory. Full file rewrite could silently write incorrect content to the file.

## Our Simplification Decisions

| Claude Code's Design | Our Simplification | Reason |
|---------------------|-------------------|--------|
| 66+ tool classes, each in its own directory | 1 `tools.ts` + a switch dispatcher (6 core functions + extension tools; `skill`/`agent` handled at the agent layer) | Tutorial doesn't need industrial-grade modularity |
| 8-stage lifecycle | Direct switch dispatch + execution | Skip Hook, permission checks, classifier |
| StreamingToolExecutor concurrency | Serial execution one by one | Avoid concurrency complexity |
| 14-step validation pipeline | Uniqueness check + quote tolerance | Keep only the 2 most critical validations |
| Three-tier large result limits | Single 50K truncation layer | Enough to prevent context explosion |
| MCP 7 transports + OAuth | No MCP support | Tutorial focuses on core concepts |

Core principle: **Preserve the design philosophy, cut the engineering complexity**.

## Simplification Comparison

| Dimension | Claude Code | mini-claude |
|-----------|------------|-------------|
| **Tool count** | 66+ | 12 resident (6 core + web_fetch + tool_search + skill + agent + 2 plan mode); `/loop` dynamic temporarily mounts `schedule_wakeup` |
| **Execution mode** | Concurrent execution + streaming early start | Parallel execution (concurrencySafe) + streaming early start |
| **Search engine** | ripgrep (rg) | System grep |
| **Edit validation** | 14-step pipeline + readFileTimestamps | Quote tolerance + uniqueness + diff + read-before-edit + mtime |
| **Shell safety** | AST parsing + sandbox | Regex matching + confirmation |
| **Result truncation** | Selective trimming + disk persistence | Head+tail 50K + 30KB disk persistence |
| **Deferred loading** | deferred tools + ToolSearch | deferred flag + tool_search |
| **Network access** | WebFetch (tag stripping + timeout) | web_fetch (tag stripping + 30s timeout + 50KB limit) |

---

> **Next chapter**: Tool definitions determine the agent's capabilities, but the System Prompt defines its behavior -- how to use these tools and when to be careful.
