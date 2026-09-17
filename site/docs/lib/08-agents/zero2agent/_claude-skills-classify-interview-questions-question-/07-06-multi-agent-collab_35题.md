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
pageSha256: "4b85013b771a53b43b23b5dd0cb0c4a6f741d7188f317376a278300697e23f3c"
contentMode: "local-full"
zh: ""
---

## 06-multi-agent-collab（35题）

1. 多智能体怎么协作？ — 腾讯终面【[百度正式批：一面结束第二天就约二面了](https://www.nowcoder.com/discuss/925108144831725568)追问：你项目做多智能体协同和xx，这有什么优点和难点吗？】
2. 多 Agent 系统里，怎么防止踢皮球或死循环？ — 腾讯终面【[中兴软开一面](https://www.nowcoder.com/feed/main/detail/0b39815babfb47108464ffabdf929eba)】
3. 多 Agent 之间需要共享状态吗？ — 腾讯终面
4. 怎么判断该做单 Agent 还是多 Agent？ — 30题 【阿里国际一面追问：Claude Code 是 multi 还是 single agent】【PDD/国际业务 Agent 一面追问：代码生成保障与单体/多 Agent 边界】【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】【[阿里千问平台开发复活赛一面](https://www.nowcoder.com/feed/main/detail/141447389dab4e8e9ca6db742a514f39)】
5. 多 Agent 协作中，记忆如何共享？ — 30题 【淘天一面追问：记忆隔离与上下文污染防治】【小红书AI应用开发同题：多Agent上下文管理与共享】
6. 单 Agent 还是多 Agent？子 Agent 的任务？ — 字节一面
7. 按“职能拆分”和“阶段拆分”各有什么优缺点？ — Agent 开发面试 30 题
8. Handoff 的核心难点是什么？ — 30题
9. MCP 和 A2A 分别解决什么层面的问题？ — 30题
10. 什么时候该用 subagent？ — 30题 【bilibili AI研发实习一面追问：主Agent和子Agent共用同一个上下文吗？】【遥望科技追问：主Agent和子Agent的协调机制怎么做】【小红书 Agent 岗一面追问：多 Agent 优势与上下文压力】
11. 任务简单但工具调用多，用 subagent 是否浪费 token？ — 30题
12. 图片信息怎么在 subagent 之间流转？ — 30题
13. Multi Agent 系统中 Router 节点依据什么规则把任务分给子 Agent？ — 淘天二面 【淘天AI应用开发一面追问：LLM路由 vs 规则路由优劣对比】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：复杂任务场景下，中心调度 Agent 如何路由调用不同的 subAgent？】
14. 三层 Agent（Root/Main+Fallback/Sub-Agent）协同策略 + 跨层上下文传递 — 淘天Agent开发【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：多层子 Agent 调用会不会造成中心调度 Agent 上下文爆炸？怎么解决？】
15. Multi-Agent 如何通信？不同项目分别用了哪些通信方法？（含 MCP vs A2A 协议层次对比） — 币安AI大模型实习一面【[中兴软开一面](https://www.nowcoder.com/feed/main/detail/0b39815babfb47108464ffabdf929eba)】
16. 多 Agent 怎么编排的？用的什么编排模式？ — 百度实习一面
17. Multi-Agent 中心化编排模式 vs 点对点架构，核心区别和优势是什么？ — 蚂蚁AI应用开发二面
18. 为什么大家都在用 Multi-Agent？从一开始到现在原因是否有变化？ — 币安AI大模型实习一面
19. 如果让两个不同的 Agent 产品进行对话（比如 Claude Code 和 Cursor），在协议层面应该怎么做？ — 字节TikTok AI应用开发一面
20. 智能体可信通信怎么实现？ — 已有正文（补录索引）
21. 多个 Agent 并发操作数据库或文件，这种并发怎么处理？ — 蚂蚁Agent开发一面（新增）【[拼多多 - AI Agent 开发（工程化 + 数据库方向）](https://www.nowcoder.com/discuss/925527160763187200)追问：多 Agent 运行机制是怎样的？如何防止并发修改同一文件？】【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：多 Agent 并发修改同一文件的冲突防止？】
22. 子 Agent 之间的上下文怎么传递？传什么、不传什么？ — 阿里Agent面经（新增）【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：各层 Agent 之间的上下文如何传递？；如何保证传给子 Agent 的上下文足够完整，不会遗漏关键信息？】
23. 多 Agent 协作常见模式有哪些？各自适合什么任务类型？ — 阿里Agent面经（新增）【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】
24. 主 Agent 与子 Agent 的通信和进度同步怎么做？是推还是拉？ — 广州某小厂Agent后端开发二面（新增）【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：主 Agent 与二级 Agent、子 Agent 之间如何通信？】
25. 校验 Agent 和推理 Agent 结论冲突时怎么处理？ — 商汤大模型算法应用实习二面（新增）【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：语音转录复核 Agent 场景中，规则与模型冲突时如何处理？】
26. 大规模 Multi-Agent 如何做调度、背压和资源隔离？调度器崩溃或 Leader 派错任务时怎么恢复？ — 深信服 Agent 开发一面、钉学科技 FDE 实习一面（新增）
27. 如何按租户、任务和 Agent 层级设置分层并发预算？ — 小红书 AI Agent开发一面【[顺极 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/93a26b84a6634558b7228bf350c709b5)追问：模型配额、CPU/内存、工具与依赖图如何共同决定上限】
28. 多个 Agent 并行跑的时候状态竞争怎么避免？ — 淘天AI Agent一面（新增）
29. 如果拆成感知/推理/校验 Agent，哪些能并行哪些要顺序，什么时候需要反向通信？ — 商汤大模型算法应用实习二面（新增）
30. 在 A2A 场景下，如何防止两个 Agent 陷入递归对话？ — AI应用开发进阶面（新增）
31. 业务模块增删时，如何治理 Multi-Agent 能力拓扑，避免 Agent 增殖和路由配置失控？ — 懂车帝 Agent 开发一面（新增）
32. 如何保证多 Agent 通信结果明确、可验证，而不是自然语言互相猜？ — [国际业务 Agent 一面](https://www.nowcoder.com/feed/main/detail/3c305b0c1565458ba05c9906322f5327)（2026-08-22）
33. 复杂 Agent 为什么拆成 LangGraph 子图而不是单条 Pipeline？子图的状态与 IO 契约如何设计？ — [小红书/百度 Agent 实习一面](https://www.nowcoder.com/feed/main/detail/e319aadc79a9479397a6661a7f5ca088)（2026-08-24）
34. 多 Agent 执行策略如何根据任务动态选择，并在运行中安全切换？ — 字节 AI Agent 二面实习面经（新增）
35. 多人、多 Agent、跨设备协同与“群聊式多 Agent”有什么不同？ — [跨设备多 Agent 项目一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)（新增）
