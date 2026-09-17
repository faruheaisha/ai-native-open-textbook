---
title: "Course persistence contract v1"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/references/backend-contract.md"
sourceRel: "skills/course-support/references/backend-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/course-support/references/backend-contract.md"
sourceSha256: "fe73681d7491e6740ecd832f451cc63312beb3eece8e882852e46cf9f91800d3"
pageSha256: "fe73681d7491e6740ecd832f451cc63312beb3eece8e882852e46cf9f91800d3"
contentMode: "local-full"
zh: ""
---

# Course persistence contract v1

Status: proposed Web App dependency, implemented by the Handbook client and conformance tests only. Do not infer that these endpoints exist on any live origin. The backend must reuse Prompthon's current authenticated user and organization model; it must not resurrect the deprecated local bridge token flow.

## Trust boundary

Student Codex → HTTPS API with a short-lived scoped course bearer token → server-side Neon/PostgreSQL. The Web App owns token issuance/revocation, existing user/organization membership, workspace membership, tenant enforcement, migrations, rate limits and operations. The client never accepts a student-supplied remote actor, DB connection string, SQL, arbitrary collection, redirect or production context.

Every physical row in the proposed execution layer must carry `organization_id`, `workspace_id` and `actor_id`; foreign keys and reads must enforce the same tenant. Token scope is verified server-side for every operation. Organization/workspace strings in a URL are selectors, not authorization. Cross-tenant reads, writes, list pagination, relationship resolution and reset must return 403 or non-enumerating 404. The client performs a second scope check but cannot replace server enforcement.
