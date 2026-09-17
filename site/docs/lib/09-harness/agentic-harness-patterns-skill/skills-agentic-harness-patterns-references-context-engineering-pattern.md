---
title: "Context Engineering Pattern"
sourceId: "09-harness/agentic-harness-patterns-skill"
sourceTitle: "Agentic Harness Patterns（模式与技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill"
entryUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill/blob/17549f55b84a94b1ff647ae4711be600fe8ae12f/skills/agentic-harness-patterns/references/context-engineering-pattern.md"
sourceRel: "skills/agentic-harness-patterns/references/context-engineering-pattern.md"
rawUrl: "/raw/09-harness/agentic-harness-patterns-skill/skills/agentic-harness-patterns/references/context-engineering-pattern.md"
sourceSha256: "81cec8022910286a8831fea6947d93599943cd0d6b04f6718a112aededfdd944"
pageSha256: "81cec8022910286a8831fea6947d93599943cd0d6b04f6718a112aededfdd944"
contentMode: "local-full"
zh: ""
---

# Context Engineering Pattern

## The Problem

Without deliberate management, context windows fill with redundant or stale data on every turn. Rebuilding expensive context on each invocation adds latency. Exposing the full capability catalog up front bloats every prompt. Delegated sub-agents pollute their parent's context with intermediate state. These are inherent to any agent that persists across turns and delegates to sub-agents.

## The Four-Axis Framework

Context engineering decomposes into four concerns:

1. **Select** -- decide what enters the context window, when, and at what granularity.
2. **Write** -- the agent does not just consume context; it writes back to persistent storage, creating the learning loop.
3. **Compress** -- long sessions exhaust the window; truncation, compaction, and snapshot labeling recover budget.
4. **Isolate** -- delegated work must not pollute or corrupt the parent's context or filesystem.

### A note on "Write"

The write axis is a cross-cutting principle rather than a standalone pattern. Every axis involves write-back: selections are cached and invalidated, compression produces summaries that are stored, isolation boundaries return results that the parent integrates. The write-back loop -- auto-memory, session extraction, persisted permissions, task state updates -- is what transforms a stateless tool-caller into a learning system. It is covered as a design principle in the main skill definition rather than a separate sub-file.

## Sub-File Index

### [Select: Context Selection and Progressive Disclosure](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-select-pattern)
Lazy loading, three-tier progressive disclosure, promise memoization for concurrency, manual cache invalidation, token budgeting for capability discovery, canonical-path deduplication, and path-conditional activation.

### [Compress: Context Compression and Snapshot Management](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-compress-pattern)
Truncation with recovery pointers, reactive compaction triggered by fill ratio, snapshot labeling with staleness warnings, character and token caps on variable-length blocks, and recovery-pointer preservation across compaction passes.

### [Isolate: Context Isolation for Delegated Work](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-isolate-pattern)
Zero-inheritance workers, full-inheritance forks with single-level boundaries, filesystem isolation via worktrees, path translation injection, blast radius as the primary design criterion, and immutable shared state across concurrent agents.
