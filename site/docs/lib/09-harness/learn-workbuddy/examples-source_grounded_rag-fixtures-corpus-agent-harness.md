---
title: "Agent Harness Operations"
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/examples/source_grounded_rag/fixtures/corpus/agent-harness.md"
sourceRel: "examples/source_grounded_rag/fixtures/corpus/agent-harness.md"
rawUrl: "/raw/09-harness/learn-workbuddy/examples/source_grounded_rag/fixtures/corpus/agent-harness.md"
sourceSha256: "0c407fb73ec961c083a4ec3d7abfcd1148e2aab7fdf87cab6e917938ff92116e"
pageSha256: "0c407fb73ec961c083a4ec3d7abfcd1148e2aab7fdf87cab6e917938ff92116e"
contentMode: "local-full"
zh: ""
---

# Agent Harness Operations

## Permission gate

Every tool call passes through a before-tool hook. The hook checks the declared tool name, normalized arguments, workspace scope, and the current user grant before execution.

Delete and publish operations require explicit approval. A relevance score never grants permission, and denied calls still emit an audit event.

## Audit trail

The after-tool hook records the result status and a bounded summary. Large outputs are stored as artifacts and referenced by digest instead of being copied into the transcript.
