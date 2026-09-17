---
title: "Container Apps Networking"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/networking.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/networking.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/networking.md"
sourceSha256: "9828c6fef6c8e613c707d353d083385f1d9d17e948c1d47635150eb062f8e313"
pageSha256: "9828c6fef6c8e613c707d353d083385f1d9d17e948c1d47635150eb062f8e313"
contentMode: "local-full"
zh: ""
---

# Container Apps Networking

VNet integration, ingress configuration, custom domains, and TLS for Container Apps.

## Ingress Modes

| Mode | Visibility | Use Case |
|------|-----------|----------|
| External | Internet-accessible | Public APIs, web apps |
| Internal | Not internet-accessible; reachable within the environment and VNet (if VNet-injected) | Microservices, back-end APIs |
| Disabled | No HTTP ingress | Background workers, queue processors |

### Bicep — External Ingress

```bicep
configuration: {
  ingress: {
    external: true
    targetPort: 8080
    transport: 'auto'
    allowInsecure: false
  }
}
```

### Bicep — Internal Ingress

```bicep
configuration: {
  ingress: {
    external: false
    targetPort: 8080
  }
}
```
