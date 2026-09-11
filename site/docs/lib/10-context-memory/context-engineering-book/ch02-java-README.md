---
title: "System prompt in Java"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# System prompt in Java

This folder contains Java examples for interacting with OpenAI, Anthropic, and Google Gemini models using system prompts.

## Requirements

- [Java](https://www.oracle.com/java/technologies/downloads/) 21+
- [Maven](https://maven.apache.org/) 3.9+
- Corresponding API keys are set as environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `GOOGLE_API_KEY`) 

## Examples

- `OpenAiGptSystemPrompt.java`: System prompt with OpenAI GPT models.
- `AnthropicClaudeSystemPrompt.java`: System prompt with Anthropic Claude models.
- `GoogleGeminiSystemPrompt.java`: System prompt with Google Gemini models.
- `OllamaLocalSystemPrompt.java`: System prompt with Ollama models.

## Other instruction mechanisms

- [Agent skills](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/agent-skills/README.md): Reusable packages of instructions and resources.
- [Instruction artifacts](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/python/instruction-artifacts/README.md): Project-specific guidance files (e.g., `AGENTS.md`).

## Running the examples

You can run each example using Maven:

```bash
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.OpenAiGptSystemPrompt"
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.AnthropicClaudeSystemPrompt"
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.GoogleGeminiSystemPrompt"
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.OllamaLocalSystemPrompt"
```
