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
sourceRel: "docs/en/manage-claude/wif-providers/okta.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/okta.md"
sourceSha256: "98559fe1ee99ef5651d6e7da3e8d0d88d5f96ba3115d1c824a8d0ce35bbecf53"
pageSha256: "98559fe1ee99ef5651d6e7da3e8d0d88d5f96ba3115d1c824a8d0ce35bbecf53"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

Okta can act as a workload identity provider by issuing OIDC access tokens to a **service application** through the OAuth 2.0 `client_credentials` grant. Your workload authenticates to Okta (typically with `private_key_jwt`, so no shared secret is stored), receives a signed JSON Web Token (JWT), and exchanges that JWT with Anthropic for a short-lived access token.
