---
title: "NanoClaw Dashboard v2 · Phase 0+1 Implementation Plan"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
sourceSha256: "ac91c553bee6e692d448a9316f7d1454c31df6aede4e96b6de569667c2a6022a"
pageSha256: "c1813097c7d4e37dbfe2b4224d9aed2c8accb9b0f202de2752489eeaa772b91c"
contentMode: "local-full"
zh: ""
---

# NanoClaw Dashboard v2 · Phase 0+1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal**：把 `/Users/muyu/projects/nanoclaw-dashboard` 雏形以 1:1 视觉/功能等价的方式重写为 Next.js 14 + TS + Tailwind + shadcn/ui 的工程化项目，主页 4 卡 + 双栏 4 面板 + 聊天浮层全部到位，未实现页统一 EmptyState。

**Architecture**：App Router，主页是 server component 直接 import `lib/mock/*`；交互组件（chat、sidebar 折叠）按需 `"use client"`；`/api/chat` route handler 包 `pnpm run chat` 子进程。所有 NanoClaw 假设集中在 `lib/nanoclaw/contract.ts`，所有数据 schema 在 `lib/mock/schema.ts`。

**Tech Stack**：Next.js 14 (App Router) · TypeScript strict · Tailwind 3 · shadcn/ui (new-york + dark + CSS variables) · zod · vitest · @testing-library/react · pnpm · Node ≥ 20

**关联 Spec**：`docs/superpowers/specs/2026-05-09-nanoclaw-dashboard-v2-design.md`

**任务原则**：
- **原子性**：每个任务独立可验证、有明确产出（代码 + 测试 + commit）
- **重点关注 Task 5（数字格式化）+ Task 11（消息状态机）**：纯逻辑，先 TDD 写透，后续 UI 直接消费
- **视觉组件批量做**：纯展示无逻辑分支的卡片/面板组件合并到 Task 13/14/15

---

## File Structure 总览

```
nanoclaw-dashboard-v2/
├── app/
│   ├── layout.tsx                  ← Task 4
│   ├── globals.css                 ← Task 3
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← Task 13（含 Sidebar+Topbar）
│   │   ├── page.tsx                ← Task 16（控制台主页装配）
│   │   ├── agents/page.tsx         ← Task 17 批量 EmptyState
│   │   ├── skills/page.tsx         ← Task 17
│   │   ├── workflows/page.tsx      ← Task 17
│   │   ├── logs/page.tsx           ← Task 17
│   │   ├── security/page.tsx       ← Task 17
│   │   ├── settings/page.tsx       ← Task 17
│   │   ├── agents/new/page.tsx     ← Task 17
│   │   └── skills/import/page.tsx  ← Task 17
│   └── api/chat/route.ts           ← Task 12
├── components/
│   ├── ui/                         ← shadcn 生成（Task 4 装基础）
│   ├── shell/
│   │   ├── sidebar.tsx             ← Task 13
│   │   ├── topbar.tsx              ← Task 13
│   │   └── empty-state.tsx         ← Task 17
│   ├── dashboard/
│   │   ├── page-header.tsx         ← Task 14
│   │   ├── stat-card.tsx           ← Task 14
│   │   ├── stats-grid.tsx          ← Task 14
│   │   ├── mini-bars.tsx           ← Task 14（API 消耗小柱图）
│   │   ├── panel-card.tsx          ← Task 15（通用面板外壳）
│   │   ├── agent-table.tsx         ← Task 15
│   │   ├── workflow-status.tsx     ← Task 15
│   │   ├── recent-logs.tsx         ← Task 15
│   │   └── security-panel.tsx     ← Task 15
│   └── chat/
│       ├── chat-fab.tsx            ← Task 18
│       ├── chat-panel.tsx          ← Task 18
│       └── chat-message.tsx        ← Task 18
├── lib/
│   ├── format.ts                   ← Task 5（数字格式化，TDD 重点）
│   ├── chat-state.ts               ← Task 11（消息状态机，TDD 重点）
│   ├── brand.ts                    ← Task 4
│   ├── utils.ts                    ← Task 4（cn）
│   ├── mock/
│   │   ├── schema.ts               ← Task 6
│   │   ├── stats.ts                ← Task 7
│   │   ├── agents.ts               ← Task 8
│   │   ├── workflows.ts            ← Task 8
│   │   ├── logs.ts                 ← Task 9
│   │   ├── security.ts             ← Task 9
│   │   ├── platforms.ts            ← Task 10
│   │   └── nav.ts                  ← Task 10
│   └── nanoclaw/
│       └── contract.ts             ← Task 12
├── tests/                          ← 各任务内联
├── tailwind.config.ts              ← Task 2
├── next.config.mjs                 ← Task 1
├── vitest.config.ts                ← Task 4
├── tsconfig.json                   ← Task 1
└── package.json                    ← Task 1
```

---

## 任务清单速查（按 Phase）

| # | 类型 | 任务 | 估时 |
|---|---|---|---|
| **Phase 0 · 脚手架与主题** | | | |
| 1 | 脚手架 | 初始化 Next.js 14 项目 | 5 min |
| 2 | 主题 | 注入雏形颜色 token 到 tailwind.config.ts | 10 min |
| 3 | 主题 | 注入字体/字号/圆角/阴影到 globals.css | 10 min |
| 4 | 脚手架 | 装 shadcn-ui + vitest + lib 目录初始化 | 15 min |
| **Phase 1 · 纯逻辑（TDD 重点）** | | | |
| 5 | **逻辑（重点）** | `lib/format.ts` 数字格式化（TDD） | 30 min |
| 6 | 数据 | `lib/mock/schema.ts` zod schema 全集 | 20 min |
| 7 | 数据 | mock stats + 通过 schema 测试 | 10 min |
| 8 | 数据 | mock agents + workflows + 通过 schema 测试 | 15 min |
| 9 | 数据 | mock logs + security + 通过 schema 测试 | 15 min |
| 10 | 数据 | mock platforms + nav + 通过 schema 测试 | 10 min |
| 11 | **逻辑（重点）** | `lib/chat-state.ts` 消息状态机（TDD） | 45 min |
| 12 | API | `lib/nanoclaw/contract.ts` + `/api/chat` route 测试 | 40 min |
| **Phase 1 · 视觉（可批量）** | | | |
| 13 | 视觉批量 | Sidebar + Topbar + (dashboard) layout | 40 min |
| 14 | 视觉批量 | StatsGrid（StatCard + MiniBars + PageHeader） | 40 min |
| 15 | 视觉批量 | 4 面板（Agent/Workflow/Logs/Security） + PanelCard 外壳 | 60 min |
| 16 | 装配 | 主页 page.tsx 装配所有面板 | 15 min |
| 17 | 视觉批量 | 8 个 EmptyState 页 + 组件 | 20 min |
| 18 | 装配 | ChatFab + ChatPanel + ChatMessage（消费状态机） | 40 min |
| **收尾** | | | |
| 19 | 验收 | README + 手动验收 + Phase 1 tag | 20 min |
