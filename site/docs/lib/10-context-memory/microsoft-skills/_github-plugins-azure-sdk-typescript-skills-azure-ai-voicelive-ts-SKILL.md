---
title: "@azure/ai-voicelive (JavaScript/TypeScript)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-voicelive-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-ai-voicelive-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-ai-voicelive-ts/SKILL.md"
sourceSha256: "d288827a7769dba34a4154b0981feee766ecefcd64ccd5e052f21d5e064d4d04"
pageSha256: "d288827a7769dba34a4154b0981feee766ecefcd64ccd5e052f21d5e064d4d04"
contentMode: "local-full"
zh: ""
---

# @azure/ai-voicelive (JavaScript/TypeScript)

Real-time voice AI SDK for building bidirectional voice assistants with Azure AI in Node.js and browser environments.

## Installation

```bash
npm install @azure/ai-voicelive @azure/identity
# TypeScript users
npm install @types/node
```

**Current Version**: 1.0.0-beta.3

**Supported Environments**:
- Node.js LTS versions (20+)
- Modern browsers (Chrome, Firefox, Safari, Edge)

## Environment Variables

```bash
AZURE_VOICELIVE_ENDPOINT=https://<resource>.cognitiveservices.azure.com
# Optional: API key if not using Entra ID
