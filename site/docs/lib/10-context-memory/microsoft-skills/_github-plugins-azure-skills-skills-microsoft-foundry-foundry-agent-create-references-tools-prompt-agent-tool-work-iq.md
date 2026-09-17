---
title: "Tool — Work IQ (preview)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-work-iq.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-work-iq.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-work-iq.md"
sourceSha256: "275dad23cd143a8a71425bd77cdaa47a7cb123ccbbfd82ac9ca28ebf62ea909e"
pageSha256: "275dad23cd143a8a71425bd77cdaa47a7cb123ccbbfd82ac9ca28ebf62ea909e"
contentMode: "local-full"
zh: ""
---

# Tool — Work IQ (preview)

Connect an agent to the user's Microsoft 365 work context — email, meetings, files, chats — through **Work IQ**. Work IQ runs as an A2A peer; every request runs in the context of the signed-in user and honors all Microsoft 365 permissions and sensitivity labels.

> 🚦 **Toolbox creation gate:** before creating a toolbox/connection, you MUST read the boundary rules in [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary) and follow them, then continue with the rest of this file.

## Toolbox shape

```json
{
  "type": "work_iq_preview",
