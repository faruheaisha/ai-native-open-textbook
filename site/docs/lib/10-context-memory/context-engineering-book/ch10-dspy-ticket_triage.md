---
title: "Ticket triage"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/dspy/ticket_triage/README.md"
sourceRel: "ch10/dspy/ticket_triage/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/dspy/ticket_triage/README.md"
sourceSha256: "7a8315568c588cb061b80ba544b407596004d29cf59ca580b48125062ca6b75d"
pageSha256: "7a8315568c588cb061b80ba544b407596004d29cf59ca580b48125062ca6b75d"
contentMode: "local-full"
zh: ""
---

# Ticket triage

This example uses DSPy with a local deterministic LM to classify a support ticket, assign a team, and draft a short reply.

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
python ticket_triage.py
```

## What it demonstrates

- A DSPy signature for structured ticket triage
- A local LM stub that returns repeatable JSON
- A `dspy.Predict` module that parses the JSON into typed outputs

## Output

```
Ticket 1: I was charged twice for my subscription and need a refund.
Priority: high
Team: billing
Reply: Thanks for the details. I am routing this to billing now and will help get it resolved.

Ticket 2: I cannot log in after resetting my password.
Priority: high
Team: support
Reply: Thanks. I am routing this to support so we can help restore your access quickly.

Ticket 3: The dashboard export button is broken and shows an error.
Priority: medium
Team: engineering
Reply: Thanks for reporting this. I am sending it to engineering for a closer look.
```
