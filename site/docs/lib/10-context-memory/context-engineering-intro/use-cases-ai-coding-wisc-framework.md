---
title: "WISC Framework: Context Engineering for AI Coding"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# WISC Framework: Context Engineering for AI Coding

![WISC Framework](/mirror/c0/c07b6753088106dbd2eba669fa042c8a4388d5fa.png)

## What is WISC?

WISC is a practical framework for managing AI context in coding sessions, based on [Anthropic's four context engineering strategies](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). The acronym stands for:

<div class="tb-zh"><p>WISC 是一个用于管理编码会话中 AI 上下文的实用框架，基于 Anthropic 的四种上下文工程策略。这个缩写代表：</p></div>

- **W - Write**: Externalize your agent's memory to files so it survives context resets
- **I - Isolate**: Use sub-agents to keep research noise out of your main session
- **S - Select**: Load only the context you need for the current task, not everything
- **C - Compress**: When sessions run long, compress with focus or hand off to a fresh session

<div class="tb-zh"><p>W — Write（写出）：把 agent 的记忆外化到文件里，让它在上下文重置之后依然存活；I — Isolate（隔离）：用子 agent 把调研噪音挡在主会话之外；S — Select（选择）：只加载当前任务需要的上下文，而不是全部；C — Compress（压缩）：当会话变得很长时，带着焦点做压缩，或者交接给一个全新的会话。</p></div>

The ordering is intentional — Write and Isolate have the most impact, Select is the force multiplier, and Compress is the safety net.

<div class="tb-zh"><p>这个排序是刻意安排的——Write 和 Isolate 影响最大，Select 是力量倍增器，Compress 是安全网。</p></div>

## The 3-Tier Context System

This use case demonstrates a progressive disclosure approach to AI context, built for Claude Code but applicable to any AI coding tool:

<div class="tb-zh"><p>本用例演示了一种针对 AI 上下文的渐进式披露方法，为 Claude Code 而构建，但同样适用于任何 AI 编码工具：</p></div>

### Tier 1: Global Rules (`CLAUDE.md`)

Always loaded. Covers project structure, essential commands, architecture overview, and universal conventions. Keep this lean — under 500 lines. If removing a line wouldn't cause the AI to make mistakes, cut it.

<div class="tb-zh"><p>始终加载。覆盖项目结构、必要的命令、架构概览和通用约定。保持精简——控制在 500 行以内。如果删掉某一行并不会让 AI 犯错，那就把它删掉。</p></div>

### Tier 2: On-Demand Rules (`.claude/rules/`)

Loaded automatically based on which files the agent is working with. Each rule file has a `paths:` frontmatter that triggers auto-loading — for example, `testing.md` loads when the agent touches `**/*.test.ts`, and `web-frontend.md` loads when working in `packages/web/**/*.tsx`.

<div class="tb-zh"><p>根据 agent 正在处理哪些文件而自动加载。每个规则文件都有 paths: frontmatter 来触发自动加载——例如 testing.md 会在 agent 接触到 **/.test.ts 时加载，web-frontend.md 会在处理 packages/web/*/*.tsx 时加载。</p></div>

**Examples in `.claude/rules-example/`:**

<div class="tb-zh"><p>示例位于 .claude/rules-example/：</p></div>

| File | Auto-loads when touching | What it covers |
|------|--------------------------|----------------|
| `testing.md` | `**/*.test.ts` | Mock isolation rules, test batching, lazy logger patterns |
| `web-frontend.md` | `packages/web/**/*.tsx` | Tailwind v4, SSE event types, React Router v7 |
| `database.md` | `**/db/**` | Query patterns, migration conventions, dual DB support |
| `orchestrator.md` | `**/orchestrator/**` | Session lifecycle, routing agent, streaming |
| `workflows.md` | `**/workflows/**` | YAML parsing, execution modes, variable substitution |
| `adapters.md` | `**/adapters/**` | Platform adapter patterns, auth, message formatting |
| `isolation.md` | `**/isolation/**` | Worktree provider, error classification, environment lifecycle |
| `server-api.md` | `**/server/**`, `**/routes/**` | API routes, SSE streaming, webhook verification |
| `cli.md` | `**/cli/**` | CLI adapter, command registration, output formatting |

### Tier 3: Reference Docs (`.claude/docs/`)

Heavy reference guides designed for sub-agent scouting. These are NOT auto-loaded. Instead, a sub-agent reads the header to determine relevance, then loads the full doc only if needed. This keeps 1,000+ lines of deep reference out of your main context.

<div class="tb-zh"><p>为重型的参考指南，专为子 agent 侦察而设计。它们不会被自动加载。取而代之的是，子 agent 先读文件头部判断相关性，只在需要时才加载完整文档。这样就能把 1000 行以上的深度参考资料挡在你的主上下文之外。</p></div>

**Examples in `.claude/docs-example/`:**

<div class="tb-zh"><p>示例位于 .claude/docs-example/：</p></div>

| File | Lines | What it covers |
|------|-------|----------------|
| `architecture-deep-dive.md` | 324 | Full system architecture, data flow, package dependencies |
| `workflow-yaml-reference.md` | 309 | Complete YAML syntax for steps, loops, DAGs, variables |
| `adapter-implementation-guide.md` | 248 | How to build a new platform adapter end-to-end |
| `isolation-and-worktree-guide.md` | 231 | Git worktree mechanics, environment lifecycle, error handling |

## Slash Commands

These implement WISC strategies as reusable slash commands in Claude Code (`.claude/commands/`):

<div class="tb-zh"><p>这些把 WISC 策略实现为 Claude Code 中可复用的斜杠命令（.claude/commands/）：</p></div>

### Prime Commands (Select)

Load focused codebase context at the start of a session. Instead of exploring the entire codebase (~30K+ tokens), each prime variant explores only the relevant subsystem.

<div class="tb-zh"><p>在会话开始时加载聚焦的代码库上下文。每个 prime 变体不再探索整个代码库（约 3 万 token 以上），而是只探索相关的子系统。</p></div>

| Command | What it primes |
|---------|----------------|
| `/prime` | Full codebase overview (all packages) |
| `/prime-backend` | Core business logic + HTTP server |
| `/prime-frontend` | React UI, SSE hooks, components |
| `/prime-workflows` | Workflow engine (loader, router, executor, DAG) |
| `/prime-isolation` | Git worktree isolation system |

### Planning & Execution (Write)

| Command | What it does |
|---------|-------------|
| `/plan-feature` | Spawns sub-agents to research the codebase, then writes a detailed implementation plan to a file. The plan becomes the spec for a fresh implementation session. |
| `/execute` | Reads a plan file and implements it step-by-step. Runs in a fresh session with only the plan as context — no planning conversation baggage. |

### Session Management (Write + Compress)

| Command | What it does |
|---------|-------------|
| `/handoff` | Gathers git state, writes a `HANDOFF.md` with completed work, key decisions, dead ends, and recommended next action. The next session reads this file and picks up immediately. |
| `/commit` | Creates an enriched commit with conventional tags, a WHY-focused body, and a `Context:` section that logs changes to rules, commands, or docs alongside code changes. |

## How the Strategies Map to Commands

```
WRITE       /plan-feature  /execute  /handoff  /commit
             (specs)        (specs)   (progress) (git memory)

ISOLATE     /plan-feature spawns research sub-agents
            /prime-* commands use focused exploration
            Scout pattern: sub-agents read docs headers first

SELECT      /prime-*       .claude/rules/*.md    .claude/docs/*.md
            (focused)      (auto-loaded)          (on-demand via scouts)

COMPRESS    /handoff       /compact (built-in)
            (write+compress) (focused compaction)
```

## Applying This to Your Project

1. **Start with Write** — Set up enriched commits and spec-driven planning. This alone transforms your AI coding workflow.
2. **Add Select** — Move domain-specific conventions out of your global rules into path-scoped rule files. Keep your `CLAUDE.md` lean.
3. **Use Isolate** — When researching, spawn sub-agents instead of reading files in your main session. The exploration noise stays contained.
4. **Compress as needed** — Use focused `/compact` with explicit preservation targets, or write a `/handoff` and start fresh.

<div class="tb-zh"><p>1）从 Write 开始——搭建富化提交与 spec 驱动的规划，仅这一步就能改变你的 AI 编码工作流；2）加入 Select——把领域专属约定从全局规则移到按路径限定的规则文件中，让 CLAUDE.md 保持精简；3）使用 Isolate——做调研时派出子 agent，而不是在主会话里读文件，让探索产生的噪音被关住；4）按需 Compress——使用带明确保留目标的聚焦式 /compact，或者写一份 /handoff 然后重新开始。</p></div>

## Resources

- [Anthropic: Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Martin Fowler: Knowledge Priming for AI Agents](https://martinfowler.com/articles/reduce-friction-ai/knowledge-priming.html)
- [Progressive Disclosure for AI Coding Tools](https://alexop.dev/posts/stop-bloating-your-claude-md-progressive-disclosure-ai-coding-tools/)
- [Context Rot Research (Chroma)](https://research.trychroma.com/context-rot)
- [GitHub Spec Kit](https://github.com/github/spec-kit)

<div class="tb-zh"><p>参考资料：Anthropic：面向 AI Agent 的上下文工程；Anthropic：长时运行 Agent 的有效 harness；Martin Fowler：为 AI Agent 做知识预热；面向 AI 编码工具的渐进式披露；上下文腐化研究（Chroma）；GitHub Spec Kit。</p></div>
