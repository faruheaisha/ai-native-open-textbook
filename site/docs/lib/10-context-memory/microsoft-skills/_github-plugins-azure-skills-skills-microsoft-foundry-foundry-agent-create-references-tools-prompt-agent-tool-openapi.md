---
title: "Tool — OpenAPI"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-openapi.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-openapi.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-openapi.md"
sourceSha256: "9350e8a8c21eddb736e67ac3b39017a9073ff445a7098ba1fcd242ceb36b8501"
pageSha256: "9350e8a8c21eddb736e67ac3b39017a9073ff445a7098ba1fcd242ceb36b8501"
contentMode: "local-full"
zh: ""
---

# Tool — OpenAPI

Expose a REST API to the agent by attaching its OpenAPI 3.x spec. The platform parses the spec and synthesizes one tool per operation.

## Toolbox shape (anonymous)

```json
{
  "type": "openapi",
  "openapi": {
    "spec": { /* inlined OpenAPI 3.x document */ },
    "auth": { "type": "anonymous" }
  }
}
```

## `auth.type` values

- **`anonymous`** — no credentials sent.
- **`connection`** with `project_connection_id` — Foundry attaches a static API key (or OAuth tokens) from the named project connection. **`project_connection_id` is required only here.**
- **`managed_identity`** with `audience` — the project's managed identity calls the target API. **No `project_connection_id` is required**; Foundry uses the project MI and acquires a token for the supplied `audience` (the target service's resource URI). You must grant the project MI the appropriate RBAC role on the target service or the agent receives `401 Unauthorized`.

## Multi-entry rules

Multiple `openapi` entries are allowed in one toolbox **only if** each entry's spec defines a distinct `info.title` (the title is the implicit identifier). See [toolbox-azd.md § Multi-tool rule](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-toolbox-azd#multi-tool-rule).

## References

- [OpenAPI tool documentation](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/openapi)
- [agent-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-agent-tools) — tool index
- [foundry-tool-catalog.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-tool-catalog) — project connections for the `connection` auth path
