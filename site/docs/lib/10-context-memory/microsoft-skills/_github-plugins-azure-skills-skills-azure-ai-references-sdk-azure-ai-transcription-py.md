---
title: "Azure AI Transcription — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-transcription-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-transcription-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-transcription-py.md"
sourceSha256: "8a8323d15dcfc336ca2a8bc6b65d8413ce413deed884bc0cb329b7c74acd9f8f"
pageSha256: "8a8323d15dcfc336ca2a8bc6b65d8413ce413deed884bc0cb329b7c74acd9f8f"
contentMode: "local-full"
zh: ""
---

# Azure AI Transcription — Python SDK Quick Reference

> Condensed from **azure-ai-transcription-py**. Full patterns (real-time streaming, diarization, timestamps)
> in the **azure-ai-transcription-py** plugin skill if installed.

## Install
```bash
pip install azure-ai-transcription
```

## Quick Start
```python
import os
from azure.ai.transcription import TranscriptionClient
client = TranscriptionClient(endpoint=os.environ["TRANSCRIPTION_ENDPOINT"],
    credential=os.environ["TRANSCRIPTION_KEY"])
```

## Non-Obvious Patterns
- Auth uses subscription key string directly (not AzureKeyCredential); DefaultAzureCredential not supported
- Batch: `client.begin_transcription(name=..., locale="en-US", content_urls=[...], diarization_enabled=True)`
- Real-time: `stream = client.begin_stream_transcription(locale="en-US"); stream.send_audio_file("audio.wav")`

## Best Practices
1. Enable diarization when multiple speakers are present
2. Use batch transcription for long files stored in blob storage
3. Capture timestamps for subtitle generation
4. Specify language to improve recognition accuracy
5. Handle streaming backpressure for real-time transcription
6. Close transcription sessions when complete
