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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/crm-operations/references/persistence-contract.md"
sourceRel: "skills/crm-operations/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/crm-operations/references/persistence-contract.md"
sourceSha256: "3a03d0e5001cca20d9d3ea05ee62f2a173e723233f8306433ccf4b69cee64df5"
pageSha256: "3a03d0e5001cca20d9d3ea05ee62f2a173e723233f8306433ccf4b69cee64df5"
contentMode: "local-full"
zh: ""
---

# Persistence contract

Use existing course collections `crm_contacts`, `crm_deals`, `crm_activities`, `crm_tasks` plus `skill_runs`. Each entity includes an atomic audit list with actor, time, run id, before/after and approval hash. Canonical scope/revision/readback comes from the shared Store. No third-party CRM table or separate SQLite database is introduced.

Use shared Store/Run, never a parallel persistence client. Tenant/workspace/actor, revision CAS, idempotency, error handling and reset follow the [shared API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Production API/migrations/auth are implemented by the owning Web App stream, not assumed to exist because these local fixtures pass.
