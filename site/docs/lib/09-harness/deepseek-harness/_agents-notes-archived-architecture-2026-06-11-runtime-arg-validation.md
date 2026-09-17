---
title: "Agent Note: Runtime arg validation at the model boundary"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-06-11-runtime-arg-validation.md"
sourceRel: ".agents/notes/archived/architecture/2026-06-11-runtime-arg-validation.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-06-11-runtime-arg-validation.md"
sourceSha256: "19b8cc0fb42371aae27fb942a6d1ea31dacd59f46afb7eef1f2f2984487d5ec6"
pageSha256: "19b8cc0fb42371aae27fb942a6d1ea31dacd59f46afb7eef1f2f2984487d5ec6"
contentMode: "local-full"
zh: ""
---

# Agent Note: Runtime arg validation at the model boundary

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-06-11-runtime-arg-validation.zh)

## Problem

`defineTool` ([the unified schema DSL](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-20-unified-json-value-schema-dsl.md)) gives tool authors a typed `execute(args)` via the `InferArgs<S>` mapping. But that type is a compile-time claim about a value that arrives at runtime as model-generated JSON: nothing forced the model to honor the schema, so a malformed call — missing a required key, a string where a number was declared, or a literal outside the declared set — reached `execute` typed-in-name-only. The tool body then either crashed on the bad shape or silently misbehaved.

## Decision

`validateArgs(spec, args): string[]` compiles a `ParameterSchemaSpec` and delegates to the shared `validateJsonSchemaValue()` walker, returning human-readable violations for a well-formed declaration. `defineTool` snapshots the compiled parameter schema at definition time and runs that validation before the typed body; violations throw `ToolArgsError` (`INVALID_ARGS`), which the registry returns as an error result the model can correct.

The validator and compiler therefore share exact semantics: the implicit parameter root is an open object; required keys come only from `required: true`; defaults remain annotations; explicit nested objects honor their declared openness; arrays recurse through `items`; scalar literal constraints are type-correct; and `oneOf` accepts exactly one matching branch. Raw-registered tools own their input validation.

## Consequences

- The model gets actionable feedback on its own malformed calls instead of an opaque crash, closing the gap between `InferArgs`'s promise and runtime reality.
- The validator and `InferArgs` must stay in agreement; [a property test](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/testing/2026-06-11-property-based-testing.md) generates args satisfying a spec and asserts they pass `validateArgs` (with targeted corruptions rejected), closing that drift risk mechanically.
- `ToolArgsError` subclasses `HarnessError` from the [structured error taxonomy](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-06-11-structured-error-taxonomy), keeping its `code` field; callers that read `.message` are unaffected by the hierarchy.
- Validation cost is negligible next to a model call.
