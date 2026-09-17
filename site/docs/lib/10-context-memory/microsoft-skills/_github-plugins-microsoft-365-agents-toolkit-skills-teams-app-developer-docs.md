---
title: "Slack vs Teams: Platform Differences & Bridging Strategies"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/README.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/README.md"
sourceSha256: "66288b388a5a3e67a04dbd51105c033f27cc8be1b8d87de757e85462e2649e96"
pageSha256: "66288b388a5a3e67a04dbd51105c033f27cc8be1b8d87de757e85462e2649e96"
contentMode: "local-full"
zh: ""
---

# Slack vs Teams: Platform Differences & Bridging Strategies

A practical guide for developers adding cross-platform support to an existing bot. Each document covers a category of differences, explains why they matter, and provides concrete mitigation strategies with effort estimates.

## Documents

| Document | What It Covers |
|---|---|
| [**Feature Gaps**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-feature-gaps) | **Complete inventory of every RED and YELLOW gap with mitigations in both directions** |
| [**Workflows**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-workflows) | **Message-native workflow scenarios: standup, PTO, equipment, account health, break management, incidents** |
| [Messaging & Commands](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-messaging-and-commands) | Messages, slash commands, events, threading, @mentions |
| [UI Components](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-ui-components) | Block Kit vs Adaptive Cards, modals vs dialogs, App Home vs personal tabs |
| [Interactive Responses](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-interactive-responses) | Ephemeral messages, button actions, message updates, confirmation dialogs |
| [Identity & Auth](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-identity-and-auth) | User IDs, OAuth, signing/verification, tokens |
| [Files & Links](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-files-and-links) | File upload/download, link unfurling/previews |
| [Middleware & Handler Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-middleware-and-handlers) | Middleware chains, ack(), handler registration, error handling |
| [Advanced Features](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-advanced-features) | Scheduling, workflows, shortcuts, channel ops, reactions, distribution |
| [Infrastructure](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-docs-infrastructure) | Transport, compute, storage, secrets, observability |
| [**Eval Harness**](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/evals/README.md) | Automated testing for expert routing, completeness, and code patterns |

## Eval Harness

The [`evals/`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/evals/README.md) directory contains an automated test harness for the expert system. It validates three dimensions:

- **Routing** — 51 test cases across all 7 domains verify queries route to the correct domain, clusters, and expert files
- **Completeness** — 9 test cases check experts cover all required concepts for their domain
- **Patterns** — 294 TypeScript code blocks across all experts are compiled in-memory to catch syntax errors

Pattern evals are fully deterministic (no API key needed). Routing and completeness evals use an LLM judge (OpenAI, Anthropic, or Azure OpenAI). See [`evals/README.md`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/evals/README.md) for setup and usage.

## How to Read These Docs

Each difference follows this format:

- **What's different** — the concrete behavioral gap
- **Impact** — what breaks or degrades if you ignore it
- **Mitigation** — one or more strategies ranked by effort and fidelity
- **Effort** — rough hours to implement

### Difficulty Ratings

| Rating | Meaning |
|---|---|
| GREEN | Direct mapping exists. Mechanical conversion, minimal design decisions. |
| YELLOW | Mapping exists but requires design decisions or trade-offs. |
| RED | Platform gap — no equivalent exists. Requires redesign or custom workaround. |
