---
title: "PHP Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/php-hooks.md"
sourceRel: ".cursor/rules/php-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/php-hooks.md"
sourceSha256: "761006b4501b9201482826c6545f9049f18ae749ebe074aa849ef636b1a94248"
pageSha256: "761006b4501b9201482826c6545f9049f18ae749ebe074aa849ef636b1a94248"
contentMode: "local-full"
zh: ""
---

# PHP Hooks

> This file extends the common hooks rule with PHP specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **Pint / PHP-CS-Fixer**: Auto-format edited `.php` files.
- **PHPStan / Psalm**: Run static analysis after PHP edits in typed codebases.
- **PHPUnit / Pest**: Run targeted tests for touched files or modules when edits affect behavior.

## Warnings

- Warn on `var_dump`, `dd`, `dump`, or `die()` left in edited files.
- Warn when edited PHP files add raw SQL or disable CSRF/session protections.
