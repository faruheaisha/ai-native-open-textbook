---
title: "Persistence contract"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/content-strategy/references/persistence-contract.md"
sourceRel: "skills/content-strategy/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/content-strategy/references/persistence-contract.md"
sourceSha256: "24e2572be0483944692b7927181128b300fdacfb001171fbb7f1c15f04cca583"
pageSha256: "24e2572be0483944692b7927181128b300fdacfb001171fbb7f1c15f04cca583"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`content_strategies` stores the brief, pillars, clusters, ranked topics, evidence references, editorial scores and calendar under a stable strategy id with revision CAS. Each save has a `skill_runs` entry and a local revision snapshot. A subsequent campaign records the strategy id/revision in the existing Social campaign metadata.

Common course records use the [shared scoped API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). The owning Web App must provision auth, tenant isolation and schema before remote use. Social remains on its current canonical domain; do not create parallel social tables to imitate scheduling.
