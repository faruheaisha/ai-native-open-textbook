---
title: "导学：环境配置与工具准备"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/00_Introduction/README_CN.md"
sourceRel: "00_Introduction/README_CN.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/00_Introduction/README_CN.md"
sourceSha256: "73b9e6485f5b5590b9e9ee2582cad09cde0b84e9f53f680aa217ffb026e09a05"
pageSha256: "73b9e6485f5b5590b9e9ee2582cad09cde0b84e9f53f680aa217ffb026e09a05"
contentMode: "local-full"
zh: ""
---

# 导学：环境配置与工具准备

> **《Vibe Coding AI全栈开发实战》** 课程前置准备

## 概述

在正式开启 Vibe Coding 之旅前，我们需要完成开发环境的配置。这一步看似简单，却是很多人在后续学习中遇到问题的根源。

**为什么 Vibe Coding 工具链需要完整配置？**

  <img src="/mirror/12/12484ca3f2b1bd2af8dc9dae9d3b10932712096c.webp" width="85%" alt="为什么 Git 是 AI 编程必修课">

Vibe Coding 的核心工具链——Cursor、GitHub、AI 模型服务——都依赖稳定的国际网络连接。没有 Git：
- ❌ 无法提交代码
- ❌ 无法拉取仓库
- ❌ Agent 功能卡住
- ❌ 权限认证失败

有了 Git，你将接入真实工程流：协作开发、变更追踪、交付上线。

---

## Git 与 GitHub 的关系

  <img src="/mirror/10/10e4c17d7c865c2ddaf4268a6d9ed18526cc9fe8.webp" width="80%" alt="Git 与 GitHub 的关系">

- **Git**（本地）- 分布式、本地仓库、离线工作
- **GitHub**（远程）- 集中式、在线托管、团队协作、社交编码
- **Push** - 推送代码/上传
- **Pull/Clone** - 拉取/克隆代码

---

## 完整学习路径

  <img src="/mirror/ae/ae08cd8699bf641a52105372b5ddbd079e41d19d.webp" width="90%" alt="Git 在 Cursor 工作流中的完整教学路径">

配置流程涵盖：
1. **Git 位置与价值** - 为什么必须学
2. **安装部署** - Windows / macOS / Linux
3. **首次配置与测试** - 用户名、邮箱、默认分支、Credential Manager

---

## 配置与验证流程

  <img src="/mirror/27/27eb0160286037c746364f25d4bac078131761ef.webp" width="90%" alt="Git 初始化配置与 Cursor 集成验证">

三个关键步骤：
1. **身份配置** - 设置全局 user.name 和 user.email
2. **凭据绑定** - 配置 Credential Manager 和 GitHub Token
3. **集成验证** - 在 Cursor 中测试提交和推送

---

## 课程列表

| 编号 | 主题 | 说明 |
|:---|:---|:---|
| [Intro-01](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/00_Introduction/导学1：网络环境配置与VPN准备.html) | 网络与VPN | 网络环境检测与 VPN 配置，确保 GitHub 和 AI 服务可访问 |
| [Intro-02](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/00_Introduction/导学2：Cursor安装部署与订阅.html) | Cursor 配置 | Cursor AI IDE 安装、账户注册与 Pro 订阅 |
| [Intro-03](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/00_Introduction/导学3：Git安装与GitHub配置.html) | Git 与 GitHub | Git 安装配置、GitHub 账户注册与 Token 配置 |
| [Intro-04](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/00_Introduction/导学4：Claude%20Code部署配置教程.html) | Claude Code | Claude Code 本地部署与配置教程，合并 Cursor 插件使用 |

---

## 前置要求

- 一台 Windows / macOS / Linux 电脑
- 稳定的网络连接
- 基本的电脑操作能力（无需编程经验）

---

## 学习目标

完成本阶段后，你将能够：

- [x] 配置可访问 GitHub 和 AI 服务的网络环境
- [x] 安装并登录 Cursor AI IDE
- [x] 完成 Cursor Pro 订阅（可选）
- [x] 安装 Git 并配置 GitHub 账户
- [x] 使用 Cursor Agent 完成第一次代码提交
- [x] 安装并配置 Claude Code（官方订阅 或 CC-Switch API Key 接入）

---

## 完成清单

在进入阶段一之前，请确保以下各项已完成：

```
[ ] VPN 配置完成，ip138.com 显示海外 IP
[ ] GitHub.com 可正常访问（3秒内加载）
[ ] Cursor 已安装并成功登录
[ ] Git 已安装，git --version 返回版本号
[ ] GitHub Personal Access Token 已创建
[ ] 能在 Cursor 中使用 Agent 执行 Git 操作
[ ] Claude Code 已安装并完成认证配置
```

---

## 预计用时

| 课程 | 时间 |
|:---|:---|
| Intro-01：网络与VPN | 15-30 分钟 |
| Intro-02：Cursor 配置 | 20-30 分钟 |
| Intro-03：Git 与 GitHub | 20-30 分钟 |
| Intro-04：Claude Code | 30-45 分钟 |
| **总计** | **约 2 小时** |

---

## 下一步

完成环境配置后，进入 **[阶段一：AI编程范式与快速上手](/lib/07-coding/fufan-vibe-coding-course/Stage1_AI_Programming_Fundamentals)** 开始正式学习 Vibe Coding！

---

  <b>《Vibe Coding AI全栈开发实战》</b><br>
  独家首发 Vibe Coding 全栈研发指南<br>
  从零深度实战 Cursor & Claude Code
