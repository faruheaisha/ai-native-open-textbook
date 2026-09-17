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
pageSha256: "457cc7fb350c736f3be040eca34eb8d0eff0194c48923dc51abb6c26522c2919"
contentMode: "local-full"
zh: ""
---

## Step 4: Extract structured meeting intelligence

The model gets a speaker-labeled transcript and must use only that transcript as evidence. The safest default is to produce empty arrays instead of plausible but unsupported CRM notes. The schema also uses required-but-nullable fields, such as `due_date_or_trigger`, `inferred_role`, and `directed_to_speaker`, so unknown values stay `null` instead of being filled with guesses.

For every extracted fact, action item, risk, question, or recommendation, the model returns `evidence_refs` with a `segment_id` and quote. This gives reviewers a readable source trail and gives code something concrete to validate.

```python
def response_output_text_or_raise(response: Any) -> str:
    data = to_plain(response)
    status = data.get("status") if isinstance(data, dict) else getattr(response, "status", None)
    if status and status != "completed":
        details = data.get("incomplete_details") if isinstance(data, dict) else getattr(response, "incomplete_details", None)
        raise RuntimeError(f"Responses API returned status={status!r}; incomplete_details={details!r}")

    refusals: list[str] = []
    if isinstance(data, dict):
        for item in data.get("output", []):
            if not isinstance(item, dict):
                continue
            for content in item.get("content", []):
                if not isinstance(content, dict):
                    continue
                if content.get("type") == "refusal" or content.get("refusal"):
                    refusals.append(str(content.get("refusal") or content.get("text") or content))
    if refusals:
        raise RuntimeError(f"Responses API returned a refusal: {refusals[0]}")

    content = getattr(response, "output_text", None)
    if content is None and isinstance(data, dict):
        content = data.get("output_text")
    content = str(content or "").strip()
    if not content:
        raise RuntimeError("The model returned an empty response.")
    return content

def parse_meeting_intelligence_json(content: str) -> dict[str, Any]:
    try:
        parsed = json.loads(content)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Responses API returned invalid JSON: {exc}") from exc
    if not isinstance(parsed, dict):
        raise RuntimeError("Responses API returned JSON, but the top-level value was not an object.")
    return parsed

def generate_meeting_intelligence(segments: list[Segment], model: str = DEFAULT_SUMMARY_MODEL) -> dict[str, Any]:
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
                    "You create meeting intelligence from speaker-labeled transcripts. "
                    "Use only the transcript as evidence. Do not invent names, dates, decisions, "
                    "commitments, or implementation details. If evidence is missing, leave the relevant array empty. "
                    "Use null for unknown roles, owners, due dates or triggers, directed-to speakers, or decision owners. "
                    "Put single-speaker commitments in action_items, not decisions. "
                    "Only include decisions when the transcript shows an explicit decision or agreement. "
                    "Put only questions actually asked in explicit_questions. "
                    "Put inferred next questions in suggested_follow_ups with rationale and evidence_refs. "
                    "Every extracted item must include evidence_refs with segment_id values copied from the transcript "
                    "and quote text copied from that same segment. Do not fabricate segment IDs or quotes. "
                    "Use empty arrays instead of unsupported items. "
                    "If the follow-up email signer is unknown, end with [Your name]."
                ),
            },
            {
                "role": "user",
                "content": (
                    "Extract a customer-safe meeting brief from this transcript. "
                    "Transcript rows use: segment_id | speaker | timestamp range | text.\n\n"
                    f"{transcript}"
                ),
            },
        ],
        text={
            "format": {
                "type": "json_schema",
                "name": MEETING_INTELLIGENCE_SCHEMA["name"],
                "strict": MEETING_INTELLIGENCE_SCHEMA["strict"],
                "schema": MEETING_INTELLIGENCE_SCHEMA["schema"],
            }
        },
    )

    content = response_output_text_or_raise(completion)
    return parse_meeting_intelligence_json(content)

def demo_meeting_intelligence() -> dict[str, Any]:
    return {
        "summary": (
            "The customer needs a dependable post-call handoff process. Their main pain point is "
            "inconsistent escalation notes, which forces managers to reconstruct calls manually. "
            "The proposed path is a speaker-aware transcript, evidence-backed action items, risk "
            "detection, redaction, and CRM sync."
        ),
        "participants": [
            {
                "speaker": "Solutions Engineer",
                "inferred_role": "OpenAI technical seller or solution owner",
                "evidence_refs": [
                    {
                        "segment_id": "seg_001",
                        "quote": "I would like to understand where your support handoff breaks down today.",
                    },
                    {
                        "segment_id": "seg_005",
                        "quote": "I will send a prototype that includes speaker-aware transcripts, action items with evidence, and a redaction pass before CRM sync.",
                    },
                ],
            },
            {
                "speaker": "Customer",
                "inferred_role": "Customer stakeholder for support operations",
                "evidence_refs": [
                    {
                        "segment_id": "seg_002",
                        "quote": "The biggest issue is that escalation notes are inconsistent.",
                    },
                    {
                        "segment_id": "seg_004",
                        "quote": "we need to push action items into our CRM.",
                    },
                ],
            },
        ],
        "customer_context": [
            {
                "fact": "Escalation notes are inconsistent today.",
                "evidence_refs": [
                    {
                        "segment_id": "seg_002",
                        "quote": "The biggest issue is that escalation notes are inconsistent.",
                    }
                ],
            },
            {
                "fact": "Managers spend time reconstructing calls from recordings.",
                "evidence_refs": [
                    {
                        "segment_id": "seg_002",
                        "quote": "Managers spend Monday morning reconstructing what happened from call recordings.",
                    }
                ],
            },
            {
                "fact": "The customer wants action items pushed into their CRM.",
                "evidence_refs": [{"segment_id": "seg_004", "quote": "we need to push action items into our CRM."}],
            },
        ],
        "decisions": [],
        "action_items": [
            {
                "owner_speaker": "Solutions Engineer",
                "task": "Send a prototype that includes speaker-aware transcripts, action items with evidence, and a redaction pass before CRM sync.",
                "due_date_or_trigger": None,
                "evidence_refs": [
                    {
                        "segment_id": "seg_005",
                        "quote": "I will send a prototype that includes speaker-aware transcripts, action items with evidence, and a redaction pass before CRM sync.",
                    }
                ],
            }
        ],
        "risks": [
            {
                "risk": "Compliance-sensitive promises need to be identified in meeting notes.",
                "severity": "medium",
                "evidence_refs": [
                    {
                        "segment_id": "seg_004",
                        "quote": "We also need risks called out, especially compliance-sensitive promises",
                    }
                ],
                "mitigation": "Route compliance-sensitive risks to human review before CRM sync.",
            }
        ],
        "explicit_questions": [
            {
                "question": "Where does your support handoff break down today?",
                "asked_by_speaker": "Solutions Engineer",
                "directed_to_speaker": "Customer",
                "evidence_refs": [
                    {
                        "segment_id": "seg_001",
                        "quote": "I would like to understand where your support handoff breaks down today.",
                    }
                ],
            }
        ],
        "suggested_follow_ups": [
            {
                "question": "Which CRM object and fields should receive action items?",
                "rationale": "The customer asked to push action items into their CRM but did not specify the target schema or workflow.",
                "evidence_refs": [{"segment_id": "seg_004", "quote": "we need to push action items into our CRM."}],
            }
        ],
        "notable_quotes": [
            {
                "speaker": "Customer",
                "quote": "Managers spend Monday morning reconstructing what happened from call recordings.",
                "timestamp": "00:09.300",
                "segment_id": "seg_002",
            }
        ],
        "follow_up_email": {
            "subject": "Prototype for speaker-aware meeting handoffs",
            "body": (
                "Hi,\n\nThanks for the conversation. I heard that inconsistent escalation notes, "
                "evidence-backed action items, compliance-sensitive risk detection, and CRM sync "
                "are the core requirements. I will send a prototype with speaker-aware transcripts, "
                "action items with evidence, and a redaction pass before CRM sync.\n\nBest,\n[Your name]"
            ),
        },
    }

show_json(demo_meeting_intelligence(), expanded=False)
```
