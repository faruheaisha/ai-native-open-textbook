---
title: "Amazon Bedrock AgentCore examples"
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

# Amazon Bedrock AgentCore examples

This folder contains examples demonstrating how an agent is hosted on the managed runtime of Amazon Bedrock AgentCore.

## Requirements

- [Python](https://www.python.org/) 3.10+
- AWS credentials configured for a region where Amazon Bedrock is available

## Examples

- `hosted_agent/`: Exposing an agent through the AgentCore Runtime entrypoint.
- `code_review_agent/`: A code review agent that accepts a diff and returns structured feedback.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
