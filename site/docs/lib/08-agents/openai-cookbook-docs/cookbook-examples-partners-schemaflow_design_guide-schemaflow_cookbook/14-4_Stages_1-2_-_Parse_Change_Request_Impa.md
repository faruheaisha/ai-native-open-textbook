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
pageSha256: "483ec183fd8a305a41fa41fdc3420c551a42d9487f71605ff455d22db2cbea98"
contentMode: "local-full"
zh: ""
---

## 4) Stages 1-2 - Parse Change Request + Impact Analysis

This section runs the first two agent stages back to back. Together, they answer two practical questions: what exactly was requested, and what else could be affected?

### Stage 1: Parse Change Request

The Parse Agent converts `CHANGE_TEXT` into a structured `change_json` object.

Expected fields include:

- `title`
- `domain`
- `target_schema`
- `target_table`
- `operations`
- `notes`

This stage creates the normalized contract that every downstream stage consumes. If the parse step misses the target table, column, data type, nullability, backfill, or index intent, later stages may produce incomplete output. That is why the notebook validates this stage immediately afterward.

### Stage 2: Impact Analysis

The Impact Agent consumes `change_json` and produces `impact_json`.

Expected fields include:

- `impacted_objects`
- `risks`
- `assumptions`

If `PDF_PATH` was configured earlier, the Impact Agent also receives a `FileSearchTool` connected to the uploaded PDF vector store. This lets the model search reference documentation before returning impact claims.

The output is intentionally conservative. When the agent is uncertain, it should call out assumptions and risks instead of inventing undocumented certainty.

---

### Impact Dashboard Preview

The impact-analysis stage produces structured `impact_json` that can be visualized as a graph of affected objects and relationships.

The preview below shows the kind of customer loyalty lineage graph built in the optional Neo4j dashboard section later in the notebook. Run that section to generate the local graph UI from the sample knowledge-graph seed and inspect impacted objects interactively.

<img src="https://developers.openai.com/cookbook/assets/images/schemaflow_kbgraph-small.gif"
  alt="Impact dashboard graph preview"
  style="width: 100%; max-width: 500px;"
/>

```python
# =============================================================
# Stage 1 - Parse Change Request
# =============================================================
print("=" * 60)
print("Stage 1 - Parse Change Request")
print("=" * 60)
PARSE_SYSTEM = """
You are a precise information extraction system for database change requests.
Return STRICT JSON only (no prose, no code fences, no comments).
Required keys:
{
  "title": str,
  "domain": str|null,
  "target_schema": str|null,
  "target_table": str|null,
  "operations": [{"op": str, "details": object}],
  "notes": []
}
Rules:
- Use lowercase op names.
- If schema/table unknown, set null.
- Keep details explicit and typed where possible.
""".strip()
parse_user = "Change Request:\n\n" + CHANGE_TEXT
change_json, parse_agent_result = run_schemaflow_json_agent(name="SchemaFlow Parse Agent", instructions=PARSE_SYSTEM, prompt=parse_user, output_schema=CHANGE_OUTPUT_SCHEMA, workflow_name="SchemaFlow Stage 1 Parse", metadata={"stage": "parse_change_request"})
if isinstance(change_json, dict):
    change_json.setdefault("title", None)
    change_json.setdefault("domain", None)
    change_json.setdefault("target_schema", None)
    change_json.setdefault("target_table", None)
    if not isinstance(change_json.get("operations"), list):
        change_json["operations"] = [change_json.get("operations")] if change_json.get("operations") else []
    if not isinstance(change_json.get("notes"), list):
        change_json["notes"] = []
pretty(change_json)

# =============================================================
# Stage 2 - Impact Analysis
# =============================================================
print("\n" + "=" * 60)
print("Stage 2 - Impact Analysis")
print("=" * 60)
IMPACT_SYSTEM = """
You are a cautious impact analysis assistant.
Inputs:
- change_json: normalized change request.
- optional File Search context from an uploaded IFD/reference PDF.
Task:
Return JSON exactly as:
{
  "impacted_objects": [
    {"type":"table|column|fk|index|view","name":str,"reason":str,"source":"file_search|ifd|inference"}
  ],
  "risks": [str],
  "assumptions": [str]
}
Rules:
- Be conservative when uncertain.
- Call out data quality/backfill risks explicitly.
- If File Search context is available, use it to ground table, column, and downstream-impact claims.
""".strip()
impact_user_parts = ["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False)]
impact_tools = []
if rag_vector_store_id:
    impact_tools.append(FileSearchTool(vector_store_ids=[rag_vector_store_id], max_num_results=RAG_MAX_RESULTS, include_search_results=True))
    impact_user_parts.append("Use the file_search tool against the uploaded PDF to look for relevant IFD, schema, table, column, lineage, and downstream dependency context before returning JSON.")
impact_json, impact_agent_result = run_schemaflow_json_agent(name="SchemaFlow Impact Agent", instructions=IMPACT_SYSTEM, prompt="\n\n".join(impact_user_parts), output_schema=IMPACT_OUTPUT_SCHEMA, tools=impact_tools, workflow_name="SchemaFlow Stage 2 Impact Analysis", metadata={"stage": "impact_analysis", "rag_enabled": bool(rag_vector_store_id)})
impact_response = impact_agent_result
try:
    rag_file_search_results = agent_file_search_results(impact_agent_result)
except Exception as exc:
    rag_file_search_results = []
    print(f"File Search result summary skipped: {type(exc).__name__}: {exc}")
if rag_vector_store_id:
    print("File Search results returned:", len(rag_file_search_results))
    for i, result in enumerate(rag_file_search_results, start=1):
        print(f"{i}. {result.get('filename') or result.get('file_id')} score={result.get('score')}")
if isinstance(impact_json, dict):
    impact_json.setdefault("impacted_objects", [])
    impact_json.setdefault("risks", [])
    impact_json.setdefault("assumptions", [])
pretty(impact_json)
flush_traces()
```

---

### Stages 1-2 Output Guardrails

This guardrail cell performs deterministic checks on the Parse and Impact outputs before the workflow continues.

The checks verify that:

- `change_json` contains a target schema.
- `change_json` contains a target table.
- `change_json.operations` is a non-empty list.
- `impact_json.impacted_objects` contains at least one object.
- The impact output references the parsed target table.
- Each impacted object has basic required fields such as type, name, and reason.

These checks are deliberately lightweight. They do not prove that the analysis is complete, but they catch obvious failure modes before the Plan Agent or SQL Agent consumes malformed or incomplete state.

```python
# Stages 1-2 Output Guardrails - inspects change_json (Parse) and impact_json (Impact).
stages_1_2_guardrails = []
with trace("SchemaFlow Stages 1-2 Guardrails", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "stages_1_2_guardrails"}):
    def _check(name, ok, detail=""):
        ok = bool(ok)
        stages_1_2_guardrails.append({"name": name, "ok": ok, "detail": detail})
        with guardrail_span(name, triggered=not ok):
            trace_function_result(name + " detail", output_obj={"ok": ok, "detail": detail})

    _target_schema = (change_json.get("target_schema") or "").strip() if isinstance(change_json, dict) else ""
    _target_table = (change_json.get("target_table") or "").strip() if isinstance(change_json, dict) else ""
    _ops = change_json.get("operations") if isinstance(change_json, dict) else None
    _check("parse_output_well_formed", bool(_target_schema) and bool(_target_table) and isinstance(_ops, list) and len(_ops) > 0, f"target={_target_schema}.{_target_table}, ops={len(_ops or [])}")
    _impacted = impact_json.get("impacted_objects") if isinstance(impact_json, dict) else []
    _target_fqn = f"{_target_schema}.{_target_table}" if (_target_schema and _target_table) else ""
    _target_in_impact = any(isinstance(o, dict) and (o.get("name", "").upper() == _target_fqn.upper() or (_target_table and _target_table.upper() in o.get("name", "").upper())) for o in (_impacted or []))
    _check("impact_includes_target", bool(_impacted) and _target_in_impact, f"{len(_impacted or [])} impacted object(s), target_match={_target_in_impact}")
    _malformed = [i for i, o in enumerate(_impacted or []) if not (isinstance(o, dict) and o.get("type") and o.get("name") and o.get("reason"))]
    _check("impacted_objects_well_formed", not _malformed, "all populated" if not _malformed else f"missing fields at indices {_malformed[:5]}")
    stages_1_2_guardrails_passed = all(c["ok"] for c in stages_1_2_guardrails)
    trace_function_result("Stages 1-2 guardrails summary", output_obj={"passed": stages_1_2_guardrails_passed, "checks": stages_1_2_guardrails})
    flush_traces()
print(f"Stages 1-2 Output Guardrails: {'PASS' if stages_1_2_guardrails_passed else 'FAIL'}")
for _c in stages_1_2_guardrails:
    _flag = "OK  " if _c["ok"] else "FAIL"
    print(f"  [{_flag}] {_c['name']:35s} {_c['detail']}")
```
