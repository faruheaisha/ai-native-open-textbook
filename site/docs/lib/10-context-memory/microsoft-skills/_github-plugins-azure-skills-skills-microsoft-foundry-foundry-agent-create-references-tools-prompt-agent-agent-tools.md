---
title: "Agent Tools"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/agent-tools.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/agent-tools.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/agent-tools.md"
sourceSha256: "0c930707c18a0b932a570fd77a266aec296690666ea84b75c6e2e933d81029e0"
pageSha256: "0c930707c18a0b932a570fd77a266aec296690666ea84b75c6e2e933d81029e0"
contentMode: "local-full"
zh: ""
---

# Agent Tools

This file is the **index** for every tool an agent can use. For each tool, it points to a dedicated reference file, and — where the tool is also available through a [toolbox](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-use-toolbox-in-hosted-agent) — lists the toolbox `type` value.

Two delivery paths exist:

- **Prompt agent** — the agent definition declares tool classes directly (`CodeInterpreterTool`, `MCPTool`, …). Use the SDK class column and the per-tool reference.
- **Hosted agent via toolbox** — the agent connects to a single MCP endpoint that exposes all tools declared in a toolbox version. Use the `type` column and see [use-toolbox-in-hosted-agent.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-use-toolbox-in-hosted-agent). For wiring the underlying project connection (catalog tile or generic remote MCP), see [foundry-tool-catalog.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-tool-catalog).

> 💡 **Authoritative tool shapes:** the source-of-truth for every tool's wire shape is the **Foundry Agents typespec** on the `main` branch of [`Azure/azure-rest-api-specs`](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/cognitiveservices). When in doubt about a field name, default, or new tool type that isn't yet documented here, load the typespec directly — it's updated as tools are added/changed.

## Tool Summary

| Tool | Prompt-agent SDK class | Connection? | Reference |
|------|------------------------|-------------|-----------|
| Code Interpreter | `CodeInterpreterTool` | No | [tool-code-interpreter.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-code-interpreter) |
| Function calling (client-side) | `FunctionTool` | No | [tool-function-calling.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-function-calling) |
| File Search | `FileSearchTool` | No (vector store required) | [tool-file-search.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-file-search) |
| Web Search (preview) | `WebSearchPreviewTool` | No (basic Bing); **Yes** for Grounding with Bing Custom Search — the connection scopes grounding to specific domains | [tool-web-search.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-web-search) |
| Bing Grounding | `BingGroundingTool` | Yes (Bing) | [tool-bing-grounding.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-bing-grounding) |
| Azure AI Search | `AzureAISearchTool` | Yes (Search) | [tool-azure-ai-search.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-azure-ai-search) |
| MCP server (remote) | `MCPTool` | Optional (none / static key / project MI / OAuth) | [tool-mcp.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-mcp); toolbox attach via [foundry-tool-catalog.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-tool-catalog) |
| OpenAPI tool | (n/a as a single class) | Conditional — `connection` auth requires `project_connection_id`; **`managed_identity` auth does NOT** (the project MI is used directly with an `audience`) | [tool-openapi.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-openapi) |
| Agent-to-Agent (A2A) | (n/a as a single class) | Optional | [tool-a2a.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-a2a) |
| Agent Memory | `MemorySearchPreviewTool` | Yes (project MI + embedding model) | [tool-memory.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-memory) |
| **Work IQ (preview)** | `WorkIQPreviewTool` | Yes (Work IQ BYO-Entra-app OAuth connection) | [tool-work-iq.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-work-iq) |
| **Fabric IQ (preview)** | `FabricIQPreviewTool` | Yes (Fabric IQ Entra-app OAuth or managed-OAuth connection) | [tool-fabric-iq.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-fabric-iq) |

> ⚠️ **Default for web search:** Use `WebSearchPreviewTool` (`type: web_search`) unless the user explicitly requests Bing Grounding or Bing Custom Search.

## How to use this index

When you need details for a specific tool, **load that tool's reference file directly** — each one is self-contained (shape, requirements, references). Don't try to keep all tools in context at once.

## Adjacent (not a `type` in a toolbox version)

- **Agent Memory** — use the `MemorySearchPreviewTool` SDK class on prompt agents; for hosted agents, configure the memory store via the project (separate from the toolbox). See [tool-memory.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-memory).
- **Routines (preview)** — not a tool; an agent **trigger** (`schedule` / `timer` / `github_issue` / `custom`) that invokes an existing agent. Event-based routines are powered by the same **Connector Namespace** that backs catalog-MCP / managed-MCP connectors. See the [public Routines docs](https://learn.microsoft.com/azure/foundry/agents/how-to/use-routines).

## References

- **[Foundry Agents typespec (`main`)](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/cognitiveservices)** — authoritative tool shapes
- [Tool Catalog](https://learn.microsoft.com/azure/foundry/agents/concepts/tool-catalog)
- [Toolbox (preview)](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/toolbox)
- [foundry-tool-catalog.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-tool-catalog) — project connections for remote tools
