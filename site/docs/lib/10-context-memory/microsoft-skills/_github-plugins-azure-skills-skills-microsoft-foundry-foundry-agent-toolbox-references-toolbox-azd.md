---
title: "Manage Tools & Toolboxes with azd ai"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/toolbox-azd.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/toolbox-azd.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/toolbox-azd.md"
sourceSha256: "bf08aeaf424673ad44acc88ad677d16d785931ec9b31e0c7522826569b1a11c4"
pageSha256: "bf08aeaf424673ad44acc88ad677d16d785931ec9b31e0c7522826569b1a11c4"
contentMode: "local-full"
zh: ""
---

# Manage Tools & Toolboxes with `azd ai`

The full `azd ai toolbox` CLI surface — creating, editing, versioning, and teardown. For the create→consume walkthrough and per-tool flows, see [toolbox.md § Create & use a toolbox (happy path)](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#create--use-a-toolbox-happy-path) and the [Supported tool types](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#supported-tool-types) table.

## CLI surface

| Command | What it does |
|---------|--------------|
| `azd extension install azure.ai.toolboxes` | Install the toolbox CLI extension (once). |
| `azd ai toolbox create <name> --from-file <path>` | Create toolbox + its first version. File must list at least one connection, skill, or tool. |
| `azd ai toolbox connection add <toolbox> <connection> [--index ...] [--instance-name ...]` | Attach one; creates a new version (default unchanged). |
| `azd ai toolbox connection add <toolbox> --from-file <path>` | Attach many **connections** in one call; ONE new version (default unchanged). Connectionless built-ins aren't supported here — see the note under [`--from-file` schema](#--from-file-schema). |
| `azd ai toolbox connection remove <toolbox> <connection>` | Detach; creates a new version (default unchanged). Refuses to leave zero tools. |
| `azd ai toolbox show <name> [--version <ver>]` | Show toolbox + MCP endpoint URL. |
| `azd ai toolbox list` | List toolboxes. |
| `azd ai toolbox versions list <toolbox>` | List versions. |
| `azd ai toolbox publish <name> <version>` | Promote a version to default (also used to roll back). |
| `azd ai toolbox delete <name> [--version <ver>] [--force]` | Delete toolbox or one version. |

Every mutation publishes a new immutable version but does **not** change the default; run `azd ai toolbox publish <name> <version>` to promote one.

## `--from-file` schema

The YAML/JSON passed to `azd ai toolbox create --from-file` lists the connections to bundle, plus an optional `tools:` block for connectionless built-ins.

> Note: `azd ai toolbox connection add --from-file` attaches **connections** only. Connectionless built-ins (the `tools:` block — `web_search`, `code_interpreter`, `file_search`, `toolbox_search_preview`) can't be added to an existing toolbox; recreate it with `azd ai toolbox create --from-file` and the full desired tool set.

```yaml
description: research toolbox    # only on `create`
connections:
  - name: my-mcp                 # RemoteTool
  - name: my-search              # CognitiveSearch -- needs index
    index: products
  - name: my-a2a                 # RemoteA2A
tools:                           # connectionless built-ins (optional)
  - type: web_search
    name: web
  - type: code_interpreter
    container: { type: auto }
  - type: file_search
