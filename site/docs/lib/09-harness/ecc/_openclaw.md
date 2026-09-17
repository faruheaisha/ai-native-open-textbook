---
title: "ECC for OpenClaw"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.openclaw/README.md"
sourceRel: ".openclaw/README.md"
rawUrl: "/raw/09-harness/ecc/.openclaw/README.md"
sourceSha256: "afe7a51c817a0626daffdf4ecca5353694f40a2cdad4469a0bd484bb6a3c6bf4"
pageSha256: "afe7a51c817a0626daffdf4ecca5353694f40a2cdad4469a0bd484bb6a3c6bf4"
contentMode: "local-full"
zh: ""
---

# ECC for OpenClaw

This directory contains the ECC (Everything Claude Code) configuration for the OpenClaw harness.

## What is installed

- `rules/ecc/` — shared coding rules and guidelines
- `skills/ecc/` — reusable skills
- `commands/` — slash commands
- `AGENTS.md` — agent instructions

## Manual install

```bash
bash ./install.sh --target openclaw --profile minimal
```

## Notes

- OpenClaw config files (`openclaw.json`, `config.toml`, `.env`, etc.) are **not** touched by ECC install.
- Use `npx ecc-universal doctor --target openclaw` to check install health.
