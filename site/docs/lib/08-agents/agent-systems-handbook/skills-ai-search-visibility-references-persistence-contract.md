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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/ai-search-visibility/references/persistence-contract.md"
sourceRel: "skills/ai-search-visibility/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/ai-search-visibility/references/persistence-contract.md"
sourceSha256: "50f5be2833b085f8665dda7f294be30b3104ecc1fc2aad6e787daefc2df730fc"
pageSha256: "50f5be2833b085f8665dda7f294be30b3104ecc1fc2aad6e787daefc2df730fc"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`aeo_audits` stores target queries, scope hash, page source hashes/URLs, structural signals, short evidence excerpts, findings, recommendations and recheck comparison under a stable audit id/revision. `skill_runs` records each audit. Local snapshots are never uploaded as raw HTML, and the audit does not modify them. New reports are saved separately.

Common course records use the [shared scoped API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). The owning Web App must provision auth, tenant isolation and schema before remote use. Social remains on its current canonical domain; do not create parallel social tables to imitate scheduling.
