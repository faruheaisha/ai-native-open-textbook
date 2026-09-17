---
title: "Qwen CLI Configuration"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.qwen/QWEN.md"
sourceRel: ".qwen/QWEN.md"
rawUrl: "/raw/09-harness/ecc/.qwen/QWEN.md"
sourceSha256: "8883f896279f4de1dafbf086c57b850ede22152615b21b5798576c3630ac1061"
pageSha256: "8883f896279f4de1dafbf086c57b850ede22152615b21b5798576c3630ac1061"
contentMode: "local-full"
zh: ""
---

# Qwen CLI Configuration

This directory contains ECC's Qwen CLI install template.

## Runtime Location

The source `.qwen/` directory in this repository is copied into a user's home-level `~/.qwen/` install root when running:

```bash
./install.sh --target qwen --profile minimal
```

The managed install also writes `~/.qwen/ecc-install-state.json` so future ECC updates and uninstalls can distinguish ECC-owned files from user-owned Qwen configuration.

## Installed Surface

The Qwen target installs the same managed manifest modules used by other harness adapters:

- `rules/`
- `agents/`
- `commands/`
- `skills/`
- `mcp-configs/`

Hook runtime files are intentionally not selected for Qwen until the Qwen hook/event contract is verified.
