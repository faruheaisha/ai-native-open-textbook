---
title: "Dependency Doctor Agent Skill"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/agent_skills/dependency-doctor/README.md"
sourceRel: "agent_skills/dependency-doctor/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/agent_skills/dependency-doctor/README.md"
sourceSha256: "458cacc34413fb5996562fe739d900d44175c32c4a6d8154c9eae4bf7333dd8b"
pageSha256: "458cacc34413fb5996562fe739d900d44175c32c4a6d8154c9eae4bf7333dd8b"
contentMode: "local-full"
zh: ""
---

# Dependency Doctor Agent Skill

Dependency Doctor inspects one dependency manifest for surface-level,
direct-manifest footguns. It catches unpinned versions, standard-library
shadowing, obsolete backports, and obvious intra-manifest conflicts; it does
not diagnose a failed pip or uv dependency resolution. It is a local,
user-invoked development tool, not a repository CI rule.

![demo](https://github.com/mvanhorn/awesome-llm-apps/releases/download/demo-assets/dependency-doctor.gif)

## What it checks

- Python standard-library shadowing pins such as `pathlib==1.0.1`
- Obsolete backports such as `dataclasses`, `typing`, `enum34`, and `futures`
- Dependencies with no usable version constraint
- Duplicate entries and conflicting exact pins
- Fully yanked PyPI releases when `--online` is explicitly enabled

The offline core supports `requirements.txt`, PEP 621 or Poetry
`pyproject.toml`, and `package.json`. It uses only the Python standard library.

## Install

```bash
npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/dependency-doctor
```

Then ask your agent: `check my requirements.txt for dependency problems`.

## Run the script directly

```bash
python3 agent_skills/dependency-doctor/scripts/dep_doctor.py requirements.txt --json
```

The default command makes no network calls. To check exact Python pins for
fully yanked PyPI releases, opt in:

```bash
python3 agent_skills/dependency-doctor/scripts/dep_doctor.py requirements.txt --json --online
```

The doctor reports findings and suggested fixes but does not edit the manifest.
Run the eval from a clone before installing:

```bash
python3 agent_skills/evals/dependency-doctor/test_dep_doctor.py
```

## Scope

This focused check does not resolve a complete dependency graph and does not
query a vulnerability database. Use the project's approved audit tool for CVE
coverage. Ask before enabling the PyPI lookup or applying any suggested fix.

Apache-2.0. Last verified: July 2026.
