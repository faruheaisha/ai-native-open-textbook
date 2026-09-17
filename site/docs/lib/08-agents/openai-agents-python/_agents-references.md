---
title: "SDK Maintainer References"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/references/README.md"
sourceRel: ".agents/references/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/references/README.md"
sourceSha256: "eca16af11e88a46e5ec721e5d1975c5cd8bf69003a388db44312856984a65111"
pageSha256: "eca16af11e88a46e5ec721e5d1975c5cd8bf69003a388db44312856984a65111"
contentMode: "local-full"
zh: ""
---

# SDK Maintainer References

This directory captures long-lived implementation contracts of the OpenAI Agents Python SDK that are not replaceable by OpenAI API or platform facts from the Developer Docs MCP. The repo's `docs/` remain an SDK-specific behavioral contract; these references distill the ownership, compatibility, ordering, and failure semantics that maintainers need to preserve that contract.

## Usage

Read the reference map before changing or reviewing an affected runtime boundary, then open only the files relevant to that boundary. During issue and PR review, treat this directory as read-only background: use it to identify expected invariants, adjacent surfaces, and regression risks, but verify the current claim against the remote issue or PR, current code, tests, docs, release boundary, and focused runtime evidence. Do not edit references as a side effect of a review or treat them as proof of current issue status, PR behavior, or repository readiness.

When implementation or dedicated repository-maintenance work establishes a reusable invariant that remains valid beyond one issue or PR, update the narrowest owning reference separately. Preserve the generalized contract, not the case history or decision outcome that revealed it.

## Inclusion Criteria

Add or retain a reference when the knowledge is SDK-specific, stable across multiple releases, easy to violate from one local code path, and expensive to reconstruct from source, tests, and repo docs during every review. Treat `docs/` as the SDK's user-facing behavioral contract; use these references to preserve the implementation constraints behind that contract. Prefer invariants and ownership rules over summaries of individual issues, PRs, or recent fixes.

Do not store current issue or PR status, generic maintainer-review workflow, release notes, OpenAI API or platform behavior available through `$openai-knowledge`, or one-off implementation details in this directory. Put review methodology under `.agents/skills/`, released migration notes in `docs/release.md`, and API or platform facts behind `$openai-knowledge`.

## Reference Map

| Reference | Read before changing or reviewing |
|---|---|
| [Agent definition and run context](/lib/08-agents/openai-agents-python/_agents-references-agent-definition-and-run-context) | Agent fields, cloning, dynamic instructions, enabled tools or handoffs, context wrappers, usage, or public agent identity |
| [Runner lifecycle](/lib/08-agents/openai-agents-python/_agents-references-runner-lifecycle) | Turn accounting, guardrails, handoffs, interruptions, cancellation, or streaming parity |
| [Run item lifecycle](/lib/08-agents/openai-agents-python/_agents-references-run-item-lifecycle) | Model output processing, new item types, stream events, replay conversion, session persistence, or RunState serialization |
| [Function and output schema](/lib/08-agents/openai-agents-python/_agents-references-function-and-output-schema) | Function-tool signatures and metadata, strict JSON schema conversion, or structured output types |
| [Conversation state ownership](/lib/08-agents/openai-agents-python/_agents-references-conversation-state-ownership) | Sessions versus server-managed continuation, input deltas, retries, compaction, or conversation resume |
| [Session persistence](/lib/08-agents/openai-agents-python/_agents-references-session-persistence) | Session input callbacks, per-turn saves, retry rewind, atomicity, or compaction replacement |
| [RunState schema and resume boundary](/lib/08-agents/openai-agents-python/_agents-references-runstate-schema) | Serialized state, schema versions, approvals, agent identity, or durable resume data |
| [Tool identity and routing](/lib/08-agents/openai-agents-python/_agents-references-tool-identity) | Tool names, namespaces, lookup, approvals, MCP naming, handoffs, or call IDs |
| [Tool execution lifecycle](/lib/08-agents/openai-agents-python/_agents-references-tool-execution-lifecycle) | Function-tool planning, approvals, guardrails, concurrency, cancellation, timeouts, or failure conversion |
| [Local MCP server lifecycle](/lib/08-agents/openai-agents-python/_agents-references-local-mcp-server-lifecycle) | Local MCP connection ownership, manager state, request serialization, caching, filtering, retries, or cleanup |
| [Model and provider boundaries](/lib/08-agents/openai-agents-python/_agents-references-model-provider-boundaries) | Model resolution, provider adapters, feature capability, request conversion, terminal events, or retries |
| [Tracing lifecycle](/lib/08-agents/openai-agents-python/_agents-references-tracing-lifecycle) | Trace and span context, processors, export, flush, shutdown, resume, or sensitive data |
| [Realtime session lifecycle](/lib/08-agents/openai-agents-python/_agents-references-realtime-session-lifecycle) | Realtime listeners, connections, background tasks, handoffs, event iteration, or cleanup |
| [Realtime tracing architecture](/lib/08-agents/openai-agents-python/_agents-references-realtime-tracing) | Realtime API server traces versus Agents SDK client traces |
| [Voice pipeline lifecycle](/lib/08-agents/openai-agents-python/_agents-references-voice-pipeline-lifecycle) | VoicePipeline STT/workflow/TTS ownership, event and audio ordering, stream cleanup, PCM framing, or tracing |
| [Sandbox runtime boundary](/lib/08-agents/openai-agents-python/_agents-references-sandbox-runtime-boundary) | Sandbox session ownership, preparation, resume state, manifests, materialization, or cleanup |

## Maintenance Rules

Keep each rule in the narrowest reference that owns it. Cross-link instead of copying detailed rules between files. Describe current architecture and compatibility boundaries, not the chronology of how a bug was found. Use source paths and durable public contracts as anchors, and remove or rewrite guidance when ownership moves.
