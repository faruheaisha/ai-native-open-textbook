---
title: "/add-dashboard — NanoClaw Dashboard"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-dashboard/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-dashboard/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-dashboard/SKILL.md"
sourceSha256: "8cb3fd797032270cec647c9eae16243b86b0788a27d70ce19081d1d1bdaf7620"
pageSha256: "8cb3fd797032270cec647c9eae16243b86b0788a27d70ce19081d1d1bdaf7620"
contentMode: "local-full"
zh: ""
---

# /add-dashboard — NanoClaw Dashboard

Adds a local monitoring dashboard showing agent groups, sessions, channels, users, token usage, context windows, message activity, and real-time logs.

## Architecture

```
NanoClaw (pusher)              Dashboard (npm package)
┌──────────┐    POST JSON      ┌──────────────┐
│ collects │ ────────────────→ │ /api/ingest  │
│ DB data  │   every 60s       │ in-memory    │
│ tails    │ ────────────────→ │ /api/logs/   │
│ log file │   every 2s        │   push       │
└──────────┘                   │ serves UI    │
                               └──────────────┘
```

## Steps

### 1. Install the npm package

```bash
pnpm install @nanoco/nanoclaw-dashboard
```

### 2. Copy the pusher module

Copy the resource file into src:

```
.claude/skills/add-dashboard/resources/dashboard-pusher.ts → src/dashboard-pusher.ts
```

### 3. Add exports to src/db/index.ts

Add these two export blocks if not already present:

```typescript
// After the messaging-groups exports, add:
export {
  getMessagingGroupsByAgentGroup,
} from './messaging-groups.js';

// Before the credentials exports, add:
export {
  createDestination,
  getDestinations,
  getDestinationByName,
  getDestinationByTarget,
  hasDestination,
  deleteDestination,
} from './agent-destinations.js';
```

### 4. Wire into src/index.ts

Add the `readEnvFile` import at the top if not already present:

```typescript
import { readEnvFile } from './env.js';
```

Add after step 7 (OneCLI approval handler), before the `log.info('NanoClaw running')` line:

```typescript
  // 8. Dashboard (optional)
  const dashboardEnv = readEnvFile(['DASHBOARD_SECRET', 'DASHBOARD_PORT']);
  const dashboardSecret = process.env.DASHBOARD_SECRET || dashboardEnv.DASHBOARD_SECRET;
  const dashboardPort = parseInt(process.env.DASHBOARD_PORT || dashboardEnv.DASHBOARD_PORT || '3100', 10);
  if (dashboardSecret) {
    const { startDashboard } = await import('@nanoco/nanoclaw-dashboard');
    const { startDashboardPusher } = await import('./dashboard-pusher.js');
    startDashboard({ port: dashboardPort, secret: dashboardSecret });
    startDashboardPusher({ port: dashboardPort, secret: dashboardSecret, intervalMs: 60000 });
  } else {
    log.info('Dashboard disabled (no DASHBOARD_SECRET)');
  }
```

### 5. Add environment variables to .env

```
