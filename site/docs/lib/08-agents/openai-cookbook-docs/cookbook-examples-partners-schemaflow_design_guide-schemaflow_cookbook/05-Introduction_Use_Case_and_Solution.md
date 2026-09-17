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
pageSha256: "e545295adb1bd382ad589943a3df641f24bf3b3dd9df6e8c428b2dceaa9d27f4"
contentMode: "local-full"
zh: ""
---

## Introduction: Use Case and Solution

This cookbook focuses on a common enterprise data-engineering scenario: a stakeholder requests a database schema change in natural language, and the data team needs to turn that request into an implementation-ready plan.

Here, the retail domain is just a concrete way to make the workflow tangible. The same staged approach can be adapted to other source systems, data products, and review processes.

The default request in this notebook is:

```text
Add LOYALTY_TIER VARCHAR(20) to ODS.ODS_CUSTOMER_PROFILE as nullable.
Backfill from CORE.DIM_CUSTOMER on CUSTOMER_ID where IS_CURRENT=true.
Add a non-unique index on (CUSTOMER_ID, LOYALTY_TIER).
```

A human data engineer would typically need to answer several questions before writing production SQL:

- What table and schema are being changed?
- What exact column, type, and nullability were requested?
- Is historical backfill required?
- Does the request imply an index?
- Which downstream layers need the field propagated?
- What risks should reviewers look for?
- What checks should be run before and after deployment?
- What rollback steps are reasonable?
- Does the generated SQL include the required elements?

SchemaFlow implements this as a staged agent workflow. Each stage creates a typed intermediate output that the next stage consumes. Deterministic checks then validate the outputs before the notebook saves the final bundle and optionally runs evals.
