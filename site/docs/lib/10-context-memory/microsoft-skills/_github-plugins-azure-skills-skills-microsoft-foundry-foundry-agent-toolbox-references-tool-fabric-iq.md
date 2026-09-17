---
title: "Tool — Fabric IQ (type: fabriciqpreview) — preview"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-fabric-iq.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-fabric-iq.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-fabric-iq.md"
sourceSha256: "d23e451c45520c658c2bdfbd224b4a57d84638fab161b6811d3beb167d584632"
pageSha256: "d23e451c45520c658c2bdfbd224b4a57d84638fab161b6811d3beb167d584632"
contentMode: "local-full"
zh: ""
---

# Tool — Fabric IQ (`type: fabric_iq_preview`) — preview

Microsoft Fabric data (**Ontology** / **Fabric data agent** / **Power BI semantic model**) via Fabric IQ. Fabric IQ is exposed as an **MCP-style tool**: a flat tool entry carrying a `server_url` (the Fabric MCP endpoint for your artifact) + a `project_connection_id`. The workspace / ontology / artifact ids live in the **connection's target URL**, not the tool. Auth is a Fabric OAuth connection and requires **tenant admin consent**. For the toolbox concept, versions, and endpoint, see [toolbox.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox).

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

---

## Prerequisite — a Fabric artifact + connection

1. **Tenant admin consent** for the Fabric IQ OAuth app before any user can invoke the tool.
2. A Microsoft Fabric artifact — an **Ontology**, **Fabric data agent**, or **Power BI semantic model** — in a workspace you can reach.
3. A **`RemoteTool`** connection on the project pointing at that artifact's Fabric MCP endpoint. The endpoint encodes the workspace + artifact ids, e.g. for an ontology:
