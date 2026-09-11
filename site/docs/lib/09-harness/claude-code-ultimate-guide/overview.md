---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/README.md"
zh: ""
---

# Claude Code Ultimate Guide

<table>
  <tr>
    <td width="64">
      <a href="https://www.florian.bruniaux.com/about/?utm_source=github&amp;utm_medium=readme&amp;utm_campaign=claude-code-ultimate-guide"><img src="https://cc.bruniaux.com/author.png" width="56" height="56" alt="Florian Bruniaux" /></a>
    </td>
    <td>
      <strong><a href="https://www.florian.bruniaux.com/about/?utm_source=github&amp;utm_medium=readme&amp;utm_campaign=claude-code-ultimate-guide">Florian BRUNIAUX</a></strong> &middot; AI Founding Engineer @ <a href="https://methode-aristote.fr/">Méthode Aristote</a><br />
      13 years from developer to CTO / VP Eng &middot; <a href="https://www.florian.bruniaux.com/blog/?utm_source=github&amp;utm_medium=readme&amp;utm_campaign=claude-code-ultimate-guide">Blog &#8599;</a> &middot; <a href="https://www.florian.bruniaux.com/projects/?utm_source=github&amp;utm_medium=readme&amp;utm_campaign=claude-code-ultimate-guide">Projects &#8599;</a>
    </td>
  </tr>
</table>

  

  
  
  
  

Learn Claude Code, build reliable agents, and scale their use safely. The website is the primary reading and discovery interface. This repository contains the canonical Markdown sources, reusable files, machine-readable indexes, and contribution history.

**Start here:** [complete a first task online](https://cc.bruniaux.com/guide/ultimate-guide/01-quick-start/) · [browse the guide portal](https://cc.bruniaux.com/guide/) · [open the complete sitemap](https://cc.bruniaux.com/sitemap/) · [read the Markdown source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md)

## Choose your next step

The table below is generated from [`machine-readable/navigation.json`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/machine-readable/navigation.json). The same contract feeds the public sitemap, so the repository and website expose the same intent model.

| Intent | Browse online |
|---|---|
| **Start** | [Guide portal](https://cc.bruniaux.com/guide/) · [Quick Start](https://cc.bruniaux.com/guide/ultimate-guide/01-quick-start/) · [Learning Paths](https://cc.bruniaux.com/learning/) · [Quick Reference](https://cc.bruniaux.com/cheatsheet/) · [AI Roles](https://cc.bruniaux.com/roles/) |
| **Build** | [Agent Harness Engineering](https://cc.bruniaux.com/guide/agent-harness/) · [Loop & Graph Engineering](https://cc.bruniaux.com/guide/loop-graph-engineering/) · [Context Engineering](https://cc.bruniaux.com/context-engineering/) · [Memory Systems](https://cc.bruniaux.com/memory-systems/) · [Workflows](https://cc.bruniaux.com/guide/workflows/) · [Methodologies](https://cc.bruniaux.com/methodologies/) · [MCP or CLI?](https://cc.bruniaux.com/mcp-or-cli/) · [Examples](https://cc.bruniaux.com/examples/) |
| **Scale** | [Security](https://cc.bruniaux.com/security/) · [Enterprise Governance](https://cc.bruniaux.com/guide/enterprise-governance/) · [Observability](https://cc.bruniaux.com/guide/observability/) · [Team Metrics](https://cc.bruniaux.com/team-metrics/) · [Team Adoption](https://cc.bruniaux.com/guide/adoption-approaches/) · [Subscription Strategy](https://cc.bruniaux.com/guide/subscription-strategy/) · [AI Unit Economics](https://cc.bruniaux.com/guide/ai-unit-economics/) · [Team Knowledge](https://cc.bruniaux.com/guide/team-knowledge-base/) · [API Gateway](https://cc.bruniaux.com/guide/api-gateway/) |
| **Resources** | [Resource Hub](https://cc.bruniaux.com/resources/) · [Downloads](https://cc.bruniaux.com/downloads/) · [Cheat Sheets](https://cc.bruniaux.com/cheatsheets/) · [Ebooks](https://cc.bruniaux.com/whitepapers/) · [Diagrams](https://cc.bruniaux.com/diagrams/) · [Ecosystem](https://cc.bruniaux.com/ecosystem/) · [Compare](https://cc.bruniaux.com/compare/) · [Glossary](https://cc.bruniaux.com/guide/glossary/) · [FAQ](https://cc.bruniaux.com/faq/) · [Guide MCP Server](https://cc.bruniaux.com/mcp/) · [Related Projects](https://cc.bruniaux.com/projects/) |
| **Updates** | [Guide Changelog](https://cc.bruniaux.com/changelog/) · [Claude Code Releases](https://cc.bruniaux.com/releases/) · [RSS Feed](https://cc.bruniaux.com/rss.xml) |

## Why this guide exists

Claude Code documentation explains the product. This guide connects product behavior to engineering decisions: what belongs in context, when to use an agent instead of a skill, how to verify generated work, and which controls matter when usage moves beyond one developer.

| Need | Start with |
|---|---|
| Understand Claude Code internals | [Architecture](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md) and [Tools Reference](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/tools-reference.md) |
| Design agent systems | [Agent Harness Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md) and [Loop & Graph Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/loop-graph-engineering.md) |
| Structure AI-assisted delivery | [Methodologies](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/methodologies.md) and [Workflow Guides](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/README.md) |
| Establish a security boundary | [Security Hardening](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md) and [Sandbox Isolation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/sandbox-isolation.md) |
| Validate understanding | [Knowledge Quiz](https://cc.bruniaux.com/quiz/) and [Recap Cards](https://cc.bruniaux.com/cheatsheets/) |

The guide favors explicit trade-offs and verifiable procedures. Where evidence is incomplete, the relevant page should preserve that limit instead of presenting one workflow as universal.

## Start

### Install Claude Code

Choose one installation method:

```bash
# npm, macOS, Linux, or Windows
npm install -g @anthropic-ai/claude-code

# macOS with Homebrew
brew install claude-code

# macOS or Linux native installer
curl -fsSL https://claude.ai/install.sh | sh
```

Windows PowerShell also supports:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Verify the installation and authenticate:

```bash
claude --version
claude doctor
claude auth login
```

The [Quick Start chapter](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md#1-quick-start-day-1) documents installation alternatives, authentication, updates, permission modes, and common first-day failures.

### Complete a first task

Open a small repository with a clean or understood Git state, then start Claude Code:

```bash
cd your-project
claude
```

Give Claude a bounded request that includes the expected result and verification:

```text
Explain how this project runs its tests. Do not modify files.
Name the relevant commands and cite the files that define them.
```

Before asking Claude to edit code, add a project-level `CLAUDE.md` that records the commands and constraints Claude must follow:

```markdown
# Project instructions

## Commands
- Test: `npm test`
- Lint: `npm run lint`

## Boundaries
- Do not edit generated files.
- Do not change dependencies without approval.
- Run the relevant tests before claiming completion.
```

Continue with the [first workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md#12-first-workflow) or use the [starter CLAUDE.md templates](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/claude-md/README.md).

### Choose a learning path

| Situation | Suggested route |
|---|---|
| New to Claude Code | [Seven-module learning path](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/README.md) |
| Already using the CLI | [Core Concepts](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md#2-core-concepts), then [Context Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/context-engineering.md) |
| Senior developer or tech lead | [Methodologies](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/methodologies.md), [Agent Harness Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md), then [Production Safety](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/production-safety.md) |
| Engineering manager or CTO | [Adoption Approaches](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/adoption-approaches.md), [Team Metrics](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/team-metrics.md), then [Subscription Strategy](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/subscription-strategy.md) |
| Security or platform role | [Security Hardening](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md), [Enterprise Governance](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/enterprise-governance.md), then [Observability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/observability.md) |
| Product manager or designer | [Product Manager Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/for-product-managers.md) or [Design-to-Code Workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/design-to-code.md) |
| Non-developer knowledge worker | [Claude Cowork Guide](https://github.com/FlorianBruniaux/claude-cowork-guide) |

For a personalized route, use the repository onboarding prompt:

```bash
claude "Fetch and follow the onboarding instructions from: https://raw.githubusercontent.com/FlorianBruniaux/claude-code-ultimate-guide/main/tools/onboarding-prompt.md"
```

## Build

### Agent engineering

An agent is one component of a larger system. The surrounding harness controls context, tools, permissions, state, stopping conditions, recovery, and evaluation.

| Resource | Decision it supports |
|---|---|
| [Agent Harness Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md) | Identify the controls required around an agent loop |
| [Loop & Graph Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/loop-graph-engineering.md) | Choose bounded feedback loops or explicit workflow graphs |
| [Agent Harness Map](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md) | Distinguish runtimes, orchestrators, frameworks, control planes, and support tools |
| [Agentic Tools](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md) | Compare selected coding agents and orchestration products |
| [Agent Evaluation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/agent-evaluation.md) | Test behavior, regressions, and task-level outcomes |
| [Harness Glossary](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/glossary.md) | Align terminology across design and review |

### Context and memory

Context quality affects every tool call and decision. Start with project instructions, add specialized context only when a recurring task needs it, and test whether the extra material changes behavior.

| Resource | Focus |
|---|---|
| [Context Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/context-engineering.md) | Context budget, modular instructions, assembly, and measurement |
| [Memory Systems](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/memory-systems.md) | Native memory, cross-session systems, team sharing, and retention risks |
| [Context Engineering Tools](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/context-engineering-tools.md) | Output compression, retrieval, gateways, and context inspection |
| [Context Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/context-audit-prompt.md) | Measure a project's context architecture |
| [Team AI Instructions](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/team-ai-instructions.md) | Maintain shared instructions across a development team |

### Workflows

| Goal | Workflow |
|---|---|
| Implement with tests first | [TDD with Claude](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/tdd-with-claude.md) |
| Define behavior before implementation | [Spec-First Development](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/spec-first.md) |
| Separate planning from execution | [Plan-Driven Development](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/plan-driven.md) |
| Compare independent candidates | [Best-of-N](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/best-of-n.md) |
| Coordinate several agents | [Agent Teams](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams.md) |
| Build bounded autonomous loops | [Agentic Software Factories](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agentic-software-factories.md) |
| Review code systematically | [Code Review](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/code-review.md) |
| Prepare a contribution another team can review | [AI-Assisted Open Source Contributions](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/ai-assisted-open-source-contributions.md) |
| Diagnose unfamiliar repositories | [Exploration Workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/exploration-workflow.md) |

[Browse every workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/README.md) for task management, GitHub Actions, production reliability, event-driven agents, design-to-code, PDF generation, search, and team instructions.

### Choose the smallest interface

Claude Code can call local commands, skills, agents, hooks, plugins, and MCP servers. More infrastructure adds setup, permissions, failure modes, and maintenance.

| If the task needs | Prefer |
|---|---|
| A deterministic local command | CLI or script |
| Reusable instructions and supporting files | Skill |
| A separate context and role | Agent |
| A response to a lifecycle event | Hook |
| A packaged collection of capabilities | Plugin |
| A typed interface to a remote service | MCP server |

Use the [MCP or CLI decision guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-vs-cli.md) and the [trade-off framework](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md#when-to-use-what) before introducing another integration.

## Scale

### Reliability and security

| Concern | Primary resource | Operational companion |
|---|---|---|
| Permissions and prompt injection | [Security Hardening](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md) | [Permissions Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/permissions-audit-prompt.md) |
| Isolation of untrusted execution | [Sandbox Isolation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/sandbox-isolation.md) | [Native Sandbox](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/sandbox-native.md) |
| Production changes and rollback | [Production Safety](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/production-safety.md) | [Production Reliability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/production-reliability.md) |
| Sensitive data and retention | [Data Privacy](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/data-privacy.md) | [Enterprise Governance](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/enterprise-governance.md) |
| Active testing of authorized applications | [Agentic Pentesting](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/agentic-pentesting.md) | [DarkMoon and Strix Evaluation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/darkmoon-strix-agentic-pentesting.md) |
| MCP and extension supply chain | [MCP Ecosystem](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md) | [Threat Database](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/resources/threat-db.yaml) |
| Delegation readiness | [Specification Completeness Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/spec-completeness-audit.md) | [Agent Evaluation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/agent-evaluation.md) |

Security claims and threat counts change as sources are added or corrected. Use the linked database and guides as the current source instead of copying their counts into project documentation.

### Evaluation and operations

| Need | Resource |
|---|---|
| Trace agent behavior and failures | [Observability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/observability.md) |
| Attribute AI-assisted changes | [AI Traceability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/ai-traceability.md) |
| Evaluate team outcomes | [Team Metrics](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/team-metrics.md) |
| Calculate task-level cost | [AI Unit Economics](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/ai-unit-economics.md) |
| Operate infrastructure workflows | [DevOps & SRE](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/devops-sre.md) |
| Route governed API traffic | [API Gateways](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/api-gateway.md) |

A green structural check proves only what it inspected. Runtime behavior, task acceptance, security boundaries, and business outcomes require separate evidence.

### Organization and economics

| Decision | Resource |
|---|---|
| Roll out Claude Code across a team | [Adoption Approaches](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/adoption-approaches.md) |
| Define usage tiers and approvals | [Enterprise Governance](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/enterprise-governance.md) |
| Preserve team knowledge | [Team Knowledge Base](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/team-knowledge-base.md) |
| Compare subscriptions, APIs, and gateways | [Subscription Strategy](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/subscription-strategy.md) |
| Compare hosted and local inference | [Local vs Cloud Inference](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/local-vs-cloud-inference.md) |
| Map changing AI roles | [AI Roles](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/ai-roles.md) |

The economics pages separate observed costs from estimates and scenarios. Recalculate them with your workload, acceptance criteria, review effort, and risk constraints.

## Use the format that fits the task

| Format | Use it for | Read online | Source or download |
|---|---|---|---|
| Complete reference | Deep explanations and linked sections | [Ultimate Guide](https://cc.bruniaux.com/guide/ultimate-guide/) | [Markdown](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md) |
| Daily reference | Commands, shortcuts, and checks | [Quick Reference](https://cc.bruniaux.com/cheatsheet/) | [Markdown](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/cheatsheet.md) |
| Guided course | Progressive exercises with retained evidence | [Learning Paths](https://cc.bruniaux.com/learning/) | [Course sources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/README.md) |
| Runnable material | Agents, skills, hooks, workflows, and scripts | [Examples](https://cc.bruniaux.com/examples/) | [Files](/lib/09-harness/claude-code-ultimate-guide/examples) |
| Visual explanation | Architecture, context, security, and workflow maps | [Diagrams](https://cc.bruniaux.com/diagrams/) | [Diagram sources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/README.md) |
| Knowledge check | Questions with documentation links | [Quiz](https://cc.bruniaux.com/quiz/) | [Question sources](/lib/09-harness/claude-code-ultimate-guide/quiz) |
| Printable reference | One concept per page in French and English | [Cheat Sheets](https://cc.bruniaux.com/cheatsheets/) | [Card sources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/whitepapers/recap-cards/README.md) |
| Long-form edition | Offline PDF and EPUB | [Ebooks](https://cc.bruniaux.com/whitepapers/) | [Downloads](https://cc.bruniaux.com/downloads/) |
| Machine-readable index | Search and retrieval by an AI assistant | [Guide MCP](https://cc.bruniaux.com/mcp/) | [llms.txt](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/machine-readable/llms.txt) and [reference.yaml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/machine-readable/reference.yaml) |

## MCP Server: Use the guide from any coding client

### Load the guide into another assistant

Use the small index for discovery:

```bash
curl -sL https://raw.githubusercontent.com/FlorianBruniaux/claude-code-ultimate-guide/main/machine-readable/llms.txt
```

Use [reference.yaml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/machine-readable/reference.yaml) when the assistant needs structured topic routes and links into the full guide. Maintenance instructions belong in the [machine-readable documentation](/lib/09-harness/claude-code-ultimate-guide/machine-readable), not in this README.

## Complementary ecosystem

No single repository needs to cover learning, installation, curation, reference material, and every specialized interface. Choose the resource that matches the current task.

| Need | Resource | What it provides |
|---|---|---|
| Verify Claude Code behavior | [Official Claude Code documentation](https://code.claude.com/docs) | Primary product documentation |
| Learn architecture, trade-offs, security, and workflows | [Claude Code Guide](https://cc.bruniaux.com/guide/) | Explanations, decision guides, operational checks, and examples |
| Discover community projects | [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Curated links across the ecosystem |
| Install a collection of configurations | [everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Packaged agents, skills, hooks, and configurations |
| Browse installable templates | [claude-code-templates](https://github.com/davila7/claude-code-templates) | Template catalog and CLI distribution |
| Start from official skill examples | [anthropics/skills](https://github.com/anthropics/skills) | Anthropic-maintained skill examples |
| Browse the skills marketplace | [skills.sh](https://skills.sh/) | Search and installation routes for published skills |
| Work outside software development | [Claude Cowork Guide](https://github.com/FlorianBruniaux/claude-cowork-guide) | Workflows for knowledge workers |
| Compare coding-agent capabilities | [AI Coding Agents Matrix](https://coding-agents-matrix.dev) | Cross-agent feature comparison |

This short list was reviewed on 2026-08-31. Project activity, installation methods, and scope can change. Browse the public [Ecosystem](https://cc.bruniaux.com/ecosystem/) and [Compare](https://cc.bruniaux.com/compare/) pages first. The [AI Ecosystem source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/ai-ecosystem.md), [Third-Party Tools source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md), and [Resource Evaluations](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/README.md) retain the deeper evidence.

## Updates

Guide changes and Claude Code product releases answer different questions:

| Feed | Tracks | Source |
|---|---|---|
| [Guide Changelog](https://cc.bruniaux.com/changelog/) | New pages, corrections, and major repository revisions | [CHANGELOG.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/CHANGELOG.md) |
| [Claude Code Releases](https://cc.bruniaux.com/releases/) | Claude Code product versions and operational impact | [Release source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/claude-code-releases.md) |
| [RSS Feed](https://cc.bruniaux.com/rss.xml) | Published guide and product updates in a feed reader | Generated by the website |

Recent guide additions include:

- [Loop & Graph Engineering](https://cc.bruniaux.com/guide/loop-graph-engineering/) ([source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/loop-graph-engineering.md)): bounded feedback, workflow state, stopping rules, recovery, and judgment allocation.
- [Subscription Strategy](https://cc.bruniaux.com/guide/subscription-strategy/) ([source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/subscription-strategy.md)): seats, APIs, gateways, self-hosting scenarios, and team-scale decision gates.
- [Cross-Session Messaging](https://cc.bruniaux.com/guide/workflows/cross-session-messaging/) ([source](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/cross-session-messaging.md)): peer discovery, delivery, security boundaries, and correlated-drift controls.

Use the changelog for the complete history. The README should expose only a small current selection.

## Languages and translations

English is the canonical edition. French is maintained in this repository. Simplified Chinese, Ukrainian, and Latin American Spanish are independent community editions with separate update schedules.

| Language | Edition |
|---|---|
| English | [Canonical guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md) |
| Français | [French guide maintained in this repository](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.fr.md) |
| 简体中文 | [Community edition by JAYcodr](https://github.com/JAYcodr/claude-code-ultimate-guide-zh) |
| Українська | [Community edition by gerasimsergey](https://github.com/gerasimsergey/claude-code-ultimate-guide-ua) |
| Español latinoamericano | [Community edition by Richardls](https://github.com/Richardls/claude-code-ultimate-guide-es) |

The [translation status page](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/translations.md) records maintainers, source commits, coverage, measured lag, and review status.

## Repository map

```text
guide/
├── ultimate-guide.md       Complete reference
├── learning-path/          Guided course
├── core/                   Architecture, tools, context, methods
├── security/               Hardening, isolation, privacy, governance
├── ecosystem/              Agents, MCP, tools, inference, knowledge
├── roles/                  Adoption, learning, evaluation, careers
├── ops/                    Observability, metrics, economics, gateways
├── workflows/              Task-oriented delivery guides
└── diagrams/               Mermaid diagrams with text fallbacks

examples/                   Reusable agents, skills, hooks, and workflows
machine-readable/           Structured indexes and release data
mcp-server/                 Packaged guide access for MCP clients
quiz/                       Local knowledge validation
docs/resource-evaluations/  Reviewed external resources
whitepapers/                French and English long-form sources
```

The detailed [guide index](/lib/09-harness/claude-code-ultimate-guide/guide), [examples catalog](/lib/09-harness/claude-code-ultimate-guide/examples), and [tool index](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/README.md) are the canonical navigation pages for those directories.
