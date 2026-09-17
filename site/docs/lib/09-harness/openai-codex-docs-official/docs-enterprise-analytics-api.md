---
title: "Analytics API"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/enterprise/analytics-api.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/enterprise/analytics-api.md"
sourceSha256: "98c6a495f558053d75df9bec82cda7a7ecfbcb9379fe2b98fc71b69c8657f9ba"
pageSha256: "98c6a495f558053d75df9bec82cda7a7ecfbcb9379fe2b98fc71b69c8657f9ba"
contentMode: "local-full"
zh: ""
---

# Analytics API

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

The Codex Analytics API provides aggregated Codex usage and activity metrics for
a ChatGPT workspace.

The [Codex Analytics API reference](https://chatgpt.com/public/admin/api-reference#tag/Codex%20Enterprise%20Analytics)
is the source of truth for current access requirements, routes, request and
response schemas, metrics, time semantics, and pagination.

## When to use the Analytics API

The Analytics API is appropriate when you need to:

- Automate recurring Codex reporting.
- Join aggregated Codex metrics with internal organizational data.
- Build a controlled reporting layer for approved audiences.
- Avoid coupling an integration to an interactive dashboard.

It's not a raw audit-log interface. Use the
[Compliance API](https://learn.chatgpt.com/docs/enterprise/compliance-api) when the workflow requires
auditable activity records.

## Confirm the administration boundaries

Analytics API results are scoped to a ChatGPT workspace, but requests
authenticate with a Platform organization API key. The key's organization must
match the organization associated with the workspace.

The API reference owns current key provisioning, scope requirements,
routes, schemas, fields, time semantics, and pagination behavior. This page
doesn't duplicate that contract.

## Related docs

- [Workspace analytics](https://learn.chatgpt.com/docs/enterprise/workspace-analytics)
- [Admin rollout guide](https://learn.chatgpt.com/docs/enterprise/admin-setup)
- [Governance](https://learn.chatgpt.com/docs/enterprise/governance)
- [Compliance API](https://learn.chatgpt.com/docs/enterprise/compliance-api)
