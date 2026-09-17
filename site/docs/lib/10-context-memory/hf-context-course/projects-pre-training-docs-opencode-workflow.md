---
title: "OpenCode Workflow"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/docs/opencode-workflow.md"
sourceRel: "projects/pre-training/docs/opencode-workflow.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/docs/opencode-workflow.md"
sourceSha256: "a2cacf1c3583b7db46230d1714772c8c70458fb0e43bf54c9465c406cc2ac79d"
pageSha256: "a2cacf1c3583b7db46230d1714772c8c70458fb0e43bf54c9465c406cc2ac79d"
contentMode: "local-full"
zh: ""
---

# OpenCode Workflow

OpenCode is the canonical control plane for this repo.

The benchmark surface is unchanged:

- `train.py` is the experiment file
- `prepare.py` is read-only
- Hugging Face Jobs is the only remote execution path
- Trackio is the only remote observability path
- `research/results.tsv` is the append-only local run ledger
- `train_orig.py` plus `research/live/` define the current promoted local master

## Repo Surface

- `opencode.json`
  Repo-local OpenCode config, including disabled-by-default MCP entries for
  Hugging Face and Trackio.
- `.opencode/agent/`
  The checked-in OpenCode agents: `autolab`, `planner`, `experiment-worker`,
  `reviewer`, `memory-keeper`, `researcher`, and `reporter`.
- `.agents/skills/`
  Shared repo-local skills that OpenCode can load on demand.
- `research/templates/`
  Canonical campaign, experiment, and do-not-repeat templates.
- `scripts/opencode_worker.py`
  Creates isolated worktrees and launches `experiment-worker` runs.
- `scripts/print_opencode_kickoff.py`
  Prints a standard parent-session kickoff prompt.

## Setup

1. Install dependencies:

```bash
uv sync
```

2. Create a local operator env file:

```bash
mkdir -p ~/.autolab
cp .autolab.credentials.example ~/.autolab/credentials
$EDITOR ~/.autolab/credentials
. ~/.autolab/credentials
```

3. Authenticate Hugging Face:

```bash
hf auth login
```

4. Authenticate OpenCode and select a model.

Default provider path:

```bash
opencode auth login
opencode
# inside OpenCode:
/models
```

Choose Hugging Face and then select an open model through Hugging Face
Inference Providers. Do not pin a single model in repo config.

5. Validate the environment:

```bash
bash scripts/bootstrap_public.sh
```

6. Warm the shared HF cache once:

```bash
uv run scripts/hf_job.py launch --mode prepare
```

## Parent Session Workflow

1. Refresh current local benchmark truth:

```bash
uv run scripts/refresh_master.py --fetch-dag
```

2. Review the current notebook:

- `research/notes.md`
- `research/do-not-repeat.md`
- `research/campaigns/`
- `research/experiments/`
- `research/results.tsv`
- `research/live/master.json`
- `research/live/dag.json`

3. Print a kickoff prompt if you want one:

```bash
uv run scripts/print_opencode_kickoff.py --gpu-slots 1
```

4. Start OpenCode in the pre-training project root:

```bash
opencode
```

5. Use the `autolab` primary agent. Delegate to:

- `planner` for fresh experiment queues
- `reviewer` for rule and comparability checks
- `researcher` for paper-derived ideas
- `reporter` for Trackio and HF Jobs status
- `memory-keeper` after each worker finishes

## Isolated Worker Workflow

Create one isolated worktree per experiment:

```bash
uv run scripts/opencode_worker.py create exp-warmdown-20 \
  --campaign "schedule: shorter cooldowns" \
  --hypothesis "Shorten warmdown to test whether the long cooldown tail is wasting the fixed budget." \
  --worker-id worker-0
```

This creates:
