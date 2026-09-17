---
title: "Harness Creator"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/skills/harness-creator/SKILL.md"
sourceRel: "skills/harness-creator/SKILL.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/skills/harness-creator/SKILL.md"
sourceSha256: "6b152a8c5191fb3092f8371046e43846b8f42c60509c7c6eec282658beee81df"
pageSha256: "6b152a8c5191fb3092f8371046e43846b8f42c60509c7c6eec282658beee81df"
contentMode: "local-full"
zh: ""
---

# Harness Creator

Use this skill to make a repository easier for coding agents to start, stay in scope, verify work, and resume across sessions. Keep the harness small enough that agents actually follow it.

Not for model selection, prompt tuning in isolation, chat UI design, or general app architecture.

## Core Model

Every useful coding-agent harness has five subsystems:

| Subsystem | Minimal artifact | Purpose |
|---|---|---|
| Instructions | `AGENTS.md` or `CLAUDE.md` | Startup path, working rules, definition of done |
| State | `feature_list.json`, `progress.md` | Current feature, status, evidence, next step |
| Verification | `init.sh` or documented commands | Tests/checks the agent must run before claiming done |
| Scope | Feature dependencies and done criteria | Prevents overreach and half-finished work |
| Lifecycle | `session-handoff.md`, end-of-session routine | Makes the next session restartable |

## First Move

1. Inspect what already exists: instruction files, feature/state files, verification commands, docs, package manifests.
2. Ask only for missing context that cannot be inferred safely: target agent, desired file name, tolerance for structure, and whether overwriting is allowed.
3. Prefer a minimal harness first. Add memory, tool safety, multi-agent, or benchmark details only when the user's problem calls for them.

## Common Tasks

### Create a harness

Use the bundled script when working on a local repository:

```bash
node skills/harness-creator/scripts/create-harness.mjs --target /path/to/project
```

Options:

- `--agent-file CLAUDE.md` for Claude-oriented projects.
- `--package-manager npm|pnpm|yarn|bun` when detection is wrong.
- `--commands "cmd one,cmd two"` for custom verification.
- `--force` only after confirming overwrites are acceptable.

Then explain what was created and how the user should replace placeholder feature entries.

### Audit an existing harness

Run:

```bash
node skills/harness-creator/scripts/validate-harness.mjs --target /path/to/project
```

Report the five subsystem scores, the lowest-scoring area, and the first 2-3 changes that would improve reliability. Treat the lowest score as a candidate bottleneck; confirm with failures, logs, or task outcomes before claiming causality.

### Produce a report

Use when the user wants a shareable assessment:

```bash
node skills/harness-creator/scripts/render-assessment-html.mjs --target /path/to/project
node skills/harness-creator/scripts/run-benchmark.mjs --target /path/to/project --html /path/to/report.html
```

Be clear that this is a structural benchmark. The benchmark first runs a self-check — it scaffolds a throwaway harness and validates it, proving the bundled scripts work end-to-end — then scores the target and eval coverage. Real effectiveness still needs before/after agent sessions on representative tasks.

## When to Read References

Load only the reference needed for the user's problem:

- Memory across sessions: [Memory Persistence](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-memory-persistence-pattern)
- Reusable workflows as skills: [Skill Runtime](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-skill-runtime-pattern)
- Permissions, tools, concurrency: [Tool Registry & Safety](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-tool-registry-pattern)
- Context budget and progressive disclosure: [Context Engineering](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-context-engineering-pattern)
- Delegation and parallel agents: [Multi-Agent Coordination](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-multi-agent-pattern)
- Hooks, startup, long-running work: [Lifecycle & Bootstrap](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-lifecycle-bootstrap-pattern)
- Non-obvious failure modes: [Gotchas](/lib/09-harness/learn-harness-engineering/skills-harness-creator-references-gotchas)

## Design Rules

- Keep the root instruction file short: routing and invariants, not a full manual.
- Put project facts in project docs, not in the skill.
- Make verification commands explicit and runnable.
- Require evidence before marking a feature done.
- Use one active feature unless the harness has explicit multi-agent ownership boundaries.
- Prefer append/update state files over relying on chat history.
- Never hide destructive behavior in scripts; overwrites require explicit user approval.

## Deliverable Checklist

For a usable minimal harness, leave the target project with:

- [ ] `AGENTS.md` or `CLAUDE.md`
- [ ] `feature_list.json`
- [ ] `progress.md`
- [ ] `init.sh`
- [ ] Optional `session-handoff.md` for multi-session work
- [ ] Documented verification evidence or next action

If you cannot create files, provide exact file contents and commands instead.
