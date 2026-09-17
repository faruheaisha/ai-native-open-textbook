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
pageSha256: "ca913fbd2f78d6d546d33ddea41d97bd594138efc5190c48bb81dc655cf7b74e"
contentMode: "local-full"
zh: ""
---

## Frequently asked questions

### Q1: Is Agent Teams stable? Can it be used in production?

Agent Teams is currently an **experimental feature**, so there may still be bugs and unstable behavior. Recommendations:

- Back up important projects first
- Start with small projects so you can test and get familiar with it
- Follow official release notes to see improvements in new versions
- Report issues to the official team promptly when they appear

### Q2: How many members can I create at most?

There is no hard theoretical limit, but from a practical perspective:

- Small projects: 2 to 3 people
- Medium projects: 3 to 5 people
- Large projects: 5 to 10 people

Too many members introduce the following problems:

- Coordination overhead rises sharply
- Token usage grows linearly
- File conflict probability increases
- Monitoring and management become harder

### Q3: Can team members see each other's context?

**No**. Every Teammate has a completely independent context window. They communicate through the messaging system rather than sharing context directly.

This is a deliberate design choice, and the benefits are:

- One member's reasoning is not polluted by another member's reasoning
- Context does not become chaotic because conversations are too long
- It is closer to how a real team works, where everyone has their own mind

### Q4: How do I switch between different members?

If split-pane mode is not configured, you can use shortcut keys:

- `Shift+Up`: switch to the previous member
- `Shift+Down`: switch to the next member
- `Ctrl+O`: return to the Team Lead

### Q5: What if a task fails?

If one member's task fails:

1. Check the cause of failure by reading that member's output log
2. Reassign the task to another member if needed
3. Intervene manually and help unblock the issue directly

### Q6: Can I add or remove members midway through the process?

Yes. You can issue commands to the Team Lead at any time:

```
Add a new member and let it handle XXX.
```

```
Let Teammate 3 leave the team after finishing the current task.
```

### Q7: Can Agent Teams be used together with MCP and Skills?

Absolutely. In fact, they work even better together:

- **Agent Teams + Skills**: each member can carry different skills
- **Agent Teams + MCP**: different members can access external resources through different MCP servers

```
Create a team:
- Teammate A: carries the frontend-design Skill and is responsible for UI
- Teammate B: accesses the repository through GitHub MCP and handles PR management
- Teammate C: queries data through Database MCP and handles analysis
```
