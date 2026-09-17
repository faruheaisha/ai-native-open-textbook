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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/proposal.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/proposal.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson09_OpenSpec_Advanced_Practice/my-website/openspec/changes/archive/2026-04-15-ai-chat/proposal.md"
sourceSha256: "1ad44db024ad8c60898162637c0184425c4a440c5a244d87585f4ab78608a43e"
pageSha256: "1ad44db024ad8c60898162637c0184425c4a440c5a244d87585f4ab78608a43e"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Why

StudyPal 的 AI 建议面板目前是静态 mock 数据，无法与用户实际交互。需要一个真正的 AI 对话页面，让用户可以与学习助手实时对话，获取基于自身学习数据（打卡天数、完成任务、学习效率）的个性化建议。

## What Changes

- 后端新增对话和消息的数据模型（conversations + messages 表）
- 后端新增 Chat API：创建对话、发送消息（流式响应）、获取对话历史
- 后端接入 DeepSeek API，system prompt 注入用户学习数据实现个性化回复
- 前端新增 `/dashboard/chat` 对话页面，消息气泡式 ChatUI
- 前端实现流式响应渲染（SSE / fetch stream）、自动滚动、Markdown 渲染
- Dashboard Sidebar 新增"AI 对话"导航项

## Capabilities

### New Capabilities
- `chat-backend`: 对话和消息的数据模型、CRUD API、DeepSeek 流式集成
- `chat-ui`: 前端对话页面（气泡布局、流式渲染、自动滚动、Markdown）

### Modified Capabilities
- `dashboard-layout`: Sidebar 新增 AI 对话导航项，新增 `/dashboard/chat` 子路由

## Impact

- **后端新增依赖**：`openai`（DeepSeek 兼容 OpenAI SDK）、`sse-starlette`（Server-Sent Events）
- **后端新增表**：`conversations`（id, user_id, title, created_at）、`messages`（id, conversation_id, role, content, created_at）
- **后端新增文件**：`models/conversation.py`、`schemas/chat.py`、`routers/chat.py`
- **前端新增依赖**：`react-markdown`（Markdown 渲染）
- **前端新增文件**：`pages/dashboard/ChatPage.tsx`、`components/dashboard/ChatBubble.tsx`
- **前端改动文件**：`DashboardPage.tsx`（路由）、`Sidebar.tsx`（导航项）、`App.tsx`（子路由）
- **环境变量**：`DEEPSEEK_API_KEY`（后端 .env）

## Out-of-Scope（不做）

- 语音输入
- 文件上传
- 模型切换（固定使用 DeepSeek）
- 对话导出 / 分享
- 多轮对话的上下文窗口管理（发送全部历史）

## 回滚方案

后端为独立 router + 独立表，回滚只需：
1. 移除 `routers/chat.py` 和对应 models/schemas
2. 回滚数据库迁移（`alembic downgrade`）
3. 前端删除 ChatPage 组件，恢复 Sidebar 和路由
