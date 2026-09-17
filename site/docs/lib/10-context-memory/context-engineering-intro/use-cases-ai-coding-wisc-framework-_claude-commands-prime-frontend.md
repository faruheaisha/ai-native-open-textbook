---
title: "Prime Frontend: Web UI Orientation"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/ai-coding-wisc-framework/.claude/commands/prime-frontend.md"
sourceRel: "use-cases/ai-coding-wisc-framework/.claude/commands/prime-frontend.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/ai-coding-wisc-framework/.claude/commands/prime-frontend.md"
sourceSha256: "7561dff46bb8c2bdc0f32f82261851fb41d9e2a70d3c7120429225340f529fc4"
pageSha256: "7561dff46bb8c2bdc0f32f82261851fb41d9e2a70d3c7120429225340f529fc4"
contentMode: "local-full"
zh: ""
---

# Prime Frontend: Web UI Orientation

## Objective

Orient on the React frontend (`packages/web/`) before working on Web UI code. Also covers the
server-side Web adapter that feeds data to the UI via SSE.

## Process

### 1. Understand the Frontend Stack

Read `packages/web/package.json` for exact dependency versions (React 19, Vite 6, TanStack
Query v5, React Router v7, Tailwind v4, shadcn/ui).

### 2. Understand the Route and Layout Structure

Read `packages/web/src/App.tsx` for routes, layout, QueryClient config, and ErrorBoundary.

List route pages:
!`ls packages/web/src/routes/`

List component directories:
!`ls packages/web/src/components/`

### 3. Understand Component Organization

List each component subdirectory to understand the breakdown (chat, conversations, dashboard,
layout, sidebar, ui, workflows):
!`ls packages/web/src/components/chat/ packages/web/src/components/workflows/ packages/web/src/components/layout/`

### 4. Understand Data Fetching

Read `packages/web/src/lib/api.ts` — API client with REST functions and SSE base URL logic.

Read hooks in `packages/web/src/hooks/`:
!`ls packages/web/src/hooks/`

Read `packages/web/src/hooks/useSSE.ts` for the SSE streaming pattern.

### 5. Understand Theme and Styling

Read `packages/web/src/index.css` for the Tailwind v4 `@theme inline \{\}` block — this is the
single source of truth for colors, fonts, and design tokens (dark theme only, blue accents,
Inter + JetBrains Mono fonts). Note: uses `@import "tailwindcss"` (not `@tailwind` directives).

### 6. Understand the Server-Side Web Adapter

Read `packages/server/src/adapters/web/` files — the Web adapter uses SSE for streaming and
`sendStructuredEvent()` for rich tool call data.
!`ls packages/server/src/adapters/web/`

Read `packages/server/src/routes/api.ts` first 80 lines for API route structure.

### 7. Check Recent Frontend Activity

!`git log -8 --oneline -- packages/web/ packages/server/src/adapters/web/`

## Output

Summarize (under 200 words):

### Route Structure
- List each route page and its URL path
- Note active route and layout components

### Component Organization
- Key component groups and their responsibilities

### Data Fetching
- TanStack Query for REST (conversations, codebases, workflows)
- Manual EventSource (useSSE) for SSE streaming — bypasses Vite proxy in dev
- SSE_BASE_URL pattern: direct backend in dev, relative in prod

### Tailwind v4 + shadcn/ui Patterns
- `@theme inline \{\}` block (not tailwind.config.ts)
- `tw-animate-css` for animations
- Component aliases in `tsconfig.json` (`@/` → `src/`)

### Recent Changes
- Last few frontend commits
