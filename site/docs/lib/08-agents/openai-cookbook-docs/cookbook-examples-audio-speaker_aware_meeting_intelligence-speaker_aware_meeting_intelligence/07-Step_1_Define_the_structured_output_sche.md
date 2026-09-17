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
pageSha256: "e84c15990be4a71067d94460307ff73170ce4180e6f8a9b292d9d8281b05940c"
contentMode: "local-full"
zh: ""
---

## Step 1: Define the structured output schema

Meeting intelligence often feeds systems of record. Use strict structured outputs so downstream code gets a stable shape and unsupported fields are rejected rather than silently accepted. This schema also requires structured `evidence_refs`: each extracted item must cite a transcript `segment_id` and a quote from that segment, which lets guardrails verify the grounding mechanically.

```python
EVIDENCE_REF_SCHEMA: dict[str, Any] = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "segment_id": {"type": "string"},
        "quote": {"type": "string"},
    },
    "required": ["segment_id", "quote"],
}

EVIDENCE_REFS_SCHEMA: dict[str, Any] = {
    "type": "array",
    "items": EVIDENCE_REF_SCHEMA,
}

NULLABLE_STRING_SCHEMA: dict[str, Any] = {"type": ["string", "null"]}

MEETING_INTELLIGENCE_SCHEMA: dict[str, Any] = {
    "name": "meeting_intelligence",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "summary": {"type": "string"},
            "participants": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "speaker": {"type": "string"},
                        "inferred_role": NULLABLE_STRING_SCHEMA,
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["speaker", "inferred_role", "evidence_refs"],
                },
            },
            "customer_context": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "fact": {"type": "string"},
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["fact", "evidence_refs"],
                },
            },
            "decisions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "decision": {"type": "string"},
                        "speaker_or_group": NULLABLE_STRING_SCHEMA,
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["decision", "speaker_or_group", "evidence_refs"],
                },
            },
            "action_items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "owner_speaker": NULLABLE_STRING_SCHEMA,
                        "task": {"type": "string"},
                        "due_date_or_trigger": NULLABLE_STRING_SCHEMA,
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["owner_speaker", "task", "due_date_or_trigger", "evidence_refs"],
                },
            },
            "risks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "risk": {"type": "string"},
                        "severity": {"type": "string", "enum": ["low", "medium", "high"]},
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                        "mitigation": {"type": "string"},
                    },
                    "required": ["risk", "severity", "evidence_refs", "mitigation"],
                },
            },
            "explicit_questions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "question": {"type": "string"},
                        "asked_by_speaker": {"type": "string"},
                        "directed_to_speaker": NULLABLE_STRING_SCHEMA,
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["question", "asked_by_speaker", "directed_to_speaker", "evidence_refs"],
                },
            },
            "suggested_follow_ups": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "question": {"type": "string"},
                        "rationale": {"type": "string"},
                        "evidence_refs": EVIDENCE_REFS_SCHEMA,
                    },
                    "required": ["question", "rationale", "evidence_refs"],
                },
            },
            "notable_quotes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "speaker": {"type": "string"},
                        "quote": {"type": "string"},
                        "timestamp": {"type": "string"},
                        "segment_id": {"type": "string"},
                    },
                    "required": ["speaker", "quote", "timestamp", "segment_id"],
                },
            },
            "follow_up_email": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "subject": {"type": "string"},
                    "body": {"type": "string"},
                },
                "required": ["subject", "body"],
            },
        },
        "required": [
            "summary",
            "participants",
            "customer_context",
            "decisions",
            "action_items",
            "risks",
            "explicit_questions",
            "suggested_follow_ups",
            "notable_quotes",
            "follow_up_email",
        ],
    },
}

print("Structured output schema ready")
```
