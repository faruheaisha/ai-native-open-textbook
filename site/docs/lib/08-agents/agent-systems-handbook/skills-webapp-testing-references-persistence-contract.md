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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/webapp-testing/references/persistence-contract.md"
sourceRel: "skills/webapp-testing/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/webapp-testing/references/persistence-contract.md"
sourceSha256: "c2bd59a56eb076211fe5beec9dfeaa7dedfe426d02a5ae68ee1e25e6cf2aac91"
pageSha256: "c2bd59a56eb076211fe5beec9dfeaa7dedfe426d02a5ae68ee1e25e6cf2aac91"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`web_test_runs` stores suite, project id, source fingerprint, viewport checks, failed step, console error hashes/counts and screenshot file references/hashes. PNG binaries and raw console strings stay out of the API. `skill_runs` records final state. Evidence files live below the current workspace's `web-evidence/<test_id>` directory.

Use shared `Store` and `Run`; do not create a parallel database or direct database driver. Every record is tenant/workspace/actor scoped, updates use revision checks, and successful writes require canonical readback. See [schema, auth, errors and reset](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Source files remain local/Git. The course API is an explicit backend dependency, not a claimed live service.
