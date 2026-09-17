---
title: "Cloudflare TURN Service"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/turn/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/turn/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/turn/README.md"
sourceSha256: "9b1e36931f40b1faf3c8f24f89acb12c4f4223de0afc83e6b8de636f4730d542"
pageSha256: "9b1e36931f40b1faf3c8f24f89acb12c4f4223de0afc83e6b8de636f4730d542"
contentMode: "local-full"
zh: ""
---

# Cloudflare TURN Service

Expert guidance for implementing Cloudflare TURN Service in WebRTC applications.

## Overview

Cloudflare TURN (Traversal Using Relays around NAT) Service is a managed relay service for WebRTC applications. TURN acts as a relay point for traffic between WebRTC clients and SFUs, particularly when direct peer-to-peer communication is obstructed by NATs or firewalls. The service runs on Cloudflare's global anycast network across 310+ cities.

## Key Characteristics

- **Anycast Architecture**: Automatically connects clients to the closest Cloudflare location
- **Global Network**: Available across Cloudflare's entire network (excluding China Network)
- **Zero Configuration**: No need to manually select regions or servers
- **Protocol Support**: STUN/TURN over UDP, TCP, and TLS
- **Free Tier**: Free when used with Cloudflare Calls SFU, otherwise $0.05/GB outbound

## In This Reference

| File | Purpose |
|------|---------|
| [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-api) | Credentials API, TURN key management, types, constraints |
| [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-configuration) | Worker setup, wrangler.jsonc, env vars, IP allowlisting |
| [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-patterns) | Implementation patterns, use cases, integration examples |
| [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-gotchas) | Troubleshooting, limits, security, common mistakes |

## Reading Order

| Task | Files to Read | Est. Tokens |
|------|---------------|-------------|
| Quick start | README only | ~500 |
| Generate credentials | README → api | ~1300 |
| Worker integration | README → configuration → patterns | ~2000 |
| Debug connection | gotchas | ~700 |
| Security review | api → gotchas | ~1500 |
| Enterprise firewall | configuration | ~600 |

## Service Addresses and Ports

### STUN over UDP
- **Primary**: `stun.cloudflare.com:3478/udp`
- **Alternate**: `stun.cloudflare.com:53/udp` (blocked by browsers, not recommended)

### TURN over UDP
- **Primary**: `turn.cloudflare.com:3478/udp`
- **Alternate**: `turn.cloudflare.com:53/udp` (blocked by browsers)

### TURN over TCP
- **Primary**: `turn.cloudflare.com:3478/tcp`
- **Alternate**: `turn.cloudflare.com:80/tcp`

### TURN over TLS
- **Primary**: `turn.cloudflare.com:5349/tcp`
- **Alternate**: `turn.cloudflare.com:443/tcp`

## Quick Start

1. **Create TURN key via API**: see [api.md#create-turn-key](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-api#create-turn-key)
2. **Generate credentials**: see [api.md#generate-temporary-credentials](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-api#generate-temporary-credentials)
3. **Configure Worker**: see [configuration.md#cloudflare-worker-integration](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-configuration#cloudflare-worker-integration)
4. **Implement client**: see [patterns.md#basic-turn-configuration-browser](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-turn-patterns#basic-turn-configuration-browser)

## When to Use TURN

- **Restrictive NATs**: Symmetric NATs that block direct connections
- **Corporate firewalls**: Environments blocking WebRTC ports
- **Mobile networks**: Carrier-grade NAT scenarios
- **Predictable connectivity**: When reliability > efficiency

## Related Cloudflare Services

- **Cloudflare Calls SFU**: Managed Selective Forwarding Unit (TURN free when used with SFU)
- **Cloudflare Stream**: Video streaming with WHIP/WHEP support
- **Cloudflare Workers**: Backend for credential generation
- **Cloudflare KV**: Credential caching
- **Cloudflare Durable Objects**: Session state management

## Additional Resources

- [Cloudflare Calls Documentation](https://developers.cloudflare.com/calls/)
- [Cloudflare TURN Service Docs](https://developers.cloudflare.com/realtime/turn/)
- [Cloudflare API Reference](https://developers.cloudflare.com/api/resources/calls/subresources/turn/)
- [Orange Meets (Open Source Example)](https://github.com/cloudflare/orange)
