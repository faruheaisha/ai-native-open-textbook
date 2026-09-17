---
title: "Few-shot ticket normalizer"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch06/python/few-shot-ticket-normalizer/README.md"
sourceRel: "ch06/python/few-shot-ticket-normalizer/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch06/python/few-shot-ticket-normalizer/README.md"
sourceSha256: "dcb723d7a310a4edf56967795f4c59189a00ae4a95eb69954e8ff4a5da9e418a"
pageSha256: "dcb723d7a310a4edf56967795f4c59189a00ae4a95eb69954e8ff4a5da9e418a"
contentMode: "local-full"
zh: ""
---

# Few-shot ticket normalizer

This example demonstrates few-shot prompting by transforming an unstructured bug report into a normalized support ticket schema.

The prompt includes a small set of labeled examples, then asks the model to apply the same pattern to a new report.

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
python few_shot_ticket_normalizer.py
```

## Output

When you run the script, it will print the input bug report and the normalized ticket returned by the model.
