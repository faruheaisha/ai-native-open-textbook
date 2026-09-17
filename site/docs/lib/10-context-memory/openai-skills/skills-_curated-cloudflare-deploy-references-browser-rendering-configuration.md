---
title: "Configuration & Setup"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/browser-rendering/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/browser-rendering/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/browser-rendering/configuration.md"
sourceSha256: "db9206a7f14bf13d5f8ade9875927662796016c52b0221b54c3e08238890b952"
pageSha256: "db9206a7f14bf13d5f8ade9875927662796016c52b0221b54c3e08238890b952"
contentMode: "local-full"
zh: ""
---

# Configuration & Setup

## Installation

```bash
npm install @cloudflare/puppeteer  # or @cloudflare/playwright
```

**Use Cloudflare packages** - standard `puppeteer`/`playwright` won't work in Workers.

## wrangler.json

```json
{
  "name": "browser-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "browser": {
    "binding": "MYBROWSER"
  }
}
```

**Required:** `nodejs_compat` flag and `browser.binding`.

## TypeScript

```typescript
interface Env {
  MYBROWSER: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // ...
  }
} satisfies ExportedHandler<Env>;
```

## Development

```bash
wrangler dev --remote  # --remote required for browser binding
```

**Local mode does NOT support Browser Rendering** - must use `--remote`.

## REST API

No wrangler config needed. Get API token with "Browser Rendering - Edit" permission.

```bash
curl -X POST \
  'https://api.cloudflare.com/client/v4/accounts/{accountId}/browser-rendering/screenshot' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"url": "https://example.com"}' --output screenshot.png
```

## Requirements

| Requirement | Value |
|-------------|-------|
| Node.js compatibility | `nodejs_compat` flag |
| Compatibility date | 2023-03-01+ |
| Module format | ES modules only |
| Browser | Chromium 119+ (no Firefox/Safari) |

**Not supported:** WebGL, WebRTC, extensions, `file://` protocol, Service Worker syntax.

## Troubleshooting

| Error | Solution |
|-------|----------|
| `MYBROWSER is undefined` | Use `wrangler dev --remote` |
| `nodejs_compat not enabled` | Add to `compatibility_flags` |
| `Module not found` | `npm install @cloudflare/puppeteer` |
| `Browser Rendering not available` | Enable in dashboard |
