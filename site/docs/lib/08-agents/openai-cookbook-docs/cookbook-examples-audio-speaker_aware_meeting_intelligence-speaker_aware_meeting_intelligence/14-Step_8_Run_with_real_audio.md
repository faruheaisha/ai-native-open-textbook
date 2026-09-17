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
pageSha256: "5581f930a57b2c972c51f07aa8607964222f051d60937688654a9bcb5e50a534"
contentMode: "local-full"
zh: ""
---

## Step 8: Run with real audio

The next cell is intentionally opt-in. Set `RUN_REAL_AUDIO = True`, provide your local audio paths, and make sure `OPENAI_API_KEY` is set.

The Transcriptions API accepts files up to 25 MB. `chunking_strategy="auto"` segments a valid upload; it does not split an oversized file. For larger meetings, compress to a supported lower-bitrate format or split the recording into bounded files before transcription, then preserve or offset timestamps when combining results.
Long recordings can also outlast the Python SDK default read timeout. The helper streams finalized diarized segments by default and keeps a 30-minute timeout as a backstop. Set `stream_transcription=False` only when you specifically need one non-streamed response; split unusually long recordings when one request is not operationally reliable.

### How readers supply their files

This cookbook is notebook-first; there is no separate `.py` command in the published artifact. Put the meeting recording and any optional reference clips somewhere the notebook kernel can read. In local Jupyter, that can be a folder beside the notebook or an absolute path on disk. In a hosted notebook, upload the files into the notebook session first.

For example, a reader might have:

```text
audio/
  customer_call.mp3
  internal_rep_reference.wav
```

Then point the configuration variables at those files:

```python
AUDIO_FILE = Path("audio/customer_call.mp3")
KNOWN_SPEAKERS = {
    "Internal rep": Path("audio/internal_rep_reference.wav"),
}
```

`AUDIO_FILE` is the original meeting recording. `KNOWN_SPEAKERS` maps the label you want in the output to a separate 2-10 second reference clip; the helper sends the clip with the request rather than appending it to the meeting audio. In a production application, the same helper can receive a temporary file created from an upload or downloaded from object storage.

For the first production-style run, keep the setup simple:

- Use one meeting audio file.
- Use `chunking_strategy="auto"` for longer recordings.
- Add known-speaker references only when you have consent and a clear business need.
- Run redaction before storage.
- Run moderation when harmful-content classification is part of your review policy.

```python
RUN_REAL_AUDIO = False
AUDIO_FILE = Path("/path/to/meeting.wav")
# Keep each reference clip separate from AUDIO_FILE. Use a clean, consented 2-10 second sample of one speaker.
KNOWN_SPEAKERS = {
    # "Internal rep": Path("/path/to/internal_rep_reference.wav"),
    # "Customer": Path("/path/to/customer_reference.wav"),
}
# Demonstration only: masks basic email and phone patterns, not a complete PII/DLP solution.
REDACT_REAL_AUDIO = True
MODERATE_REAL_AUDIO = False
SAVE_RAW_RESPONSE = False
REAL_OUTPUT_DIR = Path(tempfile.mkdtemp(prefix="meeting-intelligence-real-"))

if RUN_REAL_AUDIO:
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("Set OPENAI_API_KEY before running on real audio.")
    if not AUDIO_FILE.is_file():
        raise FileNotFoundError(AUDIO_FILE)

    known_speakers = [(speaker_name, reference_path) for speaker_name, reference_path in KNOWN_SPEAKERS.items()]
    raw_transcription = transcribe_with_diarization(AUDIO_FILE, known_speakers)
    real_segments = normalize_segments(raw_transcription)
    if REDACT_REAL_AUDIO:
        real_segments = redact_segments(real_segments)

    moderation_results: dict[str, Any] = {}
    if MODERATE_REAL_AUDIO:
        moderation_results["transcript"] = moderate_text(transcript_for_model(real_segments))

    real_intelligence = generate_meeting_intelligence(real_segments)
    real_brief = render_meeting_brief(real_intelligence)
    if MODERATE_REAL_AUDIO:
        moderation_results["meeting_brief"] = moderate_text(real_brief)

    real_report = build_guardrail_report(
        segments=real_segments,
        intelligence=real_intelligence,
        meeting_brief=real_brief,
        redaction_enabled=REDACT_REAL_AUDIO,
        raw_saved=SAVE_RAW_RESPONSE,
        moderation_results=moderation_results,
    )
    write_artifacts(
        REAL_OUTPUT_DIR,
        real_segments,
        real_intelligence,
        real_report,
        raw_payload=raw_transcription if SAVE_RAW_RESPONSE else None,
    )
    print(f"Wrote real-audio artifacts to {REAL_OUTPUT_DIR}")
else:
    print("Skipped real audio run. Set RUN_REAL_AUDIO = True after configuring AUDIO_FILE and OPENAI_API_KEY.")
```
