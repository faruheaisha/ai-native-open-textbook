---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/.claude/skills/classify-interview-questions/question-index.md"
sourceRel: ".claude/skills/classify-interview-questions/question-index.md"
rawUrl: "/raw/08-agents/zero2agent/.claude/skills/classify-interview-questions/question-index.md"
sourceSha256: "8c0501b7d449991c01fe556083296af4f2a174f68accc5bd27df904bb334a33d"
pageSha256: "a45602c18a5a652d34b51909a9da9e05f9da86cf03729cd737f636581d606e71"
contentMode: "local-full"
zh: ""
---

## 08-prompt-engineering（30题）

1. 提示词模板是怎么构建的？ — 抖音一面
2. Skills 的原理有没有了解过？ — 蚂蚁一面 【高德实习一面追问：Skill 的本质理解】【蚂蚁Agent开发一面追问：创建 Skill 的方式（除自然语言描述外）】【小红书AI应用开发同题：Skills了解+如何管理】【CVTE AI应用工程师一面追问：怎么理解 Skill？能解决什么问题？怎么写 MCP？】【科大讯飞一面追问：写Skills和写提示词的区别与共同点】
3. Claude Code 的架构有什么比较创新的设计？ — 蚂蚁一面 【高德实习一面追问：从源码角度看设计哲学】
4. 如果让你从零设计一个 Skill 系统，需要实现哪些核心能力？ — 字节实习一面 【蚂蚁AI应用开发二面追问：单一 Skill 模块设计思路】【字节抖音一面追问：手撕 Skill 注册/发现/调用实现】【阿里国际AI应用开发二面追问：多Skill可见时执行顺序保证+Plan模式协调】【阿里国际大模型应用开发一面追问：Skill自我迭代机制+质量评测】【字节火山引擎 Managed Agent 一面追问：开发、测试、运维 Skills 组织】【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】【[阿里巴巴- Agent 开发岗（一面）](https://www.nowcoder.com/discuss/925162488314765312)追问：如何设计一个 Skill 注册中心，支持动态加载、版本管理和权限控制？】
5. 为什么已经有了 MCP，Anthropic 还要做 Skill？Skill 里面有没有工具？ — 字节实习一面【[pdd agent 一面](https://www.nowcoder.com/feed/main/detail/ee971b755cbd475a91ef62cee38cdac8)追问：早期流行MCP，现在大量转向Skill，背后的原因是什么？】
6. 一个好的 Prompt 和一个差的 Prompt 的区别？ — 蚂蚁一面
7. LobeChat 的插件和 Claude Code 的 Skills 有什么本质区别？ — 字节实习二面
8. Skill 的渐进式披露怎么实现？Skill 之间的沙箱隔离和通信机制是什么？ — 快手AI应用开发一面【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[要务科技-面筋](https://www.nowcoder.com/discuss/926539013991796736)追问：Skill的渐进式披露概念了解吗？】【[pdd agent二面](https://www.nowcoder.com/feed/main/detail/f5e7351df8364147ac8da085b99d9d18)追问：Agent怎么实现不同任务的隔离？】
9. Harness Engineering 是什么？它如何演进的？ — CVTE AI应用工程师一面【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：你怎么看 Harness 工程？】【[字节跳动9.3 Agent开发一面面经](https://www.nowcoder.com/discuss/925342611194286080)追问：你如何理解Agent中Harness的概念？】
10. 通常 Prompt 包含哪些结构？ — 淘宝闪购一面 【视频面经同题：一个完整Prompt通常包含哪些部分】
11. 什么是一个好的提示词？如何做好提示词的评估？ — 科大讯飞AI一面【[要务科技-面筋](https://www.nowcoder.com/discuss/926539013991796736)追问：如何设计提示词让AI讲产品卖点？】
12. 在调优 Prompt 时，你有哪些实战经验？如何利用 AI 辅助自己优化 Prompt？ — 字节二面
13. 用户的某个需求，你会沉淀为 Skill 还是长期记忆？判断标准是什么？ — 字节TikTok AI应用开发一面
14. DSPy 是什么？它在 Agent 提示词优化和流程构建上有什么优势？ — Agent开发八股合集（南京大学）【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】
15. 一个 Skill 写得好不好，应该看哪些评价标准？ — 视频面经汇总（新增）【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】
16. Prompt 层面让模型回答更快、更稳定的方法？ — 视频面经汇总（新增）
17. OpenSpec/Spec 驱动开发与普通开发流程有什么区别？如何治理 Spec 过期？ — 浦金科一面、电商库存一面（新增）【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】
18. 如何给 Agent 工具系统设计动态 Skill，而不让版本升级破坏历史任务？ — 关于skill的面试问题（新增）【[〔社招〕〔面经〕9月初XX科技(中厂) AI全栈工程师（Agent应用）一面 挂](https://www.nowcoder.com/discuss/926232883432296448)追问：Skill 里哪些是固定、哪些随观察动态调整？】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：Agent 插件系统热插拔 Skill？】
19. Skill 的 Prompt 配置上线后出错，如何快速止损和修复？ — 百度秋招后端一面 【[拼多多 AI 全栈两轮技术面](https://www.nowcoder.com/discuss/921104232256675840)追问：Prompt 模板的版本、测试和灰度】
20. 团队里的 Skill 数量持续膨胀，如何治理重复能力、路由冲突和上下文占用？ — [电商 Agent 三面](https://www.nowcoder.com/feed/main/detail/b6b453976c2d4e43a872054d695c2fe2)【电商库存二面（2026-08-17）】
21. Skill 分层体系怎么设计？为什么这么分层？ — 字节跳动Agent二面（Coding Agent）（新增）
22. 动态 Prompt 和静态 Prompt 有什么区别？各自在什么场景下用？ — 字节跳动Agent二面（Coding Agent）（新增）
23. 如果让你设计一个代码审查的 Skill，你会如何设计？ — 最有料AI实习生面经（新增）
24. 如果 Agent 挂 100 个 Skill，如何提升召回率、准确度、F1 综合值？ — 关于skill的面试问题（新增）
25. Skill 和 Agent 的关系，为什么不用 Skill 而用子 Agent？ — AI应用开发进阶面（新增）
26. 为什么 Coding Agent 的 Skills 通常放在 System 上下文，而不是用户 Query 中？ — 文心一言实习一面（新增）
27. 如何让 Agent 自动沉淀 Skill，同时保证生成的 Skill 准确、无害且不会无限膨胀？ — 电商库存二面（新增）
28. 为什么一个很短的 Skill 也可能有效？如何验证效果来自哪里？ — [OPPO AI 全栈一面](https://www.nowcoder.com/discuss/920830730643443712)（2026-08-23）
29. 可演进能力为什么应封装为 Skill，而不是不断塞进 Prompt？Skill 的知识进化流水线如何治理？ — 小红书 Agent开发实习一面（新增）
30. Skill 的多后端可插拔加载应该如何设计？ — [阿里边缘 BU 一面](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)（新增）
