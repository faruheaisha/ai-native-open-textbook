---
title: "Tool — OpenAPI (type: openapi)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-openapi.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-openapi.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-openapi.md"
sourceSha256: "d1bd5419668f9e5a66d7bfc32c382d43c035981293640bcf50640edb180e355e"
pageSha256: "d1bd5419668f9e5a66d7bfc32c382d43c035981293640bcf50640edb180e355e"
contentMode: "local-full"
zh: ""
---

# Tool — OpenAPI (`type: openapi`)

Expose a REST API to the agent from its **OpenAPI 3.x spec**. The spec is embedded **inline** in the toolbox `tools:` block (under an `openapi` object) — this is a connectionless built-in, **not** a connection-backed tool. API-key auth is the one mode that also needs a `custom-keys` connection. For the toolbox concept, versions, and endpoint, see [toolbox.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox).

Each operation becomes one tool named `\{name\}___\{operationId\}`, so every operation in the spec needs an `operationId` (letters, `-`, `_` only).

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

## Tool entry shape

```yaml
tools:
  - type: openapi
    openapi:
      name: catfacts            # tool-name prefix: {name}___{operationId}
      spec: { <inline OpenAPI 3.x document> }
      auth: { type: anonymous } # or connection / managed_identity — see below
```

## Auth modes

| Auth | `auth` object | Connection needed? |
|---|---|---|
| Anonymous | `\{ type: anonymous \}` | No |
