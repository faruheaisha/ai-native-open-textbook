---
title: "AKS Cost Anomaly Investigation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-aks-anomalies.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-aks-anomalies.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-aks-anomalies.md"
sourceSha256: "30d9a752f3db1448ec3598b807411fb32b736caee49b3cd702514c4246af5aa9"
pageSha256: "30d9a752f3db1448ec3598b807411fb32b736caee49b3cd702514c4246af5aa9"
contentMode: "local-full"
zh: ""
---

# AKS Cost Anomaly Investigation

Investigate user-reported cost or utilization spikes by correlating Azure Monitor metrics, scaling events, and Cost Management data.

## Step 1 - Confirm Timeframe

Ask the user: "When did you notice the spike? (e.g., 'last Tuesday', 'between 2 AM and 4 AM yesterday')"

## Step 2 - Pull Cost Data

```bash
az rest --method post \
