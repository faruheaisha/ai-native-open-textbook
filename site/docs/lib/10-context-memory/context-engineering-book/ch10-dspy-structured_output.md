---
title: "Structured output with DSPy"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/dspy/structured_output/README.md"
sourceRel: "ch10/dspy/structured_output/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/dspy/structured_output/README.md"
sourceSha256: "a52937be8304fd933ddc49fc0f3d5f8f94d6ca0445a5568395aafd31f91b7dea"
pageSha256: "a52937be8304fd933ddc49fc0f3d5f8f94d6ca0445a5568395aafd31f91b7dea"
contentMode: "local-full"
zh: ""
---

# Structured output with DSPy

This example uses DSPy with a local deterministic LM to turn a request into a small structured action plan.

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
python structured_output.py
```

## What it demonstrates

- A DSPy signature with typed outputs
- A local LM stub that emits repeatable JSON
- A `dspy.Predict` module that parses the plan fields

## Output

```
Request 1: We were charged twice for the enterprise plan and need a refund.
Summary: Handle the billing request and confirm the refund workflow.
Owner: billing
Priority: high
Next step: Verify the charge, then send the refund confirmation.

Request 2: The customer cannot sign in after resetting the password.
Summary: Restore account access and clear the login blocker.
Owner: support
Priority: high
Next step: Guide the user through the reset flow and confirm access.

Request 3: Please prepare a launch response for the product announcement.
Summary: Prepare a launch response for the request.
Owner: product
Priority: medium
Next step: Draft the message, review the rollout notes, and share it with the team.
```
