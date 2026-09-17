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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/specs/dashboard-layout/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/specs/dashboard-layout/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-analytics-deploy/specs/dashboard-layout/spec.md"
sourceSha256: "c384b6b12482d359dc1f489f99b384517eeb64c3b70bd5aa009b8028d0216580"
pageSha256: "c384b6b12482d359dc1f489f99b384517eeb64c3b70bd5aa009b8028d0216580"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## MODIFIED Requirements

### Requirement: Sidebar 左侧导航栏
Dashboard 页面 SHALL 包含一个固定在左侧的导航栏，展示导航菜单项并支持折叠。

#### Scenario: 桌面端显示完整 Sidebar
- **WHEN** 视口宽度 ≥ 768px（md 断点）
- **THEN** Sidebar 以 256px 固定宽度显示，展示图标 + 文字标签

#### Scenario: 移动端 Sidebar 折叠
- **WHEN** 视口宽度 < 768px
- **THEN** Sidebar 默认隐藏，通过汉堡按钮展开为全屏遮罩层

#### Scenario: 导航项顺序
- **WHEN** Sidebar 渲染
- **THEN** 导航项按以下顺序排列：学习数据（/dashboard）→ AI 对话建议（/dashboard/chat）→ 学习目标（scroll to #goals）

#### Scenario: Sidebar 显示当前用户信息
- **WHEN** 用户已登录且 Dashboard 渲染
- **THEN** Sidebar 底部显示用户头像、等级徽章和登出按钮
