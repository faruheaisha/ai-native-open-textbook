---
title: "Agent Metadata Contract"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/references/agent-metadata-contract.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/references/agent-metadata-contract.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/references/agent-metadata-contract.md"
sourceSha256: "4434487f9664be3cc52a6ba31e398d4053efd72b383fff2cbf9e45407f8e2c53"
pageSha256: "4434487f9664be3cc52a6ba31e398d4053efd72b383fff2cbf9e45407f8e2c53"
contentMode: "local-full"
zh: ""
---

# Agent Metadata Contract

Use this contract for Microsoft Foundry agent folders. In azd projects, `.foundry/agent-metadata*.yaml` is an overlay/cache, not the source of truth for azd-owned deployment context.

## Local Layout

```text
