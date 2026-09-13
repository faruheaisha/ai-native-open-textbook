---
title: "Authoring Rules and Metrics"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/README.md"
zh: ""
---

# Authoring Rules and Metrics

Detection rules and metrics are the primary extensibility surface of AI Engineer Coach. Every rule
and metric is a self-contained markdown file with YAML frontmatter and a small DSL — no code changes
required to ship a new one.

This guide covers contributing a built-in rule or metric to this repository. For the in-extension
authoring flow (live-test, threshold sliders, AI-assisted drafting), see the
[Rule Editor guide](https://microsoft.github.io/AI-Engineering-Coach/improve/rule-editor/).

## Where rules and metrics live

| Layer | Location | Trust | Use when |
|---|---|---|---|
| Built-in | [`src/core/rules/`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/README.md), [`src/core/metrics/`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/README.md) | Trusted | Contributing a rule for everyone via this repo |
| Personal | `~/.ai-engineer-coach/rules/`, `~/.ai-engineer-coach/metrics/` | Prompted on first load | Private rules shared across all your workspaces |
| Project | `<workspace>/.ai-engineer-coach/rules/`, `<workspace>/.ai-engineer-coach/metrics/` | Prompted on first load | Workspace-specific rules checked into a repo |

Personal and project rules follow the same file format as built-in rules but are loaded at runtime
through the trust gate in [`src/core/rule-trust.ts`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rule-trust.ts).

For the full DSL reference — field schema, function catalog, and metric primitives — open the
**DSL Reference** modal inside the extension (Rule Editor → DSL Reference) or the
[Rule Playground](https://microsoft.github.io/AI-Engineering-Coach/improve/rule-playground/).

## Anatomy of a rule
