---
title: "Workflow Details"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/workflow-details.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/workflow-details.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/workflow-details.md"
sourceSha256: "30c17747d492418220a05c0fcc09728b28d5d92fc1d4f7a260bdd7d13a21dbf2"
pageSha256: "30c17747d492418220a05c0fcc09728b28d5d92fc1d4f7a260bdd7d13a21dbf2"
contentMode: "local-full"
zh: ""
---

# Workflow Details

## Upgrade Workflow Phases

The azure-upgrade skill follows a structured workflow to ensure safe, repeatable upgrades.

## Phase Overview

```
┌──────────┐    ┌──────────┐    ┌─────────────┐    ┌─────────┐    ┌──────────┐
│ Identify │───▶│  Assess  │───▶│ Pre-migrate │───▶│ Upgrade │───▶│ Validate │
└──────────┘    └──────────┘    └─────────────┘    └─────────┘    └──────────┘
```

## Progress Tracking

Create and maintain `upgrade-status.md` in the workspace root:

```markdown
# Upgrade Status

## Upgrade Details

| Property | Value |
|----------|-------|
