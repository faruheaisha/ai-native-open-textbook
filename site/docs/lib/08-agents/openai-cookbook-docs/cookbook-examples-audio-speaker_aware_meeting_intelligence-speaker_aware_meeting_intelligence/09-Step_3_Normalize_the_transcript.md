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
pageSha256: "de46d1e3ab4e5a649bfcec25b940e0c73ea6781223c30ca80a5bf77161705724"
contentMode: "local-full"
zh: ""
---

## Step 3: Normalize the transcript

The normalized transcript is the contract between audio processing and meeting intelligence. It helps you rerun summarization without retranscribing audio, inspect attribution quality, and keep raw audio retention short.

Each segment gets a stable `segment_id` such as `seg_005`. Later, the model must cite those IDs in `evidence_refs`, and the guardrail step verifies that each cited quote appears in the referenced segment.

The regex redaction helper below is intentionally illustrative: it masks basic email and phone patterns only. It is not a complete PII or DLP system; use a policy-approved detector and human review for sensitive or regulated workflows.

```python
def redact_text(text: str) -> str:
    redacted = text
    for pattern, replacement in PII_PATTERNS:
        redacted = pattern.sub(replacement, redacted)
    return redacted

def redact_segments(segments: list[Segment]) -> list[Segment]:
    return [
        Segment(
            segment_id=segment.segment_id,
            speaker=segment.speaker,
            start=segment.start,
            end=segment.end,
            text=redact_text(segment.text),
        )
        for segment in segments
    ]

def pii_matches(text: str) -> list[str]:
    matches: list[str] = []
    for pattern, replacement in PII_PATTERNS:
        if pattern.search(text):
            matches.append(replacement.strip("[]"))
    return sorted(set(matches))

def format_timestamp(seconds: float) -> str:
    total_ms = max(0, int(round(seconds * 1000)))
    minutes, remainder_ms = divmod(total_ms, 60_000)
    secs, millis = divmod(remainder_ms, 1000)
    return f"{minutes:02d}:{secs:02d}.{millis:03d}"

def transcript_as_markdown(segments: list[Segment]) -> str:
    lines = ["# Speaker-Labeled Transcript", ""]
    for segment in segments:
        start = format_timestamp(segment.start)
        end = format_timestamp(segment.end)
        lines.append(f"**{segment.segment_id} | {segment.speaker} [{start}-{end}]**: {segment.text}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"

def transcript_for_model(segments: list[Segment]) -> str:
    return "\n".join(
        f"{segment.segment_id} | {segment.speaker} | {format_timestamp(segment.start)}-{format_timestamp(segment.end)} | {segment.text}"
        for segment in segments
    )

show_markdown(transcript_as_markdown(DEMO_SEGMENTS))
```
