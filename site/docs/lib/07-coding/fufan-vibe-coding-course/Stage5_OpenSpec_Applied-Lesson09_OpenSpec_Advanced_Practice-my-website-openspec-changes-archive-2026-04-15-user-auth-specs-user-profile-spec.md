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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/user-profile/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/user-profile/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/user-profile/spec.md"
sourceSha256: "de939648b7bb73ccc75d9e30ecf4488af0a17899479fabb73ca5b09b6962fd87"
pageSha256: "de939648b7bb73ccc75d9e30ecf4488af0a17899479fabb73ca5b09b6962fd87"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: 已登录用户可获取自身 Profile
系统 SHALL 提供 `GET /api/users/me` 接口，返回当前认证用户的 Profile 信息。

#### Scenario: 获取 Profile 成功
- **WHEN** 客户端携带有效 Bearer token 请求
- **THEN** 系统返回 `200` 和 `\{ id, email, avatar_url, streak_days, level \}`

#### Scenario: 未携带 token
- **WHEN** 客户端未提供 Authorization header
- **THEN** 系统返回 `401 Unauthorized`

#### Scenario: token 已过期
- **WHEN** 客户端携带过期的 access_token
- **THEN** 系统返回 `401 Unauthorized`

### Requirement: 已登录用户可更新自身 Profile
系统 SHALL 提供 `PATCH /api/users/me` 接口，允许更新 avatar_url、streak_days、level 字段。

#### Scenario: 更新 Profile 成功
- **WHEN** 客户端携带有效 token 发送 `\{ avatar_url: "https://example.com/avatar.jpg" \}`
- **THEN** 系统更新对应字段，返回 `200` 和完整的更新后 Profile

#### Scenario: 部分字段更新
- **WHEN** 客户端仅发送 `\{ streak_days: 15 \}`
- **THEN** 仅更新 streak_days，其余字段保持不变

#### Scenario: 无有效字段
- **WHEN** 客户端发送空对象 `\{\}`
- **THEN** 系统返回 `200` 和当前 Profile（无变更）
