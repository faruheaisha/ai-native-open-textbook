---
title: "Evaluated assistant"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/assistants/README.md"
sourceRel: "examples/audio/duplex_voice_agent_evaluation/assistants/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/audio/duplex_voice_agent_evaluation/assistants/README.md"
sourceSha256: "e6e03bf033ccb878f0fc3ce69df1e46c5014a25b9a5104f86b841a9df46d6a27"
pageSha256: "e6e03bf033ccb878f0fc3ce69df1e46c5014a25b9a5104f86b841a9df46d6a27"
contentMode: "local-full"
zh: ""
---

# Evaluated assistant

One GPT Live voice frontend supports two backend-delegation architectures.
Both use the same evaluation scenarios, application state, and grading.
Commands below assume the harness directory; see [setup](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#3-set-up-and-run)
for setup and installed-wheel usage. Live commands require model access and incur API usage.

```text
config.py                    environment settings, prompt loading, and session selection
resources.py                 assistant-owned prompt, tool, and fixture loading
runtime.py                   shared tool contracts and asynchronous execution
errors.py                    assistant lifecycle and delegated-tool errors
frontend/
  assistant.py                shared GPT Live connection, audio, and events
  connection.py               observable delegation events without evaluator execution
  events.py                   exactly-once terminal events and closed-stream handling
  transport.py                authenticated transport and session protocol
  prompts/voice.txt           shared voice-agent instructions
responses/
  assistant.py                OpenAI-managed Responses delegation
  delegation.py               assistant-owned tool execution and result injection
  prompts/backend.txt         backend instructions
  tools/definitions.json      Responses-owned application tool schema
  tools/restaurant.py         Responses-owned application tools and offline behavior
  tools/restaurant_facts.json Responses-owned authorized business facts
client/
  assistant.py                application-managed delegation
  backend.py                  provider-neutral application-backend contract
  openai_backend.py           optional OpenAI Responses reference adapter
  memory.py                   caller/assistant transcript context
  prompts/backend.txt         backend instructions
  tools/definitions.json      client-owned application tool schema
  tools/restaurant.py         client-owned application tools and offline behavior
  tools/restaurant_facts.json client-owned authorized business facts
```

Each backend is self-contained: edit its own prompt, tool schema,
implementation, and facts without changing the other backend. Only the voice
frontend and generic execution contracts are shared. Set models, voices,
credentials, and optional application endpoints in the selected `.env` file or
shell. See [environment-file selection](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#environment-file-selection).

## Bundled comparison baseline

The two bundled restaurant assistants are intentionally independent copies.
For a controlled comparison of delegation architectures, their backend prompts,
tool schemas, business facts, authorization rules, and observable tool behavior
must agree. Their orchestration, conversation memory, and result-injection
mechanisms are expected to differ. Matching baseline behavior does not require
identical Python source or a shared restaurant implementation.

Run the offline contract tests after changing either backend:

```bash
uv run pytest assistants/tests/test_restaurant_baseline.py
```

The tests compare the bundled resources, exercise both implementations against
explicit success and failure expectations, check that denied actions cannot
mutate state, and verify that state and customizations stay isolated. They also
compare offline behavior over the bundled scenarios using only caller-visible
inputs and authorized application state. Evaluator-private expected answers,
grading rules, and completion criteria must not enter assistant code.

For a baseline bug fix, update both independently owned copies and add a common
regression case. For an intentional experiment, use a clearly named branch or
separate application backend; record which prompt, schema, facts, permissions,
model settings, or behavior differ. Keep the bundled baseline unchanged when
possible. If a reviewed product decision changes the bundled comparison itself,
replace only the affected parity assertion with explicit per-variant expected
behavior and document the difference here. Do not broadly skip the parity suite
or weaken authorization and state-isolation tests. Results from customized or
remote applications must not be described as an architecture-only comparison
unless their application behavior and relevant settings have been aligned.

## OpenAI-managed Responses delegation

```bash
uv run crawl-eval --example restaurant_005 --assistant responses
uv run run-eval --scenario restaurant_booking_complete --assistant responses
```

`responses/` configures `session.delegation.type: "responses"`.
GPT Live owns the delegated Responses conversation, and application tools
execute inside the assistant. After the invocation completes and every function
has returned, the assistant sends all `response.item.create` results followed by
one `response.create`. Nested `response.completed.output` is not the function inventory.

## Application-managed client delegation

```bash
uv run crawl-eval --example restaurant_005 --assistant client
uv run run-eval --scenario restaurant_booking_complete --assistant client
```

`client/` configures `session.delegation.type: "client"`. The application:

1. Observes actual caller and assistant transcript events.
2. Builds an incremental timestamped transcript for each delegation.
3. Calls any separately managed model, agent, or application backend.
4. Executes authorized application tools against scenario-isolated state.
5. Returns natural-language results using `session.commentary.append`.

V3 `session.delegation.created.delegation` contains IDs and a target, without task
text. The backend resolves the request from retained history and incremental
transcript fragments. Returned commentary carries the original `delegation_id`;
`session.commentary.appended.client_event_id` confirms acceptance, not speech.

GPT Live does not provide complete conversation memory to a client backend.
The application owns context, transcript history, backend continuity, and tool
execution. Implement the `ApplicationBackend` protocol for any model provider,
or use the bundled OpenAI adapter, which replays application-owned history with
`store: false`.

The evaluator uses `/v1/live/sessions`, Bearer authentication, and
`session.start` with `session.model`, startup `input`, and 24 kHz PCM audio.
`session.update` is reserved for supported same-mode delegation changes.
Transcript frames use the provider session clock; untimed output audio uses
local playout timing. Turns are derived from speech and transcript evidence.

Sessions created by this evaluator carry audio and control events on the same
authenticated WebSocket. The toolkit does not provide a WebRTC, SIP, or
separately attached sideband adapter.

## Existing application endpoint

Configure a separately deployed application in `.env`:

```dotenv
OPENAI_CLIENT_ASSISTANT_ENDPOINT=wss://agent.example.com/ws/assistant
# Set the same dedicated random secret on the service and evaluator.
