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
pageSha256: "b282739952cf2aae20b36c03f7e7b7726edc4d6694247e1a631c99bb16819639"
contentMode: "local-full"
zh: ""
---

## Best practices

Agent Teams is a powerful tool, but to use it well, you need to understand some best practices. These lessons come from real-world experience in the community and can help you avoid common pitfalls while getting the most value from team collaboration.

### Practice 1: contract-first

Before multiple Agents begin working in parallel, spend time defining a clear "contract," meaning the interface agreement.

**Why it matters**:

Suppose Teammate A is responsible for the backend API and Teammate B is responsible for the frontend integration. If they start at the same time without agreeing on the interface format first, something like this can happen:

```
Teammate A: implemented POST /api/login and expects {username, password}
Teammate B: implemented the frontend call and sends {user, pass}
Result: they do not match, and rework is required
```

**How to do it**:

Before starting the team, first ask Claude to design the interfaces:

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**A contract should include**:

- Function signatures and data structures
- Input and output JSON formats
- Meanings of HTTP status codes
- Error-handling conventions
- Field validation rules

### Practice 2: assign models wisely

Different tasks require different models. Good model assignment helps balance quality and cost.

**Use Opus for the Team Lead**:

The Team Lead handles task decomposition and result synthesis, which require stronger reasoning ability, so Opus is recommended:

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Use Sonnet for Teammates**:

For concrete coding and testing work, Sonnet is entirely capable and significantly cheaper:

- Opus 4.6: around $15 per million output tokens
- Sonnet 4.5: around $3 per million output tokens

Using Sonnet for members can significantly reduce overall cost.

**Use Haiku for special cases**:

For simple tasks such as documentation updates or small test-writing tasks, you can consider Haiku, around $0.80 per million output tokens.

### Practice 3: control task granularity

Tasks that are too large or too small both hurt efficiency. You need to find the right granularity.

**Rule of thumb**:

Each task should be something one member can complete independently in **15 to 30 minutes**.

**Task too large**:

```
Bad: implement the user authentication system
```

This task is too broad. It contains several subtasks, and one person would need a long time to finish it, which wastes the advantage of parallelism.

**Task too small**:

```
Bad: create an empty file called auth.js
```

This task is too tiny. Members spend more time coordinating than doing actual work.

**Appropriate granularity**:

```
Good: implement the login API, including:
1. The POST /api/login endpoint
2. Username and password validation
3. JWT token response
4. Error handling
```

This task has clear boundaries and deliverables. One person can finish it independently, and it is not overly fragmented.

**Recommended setup**:

Let each member own **5 to 6 medium-sized tasks**. This gives enough parallelism without making coordination costs too high.

### Practice 4: avoid file conflicts

Multiple members modifying the same file at the same time is the most common problem in Agent Teams.

**Assignment principle**:

Try to let different members own **different files**:

```
Good:
- Teammate A: owns all files under src/auth/
- Teammate B: owns all files under src/api/
- Teammate C: owns all files under tests/auth/

Bad:
- Teammate A and Teammate B both modify src/app.js
```

**If the same file must be modified**:

Design a serial editing phase:

```
Phase 1 (parallel):
- Teammate A: analyze what functionality needs to be added to auth.js
- Teammate B: design the new feature interface
- Teammate C: write the test cases

Phase 2 (serial):
- Team Lead synthesizes all inputs
- One member modifies auth.js in a single integrated pass
```

### Practice 5: provide rich initial context

When Teammates start, their conversation history is empty. They do not know what the Team Lead and the user discussed before.

**Wrong approach**:

```
Create the team and let the members start working.
```

Members will start in a fog: what project is this? What tech stack is it using? What exactly should they build?

**Correct approach**:

```
This is a React + Node.js e-commerce project using TypeScript.

The project structure is:
- src/frontend/: React frontend code
- src/backend/: Node.js backend code
- prisma/: database models

Code style:
- Use function components and Hooks
- Use Express.js on the backend
- Use PostgreSQL for the database

Now create a team and have the members add user authentication under src/auth/.
```

Only with sufficient context can members work efficiently.

### Practice 6: research before implementation

Do not let members start coding immediately. Ask them to research and design the solution first.

**Two-phase process**:

**Phase 1: research and design**

```
Create a team. In phase one, do research:
- One member investigates existing authentication approaches (JWT vs Session)
- One member analyzes the project's tech stack and determines best practices
- One member designs the database schema

After the research is complete, let the members discuss through the messaging system and settle on a final plan.
```

**Phase 2: implementation**

```
After the plan is finalized, begin implementation:
- One member implements the backend authentication logic
- One member implements the frontend login page
- One member writes tests
```

The benefit of doing it this way is that you can **discover architecture mismatches early**, instead of realizing halfway through implementation that the plan does not work.

### Practice 7: monitor and intervene actively

Even if you configured automation, you should still actively monitor the team's work status.

**Use split-pane mode**:

If you configured tmux panes, you can see all members' output in real time:

```
┌─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │
│  Analyzing code │  Implementing   │
│  ...            │  API...         │
│                 │                 │
│  Wait, this     │                 │
│  approach seems │                 │
│  wrong...       │                 │
└─────────────────┴─────────────────┘
```

When you notice that a member is going in the wrong direction, you can intervene quickly:

```
@Teammate1 Stop for a moment. Your analysis is headed in the wrong direction. The authentication module should be under src/auth/, not src/user/.
```

**Check task status regularly**:

Use the TaskList command to inspect the status of all tasks:

```
/tasks
```

This shows all task states so you can see what is completed, what is still running, and what is blocked.
