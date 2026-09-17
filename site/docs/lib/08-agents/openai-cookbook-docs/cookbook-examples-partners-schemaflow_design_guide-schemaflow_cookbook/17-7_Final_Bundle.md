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
pageSha256: "be2c7557f2cf2b4bb01cc13a0446035a7c4203eff913d3b2828c8f5db6ff3639"
contentMode: "local-full"
zh: ""
---

## 7) Final Bundle

This section assembles the main SchemaFlow output object.

The final `bundle` contains:

- `summary`
- `rag`
- `change_json`
- `impact_json`
- `plan`
- `sql`
- `validation`

This object is the reviewable handoff artifact for the notebook run. It collects the model-generated outputs, deterministic validation results, and optional retrieval metadata in one place, so a reviewer does not have to reconstruct the flow from separate cells.

The printed summary gives a compact view of the most important run-level information:

- parsed title
- parsed target
- number of RAG hits
- number of plan steps
- validation status
- validation issues

```python
with trace("SchemaFlow Final Bundle", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "final_bundle"}):
    bundle = {
        "summary": {"matched_tables": [], "impact_risks": impact_json.get("risks", []), "rag_hits": len(rag_file_search_results)},
        "rag": {"vector_store_id": rag_vector_store_id, "file_search_results": rag_file_search_results},
        "change_json": change_json,
        "impact_json": impact_json,
        "plan": plan_json,
        "sql": sql_text,
        "validation": validation,
    }
    trace_function_result("Final bundle assembled", output_obj=bundle)
    flush_traces()
pretty({"title": change_json.get("title"), "target": ".".join([x for x in [change_json.get("target_schema"), change_json.get("target_table")] if x]), "rag_hits": len(rag_file_search_results), "plan_steps": len(plan_json.get("plan_steps", [])), "valid": validation.get("valid"), "issues": validation.get("issues", [])})
```
