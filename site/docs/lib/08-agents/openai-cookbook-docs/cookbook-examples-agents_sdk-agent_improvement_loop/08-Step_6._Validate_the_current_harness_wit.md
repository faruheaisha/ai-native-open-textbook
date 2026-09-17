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
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "707c5af5cf5edeb88b07b0fed58e340ed00173b09d33651ed928b08bddb9d564"
contentMode: "local-full"
zh: ""
---

## Step 6. Validate the current harness with Promptfoo

Promptfoo runs the generated tests against the current trace outputs. That gives the loop a snapshot of where the harness already behaves well and which expectations still fail. Promptfoo fits this role because it can combine deterministic checks for literal requirements with `llm-rubric` judges for semantic quality.

In this notebook, the Promptfoo gate scores existing trace outputs. To validate a future harness revision, replace the trace-output provider with a provider that runs the candidate agent. Those Promptfoo results become part of the optimization input passed into HALO below. Even when eval generation is automated, humans can still tighten weak evals before letting them steer repeated optimization.

### Build the Promptfoo test harness

The provider serves existing trace outputs back to Promptfoo, and the test builder turns generated eval definitions into runnable Promptfoo cases.

```python
PROMPTFOO_PROVIDER = r'''from __future__ import annotations

import json
from pathlib import Path

def call_api(prompt: str, options: dict, context: dict) -> dict:
    config = options.get("config", {})
    trace_outputs = json.loads(Path(config["trace_outputs_path"]).read_text(encoding="utf-8"))
    trace_id = (context.get("vars") or {}).get("trace_id")
    trace = trace_outputs[trace_id]
    return {
        "output": trace["answer"],
        "metadata": {
            "trace_id": trace_id,
            "question": trace["question"],
        },
    }
'''

def trace_for_eval(item: dict[str, Any], traces: list[TraceRecord]) -> TraceRecord:
    trace_by_id = {trace.trace_id: trace for trace in traces}
    try:
        return trace_by_id[item["source_trace_id"]]
    except KeyError as exc:
        raise ValueError(f"Unknown source_trace_id in generated eval: {item['source_trace_id']}") from exc

def promptfoo_test_from_eval(item: dict[str, Any], trace: TraceRecord) -> dict[str, Any]:
    assertions = [
        assertion
        for assertion in item.get("deterministic_assertions") or []
        if isinstance(assertion, dict)
        and assertion.get("type") in {"contains", "icontains", "not-contains"}
        and assertion.get("value")
    ]
    assertions.append({
        "type": "llm-rubric",
        "provider": f"openai:{JUDGE_MODEL}",
        "threshold": 0.8,
        "value": item["rubric"],
    })
    return {
        "description": item["title"],
        "vars": {
            "question": trace.question,
            "trace_id": trace.trace_id,
            "trace_label": trace.trace_label,
        },
        "metadata": {
            "eval_id": item["eval_id"],
            "scoring_method": item["scoring_method"],
        },
        "assert": assertions,
    }

def write_promptfoo_artifacts(eval_suite: list[dict[str, Any]], traces: list[TraceRecord]) -> dict[str, Path]:
    promptfoo_dir = ARTIFACT_DIR / "promptfoo"
    promptfoo_dir.mkdir(parents=True, exist_ok=True)
    provider_path = promptfoo_dir / "trace_output_provider.py"
    trace_outputs_path = promptfoo_dir / "trace_outputs.json"
    config_path = promptfoo_dir / "promptfooconfig.yaml"
    output_path = promptfoo_dir / "promptfoo_results.json"

    provider_path.write_text(PROMPTFOO_PROVIDER, encoding="utf-8")
    trace_outputs_path.write_text(
        json.dumps({trace.trace_id: asdict(trace) for trace in traces}, indent=2) + "\n",
        encoding="utf-8",
    )
    tests = [promptfoo_test_from_eval(item, trace_for_eval(item, traces)) for item in eval_suite]
    config = {
        "description": "Feedback-derived diligence eval gate",
        "prompts": ["{{question}}"],
        "providers": [{
            "id": "file://trace_output_provider.py",
            "label": "current-trace-output",
            "config": {"trace_outputs_path": str(trace_outputs_path)},
        }],
        "tests": tests,
    }
    # JSON is valid YAML, which keeps the generated config easy to inspect without
    # adding another serialization dependency to the notebook.
    config_path.write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    return {
        "dir": promptfoo_dir,
        "provider": provider_path,
        "trace_outputs": trace_outputs_path,
        "config": config_path,
        "output": output_path,
    }

def promptfoo_summary(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    results = (data.get("results") or {}).get("outputs") or (data.get("results") or {}).get("results") or []
    rows = []
    for result in results:
        grading = result.get("gradingResult") or {}
        components = grading.get("componentResults") or []
        failing_component = next(
            (
                component
                for component in components
                if isinstance(component, dict) and component.get("pass") is False
            ),
            None,
        )
        reason = str(grading.get("reason") or "")
        if not reason and failing_component:
            reason = str(failing_component.get("reason") or "")
        if not reason and components and isinstance(components[0], dict):
            reason = str(components[0].get("reason") or "")
        test_case = result.get("testCase") or {}
        test_vars = test_case.get("vars") or {}
        rows.append({
            "eval_id": (test_case.get("metadata") or {}).get("eval_id"),
            "title": test_case.get("description") or "Untitled",
            "trace_id": test_vars.get("trace_id"),
            "trace_label": test_vars.get("trace_label"),
            "passed": bool(result.get("success")),
            "score": result.get("score"),
            "explanation": reason,
        })
    return {
        "backend": "promptfoo",
        "total": len(rows),
        "passed": sum(row["passed"] for row in rows),
        "failed": sum(not row["passed"] for row in rows),
        "rows": rows,
    }
```

### Run the Promptfoo gate

Execute the generated suite and summarize the current harness result.

```python
def run_promptfoo_feedback_eval_gate(eval_suite: list[dict[str, Any]], traces: list[TraceRecord]) -> dict[str, Any]:
    artifacts = write_promptfoo_artifacts(eval_suite, traces)
    command = [
        "npx",
        "--yes",
        f"promptfoo@{PROMPTFOO_VERSION}",
        "eval",
        "--no-cache",
        "--no-table",
        "-c",
        str(artifacts["config"]),
        "-o",
        str(artifacts["output"]),
    ]
    env = os.environ.copy()
    env["PROMPTFOO_PYTHON"] = sys.executable
    env["PROMPTFOO_CONFIG_DIR"] = str(artifacts["dir"] / ".promptfoo")
    env["PROMPTFOO_DISABLE_WAL_MODE"] = "true"
    process = subprocess.run(
        command,
        cwd=artifacts["dir"],
        env=env,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    if not artifacts["output"].exists():
        raise RuntimeError(f"Promptfoo did not write results. Output:\n{process.stdout[-4000:]}")
    summary = promptfoo_summary(artifacts["output"])
    summary["command"] = command
    summary["returncode"] = process.returncode
    summary["result_path"] = str(artifacts["output"].relative_to(PROJECT_ROOT))
    summary["log_tail"] = process.stdout[-4000:]
    return summary

promptfoo_started = time.perf_counter()
gate_result = run_promptfoo_feedback_eval_gate(eval_suite, traces)
print(f"Promptfoo gate completed in {format_duration(time.perf_counter() - promptfoo_started)}")
display(Markdown(markdown_table(gate_result["rows"], ["title", "trace_label", "passed", "score", "explanation"])))
print({key: gate_result[key] for key in ["backend", "total", "passed", "failed", "result_path"]})
```

```text
Promptfoo gate completed in 9s
```

| title | trace_label | passed | score | explanation |
| --- | --- | --- | --- | --- |
| Runway and burn must be translated into near-term financing risk | trace-01 | True | 1 | All assertions passed |
| Revenue quality assessment must prefer finance-controlled ARR and preserve ARR contradictions | trace-02 | True | 1 | All assertions passed |
| Customer concentration must be assessed after parent-account rollups | trace-03 | True | 1 | All assertions passed |
| Enterprise security readiness must distinguish SOC 2 Type I from Type II | trace-04 | True | 1 | All assertions passed |
| Unsupported metrics must be refused rather than inferred | trace-05 | True | 1 | All assertions passed |

```text
{'backend': 'promptfoo', 'total': 5, 'passed': 5, 'failed': 0, 'result_path': 'examples/agents_sdk/agent_improvement_loop_artifacts/promptfoo/promptfoo_results.json'}
```
