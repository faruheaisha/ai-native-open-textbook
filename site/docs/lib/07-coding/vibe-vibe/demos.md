---
title: "Demo 项目"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/demos/README.md"
sourceRel: "demos/README.md"
rawUrl: "/raw/07-coding/vibe-vibe/demos/README.md"
sourceSha256: "9724eac2b385592bd49f37a1a69fd277a564c711482c77646e3f4708cdd21e76"
pageSha256: "9724eac2b385592bd49f37a1a69fd277a564c711482c77646e3f4708cdd21e76"
contentMode: "local-full"
zh: ""
---

# Demo 项目

配合《Vibe Coding 进阶教程》第 6-9 章的可运行示例。

## 项目列表

| Demo | 对应章节 | 说明 | 核心技术 |
|------|---------|------|---------|
| `demo-01-todo` | 第 7 章 CRUD + 第 9 章测试 | Next.js Todo 增删改查 | Next.js 16 · Drizzle ORM · Vitest |
| `demo-02-todo-auth` | 第 8 章 认证 | Todo + Better Auth 用户系统 | Better Auth · 游标分页 · 虚拟列表 |
| `demo-03-social-schema` | 第 6 章 Schema 设计 | Drizzle ORM 纯脚本演示（无 UI） | 社交网络 Schema · 事务 · 高级查询 |

## 快速开始

每个 demo 都是独立项目，进入对应目录：

```bash
cd demo-01-todo
cp .env.example .env     # 填入你的 DATABASE_URL
pnpm install
pnpm drizzle-kit push    # 同步表结构到数据库
pnpm dev                 # 启动开发服务器（demo-01/02）
```

demo-03 没有 UI，用脚本运行：

```bash
cd demo-03-social-schema
cp .env.example .env
pnpm install
pnpm push                # 同步表结构
pnpm seed                # 插入示例数据
pnpm demo                # 运行 CRUD 演示
```

## 数据库

所有 demo 使用 [Neon](https://neon.tech) PostgreSQL。免费注册后创建数据库，将连接字符串填入 `.env`。

每个 demo 应使用独立的数据库实例，避免表名冲突。

## 学习路径

1. **demo-03** → 先理解数据库 Schema 设计和 SQL 操作
2. **demo-01** → 用 Next.js 实现完整 CRUD，学习前后端联调和测试
3. **demo-02** → 在 CRUD 基础上加认证，理解用户系统和权限控制
