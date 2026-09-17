---
title: "Development"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/DEVELOPMENT.md"
sourceRel: "libs/DEVELOPMENT.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/DEVELOPMENT.md"
sourceSha256: "57f3204988f118cf9f447b52f3d96eb8503cc91bc3b5c8de1b0c2c732f1c5562"
pageSha256: "57f3204988f118cf9f447b52f3d96eb8503cc91bc3b5c8de1b0c2c732f1c5562"
contentMode: "local-full"
zh: ""
---

# Development

Starting point for working in the Deep Agents monorepo. For how the code is structured at runtime, see [`ARCHITECTURE.md`](/lib/09-harness/langchain-deepagents/libs-ARCHITECTURE).

> [!IMPORTANT]
> Before opening a pull request, read the [LangChain contributing guide](https://docs.langchain.com/oss/python/contributing/overview). External PRs must link to an issue or discussion that a maintainer has approved, and the contributor must be assigned to it before the PR is opened.

## Prerequisites

- [`uv`](https://docs.astral.sh/uv/) — manages interpreters, virtual environments, and dependencies. Do not use `pip`, `poetry`, or `conda`.
- `make` — task runner. Every package's `Makefile` is the source of truth for its commands; run `make help` in any package directory to list targets.

`uv` provisions the right Python interpreter automatically, so there is no global Python version to install or pin.

## Quickstart

Pick the package you are changing, install its dependencies, and use its `Makefile` for the normal edit-test-lint loop:

```bash
uv tool install pre-commit
pre-commit install --install-hooks
cd libs/deepagents
uv sync --all-groups
make test
make lint
```

Use `make help` inside any package to see its supported targets. To run a repo-wide check, move to `libs/` and use the fan-out targets, for example `make lint` or `make lock-check`.

## Repository layout

This is a monorepo of independently versioned packages under `libs/`:

```txt
libs/
├── deepagents/     # Core SDK — create_deep_agent, middleware, backends
├── acp/            # Agent Client Protocol integration
├── evals/          # Evaluation suite and Harbor integration
├── code/           # Prebuilt coding agent for interactive and headless use
├── talon/          # Local runtime host for long-running agents
└── partners/       # Provider/sandbox integrations
    ├── daytona/
    ├── modal/
    ├── vercel/
    ├── runloop/
    └── quickjs/
```

Each package has its own `pyproject.toml`, `Makefile`, and `README.md`. There is no root `pyproject.toml`; you work inside the package you are changing. Local package dependencies are editable, so changes in one package are visible to sibling packages that depend on it during development.

## Setup

Work inside the package you are changing. `uv` creates and manages the virtual environment for you — no manual `activate` needed.

```bash
cd libs/deepagents
uv sync --all-groups      # install the package + all dependency groups
```

Prefer the package's `make` targets for standard workflows; use `uv run ...` for direct one-off commands.

Four rules for this monorepo:

- Install dependencies explicitly with `uv sync` (add `--group <name>` or `--all-groups` as needed). Never let them install implicitly.
- Do not create a virtual environment outside the package directory.
- Do not mix environments within one session.
- Each package sets its own supported Python range in `pyproject.toml`. Do not pin a global Python version; defer to the package's `requires-python`.

## Common commands

Run these from inside a package directory (e.g. `libs/deepagents`). They are consistent across the core SDK packages (`deepagents`, `code`); run `make help` to see what a given package supports:

| Command | What it does |
| --- | --- |
| `make help` | List the package's available targets |
| `make test` | Run unit tests (no network; coverage output in packages that enable it) |
| `make test TEST_FILE=tests/unit_tests/test_foo.py` | Run a single test file |
| `make integration_test` | Run integration tests (network allowed) |
| `make lint` | Run `ruff` checks + `ty` type checking |
| `make format` | Auto-format and apply safe `ruff` fixes |
| `make type` | Run the `ty` type checker only |
| `make coverage` | Run the package's explicit coverage target, usually including XML output |

You can also run a specific test directly:

```bash
uv run --group test pytest tests/unit_tests/test_specific.py
```

### Repo-wide commands

Run these from `libs/` to fan out across packages:

| Command | What it does |
| --- | --- |
| `make lint` | Lint every package |
| `make format` | Format every package |
| `make lock` | Update all lockfiles |
| `make lock-check` | Verify all lockfiles are up to date |
| `make lock-bump DEP=<pkg>` | Bump one dependency across all lockfiles |

## Docstrings

Google-style, with an `Args` section, for every public function. The rules are in the root [`AGENTS.md`](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/AGENTS.md#code-and-documentation); this is the shape they produce:

```python
def send_email(to: str, msg: str, *, priority: str = "normal") -> bool:
    """Send an email to a recipient with specified priority.

    Any additional context about the function can go here.

    Args:
        to: The email address of the recipient.
        msg: The message body to send.
        priority: Email priority level.

    Returns:
        `True` if email was sent successfully, `False` otherwise.

    Raises:
        InvalidEmailError: If the email address format is invalid.
        SMTPConnectionError: If unable to connect to email server.
    """
```

## Suppressing ruff rules

`per-file-ignores` silences a rule for the *entire* file. Add it for one violation and every future violation of that rule in that file is silently ignored. Inline `# noqa` is precise to the line, self-documenting, and keeps the safety net intact for the rest of the file. Justify every suppression in a comment. If you cannot justify it, the code is probably the problem.

Reserve `per-file-ignores` for categorical policy that applies to a whole class of files. Those are not exceptions; they are different rules for a different context.

```toml
# GOOD - categorical policy in pyproject.toml
[tool.ruff.lint.per-file-ignores]
"tests/**" = ["D1", "S101"]

# BAD - single-line exception buried in pyproject.toml
"deepagents_code/agent.py" = ["PLR2004"]
```

```python
# GOOD - precise, self-documenting inline suppression
timeout = 30  # noqa: PLR2004  # default HTTP timeout, not arbitrary
```

## Pre-commit hooks

The repo uses [`pre-commit`](https://pre-commit.com/) for formatting, linting, lockfile checks, and Conventional Commit message validation:

```bash
uv tool install pre-commit   # or: pipx install pre-commit
pre-commit install --install-hooks
```

The hooks run `make format lint` for changed packages and validate commit messages, so most CI lint failures are caught before you push.

### Branch-name pre-push hook
