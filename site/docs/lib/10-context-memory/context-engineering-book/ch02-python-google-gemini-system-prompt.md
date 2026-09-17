---
title: "System prompt with Google Gemini models"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/google-gemini-system-prompt/README.md"
sourceRel: "ch02/python/google-gemini-system-prompt/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch02/python/google-gemini-system-prompt/README.md"
sourceSha256: "5bbc1784b2a9f0d8c0367b3314597ecadfef3fd18f20d3f55b4748d2d5d34116"
pageSha256: "5bbc1784b2a9f0d8c0367b3314597ecadfef3fd18f20d3f55b4748d2d5d34116"
contentMode: "local-full"
zh: ""
---

# System prompt with Google Gemini models

This example demonstrates how to set up a [Google Gemini](https://ai.google.dev/) model and send a system prompt with Python.

## Requirements

* [Python](https://www.python.org/) 3.12+
* A [Google API key](https://aistudio.google.com/app/apikey)

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

2. Export your Google API key as an environment variable:
```bash
export GOOGLE_API_KEY="AIza..." # Windows cmd: set GOOGLE_API_KEY="AIza..." # Windows PowerShell: $env:GOOGLE_API_KEY="AIza..."
```

3. Run the script:
```bash
python google-gemini-system-prompt.py
```

## Output

When you run the script, it will send a system prompt and a user prompt to the model, which should provide a response:

```
=== With system prompt ===
User query: Explain me what is context engineering in simple words
Response: Context engineering involves designing prompts to guide AI models towards desired outputs.

=== With only user prompt ===
User query: Explain me what is context engineering in simple words
Response: Imagine you're talking to a really smart robot. You want it to write a story, but you don't just say "write a story."

**Context engineering is like giving the robot extra information and instructions to help it write the *right* kind of story.**

Think of it like this:

*   **Without context engineering:** You say "Write a story." The robot might write a boring story about a rock.
*   **With context engineering:** You say "Write a *funny* story about a *talking dog* who *tries to become a chef*." Now the robot has a much better idea of what you want!

So, **context engineering is all about carefully crafting the prompts and instructions you give to an AI to get the specific and desired output you're looking for.** It's about providing the right context so the AI understands your needs and can generate something useful and relevant.
```
