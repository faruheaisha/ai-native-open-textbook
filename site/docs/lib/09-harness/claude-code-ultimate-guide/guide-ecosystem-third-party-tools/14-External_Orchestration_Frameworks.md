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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "418907df00786927e783a3511366d110214f423df5fafe5d483e9e10ff0fc30c"
contentMode: "local-full"
zh: ""
---

## External Orchestration Frameworks

> **Architectural distinction**: The tools above (Gas Town, multiclaude) run multiple Claude Code instances side by side. External orchestration frameworks go further: they replace or augment Claude Code's internal orchestration layer with their own runtime, adding swarm coordination, persistent memory, and specialized agent pools on top. Use native Claude Code capabilities (Task tool, sub-agents) first; reach for these frameworks when you've exhausted them.

### Ruflo (formerly claude-flow)

**GitHub**: [github.com/ruvnet/ruflo](https://github.com/ruvnet/ruflo) (66.3K stars as of 2026-07-27, up from 18.9K+ in March 2026)
**npm**: `ruflo` (formerly `claude-flow`) | **License**: MIT

The most adopted external orchestration framework for Claude Code. Transforms it into a multi-agent platform with hierarchical swarms (queen + workers), 98 specialized agents (coders, testers, reviewers, architects, security auditors), and persistent memory via SQLite (AgentDB).

**Two install paths** (very different surface areas):

| | Plugin path | CLI path |
|---|---|---|
| What you get | Slash commands + agent definitions per plugin | Full loop: 98 agents, 30 skills, MCP server, hooks, daemon |
| Files in workspace | Zero | `.claude/`, `.claude-flow/`, `CLAUDE.md`, helpers, settings |
| MCP server registered | No | Yes (`memory_store`, `swarm_init`, `agent_spawn`, etc.) |
| Best for | Trying a single plugin without committing | Production use |

```bash
# Plugin path
/plugin marketplace add ruvnet/ruflo
/plugin install ruflo-core@ruflo    # or any of the 33 available plugins

# CLI path (full install — inspect source first)
npx ruflo@latest init wizard
# Do NOT use the curl|bash variant: it pulls from the old repo name (claude-flow) and bypasses package manager security
```

**Core features**:
- Q-Learning router directing tasks to the right agent based on past patterns
- 30+ built-in skills, 27 hooks integrating natively with Claude Code
- MCP server with 314 tools (CLI path only)
- SQLite-backed session persistence with cross-agent memory sharing (AgentDB)
- **Agent federation**: zero-trust cross-machine collaboration via mTLS and ed25519 identity, with PII stripped before egress and behavioral trust scoring per peer. Unlike LangGraph or CrewAI (single-instance by default), Ruflo agents can coordinate across machines and organizations without sharing raw data. Controlled via 9 MCP tools and 10 CLI commands.
- 33 native plugins at the Claude Code marketplace (swarm, RAG memory, security, browser testing, IoT, and more)
- Optional web UI at [flo.ruv.io](https://flo.ruv.io/) and a GOAP goal planner at [goal.ruv.io](https://goal.ruv.io/)
- Non-interactive CI/CD mode

> **Note on claims**: The project publishes performance metrics (SWE-Bench scores, speed multipliers, 22M+ ecosystem downloads) without fully independent methodology. A SOTA benchmark gist comparing against LangGraph, AutoGen, and CrewAI exists but independent reproduction is not confirmed. Treat all figures as unverified.

> **Note on maturity**: Rebranded from claude-flow in early 2026. The npm package is now `ruflo` (confirmed). Inspect the source before deploying in production.

**When to use**: When Claude Code's native Task tool and sub-agents are insufficient, typically for complex multi-step pipelines requiring persistent state across many sessions, or for teams needing agents to coordinate across machines via federation.

---

### Athena Flow

**GitHub**: [github.com/lespaceman/athena-flow](https://github.com/lespaceman/athena-flow) | **License**: MIT (claimed)
**Status**: Watch, published March 2026, not yet audited

A different architectural approach: instead of augmenting Claude Code's agent layer, Athena Flow sits at the **hooks layer**. It intercepts hook events via Unix Domain Socket (NDJSON), routes them through a persistent Node.js runtime, and provides a TUI for real-time observability and workflow control.

```
Claude Code → hook-forwarder → Unix Domain Socket → Athena Flow runtime → TUI
```

First shipped workflow: autonomous E2E test builder (Playwright CI-ready output). Roadmap: visual regression, API testing, Codex support.

**Not recommended yet**: source audit pending, project too new to assess stability. Revisit in 4-6 weeks.

---

### Pipelex + MTHDS

**GitHub**: [github.com/Pipelex/pipelex](https://github.com/Pipelex/pipelex), 693 stars (2026-07-27, was 623 in March 2026)
**License**: MIT | **Language**: Python | **Standard**: [mthds.ai](https://mthds.ai)

> **Architectural distinction**: Pipelex n'orchestre pas des agents Claude Code : il fournit un **DSL déclaratif** (fichiers `.mthds`) pour définir des AI methods réutilisables. Là où Ruflo gère des swarms d'agents, Pipelex gère des pipelines multi-LLM typés et git-versionables.

Runtime Python pour le standard ouvert MTHDS. Une "AI method" est un workflow multi-étapes qui chaîne LLMs, OCR, et génération d'image, chaque étape typée et validée avant exécution. Les méthodes sont git-versionables, partageables via le hub communautaire [mthds.sh](https://mthds.sh), et peuvent être auto-générées par Claude Code.

**Intégration Claude Code** (Path A recommandé) :
```bash
pip install pipelex
npm install -g mthds
```
```
# Dans Claude Code :
/plugin marketplace add mthds-ai/skills
/plugin install mthds@mthds-ai-skills
/exit  # Relancer Claude Code

# Générer une méthode :
/mthds-build Analyse des CVs → scorecard + questions d'entretien

# Exécuter :
/mthds-run
```

**Cas d'usage** : workflows répétables à fort volume : traitement de documents, scoring de candidats, classification d'emails, analyse de contrats. Pas adapté à l'exploration créative open-ended où les agents natifs Claude Code restent plus appropriés.

**Status** : Watch, 8 mois d'existence, standard MTHDS pas encore validé à grande échelle. Surveiller la traction d'ici Q3 2026.
