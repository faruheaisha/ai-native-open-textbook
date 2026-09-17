---
title: "Cost Management Query Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-query/examples.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-query/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-query/examples.md"
sourceSha256: "a9b436dbeff981e92ef89c2574f403bacfa62f1bd24ef250e734d420e06cd9f9"
pageSha256: "a9b436dbeff981e92ef89c2574f403bacfa62f1bd24ef250e734d420e06cd9f9"
contentMode: "local-full"
zh: ""
---

# Cost Management Query Examples

Common query patterns with request bodies. Use the [SKILL.md workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-SKILL) to construct and execute the `az rest` command.

## 1. Monthly Cost by Service

```json
{
  "type": "ActualCost",
  "timeframe": "MonthToDate",
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    },
    "grouping": [
      { "type": "Dimension", "name": "ServiceName" }
    ],
    "sorting": [
      { "direction": "Descending", "name": "Cost" }
    ]
  }
}
```

---

## 2. Daily Cost Trend (Last 30 Days)

```json
{
  "type": "ActualCost",
  "timeframe": "Custom",
  "timePeriod": {
    "from": "2024-01-01T00:00:00Z",
    "to": "2024-01-31T23:59:59Z"
  },
  "dataset": {
    "granularity": "Daily",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    }
  }
}
```

> ⚠️ **Warning:** Daily granularity supports a maximum of 31 days.

---

## 3. Cost by Resource Group with Tag Filter

```json
{
  "type": "ActualCost",
  "timeframe": "MonthToDate",
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    },
    "grouping": [
      { "type": "Dimension", "name": "ResourceGroupName" }
    ],
    "filter": {
      "tags": {
        "name": "Environment",
        "operator": "In",
        "values": ["production", "staging"]
      }
    },
    "sorting": [
      { "direction": "Descending", "name": "Cost" }
    ]
  }
}
```

---

## 4. Amortized Cost for Reservation Analysis

```json
{
  "type": "AmortizedCost",
  "timeframe": "TheLastMonth",
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    },
    "grouping": [
      { "type": "Dimension", "name": "BenefitName" }
    ],
    "sorting": [
      { "direction": "Descending", "name": "Cost" }
    ]
  }
}
```

> 💡 **Tip:** `AmortizedCost` spreads reservation purchases across the term for accurate daily/monthly effective cost.

---

## 5. Top 10 Most Expensive Resources

```json
{
  "type": "ActualCost",
  "timeframe": "MonthToDate",
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    },
    "grouping": [
      { "type": "Dimension", "name": "ResourceId" }
    ],
    "sorting": [
      { "direction": "Descending", "name": "Cost" }
    ]
  }
}
```

> 💡 **Tip:** Append `&$top=10` to the URL to limit results: `...query?api-version=2023-11-01&$top=10`
