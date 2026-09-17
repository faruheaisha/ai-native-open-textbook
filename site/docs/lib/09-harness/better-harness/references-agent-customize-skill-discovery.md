---
title: "Skill Discovery Reference"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/agent-customize/skill-discovery.md"
sourceRel: "references/agent-customize/skill-discovery.md"
rawUrl: "/raw/09-harness/better-harness/references/agent-customize/skill-discovery.md"
sourceSha256: "25dfd9c47799e5ea85697fe4f0ee2a172eb2df7bfdc9f115ed02f5c5d8d65058"
pageSha256: "25dfd9c47799e5ea85697fe4f0ee2a172eb2df7bfdc9f115ed02f5c5d8d65058"
contentMode: "local-full"
zh: ""
---

# Skill Discovery Reference

Use this reference after `../loop-engineering/loop-discovery.md` decides `Create Skill` or
`Extend Skill`, when the user explicitly asks to evaluate known repeated work as a
Skill, or when the user asks for a session-informed profile of their
software-lifecycle Skill coverage. This reference does not choose among
automation, hooks, commands, custom agents, MCP, scripts, rules, or project
policy. Return new durable-owner questions to
`../loop-engineering/loop-discovery.md`. Use [Skill Quality Review](/lib/09-harness/better-harness/references-agent-customize-skill-review)
when the Skill already exists and the question is whether it is well written,
safe, efficient, or demonstrably effective.

## Contents

- [Core Idea](#core-idea)
- [Executable Onboarding Documentation](#executable-onboarding-documentation)
- [Inputs](#inputs)
- [Skill Coverage Check](#skill-coverage-check)
- [Session-Informed Lifecycle Coverage](#session-informed-lifecycle-coverage)
- [Bug-Diagnosis Skill Examples](#bug-diagnosis-skill-examples)
- [Analysis Loop](#analysis-loop)
- [Candidate Score](#candidate-score)
- [Skill Package Shape](#skill-package-shape)
- [Output Template](#output-template)
- [Quality Bar](#quality-bar)
- [Platform Notes](#platform-notes)

## Core Idea

A good Skill candidate has repeated or costly demand, or one current bounded
SDLC handoff with direct need or behavior evidence. It still needs a stable
trigger, reusable input context, repeatable steps, clear output, failure modes,
and a validation path. Do not create broad Skills from noisy clusters or from
a loop that is already covered by an existing Skill.

Treat a Skill as packaged procedural knowledge for an agent to load at the
right time. A Skill can describe how to run a loop, collect evidence, validate
output, and hand off to automation, but it is not by itself runtime
persistence, tracing, approval handling, background scheduling, or external
system access.

Default to read-only analysis. Do not modify selected-platform user-home state,
project settings, auth files, model catalogs, plugin caches, transcripts, or
repository files unless the user explicitly asks for implementation.

## Executable Onboarding Documentation

Treat onboarding as a strong Skill candidate when the repeated work is more
than a deterministic install command or static README. A setup Skill can combine
README orientation, `go.sh`-style command sequencing, and agent-run judgment for
steps that depend on the current repository, environment, platform, local
configuration, generated artifacts, or validation failures.

Evaluate this pattern at three levels:

- codebase-local setup, run, test, and repair workflows, often exposed as a
  `/_setup` or project setup Skill
- library or API adoption guidance shipped by maintainers through internal or
  external Skill registries
- internal platform or design-system onboarding that lowers adoption friction
  and captures team conventions

Prefer a Skill when onboarding requires state-aware branching, current-context
inspection, or cross-tool instructions that a script cannot fully encode. Keep
deterministic setup commands in scripts that the Skill references, and return
purely scriptable or purely explanatory flows to scripts, README files, or
ordinary documentation.

## Inputs

Start from the Loop Discovery evidence pack:

- target workspace, platform, and time window
- candidate loop name and repeated intent
- evidence refs such as session ids, reports, artifacts, prompts, commands, or
  changed files
- proposed decision: `Create Skill` or `Extend Skill`
- existing coverage and the missing Skill-owned behavior
- trigger, input context, output, verification, stop condition, and failure
  modes

For Agent Work Loop review, generated
`repositoryEvidence.workflowDemandDiagnostics` may supply a normalized current
handoff or repeated-work lead. Treat `/ultraplan`, `/plan`, `/spec`, `/story`,
and `/issue-*` user task entries as specification/planning demand, and treat
`/review` as review/acceptance demand. Treat an
explicit `$spec-review`, namespaced lifecycle Skill, or `skill://` UI invocation
the same way only when its bounded identity maps to a known workflow intent;
do not infer lifecycle demand from arbitrary Skill names. Keep the diagnostic
read-only and open its bounded Skill capability evidence before
choosing a coverage step. A current handoff may enter the coverage ladder
directly; a repeated candidate still returns to Loop Discovery for owner
selection before `Create Skill` or `Extend Skill`. `owner-review` means the
smallest owner is unresolved; it is not by itself approval to create a Skill.
Bind a Skill proposal to reviewed owner-selection evidence, and never bypass a
matching built-in, configured, observed, or extendable capability.

If no evidence pack exists, run `../loop-engineering/loop-discovery.md` first unless the user
explicitly asked for the session-informed lifecycle profile below. That profile
may return `Try platform built-in`, `Try configured Skill`, or
`Needs more evidence` without proving a new loop. Send uncertain owner or new
durable-workflow questions back to Loop Discovery before creating or extending
a Skill.

## Skill Coverage Check

Inspect only enough existing assets to avoid duplicate recommendations:

- repository-local shared and selected-platform Skill stores
- user or plugin Skill packages when the task is about installed/global assets
- command or prompt aliases that invoke an existing Skill
- Skill references, scripts, assets, templates, and validation notes
- mirror metadata such as `.agents/skills/*/mirror.json` when present

Treat observed Skill use as coverage. Recommend `Extend Skill` only when the
evidence shows repeated manual setup, repair, validation, context collection,
or schedule handoff around that Skill.

## Session-Informed Lifecycle Coverage

Use this path only when the user asks to inspect their Skill use across
projects, find software-lifecycle coverage gaps, or recommend Skills from
global session history. It may recommend trying or creating a Skill, but it
does not turn every unobserved lifecycle stage into a new durable loop.

### Freeze the evidence boundary

1. Run `scripts/session-analysis.mjs sources` for each requested supported
   platform with the target workspace first. Add
   `--include-global-capabilities` only because this workflow explicitly asks
   for a user-global profile.
2. Run bounded `facets` or `insights` with an explicit `--since`/`--until`
   window when available, `--selection stratified`, and a stated `--limit`.
   Record the eligible/analyzed counts and source gaps; do not silently present
   a latest-N sample as a complete history.
3. Load the selected Platform Notes before classifying analyzer Skill signals,
   inferred reads, built-ins, or configured stores. Keep all of them separate
   from prose mentions.
4. Run `scripts/agent-customize/cli.mjs inventory` or
   `scripts/coding-agent-practices/inventory.mjs &lt;platform> --workspace
