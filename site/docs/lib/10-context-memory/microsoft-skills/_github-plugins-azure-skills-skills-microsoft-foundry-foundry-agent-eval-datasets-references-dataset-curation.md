---
title: "Dataset Curation — Human-in-the-Loop Review"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-curation.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-curation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-curation.md"
sourceSha256: "b4a5f0d82e36bbd05b30b2e8e2a3facd972c4464cb1a5e6bd0e16f27aa068079"
pageSha256: "b4a5f0d82e36bbd05b30b2e8e2a3facd972c4464cb1a5e6bd0e16f27aa068079"
contentMode: "local-full"
zh: ""
---

# Dataset Curation — Human-in-the-Loop Review

Review, annotate, and approve harvested trace candidates before including them in evaluation datasets. This ensures dataset quality by adding a human review gate between raw trace extraction and finalized test cases.

## Workflow Overview

```
Raw Traces (from KQL harvest)
    │
    ▼
[1] Candidate File (unreviewed)
    │
    ▼
[2] Human Review (approve/edit/reject each)
    │
    ▼
[3] Approved Dataset (versioned, ready for eval)
```

## Step 1 — Generate Candidate File

After running a [trace harvest](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-trace-to-dataset), save candidates with a `status` field:

```
