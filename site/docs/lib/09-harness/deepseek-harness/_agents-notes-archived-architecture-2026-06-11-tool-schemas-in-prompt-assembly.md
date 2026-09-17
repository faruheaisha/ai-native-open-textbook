---
title: "Agent Note: Tool schemas are part of the system-prompt assembly"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-06-11-tool-schemas-in-prompt-assembly.md"
sourceRel: ".agents/notes/archived/architecture/2026-06-11-tool-schemas-in-prompt-assembly.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-06-11-tool-schemas-in-prompt-assembly.md"
sourceSha256: "6f7b7f15f53f857ccb8477b3fdf65bf2de3a6f96acd93049c03ce4aff1629538"
pageSha256: "6f7b7f15f53f857ccb8477b3fdf65bf2de3a6f96acd93049c03ce4aff1629538"
contentMode: "local-full"
zh: ""
---

# Agent Note: Tool schemas are part of the system-prompt assembly

Status: implemented
Archived: 2026-07-27

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-06-11-tool-schemas-in-prompt-assembly.zh)

## Problem

On the wire, tool schemas travel in a dedicated `tools` field of the model request, not in prompt text. Architecturally, though, "what the model is told it can do" is one coherent concern: prompt sections and the tool list are assembled from the same plugin contributions and consumed at the same moment.

## Decision

`PromptAssembly \{ sections, tools \}`: the system-prompt service collects ordered text sections AND tool schemas (the tool registry auto-contributes a provider). The loop consumes one assembly per step; adapters map `sections` to the provider's system slot and `tools` to the wire `tools` field. The `system-prompt/assemble` waterfall is therefore a single interception point for everything the model is told up front — tool filtering (ToolSearch / progressive disclosure) is an assembly rewrite, same as prompt edits.

## Alternatives considered

**The loop queries the tool registry separately from the prompt service** — splits one coherent concern across two seams, and every interception that wants to shape "what the model is told" (tool filtering, plan mode) would need two listeners on two surfaces instead of one assembly rewrite.

## Consequences

- One waterfall governs the model's standing context; plugins like plan mode can swap prompt text and visible tools in one listener.
- The assembly interface is merge-extensible for future slots (no untyped `extras` bag — extension is declaration merging).
- Slight conceptual surprise (schemas in a "prompt" service) is documented here and in the package README.
