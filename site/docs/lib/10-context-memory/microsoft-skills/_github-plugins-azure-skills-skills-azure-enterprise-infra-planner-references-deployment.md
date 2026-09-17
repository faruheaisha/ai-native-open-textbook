---
title: "Deployment Execution"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/deployment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/deployment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/deployment.md"
sourceSha256: "3e9eb07efeb7c9449634ab4f1aec1b0c6ba3d413c461283c028488ee53c78caa"
pageSha256: "3e9eb07efeb7c9449634ab4f1aec1b0c6ba3d413c461283c028488ee53c78caa"
contentMode: "local-full"
zh: ""
---

# Deployment Execution

Execute infrastructure deployment after plan approval and IaC generation.

## Status Gate

Before executing any deployment command, verify:

```txt
meta.status === "approved"
```

If status is not `approved`, stop and inform the user. Do not manually change the status.

## Pre-Deployment Checklist

1. Plan approved — `meta.status` is `approved`
