---
title: "Cloud Sandbox Extension Examples"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/extensions/README.md"
sourceRel: "examples/sandbox/extensions/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/extensions/README.md"
sourceSha256: "c73b194621180ffc024aa8e09c374086347fd81da10bac7233cd5a87e8905940"
pageSha256: "c73b194621180ffc024aa8e09c374086347fd81da10bac7233cd5a87e8905940"
contentMode: "local-full"
zh: ""
---

# Cloud Sandbox Extension Examples

These examples are for manual verification of the cloud sandbox backends that live under `agents.extensions.sandbox`.

They intentionally keep the flow simple:

1. Build a tiny manifest in memory.
2. Create a `SandboxAgent` that inspects that workspace through one shell tool.
3. Run the agent against E2B, Modal, Daytona, Cloudflare, Runloop, Blaxel, or Vercel.

All of these examples require `OPENAI_API_KEY`, because they call the model through the normal `Runner` path. Each cloud backend also needs its own provider credentials.

## E2B

### Setup

Install the repo extra:

```bash
uv sync --extra e2b
```

Create an E2B account, create an API key, and export it as `E2B_API_KEY`.
The official setup docs are:

- <https://e2b.dev/docs/api-key>
- <https://e2b.dev/docs/quickstart>

Export the required environment variables:

```bash
export OPENAI_API_KEY=...
export E2B_API_KEY=...
```

### Run

```bash
uv run python examples/sandbox/extensions/e2b_runner.py --stream
```

Useful flags:

- `--sandbox-type e2b_code_interpreter`
