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
pageSha256: "7b9e45fc60680aebf0a718dc4be6733f165a952972519d31f223c6f725f0d627"
contentMode: "local-full"
zh: ""
---

## 6) Stage 5 - Lightweight SQL Sanity Checks

This section runs deterministic checks against the generated SQL for the current notebook run.

This is not a full SQL parser and it does not execute the SQL. Instead, it checks for obvious mismatches between the original request, parsed change object, and generated script. These checks are intentionally small and explainable, so a reader can see exactly what passed or failed before the result is saved or evaluated.

The checks look for:

- empty SQL output
- missing target table
- missing expected columns
- required SQL keywords inferred from the request:
  - `ALTER TABLE`
  - `UPDATE` when the request implies backfill or source-based population
  - `CREATE INDEX` when the request mentions an index

The output is stored in `validation`, which becomes part of the final bundle and is also used by the Promptfoo full-flow assertion.

```python
with trace("SchemaFlow Stage 5 SQL Sanity Checks", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "sql_sanity_checks"}):
    issues = []
    sql_lower = sql_text.lower()
    change_lower = CHANGE_TEXT.lower()
    if not sql_text.strip():
        issues.append("SQL output is empty")
    expected_schema = (change_json.get("target_schema") or "").strip()
    expected_table = (change_json.get("target_table") or "").strip()
    if expected_table and expected_table.lower() not in sql_lower:
        issues.append(f"Expected target table missing from SQL: {expected_table}")
    expected_columns = []
    for operation in change_json.get("operations", []):
        details = operation.get("details") if isinstance(operation, dict) else None
        if not isinstance(details, dict):
            continue
        for key in ["column", "column_name", "name"]:
            value = details.get(key)
            if isinstance(value, str) and value.strip():
                expected_columns.append(value.strip())
    for column in dict.fromkeys(expected_columns):
        if column.lower() not in sql_lower:
            issues.append(f"Expected column missing from SQL: {column}")
    required_keywords = ["ALTER TABLE"]
    if any(term in change_lower for term in ["backfill", "update", "source it from"]):
        required_keywords.append("UPDATE")
    if "index" in change_lower:
        required_keywords.append("CREATE INDEX")
    for keyword in dict.fromkeys(required_keywords):
        if keyword.lower() not in sql_lower:
            issues.append(f"Expected keyword missing: {keyword}")
    validation = {"valid": len(issues) == 0, "issues": issues, "checks": {"expected_schema": expected_schema or None, "expected_table": expected_table or None, "expected_columns": list(dict.fromkeys(expected_columns)), "required_keywords": list(dict.fromkeys(required_keywords))}}
    with guardrail_span("stage5_sql_sanity", triggered=not validation["valid"]):
        trace_function_result("Stage 5 SQL sanity result", output_obj=validation)
    flush_traces()
pretty(validation)
```
