---
title: "Basic interaction with LLMs in Java"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch01/java/README.md"
sourceRel: "ch01/java/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch01/java/README.md"
sourceSha256: "3f9eb7b92c56d126cde860d2231d06033bb9c3a8d62a71571e2e5bb5057caaee"
pageSha256: "3f9eb7b92c56d126cde860d2231d06033bb9c3a8d62a71571e2e5bb5057caaee"
contentMode: "local-full"
zh: ""
---

# Basic interaction with LLMs in Java

This folder contains Java examples for interacting with OpenAI, Anthropic, Google Gemini, and local Ollama models.

## Requirements

- [Java](https://www.oracle.com/java/technologies/downloads/) 21+
- [Maven](https://maven.apache.org/) 3.9+
- Corresponding API keys are set as environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `GEMINI_API_KEY`) for cloud examples
- [Ollama](https://ollama.com/) installed locally for the local model example

## Examples

- `OpenAiGptBasic.java`: Basic interaction with OpenAI GPT models.
- `OpenAiGptStreaming.java`: Streaming responses from OpenAI GPT models.
- `AnthropicClaudeBasic.java`: Basic interaction with Anthropic Claude models.
- `AnthropicClaudeStreaming.java`: Streaming responses from Anthropic Claude models.
- `GoogleGeminiBasic.java`: Basic interaction with Google Gemini models.
- `GoogleGeminiStreaming.java`: Streaming responses from Google Gemini models.
- `OllamaLocalBasic.java`: Basic interaction with a local LLM using Ollama.
- `OllamaLocalStreaming.java`: Streaming responses from a local LLM using Ollama.

## Running the examples

You can run each example using Maven:

```bash
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.OpenAiGptBasic"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.OpenAiGptStreaming"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.AnthropicClaudeBasic"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.AnthropicClaudeStreaming"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.GoogleGeminiBasic"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.GoogleGeminiStreaming"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.OllamaLocalBasic"
mvn compile exec:exec -Dexec.mainClass="io.github.bonigarcia.ce.OllamaLocalStreaming"
```
