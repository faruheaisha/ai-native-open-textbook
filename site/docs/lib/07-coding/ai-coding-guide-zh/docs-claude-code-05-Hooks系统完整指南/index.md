---
title: "Hooks系统完整指南：自动化工作流的终极武器"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/05-Hooks系统完整指南.md"
sourceRel: "docs/claude-code/05-Hooks系统完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/05-Hooks系统完整指南.md"
sourceSha256: "7b0bd7f3a4ad8cdcc94aedf3052a858bc659431ad678c54ca6ffbcf9ade8276f"
pageSha256: "20de8fce2f5a5e2663d9d61e5b9696fbcdc2ceead06ec838e199292f39d6748a"
contentMode: "local-full"
zh: ""
---

# Hooks系统完整指南：自动化工作流的终极武器

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **预计学时**：4-6小时
> - **更新日期**：2026年6月18日
> - **适用版本**：Claude Code v2.1.181（验证于 2026-06-18；旧差量保留为历史基线）
> - **前置要求**：已完成Claude Code安装和基础使用

---

## 本篇目录

- [本课学习目标](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-本课学习目标.md)
- [学习路径导航（先看这里！）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/02-学习路径导航_先看这里.md)
- [术语表（小白必读）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/03-术语表_小白必读.md)
- [第一部分：Hooks简介（5分钟理解）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/04-第一部分_Hooks简介_5分钟理解.md)
- [第二部分：5分钟快速开始（立即见效）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/05-第二部分_5分钟快速开始_立即见效.md)
- [第三部分：15种Hook类型详解](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/06-第三部分_15种Hook类型详解.md)
- [第四部分：实战应用场景](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/07-第四部分_实战应用场景.md)
- [第五部分：故障排查](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/08-第五部分_故障排查.md)
- [第六部分：FAQ（20个常见问题）](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/09-第六部分_FAQ_20个常见问题.md)
- [附录A：配置速查表](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/10-附录A_配置速查表.md)
- [附录B：完整脚本模板](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/11-附录B_完整脚本模板.md)
- [附录C：参考资源](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/12-附录C_参考资源.md)
- [学习总结](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/13-学习总结.md)
