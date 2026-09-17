---
title: "Container Apps Health Probes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/health-probes.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/health-probes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/health-probes.md"
sourceSha256: "cf1136932da3f63b6a14978a801d1d065f7530c2d15a811fc3e772035d11018f"
pageSha256: "cf1136932da3f63b6a14978a801d1d065f7530c2d15a811fc3e772035d11018f"
contentMode: "local-full"
zh: ""
---

# Container Apps Health Probes

Always configure health probes for production workloads.

## Liveness Probe

Detects if container is alive. Failure triggers restart.

```bicep
probes: [
  \{
    type: 'liveness'
    httpGet: \{
      path: '/health'
      port: 8080
    \}
    initialDelaySeconds: 10
    periodSeconds: 30
    failureThreshold: 3
  \}
]
```

## Readiness Probe

Detects if container is ready to receive traffic.

```bicep
probes: [
  \{
    type: 'readiness'
    httpGet: \{
      path: '/ready'
      port: 8080
    \}
    initialDelaySeconds: 5
    periodSeconds: 10
    failureThreshold: 3
  \}
]
```

## Startup Probe

For slow-starting containers. Delays other probes until startup succeeds.

```bicep
probes: [
  \{
    type: 'startup'
    httpGet: \{
      path: '/health'
      port: 8080
    \}
    initialDelaySeconds: 0
    periodSeconds: 10
    failureThreshold: 30  // 30 * 10s = 5 min max startup
  \}
]
```

## Recommendations

| Probe | Path | Initial Delay | Period |
|-------|------|---------------|--------|
| Liveness | `/health` | 10s | 30s |
| Readiness | `/ready` | 5s | 10s |
| Startup | `/health` | 0s | 10s |
