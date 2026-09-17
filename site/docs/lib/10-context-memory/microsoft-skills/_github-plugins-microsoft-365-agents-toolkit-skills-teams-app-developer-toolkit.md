---
title: "M365 Agents Toolkit — Toolchain Knowledge"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/README.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/README.md"
sourceSha256: "f4d60569fc87c2769ee2515ca108ebc20871fa62b5cb38a941d5c9392c77a12c"
pageSha256: "f4d60569fc87c2769ee2515ca108ebc20871fa62b5cb38a941d5c9392c77a12c"
contentMode: "local-full"
zh: ""
---

# M365 Agents Toolkit — Toolchain Knowledge

Reference material for the **toolchain** itself: the `atk` CLI, the `m365agents.yml` lifecycle, environment files, project templates, manifests, the Agents Playground, and publishing.

This content is **capability-agnostic** — it applies to every project type the toolkit supports: Teams bots, declarative agents, API plugins, Copilot connectors, Office add-ins, custom engine agents, RAG agents, message extensions, tabs.

For SDK code patterns (handlers, AI prompts, Adaptive Cards, MCP, OAuth, etc.), see the sibling [../experts/](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-2) folder. For Slack-vs-Teams platform comparison, see [../docs/](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs).

## Files

| File | Scope |
|---|---|
| [templates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-templates) | Full `atk new -c` capability catalog: declarative agents (8 variants), Copilot connectors, Office add-ins, Teams bots/tabs/message extensions, custom engine agents, RAG agents |
| [commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-commands) | `atk` CLI reference outside the lifecycle: `add action`, `add auth-config`, `regenerate action`, `share`, `collaborator`, `env`, `install/uninstall`, `upgrade`, `doctor` |
| [lifecycle-cli.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-lifecycle-cli) | Lifecycle CLI commands (`provision`, `deploy`, `package`, `validate`, `preview`) and the full `m365agents.yml` action catalog |
| [manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml) | `appPackage/manifest.json` + `appPackage/declarativeAgent.json`, YAML action field reference, common-mistake table, `signInAudience` configuration |
| [environments.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-environments) | `env/.env.\{name\}` + `.user` files, <code v-pre>${{VAR}}</code> resolution, `SECRET_` prefix, `.localConfigs` flow, multi-environment isolation |
| [playground.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-playground) | Agents Playground (`agentsplayground` CLI, `.m365agentsplayground.yml`, channel emulation, activity simulation) |
| [publish.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-publish) | Publishing workflow: sideload → org catalog (`atk publish`) → Teams Store / Partner Center; version bumping, validation requirements |

## Capability matrix

| Capability | Templates | What applies from this folder |
|---|---|---|
| **Declarative agents** | `declarative-agent`, `declarative-agent-action*`, `declarative-agent-with-*`, `declarative-agent-meta-os-*`, `declarative-agent-typespec` | All except `playground.md` (DAs run in M365 Copilot, not Playground). Sideload via `M365_APP_ID`. |
| **API plugins** | `declarative-agent-action-from-existing-api`, `add action` | All. Use `commands.md` for `atk add action` and `manifest-and-yaml.md` for OpenAPI integration. |
| **Copilot connectors** | `copilot-connector` | `templates.md`, `commands.md`, `lifecycle-cli.md`, `environments.md`. |
| **Custom engine agents** | `basic-custom-engine-agent`, `weather-agent`, `foundry-agent-to-m365`, `coffee-agent`, `data-analyst-agent-v2` | All. Compute deploy via `lifecycle-cli.md` (`arm/deploy` + `azureAppService/zipDeploy`). |
| **Teams bots / tabs / message extensions** | `bot`, `tab`, `message-extension`, `teams-agent*`, `teams-collaborator-agent`, `bot-sso` | All. Pair with [../experts/teams/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/teams/README.md) for SDK code patterns. |
| **Office add-ins** | `office-addin-outlook-taskpane`, `office-addin-wxpo-taskpane`, `office-addin-excel-cfshortcut`, `office-addin-config` | `templates.md`, `commands.md`, `lifecycle-cli.md`. Add-in-specific runtime is out of scope here. |

## Cross-references

- Workflow how-tos that consume this knowledge live one level up: [../create-project/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/create-project/README.md), [../test-playground/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/test-playground/README.md), [../test-teams/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/test-teams/README.md), [../provision-deploy/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/provision-deploy/README.md), [../troubleshoot/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/troubleshoot/README.md).
- For Teams-bot SDK code (DevtoolsPlugin, ConsoleLogger, runtime handlers, Adaptive Cards): see [../experts/teams/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/teams/README.md).
- For deploying without ATK (manual `az` CLI walkthrough): see [../experts/deploy/azure-bot-deploy-ts.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-deploy-azure-bot-deploy-ts).
