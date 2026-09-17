---
title: "Python Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/python-hooks.md"
sourceRel: ".cursor/rules/python-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/python-hooks.md"
sourceSha256: "a213e00853939f226a4eab17e489a0380c1a589adf3ab9319f10ec408648c271"
pageSha256: "a213e00853939f226a4eab17e489a0380c1a589adf3ab9319f10ec408648c271"
contentMode: "local-full"
zh: ""
---

# Python Hooks

> This file extends the common hooks rule with Python specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **black/ruff**: Auto-format `.py` files after edit
- **mypy/pyright**: Run type checking after editing `.py` files

## Warnings

- Warn about `print()` statements in edited files (use `logging` module instead)
