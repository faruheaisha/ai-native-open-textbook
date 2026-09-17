---
title: "Timer Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/README.md"
sourceSha256: "30522eb9d3286c4af1d07ad7c06b6118527ee8229c38f339ba7fed5090ac332d"
pageSha256: "30522eb9d3286c4af1d07ad7c06b6118527ee8229c38f339ba7fed5090ac332d"
contentMode: "local-full"
zh: ""
---

# Timer Recipe

Scheduled/cron trigger for periodic task execution.

## Template Selection

Resource filter: `timer`  
Discover templates via MCP or CDN manifest where `resource == "timer"` and `language` matches user request.

## Cron Expressions

Some templates define the schedule via an app setting reference `%TIMER_SCHEDULE%` so the cron expression is configurable without code changes. Set the `TIMER_SCHEDULE` app setting to the desired expression.

| Schedule | Expression |
|----------|------------|
| Every 5 minutes | `0 */5 * * * *` |
| Every hour | `0 0 * * * *` |
| Every day at midnight | `0 0 0 * * *` |
| Every Monday at 9am | `0 0 9 * * 1` |
| Every 30 seconds | `*/30 * * * * *` |

> Azure uses 6-part cron expressions (with seconds). See [Azure Functions timer trigger](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer#ncrontab-expressions) for full syntax reference.

## Troubleshooting

### Timer Not Firing

**Cause:** Invalid cron expression or function app not running.  
**Solution:** Verify cron syntax; check function app is started and healthy.

### Duplicate Executions

**Cause:** Multiple instances running the same timer.  
**Solution:** Timer triggers use Storage lease to ensure single execution. Verify `AzureWebJobsStorage` is configured.

## Eval

| Path | Description |
|------|-------------|
| [eval/summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-timer-eval-summary) | Evaluation summary |
| [eval/python.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-timer-eval-python) | Python evaluation results |
