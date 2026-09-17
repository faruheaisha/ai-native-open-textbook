---
title: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
landing: true
tier: 1
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# 驾驭工程：从 Claude Code 源码到 AI 编码最佳实践

这是一本围绕 Harness Engineering（驾驭工程）的中文技术书。它以 Claude Code `v2.1.88` 的公开发布包与 source map 还原结果为分析材料，不试图复刻官方产品文档，而是从真实工程实现中提炼 AI 编码 Agent 的架构模式、上下文策略、权限体系和生产实践。

## 课时

- **第一篇：架构 — Claude Code 如何运作**
  - [第1章：AI 编码 Agent 的完整技术栈](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch01.md)
  - [第2章：工具系统 — 40+ 个工具作为模型的双手](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch02.md)
  - [第3章：Agent Loop — 从用户输入到模型响应的完整生命周期](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch03.md)
  - [第4章：工具执行编排 — 权限、并发、流式与中断](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch04.md)
  - [第4b章：计划模式 — 从"先做后看"到"先看后做"](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part1-ch04b.md)
- **第二篇：提示工程 — 系统提示词作为控制面**
  - [第5章：系统提示词架构](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch05.md)
  - [第6章：通过提示词引导行为](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch06.md)
  - [第6b章：API 通信层 — 重试、流式与降级工程](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch06b.md)
  - [第7章：模型特定调优与 A/B 测试](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch07.md)
  - [第8章：工具提示词作为微型驾驭器](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part2-ch08.md)
- **第三篇：上下文管理 — 200K Token 竞技场**
  - [第9章：自动压缩 — 上下文何时以及如何被压缩](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch09.md)
  - [第10章：压缩后的文件状态保留](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch10.md)
  - [第11章：微压缩 — 精准上下文修剪](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch11.md)
  - [第12章：Token 预算策略](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part3-ch12.md)
- **第四篇：提示词缓存 — 隐藏的成本优化器**
  - [第13章：缓存架构与断点设计](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch13.md)
  - [第14章：缓存中断检测系统](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch14.md)
  - [第15章：缓存优化模式](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part4-ch15.md)
- **第五篇：安全与权限 — 纵深防御**
  - [第16章：权限系统](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch16.md)
  - [第17章：YOLO 分类器](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch17.md)
  - [第17b章：提示注入防御 — 从 Unicode 清洗到纵深防御](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch17b.md)
  - [第18章：Hooks — 用户自定义拦截点](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch18.md)
  - [第18b章：沙箱系统 — 从 Seatbelt 到 Bubblewrap 的多平台隔离](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch18b.md)
  - [第19章：CLAUDE.md — 用户指令作为覆盖层](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part5-ch19.md)
- **第六篇：高级子系统**
  - [第20章：Agent 派生与编排](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20.md)
  - [第20b章：Teams 与多进程协作](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20b.md)
  - [第20c章：Ultraplan — 远程多代理规划](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch20c.md)
  - [第21章：Effort、Fast Mode 与 Thinking](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch21.md)
  - [第22章：技能系统 — 从内置到用户自定义](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch22.md)
  - [第22b章：插件系统 — 从打包到市场的扩展工程](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch22b.md)
  - [第23章：未发布功能管线 — 89 个 Feature Flag 背后的路线图](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch23.md)
  - [第24章：跨会话记忆 — 从遗忘到持久学习](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part6-ch24.md)
- **第七篇：AI Agent 构建者的经验教训**
  - [第25章：驾驭工程原则](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch25.md)
  - [第26章：上下文管理作为核心能力](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch26.md)
  - [第27章：生产级 AI 编码模式](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch27.md)
  - [第28章：Claude Code 的不足之处](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch28.md)
  - [第29章：可观测性工程 — 从 logEvent 到生产级遥测](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch29.md)
  - [第30章：构建你自己的 AI Agent — 从 Claude Code 模式到实战](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-part7-ch30.md)
- **附录**
  - [附录 A：关键文件索引](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-a-file-.md)
  - [附录 B：环境变量参考](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-b-env-vars.md)
  - [附录 C：术语表](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-c-glossary.md)
  - [附录 D：89 个 Feature Flag 完整清单](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-d-feature-flags.md)
  - [附录 E：版本演化记录](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-e-version-evolution.md)
  - [附录 F：端到端案例追踪](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-f-e2e-traces.md)
  - [附录 G：认证与订阅系统 — 从 OAuth 到合规边界](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-appendix-g-auth-subscription.md)
- **book-en**
  - **源码**
    - [Preface](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-preface.md)
    - [Summary](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-SUMMARY.md)
    - **appendix**
      - [Appendix A: Key File Index](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-a-file-.md)
      - [Appendix B: Environment Variable Reference](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-b-env-vars.md)
      - [Appendix C: Glossary](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-c-glossary.md)
      - [Appendix D: Full List of 89 Feature Flags](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-d-feature-flags.md)
      - [Appendix E: Version Evolution Log](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-e-version-evolution.md)
      - [Appendix F: End-to-End Case Traces](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-f-e2e-traces.md)
      - [Appendix G: Authentication & Subscription System — From OAuth to Compliance Boundaries](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-g-auth-subscription.md)
    - **part1**
      - [Chapter 1: The Full Tech Stack of an AI Coding Agent](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch01.md)
      - [Chapter 2: Tool System — 40+ Tools as the Model's Hands](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch02.md)
      - [Chapter 3: Agent Loop — The Full Lifecycle from User Input to Model Response](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch03.md)
      - [Chapter 4: Tool Execution Orchestration — Permissions, Concurrency, Streaming, and Interrupts](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch04.md)
      - [Chapter 4b: Plan Mode — From "Act First, Ask Later" to "Look Before You Leap"](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch04b.md)
    - **part2**
      - [Chapter 5: System Prompt Architecture](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch05.md)
      - [Chapter 6: Steering Behavior Through Prompts](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch06.md)
      - [Chapter 6b: API Communication Layer — Retry, Streaming, and Degradation Engineering](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch06b.md)
      - [Chapter 7: Model-Specific Tuning and A/B Testing](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch07.md)
      - [Chapter 8: Tool Prompts as Micro-Harnesses](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch08.md)
    - **part3**
      - [Chapter 9: Auto-Compaction — When and How Context Gets Compressed](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch09.md)
      - [Chapter 10: Post-Compaction File State Preservation](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch10.md)
      - [Chapter 11: Micro-Compaction — Precise Context Pruning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch11.md)
      - [Chapter 12: Token Budgeting Strategies](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch12.md)
    - **part4**
      - [Chapter 13: Cache Architecture and Breakpoint Design](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch13.md)
      - [Chapter 14: Cache Break Detection System](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch14.md)
      - [Chapter 15: Cache Optimization Patterns](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch15.md)
    - **part5**
      - [Chapter 16: Permission System](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch16.md)
      - [Chapter 17: YOLO Classifier](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch17.md)
      - [Chapter 17b: Prompt Injection Defense — From Unicode Sanitization to Defense in Depth](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch17b.md)
      - [Chapter 18: Hooks — User-Defined Interception Points](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch18.md)
      - [Chapter 18b: Sandbox System — Multi-Platform Isolation from Seatbelt to Bubblewrap](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch18b.md)
      - [Chapter 19: CLAUDE.md — User Instructions as an Override Layer](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch19.md)
    - **part6**
      - [Chapter 20: Agent Spawning and Orchestration](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20.md)
      - [Chapter 20b: Teams and Multi-Process Collaboration](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20b.md)
      - [Chapter 20c: Ultraplan -- Remote Multi-Agent Planning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20c.md)
      - [Chapter 21: Effort, Fast Mode, and Thinking](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch21.md)
      - [Chapter 22: Skills System -- From Built-In to User-Defined](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch22.md)
      - [Chapter 22b: Plugin System -- Extension Engineering from Packaging to Marketplace](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch22b.md)
      - [Chapter 23: The Unreleased Feature Pipeline -- The Roadmap Behind 89 Feature Flags](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch23.md)
      - [Supplementary Chapter: Cross-Session Memory -- From Forgetfulness to Persistent Learning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch23b.md)
      - [Chapter 24: Cross-Session Memory -- From Forgetfulness to Persistent Learning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch24.md)
    - **part7**
      - [Chapter 24: Harness Engineering Principles](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch24.md)
      - [Chapter 25: Harness Engineering Principles](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch25.md)
      - [Chapter 26: Context Management as a Core Competency](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch26.md)
      - [Chapter 27: Production-Grade AI Coding Patterns](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch27.md)
      - [Chapter 28: Where Claude Code Falls Short (And What You Can Fix)](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch28.md)
      - [Chapter 29: Observability Engineering — From logEvent to Production-Grade Telemetry](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch29.md)
      - [Chapter 30: Build Your Own AI Agent — From Claude Code Patterns to Practice](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch30.md)
- **book**
  - **源码**
    - [前言](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-preface.md)
    - [目录](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-src-SUMMARY.md)
- **文档**
  - [Claude Code v2.1.88 子系统锚点索引](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-anchor-points.md)
  - [书籍大纲：驾驭工程 — 从 Claude Code 源码到 AI 编码最佳实践](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-book-outline.md)
  - [Claude Code 逆向工程参考指南](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-reverse-engineering-guide.md)
  - **version-diffs**
    - [书籍影响分析: v2.1.88 → v2.1.91](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-version-diffs-v2.1.88-vs-v2.1.91-book-impact.md)
    - [Claude Code 版本差异报告](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-version-diffs-v2.1.88-vs-v2.1.91.md)
    - [Claude Code 版本差异报告](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-version-diffs-v2.1.88-vs-v2.1.92.md)
    - [书籍影响分析: v2.1.88 → v2.1.100](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-version-diffs-v2.1.88-vs-v2.1.100-book-impact.md)
    - [Claude Code 版本差异报告](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/docs-version-diffs-v2.1.88-vs-v2.1.100.md)
- **示例**
  - [Code Review Agent](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/examples-code-review-agent.md)

开始学习 → [Appendix A: Key File Index](book-en-src-appendix-a-file-.md)
