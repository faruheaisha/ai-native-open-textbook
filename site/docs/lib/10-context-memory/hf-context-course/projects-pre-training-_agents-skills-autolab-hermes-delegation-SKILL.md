---
title: "The Context Course"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.agents/skills/autolab-hermes-delegation/SKILL.md"
sourceRel: "projects/pre-training/.agents/skills/autolab-hermes-delegation/SKILL.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.agents/skills/autolab-hermes-delegation/SKILL.md"
sourceSha256: "8a7c83bd194df587b3618a98ef7303a71f3015b3f6780366fe329f492ee1e73e"
pageSha256: "8a7c83bd194df587b3618a98ef7303a71f3015b3f6780366fe329f492ee1e73e"
contentMode: "local-full"
zh: ""
---

# The Context Course

Use this when Hermes is the parent control plane for this repo.

Hermes children get a fresh context, cannot ask the user for clarification, cannot delegate again, and only return their final summary to the parent. Pass the full role contract in every `delegate_task(...)` call.

## Parent Rules

- Keep `AGENTS.md` as the only checked-in rulebook. Do not add `.hermes.md`.
- Launch the parent with toolsets: `terminal,file,web,skills,delegation,clarify`
- Leave Hermes `memory` out of the default toolsets so repo markdown stays the durable record.
- Keep Hermes child concurrency at `min(gpu_slots, 3)` per parent session.
- If you need more than 3 parallel workers, use multiple top-level Hermes sessions or stay on OpenCode.

## Role Defaults

- `planner`
  - toolsets: `["file"]`
  - focus: fresh, non-duplicate single-change ideas only
- `reviewer`
  - toolsets: `["file"]`
  - focus: hard-rule checks, stale-master risk, duplicates, multi-change patches
- `researcher`
  - toolsets: `["web", "file", "skills", "terminal"]`
  - focus: paper-derived single-change hypotheses only
- `reporter`
  - toolsets: `["terminal", "file", "skills"]`
  - focus: HF Jobs and Trackio status, duplicate active jobs, anomalies
- `memory-keeper`
  - toolsets: `["file"]`
  - focus: durable markdown updates in the main checkout only
- `experiment-worker`
  - toolsets: `["terminal", "file", "skills"]`
  - focus: one isolated worktree, one hypothesis, one managed benchmark run

## Planner Template

```python
delegate_task(
    goal="Propose up to 3 fresh Autolab experiments against the current local promoted master.",
    context="""Read AGENTS.md, README.md, research/notes.md, research/do-not-repeat.md,
research/campaigns/, research/experiments/, research/results.tsv, research/live/master.json,
and research/live/dag.json.

Return a ranked queue of 1-3 fresh experiments. Each must include:
- short title
- one-sentence hypothesis
- parent master hash
- exact single variable being changed
- expected upside
- reason it is not a duplicate

Do not run commands that mutate the repo. Do not propose multi-change ideas.""",
    toolsets=["file"],
    max_iterations=20,
)
```

## Reviewer Template

```python
delegate_task(
    goal="Review this Autolab plan or result for rule violations and comparability risk.",
    context="""Read AGENTS.md and the provided experiment details.

Prioritize:
- hard-rule violations
- stale-master risk
- duplicate experiments
- multi-change patches
- missing benchmark evidence
- incorrect submit or no-submit decisions

Return concise findings with exact file or evidence references.""",
    toolsets=["file"],
    max_iterations=20,
)
```

## Researcher Template

```python
delegate_task(
    goal="Find up to 3 paper-derived single-change Autolab ideas that map cleanly to train.py.",
    context="""Read AGENTS.md, research/notes.md, research/do-not-repeat.md,
research/paper-ideas.md, research/results.tsv, research/live/master.json, and research/live/dag.json.

Use the repo's Hugging Face skills when useful. Reject ideas already present in code or already ruled out.
Return the smallest credible change to test for each idea and the main risk if it fails.""",
    toolsets=["web", "file", "skills", "terminal"],
    max_iterations=30,
)
```

## Reporter Template

```python
delegate_task(
    goal="Summarize current Autolab fleet status and call out duplicate or stale active jobs.",
    context="""Use the repo reporter workflow:
- . ~/.autolab/credentials
- uv run scripts/trackio_reporter.py summary --max-jobs 25
- uv run scripts/trackio_reporter.py sync --project ${AUTOLAB_TRACKIO_PROJECT:-autolab} when needed

Treat Trackio plus HF Jobs metadata as the source of truth.
Do not edit repo markdown or code.""",
    toolsets=["terminal", "file", "skills"],
    max_iterations=25,
)
```

## Experiment Worker Flow

1. Create the reserved state:
