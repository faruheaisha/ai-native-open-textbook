---
title: "MCP Integration Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/mcp-integration.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/mcp-integration.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/mcp-integration.md"
sourceSha256: "77da9a1a84ba0e48e91c3798772d97791227235b9eeda2fca8cfb9f523eb0737"
pageSha256: "77da9a1a84ba0e48e91c3798772d97791227235b9eeda2fca8cfb9f523eb0737"
contentMode: "local-full"
zh: ""
---

# MCP Integration Reference

Loaded when troubleshooting MCP tool calls, debugging the fallback chain, or understanding the API response format.

---

## Tool Discovery

Always call `mcp_azure_mcp_aks` first to discover the current available tool surface. Do not assume a fixed action name — the available actions depend on the MCP server version deployed to the client.

```javascript
mcp_azure_mcp_aks({ action: "discover" })
```

The response lists available actions and their parameter schemas. Use the returned schema — do not hardcode parameter names.

---

## Assessment Call

After calling `discover`, use the assessment action name returned in the response. Pass parameters according to the discovered schema — do not hardcode action names or API versions.

Typical parameters include:
- `subscriptionId` — Azure subscription ID
- `resourceGroupName` — resource group containing the cluster
- `resourceName` — AKS cluster name
- `scope` (optional) — filter by namespaces or workload types

Example shape (use actual action name and schema from discover output):
```javascript
mcp_azure_mcp_aks({
