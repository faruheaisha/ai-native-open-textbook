---
title: "Steps 8–10 — Re-Evaluate, Compare Versions, Iterate"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/compare-iterate.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/compare-iterate.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/compare-iterate.md"
sourceSha256: "6a5e37dbff4bf418cd5d6558750e8334a8e333681011e785ef6c8b2822ba70f7"
pageSha256: "6a5e37dbff4bf418cd5d6558750e8334a8e333681011e785ef6c8b2822ba70f7"
contentMode: "local-full"
zh: ""
---

# Steps 8–10 — Re-Evaluate, Compare Versions, Iterate

## Step 8 — Re-Evaluate

Use **`evaluation_agent_batch_eval_create`** for re-evaluation, even when the selected evaluation suite has `suiteName`. The generated suite preserves the reviewed dataset/evaluator bundle for selection and lineage, but the run should target the agent directly. Reuse the **same `evaluationId`** as the baseline run when the evaluator set and thresholds are unchanged. Use the same local or registered test dataset (from the selected agent root's `.foundry/datasets/` and suite metadata) and evaluator bundle from the selected environment/evaluation suite. Update `agentVersion` to the new version.

> ⚠️ **Parameter switch reminder:** Agent-target batch re-evaluation creation uses `evaluationId`, but follow-up calls to `evaluation_get` and `evaluation_comparison_create` must use `evalId`. Do not call `evaluation_suite_run` for batch eval.

> ⚠️ **Eval-group immutability:** Reuse the same `evaluationId` only when `evaluatorNames` and thresholds are unchanged. If you add/remove evaluators or change thresholds, create a new evaluation group first, then compare runs within that new group.

Auto-poll for completion in a background terminal (same as [Step 2](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-references-evaluate-step)).

## Step 9 — Compare Versions

> **Critical:** `displayName` is **required** in the `insightRequest`. Despite the MCP tool schema showing `displayName` as optional (`type: ["string", "null"]`), the API will reject requests without it with a BadRequest error. `state` must be `"NotStarted"`.

### Required Parameters for `evaluation_comparison_create`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `insightRequest.displayName` | ✅ | Human-readable name. **Omitting causes BadRequest.** |
| `insightRequest.state` | ✅ | Must be `"NotStarted"` |
| `insightRequest.request.evalId` | ✅ | Eval group ID containing both runs |
| `insightRequest.request.baselineRunId` | ✅ | Run ID of the baseline |
| `insightRequest.request.treatmentRunIds` | ✅ | Array of treatment run IDs |

Use **`evaluation_comparison_create`** with a nested `insightRequest`:

```json
{
  "insightRequest": {
    "displayName": "V1 vs V2 Comparison",
    "state": "NotStarted",
    "request": {
      "type": "EvaluationComparison",
