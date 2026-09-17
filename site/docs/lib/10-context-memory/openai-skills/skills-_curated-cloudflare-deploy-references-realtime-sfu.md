---
title: "Cloudflare Realtime SFU Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/realtime-sfu/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/realtime-sfu/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/realtime-sfu/README.md"
sourceSha256: "2c1a23b8c44198e95eabb9f8db96453db61d935f96292932e9a5d1feea31e98c"
pageSha256: "2c1a23b8c44198e95eabb9f8db96453db61d935f96292932e9a5d1feea31e98c"
contentMode: "local-full"
zh: ""
---

# Cloudflare Realtime SFU Reference

Expert guidance for building real-time audio/video/data applications using Cloudflare Realtime SFU (Selective Forwarding Unit).

## Reading Order

| Task | Files | ~Tokens |
|------|-------|---------|
| New project | README → configuration | ~1200 |
| Implement publish/subscribe | README → api | ~1600 |
| Add PartyTracks | patterns (PartyTracks section) | ~800 |
| Build presence system | patterns (DO section) | ~800 |
| Debug connection issues | gotchas | ~700 |
| Scale to millions | patterns (Cascading section) | ~600 |
| Add simulcast | patterns (Advanced section) | ~500 |
| Configure TURN | configuration (TURN section) | ~400 |

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtime-sfu-configuration)** - Setup, deployment, environment variables, Wrangler config
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtime-sfu-api)** - Sessions, tracks, endpoints, request/response patterns
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtime-sfu-patterns)** - Architecture patterns, use cases, integration examples
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtime-sfu-gotchas)** - Common issues, debugging, performance, security

## Quick Start

Cloudflare Realtime SFU: WebRTC infrastructure on global network (310+ cities). Anycast routing, no regional constraints, pub/sub model.

**Core concepts:**
- **Sessions:** WebRTC PeerConnection to Cloudflare edge
- **Tracks:** Audio/video/data channels you publish or subscribe to
- **No rooms:** Build presence layer yourself via track sharing (see patterns.md)

**Mental model:** Your client establishes one WebRTC session, publishes tracks (audio/video), shares track IDs via your backend, others subscribe to your tracks using track IDs + your session ID.

## Choose Your Approach

| Approach | When to Use | Complexity |
|----------|-------------|------------|
| **PartyTracks** | Production apps with device switching, React | Low - Observable-based, handles reconnections |
| **Raw API** | Custom requirements, non-browser, learning | Medium - Full control, manual WebRTC lifecycle |
| **RealtimeKit** | End-to-end SDK with UI components | Lowest - Managed state, React hooks |

**Recommendation:** Start with PartyTracks for most production applications. See patterns.md for PartyTracks examples.

## SFU vs RealtimeKit

- **Realtime SFU:** WebRTC infrastructure (this reference). Build your own signaling, presence, UI.
- **RealtimeKit:** SDK layer on top of SFU. Includes React hooks, state management, UI components. Part of Cloudflare AI platform.

Use SFU directly when you need custom signaling or non-React framework. Use RealtimeKit for faster development with React.

## Setup

Dashboard: https://dash.cloudflare.com/?to=/:account/calls

Get `CALLS_APP_ID` and `CALLS_APP_SECRET` from dashboard, then see configuration.md for deployment.

## See Also

- [Orange Meets Demo](https://demo.orange.cloudflare.dev/)
- [Orange Source](https://github.com/cloudflare/orange)
- [Calls Examples](https://github.com/cloudflare/calls-examples)
- [API Reference](https://developers.cloudflare.com/api/resources/calls/)
- [RealtimeKit Docs](https://developers.cloudflare.com/workers-ai/realtimekit/)
