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
pageSha256: "a19f6162f708359c45377c7ddc6904f09d1f96966b55f9a41f62b48b48779006"
contentMode: "local-full"
zh: ""
---

## Core diarization request

The core API request is intentionally small:

```python
client = OpenAI(timeout=30 * 60)

with open("meeting.wav", "rb") as audio_file:
    stream = client.audio.transcriptions.create(
        model="gpt-4o-transcribe-diarize",
        file=audio_file,
        response_format="diarized_json",
        chunking_strategy="auto",
        stream=True,
        extra_body={
            "known_speaker_names": ["Agent"],
            "known_speaker_references": [to_data_url(Path("agent_reference.wav"))],
        },
    )
    for event in stream:
        if event.type == "transcript.text.segment":
            print(event.speaker, event.text, event.start, event.end)
```

The important details are:

- Use `response_format="diarized_json"` when you need segment-level speaker metadata.
- Use `chunking_strategy="auto"` for audio longer than 30 seconds.
- Use `stream=True` for completed recordings when you want finalized diarized segments as they become available.
- The Python SDK defaults to a 10-minute read timeout; the helper below uses 30 minutes for longer recordings.
- Pass known speaker names and references together, in the same order.
- Keep reference clips short and single-speaker.
