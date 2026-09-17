---
title: "Mode B — Save to a local folder"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/save-local.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/save-local.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/save-local.md"
sourceSha256: "c9d4da97a12ad8930648d7b06a3de52038a2724b13b82632ad9cbae34c17a3dd"
pageSha256: "c9d4da97a12ad8930648d7b06a3de52038a2724b13b82632ad9cbae34c17a3dd"
contentMode: "local-full"
zh: ""
---

# Mode B — Save to a local folder

## Step 1 — Suggest a path

Detect the user's current working context (in priority order; pick the **first** that succeeds):

| Signal | Suggested path |
|---|---|
| Host session has an `--add-dir` workspace containing a `.git` directory | `<workspace>/infra/\{vm-name\}/` |
