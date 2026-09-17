---
title: "Steps 6–7 — Optimize Prompt & Deploy New Version"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/optimize-deploy.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/optimize-deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/optimize-deploy.md"
sourceSha256: "8c326044bc4291f6a8bb9716310a6d1b9a8c7004581fdf8b3e75aa830ddd347d"
pageSha256: "8c326044bc4291f6a8bb9716310a6d1b9a8c7004581fdf8b3e75aa830ddd347d"
contentMode: "local-full"
zh: ""
---

# Steps 6–7 — Optimize Prompt & Deploy New Version

## Step 6 — Optimize Prompt

> ⛔ **Guardrail:** When optimizing after a dataset update, do NOT remove dataset rows or weaken evaluators to recover scores. Score drops on a harder dataset are expected — they mean test coverage improved, not that the agent regressed. Optimize for NEW failure patterns only.

Use **`prompt_optimize`** with:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `developerMessage` | ✅ | Agent's current system prompt / instructions |
| `deploymentName` | ✅ | Model for optimization (e.g., `gpt-4o-mini`) |
| `projectEndpoint` or `foundryAccountResourceId` | ✅ | At least one required |
| `requestedChanges` | | Concise improvement suggestions from cluster analysis |

**Example `requestedChanges`:** *"Be more specific when answering geography questions"*, *"Always cite sources when providing factual claims"*

> Use the optimized prompt returned by the tool. Do NOT manually rewrite.

## Step 7 — Deploy New Version

> **Always confirm before deploying.** Show the user a diff or summary of prompt changes and wait for explicit sign-off.

After approval:

1. Use **`agent_update`** to create a new agent version with the optimized prompt
2. Use **`agent_get`** to verify the updated version is `running`
3. If the updated version is not `running`, read and follow the [troubleshoot skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-troubleshoot-troubleshoot) before continuing

## Next Steps

When the new version is running → proceed to [Step 8: Re-Evaluate](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-references-compare-iterate).
