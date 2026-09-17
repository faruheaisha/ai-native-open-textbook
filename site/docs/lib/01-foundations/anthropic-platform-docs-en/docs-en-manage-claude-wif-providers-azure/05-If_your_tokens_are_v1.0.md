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
sourceRel: "docs/en/manage-claude/wif-providers/azure.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/azure.md"
sourceSha256: "952202dd6887403d9a88e6fd385834a36f495c73cd33536fe2d20c2acfccfa6a"
pageSha256: "b746c6636c10184a4b1cc96ee447c1a416077d70c2e0685209f6880bd9b10aa3"
contentMode: "local-full"
zh: ""
---

## If your tokens are v1.0

This guide configures the audience app registration with `api.requestedAccessTokenVersion: 2`, so every token it shows is v2.0. If you reuse an existing registration that leaves `requestedAccessTokenVersion` unset, Entra issues v1.0 tokens instead. Decode a sample token and check its `ver` claim; if it is `1.0`, four things change:

* **Issuer:** The `iss` claim is `https://sts.windows.net/<TENANT_ID>/` instead of `https://login.microsoftonline.com/<TENANT_ID>/v2.0`. Register the issuer URL exactly as your token's `iss` claim carries it. The two URLs share the same JWKS, so discovery mode works for either.
* **Wizard selector:** Pick **v1 (sts.windows.net)** in the Connect workload wizard's **Token issuer** selector instead of **v2.0 (login.microsoftonline.com)**.
* **Audience:** The `aud` claim is the identifier URI you passed as `resource` (for example, `api://<APP_ID>`), not the registration's client ID. Set the federation rule's `audience` to the exact `aud` value from your decoded token.
* **Client ID claim:** The calling identity's client ID appears in `appid`, not `azp`. The two claims never appear in the same token, so a rule that matches on `azp` never passes against a v1.0 token.

The `oid`, `sub`, and `tid` claims carry the same values in both versions, so the rest of this guide applies unchanged.
