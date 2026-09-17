---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/publications/metadata-schema.mdx"
sourceRel: "publications/metadata-schema.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/publications/metadata-schema.mdx"
sourceSha256: "affc7c31c83cdc1b87eab679f4892dcb7412068c09df1ca26a612127087f1d1e"
pageSha256: "affc7c31c83cdc1b87eab679f4892dcb7412068c09df1ca26a612127087f1d1e"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

Use this schema as the baseline metadata contract for lab pages that need
publication extensions.

## Core fields

- `owner`: page owner or responsible editor
- `updated`: last meaningful content update date
- `depth`: expected depth such as `foundational`, `intermediate`, or `advanced`
- `region_tags`: regional scope tags such as `global`, `china`, or `enterprise`
- `coding_required`: `no`, `optional`, or `yes`
- `external_readings`: outbound articles, posts, or companion pieces

## Example

```yaml
title: Deep Research Agents
owner: Prompthon IO
updated: 2026-04-20
depth: advanced
region_tags:
  - global
  - china
coding_required: optional
external_readings:
  - title: Example companion article
    url: https://example.com/article
```
