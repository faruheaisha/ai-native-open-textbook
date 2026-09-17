---
title: "azure-monitor-query-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/non-hero-scenarios.md"
sourceSha256: "0a34c80f2b7525a4ec0d504701e8b075cb630121c83c9b4761b82e8ad0f91e5b"
pageSha256: "0a34c80f2b7525a4ec0d504701e8b075cb630121c83c9b4761b82e8ad0f91e5b"
contentMode: "local-full"
zh: ""
---

# azure-monitor-query-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Client Types

| Client | Purpose |
|--------|---------|
| `LogsQueryClient` | Query Log Analytics workspaces |
| `MetricsQueryClient` | Query Azure Monitor metrics |
