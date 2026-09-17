---
title: "Skill Review"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/skill-review/SKILL.md"
sourceRel: ".agents/skills/skill-review/SKILL.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/skill-review/SKILL.md"
sourceSha256: "273ae4e704cbaa3c4f38a38be6c63ca08cb0c07cb1e06db19ca62f941456f3b8"
pageSha256: "273ae4e704cbaa3c4f38a38be6c63ca08cb0c07cb1e06db19ca62f941456f3b8"
contentMode: "local-full"
zh: ""
---

# Skill Review

Review a skill as an execution contract, not as prose. Trace how an agent would
enter, load, delegate, produce artifacts, and verify results; then report the
smallest changes that would improve that chain.

## Review Workflow

1. Resolve the target skill or prompt chain. If the user names a path, stay on
   that path and its directly linked resources.
2. Read repo instructions first: nearest `AGENTS.md`, plugin manifests, and the
   target `SKILL.md` frontmatter/body.
3. Trace the chain from entrypoint to references, templates, scripts, detectors,
   tests, generated artifacts, and validation commands. Build an ownership map:
   what file owns workflow, output structure, runtime rules, style, and tests.
4. Audit the contract before editing. Use [Audit Checklist](/lib/09-harness/better-harness/_agents-skills-skill-review-references-audit-checklist)
   and [Reference Patterns](/lib/09-harness/better-harness/_agents-skills-skill-review-references-reference-patterns) as lenses.
5. If the user asked for changes, patch only the smallest owning files. Keep
   generated helpers, smoke scripts, and local experiments outside `SKILL.md`
   unless they are durable resources the skill must use.
6. Validate with the lightest real gate available: skill validator, repo tests,
   plugin validation, or a bounded agent smoke. State any gate that could not be
   run.

Use subagents only as an evaluation surface or for independent broad research.
The lead agent owns the review, final calibration, and file edits. Pass raw
artifacts and task-local scope to subagents; do not pass the intended answer.

## Review Lenses

- [Audit Checklist](/lib/09-harness/better-harness/_agents-skills-skill-review-references-audit-checklist): trigger contract, progressive
  disclosure, workflow/delegation, template ownership, readability, evidence.
- [Reference Patterns](/lib/09-harness/better-harness/_agents-skills-skill-review-references-reference-patterns): reusable design lenses
  such as Trigger/Protocol split, Gate Function, and Output Contract Slots.
- [Fast Inspection Commands](/lib/09-harness/better-harness/_agents-skills-skill-review-references-inspection-commands): starting `rg`,
  `wc`, and `git diff --check` probes adapted to the repo.

## Finding Severity

- **P0**: The skill points to missing, empty, contradictory, or invalid resources;
  an agent can follow the instructions and fail.
- **P1**: The skill works but wastes context, duplicates ownership, hides key
  constraints, or produces unreadable output.
- **P2**: Style, naming, wording, or organization issues that reduce scanability
  without breaking the workflow.

## Report Shape

Lead with findings, ordered by severity. Keep each finding concrete:

```text
P1 - <short title>
File: <path>:<line>
Why it matters: <execution or output risk>
Evidence: <quoted phrase, command result, or linked resource>
Fix: <smallest owning-file change>
Validation: <command or smoke that should prove it>
```

After findings, add open questions only when they block a safe change. If the
user asked for edits, include changed files and validation results after the
findings. Default to the user's language.
