---
title: "Cloudflare Spectrum Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/spectrum/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/spectrum/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/spectrum/README.md"
sourceSha256: "6dfd516d6e54696accbe6bb499f4e70686061abd0afa192897b32d7fd0c3f32e"
pageSha256: "6dfd516d6e54696accbe6bb499f4e70686061abd0afa192897b32d7fd0c3f32e"
contentMode: "local-full"
zh: ""
---

# Cloudflare Spectrum Skill Reference

## Overview

Cloudflare Spectrum provides security and acceleration for ANY TCP or UDP-based application. It's a global Layer 4 (L4) reverse proxy running on Cloudflare's edge nodes that routes MQTT, email, file transfer, version control, games, and more through Cloudflare to mask origins and protect from DDoS attacks.

**When to Use Spectrum**: When your protocol isn't HTTP/HTTPS (use Cloudflare proxy for HTTP). Spectrum handles everything else: SSH, gaming, databases, MQTT, SMTP, RDP, custom protocols.

## Plan Capabilities

| Capability | Pro/Business | Enterprise |
|------------|--------------|------------|
| TCP protocols | Selected ports only | All ports (1-65535) |
| UDP protocols | Selected ports only | All ports (1-65535) |
| Port ranges | ❌ | ✅ |
| Argo Smart Routing | ✅ | ✅ |
| IP Firewall | ✅ | ✅ |
| Load balancer origins | ✅ | ✅ |

## Decision Tree

**What are you trying to do?**

1. **Create/manage Spectrum app**
   - Via Dashboard → See [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Via API → See [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-api) - REST endpoints
   - Via SDK → See [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-api) - TypeScript/Python/Go examples
   - Via IaC → See [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-configuration) - Terraform/Pulumi

2. **Protect specific protocol**
   - SSH → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#1-ssh-server-protection)
   - Gaming (Minecraft, etc) → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#2-game-server)
   - MQTT/IoT → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#3-mqtt-broker)
   - SMTP/Email → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#4-smtp-relay)
   - Database → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#5-database-proxy)
   - RDP → See [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns#6-rdp-remote-desktop)

3. **Choose origin type**
   - Direct IP (single server) → See [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-configuration#direct-ip-origin)
   - CNAME (hostname) → See [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-configuration#cname-origin)
   - Load balancer (HA/failover) → See [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-configuration#load-balancer-origin)

## Reading Order

1. Start with [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-patterns) for your specific protocol
2. Then [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-configuration) for your origin type
3. Check [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-gotchas) before going to production
4. Use [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-spectrum-api) for programmatic access

## See Also

- [Cloudflare Docs](https://developers.cloudflare.com/spectrum/)
