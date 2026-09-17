---
title: "JoyCode Adapter Guide"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/JOYCODE-GUIDE.md"
sourceRel: "docs/JOYCODE-GUIDE.md"
rawUrl: "/raw/09-harness/ecc/docs/JOYCODE-GUIDE.md"
sourceSha256: "0bf8a1f9b28eba28b6e66ae51de7fac478e51f0757af45cea486a6aac523e55a"
pageSha256: "0bf8a1f9b28eba28b6e66ae51de7fac478e51f0757af45cea486a6aac523e55a"
contentMode: "local-full"
zh: ""
---

# JoyCode Adapter Guide

JoyCode can consume ECC through the selective installer. The adapter installs shared ECC commands, agents, skills, and flattened rules into a project-local `.joycode/` directory.

## Install

Preview the install plan:

```bash
node scripts/install-plan.js --target joycode --profile full
```

Apply it to the current project:

```bash
node scripts/install-apply.js --target joycode --profile full
```

For a smaller install, select modules explicitly:

```bash
node scripts/install-apply.js --target joycode --modules rules-core,commands-core,workflow-quality
```

## Layout

The project adapter writes managed files under:

```text
.joycode/
  agents/
  commands/
  rules/
  skills/
  mcp-configs/
  scripts/
  ecc-install-state.json
```

Rules are flattened into namespaced filenames so a JoyCode project does not receive nested rule directories such as `rules/common/coding-style.md`. Commands, agents, and skills keep the same structure they use elsewhere in ECC.
The full profile also includes shared MCP and setup helper files that other ECC project-local adapters use.

## Uninstall

Use ECC's managed uninstall path instead of deleting files by hand:

```bash
node scripts/uninstall.js --target joycode
```

The uninstall command reads `.joycode/ecc-install-state.json` and removes only files that ECC installed. User-created JoyCode files are preserved.

## Source PR

This adapter salvages the useful project-local JoyCode intent from stale PR #1429 while replacing the standalone shell installer with ECC's current install-state and uninstall machinery.
