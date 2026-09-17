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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/backend-setup/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/backend-setup/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-user-auth/specs/backend-setup/spec.md"
sourceSha256: "6744c68bba9fb70b5ce14ceaff457f30baec44fd1e6a350375f36f6a31709514"
pageSha256: "6744c68bba9fb70b5ce14ceaff457f30baec44fd1e6a350375f36f6a31709514"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: FastAPI 项目骨架可启动
后端 SHALL 提供一个可独立启动的 FastAPI 应用，监听 8000 端口，包含 CORS 配置和 API 路由挂载。

#### Scenario: 启动后端服务
- **WHEN** 执行 `uvicorn app.main:app --reload`
- **THEN** 服务在 `http://localhost:8000` 启动，`/docs` 返回 Swagger UI

#### Scenario: CORS 允许前端访问
- **WHEN** 前端从 `http://localhost:5173` 发起跨域请求
- **THEN** 后端返回正确的 CORS 响应头，请求不被拒绝

#### Scenario: 数据库文件自动创建
- **WHEN** 后端首次启动且 `backend/data/studypal.db` 不存在
- **THEN** SQLAlchemy 自动创建数据库文件和表结构

### Requirement: Alembic 迁移可用
后端 SHALL 使用 Alembic 管理数据库 schema 变更。

#### Scenario: 生成初始迁移
- **WHEN** 执行 `alembic revision --autogenerate -m "create users table"`
- **THEN** 在 `alembic/versions/` 生成包含 `users` 表定义的迁移脚本

#### Scenario: 执行迁移失败时报错
- **WHEN** 迁移脚本与当前数据库状态冲突
- **THEN** Alembic 输出明确的错误信息，不静默跳过
