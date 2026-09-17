---
title: "Agent Note: Custom typed tool-schema DSL instead of schemastery"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-06-11-custom-schema-dsl.md"
sourceRel: ".agents/notes/archived/architecture/2026-06-11-custom-schema-dsl.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-06-11-custom-schema-dsl.md"
sourceSha256: "71286f2676f8b47d0bd56c6cc43cf8102946e6d195942860a5810b9c534d2b2b"
pageSha256: "71286f2676f8b47d0bd56c6cc43cf8102946e6d195942860a5810b9c534d2b2b"
contentMode: "local-full"
zh: ""
---

# Agent Note: Custom typed tool-schema DSL instead of schemastery

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-06-11-custom-schema-dsl.zh)

## Problem

Tool parameters must reach the model as standard JSON Schema while giving tool authors typed `execute(args)` without casts. Schemastery already serves plugin config, but the tool-author API needs per-property `required: true` booleans rather than JSON Schema's separate `required` array.

## Decision

This decision is superseded by the [unified JSON-value schema DSL](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-20-unified-json-value-schema-dsl.md), which retains the small authoring surface while making parameters and typed values share one vocabulary. `ParameterSchemaSpec` keeps per-property `required: true`; `InferArgs<S>` maps required keys to non-optional properties; `parameterSchemaSpecToJsonSchema()` compiles the implicit open object root; and `defineTool()` ties inference, compilation, and validation together. Raw JSON-Schema `ToolDefinition`s remain accepted by `ToolRegistry.register()` for MCP and other external tools.

## Alternatives considered

**Schemastery** (already vendored, used for plugin Config) was evaluated and rejected for this use: it targets validation / transformation against StandardSchema, not JSON Schema *generation*, so it would add indirection without producing the wire format cleanly.

## Consequences

- First-party tool authors get zero-cast typed args; the type gymnastics cost stays inside the core package (sanctioned by the AGENTS.md type-safety policy).
- The owning unified note defines the current nodes, literal constraints, unions, JSON-value boundary, and object-openness rules.
- The `InferArgs` mapping is regression-tested at the type level after an early optionality bug.
