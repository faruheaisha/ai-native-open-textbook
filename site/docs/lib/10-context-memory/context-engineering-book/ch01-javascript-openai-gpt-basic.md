---
title: "Basic interaction with OpenAI GPT models"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/javascript/openai-gpt-basic/README.md"
sourceRel: "ch01/javascript/openai-gpt-basic/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch01/javascript/openai-gpt-basic/README.md"
sourceSha256: "425653ef37e8bb73e3a56da534f28801cbfe4ee7a4c7db75d95a2cd6f3591aee"
pageSha256: "425653ef37e8bb73e3a56da534f28801cbfe4ee7a4c7db75d95a2cd6f3591aee"
contentMode: "local-full"
zh: ""
---

# Basic interaction with OpenAI GPT models

This example demonstrates how to set up an [OpenAI](https://openai.com/) GPT model and send a basic user prompt with JavaScript.

## Requirements

* [Node.js](https://nodejs.org/)
* An [OpenAI API key](https://platform.openai.com/api-keys)

## Steps for running this example in the shell

1.  Install dependencies:
```bash
npm install
```

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
npm start
```

## Output

When you run the script, it will send a user prompt to a GPT model (`gpt-4o-mini`) using the `temperature` parameter. Then, it will send the same user prompt to a more advanced model (`gpt-5`) using reasoning. The output will show the responses from both models.

```
=== Basic model  ===
User: How many tokens are in your context window?
        Model: gpt-4o-mini-2024-07-18
        Latency: 1.695 seconds
        Input tokens: 15
        Output tokens: 39
        Reasoning tokens: 0
        Total tokens: 54
AI: My context window can handle up to 8,192 tokens. This includes both the input and the output tokens. If you have any specific questions or need assistance, feel free to ask!

=== Advanced model  ===
User: How many tokens are in your context window?
        Model: gpt-5-2025-08-07
        Latency: 17.243 seconds
        Input tokens: 14
        Output tokens: 750
        Reasoning tokens: 640
        Total tokens: 764
AI: It depends on the model. Most current ChatGPT models available here use a 128,000‑token context window (shared across your input and my output). If you tell me the specific model you’re using, I can confirm the exact limit.
```
