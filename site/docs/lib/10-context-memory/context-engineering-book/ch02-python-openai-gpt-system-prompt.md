---
title: "System prompt with OpenAI GPT models"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/python/openai-gpt-system-prompt/README.md"
sourceRel: "ch02/python/openai-gpt-system-prompt/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch02/python/openai-gpt-system-prompt/README.md"
sourceSha256: "b564f42b28fff7409a290d7a2fabe0cb6608b2bbc4716339b1c34359b65d7ddb"
pageSha256: "b564f42b28fff7409a290d7a2fabe0cb6608b2bbc4716339b1c34359b65d7ddb"
contentMode: "local-full"
zh: ""
---

# System prompt with OpenAI GPT models

This example demonstrates how to set up an [OpenAI](https://openai.com/) GPT model and send a system prompt with Python.

## Requirements

* [Python](https://www.python.org/) 3.12+
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
python openai-gpt-system-prompt.py
```

## Output

When you run the script, it will send a system prompt and a user prompt to the model, which should provide a response:

```
=== With system prompt ===
User query: Explain me what is context engineering in simple words
Response: Explain to me what context engineering is in simple words.

=== With only user prompt ===
User query: Explain me what is context engineering in simple words
Response: Context engineering is the process of designing and organizing information or systems in a way that makes it easier for people to understand and use them in specific situations. It involves considering the environment, background, and needs of users to create a more relevant and effective experience.

For example, if you're creating a website, context engineering would mean thinking about who will use the site, what they need to find, and how they will interact with it, so that everything is clear and helpful for them. Essentially, it's about making sure that the right information is available at the right time and place.
```
