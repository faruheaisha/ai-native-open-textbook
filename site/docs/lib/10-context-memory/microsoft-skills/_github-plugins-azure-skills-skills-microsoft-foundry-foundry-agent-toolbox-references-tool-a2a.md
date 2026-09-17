---
title: "Tool — Agent-to-Agent (A2A) connection"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-a2a.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-a2a.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-a2a.md"
sourceSha256: "7f622d7b4988f88814f265ff7a6fc4a5fcb98dfb2ffcb7a5a96523ed146a8e92"
pageSha256: "7f622d7b4988f88814f265ff7a6fc4a5fcb98dfb2ffcb7a5a96523ed146a8e92"
contentMode: "local-full"
zh: ""
---

# Tool — Agent-to-Agent (A2A) connection

Create the `remote-a2a` connection that lets your agent call another A2A-compatible agent as a tool. The peer can be another Foundry agent or any external service that implements the A2A protocol.

## Create the connection

```bash
