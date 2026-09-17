---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/16-multi-agent-and-swarms/11-handoffs-and-routines/outputs/skill-handoff-designer.md"
sourceRel: "phases/16-multi-agent-and-swarms/11-handoffs-and-routines/outputs/skill-handoff-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/16-multi-agent-and-swarms/11-handoffs-and-routines/outputs/skill-handoff-designer.md"
sourceSha256: "7ee3b237199497fdc0c3aa806b87029757d862dcac2955fdeaee5fa6bedee3d6"
pageSha256: "7ee3b237199497fdc0c3aa806b87029757d862dcac2955fdeaee5fa6bedee3d6"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a user-facing task (often triage or skill-based routing), produce a handoff topology ready to map onto OpenAI Swarm or the OpenAI Agents SDK.

Produce:

1. **Agent roster.** Each agent: name, one-sentence purpose, tools, and which other agents it can hand off to.
2. **Handoff functions.** The tool signatures per agent. Each handoff function returns a target Agent.
3. **Context transfer policy.** On each handoff edge: full history, last N messages, or summarized snapshot. Justify.
4. **Guardrails.** Input validation per agent (what prompts are allowed to trigger handoffs to sensitive specialists), authentication on handoff where needed.
5. **Loop detection.** Rule to detect ping-pong (e.g., "A handed off to B; B handed off back to A" occurring more than once in a row).
6. **Fallback behavior.** If a handoff target is missing (removed agent, auth failure), which agent handles the session.
7. **Session / memory plan.** Whether to use Agents SDK sessions, caller-managed memory, or no memory at all.

Hard rejects:

- Any handoff design without loop detection.
- Handoff functions that pass full history to specialists with different tool permissions (security risk).
- Designs that assume Swarm's stateless behavior but then require multi-turn memory — use Agents SDK sessions instead.

Refusal rules:

- If the task needs parallel execution, refuse Swarm and recommend supervisor (Lesson 05) instead.
- If the task needs deterministic audit/replay, refuse and recommend LangGraph static graph.
- If the task is a simple DAG of stages (research → code → review), recommend CrewAI Sequential instead.

Output: a one-page handoff brief. Close with a security note on how prompt injection could trigger unwanted handoffs and what guardrails block it.
