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
pageSha256: "c4908bb850ad6782f580d48fd120ae6b970283f3e0345e7875b84060b8874d6b"
contentMode: "local-full"
zh: ""
---

## Step 2: Build audio and transcript helpers

Known-speaker references are optional. Without them, diarization can still separate speakers, but labels may be generic, such as `speaker_0` or `speaker_1`. With references, the API can map segments to the names you provide.

Use short, clean reference clips with one speaker and minimal background noise. Keep reference clips only when you have consent and a clear business need.

```python
def to_data_url(path) -> str:
    path = Path(path)
    mime_type, _ = mimetypes.guess_type(path)
    if mime_type is None:
        mime_type = "audio/wav"
    elif not mime_type.startswith(SUPPORTED_REFERENCE_MIME_PREFIXES):
        raise ValueError(f"Reference clip must be an audio or video file, got {mime_type}: {path}")
    encoded = base64.b64encode(path.read_bytes()).decode("utf-8")
    return f"data:{mime_type};base64,{encoded}"

def transcribe_with_diarization(
    audio_file: Path,
    known_speakers: list[tuple[str, Path]],
    model: str = DEFAULT_TRANSCRIPTION_MODEL,
    request_timeout_seconds: float = DEFAULT_TRANSCRIPTION_TIMEOUT_SECONDS,
    stream_transcription: bool = True,
) -> Any:
    if not audio_file.is_file():
        raise FileNotFoundError(f"Audio file does not exist or is not a regular file: {audio_file}")

    if request_timeout_seconds <= 0:
        raise ValueError("request_timeout_seconds must be positive.")

    audio_size_bytes = audio_file.stat().st_size
    if audio_size_bytes > MAX_AUDIO_UPLOAD_BYTES:
        raise ValueError(
            f"Audio file is {audio_size_bytes:,} bytes; "
            "the Audio Transcriptions API accepts uploads up to 25 MB. "
            "Compress or split the recording before retrying."
        )

    from openai import OpenAI

    client = OpenAI(timeout=request_timeout_seconds)
    params: dict[str, Any] = {
        "model": model,
        "response_format": "diarized_json",
        "chunking_strategy": "auto",
        "stream": stream_transcription,
    }

    if known_speakers:
        if len(known_speakers) > 4:
            raise ValueError("gpt-4o-transcribe-diarize accepts up to 4 known speaker references.")
        params["extra_body"] = {
            "known_speaker_names": [name for name, _ in known_speakers],
            "known_speaker_references": [to_data_url(path) for _, path in known_speakers],
        }

    with audio_file.open("rb") as audio:
        response = client.audio.transcriptions.create(file=audio, **params)
        if stream_transcription:
            return collect_streamed_transcription(response)
        return response

def to_plain(value: Any) -> Any:
    if hasattr(value, "model_dump"):
        return value.model_dump()
    if isinstance(value, dict):
        return {key: to_plain(inner) for key, inner in value.items()}
    if isinstance(value, list):
        return [to_plain(item) for item in value]
    return value

def collect_streamed_transcription(events: Any) -> dict[str, Any]:
    segments: list[dict[str, Any]] = []
    full_text = ""
    usage: Any = None

    for event in events:
        data = to_plain(event)
        if not isinstance(data, dict):
            continue

        event_type = data.get("type")
        if event_type == "transcript.text.segment":
            segments.append(data)
        elif event_type == "transcript.text.done":
            full_text = str(data.get("text") or "")
            usage = data.get("usage")

    if not segments:
        raise ValueError("No diarized transcript segments were emitted by the transcription stream.")
    return {"segments": segments, "text": full_text, "usage": usage}

def normalize_segments(transcription: Any) -> list[Segment]:
    data = to_plain(transcription)
    raw_segments = data.get("segments", []) if isinstance(data, dict) else []
    segments: list[Segment] = []

    for index, item in enumerate(raw_segments):
        if hasattr(item, "model_dump"):
            item = item.model_dump()
        if not isinstance(item, dict):
            continue

        text = str(item.get("text", "")).strip()
        if not text:
            continue

        segment_id = str(item.get("segment_id") or item.get("id") or f"seg_{len(segments) + 1:03d}")
        segments.append(
            Segment(
                segment_id=segment_id,
                speaker=str(item.get("speaker") or f"Speaker {index + 1}"),
                start=float(item.get("start") or 0.0),
                end=float(item.get("end") or 0.0),
                text=text,
            )
        )

    if not segments and isinstance(data, dict) and data.get("text"):
        segments.append(Segment(segment_id="seg_001", speaker="Speaker 1", start=0.0, end=0.0, text=str(data["text"])))

    if not segments:
        raise ValueError("No transcript segments were found in the transcription response.")
    return segments

print("Audio and transcript helpers ready")
```
