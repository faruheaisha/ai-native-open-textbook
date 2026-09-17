---
title: "PHP Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/php-patterns.md"
sourceRel: ".cursor/rules/php-patterns.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/php-patterns.md"
sourceSha256: "ad2ef870580d19184a6b29bfd8e9fae36366016bc82d83a482ddc25989950147"
pageSha256: "ad2ef870580d19184a6b29bfd8e9fae36366016bc82d83a482ddc25989950147"
contentMode: "local-full"
zh: ""
---

# PHP Patterns

> This file extends the common patterns rule with PHP specific content.

## Thin Controllers, Explicit Services

- Keep controllers focused on transport: auth, validation, serialization, status codes.
- Move business rules into application/domain services that are easy to test without HTTP bootstrapping.

## DTOs and Value Objects

- Replace shape-heavy associative arrays with DTOs for requests, commands, and external API payloads.
- Use value objects for money, identifiers, and constrained concepts.

## Dependency Injection

- Depend on interfaces or narrow service contracts, not framework globals.
- Pass collaborators through constructors so services are testable without service-locator lookups.
