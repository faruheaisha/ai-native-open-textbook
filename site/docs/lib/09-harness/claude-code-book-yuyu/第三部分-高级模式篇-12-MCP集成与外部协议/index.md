---
title: "第12章 MCP 集成与外部协议"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/12-MCP集成与外部协议.md"
sourceRel: "第三部分-高级模式篇/12-MCP集成与外部协议.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/第三部分-高级模式篇/12-MCP集成与外部协议.md"
sourceSha256: "070c99af03bbb8bbdc1b2518c08bea341afa76e4cb8d6b163aacc5fa917684d8"
pageSha256: "5adb24f4e85375fa11bedbb5e3231dd95ce662c1bd5897cd9ab67c33eb355353"
contentMode: "local-full"
zh: ""
---

# 第12章 MCP 集成与外部协议

> "协议是系统间沟通的语言，好的协议让集成变成组合而非编码。"
> -- 《分布式系统设计》改编

**学习目标：** 阅读本章后，你将能够：

- 理解 MCP（Model Context Protocol）诞生的技术背景、设计哲学和它所解决的核心问题
- 掌握 8 类连接配置的适用场景、性能特征和选型策略
- 深入分析 7 层配置作用域和三层安全策略的设计逻辑
- 理解 Bridge 系统的双向通信架构、SSE 序列号延续和多会话安全设计
- 掌握 MCP 工具的发现、映射、命名和权限模型的完整链路
- 能够设计企业级 MCP 安全策略，配置白名单/黑名单和 IDE 集成
- 理解 MCP 集成与工具系统（第3章）、钩子系统（第8章）的协作关系

---

## 本篇目录

- [12.1 MCP 架构概览](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/01-12.1_MCP_架构概览.md)
- [12.2 MCP 工具集成](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/02-12.2_MCP_工具集成.md)
- [12.3 MCP 权限与安全](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/03-12.3_MCP_权限与安全.md)
- [12.4 IDE 集成：Bridge 系统](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/04-12.4_IDE_集成_Bridge_系统.md)
- [实战练习](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/05-实战练习.md)
- [关键要点](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/第三部分-高级模式篇/06-关键要点.md)
