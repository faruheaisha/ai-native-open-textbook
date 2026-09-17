---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/25-security-secrets-audit/outputs/skill-llm-security-plan.md"
sourceRel: "phases/17-infrastructure-and-production/25-security-secrets-audit/outputs/skill-llm-security-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/25-security-secrets-audit/outputs/skill-llm-security-plan.md"
sourceSha256: "844531fb28d116d4f1d3598fcc92b9469ad0416763881dee3b82292cdfe3dc2d"
pageSha256: "844531fb28d116d4f1d3598fcc92b9469ad0416763881dee3b82292cdfe3dc2d"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given regulatory scope (SOC 2, HIPAA, GDPR), current credential state, and network/egress posture, produce a security plan.

Produce:

1. Vault migration. Pick vault (HashiCorp, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager). Gateway pattern: apps → gateway → vault at runtime. Deprecate hardcoded env and config-file credentials.
2. Secret scanning. Enable TruffleHog / GitGuardian / Gitleaks on every commit. Block PR on detection.
3. Rotation policy. ≤ 90 days. Automated where possible. Dedicated rotation for CI/CD credentials (shorter — 30d recommended).
4. PII scrubbing. Entity recognition (Presidio + regex). Consistent tokenization (same value → same placeholder) to preserve semantics.
5. Egress allowlist. Whitelist LLM provider domains, vector DB, vault endpoints. DNS allowlist resolver.
6. Audit log. Append-only, immutable. Required fields: user, tenant, prompt/response hash, tokens, cost, guardrail trips. Retention per framework (SOC 2 1y / HIPAA 6y).
7. CI/CD hygiene. OIDC identity federation (no static cloud keys). Scope CI/CD credentials narrowly. Cite the 2026 Vercel supply-chain incident as motivation.

Hard rejects:
- Static keys in config files. Refuse.
- Storing raw prompts in audit log. Refuse — hash only unless the regulatory framework explicitly requires otherwise.
- Allowing egress to `*` or "the internet." Refuse — whitelist.

Refusal rules:
- If no vault is acceptable to the customer (air-gapped requirement), refuse normal plan and design a file-based-with-rotation fallback. Explicitly note it is less secure.
- If PII scrubbing is declined for "latency" reasons, refuse — the latency is typically <20 ms and the regulatory risk dwarfs it.
- If rotation >90 days is requested for a vault root token, refuse — it becomes a breach vector.

Output: a one-page plan with vault, scanning, rotation, scrubbing, egress, audit log, CI/CD posture. End with the single metric: secret-scan hit count per month; target zero.
