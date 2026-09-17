---
title: "Streamed voice demo"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/voice/streamed/README.md"
sourceRel: "examples/voice/streamed/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/voice/streamed/README.md"
sourceSha256: "23b9b00c0c147374e971ddac395808ff1525ecb64f228a622e2fc434827ee2c6"
pageSha256: "23b9b00c0c147374e971ddac395808ff1525ecb64f228a622e2fc434827ee2c6"
contentMode: "local-full"
zh: ""
---

# Streamed voice demo

This is an interactive demo, where you can talk to an Agent conversationally. It uses the voice pipeline's built in turn detection feature, so if you stop speaking the Agent responds.

Run via:

```
python -m examples.voice.streamed.main
```

## How it works

1. We create a `VoicePipeline`, setup with a `SingleAgentVoiceWorkflow`. This is a workflow that starts at an Assistant agent, has tools and handoffs.
2. Audio input is captured from the terminal.
3. The pipeline is run with the recorded audio, which causes it to:
    1. Transcribe the audio
    2. Feed the transcription to the workflow, which runs the agent.
    3. Stream the output of the agent to a text-to-speech model.
4. Play the audio.

Some suggested examples to try:

-   Tell me a joke (_the assistant tells you a joke_)
-   What's the weather in Tokyo? (_will call the `get_weather` tool and then speak_)
-   Hola, como estas? (_will handoff to the spanish agent_)
