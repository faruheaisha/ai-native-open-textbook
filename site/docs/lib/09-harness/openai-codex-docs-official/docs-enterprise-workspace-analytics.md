---
title: "Workspace analytics"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/enterprise/workspace-analytics.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/enterprise/workspace-analytics.md"
sourceSha256: "0c39730a6c431aa07a77abc875e4d78e1427d8a1b5fe6eb6243891ee34fad4d5"
pageSha256: "0c39730a6c431aa07a77abc875e4d78e1427d8a1b5fe6eb6243891ee34fad4d5"
contentMode: "local-full"
zh: ""
---

# Workspace analytics

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use ChatGPT workspace analytics for broad workspace adoption. Use Codex
analytics for Codex-focused reporting. Use the Analytics API for programmatic
aggregates and the Compliance API for auditable records.

These reporting surfaces don't grant product access or set runtime policy. See
[Roles and workspace permissions](https://learn.chatgpt.com/docs/enterprise/roles-and-workspace-permissions)
for the administration boundaries.

## Choose a reporting surface

| Surface                     | Use it for                                                    | Contract owner                                                                                                         |
| --------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| ChatGPT workspace analytics | Interactive, workspace-wide adoption and engagement reporting | [Workspace analytics Help Center guidance](https://help.openai.com/en/articles/10875114)                               |
| Codex analytics             | Interactive reporting focused on Codex adoption and activity  | The authenticated [Codex analytics dashboard](https://admin.openai.com/analytics/codex)                                |
| Analytics API               | Programmatic, aggregated Codex reporting                      | The [Codex Analytics API reference](https://chatgpt.com/public/admin/api-reference#tag/Codex%20Enterprise%20Analytics) |
| Compliance API              | Audit, security, legal, and investigation records             | The [Admin API reference](https://chatgpt.com/public/admin/api-reference)                                              |

## Review ChatGPT workspace analytics

ChatGPT workspace analytics provides an interactive view of adoption and
engagement across supported workspace features. Availability, roles, dashboard
sections, freshness, privacy behavior, and export formats can change. Use
[Workspace analytics for ChatGPT Enterprise and Edu](https://help.openai.com/en/articles/10875114)
for current coverage and procedures.

Treat downloaded reports as identifiable organizational data.
Apply the organization's access, storage, and retention policy instead of
assuming that an export has the same privacy characteristics as an aggregated
dashboard.

## Review Codex analytics

The authenticated [Codex analytics dashboard](https://admin.openai.com/analytics/codex)
focuses on Codex reporting. Use it for interactive exploration, not as a stable
schema contract. Dashboard categories, fields, filters, and export formats can
change independently of this page.

For automated reporting, use the [Analytics API](https://learn.chatgpt.com/docs/enterprise/analytics-api)
and follow its API reference. For auditable records, use the
[Compliance API](https://learn.chatgpt.com/docs/enterprise/compliance-api).

## Interpret reporting data

Keep these boundaries in mind:

- ChatGPT workspace analytics and Codex analytics cover different product
  scopes.
- Aggregated analytics and audit records serve different purposes and have
  separate contracts.
- Analytics describes activity; it doesn't grant access or change runtime
  permissions.
- [ChatGPT usage limits and spend controls](https://learn.chatgpt.com/docs/enterprise/usage-limits) are
  a separate, plan-dependent workspace boundary.
