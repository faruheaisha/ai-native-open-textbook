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
pageSha256: "c3bf6d34b5172fc0604f4ca5ad0f9a91f8fb0dc39790ef38ed3890455adfb199"
contentMode: "local-full"
zh: ""
---

## 9) Optional Cleanup

This section handles cleanup for the optional PDF vector store.

By default, `DELETE_VECTOR_STORE_AFTER_RUN = False`.

That default is safe for interactive notebook usage because the vector store is created with a one-day expiration policy. Keeping it temporarily can be useful if you want to inspect traces, rerun downstream stages, or debug File Search behavior.

Set `DELETE_VECTOR_STORE_AFTER_RUN = True` before running this cell if you want to delete the vector store immediately after the notebook run.

If no PDF was configured, this cell simply reports that no vector store was created.

```python
DELETE_VECTOR_STORE_AFTER_RUN = False
with trace("SchemaFlow Optional Cleanup", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata=_trace_metadata({"stage": "optional_cleanup", "delete_vector_store_after_run": DELETE_VECTOR_STORE_AFTER_RUN})):
    if rag_vector_store_id and DELETE_VECTOR_STORE_AFTER_RUN:
        with custom_span("Delete vector store", {"vector_store_id": rag_vector_store_id}):
            client.vector_stores.delete(vector_store_id=rag_vector_store_id)
        print("Deleted vector store:", rag_vector_store_id)
    elif rag_vector_store_id:
        trace_function_result("Vector store retained", output_obj={"vector_store_id": rag_vector_store_id, "expiration": "1 day"})
        print("Vector store retained with one-day expiration:", rag_vector_store_id)
    else:
        trace_function_result("No vector store cleanup", output_obj={"created": False})
        print("No vector store was created.")
    flush_traces()
```

---

### Pre-Promptfoo Checks / Guardrails

This cell is the readiness gate before running Promptfoo.

Promptfoo runs the workflow in a separate process, so it is important to confirm that the notebook state is complete and internally consistent before generating eval files.

The preflight checks verify that:

- `bundle` exists in the notebook kernel.
- `bundle` reflects the current `change_json` and `plan_json`.
- Stage 5 validation passed.
- Stages 1-2 guardrails passed.
- Stages 3-4 guardrails passed.
- The saved artifact sanity check passed.
- `CHANGE_TEXT` is consistent with the parsed bundle target.
- `OPENAI_API_KEY` is present.
- The installed Agents SDK version meets the minimum requirement.

If this section reports failures, rerun or fix the earlier notebook sections before running Promptfoo.

```python
# Pre-Promptfoo Checks / Guardrails - deterministic, no LLM calls.
import os
import re as _re
pre_promptfoo_checks = []
with trace("SchemaFlow Pre-Promptfoo Guardrails", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"stage": "pre_promptfoo_guardrails"}):
    def _check(name, ok, detail=""):
        ok = bool(ok)
        pre_promptfoo_checks.append({"name": name, "ok": ok, "detail": detail})
        with guardrail_span(name, triggered=not ok):
            trace_function_result(name + " detail", output_obj={"ok": ok, "detail": detail})
    _bundle = globals().get("bundle")
    _check("bundle_in_scope", isinstance(_bundle, dict) and "validation" in _bundle, f"keys={sorted(_bundle.keys()) if isinstance(_bundle, dict) else 'n/a'}")
    _check("bundle_in_sync_with_kernel", bundle.get("change_json") == change_json and bundle.get("plan") == plan_json, "bundle reflects current change_json + plan_json")
    _check("stage5_validation_passed", bool(validation.get("valid")), f"{len(validation.get('issues', []))} issue(s) recorded by Stage 5")
    _check("stages_1_2_guardrails_passed", bool(globals().get("stages_1_2_guardrails_passed", False)), "consumed from Stages 1-2 Output Guardrails cell")
    _check("stages_3_4_guardrails_passed", bool(globals().get("stages_3_4_guardrails_passed", False)), "consumed from Stages 3-4 Output Guardrails cell")
    _check("post_artifact_sanity_passed", bool(globals().get("post_artifact_sanity_passed", False)), "consumed from Post-Artifact Sanity Check cell")
    _target_match = _re.search(r"\b(?:to|from|in|on)\s+([A-Za-z_][\w$]*)\.([A-Za-z_][\w$]*)", CHANGE_TEXT, flags=_re.IGNORECASE)
    if _target_match:
        _live_target = _target_match.group(2).upper()
        _bundle_target = (bundle.get("change_json", {}).get("target_table") or "").upper()
        _check("change_text_consistent_with_bundle", _live_target == _bundle_target, f"live='{_live_target}', bundle='{_bundle_target}'")
    else:
        _check("change_text_consistent_with_bundle", True, "no extractable target in CHANGE_TEXT (skipped)")
    _check("openai_api_key_set_in_env", bool(os.getenv("OPENAI_API_KEY")), "present" if os.getenv("OPENAI_API_KEY") else "missing")
    _check("agents_sdk_min_version", _version_tuple(AGENTS_SDK_VERSION) >= _version_tuple(MIN_AGENTS_SDK_VERSION), f"found={AGENTS_SDK_VERSION}, required>={MIN_AGENTS_SDK_VERSION}")
    pre_promptfoo_passed = all(c["ok"] for c in pre_promptfoo_checks)
    trace_function_result("Pre-Promptfoo readiness summary", output_obj={"passed": pre_promptfoo_passed, "checks": pre_promptfoo_checks})
    flush_traces()
print("=" * 60)
print(f"Pre-Promptfoo Readiness: {'PASS' if pre_promptfoo_passed else 'FAIL'}")
print("=" * 60)
for _c in pre_promptfoo_checks:
    _flag = "OK  " if _c["ok"] else "FAIL"
    print(f"  [{_flag}] {_c['name']:35s} {_c['detail']}")
if not pre_promptfoo_passed:
    print()
    print("One or more readiness checks failed. Promptfoo will likely fail or eval stale state.")
    print("Investigate the failed checks above before running Section 10.")
```
