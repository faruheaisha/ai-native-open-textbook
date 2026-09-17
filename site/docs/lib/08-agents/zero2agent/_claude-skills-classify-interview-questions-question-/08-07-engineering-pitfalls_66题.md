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
pageSha256: "8f648a30d40d5d439dea951f1434ef50c079ebee175ae5f0c2428512cefc2e85"
contentMode: "local-full"
zh: ""
---

## 07-engineering-pitfalls（66题）

1. Agent 的成本怎么控制？ — Agent 岗面试高频题【字节实习二面追问：LobeChat 为什么烧 token】【[顺极 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/93a26b84a6634558b7228bf350c709b5)追问：Agent 全量开放后的成本与容量治理】【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：大规模部署下如何控制 Token 成本（缓存、模型选型、结果复用）？】
2. 开发 Agent 时踩过什么坑？ — 高频题【[阿里国际 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/747f07e71f4448bebdce6ada5de800cd)】【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】
3. 为什么很多 Agent Demo 很惊艳，一上线就不稳定？ — 腾讯二面
4. 用过哪些 Code Agent？优缺点？ — 腾讯AI应用开发 【高德实习一面追问：日常 AI Coding 实战工作流】【蚂蚁Agent开发一面追问：企业多系统改需求AI Coding怎么处理】【淘天Agent开发追问：AI辅助编程工作流拆解+提示词策略与人工审核介入点】【视频面经追问：做代码重构时怎么用AI辅助】【字节火山引擎 Managed Agent 一面追问：如何完成项目开发】【[杭州和为机电 AI 应用工程师面试](https://www.nowcoder.com/discuss/923620045412933632)】【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】
5. 平时写的代码有多少是 AI 生成的？ — 腾讯一面 【百度实习一面追问：AI coding 占比的回答策略】【[杭州和为机电 AI 应用工程师面试](https://www.nowcoder.com/discuss/923620045412933632)】【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：AI Coding 的占比大概是多少？】【[9.2百度AI测开2面](https://www.nowcoder.com/feed/main/detail/a4c9480945fa481c98949ffb66cd2e3a)追问：在你们日常的 Coding 工作中，大约有多少比例的代码是通过 AI Coding 或 Vibe Coding 生成的？】
6. 平时用过哪些 AI Agent 工具？ — 腾讯一面【[杭州和为机电 AI 应用工程师面试](https://www.nowcoder.com/discuss/923620045412933632)】
7. 你熟悉的 Agent 框架，架构设计上有什么优势？ — 腾讯一面
8. 自己做 Agent 时，踩过最大的坑？ — 腾讯一面
9. 如何保证 AI 代码生成的质量与掌控性？ — 蚂蚁一面【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：AI Coding 习惯及代码质量保证？】【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：如何确保 AI 生成代码逻辑可靠？；AI 编码工具（Cursor/Codex）如何协作及保证代码质量？】【[要务科技-面筋](https://www.nowcoder.com/discuss/926539013991796736)追问：如何让AI写业务代码？】【[作业帮一面 9.5](https://www.nowcoder.com/feed/main/detail/21ca46108ebf479fb8056c6e9f61d42f)追问：之后怎么保证代码质量？怎么验证？还有别的机制吗？】
10. 如何解决大模型 API 服务的响应延迟？ — 字节实习一面 【视频面经同题：提升模型响应速度的优化方向】【小红书数据库智能化二面追问：产品层面的等待体验优化】【小舒一面追问：异步调用与线程阻塞】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】【[9/4泰隆一面](https://www.nowcoder.com/feed/main/detail/738ff92bcd9049c5afc32d8f63226b79)追问：如何提高大模型响应速度？】
11. 什么是 SDD？它和 Skills 有什么区别？ — 蚂蚁一面【[字节 AI Agent 开发岗一面](https://www.nowcoder.com/discuss/926273296180547584)追问：如何将 Spec-Driven Development 与 Agent 结合？】【[DeepSeek Harness 方向面试](https://www.nowcoder.com/discuss/925527442863714304)追问：Spec-driven development 在 AI 时代如何与 Agent 结合？】
12. AI Coding 产品怎么测试？ — 蚂蚁二面
13. LangGraph 定义的搜索节点做不到并发执行吗？ — AI工程师面试
14. PostgreSQL 的索引结构？Checkpoint 场景如何用索引加速？ — AI工程师面试
15. 用 Claude Code 做长任务，session 跑不完怎么办？ — AI工程师面试
16. 分布式限流算法——令牌桶、漏桶、滑动窗口 — 快手一面
17. 布隆过滤器的原理？误判率如何控制？ — 快手一面
18. 数据库索引失效的常见场景？LIKE 查询？ — 快手一面
19. 大规模数据处理场景设计——千条到百万级 — 快手一面
20. AI 应用中 SSE 流式数据怎么处理？数据格式是什么？ — 百度实习一面【[字节agent一面](https://www.nowcoder.com/feed/main/detail/612a1c20eea744a288b142f5b43f57e1)追问：SSE 在项目里用来做什么？推送的数据格式是什么样？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：有流式输出吗？具体的流式响应是怎么处理的？】
21. 针对包含 3 个以上工具调用且高频请求的任务，如何压低端到端延迟？ — 淘天一面【[字节跳动9.3 Agent开发一面面经](https://www.nowcoder.com/discuss/925342611194286080)追问：如何解决上述长程任务运行延迟问题？】
22. 开发 Agent 的时候，你用的是什么开发流程？ — 字节实习一面【[阿里云 SOC Agent Infra 一面](https://www.nowcoder.com/feed/main/detail/1bde9ba913d74ca6847962f679865f7e)】
23. 任务执行远大于单次 Token 限制时，如何设计断点继续生成？ — 淘天一面
24. AI 应用的前端资源缓存怎么配的？ — 百度实习一面
25. AI Coding 检查错误的时间比自己写还长，怎么提效？ — 字节实习二面【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：日常 coding 或改策略往往是不确定的事情，怎么让 Agent 提效？】
26. 数据量和 QPS 增大后，Agent 架构怎么改进？硬件和 GPU 怎么选？ — 阿里国际二面
27. 使用 LangGraph 开发 Agent，遇到最大的困难是什么？ — bilibili AI研发实习一面
28. Agent 系统的缓存选型——本地缓存 vs Redis — 字节实习二面
29. 模型离线 AUC 很高但上线后效果暴跌，怎么排查？ — 淘宝闪购一面
30. 高并发场景同时调 10 个 Embedding 接口，asyncio.gather vs 多线程的资源优势？ — 淘天AI应用开发一面
31. Agent 异步任务管线中引入消息中间件（Kafka），会不会反而变慢或成为瓶颈？扫表 vs 消息驱动选型 — 淘天Agent开发
32. 用 AI Coding 工具写代码达不到预期怎么办？ — CVTE AI应用工程师一面
33. LangGraph 的 State Snapshot（状态快照）机制是怎么实现的？ — 快手AI应用开发算法一面
34. Agent 系统可观测性设计——怎样的结构才能更好地追踪整个 Trace？ — 美团Agent开发（智能客服方向）二面 【懂车帝 Agent 开发一面追问：Trace、日志、指标和配置版本联合归因】【阿里 Agent Infra 一面题库同题：Agent Trace 字段与成功率突降排查】【[阿里千问 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/463438ee0d9e403b98e8578a05ba4e3f)】【[百度 Agent 二面](https://www.nowcoder.com/feed/main/detail/bca7dc14bd654e91b89792608111b211)】【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：如何设计 Agent 全链路追踪（Trace）和可观测性（Metrics）？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：用户的一次请求在最终的 Trace 展示上是什么形式？Trace 具体怎么用，会做分析吗？】【[格物致信（一面过，二面线下拒）](https://www.nowcoder.com/feed/main/detail/f68f0d54184944c391e0d7b6d1bb82c8)追问：Agent很容易变成黑盒，任务失败你如何做可观测性？】
35. SSE 流式输出中断后如何保证之前的输出不丢失？ — 某教育agent开发 【视频面经追问：用户中途关浏览器后内容保留与恢复】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计 SSE 流式输出网关，处理断线重连和消息重放？】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：如何设计 SSE 流式网关，处理断线重连和消息重放？】
36. Agent 如何做版本管理与灰度？ — Agent面经八股系列【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】
37. 怎么设计一个大模型网关系统？ — 猎豹移动Agent全栈开发【[阿里淘天一面](https://www.nowcoder.com/feed/main/detail/a32b3c75644e4994933a38e1dfb16bc1)】
38. 产品的用户量、每日 token 消耗和底层模型选型怎么估算？ — 快手AI应用开发一面
39. Claude Code 用久了感觉响应越来越慢，这是什么原因？怎么解决？ — 字节TikTok AI应用开发一面
40. 如何设计 Agent 的流式输出以提升用户体验，特别是包含工具调用和多次大模型交互时？ — Agent开发八股合集（南京大学）【[阿里千问 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/463438ee0d9e403b98e8578a05ba4e3f)】
41. 高并发场景下，如何设计 Agent 服务的弹性伸缩策略？ — 已有正文（补录索引）
42. 流式返回时，如何插入非文本事件（工具调用标记、思考过程、错误提示），且不影响前端渲染？ — 牛客Agent面经汇总
43. SSE 和 WebSocket、单次调用的区别是什么？Agent 场景该怎么选？ — 成都agent面试（社招）【阿里 Agent Infra 一面题库同题】【[阿里淘天一面](https://www.nowcoder.com/feed/main/detail/a32b3c75644e4994933a38e1dfb16bc1)】
44. AgentState 的作用是什么？为什么不使用全局变量？ — 字节Agent开发一面
45. 系统里多租户隔离是怎么实现的？ — 视频面经汇总（新增）【阿里 Agent Infra 一面题库同题：数据、资源与权限隔离】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计多租户隔离，包括状态和知识库隔离？】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：如何实现多租户状态与知识库隔离？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：不同用户之间是怎么隔离的？】
46. 从原始诉求到可执行 PRD/Spec，如何清洗需求、判断完备性并设置质量门禁？ — 电商库存一面、小得盈满一面（新增）【[字节中国交易与广告 AI 全栈二面](https://www.nowcoder.com/feed/main/detail/0f77410f8b1b4daca879d5ff99c7ae07)】【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】
47. 多模型如何动态路由？根据视频特征、任务特征、成本、延迟和效果选模型？ — 商汤大模型算法应用实习二面（新增）【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：模型路由的依据是什么？】【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：从大模型切到小模型主要是为了响应时长吗，实际效果对比大模型怎么样？】
48. 了解 Kubernetes 吗？在 Agent 项目里有没有实际用到？ — 视频面经汇总（新增）【[百度 Agent 二面](https://www.nowcoder.com/feed/main/detail/bca7dc14bd654e91b89792608111b211)】
49. LangGraph 图状态机里，怎么捕获每个节点的执行结果并实时推前端？ — 淘天AI Agent一面（新增）【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：能否完整描述这个图、图上的状态，以及每个节点的执行过程？】
50. 如何记录 Agent 的非确定性边界，实现可重复的故障回放？ — 腾讯互娱全栈开发（AI）二面（新增）【字节火山引擎 Managed Agent 一面追问：耗时、Token、结果和失败路线】
51. 进程、线程、协程有什么区别？什么场景下协程更有优势？ — 视频面经汇总（新增）
52. 子 Agent 和工具调用的 Token 用量统计缺失，怎么做容错补偿？ — 深信服AI全栈开发二面（新增）
53. 多个子 Agent 延迟退出，同时更新同一对话的 Token 统计数据，线程竞争怎么解决？ — 深信服AI全栈开发二面（新增）
54. Agent 框架如何实现流式并行？了解 Claude Code 的流式并行是怎么做的吗？ — 广州某小厂Agent后端开发二面（新增）
55. Redis 在 Agent 系统中适合承担哪些职责，哪些数据不应只放 Redis？ — 点点互动Agent开发秋招一面（新增）
56. 什么是死锁？死锁产生的条件、检测和解决方法是什么？ — 小红书 Agent 岗一面（新增）
57. 编译器从源代码到可执行程序经历哪些阶段？ — 小红书 Agent 岗一面（新增）
58. 在浏览器输入一个 URL 到页面显示，完整经历了哪些过程？ — 小红书 Agent 岗一面（新增）
59. 云端 Agent 的沙盒应该常驻还是按任务创建？如何优化启动和通信开销？ — 顺极 Agent开发二面（新增）
60. 如何设计同时兼顾吞吐、首 Token 延迟和租户公平性的推理调度器？ — 智象未来 AI Infra一面（新增）
61. Agent 的中间与最终交付物应该如何版本化、校验和交接？ — 福田 FDE线下面试（新增）
62. 多模型供应商如何抽象统一 Provider，而不丢失差异能力？ — 成都晓多科技 Agent开发岗二面（新增）
63. 如何可靠采集 Coding Agent 轨迹，避免崩溃或异步退出时丢数据？ — MiniMax平台研发一面（新增）
64. 自动回滚阈值如何设置，避免固定阈值误杀或放过回归？ — [深信服 Agent 三面](https://www.nowcoder.com/feed/main/detail/b64e8fddbfc642ec9aa33bcdb9aab9aa)（2026-08-23）
65. 如何设计类似 LangFlow 的 Agent 工作流可视化编排画布？ — 商汤 AI Agent 开发面经（新增）
66. 接入多个外部 Agent 时，如何用 Adapter 统一异构事件、工具调用和生命周期协议？ — 北京 B 端 AI 小厂面经（新增）
