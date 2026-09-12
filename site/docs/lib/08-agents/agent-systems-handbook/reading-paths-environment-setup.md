---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

**Specialization ID:** `GW01` · General · Workshop-type

This is the setup guide for **GW01 · Setup and Examples**. Continue with the [sample projects](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/reading-paths/sample-projects/README.md) for hands-on practice.

This shared setup guide is for the public starter projects referenced by the
Practitioner, Builder, and Contributor paths.

## What this setup is for

- reading the Agent Systems Handbook locally
- running the current repo-owned starter code
- verifying example projects before or after contribution work

The current sample projects are intentionally lightweight Python starters. They
are small enough to inspect quickly and validate without a framework-specific
toolchain.

## Prerequisites

- Git
- Python 3.9 or newer
- a terminal on macOS, Linux, or WSL

## Clone the repository

```bash
git clone https://github.com/Prompthon-IO/agent-systems-handbook.git
cd agent-systems-handbook
```

## Optional virtual environment

The current starter checks use only the Python standard library, but an
isolated environment is still a good default:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 --version
```

## Verify the current starter code

Run the repo-level smoke check:

```bash
python3 scripts/verify_example_projects.py
```

This verifies the current starter code under:

- `patterns/examples/`
- `systems/examples/`
- `ecosystem/examples/`
- `case-studies/examples/`

## Optional Git hook for filename casing

If you contribute from Windows, macOS, or any case-insensitive filesystem,
install the shared Git hooks before pushing:

```bash
git config core.hooksPath githooks
```

The current `pre-push` hook runs:

```bash
python3 scripts/check_filename_casing.py
```

This catches case-only path conflicts and tracked-path casing drift before the
push reaches CI or a Linux-based review environment.

## What to expect

- The check validates the current code sketches and example flows.
- The current projects are still documented as `starter` examples, not full
  production applications.
- Some starters demonstrate state shape or control flow without shipping the
  surrounding transport, persistence, or framework runtime yet.

## If you are contributing

- Keep example projects in lane-local `examples/` folders.
- Declare project status as `starter`, `partial`, or `runnable`.
- If you change executable starter code, update
  `scripts/verify_example_projects.py` in the same change.
