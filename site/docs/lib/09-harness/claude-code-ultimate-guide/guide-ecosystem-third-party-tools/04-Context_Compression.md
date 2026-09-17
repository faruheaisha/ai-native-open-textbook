---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "9e72cd77bdb26f71be69d0b63ae8201f4911f8be41056811fd5f3799e85e77cd"
contentMode: "local-full"
zh: ""
---

## Context Compression

Tools that reduce tokens entering LLM context through compression, lazy-loading, or intelligent filtering, complementary to the tracking tools above.

### Tokenade

Tokenade combines local output filtering, code navigation, MCP proxying, deduplication and concise-output instructions. Coverage depends on the agent integration; Codex CLI and Codex desktop are separate entries in the vendor's compatibility table.

| Attribute | Evidence reviewed on 2026-09-08 |
|---|---|
| Distribution | [Public npm launcher/installer](https://github.com/pi-infected/tokenade-npm), separately distributed engine |
| Licence | [Proprietary commercial licence](https://github.com/pi-infected/tokenade-npm/blob/main/LICENSE); the FAQ's MIT claim conflicts with this file |
| Activation | Account required; free quota and paid plans. Verify current pricing before purchase |
| Integration | Hooks, CLI and MCP proxy; features vary by client |
| Evaluation status | Documentation, licence, benchmark manifests and published results inspected; no local runtime test or independent replication |

**Compared with RTK:** Tokenade changes more than shell output. Its [THOL manifest](https://github.com/pi-infected/token-harness-optimizer-leaderboard/blob/main/competitors/tokenade/manifest.json) also changes instructions and context settings. RTK supports compact file reads through its CLI, including signatures-only output; its Claude Code Bash hook does not intercept native Read/Grep calls. Do not repeat the vendor comparison's blanket exclusion of RTK file compression or native Windows support.

**Benchmark boundary:** The vendor-maintained [THOL campaign data](https://github.com/pi-infected/token-harness-optimizer-leaderboard/blob/main/docs/data/results.json) for Claude Code 2.1.206 reports a Tokenade 0.8.13 cost ratio of 0.768 versus control (95% interval 0.647–0.900), and RTK 0.42.3 at 1.052 (0.913–1.190). Each arm has 170 successful runs across 17 tasks. These are geometric means of per-task ratios. The experiment favours the full Tokenade configuration within that campaign; it does not isolate the contribution of each mechanism or prove equivalence for RTK. Include licence, setup, recovery and quality when evaluating your own workload.

Inspect overlapping hooks before combining optimizers. A public installer is not evidence that the proprietary engine preserves every detail or transmits only the declared telemetry.

---

### lean-ctx

A local-first context compression CLI and MCP server written in Rust. Installs once globally and activates in every Claude Code project without per-project configuration.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: yvgude/lean-ctx](https://github.com/yvgude/lean-ctx) |
| **Install** | `curl -fsSL https://raw.githubusercontent.com/yvgude/lean-ctx/main/skills/lean-ctx/scripts/install.sh \| bash && lean-ctx setup` |
| **Language** | Rust |
| **Stars** | ~1 366 |
| **Version** | v3.6.3 |

**How it works**

lean-ctx registers as a global MCP server (`~/.claude.json`) and installs three hooks in `~/.claude/settings.json` that fire on every tool call:

- `PreToolUse hook redirect`: intercepts native Read calls and routes them to `ctx_read` (AST parsing + file cache)
- `PreToolUse hook rewrite`: routes Bash calls through `ctx_shell` (pattern-based shell compression)
- `PostToolUse / SessionEnd hook observe`: feeds the CCP cross-session memory

**The 4 compression dimensions**

- **File reads with AST parsing**: tree-sitter parses TypeScript, Python, Rust, and 15 other languages. `signatures` mode returns only type and function signatures (no bodies). `map` mode returns exports and dependencies. A 2364-line `schema.prisma` compresses to ~200 tokens. Unchanged files are served from cache at ~13 tokens on re-read.
- **Shell output**: 60+ compression patterns specific to git, cargo, npm, docker, and kubectl. `git log -10 --stat` becomes 10 commit lines plus a single summary.
- **Cross-session memory (CCP: Context Continuity Protocol)**: stores a ~400-token session summary on exit. The next session loads it rather than cold-reading 50,000+ tokens of prior context.
- **Codebase graph**: SQLite-backed dependency graph built from tree-sitter imports/exports across 18 languages. `ctx_overview` uses it to score files by import centrality and surface the most connected modules first.

**Measured benchmarks (TypeScript/T3 monorepo, 2455 files)**

| Metric | Value |
|--------|-------|
| Overall compression rate | 57.8% |
| ctx_read savings rate | 86% |
| ctx_search savings rate | 72% |
| Tokens saved in one day | 1.3M |
| schema.prisma 2364L in signatures mode | ~200 tokens (99%) |
| File re-read (cache hit) | 13 tokens |

Results are lower on Markdown-heavy repos, because the AST parser finds less structure to compress in documentation files than in TypeScript or Rust source.

**RTK vs lean-ctx: complementary layers**

Both tools reduce token consumption but operate at different points in the pipeline and do not conflict:

| Layer | Tool | What it compresses |
|-------|------|--------------------|
| CLI output (shell hook) | RTK | git, cargo, npm, tsc output text |
| File reads (MCP redirect) | lean-ctx | File content via AST + cache |
| Cross-session memory | lean-ctx | Session summaries via CCP |

RTK compresses shell output more aggressively (60-90% savings). lean-ctx's savings come almost entirely from file reads (86% of its total savings on measured sessions). Use both together.

**Monitoring**

```bash
lean-ctx gain           # dashboard: tokens saved, USD, top commands
lean-ctx gain --daily   # day-by-day breakdown
lean-ctx cep            # efficiency score /100 (compression, cache hit rate, consistency)
lean-ctx dashboard      # web UI at localhost:3333
```

A global `/lean-ctx-audit` slash command (`~/.claude/commands/lean-ctx-audit.md`) runs a full audit from within any session. See [context-engineering.md §12](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index#12-token-compression-tools) for the full tool comparison and setup guide.

**When to adopt lean-ctx**

Highest value on TypeScript, Rust, or Python projects where large files are read repeatedly within a session, sessions fill context before the task completes, or cross-session memory matters. Less impactful on documentation repos where most files are Markdown.

> **Note**: lean-ctx releases frequently. Run `lean-ctx setup` after upgrades to refresh hook and MCP registration. For shell output filtering only, RTK is the simpler starting point.

---

### tilth

An MCP server for structural code navigation, targeting the largest single token cost in a Claude Code session: file reads. Instead of loading full file contents, tilth exposes tree-sitter-powered tools the model calls explicitly to navigate code by shape rather than by text.

| Attribute | Details |
|-----------|---------|
| **Source** | [github.com/jahala/tilth](https://github.com/jahala/tilth) |
| **Install** | `cargo install tilth` then `tilth install claude-code` |
| **Language** | Rust |
| **Architecture** | MCP server (installs into Claude Code) |
| **Parser** | tree-sitter (multi-language) |

**Key tools exposed to the model**:

- File read with auto-outline: large files return a structural skeleton with section names and line ranges; the model requests specific ranges on demand
- Symbol search: definitions, usages, and resolved callees in one call, replacing the grep-then-read loop
- `--callers`: all call sites of a symbol, structurally rather than via text search
- `--deps`: imports and dependents of a file, for understanding blast radius before a refactor
- `grok <symbol>`: signature, callers, callees, sibling functions, and associated tests for one symbol in one call
- Structural diff: changes summarized at the function level, not the line level
- Session dedup: symbols already shown in the current session are marked `[shown earlier]` instead of being re-expanded

**Benchmarks** (160 runs, 4 real repositories, metric = cost per correct answer):

| Model | Cost change | Accuracy change |
|-------|-------------|----------------|
| Sonnet 4.6 | -44% | 84% → 94% |
| Opus 4.6 | -39% | 91% → 92% |
| Haiku 4.5 | -38% | 54% → 73% |
| Average | -40% | 76% → 86% |

The benchmark metric is cost per correct answer, not tokens saved in isolation. This matters: a tool that saves tokens but degrades output quality provides no real value. tilth improves on both dimensions.

Why file reads are the right target: real-world billing data shows they account for approximately 65% of total token usage in a Claude Code session, versus roughly 12% for bash output. Tools that compress file reads move a larger share of the total cost than CLI output compressors can.

```bash
cargo install tilth
tilth install claude-code   # registers the MCP server in Claude Code
```

No per-project configuration is required after global install.

**Comparison with lean-ctx**: Both use tree-sitter to reduce file read token cost. lean-ctx works as a hook-level redirect that intercepts native Read calls transparently, requiring no change to model behavior. tilth exposes explicit navigation tools the model must call directly, giving it more control over what it fetches at the cost of requiring the model to use tilth's API rather than standard reads. Both approaches are valid; the right choice depends on whether you prefer passive compression or explicit navigation.

**When to use tilth**:

- TypeScript, Rust, or Python projects where large source files are read repeatedly
- Sessions where context fills before the task completes
- Codebases where call graph navigation (callers, callees, deps) is frequent
- When you want accuracy improvements alongside cost reduction, not just compression

---

### maki

A standalone TUI agent written in Rust (using ratatui) that replaces Claude Code entirely rather than augmenting it. maki is not a Claude Code plugin or MCP add-on; it is an alternative agent with its own interface and context management architecture.

| Attribute | Details |
|-----------|---------|
| **Source** | [github.com/tontinton/maki](https://github.com/tontinton/maki) |
| **Language** | Rust (ratatui TUI) |
| **Architecture** | Standalone agent (replaces Claude Code) |
| **LLM providers** | Anthropic, OpenAI, Google, Copilot, Ollama, Mistral, DeepSeek, OpenRouter |

**Context efficiency tools built into maki**:

The `index` tool: tree-sitter skeleton with exact line ranges. Measured overhead per turn: +59 tokens (the index call itself). Measured saving per turn: -224 tokens on reads. Net: -165 tokens per turn. The maki README notes that bash output is only 12% of total token usage in a typical session, so RTK-style bash compression saves roughly 6% of total cost at best. File reads (65% of total) are where the larger gains are.

The `code_execution` tool: an embedded Python interpreter (monty) that can filter, transform, and aggregate data before it enters the context window. Instead of the model reading a raw file to count something, it writes and runs a script; only the result enters context.

The `task` tool: sub-agent delegation with dynamic model selection (haiku for simple subtasks, sonnet or opus for complex ones), keeping expensive model calls proportional to the reasoning actually required.

**Important distinction**: maki is architecturally separate from Claude Code. You cannot use maki as a Claude Code extension; choosing maki means replacing Claude Code for the sessions where you use it. Teams committed to the Claude Code ecosystem (hooks, skills, CLAUDE.md hierarchy, MCP registry) will not benefit from maki's internal tooling. maki is most relevant if you want a single tool that works across multiple LLM providers or prefer a self-contained Rust binary with no external dependencies.

**When to consider maki**:

- You work across multiple LLM providers and want a single interface
- You want fine-grained context management without installing separate MCP servers
- You are building or experimenting with agent architecture and want access to the internals

**When Claude Code remains the better fit**:

- You rely on Claude Code's hook system, skills, or CLAUDE.md path-scoping
- Your team shares MCP server configurations via `.mcp.json`
- You need Claude-specific features (extended thinking, Projects, memory systems)

---

### mcp2cli

A universal CLI bridge that converts any MCP server, OpenAPI spec, or GraphQL endpoint into shell commands, without injecting tool schemas into the LLM context. The key insight: most MCP clients push the full schema of every registered tool into context on every turn, whether the agent needs it or not. mcp2cli replaces that with lazy loading.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: knowsuchagency/mcp2cli](https://github.com/knowsuchagency/mcp2cli) |
| **Install** | `uvx mcp2cli --help` (no-install) or `uv tool install mcp2cli` |
| **Language** | Python |
| **Stars** | ~1 900 |
| **Status** | Active (Show HN Best of March 2026) |

**How the lazy loading works**:

Instead of injecting full tool schemas (~44 000 tokens for a 43-tool GitHub MCP server), the agent:

1. Calls `mcp2cli --mcp <url> --list` → receives ~16 tokens per tool (name + short description)
