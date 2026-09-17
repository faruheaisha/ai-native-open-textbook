---
title: "Agentic RFT — Tool Calling"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/agentic-rft.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/agentic-rft.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/agentic-rft.md"
sourceSha256: "25a6ed20523edd2a2cf1bdf2d0a9c25de1bab291ea8194ad19d380fd49e021e6"
pageSha256: "25a6ed20523edd2a2cf1bdf2d0a9c25de1bab291ea8194ad19d380fd49e021e6"
contentMode: "local-full"
zh: ""
---

# Agentic RFT — Tool Calling

Train reasoning models (o4-mini) for agentic scenarios where the model invokes external tools during chain-of-thought reasoning.

> ⚠️ **Access required**: Agentic RFT with tool calling and GPT-5 RFT are behind feature flags. You must request access through the Microsoft Foundry portal or your Microsoft account team. o4-mini RFT without tools is generally available.

## Tool Definition Format

```python
tools = [
    {
        "name": "search",
        "server_url": "https://your-function-app.azurewebsites.net/api/tools",
        "headers": {
