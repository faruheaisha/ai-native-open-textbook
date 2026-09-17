---
title: "Agent Personas"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/agents.md"
sourceRel: "docs/agents.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/agents.md"
sourceSha256: "e03481592a725146ed48ee22010086dcfebd1faf1373cb99e7f2ed4d2100275c"
pageSha256: "e03481592a725146ed48ee22010086dcfebd1faf1373cb99e7f2ed4d2100275c"
contentMode: "local-full"
zh: ""
---

# Agent Personas

Specialist personas that play a single role with a single perspective. Each persona is a Markdown file consumed as a system prompt by your harness (Claude Code, Cursor, Copilot, etc.).

| Persona | Role | Best for |
|---------|------|----------|
| [code-reviewer](/lib/10-context-memory/agent-skills-addyosmani/agents-code-reviewer) | Senior Staff Engineer | Five-axis review before merge |
| [security-auditor](/lib/10-context-memory/agent-skills-addyosmani/agents-security-auditor) | Security Engineer | Vulnerability detection, OWASP-style audit |
| [test-engineer](/lib/10-context-memory/agent-skills-addyosmani/agents-test-engineer) | QA Engineer | Test strategy, coverage analysis, Prove-It pattern |
| [web-performance-auditor](/lib/10-context-memory/agent-skills-addyosmani/agents-web-performance-auditor) | Web Performance Engineer | Core Web Vitals audit, loading/rendering/network analysis |

## How personas relate to skills and commands

Three layers, each with a distinct job:

| Layer | What it is | Example | Composition role |
|-------|-----------|---------|------------------|
| **Skill** | A workflow with steps and exit criteria | `code-review-and-quality` | The *how* — invoked from inside a persona or command |
| **Persona** | A role with a perspective and an output format | `code-reviewer` | The *who* — adopts a viewpoint, produces a report |
| **Command** | A user-facing entry point | `/review`, `/ship` | The *when* — composes personas and skills |

The user (or a slash command) is the orchestrator. **Personas do not call other personas.** Skills are mandatory hops inside a persona's workflow.

## When to use each

### Direct persona invocation
Pick this when you want one perspective on the current change and the user is in the loop.

- "Review this PR" → invoke `code-reviewer` directly
- "Are there security issues in `auth.ts`?" → invoke `security-auditor` directly
- "What tests are missing for the checkout flow?" → invoke `test-engineer` directly
- "Audit Core Web Vitals on the product page" → invoke `web-performance-auditor` directly

### Slash command (single persona behind it)
Pick this when there's a repeatable workflow you'd otherwise re-explain every time.

- `/review` → wraps `code-reviewer` with the project's review skill
- `/test` → wraps `test-engineer` with TDD skill
- `/webperf` → wraps `web-performance-auditor` for performance-focused audits on web apps

### Slash command (orchestrator — fan-out)
Pick this only when **independent** investigations can run in parallel and produce reports that a single agent then merges.

- `/ship` → fans out to `code-reviewer` + `security-auditor` + `test-engineer` in parallel, then synthesizes their reports into a go/no-go decision

This is the only orchestration pattern this repo endorses. See [references/orchestration-patterns.md](/lib/10-context-memory/agent-skills-addyosmani/references-orchestration-patterns) for the full pattern catalog and anti-patterns.

## Decision matrix

```
Is the work a single perspective on a single artifact?
├── Yes → Direct persona invocation
└── No  → Are the sub-tasks independent (no shared mutable state, no ordering)?
         ├── Yes → Slash command with parallel fan-out (e.g. /ship)
         └── No  → Sequential slash commands run by the user (/spec → /plan → /build → /test → /review)
```

## Worked example: valid orchestration

`/ship` is the canonical fan-out orchestrator in this repo:

```
/ship
  ├── (parallel) code-reviewer    → review report
  ├── (parallel) security-auditor → audit report
  └── (parallel) test-engineer    → coverage report
                  ↓
        merge phase (main agent)
                  ↓
        go/no-go decision + rollback plan
```

Why this works:
- Each sub-agent operates on the same diff but produces a **different perspective**
- They have no dependencies on each other → genuine parallelism, real wall-clock savings
- Each runs in a fresh context window → main session stays uncluttered
- The merge step is small and benefits from full context, so it stays in the main agent

## Worked example: invalid orchestration (do not build this)

A `meta-orchestrator` persona whose job is "decide which other persona to call":

```
/work-on-pr → meta-orchestrator
                  ↓ (decides "this needs a review")
              code-reviewer
                  ↓ (returns)
              meta-orchestrator (paraphrases result)
                  ↓
              user
```

Why this fails:
- Pure routing layer with no domain value
- Adds two paraphrasing hops → information loss + 2× token cost
- The user already knows they want a review; let them call `/review` directly
- Replicates work that slash commands and `AGENTS.md` intent-mapping already do

## Rules for personas

1. A persona is a single role with a single output format. If you find yourself adding a second role, create a second persona.
2. **Personas do not invoke other personas.** Composition is the job of slash commands or the user. On Claude Code this is also a hard platform constraint — *"subagents cannot spawn other subagents"* — so the rule is enforced for you.
3. A persona may invoke skills (the *how*).
4. Every persona file ends with a "Composition" block stating where it fits.

## Claude Code interop

The personas in this repo are designed to work as Claude Code subagents and as Agent Teams teammates without modification:

- **As subagents:** auto-discovered when this plugin is enabled (no path config needed). Use the Agent tool with `subagent_type: code-reviewer` (or `security-auditor`, `test-engineer`). `/ship` is the canonical example.
- **As Agent Teams teammates** (experimental, requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`): reference the same persona name when spawning a teammate. The persona's body is **appended to** the teammate's system prompt as additional instructions (not a replacement), so your persona text sits on top of the team-coordination instructions the lead installs (SendMessage, task-list tools, etc.).

Subagents only report results back to the main agent. Agent Teams let teammates message each other directly. Use subagents when reports are enough; use Agent Teams when sub-agents need to challenge each other's findings (e.g. competing-hypothesis debugging). See [references/orchestration-patterns.md](/lib/10-context-memory/agent-skills-addyosmani/references-orchestration-patterns) for the full mapping.

Plugin agents do not support `hooks`, `mcpServers`, or `permissionMode` frontmatter — those fields are silently ignored. Avoid relying on them when authoring new personas here.

## Adding a new persona

1. Create `agents/<role>.md` with the same frontmatter format used by existing personas.
2. Define the role, scope, output format, and rules.
3. Add a **Composition** block at the bottom (Invoke directly when / Invoke via / Do not invoke from another persona).
4. Add the persona to the table at the top of this file.
5. If the persona enables a new orchestration pattern, document it in `references/orchestration-patterns.md` rather than inventing the pattern in the persona file itself.
