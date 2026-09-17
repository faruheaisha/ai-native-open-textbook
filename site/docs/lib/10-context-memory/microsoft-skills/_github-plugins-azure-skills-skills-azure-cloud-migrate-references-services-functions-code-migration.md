---
title: "Code Migration Phase"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/code-migration.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/code-migration.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/code-migration.md"
sourceSha256: "e42b0692b5697f8024a7f1ed75cd9bc2569d441dae97a3b3fef65bee2f43f1ae"
pageSha256: "e42b0692b5697f8024a7f1ed75cd9bc2569d441dae97a3b3fef65bee2f43f1ae"
contentMode: "local-full"
zh: ""
---

# Code Migration Phase

Migrate AWS Lambda function code to Azure Functions.

## Prerequisites

- Assessment report completed
- Azure Functions extension installed in VS Code
- Best practices loaded via `mcp_azure_mcp_get_azure_bestpractices` tool

## Rules

- If runtime is Python or Node.js: **do NOT create function.json files**
- If runtime is .NET (in-process or isolated) or Java: **do NOT hand-author function.json** — bindings metadata is generated from attributes/annotations at build time
- Use extension bundle version `[4.*, 5.0.0)` in host.json
- Use latest programming model (v4 for JavaScript, v2 for Python)
- **Always use bindings and triggers instead of SDKs** — For blob read/write, use `input.storageBlob()` / `output.storageBlob()` with `extraInputs`/`extraOutputs`. For queues, use `app.storageQueue()` or `app.serviceBusQueue()`. Only use SDK when there is no equivalent binding (e.g., Azure AI, custom HTTP calls)
- **Always use the latest supported language runtime** — Consult [supported languages](https://learn.microsoft.com/en-us/azure/azure-functions/supported-languages) and select the newest GA version. Do NOT default to an older LTS version when a newer version is available on Azure Functions.

## Steps

1. **Install Azure Functions Extension** — Ensure VS Code extension is installed
2. **Load Best Practices** — Use `mcp_azure_mcp_get_azure_bestpractices` tool for code generation guidance
