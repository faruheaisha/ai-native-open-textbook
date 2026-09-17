---
title: "Invoke Foundry Agent"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/invoke.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/invoke.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/invoke.md"
sourceSha256: "97961a9d30e8cee2e0e9f1bae56c66335ee25e87c7d8a14ff585e2accd38fa2c"
pageSha256: "97961a9d30e8cee2e0e9f1bae56c66335ee25e87c7d8a14ff585e2accd38fa2c"
contentMode: "local-full"
zh: ""
---

# Invoke Foundry Agent

Invoke Prompt Agents with Foundry MCP. Invoke Hosted Agents and manage their sessions, files, and logs with azd.

## Route by Agent Type

| Agent type | Protocol | Invoke path | State management |
|------------|----------|-------------|------------------|
| Prompt | — | Foundry MCP `agent_invoke` | `conversationId`; no hosted session or file operations |
| Hosted | `responses` | `azd ai agent invoke` | azd sessions, files, conversations, and monitor commands |
| Hosted | `invocations` | `azd ai agent invoke --protocol invocations` | azd sessions, files, conversations, and monitor commands |
| Hosted | `activity` | Microsoft 365 channel, such as Teams | Activity conversation and channel state |
| Hosted | `invocations_ws` | WebSocket client; follow [invocations-ws](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invocations-ws-invocations-ws) | Agent-managed state keyed by `agent_session_id` |

Treat an `azure.yaml` service with `host: azure.ai.agent` as Hosted. If the type is still unknown, use `agent_get` only to classify the agent. Do not use MCP invoke, session, or file tools for a Hosted Agent.

## Hosted Agent Workflow with azd

### Step 1: Verify the Agent

Inside an azd project, run:

```bash
azd ai agent show --output json
```

Verify that the deployed version is active. When multiple agent services exist, use the service name in subsequent commands.

When invoking outside an azd project with a known protocol endpoint, skip this step.

### Step 2: Invoke

Single-agent project:

```bash
azd ai agent invoke "hello, are you up?"
```

Multi-agent project:

```bash
azd ai agent invoke my-agent "hello, are you up?"
```

Protocol examples:

```bash
azd ai agent invoke --protocol invocations --input-file request.json
```

For invocations, inspect the agent source or OpenAPI contract before preparing the request body. See [Invocations Protocol Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invoke-references-invocations-protocol) for request schema discovery and examples.

Outside an azd project, use a full protocol endpoint supplied by the user or previously returned by `azd ai agent show`:

```bash
