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
pageSha256: "c79c29b1478d20af3b8b4f5b012767ee7c14209366023b1cc15e301baab819fa"
contentMode: "local-full"
zh: ""
---

## Diarization vs speaker identification

Diarization answers "which voice spoke each segment?" It separates voices inside one recording, but it does not create a permanent identity profile or remember that `speaker_0` from one call is the same person as `speaker_0` in a later call. Without references, generic labels are still useful because they preserve attribution: the pipeline can distinguish the speaker who raised a requirement from the speaker who made a commitment.

Known-speaker references add an optional identity hint for the current request:

| Input | Result |
| --- | --- |
| Meeting audio only | The model separates voices, usually with generic labels such as `speaker_0` and `speaker_1`. |
| Meeting audio plus a named reference clip | Matching segments can use the supplied name; unmatched speakers can remain generic. |
| A later or historical recording | Pass the reference clip again. Labels do not carry across recordings automatically. |

### Pass a reference clip with the meeting recording

The meeting recording and the reference clip are separate inputs in one transcription request. Do not concatenate the reference clip onto the meeting audio. The meeting is uploaded as `file=...`; each reference clip is encoded as a data URL and sent through `known_speaker_references` with a name in the same position in `known_speaker_names`.

The helper below wraps that request shape. For example, this passes a meeting recording plus a separate short clip of an internal rep speaking:

```python
meeting_audio = Path("customer_call.wav")
known_speakers = [
    ("Internal rep", Path("internal_rep_reference.wav")),
]

raw_transcription = transcribe_with_diarization(
    audio_file=meeting_audio,
    known_speakers=known_speakers,
)
```

Use a clean, consented 2-10 second clip with one speaker and minimal background noise. For recurring internal speakers, a production application can keep an access-controlled reference registry and attach the appropriate clip on each request. For historical recordings, run the same flow per recording; a reference clip may come from an older consented call if it is clean and single-speaker. Treat references as sensitive data, evaluate match quality on representative audio, and keep human review for high-stakes downstream writes.

```python
from __future__ import annotations

import base64
import json
import mimetypes
import os
import re
import tempfile
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

try:
    from IPython.display import JSON, Markdown, display
except ImportError:  # Makes this cell safe in non-notebook runners.
    JSON = None
    Markdown = None

    def display(value):
        print(value)

def show_markdown(text: str) -> None:
    if Markdown:
        display(Markdown(text))
    else:
        print(text)

def show_json(payload: Any, expanded: bool = False) -> None:
    if JSON:
        display(JSON(payload, expanded=expanded))
    else:
        print(json.dumps(payload, indent=2))

DEFAULT_TRANSCRIPTION_MODEL = "gpt-4o-transcribe-diarize"
DEFAULT_SUMMARY_MODEL = os.getenv("OPENAI_MEETING_INTELLIGENCE_MODEL", "gpt-4.1-mini")
DEFAULT_MODERATION_MODEL = "omni-moderation-latest"
SUPPORTED_REFERENCE_MIME_PREFIXES = ("audio/", "video/")
MAX_AUDIO_UPLOAD_BYTES = 25_000_000
DEFAULT_TRANSCRIPTION_TIMEOUT_SECONDS = 30 * 60

print("Notebook helpers loaded")
```

```python
@dataclass(frozen=True)
class Segment:
    segment_id: str
    speaker: str
    start: float
    end: float
    text: str

DEMO_SEGMENTS = [
    Segment(
        segment_id="seg_001",
        speaker="Solutions Engineer",
        start=0.0,
        end=9.2,
        text="Thanks for joining. I would like to understand where your support handoff breaks down today.",
    ),
    Segment(
        segment_id="seg_002",
        speaker="Customer",
        start=9.3,
        end=22.4,
        text="The biggest issue is that escalation notes are inconsistent. Managers spend Monday morning reconstructing what happened from call recordings.",
    ),
    Segment(
        segment_id="seg_003",
        speaker="Solutions Engineer",
        start=22.5,
        end=38.1,
        text="So the priority is reliable call summaries, who committed to what, and enough evidence that the team trusts the handoff.",
    ),
    Segment(
        segment_id="seg_004",
        speaker="Customer",
        start=38.2,
        end=55.0,
        text="Exactly. We also need risks called out, especially compliance-sensitive promises, and we need to push action items into our CRM.",
    ),
    Segment(
        segment_id="seg_005",
        speaker="Solutions Engineer",
        start=55.1,
        end=70.3,
        text="I will send a prototype that includes speaker-aware transcripts, action items with evidence, and a redaction pass before CRM sync.",
    ),
]

PII_PATTERNS = [
    (re.compile(r"\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b"), "[email]"),
    (re.compile(r"\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b"), "[phone]"),
]

print(f"Loaded {len(DEMO_SEGMENTS)} synthetic transcript segments")
```
