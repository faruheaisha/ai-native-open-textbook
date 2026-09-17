---
title: "Repo code review"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/repo_code_review/README.md"
sourceRel: "examples/sandbox/tutorials/repo_code_review/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/tutorials/repo_code_review/README.md"
sourceSha256: "417d19b25ba1eb8bfc15b560f3ee49623df1021e268ee81afd008209419ebf7c"
pageSha256: "417d19b25ba1eb8bfc15b560f3ee49623df1021e268ee81afd008209419ebf7c"
contentMode: "local-full"
zh: ""
---

# Repo code review

## Goal

Review a small public git repository, run its tests, leave line-level review comments in the structured output, and write a patch-oriented review artifact.

## Why this is valuable

This demo shows a coding-agent workflow where the sandbox can inspect a real git worktree, run tests, reason over a diff, and produce review artifacts that a developer can act on. The manifest mounts `pypa/sampleproject` at a pinned ref with `GitRepo(...)`. The review contract is intentionally narrow: one finding should target the CI workflow, and one should target the missing type hints in `src/sample/simple.py`.

## Setup

Run the Unix-local example from the repository root:

```bash
uv run python examples/sandbox/tutorials/repo_code_review/main.py
uv run python examples/sandbox/tutorials/repo_code_review/evals.py
```

This demo exits after the scripted review so the generated artifacts and eval contract stay deterministic.

To run the same review in Docker, build the shared tutorial image once and pass
`--docker`:

```bash
docker build -t sandbox-tutorials:latest -f examples/sandbox/tutorials/Dockerfile .
uv run python examples/sandbox/tutorials/repo_code_review/main.py --docker
uv run python examples/sandbox/tutorials/repo_code_review/evals.py
```

## Expected artifacts

- `output/review.md`
- `output/findings.jsonl`
- Optional `output/fix.patch`

## Demo shape

- Inputs: `pypa/sampleproject` at a pinned git ref, mounted into the workspace as `repo/`.
- Runtime primitives: sandbox-local bash, optional file edits, and a typed `RepoReviewResult` final output.
- Workflow: one sandbox reviewer agent is enough here; there is no handoff because the task is a linear inspect -> test -> patch -> summarize loop.
- Scratch space: the reviewer can use `scratchpad/` for notes or draft diffs, then return the final review object for the wrapper to persist.
- Evals: `evals.py` checks that the two findings stay focused on `uv` in the test workflow and type hints in `src/sample/simple.py`, and that the patch only edits `simple.py`.
