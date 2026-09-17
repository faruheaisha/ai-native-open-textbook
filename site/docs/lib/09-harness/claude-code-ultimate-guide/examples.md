---
title: "Claude Code Examples"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/README.md"
sourceRel: "examples/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/README.md"
sourceSha256: "6af557327cc3b0ef428472aaea6443de08511c4aaca9cae81b89e9b60ad74ef6"
pageSha256: "6af557327cc3b0ef428472aaea6443de08511c4aaca9cae81b89e9b60ad74ef6"
contentMode: "local-full"
zh: ""
---

# Claude Code Examples

Annotated templates that teach you **why** patterns work, not just how to configure them. Each template includes comments explaining trade-offs, alternatives, and when to deviate.

> **[📚 Browse Auto-Generated Catalog](/lib/09-harness/claude-code-ultimate-guide/examples-CATALOG)**: Indexed by complexity, time, and domain (238 templates across six catalog categories; 271 production templates overall)
> **[🔍 Browse Interactive Catalog](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/index.html)** — View, copy, and download templates with syntax highlighting

## New: Auto-Generated Catalog

**[`CATALOG.md`](/lib/09-harness/claude-code-ultimate-guide/examples-CATALOG)** is now auto-generated from template metadata, organized by:
- **Complexity**: Beginner, Intermediate, Advanced
- **Time**: 5 min to 4+ hours
- **Domain**: Security, Testing, Deployment, Performance, Architecture, Automation
- **Keywords**: Searchable tags for discoverability

Every template includes metadata:
```yaml
---
name: template-name
description: One-line description
complexity: beginner|intermediate|advanced
time: 5 min|15 min|30 min|1 hour|2 hours|4+ hours|varies
domain: security|testing|deployment|etc
prerequisites: []
status: stable|experimental|deprecated
keywords: [tag1, tag2]
---
```

**See [`docs/template-metadata-schema.md`](/lib/09-harness/claude-code-ultimate-guide/docs-template-metadata-schema)** for complete specification.

## Structure

| Folder | Description | Count |
|--------|-------------|-------|
| [`agents/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/agents/README.md) | Custom AI personas for specialized tasks | 21 + 2 collections |
| [`commands/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/README.md) | Slash commands (workflow automation) | 52 |
| [`hooks/`](/lib/09-harness/claude-code-ultimate-guide/examples-hooks) | Event-driven security and automation scripts | 39 catalog entries |
| [`skills/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/README.md) | Reusable knowledge modules, including [9 on SkillHub](https://skills.palebluedot.live/owner/FlorianBruniaux) | 118 catalog entries |
| [`claude-md/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/claude-md/README.md) | CLAUDE.md configuration profiles | 7 |
| [`config/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/README.md) | Settings, MCP, git templates | 6 |
| [`memory/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/memory/README.md) | CLAUDE.md memory file templates | 1 |
| [`rules/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/rules/README.md) | Behavioral rules for common review patterns | 5 |
| [`scripts/`](/lib/09-harness/claude-code-ultimate-guide/examples-scripts) | Diagnostic & utility scripts | 17 |
| [`team-config/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/team-config/README.md) | Team onboarding templates | 3 |
| [`templates/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/templates/README.md) | Session and workflow templates | 2 |
| [`github-actions/`](/lib/09-harness/claude-code-ultimate-guide/examples-github-actions) | CI/CD workflows | 6 |
| [`workflows/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/README.md) | Advanced development workflows, including bounded loops and review admission | 5 |
| [`plugins/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/README.md) | Community plugins (SE-CoVe, claude-mem) | 2 |
| [`integrations/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/integrations/README.md) | External tool integrations (Agent Vibes TTS) | 3 |
| [`context-engineering/`](/lib/09-harness/claude-code-ultimate-guide/examples-context-engineering) | Context engineering patterns and profiles | 10 |
| [`mcp-configs/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/mcp-configs/README.md) | MCP server configurations | 1 |
| [`modes/`](/lib/09-harness/claude-code-ultimate-guide/examples-modes) | Behavioral modes (SuperClaude) | 1 |
| [`semantic-anchors/`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/semantic-anchors/README.md) | Precise vocabulary for better LLM outputs | 1 |
| [`multi-provider/`](https://github.com/FlorianBruniaux/cc-copilot-bridge) | Multi-provider bridge → dedicated repo | — |

## Contribution, review capacity and comprehension

- [AI-assisted contribution packet](/lib/09-harness/claude-code-ultimate-guide/examples-templates-ai-assisted-contribution): evidence and author explanation before submission
- [Review admission worksheet](/lib/09-harness/claude-code-ultimate-guide/examples-workflows-review-admission): shared capacity, pause/resume rules and a tabletop exercise
- [Review comprehension exercise](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-review-comprehension-exercise): explain, perturb, diagnose and escalate

These worksheets are proposed procedures. Their examples do not establish runtime enforcement or measured learning and throughput gains.

## Quick Start

1. Copy the template you need
2. Customize for your project
3. Place in the correct location (see paths below)

## File Locations

| Type | Project Location | Global Location |
|------|------------------|-----------------|
| Agents | `.claude/agents/` | `~/.claude/agents/` |
| Skills | `.claude/skills/` | `~/.claude/skills/` |
| Commands | `.claude/commands/` | `~/.claude/commands/` |
| Hooks | `.claude/hooks/` | `~/.claude/hooks/` |
| Config | `.claude/` | `~/.claude/` |
| Memory | `./CLAUDE.md` or `.claude/CLAUDE.md` | `~/.claude/CLAUDE.md` |
| Modes | — | `~/.claude/MODE_*.md` |

> **Windows**: Replace `~/.claude/` with `%USERPROFILE%\.claude\`

## Templates Index

### Agents (23)

| File | Purpose | Model |
|------|---------|-------|
| [code-reviewer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-code-reviewer) | Thorough code review | Sonnet |
| [test-writer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-test-writer) | TDD/BDD test generation | Sonnet |
| [security-auditor.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-auditor) | Security vulnerability detection | Sonnet |
| [refactoring-specialist.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-refactoring-specialist) | Clean code refactoring | Sonnet |
| [output-evaluator.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-output-evaluator) | LLM-as-a-Judge quality gate | Haiku |
| [devops-sre.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-devops-sre) | Infrastructure troubleshooting with FIRE framework | Sonnet |
| [planner.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-planner) | Strategic planning — read-only, before implementation | Opus |
| [implementer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-implementer) | Mechanical execution — bounded scope | Haiku |
| [architecture-reviewer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-architecture-reviewer) | Architecture & design review — read-only | Opus |
| [adr-writer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-adr-writer) | Architecture Decision Record generator — read-only | Opus |
| [integration-reviewer.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-integration-reviewer) | Runtime integration validator — read-only | Sonnet |
| [plan-challenger.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-plan-challenger) | Adversarial plan review across 5 dimensions — read-only | Sonnet |
| [planning-coordinator.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-planning-coordinator) | Synthesis agent for dynamic research teams — read-only | Sonnet |
| [security-patcher.md](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-patcher) | Apply security patches from audit findings — proposes for review | Sonnet |
| [analytics-with-eval/](/lib/09-harness/claude-code-ultimate-guide/examples-agents-analytics-with-eval) | Collection: analytics agent + evaluation hooks | — |
| [cyber-defense/](/lib/09-harness/claude-code-ultimate-guide/examples-agents-cyber-defense) | Collection: anomaly detector, log ingestor, risk classifier, threat reporter | — |

### Skills (68) — [9 on SkillHub](https://skills.palebluedot.live/owner/FlorianBruniaux)

| File | Purpose |
|------|---------|
| [git-ai-archaeology/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/git-ai-archaeology/README.md) | Analyze AI config evolution in a git repo — first commits per path, monthly distribution, major PRs, maturity phases |
| [token-audit/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/token-audit/README.md) | Measure fixed-context token overhead, classify rules by usage frequency, audit hook cost, produce prioritized action plan |
| [design-patterns/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/design-patterns/README.md) | Detect and analyze GoF design patterns with stack-aware suggestions |
| [tdd-workflow.md](/lib/09-harness/claude-code-ultimate-guide/examples-skills-tdd-workflow) | Test-Driven Development process |
| [security-checklist.md](/lib/09-harness/claude-code-ultimate-guide/examples-skills-security-checklist) | OWASP Top 10 security checks |
| [pdf-generator.md](/lib/09-harness/claude-code-ultimate-guide/examples-skills-pdf-generator) | Professional PDF generation (Quarto/Typst) |
| [voice-refine/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/voice-refine/README.md) | Writing voice refinement with before/after examples |
| [ast-grep-patterns.md](/lib/09-harness/claude-code-ultimate-guide/examples-skills-ast-grep-patterns) | AST-based code search patterns |
| [rtk-optimizer/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/rtk-optimizer/README.md) | RTK token optimization analysis |
| [audit-agents-skills/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/audit-agents-skills/README.md) | Quality audit for agents, skills, and commands |
| [skill-creator/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/skill-creator/README.md) | Create new skills with proper structure and best practices |
| [landing-page-generator/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/landing-page-generator/README.md) | Generate deploy-ready landing pages from any repository |
| [ccboard/](/lib/09-harness/claude-code-ultimate-guide/examples-skills-ccboard) | Comprehensive TUI/Web dashboard for Claude Code monitoring |
| [guide-recap/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/guide-recap/README.md) | Transform CHANGELOG entries into social content (LinkedIn, Twitter/X, Slack) |
| [release-notes-generator/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/release-notes-generator/README.md) | Generate release notes in 3 formats from git commits |
| [pr-triage/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/pr-triage/README.md) | 4-phase PR backlog management (audit, deep review, validated comments, worktree setup) |
| [issue-triage/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/issue-triage/README.md) | 3-phase issue backlog management (audit, deep analysis, validated actions) |
| [cyber-defense-team/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/cyber-defense-team/README.md) | Multi-agent cyber defense team orchestration |
| [talk-pipeline/](/lib/09-harness/claude-code-ultimate-guide/examples-skills-talk-pipeline) | 6-stage pipeline: raw material to slides via Kimi |
| [eval-rules/](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/eval-rules/README.md) | Audit `.claude/rules/` files — resolves glob patterns against real project files, interactive usefulness review, in-place edits |

### Commands (52)

| File | Trigger | Purpose |
|------|---------|---------|
| [commit.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-commit) | `/commit` | Conventional commit messages |
| [pr.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-pr) | `/pr` | Create well-structured PRs with scope analysis |
| [review-pr.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-review-pr) | `/review-pr` | PR review workflow |
| [release-notes.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-release-notes) | `/release-notes` | Generate release notes in 3 formats |
| [sonarqube.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-sonarqube) | `/sonarqube` | Analyze SonarCloud quality issues for PRs |
| [generate-tests.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-generate-tests) | `/generate-tests` | Test generation |
| [git-worktree.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree) | `/git-worktree` | Isolated git worktree setup |
| [git-worktree-status.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-status) | `/git-worktree-status` | Check worktree background verification tasks |
| [git-worktree-remove.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-remove) | `/git-worktree-remove` | Safe worktree removal with merge checks |
| [git-worktree-clean.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-clean) | `/git-worktree-clean` | Batch cleanup of stale worktrees |
| [diagnose.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-diagnose) | `/diagnose` | Interactive troubleshooting assistant (FR/EN) |
| [validate-changes.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-validate-changes) | `/validate-changes` | LLM-as-a-Judge pre-commit validation |
| [catchup.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-catchup) | `/catchup` | Restore context after /clear |
| [security.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/security.md) | `/security` | Quick OWASP security audit |
| [security-check.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/security-check.md) | `/security-check` | Config scan vs known threats (~30s) |
| [security-audit.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/security-audit.md) | `/security-audit` | Full 6-phase audit with score /100 |
| [update-threat-db.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-update-threat-db) | `/update-threat-db` | Research & update threat intelligence |
| [audit-agents-skills.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-audit-agents-skills) | `/audit-agents-skills` | Quality audit for .claude/ config |
| [sandbox-status.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-sandbox-status) | `/sandbox-status` | Sandbox isolation status check |
| [refactor.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-refactor) | `/refactor` | SOLID-based code improvements |
| [explain.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-explain) | `/explain` | Code explanations (3 depth levels) |
| [optimize.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-optimize) | `/optimize` | Performance analysis and roadmap |
| [ship.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-ship) | `/ship` | Pre-deploy checklist |
| [learn/quiz.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-quiz) | `/learn:quiz` | Self-testing for learning concepts |
| [learn/teach.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-teach) | `/learn:teach` | Step-by-step concept explanations |
| [learn/alternatives.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-alternatives) | `/learn:alternatives` | Compare different approaches |
| [audit-codebase.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-audit-codebase) | `/audit-codebase` | Codebase health audit scoring 7 categories |
| [plan-start.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-plan-start) | `/plan-start` | 5-phase planning: PRD analysis, design review, technical decisions, research team, metrics |
| [plan-execute.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-plan-execute) | `/plan-execute` | Execute validated plan: worktree isolation, TDD scaffolding, parallel agents, PR creation |
| [plan-validate.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-plan-validate) | `/plan-validate` | 2-layer plan validation: structural checks + specialist agents, auto-fix issues |
| [review-plan.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-review-plan) | `/review-plan` | Structured plan review across 4 axes before writing code |
| [check-cache-bugs.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-check-cache-bugs) | `/check-cache-bugs` | Audit for CC#40524 cache bugs that can silently 10-20x API costs |

### Hooks (37)

Security-first: 12 security hooks, 8 productivity hooks, 5 automation hooks, 5 monitoring hooks.

**Security Hooks** (13 bash):

| File | Event | Purpose |
|------|-------|---------|
| [dangerous-actions-blocker.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/dangerous-actions-blocker.sh) | PreToolUse | Block `rm -rf`, force-push, production ops |
| [prompt-injection-detector.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/prompt-injection-detector.sh) | PreToolUse | Detect injection patterns in prompts |
| [unicode-injection-scanner.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/unicode-injection-scanner.sh) | PreToolUse | Detect zero-width, RTL override, ANSI escape |
| [repo-integrity-scanner.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/repo-integrity-scanner.sh) | PreToolUse | Scan README/package.json for hidden injection |
| [security-check.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/security-check.sh) | PreToolUse | Block secrets in commands |
| [sandbox-validation.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/sandbox-validation.sh) | PreToolUse | Validate sandbox isolation |
| [file-guard.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/file-guard.sh) | PreToolUse | Protect sensitive files from modification |
| [permission-request.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/permission-request.sh) | PreToolUse | Explicit permission flow for risky ops |
| [mcp-config-integrity.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/mcp-config-integrity.sh) | SessionStart | Verify MCP config hash (CVE protection) |
| [claudemd-scanner.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/claudemd-scanner.sh) | SessionStart | Detect CLAUDE.md injection attacks |
| [output-secrets-scanner.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/output-secrets-scanner.sh) | PostToolUse | Prevent API keys/tokens in Claude responses |
| [pre-commit-secrets.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/pre-commit-secrets.sh) | Git hook | Block secrets from entering commits |
| [security-gate.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/security-gate.sh) | PreToolUse | Detect vulnerable code patterns before writing to source files |

**Productivity Hooks** (10):

| File | Event | Purpose |
|------|-------|---------|
| [auto-format.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/auto-format.sh) | PostToolUse | Auto-format after edits (Prettier, Black, go fmt) |
| [auto-checkpoint.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/auto-checkpoint.sh) | PostToolUse | Auto-checkpoint work at intervals |
| [typecheck-on-save.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/typecheck-on-save.sh) | PostToolUse | Run TypeScript checks on save |
| [test-on-change.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/test-on-change.sh) | PostToolUse | Run tests on file changes |
| [rtk-auto-wrapper.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/rtk-auto-wrapper.sh) | PreToolUse | Auto-wrap commands with RTK for token savings |
| [rtk-baseline.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/rtk-baseline.sh) | SessionStart | Save RTK baseline for session savings tracking |
| [setup-init.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/setup-init.sh) | SessionStart | Initialize session environment |
| [subagent-stop.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/subagent-stop.sh) | Stop | Clean up sub-agent resources |
| [auto-rename-session.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/auto-rename-session.sh) | SessionEnd | AI-powered session title generation (Haiku) |
| [velocity-governor.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/velocity-governor.sh) | PreToolUse | Rate-limit tool calls to avoid API throttling |

**Monitoring Hooks** (6):

| File | Event | Purpose |
|------|-------|---------|
| [output-validator.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/output-validator.sh) | PostToolUse | Heuristic output validation |
| [session-logger.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/session-logger.sh) | PostToolUse | Log operations for monitoring |
| [session-summary.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/session-summary.sh) | SessionEnd | Display session stats (duration, tools, cost, RTK savings) |
| [session-summary-config.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/session-summary-config.sh) | CLI tool | Configure session-summary sections and display |
| [learning-capture.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/learning-capture.sh) | Stop | Prompt for daily learning capture |
| [privacy-warning.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/privacy-warning.sh) | PostToolUse | Warn on potential privacy leaks |

**Notification & TTS** (3):

| File | Event | Purpose |
|------|-------|---------|
| [notification.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/notification.sh) | Notification | Contextual macOS sound alerts |
| [tts-selective.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/tts-selective.sh) | PostToolUse | Text-to-speech for selected outputs |
| [pre-commit-evaluator.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/pre-commit-evaluator.sh) | Git hook | LLM-as-a-Judge pre-commit |

**PowerShell** (2):

| File | Event | Purpose |
|------|-------|---------|
| [security-check.ps1](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/powershell/security-check.ps1) | PreToolUse | Block secrets in commands |
| [auto-format.ps1](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/powershell/auto-format.ps1) | PostToolUse | Auto-format after edits |

> **See [hooks/README.md](/lib/09-harness/claude-code-ultimate-guide/examples-hooks) for full documentation, configuration examples, and security hardening patterns**

### Config (6)

| File | Purpose |
|------|---------|
| [settings.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/settings.json) | Hooks configuration |
| [mcp.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/mcp.json) | MCP servers setup |
| [.gitignore-claude](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/.gitignore-claude/README.md) | Git ignore patterns |
| [CONTRIBUTING-ai-disclosure.md](/lib/09-harness/claude-code-ultimate-guide/examples-config-CONTRIBUTING-ai-disclosure) | AI disclosure template for CONTRIBUTING.md |
| [PULL_REQUEST_TEMPLATE-ai.md](/lib/09-harness/claude-code-ultimate-guide/examples-config-PULL_REQUEST_TEMPLATE-ai) | PR template with AI attribution |
| [sandbox-native.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/sandbox-native.json) | Native Claude Code sandbox configuration |
| [settings-personalization.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/settings-personalization.json) | UI personalization: spinner verbs, custom tips carousel |
| [settings.local.json.example](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/settings.local.json.example) | Local overrides example (gitignored) |

### Memory (1)

| File | Purpose |
|------|---------|
| [CLAUDE.md.project-template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/memory/CLAUDE.md.project-template) | Team project memory |
| [CLAUDE.md.personal-template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/memory/CLAUDE.md.personal-template) | Personal global memory |

### CLAUDE.md Configurations (7)

| File | Purpose |
|------|---------|
| [learning-mode.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-learning-mode) | Learning-focused development configuration |
| [devops-sre.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-devops-sre) | DevOps/SRE project configuration |
| [product-designer.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-product-designer) | Product designer workflow configuration |
| [tts-enabled.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-tts-enabled) | Text-to-speech enabled configuration |
| [rtk-optimized.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-rtk-optimized) | RTK token-optimized configuration |
| [session-naming.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-session-naming) | Auto-rename sessions with descriptive titles for parallel work |
| [design-reference-file.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-design-reference-file) | Brand-book and UI kit context for consistent UI generation |

> **See [guide/roles/learning-with-ai.md](/lib/09-harness/claude-code-ultimate-guide/guide-roles-learning-with-ai/index) for learning mode documentation**
> **See [guide/ops/devops-sre.md](/lib/09-harness/claude-code-ultimate-guide/guide-ops-devops-sre) for DevOps/SRE guide**

### Scripts (17)

| File | Purpose | Output |
|------|---------|--------|
| [audit-scan.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/audit-scan.sh) | Fast setup audit scanner | JSON / Human |
| [check-claude.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/check-claude.sh) | Health check diagnostics (macOS/Linux) | Human |
| [check-claude.ps1](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/check-claude.ps1) | Health check diagnostics (Windows) | Human |
| [clean-reinstall-claude.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/clean-reinstall-claude.sh) | Clean reinstall procedure (macOS/Linux) | Human |
| [clean-reinstall-claude.ps1](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/clean-reinstall-claude.ps1) | Clean reinstall procedure (Windows) | Human |
| [session-stats.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/session-stats.sh) | Analyze session logs & costs | JSON / Human |
| [session-search.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/session-search.sh) | Fast session search & resume | Human |
| [cc-sessions.py](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/cc-sessions.py) | Advanced session search with incremental indexing | Human |
| [fresh-context-loop.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/fresh-context-loop.sh) | Auto-restart sessions at context limits | Human |
| [bridge.py](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/bridge.py) | Plan bridging between sessions | JSON |
| [bridge-plan-schema.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/bridge-plan-schema.json) | JSON Schema for bridge plan v1 format | — |
| [migrate-arguments-syntax.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/migrate-arguments-syntax.sh) | Migrate v1 → v2 argument syntax (bash) | Human |
| [migrate-arguments-syntax.ps1](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/migrate-arguments-syntax.ps1) | Migrate v1 → v2 argument syntax (PowerShell) | Human |
| [rtk-benchmark.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/rtk-benchmark.sh) | Benchmark RTK token savings | Human |
| [sync-claude-config.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/sync-claude-config.sh) | Sync Claude config across machines | Human |
| [sonnetplan.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/sonnetplan.sh) | Alias to run Claude with Sonnet instead of Opus (cost optimization) | Human |

> **See [scripts/README.md](/lib/09-harness/claude-code-ultimate-guide/examples-scripts) for detailed usage**

### Rules (5)

| File | Purpose |
|------|---------|
| [architecture-review.md](/lib/09-harness/claude-code-ultimate-guide/examples-rules-architecture-review) | Rules for architecture review sessions |
| [code-quality-review.md](/lib/09-harness/claude-code-ultimate-guide/examples-rules-code-quality-review) | Rules for code quality review sessions |
| [first-principles.md](/lib/09-harness/claude-code-ultimate-guide/examples-rules-first-principles) | First-principles reasoning rules |
| [performance-review.md](/lib/09-harness/claude-code-ultimate-guide/examples-rules-performance-review) | Rules for performance review sessions |
| [test-review.md](/lib/09-harness/claude-code-ultimate-guide/examples-rules-test-review) | Rules for test review sessions |

### Team Config (3)

| File | Purpose |
|------|---------|
| [claude-skeleton.md](/lib/09-harness/claude-code-ultimate-guide/examples-team-config-claude-skeleton) | Minimal CLAUDE.md skeleton for new team members |
| [profile-template.yaml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/team-config/profile-template.yaml) | Profile assembly template for multi-tool teams |
| [sync-script.ts](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/team-config/sync-script.ts) | Sync Claude config across team machines |

### Templates (1)

| File | Purpose |
|------|---------|
| [session-handoff-lorenz.md](/lib/09-harness/claude-code-ultimate-guide/examples-templates-session-handoff-lorenz) | Session handoff template for context continuity |

### GitHub Actions (6)

| File | Trigger | Purpose |
|------|---------|---------|
| [claude-pr-auto-review.yml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/claude-pr-auto-review.yml) | PR open/update | Auto code review with inline comments |
| [claude-security-review.yml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/claude-security-review.yml) | PR open/update | Security-focused scan (OWASP) |
| [claude-issue-triage.yml](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/claude-issue-triage.yml) | Issue opened | Auto-triage with labels and severity |

> **See [github-actions/README.md](/lib/09-harness/claude-code-ultimate-guide/examples-github-actions) for setup instructions and customization**

### Workflows (3)

| File | Purpose |
|------|---------|
| [database-branch-setup.md](/lib/09-harness/claude-code-ultimate-guide/examples-workflows-database-branch-setup) | Isolated feature dev with database branches (Neon/PlanetScale) |
| [memory-stack-integration.md](/lib/09-harness/claude-code-ultimate-guide/examples-workflows-memory-stack-integration) | Multi-day workflow with memory tools (claude-mem + Serena + grepai) |
| [remotion-quickstart.md](/lib/09-harness/claude-code-ultimate-guide/examples-workflows-remotion-quickstart) | Video generation workflow with Remotion |

### Plugins (2)

| File | Purpose |
|------|---------|
| [se-cove.md](/lib/09-harness/claude-code-ultimate-guide/examples-plugins-se-cove) | Chain-of-Verification for independent code review (Meta AI, ACL 2024) |
| [claude-mem.md](/lib/09-harness/claude-code-ultimate-guide/examples-plugins-claude-mem) | Persistent memory management plugin |

### Integrations (3)

| Tool | Purpose |
|------|---------|
| [Agent Vibes TTS](/lib/09-harness/claude-code-ultimate-guide/examples-integrations-agent-vibes) | Text-to-speech narration for Claude Code responses |

> **See [agent-vibes/README.md](/lib/09-harness/claude-code-ultimate-guide/examples-integrations-agent-vibes) for installation and voice catalog**

### MCP Configs (1)

| File | Purpose |
|------|---------|
| [figma.json](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/mcp-configs/figma.json) | Figma MCP server configuration |

### Modes (1)

| File | Purpose | Activation |
|------|---------|------------|
| [MODE_Learning.md](/lib/09-harness/claude-code-ultimate-guide/examples-modes-MODE_Learning) | Just-in-time explanations | `--learn` flag |

> **See [modes/README.md](/lib/09-harness/claude-code-ultimate-guide/examples-modes) for installation and SuperClaude framework reference**

### Semantic Anchors (1)

| File | Purpose |
|------|---------|
| [anchor-catalog.md](/lib/09-harness/claude-code-ultimate-guide/examples-semantic-anchors-anchor-catalog) | Comprehensive catalog of precise technical terms for prompting |

> **See [Section 2.7](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#29-semantic-anchors) in the guide for how to use semantic anchors**

### Multi-Provider Bridge

| Tool | Purpose |
|------|---------|
| [cc-copilot-bridge](https://github.com/FlorianBruniaux/cc-copilot-bridge) | Bridge GitHub Copilot to Claude Code CLI for flat-rate access |

> Moved to dedicated repository: [github.com/FlorianBruniaux/cc-copilot-bridge](https://github.com/FlorianBruniaux/cc-copilot-bridge)

---

*See the [main guide](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) for detailed explanations, or the [architecture guide](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index) for how Claude Code works internally.*
