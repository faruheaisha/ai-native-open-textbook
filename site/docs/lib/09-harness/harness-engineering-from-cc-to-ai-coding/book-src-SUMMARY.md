---
title: "目录"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md"
zh: ""
---

# 目录

[前言](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-preface)

---

# 第一篇：架构 — Claude Code 如何运作

- [第1章：AI 编码 Agent 的完整技术栈](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch01)
- [第2章：工具系统 — 40+ 个工具作为模型的双手](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch02)
- [第3章：Agent Loop — 从用户输入到模型响应的完整生命周期](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch03)
- [第4章：工具执行编排 — 权限、并发、流式与中断](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch04)
- [第4b章：计划模式 — 从"先做后看"到"先看后做"](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch04b)

---

# 第二篇：提示工程 — 系统提示词作为控制面

- [第5章：系统提示词架构](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch05)
- [第6章：通过提示词引导行为](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch06)
- [第6b章：API 通信层 — 重试、流式与降级工程](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch06b)
- [第7章：模型特定调优与 A/B 测试](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch07)
- [第8章：工具提示词作为微型驾驭器](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch08)

---

# 第三篇：上下文管理 — 200K Token 竞技场

- [第9章：自动压缩 — 上下文何时以及如何被压缩](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch09)
- [第10章：压缩后的文件状态保留](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch10)
- [第11章：微压缩 — 精准上下文修剪](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch11)
- [第12章：Token 预算策略](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch12)

---

# 第四篇：提示词缓存 — 隐藏的成本优化器

- [第13章：缓存架构与断点设计](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch13)
- [第14章：缓存中断检测系统](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch14)
- [第15章：缓存优化模式](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch15)

---

# 第五篇：安全与权限 — 纵深防御

- [第16章：权限系统](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch16)
- [第17章：YOLO 分类器](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch17)
- [第17b章：提示注入防御 — 从 Unicode 清洗到纵深防御](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch17b)
- [第18章：Hooks — 用户自定义拦截点](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch18)
- [第18b章：沙箱系统 — 从 Seatbelt 到 Bubblewrap 的多平台隔离](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch18b)
- [第19章：CLAUDE.md — 用户指令作为覆盖层](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch19)

---

# 第六篇：高级子系统

- [第20章：Agent 派生与编排](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20)
- [第20b章：Teams 与多进程协作](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20b)
- [第20c章：Ultraplan — 远程多代理规划](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20c)
- [第21章：Effort、Fast Mode 与 Thinking](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch21)
- [第22章：技能系统 — 从内置到用户自定义](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch22)
- [第22b章：插件系统 — 从打包到市场的扩展工程](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch22b)
- [第23章：未发布功能管线 — 89 个 Feature Flag 背后的路线图](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch23)
- [第24章：跨会话记忆 — 从遗忘到持久学习](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch24)

---

# 第七篇：AI Agent 构建者的经验教训

- [第25章：驾驭工程原则](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch25)
- [第26章：上下文管理作为核心能力](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch26)
- [第27章：生产级 AI 编码模式](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch27)
- [第28章：Claude Code 的不足之处](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch28)
- [第29章：可观测性工程 — 从 logEvent 到生产级遥测](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch29)
- [第30章：构建你自己的 AI Agent — 从 Claude Code 模式到实战](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch30)

---

# 附录

- [附录 A：关键文件索引](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-a-file-index)
- [附录 B：环境变量参考](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-b-env-vars)
- [附录 C：术语表](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-c-glossary)
- [附录 D：89 个 Feature Flag 完整清单](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-d-feature-flags)
- [附录 E：版本演化记录](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-e-version-evolution)
- [附录 F：端到端案例追踪](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-f-e2e-traces)
- [附录 G：认证与订阅系统 — 从 OAuth 到合规边界](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-g-auth-subscription)
