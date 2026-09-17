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
pageSha256: "c99b9e5ae318b5b987b02be13afe3069e9534a97fccf003104f975e078480e03"
contentMode: "local-full"
zh: ""
---

## Core architecture

Agent Teams is not just a simple "open multiple instances" feature. It is a complete **multi-agent collaboration system**. To understand it, we need to understand its core components and how they work together.

### Team composition

An Agent Team consists of four core components, each with its own responsibility, working together to complete complex tasks.

**Team Lead**

The Team Lead is the "brain" and "coordinator" of the entire team. It does not directly execute coding tasks. Instead, it is responsible for:

- **Requirement analysis and task decomposition**: breaking the user's complex requirements into multiple subtasks that can run in parallel
- **Team creation and management**: deciding how many members are needed and what each member should do
- **Task assignment and scheduling**: assigning tasks to the right members and managing task dependencies
- **Result synthesis and quality control**: collecting each member's work, integrating it, and doing the final review

**Teammates**

Teammates are the actual "developers" doing the work. Every Teammate is an independent Claude instance:

- **Independent context window**: each member has a full 200K token context window, completely isolated from the Team Lead and the other members
- **Full tool permissions**: they can use all tools such as Read, Write, Edit, and Bash
- **Autonomous task pickup**: they can independently select and claim tasks from the shared task board
- **Direct communication ability**: they can communicate directly with other members instead of always going through the Team Lead

**TaskList**

TaskList is the team's "project management tool," similar to Jira or Trello:

- **Task status management**: every task has a clear status: `pending`, `in_progress`, or `completed`
- **Dependency management**: tasks can define dependencies, and dependent tasks can only start after prerequisite tasks finish
- **Automatic unlock mechanism**: when one task is completed, the system automatically checks and unlocks tasks waiting on it
- **File lock mechanism**: when a member claims and starts a task, a lock file is created in the task directory to prevent multiple members from editing the same file at the same time

**Messaging System**

The messaging system is the "chat tool" between team members:

- **Point-to-point communication**: member A can send a message directly to member B
- **Broadcast announcements**: a message can be sent to all members at once
- **File-system based**: messages are stored as JSON files in `~/.claude/teams/\{team-name\}/inboxes/`
- **No network required**: everything works entirely through the local file system, with no network connection or port listening needed

### Collaboration flow

A typical Agent Teams workflow looks like this:

```
The user submits a complex requirement
       ↓
Team Lead analyzes the requirement and breaks it into tasks
       ↓
Creates team members and initializes TaskList
       ↓
       ├─→ Teammate A claims Task 1 ─┐
       ├─→ Teammate B claims Task 2 ─┼→ Run in parallel
       ├─→ Teammate C claims Task 3 ─┤
       │                             ↓
       └──────────────────────────── Members coordinate through the messaging system
                                     ↓
                          Once all tasks are complete, Team Lead synthesizes the result
                                     ↓
                          Final output is delivered to the user
```

### File system layout

Agent Teams creates dedicated directories on your local file system to manage team state:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Team config (member list, model selection, etc.)
│       └── inboxes/
│           ├── team-lead.json   # Team Lead inbox
│           ├── teammate-1.json  # Member 1 inbox
│           └── teammate-2.json  # Member 2 inbox
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Detailed info for Task 1
        ├── task-2.json          # Detailed info for Task 2
        └── current_tasks/
            └── parse_if_statement.txt  # Lock file created while a task is running
```

The advantage of this design is **complete transparency**: you can inspect team status, task progress, and the communication history between members at any time.
