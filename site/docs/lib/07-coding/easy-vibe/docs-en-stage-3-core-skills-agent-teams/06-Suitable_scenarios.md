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
pageSha256: "fd4da5ce859804127485d14553cb92a62300b69e46bc3add412dc2443e87a450"
contentMode: "local-full"
zh: ""
---

## Suitable scenarios

Agent Teams is powerful, but not every task is suitable for it. Understanding the right scenarios helps you choose correctly.

### Scenarios where Agent Teams fits well

**Complex system refactors**

When the refactor spans multiple modules with clear boundaries:

```
Scenario: split a monolithic application into microservices

Create a team:
- Teammate A: analyze dependencies in the user module
- Teammate B: analyze dependencies in the order module
- Teammate C: analyze dependencies in the payment module
- Teammate D: design the inter-service communication protocol
```

These modules can be analyzed simultaneously, and the final result can be synthesized later, which is much faster than analyzing them serially.

**Multi-angle code review**

When you need to review code from several dimensions:

```
Scenario: conduct a full security review of the payment module

Create a team:
- Teammate A: focus on security vulnerabilities (SQL injection, XSS, etc.)
- Teammate B: inspect performance issues (N+1 queries, memory leaks, etc.)
- Teammate C: verify completeness of error handling
- Teammate D: evaluate test coverage
```

Each member focuses on one dimension, making the review deeper, and the final report more complete.

**Parallel frontend and backend development**

When you need to build frontend and backend at the same time:

```
Scenario: build a user management feature

Create a team:
- Teammate A (frontend): implement the user list page
- Teammate B (frontend): implement the user edit page
- Teammate C (backend): implement the CRUD API
- Teammate D (coordination): design the API contract and make sure frontend and backend stay aligned
```

Frontend and backend can move in parallel as long as the API contract is defined first, following the contract-first principle.

**Competitive debugging**

When you have multiple possible solutions:

```
Scenario: fix a complex bug with two possible repair strategies

Create a team:
- Teammate A: implement solution 1
- Teammate B: implement solution 2
- Teammate C: evaluate the pros and cons of both
```

Both solutions can be implemented and tested in parallel, and the better one can be chosen afterward.

**Documentation generation**

When you need to produce a large amount of documentation:

```
Scenario: write documentation for the whole project

Create a team:
- Teammate A: write API documentation
- Teammate B: write the deployment guide
- Teammate C: write the development guide
- Teammate D: write the troubleshooting manual
```

Multiple documents can be written at the same time, greatly improving efficiency.

### Scenarios where Agent Teams is not a good fit

**Simple modification tasks**

```
Not suitable: variable renaming, single bug fixes, tiny feature additions
```

For these tasks, the cost of starting a team is greater than the actual work.

**Highly serial tasks**

```
Not suitable: tasks that must happen strictly in sequence
```

If task B cannot start until task A finishes, there is no real space for parallelism.

**Cost-sensitive tasks**

Agent Teams consumes **2 to 4 times** the tokens of a single instance, depending on the team size. If cost is the primary concern, a single instance may be the better choice.

### Decision flowchart

```
Are there multiple independent subtasks?
    │
    ├─ No → Use a single instance
    │
    └─ Yes →
         │
         Can the subtasks be assigned to different files?
         │
         ├─ No → Consider serial execution or split the task further
         │
         └─ Yes →
              │
              Is the cost acceptable (2-4x)?
              │
              ├─ No → Use a single instance
              │
              └─ Yes → Use Agent Teams ✓
```
