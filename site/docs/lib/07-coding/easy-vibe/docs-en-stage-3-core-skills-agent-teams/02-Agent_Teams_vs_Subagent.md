---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/core-skills/agent-teams/index.md"
sourceRel: "docs/en/stage-3/core-skills/agent-teams/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-3/core-skills/agent-teams/index.md"
sourceSha256: "c7d999b48926ec64f7271877a026f0bd8daa20fee13b9dea6f6ed971cbee78b4"
pageSha256: "5fc5099d8b5c11147fb8027344dba510a2af535e513bb62dbf992cc4bc9c3d29"
contentMode: "local-full"
zh: ""
---

## Agent Teams vs Subagent

Before going deeper into the architecture of Agent Teams, we should first clear up a common point of confusion: **what is the difference between Agent Teams and Subagent**?

Both features involve "multiple AIs collaborating," but their collaboration models are completely different and suitable for different scenarios.

### Core differences at a glance

| Dimension | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **Topology** | Star topology: all subagents report to the main agent | Mesh topology: members can communicate with each other |
| **Communication style** | The main agent explicitly passes information via prompts, and subagents return results when done | Members can communicate, discuss, and coordinate directly |
| **Context management** | Every subagent has an independent context, and the main agent passes only the necessary information | Every member has a fully independent context |
| **Parallelism** | Can run in parallel, but the collaboration chain still centers on the main agent | True parallel development and collaboration |
| **Task coordination** | The main agent dispatches and coordinates everything centrally | Members can take ownership of tasks more autonomously |
| **Cost** | Not low. Token usage stacks when multiple subagents run in parallel | Higher. Members run independently and communicate more frequently |

### An intuitive analogy

**Subagent is like**: a manager writing separate task slips for several assistants. Each assistant works independently based on its own task slip, and when finished, only returns the result to the manager. The assistants do not communicate directly, and the manager does not see the assistants' full thought process while they work.

```
You → Main Agent → Subagent A: "Analyze this file"
You → Main Agent → Subagent B: "Search for that function"
         ↓
    Subagent A completes → reports result to Main Agent
    Subagent B completes → reports result to Main Agent
         ↓
    Main Agent synthesizes the results → reports back to you
```

**Agent Teams is like**: a project manager leading a real development team. Team members can communicate, discuss, and collaborate directly, rather than routing every detail through the project manager.

```
You → Team Lead: "Build a user authentication feature"
         ↓
    Team Lead creates the team and assigns tasks
         ↓
    Teammate A: "@Teammate B, is the API interface design ready?"
    Teammate B: "Yes, here's the format..."
    Teammate C: "I reviewed the interface and found something we should discuss..."
         ↓
    Team members collaborate to finish the work → Team Lead synthesizes the result → reports back to you
```

### When to use which one

**Use Subagent when**:

- You have a quick, clear, single task, such as "search for this error code"
- Tasks do not depend much on each other
- You want parallel execution, but do not need sustained discussion between members

**Use Agent Teams when**:

- You are doing a complex system refactor that spans multiple modules
- You need multi-angle analysis and discussion, such as a security expert and a performance expert debating a solution
- You need true parallel development, with frontend, backend, and testing happening at the same time
- Tasks require frequent coordination and information sharing

### A simple summary

- **Subagent**: a task distribution tool that breaks a big task into smaller tasks and dispatches them to different "workers"
- **Agent Teams**: a real collaborative team where members can communicate, discuss, and work together like a real team
