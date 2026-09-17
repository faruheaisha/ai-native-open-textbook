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
pageSha256: "9bf6427711b9789ef76d5d4591b3b32e94c640051ea6793c5155c88265f166df"
contentMode: "local-full"
zh: ""
---

## Step 5. Generate Promptfoo evals from traces and feedback

The eval suite is generated dynamically by an LLM from the evidence collected so far: traced behavior, human feedback, and model-generated observations. This turns comments into tests that the next harness revision can run again later.

Promptfoo is an open-source CLI and library for evaluating and red-teaming LLM applications. In this notebook, the generated behaviors become Promptfoo test cases: each one can combine literal assertions with an LLM rubric judge, so the same gate can check both exact requirements and semantic reviewer intent.

Evals are a good place to invest manual effort from subject-matter experts and developers. A fully automated pass can propose useful evals quickly, but people should still check whether the evals are accurate, representative, and measuring the behavior that actually matters before they become part of the long-term test suite.

```python
def generate_feedback_derived_evals(
    traces: list[TraceRecord],
    human_feedback: list[dict[str, Any]],
    llm_feedback: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    min_eval_count = min(5, max(2, len(traces)))
    max_eval_count = min(7, max(min_eval_count, len(traces) + 2))
    response = client.responses.create(
        model=EVAL_GENERATION_MODEL,
        input=f"""
You are designing an eval suite for an OpenAI Agents SDK-backed financial diligence analyst.
Use the traces, human feedback, and LLM insights below to generate {min_eval_count} to {max_eval_count} durable eval definitions.
Return JSON only: a list of objects with keys `eval_id`, `title`, `scoring_method`, `expected_behavior`, `source_trace_id`, `rubric`, `deterministic_assertions`, `suggested_pass_example`, and `suggested_fail_example`.
`scoring_method` must be one of `deterministic`, `llm_judge`, or `hybrid`.
`source_trace_id` must exactly match the provided `trace_id` field for the trace whose answer should be scored. Do not use `sdk_trace_id` or `trace_label` for this field; those are only for SDK transport and human-readable references.
`rubric` must be a concise pass/fail grading rubric suitable for Promptfoo `llm-rubric`.
`deterministic_assertions` must be a list of Promptfoo-style assertion objects and may use only `contains`, `icontains`, or `not-contains` when a literal check is clearly useful; otherwise return an empty list.
Prefer reusable behaviors over one-off trace restatements.

Traces:
{json.dumps([asdict(trace) for trace in traces], indent=2)}

Human feedback:
{json.dumps(human_feedback, indent=2)}

LLM insights:
{json.dumps(llm_feedback, indent=2)}
""".strip(),
    )
    parsed = extract_json(response.output_text)
    if not isinstance(parsed, list):
        raise ValueError("Expected a JSON list of eval definitions.")
    trace_labels = {trace.trace_id: trace.trace_label for trace in traces}
    for item in parsed:
        try:
            item["source_trace_label"] = trace_labels[item["source_trace_id"]]
        except KeyError as exc:
            raise ValueError(f"Unknown source_trace_id in generated eval: {item['source_trace_id']}") from exc
    return parsed

eval_generation_started = time.perf_counter()
eval_suite = generate_feedback_derived_evals(traces, human_feedback, llm_feedback)
print(f"Eval generation completed in {format_duration(time.perf_counter() - eval_generation_started)}")
assert all({"title", "scoring_method", "suggested_pass_example", "suggested_fail_example", "expected_behavior", "source_trace_id", "rubric", "deterministic_assertions"} <= set(item) for item in eval_suite)

def markdown_table(rows: list[dict[str, Any]], columns: list[str]) -> str:
    header = "| " + " | ".join(columns) + " |"
    divider = "| " + " | ".join(["---"] * len(columns)) + " |"
    body = ["| " + " | ".join(str(row[column]) for column in columns) + " |" for row in rows]
    return "\n".join([header, divider, *body])

display(Markdown(markdown_table(eval_suite, ["title", "scoring_method", "expected_behavior"])))

for item in eval_suite:
    print(f"\n{item['title']}")
    print(" pass:", item["suggested_pass_example"])
    print(" fail:", item["suggested_fail_example"])
```

```text
Eval generation completed in 52s
```

| title | scoring_method | expected_behavior |
| --- | --- | --- |
| Runway and burn must be translated into near-term financing risk | hybrid | The answer should explicitly state that financing risk is elevated because runway is 11 months and monthly cash burn is material/rising, tying burn to pressure to reduce spend, improve cash conversion, or raise capital before the sub-12-month runway closes. It should not imply the company has more than 12 months of runway. |
| Revenue quality assessment must prefer finance-controlled ARR and preserve ARR contradictions | hybrid | The answer should characterize revenue quality as mixed or moderate rather than clean, rely on finance-controlled FY2025 ending ARR of about $36.9M for underwriting, and explicitly reject or qualify the $43.0M board/headline ARR and $40.8M bookings-adjusted ARR as not equivalent to recurring ARR. It should preserve the contradiction instead of silently reconciling the gap. |
| Customer concentration must be assessed after parent-account rollups | hybrid | The answer should roll legal entities up to parent accounts before assessing concentration, specifically recognizing Northstar Holdings as the true parent exposure. It should use finance-controlled ARR as the denominator, cite or reference account hierarchy evidence, and avoid stopping at legal-entity concentration. |
| Enterprise security readiness must distinguish SOC 2 Type I from Type II | hybrid | The answer should state that the company is only partially ready for enterprise security review because SOC 2 Type I is complete but SOC 2 Type II is still in progress and no Type II report has been issued. It should treat sales FAQ language like 'SOC 2 complete' as weaker or potentially misleading evidence and connect missing Type II evidence to enterprise procurement or customer friction. |
| Unsupported metrics must be refused rather than inferred | hybrid | The answer should refuse to infer metrics that are missing, conflicted, partial, or management-estimated. In particular, it must mark CAC payback as unsupported/not provided and official NRR as unsupported because the 122% NRR is only an unvalidated management estimate. It should not promote partial or unofficial metrics into definitive diligence metrics. |

```text

Runway and burn must be translated into near-term financing risk
 pass: Near-term financing risk is elevated: the company has only 11 months of runway and meaningful monthly burn, creating pressure to reduce burn, improve cash conversion, or raise capital within a sub-12-month window.
 fail: Financing risk appears manageable because the company has enough runway for the next year and should be able to continue operating without near-term funding pressure.

Revenue quality assessment must prefer finance-controlled ARR and preserve ARR contradictions
 pass: Revenue quality is moderate, not clean. For underwriting, use the finance-controlled ARR bridge at $36.9M, while treating the $43.0M board ARR and $40.8M bookings-adjusted view as non-comparable or planning figures because they include items not classified as recurring ARR.
 fail: Revenue quality is strong and the company has $43.0M of ARR; the board number can be used because it reconciles to the finance ARR bridge after normal adjustments.

Customer concentration must be assessed after parent-account rollups
 pass: Concentration risk is high after parent rollups: Northstar Bank and Northstar Capital Markets roll up to Northstar Holdings at about $12.4M, roughly one-third of finance-controlled ARR. Looking only at legal entities understates the dependency.
 fail: Customer concentration is acceptable because no single legal entity exceeds the threshold after reviewing the top-customer list.

Enterprise security readiness must distinguish SOC 2 Type I from Type II
 pass: The company is partially ready, not frictionless: SOC 2 Type I is complete, but Type II fieldwork is still in progress and no Type II report is available. Sales materials saying 'SOC 2 complete' should be treated cautiously because enterprise buyers are waiting on Type II evidence.
 fail: The company is ready for enterprise security review because SOC 2 is complete and the sales FAQ confirms there should be no security blocker.

Unsupported metrics must be refused rather than inferred
 pass: Refuse to infer CAC payback because it is not provided. Also refuse to treat 122% NRR as official; it is an unvalidated management estimate and should not be used as a definitive retention metric.
 fail: The company has 122% official NRR and CAC payback appears attractive based on its revenue growth, so both can be used in underwriting.
```
