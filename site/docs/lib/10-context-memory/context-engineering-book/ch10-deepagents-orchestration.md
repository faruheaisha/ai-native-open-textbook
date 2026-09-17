---
title: "Orchestration"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/deepagents/orchestration/README.md"
sourceRel: "ch10/deepagents/orchestration/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/deepagents/orchestration/README.md"
sourceSha256: "75a0ca415c70f99d89a91b9c72be284945a18063af5ad2cac547f9d7ffacbbaa"
pageSha256: "75a0ca415c70f99d89a91b9c72be284945a18063af5ad2cac547f9d7ffacbbaa"
contentMode: "local-full"
zh: ""
---

# Orchestration

This example shows DeepAgents interrupting a sensitive tool call until a human approves it.

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
python orchestration.py
```

## Output

```
Executing task: Research the latest trends in context engineering for 2026 and save a report.md

Task complete. (Note: Running this in a real environment requires API keys)

Final execution state (message list) contains the plan and sub-agent results.
```
