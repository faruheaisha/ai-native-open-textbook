---
title: "Cloudflare RealtimeKit"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/realtimekit/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/realtimekit/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/realtimekit/README.md"
sourceSha256: "190ecae4bb2ed00795cec6b59df4b0b3045cbc07d09b818abe398c239e97d531"
pageSha256: "190ecae4bb2ed00795cec6b59df4b0b3045cbc07d09b818abe398c239e97d531"
contentMode: "local-full"
zh: ""
---

# Cloudflare RealtimeKit

Expert guidance for building real-time video and audio applications using **Cloudflare RealtimeKit** - a comprehensive SDK suite for adding customizable live video and voice to web or mobile applications.

## Overview

RealtimeKit is Cloudflare's SDK suite built on Realtime SFU, abstracting WebRTC complexity with fast integration, pre-built UI components, global performance (300+ cities), and production features (recording, transcription, chat, polls).

**Use cases**: Team meetings, webinars, social video, audio calls, interactive plugins

## Core Concepts

- **App**: Workspace grouping meetings, participants, presets, recordings. Use separate Apps for staging/production
- **Meeting**: Re-usable virtual room. Each join creates new **Session**
- **Session**: Live meeting instance. Created on first join, ends after last leave
- **Participant**: User added via REST API. Returns `authToken` for client SDK. **Do not reuse tokens**
- **Preset**: Reusable permission/UI template (permissions, meeting type, theme). Applied at participant creation
- **Peer ID** (`id`): Unique per session, changes on rejoin
- **Participant ID** (`userId`): Persistent across sessions

## Quick Start

### 1. Create App & Meeting (Backend)

```bash
# Create app
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/apps' \
  -H 'Authorization: Bearer <api_token>' \
  -d '{"name": "My RealtimeKit App"}'

# Create meeting
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/meetings' \
  -H 'Authorization: Bearer <api_token>' \
  -d '{"title": "Team Standup"}'

# Add participant
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/meetings/<meeting_id>/participants' \
  -H 'Authorization: Bearer <api_token>' \
  -d '{"name": "Alice", "preset_name": "host"}'
# Returns: { authToken }
```

### 2. Client Integration

**React**:
```tsx
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';

function App() {
  return <RtkMeeting authToken="<participant_auth_token>" onLeave={() => {}} />;
}
```

**Core SDK**:
```typescript
import RealtimeKitClient from '@cloudflare/realtimekit';

const meeting = new RealtimeKitClient({ authToken: '<token>', video: true, audio: true });
await meeting.join();
```

## Reading Order

| Task | Files |
|------|-------|
| Quick integration | README only |
| Custom UI | README → patterns → api |
| Backend setup | README → configuration |
| Debug issues | gotchas |
| Advanced features | patterns → api |

## RealtimeKit vs Realtime SFU

| Choose | When |
|--------|------|
| **RealtimeKit** | Need pre-built UI, fast integration, React/Angular/HTML |
| **Realtime SFU** | Building from scratch, custom WebRTC, full control |

RealtimeKit is built on Realtime SFU but abstracts WebRTC complexity with UI components and SDKs.

## Which Package?

Need pre-built meeting UI?
- React → `@cloudflare/realtimekit-react-ui` (`<RtkMeeting>`)
- Angular → `@cloudflare/realtimekit-angular-ui`
- HTML/Vanilla → `@cloudflare/realtimekit-ui`

Need custom UI?
- Core SDK → `@cloudflare/realtimekit` (RealtimeKitClient) - full control

Need raw WebRTC control?
- See `realtime-sfu/` reference

## In This Reference

- [Configuration](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtimekit-configuration) - Setup, installation, wrangler config
- [API](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtimekit-api) - Meeting object, REST API, SDK methods
- [Patterns](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtimekit-patterns) - Common workflows, code examples
- [Gotchas](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-realtimekit-gotchas) - Common issues, troubleshooting

## See Also

- [Workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Backend integration
- [D1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Meeting metadata storage
- [R2](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2) - Recording storage
- [KV](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv) - Session management

## Reference Links

- **Official Docs**: https://developers.cloudflare.com/realtime/realtimekit/
- **API Reference**: https://developers.cloudflare.com/api/resources/realtime_kit/
- **Examples**: https://github.com/cloudflare/realtimekit-web-examples
- **Dashboard**: https://dash.cloudflare.com/?to=/:account/realtime/kit
