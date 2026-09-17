---
title: "Harness Engineering：Claude Code 设计指南"
sourceId: "09-harness/harness-books"
sourceTitle: "Harness Books"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/wquguru/harness-books"
entryUrl: "https://github.com/wquguru/harness-books/blob/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/book1-claude-code/README.md"
sourceRel: "book1-claude-code/README.md"
rawUrl: "/raw/09-harness/harness-books/book1-claude-code/README.md"
sourceSha256: "fb1311091aac2764039a1ea2f09b0c9bb3befc7e150e1c720c0525353d931f17"
pageSha256: "fb1311091aac2764039a1ea2f09b0c9bb3befc7e150e1c720c0525353d931f17"
contentMode: "local-full"
zh: ""
---

# Harness Engineering：Claude Code 设计指南

![封面：Harness Engineering：Claude Code 设计指南](https://gh-proxy.com/https://raw.githubusercontent.com/wquguru/harness-books/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/book1-claude-code/assets/cover-wxb.svg)

副标题：从源码抽象出可控 AI 编程系统的工程原则

> 这本书关心的不是“模型会不会写代码”，而是“一个会写代码的模型被放进终端、仓库和团队流程以后，怎样才不会把系统带偏”。

这不是源码注释汇编，也不是产品功能介绍。它关注的是 Claude Code 如何把不稳定模型收束进可持续运行的工程秩序，让控制面、主循环、工具权限、上下文治理、恢复路径、多代理验证与团队制度组织成一套完整骨架。

本书有三个阅读前提：

- 重点不在模型能力，而在 harness 如何组织约束与执行
- 重点不在函数逐条解释，而在运行时结构为什么必须呈现为这种形态
- 重点不在个人技巧，而在这些结构怎样变成团队可以复用的制度

建议阅读顺序：

1. [序言 Harness、终端与工程约束](/lib/09-harness/harness-books/book1-claude-code-preface)
2. [第 1 章 为什么需要 Harness Engineering](/lib/09-harness/harness-books/book1-claude-code-chapter-01-why-harness-engineering)
3. [第 2 章 Prompt 不是人格，Prompt 是控制平面](/lib/09-harness/harness-books/book1-claude-code-chapter-02-prompt-is-control-plane)
4. [第 3 章 Query Loop：代理系统的心跳](/lib/09-harness/harness-books/book1-claude-code-chapter-03-query-loop-heartbeat)
5. [第 4 章 工具、权限与中断：为什么代理不能直接碰世界](/lib/09-harness/harness-books/book1-claude-code-chapter-04-tools-permissions-interrupts)
6. [第 5 章 上下文治理：Memory、CLAUDE.md 与 Compact 是预算制度](/lib/09-harness/harness-books/book1-claude-code-chapter-05-context-memory-compact)
7. [第 6 章 错误与恢复：出错后仍能继续工作的代理系统](/lib/09-harness/harness-books/book1-claude-code-chapter-06-errors-and-recovery)
8. [第 7 章 多代理与验证：用分工和验证管理不稳定性](/lib/09-harness/harness-books/book1-claude-code-chapter-07-multi-agent-and-verification)
9. [第 8 章 团队落地：把一个聪明工具变成可复用制度](/lib/09-harness/harness-books/book1-claude-code-chapter-08-team-landing-practices)
10. [第 9 章 Harness Engineering 十条原则](/lib/09-harness/harness-books/book1-claude-code-chapter-09-ten-principles)
11. [附录 A 检查清单：把原则落成能执行的约束](/lib/09-harness/harness-books/book1-claude-code-appendix-a-checklists)
12. [附录 B 图示：把运行时骨架画出来](/lib/09-harness/harness-books/book1-claude-code-appendix-b-diagram-notes)
13. [附录 C 源码地图：本书各章主要依据哪些文件](/lib/09-harness/harness-books/book1-claude-code-appendix-c-source-map)

如果只想先看总判断，可以直接跳到[第 9 章](/lib/09-harness/harness-books/book1-claude-code-chapter-09-ten-principles)。
