---
title: "PHP Coding Style"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/php-coding-style.md"
sourceRel: ".cursor/rules/php-coding-style.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/php-coding-style.md"
sourceSha256: "f3373166079cff7f25742167c91f063fe5fce6092df80a1df2a012ab5313e3e2"
pageSha256: "f3373166079cff7f25742167c91f063fe5fce6092df80a1df2a012ab5313e3e2"
contentMode: "local-full"
zh: ""
---

# PHP Coding Style

> This file extends the common coding style rule with PHP specific content.

## Standards

- Follow **PSR-12** formatting and naming conventions.
- Prefer `declare(strict_types=1);` in application code.
- Use scalar type hints, return types, and typed properties everywhere new code permits.

## Immutability

- Prefer immutable DTOs and value objects for data crossing service boundaries.
- Use `readonly` properties or immutable constructors for request/response payloads where possible.
- Keep arrays for simple maps; promote business-critical structures into explicit classes.

## Formatting

- Use **PHP-CS-Fixer** or **Laravel Pint** for formatting.
- Use **PHPStan** or **Psalm** for static analysis.
