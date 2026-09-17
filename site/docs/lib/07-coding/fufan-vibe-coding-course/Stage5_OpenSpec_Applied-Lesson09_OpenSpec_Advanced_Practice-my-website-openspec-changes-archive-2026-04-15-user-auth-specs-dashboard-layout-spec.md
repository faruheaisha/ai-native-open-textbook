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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/dashboard-layout/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/dashboard-layout/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/dashboard-layout/spec.md"
sourceSha256: "445f58935cfbe1a587f6008584154ba1f90c11a62552225441a1ef1927531611"
pageSha256: "445f58935cfbe1a587f6008584154ba1f90c11a62552225441a1ef1927531611"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: Dashboard 认证守卫
Dashboard 路由 SHALL 要求用户已登录，未登录用户自动重定向到登录页。

#### Scenario: 未登录访问 Dashboard
- **WHEN** 未认证用户访问 `/dashboard`
- **THEN** 系统重定向到 `/login`

#### Scenario: 已登录访问 Dashboard
- **WHEN** 已认证用户访问 `/dashboard`
- **THEN** 系统正常渲染 Dashboard 页面

#### Scenario: token 过期时访问 Dashboard
- **WHEN** 用户 access_token 过期但 refresh_token 有效
- **THEN** 系统自动刷新 token 并正常渲染 Dashboard

## MODIFIED Requirements

### Requirement: Sidebar 左侧导航栏
Dashboard 页面 SHALL 包含一个固定在左侧的导航栏，展示导航菜单项并支持折叠。

#### Scenario: 桌面端显示完整 Sidebar
- **WHEN** 视口宽度 ≥ 768px（md 断点）
- **THEN** Sidebar 以 256px 固定宽度显示，展示图标 + 文字标签

#### Scenario: 移动端 Sidebar 折叠
- **WHEN** 视口宽度 < 768px
- **THEN** Sidebar 默认隐藏，通过汉堡按钮展开为全屏遮罩层

#### Scenario: Sidebar 导航项点击滚动
- **WHEN** 用户点击 Sidebar 中的导航项（概览 / 目标 / AI 建议 / 趋势）
- **THEN** 主内容区平滑滚动到对应区块

#### Scenario: Sidebar 显示当前用户信息
- **WHEN** 用户已登录且 Dashboard 渲染
- **THEN** Sidebar 底部显示用户头像、等级徽章和登出按钮
