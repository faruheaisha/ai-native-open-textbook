---
title: "Application-managed client delegation"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/assistants/client/README.md"
sourceRel: "examples/audio/duplex_voice_agent_evaluation/assistants/client/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/audio/duplex_voice_agent_evaluation/assistants/client/README.md"
sourceSha256: "bea6090b88ec3ecf5dddc5bf8ba5fa3d2b0fb96f1eb47e25d40d86b8effda805"
pageSha256: "bea6090b88ec3ecf5dddc5bf8ba5fa3d2b0fb96f1eb47e25d40d86b8effda805"
contentMode: "local-full"
zh: ""
---

# Application-managed client delegation

Configures GPT Live with `session.delegation.type: "client"`. This assistant
owns transcript handoffs, backend conversation memory, application-tool
execution, and `session.commentary.append` result injection.

Commands assume the harness directory. See [setup](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#3-set-up-and-run)
for setup and installed-wheel usage; live commands incur API usage.

Everything needed to customize this backend lives in this folder:
`prompts/backend.txt`, `tools/restaurant.py`, `tools/definitions.json`, and
`tools/restaurant_facts.json`. Frontend instructions live in
`../frontend/prompts/voice.txt`.

The bundled restaurant behavior follows the
[comparison-baseline contract](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation-assistants#bundled-comparison-baseline).
Keep baseline fixes aligned with Responses; document intentional variants.

```bash
uv run run-eval --scenario restaurant_booking_complete --assistant client
```

Set `OPENAI_CLIENT_ASSISTANT_ENDPOINT` in the selected `.env` file or shell to connect an existing
application implementing the reference WebSocket contract. The remote
application owns its prompts, backend, memory, tools, and state; it reports
completed tool observations to the evaluator without requesting evaluator-side
execution. Configure application fixtures inside the remote service and set a
dedicated `OPENAI_CLIENT_ASSISTANT_TOKEN` on both sides; never reuse an API key.
See [service setup](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation-assistants#existing-application-endpoint).
Remote connections require TLS. For an intentionally plaintext loopback service,
also set `OPENAI_CLIENT_ASSISTANT_ALLOW_INSECURE_LOOPBACK=true`; this never permits
remote plaintext. See [security and artifact handling](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#artifact-and-connection-safety).

The backend is provider-neutral: implement `ApplicationBackend` for your own
model or agent, or use `openai_backend.py` as an optional OpenAI reference
adapter. Conversation history always belongs to the application.
