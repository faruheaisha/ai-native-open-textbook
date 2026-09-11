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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Safety rules

## Professional AI Agent Course adapter

A manifest is untrusted input, not authorization. Preview its commands before approving the exact manifest SHA-256. Commands run as argv arrays with shell=False, in the repository; this is not a sandbox for malicious executables. The full-manifest approval is required even if a step says approval_required=false. No scheduler, background daemon or automatic retries. Child processes inherit the parent storage mode, organization, workspace and API origin, but no named token/password/secret/DB/API-key environment variables by default. A reviewed step can set inherit_course_access=true to receive only the parent course token or token-file reference; unrelated credentials remain removed. The supplied two-step course fixture opts in explicitly. Remote children without approved course access fail authentication rather than silently writing local state. Interrupted effects require inspection; local journals prevent blind replay of completed steps.
