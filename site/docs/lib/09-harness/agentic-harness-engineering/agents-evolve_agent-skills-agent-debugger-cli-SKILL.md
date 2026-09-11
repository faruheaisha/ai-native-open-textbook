---
title: "Agent Debugger CLI"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
zh: ""
---

# Agent Debugger CLI

Use this skill when you need the standalone `adb` CLI that ships inside the bundled `_source/` package in this directory.

## Files in this skill

- `_source/`: bundled open-source package that exposes the `adb` command.

## Install

The package is declared as a path source in the project root `pyproject.toml`, so a top-level `uv sync` already installs it. To install standalone from this skill directory:

```bash
python -m pip install ./_source
adb --help
```

If you are upgrading an existing install, use:

```bash
python -m pip install --upgrade --force-reinstall ./_source
```

## LLM configuration

Configure the LLM once with `adb config`:

```bash
