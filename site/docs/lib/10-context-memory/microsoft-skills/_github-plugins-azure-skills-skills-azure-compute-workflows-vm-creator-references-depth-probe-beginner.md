---
title: "Beginner / fast-path"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/beginner.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/beginner.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/beginner.md"
sourceSha256: "12ebbebf980cebd760e54a45c5595cb1bd2c14aed3f758a836f2e10ffc1da70c"
pageSha256: "12ebbebf980cebd760e54a45c5595cb1bd2c14aed3f758a836f2e10ffc1da70c"
contentMode: "local-full"
zh: ""
---

# Beginner / fast-path

Goal: get to a working Plan Card in **≤ 2 questions**, then show defaults and let the user edit.

| # | Question | Default if skipped |
|---|---|---|
| 1 | "What region? I can recommend if you're not sure." | `eastus` |
| 2 | "Linux or Windows? Default is Ubuntu 24.04." | `Ubuntu2404` (Linux) |

## Silent defaults (show in Plan Card, don't ask)

- **Size:** `Standard_D2s_v5` (2 vCPU / 8 GB)
- **Auth:** SSH key from `~/.ssh/id_rsa.pub` (Linux) — read the file; ask only if missing
