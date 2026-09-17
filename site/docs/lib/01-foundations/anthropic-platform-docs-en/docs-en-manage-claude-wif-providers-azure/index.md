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
pageSha256: "1656f5582bb90c1752b37f47b6160d8f0771c55d7ba1858032386c75accfaae3"
contentMode: "local-full"
zh: ""
---

Azure workloads authenticate to the Claude API by presenting a JSON Web Token (JWT) issued by Microsoft Entra ID, then exchanging it for a short-lived Anthropic access token. The setup follows the same shape on every Azure platform:

1. **Register the token audience:** Create one app registration in your Microsoft Entra tenant to represent the Claude API audience. Every workload in the tenant requests Entra tokens for it.
2. **Set up the identity for your platform:** A managed identity on VMs, VM Scale Sets, App Service, Functions, and Container Apps, or Entra Workload Identity on AKS.
3. **Configure Anthropic:** Register your tenant's Entra issuer, create a service account, and write a federation rule that matches the token's claims.
4. **Exchange at runtime:** Your workload exchanges its Entra-issued token at `POST /v1/oauth/token` for an `sk-ant-oat01-...` Anthropic access token and calls Claude with it.

On both paths the token you present to Anthropic carries your tenant-specific Entra issuer and the managed identity's object ID in the `sub` and `oid` claims; only how the workload obtains that token differs. Pick the section for where your workload runs: [Use a managed identity](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#use-a-managed-identity) for VMs, VM Scale Sets, App Service, Functions, or Container Apps; [Use Entra Workload Identity on AKS](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#use-entra-workload-identity-on-aks) for AKS.

## 本篇目录

- [Prerequisites](https://platform.claude.com/docs)
- [Register the token audience](https://platform.claude.com/docs)
- [Use a managed identity](https://platform.claude.com/docs)
- [Use Entra Workload Identity on AKS](https://platform.claude.com/docs)
- [If your tokens are v1.0](https://platform.claude.com/docs)
- [Scope your rule](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
