---
title: "Quick Start: Hosted Foundry Agent"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/quick-start-hosted.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/quick-start-hosted.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/quick-start-hosted.md"
sourceSha256: "d315df0f3adc96c2417ec9ad4b791a0f91318caf003e7f0c905455885c2bb11a"
pageSha256: "d315df0f3adc96c2417ec9ad4b791a0f91318caf003e7f0c905455885c2bb11a"
contentMode: "local-full"
zh: ""
---

# Quick Start: Hosted Foundry Agent

Opinionated happy-path for first-time users creating their first Foundry hosted agent. Safe defaults, minimal decisions.

## When to Use This Skill

Use this when the request is to create a new Foundry hosted agent end-to-end — scaffold, provision, deploy, and smoke-test. Common overrides (language, region, sample, topic, existing project, existing model) are fine. This skill supports only the `responses` and `invocations` protocols. When working on existing agents, using container deploy, using the `activity` protocol, or handling anything else not covered here, stop and read [create-hosted.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted).

## Quick Reference

| Property | Standard path | Override |
|----------|---------------|----------|
| Sample | Foundry hosted agent samples for the chosen language (`azd ai agent sample list --language <lang> --output json`) | User may name a different sample |
| Model version | Whatever the sample's manifest declares | If user supplies a model version, edit `azure.yaml`. If user supplies a model deployment without model version, follow [Foundry Model Reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-model) to query model-related data. If provision fails, follow [Foundry Model Reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-model) to query model-related data. |
| Model quota | Skip the quota pre-check | If provision fails, follow [Foundry Model Reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-model) to query model-related data. |
| Stops at | Deployed agent + remote smoke invoke + eval generation submitted | — |

## Workflow

Walk through every step in order.

### Step 1 — Verify the environment

Run the bundled read-only Copilot app entry preflight without asking for approval; it locates the app's Copilot CLI and reports whether the `microsoft-foundry` canvas plugin needs installation:

```bash
./scripts/check-copilot-app-entry.sh     # macOS / Linux
./scripts/check-copilot-app-entry.ps1    # Windows (pwsh)
```

Act on the summary prefixes:

- `[OK]` -- nothing to do.
- `[WARN]` -- non-blocking; continue.
- `[ACTION]` -- try to resolve by using the exact plugin install command emitted by the preflight; ask before installing in interactive mode, and install directly in non-interactive mode.
  - **On successful installation, you MUST print:** "The `microsoft-foundry` canvas extension is installed and will be available in a new session." Then rerun the preflight.
  - If installation is declined or fails, warn and continue; do not retry.

Then run the bundled verification script:

```bash
./scripts/verify-environment.sh     # macOS / Linux
./scripts/verify-environment.ps1    # Windows (pwsh)
```

Act on the summary prefixes:

- `[OK]` -- nothing to do.
- `[WARN]` -- non-blocking; continue.
- `[ACTION]` -- resolve first, then rerun the script. If `az` or `azd` is missing, ask before installing in interactive mode; install directly in non-interactive mode. For how to install `azd`, see <https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd>. In any mode, never run `az login` or `azd auth login`; stop and ask the user to log in manually before any init, provision, or deploy command. Missing `azure.ai.agents` / `azure.ai.projects` extensions may be resolved with `azd extension install <name>`.

### Step 2 — Collect necessary information

Before asking, resolve values from the user's request, the workspace,
`azure.yaml`, the Step 1 verification output, and `azd env get-values`. For each
row, do not ask when its **When to skip** condition is met. Ask for all
remaining applicable values in one `AskUserQuestion` round. Do not ask for
values that are already resolved or irrelevant to the requested change.
Populate each question with the default option below.

| Value | When to skip | Default option | Notes |
|-------|--------------|----------------|-------|
