---
title: "Forecast API Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-forecast/examples.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-forecast/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-forecast/examples.md"
sourceSha256: "e47a8fff22f7a3aa0f6fd747fc19be0302ad369a987defd8917cbbbcdfe20a1c"
pageSha256: "e47a8fff22f7a3aa0f6fd747fc19be0302ad369a987defd8917cbbbcdfe20a1c"
contentMode: "local-full"
zh: ""
---

# Forecast API Examples

Common forecast patterns with request bodies. Use the [SKILL.md workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-SKILL) to construct and execute the `az rest` command.

## 1. Forecast Rest of Current Month (Daily)

```json
{
  "type": "ActualCost",
  "timeframe": "Custom",
  "timePeriod": {
