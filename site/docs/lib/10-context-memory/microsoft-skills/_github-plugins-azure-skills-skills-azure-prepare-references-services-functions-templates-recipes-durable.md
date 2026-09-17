---
title: "Durable Functions Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/durable/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/durable/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/durable/README.md"
sourceSha256: "28fc495c942b8f2b7370f3fc371329ce9627d8dfa4d35038c05c1251e2dd6fac"
pageSha256: "28fc495c942b8f2b7370f3fc371329ce9627d8dfa4d35038c05c1251e2dd6fac"
contentMode: "local-full"
zh: ""
---

# Durable Functions Recipe

Orchestration workflows with Durable Task Scheduler as the backend.

## Template Selection

Resource filter: `durable`  
Discover templates via MCP or CDN manifest where `resource == "durable"` and `language` matches user request.

## Key Concept

Uses **Durable Task Scheduler** (DTS) — a fully managed backend for state persistence. Do NOT use Azure Storage queues/tables.

See [Durable Task Scheduler reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-durable-task-scheduler) for backend configuration details.

## Troubleshooting

### Orchestration Fails to Start

**Cause:** Durable Task Scheduler (DTS) backend not provisioned or connection misconfigured.  
**Solution:** Verify the DTS resource exists and the function app has the `Durable Task Scheduler Worker` role. Do NOT use Azure Storage queues/tables as backend.

### UAMI Connection Issues

**Cause:** Missing or incorrect Durable Task Scheduler connection string.  
**Solution:** DTS uses a connection string format (not the `__` suffix pattern). Set these app settings:
