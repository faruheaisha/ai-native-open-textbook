---
title: "Container Apps Day-2 Operations"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/day2-operations.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/day2-operations.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/day2-operations.md"
sourceSha256: "61ae28f5f8f423e65fa93f4913c3812d9cef17120c9d628836b51ea47f8cccf9"
pageSha256: "61ae28f5f8f423e65fa93f4913c3812d9cef17120c9d628836b51ea47f8cccf9"
contentMode: "local-full"
zh: ""
---

# Container Apps Day-2 Operations

Operational tasks for running Container Apps in production: restart, exec, logs, environment updates, and secret rotation.

## Restart and Lifecycle

| Action | Command |
|--------|---------|
| Restart active revision | `az containerapp revision restart -n $APP -g $RG --revision $REV` |
