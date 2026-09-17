---
title: ".github layout"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/LAYOUT.md"
sourceRel: ".github/LAYOUT.md"
rawUrl: "/raw/09-harness/langchain-deepagents/.github/LAYOUT.md"
sourceSha256: "e8b5a2ea1ca11914b032f192868a7c03070619b789350856751f31b4196337df"
pageSha256: "e8b5a2ea1ca11914b032f192868a7c03070619b789350856751f31b4196337df"
contentMode: "local-full"
zh: ""
---

# `.github` layout

Quick map of CI/automation files in this folder.

## Top level

| Path | Purpose |
| --- | --- |
| `workflows/` | GitHub Actions workflows (entrypoints and reusable callers) |
| `actions/` | Local composite actions consumed by workflows |
| `scripts/` | Helper scripts invoked by workflows, plus their tests |
| `ISSUE_TEMPLATE/` | Issue forms |
| `PULL_REQUEST_TEMPLATE.md` | Default PR body template |
| `CODEOWNERS` | Review routing for paths in this tree |
| `dependabot.yml` | Dependabot update groups |
| `RELEASING.md` | Release-please / publish process |
| `SECRETS.md` | Non-`GITHUB_TOKEN` CI credential inventory (names and scopes only) |
| `images/` | Static assets referenced by workflows or docs |

Repository-wide CI conventions live in root [`AGENTS.md`](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/AGENTS.md). The partner onboarding checklist lives in [`libs/partners/AGENTS.md`](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/partners/AGENTS.md).

## Workflows (`workflows/`)

- **Entry workflows** (no leading underscore) run on events such as `pull_request`, `push`, `schedule`, or `workflow_dispatch`.
- **Reusable workflows** are named `_*.yml` (for example `_lint.yml`, `_test.yml`, `_eval.yml`) and are called from entry workflows via `workflow_call`.
- Prefer extending an existing reusable workflow over pasting setup/checkout/`uv` boilerplate into a new entry file.

Credential placement rules are in [`SECRETS.md`](/lib/09-harness/langchain-deepagents/_github-SECRETS). Release wiring is in [`RELEASING.md`](/lib/09-harness/langchain-deepagents/_github-RELEASING/index).

### Labeling workflows

- `pr_labeler.yml` — unified PR labeler: size, file, title, external/internal, contributor tier.
- `pr_labeler_backfill.yml` — manual backfill of those labels on open PRs.
- `auto-label-by-package.yml` — labels issues by the package they name.
- `tag-external-issues.yml` — classifies issues as external or internal and applies the contributor tier.

The two PR labelers also appear in [`RELEASING.md`](/lib/09-harness/langchain-deepagents/_github-RELEASING/index#ci-guardrails-around-releases) because the release guardrails section lists every check a PR may hit; the labelers' output does not drive release gating. The two issue labelers are not release-gated either.

### PR gate workflows

Blocking pre-merge checks that read PR metadata and fail until it is fixed or a
bypass label is applied. They consume labels rather than apply them.

- `pr_scope_file_check.yml` — fails when the PR title's package scope does not cover the package dirs it changes; bypass with `allow-scope-mismatch`.
- `markdown_file_check.yml` — fails non-`docs` PRs that add Markdown files; bypass with `markdown-added: acknowledged`.
- `project_readme_check.yml` — fails non-`docs` PRs that edit a project README; bypass with `readme: acknowledged`.

None of these gate merges on their own — each must be added to the branch's
required status checks.

## Local composite actions (`actions/`)

Reusable steps shared by multiple workflows. Today this is mainly `actions/uv_setup` (Python + pinned `uv` with caching). Add a new composite action here only when two or more workflows need the same multi-step setup.

## Helper scripts (`scripts/`)

Production helpers are nested by domain:

```text
scripts/
├── checks/      # repo integrity / sync checkers
├── evals/       # eval/harbor matrix and aggregation
├── labeling/    # PR/issue labeling and triage automation
├── release/     # release-please guards, notes, pin checks
└── tests/       # tests for the helpers above (and some workflow contracts)
```

### Placement rules

1. **Put new helpers in an existing domain folder** when they clearly belong there.
2. **Add a domain folder** only for a sustained new area (not a one-off script). Keep the name short and topic-style like the neighbors.
3. Prefer plain modules invoked with `python .github/scripts/<domain>/<script>.py` (or `node …`) from workflow steps. Avoid inventing a package install story under `.github/`.
4. Keep secrets out of scripts; read them from the environment the workflow injects.

### Tests (`scripts/tests/`)

Tests mirror top-level layout:

```text
scripts/<domain>/<name>.py
scripts/tests/<domain>/test_<name>.py
```

Special cases:

| Location | What goes there |
| --- | --- |
| `scripts/tests/workflows/` | Contract tests over workflow/action YAML (job graphs, options matrices, secret scoping, root `action.yml`) — not a production `scripts/workflows/` tree |
| `scripts/tests/conftest.py` | Shared pytest path setup so domain helpers import without packaging |

`conftest.py` puts each domain directory (`checks`, `evals`, `labeling`, `release`) on `sys.path`. New domains must be added there if their tests import modules by bare filename the same way.

## Related docs

- [`RELEASING.md`](/lib/09-harness/langchain-deepagents/_github-RELEASING/index) — version branches, release-please, fan-out guards, publishing
- [`SECRETS.md`](/lib/09-harness/langchain-deepagents/_github-SECRETS) — secret/variable names and environment scopes
- [`../AGENTS.md`](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/AGENTS.md) — monorepo conventions and PR title scopes
- [`../libs/partners/AGENTS.md`](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/partners/AGENTS.md) — adding a new partner to CI
