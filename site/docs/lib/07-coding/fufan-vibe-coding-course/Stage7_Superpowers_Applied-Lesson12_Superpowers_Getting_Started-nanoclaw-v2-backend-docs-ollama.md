---
title: "Running Agents on Local Ollama"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/ollama.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/ollama.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/ollama.md"
sourceSha256: "2c07c1e0114521a17932b070196e6d340d4128936a7344a4dce1aa90d6a3d662"
pageSha256: "2c07c1e0114521a17932b070196e6d340d4128936a7344a4dce1aa90d6a3d662"
contentMode: "local-full"
zh: ""
---

# Running Agents on Local Ollama

NanoClaw agents can be routed to a local [Ollama](https://ollama.com) instance instead of the Anthropic API. This cuts API costs to zero and keeps all inference on your hardware.

## How It Works

Ollama exposes an Anthropic-compatible `/v1/messages` endpoint. The Claude Code CLI (which runs inside agent containers) uses the Anthropic SDK, which reads `ANTHROPIC_BASE_URL` to find the API host. Pointing that variable at Ollama is all that's needed — no new provider code, no changes to the agent runtime.

```
┌─────────────────────────────┐
│  Agent container            │
│                             │
│  Claude Code CLI            │
│    ↓ ANTHROPIC_BASE_URL     │
│    http://host.docker.      │      ┌──────────────────┐
│    internal:11434    ───────┼─────▶│  Ollama :11434   │
│                             │      │  gemma4:latest   │
└─────────────────────────────┘      └──────────────────┘
```

`host.docker.internal` is Docker's magic hostname that resolves to the host machine from inside a container — so Ollama running on your Mac or Linux box is reachable at that address.

## The OneCLI Complication

NanoClaw normally runs API calls through an OneCLI HTTPS proxy that injects real credentials in place of a placeholder key. When redirecting to Ollama you need to bypass that proxy so requests go direct. Two env vars handle this:

- `NO_PROXY=host.docker.internal` — tells the Anthropic SDK's HTTP client to skip the proxy for that hostname
- `no_proxy=host.docker.internal` — lowercase variant for tools that check the lowercase form

Both are set in the agent group's `container.json` alongside `ANTHROPIC_BASE_URL`.

## Network Isolation

Setting `ANTHROPIC_BASE_URL` redirects requests but doesn't prevent a misconfigured agent from accidentally reaching `api.anthropic.com` directly. The `blockedHosts` field in `container.json` adds a Docker `--add-host` flag that resolves the domain to `0.0.0.0`, making it physically unreachable from inside the container:

```json
"blockedHosts": ["api.anthropic.com"]
```

With this in place, even if the model setting drifts back to a Claude model name, the API call will fail immediately rather than silently billing your account.

## Model Selection
