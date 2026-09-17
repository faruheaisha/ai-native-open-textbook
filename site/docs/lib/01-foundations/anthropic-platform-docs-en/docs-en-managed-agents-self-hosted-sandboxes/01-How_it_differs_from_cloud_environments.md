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
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "b4e3513c9fae41a2e82a64ea838bc54a42544f32ab895c5219b396a3c9a3a6c8"
contentMode: "local-full"
zh: ""
---

## How it differs from cloud environments

|                               | Cloud environment                      | Self-hosted sandbox                                       |
| ----------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Where tools run               | Anthropic-managed sandboxes            | Your infrastructure                                       |
| Network reach                 | Anthropic's egress controls            | Your network policy                                       |
| File and GitHub repo mounting | Managed by Anthropic                   | Managed by you                                            |
| Memory stores                 | Mounted by Anthropic at `/mnt/memory/` | Downloaded to `/mnt/memory/` and synced by the SDK worker |
| Lifecycle                     | Managed by Anthropic                   | Managed by you                                            |

Self-hosting is a good fit when the agent needs to operate on data that cannot leave your network boundary, reach internal services that are not publicly routable, or run under your organization's own compliance and audit controls.

For Zero Data Retention and HIPAA BAA eligibility, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#feature-eligibility).
