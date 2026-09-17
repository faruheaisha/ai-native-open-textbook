---
title: "Framework Integration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/web-analytics/integration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/web-analytics/integration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/web-analytics/integration.md"
sourceSha256: "a0dbfd1a658252e25d7ffa86180c691c6976265526b36ab14ce9e4b469d95cba"
pageSha256: "a0dbfd1a658252e25d7ffa86180c691c6976265526b36ab14ce9e4b469d95cba"
contentMode: "local-full"
zh: ""
---

# Framework Integration

**Web Analytics is dashboard-only** - no programmatic API. This covers beacon integration.

## Basic HTML

```html

```

Place before closing `</body>` tag.

## Framework Examples

| Framework | Location | Notes |
|-----------|----------|-------|
| React/Vite | `public/index.html` | Add `spa: true` |
| Next.js App Router | `app/layout.tsx` | Use `<Script strategy="afterInteractive">` |
| Next.js Pages | `pages/_document.tsx` | Use `<Script>` |
| Nuxt 3 | `app.vue` with `useHead()` | Or use plugin |
| Vue 3/Vite | `index.html` | Add `spa: true` |
| Gatsby | `gatsby-browser.js` | `onClientEntry` hook |
| SvelteKit | `src/app.html` | Before `</body>` |
| Astro | Layout component | Before `</body>` |
| Angular | `src/index.html` | Add `spa: true` |
| Docusaurus | `docusaurus.config.js` | In `scripts` array |

## Configuration

```json
{
  "token": "YOUR_TOKEN",
  "spa": true
}
```

**Use `spa: true` for:** React Router, Vue Router, Next.js, Nuxt, Gatsby, SvelteKit, Angular

**Use `spa: false` for:** Traditional server-rendered (PHP, Django, Rails, WordPress)

## CSP Headers

```
script-src 'self' https://static.cloudflareinsights.com;
connect-src 'self' https://cloudflareinsights.com;
```

## GDPR Consent

```typescript
// Load conditionally based on consent
if (localStorage.getItem('analytics-consent') === 'true') {
  const script = document.createElement('script');
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.defer = true;
  script.setAttribute('data-cf-beacon', '{"token": "YOUR_TOKEN", "spa": true}');
  document.body.appendChild(script);
}
```
