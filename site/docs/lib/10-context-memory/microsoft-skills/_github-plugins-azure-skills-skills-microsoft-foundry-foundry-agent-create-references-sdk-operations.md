---
title: "SDK Operations for Foundry Agent Service"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/sdk-operations.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/sdk-operations.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/sdk-operations.md"
sourceSha256: "08eba1bf38d3bb44d321ea1e15ed209efd6d9e6444c775d3f5018e99dbc55d0b"
pageSha256: "08eba1bf38d3bb44d321ea1e15ed209efd6d9e6444c775d3f5018e99dbc55d0b"
contentMode: "local-full"
zh: ""
---

# SDK Operations for Foundry Agent Service

Use the Foundry MCP tools for agent CRUD operations. When MCP tools are unavailable, use the `azure-ai-projects` Python SDK or REST API.

## Agent Operations via MCP

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| Create/Update agent | `agent_update` | Create a new agent or update an existing one (creates new version) |
| List/Get agents | `agent_get` | List all agents, or get a specific agent by name |
| Delete agent | `agent_delete` | Delete an agent |
| Invoke agent | `agent_invoke` | Send a message to an agent and get a response |
| Get schema | `agent_definition_schema_get` | Get the full JSON schema for agent definitions |

## SDK Agent Operations

When MCP tools are unavailable, use the `azure-ai-projects` Python SDK (`pip install azure-ai-projects --pre`):

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

endpoint = "https://<resource>.services.ai.azure.com/api/projects/<project>"
client = AIProjectClient(endpoint=endpoint, credential=DefaultAzureCredential())
```

| Operation | SDK Method |
|-----------|------------|
| Create | `client.agents.create_version(agent_name, definition)` |
| List | `client.agents.list()` |
| Get | `client.agents.get(agent_name)` |
| Update | `client.agents.create_version(agent_name, definition)` (creates new version) |
| Delete | `client.agents.delete(agent_name)` |
| Chat | <code v-pre>client.get_openai_client().responses.create(model=&lt;deployment>, input=&lt;text>, extra_body=\{"agent": \{"name": agent_name, "type": "agent_reference"}})</code> |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PROJECT_ENDPOINT` | Foundry project endpoint (`https://<resource>.services.ai.azure.com/api/projects/<project>`) |
| `MODEL_DEPLOYMENT_NAME` | Deployed model name (e.g., `gpt-4.1-mini`) |

## References

- [Agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart?view=foundry)
- [Create agents](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/create-agent?view=foundry)
- [Tool Catalog](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/tool-catalog?view=foundry)
