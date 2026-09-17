---
title: "Basic interaction with an LLM using LangChain"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain/basic_llm_interaction/README.md"
sourceRel: "ch10/langchain/basic_llm_interaction/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain/basic_llm_interaction/README.md"
sourceSha256: "03773158a2d709921e536ef2f296e8f8de76f92bee582d2ccfe7dbf9febf08a9"
pageSha256: "03773158a2d709921e536ef2f296e8f8de76f92bee582d2ccfe7dbf9febf08a9"
contentMode: "local-full"
zh: ""
---

# Basic interaction with an LLM using LangChain

This example demonstrates how to set up an LLM (e.g., OpenAI), invoke a prompt, and parse its output using [LangChain](https://docs.langchain.com/).

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
python basic_llm_interaction.py
```

## Output

When you run the script, it will send a basic user prompt to the LLM as input (*What is the capital of France?*) and the model should provide a response (*The capital of France is Paris*).
