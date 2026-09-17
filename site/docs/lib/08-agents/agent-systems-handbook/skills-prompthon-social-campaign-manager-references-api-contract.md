---
title: "Social API Contract"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/prompthon-social-campaign-manager/references/api-contract.md"
sourceRel: "skills/prompthon-social-campaign-manager/references/api-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/prompthon-social-campaign-manager/references/api-contract.md"
sourceSha256: "5799e333307b0a26d4a21193c5c032325a0cd05b7ec2c81fb3b5bbaeb7e5207c"
pageSha256: "5799e333307b0a26d4a21193c5c032325a0cd05b7ec2c81fb3b5bbaeb7e5207c"
contentMode: "local-full"
zh: ""
---

# Social API Contract

## Purpose

Use this reference when the skill needs exact production route names, auth headers, attach-media payloads, rewrite payloads, or the `apply-plan` JSON shape.

This reference assumes zero repo access.
- Use the deployed API only.
- Use the bundled `scripts/manage_social_campaign.py` helper for automation.
- Do not depend on local Prompthon source files, local package scripts, or repo-relative assets.

## Production Base URL

Default production origin:

```text
https://agents.prompthon.io
```

All social-manager routes are organization-scoped:

```text
/api/organizations/:orgId/social/:path
```

Examples:
- `/api/organizations/<orgId>/social/channels`
- `/api/organizations/<orgId>/social/campaigns`
- `/api/organizations/<orgId>/social/posts`
- `/api/organizations/<orgId>/social/media/search`

## Auth Modes

### Protected production API token

Header:

```text
x-prompthon-local-bridge-token: <token>
```

Production bootstrap flow:
1. Open the signed-in Social Media Manager page in Local mode.
2. Prefer requesting a short handoff code through the browser-side handoff event so the signed-in page can resolve it in the background.
3. Fallback: use the short handoff code visible in the page header when the event path is unavailable.
4. Exchange the code:
   `POST /api/agents/local-bridge/exchange`
5. Use returned `access_token` in `x-prompthon-local-bridge-token`.

Important boundary:
- Do not call `GET /api/agents/local-bridge/handoff/active` or
  `POST /api/agents/local-bridge/handoff` directly from the terminal.
- Those are authenticated page-owned routes. The signed-in browser page must
  call them and then return the resolved short code through the browser event
  contract.

Example handoff exchange body:

```json
{
  "code": "TLLMJW",
  "bridgeOrigin": "http://127.0.0.1:4319"
}
```

### Local testing bypass

This remains available for non-production testing only. It is not the default for this skill.

Header:

```text
x-prompthon-local-auth-bypass: 1
```

Optional browser cookie for Clerk-reading client surfaces:

```text
prompthon_local_auth_bypass=1
```

## Route Map

### Read routes

- `GET channels`
- `GET campaigns`
- `GET posts`
- `GET posts/:postId`
- `GET account-settings/summary`
- `GET calendar`
- `GET analytics/summary`

### Campaign routes

- `POST campaigns`
- `PATCH campaigns/:campaignId`
- `DELETE campaigns/:campaignId`

### Media routes

- `POST media/search`
- `POST posts/:postId/media`

### Post routes

- `POST posts`
- `PATCH posts/:postId`
- `DELETE posts/:postId`
- `POST posts/:postId/variants`
- `POST posts/:postId/ai-rewrite`
- `POST posts/:postId/publish`
- `POST posts/:postId/schedule`

### Schedule routes

- `POST schedules/process`
- `POST schedules/:scheduleId/execute`
- `PATCH schedules/:scheduleId`
- `DELETE schedules/:scheduleId`

## Media Search Payload

Example:

```json
{
  "query": "new energy control room ai visualization",
  "limit": 12,
  "perProvider": 6,
  "orientation": "landscape",
  "providers": ["unsplash", "pexels"]
}
```

## Attach-Media Payload

Use this route for post media instead of trying to seed only `settings.media` during draft creation.

Accepted input patterns:
- `query` with provider search
- explicit `mediaUrls`
- explicit `candidates`
- `generatedMedia`

Example with search:

```json
{
  "query": "solar battery digital twin",
  "providers": ["unsplash", "pexels"],
  "maxImages": 1,
  "replaceExisting": true,
  "altText": "AI model monitoring a solar battery network"
}
```

Example with explicit remote URL:

```json
{
  "mediaUrls": [
    "https://images.example.com/solar-grid.jpg"
  ],
  "replaceExisting": true
}
```

Example with generated image payload:

```json
{
  "generatedMedia": {
    "title": "Generated social image",
    "contentType": "image/png",
