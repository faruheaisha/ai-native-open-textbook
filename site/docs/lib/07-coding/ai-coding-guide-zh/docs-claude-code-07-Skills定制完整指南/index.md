---
title: "Skills定制完整指南：打造专属AI能力包的实战手册"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/07-Skills定制完整指南.md"
sourceRel: "docs/claude-code/07-Skills定制完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/07-Skills定制完整指南.md"
sourceSha256: "08d59f9361ab023a91b05efb9383116c7f71eb884c8755c7a83ecf46cba2ef7d"
pageSha256: "5b184150719606afbdbdc33177d9a02a584f0d8abf69c74f1a417c8d0aad530f"
contentMode: "local-full"
zh: ""
---

# Skills定制完整指南：打造专属AI能力包的实战手册

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **预计学时**：8-10小时
> - **更新日期**：2026年6月9日
> - **适用版本**：Claude Code v2.1.181（验证于 2026-06-18；旧差量保留为历史基线）
> - **前置要求**：已完成Claude Code安装和Commands基础使用
> - **🆕 专属内容**：Hooks系统、Forked Sub-Agents、Hot Reloading

---

## 本篇目录

- [本课学习目标](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-本课学习目标.md)
- [学习路径导航（先看这里！）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/02-学习路径导航_先看这里.md)
- [术语表（小白必读）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/03-术语表_小白必读.md)
- [第一部分：Skills简介（10分钟理解）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/04-第一部分_Skills简介_10分钟理解.md)
- [第二部分：5分钟快速开始（立即见效）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/05-第二部分_5分钟快速开始_立即见效.md)
- [第三部分：目录结构详解](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/06-第三部分_目录结构详解.md)
- [第四部分：SKILL.md提示词工程](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/07-第四部分_SKILL.md提示词工程.md)
- [第五部分：Python脚本集成](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/08-第五部分_Python脚本集成.md)
- [第六部分：实战案例分析](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/09-第六部分_实战案例分析.md)
- [第七部分：故障排查](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/10-第七部分_故障排查.md)
- [第八部分：FAQ（20个常见问题）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/11-第八部分_FAQ_20个常见问题.md)
- [第九部分：附录](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/12-第九部分_附录.md)
