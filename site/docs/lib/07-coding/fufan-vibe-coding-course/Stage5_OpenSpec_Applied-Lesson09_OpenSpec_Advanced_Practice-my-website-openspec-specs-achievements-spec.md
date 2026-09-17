---
title: "achievements Specification"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/achievements/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/achievements/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/achievements/spec.md"
sourceSha256: "a69caff4dde40ce92af3c22c73ca757a4ae86f631ef5b201a0806f1e251a8e90"
pageSha256: "a69caff4dde40ce92af3c22c73ca757a4ae86f631ef5b201a0806f1e251a8e90"
contentMode: "local-full"
zh: ""
---

# achievements Specification

## Purpose
TBD - created by archiving change analytics-deploy. Update Purpose after archive.
## Requirements
### Requirement: 获取用户成就列表
系统 SHALL 提供 `GET /api/analytics/achievements` 接口，返回全部成就定义及用户解锁状态。

#### Scenario: 获取成就列表
- **WHEN** 认证用户请求成就列表
- **THEN** 系统返回所有成就定义，每项含 `\{ type, name, description, unlocked, unlocked_at \}`

#### Scenario: 未解锁成就
- **WHEN** 用户未满足某成就条件
- **THEN** 该成就项 `unlocked` 为 `false`，`unlocked_at` 为 `null`

### Requirement: 检查并解锁新成就
系统 SHALL 提供 `POST /api/analytics/achievements/check` 接口，根据当前学习数据检查并解锁满足条件的成就。

#### Scenario: 解锁新成就
- **WHEN** 用户学习数据满足某成就条件且尚未解锁
- **THEN** 系统解锁该成就，返回 `\{ newly_unlocked: ["streak-7"] \}`

#### Scenario: 无新成就
- **WHEN** 用户未满足任何新成就条件
- **THEN** 系统返回 `\{ newly_unlocked: [] \}`
