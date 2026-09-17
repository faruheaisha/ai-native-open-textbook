---
title: "Skills in Toolbox"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/skills/skill-toolbox-attach.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/skills/skill-toolbox-attach.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/skills/skill-toolbox-attach.md"
sourceSha256: "45177496c2fa0f485ec392d651c96dfce3f117de95a02291b748213b4c293158"
pageSha256: "45177496c2fa0f485ec392d651c96dfce3f117de95a02291b748213b4c293158"
contentMode: "local-full"
zh: ""
---

# Skills in Toolbox

How to attach, list, remove, and version **skills** (reusable behavioral guidelines) in a Foundry toolbox using `azd ai toolbox skill`.

Skills are not a tool `type` — they live in a separate `skills[]` array in the toolbox manifest. At the MCP level, skills are exposed as **resources** (`resources/list` / `resources/read` with `skill://` URIs).

## Install

```bash
azd extension install azure.ai.skills       # skill CRUD
azd extension install azure.ai.toolboxes    # toolbox management
```

## CLI surface — `azd ai toolbox skill`

| Command | What it does |
|---------|--------------|
| `azd ai toolbox skill add <toolbox> <skill>` | Attach skill (follows default version); new immutable toolbox version. |
| `azd ai toolbox skill add <toolbox> <skill>@<ver>` | Attach skill pinned to a specific version. |
| `azd ai toolbox skill add <toolbox> --from-file <path>` | Attach multiple skills from JSON/YAML. |
| `azd ai toolbox skill list <toolbox>` | List skill references in the toolbox. |
| `azd ai toolbox skill remove <toolbox> <skill> [<skill>...] [--force]` | Detach skills; one new version. |

> Every `skill add` / `skill remove` creates a new immutable toolbox version but does **not** change the default. Run `azd ai toolbox publish <toolbox> <version>` to promote.

## Recipe: attach skill to existing toolbox

```bash
# 1. Create the skill (if not already uploaded)
azd ai skill create support-style --file ./skills/support-style/

# 2. Attach to toolbox
azd ai toolbox skill add agent-tools support-style

# 3. Promote the new toolbox version
