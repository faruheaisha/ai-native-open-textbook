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
pageSha256: "d9f0ab3ccde7e466ac11f34a116bcfde0c570a74167837417d6220dcf8169999"
contentMode: "local-full"
zh: ""
---

#### Return type: `ResolvedSettings`

`resolveSettings()` returns an object describing the merged settings and the source that contributed each key.

| Property     | Type                                                | Description                                                            |
| :----------- | :-------------------------------------------------- | :--------------------------------------------------------------------- |
| `effective`  | `Settings`                                          | Merged settings after applying all enabled sources in precedence order |
| `provenance` | `Partial<Record<keyof Settings, ProvenanceEntry>>`  | For each top-level key in `effective`, which source supplied the value |
| `sources`    | `Array<\{ source, settings, path?, policyOrigin? \}>` | Per-source raw settings, ordered from lowest to highest precedence     |
