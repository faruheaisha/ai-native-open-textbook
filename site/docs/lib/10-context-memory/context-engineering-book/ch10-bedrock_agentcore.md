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
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/bedrock_agentcore/README.md"
sourceRel: "ch10/bedrock_agentcore/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/bedrock_agentcore/README.md"
sourceSha256: "1a75bebb2ea2f83c09d6e6fe984d57b8ccf373e76baf54a77b9f889ee53b59e7"
pageSha256: "1a75bebb2ea2f83c09d6e6fe984d57b8ccf373e76baf54a77b9f889ee53b59e7"
contentMode: "local-full"
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
