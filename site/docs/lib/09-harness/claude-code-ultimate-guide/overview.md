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
sourceRel: "README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/README.md"
sourceSha256: "d447a9216144746c0249501384218ec80ab37a5901905be327debe50c4e99482"
pageSha256: "d447a9216144746c0249501384218ec80ab37a5901905be327debe50c4e99482"
contentMode: "local-full"
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

**Start here:** [complete a first task online](https://cc.bruniaux.com/guide/ultimate-guide/01-quick-start/) · [browse the guide portal](https://cc.bruniaux.com/guide/) · [open the complete sitemap](https://cc.bruniaux.com/sitemap/) · [read the Markdown source](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index)

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
| Understand Claude Code internals | [Architecture](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index) and [Tools Reference](/lib/09-harness/claude-code-ultimate-guide/guide-core-tools-reference) |
| Design agent systems | [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) and [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) |
| Structure AI-assisted delivery | [Methodologies](/lib/09-harness/claude-code-ultimate-guide/guide-core-methodologies) and [Workflow Guides](/lib/09-harness/claude-code-ultimate-guide/guide-workflows) |
| Establish a security boundary | [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) and [Sandbox Isolation](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-isolation) |
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

The [Quick Start chapter](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#1-quick-start-day-1) documents installation alternatives, authentication, updates, permission modes, and common first-day failures.

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

Continue with the [first workflow](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#12-first-workflow) or use the [starter CLAUDE.md templates](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/claude-md/README.md).

### Choose a learning path

| Situation | Suggested route |
|---|---|
| New to Claude Code | [Seven-module learning path](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path) |
| Already using the CLI | [Core Concepts](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#2-core-concepts), then [Context Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index) |
| Senior developer or tech lead | [Methodologies](/lib/09-harness/claude-code-ultimate-guide/guide-core-methodologies), [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index), then [Production Safety](/lib/09-harness/claude-code-ultimate-guide/guide-security-production-safety) |
| Engineering manager or CTO | [Adoption Approaches](/lib/09-harness/claude-code-ultimate-guide/guide-roles-adoption-approaches), [Team Metrics](/lib/09-harness/claude-code-ultimate-guide/guide-ops-team-metrics), then [Subscription Strategy](/lib/09-harness/claude-code-ultimate-guide/guide-ops-subscription-strategy) |
| Security or platform role | [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index), [Enterprise Governance](/lib/09-harness/claude-code-ultimate-guide/guide-security-enterprise-governance), then [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability) |
| Product manager or designer | [Product Manager Guide](/lib/09-harness/claude-code-ultimate-guide/docs-for-product-managers) or [Design-to-Code Workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-design-to-code) |
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
| [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) | Identify the controls required around an agent loop |
| [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) | Choose bounded feedback loops or explicit workflow graphs |
| [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) | Distinguish runtimes, orchestrators, frameworks, control planes, and support tools |
| [Agentic Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) | Compare selected coding agents and orchestration products |
| [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation) | Test behavior, regressions, and task-level outcomes |
| [Harness Glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) | Align terminology across design and review |

### Context and memory

Context quality affects every tool call and decision. Start with project instructions, add specialized context only when a recurring task needs it, and test whether the extra material changes behavior.

| Resource | Focus |
|---|---|
| [Context Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index) | Context budget, modular instructions, assembly, and measurement |
| [Memory Systems](/lib/09-harness/claude-code-ultimate-guide/guide-core-memory-systems/index) | Native memory, cross-session systems, team sharing, and retention risks |
| [Context Engineering Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-context-engineering-tools/index) | Output compression, retrieval, gateways, and context inspection |
| [Context Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/context-audit-prompt.md) | Measure a project's context architecture |
| [Team AI Instructions](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-team-ai-instructions) | Maintain shared instructions across a development team |

### Workflows

| Goal | Workflow |
|---|---|
| Implement with tests first | [TDD with Claude](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-tdd-with-claude) |
| Define behavior before implementation | [Spec-First Development](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first) |
| Separate planning from execution | [Plan-Driven Development](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-driven) |
| Compare independent candidates | [Best-of-N](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-best-of-n) |
| Coordinate several agents | [Agent Teams](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index) |
| Build bounded autonomous loops | [Agentic Software Factories](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agentic-software-factories) |
| Review code systematically | [Code Review](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-code-review) |
| Prepare a contribution another team can review | [AI-Assisted Open Source Contributions](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-ai-assisted-open-source-contributions) |
| Diagnose unfamiliar repositories | [Exploration Workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-exploration-workflow) |

[Browse every workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows) for task management, GitHub Actions, production reliability, event-driven agents, design-to-code, PDF generation, search, and team instructions.

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

Use the [MCP or CLI decision guide](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-vs-cli) and the [trade-off framework](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#when-to-use-what) before introducing another integration.

## Scale

### Reliability and security

| Concern | Primary resource | Operational companion |
|---|---|---|
| Permissions and prompt injection | [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) | [Permissions Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/permissions-audit-prompt.md) |
| Isolation of untrusted execution | [Sandbox Isolation](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-isolation) | [Native Sandbox](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-native) |
| Production changes and rollback | [Production Safety](/lib/09-harness/claude-code-ultimate-guide/guide-security-production-safety) | [Production Reliability](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-production-reliability) |
| Sensitive data and retention | [Data Privacy](/lib/09-harness/claude-code-ultimate-guide/guide-security-data-privacy) | [Enterprise Governance](/lib/09-harness/claude-code-ultimate-guide/guide-security-enterprise-governance) |
| Active testing of authorized applications | [Agentic Pentesting](/lib/09-harness/claude-code-ultimate-guide/guide-security-agentic-pentesting) | [DarkMoon and Strix Evaluation](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-darkmoon-strix-agentic-pentesting) |
| MCP and extension supply chain | [MCP Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index) | [Threat Database](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/resources/threat-db.yaml) |
| Delegation readiness | [Specification Completeness Audit](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/tools/spec-completeness-audit.md) | [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation) |

Security claims and threat counts change as sources are added or corrected. Use the linked database and guides as the current source instead of copying their counts into project documentation.

### Evaluation and operations

| Need | Resource |
|---|---|
| Trace agent behavior and failures | [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability) |
| Attribute AI-assisted changes | [AI Traceability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-ai-traceability) |
| Evaluate team outcomes | [Team Metrics](/lib/09-harness/claude-code-ultimate-guide/guide-ops-team-metrics) |
| Calculate task-level cost | [AI Unit Economics](/lib/09-harness/claude-code-ultimate-guide/guide-ops-ai-unit-economics) |
| Operate infrastructure workflows | [DevOps & SRE](/lib/09-harness/claude-code-ultimate-guide/guide-ops-devops-sre) |
| Route governed API traffic | [API Gateways](/lib/09-harness/claude-code-ultimate-guide/guide-ops-api-gateway) |

A green structural check proves only what it inspected. Runtime behavior, task acceptance, security boundaries, and business outcomes require separate evidence.

### Organization and economics

| Decision | Resource |
|---|---|
| Roll out Claude Code across a team | [Adoption Approaches](/lib/09-harness/claude-code-ultimate-guide/guide-roles-adoption-approaches) |
| Define usage tiers and approvals | [Enterprise Governance](/lib/09-harness/claude-code-ultimate-guide/guide-security-enterprise-governance) |
| Preserve team knowledge | [Team Knowledge Base](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-team-knowledge-base) |
| Compare subscriptions, APIs, and gateways | [Subscription Strategy](/lib/09-harness/claude-code-ultimate-guide/guide-ops-subscription-strategy) |
| Compare hosted and local inference | [Local vs Cloud Inference](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-local-vs-cloud-inference/index) |
| Map changing AI roles | [AI Roles](/lib/09-harness/claude-code-ultimate-guide/guide-roles-ai-roles/index) |

The economics pages separate observed costs from estimates and scenarios. Recalculate them with your workload, acceptance criteria, review effort, and risk constraints.

## Use the format that fits the task

| Format | Use it for | Read online | Source or download |
|---|---|---|---|
| Complete reference | Deep explanations and linked sections | [Ultimate Guide](https://cc.bruniaux.com/guide/ultimate-guide/) | [Markdown](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) |
| Daily reference | Commands, shortcuts, and checks | [Quick Reference](https://cc.bruniaux.com/cheatsheet/) | [Markdown](/lib/09-harness/claude-code-ultimate-guide/guide-cheatsheet) |
| Guided course | Progressive exercises with retained evidence | [Learning Paths](https://cc.bruniaux.com/learning/) | [Course sources](/lib/09-harness/claude-code-ultimate-guide/guide-learning-path) |
| Runnable material | Agents, skills, hooks, workflows, and scripts | [Examples](https://cc.bruniaux.com/examples/) | [Files](/lib/09-harness/claude-code-ultimate-guide/examples) |
| Visual explanation | Architecture, context, security, and workflow maps | [Diagrams](https://cc.bruniaux.com/diagrams/) | [Diagram sources](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams) |
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

This short list was reviewed on 2026-08-31. Project activity, installation methods, and scope can change. Browse the public [Ecosystem](https://cc.bruniaux.com/ecosystem/) and [Compare](https://cc.bruniaux.com/compare/) pages first. The [AI Ecosystem source](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index), [Third-Party Tools source](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index), and [Resource Evaluations](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/README.md) retain the deeper evidence.

## Updates

Guide changes and Claude Code product releases answer different questions:

| Feed | Tracks | Source |
|---|---|---|
| [Guide Changelog](https://cc.bruniaux.com/changelog/) | New pages, corrections, and major repository revisions | [CHANGELOG.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/CHANGELOG.md) |
| [Claude Code Releases](https://cc.bruniaux.com/releases/) | Claude Code product versions and operational impact | [Release source](/lib/09-harness/claude-code-ultimate-guide/guide-core-claude-code-releases/index) |
| [RSS Feed](https://cc.bruniaux.com/rss.xml) | Published guide and product updates in a feed reader | Generated by the website |

Recent guide additions include:

- [Loop & Graph Engineering](https://cc.bruniaux.com/guide/loop-graph-engineering/) ([source](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering)): bounded feedback, workflow state, stopping rules, recovery, and judgment allocation.
- [Subscription Strategy](https://cc.bruniaux.com/guide/subscription-strategy/) ([source](/lib/09-harness/claude-code-ultimate-guide/guide-ops-subscription-strategy)): seats, APIs, gateways, self-hosting scenarios, and team-scale decision gates.
- [Cross-Session Messaging](https://cc.bruniaux.com/guide/workflows/cross-session-messaging/) ([source](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging)): peer discovery, delivery, security boundaries, and correlated-drift controls.

Use the changelog for the complete history. The README should expose only a small current selection.

## Languages and translations

English is the canonical edition. French is maintained in this repository. Simplified Chinese, Ukrainian, and Latin American Spanish are independent community editions with separate update schedules.

| Language | Edition |
|---|---|
| English | [Canonical guide](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) |
| Français | [French guide maintained in this repository](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.fr.md) |
| 简体中文 | [Community edition by JAYcodr](https://github.com/JAYcodr/claude-code-ultimate-guide-zh) |
| Українська | [Community edition by gerasimsergey](https://github.com/gerasimsergey/claude-code-ultimate-guide-ua) |
| Español latinoamericano | [Community edition by Richardls](https://github.com/Richardls/claude-code-ultimate-guide-es) |

The [translation status page](/lib/09-harness/claude-code-ultimate-guide/guide-core-translations) records maintainers, source commits, coverage, measured lag, and review status.

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
