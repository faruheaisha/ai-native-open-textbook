---
title: "Workflow State Handoff"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/workflow_state_handoff/README.md"
sourceRel: "ch05/python/workflow_state_handoff/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch05/python/workflow_state_handoff/README.md"
sourceSha256: "7c599b0ed4f742971dcb4efbb42cd10c86e761c3bea2d2cb03e63ffe32bdd7f7"
pageSha256: "7c599b0ed4f742971dcb4efbb42cd10c86e761c3bea2d2cb03e63ffe32bdd7f7"
contentMode: "local-full"
zh: ""
---

# Workflow State Handoff

This example demonstrates shared workflow state in a basic two-agent system.

It uses:

- a planner agent that writes the objective, plan, and handoff note
- an executor agent that reads the same shared state and advances the workflow
- a JSON file so the state survives across runs

## Prerequisites

- Python 3.10+
- An OpenAI API key (`OPENAI_API_KEY`)

## Steps for running this example in the shell

1.  Install dependencies:
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

2. Run the script
```bash
python workflow_state_handoff.py --model gpt-5
```

By default, the shared state is stored in `.workflow_state_handoff.json`.

## Commands

Inside the chat:

- `/help` - show commands
- `/state` - print the shared workflow state
- `/reset` - clear the workflow state file
- `/exit` - quit

## Suggested experiment

1. Start the script and give it a concrete task, for example: `Plan a launch checklist for a small product demo.`
2. Observe the planner output and the executor output.
3. Run `/state` to inspect the shared state that both agents use.
4. Restart the script and confirm that the plan is still available from the state file.

## Notes

- This example demonstrates global/shared state.
- It is intentionally minimal and focuses on the state handoff, not on tool use or distributed coordination.
