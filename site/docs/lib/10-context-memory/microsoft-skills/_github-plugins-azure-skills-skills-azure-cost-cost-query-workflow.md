---
title: "Cost Query Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-query/workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-query/workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-query/workflow.md"
sourceSha256: "569e613634fee3afdbdf5715c85e3ece018578af32bcbde4f5bbc98b7a607cb7"
pageSha256: "569e613634fee3afdbdf5715c85e3ece018578af32bcbde4f5bbc98b7a607cb7"
contentMode: "local-full"
zh: ""
---

# Cost Query Workflow

Use this workflow when the user wants to **understand their costs** — breakdowns, trends, totals, top spenders.

## Step 1: Determine Scope

Identify the Azure scope for the cost query from the Scope Reference table in the main [SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-SKILL#scope-reference-shared-across-all-workflows).

## Step 2: Choose Report Type

| Type | Description |
|------|-------------|
| `ActualCost` | Actual billed costs including purchases |
| `AmortizedCost` | Reservation/savings plan costs spread across usage period |
| `Usage` | Usage-based cost data |

## Step 3: Set Timeframe

Use a preset timeframe (e.g., `MonthToDate`, `TheLastMonth`, `TheLastYear`) or `Custom` with a `timePeriod` object.

> ⚠️ **Warning:** Key time period guardrails:
> - **Daily granularity**: max **31 days**
> - **Monthly/None granularity**: max **12 months**
> - `Custom` timeframe **requires** a `timePeriod` object with `from` and `to` dates
> - Future dates in historical queries are silently adjusted (see guardrails for details)
>
> See [guardrails.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-guardrails) for the complete set of validation rules.

## Step 4: Configure Dataset

Define granularity, aggregation, grouping, filtering, and sorting in the `dataset` object.

- **Granularity**: `None`, `Daily`, or `Monthly`
- **Aggregation**: Use `Sum` on `Cost` or `PreTaxCost` for total cost
- **Grouping**: Up to **2** `GroupBy` dimensions (e.g., `ServiceName`, `ResourceGroupName`)
- **Filtering**: Use `dimensions` or `tags` filters with `name`, `operator` (`In`, `Equal`, `Contains`), and `values` fields
- **Sorting**: Order results by cost or dimension columns

> 💡 **Tip:** Not all dimensions are available at every scope. See [dimensions-by-scope.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-dimensions-by-scope) for the availability matrix.

For the full request body schema, see [request-body-schema.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-request-body-schema).

## Step 5: Construct and Execute the API Call

Use `az rest` to call the Cost Management Query API.

**Create cost query file:**

Create `temp/cost-query.json` with:
```json
{
  "type": "ActualCost",
  "timeframe": "MonthToDate",
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": {
        "name": "Cost",
        "function": "Sum"
      }
    },
    "grouping": [
      {
        "type": "Dimension",
        "name": "ServiceName"
      }
    ]
  }
}
```

**Execute cost query:**
```powershell
# Create temp folder
New-Item -ItemType Directory -Path "temp" -Force

# Query using REST API (more reliable than az costmanagement query)
az rest --method post `
  --url "<scope>/providers/Microsoft.CostManagement/query?api-version=2023-11-01" `
  --headers "ClientType=GitHubCopilotForAzure" `
  --body '@temp/cost-query.json'
```

## Step 6: Handle Pagination and Errors

- The API returns a maximum of **5,000 rows** per page (default: 1,000).
- If `nextLink` is present in the response, follow it to retrieve additional pages.
- Handle rate limiting (HTTP 429) by checking all `x-ms-ratelimit-microsoft.costmanagement-*-retry-after` headers in the response. Wait for the longest value before retrying. Do not send further requests to the same scope until the retry-after duration has elapsed.

See [error-handling.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-error-handling) for the full error reference.

## Key Guardrails

| Rule | Constraint |
|------|-----------|
| Daily granularity max range | 31 days |
| Monthly/None granularity max range | 12 months |
| Absolute API max range | 37 months |
| Max GroupBy dimensions | 2 |
| ResourceId grouping scope | Subscription and resource group only — not supported at billing account, management group, or higher scopes |
| Max rows per page | 5,000 |
| Custom timeframe | Requires `timePeriod` with `from`/`to` |
| Filter and/or | Must have at least 2 expressions |

## Examples

**Cost by service for the current month:**

```powershell
az rest --method post `
