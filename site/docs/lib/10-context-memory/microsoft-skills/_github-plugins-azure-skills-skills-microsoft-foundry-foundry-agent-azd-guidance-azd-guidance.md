---
title: "Foundry azd Guidance"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/azd-guidance/azd-guidance.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/azd-guidance/azd-guidance.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/azd-guidance/azd-guidance.md"
sourceSha256: "ec0ca086da1be842b7be511f836ba71e670cb5d77171bdf10240dd994760e4aa"
pageSha256: "ec0ca086da1be842b7be511f836ba71e670cb5d77171bdf10240dd994760e4aa"
contentMode: "local-full"
zh: ""
---

# Foundry azd Guidance

Read this skill before running any Foundry agent workflow that uses azd. Also use it for direct questions about Foundry-specific azd commands.

## Shared Rules

1. Always set `AZURE_DEV_USER_AGENT=microsoft_foundry_skill` when running azd commands, for example:

   ```bash
   AZURE_DEV_USER_AGENT=microsoft_foundry_skill azd ai agent init
   AZURE_DEV_USER_AGENT=microsoft_foundry_skill azd ai agent run --no-client
   AZURE_DEV_USER_AGENT=microsoft_foundry_skill azd provision
   AZURE_DEV_USER_AGENT=microsoft_foundry_skill azd deploy
   AZURE_DEV_USER_AGENT=microsoft_foundry_skill azd ai agent invoke
   ```

Set it inline only (as shown above). Never persist it into code or committed config (for example, `azd env set`, `.env`, or `azure.yaml`). It is a local-development-only setting.

2. If an azd command or flag is unclear, run the relevant `azd ... --help` command and follow its output.
3. Unless the user explicitly asks to open a client, run `azd ai agent run --no-client`.
4. Run project-scoped `azd` commands inside the project folder, not from its parent folder.
5. If the needed azd guidance is not covered here or remains unclear, read [azd ai CLI Reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-references-azd-ai-cli).
