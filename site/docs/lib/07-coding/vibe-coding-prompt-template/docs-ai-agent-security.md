---
title: "AI Agent Security"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/docs/ai/agent-security.md"
sourceRel: "docs/ai/agent-security.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/docs/ai/agent-security.md"
sourceSha256: "ba0928fc673181314e911f22c31d0b03d89ef058df0459f7e2cb7c62c0c0c409"
pageSha256: "ba0928fc673181314e911f22c31d0b03d89ef058df0459f7e2cb7c62c0c0c409"
contentMode: "local-full"
zh: ""
---

# AI Agent Security

Last verified: 2026-05

Use this when: AI can read private data, use tools, call MCP servers, browse, edit files, or take product actions.

## Quick Answer

Treat outside content as data, not instructions. Web pages, uploaded files, issues, emails, RAG chunks, tool output, and MCP responses can all contain prompt injection.

## Tool Classes

| Class | Examples | Default |
|-------|----------|---------|
| Read-only | Search, fetch, list, inspect metadata | Allow when data access is authorized |
| Write | Create draft, update record, edit file | Require scoped intent |
| Destructive | Delete, revoke, reset, migrate | Require explicit approval |
| External network | Send webhook, call third-party API | Require allowlist/logging |
| Credential-bearing | OAuth, API keys, production secrets | Never expose secrets to the model |
| Production/billing | Deploy, charge, email, purchase | Require approval and audit notes |

## Checklist

- [ ] Model-visible data is named clearly.
- [ ] Secrets, tokens, private logs, and raw exports are blocked.
- [ ] Tool permissions are classified before launch.
- [ ] Risky actions ask for human approval.
- [ ] MCP servers are trusted by publisher, scopes, auth, and transport, not just by listing.
- [ ] Logs and traces redact customer data.
- [ ] Negative tests cover prompt injection and data exfiltration.

## Example

If an AI agent can send emails, it should draft by default. Sending requires explicit confirmation, a visible recipient list, audit logging, and a test proving prompt-injected content cannot silently trigger send.

## Links

- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- [MCP authorization spec](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data)
- [OpenAI eval best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Claude Code security](https://code.claude.com/docs/en/security)
