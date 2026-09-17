---
title: "Tool Chain"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/crewai/tool_chain/README.md"
sourceRel: "ch10/crewai/tool_chain/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/crewai/tool_chain/README.md"
sourceSha256: "eee21958327cb5d603a2a55847311dec3a12256867099bc132bccdfbebcf3cce"
pageSha256: "eee21958327cb5d603a2a55847311dec3a12256867099bc132bccdfbebcf3cce"
contentMode: "local-full"
zh: ""
---

# Tool Chain

This example shows a small CrewAI workflow where an agent uses explicit tools to gather context before a writer drafts the answer.

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
python tool_chain.py
```

## Output

When you run the script, you should see output similar to the following in your terminal:

```
╭──────────────────────────────────────────────────────────────────── Crew Completion ─────────────────────────────────────────────────────────────────────╮
│                                                                                                                                                          │
│  Crew Execution Completed                                                                                                                                │
│  Name: crew                                                                                                                                              │
│  ID: cb6c4bfa-8f86-4a19-bab9-ef7071e6a65e                                                                                                                │
│  Final Output: A tool chain is a set of programming tools used together to perform a complex software development task. It typically includes a          │
│  compiler, linker, debugger, and other utilities that transform source code into executable programs. Keeping the scope small helps maintain focus and   │
│  efficiency when using or developing tool chains.                                                                                                        │
│                                                                                                                                                          │
│                                                                                                                                                          │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```
