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
pageSha256: "b9637fd1f4c5f2e7587fec37f4b0635e91658508defa1d99fd096daa9aeaa2ca"
contentMode: "local-full"
zh: ""
---

## Introduction to Agent Teams

**Agent Teams** is a revolutionary feature in Claude Code that allows **multiple independent AI instances to collaborate like a real development team**.

Imagine that in the past, using Claude Code was like being a project manager working with one exceptionally capable assistant. No matter how complex the task was, only that one assistant was doing the work. Now, with Agent Teams, you can assemble a full AI development team: one member can handle the frontend, one can handle the backend, one can handle testing, and they can **work at the same time, communicate with each other, and collaborate to complete complex tasks**.

### From a single assistant to team collaboration

Before diving into Agent Teams, let's first understand the problem it solves.

**Limitations of the single-AI mode**:

When you use a single Claude instance to handle a complex project, you will run into these bottlenecks:

- **Serial processing bottleneck**: AI can only do one thing at a time. For example, when refactoring a project, it may need to analyze the authentication module first, then the database module, and finally the API module. These steps must be done sequentially, even if they do not depend on each other.

- **Context crowding problem**: All information lives in a single conversation window. As the conversation gets longer, important early details can get buried, and AI may forget key decisions discussed earlier.

- **Single-perspective limitation**: Only one AI is thinking, so there is no multi-angle discussion or validation. When complex design decisions appear, there is no "teammate" to debate with or provide a different perspective.

- **Efficiency ceiling**: Large refactors or multi-module development take a long time, and there is no way to speed them up through parallelism.

**The Agent Teams solution**:

Agent Teams solves these problems through **parallel collaboration across multiple instances**:

- **True parallel work**: Multiple AIs can work on different tasks simultaneously. One can handle the frontend UI, another the backend API, and another the database design, without interfering with each other.

- **Independent context spaces**: Every team member has its own full 200K token context window, so important information is not "forgotten" because the conversation gets too long.

- **Team collaboration capability**: Members can communicate directly, discuss design decisions, and validate code quality with each other, just like a real development team.

- **A significant efficiency increase**: According to Anthropic's internal testing, efficiency on large-scale project refactors can improve by around 50%.
