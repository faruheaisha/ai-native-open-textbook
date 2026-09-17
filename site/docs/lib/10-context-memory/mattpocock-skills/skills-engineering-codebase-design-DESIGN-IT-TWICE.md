---
title: "Design It Twice"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "Matt Pocock Skills（工程技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/codebase-design/DESIGN-IT-TWICE.md"
sourceRel: "skills/engineering/codebase-design/DESIGN-IT-TWICE.md"
rawUrl: "/raw/10-context-memory/mattpocock-skills/skills/engineering/codebase-design/DESIGN-IT-TWICE.md"
sourceSha256: "8e740bf98446dbd4dfdc132ac4346d9a7eedaf93de6a495889171cf7f99f16bd"
pageSha256: "8e740bf98446dbd4dfdc132ac4346d9a7eedaf93de6a495889171cf7f99f16bd"
contentMode: "local-full"
zh: ""
---

# Design It Twice

When the user wants to explore alternative interfaces for a chosen deepening candidate, use this parallel sub-agent pattern. Based on "Design It Twice" (Ousterhout): your first idea is unlikely to be the best.

Uses the vocabulary in [SKILL.md](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-SKILL): **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Before spawning sub-agents, write a user-facing explanation of the problem space for the chosen candidate:

- The constraints any new interface would need to satisfy
- The dependencies it would rely on, and which category they fall into (see [DEEPENING.md](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-DEEPENING))
- A rough illustrative code sketch to ground the constraints, not a proposal, just a way to make the constraints concrete

Show this to the user, then immediately proceed to Step 2. The user reads and thinks while the sub-agents work in parallel.

### 2. Spawn sub-agents

Spawn 3+ sub-agents in parallel. Each must produce a **radically different** interface for the deepened module.

Prompt each sub-agent with a separate technical brief (file paths, coupling details, dependency category from [DEEPENING.md](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-DEEPENING), what sits behind the seam). The brief is independent of the user-facing problem-space explanation in Step 1. Give each agent a different design constraint:

- Agent 1: "Minimize the interface: aim for 1–3 entry points max. Maximise leverage per entry point."
- Agent 2: "Maximise flexibility: support many use cases and extension."
- Agent 3: "Optimise for the most common caller: make the default case trivial."
- Agent 4 (if applicable): "Design around ports & adapters for cross-seam dependencies."

Include both [SKILL.md](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-SKILL) vocabulary and CONTEXT.md vocabulary in the brief so each sub-agent names things consistently with the architecture language and the project's domain language.

Each sub-agent outputs:

1. Interface (types, methods, params, plus invariants, ordering, error modes)
2. Usage example showing how callers use it
3. What the implementation hides behind the seam
4. Dependency strategy and adapters (see [DEEPENING.md](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-DEEPENING))
5. Trade-offs: where leverage is high, where it's thin

### 3. Present and compare

Present designs sequentially so the user can absorb each one, then compare them in prose. Contrast by **depth** (leverage at the interface), **locality** (where change concentrates), and **seam placement**.

After comparing, give your own recommendation: which design you think is strongest and why. If elements from different designs would combine well, propose a hybrid. Be opinionated: the user wants a strong read, not a menu.
