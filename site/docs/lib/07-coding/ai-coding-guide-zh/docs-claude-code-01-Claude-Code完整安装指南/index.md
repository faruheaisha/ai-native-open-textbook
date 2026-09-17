---
title: "Claude Code 完整安装指南：从零开始到成功运行"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceRel: "docs/claude-code/01-Claude-Code完整安装指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceSha256: "faa9c4a018405b1408c9cd9bbe81590453531a86b5e3100f6dba6afafac0f4bf"
pageSha256: "a1d1dcb49d67e6daa5864192f86219100a4918a26d2d9d54ef77fa27a869e415"
contentMode: "local-full"
zh: ""
---

# Claude Code 完整安装指南：从零开始到成功运行

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **预计学时**：2-3小时（原生安装更简单！）
> - **更新日期**：2026年6月9日
> - **适用版本**：Claude Code v2.1.181（验证于 2026-06-18；旧差量保留为历史基线）
> - **重要更新**：当前同时支持原生安装与标准 npm 安装；原生更省心，npm 路径仍然受支持且需要 Node.js 18+

---

## 本篇目录

- [📚 本课学习目标](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-本课学习目标.md)
- [🗺️ 学习路径导航（先看这里！）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/02-学习路径导航_先看这里.md)
- [术语表（小白必读）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/03-术语表_小白必读.md)
- [第一部分：Claude Code 简介](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/04-第一部分_Claude_Code_简介.md)
- [课前准备检查清单](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/05-课前准备检查清单.md)
- [第二部分：系统要求快速检查](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/06-第二部分_系统要求快速检查.md)
- [第四部分：Anthropic 账号准备](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/08-第四部分_Anthropic_账号准备.md)
- [第六部分：首次启动与验证](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/10-第六部分_首次启动与验证.md)
- [第6.5部分：Claude Code启动方式详解](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/11-第6.5部分_Claude_Code启动方式详解.md)
- [第七部分：IDE 集成配置](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/12-第七部分_IDE_集成配置.md)
- [第八部分：故障排查](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/13-第八部分_故障排查.md)
- [第九部分：学员常见问题FAQ](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/14-第九部分_学员常见问题FAQ.md)
- [第8.5部分：模型配置（安装后的进阶配置）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/15-第8.5部分_模型配置_安装后的进阶配置.md)
- [总结与检查清单](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/16-总结与检查清单.md)
- [附录](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/17-附录.md)
