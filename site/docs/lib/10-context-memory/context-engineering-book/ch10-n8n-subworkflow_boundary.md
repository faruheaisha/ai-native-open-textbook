---
title: "n8n subworkflow boundary"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/n8n/subworkflow_boundary/README.md"
sourceRel: "ch10/n8n/subworkflow_boundary/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/n8n/subworkflow_boundary/README.md"
sourceSha256: "02cc4a83e767013d46d1211fabe7a92afead8c381bed81ed59ea608bbd714d53"
pageSha256: "02cc4a83e767013d46d1211fabe7a92afead8c381bed81ed59ea608bbd714d53"
contentMode: "local-full"
zh: ""
---

# n8n subworkflow boundary

This example shows where a larger automation should be split into a reusable subworkflow.

Inspect `main.workflow.json` and `subworkflow.workflow.json` to see the handoff boundary.

## Requirements

* An [n8n](https://n8n.io/) instance or account

## What it demonstrates

- Parent/child subworkflow isolation patterns.
