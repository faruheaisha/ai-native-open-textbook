---
title: "Twilio SIP Realtime Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/realtime/twilio_sip/README.md"
sourceRel: "examples/realtime/twilio_sip/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/realtime/twilio_sip/README.md"
sourceSha256: "cc5e5b90d59a46000447c04e6f326c7cb68f3ca5bbd9a92677aff873ec8d363e"
pageSha256: "cc5e5b90d59a46000447c04e6f326c7cb68f3ca5bbd9a92677aff873ec8d363e"
contentMode: "local-full"
zh: ""
---

# Twilio SIP Realtime Example

This example shows how to handle OpenAI Realtime SIP calls with the Agents SDK. Incoming calls are accepted through the Realtime Calls API, a triage agent answers with a fixed greeting, and handoffs route the caller to specialist agents (FAQ lookup and record updates) similar to the realtime UI demo.

## Prerequisites

- Python 3.10+
- An OpenAI API key with Realtime API access
- A configured webhook secret for your OpenAI project
- A Twilio account with a phone number and Elastic SIP Trunking enabled
- A public HTTPS endpoint for local development (for example, [ngrok](https://ngrok.com/))

## Configure OpenAI

1. In [platform settings](https://platform.openai.com/settings) select your project.
