---
title: "Retrieve Message Batch results"
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
pageSha256: "2289712fa8f331c061027ab1fc7bbcad725594968444f8b94c7f4f525348abb4"
contentMode: "local-full"
zh: ""
---

# Retrieve Message Batch results

**GET** `/v1/messages/batches/\{message_batch_id\}/results`

Streams the results of a Message Batch as a `.jsonl` file.

Each line in the file is a JSON object containing the result of a single request in the Message Batch. Results are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests.

Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

## 本篇目录

- [Path parameters](https://platform.claude.com/docs)
- [Headers](https://platform.claude.com/docs)
- [Returns](https://platform.claude.com/docs)
- [Example](https://platform.claude.com/docs)
