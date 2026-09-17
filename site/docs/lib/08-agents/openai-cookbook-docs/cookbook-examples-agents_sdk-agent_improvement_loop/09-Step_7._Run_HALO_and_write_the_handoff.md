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
pageSha256: "a5aa91d2f47f53d6f8177777e4a103f2a130b0493016ed416976154365be148e"
contentMode: "local-full"
zh: ""
---

## Step 7. Run HALO and write the handoff

HALO, short for Hierarchical Agent Loop Optimization, is a methodology and Python package for improving agent harnesses from execution traces. The [HALO repository](https://github.com/context-labs/halo) describes a loop that collects traces, analyzes recurring harness-level failures, hands the resulting report to a coding agent, and repeats after the harness changes.

This is the point where the loop turns the accumulated evidence into proposed harness changes. HALO reviews the current harness together with the agent traces, human feedback, model feedback, generated evals, and Promptfoo results. It then produces a ranked set of changes for the next implementation pass.

The value of HALO here is that it reasons over the whole loop at once. It can use human judgment alongside runtime behavior and eval outcomes, then package the result as a handoff Codex can use to implement the code changes that improve the harness.

### Collect the HALO inputs

Build one context object that keeps the current harness, traces, feedback, evals, and gate results together.

```python
from datetime import datetime, timezone

def serialize_agent_config(config: AgentConfig) -> dict[str, Any]:
    return {
        "version": config.version,
        "system_prompt": config.system_prompt,
        "model_settings": asdict(config.model_settings),
        "tool_policy": config.tool_policy,
        "eval_metadata": config.eval_metadata,
    }

def build_halo_context(
    traces: list[TraceRecord],
    human_feedback: list[dict[str, Any]],
    llm_feedback: list[dict[str, Any]],
    eval_suite: list[dict[str, Any]],
    gate_result: dict[str, Any],
    agent_config: AgentConfig,
) -> dict[str, Any]:
    return {
        "traces": [asdict(trace) for trace in traces],
        "human_feedback": human_feedback,
        "llm_feedback": llm_feedback,
        "eval_suite": eval_suite,
        "gate_result": gate_result,
        "agent_config": serialize_agent_config(agent_config),
    }

def synthetic_trace_id(value: str) -> str:
    return hashlib.sha256(f"halo-context-{value}".encode("utf-8")).hexdigest()[:32]

def synthetic_span_id(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()[:16]

def synthetic_span(*, trace_id: str, span_id: str, name: str, observation_kind: str, attributes: dict[str, Any]) -> dict[str, Any]:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f000Z")
    return {
        "trace_id": trace_id,
        "span_id": span_id,
        "parent_span_id": "",
        "trace_state": "",
        "name": name,
        "kind": "SPAN_KIND_INTERNAL",
        "start_time": now,
        "end_time": now,
        "status": {"code": "STATUS_CODE_OK", "message": ""},
        "resource": {"attributes": {"service.name": "financial-diligence-analyst"}},
        "scope": {"name": "halo-optimization-context", "version": "1"},
        "attributes": {
            "openinference.span.kind": observation_kind,
            "inference.export.schema_version": 1,
            "inference.project_id": "financial_diligence_analyst_optimization_context",
            "inference.observation_kind": observation_kind,
            **attributes,
        },
    }

def halo_input_summary(context: dict[str, Any]) -> str:
    rows = [
        ("Current harness config", 1, "global config span", "system prompt, model settings, tool policy, eval metadata"),
        ("SDK execution traces", len(context["traces"]), "original runtime traces", "agent steps, tool calls, outputs"),
        ("Human feedback", len(context["human_feedback"]), "appended to the source trace", "reviewer summary, required observations, prohibited claims"),
        ("LLM feedback", len(context["llm_feedback"]), "appended to the source trace", "model-generated observations"),
        ("Generated eval definitions", len(context["eval_suite"]), "appended to the source trace", "expected behavior, rubric, pass/fail examples"),
        ("Promptfoo row results", len(context["gate_result"]["rows"]), "appended to the source trace", "pass/fail outcome and explanation"),
        ("Promptfoo gate summary", 1, "global summary span", "suite totals across all evals"),
    ]
    lines = [
        "### HALO input summary",
        "",
        "| Input signal | Count | Where it lives | What is included |",
        "| --- | ---: | --- | --- |",
    ]
    lines.extend(f"| {name} | {count} | {location} | {included} |" for name, count, location, included in rows)
    return "\n".join(lines)
```

### Attach feedback, generated evals, and eval results to the traces

Write the combined trace file that HALO will inspect. Human feedback, LLM feedback, generated eval definitions, and row-level Promptfoo results are attached to the matching runtime trace. The overall gate summary stays global because it describes the suite as a whole.

```python
def write_halo_optimization_context(context: dict[str, Any]) -> Path:
    context_path = ARTIFACT_DIR / "halo_optimization_context.jsonl"
    lines = HALO_TRACE_PATH.read_text(encoding="utf-8").splitlines() if HALO_TRACE_PATH.exists() else []
    lines.append(json.dumps(synthetic_span(
        trace_id=synthetic_trace_id("current-harness-config"),
        span_id=synthetic_span_id("current-harness-config"),
        name="harness.config",
        observation_kind="HARNESS_CONFIG",
        attributes={
            "harness.version": context["agent_config"]["version"],
            "harness.system_prompt": context["agent_config"]["system_prompt"],
            "harness.model_settings": json.dumps(context["agent_config"]["model_settings"]),
            "harness.tool_policy": json.dumps(context["agent_config"]["tool_policy"]),
            "harness.eval_metadata": json.dumps(context["agent_config"]["eval_metadata"]),
            "optimizer.signal_source": "harness_config",
        },
    )))
    for index, item in enumerate(context["human_feedback"]):
        lines.append(json.dumps(synthetic_span(
            trace_id=item["trace_id"],
            span_id=synthetic_span_id(f"human-feedback-{index}"),
            name="human_feedback.comment",
            observation_kind="HUMAN_FEEDBACK",
            attributes={
                "feedback.id": item["feedback_id"],
                "feedback.trace_id": item["trace_id"],
                "feedback.trace_label": item["trace_label"],
                "feedback.question": item["question"],
                "feedback.summary": item["summary"],
                "feedback.required_observations": json.dumps(item["required_observations"]),
                "feedback.prohibited_claims": json.dumps(item["prohibited_claims"]),
                "optimizer.signal_source": "human_feedback",
            },
        )))
    for index, item in enumerate(context["llm_feedback"]):
        lines.append(json.dumps(synthetic_span(
            trace_id=item["trace_id"],
            span_id=synthetic_span_id(f"llm-insight-{index}"),
            name="llm_feedback.insight",
            observation_kind="LLM_FEEDBACK",
            attributes={
                "llm_feedback.id": item["insight_id"],
                "llm_feedback.trace_id": item["trace_id"],
                "llm_feedback.trace_label": item["trace_label"],
                "llm_feedback.question": item["question"],
                "llm_feedback.observations": json.dumps(item["observations"]),
                "optimizer.signal_source": "llm_feedback",
            },
        )))
    for index, item in enumerate(context["eval_suite"]):
        lines.append(json.dumps(synthetic_span(
            trace_id=item["source_trace_id"],
            span_id=synthetic_span_id(f"generated-eval-{index}"),
            name="generated_eval.definition",
            observation_kind="EVAL",
            attributes={
                "eval.id": item["eval_id"],
                "eval.trace_id": item["source_trace_id"],
                "eval.trace_label": item["source_trace_label"],
                "eval.title": item["title"],
                "eval.method": item["scoring_method"],
                "eval.expected_behavior": item["expected_behavior"],
                "eval.pass_example": item["suggested_pass_example"],
                "eval.fail_example": item["suggested_fail_example"],
                "optimizer.signal_source": "generated_eval",
            },
        )))
    lines.append(json.dumps(synthetic_span(
        trace_id=synthetic_trace_id("eval-gate-summary"),
        span_id=synthetic_span_id("eval-gate-summary"),
        name="eval_gate.summary",
        observation_kind="EVAL_RESULT",
        attributes={
            "eval_gate.total": context["gate_result"]["total"],
            "eval_gate.passed": context["gate_result"]["passed"],
            "eval_gate.failed": context["gate_result"]["failed"],
            "optimizer.signal_source": "eval_gate",
        },
    )))
    for index, item in enumerate(context["gate_result"]["rows"]):
        lines.append(json.dumps(synthetic_span(
            trace_id=item["trace_id"],
            span_id=synthetic_span_id(f"eval-gate-row-{index}"),
            name="eval_gate.result",
            observation_kind="EVAL_RESULT",
            attributes={
                "eval.id": item["eval_id"],
                "eval.title": item["title"],
                "eval.trace_id": item["trace_id"],
                "eval.trace_label": item["trace_label"],
                "eval.passed": item["passed"],
                "eval.explanation": item["explanation"],
                "optimizer.signal_source": "eval_gate",
            },
        )))
    context_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    return context_path
```

### Define the HALO output prompt

This prompt tells HALO what kind of report to produce, including the sections Codex should receive in the final handoff file. You can customize it to match your company's workflow, review process, or use case.

```python
def render_halo_prompt() -> str:
    return """
Analyze the financial diligence analyst optimization context as the central source of truth.
The JSONL contains the current harness configuration, agent execution traces, human feedback, LLM insights, generated eval definitions, and eval-gate results.
Treat human feedback as first-class evidence.
Before recommending a change, compare the evidence against the current harness config and distinguish:
- a requirement that is missing from the harness,
- a requirement already present but not reliably followed in execution, and
- an implementation or observability defect.

Write an implementation-first Codex handoff in this exact top-level order:
1. `## Executive summary`
2. `## Top 3 changes to implement first`
3. `## Ranked recommendation table`
4. `## Supporting diagnosis and evidence`
5. `## Detailed recommendations`
6. `## Insights by feedback source`
7. `## Machine-readable summary`

Section requirements:
- `## Executive summary`: briefly state what the current harness already does well, what the highest-value remaining gaps are, and whether the current eval gate passed.
- `## Top 3 changes to implement first`: list the three most valuable implementation moves with concise rationale.
- `## Ranked recommendation table`: include rank, recommendation, impact, confidence, implementation effort, evidence, and validation.
- `## Supporting diagnosis and evidence`: include recurring harness-level failure modes, classify each against the current harness as missing requirement vs already-present-but-not-reliably-followed vs implementation/observability defect, and state the evidence source for each.
- `## Detailed recommendations`: use these exact subsection headings in this order and do not use the word "owner" in them:
  - `### Behavior contract`
    - `#### Prompt`
    - `#### Skills`
  - `### Runtime implementation`
    - `#### Tools`
    - `#### Control flow`
    - `#### Routing`
  - `### Output contract`
    - `#### Artifact schema`
  - `### Observability and evals`
    - `#### Observability`
    - `#### Evals`
- `## Insights by feedback source`: summarize what came from traces, human feedback, LLM feedback, generated evals, eval-gate results, and harness config.
- `## Machine-readable summary`: include one fenced JSON block with `top_priorities`.

Do not add extra top-level sections outside that order.
""".strip()
```

### Run HALO and format the report

HALO receives the five SDK execution traces plus two synthetic global traces: one records the current harness config, and one records the Promptfoo gate summary. That is why its trace count is higher than the five agent runs created earlier.

Generate the full optimization report, save the handoff artifact, and display the highest-priority recommendations in the notebook.

```python
async def run_halo_optimization(context_path: Path) -> str:
    from agents import set_trace_processors
    from engine.agents.agent_config import AgentConfig as HaloAgentConfig
    from engine.engine_config import EngineConfig
    from engine.main import stream_engine_async
    from engine.sandbox.sandbox import Sandbox
    from engine.model_config import ModelConfig
    from engine.models.engine_output import AgentOutputItem, AgentTextDelta
    from engine.models.messages import AgentMessage

    # HALO's current CLI wrapper sets compaction temperature to 0.0, which is not
    # accepted by GPT-5-class models. Use the Python API so the compactor uses the
    # model default-compatible temperature while preserving the requested model.
    agent = HaloAgentConfig(
        name="root",
        model=ModelConfig(name=HALO_MODEL),
        maximum_turns=20,
    )
    config = EngineConfig(
        root_agent=agent,
        subagent=agent.model_copy(update={"name": "sub"}),
        synthesis_model=ModelConfig(name=HALO_MODEL),
        compaction_model=ModelConfig(name=HALO_MODEL, temperature=1.0),
        maximum_depth=1,
        maximum_parallel_subagents=2,
    )

    # The notebook already exports the SDK traces locally; HALO does not need
    # hosted trace ingestion for this diagnosis pass.
    set_trace_processors([])

    deltas: list[str] = []
    final_items: list[str] = []
    messages = [AgentMessage(role="user", content=render_halo_prompt())]

    # This pass only needs HALO's trace-analysis tools. Skip the optional
    # `run_code` sandbox so readers do not need a separate Deno/Pyodide setup
    # just to generate the optimization report.
    async def report_progress(done: asyncio.Event, interval_seconds: int = 30) -> None:
        started = time.perf_counter()
        print("HALO optimization started. This is usually the longest cell in the notebook.")
        while not done.is_set():
            try:
                await asyncio.wait_for(done.wait(), timeout=interval_seconds)
            except TimeoutError:
                print(f"HALO still running... {format_duration(time.perf_counter() - started)} elapsed")

    original_sandbox_get = Sandbox.__dict__["get"]
    Sandbox.get = classmethod(lambda cls: None)
    halo_started = time.perf_counter()
    progress_done = asyncio.Event()
    progress_task = asyncio.create_task(report_progress(progress_done))
    try:
        async for event in stream_engine_async(messages, config, context_path):
            if isinstance(event, AgentTextDelta):
                deltas.append(event.text_delta)
            elif isinstance(event, AgentOutputItem) and event.final:
                final_items.append(str(event.item))
    finally:
        progress_done.set()
        await progress_task
        Sandbox.get = original_sandbox_get

    print(f"HALO optimization completed in {format_duration(time.perf_counter() - halo_started)}")
    report = "".join(deltas).strip() or "\n\n".join(final_items).strip()
    if not report:
        raise RuntimeError("HALO completed without producing a report.")
    return report

def clean_halo_handoff(report: str) -> str:
    """Keep only the final Codex-facing handoff sections from HALO output."""
    normalized = re.sub(r"(?<!\n)(## Executive summary)", r"\n\n\1", report).strip()
    start = normalized.rfind("## Executive summary")
    if start == -1:
        raise ValueError("HALO output did not include the expected executive summary section.")

    handoff = normalized[start:].strip()
    required_headings = [
        "## Executive summary",
        "## Top 3 changes to implement first",
        "## Ranked recommendation table",
        "## Supporting diagnosis and evidence",
        "## Detailed recommendations",
        "## Insights by feedback source",
        "## Machine-readable summary",
    ]
    missing = [heading for heading in required_headings if heading not in handoff]
    if missing:
        raise ValueError(f"HALO handoff is missing required sections: {missing}")
    return handoff

def write_halo_handoff(report: str, path: str | Path) -> Path:
    target = Path(path)
    if not target.is_absolute():
        target = PROJECT_ROOT / target
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(report.rstrip() + "\n", encoding="utf-8")
    return target

halo_context = build_halo_context(traces, human_feedback, llm_feedback, eval_suite, gate_result, agent_config)
display(Markdown(halo_input_summary(halo_context)))
halo_context_path = write_halo_optimization_context(halo_context)
halo_report = await run_halo_optimization(halo_context_path)
clean_handoff = clean_halo_handoff(halo_report)

handoff_path = write_halo_handoff(clean_handoff, ARTIFACT_DIR / "codex_handoff.md")

def extract_named_section(report: str, heading: str) -> str:
    if heading not in report:
        return ""
    start = report.index(heading)
    remainder = report[start + len(heading):]
    next_section = re.search(r"\n## ", remainder)
    return report[start:] if next_section is None else report[start:start + len(heading) + next_section.start()]

def render_notebook_halo_summary(report: str) -> str:
    sections = [
        extract_named_section(report, "## Top 3 changes to implement first"),
        extract_named_section(report, "## Insights by feedback source"),
    ]
    rendered = "\n\n".join(section.strip() for section in sections if section.strip())
    return rendered or report

print("Gate result passed into optimization context:", "gate_result" in halo_context)
print("Wrote:")
print("-", halo_context_path.relative_to(PROJECT_ROOT))
print("-", handoff_path.relative_to(PROJECT_ROOT))
```

### HALO input summary

| Input signal | Count | Where it lives | What is included |
| --- | ---: | --- | --- |
| Current harness config | 1 | global config span | system prompt, model settings, tool policy, eval metadata |
| SDK execution traces | 5 | original runtime traces | agent steps, tool calls, outputs |
| Human feedback | 5 | appended to the source trace | reviewer summary, required observations, prohibited claims |
| LLM feedback | 5 | appended to the source trace | model-generated observations |
| Generated eval definitions | 5 | appended to the source trace | expected behavior, rubric, pass/fail examples |
| Promptfoo row results | 5 | appended to the source trace | pass/fail outcome and explanation |
| Promptfoo gate summary | 1 | global summary span | suite totals across all evals |

```text
HALO optimization started. This is usually the longest cell in the notebook.
HALO still running... 30s elapsed
HALO still running... 1m 00s elapsed
HALO still running... 1m 30s elapsed
HALO still running... 2m 00s elapsed
HALO still running... 2m 30s elapsed
HALO still running... 3m 00s elapsed
HALO still running... 3m 30s elapsed
HALO still running... 4m 00s elapsed
HALO still running... 4m 30s elapsed
HALO still running... 5m 00s elapsed
HALO still running... 5m 30s elapsed
HALO still running... 6m 00s elapsed
HALO still running... 6m 30s elapsed
HALO still running... 7m 00s elapsed
HALO optimization completed in 7m 15s
Gate result passed into optimization context: True
Wrote:
- examples/agents_sdk/agent_improvement_loop_artifacts/halo_optimization_context.jsonl
- examples/agents_sdk/agent_improvement_loop_artifacts/codex_handoff.md
```
