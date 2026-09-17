---
title: "Sections"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/_sections.md"
sourceRel: "skills/react-best-practices/rules/_sections.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/_sections.md"
sourceSha256: "3f70f58057811d6b5602b5d37c4e0d6bf9be12f94875d2bf4653c9889bc51c9e"
pageSha256: "3f70f58057811d6b5602b5d37c4e0d6bf9be12f94875d2bf4653c9889bc51c9e"
contentMode: "local-full"
zh: ""
---

# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Eliminating Waterfalls (async)

**Impact:** CRITICAL
**Description:** Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.

## 2. Bundle Size Optimization (bundle)

**Impact:** CRITICAL
**Description:** Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.

## 3. Server-Side Performance (server)

**Impact:** HIGH
**Description:** Optimizing server-side rendering and data fetching eliminates server-side waterfalls and reduces response times.

## 4. Client-Side Data Fetching (client)

**Impact:** MEDIUM-HIGH
**Description:** Automatic deduplication and efficient data fetching patterns reduce redundant network requests.

## 5. Re-render Optimization (rerender)

**Impact:** MEDIUM
**Description:** Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.

## 6. Rendering Performance (rendering)

**Impact:** MEDIUM
**Description:** Optimizing the rendering process reduces the work the browser needs to do.

## 7. JavaScript Performance (js)

**Impact:** LOW-MEDIUM
**Description:** Micro-optimizations for hot paths can add up to meaningful improvements.

## 8. Advanced Patterns (advanced)

**Impact:** LOW
**Description:** Advanced patterns for specific cases that require careful implementation.
