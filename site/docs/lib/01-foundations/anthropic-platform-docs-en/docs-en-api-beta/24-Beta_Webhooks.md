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
sourceRel: "docs/en/api/beta.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta.md"
sourceSha256: "900c0db6b0db3e91072554e88a119f3e5f95c420b9ca3216dcf298fa3f8e0f5b"
pageSha256: "49897eefa59fead25f530eedcbe15732fb8c3f8aaa6282961c790e410aabb7ea"
contentMode: "local-full"
zh: ""
---

## Beta › Webhooks

### Unwrap

Verifies the webhook signature from the `webhook-id`, `webhook-timestamp` and `webhook-signature`
headers using your webhook signing key, then parses the payload into an event. Fails if the
signature is missing or invalid.

### Parse Unverified

Parses a webhook payload into an event without verifying its signature. Prefer `unwrap()` unless
you have already verified the signature yourself.
