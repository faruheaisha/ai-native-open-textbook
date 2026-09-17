---
title: "Azure Event Grid"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/README.md"
sourceSha256: "0cc8f8884fac4fda28553709e58780cb4eb1df209d66a46954dc9b1e54f1ba50"
pageSha256: "0cc8f8884fac4fda28553709e58780cb4eb1df209d66a46954dc9b1e54f1ba50"
contentMode: "local-full"
zh: ""
---

# Azure Event Grid

Serverless event routing for event-driven architectures.

## When to Use

- Event-driven architectures
- Reactive programming patterns
- Decoupled event routing
- Near real-time event delivery
- Fan-out to multiple subscribers

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| None required | Event Grid is serverless |
| Key Vault | Store topic keys |

## Event Sources

| Type | Description |
|------|-------------|
| System Topics | Azure resource events (Storage, Key Vault, etc.) |
| Custom Topics | Your application events |
| Event Domains | Multi-tenant event management |

## Event Schemas

| Schema | Use Case |
|--------|----------|
| Event Grid Schema | Azure native format |
| CloudEvents 1.0 | CNCF standard, cross-platform |

## Environment Variables

| Variable | Value |
|----------|-------|
| `EVENTGRID_TOPIC_ENDPOINT` | Topic endpoint URL |
| `EVENTGRID_TOPIC_KEY` | Topic access key (Key Vault) |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-event-grid-bicep)
- [Subscriptions](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-event-grid-subscriptions)
