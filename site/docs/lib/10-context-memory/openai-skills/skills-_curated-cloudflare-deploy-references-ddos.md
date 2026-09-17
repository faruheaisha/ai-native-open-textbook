---
title: "Cloudflare DDoS Protection"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ddos/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ddos/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ddos/README.md"
sourceSha256: "63018c3c2d25ce26a0f1b80dd60bd2d3c5193a26bf96979ef624030ab766c4a8"
pageSha256: "63018c3c2d25ce26a0f1b80dd60bd2d3c5193a26bf96979ef624030ab766c4a8"
contentMode: "local-full"
zh: ""
---

# Cloudflare DDoS Protection

Autonomous, always-on protection against DDoS attacks across L3/4 and L7.

## Protection Types

- **HTTP DDoS (L7)**: Protects HTTP/HTTPS traffic, phase `ddos_l7`, zone/account level
- **Network DDoS (L3/4)**: UDP/SYN/DNS floods, phase `ddos_l4`, account level only
- **Adaptive DDoS**: Learns 7-day baseline, detects deviations, 4 profile types (Origins, User-Agents, Locations, Protocols)

## Plan Availability

| Feature | Free | Pro | Business | Enterprise | Enterprise Advanced |
|---------|------|-----|----------|------------|---------------------|
| HTTP DDoS (L7) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Network DDoS (L3/4) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Override rules | 1 | 1 | 1 | 1 | 10 |
| Custom expressions | ✗ | ✗ | ✗ | ✗ | ✓ |
| Log action | ✗ | ✗ | ✗ | ✗ | ✓ |
| Adaptive DDoS | ✗ | ✗ | ✗ | ✓ | ✓ |
| Alert filters | Basic | Basic | Basic | Advanced | Advanced |

## Actions & Sensitivity

- **Actions**: `block`, `managed_challenge`, `challenge`, `log` (Enterprise Advanced only)
- **Sensitivity**: `default` (high), `medium`, `low`, `eoff` (essentially off)
- **Override**: By category/tag or individual rule ID
- **Scope**: Zone-level overrides take precedence over account-level

## Reading Order

| File | Purpose | Start Here If... |
|------|---------|------------------|
| [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ddos-configuration) | Dashboard setup, rule structure, adaptive profiles | You're setting up DDoS protection for the first time |
| [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ddos-api) | API endpoints, SDK usage, ruleset ID discovery | You're automating configuration or need programmatic access |
| [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ddos-patterns) | Protection strategies, defense-in-depth, dynamic response | You need implementation patterns or layered security |
| [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ddos-gotchas) | False positives, tuning, error handling | You're troubleshooting or optimizing existing protection |

## See Also
- [waf](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-waf) - Application-layer security rules
- [bot-management](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-bot-management) - Bot detection and mitigation
