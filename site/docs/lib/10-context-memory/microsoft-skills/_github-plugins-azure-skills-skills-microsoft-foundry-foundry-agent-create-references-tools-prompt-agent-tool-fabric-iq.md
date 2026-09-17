---
title: "Tool — Fabric IQ (preview)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-fabric-iq.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-fabric-iq.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-fabric-iq.md"
sourceSha256: "2b3126798bbbc7a1cdaa1ebc4cb8fde9a319233bde35432a757c276b67dcd74c"
pageSha256: "2b3126798bbbc7a1cdaa1ebc4cb8fde9a319233bde35432a757c276b67dcd74c"
contentMode: "local-full"
zh: ""
---

# Tool — Fabric IQ (preview)

Connect an agent to Microsoft Fabric data — Ontology, Fabric data agents, and Power BI semantic models — through **Fabric IQ**. The agent delegates natural-language questions; Fabric IQ runs them against the enterprise ontology (NL2Ontology) and returns synthesized answers under the signed-in user's Fabric permissions.

## Toolbox shape

```json
{
  "type": "fabric_iq_preview",
