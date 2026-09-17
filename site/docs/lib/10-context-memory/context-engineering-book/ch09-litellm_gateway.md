---
title: "LiteLLM gateway example"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch09/litellm_gateway/README.md"
sourceRel: "ch09/litellm_gateway/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch09/litellm_gateway/README.md"
sourceSha256: "b0f929e8a9a613ff6fecb167c9e288643337b5ea876ab96dd11b6d0f9d57f685"
pageSha256: "b0f929e8a9a613ff6fecb167c9e288643337b5ea876ab96dd11b6d0f9d57f685"
contentMode: "local-full"
zh: ""
---

# LiteLLM gateway example

This example shows how an AI gateway can sit between an application and multiple model providers.

The script uses a [LiteLLM](https://www.litellm.ai/) client interface to send one request through a primary model and one through a fallback model. It uses mock responses so the example is easy to run without real provider credentials.

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

2. Run the script:
```bash
python litellm_gateway.py
```

## Output

```text
[INFO] Primary path selected: openai/gpt-4o-mini
[INFO] Response: Primary provider answer.

Provider List: https://docs.litellm.ai/docs/providers

[INFO] Fallback path selected: anthropic/claude-3-haiku
[INFO] Response: Fallback provider answer.
```
