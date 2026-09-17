---
title: "System prompt in JavaScript"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/README.md"
sourceRel: "ch02/javascript/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch02/javascript/README.md"
sourceSha256: "4eb3047f5876bc74235bca8c2601769459442433754390a7d546a9d55dfed12f"
pageSha256: "4eb3047f5876bc74235bca8c2601769459442433754390a7d546a9d55dfed12f"
contentMode: "local-full"
zh: ""
---

# System prompt in JavaScript

This folder contains JavaScript examples for interacting with OpenAI, Anthropic, and Google Gemini models using system prompts.

## Requirements

- [Node.js](https://nodejs.org/)
- Corresponding API keys are set as environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `GOOGLE_API_KEY`) 

## Examples

- `openai-gpt-system-prompt/`: System prompt with OpenAI GPT models.
- `anthropic-claude-system-prompt/`: System prompt with Anthropic Claude models.
- `google-gemini-system-prompt/`: System prompt with Google Gemini models.
- `ollama-local-system-prompt/`: System prompt with Ollama models.

## Other instruction mechanisms

- [Agent skills](/lib/10-context-memory/context-engineering-book/ch02-agent-skills): Reusable packages of instructions and resources.
- [Instruction artifacts](/lib/10-context-memory/context-engineering-book/ch02-python-instruction-artifacts): Project-specific guidance files (e.g., `AGENTS.md`).

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
