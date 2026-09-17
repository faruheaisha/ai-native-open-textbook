---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/specs/dashboard-layout/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/specs/dashboard-layout/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/specs/dashboard-layout/spec.md"
sourceSha256: "14507f1bc2310825b531c33d6fcf2819f075a09dfe3413db38e791fdae111489"
pageSha256: "14507f1bc2310825b531c33d6fcf2819f075a09dfe3413db38e791fdae111489"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: Sidebar 包含 AI 对话导航项
Dashboard Sidebar SHALL 包含"AI 对话"菜单项，点击后导航到 `/dashboard/chat`。

#### Scenario: 点击 AI 对话导航
- **WHEN** 用户点击 Sidebar 中的"AI 对话"菜单项
- **THEN** 系统导航到 `/dashboard/chat` 并渲染对话页面

### Requirement: Dashboard 支持子路由
Dashboard SHALL 支持嵌套子路由，`/dashboard` 显示统计面板，`/dashboard/chat` 显示对话页面。

#### Scenario: 访问 /dashboard 显示统计面板
- **WHEN** 用户访问 `/dashboard`
- **THEN** 系统渲染统计卡片、目标清单、AI 建议、趋势图

#### Scenario: 访问 /dashboard/chat 显示对话页
- **WHEN** 用户访问 `/dashboard/chat`
- **THEN** 系统渲染 AI 对话界面
