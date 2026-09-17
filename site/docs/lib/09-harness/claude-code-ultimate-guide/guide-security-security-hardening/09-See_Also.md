---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md"
sourceRel: "guide/security/security-hardening.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/security/security-hardening.md"
sourceSha256: "9e60a03ddb48e780dee266f946d4af20567529ee0e632ce6f3ed3cc721df06e8"
pageSha256: "c4cf8efc16a2996ce66c07b57b9939caa3564d358bcde52095825b4a2c17dd29"
contentMode: "local-full"
zh: ""
---

## See Also

- [Enterprise AI Governance](/lib/09-harness/claude-code-ultimate-guide/guide-security-enterprise-governance): Org-level MCP governance (approval workflow, registry, guardrail tiers). This guide covers individual MCP vetting; that guide covers org-level policy.
- [Data Privacy Guide](/lib/09-harness/claude-code-ultimate-guide/guide-security-data-privacy): Retention policies, compliance, what data leaves your machine
- [AI Traceability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-ai-traceability): PromptPwnd vulnerability, CI/CD security, attribution policies
- [Security Checklist Skill](/lib/09-harness/claude-code-ultimate-guide/examples-skills-security-checklist): OWASP Top 10 patterns for code review
- [Security Auditor Agent](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-auditor): Automated vulnerability detection (read-only)
- [Security Patcher Agent](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-patcher): Applies patches from audit findings (human approval required)
- [Security Gate Hook](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/security-gate.sh): Blocks vulnerable code patterns at write time (7 patterns)
- [MCP Registry Template](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/mcp-registry-template.yaml): YAML format for tracking approved MCPs at org level
- [Ultimate Guide §7.4](#74-security-hooks): Hook system basics
- [Ultimate Guide §8.6](#86-mcp-security): MCP security overview
- [Cross-Session Messaging](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging): full `ListAgents`/`SendMessage` mechanics between independent sessions
