---
title: "Documentation Systems & Infrastructure"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/code-documenter/references/documentation-systems.md"
sourceRel: "skills/code-documenter/references/documentation-systems.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/code-documenter/references/documentation-systems.md"
sourceSha256: "f429e98bb0b03aac43c9535d8ddf3348800376fc84fe597c252c53b6900c3adb"
pageSha256: "f429e98bb0b03aac43c9535d8ddf3348800376fc84fe597c252c53b6900c3adb"
contentMode: "local-full"
zh: ""
---

# Documentation Systems & Infrastructure

## Static Site Generators

### Docusaurus (Meta)

```bash
# Setup
npx create-docusaurus@latest docs classic
cd docs && npm start

# Structure
docs/
├── docs/           # Documentation pages
├── blog/           # Blog posts
├── src/
│   └── pages/      # Custom pages
└── docusaurus.config.js
```

**docusaurus.config.js:**

```javascript
module.exports = {
  title: "My API",
  tagline: "Build amazing things",
  url: "https://docs.example.com",
  baseUrl: "/",

  themeConfig: {
    navbar: {
      items: [
        { to: "/docs/intro", label: "Docs", position: "left" },
        { to: "/api", label: "API", position: "left" },
      ],
    },

    // Algolia search
    algolia: {
      apiKey: "YOUR_API_KEY",
      indexName: "your_index",
      contextualSearch: true,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["python", "rust"],
    },
  },
}
```

### MkDocs (Python)

```yaml
# mkdocs.yml
site_name: My API Documentation
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest
    - search.highlight
  palette:
    - scheme: default
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

plugins:
  - search
  - mkdocstrings:
      handlers:
        python:
          options:
            show_source: true
  - git-revision-date-localized

markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - admonition
  - codehilite

nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - API Reference: api/
```

### VitePress (Vue)

```typescript
// .vitepress/config.ts
export default defineConfig({
  title: "API Docs",
  description: "Developer documentation",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Configuration", link: "/guide/config" },
          ],
        },
      ],
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/user/repo/edit/main/docs/:path",
    },
  },
})
```

## Multi-Version Documentation

### Version Switcher

```javascript
// Docusaurus versions
{
  versions: {
    current: {
      label: '2.0 (Next)',
      path: 'next',
    },
  },
  onlyIncludeVersions: ['current', '1.5', '1.4'],
}
```

### Migration Guides

````markdown
# Migration Guide: v1 to v2

## Breaking Changes

### Authentication

**v1:**

```python
client.authenticate(api_key)
```
````

**v2:**

```python
client = Client(api_key=api_key)  # Pass in constructor
```

### Renamed Methods

| v1              | v2              | Notes           |
| --------------- | --------------- | --------------- |
| `get_user()`    | `fetch_user()`  | Async now       |
| `delete_user()` | `remove_user()` | Returns Promise |

## Deprecation Timeline

- v1.x: Supported until Dec 2025
- v2.0: Released Jan 2025
- v2.1: Current (June 2025)

````

## Search Implementation

### Algolia DocSearch

```html

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />

````

### Local Search (Lunr.js)

```javascript
const idx = lunr(function () {
  this.ref("id")
  this.field("title", { boost: 10 })
  this.field("content")

  documents.forEach((doc) => this.add(doc))
})

// Search
const results = idx.search("authentication")
```

## Documentation Testing

### Link Checking

```bash
# linkcheck (Python)
pip install linkchecker
linkchecker http://localhost:3000/docs

# broken-link-checker (Node)
npm install -g broken-link-checker
blc http://localhost:3000 -ro
```

### Code Example Testing

```python
# doctest for Python examples
"""
>>> add(2, 3)
5
>>> add(-1, 1)
0
"""

# Run tests
python -m doctest -v docs/*.md
```

```javascript
// Jest for TypeScript examples
// Extract code blocks and test
import { runExamples } from "./test-docs"

test("API examples work", async () => {
  const examples = extractExamples("./docs/api.md")
  await expect(runExamples(examples)).resolves.toBeTruthy()
})
```

## Performance Optimization

### Build Optimization

```javascript
// Webpack/Vite config
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["prismjs"],
  },
}
```

### CDN & Caching

```nginx
# nginx.conf
location /docs {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}
```

## Analytics Integration

### Google Analytics

```javascript
// Docusaurus
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
},
```

### Custom Analytics

```javascript
// Track search queries
function trackSearch(query, results) {
  analytics.track("docs_search", {
    query,
    resultCount: results.length,
    timestamp: new Date(),
  })
}
```

## Quick Reference

| Tool       | Best For                      | Tech Stack     |
| ---------- | ----------------------------- | -------------- |
| Docusaurus | React projects, versioning    | React, MDX     |
| MkDocs     | Python projects, simple setup | Python, Jinja2 |
| VitePress  | Vue projects, fast builds     | Vue, Vite      |
| Nextra     | Next.js integration           | React, Next.js |
| Mintlify   | Modern UI, AI search          | React          |

| Search Solution   | Cost             | Features            |
| ----------------- | ---------------- | ------------------- |
| Algolia DocSearch | Free (OSS)       | Fast, typo-tolerant |
| Local (Lunr.js)   | Free             | Offline, no server  |
| Typesense         | Free (self-host) | Privacy-focused     |
| Meilisearch       | Free (self-host) | Fast, relevance     |
