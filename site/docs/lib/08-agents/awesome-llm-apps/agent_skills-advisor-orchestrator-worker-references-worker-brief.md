---
title: "Worker Brief Format"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/agent_skills/advisor-orchestrator-worker/references/worker-brief.md"
sourceRel: "agent_skills/advisor-orchestrator-worker/references/worker-brief.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/agent_skills/advisor-orchestrator-worker/references/worker-brief.md"
sourceSha256: "d35c9555cfd2193f3fd3868f97125c0ea91b3d3235f2a46f35876c8c69f9d3c4"
pageSha256: "d35c9555cfd2193f3fd3868f97125c0ea91b3d3235f2a46f35876c8c69f9d3c4"
contentMode: "local-full"
zh: ""
---

# Worker Brief Format

Every worker dispatch is one stateless call (an agy CLI run, or a
Gemini API request on the fallback path) containing this brief.
The worker has no memory, no follow-ups, and sees nothing but this text.
Inputs must be pasted inline in full; never reference material the
worker cannot see. For code subtasks that means the entrypoint, file
layout, and exact run commands; otherwise workers invent their own.

```
You are a worker completing ONE subtask of a larger project. This brief
is everything you get. No follow-ups are possible.
