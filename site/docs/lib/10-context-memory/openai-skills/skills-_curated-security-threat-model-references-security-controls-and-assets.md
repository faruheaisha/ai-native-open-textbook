---
title: "Security Controls and Asset Categories"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/security-threat-model/references/security-controls-and-assets.md"
sourceRel: "skills/.curated/security-threat-model/references/security-controls-and-assets.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/security-threat-model/references/security-controls-and-assets.md"
sourceSha256: "d536cfa9acad2523dc39134bcf33b9566c29dd9a57b407cbc9901637230c6b98"
pageSha256: "d536cfa9acad2523dc39134bcf33b9566c29dd9a57b407cbc9901637230c6b98"
contentMode: "local-full"
zh: ""
---

# Security Controls and Asset Categories

Use this as a lightweight checklist to keep outputs consistent across teams. Prefer concrete, system-specific items over generic text.

## Asset categories (pick only what applies)
- User data (PII, content, uploads)
- Authentication artifacts (passwords, tokens, sessions, cookies)
- Authorization state (roles, policies, ACLs)
- Secrets and keys (API keys, signing keys, encryption keys)
- Configuration and feature flags
- Models and weights (if ML systems)
- Source code and build artifacts
- Audit logs and telemetry
- Availability-critical resources (queues, caches, rate limits, compute budgets)
- Tenant isolation boundaries and metadata

## Security control categories
- Identity and access: authN, authZ, session handling, mTLS, key rotation
- Input protection: schema validation, parsing hardening, upload scanning, sandboxing
- Network safeguards: TLS, network policies, WAF, rate limiting, DoS controls
- Data protection: encryption at rest/in transit, tokenization, redaction
- Isolation: process sandboxing, container boundaries, tenant isolation, seccomp
- Observability: audit logs, alerting, anomaly detection, tamper resistance
- Supply chain: dependency pinning, SBOMs, provenance, signing
- Change control: CI checks, deployment approvals, config guardrails

## Mitigation phrasing patterns
- "Enforce schema at &lt;boundary> for &lt;payload> before &lt;component>."
- "Require authZ check for &lt;action> on &lt;resource> in &lt;service>."
- "Isolate &lt;parser/component> in a sandbox with &lt;resource limits>."
- "Rate limit &lt;endpoint> by &lt;key> and apply burst caps."
- "Encrypt &lt;data> at rest using &lt;key management> and rotate &lt;keys>."
