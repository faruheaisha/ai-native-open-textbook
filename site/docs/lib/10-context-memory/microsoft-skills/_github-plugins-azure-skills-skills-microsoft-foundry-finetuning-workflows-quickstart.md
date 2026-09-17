---
title: "Quickstart: Fine-Tune Your First Model"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/workflows/quickstart.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/finetuning/workflows/quickstart.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/workflows/quickstart.md"
sourceSha256: "1b660580c6c1ac4f45ed20ff298472ee9691898731ef501d61e232fca4bb8d66"
pageSha256: "1b660580c6c1ac4f45ed20ff298472ee9691898731ef501d61e232fca4bb8d66"
contentMode: "local-full"
zh: ""
---

# Quickstart: Fine-Tune Your First Model

6 steps from zero to a fine-tuned model using SFT with synthetic data.

> **Time**: ~20 min active + 1-3 hours training.

## Prerequisites

- Microsoft Foundry project with a deployed model (e.g., `gpt-4.1-mini`)
- Python 3.10+ with `openai` installed
- Project endpoint URL and API key (Foundry portal → Project Settings)

## Step 1: Connect to Your Project

```bash
