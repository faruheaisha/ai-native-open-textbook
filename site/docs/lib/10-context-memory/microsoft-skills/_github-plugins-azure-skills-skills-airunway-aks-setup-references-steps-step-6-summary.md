---
title: "Step 6 — Summary & Smoke Test"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-6-summary.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-6-summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-6-summary.md"
sourceSha256: "fe7c9a47b2786b4eaefef1f3cc08fc6d11925fe9514610b72b7f41ceed7a39e7"
pageSha256: "fe7c9a47b2786b4eaefef1f3cc08fc6d11925fe9514610b72b7f41ceed7a39e7"
contentMode: "local-full"
zh: ""
---

# Step 6 — Summary & Smoke Test

**Goal**: Confirm everything is working and guide the user on next steps.

Report:
- Cluster context and node inventory (Step 1)
- Controller version and namespace (Step 2)
- GPU types and constraints in effect (Step 3)
- Provider installed and registration status (Step 4)
- Model deployed and endpoint URL (Step 5)

## Smoke Test

Retrieve the endpoint and test it (only after `STATUS = Ready`):

> Replace `<namespace>` with the namespace used during deployment (default: `default`).

```bash
