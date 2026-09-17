---
title: "Foundry Agent Troubleshoot"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/troubleshoot/troubleshoot.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/troubleshoot/troubleshoot.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/troubleshoot/troubleshoot.md"
sourceSha256: "46fbc87daada93ffc66f2b79569035e6139949ff69aaa2041c5a8d84f3332122"
pageSha256: "46fbc87daada93ffc66f2b79569035e6139949ff69aaa2041c5a8d84f3332122"
contentMode: "local-full"
zh: ""
---

# Foundry Agent Troubleshoot

Troubleshoot and debug Foundry agents by collecting Hosted Agent logs with azd, discovering observability connections, and querying Application Insights telemetry.

## Quick Reference

| Property | Value |
|----------|-------|
| MCP servers | `azure` |
| Hosted Agent CLI | `azd ai agent show`, `sessions`, `monitor` |
| Related skills | `trace` (telemetry analysis) |
| Preferred query tool | `monitor_resource_log_query` (Azure MCP) — preferred over `azure-kusto` for App Insights |
| CLI references | `azd ai agent show`, `azd ai agent sessions`, `azd ai agent monitor`, `az cognitiveservices account connection` |

## When to Use This Skill

- Agent is not responding or returning errors
- Hosted agent version is not becoming active
- Need to view hosted-agent session logs
- Diagnose latency or timeout issues
- Query Application Insights for agent traces and exceptions
- Investigate agent runtime failures

## Workflow

### Step 1: Collect Agent Information

Use the project endpoint and agent name from the project context (see [Common Project Context Resolution](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-SKILL#agent-common-project-context-resolution)). Ask the user only for values not already resolved:
- **Project endpoint** — Microsoft Foundry project endpoint URL
- **Agent name** — Name of the agent to troubleshoot

### Step 2: Identify a Hosted Agent

Treat an `azure.yaml` service with `host: azure.ai.agent` as Hosted. Run:

```bash
azd ai agent show --output json
```

If azd returns Hosted Agent details, proceed to Step 3. If the command fails for an identified Hosted Agent, diagnose the reported error instead of proceeding to Step 4. Proceed to Step 4 only when `azure.yaml` has no Hosted Agent service.

### Step 3: Retrieve Logs (Hosted Agents Only)

Hosted Agent logs are scoped to sessions. Use azd for session discovery and log retrieval.

> **`invocations_ws` agents:** use the client-supplied `agent_session_id` from the WebSocket upgrade URL. It is not created by `azd ai agent invoke`. Pass it to `azd ai agent monitor --session-id`. See the [invocations-ws skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invocations-ws-invocations-ws) for the URL contract.

1. **Check agent version status.** Use the result from Step 2 and verify that the deployed version is `active`.

2. **Read logs from the current session.** `monitor` automatically reuses the session saved by the last azd invoke:

   ```bash
   azd ai agent monitor --tail 100
   ```

3. **Select another session when needed.** If no session is saved or the user needs a different one, run:

   ```bash
   azd ai agent sessions list --output table
