---
title: "Product Docs"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/product/README.md"
sourceRel: "docs/product/README.md"
rawUrl: "/raw/09-harness/repository-harness/docs/product/README.md"
sourceSha256: "463441ca9b77d8ae5cbb40fd653277496b005447f98f77d6f3bc3ca51195a65b"
pageSha256: "463441ca9b77d8ae5cbb40fd653277496b005447f98f77d6f3bc3ca51195a65b"
contentMode: "local-full"
zh: ""
---

# Product Docs

This directory contains current consumer-product behavior derived from real
accepted intent. Harness deliberately ships no fake product domains.

When a user provides a product specification, derive smaller living documents
here instead of keeping one growing specification as the operating manual. Name
files after actual product domains, such as `overview.md`, `billing.md`,
`permissions.md`, or `api-conventions.md`.

## Current Product Contract

No consumer-specific product contract is shipped in this generic directory.
The upstream `repository-harness` contract lives in the root README, current
workflow and architecture documents, lasting decisions, implementation, and
executable tests.

## Update Rule

When behavior changes:

1. Update the affected product document when the expected behavior changed.
2. Update the active execution plan when complex work uses one.
3. Add a lasting decision only when future work must inherit a consequential
   product, architecture, data, security, compatibility, or validation choice.
4. Add or update executable proof that exercises the behavior.

Bounded changes do not require a parallel lifecycle record.
