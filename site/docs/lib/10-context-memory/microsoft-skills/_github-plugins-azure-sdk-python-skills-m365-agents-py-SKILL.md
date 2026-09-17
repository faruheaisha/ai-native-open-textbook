---
title: "Microsoft 365 Agents SDK (Python)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/m365-agents-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/m365-agents-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/m365-agents-py/SKILL.md"
sourceSha256: "cd3b4a536bab82b795960a3ba728bf74345729a6cb278a50913639d5d77609a0"
pageSha256: "cd3b4a536bab82b795960a3ba728bf74345729a6cb278a50913639d5d77609a0"
contentMode: "local-full"
zh: ""
---

# Microsoft 365 Agents SDK (Python)

Build enterprise agents for Microsoft 365, Teams, and Copilot Studio using the Microsoft Agents SDK with aiohttp hosting, AgentApplication routing, streaming responses, and MSAL-based authentication.

## Before implementation

- Use the microsoft-docs MCP to verify the latest API signatures for AgentApplication, start_agent_process, and authentication options.
- Confirm package versions on PyPI for the microsoft-agents-\* packages you plan to use.

## Important Notice - Import Changes

> **⚠️ Breaking Change**: Recent updates have changed the Python import structure from `microsoft.agents` to `microsoft_agents` (using underscores instead of dots).

## Installation

```bash
pip install microsoft-agents-hosting-core
pip install microsoft-agents-hosting-aiohttp
pip install microsoft-agents-activity
pip install microsoft-agents-authentication-msal
pip install microsoft-agents-copilotstudio-client
pip install python-dotenv aiohttp
```

## Environment Variables (.env)

```bash
