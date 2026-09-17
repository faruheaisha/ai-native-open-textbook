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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-published-model-catalog-seed-guidance.md"
sourceRel: "system-prompts/data-published-model-catalog-seed-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-published-model-catalog-seed-guidance.md"
sourceSha256: "3a24ca077b9411c79ab191aa95ceda66bf449c8af9df9c518416aab27b94f6d7"
pageSha256: "3a24ca077b9411c79ab191aa95ceda66bf449c8af9df9c518416aab27b94f6d7"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Compiled-in seed of the published model-catalog document (utils/model/servedCatalog/published/seed.ts): what a session reads until its first fetch of https://downloads.claude.ai/model-catalog/v1/catalog.json has been cached. HAND-BUILT for now from the public ids in model-catalog.json, in the document's envelope shape; a bot PR will refresh this file from the published document once the publisher is live, so do not hand-edit rows here on a model launch — the hosted document is what launches a model, this file only has to be valid and public. Version 0 is the floor below which no published document is accepted.
