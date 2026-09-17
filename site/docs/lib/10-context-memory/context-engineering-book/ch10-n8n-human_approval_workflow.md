---
title: "n8n human approval workflow"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/n8n/human_approval_workflow/README.md"
sourceRel: "ch10/n8n/human_approval_workflow/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/n8n/human_approval_workflow/README.md"
sourceSha256: "31caaca9696e8a4f7cb2184e873d37f1befc268d33afb39e0d410aca2e90dcf5"
pageSha256: "31caaca9696e8a4f7cb2184e873d37f1befc268d33afb39e0d410aca2e90dcf5"
contentMode: "local-full"
zh: ""
---

# n8n human approval workflow

This example documents an export-shaped workflow that pauses for a human approval step before the final action runs.

## Requirements

* An [n8n](https://n8n.io/) instance or account

## What it demonstrates

- A visible node-by-node approval path
- Waiting for manual input inside the workflow
- Clear state transitions before completion

Inspect `workflow.json` for the node layout.
