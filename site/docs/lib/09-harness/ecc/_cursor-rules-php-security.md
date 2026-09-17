---
title: "PHP Security"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/php-security.md"
sourceRel: ".cursor/rules/php-security.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/php-security.md"
sourceSha256: "5120a1f4b0f89c6ac00a99bad0e2d7e98cfb9e8236d7650f2fa17790d68d3fde"
pageSha256: "5120a1f4b0f89c6ac00a99bad0e2d7e98cfb9e8236d7650f2fa17790d68d3fde"
contentMode: "local-full"
zh: ""
---

# PHP Security

> This file extends the common security rule with PHP specific content.

## Database Safety

- Use prepared statements (`PDO`, Doctrine, Eloquent query builder) for all dynamic queries.
- Scope ORM mass-assignment carefully and whitelist writable fields.

## Secrets and Dependencies

- Load secrets from environment variables or a secret manager, never from committed config files.
- Run `composer audit` in CI and review package trust before adding dependencies.

## Auth and Session Safety

- Use `password_hash()` / `password_verify()` for password storage.
- Regenerate session identifiers after authentication and privilege changes.
- Enforce CSRF protection on state-changing web requests.
