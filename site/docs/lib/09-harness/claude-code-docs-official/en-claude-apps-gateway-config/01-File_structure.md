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
sourceRel: "en/claude-apps-gateway-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-config.md"
sourceSha256: "3257bfe37d57f4673a2bd0a0cd20daf9780ff3a718ac81280970d97368c04245"
pageSha256: "d7f12bf5a85b9fbff5b58d991126e756b1b07430ad8e823ebfb5a37391a8d670"
contentMode: "local-full"
zh: ""
---

## File structure

Five sections are [required](#required-sections). Every other section is [optional](#optional-sections), and an omitted section takes its defaults. Unknown keys fail boot, so a typo surfaces as a named error rather than a silently ignored setting.

**Required sections:**

* [`listen`](#listen): bind address, public URL, TLS termination
* [`oidc`](#oidc): your identity provider (IdP), including issuer, client, claim mapping, and who may sign in
* [`session`](#session): the bearer tokens the gateway mints, with secret and lifetime
* [`store`](#store): PostgreSQL, for device grants and rate-limit counters
* [`upstreams`](#upstreams): where inference goes, whether Anthropic, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry

**Optional sections:**

* [`admin`](#admin): Admin API auth and retention for spend limits
* [`enforcement`](#enforcement): spend-limit fail-open or fail-closed behavior
* [`pricing`](#pricing): contracted rates and a discount multiplier for the spend meter and for the cost figures developers see
* [`models`](#models) and `auto_include_builtin_models`: admin-curated model list and per-upstream IDs
* [`managed`](#managed): managed settings policies by IdP group
* [`telemetry`](#telemetry): OTLP forwarding to your observability stack
* [`access_control`, `limits`, `timeouts`, `rate_limits`](#http-tuning): IP allow/deny, request size caps, upstream time-to-first-byte, and per-IP sign-in limits
