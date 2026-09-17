---
title: "Chapter 19: Dynamic Workflows — Orchestrating an Agent Fleet with a Deterministic Script"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/19-dynamic-workflows.md"
sourceRel: "en/docs/19-dynamic-workflows.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/19-dynamic-workflows.md"
sourceSha256: "f9a92536e143d1168f1fa8a76245d1356f9dc0c9c01206b321ce394e96ebf47f"
pageSha256: "f9a92536e143d1168f1fa8a76245d1356f9dc0c9c01206b321ce394e96ebf47f"
contentMode: "local-full"
zh: ""
---

# Chapter 19: Dynamic Workflows — Orchestrating an Agent Fleet with a Deterministic Script

> Chapter 8 covered Claude Code's multi-agent modes: a main agent spawning subagents, a coordinator dispatching workers, Swarm peer-to-peer. But those forms of orchestration share one thing — who to spawn, when, and when to merge are all decided by the model on the fly, in its reasoning. For genuinely big work (rolling a change across dozens of files, auditing a whole dependency chain, verifying a large batch of candidates one by one), what you want isn't "the model scheduling as it thinks" but deterministic orchestration: a script that fans out dozens to hundreds of subagents at once, with a concurrency cap, a token budget, and resume-from-checkpoint. This is Dynamic Workflows, triggered by the keyword `ultracode`.
>
> The main evidence for this chapter is the description of the Workflow tool — the block injected into the main model that teaches it how to write a workflow script. It's right there in the tool set the runtime injects, and its key sentences (the concurrency cap, the item cap, the total-agent cap) line up verbatim with the 2.1.201 binary, so the copy we have is the real thing. Add the runtime constants leaked in the binary and a family of telemetry events, and this chapter lands on fairly solid ground. As for exactly how any one workflow branches and converges — that's written in the script, authored by the model on the fly, and is the part we can't get; more on that below.

## 19.1 Two kinds of orchestration: the model as coordinator, or a script as coordinator

Start by connecting to Chapter 8. Its three multi-agent modes — subagent, coordinator, Swarm — are all fundamentally model-driven orchestration: the main model or coordinator decides, in each round of reasoning, "who to dispatch now, and how to synthesize once results come back." The "prompt design essentials" in the coordinator section are about using a prompt to guide the model through that scheduling judgment well.
