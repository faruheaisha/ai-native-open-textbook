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
pageSha256: "2ed12eb1c397f574af22472f6941e6d2eda09d6df5c2b791e9ba8103b305edbe"
contentMode: "local-full"
zh: ""
---

## 5) Stages 3-4 - Execution Plan + SQL Generation

This section runs the implementation-planning and SQL-generation stages. At this point the workflow shifts from understanding the request to drafting an implementation handoff.

### Stage 3: Execution Plan

The Plan Agent consumes:

- `change_json`
- `impact_json`

It returns `plan_json` with four sections:

- `plan_steps`
- `prechecks`
- `postchecks`
- `rollback`

The goal is to make the implementation strategy explicit before generating SQL. This helps separate “what should be done” from “what exact SQL should be drafted.”

### Stage 4: SQL Generation

The SQL Agent consumes:

- `change_json`
- `plan_json`

It returns a single plaintext SQL script. The prompt requires four sections in order:

1. `-- === LANDING (ODS) ===`
2. `-- === STAGING (STG) ===`
3. `-- === CORE (DIM/FACT/VIEW) ===`
4. `-- === MARTS (SERVING) ===`

The generated SQL is intended as a reviewable draft. It should be checked by engineers before any production use.

```python
# =============================================================
# Stage 3 - Execution Plan
# =============================================================
print("=" * 60)
print("Stage 3 - Execution Plan")
print("=" * 60)
PLAN_SYSTEM = """
You are a senior data engineer creating a safe execution plan.
Inputs:
- change_json
- impact_json
Return JSON:
{
  "plan_steps": [{"id": "str", "description": "str"}],
  "prechecks": [str],
  "postchecks": [str],
  "rollback": [str]
}
Guidance:
- Include practical pre/post checks.
- Keep steps executable and concise.
""".strip()
plan_user = "\n\n".join(["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False), "IMPACT_JSON:\n" + json.dumps(impact_json, ensure_ascii=False)])
plan_json, plan_agent_result = run_schemaflow_json_agent(name="SchemaFlow Plan Agent", instructions=PLAN_SYSTEM, prompt=plan_user, output_schema=PLAN_OUTPUT_SCHEMA, workflow_name="SchemaFlow Stage 3 Execution Plan", metadata={"stage": "execution_plan"})
if isinstance(plan_json, dict):
    plan_json.setdefault("plan_steps", [])
    plan_json.setdefault("prechecks", [])
    plan_json.setdefault("postchecks", [])
    plan_json.setdefault("rollback", [])
pretty(plan_json)

# =============================================================
# Stage 4 - SQL Generation
# =============================================================
print("\n" + "=" * 60)
print("Stage 4 - SQL Generation")
print("=" * 60)
SQL_SYSTEM = """
You are a senior data engineer producing SQL for multi-layer data stacks.
Output a SINGLE plaintext script with FOUR sections in order:
1) -- === LANDING (ODS) ===
2) -- === STAGING (STG) ===
3) -- === CORE (DIM/FACT/VIEW) ===
4) -- === MARTS (SERVING) ===

Rules:
- PostgreSQL dialect.
- Prefer idempotent DDL where possible.
- Propagate requested changes through downstream layers.
- Include concise assumptions as comments.
""".strip()
sql_user = "\n\n".join(["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False), "PLAN_JSON:\n" + json.dumps(plan_json, ensure_ascii=False)])
sql_text, sql_agent_result = run_schemaflow_text_agent(name="SchemaFlow SQL Agent", instructions=SQL_SYSTEM, prompt=sql_user, workflow_name="SchemaFlow Stage 4 SQL Generation", metadata={"stage": "sql_generation"})
print(sql_text[:5000])
flush_traces()
```

---

### Stages 3-4 Output Guardrails

This guardrail cell validates the plan and SQL draft before the notebook moves to the final SQL sanity checks.

The checks verify that:

- all four plan sections are populated:
  - `plan_steps`
  - `prechecks`
  - `postchecks`
  - `rollback`
- the data type requested in `CHANGE_TEXT` appears in the generated SQL
- nullable requests do not accidentally create `NOT NULL` constraints
- explicit `NOT NULL` requests are reflected when present

These checks complement Stage 5. Stages 3-4 guardrails focus on plan completeness and semantic consistency, while Stage 5 focuses on expected SQL terms and actions.

```python
# Stages 3-4 Output Guardrails - inspects plan_json (Plan) and sql_text (SQL).
import re as _re
stages_3_4_guardrails = []
with trace("SchemaFlow Stages 3-4 Guardrails", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "stages_3_4_guardrails"}):
    def _check(name, ok, detail=""):
        ok = bool(ok)
        stages_3_4_guardrails.append({"name": name, "ok": ok, "detail": detail})
        with guardrail_span(name, triggered=not ok):
            trace_function_result(name + " detail", output_obj={"ok": ok, "detail": detail})

    _plan = plan_json if isinstance(plan_json, dict) else {}
    _plan_missing = [k for k in ["plan_steps", "prechecks", "postchecks", "rollback"] if not _plan.get(k)]
    _check("plan_sections_populated", not _plan_missing, "all four populated" if not _plan_missing else f"empty: {_plan_missing}")
    _dtype_match = _re.search(r"\b(?:add\s+\w+\s+|column\s+\w+\s+)((?:VAR)?CHAR\s*\([^)]*\)|TEXT|INTEGER|INT|BIGINT|BOOLEAN|DATE|TIMESTAMP|NUMERIC\s*\([^)]*\)|DECIMAL\s*\([^)]*\)|FLOAT|DOUBLE)", CHANGE_TEXT, flags=_re.IGNORECASE)
    if _dtype_match:
        _dtype = " ".join(_dtype_match.group(1).upper().split())
        _check("data_type_propagated_to_sql", _dtype.lower() in sql_text.lower(), f"expected '{_dtype}' in SQL")
    else:
        _check("data_type_propagated_to_sql", True, "no data type referenced in CHANGE_TEXT (skipped)")
    _change_lower = CHANGE_TEXT.lower()
    _sql_lower = sql_text.lower()
    _expected_cols = []
    for _op in (change_json.get("operations") if isinstance(change_json, dict) else []) or []:
        _details = _op.get("details") if isinstance(_op, dict) else None
        if isinstance(_details, dict):
            for _key in ("column", "column_name", "name"):
                _val = _details.get(_key)
                if isinstance(_val, str) and _val.strip():
                    _expected_cols.append(_val.strip().lower())
    if "not null" in _change_lower:
        _check("nullability_matches_request", "not null" in _sql_lower, "request: NOT NULL")
    elif "nullable" in _change_lower:
        _ddl_lines = []
        for line in sql_text.split("\n"):
            _line = line.strip().lower()
            if not any(c in _line for c in _expected_cols):
                continue
            if "add column" in _line or any(_line.startswith(c + " ") or _line.startswith(c + "\t") for c in _expected_cols):
                _ddl_lines.append(line.strip())
        _bad_lines = [line for line in _ddl_lines if "not null" in line.lower()]
        _check("nullability_matches_request", not _bad_lines, "no NOT NULL on nullable column DDL" if not _bad_lines else f"NOT NULL conflict in {len(_bad_lines)} DDL line(s)")
    else:
        _check("nullability_matches_request", True, "no explicit nullability requested (skipped)")
    stages_3_4_guardrails_passed = all(c["ok"] for c in stages_3_4_guardrails)
    trace_function_result("Stages 3-4 guardrails summary", output_obj={"passed": stages_3_4_guardrails_passed, "checks": stages_3_4_guardrails})
    flush_traces()
print(f"Stages 3-4 Output Guardrails: {'PASS' if stages_3_4_guardrails_passed else 'FAIL'}")
for _c in stages_3_4_guardrails:
    _flag = "OK  " if _c["ok"] else "FAIL"
    print(f"  [{_flag}] {_c['name']:35s} {_c['detail']}")
```
