---
title: "Safety rules"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/vercel-deploy/references/safety-rules.md"
sourceRel: "skills/vercel-deploy/references/safety-rules.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/vercel-deploy/references/safety-rules.md"
sourceSha256: "17fc338812aae2b6fbc5d32da4d1149ec5ba219f73278aece43355d75e57f673"
pageSha256: "17fc338812aae2b6fbc5d32da4d1149ec5ba219f73278aece43355d75e57f673"
contentMode: "local-full"
zh: ""
---

# Safety rules

Preview approval cannot authorize production. Never create a provider project, expose a credential, bypass deployment protection, or repeat an uncertain submission automatically. Provider-owned responses can include secrets, so the client filters to an explicit metadata allowlist. API tokens go only to api.vercel.com, never the deployed app. Custom domains/redirects require manual browser verification and are not silently accepted by this helper.

Use only the authorized organization/workspace. Honor API refusal, scope mismatch, conflict and reset gates. Never persist secrets or absolute personal paths. Dry runs cannot authorize a later external action by themselves.
