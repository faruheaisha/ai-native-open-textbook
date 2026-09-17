---
title: "Structured output with LangChain core primitives"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain/structured_output/README.md"
sourceRel: "ch10/langchain/structured_output/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain/structured_output/README.md"
sourceSha256: "a91dd4a5f457795072c0131aa2e0e92eb05080e7c7c8559f656157cd0453367c"
pageSha256: "a91dd4a5f457795072c0131aa2e0e92eb05080e7c7c8559f656157cd0453367c"
contentMode: "local-full"
zh: ""
---

# Structured output with LangChain core primitives

This example demonstrates the [LangChain](https://docs.langchain.com/) core primitives: initializing a chat model through the provider-agnostic factory and binding an output schema so that the response arrives as a validated object instead of free text.

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
python structured_output.py
```

## Output

When you run the script, it will send a user prompt to the LLM as input (*Capital of France?*) and the model should return an object validated against the `CityAnswer` schema (*city='Paris' country='France'*).
