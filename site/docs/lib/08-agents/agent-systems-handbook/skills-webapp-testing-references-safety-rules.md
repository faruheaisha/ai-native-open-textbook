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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/webapp-testing/references/safety-rules.md"
sourceRel: "skills/webapp-testing/references/safety-rules.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/webapp-testing/references/safety-rules.md"
sourceSha256: "8d0f6cf5dd49e07f8dd866cab787d5af8872cbd2e1cba4072804d570f0aaa23e"
pageSha256: "8d0f6cf5dd49e07f8dd866cab787d5af8872cbd2e1cba4072804d570f0aaa23e"
contentMode: "local-full"
zh: ""
---

# Safety rules

Run synthetic local scenarios only. A loopback application can still mutate its own backend, so review click/form effects before testing it. The included static server denies hidden files, directory listings and symlink escapes. Screenshots may contain personal information: keep them local and inspect before any sharing. Do not bypass login or protection to make a check green.

Use only the authorized organization/workspace. Honor API refusal, scope mismatch, conflict and reset gates. Never persist secrets or absolute personal paths. Dry runs cannot authorize a later external action by themselves.
