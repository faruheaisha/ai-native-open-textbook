---
title: "Lesson 12: Superpowers Getting Started — TDD-Driven Development"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/README.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/README.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/README.md"
sourceSha256: "4c0800cee1ab6480d6c87c4ed217844ac13c7ddb8949c6ba5cd2fe274cf6deec"
pageSha256: "4c0800cee1ab6480d6c87c4ed217844ac13c7ddb8949c6ba5cd2fe274cf6deec"
contentMode: "local-full"
zh: ""
---

# Lesson 12: Superpowers Getting Started — TDD-Driven Development

English | [中文](/lib/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied-Lesson12_Superpowers_Getting_Started-README_CN)

This lesson introduces the Superpowers framework — a TDD-first specification-driven methodology — and walks through the NanoClaw Dashboard starter project as a hands-on showcase.

## Topics

- The three frameworks of AI-driven development: OpenSpec → Spec-Kit → Superpowers
- Superpowers TDD core principles
- Specification-driven test-first workflow
- NanoClaw Dashboard: SaaS-grade dark dashboard from scratch

## Course Materials

- [10-Superpowers基础入门.pdf](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/CourseWare/10-Superpowers基础入门.pdf)
- [10-Superpowers基础入门.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/CourseWare/10-Superpowers基础入门.excalidraw)
- [10_Superwers项目案例.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/CourseWare/10_Superwers项目案例.excalidraw)

## Project Assets

### Frontend (v1) — `nanoclaw-dashboard/` (v1.0.0)

SaaS-grade dark dashboard — entry-point version.

- Tech stack: `Node.js (built-in)` `Vanilla JS` `inline CSS`
- Highlights:
  - Independent project (no NanoClaw fork pollution)
  - Zero external dependencies (~1500 lines inline CSS+JS)
  - Decoupled from backend via `NANOCLAW_ROOT` env var
  - Live demo: floating button → spawns `pnpm run chat` → talks to Andy
- Scope (intentional YAGNI):
  - All data is mocked (4 stat cards, agent list, workflow, logs, security panel)
  - The A0 case section will be rewritten as Next.js 14 + Tailwind with real APIs (upgraded to v2.0.0 later)

### Frontend (v2) — [`nanoclaw-dashboard-v2/`](/lib/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied-Lesson12_Superpowers_Getting_Started-nanoclaw-dashboard-v2) (v0.2.1)

Next.js production rewrite of the dashboard — Phase 1 + critical security patches.

- Tech stack: `Next.js` `TypeScript` `Tailwind CSS` `Vitest`
- Highlights:
  - 5-state panel machine (closed / open / sending / received / error) with 42 TDD tests
  - Wired `/api/chat` route to the NanoClaw backend contract
  - Surfaces error state with retry / dismiss
- Run: `pnpm install && pnpm dev` (requires backend running locally)

### Backend — [`nanoclaw-v2-backend/`](/lib/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied-Lesson12_Superpowers_Getting_Started-nanoclaw-v2-backend)

NanoClaw v2 backend (full source) — the CLI runtime that the dashboard talks to via `pnpm run chat`.

- Includes `.claude/`, `.superpowers/`, `.omc/` AI workflow configurations
- `node_modules/`, `dist/`, `logs/`, `data/`, `.env`, `.git/` are excluded
- Copy `.env.example` to `.env` and fill in your own configuration before running
- Point the dashboard's `NANOCLAW_ROOT` env var to this folder when running locally

## About `.excalidraw` Files

The `.excalidraw` files are the **original editable courseware**. You can modify and customize them as needed.

**How to Open:**

1. Visit [https://excalidraw.com/](https://excalidraw.com/) (VPN required)
2. Click the menu icon (☰) → **Open** (Ctrl+O)
3. Select the `.excalidraw` file from your local drive

## Related

- [← Back to Stage 7](/lib/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied)
