---
title: "Stepwise reasoning with DSPy"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/dspy/stepwise_reasoning/README.md"
sourceRel: "ch10/dspy/stepwise_reasoning/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/dspy/stepwise_reasoning/README.md"
sourceSha256: "c562303257c3b0d325d198618b8bcba6d0794a07b2726f19eaca15b421d035a8"
pageSha256: "c562303257c3b0d325d198618b8bcba6d0794a07b2726f19eaca15b421d035a8"
contentMode: "local-full"
zh: ""
---

# Stepwise reasoning with DSPy

This example shows a simple reasoned response pattern with DSPy.

It keeps the model local and deterministic, but still returns a reasoning field and a final answer field so you can see the shape of a stepwise DSPy output.

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
python stepwise_reasoning.py
```

## What it demonstrates

- A DSPy signature with a reasoning field and a final answer
- A local LM stub that emits repeatable JSON
- A small offline demo with no external dependencies

## Output

```
Question 1: How should we handle the product launch this week?
Reasoning: A launch request needs a short plan and a clear final status.
Answer: Summarize the release steps, confirm the rollout owner, and share the final checklist.

Question 2: What should we say about the duplicate billing report?
Reasoning: Billing questions should confirm the charge and keep the reply precise.
Answer: Verify the charge, explain the refund status, and point the user to billing support
```
