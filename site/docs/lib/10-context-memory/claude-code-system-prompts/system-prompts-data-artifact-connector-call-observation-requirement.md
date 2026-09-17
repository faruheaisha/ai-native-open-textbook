---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-artifact-connector-call-observation-requirement.md"
sourceRel: "system-prompts/data-artifact-connector-call-observation-requirement.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-artifact-connector-call-observation-requirement.md"
sourceSha256: "fef399549f2979ca03ce52c3f2a865c3b49a26e9be889bdfa79f36399f843fc9"
pageSha256: "fef399549f2979ca03ce52c3f2a865c3b49a26e9be889bdfa79f36399f843fc9"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The type definitions cover only the call envelope — they do not tell you a connector tool's argument names or its result encoding. Never publish a page that calls a connector tool without having observed one real request/response pair for that tool in this session; if you cannot safely observe one (for example, the connector is unauthenticated here, or calling the tool would have side effects), say that explicitly to the user at publish time — in your reply, not as a note inside the published page — instead of shipping a guessed shape. Observed response payloads are the user's real data: learn the shape from them, but never embed the observed values in the published page as sample or placeholder data.
