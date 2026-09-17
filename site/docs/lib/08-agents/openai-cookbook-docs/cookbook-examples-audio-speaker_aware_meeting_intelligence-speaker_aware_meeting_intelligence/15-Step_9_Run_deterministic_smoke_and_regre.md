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
pageSha256: "c08b1f0007442370d8689fc825a13ab0548b36291688e1cf98ac8f4ed4f89829"
contentMode: "local-full"
zh: ""
---

## Step 9: Run deterministic smoke and regression checks

These checks are deterministic and do not call the API. Treat them as a smoke test and regression suite for the notebook mechanics, not as an eval of model quality.

### Smoke-test checks

The first checks confirm that the notebook writes all expected artifacts and routes medium-risk outputs to review.

### Regression checks

The remaining assertions catch regressions in schema nullability, evidence references, unsupported demo claims, response edge cases, redaction, and timestamp formatting.

```python
expected_files = {
    "transcript_segments.json",
    "speaker_labeled_transcript.md",
    "meeting_intelligence.json",
    "meeting_brief.md",
    "guardrail_report.json",
}
assert expected_files.issubset({path.name for path in output_dir.iterdir()})
assert guardrail_report["status"] == "review_required"
assert any(check["name"] == "risk_outputs" and check["status"] == "review" for check in guardrail_report["checks"])
assert any(check["name"] == "evidence_refs" and check["status"] == "pass" for check in guardrail_report["checks"])

action_schema = MEETING_INTELLIGENCE_SCHEMA["schema"]["properties"]["action_items"]["items"]["properties"]
participant_schema = MEETING_INTELLIGENCE_SCHEMA["schema"]["properties"]["participants"]["items"]["properties"]
question_schema = MEETING_INTELLIGENCE_SCHEMA["schema"]["properties"]["explicit_questions"]["items"]["properties"]
assert "null" in action_schema["due_date_or_trigger"]["type"]
assert "null" in action_schema["owner_speaker"]["type"]
assert "null" in participant_schema["inferred_role"]["type"]
assert "null" in question_schema["directed_to_speaker"]["type"]

assert demo_run["segments"][0].segment_id == "seg_001"
assert demo_run["intelligence"]["decisions"] == []
assert demo_run["intelligence"]["action_items"][0]["due_date_or_trigger"] is None
assert demo_run["intelligence"]["action_items"][0]["evidence_refs"][0]["segment_id"] == "seg_005"
assert demo_run["intelligence"]["explicit_questions"]
assert demo_run["intelligence"]["suggested_follow_ups"]
assert validate_evidence_refs(demo_run["intelligence"], demo_run["segments"]) == []
assert "structured outputs" not in demo_run["intelligence"]["follow_up_email"]["body"].lower()
assert "`seg_005`" in demo_run["meeting_brief"]
assert "_Not specified._" in demo_run["meeting_brief"]

broken_intelligence = json.loads(json.dumps(demo_run["intelligence"]))
broken_intelligence["action_items"][0]["evidence_refs"] = [{"segment_id": "seg_999", "quote": "I will send a prototype"}]
assert validate_evidence_refs(broken_intelligence, demo_run["segments"])

broken_intelligence = json.loads(json.dumps(demo_run["intelligence"]))
broken_intelligence["action_items"][0]["evidence_refs"] = [{"segment_id": "seg_005", "quote": "I will send the contract tomorrow"}]
assert validate_evidence_refs(broken_intelligence, demo_run["segments"])

try:
    response_output_text_or_raise({"status": "incomplete", "incomplete_details": {"reason": "max_output_tokens"}})
    raise AssertionError("Expected incomplete response to raise")
except RuntimeError as exc:
    assert "incomplete" in str(exc)

try:
    response_output_text_or_raise({"status": "completed", "output": [{"content": [{"type": "refusal", "refusal": "Cannot comply."}]}]})
    raise AssertionError("Expected refusal response to raise")
except RuntimeError as exc:
    assert "refusal" in str(exc).lower()

try:
    response_output_text_or_raise({"status": "completed", "output_text": ""})
    raise AssertionError("Expected empty response to raise")
except RuntimeError as exc:
    assert "empty" in str(exc).lower()

try:
    parse_meeting_intelligence_json("not json")
    raise AssertionError("Expected invalid JSON to raise")
except RuntimeError as exc:
    assert "invalid JSON" in str(exc)

redacted = redact_segments([
    Segment("seg_test", "Customer", 0.0, 3.0, "Email me at alex@example.com or call 415-555-0100.")
])
assert redacted[0].segment_id == "seg_test"
assert redacted[0].text == "Email me at [email] or call [phone]."
assert format_timestamp(6000) == "100:00.000"

with tempfile.NamedTemporaryFile(suffix=".wav") as oversized_audio:
    oversized_audio.truncate(MAX_AUDIO_UPLOAD_BYTES + 1)
    oversized_audio.flush()
    try:
        transcribe_with_diarization(Path(oversized_audio.name), [])
        raise AssertionError("Expected oversized audio to raise")
    except ValueError as exc:
        assert "25 MB" in str(exc)

with tempfile.NamedTemporaryFile(suffix=".wav") as tiny_audio:
    try:
        transcribe_with_diarization(Path(tiny_audio.name), [], request_timeout_seconds=0)
        raise AssertionError("Expected invalid timeout to raise")
    except ValueError as exc:
        assert "positive" in str(exc)

streamed_transcription = collect_streamed_transcription([
    {"type": "transcript.text.segment", "id": "seg_stream", "speaker": "A", "start": 0.0, "end": 1.0, "text": "Hello"},
    {"type": "transcript.text.done", "text": "Hello", "usage": {"total_tokens": 1}},
])
streamed_segments = normalize_segments(streamed_transcription)
assert streamed_segments[0].segment_id == "seg_stream"
assert streamed_segments[0].speaker == "A"
assert streamed_transcription["usage"]["total_tokens"] == 1

print("Notebook demo validation passed")
```
