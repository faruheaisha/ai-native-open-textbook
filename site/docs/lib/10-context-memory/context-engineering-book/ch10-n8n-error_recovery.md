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
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/n8n/error_recovery/README.md"
sourceRel: "ch10/n8n/error_recovery/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/n8n/error_recovery/README.md"
sourceSha256: "1156435199cfc14fee015508b7f7232d4813493f159b607f2bd7822bd6036812"
pageSha256: "1156435199cfc14fee015508b7f7232d4813493f159b607f2bd7822bd6036812"
contentMode: "local-full"
zh: ""
---

# n8n error recovery

This example describes how n8n handles failures with visible retry and fallback branches.

Inspect `workflow.json` for the recovery path.

## Requirements

* An [n8n](https://n8n.io/) instance or account

## What it demonstrates

- Catching and recovering from errors in workflows.
