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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/vercel-deploy/references/persistence-contract.md"
sourceRel: "skills/vercel-deploy/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/vercel-deploy/references/persistence-contract.md"
sourceSha256: "3d841c64f0018a192273e48bfde8a8851e379120f4d4daab671daed84b023504"
pageSha256: "3d841c64f0018a192273e48bfde8a8851e379120f4d4daab671daed84b023504"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`deployment_records` stores provider deployment id, URL, project id, commit SHA, target, ready state, matching test/source fingerprint and URL-readback result. `skill_runs` records submission/verification state. Local `deployment-attempts/<attempt>.json` survives an API failure. No token, full provider response, source bundle or raw command log is stored. A failed metadata write does not undo an external deployment.

Use shared `Store` and `Run`; do not create a parallel database or direct database driver. Every record is tenant/workspace/actor scoped, updates use revision checks, and successful writes require canonical readback. See [schema, auth, errors and reset](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Source files remain local/Git. The course API is an explicit backend dependency, not a claimed live service.
