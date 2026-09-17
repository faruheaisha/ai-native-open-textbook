---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "48546aedcfd49f56e98326883df10eb3d95733ca1e8d4507489c8c18dff1368d"
contentMode: "local-full"
zh: ""
---

## What You'll Build

By the end of this notebook, you will have a working SchemaFlow pipeline that produces:

- A parsed database change request:
  - title
  - domain
  - target schema
  - target table
  - normalized operations
  - notes

- An impact-analysis report:
  - impacted tables, columns, indexes, views, or relationships
  - risks
  - assumptions
  - optional File Search evidence summaries

- A rollout plan:
  - implementation steps
  - prechecks
  - postchecks
  - rollback actions

- A draft SQL script with four required sections:
  - `LANDING (ODS)`
  - `STAGING (STG)`
  - `CORE (DIM/FACT/VIEW)`
  - `MARTS (SERVING)`

- A validation result:
  - expected table checks
  - expected column checks
  - required keyword checks such as `ALTER TABLE`, `UPDATE`, or `CREATE INDEX`

- A saved JSON artifact:
  - change request
  - impact analysis
  - plan
  - SQL
  - validation
  - optional RAG metadata

- A Promptfoo eval harness:
  - Python provider
  - Python assertion file
  - generated Promptfoo config
  - parse-only eval case
  - full-flow eval case
  - timestamped JSON and HTML eval reports
