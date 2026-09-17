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
pageSha256: "b2b82936e04046e2d4891be7148b6c146775fb6a778bc515d5dbd6c0a1727452"
contentMode: "local-full"
zh: ""
---

## Step 7: Run the deterministic demo fixture

This section is a deterministic no-network demo, not a model-quality eval. It uses a fixed synthetic diarized transcript and a fixed expected meeting-intelligence object so reviewers can run the notebook without an API key.

### What this fixture checks

The fixture exercises the same artifact and guardrail path used by real audio: transcript rendering, JSON writing, Markdown brief rendering, PII redaction helpers, evidence-reference validation, nullable fields, and review routing.

### What this fixture does not check

It does not measure transcription quality, diarization accuracy, or model extraction quality on new meetings. The eval sections below add deterministic scoring and an optional LLM-as-judge pattern for that layer.

```python
output_dir = Path(tempfile.mkdtemp(prefix="meeting-intelligence-demo-"))
demo_run = run_pipeline_from_segments(
    segments=DEMO_SEGMENTS,
    output_dir=output_dir,
    intelligence=demo_meeting_intelligence(),
)

print(f"Wrote meeting intelligence artifacts to {output_dir}")
for artifact_name in [
    "transcript_segments.json",
    "speaker_labeled_transcript.md",
    "meeting_intelligence.json",
    "meeting_brief.md",
    "guardrail_report.json",
]:
    artifact_path = output_dir / artifact_name
    print(f"- {artifact_path} ({artifact_path.stat().st_size} bytes)")
```

```python
segments = json.loads((output_dir / "transcript_segments.json").read_text())
segments[:2]
```

```python
show_markdown((output_dir / "speaker_labeled_transcript.md").read_text())
```

```python
meeting_intelligence_json = json.loads((output_dir / "meeting_intelligence.json").read_text())
show_json(meeting_intelligence_json, expanded=False)
```

```python
show_markdown((output_dir / "meeting_brief.md").read_text())
```

```python
guardrail_report = json.loads((output_dir / "guardrail_report.json").read_text())
show_json(guardrail_report, expanded=True)
```
