---
title: "第2章节：环境搭建"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/02-installation.md"
sourceRel: "docs/01-basics/02-installation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/01-basics/02-installation.md"
sourceSha256: "ad38987b0e0a4f1aa9ff89c15af14b56823a0c189f58e461da221a3dd919f40b"
pageSha256: "bc86eeadcc89819f69618b284e4753cadb290e4e99c95d0d0977cae21f2883e1"
contentMode: "local-full"
zh: ""
---

# 第2章节：环境搭建

> 本章节将手把手教你安装 OpenClaw。

> ⚠️ **当前基线**：截至 **2026-09-10**，本教程推荐使用 **OpenClaw v2026.9.3（稳定版，2026-09-08 发布）**。运行时要求 **Node 24.16+** 或 **Node 26.1+**（推荐 Node 26）；Node 22 / 旧 24.x 已不再支持。

![OpenClaw 安装界面](https://upload.maynor1024.live/file/1771085321300_installation-interface.png)

## 本篇目录

- [📋 前提条件与推荐配置](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/01-前提条件与推荐配置.md)
- [快速导航](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/02-快速导航.md)
- [Mac本地部署（推荐）](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/03-Mac本地部署_推荐.md)
- [Windows本地部署](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/04-Windows本地部署.md)
- [Linux本地部署](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/05-Linux本地部署.md)
- [2.1 系统要求与准备](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/06-2.1_系统要求与准备.md)
- [云端一键部署](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/07-云端一键部署.md)
- [国内一键安装（推荐）](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/08-国内一键安装_推荐.md)
- [Cloudflare Workers 部署（进阶）](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/09-Cloudflare_Workers_部署_进阶.md)
- [Docker 部署（可选）](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/10-Docker_部署_可选.md)
- [更新和维护](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/11-更新和维护.md)
- [API配置指南](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/12-API配置指南.md)
- [常见访问题解决](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/13-常见访问题解决.md)
- [2.X 版本升级指南](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/14-2.X_版本升级指南.md)
- [本章节小结](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/15-本章节小结.md)
- [实战练习](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/16-实战练习.md)
- [🌐 在线阅读](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/17-在线阅读.md)
