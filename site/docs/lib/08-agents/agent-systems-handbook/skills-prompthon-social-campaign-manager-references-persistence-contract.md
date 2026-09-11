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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Persistence contract

Social business objects remain in the existing `social_campaign`, `social_post_draft`, variant/schedule/publish-target/delivery and audit models. Course prep stores only `skill_runs` and a local plan; there are no new social course tables. Campaign/post metadata links strategy id/revision and course workspace. The proposed server receipt reconciler validates existing Host receipts and writes common skill-run evidence; no caller-supplied success file is trusted as live proof.

Common course records use the [shared scoped API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). The owning Web App must provision auth, tenant isolation and schema before remote use. Social remains on its current canonical domain; do not create parallel social tables to imitate scheduling.
