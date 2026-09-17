---
title: "WAF Checklist"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/waf-checklist.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/waf-checklist.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/waf-checklist.md"
sourceSha256: "3ad06a9ce5a1a5d688dedc18e3f1231ae7b01d4ec3d1418d527aabd1893fdf09"
pageSha256: "3ad06a9ce5a1a5d688dedc18e3f1231ae7b01d4ec3d1418d527aabd1893fdf09"
contentMode: "local-full"
zh: ""
---

# WAF Checklist

Per-pillar Well-Architected Framework alignment for AppOnboard-generated infrastructure. Use during scaffold self-review (Layer 4) and prepare validation (WAF Alignment dimension).

> **Reference:** [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — link, don't duplicate. See [WAF Service Guides](https://learn.microsoft.com/en-us/azure/well-architected/service-guides/) for per-service checklists.

## Reliability

- Zone redundancy enabled for production SKUs (App Service P1v3+, SQL Premium, Redis Premium)
- Health probes configured (Container Apps liveness/readiness, App Service `/health`)
- GRS storage for production data (Standard_GRS or RA-GRS)
- Retry policies in application code for transient failures
- Min replicas ≥ 1 for production Container Apps (no cold-start)

## Security

- System-assigned managed identity on all services
- Key Vault for all secrets (no inline connection strings)
- HTTPS-only + TLS 1.2+ on all endpoints
- No public blob access on storage accounts
- Private endpoints where budget allows (balanced/performance tiers)
- No `administratorLogin` for SQL (Entra-only auth)

## Cost Optimization

- SKU matches `prepare-plan.json` budget tier — no over-provisioning
- Scale-to-zero enabled for dev/test Container Apps
- Free tier grants applied in cost estimate (see [pricing-guide.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prepare-references-pricing-guide) § Free Grants Summary)
- Reserved instances noted as option for production (don't auto-apply)

## Operational Excellence

- `diagnostic-settings` is not scaffolded; if the generator added one it MUST be gated behind `enableDiagnostics` (default `false`) or absent — never wired unconditionally (that blocks the first deploy).
- Application Insights connected for APM
- Resource tagging: `app-onboard-skill`, `app-onboard-session-id`, `created-at` (see `bicep-patterns.md` § Service Tagging or `terraform-patterns.md` § Resource Tags)
- All configurable values parameterized (no hardcoded regions, names, SKUs)

## Performance Efficiency

- Autoscale rules for production SKUs (Container Apps max replicas, App Service auto-scale)
- CDN for static assets when SPA frontend detected
- Connection pooling for database access
- Appropriate cache tier (Redis) when session/cache pattern detected
