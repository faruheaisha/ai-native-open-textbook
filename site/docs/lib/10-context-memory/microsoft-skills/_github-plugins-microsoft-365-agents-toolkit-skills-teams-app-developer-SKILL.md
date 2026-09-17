---
title: "Microsoft 365 Agents Toolkit Skill"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/SKILL.md"
sourceSha256: "0577a016f73f918981667f7d773035d04e7b21baa2423894f87771fb8e608b4b"
pageSha256: "0577a016f73f918981667f7d773035d04e7b21baa2423894f87771fb8e608b4b"
contentMode: "local-full"
zh: ""
---

# Microsoft 365 Agents Toolkit Skill

Build Microsoft 365 agents and Teams apps using the ATK CLI.

## AI Behavior Guidelines

1. **Testing Strategy:** Recommend Agents Playground first (faster, no M365 needed). Use Teams workflow only if user explicitly requests it.

2. **Environment Variables:** NEVER hardcode secrets or make up placeholder values. Always ask users for real values.

3. **Error Handling:** Read error messages carefully. Check `env/.env.local`, `.localConfigs`, and `atk auth list`. Common pitfalls:
   - **`AADSTS7000229`** → `aadApp/create` missing `generateServicePrincipal: true` in YAML — add it and re-provision
   - **Missing `TENANT_ID`** in `.localConfigs` → SDK uses wrong token authority → 401 from Bot Connector
   - **401 persists after auth fix** → devtunnel URL may be blacklisted — create a fresh tunnel
   - See [troubleshoot/troubleshoot.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-troubleshoot-troubleshoot) for full diagnostic steps

4. **Long-Running Commands — WAIT for completion:**
   - `atk new`, `atk provision`, `atk deploy` can take several minutes
   - Always wait for completion before running the next step (timeout 120000ms+)

5. **Local Service Startup — Hangs terminal (expected):**
   - `npm run dev`, `npm start`, `python app.py`, `devtunnel host`, etc. will hang — the process keeps running indefinitely
   - ALWAYS run as a background process (`isBackground=true`) — NEVER use `isBackground=false` for these commands
   - Do NOT wait for it to "finish" — verify startup by checking output for "listening on port" or tunnel URL
   - If errors appear, read logs, diagnose, fix, restart
   - Use a **NEW terminal** to launch Agents Playground or open Teams sideloading URL

6. **Monitor App Logs:** Periodically check background terminal output for runtime errors. If the app crashes, read the error, fix the root cause, and restart.

7. **Telemetry Tagging:** Before running any `atk` CLI commands, set the session environment variable so all CLI invocations are tagged as skill-initiated:
   ```bash
   export ATK_CLI_SKILL=true
   ```
   Run this once at the start of the session. All subsequent `atk` commands in the same terminal will inherit it.

## ATK CLI Setup

```bash
atk --version  # Must be > 1.1.5-beta
```

If ATK is not found or version is too old:

```bash
npm i -g @microsoft/m365agentstoolkit-cli@beta
```

## CLI Global Options

| Option | Meaning          | Recommendation                                                                                                                                                                   |
| ------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-i`   | Interactive mode | Always use `-i false` in automation to avoid hanging                                                                                                                             |
| `-f`   | Project folder   | Default to be current directory, used when specifying a custom folder. When scaffolding a new project, this is the parent folder where the project folder will be created under. |
| `-h`   | Command help     | Use `atk <command> -h` for quick syntax checks                                                                                                                                   |

## Sub-Skills

| Sub-Skill            | When to Use                                                                      | Reference                                                                    |
| -------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **create-project**   | Scaffold new project from template, choose template, `atk new`                   | [create-project/create-project.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-create-project-create-project)         |
| **test-playground**  | Test locally with Agents Playground, `agentsplayground`, quick testing           | [test-playground/test-playground.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-playground-test-playground)     |
| **test-teams**       | Run on Teams, devtunnel, sideload, Teams testing, test in Copilot                | [test-teams/test-teams.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-teams-test-teams)                         |
| **provision-deploy** | Provision Azure resources, deploy to cloud, `atk provision`, `atk deploy`        | [provision-deploy/provision-deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-provision-deploy-provision-deploy) |
| **troubleshoot**     | Fix errors, 401, port conflicts, YAML errors, stale bots                         | [troubleshoot/troubleshoot.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-troubleshoot-troubleshoot)                 |
| **slack-to-teams**   | Migrate Slack bot to Teams, cross-platform bridging, Block Kit to Adaptive Cards | [slack-to-teams/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-slack-to-teams-SKILL)                           |

> **MANDATORY:** Before executing any workflow, read the corresponding sub-skill document.

## Shared References

- [manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml) — Project files, YAML config, env vars, .localConfigs flow
- [commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-commands) — ATK CLI commands: package, validate, share, collaborate
- [templates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-templates) — Complete template catalog with language support
- [experts/](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts) — 100+ micro-expert files: Teams SDK, Slack SDK, cross-platform bridging, deploy, AI models, security, language conversion
- [docs/](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs) — Platform comparison guides: UI, messaging, identity, infrastructure, feature gaps

## Workflow Chains

Match user intent to the smallest valid workflow.

| User Intent                   | Workflow (read in order)                    |
| ----------------------------- | ------------------------------------------- |
| Build new app from scratch    | create-project → test-playground            |
| Test existing project locally | test-playground (recommended) or test-teams |
| Deploy to Azure               | provision-deploy                            |
| Fix broken bot                | troubleshoot → re-test                      |
| Migrate Slack bot to Teams    | slack-to-teams                              |

> **MANDATORY:** Before executing any slack-to-teams workflow, read [slack-to-teams/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-slack-to-teams-SKILL) first. The sub-skill contains a routed expert system with 100+ micro-expert files for cross-platform bot development.

## ATK Project Context Resolution

Resolve config values only when missing. If a value is already known in the session, reuse it.

### Step 1: Detect ATK Project

If `m365agentstoolkit*.yml` exists in the current folder, treat it as an ATK project and parse configuration.

### Step 2: Resolve Common Configuration

Resolve variables referenced in `m365agentstoolkit*.yml`. Common variables:
AZURE_OPENAI_API_KEY
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_DEPLOYMENT_NAME

### Step 3: Collect Missing Values

If required values are missing, ask the user for only the missing ones.

Refer to [manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml) for full config-file details.
