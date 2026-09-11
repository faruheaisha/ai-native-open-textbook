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

`business_datasets` holds schema, grain, source hash, shape, null/duplicate/error inspection, plan hash and local output references/hashes. Local mode also stores normalized rows; remote row sharing is explicit. `skill_runs` records the operation. Output is written before registration so a failed remote write leaves recoverable local evidence; it is not a successful remote save.

Use shared Store/Run, never a parallel persistence client. Tenant/workspace/actor, revision CAS, idempotency, error handling and reset follow the [shared API contract](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Production API/migrations/auth are implemented by the owning Web App stream, not assumed to exist because these local fixtures pass.
