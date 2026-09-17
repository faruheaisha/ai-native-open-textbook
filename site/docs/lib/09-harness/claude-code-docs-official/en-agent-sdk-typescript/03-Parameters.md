---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "5fe4b48e5c3fb8cb11428d72d5c7bbd4f608f2352e90be8f81481ce03c868f58"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter             | Type                  | Description                                                                                                                                                                    |
| :-------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`             | [`Options`](#options) | Optional configuration object. Same as the `options` parameter to `query()`                                                                                                    |
| `initializeTimeoutMs` | `number`              | Maximum time in milliseconds to wait for subprocess initialization. Defaults to `60000`. If initialization does not complete in time, the promise rejects with a timeout error |
