---
title: "netlify.toml Configuration Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/netlify-deploy/references/netlify-toml.md"
sourceRel: "skills/.curated/netlify-deploy/references/netlify-toml.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/netlify-deploy/references/netlify-toml.md"
sourceSha256: "436ea3c2e0ce04abb34895db993d91b8660423977d9c52a89f2dfa014cad0b9c"
pageSha256: "436ea3c2e0ce04abb34895db993d91b8660423977d9c52a89f2dfa014cad0b9c"
contentMode: "local-full"
zh: ""
---

# netlify.toml Configuration Reference

Configuration file for Netlify builds and deployments.

## Basic Structure

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## Build Settings

### Common Configuration

```toml
[build]
  # Command to build your site
  command = "npm run build"

  # Directory to publish (relative to repo root)
  publish = "dist"

  # Functions directory
  functions = "netlify/functions"

  # Base directory (if not repo root)
  base = "packages/frontend"

  # Ignore builds for specific conditions
  ignore = "git diff --quiet HEAD^ HEAD package.json"
```

## Environment Variables

```toml
[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--prefix=/dev/null"

[context.production.environment]
  NODE_ENV = "production"
```

## Framework Detection

Netlify auto-detects frameworks, but you can override:

### Next.js

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

### React (Vite)

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Vue

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Astro

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### SvelteKit

```toml
[build]
  command = "npm run build"
  publish = "build"
```

## Redirects and Rewrites

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200

# SPA fallback (for client-side routing)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "default-src 'self'"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Context-Specific Configuration

Deploy different settings per context:

```toml
# Production
[context.production]
  command = "npm run build:prod"
  [context.production.environment]
    NODE_ENV = "production"

# Deploy previews
[context.deploy-preview]
  command = "npm run build:preview"

# Branch deploys
[context.branch-deploy]
  command = "npm run build:staging"

# Specific branch
[context.staging]
  command = "npm run build:staging"
```

## Functions Configuration

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[functions]]
  path = "/api/*"
  function = "api"
```

## Build Plugins

```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  [plugins.inputs]
    output_path = "reports/lighthouse.html"

[[plugins]]
  package = "netlify-plugin-submit-sitemap"

  [plugins.inputs]
    baseUrl = "https://example.com"
    sitemapPath = "/sitemap.xml"
```

## Edge Functions

```toml
[[edge_functions]]
  function = "geolocation"
  path = "/api/location"
```

## Processing

```toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true

[build.processing.images]
  compress = true
```

## Common Patterns

### Single Page Application (SPA)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Monorepo with Base Directory

```toml
[build]
  base = "packages/web"
  command = "npm run build"
  publish = "dist"
```

### Multiple Redirects with Country-Based Routing

```toml
[[redirects]]
  from = "/"
  to = "/uk"
  status = 302
  conditions = {Country = ["GB"]}

[[redirects]]
  from = "/"
  to = "/us"
  status = 302
  conditions = {Country = ["US"]}
```

## Validation

Validate your netlify.toml:

```bash
npx netlify build --dry
```

## Resources

- Full configuration reference: https://docs.netlify.com/configure-builds/file-based-configuration/
- Framework-specific guides: https://docs.netlify.com/frameworks/
