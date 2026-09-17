---
title: "Memory Handoff"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/crewai/memory_handoff/README.md"
sourceRel: "ch10/crewai/memory_handoff/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/crewai/memory_handoff/README.md"
sourceSha256: "542f40a495c4dbbd92ab4dcd114f5d06dc89139084ce7b4f264719faf376a6b3"
pageSha256: "542f40a495c4dbbd92ab4dcd114f5d06dc89139084ce7b4f264719faf376a6b3"
contentMode: "local-full"
zh: ""
---

# Memory Handoff

This example shows CrewAI memory in action: one task records notes and the next task reuses them as context.

## Requirements

* [Python](https://www.python.org/) 3.10+
* An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

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
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python memory_handoff.py
```

## Output

The script will print the initial notes and the final output to the console.

```
╭───────────────────────────────────────────────────────────────── ✅ Agent Final Answer ──────────────────────────────────────────────────────────────────╮
│                                                                                                                                                          │
│  Agent: Responder                                                                                                                                        │
│                                                                                                                                                          │
│  Final Answer:                                                                                                                                           │
│  Effective memory handoff is the process of transferring relevant information from one individual or system to another to ensure continuity. It          │
│  requires clear, concise, and complete communication to avoid loss of critical information. Additionally, documentation and standardized handoff         │
│  protocols improve the reliability and durability of memory transfer between parties.                                                                    │
│                                                                                                                                                          │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```
