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
sourceRel: "cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
sourceSha256: "69a817e38abb5d8c4a2e4aa9b343ab8f4b306e5d0eb313b163f0c27b6071f535"
pageSha256: "d131368ba8cabe7fa13a1a2718396afcb27937897a83d81b2c37c42ec1be8255"
contentMode: "local-full"
zh: ""
---

## Step 11: Add optional LLM-as-judge evals

LLM-as-judge evals are useful for grading qualities that deterministic scorers cannot fully capture, such as summary usefulness, missing follow-ups, and whether the brief would help a reviewer. Keep this optional because it calls the API and can vary by judge model. Use it alongside deterministic scorers, not instead of them.

The judge below receives the transcript, the structured output, and a rubric. It returns scores and review findings. Leave `RUN_LLM_JUDGE_EVAL = False` for the default no-network notebook run.

```python
RUN_LLM_JUDGE_EVAL = False
LLM_JUDGE_MODEL = os.getenv("OPENAI_MEETING_INTELLIGENCE_JUDGE_MODEL", DEFAULT_SUMMARY_MODEL)

LLM_JUDGE_SCHEMA: dict[str, Any] = {
    "name": "meeting_intelligence_judge",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "outcome": {"type": "string", "enum": ["pass", "review", "fail"]},
            "overall_score": {"type": "number"},
            "scores": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "grounding": {"type": "number"},
                    "action_item_correctness": {"type": "number"},
                    "completeness": {"type": "number"},
                    "safety_review_readiness": {"type": "number"},
                },
                "required": ["grounding", "action_item_correctness", "completeness", "safety_review_readiness"],
            },
            "findings": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "area": {"type": "string"},
                        "severity": {"type": "string", "enum": ["low", "medium", "high"]},
                        "explanation": {"type": "string"},
                    },
                    "required": ["area", "severity", "explanation"],
                },
            },
        },
        "required": ["outcome", "overall_score", "scores", "findings"],
    },
}

def run_llm_judge_eval(segments: list[Segment], intelligence: dict[str, Any], model: str = LLM_JUDGE_MODEL) -> dict[str, Any]:
    from openai import OpenAI

    client = OpenAI()
    transcript = transcript_for_model(segments)
    completion = client.responses.create(
        model=model,
        temperature=0,
        store=False,
        input=[
            {
                "role": "system",
                "content": (
                    "You are judging a meeting-intelligence extraction. Grade only against the transcript. "
                    "Penalize unsupported claims, missing major action items, missing customer risks, incorrect speaker attribution, "
                    "and outputs that are not ready for human review. Return calibrated scores from 0 to 1."
                ),
            },
            {
                "role": "user",
                "content": (
                    "Transcript:\n"
                    f"{transcript}\n\n"
                    "Meeting intelligence JSON:\n"
                    f"{json.dumps(intelligence, indent=2)}"
                ),
            },
        ],
        text={
            "format": {
                "type": "json_schema",
                "name": LLM_JUDGE_SCHEMA["name"],
                "strict": LLM_JUDGE_SCHEMA["strict"],
                "schema": LLM_JUDGE_SCHEMA["schema"],
            }
        },
    )
    return parse_meeting_intelligence_json(response_output_text_or_raise(completion))

if RUN_LLM_JUDGE_EVAL:
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("Set OPENAI_API_KEY before running the LLM judge eval.")
    llm_judge_report = run_llm_judge_eval(demo_run["segments"], demo_run["intelligence"])
    show_json(llm_judge_report, expanded=True)
else:
    print("Skipped LLM judge eval. Set RUN_LLM_JUDGE_EVAL = True after configuring OPENAI_API_KEY.")
```
