---
title: "Blob Storage with Event Grid Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/README.md"
sourceSha256: "3e05815616629af8347bfcb87939c2ac5121196184e788349b49bd9ac40dace8"
pageSha256: "3e05815616629af8347bfcb87939c2ac5121196184e788349b49bd9ac40dace8"
contentMode: "local-full"
zh: ""
---

# Blob Storage with Event Grid Recipe

Blob trigger via Event Grid for high-scale, low-latency blob processing.

## Template Selection

Resource filter: `blob`  
Discover templates via MCP or CDN manifest where `resource == "blob"` and `language` matches user request.

## Why Event Grid?

| Aspect | Polling Trigger | Event Grid Source |
|--------|-----------------|-------------------|
| **Latency** | 10s-60s | Sub-second |
| **Scale** | Limited | High-scale |

## Troubleshooting

### "Unauthorized" or "Forbidden" Errors

**Cause:** Missing UAMI credential settings for Storage.  
**Solution:** Ensure these settings are present in app configuration (prefix must match the connection name used in your function code, default: `AzureWebJobsStorage`):

- `<ConnectionName>__blobServiceUri` (e.g., `https://<account>.blob.core.windows.net`)
- `<ConnectionName>__credential` (value: `managedidentity`)
- `<ConnectionName>__clientId`

See [Blob Storage trigger connections](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger#connections) for identity-based config — refer to the **"Connections"** section on that page for managed identity app settings.

### Blob Events Not Triggering

**Cause:** Event Grid subscription not created or filtering incorrectly.  
**Solution:** Verify the Event Grid system topic and subscription exist. Check the blob container prefix filter matches the expected path.

## Eval

| Path | Description |
|------|-------------|
| [eval/summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-blob-eventgrid-eval-summary) | Evaluation summary |
| [eval/python.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-blob-eventgrid-eval-python) | Python evaluation results |
