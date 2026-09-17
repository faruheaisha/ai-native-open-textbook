---
title: "Summary"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/SUMMARY.md"
sourceRel: "book-en/src/SUMMARY.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/SUMMARY.md"
sourceSha256: "19c3b0fd1489615aece97f197fb1728296e84877ba5cdbf674a25e83befe840c"
pageSha256: "19c3b0fd1489615aece97f197fb1728296e84877ba5cdbf674a25e83befe840c"
contentMode: "local-full"
zh: ""
---

# Summary

[Preface](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-preface)

---

# Part I: Architecture — How Claude Code Works

- [Chapter 1: The Full Tech Stack of an AI Coding Agent](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch01)
- [Chapter 2: Tool System — 40+ Tools as the Model's Hands](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch02)
- [Chapter 3: Agent Loop — The Full Lifecycle from User Input to Model Response](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch03)
- [Chapter 4: Tool Execution Orchestration — Permissions, Concurrency, Streaming, and Interrupts](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch04)
- [Chapter 4b: Plan Mode — From "Act First, Ask Later" to "Look Before You Leap"](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part1-ch04b)

---

# Part II: Prompt Engineering — System Prompts as the Control Plane

- [Chapter 5: System Prompt Architecture](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch05)
- [Chapter 6: Steering Behavior Through Prompts](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch06)
- [Chapter 6b: API Communication Layer — Retry, Streaming, and Degradation Engineering](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch06b)
- [Chapter 7: Model-Specific Tuning and A/B Testing](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch07)
- [Chapter 8: Tool Prompts as Micro-Harnesses](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part2-ch08)

---

# Part III: Context Management — The 200K Token Arena

- [Chapter 9: Automatic Compaction — When and How Context Gets Compressed](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch09)
- [Chapter 10: File State Preservation After Compaction](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch10)
- [Chapter 11: Micro-Compaction — Precise Context Pruning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch11)
- [Chapter 12: Token Budgeting Strategies](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part3-ch12)

---

# Part IV: Prompt Caching — The Hidden Cost Optimizer

- [Chapter 13: Cache Architecture and Breakpoint Design](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch13)
- [Chapter 14: Cache Break Detection System](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch14)
- [Chapter 15: Cache Optimization Patterns](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part4-ch15)

---

# Part V: Safety and Permissions — Defense in Depth

- [Chapter 16: Permission System](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch16)
- [Chapter 17: YOLO Classifier](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch17)
- [Chapter 17b: Prompt Injection Defense — From Unicode Sanitization to Defense in Depth](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch17b)
- [Chapter 18: Hooks — User-Defined Interception Points](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch18)
- [Chapter 18b: Sandbox System — Multi-Platform Isolation from Seatbelt to Bubblewrap](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch18b)
- [Chapter 19: CLAUDE.md — User Instructions as an Override Layer](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part5-ch19)

---

# Part VI: Advanced Subsystems

- [Chapter 20: Agent Spawning and Orchestration](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20)
- [Chapter 20b: Teams and Multi-Process Collaboration](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20b)
- [Chapter 20c: Ultraplan — Remote Multi-Agent Planning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch20c)
- [Chapter 21: Effort, Fast Mode, and Thinking](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch21)
- [Chapter 22: Skills System — From Built-In to User-Defined](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch22)
- [Chapter 22b: Plugin System — From Packaging to Marketplace Extension Engineering](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch22b)
- [Chapter 23: The Unreleased Feature Pipeline — The Roadmap Behind 89 Feature Flags](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch23)
- [Chapter 24: Cross-Session Memory — From Forgetfulness to Persistent Learning](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part6-ch24)

---

# Part VII: Lessons for AI Agent Builders

- [Chapter 25: Harness Engineering Principles](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch25)
- [Chapter 26: Context Management as a Core Capability](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch26)
- [Chapter 27: Production-Grade AI Coding Patterns](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch27)
- [Chapter 28: Where Claude Code Falls Short](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch28)
- [Chapter 29: Observability Engineering — From logEvent to Production-Grade Telemetry](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch29)
- [Chapter 30: Build Your Own AI Agent — From Claude Code Patterns to Practice](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-part7-ch30)

---

# Appendix

- [Appendix A: Key File Index](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-a-file-)
- [Appendix B: Environment Variable Reference](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-b-env-vars)
- [Appendix C: Glossary](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-c-glossary)
- [Appendix D: Full List of 89 Feature Flags](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-d-feature-flags)
- [Appendix E: Version Evolution Log](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-e-version-evolution)
- [Appendix F: End-to-End Case Traces](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-f-e2e-traces)
- [Appendix G: Authentication & Subscription System](/lib/09-harness/harness-engineering-from-cc-to-ai-coding/book-en-src-appendix-g-auth-subscription)
