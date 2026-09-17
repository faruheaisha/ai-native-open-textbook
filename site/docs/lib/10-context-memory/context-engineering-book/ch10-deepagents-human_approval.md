---
title: "Human Approval"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/deepagents/human_approval/README.md"
sourceRel: "ch10/deepagents/human_approval/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/deepagents/human_approval/README.md"
sourceSha256: "c7529864216a3c1b40e073529d5ca649069707549c80b1002ea65aaaa263207f"
pageSha256: "c7529864216a3c1b40e073529d5ca649069707549c80b1002ea65aaaa263207f"
contentMode: "local-full"
zh: ""
---

# Human Approval

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
python human_approval.py
```

## Output

```
Awaiting approval for remove_file.
```
