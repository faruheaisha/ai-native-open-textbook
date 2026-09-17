---
title: "Dataset Comparison — A/B Testing Across Dataset Versions"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-comparison.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-comparison.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/dataset-comparison.md"
sourceSha256: "54e8a2be1ae2d41953d044b5cc26f95dce218106f467ed6ba579cf39f09b40ac"
pageSha256: "54e8a2be1ae2d41953d044b5cc26f95dce218106f467ed6ba579cf39f09b40ac"
contentMode: "local-full"
zh: ""
---

# Dataset Comparison — A/B Testing Across Dataset Versions

Run structured experiments that compare how an agent performs across different dataset versions, and present results as leaderboards with per-evaluator breakdowns. Use this to answer: "Did scores drop because of harder tests or agent regression?"

## Experiment Structure

An experiment consists of:
1. **Pinned agent version** — the same agent evaluated on each dataset
2. **Varied dataset versions** — the versions being compared
3. **Same evaluators** — applied consistently across all runs
4. **Comparison results** — which dataset version the agent performs better on

## Step 1 — Define the Experiment

| Parameter | Value | Example |
|-----------|-------|---------|
| Agent | Pinned agent version | `v3` |
| Baseline dataset | Previous dataset version | `support-bot-prod-traces-v2` |
| Treatment dataset(s) | New dataset version(s) | `support-bot-prod-traces-v3` |
| Evaluators | Same set for all runs | coherence, fluency, relevance, intent_resolution, task_adherence |

## Step 2 — Run Evaluations

For each dataset version, run **`evaluation_agent_batch_eval_create`** with:
- Same `evaluationId` (groups all runs for comparison)
- Same `agentVersion`
- Same `evaluatorNames`
- Different `inputData` (from each dataset version)

> **Important:** Use `evaluationId` on `evaluation_agent_batch_eval_create` to group runs. After the runs exist, switch to `evalId` for `evaluation_get` and `evaluation_comparison_create`.

> ⚠️ **Eval-group immutability:** Keep the evaluator set and thresholds fixed within one evaluation group. If you need to change evaluators or thresholds, create a new evaluation group instead of reusing the previous `evaluationId`.

> ⚠️ **Score drops are expected.** When comparing v1→v2 datasets, lower scores on the new dataset likely mean the new test cases are harder (better coverage), not that the agent regressed. **Do NOT remove dataset rows or weaken evaluators to recover scores.** Instead, optimize the agent for the new failure patterns, then re-evaluate.

## Step 3 — Compare Results

Use **`evaluation_comparison_create`** with the baseline and treatment runs:

```json
{
  "insightRequest": {
    "displayName": "Dataset comparison: traces-v2 vs traces-v3 on agent-v3",
    "state": "NotStarted",
    "request": {
      "type": "EvaluationComparison",
