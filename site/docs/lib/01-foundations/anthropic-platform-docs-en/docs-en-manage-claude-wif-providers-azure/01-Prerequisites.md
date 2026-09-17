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
pageSha256: "9c25c63ecf91a674c4a6fb6e2e5bd6fdc230a837835958b0b7be3db60ba824db"
contentMode: "local-full"
zh: ""
---

## Prerequisites

* Familiarity with [WIF concepts](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation#concepts): service accounts, federation issuers, and federation rules.
* An Azure subscription with permission to assign managed identities (or configure Entra Workload Identity on AKS).
* Permission to create one app registration and service principal in your Microsoft Entra tenant (the shared Claude API audience). Entra only issues tokens for an audience that exists in the tenant, so the [Register the token audience](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#register-the-token-audience) step is required before any token request succeeds.
* Your Microsoft Entra tenant ID. Find it in the Azure portal under **Microsoft Entra ID → Overview → Tenant ID**.
* Permission to create service accounts, federation issuers, and federation rules in the Claude Console for your Anthropic organization.
