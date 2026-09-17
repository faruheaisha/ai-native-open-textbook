---
title: "Developer Onboarding"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/developer-onboarding.md"
sourceRel: "docs/developer-onboarding.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/developer-onboarding.md"
sourceSha256: "59a35b68045f34aa42161bc5901892489e6ecdac4b5bbfcf311fde65f8255eea"
pageSha256: "59a35b68045f34aa42161bc5901892489e6ecdac4b5bbfcf311fde65f8255eea"
contentMode: "local-full"
zh: ""
---

# Developer Onboarding

This guide is for people working **on** the agent-skills repository itself: contributing skills, fixing docs, improving the eval harness. If you want to *use* the skills in your own projects, you're looking for [getting-started.md](/lib/10-context-memory/agent-skills-addyosmani/docs-getting-started) instead.

It's a guided tour, not a rulebook. The rules live in [CONTRIBUTING.md](https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/CONTRIBUTING.md) (contribution workflow), [skill-anatomy.md](/lib/10-context-memory/agent-skills-addyosmani/docs-skill-anatomy) (skill format), and [evals/README.md](/lib/10-context-memory/agent-skills-addyosmani/evals) (eval framework); this document tells you when to read each one and how the pieces fit.

---

## 1. The mental model

The repo has five composable layers. Understanding what each one is *for* prevents the most common contribution mistakes (putting reference material in a skill, building a persona that routes to other personas, duplicating content across skills).

| Layer | Location | Job | In one word |
|---|---|---|---|
| **Skills** | `skills/<name>/SKILL.md` | Step-by-step workflows with verification gates | *How* |
| **Personas** | `agents/<role>.md` | Roles with a perspective and output format | *Who* |
| **Commands** | `.claude/commands/`, `.gemini/commands/`, `commands/` | User-facing entry points; the orchestration layer | *When* |
| **References** | `references/*.md` | Checklists skills pull in on demand | *What to check* |
| **Evals** | `evals/cases/<name>.json` | Proof that skills trigger and behave correctly | *Does it work* |

Two structural rules worth internalizing early:

- **The user (or a slash command) is the orchestrator.** Personas never invoke other personas; the only endorsed multi-persona pattern is parallel fan-out with a merge step (see [references/orchestration-patterns.md](/lib/10-context-memory/agent-skills-addyosmani/references-orchestration-patterns)).
- **Don't duplicate, reference.** Skills link to other skills and to `references/` instead of restating content. The same rule applies to docs, including this one.

One scope caveat that trips people up: `AGENTS.md` and `CLAUDE.md` at the repo root configure agents working on *this repo*. They are not reusable assets and setup guides must never tell users to copy them into their own projects; the reusable assets are the skills.

Note that commands exist in three parallel directories (Claude Code, Gemini CLI, Antigravity). Touch one and CI checks parity across all of them, see §3.

## 2. Local setup

```bash
git clone https://github.com/addyosmani/agent-skills.git
cd agent-skills
```

There's no build step and no `package.json`; validators are plain Node scripts. You need:

- **Node 20+** (what CI runs) for the `scripts/` validators
- **bash** (+ `jq` recommended) for the hook regression test
- **`gh` CLI** for the duplicate-PR check before proposing a skill
- **Claude Code** only if you want to run Tier 3 behavioral evals locally

To try the pack live against a local checkout:

```bash
claude --plugin-dir /path/to/agent-skills
```

## 3. The verification loop

The repo eats its own cooking: verification is non-negotiable for skills, and it's non-negotiable for contributions to the repo too. Everything CI runs, you can run locally in seconds:

```bash
# Tier 1, structural: frontmatter, naming, required sections
node scripts/validate-skills.js

# Command parity and description sync across the three command directories
node scripts/validate-commands.js

# Tier 2, trigger & routing: positive prompts rank top-k, negatives don't collide
node scripts/run-evals.js

# Tier 3, behavioral (on demand, spends tokens; --dry-run prints the plan)
