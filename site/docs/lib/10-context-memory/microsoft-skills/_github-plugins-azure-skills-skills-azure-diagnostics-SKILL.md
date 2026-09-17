---
title: "Azure Diagnostics"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/SKILL.md"
sourceSha256: "513f4aae9d13460a83edee10c03e56b099532fd905bf7ec0bf825a02ce10fb45"
pageSha256: "513f4aae9d13460a83edee10c03e56b099532fd905bf7ec0bf825a02ce10fb45"
contentMode: "local-full"
zh: ""
---

# Azure Diagnostics

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This document is the **official source** for debugging and troubleshooting Azure production issues. Follow these instructions to diagnose and resolve common Azure service problems systematically.

## Triggers

Activate this skill when user wants to:
- Debug or troubleshoot production issues
- Diagnose errors in Azure services
- Analyze application logs or metrics
- Fix image pull, cold start, or health probe issues
- Investigate why Azure resources are failing
- Find root cause of application errors
- Troubleshoot App Service issues (high CPU, deployment failures, crashes, slow responses, TLS/custom domains)
- Respond to prompts like "troubleshoot app service", "app service high CPU", or "app service deployment failure"
- Troubleshoot Azure Function Apps (invocation failures, timeouts, binding errors)
- Find the App Insights or Log Analytics workspace linked to a Function App
- Troubleshoot AKS clusters, nodes, pods, ingress, or Kubernetes networking issues
- Troubleshoot Azure VM connectivity issues (RDP/SSH failures, port 3389/22 timeouts, NSG or firewall blocking, credential resets)
- Troubleshoot Azure Messaging SDK issues (Event Hubs, Service Bus connection failures, AMQP errors, message lock issues)

## Rules

1. Start with systematic diagnosis flow
2. Use AppLens (MCP) for AI-powered diagnostics when available
3. Check resource health before deep-diving into logs
4. Select appropriate troubleshooting guide based on service type
5. Document findings and attempted remediation steps
6. Route AKS incidents to the dedicated AKS troubleshooting document

---

## Quick Diagnosis Flow

1. **Identify symptoms** - What's failing?
2. **Check resource health** - Is Azure healthy?
3. **Review logs** - What do logs show?
4. **Analyze metrics** - Performance patterns?
5. **Investigate recent changes** - What changed?

---

## Troubleshooting Guides by Service

| Service | Common Issues | Reference |
|---------|---------------|-----------|
| **Container Apps** | Image pull failures, cold starts, health probes, port mismatches | [container-apps/](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-references-container-apps) |
| **App Service** | High CPU, deployment failures, crashes, slow responses, TLS/custom domains | [app-service/](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-references-app-service) |
| **Function Apps** | App details, invocation failures, timeouts, binding errors, cold starts, missing app settings | [functions/](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-references-functions) |
| **AKS** | Cluster access, nodes, `kube-system`, scheduling, crash loops, ingress, DNS, upgrades | [AKS Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-aks-troubleshooting) |
| **Compute** | VM RDP/SSH connectivity, NSG/firewall blocks, credential resets, VM agent/tooling issues | [VM Connectivity Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-vm-troubleshooting) |
| **Messaging** | Event Hubs & Service Bus SDK errors, AMQP failures, message lock, connectivity | [Messaging Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging) |

---

## Routing

- Keep Container Apps and Function Apps diagnostics in this parent skill.
- Route active AKS incidents, AKS-specific intake, evidence gathering, and remediation guidance to [AKS Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-aks-troubleshooting).
- Route Azure VM RDP/SSH connectivity, NSG/firewall, credential reset, and VM agent troubleshooting to [VM Connectivity Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-vm-troubleshooting).
- Route Azure Messaging SDK troubleshooting (Event Hubs, Service Bus) to [Messaging Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging).

---

## Quick Reference

### Common Diagnostic Commands

```bash
# Check resource health
az resource show --ids RESOURCE_ID
# View activity log
az monitor activity-log list -g RG --max-events 20
# Container Apps logs
az containerapp logs show --name APP -g RG --follow
# Function App logs (query App Insights traces)
az monitor app-insights query --apps APP-INSIGHTS -g RG \
  --analytics-query "traces | where timestamp > ago(1h) | order by timestamp desc | take 50"
```

### AppLens (MCP Tools)

For AI-powered diagnostics, use:
```
mcp_azure_mcp_applens
