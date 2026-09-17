---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/messages/batches/results.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/batches/results.md"
sourceSha256: "851113a623a1aae3737dc35de8d61f201b2085da4f005971bb33d2a17403ddf4"
pageSha256: "a73f8c0348f8510ffbcfbe704412cb681fffa2e8af1c696b7516eb6a13f2cdac"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/results \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: message-batches-2024-09-24' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```
