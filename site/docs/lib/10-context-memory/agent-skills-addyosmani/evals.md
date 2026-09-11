---
title: "Skill Evals"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/README.md"
zh: ""
---

# Skill Evals

How this repo measures whether its skills actually work: that they **trigger** when they should, **stay distinct** from each other, and **change agent behavior** the way each skill promises.

## Prior art (and what we adopted)

There is no single settled community standard for evaluating `SKILL.md` skills, but two approaches lead:

- **Anthropic's skill-creator v2** defines a per-skill `evals.json` (prompt + `expectations[]`, graded from the transcript) plus trigger-accuracy testing of descriptions against sample prompts. We adopt its [`evals.json` schema](https://github.com/anthropics/skills/tree/main/skills/skill-creator) for our behavioral tier and add one optional `kind` field to select the artifact being graded.
- **Superpowers** (obra) tests skills with bash + `claude -p` + prompt fixtures and grader scripts. Our behavioral runner follows the same headless-`claude` pattern, with the grading rubric drawn from `expectations[]`.

What neither provides is a **deterministic, CI-safe** check for a multi-skill *catalog* — does each skill's description carry the vocabulary users actually say, and do two skills' descriptions collide? That's Tier 2 below, and it's this repo's addition.

## The three tiers

| Tier | What it checks | Runs | Cost |
|---|---|---|---|
| 1. Structural | Frontmatter, naming, required sections, command parity | CI (`validate-skills.js`, `validate-commands.js`) | Free |
| 2. Trigger & routing | Positive prompts rank their skill top-k; negative prompts don't; no two descriptions near-collide | CI (`run-evals.js`) | Free |
| 3. Behavioral | An agent following the skill satisfies its `expectations[]` | On demand (`run-evals.js --behavioral`) | Tokens |

Tier 2 is a **lexical approximation** of routing (stemmed TF-IDF over descriptions). It cannot judge semantics — that's Tier 3's job — but it catches the two failure modes that dominate real trigger bugs: a description missing the vocabulary users say (false negative), and an over-broad description that outranks the right skill (false positive). A Tier-2 failure usually means *fix the description*, not the eval.

## Running

```bash
# Tier 2 — deterministic, runs in CI
node scripts/run-evals.js
node scripts/run-evals.js --min-rank1 95  # enforce the current routing floor

# Tier 3 — behavioral, runs each eval through headless claude, then grades it
node scripts/run-evals.js --behavioral test-driven-development            # spends tokens
node scripts/run-evals.js --behavioral test-driven-development --dry-run  # prints the plan only
```

Tier 3 supports two behavioral artifact kinds. `execution` is the default: each eval runs in a throwaway git repository, real project inputs from `files[]` are materialized out of `evals/fixtures/` and committed as the baseline, and the grader judges the full `--output-format stream-json --verbose` execution trace, including tool calls. `dialogue` is reserved for skills whose deliverable is the conversation itself; it needs no fixture, and the grader judges the assistant's conversational turns without requiring file edits or commands. Claiming `dialogue` is a human-reviewed exemption, not a general escape hatch for execution skills.

The executor runs with an explicit permission mode (`--permission-mode acceptEdits` plus a pre-approved tool list) so execution evals can genuinely edit files, run commands, inspect diffs, and make commits rather than being denied and narrating instead. Traces are fenced as untrusted data in the grader prompt and piped to the grader over stdin (they can be megabytes; argv would hit the OS argument-size limit), executor and grader calls carry timeouts, and grader output is validated as JSON before being written to `evals/results/` (gitignored) in skill-creator's `grading.json` shape. Discipline skills also include pressure cases for time pressure, sunk cost, and authority pressure; these verify that the workflow still holds when the prompt argues for skipping it.

## Eval case format
