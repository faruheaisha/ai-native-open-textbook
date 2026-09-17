---
title: "Claude Code Workflows"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/README.md"
sourceRel: "guide/workflows/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/README.md"
sourceSha256: "a4334a5ea41fbb636f03244128cecd1f0ea413e2de2139aff26998138b206c40"
pageSha256: "a4334a5ea41fbb636f03244128cecd1f0ea413e2de2139aff26998138b206c40"
contentMode: "local-full"
zh: ""
---

# Claude Code Workflows

Step-by-step guides for common development patterns with Claude Code.

---

## 🔍 Search & Discovery

**Master the art of code search by combining rg, grepai, Serena & ast-grep**

Learn when to use each tool, how to combine them for maximum efficiency, and real-world workflows including:
- Exploring unknown codebases
- Large-scale refactoring
- Security audits
- Framework migrations
- Performance optimization

**Key Topics**:
- Quick decision matrix
- Complete feature comparison
- 5 combined workflows
- Performance benchmarks
- Common pitfalls
- Tool selection cheatsheet

---

## 🎯 Development Workflows

### [Plan-Driven Development](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-driven)

Structure complex tasks with planning mode before execution.

**When to use**: Multi-step features, architectural changes, uncertainty about approach

### [AI-Assisted Open Source Contributions](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-ai-assisted-open-source-contributions)

Prepare a contribution with a reproduced problem, author explanation, verification evidence and responsibility for maintainer feedback. Includes a reusable contribution packet.

**When to use**: Claude Code helps prepare a patch for another project's maintainers.

### [TDD with Claude](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-tdd-with-claude)

Test-Driven Development workflow: write tests first, implement after.

**When to use**: Critical functionality, regression prevention, API design

### [Spec-First Development](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first)

Write specifications before code for better requirements clarity.

**When to use**: Team collaboration, complex features, documentation-first projects

### [Iterative Refinement](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-iterative-refinement)

Improve code through multiple refinement cycles.

**When to use**: Quality improvements, performance optimization, code cleanup

### [Best-of-N: Generate, Select, and Verify](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-best-of-n)

Generate a declared set of independent candidates, score every candidate against a frozen rubric, verify the selected result outside its generation context, and preserve the proof log.

**When to use**: Several plausible solutions with material trade-offs and a reviewer or executable check that can distinguish them

**Reusable assets**: [Best-of-N skill](/lib/09-harness/claude-code-ultimate-guide/examples-skills-best-of-n-SKILL) and [TESTING.md proof record](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-TESTING)

Use existing battle-tested repositories as scaffolding for new projects.

**When to use**: Starting new projects, standardizing team patterns, rapid prototyping from proven foundations

### [Team AI Instructions](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-team-ai-instructions)

Scale CLAUDE.md across a multi-developer, multi-tool team with profile-based module assembly.

**When to use**: Team 5+ devs, multiple AI tools (Claude Code + Cursor/Windsurf), mixed OS

**Enforce per-PR documentation with a 3-layer system: CLAUDE.md rule + UserPromptSubmit hook + CI gate**

Eliminates merge conflicts on `CHANGELOG.md`, captures context at implementation time, and ensures DB migrations are never silently deployed. Includes a reusable `UserPromptSubmit` hook pattern for enforcing any mandatory workflow step.

**Key Topics**:
- CLAUDE.md workflow rule for autonomous fragment creation
- `UserPromptSubmit` hook with 3-tier priority (enforcement, discovery, contextual)
- Conditional suggestion pattern: "if PR-intent without fragment-mention"
- CI enforcement with independent migration check job

**Two-engine `UserPromptSubmit` hook system: regex enforcement + self-calibrating BM25 lexical scoring**

Injects ranked skill suggestions as `additionalContext` so Claude proposes the right skill even when phrasing was never anticipated. BM25 generalizes from scenario examples; the regex layer handles enforcement patterns. Both run in parallel on every prompt.

**Key Topics**:
- Regex vs BM25 decision table (when each engine wins)
- Corpus format: 10+ positive + 3+ negative scenarios per skill
- `build-index.js`: leave-one-out calibration, F-beta threshold, `ok`/`excluded`/`conflict` status
- Wiring two hooks in parallel via settings.json
- Detached background index rebuild when corpus changes

**3-phase feature development with explicit validation gates between phases**

Build features in three locked phases: Research feasibility first, plan the implementation second, write code third. Each phase produces a concrete artifact (RESEARCH.md → PLAN.md → code). Each gate requires an explicit GO before the next phase starts.

**When to use**: Features with unclear feasibility, more than a day of work, unknown technical territory, or anywhere discovering a wrong assumption late is costly

**5 production-ready patterns for automating PR reviews, issue triage, and quality gates**

Connect Claude directly to your GitHub workflow via the official `claude-code-action`. Two modes: interactive (`@claude` mentions) and fully automated (push/schedule triggers).

**Key Topics**:
- Setup via `/install-github-app` (30-second quickstart)
- Pattern 1: On-demand PR review via `@claude` mention
- Pattern 2: Automatic review on every push
- Pattern 3: Issue triage and labeling
- Pattern 4: Security-focused review on sensitive paths
- Pattern 5: Scheduled weekly repo health check
- Cost control, concurrency, fork safety

**When to use**: Any team wanting AI-powered code review without managing infrastructure

---

**Run Claude Code Action alongside CodeRabbit and Greptile without triplicate findings**

Non-redundant architecture for three automated reviewers on the same PR: Claude owns deep semantic review and the merge-blocking gate, a deterministic tool owns PASS/FAIL pre-merge checks, a RAG tool owns cross-file invariants. Covers the CI gate script, batching for large PRs, delta-review, and cross-tool deduplication.

**When to use**: Running more than one automated code reviewer and finding the same issue reported three times, or wanting Claude's findings to actually block merge instead of just commenting

---

Switch between specialist roles across your ship cycle: strategic product gate, architecture review, paranoid code review, automated release, native browser QA, and retrospective.

**When to use**: Ship cycles where you want explicit separation between product direction, engineering rigor, review, and release, rather than one generic assistant handling all phases

---

## 🎨 Design & Content

### [Design to Code](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-design-to-code)

Convert design mockups (Figma, wireframes) into working code.

**When to use**: Frontend development, UI implementation, design system work

### [OG Image Generation](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-og-image-generation)

Generate social preview images dynamically at build time with Satori and resvg.

**When to use**: Astro projects, keeping social previews accurate without maintaining static PNGs

### [PDF Generation](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-pdf-generation)

Generate professional PDFs using Quarto/Typst with Claude Code.

**When to use**: Reports, documentation, whitepapers, technical documents

6-stage skill pipeline: raw material → structured talk → AI-generated slides via Kimi.

**When to use**: Conference talks, meetup presentations, internal tech talks (from article, transcript, or notes)

### [TTS Setup](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-tts-setup)

Configure Text-to-Speech for Claude Code responses (Agent Vibes integration).

**When to use**: Audio feedback, accessibility, hands-free coding

---

## 🔬 Code Exploration

### [Exploration Workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-exploration-workflow)

Systematically explore and understand unfamiliar codebases.

**When to use**: New projects, legacy code, documentation gaps

**Related**: See [Search Tools Mastery](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-search-tools-mastery) for advanced multi-tool exploration strategies.

---

## Multi-Agent & Advanced

JavaScript scripts that orchestrate tens to hundreds of subagents with deterministic control flow, parallel fan-out, and automatic resume on interruption.

**When to use**: Multi-stage parallelizable work, long-running jobs, tasks needing structured data handoffs between phases, or any situation where a single agent would hit context limits

**Key Topics**:
- Primitive reference: `agent()`, `parallel()`, `pipeline()`, `phase()`, `log()`, `budget`
- `pipeline()` vs `parallel()` with benchmark data (3x latency difference, 2x token difference)
- Schema-structured outputs across phases
- 5 named patterns: adversarial verification, loop-until-dry, judge panels, multi-modal sweep, plan-execute-review
- Behavioral guarantees: determinism constraints, resume/caching, concurrency caps

---

### [Agent Teams](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index)

Orchestrate multiple specialized agents working in parallel on complex tasks.

**When to use**: Tasks that benefit from parallelism, specialized expertise, or independent verification

### [Agent Teams Quick Start](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams-quick-start)

Fast-track guide to setting up your first agent team in under 30 minutes.

**When to use**: New to multi-agent patterns, want to experiment before committing to full setup

### [Dual-Instance Planning](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-dual-instance-planning)

Run Opus for planning and Sonnet for execution in two coordinated Claude Code instances.

**When to use**: Complex features needing deep reasoning for architecture, cost-effective execution

### [Event-Driven Agents](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-event-driven-agents)

Coordinate agents through hook events rather than direct orchestration.

**When to use**: Reactive workflows, hook-triggered automation, loosely-coupled agent pipelines

### [Plan Pipeline](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-pipeline)

Full end-to-end plan pipeline: /plan-start, /plan-validate, /plan-execute as a coherent workflow.

**When to use**: Any significant feature where planning rigor pays off before writing code

### [Task Management](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-task-management)

Multi-session task tracking with TodoWrite, tasks API, and context persistence across sessions.

**When to use**: Long-running tasks spanning multiple sessions, team coordination, complex backlogs

`ListAgents` and `SendMessage`: how independent, already-running Claude Code sessions discover and message each other, on the same machine or across your account, without a human relaying context between terminals.

**When to use**: Coordinating sessions you started and steer yourself (parallel worktrees, per-role sessions, cross-machine hand-offs), distinct from Agent Teams (a lead session spawns and supervises its own teammates)

**Key Topics**:
- `ListAgents` discovery: subagents, teammates, local peers, cloud, Remote Control
- Same-machine socket delivery vs. cross-machine Remote Control routing
- Security model: `crossSessionInbound`, `isolatePeerMachines`, why a peer message never carries authority
- Version timeline and limitations (message size cap, burst throttling)

---

## Quick Selection Guide

| Your Situation | Recommended Workflow |
|----------------|---------------------|
| **New to codebase** | [Exploration Workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-exploration-workflow) + [Search Tools Mastery](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-search-tools-mastery) |
| **Complex feature** | [Plan-Driven](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-driven) or [Spec-First](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first) |
| **Need reliability** | [TDD with Claude](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-tdd-with-claude) |
| **Several plausible solutions with a stable rubric** | [Best-of-N](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-best-of-n) |
| **Large refactoring** | [Search Tools Mastery](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-search-tools-mastery) |
| **UI implementation** | [Design to Code](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-design-to-code) |
| **Code quality** | [Iterative Refinement](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-iterative-refinement) |
| **New project from template** | [Skeleton Projects](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-skeleton-projects) |
| **Team AI instructions** | [Team AI Instructions](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-team-ai-instructions) |
| **Enforce mandatory workflow steps** | [Changelog Fragments](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-changelog-fragments) |
| **Skill routing from natural-language prompts** | [Smart-Suggest Routing](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-smart-suggest-routing) |
| **Unknown feasibility, multi-day feature** | [RPI: Research → Plan → Implement](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-rpi) |
| **Documentation** | [PDF Generation](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-pdf-generation) |
| **Social previews** | [OG Image Generation](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-og-image-generation) |
| **Conference talk from raw material** | [Talk Preparation Pipeline](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-talk-pipeline) |
| **Distribute a guide asset with attribution** | [Guide Distribution](/lib/09-harness/claude-code-ultimate-guide/docs-workflows-guide-distribution) |
| **Audio feedback** | [TTS Setup](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-tts-setup) |
| **Deterministic multi-agent orchestration** | [Dynamic Workflows](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-dynamic-workflows) |
| **Multi-agent tasks** | [Agent Teams](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index) |
| **First agent team** | [Agent Teams Quick Start](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams-quick-start) |
| **Cost-optimized planning** | [Dual-Instance Planning](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-dual-instance-planning) |
| **Hook-driven automation** | [Event-Driven Agents](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-event-driven-agents) |
| **Full plan workflow** | [Plan Pipeline](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-pipeline) |
| **Multi-session tracking** | [Task Management](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-task-management) |
| **Coordinating sessions you already have open** | [Cross-Session Messaging](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging) |
| **Strategic gate before coding** | [Cognitive Mode Switching](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-gstack-workflow) |
| **Non-MCP browser automation** | [Cognitive Mode Switching](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-gstack-workflow) |
