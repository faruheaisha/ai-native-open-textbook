---
title: "Basic interaction with LLMs in JavaScript"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/javascript/README.md"
sourceRel: "ch01/javascript/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch01/javascript/README.md"
sourceSha256: "3e7dc0eee9ce3d6ef3f31b84a15f539fa12b06f2d4cb24522fb43124cf3bd56c"
pageSha256: "3e7dc0eee9ce3d6ef3f31b84a15f539fa12b06f2d4cb24522fb43124cf3bd56c"
contentMode: "local-full"
zh: ""
---

# Basic interaction with LLMs in JavaScript

This folder contains JavaScript examples for interacting with OpenAI, Anthropic, Google Gemini, and local Ollama models.

## Requirements

- [Node.js](https://nodejs.org/)
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
