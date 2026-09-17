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
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/php-patterns.md"
sourceRel: ".kiro/steering/php-patterns.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/php-patterns.md"
sourceSha256: "7ee07433c233f0fee5bf892ea98a9811a4b1eedc58e26541d556743856b5258a"
pageSha256: "7ee07433c233f0fee5bf892ea98a9811a4b1eedc58e26541d556743856b5258a"
contentMode: "local-full"
zh: ""
---

# PHP Patterns

> This file extends the common patterns with PHP specific content.

## Standards

- Follow **PSR-12** formatting and naming conventions
- Prefer `declare(strict_types=1);` in application code
- Use scalar type hints, return types, and typed properties everywhere

## Immutability

- Prefer immutable DTOs and value objects for data crossing service boundaries
- Use `readonly` properties or immutable constructors for request/response payloads

## Thin Controllers, Explicit Services

- Keep controllers focused on transport: auth, validation, serialization, status codes
- Move business rules into application/domain services testable without HTTP bootstrapping

## Dependency Injection

- Depend on interfaces or narrow service contracts, not framework globals
- Pass collaborators through constructors so services are testable without service-locator lookups

## DTOs and Value Objects

- Replace shape-heavy associative arrays with DTOs for requests, commands, and API payloads
- Use value objects for money, identifiers, date ranges, and constrained concepts

## Security

- Validate request input at the framework boundary (`FormRequest`, Symfony Validator)
- Use prepared statements (PDO, Eloquent query builder) for all dynamic queries
- Load secrets from environment variables, never from committed config files
- Use `password_hash()` / `password_verify()` for password storage
- Enforce CSRF protection on state-changing web requests
- Run `composer audit` in CI

## Formatting & Analysis

```bash
# PHP-CS-Fixer or Laravel Pint for formatting
# PHPStan or Psalm for static analysis
vendor/bin/phpstan analyse
```

## Testing

- Use **PHPUnit** as default; prefer **Pest** if configured in the project
- Separate fast unit tests from framework/database integration tests
- Use factory/builders for fixtures instead of large hand-written arrays

```bash
vendor/bin/phpunit --coverage-text
```

## Reference

See skills: `laravel-patterns`, `laravel-security`, `laravel-tdd` for Laravel-specific guidance.
See skill: `api-design` for endpoint conventions and response-shape guidance.
