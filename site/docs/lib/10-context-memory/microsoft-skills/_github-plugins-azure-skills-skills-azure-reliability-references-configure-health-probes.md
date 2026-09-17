---
title: "Configure Health Probes — Platform Notes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/configure-health-probes.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/configure-health-probes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/configure-health-probes.md"
sourceSha256: "76cbd211b7787625ea07502972c2214fe80e12262997880017bcc13bf2b13f62"
pageSha256: "76cbd211b7787625ea07502972c2214fe80e12262997880017bcc13bf2b13f62"
contentMode: "local-full"
zh: ""
---

# Configure Health Probes — Platform Notes

## What "health probe" means per service

| Service | Mechanism | Where |
|---|---|---|
| App Service (Basic / Standard / Premium / Dedicated) | `siteConfig.healthCheckPath` (platform health check) | [services/app-service/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-app-service-reliability) |
| Functions Premium / Dedicated | `siteConfig.healthCheckPath` (platform health check) | [services/functions/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-functions-reliability) |
| Functions Flex Consumption (FC1) / Consumption (Y1) | HTTP-triggered `/api/health` function in **app code** — `healthCheckPath` is unsupported | [services/functions/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-functions-reliability) |
| Azure Front Door | `healthProbeSettings` on origin group | [health-probe-checks.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-health-probe-checks) |
| Traffic Manager | `monitorConfig` on profile | [health-probe-checks.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-health-probe-checks) |

> Container Apps (`liveness` / `readiness` probes) deep-dive references are planned for a future version of this skill but are not yet shipped.

## ⛔ STOP — Code-only fixes require user consent

For any case where enabling health probing requires **modifying app source code** rather than IaC — most notably Functions on FC1 / Y1, and Container Apps where the image doesn't already serve a `/health` route — **always ask the user for explicit consent before touching source files**. The exact prompt and decision tree are documented in the relevant per-service reference.

Do not generate or modify code without an explicit yes.

## Best Practices for Health Endpoints

These apply to any service:

1. **Keep health endpoints lightweight** — return 200 quickly; don't run heavy DB or downstream-dependency queries on every probe.
2. **Use anonymous auth** — platform health probes can't pass auth tokens.
3. **Two endpoints, not one** — a fast `/health` for the load balancer, and an optional `/health/deep` for on-call diagnostics.
4. **For Container Apps, both liveness AND readiness** — liveness alone restarts the container without taking it out of rotation first.
