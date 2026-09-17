---
title: "Zaraz Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/zaraz/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/zaraz/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/zaraz/patterns.md"
sourceSha256: "2ea1d00fe81b1e881c00090fd18c96d8c78ebb41fcc55f540b68150320d90d17"
pageSha256: "2ea1d00fe81b1e881c00090fd18c96d8c78ebb41fcc55f540b68150320d90d17"
contentMode: "local-full"
zh: ""
---

# Zaraz Patterns

## SPA Tracking

**History Change Trigger (Recommended):** Configure in dashboard - no code needed, Zaraz auto-detects route changes.

**Manual tracking (React/Vue/Next.js):**
```javascript
// On route change
zaraz.track('pageview', { page_path: pathname, page_title: document.title });
```

## User Identification

```javascript
// Login
zaraz.set({ userId: user.id, email: user.email, plan: user.plan });
zaraz.track('login', { method: 'oauth' });

// Logout - set to null (cannot clear)
zaraz.set('userId', null);
```

## E-commerce Funnel

| Event | Method |
|-------|--------|
| View | `zaraz.ecommerce('Product Viewed', \{ product_id, name, price \})` |
| Add to cart | `zaraz.ecommerce('Product Added', \{ product_id, quantity \})` |
| Checkout | `zaraz.ecommerce('Checkout Started', \{ cart_id, products: [...] \})` |
| Purchase | `zaraz.ecommerce('Order Completed', \{ order_id, total, products \})` |

## A/B Testing

```javascript
zaraz.set('experiment_checkout', variant);
zaraz.track('experiment_viewed', { experiment_id: 'checkout', variant });
// On conversion
zaraz.track('experiment_conversion', { experiment_id, variant, value });
```

## Worker Integration

**Context Enricher** - Modify context before tools execute:
```typescript
export default {
  async fetch(request, env) {
    const body = await request.json();
    body.system.userRegion = request.cf?.region;
    return Response.json(body);
  }
};
```
Configure: Zaraz > Settings > Context Enrichers

**Worker Variables** - Compute dynamic values server-side, use as <code v-pre>{{worker.variable_name}}</code>.

## GTM Migration

| GTM | Zaraz |
|-----|-------|
| `dataLayer.push(\{event: 'purchase'\})` | `zaraz.ecommerce('Order Completed', \{...\})` |
| <code v-pre>{{Page URL}}</code> | <code v-pre>{{system.page.url}}</code> |
| <code v-pre>{{Page Title}}</code> | <code v-pre>{{system.page.title}}</code> |
| Page View trigger | Pageview trigger |
| Click trigger | Click (selector: `*`) |

## Best Practices

1. Use dashboard triggers over inline code
2. Enable History Change for SPAs (no manual code)
3. Debug with `zaraz.debug = true`
4. Implement consent early (GDPR/CCPA)
5. Use Context Enrichers for sensitive/server data
