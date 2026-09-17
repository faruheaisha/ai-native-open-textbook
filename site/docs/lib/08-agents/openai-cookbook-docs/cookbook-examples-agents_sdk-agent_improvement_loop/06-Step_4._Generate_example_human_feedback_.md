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
pageSha256: "5de55a610288c26632136fa8e5176868b23139d53f860dfc3afe2eba9e7f97bd"
contentMode: "local-full"
zh: ""
---

## Step 4. Generate example human feedback and model insights

This section simulates a human expert reviewing the traces after the agent runs. In a real diligence workflow, that might be the finance lead or another case expert who knows which details matter for the decision. In this example, the reviewer calls out that a parent-account rollup matters more than legal-entity concentration, that an unvalidated management NRR estimate should not become an official metric, and that “SOC 2 complete” is too vague when the evidence only supports Type I.

The model-generated insights stay separate. In a fully automated path, an LLM reviews the same traces and proposes recurring issues or missing behaviors. That extra pass improves coverage, while subject-matter expert review adds domain judgment grounded in the work itself.

````python
def feedback_item(
    trace: TraceRecord,
    summary: str,
    required: list[str],
    prohibited: list[str],
    theme: str,
) -> dict[str, Any]:
    return {
        "feedback_id": f"human-{trace.trace_label}",
        "trace_id": trace.trace_id,
        "trace_label": trace.trace_label,
        "question": trace.question,
        "source_type": "human_feedback",
        "theme": theme,
        "summary": summary,
        "required_observations": required,
        "prohibited_claims": prohibited,
    }

def generate_mock_human_feedback(traces: list[TraceRecord]) -> list[dict[str, Any]]:
    specs_by_question = {
        "What do runway and burn tell us about near-term financing risk?": (
            "State both the 11-month runway and rising burn as financing risk, not just a generic red flag.",
            ["Name the 11-month runway", "Tie burn to near-term financing pressure"],
            ["Do not imply the company has more than 12 months of runway"],
            "financial_risk",
        ),
        "How strong is revenue quality, and which ARR figure should we rely on?": (
            "Use the controlled ARR bridge as the reliable figure and preserve the board-versus-finance contradiction.",
            ["Prefer finance ARR over board ARR", "Preserve the ARR contradiction"],
            ["Do not silently reconcile the ARR gap"],
            "revenue_quality",
        ),
        "What is the real customer concentration risk after parent-account rollups?": (
            "Roll concentration up to Northstar Holdings. Legal-entity framing understates the real dependency.",
            ["Mention parent-account concentration", "Use account_hierarchy.csv"],
            ["Do not stop at legal-entity concentration"],
            "customer_concentration",
        ),
        "How ready is the company for enterprise security review?": (
            "Be exact about certification status: Type I is complete; Type II is still in progress.",
            ["Distinguish Type I from Type II", "Treat sales FAQ as weaker evidence"],
            ["Do not say SOC 2 is simply complete"],
            "security_readiness",
        ),
        "What unsupported metrics should we refuse to infer from the dataroom?": (
            "Refuse official NRR and CAC payback when the dataroom does not support them.",
            ["Mark official NRR unsupported", "Mark CAC payback unsupported"],
            ["Do not promote the management NRR estimate into an official metric"],
            "unsupported_metrics",
        ),
    }
    return [feedback_item(trace, *specs_by_question[trace.question]) for trace in traces]

def extract_json(text: str) -> Any:
    text = text.strip()
    fenced = re.search(r"```(?:json)?\s*(.*?)```", text, flags=re.DOTALL)
    candidate = fenced.group(1).strip() if fenced else text
    return json.loads(candidate)

def generate_llm_feedback(traces: list[TraceRecord]) -> list[dict[str, Any]]:
    payload = [asdict(trace) for trace in traces]
    response = client.responses.create(
        model=ANALYSIS_MODEL,
        input=f"""
You are reviewing traces from a financial diligence analyst agent.
Return JSON only: a list of objects with keys `insight_id`, `trace_id`, `question`, `source_type`, and `observations`.
Use `source_type` = `llm_insight`.
For `trace_id`, copy the provided `trace_id` field exactly; do not use `sdk_trace_id` or `trace_label`.
For each trace, identify concise recurring-behavior observations that could help generate evals later.
Do not restate the whole answer. Do not invent unavailable evidence.

Traces:
{json.dumps(payload, indent=2)}
""".strip(),
    )
    parsed = extract_json(response.output_text)
    if not isinstance(parsed, list):
        raise ValueError("Expected a JSON list of LLM insights.")
    trace_labels = {trace.trace_id: trace.trace_label for trace in traces}
    for item in parsed:
        try:
            item["trace_label"] = trace_labels[item["trace_id"]]
        except KeyError as exc:
            raise ValueError(f"Unknown trace_id in LLM feedback: {item['trace_id']}") from exc
    return parsed

feedback_started = time.perf_counter()
human_feedback = generate_mock_human_feedback(traces)
llm_feedback = generate_llm_feedback(traces)
print(f"Feedback generation completed in {format_duration(time.perf_counter() - feedback_started)}")
assert len(human_feedback) == TRACE_LIMIT
assert len(llm_feedback) == TRACE_LIMIT

print("Human feedback items:", len(human_feedback))
print("LLM insight items:", len(llm_feedback))
print("\nExample human feedback:")
print(json.dumps(human_feedback[0], indent=2))
print("\nExample LLM insight:")
print(json.dumps(llm_feedback[0], indent=2))
````

```text
Feedback generation completed in 13s
Human feedback items: 5
LLM insight items: 5

Example human feedback:
{
  "feedback_id": "human-trace-01",
  "trace_id": "43d9b03619a9d2ed4d2f3e3fd17c8bf4",
  "trace_label": "trace-01",
  "question": "What do runway and burn tell us about near-term financing risk?",
  "source_type": "human_feedback",
  "theme": "financial_risk",
  "summary": "State both the 11-month runway and rising burn as financing risk, not just a generic red flag.",
  "required_observations": [
    "Name the 11-month runway",
    "Tie burn to near-term financing pressure"
  ],
  "prohibited_claims": [
    "Do not imply the company has more than 12 months of runway"
  ]
}

Example LLM insight:
{
  "insight_id": "llm_insight_01",
  "trace_id": "43d9b03619a9d2ed4d2f3e3fd17c8bf4",
  "question": "What do runway and burn tell us about near-term financing risk?",
  "source_type": "llm_insight",
  "observations": [
    "Flags elevated financing risk when runway is under 12 months and monthly burn is cited from finance and board sources.",
    "Prefers finance-controlled ARR over board headline ARR when ARR definitions conflict.",
    "Explicitly identifies missing liquidity data such as cash balance, debt availability, covenants, and financing plan.",
    "Includes source citations for key numeric claims and notes validation/artifact completion."
  ],
  "trace_label": "trace-01"
}
```
