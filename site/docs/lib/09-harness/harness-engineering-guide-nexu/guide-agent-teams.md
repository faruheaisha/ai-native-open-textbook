---
title: "Agent Teams: Parallel Claudes Building Real Software"
sourceId: "09-harness/harness-engineering-guide-nexu"
sourceTitle: "Harness Engineering 指南（nexu.io）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/nexu-io/harness-engineering-guide"
entryUrl: "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/agent-teams.md"
sourceRel: "guide/agent-teams.md"
rawUrl: "/raw/09-harness/harness-engineering-guide-nexu/guide/agent-teams.md"
sourceSha256: "a15e4aa3e611693e4e02459d6e7201b12e1382ea37d2757b35531ecabe3f53cd"
pageSha256: "a15e4aa3e611693e4e02459d6e7201b12e1382ea37d2757b35531ecabe3f53cd"
contentMode: "local-full"
zh: ""
---

# Agent Teams: Parallel Claudes Building Real Software

Most agent demos look impressive and do nothing useful. A to-do list app. A
todo scraper. A "personal research assistant" that summarizes three web pages.

Then somebody plugs sixteen Claudes into a loop and they build a C compiler
that can compile the Linux kernel.

This article is about that second thing — and specifically, what the harness
underneath it looked like. We'll walk through the architecture from Nicholas
Carlini's project *"Building a C compiler with a team of parallel Claudes"*
([Anthropic Engineering](https://www.anthropic.com/engineering/building-c-compiler),
[GitHub](https://github.com/anthropics/claudes-c-compiler)), pull out the
design principles that actually mattered, and translate them into patterns
you can reuse in your own harness.

---

## The Core Insight

> **16 Claude instances, running in parallel for about two weeks, produced
> a 100,000-line C compiler written in Rust. It compiles Linux 6.9 on x86,
> ARM, and RISC-V. It passes 99% of the GCC torture test suite. It compiles
> QEMU, FFmpeg, SQLite, Postgres, and Redis.**

Read that again. Then read it once more.

This is not a toy. This is a real production-grade compiler, written by a
team of LLMs under constraints much tighter than a human team would tolerate:
no internet access, no existing compiler crates, no copying from LLVM or
tcc — only the Rust standard library and whatever Claude could reason out
from the C spec and its training. A clean-room implementation done by
agents.

The interesting question isn't "can an LLM write a compiler." We already
knew it could write *parts* of one. The interesting question is:

**What harness turns 16 stateless, forgetful LLM calls into a coherent
engineering team that ships 100,000 lines of code?**

---

## Project Scorecard

Before we dig into the architecture, here's the ledger:

```
┌─────────────────────────────────────────────────────────────┐
│  Parallel Claudes:     16                                   │
│  Total sessions:       2,000+                               │
│  Wall-clock time:      ~2 weeks                             │
│  API cost:             ~$20,000                             │
│  Human code written:   ~0 lines (harness + prompts only)    │
│  Lines of Rust:        ~100,000                             │
│                                                             │
│  Torture-test pass:    99% (GCC torture suite)              │
│  Self-hosts Linux:     ✅ 6.9 on x86 / ARM / RISC-V         │
│  Also compiles:        QEMU, FFmpeg, SQLite, Postgres,      │
│                        Redis                                │
│                                                             │
│  Net-access for agent: ❌ none                              │
│  External crates:      ❌ std lib only                      │
└─────────────────────────────────────────────────────────────┘
```

$20K for a C compiler is expensive by hobbyist standards and laughably
cheap by compiler-team standards. A two-person compiler startup burns
$20K in three working days.

---

## The Ralph-Loop Architecture

The heart of the harness is embarrassingly simple. Each agent is a bash
loop:

```bash
#!/usr/bin/env bash
# agent.sh — run inside a Docker container
while true; do
  claude --dangerously-skip-permissions -p AGENT_PROMPT.md
done
```

That's it. That's the whole agent.

No orchestrator. No task queue daemon. No scheduler. No message bus.
When one Claude session finishes — success, failure, or context-window
collapse — the loop starts a fresh Claude with the same prompt file.
The prompt tells the new Claude to go look at the repo, figure out what
needs doing next, and do it.

This style is sometimes called a "Ralph loop" (after Ralph Wiggum's
"I'm helping!"): a dumb outer loop keeps kicking a smart inner process
until the work is done.

The only supervisor-level intervention is:

```bash
# kill the fleet
pkill -9 bash
```

That's the entire shutdown protocol. There is no graceful drain, no
"please finish your current task." You SIGKILL the bash loops and the
agents die mid-thought. Next time you start them, they pick up from
wherever `git pull` left them.

### Why this works

A Ralph loop is the right shape for agent work for three reasons:

1. **LLMs are stateless between sessions anyway.** Pretending they're
   long-running processes only hides context-window collapse behind
   increasingly desperate tricks.
2. **Restart is free.** A fresh Claude reading the repo is cheaper than
   a stale Claude that has filled its context with 3 hours of failed
   experiments.
3. **Failure isolation comes for free.** If a session goes off the rails,
   the next session doesn't inherit the wreckage — it inherits the git
   state, which is the only source of truth.

---

## Git-Based Coordination (No Orchestrator)

Here's the part that surprises most people: **there is no central
orchestrator.** Nothing is handing out tasks. Nothing knows who's doing
what. There is no dashboard with "agent-7 is currently working on
struct-packing."

Instead, the fleet coordinates through two primitives:

1. A **bare git repo** that each container pushes to and pulls from.
2. A directory called `current_tasks/` containing **lock files** — one
