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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/business-data-analysis/references/persistence-contract.md"
sourceRel: "skills/business-data-analysis/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/business-data-analysis/references/persistence-contract.md"
sourceSha256: "c6b6146a7a9681869b120ebb77cc1eecc51bdeb9f678209ad89680196c38e7d3"
pageSha256: "c6b6146a7a9681869b120ebb77cc1eecc51bdeb9f678209ad89680196c38e7d3"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`analysis_runs` stores the six report sections, schema/quality aggregates, source reference/hash or dataset id/revision, calculation description and report digest. `skill_runs` records execution. The helper never writes source CSV/XLSX/JSON or CRM objects; reports are new local files plus canonical analysis records. Remote metadata-only dataset records cannot be analyzed as if rows were available.

Use shared Store/Run, never a parallel persistence client. Tenant/workspace/actor, revision CAS, idempotency, error handling and reset follow the [shared API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Production API/migrations/auth are implemented by the owning Web App stream, not assumed to exist because these local fixtures pass.
