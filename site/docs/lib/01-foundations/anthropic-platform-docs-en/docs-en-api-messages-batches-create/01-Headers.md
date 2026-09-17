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
sourceRel: "docs/en/api/messages/batches/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/messages/batches/create.md"
sourceSha256: "1484537f56045315ee878c01c6fb7c9a30535eb84d87cec482461abfa180a9ce"
pageSha256: "55835dd662c60c26bb51e90614c4a65ded5ea7abcde023b2354142f084c019ac"
contentMode: "local-full"
zh: ""
---

## Headers

- `"anthropic-user-profile-id": optional string`

  The user profile ID to attribute the requests in this batch to. Use when acting on behalf of a party other than your organization. Requires the `user-profiles` beta header. Applies to every request in the batch; an individual request whose `user_profile_id` body field conflicts with this header is errored.

- `"anthropic-workspace-id": optional string`
