---
title: "Agentic Harness Patterns（模式与技能）"
sourceId: "09-harness/agentic-harness-patterns-skill"
sourceTitle: "Agentic Harness Patterns（模式与技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill"
entryUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill/blob/17549f55b84a94b1ff647ae4711be600fe8ae12f/README.md"
sourceRel: "README.md"
rawUrl: "/raw/09-harness/agentic-harness-patterns-skill/README.md"
sourceSha256: "ded29548c1c109308b613474716698a478c70433829e1cd3d5b70b79c48225e6"
pageSha256: "ded29548c1c109308b613474716698a478c70433829e1cd3d5b70b79c48225e6"
contentMode: "local-full"
zh: ""
---

# Agentic Harness Patterns（模式与技能）

<p align="center"><strong>Production design patterns for AI coding agents, distilled from 512,000 lines of Claude Code.</strong></p>

---

> [!TIP]
> **How this was built:** Read the [Distilling Claude Code Source — A Harness Engineering Practice Log](/lib/09-harness/agentic-harness-patterns-skill/docs-distillation-harness-practice) for the full story of how Codex and Claude Code collaborated, the PCA-inspired taste injection, and what worked (and didn't).

The model loop is easy. `User -> LLM -> tool_use -> execute -> loop` fits on a napkin. What makes a production agent actually work — reliably, safely, at scale — is everything *around* the loop: memory that persists across sessions, permissions that fail closed, context budgets that don't explode, multi-agent coordination that doesn't collapse into chaos, and extensibility that doesn't become a security hole.

Anthropic calls this the **harness**. This repo teaches you how to build one.

> [!NOTE]
> This skill is compatible with the [open agent skills ecosystem](https://github.com/vercel-labs/skills). Install with `npx skills add` — works with Claude Code, Codex, and 40+ other agents.

## What This Is

6 design-pattern chapters and 11 deep-dive references, extracted from systematic source-level analysis of the [Claude Code runtime](https://github.com/anthropics/claude-code) — the production AI coding agent behind Claude's 512,000-line TypeScript codebase.

> [!IMPORTANT]
> **This is not a code dump or a source mirror.** Every pattern is expressed as a portable, runtime-agnostic design principle. Claude Code is used as grounding evidence, not as the only possible implementation. If you're building an agent on a different stack, these patterns still apply.

**Also not:** A Claude Code user guide / prompt engineering tutorial / "agents 101" / model selection guide.

## Who Should Read This

Engineers building or extending:
- Coding-agent runtimes (like Claude Code, Codex CLI, Gemini CLI, Cursor, Windsurf)
- Custom agents and agent plugins
- Multi-agent orchestration systems
- Any production system where an LLM calls tools in a loop and needs to be reliable

## The Six Harness Layers

| # | Pattern | The Problem It Solves | Key Insight |
|---|---|---|---|
| 1 | [**Memory**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#1-memory) | "My agent forgets everything between sessions" | Separate *instruction memory* (human-curated) from *auto-memory* (agent-written) from *session extraction* (background-derived). Each has different trust, persistence, and review needs. |
| 2 | [**Skills**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#2-skills) | "I re-explain workflows every conversation" | Skills are lazy-loaded instruction sets. Discovery must be cheap (~1% of context window); full body loads only on activation. Front-load trigger language — tails get truncated. |
| 3 | [**Tools & Safety**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#3-tools-and-safety) | "I want tools powerful but not dangerous" | Default to fail-closed. Concurrency is per-call, not per-tool. The permission pipeline has *side effects* — it tracks denials, transforms modes, and updates state. |
| 4 | [**Context Engineering**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#4-context-engineering) | "My agent sees too much, too little, or the wrong thing" | Four operations: **select** (just-in-time loading), **write** (the learning loop), **compress** (reactive compaction), **isolate** (delegation boundaries). |
| 5 | [**Multi-agent**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#5-multi-agent-coordination) | "I need parallelism without chaos" | Three patterns: Coordinator (zero-inheritance), Fork (full-inheritance, single-level), Swarm (flat peer roster). The coordinator must *synthesize*, not delegate understanding. |
| 6 | [**Lifecycle**](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL#6-lifecycle-and-extensibility) | "I need hooks, background tasks, startup sequence" | Hook trust is all-or-nothing. Task eviction is two-phase. Bootstrap is dependency-ordered with trust as the critical inflection point. |

> [!TIP]
> Each pattern includes: **Problem** -> **Golden Rules** -> **Start Here** (actionable first step) -> **Tradeoffs** -> **Gotchas** -> **Claude Code Evidence**. Start with the "Choose Your Problem" table in [SKILL.md](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL).

## Deep-Dive References

11 reference documents, each following the same structure: Problem (universal) -> Golden Rules (portable) -> Implementation Patterns (no code) -> Gotchas -> Claude Code Evidence (natural language).

| Reference | Covers |
|---|---|
| [memory-persistence-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-memory-persistence-pattern) | Four-level instruction hierarchy, four-type auto-memory, background extraction with mutual exclusion |
| [skill-runtime-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-skill-runtime-pattern) | Four-source discovery, YAML frontmatter contract, budget-constrained listing, graceful degradation |
| [tool-registry-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-tool-registry-pattern) | Fail-closed builder, per-call concurrency, partition-sort-concatenate for cache stability |
| [permission-gate-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-permission-gate-pattern) | Single gate, three behaviors, strict layered evaluation, atomic claim for race-safe resolution |
| [agent-orchestration-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-agent-orchestration-pattern) | Mutual exclusion of modes, fork cache optimization, flat swarm topology, tool filtering layers |
| [context-engineering](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-pattern) | Index: select / compress / isolate sub-pattern routing |
| [select-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-select-pattern) | Promise memoization, three-tier progressive disclosure, manual cache invalidation |
| [compress-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-compress-pattern) | Truncation with recovery pointers, reactive compaction, snapshot labeling |
| [isolate-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-isolate-pattern) | Zero-inheritance default, single-level fork boundary, worktree-based filesystem isolation |
| [hook-lifecycle-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-hook-lifecycle-pattern) | Single dispatch, all-or-nothing trust, six hook types, exit-code discipline |
| [task-decomposition-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-task-decomposition-pattern) | Typed prefixed IDs, strict state machine, disk-backed output, two-phase eviction |
| [bootstrap-sequence-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-bootstrap-sequence-pattern) | Dependency-ordered init, trust-split env vars, memoized concurrent callers, fast-path dispatch |

## How This Was Built

> [!NOTE]
> Not by reading docs or guessing from external behavior.

1. **Deep exploration** — 4 parallel agents mapped the full source tree (~1,900 files)
2. **Source-grounded drafting** — 7 parallel agents each drafted one reference, tracing claims to source files
3. **Factual review** — 3 independent review rounds verified each claim against source code
4. **Abstraction uplift** — Implementation details pushed into "Evidence" sections; principles generalized to be runtime-portable
5. **UX audit** — Discoverability, audience fit, and principle-to-action gap reviewed from user perspective

For the full story — how Codex and Claude Code collaborated, the handoff protocol, what worked and what didn't — see **[Distillation Process](/lib/09-harness/agentic-harness-patterns-skill/docs-distillation-harness-practice)**.

## Installation

> [!TIP]
> Two skills available: `agentic-harness-patterns` (English) and `agentic-harness-patterns-zh` (Chinese). Install via the [Vercel Skills CLI](https://github.com/vercel-labs/skills) — works with Claude Code, Codex, and 40+ other agents.

```bash
npx skills add github:keli-wen/agentic-harness-patterns-skill
```

  <img src="/mirror/61/61a8868a08633fba50acffab2f831078f9d20404.webp" alt="npx skills add screenshot" width="720">

**Just reading:** Open [SKILL.md](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL) (EN) or [SKILL.md](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-SKILL) (ZH).

## Project Structure

```
agentic-harness-patterns/
├── README.md                                       # This file (EN)
├── README_ZH.md                                    # 中文版
├── LICENSE
└── skills/
    ├── agentic-harness-patterns/                   # English skill
    │   ├── SKILL.md
    │   ├── metadata.json
    │   └── references/                             # 11 deep-dive documents
    │       ├── memory-persistence-pattern.md
    │       ├── skill-runtime-pattern.md
    │       ├── permission-gate-pattern.md
    │       ├── agent-orchestration-pattern.md
    │       ├── tool-registry-pattern.md
    │       ├── hook-lifecycle-pattern.md
    │       ├── task-decomposition-pattern.md
    │       ├── bootstrap-sequence-pattern.md
    │       ├── context-engineering-pattern.md       # Index → 3 sub-files
    │       └── context-engineering/
    │           ├── select-pattern.md
    │           ├── compress-pattern.md
    │           └── isolate-pattern.md
    └── agentic-harness-patterns-zh/                # 中文 skill
        ├── SKILL.md                                # Chinese translation
        ├── metadata.json
        └── references/                             # Chinese references
            └── ...
```

## Roadmap

This skill currently covers patterns distilled from **Claude Code** — arguably the most mature open-source-available agent harness. The long-term goal is to build a unified, cross-runtime pattern library by analyzing additional production agent systems:

| Runtime | Status | Notes |
|---|---|---|
| **Claude Code** | Done | Current release — 6 chapters, 11 references |
| **Codex CLI** | Planned | OpenAI's agent CLI; distinct context and delegation model |
| **Gemini CLI** | Planned | Google's approach to tool orchestration and memory |
| **Unified synthesis** | Future | Cross-runtime patterns that survive all three implementations |

The hypothesis: patterns that independently emerge across Claude Code, Codex, and Gemini CLI are likely fundamental to the problem domain, not artifacts of any single team's design taste.

## Further Reading

For a deeper exploration of context engineering, see the author's blog [One Poem Suffices](https://keli-wen.github.io/One-Poem-Suffices/):

- [Context Engineering](https://keli-wen.github.io/One-Poem-Suffices/one-poem-suffices/context-engineering/) — conceptual framework and design space
- [Just-in-Time Context](https://keli-wen.github.io/One-Poem-Suffices/one-poem-suffices/just-in-time-context/) — principles and practices of on-demand context loading
- [Context Engineering from Codex](https://keli-wen.github.io/One-Poem-Suffices/thinking-in-context/context-engineering-from-codex/) — context engineering through the Codex lens

> A deep dive into context engineering in Claude Code is currently in progress.

## Related Work

- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic's own blog post on the harness concept
- [Claude Code source repository](https://github.com/anthropics/claude-code) — the source this analysis is based on
- [Vercel Skills CLI](https://github.com/vercel-labs/skills) — the `npx skills add` package manager

---

> [!WARNING]
> **Disclaimer:** These patterns were distilled by studying the [Claude Code source code](https://github.com/anthropics/claude-code) that was made publicly available. This project is **for educational and learning purposes only**. No proprietary source code is reproduced. All content represents independently extracted design principles expressed in the author's own words. Claude Code is a trademark of Anthropic, PBC.
