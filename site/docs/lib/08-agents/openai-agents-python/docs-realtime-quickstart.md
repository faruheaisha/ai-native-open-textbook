---
title: "Quickstart"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/docs/realtime/quickstart.md"
sourceRel: "docs/realtime/quickstart.md"
rawUrl: "/raw/08-agents/openai-agents-python/docs/realtime/quickstart.md"
sourceSha256: "eb3208c9181e1a3fe7aaf87acdab18ea82578ba5ea130372efd34d2c3f7cef3f"
pageSha256: "eb3208c9181e1a3fe7aaf87acdab18ea82578ba5ea130372efd34d2c3f7cef3f"
contentMode: "local-full"
zh: ""
---

# Quickstart

Realtime agents in the Python SDK are server-side, low-latency agents built on the OpenAI Realtime API over WebSocket transport.

!!! note "Python SDK boundary"

    The Python SDK does **not** provide a browser WebRTC transport. This page only covers Python-managed realtime sessions over server-side WebSockets. Use this SDK for server-side orchestration, tools, approvals, and telephony integrations. See also [Realtime transport](/lib/08-agents/openai-agents-python/docs-realtime-transport).

## Prerequisites

-   Python 3.10 or higher
-   OpenAI API key
-   Basic familiarity with the OpenAI Agents SDK

## Installation

If you haven't already, install the OpenAI Agents SDK:

```bash
pip install openai-agents
```

## Create a server-side realtime session

### 1. Import the realtime components

```python
import asyncio

from agents.realtime import RealtimeAgent, RealtimeRunner
```

### 2. Define the starting agent

```python
agent = RealtimeAgent(
    name="Assistant",
    instructions="You are a helpful voice assistant. Keep responses short and conversational.",
)
```

### 3. Configure the runner

Prefer the nested `audio.input` / `audio.output` session settings shape for new code. For new realtime agents, start with `gpt-realtime-2.1`.

```python
runner = RealtimeRunner(
    starting_agent=agent,
    config={
        "model_settings": {
            "model_name": "gpt-realtime-2.1",
            "audio": {
                "input": {
                    "format": "pcm16",
                    "transcription": {"model": "gpt-4o-mini-transcribe"},
                    "turn_detection": {
                        "type": "semantic_vad",
                        "interrupt_response": True,
                    },
                },
                "output": {
                    "format": "pcm16",
                    "voice": "ash",
                },
            },
        }
    },
)
```

### 4. Start the session and send input

`runner.run()` returns a `RealtimeSession`. The connection is opened when you enter the session context.

```python
async def main() -> None:
    session = await runner.run()

    async with session:
        await session.send_message("Say hello in one short sentence.")

        async for event in session:
            if event.type == "audio":
                # Forward or play event.audio.data.
                pass
            elif event.type == "history_added":
                print(event.item)
            elif event.type == "agent_end":
                # One assistant turn finished.
                break
            elif event.type == "error":
                print(f"Error: {event.error}")

if __name__ == "__main__":
    asyncio.run(main())
```

`session.send_message()` accepts either a plain string or a structured realtime message. For raw audio chunks, use [`session.send_audio()`][agents.realtime.session.RealtimeSession.send_audio].

## What this quickstart does not include

-   Microphone capture and speaker playback code. See the realtime examples in [`examples/realtime`](https://github.com/openai/openai-agents-python/tree/main/examples/realtime).
-   SIP / telephony attach flows. See [Realtime transport](/lib/08-agents/openai-agents-python/docs-realtime-transport) and the [SIP section](/lib/08-agents/openai-agents-python/docs-realtime-guide#sip-and-telephony).

## Key settings

Once the basic session works, the settings most people reach for next are:

-   `model_name`
-   `audio.input.format`, `audio.output.format`
-   `audio.input.transcription`
-   `audio.input.noise_reduction`
-   `audio.input.turn_detection` for automatic turn detection
-   `audio.output.voice`
-   `tool_choice`, `prompt`, `tracing`
-   `async_tool_calls`, `tool_execution.pre_approval_tool_input_guardrails`, `guardrails_settings.debounce_text_length`, `tool_error_formatter`

The older flat aliases such as `input_audio_format`, `output_audio_format`, `input_audio_transcription`, and `turn_detection` still work, but nested `audio` settings are preferred for new code.

For manual turn control, use the low-level `session.update` / `input_audio_buffer.commit` / `response.create` flow described in the [Realtime agents guide](/lib/08-agents/openai-agents-python/docs-realtime-guide#manual-response-control).

For the full schema, see [`RealtimeRunConfig`][agents.realtime.config.RealtimeRunConfig] and [`RealtimeSessionModelSettings`][agents.realtime.config.RealtimeSessionModelSettings].

## Connection options

Set your API key in the environment:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or pass it directly when starting the session:

```python
session = await runner.run(model_config={"api_key": "your-api-key"})
```

`model_config` also supports:

-   `url`: Custom WebSocket endpoint
-   `headers`: Custom request headers
-   `call_id`: Attach to an existing realtime call. In this repo, the documented attach flow is SIP.
-   `playback_tracker`: Report how much audio the user has actually heard

If you pass `headers` explicitly, the SDK will **not** inject an `Authorization` header for you.

When connecting to Azure OpenAI, set `model_config["url"]` to a GA Realtime endpoint URL and pass headers explicitly. Avoid the legacy beta path (`/openai/realtime?api-version=...`) with realtime agents. See the [Realtime agents guide](/lib/08-agents/openai-agents-python/docs-realtime-guide#low-level-access-and-custom-endpoints) for details.

## Next steps

-   Read [Realtime transport](/lib/08-agents/openai-agents-python/docs-realtime-transport) to choose between server-side WebSocket and SIP.
-   Read the [Realtime agents guide](/lib/08-agents/openai-agents-python/docs-realtime-guide) for lifecycle, structured input, approvals, handoffs, guardrails, and low-level control.
-   Browse the examples in [`examples/realtime`](https://github.com/openai/openai-agents-python/tree/main/examples/realtime).
