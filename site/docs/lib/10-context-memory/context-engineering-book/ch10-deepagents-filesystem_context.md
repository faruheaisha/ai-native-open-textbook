---
title: "Filesystem Context"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/deepagents/filesystem_context/README.md"
sourceRel: "ch10/deepagents/filesystem_context/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/deepagents/filesystem_context/README.md"
sourceSha256: "13c33ea136a0a68053c6d111b35c9329ca424f49ddba983919133d44976f8ba0"
pageSha256: "13c33ea136a0a68053c6d111b35c9329ca424f49ddba983919133d44976f8ba0"
contentMode: "local-full"
zh: ""
---

# Filesystem Context

This example shows DeepAgents using explicit filesystem-style paths for context instead of hidden state. `/memories/AGENTS.md` is loaded as startup memory, and `/workspace/notes.md` lives in a routed workspace backend.

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
python filesystem_context.py
```

## Output

```
Seeded /memories/AGENTS.md and /workspace/notes.md.
```
