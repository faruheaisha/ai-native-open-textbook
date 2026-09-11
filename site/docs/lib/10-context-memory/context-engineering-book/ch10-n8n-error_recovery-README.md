---
title: "n8n error recovery"
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

# n8n error recovery

This example describes how n8n handles failures with visible retry and fallback branches.

Inspect `workflow.json` for the recovery path.

## Requirements

* An [n8n](https://n8n.io/) instance or account

## What it demonstrates

- Catching and recovering from errors in workflows.
