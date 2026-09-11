---
title: "DSPy: Chain-of-Thought vs ReAct"
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

# DSPy: Chain-of-Thought vs ReAct

This example demonstrates how to implement the same "math tutor" task with two different prompting strategies in [DSPy](https://dspy-docs.vercel.app/):

1.  A **Chain-of-Thought (CoT)** module that reasons step by step.
2.  A **ReAct** agent that can call a calculator tool while reasoning.

## Requirements

* [Python](https://www.python.org/) 3.6+
* An [OpenAI API key](https://platform.openai.com/api-keys)

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

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python dspy_cot_vs_react.py
```

## Output

When you run the script, it will execute both the Chain-of-Thought and ReAct strategies and print their results and reasoning/trajectory.
