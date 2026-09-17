---
title: "RunState Schema and Resume Boundary"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/references/runstate-schema.md"
sourceRel: ".agents/references/runstate-schema.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/references/runstate-schema.md"
sourceSha256: "464f2e0f3a515a958472f47d8ad0bcdcad444c610e4a35f0bad1ffee955404e1"
pageSha256: "464f2e0f3a515a958472f47d8ad0bcdcad444c610e4a35f0bad1ffee955404e1"
contentMode: "local-full"
zh: ""
---

# RunState Schema and Resume Boundary

Use this reference for changes involving `RunState` serialization, deserialization, approvals, trace state, sandbox state, agent identity, tool output payloads, or any persisted resume data.

## Compatibility Boundary

`RunState` is the durable SDK pause/resume boundary. Treat the serialized JSON shape as compatibility-sensitive once a schema version has shipped in a release.

- `to_json()` always emits `CURRENT_SCHEMA_VERSION`.
- `from_json()` must continue reading every version in `SUPPORTED_SCHEMA_VERSIONS`.
- Older SDKs intentionally reject newer or unsupported versions rather than attempting forward compatibility.
- Unreleased schema versions may be renumbered or squashed before release when intermediate snapshots are intentionally unsupported.
- Every supported version must have a non-empty one-line entry in `SCHEMA_VERSION_SUMMARIES`.

## When to Bump the Schema

Bump `CURRENT_SCHEMA_VERSION` when a serialized `RunState` snapshot changes in a way that affects resume correctness or would silently lose data when read under an older schema label.

Examples include:

- New persisted fields on `RunState`, `ModelResponse`, `ProcessedResponse`, interruptions, approvals, tool outputs, sandbox state, trace state, or agent-owned state.
- New run item, tool call, approval, or output item variants that can appear in serialized state.
- New SDK-only metadata needed to route, dedupe, approve, retry, or resume a tool call.
- A changed meaning for an existing serialized field.

Do not rely on current-reader tests alone. Add a regression that rewrites `$schemaVersion` to an older supported label when appropriate and proves the old label is accepted, rejected, or migrated deliberately.

## Identity and Routing State

Serialized state must preserve enough identity to resume without changing behavior:

- Agent identity must distinguish duplicate agent names in the same graph.
- Function tools should persist canonical lookup keys, including `bare`, `namespaced`, and `deferred_top_level`.
- Tool call IDs must remain provider-supplied strings; do not coerce arbitrary values into IDs.
- Approval decisions and rejection messages must restore against the same tool identity and call ID they originally targeted.
- The per-agent tool-use tracker must preserve stable duplicate-agent identity so tool-choice reset behaves the same after resume.
- Server-managed conversation identifiers must restore into `OpenAIServerConversationTracker` without replaying acknowledged input.

## Context and Secrets

Context serialization is intentionally conservative.

- Mapping contexts can round-trip directly.
- Custom contexts need explicit serializers and deserializers when exact restoration matters.
- Without a safe serializer, snapshots may record metadata and warnings rather than the raw object.
- Do not persist secrets in `RunContextWrapper.context`, trace data, tool outputs, or custom data unless the caller explicitly chose that durability boundary.

## Review Checklist

1. Identify every serialized field whose shape or meaning changes.
2. Decide whether the affected schema version is released or unreleased.
3. Update `CURRENT_SCHEMA_VERSION` and `SCHEMA_VERSION_SUMMARIES` when resume compatibility requires it.
4. Keep released schema versions readable, or fail with an explicit compatibility error if the old label cannot safely represent the new data.
5. Test `to_json()` output, `from_json()` restoration, string round-trips, and resumed execution through the public `Runner.run(...)` or `Runner.run_streamed(...)` path.

## Sources

- `src/agents/run_state.py`
- `src/agents/result.py`
- `src/agents/run_internal/agent_runner_helpers.py`
- `src/agents/run_internal/oai_conversation.py`
- `src/agents/run_internal/run_steps.py`
- `src/agents/run_internal/tool_execution.py`
- `tests/test_run_state.py`
