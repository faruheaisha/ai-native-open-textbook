---
title: "CRM Operations"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/crm-operations/SKILL.md"
sourceRel: "skills/crm-operations/SKILL.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/crm-operations/SKILL.md"
sourceSha256: "b61425104469de51cb499b4bbfbc92b86213100ea304ca1317c59542294a0ff6"
pageSha256: "b61425104469de51cb499b4bbfbc92b86213100ea304ca1317c59542294a0ff6"
contentMode: "local-full"
zh: ""
---

# CRM Operations

Own **Operate** in Lesson 4. Read [safety](/lib/08-agents/agent-systems-handbook/skills-crm-operations-references-safety-rules), [persistence](/lib/08-agents/agent-systems-handbook/skills-crm-operations-references-persistence-contract) and the runnable [README](/lib/08-agents/agent-systems-handbook/skills-crm-operations) before executing the selected workflow.

## Workflow

1. Confirm the authorized organization/workspace and server-attested demo environment. Do not use production CRM accounts. The helper uses Prompthon course collections and has no HubSpot-specific integration.
2. Resolve before writing: contact by normalized email or exact id; deal by contact+title or id; activity/task by id. Stop on ambiguity or duplicate identity. The classroom resolver refuses a collection at its 500-record bound instead of assuming a truncated list is complete.
3. Read the latest revision and referenced contact/deal. Validate email, finite nonnegative amount, explicit currency, ISO dates and allowed stages/statuses. Do not silently merge contacts, reassign another contact's deal or accept audit/system fields from input.
4. Preview `plan --request FILE`. Review before/after, entity id, revision, scope and returned approval hash. Apply only that reviewed plan using `--confirm SHA`; a concurrent change invalidates it. Each write includes audit evidence in the same atomic entity record.
5. A deal stage change or creation already marked won/lost requires additional action-time approval and `--approve-high-impact`. The ordinary patch approval is not that extra approval. Do not delete records, silently close deals or send a follow-up message because a task exists.
6. Read back the object and audit trail with `show`, and report actual state. An unchanged retry is reported unchanged. If a final run save fails after the entity write, inspect the canonical object/audit before retrying. Hand source preparation to Structure and performance questions to Analyze.

## Shared boundary

Use the course-support client for local or explicitly configured Prompthon storage. Remote organization/workspace, server-derived actor, scopes, revisions and canonical readback are mandatory. The Web App backend remains [a tracked dependency](/lib/08-agents/agent-systems-handbook/skills-course-support-references-backend-dependency); never give learners a Neon connection string. See [source notes](/lib/08-agents/agent-systems-handbook/skills-crm-operations-references-source-notes) for licensing and the original implementation boundary.
