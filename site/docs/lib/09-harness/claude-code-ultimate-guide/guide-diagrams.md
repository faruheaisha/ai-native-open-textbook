---
title: "Claude Code: Visual Diagrams"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/diagrams/README.md"
sourceRel: "guide/diagrams/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/diagrams/README.md"
sourceSha256: "eadfebfb8e4f104ceb78322fc5b2846d65c18d43ab0f7189501e521a88355ebe"
pageSha256: "eadfebfb8e4f104ceb78322fc5b2846d65c18d43ab0f7189501e521a88355ebe"
contentMode: "local-full"
zh: ""
---

# Claude Code: Visual Diagrams

49 interactive Mermaid diagrams organized in 12 thematic files. Each diagram includes a Mermaid version (rendered natively on GitHub) and an ASCII fallback.

> For ASCII-only diagrams and a printable visual reference → [visual-reference.md](/lib/09-harness/claude-code-ultimate-guide/guide-core-visual-reference)

---

## Visual Palette

All diagrams use the consistent Bold Guy palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Warm Beige | `#F5E6D3` | User actions, input nodes |
| Orange Brûlé | `#E87E2F` | Key decisions, Claude actions |
| Soft Green | `#7BC47F` | Success paths, recommendations |
| Alert Red | `#E85D5D` | Danger, anti-patterns, risks |
| Neutral Gray | `#B8B8B8` | Infrastructure, passive elements |
| Light Blue | `#6DB3F2` | Information, documentation refs |

## Mermaid Conventions

| Shape | Syntax | Meaning |
|-------|--------|---------|
| Rounded rect | `(text)` | Process step, action |
| Diamond | `\{text\}` | Decision point |
| Stadium | `([text])` | Start / End terminal |
| Hexagon | <code v-pre>{{text}}</code> | External system or API |
| Subroutine | `[[text]]` | Internal Claude Code component |
| Cylinder | `[(text)]` | Data store, persistent state |

---

## Navigation

| File | Diagrams | Topics |
|------|----------|--------|
| [01-foundations.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-01-foundations) | 4 | 4-layer model, workflow pipeline, decision tree, permission modes |
| [02-context-and-sessions.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-02-context-and-sessions) | 4 | Context zones, memory hierarchy, session teleportation, fresh context |
| [03-configuration-system.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-03-configuration-system) | 4 | Config precedence, skills vs commands vs agents, agent lifecycle, hooks |
| [04-architecture-internals.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals) | 4 | Master loop, tool categories, system prompt assembly, sub-agent isolation |
| [05-mcp-ecosystem.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-05-mcp-ecosystem) | 4 | MCP ecosystem map, MCP architecture, rug pull attack, config hierarchy |
| [06-development-workflows.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-06-development-workflows) | 5 | TDD cycle, spec-first pipeline, plan-driven, iterative refinement, AI fluency paths |
| [07-multi-agent-patterns.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-07-multi-agent-patterns) | 6 | Agent topologies, worktrees, dual-instance, horizontal scaling, decision matrix, cross-session messaging |
| [08-security-and-production.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-08-security-and-production) | 4 | 3-layer defense, sandbox decision, verification paradox, CI/CD pipeline |
| [09-cost-and-optimization.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-09-cost-and-optimization) | 4 | Model selection, cost optimization, subscription tiers, token reduction |
| [10-adoption-and-learning.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-10-adoption-and-learning) | 3 | Onboarding paths, UVAL protocol, trust calibration |
| [11-context-engineering.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-11-context-engineering) | 4 | 3-layer context system, adherence degradation, modular architecture, rule placement |
| [12-enterprise-governance.md](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-12-enterprise-governance) | 3 | Governance risk tiers, MCP approval workflow, data classification |
| **Total** | **49** | |

---

## Navigate by Use Case

### "I'm new to Claude Code, where do I start?"
1. [Quick Decision Tree](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-01-foundations#quick-decision-tree): Should I use Claude Code?
2. [9-Step Workflow Pipeline](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-01-foundations#9-step-workflow-pipeline): How does it work?
3. [Permission Modes](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-01-foundations#permission-modes-comparison): What are the safety modes?
4. [Onboarding Paths](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-10-adoption-and-learning#onboarding-adaptive-learning-paths): Which path fits me?

### "I want to understand the architecture"
1. [The Master Loop](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals#the-master-loop): Core execution engine
2. [System Prompt Assembly](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals#system-prompt-assembly): How context is built
3. [4-Layer Context System](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-01-foundations#chatbot-to-context-system-4-layer-model): The transformation model
4. [Tool Categories](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals#tool-categories): What tools are available

### "I'm worried about security"
1. [MCP Rug Pull Attack](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-05-mcp-ecosystem#mcp-rug-pull-attack-chain): The main threat vector
2. [3-Layer Defense](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-08-security-and-production#security-3-layer-defense): How to protect yourself
3. [Sandbox Decision Tree](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-08-security-and-production#sandbox-decision-tree): When to sandbox
4. [Verification Paradox](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-08-security-and-production#the-verification-paradox): Don't trust Claude to verify itself

### "I want to reduce my token costs"
1. [Model Selection Decision Flow](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-09-cost-and-optimization#model-selection-decision-flow): Pick the right model
2. [Cost Optimization Tree](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-09-cost-and-optimization#cost-optimization-decision-tree): Systematic cost reduction
3. [Token Reduction Pipeline](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-09-cost-and-optimization#token-reduction-strategies-pipeline): RTK + session hygiene
4. [Context Management Zones](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-02-context-and-sessions#context-management-zones): Manage context size

### "I want to use multiple agents"
1. [Agent Teams Topology](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-07-multi-agent-patterns#agent-teams-topology-3-patterns): 3 orchestration patterns
2. [Multi-Instance Decision Matrix](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-07-multi-agent-patterns#multi-instance-decision-matrix): Which pattern to use?
3. [Git Worktree Multi-Instance](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-07-multi-agent-patterns#git-worktree-multi-instance-pattern): Parallel isolation
4. [Sub-Agent Context Isolation](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals#sub-agent-context-isolation): How agents are isolated
5. [Cross-Session Messaging](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-07-multi-agent-patterns#cross-session-messaging-discovery--delivery): How independent sessions discover and message each other

### "I want to set up MCP servers"
1. [MCP Ecosystem Map](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-05-mcp-ecosystem#mcp-server-ecosystem-map): What servers exist
2. [MCP Architecture](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-05-mcp-ecosystem#mcp-architecture-client-server): How it works
3. [MCP Config Hierarchy](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-05-mcp-ecosystem#mcp-config-hierarchy): Where configs live

### "I want to govern Claude Code across my team"
1. [Governance Risk Tiers](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-12-enterprise-governance#governance-risk-tiers): Which control level fits your context?
2. [MCP Governance Workflow](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-12-enterprise-governance#mcp-governance-workflow): Approval pipeline for MCP servers
3. [Data Classification Rules](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-12-enterprise-governance#data-classification--claude-code-access-rules): What Claude can and cannot access

### "I want to improve Claude's context adherence"
1. [Rule Placement Decision Tree](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-11-context-engineering#rule-placement-decision-tree): Where does this rule go?
2. [3-Layer Context System](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-11-context-engineering#the-3-layer-context-system): Global / Project / Session
3. [Context Budget & Adherence](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-11-context-engineering#context-budget--adherence-degradation): Why rules stop being followed
4. [Modular Architecture](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-11-context-engineering#monolithic-vs-modular-architecture): Path-scoping as the fix

---

*Back to [guide/README.md](/lib/09-harness/claude-code-ultimate-guide/guide) | ASCII diagrams → [visual-reference.md](/lib/09-harness/claude-code-ultimate-guide/guide-core-visual-reference)*
