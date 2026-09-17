---
title: "Shared GPT Live frontend"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/assistants/frontend/README.md"
sourceRel: "examples/audio/duplex_voice_agent_evaluation/assistants/frontend/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/audio/duplex_voice_agent_evaluation/assistants/frontend/README.md"
sourceSha256: "b654c792d7981e34d4553abb179460af7b0d2c1d37b3bde3c6e55ef66fb05ddb"
pageSha256: "b654c792d7981e34d4553abb179460af7b0d2c1d37b3bde3c6e55ef66fb05ddb"
contentMode: "local-full"
zh: ""
---

# Shared GPT Live frontend

`assistant.py` owns the GPT Live WebSocket, voice session, incoming events,
streamed caller audio, and connection lifecycle. Both delegation modes reuse
this frontend. `transport.py` owns shared protocol validation, session payloads,
authentication, and WebSocket connections.

Edit `prompts/voice.txt` to change the assistant's spoken behavior. Configure
the GPT Live model, voice, endpoint, and credentials in the selected `.env` file
or shell. See [environment-file selection](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#environment-file-selection)
and [security and artifact handling](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#artifact-and-connection-safety).
