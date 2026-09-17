---
title: "Eval Regression — Automated Regression Detection"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/eval-regression.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/eval-regression.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/eval-regression.md"
sourceSha256: "eca663145fb898e0c8e563902897c7058483da7ef0773098640c9c443315fa1d"
pageSha256: "eca663145fb898e0c8e563902897c7058483da7ef0773098640c9c443315fa1d"
contentMode: "local-full"
zh: ""
---

# Eval Regression — Automated Regression Detection

Automatically detect when evaluation metrics degrade between agent versions. Compare each evaluation run against the baseline and generate pass/fail verdicts with actionable recommendations.

## Prerequisites

- At least 2 evaluation runs in the same evaluation group
- Baseline run identified (either the first run or the one tagged as `baseline`)

## Step 1 — Identify Baseline and Treatment

### Automatic Baseline Selection

1. Read `.foundry/datasets/manifest.json` and find the dataset tagged `baseline`.
2. If the baseline dataset entry includes a stored `baselineRunId` (or mapping to one or more `evalRunIds`), use that `baselineRunId` as the baseline run.
3. If no explicit `baselineRunId` is recorded, select the first (oldest) run in the evaluation group as the baseline.

### Treatment Selection

The latest (most recent) run in the evaluation group is the treatment.

## Step 2 — Run Comparison

Use **`evaluation_comparison_create`** to compare baseline vs treatment:

> **Critical:** `displayName` is **required** in the `insightRequest`. Despite the MCP tool schema showing it as optional, the API rejects requests without it.

```json
{
  "insightRequest": {
    "displayName": "Regression Check - v1 vs v4",
    "state": "NotStarted",
    "request": {
      "type": "EvaluationComparison",
