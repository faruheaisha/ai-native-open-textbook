---
title: "Invocations WebSocket (invocationsws) Protocol"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invocations-ws/invocations-ws.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invocations-ws/invocations-ws.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invocations-ws/invocations-ws.md"
sourceSha256: "7dc293f3222dbcfc4ab9d06847f9825814a1e44581a3823d5fa23b6d21c000f1"
pageSha256: "7dc293f3222dbcfc4ab9d06847f9825814a1e44581a3823d5fa23b6d21c000f1"
contentMode: "local-full"
zh: ""
---

# Invocations WebSocket (`invocations_ws`) Protocol

Build, deploy, and connect to Foundry hosted agents that expose a **duplex WebSocket** endpoint instead of an HTTP request/response surface. Use this for real-time, bidirectional workloads — voice agents, live transcripts, custom streaming protocols, and signaling for out-of-band media transports.

> ℹ️ **Generally available.** `invocations_ws` is GA — **no preview feature flag is required**. Every upgrade must carry the required `api-version=v1` query parameter. For current region availability see [Foundry Hosted Agents — region availability](https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents#region-availability).
>
> **Migrating from preview:** the old `HostedAgents=V1Preview` gate (sent via the `foundry_features` query parameter or the `Foundry-Features` header) has been removed — stop sending it. Project and agent are now **path segments** instead of query parameters.

## Quick Reference

| Property | Value |
|----------|-------|
| Agent type | Hosted (Bring Your Own container) only |
| Protocol id (`azure.yaml`) | `invocations_ws` |
| Recommended version | `1.0.0` |
| Container route | `WS /invocations_ws` (served by `azure-ai-agentserver-invocations`; the host binds the port and probes for you) |
| Foundry-side URL | `wss://\{account\}.services.ai.azure.com/api/projects/\{project\}/agents/\{agentName\}/endpoint/protocols/invocations_ws?api-version=v1&agent_session_id=\{sessionId\}` |
| Auth | `Authorization: Bearer <Entra token>` for scope `https://ai.azure.com/.default` |
| Wire format | Developer-defined (binary frames, JSON text frames, protobuf, raw PCM — anything) |
| Session affinity | Per-connection, keyed by the `agent_session_id` query parameter (optional — auto-generated if omitted) |
| Multi-turn / state | Agent-managed inside the container; platform does **not** store history |

## When to Use This Skill

- Build or operate a hosted real-time voice agent (audio in / audio out, control frames)
- Bridge an out-of-band media transport (WebRTC, SFU, telephony) to a Foundry-hosted bot via WebSocket signaling
- Stream events bidirectionally that don't fit `responses` (OpenAI-compatible) or `invocations` (single bytes-in/bytes-out HTTP)
- Connect a browser or native client to an already-deployed `invocations_ws` agent

> ℹ️ For HTTP-based invocation (single request/response, OpenAI `responses` API, or custom HTTP `invocations`), use the [`invoke`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invoke-invoke) skill instead.

## Protocol Comparison

| Aspect | `responses` | `invocations` | `invocations_ws` |
|--------|-------------|---------------|------------------|
| Transport | HTTPS | HTTPS | WebSocket (`wss://`) |
| Lifetime | Per request | Per request | Long-lived duplex |
| Wire format | OpenAI-compatible JSON | Raw bytes (developer-defined) | Frames, developer-defined |
| History | Platform via `conversationId` | Agent-managed | Agent-managed via `agent_session_id` |
| Streaming | `stream: true` (SSE) | Agent-controlled | Native duplex |
| Best for | Chat | Webhooks / classifiers / protocol bridges | Voice, signaling, real-time |

## Workflow

### Step 1: Author the Container

Use the `azure-ai-agentserver-invocations` host — the same package that serves HTTP `/invocations` — and register a WebSocket handler with `@app.ws_handler`. The host runs the server, binds the port, exposes `/readiness`, handles `await websocket.accept()`, runs Ping/Pong keep-alive (default 30s), maps uncaught handler exceptions to close code `1011`, and emits the structured close event used by `azd ai agent monitor`. You can register `@app.invocation_handler` (HTTP `POST /invocations`) and `@app.ws_handler` (WebSocket `GET /invocations_ws`) on the same `app`.

```python
from azure.ai.agentserver.invocations import InvocationAgentServerHost
from starlette.websockets import WebSocket

app = InvocationAgentServerHost()

@app.ws_handler                    # GET /invocations_ws (WebSocket upgrade)
async def ws(websocket: WebSocket) -> None:
    await run_bot(websocket)       # your duplex protocol lives here

app.run()
```

Inside the handler, read the session id from `FOUNDRY_AGENT_SESSION_ID` (env var set by the host), or fall back to the `agent_session_id` query parameter. The container does **not** see the `Authorization` header — APIM and the Agents service strip it after validation, so don't depend on it and don't accept an `authorization` query parameter.

> ⚠️ **You define the wire format.** The platform forwards frames as-is in both directions. There is no schema validation, no OpenAPI registration, no platform-managed history. Document your protocol for callers.

See [Invocations WebSocket Protocol Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invocations-ws-references-invocations-ws-protocol) for the framing model, the `agent_session_id` query parameter, control-vs-data frame patterns, and discovery guidance.

### Step 2: Declare the Protocol in `azure.yaml`

In the agent's service block (`host: azure.ai.agent`):

```yaml
services:
  my-ws-agent:
    host: azure.ai.agent
    kind: hosted
    name: my-ws-agent
    protocols:
      - protocol: invocations_ws
        version: 1.0.0
    container:
      resources:
        cpu: "1"          # voice/media: at least 1 vCPU / 2 GiB; up to 2 vCPU / 4 GiB
        memory: 2Gi
    environmentVariables:
      - name: SOME_SECRET
        value: ${SOME_SECRET}
      # Resolve every secret from the azd environment; do not bake values into the image.
```

The matching `agent.manifest.yaml` declares the same `protocol: invocations_ws` under `template.protocols`.

> ⚠️ The default `azd` scaffold uses `0.25 cpu / 0.5Gi`, which is too small for most real-time workloads. Bump `resources` before deploying.

### Step 3: Deploy via `azd`

Use the standard hosted-agent flow from the [`deploy`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy) skill:

```bash
mkdir ~/azd-deploys/my-ws-agent && cd ~/azd-deploys/my-ws-agent
