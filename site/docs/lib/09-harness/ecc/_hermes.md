---
title: "ECC for Hermes"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.hermes/README.md"
sourceRel: ".hermes/README.md"
rawUrl: "/raw/09-harness/ecc/.hermes/README.md"
sourceSha256: "92243f4e1f5bd2a1a6d0484d97b7e3470ccc8d17dc669e643b70aefaa0473fbe"
pageSha256: "92243f4e1f5bd2a1a6d0484d97b7e3470ccc8d17dc669e643b70aefaa0473fbe"
contentMode: "local-full"
zh: ""
---

# ECC for Hermes

This directory contains the ECC (Everything Claude Code) configuration for the Hermes harness.

## What is installed

- `rules/ecc/` — shared coding rules and guidelines
- `skills/ecc/` — reusable skills
- `commands/` — slash commands
- `AGENTS.md` — agent instructions

## Manual install

```bash
bash ./install.sh --target hermes --profile minimal
```

## Notes

- Hermes config files (`config.yaml`, `.env`, etc.) are **not** touched by ECC install.
- Use `npx ecc-universal doctor --target hermes` to check install health.
