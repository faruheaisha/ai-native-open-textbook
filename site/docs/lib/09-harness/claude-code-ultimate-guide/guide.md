---
title: "Guide Documentation"
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

# Guide Documentation

Core documentation for mastering Claude Code, organized by topic.

---

## Getting Started

| File | Description | Time |
|------|-------------|------|
| [**learning-path/**](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/README.md) | **Structured 7-module learning path** for beginners: Installation, Core Loop, Memory, Agents, Skills, Hooks, Advanced Patterns | 8-11 hours |
| [learning-path/01-installation.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/01-installation.md) | Module 01: Install Claude Code and verify it works | 15 min |
| [learning-path/02-core-loop.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/02-core-loop.md) | Module 02: Understand the interaction loop and context | 45 min |
| [learning-path/03-memory.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/03-memory.md) | Module 03: Create CLAUDE.md and configure memory | 1 hour |
| [learning-path/04-agents.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/04-agents.md) | Module 04: Create specialized agents | 1.5 hours |
| [learning-path/05-skills.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/05-skills.md) | Module 05: Build reusable skills | 1.5 hours |
| [learning-path/06-hooks.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/06-hooks.md) | Module 06: Create automation hooks | 1 hour |
| [learning-path/07-advanced.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/learning-path/07-advanced.md) | Module 07: Multi-agent orchestration | 2-3 hours |

---

## Core Reference

| File | Description | Time |
|------|-------------|------|
| [ultimate-guide.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md) | Complete reference covering all Claude Code features | ~3 hours |
| [ultimate-guide.fr.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.fr.md) | French translation of the complete reference guide | ~3 hours |
| [core/translations.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/translations.md) | **Translations and Language Governance**: verified attribution, source commits, measured lag, and official versus community status | 5 min |
| [cowork.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/cowork.md) | Claude Cowork: agentic desktop summary for non-technical knowledge workers | 10 min |
| [cheatsheet.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/cheatsheet.md) | 1-page printable quick reference | 5 min |
| [core/architecture.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md) | How Claude Code works internally (master loop, tools, context) | 25 min |
| [core/computer-use.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/computer-use.md) | **Computer Use**: permission boundary, fallback order, safe operating procedure, and verification limits | 12 min |
| [core/agent-harness.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md) | **Agent Harness Engineering**: runtime components, loop horizons, security, evaluation, and outer-loop harness optimization | 35 min |
| [core/loop-graph-engineering.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/loop-graph-engineering.md) | **Loop & Graph Engineering**: bounded feedback, executable workflow graphs, durable state, recovery, and judgment allocation | 25 min |
| [core/tools-reference.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/tools-reference.md) | **Complete tools reference**: all 40 built-in tools, permission rule formats, per-tool behaviors (Bash timeouts, Edit read-before-edit, Glob cap, WebFetch lossy), and how-to for Monitor, Workflow, agent teams, Cron, Tasks API | 20 min |
| [core/hooks-events-reference.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/hooks-events-reference.md) | **Complete hooks reference**: all 30 hook events, matcher fields, input schemas, decision control formats, and timeout defaults, with copy-paste JSON examples | 15 min |
| [core/settings-reference.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/settings-reference.md) | **Complete settings.json reference**: every confirmed setting and environment variable | 15 min |
| [core/methodologies.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/methodologies.md) | 15 development methodologies reference (TDD, SDD, BDD, etc.) | 20 min |
| [core/visual-reference.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/visual-reference.md) | Visual cheatsheet: ASCII diagrams for key concepts | 5 min |
| [core/claude-code-releases.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/claude-code-releases.md) | Official release history (condensed) | 10 min |
| [core/known-issues.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/known-issues.md) | **Critical bugs tracker**: security issues, token consumption, verified community reports | 15 min |
| [core/context-engineering.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/context-engineering.md) | **Context Engineering**: token budget, modular architecture, team assembly, ACE pipeline, quality measurement | 25 min |
| [core/memory-systems.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/memory-systems.md) | **Memory Systems**: native stack (CLAUDE.md, Auto Memory, Auto Dream), cross-session tools (claude-mem, agentmemory, ICM), team sharing, multi-agent patterns, architecture, risks, decision flowchart | 30 min |
| [core/glossary.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/glossary.md) | **Glossary**: Claude Code terminology and adjacent agent concepts (41 terms, paragraph format, with links to guide sections) | 5 min |
| [core/community-patterns.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/community-patterns.md) | **Community Patterns**: ~130 community-coined patterns, workflow terms, AI engineering concepts, and quick-reference definitions | 10 min |
| [core/skill-design-patterns.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/skill-design-patterns.md) | **Skill Design Patterns**: architectural patterns for robust, token-efficient skills with multi-agent pipelines | 20 min |
| [core/credits.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/credits.md) | Open-source projects and engineering teams whose work informed specific patterns in this guide | 5 min |
| [diagrams/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/README.md) | **Visual Diagrams Series**: 41 Mermaid interactive diagrams for model selection, agent lifecycle, security, multi-agent patterns | 15 min |

---

## Visual Diagrams

**48 interactive Mermaid diagrams** across 12 thematic files, with GitHub-native Mermaid rendering and an ASCII fallback for every diagram. See [diagrams/README.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/README.md) for the full navigation index and use-case guides.

| File | Diagrams | Topics |
|------|----------|--------|
| [diagrams/01-foundations.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/01-foundations.md) | 4 | 4-layer model, workflow pipeline, decision tree, permission modes |
| [diagrams/02-context-and-sessions.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/02-context-and-sessions.md) | 4 | Context zones, memory hierarchy, session teleportation, fresh context |
| [diagrams/03-configuration-system.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/03-configuration-system.md) | 4 | Config precedence, skills vs commands vs agents, agent lifecycle, hooks |
| [diagrams/04-architecture-internals.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/04-architecture-internals.md) | 4 | Master loop, tool categories, system prompt assembly, sub-agent isolation |
| [diagrams/05-mcp-ecosystem.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/05-mcp-ecosystem.md) | 4 | MCP ecosystem map, MCP architecture, rug pull attack, config hierarchy |
| [diagrams/06-development-workflows.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/06-development-workflows.md) | 5 | TDD cycle, spec-first pipeline, plan-driven, iterative refinement, AI fluency paths |
| [diagrams/07-multi-agent-patterns.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/07-multi-agent-patterns.md) | 5 | Agent topologies, worktrees, dual-instance, horizontal scaling, decision matrix |
| [diagrams/08-security-and-production.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/08-security-and-production.md) | 4 | 3-layer defense, sandbox decision, verification paradox, CI/CD pipeline |
| [diagrams/09-cost-and-optimization.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/09-cost-and-optimization.md) | 4 | Model selection, cost optimization, subscription tiers, token reduction |
| [diagrams/10-adoption-and-learning.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/10-adoption-and-learning.md) | 3 | Onboarding paths, UVAL protocol, trust calibration |
| [diagrams/11-context-engineering.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/11-context-engineering.md) | 4 | 3-layer context system, adherence degradation, modular architecture, rule placement |
| [diagrams/12-enterprise-governance.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/12-enterprise-governance.md) | 3 | Governance risk tiers, MCP approval workflow, data classification |

---

## Security

| File | Description | Time |
|------|-------------|------|
| [security/security-hardening.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md) | Security threats, MCP vetting, injection defense | 25 min |
| [security/sandbox-isolation.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/sandbox-isolation.md) | Docker Sandboxes, cloud alternatives, safe autonomy workflows | 10 min |
| [security/sandbox-native.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/sandbox-native.md) | Native Claude Code sandbox: configuration and security model | 10 min |
| [security/production-safety.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/production-safety.md) | Production safety: guardrails, review gates, rollback strategies | 15 min |
| [security/data-privacy.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/data-privacy.md) | Data retention and privacy guide | 10 min |
| [security/agentic-pentesting.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/agentic-pentesting.md) | DarkMoon and Strix: execution scope, exploit evidence, model data exposure, and evaluation protocol | Reference |
| [security/enterprise-governance.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/enterprise-governance.md) | **Org-level governance**: usage charters, MCP approval workflow, guardrail tiers (Starter/Standard/Strict/Regulated), compliance | 25 min |

---

## Ecosystem

| File | Description | Time |
|------|-------------|------|
| [ecosystem/ai-ecosystem.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/ai-ecosystem.md) | Complementary AI tools (Perplexity, Gemini, Kimi, NotebookLM, TTS) | 30 min |
| [ecosystem/plugin-distribution.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/plugin-distribution.md) | **Plugin distribution**: package boundaries, marketplace trust, recommendation hints, and release checks | 15 min |
| [ecosystem/agentic-tools.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md) | **Agent tools comparison**: Hermes Agent, Codex CLI, Aider, Devin, SWE-agent, CrewAI, LangGraph, AutoGen, decision framework | 20 min |
| [ecosystem/mcp-vs-cli.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-vs-cli.md) | **MCP vs CLI decision guide**: when to use MCP servers vs CLI tools in Claude Code workflows, tradeoffs and decision dimensions | 15 min |
| [ecosystem/claude-code-guide-mcp.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/claude-code-guide-mcp.md) | **Guide MCP technical reference**: installation by client, published and candidate capabilities, architecture, network and privacy boundaries, offline behavior, troubleshooting, and dated metrics | 12 min |
| [ecosystem/agent-harness-landscape.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md) | **Agent Harness Map**: strict runtimes, orchestrators, adjacent projects, and a sourced research layer for harness optimizers and meta-harnesses | 10 min |
| [ecosystem/mcp-servers-ecosystem.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md) | **Community MCP servers**: 8 validated servers (Playwright, Semgrep, Kubernetes, etc.) with production configs | 25 min |
| [ecosystem/third-party-tools.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md) | **Community tools**: GUIs, TUIs, config managers, token trackers, alternative UIs | 15 min |
| [ecosystem/context-engineering-tools.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/context-engineering-tools.md) | **Context & token optimization**: output compression (RTK, Headroom), prompt compression (LLMLingua), AI gateways (Edgee, Portkey), RAG, LLMOps | 20 min |
| [ecosystem/remarkable-ai.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/remarkable-ai.md) | Remarkable AI usage patterns and power-user techniques | 10 min |
| [ecosystem/practitioner-insights.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/practitioner-insights.md) | **Practitioner field reports**: 75 paraphrased insights from IFTTD, Devoxx, Dev With AI Meetup, ByteByteGo, Stanford Online, and Pavan Belagatti's 2026 video corpus, organized by theme (context engineering, agentic patterns, LLM evaluation, agent security, DevX and adoption) | 20 min |
| [ecosystem/team-knowledge-base.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/team-knowledge-base.md) | **Team knowledge infrastructure**: 3-tier framework (static Markdown vault, MCP connectors for live systems, RAG at scale), RAG threshold (~100-1000 docs), Atlassian/Notion/GitBook MCP, Onyx/LlamaCloud/Ragie, plugin distribution, Code+Cowork bridge | 18 min |
| [ecosystem/local-vs-cloud-inference.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/local-vs-cloud-inference.md) | **Local vs cloud economics**: 10 comparable hardware builds (llmfit-sized), OVH/AWS/Lambda/RunPod GPU rental pricing, 1-year TCO projections, Claude vs GPT-5.6 cloud throughput, decision framework | 20 min |
| [ecosystem/ai-executive-agents.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/ai-executive-agents.md) | **AI executive agents**: OpenExecutive deep dive, open-source alternatives (Become CEO, OneManCompany, crewAI) with verified GitHub stats, a routing table by role (CFO, CMO, CHRO, General Counsel, board), augmentation-vs-replacement and Synthetic Director governance angle | 12 min |

---

## Roles & Adoption

| File | Description | Time |
|------|-------------|------|
| [roles/ai-roles.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/ai-roles.md) | Evidence-bounded map of AI role families, specializations, tiny-team convergence, and career paths | 25 min |
| [roles/adoption-approaches.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/adoption-approaches.md) | Implementation strategies for teams | 15 min |
| [roles/learning-with-ai.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/learning-with-ai.md) | Guide for juniors on using AI without losing skills | 15 min |
| [roles/agent-evaluation.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/agent-evaluation.md) | **Agent quality metrics**: Measuring custom agent effectiveness with hooks, tests, and feedback loops | 20 min |

---

## Operations

| File | Description | Time |
|------|-------------|------|
| [ops/devops-sre.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/devops-sre.md) | FIRE framework for infrastructure diagnosis and incident response | 30 min |
| [ops/observability.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/observability.md) | Session monitoring and cost tracking | 15 min |
| [ops/api-gateway.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/api-gateway.md) | **API gateways**: separate Claude apps gateway behavior from third-party proxy controls such as LiteLLM and Portkey | 15 min |
| [ops/ai-traceability.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/ai-traceability.md) | AI attribution, disclosure policies, git-ai, compliance | 20 min |
| [ops/team-metrics.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/team-metrics.md) | **Team metrics for AI-augmented engineering**: DORA, SPACE, DX Core 4, AI-specific signals, by team size (5–25 people) | 20 min |
| [ops/ai-unit-economics.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/ai-unit-economics.md) | **AI unit economics**: per-task cost decomposition, real cost levers (routing, sub-agent isolation, exit criteria), autonomous agent break-even point, team budget governance | 15 min |
| [ops/subscription-strategy.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/subscription-strategy.md) | **Subscription strategy at team scale**: Claude, Codex, Copilot, Gemini, Cursor, and Mistral portfolio exercise; API gateway controls; personal-plan contract gaps; and scenario-based self-hosting economics | 20 min |

---

## Workflows

Hands-on guides for effective development patterns:

| File | Description |
|------|-------------|
| [workflows/tdd-with-claude.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/tdd-with-claude.md) | Test-Driven Development with Claude |
| [workflows/spec-first.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/spec-first.md) | Spec-First Development (SDD) |
| [workflows/plan-driven.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/plan-driven.md) | Using /plan mode effectively |
| [workflows/iterative-refinement.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/iterative-refinement.md) | Iterative improvement loops |
| [workflows/best-of-n.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/best-of-n.md) | Generate independent candidates, select with a frozen rubric, verify, and preserve the proof log |
| [workflows/tts-setup.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/tts-setup.md) | Add text-to-speech narration to Claude Code (18 min) |
| [workflows/task-management.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/task-management.md) | Multi-session task tracking, TodoWrite migration |
| [workflows/agent-teams.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams.md) | Orchestrating multi-agent teams for complex tasks |
| [workflows/agent-teams-quick-start.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams-quick-start.md) | Quick start guide for agent team patterns |
| [workflows/agentic-software-factories.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agentic-software-factories.md) | Orientation map: from a single session to a software factory, and when a closed platform actually wins |
| [../examples/workflows/bounded-loop-contract.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/bounded-loop-contract.md) | Runnable bounded-loop contract with a separate verifier interface, an attempt budget, evidence, and escalation |
| [workflows/dynamic-workflows.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/dynamic-workflows.md) | JavaScript-orchestrated multi-agent pipelines: deterministic control flow, parallel fan-out, automatic resume |
| [workflows/dual-instance-planning.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/dual-instance-planning.md) | Dual-instance planning: Opus plans, Sonnet executes |
| [workflows/event-driven-agents.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/event-driven-agents.md) | Event-driven agent coordination patterns |
| [workflows/monitor-event-delegation.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/monitor-event-delegation.md) | Monitor command/WebSocket, plugin monitors, Channels, Routines, and safe Codex delegation |
| [workflows/github-actions.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/github-actions.md) | Step-by-step claude-code-action setup: PR review on mention, automatic review on push, issue triage |
| [workflows/code-review.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/code-review.md) | Automated multi-agent PR review for Teams and Enterprise: setup, triggers, REVIEW.md configuration, cost management |
| [workflows/ai-assisted-open-source-contributions.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/ai-assisted-open-source-contributions.md) | Contribution policy, reproduction, author understanding, verification evidence and maintainer follow-up |
| [workflows/production-reliability.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/production-reliability.md) | Production reliability patterns: escalation design, circuit breakers, structured error propagation, graceful degradation |
| [workflows/support-csm-agent.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/support-csm-agent.md) | Internal support/CSM agent: ticket triage, DB diagnosis, CRM via MCP |
| [workflows/plan-pipeline.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/plan-pipeline.md) | End-to-end plan pipeline: start, validate, execute |
| [workflows/design-to-code.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/design-to-code.md) | Convert Figma/wireframes to working code |
| [workflows/exploration-workflow.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/exploration-workflow.md) | Systematically explore unfamiliar codebases |
| [workflows/pdf-generation.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/pdf-generation.md) | Generate professional PDFs with Quarto/Typst |
| [workflows/search-tools-mastery.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/search-tools-mastery.md) | Master rg, grepai, Serena, ast-grep combined workflows |
| [workflows/skeleton-projects.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/skeleton-projects.md) | Use battle-tested repos as scaffolding for new projects |
| [workflows/talk-pipeline.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/talk-pipeline.md) | 6-stage talk preparation: raw material to slides |
| [workflows/team-ai-instructions.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/team-ai-instructions.md) | Scale CLAUDE.md across multi-developer teams |

---

## Cowork Documentation

For knowledge workers using Claude Cowork (agentic desktop):

| Resource | Description |
|----------|-------------|
| **[Cowork Hub](https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/README.md)** | Complete Cowork documentation |
| [Getting Started](https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/guide/01-getting-started.md) | Setup and first workflow |
| [Capabilities](https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/guide/02-capabilities.md) | What Cowork can/cannot do |
| [Security Guide](https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/guide/03-security.md) | Safe usage practices |
| [Prompt Library](https://github.com/FlorianBruniaux/claude-cowork-guide/tree/main/prompts) | 50+ ready-to-use prompts |
| [Cheatsheet](https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/reference/cheatsheet.md) | 1-page quick reference |

---

## Recommended Reading Order

1. **New users**: Start with Quick Start section in `ultimate-guide.md`
2. **Daily reference**: Print `cheatsheet.md`
3. **Team leads**: Read `roles/adoption-approaches.md` for rollout strategies
4. **Security focus**: `security/security-hardening.md` then `security/sandbox-isolation.md`
5. **Deep architecture**: `core/architecture.md` then `diagrams/`

---

*Back to [main README](/lib/09-harness/claude-code-ultimate-guide/overview)*
