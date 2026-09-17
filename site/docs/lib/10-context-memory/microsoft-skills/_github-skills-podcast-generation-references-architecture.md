---
title: "Architecture Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/podcast-generation/references/architecture.md"
sourceRel: ".github/skills/podcast-generation/references/architecture.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/podcast-generation/references/architecture.md"
sourceSha256: "81d0b68a1eda6320c62446fccd44ae92645ac22a3e2aeff2dfd538f76a449d5a"
pageSha256: "81d0b68a1eda6320c62446fccd44ae92645ac22a3e2aeff2dfd538f76a449d5a"
contentMode: "local-full"
zh: ""
---

# Architecture Reference

## Full-Stack Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       FRONTEND (React)                          │
│  AudioNarrative.jsx / PodcastOverview.jsx                       │
│    ↓ POST /api/v1/ai/audio                                     │
│  api.js → aiAPI.generateAudio(sourceType, sourceId, ...)       │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                       BACKEND (FastAPI)                         │
│  API: ai.py                                                     │
│    @router.post("/audio") → AudioNarrativeRequest               │
│    @router.get("/audio/{id}/stream") → WAV file                │
│                             │                                   │
│  Service: ai_service.py                                         │
│    generate_audio_narrative()                                   │
│    - Fetch content from DB (tag/bookmark/custom)               │
│    - Build styled prompt                                        │
│    - WebSocket connect to Azure Realtime API                   │
│    - Stream audio chunks + transcript                           │
│    - PCM → WAV conversion                                       │
│    - Save to database                                           │
│                             │                                   │
│  Model: database.py                                             │
│    AudioNarrative table                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ wss://
┌────────────────────────────▼────────────────────────────────────┐
│              Azure OpenAI Realtime API                          │
│  Model: gpt-realtime-mini                                       │
│  Output: PCM audio (24kHz, 16-bit mono) + transcript           │
└─────────────────────────────────────────────────────────────────┘
```

## Database Schema

```python
class AudioNarrative(Base):
    __tablename__ = "audio_narratives"
    
    id: int                          # Primary key
    source_type: str                 # "tag", "bookmark", "custom"
    source_id: Optional[int]         # Reference to source
    source_name: Optional[str]       # Display name
    title: str                       # Generated title
    script: str                      # Transcript text
    audio_url: Optional[str]         # Stream endpoint
    audio_data: Optional[str]        # Base64 WAV
    duration_seconds: Optional[int]  # Calculated from PCM length
    voice_name: str                  # "alloy", "echo", etc.
    created_at: datetime
```

## Pydantic Schemas

```python
class AudioNarrativeRequest(BaseModel):
    source_type: str          # Required: "tag", "bookmark", "custom"
    source_id: Optional[Union[int, str]] = None
    custom_query: Optional[str] = None
    voice_name: str = "alloy"
    style: str = "podcast"    # "podcast", "summary", "lecture"

class AudioNarrativeResponse(BaseModel):
    id: int
    title: str
    script: str
    audio_url: Optional[str]
    audio_data: Optional[str]  # Base64 WAV
    duration_seconds: Optional[int]
    voice_name: str
    created_at: datetime
```

## Style Instructions

```python
STYLE_INSTRUCTIONS = {
    "podcast": "Speak in a conversational, engaging podcast style with natural transitions. Use phrases like 'Let's dive into...' and 'What's fascinating here is...'",
    "summary": "Speak clearly and informatively, getting straight to the key points in a news anchor style.",
    "lecture": "Speak in an educational, thorough style suitable for learning. Explain concepts clearly like a professor."
}
```
