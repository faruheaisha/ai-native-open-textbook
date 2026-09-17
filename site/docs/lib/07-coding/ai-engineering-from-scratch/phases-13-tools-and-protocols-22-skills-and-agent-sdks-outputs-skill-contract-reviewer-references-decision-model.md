---
title: "Primitive decision model"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/decision-model.md"
sourceRel: "phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/decision-model.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/22-skills-and-agent-sdks/outputs/skill-contract-reviewer/references/decision-model.md"
sourceSha256: "9bfc0dc27efd2d249532d774e3a3a92c88fff57dead1f682207093f5ef320804"
pageSha256: "9bfc0dc27efd2d249532d774e3a3a92c88fff57dead1f682207093f5ef320804"
contentMode: "local-full"
zh: ""
---

# Primitive decision model

Select by responsibility. More than one primitive may be correct.

| Need | Primitive | Boundary |
|---|---|---|
| One-off instruction | Prompt | Exists for the current interaction |
| Repository-wide default | AGENTS.md | Applies while working in that repository scope |
| Reusable task method | Agent Skill | Loads procedural knowledge for a task |
| External operation or data | MCP tool | Exposes a callable capability with an input contract |
| Reaction to a runtime event | Hook | Runs at a host-defined lifecycle point |
| Deterministic transformation | Ordinary code | Produces repeatable output without model judgment |
| Isolated or parallel context | Subagent | Delegates a bounded task into a separate context window |

A release-review method that queries a remote service may use both an Agent Skill and an MCP tool. Repository test conventions may add AGENTS.md. A post-tool audit may add a hook. Stable parsing belongs in ordinary code. Independent research that benefits from context isolation may use a subagent.
