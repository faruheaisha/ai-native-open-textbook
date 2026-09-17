---
title: "PHP Testing"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/php-testing.md"
sourceRel: ".cursor/rules/php-testing.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/php-testing.md"
sourceSha256: "b2329fc241125ca1210a5969c8c88e3809af231ac0dbf4b3c34ace40e38e1cee"
pageSha256: "b2329fc241125ca1210a5969c8c88e3809af231ac0dbf4b3c34ace40e38e1cee"
contentMode: "local-full"
zh: ""
---

# PHP Testing

> This file extends the common testing rule with PHP specific content.

## Framework

Use **PHPUnit** as the default test framework. **Pest** is also acceptable when the project already uses it.

## Coverage

```bash
vendor/bin/phpunit --coverage-text
# or
vendor/bin/pest --coverage
```

## Test Organization

- Separate fast unit tests from framework/database integration tests.
- Use factory/builders for fixtures instead of large hand-written arrays.
- Keep HTTP/controller tests focused on transport and validation; move business rules into service-level tests.
