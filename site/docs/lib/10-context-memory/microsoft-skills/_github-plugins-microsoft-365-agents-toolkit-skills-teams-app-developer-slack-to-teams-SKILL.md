---
title: "Slack to Teams Expert System"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/slack-to-teams/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/slack-to-teams/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/slack-to-teams/SKILL.md"
sourceSha256: "dfa8d4b75d5154b585ac470678d8bfee07e17af6c8bc804815f9b304763b50ba"
pageSha256: "dfa8d4b75d5154b585ac470678d8bfee07e17af6c8bc804815f9b304763b50ba"
contentMode: "local-full"
zh: ""
---

# Slack to Teams Expert System

A routed expert system with 100+ micro-expert files for migrating Slack bots to Teams and building cross-platform bots.

> **Parent skill:** For ATK CLI setup and routing, see [../SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-SKILL). For local testing, see [../test-playground/test-playground.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-playground-test-playground) or [../test-teams/test-teams.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-teams-test-teams). For cloud deploy, see [../provision-deploy/provision-deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-provision-deploy-provision-deploy). For troubleshooting, see [../troubleshoot/troubleshoot.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-troubleshoot-troubleshoot).

## When to Use

- Building a new Slack bot, Teams bot, or dual-platform bot
- Adding Teams support to an existing Slack bot (or vice versa)
- Migrating a bot between platforms
- Deploying a bot to Azure or AWS
- Configuring AI model providers for a bot
- Converting UI between Block Kit and Adaptive Cards
- Bridging identity, events, files, or transport between platforms
- Making a Teams bot project compatible with Microsoft Agents Toolkit (m365agents.yml, env/, appPackage placeholders)

## Procedure

### Step 1: Determine project type

Assess whether the developer has an existing codebase or is starting fresh.

- **New project** → go to [New Project Flow](#new-project-flow)
- **Existing project** → go to [Existing Project Flow](#existing-project-flow)

---

### New Project Flow

#### 1a: Platform selection

Ask the developer which platform(s) to support:
- Slack + Teams (dual-platform)
- Slack only
- Teams only

#### 1b: Load the expert system

1. Read [experts/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts) — the root router.
2. Execute the **pre-task interview** defined in that file.
3. Route based on platform choice:
   - **Slack + Teams** → Read [experts/bridge/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge). Load [cross-platform-advisor](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-cross-platform-advisor-ts).
   - **Slack only** → Read [experts/slack/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-slack).
   - **Teams only** → Read [experts/teams/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-teams).

#### 1c: Architecture setup

1. Read [cross-platform-architecture](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-cross-platform-architecture-ts) (even for single-platform — establishes patterns for adding a second platform later).
2. Let the domain router and advisor take over.
3. Write a `PLAN.md` in the target project root with platform, features, experts loaded.

#### 1d: Implementation

Follow the advisor's or domain router's output. Implement feature by feature:
1. Pick the next feature from the prioritized list.
2. Load the expert(s) specified for that feature.
3. Implement using the expert's patterns and rules.
4. Verify against the expert's pitfalls section.

---

### Existing Project Flow

#### 2a: Analyze the project

Run these four sub-analyses **in parallel**:

**Detect language** — Scan for `package.json`+`tsconfig.json` (TypeScript), `pom.xml`/`build.gradle` (Java), `*.csproj`/`*.sln` (C#), `go.mod` (Go), `requirements.txt`/`pyproject.toml` (Python), `Gemfile` (Ruby), `Cargo.toml` (Rust).

**Detect current platform** — Scan dependencies for SDK indicators:
- Slack: `@slack/bolt`, `@slack/web-api`, `slack_bolt`, `app.message`, `app.command`, `ack()`
- Teams: `@microsoft/teams-ai`, `botbuilder`, `TeamsActivityHandler`, `app.turn`, Adaptive Cards

**Detect features** — Scan for slash commands, Block Kit/Adaptive Cards, action handlers, OAuth, file upload/download, scheduling, threading, AI/LLM calls, proactive messages.

**Detect architecture** — Scan for web framework (Express, Fastify, etc.), hosting target (Azure, AWS, Docker), cloud provider, architecture pattern (single bot, dual-bot, monolith).

#### 2b: Language gate

Classify the detected language into SDK tiers:

| Tier | Languages | Guidance |
|---|---|---|
| **1: Full SDK** | TypeScript / JavaScript | Full expert system available |
| **2: Adapt** | Python | Both SDKs exist — adapt TS patterns. Load [bolt-python](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-slack-bolt-python), [teams-python](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-teams-teams-python), [python-cross-platform](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-python-cross-platform) |
| **3: Split SDK** | Java, C# | One platform has SDK, other needs REST. Load [bolt-java](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-slack-bolt-java) or [teams-dotnet](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-teams-teams-dotnet) + [rest-only](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-rest-only-integration-ts) |
| **4: No SDK** | Go, Ruby, Rust | REST-only for both. Load [rest-only](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-rest-only-integration-ts) |

#### 2c: Expert coverage gap analysis

1. Read [experts/analyzer.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-analyzer).
2. Execute the analyzer workflow: scan manifests, dependencies, source files.
3. Cross-reference detected tech against existing experts.
4. Present gap analysis — covered vs uncovered technologies.

#### 2d: Build missing experts (if needed)

1. Read [experts/builder.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-builder).
2. For each gap: analyze project usage → read package source → draft expert → validate → wire into routing.
3. Use [experts/_expert-ts.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-_expert-ts) as the template.

#### 2e: Load the expert system

1. Read [experts/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts) — the root router.
2. Execute the pre-task interview, pre-filling with analysis results from 2a.
3. Route based on detected platform and task intent:
   - Has Slack, wants Teams → **Bridge** domain
   - Has Teams, wants Slack → **Bridge** domain
   - Has both → Route by task (bridge refinement, deploy, models, etc.)
   - Has neither → Ask which platform(s) to target
4. Load [cross-platform-advisor](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-cross-platform-advisor-ts) if bridging. Feed analysis results into Phase 1.

#### 2f: Architecture and implementation

1. Read [cross-platform-architecture](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge-cross-platform-architecture-ts).
2. Write a `PLAN.md` with analysis results, routing decisions, and feature migration order.
3. Implement feature by feature using the advisor's prioritized list.

## Agents Toolkit Compatibility

For ATK-compatible project structure (m365agents.yml, env/ files, appPackage), see the parent skill:
- **[Parent SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-SKILL)** — ATK CLI setup, sub-skill routing, workflow chains
- **[manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml)** — Project files, YAML config, env vars, .localConfigs flow
- **[commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-commands)** — Package, validate, share, collaborate, environment management
- **[templates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-templates)** — All templates with language support

For Teams manifest schema and packaging, see [runtime.manifest-ts](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-teams-runtime.manifest-ts).

## Error Recovery

If the expert system fails to cover a topic:
1. Read [experts/fallback.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-fallback).
2. Phase 1: Re-scan all domain routers for missed experts.
3. Phase 2: Web-search for remaining knowledge gaps.
4. Consider creating a new expert using [experts/builder.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-builder).

## Expert Domains

| Domain | Index | Description |
|---|---|---|
| Slack | [experts/slack/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-slack) | Bolt framework, events, OAuth, commands, UI, CLI |
| Teams | [experts/teams/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-teams) | Teams AI SDK, Adaptive Cards, Graph, MCP, A2A, deploy |
| Bridge | [experts/bridge/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-bridge) | 27 cross-platform conversion experts (the core differentiator) |
| Deploy | [experts/deploy/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-deploy) | Azure & AWS deployment walkthroughs |
| Models | [experts/models/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-models) | AI model providers (OpenAI, Anthropic, Bedrock, etc.) |
| Convert | [experts/convert/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-convert) | Language conversion to TypeScript |
| Security | [experts/security/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-experts-security) | Input validation, secrets management |

## Platform Comparison Docs

Reference guides for side-by-side platform comparison:

- [UI Components](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-ui-components) — Block Kit vs Adaptive Cards
- [Messaging & Commands](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-messaging-and-commands)
- [Identity & Auth](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-identity-and-auth)
- [Interactive Responses](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-interactive-responses)
- [Files & Links](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-files-and-links)
- [Middleware & Handlers](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-middleware-and-handlers)
- [Infrastructure](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-infrastructure)
- [Advanced Features](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-advanced-features)
- [Feature Gaps](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-feature-gaps)
- [Workflow Scenarios](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-workflows) — Message-native workflow patterns (triggers, state, logic, AI, visibility) for Teams bots
