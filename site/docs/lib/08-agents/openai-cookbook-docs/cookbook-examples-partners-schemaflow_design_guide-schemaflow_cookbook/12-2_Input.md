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
pageSha256: "5f67d76548cb69f5f932a13cda73c45ebd8f3973d2710b16e3e1765b548bdb82"
contentMode: "local-full"
zh: ""
---

## 2) Input

This section defines the database change request that SchemaFlow will process. Think of it as the compact ticket, issue, or message a data team might receive before turning the request into implementation details.

The default request asks the workflow to:

1. Add `LOYALTY_TIER VARCHAR(20)` to `ODS.ODS_CUSTOMER_PROFILE`.
2. Treat the new column as nullable.
3. Backfill from `CORE.DIM_CUSTOMER`.
4. Join on `CUSTOMER_ID`.
5. Filter the source to current records with `IS_CURRENT=true`.
6. Add a non-unique index on `(CUSTOMER_ID, LOYALTY_TIER)`.

This input is intentionally compact but rich enough to exercise the full workflow:

- parsing target schema and table
- extracting column name, type, and nullability
- recognizing backfill requirements
- recognizing index requirements
- generating multi-layer SQL
- running validation checks for expected table, column, and SQL actions

```python
CHANGE_TEXT = """Add LOYALTY_TIER VARCHAR(20) to ODS.ODS_CUSTOMER_PROFILE as nullable.
Backfill from CORE.DIM_CUSTOMER on CUSTOMER_ID where IS_CURRENT=true.
Add a non-unique index on (CUSTOMER_ID, LOYALTY_TIER)."""
print(CHANGE_TEXT)
```
