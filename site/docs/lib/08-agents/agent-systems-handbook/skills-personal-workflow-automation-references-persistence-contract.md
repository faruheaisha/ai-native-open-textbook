---
title: "Course persistence"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Course persistence

Use the shared client in `skills/course-support/scripts/course_runtime.py`.
The versioned [backend contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract) defines local versus Prompthon storage, scope, errors, revisions and mandatory readback.

This package has no production database credentials. New course endpoints remain an explicit Web App dependency; a local contract test is not evidence of a Neon deployment.
