---
title: "Site Architecture"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/docs/architecture/index.md"
sourceRel: "docs/architecture/index.md"
rawUrl: "/raw/08-agents/zero2agent/docs/architecture/index.md"
sourceSha256: "f529297e266a062418e3c421503b9f1cd6433759265993403a8f13d44b869a29"
pageSha256: "f529297e266a062418e3c421503b9f1cd6433759265993403a8f13d44b869a29"
contentMode: "local-full"
zh: ""
---

# Site Architecture

当前站点采用和 `zero2Leetcode` 同一路线的静态方案，但为了适配知识库项目做了简化和重组。

## 当前结构

| 层级 | 作用 |
| --- | --- |
| `index.html` | 首页展示和学习路线导航 |
| `_layouts/default.html` | Markdown 页面统一布局 |
| `assets/css/style.css` | 首页视觉与模块卡片样式 |
| `assets/css/docs.css` | Markdown 文档样式与代码高亮适配 |
| `learn-*` / `final-project` | 教程章节入口目录 |

## 设计原则

- 内容优先，样式服务内容
- 首页和文档页分离，避免互相污染
- Markdown 排版优先考虑长文阅读和代码块展示
- 后续新增章节时只需要补目录和 `index.md`
