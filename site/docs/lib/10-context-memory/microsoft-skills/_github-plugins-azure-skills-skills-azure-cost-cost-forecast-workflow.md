---
title: "Cost Forecast Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-forecast/workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-forecast/workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-forecast/workflow.md"
sourceSha256: "5a5d961d79e476fb5b23fc3944724ab85e833f0287b751fc681c16584f5a80c5"
pageSha256: "5a5d961d79e476fb5b23fc3944724ab85e833f0287b751fc681c16584f5a80c5"
contentMode: "local-full"
zh: ""
---

# Cost Forecast Workflow

Use this workflow when the user wants to **project future costs**.

> ⚠️ **Warning:** If the user wants **historical** cost data, use the [Cost Query Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-workflow). If they want to **reduce** costs, use the [Cost Optimization Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-optimization-workflow).

## Key Differences from Query API

| Aspect | Query API | Forecast API |
|--------|-----------|--------------|
| Purpose | Historical cost data | Projected future costs |
| Time period | Past dates only | Must include future dates |
| Grouping | Up to 2 dimensions | **Not supported** |
| `includeActualCost` | N/A | Include historical alongside forecast |
| Response columns | Cost, Date, Currency | Cost, Date, **CostStatus**, Currency |
| Max response rows | 5,000/page | 40 rows recommended |
| Timeframe | Multiple presets + Custom | Typically `Custom` only |

## Step 1: Determine Scope

Use the same scope patterns from the Scope Reference table in the main [SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-SKILL#scope-reference-shared-across-all-workflows).

## Step 2: Choose Report Type

`ActualCost` is most common for forecasting. `AmortizedCost` for reservation/savings plan projections.

## Step 3: Set Time Period

> ⚠️ **Warning:** The `to` date **MUST** be in the future.

- Set `timeframe` to `Custom` and provide `timePeriod` with `from` and `to` dates
- `from` can be in the past — shows actual costs up to today, then forecast to `to`
- Minimum 28 days of historical cost data required
- Maximum forecast period: 10 years

> **Full rules:** [Forecast Guardrails](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-forecast-guardrails)

## Step 4: Configure Dataset

- **Granularity**: `Daily` or `Monthly` recommended
- **Aggregation**: Typically `Sum` of `Cost`
- See [Forecast Request Body Schema](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-forecast-request-body-schema) for full schema

> ⚠️ **Warning:** Grouping is **NOT supported** for forecast. Suggest using the [Cost Query Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-workflow) for grouped historical data instead.

## Step 5: Set Forecast-Specific Options

| Field | Default | Description |
|-------|---------|-------------|
| `includeActualCost` | `true` | Include historical actual costs alongside forecast |
| `includeFreshPartialCost` | `true` | Include partial cost data for recent days. **Requires `includeActualCost: true`** |

## Step 6: Construct and Execute

**Create `temp/cost-forecast.json`:**
```json
{
  "type": "ActualCost",
  "timeframe": "Custom",
  "timePeriod": {
