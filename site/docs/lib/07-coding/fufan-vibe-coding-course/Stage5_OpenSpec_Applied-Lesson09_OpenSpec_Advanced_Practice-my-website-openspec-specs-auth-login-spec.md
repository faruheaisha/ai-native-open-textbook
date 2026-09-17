---
title: "auth-login Specification"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/auth-login/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/auth-login/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/specs/auth-login/spec.md"
sourceSha256: "8bdb6d6a5323965192c8e78219fcdde1aa9f4a57b2d78d6bdbfda76b9d5e1c52"
pageSha256: "8bdb6d6a5323965192c8e78219fcdde1aa9f4a57b2d78d6bdbfda76b9d5e1c52"
contentMode: "local-full"
zh: ""
---

# auth-login Specification

## Purpose
TBD - created by archiving change user-auth. Update Purpose after archive.
## Requirements
### Requirement: 用户可通过邮箱密码登录
系统 SHALL 提供 `POST /api/auth/login` 接口，验证凭证后签发 JWT token 对。

#### Scenario: 登录成功
- **WHEN** 客户端发送正确的 email + password
- **THEN** 系统返回 `200` 和 `\{ access_token, refresh_token, token_type: "bearer" \}`，access_token 有效期 30 分钟

#### Scenario: 密码错误
- **WHEN** 客户端发送正确邮箱但错误密码
- **THEN** 系统返回 `401 Unauthorized` 和 `"invalid credentials"`

#### Scenario: 邮箱不存在
- **WHEN** 客户端发送未注册的邮箱
- **THEN** 系统返回 `401 Unauthorized` 和 `"invalid credentials"`（不泄露邮箱是否存在）

### Requirement: JWT token 可刷新
系统 SHALL 提供 `POST /api/auth/refresh` 接口，使用 refresh_token 签发新的 token 对。

#### Scenario: 刷新成功
- **WHEN** 客户端发送有效的 refresh_token
- **THEN** 系统返回新的 `\{ access_token, refresh_token, token_type: "bearer" \}`

#### Scenario: refresh_token 已过期
- **WHEN** 客户端发送过期的 refresh_token（超过 7 天）
- **THEN** 系统返回 `401 Unauthorized`

#### Scenario: refresh_token 格式无效
- **WHEN** 客户端发送无法解码的 token
- **THEN** 系统返回 `401 Unauthorized`
