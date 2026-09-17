---
title: "Deep Agents Code Development Guide"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/DEVELOPMENT.md"
sourceRel: "libs/code/DEVELOPMENT.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/DEVELOPMENT.md"
sourceSha256: "8a453fdc6cf196726aa869b3223c97e53bcaef09f46ecb4201975310c1965607"
pageSha256: "8a453fdc6cf196726aa869b3223c97e53bcaef09f46ecb4201975310c1965607"
contentMode: "local-full"
zh: ""
---

# Deep Agents Code Development Guide

New to the package? Start with [`ARCHITECTURE.md`](/lib/09-harness/langchain-deepagents/libs-code-ARCHITECTURE) for a high-level map of how the TUI, the `langgraph dev` server subprocess, and the agent graph fit together.

## Contents

- [Quickstart](#quickstart) — get a local checkout running and run the checks CI enforces
- [LangSmith tracing projects](#langsmith-tracing-projects) — route dev traces away from the shared GA project
- [Local dev installs](#local-dev-installs) — keep an editable `dcode-dev` separate from a released install
- [Debugging](#debugging) — diagnose startup crashes and client-side issues
- [Live CSS development with Textual devtools](#live-css-development-with-textual-devtools) — UI/CSS hot-reload

## Quickstart

This package uses [`uv`](https://docs.astral.sh/uv/) for environment and dependency management. Install it first if you haven't:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Clone the monorepo and bootstrap the `code` package. This creates the virtualenv, installs test dependencies, and installs local git hooks (`pre-commit` + `commit-msg`) so the same checks can run before you push:

```bash
git clone https://github.com/langchain-ai/deepagents.git
cd deepagents/libs/code
make bootstrap
```

If you only want to sync dependencies without installing hooks, run `uv sync --group test` instead.

Run the TUI from `libs/code` in your local checkout:

```bash
uv run deepagents-code
```

`uv run` uses the project environment with the package installed editable, so source changes take effect on the next launch. If you want a persistent `dcode-dev` command that stays separate from a released install, use the local dev install setup below.

### Running the tests and linters

All commands run from `libs/code`. Before opening a PR, run the full local check suite:

```bash
make check
```

This runs linting, import checks, unit tests, and lockfile/version/extras checks.

For targeted checks while iterating:

```bash
# Unit tests (no network)
make test

# A single test file
make test TEST_FILE=tests/unit_tests/test_specific.py

# Integration tests (network permitted)
make integration_test
```

```bash
# Auto-format (ruff format + autofix)
make format

# Lint + type-check (ruff, ty, commands-catalog check)
make lint
```

Run `make help` to see every available target.

## LangSmith tracing projects

When LangSmith tracing is enabled and a `LANGSMITH_API_KEY` is available, `deepagents-code` traces its own agent runs to LangSmith. A key alone is not enough for environment-supplied keys — set `LANGSMITH_TRACING=true`. Keys stored via `/auth` auto- enable tracing unless you explicitly opt out (for example `DEEPAGENTS_CODE_LANGSMITH_TRACING=false`).

By default those runs land in the `deepagents-code` project, but the team routes shared runs to a GA project (`shared-deepagents-code`) that is monitored by LangSmith Engine, which raises high-priority Slack alerts on suspected issues.

**Do not point local development at the GA project.** Active development produces failures, half-finished branches, and experiments that Engine flags as issues — noise that buries the alerts that matter for the production project and costs the team triage time. Keep dev and prod runs in separate projects so Engine alerting on the GA project stays high-signal (this also mirrors LangSmith best practice of splitting dev and prod environments into distinct projects).

Route your local runs to a dev-scoped project via `DEEPAGENTS_CODE_LANGSMITH_PROJECT` (this overrides only the agent's own traces, leaving your shell's `LANGSMITH_PROJECT` for user code untouched):

```bash
# A shared dev bucket, or your own personal project — anything but the GA project
export DEEPAGENTS_CODE_LANGSMITH_PROJECT=shared-deepagents-code-dev
uv run deepagents-code
```

Set the same override for [local dev installs](#local-dev-installs) (`dcode-dev`), not only ad-hoc `uv run` sessions. You can also set it persistently under `[tracing]` in the config file (`tracing.langsmith_project`) or from the `/auth` screen. The startup splash and `/trace` show the project a run is writing to — confirm it is not the GA project before doing noisy work.

When onboarding a new tracing project to Engine, capture the nature of that project first: a production/GA app warrants high-priority alerts, while a staging or active-dev project should use looser thresholds (or stay off Engine) so it does not generate false positives.

A server keeps the first workspace's tracing configuration for its lifetime. Workspaces sharing that server must use matching tracing credentials, projects, endpoints, profile selectors, tracing flags, and redaction policy. A conflicting workspace is refused before its settings can affect cached or concurrent runs; start a separate server for that workspace. Restart the server to change its tracing configuration.

## Debugging

Deep Agents Code runs as two processes: the **Textual TUI** you interact with, and a **`langgraph dev` subprocess** that hosts the agent graph. Each writes its own log, and a single switch turns both on:

```bash
cd libs/code
export DEEPAGENTS_CODE_DEBUG=1
uv run deepagents-code
```

| Variable | Effect |
| --- | --- |
| `DEEPAGENTS_CODE_DEBUG` | Master switch. Preserves the server subprocess log on exit (printing its path to stderr) and attaches the client `DEBUG` file handler. Truthy: `1`/`true`/`yes`/`on` (case-insensitive). Falsy: `0`/`false`/`no`/`off`/empty/unset. |
