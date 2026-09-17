---
title: "Talon Example"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/talon/README.md"
sourceRel: "examples/talon/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/talon/README.md"
sourceSha256: "c3005392fcabfa99ce13f54cb77a81d00e007673563807d62e5f5ef09b192ea6"
pageSha256: "c3005392fcabfa99ce13f54cb77a81d00e007673563807d62e5f5ef09b192ea6"
contentMode: "local-full"
zh: ""
---

# Talon Example

This example runs a Talon host process with one or more channel adapters in the same container. The host `~/talon-workspace/` directory is mounted at `/workspace`.

> **Experimental:** Talon is an experimental runtime and is subject to change or removal at any time.

## Run

```bash
cp .env.example .env
mkdir -p ~/talon-workspace ~/.deepagents
# Fill AGENT_MODEL provider credentials, then uncomment the channel you want to use.
# Build once and run:
docker compose build
docker compose up
```

### WhatsApp

Uncomment the WhatsApp env vars in `.env` and scan the QR code printed by the bridge. The default exposure mode is `self`, so only messages sent by the paired WhatsApp account trigger the agent. Use `allowlist` or `open` only when you intentionally want other chats to trigger the agent.

### Telegram

Uncomment the Telegram env vars in `.env` and set `DEEPAGENTS_TALON_TELEGRAM_BOT_TOKEN`. The default exposure mode is `self`, which requires `DEEPAGENTS_TALON_TELEGRAM_OPERATOR_ID` to identify your Telegram user ID. Use `allowlist` or `open` only when you intentionally want other chats to trigger the agent.

## Voice Transcription

Voice transcription is enabled by default in `.env.example`. The Docker example installs `ffmpeg` plus the Talon `media` extra, so inbound voice notes are transcribed locally with NVIDIA Parakeet through Transformers before reaching the agent. The first voice message can be slow because the ASR model is downloaded lazily. Set `DEEPAGENTS_TALON_VOICE_TRANSCRIPTION_DEVICE=cuda` when running on a GPU-enabled host.

Parakeet and Qwen embedding model downloads persist through the existing home bind mount. For `docker run`, add `-v "$HOME/.deepagents:/root/.deepagents"`.
