---
title: "Prompting examples in Java"
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

# Prompting examples in Java

This folder contains Java examples for few-shot prompting and prompt chaining.

## Requirements

- [Java](https://www.oracle.com/java/technologies/downloads/) 21+
- [Maven](https://maven.apache.org/) 3.9+
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Examples

- `FewShotTicketNormalizer.java`: Normalize an unstructured bug report into a support ticket schema.
- `PromptChainingSupportReply.java`: Extract structured context first, then draft a support reply.

## Running the examples

You can run each example using Maven:

```bash
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.FewShotTicketNormalizer"
mvn compile exec:java -Dexec.mainClass="io.github.bonigarcia.ce.PromptChainingSupportReply"
```
