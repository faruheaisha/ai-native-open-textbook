---
title: "Prompt chaining support reply"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Prompt chaining support reply

This example demonstrates prompt chaining by splitting a support workflow into two model calls.

The first prompt extracts structured fields from a customer message. The second prompt uses that structured result to draft a concise support reply.

## Requirements

* [Python](https://www.python.org/) 3.8+
* An [OpenAI API key](https://platform.openai.com/api-keys)

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

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python prompt_chaining_support_reply.py
```

## Output

When you run the script, it will print the intermediate structured extraction and the final support reply generated from that intermediate context.
