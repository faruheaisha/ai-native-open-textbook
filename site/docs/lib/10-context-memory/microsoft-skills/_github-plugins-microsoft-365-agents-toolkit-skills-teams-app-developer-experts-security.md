---
title: "security-router"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/index.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/index.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/index.md"
sourceSha256: "e1b058a9f31c038756104e0f30ee110c92d9247b0655f89f51d12447154223fc"
pageSha256: "e1b058a9f31c038756104e0f30ee110c92d9247b0655f89f51d12447154223fc"
contentMode: "local-full"
zh: ""
---

# security-router

## purpose

Route security-hardening tasks to the minimal set of micro-expert files. Read only the clusters that match the user's request.

## task clusters

### Input Validation
When: sanitizing user input, preventing injection, XSS prevention, content validation, PII handling
Read:
- `input-validation-ts.md`
Cross-domain deps: `../teams/ui.adaptive-cards-ts.md` (card action payloads that need validation), `../teams/ai.function-calling-implementation-ts.md` (AI function parameter validation)

### Secrets Management
When: secrets, credentials, API keys, Key Vault, environment variables, secret rotation
Read:
- `secrets-ts.md`
Cross-domain deps: `../teams/runtime.app-init-ts.md` (App constructor credentials), `../bridge/infra-secrets-config-ts.md` (only if bridging between AWS and Azure)

### General Hardening
When: broad security review, security audit, hardening checklist, defense in depth
Read:
- `input-validation-ts.md`
- `secrets-ts.md`
Cross-domain deps: `../teams/mcp.security-ts.md` (only if using MCP)

## combining rule

If a request covers both input validation and secrets, read both files (same as "General Hardening").

## file inventory

`input-validation-ts.md` | `secrets-ts.md`
