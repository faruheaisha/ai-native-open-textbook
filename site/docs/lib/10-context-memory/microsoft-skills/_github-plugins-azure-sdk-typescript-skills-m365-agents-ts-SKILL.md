---
title: "Microsoft 365 Agents SDK (TypeScript)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/m365-agents-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/m365-agents-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/m365-agents-ts/SKILL.md"
sourceSha256: "6e4d92ab2e19baa8136419195394789218c2a9157ddd87100cf352870b379bdc"
pageSha256: "6e4d92ab2e19baa8136419195394789218c2a9157ddd87100cf352870b379bdc"
contentMode: "local-full"
zh: ""
---

# Microsoft 365 Agents SDK (TypeScript)

Build enterprise agents for Microsoft 365, Teams, and Copilot Studio using the Microsoft 365 Agents SDK with Express hosting, AgentApplication routing, streaming responses, and Copilot Studio client integrations.

## Before implementation

- Use the microsoft-docs MCP to verify the latest API signatures for AgentApplication, startServer, and CopilotStudioClient.
- Confirm package versions on npm before wiring up samples or templates.

## Installation

```bash
npm install @microsoft/agents-hosting @microsoft/agents-hosting-express @microsoft/agents-activity
npm install @microsoft/agents-copilotstudio-client
```

## Environment Variables

```bash
PORT=3978
