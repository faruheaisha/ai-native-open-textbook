---
title: "DSPy BootstrapFewShot example"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/dspy/bootstrap_few_shot/README.md"
sourceRel: "ch10/dspy/bootstrap_few_shot/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/dspy/bootstrap_few_shot/README.md"
sourceSha256: "db27f2ed20cb377039697de1977fccd11bd195ed79b4aa8b8b824686b1bf6dd4"
pageSha256: "db27f2ed20cb377039697de1977fccd11bd195ed79b4aa8b8b824686b1bf6dd4"
contentMode: "local-full"
zh: ""
---

# DSPy BootstrapFewShot example

This example shows DSPy compiling a predictor with `BootstrapFewShot` using a local deterministic LM.

## Requirements

* [Python](https://www.python.org/) 3.10+

## Steps for running this example in the shell

1. Install dependencies:
```bash
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows Command Prompt:
.venv\Scripts\activate.bat

# Windows PowerShell:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

2. Run the script:
```bash
python bootstrap_few_shot.py
```
