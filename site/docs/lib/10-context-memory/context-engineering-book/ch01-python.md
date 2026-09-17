---
title: "Basic interaction with LLMs in Python"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/python/README.md"
sourceRel: "ch01/python/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch01/python/README.md"
sourceSha256: "f0fb15b40796ce19301f0b410d66d8124307bb9b4ce1b4edc14a07977151e3bf"
pageSha256: "f0fb15b40796ce19301f0b410d66d8124307bb9b4ce1b4edc14a07977151e3bf"
contentMode: "local-full"
zh: ""
---

# Basic interaction with LLMs in Python

This folder contains Python examples for interacting with OpenAI, Anthropic, Google Gemini, and local Ollama models.

## Requirements

- [Python](https://www.python.org/) 3.6+
- Corresponding API keys are set as environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `GOOGLE_API_KEY`) for cloud examples
- [Ollama](https://ollama.com/) installed locally for the local model example

## Examples

- `openai-gpt-basic/`: Basic interaction with OpenAI GPT models.
- `openai-gpt-streaming/`: Streaming responses from OpenAI GPT models.
- `anthropic-claude-basic/`: Basic interaction with Anthropic Claude models.
- `anthropic-claude-streaming/`: Streaming responses from Anthropic Claude models.
- `google-gemini-basic/`: Basic interaction with Google Gemini models.
- `google-gemini-streaming/`: Streaming responses from Google Gemini models.
- `ollama-local-basic/`: Basic interaction with a local LLM using Ollama.
- `ollama-local-streaming/`: Streaming responses from a local LLM using Ollama.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
