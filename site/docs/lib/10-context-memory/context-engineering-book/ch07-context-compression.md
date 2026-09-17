---
title: "Context compression with LLMLingua"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch07/context-compression/README.md"
sourceRel: "ch07/context-compression/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch07/context-compression/README.md"
sourceSha256: "8e8e43637b7bf1962ca953aa1e66ae4256eb514bd91929ae2dd086523ae27a7e"
pageSha256: "8e8e43637b7bf1962ca953aa1e66ae4256eb514bd91929ae2dd086523ae27a7e"
contentMode: "local-full"
zh: ""
---

# Context compression with LLMLingua

This example demonstrates the concept of **Context Compression** using the `LLMLingua` library. It shows how to compress a long conversation history to reduce its token count while preserving essential semantic information and verifying that sentinel facts survive.

## Requirements

This project requires [Python](https://www.python.org/) 3.6+ and the libraries listed in `requirements.txt`.

## Steps for running this example

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

2. Set environment variables:
Ensure your OpenAI API key is set as an environment variable. You can do this by:
```
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```
Alternatively, create a `.env` file in the source directory with the content `OPENAI_API_KEY="YOUR_OPENAI_API_KEY"`.

3. Run the script:
```bash
python context_compression.py
```

## Output

When you run the script, it will:

1. Print the original word count of the sample conversation.
2. Display the compressed version of the context and its new, lower word count.
3. Verify that the sentinel facts still exist after compression.
4. Use the compressed context to ask a question to an LLM.
5. Print the final answer from the LLM, demonstrating that the key information was successfully retained during compression.
