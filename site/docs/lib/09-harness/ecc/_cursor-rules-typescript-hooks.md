---
title: "TypeScript/JavaScript Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/typescript-hooks.md"
sourceRel: ".cursor/rules/typescript-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/typescript-hooks.md"
sourceSha256: "0da4e6b630b8a8cf6c0c0804db3db7ac5ba90e67d729f26208ee4db81e7dc077"
pageSha256: "0da4e6b630b8a8cf6c0c0804db3db7ac5ba90e67d729f26208ee4db81e7dc077"
contentMode: "local-full"
zh: ""
---

# TypeScript/JavaScript Hooks

> This file extends the common hooks rule with TypeScript/JavaScript specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **Prettier**: Auto-format JS/TS files after edit
- **TypeScript check**: Run `tsc` after editing `.ts`/`.tsx` files
- **console.log warning**: Warn about `console.log` in edited files

## Stop Hooks

- **console.log audit**: Check all modified files for `console.log` before session ends
