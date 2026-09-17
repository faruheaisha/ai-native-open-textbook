---
title: "OpenAI-managed Responses delegation"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/assistants/responses/README.md"
sourceRel: "examples/audio/duplex_voice_agent_evaluation/assistants/responses/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/audio/duplex_voice_agent_evaluation/assistants/responses/README.md"
sourceSha256: "e8fdffcca8abff526cfedb40c48c5701baecb8f4e7ea282388dd02c6bccd4940"
pageSha256: "e8fdffcca8abff526cfedb40c48c5701baecb8f4e7ea282388dd02c6bccd4940"
contentMode: "local-full"
zh: ""
---

# OpenAI-managed Responses delegation

Configures GPT Live with `session.delegation.type: "responses"`. GPT Live owns
backend conversation continuity and result injection; application
tool calls execute inside the assistant against isolated application-owned
state. Evaluators only observe tool events and final state.

Commands assume the harness directory. See [setup](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation#3-set-up-and-run)
for setup and installed-wheel usage; live commands incur API usage.

Everything needed to customize this backend lives in this folder:
`prompts/backend.txt`, `tools/restaurant.py`, `tools/definitions.json`, and
`tools/restaurant_facts.json`. Frontend instructions live in
`../frontend/prompts/voice.txt`.

The bundled restaurant behavior follows the
[comparison-baseline contract](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation-assistants#bundled-comparison-baseline).
Keep baseline fixes aligned with the client assistant; document intentional variants.

```bash
uv run run-eval --scenario restaurant_booking_complete --assistant responses
```
