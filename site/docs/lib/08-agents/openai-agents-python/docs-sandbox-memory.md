---
title: "Agent memory"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/docs/sandbox/memory.md"
sourceRel: "docs/sandbox/memory.md"
rawUrl: "/raw/08-agents/openai-agents-python/docs/sandbox/memory.md"
sourceSha256: "46ff199734b1d0daf0ff0873866fdadc185cab825b0cedeccf37b90f47a290f9"
pageSha256: "46ff199734b1d0daf0ff0873866fdadc185cab825b0cedeccf37b90f47a290f9"
contentMode: "local-full"
zh: ""
---

# Agent memory

Memory lets future sandbox-agent runs learn from prior runs. It is separate from the SDK's conversational [`Session`](/lib/08-agents/openai-agents-python/docs-sessions) memory, which stores message history. Memory distills lessons from prior runs into files in the sandbox workspace.

!!! warning "Beta feature"

    Sandbox agents are in beta. Expect details of the API, defaults, and supported capabilities to change before general availability, and expect more advanced features over time.

Memory can reduce three kinds of cost for future runs:

1. Agent cost: If the agent took a long time to complete a workflow, the next run should need less exploration. This can reduce token usage and time to completion.
2. User cost: If the user corrected the agent or expressed a preference, future runs can remember that feedback. This can reduce human intervention.
3. Context cost: If the agent completed a task before, and the user wants to build on that task, the user should not need to find the previous thread or re-type all the context. This makes task descriptions shorter.

See [examples/sandbox/memory.py](https://github.com/openai/openai-agents-python/blob/main/examples/sandbox/memory.py) for a complete two-run example that fixes a bug, generates memory, resumes a snapshot, and uses that memory in a follow-up verifier run. See [examples/sandbox/memory_multi_agent_multiturn.py](https://github.com/openai/openai-agents-python/blob/main/examples/sandbox/memory_multi_agent_multiturn.py) for a multi-turn, multi-agent example with separate memory layouts.

## Enable memory

Add `Memory()` as a capability to the sandbox agent.

```python
from pathlib import Path
import tempfile

from agents.sandbox import LocalSnapshotSpec, SandboxAgent
from agents.sandbox.capabilities import Filesystem, Memory, Shell

agent = SandboxAgent(
    name="Memory-enabled reviewer",
    instructions="Inspect the workspace and preserve useful lessons for follow-up runs.",
    capabilities=[Memory(), Filesystem(), Shell()],
)

with tempfile.TemporaryDirectory(prefix="sandbox-memory-example-") as snapshot_dir:
    sandbox = await client.create(
        manifest=manifest,
        snapshot=LocalSnapshotSpec(base_path=Path(snapshot_dir)),
    )
```

If read is enabled, `Memory()` requires `Shell()`, which lets the agent read and search memory files when the injected summary is not enough. When live memory update is enabled (by default), it also requires `Filesystem()`, which lets the agent update `memories/MEMORY.md` if the agent discovers stale memory or the user asks it to update memory.

By default, memory artifacts are stored in the sandbox workspace under `memories/`. To reuse them in a later run, preserve and reuse the whole configured memories directory by keeping the same live sandbox session or resuming from a persisted session state or snapshot; a fresh empty sandbox starts with empty memory.

`Memory()` enables both reading and generating memories. Use `Memory(generate=None)` for agents that should read memory but should not generate new memories—for example, when runs by internal agents, subagents, checkers, or one-off tool agents do not add much signal. Use `Memory(read=None)` when the run should generate memory for later, but the user doesn't want the run to be influenced by existing memory.

## Read memory

Memory reads use progressive disclosure. At the start of a run, the SDK injects a small summary (`memory_summary.md`) of generally useful tips, user preferences, and available memories into the agent's developer prompt. This gives the agent enough context to decide whether prior work may be relevant.

When prior work looks relevant, the agent searches the configured memory index (`MEMORY.md` under `memories_dir`) for keywords from the current task. It opens the corresponding prior rollout summaries under the configured `rollout_summaries/` directory only when the task needs more detail.

Memory can become stale. Agents are instructed to treat memories as guidance only and trust the current environment. By default, memory reads have `live_update` enabled, so if the agent discovers stale memory, it can update the configured `MEMORY.md` in the same run. Disable live updates when the agent should read memory but not modify it during the run, for example if the run is latency sensitive.

## Generate memory

After a run finishes, the sandbox runtime appends that run segment to a conversation file. Accumulated conversation files are processed when the sandbox session closes.

Memory generation has two phases:

1. Phase 1: conversation extraction. A memory-generating model processes one accumulated conversation file and generates a conversation summary. System, developer, and reasoning content are omitted. If the conversation is too long, it is truncated to fit within the context window, with the beginning and end preserved. It also generates a raw memory extract: compact notes from the conversation that Phase 2 can consolidate.
2. Phase 2: layout consolidation. A consolidation agent reads raw memories for one memory layout, opens conversation summaries when more evidence is needed, and extracts patterns into `MEMORY.md` and `memory_summary.md`.

The default workspace layout is:

```text
workspace/
├── sessions/
