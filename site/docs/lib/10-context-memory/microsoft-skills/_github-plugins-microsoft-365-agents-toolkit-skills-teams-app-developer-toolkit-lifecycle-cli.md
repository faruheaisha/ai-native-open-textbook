---
title: "Lifecycle and atk CLI"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/lifecycle-cli.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/lifecycle-cli.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/lifecycle-cli.md"
sourceSha256: "550bf2ef96d0afbe4174a707b60c000d004f0152f528f599e901847952f17165"
pageSha256: "550bf2ef96d0afbe4174a707b60c000d004f0152f528f599e901847952f17165"
contentMode: "local-full"
zh: ""
---

# Lifecycle and `atk` CLI

## purpose

M365 Agents Toolkit lifecycle configuration (`m365agents.yml`) and full `atk` CLI command reference for provisioning, deploying, and managing M365 agents (declarative agents, custom engine agents, Teams bots/tabs/message extensions, Copilot connectors, Office add-ins).

## rules

1. **m365agents.yml is the lifecycle manifest.** Every Agents Toolkit project has an `m365agents.yml` at the project root for dev/cloud deployment, and typically an `m365agents.local.yml` for local development. They define the `provision`, `deploy`, and `publish` lifecycle stages — each stage is an ordered list of actions. `atk provision --env local` runs `m365agents.local.yml`; `atk provision --env dev` runs `m365agents.yml`.
2. **Lifecycle stages run in order: provision → deploy → publish.** Provision creates cloud resources (Azure Bot, App Registration, resource groups). Deploy pushes app code to compute targets. Publish submits the app package to the Teams catalog.
