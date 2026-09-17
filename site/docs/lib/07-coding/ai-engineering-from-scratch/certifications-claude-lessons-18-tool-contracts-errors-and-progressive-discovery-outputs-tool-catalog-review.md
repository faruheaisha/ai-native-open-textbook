---
title: "Tool Catalog Review: Support Evidence"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/18-tool-contracts-errors-and-progressive-discovery/outputs/tool-catalog-review.md"
sourceRel: "certifications/claude/lessons/18-tool-contracts-errors-and-progressive-discovery/outputs/tool-catalog-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/18-tool-contracts-errors-and-progressive-discovery/outputs/tool-catalog-review.md"
sourceSha256: "31bd4ed724fb5cc336c9e14181cf45060a1c3c91b791e7a7c1500322c00c4b8e"
pageSha256: "31bd4ed724fb5cc336c9e14181cf45060a1c3c91b791e7a7c1500322c00c4b8e"
contentMode: "local-full"
zh: ""
---

# Tool Catalog Review: Support Evidence

## Catalog Boundary

The policy role receives active-policy search and source lookup. It receives no
account tool or write capability. Every tool has a tenant-aware execution scope.

## Tool Contracts

`search_active_policy`: use when a support policy governs the answer; do not use
for account facts or public research. `read_assigned_account`: use when the
authenticated case needs account facts; do not use for policy or other tenants.

## Error Matrix

Validation is retryable only after changed input. Authorization is non-retryable
until access or approval changes. A dependency timeout is retryable once and
preserves any partial result plus trace ID.

## Progressive Discovery

The starting surface exposes search for capability names allowed to the role.
Specialized definitions load only after scoped discovery; restricted names are
not revealed.

## Authorization

Discovery never grants execution. The service checks principal, tenant, current
scope, object ownership, and bound approval for every call.

## Selection Fixtures

Twelve fixtures cover policy versus account questions, public research, no-tool
answers, validation, authorization, conflict, timeout, and partial results.
