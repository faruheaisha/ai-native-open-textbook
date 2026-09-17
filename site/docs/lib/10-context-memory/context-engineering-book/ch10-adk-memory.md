---
title: "ADK memory example"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/adk/memory/README.md"
sourceRel: "ch10/adk/memory/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/adk/memory/README.md"
sourceSha256: "c5d8271ed69643ff35f823577b4874b7ce952cd4d062e61731ca843ee28dee60"
pageSha256: "c5d8271ed69643ff35f823577b4874b7ce952cd4d062e61731ca843ee28dee60"
contentMode: "local-full"
zh: ""
---

# ADK memory example

This example demonstrates how to use the ADK's `InMemoryMemoryService` to manage long-term conversational memory across different sessions. It shows how an agent can capture information in one session and another agent can recall it in a subsequent session using a memory retrieval tool.

## Requirements

* [Python](https://www.python.org/) 3.10+
* A [Google API key](https://ai.google.dev/) set as an environment variable (`GOOGLE_API_KEY`)

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

2. Export your API key as an environment variable:
```bash
export GOOGLE_API_KEY="sk-..." # Windows cmd: set GOOGLE_API_KEY="sk-..." # Windows PowerShell: $env:GOOGLE_API_KEY="sk-..."
```

3. Run the script:
```bash
python memory_example.py
```

## Output

The script will execute two distinct scenarios:

* Turn 1: An `InfoCaptureAgent` will acknowledge a user's statement, and the session's content will be added to the `InMemoryMemoryService`.
* Turn 2: A `MemoryRecallAgent` (equipped with a `load_memory` tool) will be queried. It should recall the information captured in Turn 1 from the memory service.
