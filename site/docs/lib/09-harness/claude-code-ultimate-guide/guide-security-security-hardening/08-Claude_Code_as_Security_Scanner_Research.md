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
pageSha256: "c8d8a3dd49f83defb355cc53c5cc4e01a661933900e06f2e71bd6806fc009275"
contentMode: "local-full"
zh: ""
---

## Claude Code as Security Scanner (Research Preview)

Beyond securing Claude Code itself, Anthropic offers a dedicated vulnerability scanning feature: **Claude Code Security**.

> ⚠️ **Research preview**: Access via waitlist only. Not yet in GA. Details: [claude.com/solutions/claude-code-security](https://claude.com/solutions/claude-code-security)

### What it does

- Scans your entire codebase for vulnerabilities using contextual reasoning (traces data flows cross-files)
- **Adversarial validation**: findings are challenged internally before surfacing to reduce false positives
- Generates patch suggestions that preserve code structure and style
- Requires human review and approval before any fix is applied

### How it differs from the Security Auditor Agent

| | Security Auditor Agent (today) | Claude Code Security (preview) |
|---|---|---|
| **Access** | Available now, any plan | Waitlist only |
| **Scope** | OWASP Top 10, rule-based | Whole codebase, semantic analysis |
| **Patches** | No (reports only) | Yes (with human approval) |
| **Model** | Configurable | Anthropic's most capable models |

### When to use which

- **Now** → Use the [Security Auditor Agent](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-auditor) + [Security Patcher Agent](/lib/09-harness/claude-code-ultimate-guide/examples-agents-security-patcher) for full detect-then-patch coverage
- **Now** → Use the [Security Gate Hook](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/security-gate.sh) to block vulnerable patterns at write time
- **Waitlist** → Join the preview for deeper semantic analysis once your team needs it
