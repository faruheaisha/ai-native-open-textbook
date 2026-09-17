---
title: "从数据库到 Supabase"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-2/backend/database-supabase/index.md"
sourceRel: "docs/zh-cn/stage-2/backend/database-supabase/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-2/backend/database-supabase/index.md"
sourceSha256: "93205f4c716f44e4f6122207e5ae2d1d2058bc41d3abbee81002b3e819afabed"
pageSha256: "434f3b0cb49c357fb8b5a2a3d6c56ae9c1a6a80296c87cc2b58bf23a9450a838"
contentMode: "local-full"
zh: ""
---

# 从数据库到 Supabase

在上节课中，我们学会了 UI 设计程序 Mastergo 和 Figma 的基本用法，能够使用 github 进行代码的获取与版本管理，并通过 Zeabur 部署网站将自己的应用 / 网站传达给更多人使用。

为了帮助大家更好地衔接知识，在开始本节课关于设计工具与部署的新内容前，让我们一起通过几道简单的题目快速回顾一下上节课的核心知识点：

1. 什么是前端设计工具、Figma、MasterGo 的定义和使用方式。
2. 将设计稿转换为代码的基础方法。
3. 什么是 Github，如何配置 SSH，如何构建自己的第一个仓库。
4. 部署是什么意思，如何使用 Zeabur，如何将 Github 或本地代码部署至公共网络给大家访问。

如果对以上任何一个问题还有印象模糊的地方，建议先回顾一下上节课的文档和讲义。欢迎随时在微信学习群中提出疑问。

在本节课中，我们将学习如何让一个 APP / 网站从能跑起来变为更接近真实线上产品：除了用数据库管理程序运行中的各种数据变化外，还要具备完善的用户体系（注册、登录、权限等）以及其他关键后端能力。我们会以 Supabase 这一后端服务平台为主线，先用它实现“数据库 + 用户系统”这两项基础功能，再以 Supabase 提供的组件为参照，进一步理解现代云服务后端服务通常包含的核心模块，以及各模块的具体职能与作用逻辑。
