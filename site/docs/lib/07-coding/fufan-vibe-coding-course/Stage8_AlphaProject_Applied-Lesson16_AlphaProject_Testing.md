---
title: "Lesson 16: AlphaProject Part 3 — Full-Stack Testing Strategy"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/README.md"
sourceRel: "Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/README.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/README.md"
sourceSha256: "b0b49defc27a1df9adea8b7faa635bb393cc72d1daa0410675736ad24ec457c1"
pageSha256: "b0b49defc27a1df9adea8b7faa635bb393cc72d1daa0410675736ad24ec457c1"
contentMode: "local-full"
zh: ""
---

# Lesson 16: AlphaProject Part 3 — Full-Stack Testing Strategy

English | [中文](/lib/07-coding/fufan-vibe-coding-course/Stage8_AlphaProject_Applied-Lesson16_AlphaProject_Testing-README_CN)

The third and final session of the AlphaProject comprehensive practice. With the platform built end-to-end in Part 2, Part 3 hardens it: layer-by-layer testing — from backend units to frontend interactions to full-chain user journeys.

## Topics

- Testing pyramid for AI-driven full-stack projects
- Backend, frontend, fullstack-slice, and full-chain testing layers
- Test-routing strategy: when to write which kind of test
- Building a testing system blueprint that scales with the codebase
- Feature-driven dev × testing — closing the loop with `run-feature`

## Course Materials

- [12_AlphaProject 综合项目实战（下）.excalidraw](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/CourseWare/12_AlphaProject%20综合项目实战（下）.excalidraw)

## Course Assets

Seven Claude Code skills covering the testing strategy and feature workflow — see [`Assets/README.md`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/Assets/README.md) for the full index.

- **Strategy & routing**: `testing-system-blueprint`, `test-routing-advisor`
- **Layered testing**: `backend-testing`, `frontend-testing`, `fullstack-slice-testing`, `full-chain-testing`
- **Feature workflow**: `run-feature`

## Project Output — [`AlphaProject/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/README.md)

The final AlphaProject snapshot — backend, frontend, and tests for all six features built end-to-end with Claude Code.

- **[`backend/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/backend/README.md)**: Python service — `app/` (FastAPI app), `tests/` (extensive pytest suites covering anomaly detection, scheduler, models, APIs), `pyproject.toml`, `uv.lock`
- **[`frontend/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/frontend/README.md)**: Vite + TypeScript app — `src/`, `vite.config.ts`, `vitest.setup.ts`, pnpm/npm lockfiles
- **[`specs/001-watchlist-crud/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/specs/001-watchlist-crud/README.md) → [`006-morning-briefing/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/specs/006-morning-briefing/README.md)**: six feature bundles (spec / plan / tasks), carried through from Part 2
- **[`.specify/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/.specify/README.md)**: Spec-Kit installation (memory, workflows, templates, scripts)
- **[`.claude/skills/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/.claude/skills/README.md)**: full skill set used across the three parts — research, PRD, architecture, design injection, Spec-Kit family, testing layers
- **[`docs/screenshots/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/docs/screenshots/README.md)** + **[`scripts/`](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage8_AlphaProject_Applied/Lesson16_AlphaProject_Testing/AlphaProject/scripts/README.md)**: project documentation assets and helper scripts
- **`.mcp.json`**: muyu-search MCP wiring — `MUYU_API_KEY` is redacted, fill in your own key before use
- **`.env.example`** + **`.gitignore`** + **`CLAUDE.md`** + **`README.md`**: project bootstrap files (real `.env` is excluded)

## About `.excalidraw` Files

The `.excalidraw` files are the **original editable courseware**. You can modify and customize them as needed.

**How to Open:**

1. Visit [https://excalidraw.com/](https://excalidraw.com/) (VPN required)
2. Click the menu icon (☰) → **Open** (Ctrl+O)
3. Select the `.excalidraw` file from your local drive

## Related

- [← Back to Stage 8](/lib/07-coding/fufan-vibe-coding-course/Stage8_AlphaProject_Applied)
