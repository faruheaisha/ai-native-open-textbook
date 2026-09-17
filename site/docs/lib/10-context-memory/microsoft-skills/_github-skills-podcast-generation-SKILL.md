---
title: "Podcast Generation with GPT Realtime Mini"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/podcast-generation/SKILL.md"
sourceRel: ".github/skills/podcast-generation/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/podcast-generation/SKILL.md"
sourceSha256: "5719cfda0fd19819d52702426992551224060ce1cb4618ed8356785b6bb010fc"
pageSha256: "5719cfda0fd19819d52702426992551224060ce1cb4618ed8356785b6bb010fc"
contentMode: "local-full"
zh: ""
---

# Podcast Generation with GPT Realtime Mini

Generate real audio narratives from text content using Azure OpenAI's Realtime API.

## Quick Start

1. Configure environment variables for Realtime API
2. Connect via WebSocket to Azure OpenAI Realtime endpoint
3. Send text prompt, collect PCM audio chunks + transcript
4. Convert PCM to WAV format
5. Return base64-encoded audio to frontend for playback

## Environment Configuration

```env
AZURE_OPENAI_AUDIO_API_KEY=your_realtime_api_key
AZURE_OPENAI_AUDIO_ENDPOINT=https://your-resource.cognitiveservices.azure.com
AZURE_OPENAI_AUDIO_DEPLOYMENT=gpt-realtime-mini
```

**Note**: Endpoint should NOT include `/openai/v1/` - just the base URL.

## Core Workflow

### Backend Audio Generation

```python
from openai import AsyncOpenAI
import base64

# Convert HTTPS endpoint to WebSocket URL
ws_url = endpoint.replace("https://", "wss://") + "/openai/v1"

client = AsyncOpenAI(
    websocket_base_url=ws_url,
    api_key=api_key
)

audio_chunks = []
transcript_parts = []

async with client.realtime.connect(model="gpt-realtime-mini") as conn:
    # Configure for audio-only output
    await conn.session.update(session={
        "output_modalities": ["audio"],
        "instructions": "You are a narrator. Speak naturally."
    })
    
    # Send text to narrate
    await conn.conversation.item.create(item={
        "type": "message",
        "role": "user",
        "content": [{"type": "input_text", "text": prompt}]
    })
    
    await conn.response.create()
    
    # Collect streaming events
    async for event in conn:
        if event.type == "response.output_audio.delta":
            audio_chunks.append(base64.b64decode(event.delta))
        elif event.type == "response.output_audio_transcript.delta":
            transcript_parts.append(event.delta)
        elif event.type == "response.done":
            break

# Convert PCM to WAV (see scripts/pcm_to_wav.py)
pcm_audio = b''.join(audio_chunks)
wav_audio = pcm_to_wav(pcm_audio, sample_rate=24000)
```

### Frontend Audio Playback

```javascript
// Convert base64 WAV to playable blob
const base64ToBlob = (base64, mimeType) => {
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mimeType });
};

const audioBlob = base64ToBlob(response.audio_data, 'audio/wav');
const audioUrl = URL.createObjectURL(audioBlob);
new Audio(audioUrl).play();
```

## Voice Options

| Voice | Character |
|-------|-----------|
| alloy | Neutral |
| echo | Warm |
| fable | Expressive |
| onyx | Deep |
| nova | Friendly |
| shimmer | Clear |

## Realtime API Events

- `response.output_audio.delta` - Base64 audio chunk
- `response.output_audio_transcript.delta` - Transcript text
- `response.done` - Generation complete
- `error` - Handle with `event.error.message`

## Audio Format

- **Input**: Text prompt
- **Output**: PCM audio (24kHz, 16-bit, mono)
- **Storage**: Base64-encoded WAV

## References

- **Full architecture**: See [references/architecture.md](/lib/10-context-memory/microsoft-skills/_github-skills-podcast-generation-references-architecture) for complete stack design
- **Code examples**: See [references/code-examples.md](/lib/10-context-memory/microsoft-skills/_github-skills-podcast-generation-references-code-examples) for production patterns
- **PCM conversion**: Use [scripts/pcm_to_wav.py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/podcast-generation/scripts/pcm_to_wav.py) for audio format conversion
