---
title: "Local Run Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/local-run.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/local-run.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/local-run.md"
sourceSha256: "f49e296a064c0cf6b8b85ba80ac79168feb120cc5bf60bf33a01f91bac5d5095"
pageSha256: "f49e296a064c0cf6b8b85ba80ac79168feb120cc5bf60bf33a01f91bac5d5095"
contentMode: "local-full"
zh: ""
---

# Local Run Reference

Use this when iterating on a hosted agent before deploying.

> **Prerequisite:** Local run does NOT require `azd provision` or any deployed Azure infrastructure. The agent runs on your machine and calls the Foundry model endpoint directly using your local credentials (`DefaultAzureCredential` — falls back to `az login` / VS Code identity). You only need a `.env` file in the agent directory with:
> ```env
> FOUNDRY_PROJECT_ENDPOINT=https://&lt;account>.services.ai.azure.com/api/projects/&lt;project>
