---
title: "Cloudflare Browser Rendering Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/browser-rendering/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/browser-rendering/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/browser-rendering/README.md"
sourceSha256: "a0c6e51afc6c19f2a892e3f144b9210f4fe067318ad2550e34ded538a9db9463"
pageSha256: "a0c6e51afc6c19f2a892e3f144b9210f4fe067318ad2550e34ded538a9db9463"
contentMode: "local-full"
zh: ""
---

# Cloudflare Browser Rendering Skill Reference

**Description**: Expert knowledge for Cloudflare Browser Rendering - control headless Chrome on Cloudflare's global network for browser automation, screenshots, PDFs, web scraping, testing, and content generation.

**When to use**: Any task involving Cloudflare Browser Rendering including: taking screenshots, generating PDFs, web scraping, browser automation, testing web applications, extracting structured data, capturing page metrics, or automating browser interactions.

## Decision Tree

### REST API vs Workers Bindings

**Use REST API when:**
- One-off, stateless tasks (screenshot, PDF, content fetch)
- No Workers infrastructure yet
- Simple integrations from external services
- Need quick prototyping without deployment

**Use Workers Bindings when:**
- Complex browser automation workflows
- Need session reuse for performance
- Multiple page interactions per request
- Custom scripting and logic required
- Building production applications

### Puppeteer vs Playwright

| Feature | Puppeteer | Playwright |
|---------|-----------|------------|
| API Style | Chrome DevTools Protocol | High-level abstractions |
| Selectors | CSS, XPath | CSS, text, role, test-id |
| Best for | Advanced control, CDP access | Quick automation, testing |
| Learning curve | Steeper | Gentler |

**Use Puppeteer:** Need CDP protocol access, Chrome-specific features, migration from existing Puppeteer code
**Use Playwright:** Modern selector APIs, cross-browser patterns, faster development

## Tier Limits Summary

| Limit | Free Tier | Paid Tier |
|-------|-----------|-----------|
| Daily browser time | 10 minutes | Unlimited* |
| Concurrent sessions | 3 | 30 |
| Requests per minute | 6 | 180 |

*Subject to fair-use policy. See [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-gotchas) for details.

## Reading Order

**New to Browser Rendering:**
1. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-configuration) - Setup and deployment
2. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-patterns) - Common use cases with examples
3. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-api) - API reference
4. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-gotchas) - Avoid common pitfalls

**Specific task:**
- **Setup/deployment** → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-configuration)
- **API reference/endpoints** → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-api)
- **Example code/patterns** → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-patterns)
- **Debugging/troubleshooting** → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-gotchas)

**REST API users:**
- Start with [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-api) REST API section
- Check [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-gotchas) for rate limits

**Workers users:**
- Start with [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-configuration)
- Review [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-patterns) for session management
- Reference [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-api) for Workers Bindings

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-configuration)** - Setup, deployment, wrangler config, compatibility
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-api)** - REST API endpoints + Workers Bindings (Puppeteer/Playwright)
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-patterns)** - Common patterns, use cases, real examples
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-browser-rendering-gotchas)** - Troubleshooting, best practices, tier limits, common errors

## See Also

- [Cloudflare Docs](https://developers.cloudflare.com/browser-rendering/)
