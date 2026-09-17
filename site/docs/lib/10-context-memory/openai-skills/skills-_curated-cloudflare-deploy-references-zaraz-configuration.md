---
title: "Zaraz Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/zaraz/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/zaraz/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/zaraz/configuration.md"
sourceSha256: "6f3666ac64d1b36b4a708b3dea9d3b1d9679b34c58a00e3ca8e254edd602418a"
pageSha256: "6f3666ac64d1b36b4a708b3dea9d3b1d9679b34c58a00e3ca8e254edd602418a"
contentMode: "local-full"
zh: ""
---

# Zaraz Configuration

## Dashboard Setup

1. Domain → Zaraz → Start setup
2. Add tool (e.g., Google Analytics 4)
3. Enter credentials (GA4: `G-XXXXXXXXXX`)
4. Configure triggers
5. Save and Publish

## Triggers

| Type | When | Use Case |
|------|------|----------|
| Pageview | Page load | Track page views |
| Click | Element clicked | Button tracking |
| Form Submission | Form submitted | Lead capture |
| History Change | URL changes (SPA) | React/Vue routing |
| Variable Match | Custom condition | Conditional firing |

### History Change (SPA)

```
Type: History Change
Event: pageview
```

Fires on `pushState`, `replaceState`, hash changes. **No manual tracking needed.**

### Click Trigger

```
Type: Click
CSS Selector: .buy-button
Event: purchase_intent
Properties:
  button_text: {{system.clickElement.text}}
```

## Tool Configuration

**GA4:**
```
Measurement ID: G-XXXXXXXXXX
Events: page_view, purchase, user_engagement
```

**Facebook Pixel:**
```
Pixel ID: 1234567890123456
Events: PageView, Purchase, AddToCart
```

**Google Ads:**
```
Conversion ID: AW-XXXXXXXXX
Conversion Label: YYYYYYYYYY
```

## Consent Management

1. Settings → Consent → Create purposes (analytics, marketing)
2. Map tools to purposes
3. Set behavior: "Do not load until consent granted"

**Programmatic consent:**
```javascript
zaraz.consent.setAll({ analytics: true, marketing: true });
```

## Privacy Features

| Feature | Default |
|---------|---------|
| IP Anonymization | Enabled |
| Cookie Control | Via consent purposes |
| GDPR/CCPA | Consent modal |

## Testing

1. **Preview Mode** - test without publishing
2. **Debug Mode** - `zaraz.debug = true`
3. **Network tab** - filter "zaraz"

## Limits

| Resource | Limit |
|----------|-------|
| Event properties | 100KB |
| Consent purposes | 20 |
