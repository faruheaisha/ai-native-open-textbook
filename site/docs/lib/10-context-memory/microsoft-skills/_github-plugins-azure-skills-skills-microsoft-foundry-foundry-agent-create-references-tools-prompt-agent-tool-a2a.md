---
title: "Tool — Agent-to-Agent (A2A, preview)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-a2a.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-a2a.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-a2a.md"
sourceSha256: "6f09888ce6eb3bf450ee56e18f8314591e58df0e3d1e2b5a71be951d9083c0e1"
pageSha256: "6f09888ce6eb3bf450ee56e18f8314591e58df0e3d1e2b5a71be951d9083c0e1"
contentMode: "local-full"
zh: ""
---

# Tool — Agent-to-Agent (A2A, preview)

Call another Foundry agent as if it were a tool. Useful for composing specialist agents into an orchestrator.

## Toolbox shape

```json
{
  "type": "a2a_preview",
  "name": "<AGENT_NAME>",
  "description": "<what this agent does>",
  "base_url": "<AGENT_BASE_URL>",
  "project_connection_id": "<connection_to_target_project>"
}
```

Auth is either anonymous (for the same project) or via a project connection that holds credentials for the remote agent's host.

## References

- [A2A tool documentation](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/agent-to-agent)
- [agent-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-agent-tools) — tool index
