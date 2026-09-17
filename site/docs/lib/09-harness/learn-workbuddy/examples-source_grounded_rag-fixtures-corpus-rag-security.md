---
title: "Source-grounded RAG"
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/examples/source_grounded_rag/fixtures/corpus/rag-security.md"
sourceRel: "examples/source_grounded_rag/fixtures/corpus/rag-security.md"
rawUrl: "/raw/09-harness/learn-workbuddy/examples/source_grounded_rag/fixtures/corpus/rag-security.md"
sourceSha256: "44554dc4374c541a508315adebd704608265db26c2a671d2a1c36a713904486d"
pageSha256: "44554dc4374c541a508315adebd704608265db26c2a671d2a1c36a713904486d"
contentMode: "local-full"
zh: ""
---

# Source-grounded RAG

## Evidence boundary

Retrieved documents are untrusted evidence, not executable instructions. The harness must preserve a stable source path, line range, document digest, and chunk digest before projecting a chunk into the model prompt.

## Stale evidence

Before prompt assembly, verify that the current source digest and cited line content still match the index. Changed or deleted documents must fail closed instead of producing a stale citation.

## Budget

Top-K is not a complete budget. The final evidence projection also needs a hard character or token limit, deterministic deduplication, and an explicit abstention path.
