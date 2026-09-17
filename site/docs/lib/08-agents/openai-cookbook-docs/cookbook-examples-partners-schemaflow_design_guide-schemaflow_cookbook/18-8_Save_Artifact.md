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
pageSha256: "07d825174f4a83d159b7f35254d2ed54ab356228aea50a08950ed98ef5c04fad"
contentMode: "local-full"
zh: ""
---

## 8) Save Artifact

This section writes the final `bundle` to disk as JSON.

Artifacts are saved under:

```text
artifacts/notebook_runs/
```

Each run receives a timestamped filename, which makes it easy to compare outputs across different prompts, models, inputs, or retrieval documents.

The saved artifact is useful for:

- code review
- audit trails
- debugging
- regression comparison
- eval fixture creation
- downstream automation

```python
from pathlib import Path
with trace("SchemaFlow Save Artifact", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "save_artifact"}):
    out_dir = Path("artifacts/notebook_runs")
    out_dir.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_path = out_dir / f"schemaflow_cookbook_run_{ts}.json"
    out_path.write_text(json.dumps(bundle, indent=2, ensure_ascii=False), encoding="utf-8")
    trace_function_result("Notebook artifact saved", input_obj={"bundle_keys": sorted(bundle.keys())}, output_obj={"path": str(out_path.resolve()), "bytes": out_path.stat().st_size})
    flush_traces()
print("Saved artifact:", out_path.resolve())
```

---

### Post-Artifact Generation Sanity Check

This cell verifies that the saved artifact is usable.

It checks that:

- the artifact file exists
- the artifact file is non-empty
- the file can be loaded with `json.loads`
- the top-level keys on disk match the in-memory `bundle`

This catches file-write issues immediately instead of letting a later review, eval, or automation step consume a missing or malformed artifact.

```python
# Post-Artifact Generation Sanity Check - re-reads the file Save Artifact wrote.
post_artifact_checks = []
with trace("SchemaFlow Post-Artifact Guardrails", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "post_artifact_guardrails"}):
    def _check(name, ok, detail=""):
        ok = bool(ok)
        post_artifact_checks.append({"name": name, "ok": ok, "detail": detail})
        with guardrail_span(name, triggered=not ok):
            trace_function_result(name + " detail", output_obj={"ok": ok, "detail": detail})
    _size = out_path.stat().st_size if out_path.exists() else 0
    _check("artifact_file_persisted", out_path.exists() and _size > 0, f"{_size} bytes")
    if out_path.exists():
        try:
            _roundtrip = json.loads(out_path.read_text(encoding="utf-8"))
            _check("artifact_roundtrip_keys_match", set(_roundtrip.keys()) == set(bundle.keys()), f"disk_keys={sorted(_roundtrip.keys())}")
        except Exception as _exc:
            _check("artifact_roundtrip_keys_match", False, str(_exc))
    else:
        _check("artifact_roundtrip_keys_match", False, "saved file missing")
    post_artifact_sanity_passed = all(c["ok"] for c in post_artifact_checks)
    trace_function_result("Post-artifact guardrails summary", output_obj={"passed": post_artifact_sanity_passed, "checks": post_artifact_checks})
    flush_traces()
print(f"Post-Artifact Sanity Check: {'PASS' if post_artifact_sanity_passed else 'FAIL'}")
for _c in post_artifact_checks:
    _flag = "OK  " if _c["ok"] else "FAIL"
    print(f"  [{_flag}] {_c['name']:30s} {_c['detail']}")
```
