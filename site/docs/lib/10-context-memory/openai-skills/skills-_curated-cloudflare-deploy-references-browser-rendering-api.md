---
title: "Browser Rendering API"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/browser-rendering/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/browser-rendering/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/browser-rendering/api.md"
sourceSha256: "0f346bfc469d1deb6077523b6ea20f071975c5223267415b2b9398cc6ab566ae"
pageSha256: "0f346bfc469d1deb6077523b6ea20f071975c5223267415b2b9398cc6ab566ae"
contentMode: "local-full"
zh: ""
---

# Browser Rendering API

## REST API

**Base:** `https://api.cloudflare.com/client/v4/accounts/\{accountId\}/browser-rendering`  
**Auth:** `Authorization: Bearer <token>` (Browser Rendering - Edit permission)

### Endpoints

| Endpoint | Description | Key Options |
|----------|-------------|-------------|
| `/content` | Get rendered HTML | `url`, `waitUntil` |
| `/screenshot` | Capture image | `screenshotOptions: \{type, fullPage, clip\}` |
| `/pdf` | Generate PDF | `pdfOptions: \{format, landscape, margin\}` |
| `/snapshot` | HTML + inlined resources | `url` |
| `/scrape` | Extract by selectors | `selectors: ["h1", ".price"]` |
| `/json` | AI-structured extraction | `schema: \{name: "string", price: "number"\}` |
| `/links` | Get all links | `url` |
| `/markdown` | Convert to markdown | `url` |

```bash
curl -X POST '.../browser-rendering/screenshot' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"url":"https://example.com","screenshotOptions":{"fullPage":true}}'
```

## Workers Binding

```jsonc
// wrangler.jsonc
{ "browser": { "binding": "MYBROWSER" } }
```

## Puppeteer

```typescript
import puppeteer from "@cloudflare/puppeteer";

const browser = await puppeteer.launch(env.MYBROWSER, { keep_alive: 600000 });
const page = await browser.newPage();
await page.goto('https://example.com', { waitUntil: 'networkidle0' });

// Content
const html = await page.content();
const title = await page.title();

// Screenshot/PDF
await page.screenshot({ fullPage: true, type: 'png' });
await page.pdf({ format: 'A4', printBackground: true });

// Interaction
await page.click('#button');
await page.type('#input', 'text');
await page.evaluate(() => document.querySelector('h1')?.textContent);

// Session management
const sessions = await puppeteer.sessions(env.MYBROWSER);
const limits = await puppeteer.limits(env.MYBROWSER);

await browser.close();
```

## Playwright

```typescript
import { launch, connect } from "@cloudflare/playwright";

const browser = await launch(env.MYBROWSER, { keep_alive: 600000 });
const page = await browser.newPage();

await page.goto('https://example.com', { waitUntil: 'networkidle' });

// Modern selectors
await page.locator('.button').click();
await page.getByText('Submit').click();
await page.getByTestId('search').fill('query');

// Context for isolation
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  userAgent: 'custom'
});

await browser.close();
```

## Session Management

```typescript
// List sessions
await puppeteer.sessions(env.MYBROWSER);

// Connect to existing
await puppeteer.connect(env.MYBROWSER, sessionId);

// Check limits
await puppeteer.limits(env.MYBROWSER);
// { remaining: ms, total: ms, concurrent: n }
```

## Key Options

| Option | Values |
|--------|--------|
| `waitUntil` | `load`, `domcontentloaded`, `networkidle0`, `networkidle2` |
| `keep_alive` | Max 600000ms (10 min) |
| `screenshot.type` | `png`, `jpeg` |
| `pdf.format` | `A4`, `Letter`, `Legal` |
