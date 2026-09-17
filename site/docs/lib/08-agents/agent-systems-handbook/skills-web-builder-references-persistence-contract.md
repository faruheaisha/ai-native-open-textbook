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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/web-builder/references/persistence-contract.md"
sourceRel: "skills/web-builder/references/persistence-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/web-builder/references/persistence-contract.md"
sourceSha256: "6f2d6259cae32ab1f9e6f6111e57eccbd70a2572b5828fc3203d4ab35aef33fb"
pageSha256: "6f2d6259cae32ab1f9e6f6111e57eccbd70a2572b5828fc3203d4ab35aef33fb"
contentMode: "local-full"
zh: ""
---

# Persistence contract

`web_projects` stores the approved brief, file names/hashes, source fingerprint, build check, last run and explicit `ui_qa: not_run`. `skill_runs` stores actions and evidence references. Existing-stack `record` preserves source only in Git; do not upload source or command output.

Use shared `Store` and `Run`; do not create a parallel database or direct database driver. Every record is tenant/workspace/actor scoped, updates use revision checks, and successful writes require canonical readback. See [schema, auth, errors and reset](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-contract). Source files remain local/Git. The course API is an explicit backend dependency, not a claimed live service.
