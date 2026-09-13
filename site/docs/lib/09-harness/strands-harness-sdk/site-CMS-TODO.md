---
title: "CMS Migration TODO"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/README.md"
zh: ""
---

# CMS Migration TODO

## After Launch
- [ ] Remove Vite SSR workaround for zod in `astro.config.mjs` once CMS build is separated from TS verification (see https://github.com/withastro/astro/issues/14117)
- [ ] Remove `<name>Data` special-case in `scripts/api-generation-typescript.ts` once typedoc fixes the prose or we find a better general solution
- [ ] Move asset files to proper location (currently in `docs/assets/`, should be in `src/content/docs/assets/`)
- [ ] Inline TypeScript code examples directly in markdown and verify via separate type-checking step (e.g., `tsc` on extracted code blocks) instead of snippet includes
- [ ] Update astro-auto-import once https://github.com/delucis/astro-auto-import/pull/110 is merged

## Blog

- [ ] Full-content RSS (currently includes description only, not rendered MDX body)
- [ ] Content negotiation via Accept headers (requires edge/CDN middleware, not SSG-compatible)
- [ ] `x-markdown-tokens` response header on markdown endpoints
- [ ] Markdown sitemap (`/blog/sitemap.md`)
- [ ] Newsletter signup integration
- [ ] OG image custom font (currently uses system sans-serif, not Figtree)
- [ ] Author avatars (schema supports `avatar` field but no images seeded yet)
- [ ] Cover images for posts (schema supports `coverImage` field)
- [ ] Visual design review / polish pass on blog pages
