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
sourceRel: "docs/en/manage-claude/wif-providers/spiffe.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/spiffe.md"
sourceSha256: "055df84499a3fed79aaac796e16518eda93a2ce3d7c48a9f92270dbd1b7cdd94"
pageSha256: "055df84499a3fed79aaac796e16518eda93a2ce3d7c48a9f92270dbd1b7cdd94"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

[SPIFFE](https://spiffe.io/) is the CNCF standard for issuing identity to workloads. [SPIRE](https://spiffe.io/docs/latest/spire-about/) is its open-source reference implementation, and several commercial products also issue SPIFFE-conformant identities. Anthropic federates with any SPIFFE implementation that emits OIDC-compatible JWT-SVIDs. For a current list of implementations, see [Commercial software that implements SPIFFE](https://spiffe.io/docs/latest/spiffe-about/overview/#commercial-software-that-implements-spiffe) on the SPIFFE project site.

Federation works either through an OIDC discovery document at a public HTTPS URL (`discovery` mode, subject to the [URL constraints](https://platform.claude.com/docs/en/manage-claude/wif-reference#url-fields)) or by registering the JWKS directly (`inline` mode).

The JWT-SVID spec defines `sub` as the workload's SPIFFE ID, and the SPIFFE Workload API requires the caller to supply `aud` at fetch time, so those claims are the same across implementations. Anthropic additionally requires `iss` and `iat`, neither of which the JWT-SVID spec mandates, so configure your implementation to populate both (in SPIRE, `iss` is the `jwt_issuer` server setting and `iat` is set automatically). With those in place, the [Configure Anthropic](https://platform.claude.com/docs/en/manage-claude/wif-providers/spiffe#configure-anthropic), [Acquire and use the token](https://platform.claude.com/docs/en/manage-claude/wif-providers/spiffe#acquire-and-use-the-token), and [Scope your rule](https://platform.claude.com/docs/en/manage-claude/wif-providers/spiffe#scope-your-rule) sections of this guide apply to any SPIFFE implementation.
