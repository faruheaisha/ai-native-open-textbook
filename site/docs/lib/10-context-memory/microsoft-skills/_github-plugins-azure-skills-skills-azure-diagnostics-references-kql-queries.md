---
title: "KQL Query Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/references/kql-queries.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/references/kql-queries.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/references/kql-queries.md"
sourceSha256: "3a784ff92bb90e0967c0c40dc0ce4daed8b664ceb1f014bd7a70d8c2926cc8a3"
pageSha256: "3a784ff92bb90e0967c0c40dc0ce4daed8b664ceb1f014bd7a70d8c2926cc8a3"
contentMode: "local-full"
zh: ""
---

# KQL Query Reference

Essential Kusto Query Language (KQL) queries for diagnosing Azure application issues.

## Prerequisites

- Application Insights or Log Analytics workspace configured
- Diagnostic settings enabled on Azure resources

---

## Recent Errors

```kql
// Recent errors
AppExceptions
| where TimeGenerated > ago(1h)
| project TimeGenerated, Message, StackTrace
| order by TimeGenerated desc
```

## Failed Requests

```kql
// Failed requests
AppRequests
| where Success == false
| where TimeGenerated > ago(1h)
| summarize count() by Name, ResultCode
| order by count_ desc
```

## Slow Requests

```kql
// Slow requests
AppRequests
| where TimeGenerated > ago(1h)
| where DurationMs > 5000
| project TimeGenerated, Name, DurationMs
| order by DurationMs desc
```

## Dependency Failures

```kql
// Dependency failures
AppDependencies
| where Success == false
| where TimeGenerated > ago(1h)
| summarize count() by Name, ResultCode, Target
```

---

## Tips

- Always include time filter: `TimeGenerated > ago(Xh)`
- Limit results with `take 50` for large datasets
- Use `summarize` to aggregate data before analyzing

## More Resources

- [KQL Quick Reference](https://learn.microsoft.com/azure/data-explorer/kql-quick-reference)
- [Application Insights Queries](https://learn.microsoft.com/azure/azure-monitor/logs/queries)
