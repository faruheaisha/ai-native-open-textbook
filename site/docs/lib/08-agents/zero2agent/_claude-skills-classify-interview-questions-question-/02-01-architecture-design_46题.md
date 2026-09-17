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
pageSha256: "51b8def635acaae71f8747be466e48c6fc49032f74d9a3c103ddc06fa0023977"
contentMode: "local-full"
zh: ""
---

## 01-architecture-design（46题）

1. 你用 ReAct 还是 Plan-and-Execute？为什么？ — 腾讯终面 【淘天二面追问：CoT vs ReAct 核心区别】【蚂蚁AI应用开发二面同题：ReAct 核心原理与复杂任务提升逻辑】【字节二面追问：Planner↔Executor 通信协议与重规划模式】【字节二面同题：ReAct vs Plan-and-Execute 理解与优劣对比】【数据智能查询平台面试同题：ReAct vs Plan-Execute 区别与场景】【小红书 Agent 岗一面追问：双模式与多轮状态机实现】【字节火山引擎 Managed Agent 一面追问：Reasoning + Action 循环】【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[去哪儿旅行AI面试+笔试](https://www.nowcoder.com/discuss/926507047238078464)追问：ReAct和Plan-and-Execute两种AI agent运行框架的核心差异？】【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：你这里支持 ReAct 循环，但又由 Planner 将任务拆分成带依赖关系和验收条件的 DAG，这是不是就不是经典 ReAct 了？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：在这个场景中，直接采用 ReAct + Tool 是否也能满足需求？】
2. Tree of Thoughts (ToT) 在线上系统里能用吗？成本不高？ — 腾讯终面
3. 了解过 Agent 的设计范式吗？ — 字节一面 【淘宝闪购一面同题：Agent 有哪些模式】【视频面经同题：Agent常见工作模式（ReAct/Plan-Execute等）】【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：你的方案更接近哪一种 Agent 范式？】
4. Agent 的架构设计？从系统角度来拆分 — 阿里一面【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：Agent 项目的架构如何设计？解决了什么问题？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：为什么把系统设计成三级 Agent 架构？】
5. Agent 在学术上由哪些部分组成？ — 字节一面【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】
6. 如果让你设计一个 Agent 的规划器，怎么避免路径震荡？ — 腾讯二面【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：路径震荡（反复失败）的原因是什么？如何引入失败记忆？】
7. 如果模型不擅长遵守流程，怎么放进强约束工作流？ — 腾讯二面【[阿里国际 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/747f07e71f4448bebdce6ada5de800cd)】
8. 什么时候该做 Agent？和 Workflow 的边界在哪？ — 30题 【科大讯飞一面追问：workflow和ReAct的区别与使用时机】【数据智能查询平台面试同题：整体是Workflow还是Agent自由调用】【小红书 Rednote AI Native 一面追问：大模型与工作流如何权衡、固定流程为何仍用 Agent】【广报 Agent 开发追问：没有长期记忆或不完全自主是否仍算 Agent】【曹操出行实习追问：脚本硬编码与 LangGraph Agent 的选型边界】【阿里 Agent Infra 一面题库同题】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：Agent 是人工触发任务吗？整体工作流程是否固定？】
9. 生产级 Agent 的执行循环包含哪些阶段？ — 30题 【快手AI应用开发一面追问：Agent Runtime 完整管线设计（Auth→Planner→Executor→Verifier→Trace）】【阿里 Agent Infra 一面题库追问：Agent Loop】【[字节中国交易与广告 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/b34f6902e8544fe2953696ed52e49dba)】【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】
10. 设计一个 AI Agent 爬取短视频平台内容 — 字节实习一面
11. 现在的 Agent 架构和之前有什么本质不同？渐进式披露？ — 30题【[上海某量化开发 一面](https://www.nowcoder.com/feed/main/detail/87319d167f494d28a361ffd4a0215e06)追问：老架构有什么问题，新架构如何解决？】
12. 为什么很多团队做到最后是混合架构？ — 30题
13. Agent 系统里，模型和系统代码的职责边界怎么划？ — 30题
14. 如果面试官说“Agent 本质上就是套壳调用工具”，你怎么反驳？ — 30题
15. 什么样的任务适合先全局规划再执行，什么适合边走边决策？ — 30题
16. Skill、MCP、Rule 三者有什么区别？ — 蚂蚁一面 【快手AI应用开发一面追问：Tool/Skill/Agent 三层抽象的本质区别】
17. Agent 的任务规划是怎么做的？规划由模型还是规则？ — 快手一面【[阿里国际 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/747f07e71f4448bebdce6ada5de800cd)】
18. 微服务怎么接入一个 Agent 系统？ — 蚂蚁一面
19. 如何保证规划 Agent plan 的结果正确？ — AI工程师面试
20. SSE 怎么实现 Human-in-the-Loop？ — AI工程师面试
21. LangChain 和 LangGraph 有什么区别？分别适合什么场景？ — 淘宝闪购一面 【遥望科技追问：新版LangChain底层为什么用LangGraph】【曹操出行/阿里 Agent 开发追问：复杂状态图中的选型依据】【[0827-字节大模型应用开发(一面)-秋招](https://www.nowcoder.com/discuss/926086211272196096)追问：对于 LangChain 和 LangGraph 这些框架了解吗，能说说两者的区别吗？】【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：LangGraph 和 LangChain 有什么区别？图状态机适用于哪些场景？】【[第三次去哪儿旅行一面，AI面试问的是前端吗？](https://www.nowcoder.com/feed/main/detail/2ed12b3fa1d4491f8bb029f99cf9de73)追问：LangChain和LangGraph有什么区别？为什么现在项目优先使用LangGraph？】【[pdd agent二面](https://www.nowcoder.com/feed/main/detail/f5e7351df8364147ac8da085b99d9d18)追问：LangChain与LangGraph核心区别？】
22. 模型和 Agent 的区别到底是什么？ — 字节实习一面 【视频面经同题：你怎么理解Agent？它和普通LLM应用最大的区别】【[MiniMax - 大模型算法岗（后训练 / SFT / RL 方向，独角兽）](https://www.nowcoder.com/discuss/925527528259743744)追问：介绍一下大模型和 Agent 的区别和关系？】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：大模型与 Agent 的区别联系？】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：在“AI 原生应用”中，Agent 的角色是什么？】
23. Agent 的 Self-Reflection 机制是什么？它怎么识别输出中的逻辑错误？ — 蚂蚁AI应用开发二面 【小红书 Agent 开发一面追问：Planner、Executor、Critic 的边界及独立 Critic】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
24. 场景题：设计一个日志分析 Agent，怎么设计架构和工具？ — 腾讯AI应用开发实习一面【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】
25. 在“推理-行动”循环中，如何设计来纠正逻辑塌缩或无效工具调用？ — 淘天一面
26. 设计一个智能导购助手 Agent，描述其感知、规划、记忆和执行四大模块在分布式架构下的协同逻辑 — 淘天一面
27. 如果设计一个科研辅助 Agent，整体流程应该怎么设计？ — bilibili AI研发实习一面
28. 如何保障自然语言任务描述能精准转化为稳定、可靠的执行路径？ — 蚂蚁AI应用开发二面
29. 多角色智能客服场景（B/C/D 端），用 RAG 还是 Skill？怎么设计？ — 美团Keeta一面
30. Skill 和 Workflow 的区别是什么？什么场景该用 Skill 而不是 Workflow？ — 快手AI应用开发一面【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】
31. DAG 与含循环图在 Agent 编排中的区别和适用场景 — 猎豹移动Agent全栈开发
32. 基于强化学习的 Agent 与传统基于 Prompt 的 Agent 有何区别？各自的适用场景？ — Agent开发八股合集（南京大学）
33. AI 系统该做单域工具还是跨团队通用平台？怎么选？ — 数据智能查询平台面试（新增）【[英迈软件一面](https://www.nowcoder.com/feed/main/detail/355e6818b7e7418ba6f2c88c6bc50351)】【[阿里国际 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/747f07e71f4448bebdce6ada5de800cd)】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】【[阿里千问平台开发复活赛一面](https://www.nowcoder.com/feed/main/detail/141447389dab4e8e9ca6db742a514f39)】
34. Agent 的 Middleware（中间件）是什么？在执行流中扮演什么角色？ — 字节跳动Agent开发实习生一面
35. Coding Agent 的完整链路是怎么运转的？从用户输入到代码产出的全流程 — 字节跳动Agent二面（Coding Agent）【百度大模型研发二面追问：Claude Code 用户交互全流程】【字节火山引擎 Managed Agent 一面追问：输入到页面展示的数据流】
36. 只有模型 API 和 VS Code，如何从零搭建一套可用的 Agent 应用？ — 百度大模型研发二面（新增）【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：从零开始设计一个 Agent 应用时，整体规划如何制定？】
37. 用拓扑排序（规则式）管理任务依赖 vs 让大模型推理决策执行顺序，各有什么问题？ — 广州某小厂Agent后端开发二面（新增）
38. Agent 如何判断已经收集了足够的信息，最终给出输出结论？ — 字节跳动多模态算法一面【字节火山引擎 Managed Agent 一面追问：Loop 继续与结束条件】【阿里 Agent Infra 一面题库同题：停止条件】【[平安健康保险 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/6c11a75a8bd44628943deff3e42ae15c)追问：Agent 偷懒、过早结束或省略必要步骤】【[未知公司 Agent 二面](https://www.nowcoder.com/feed/main/detail/16675d793c0c42e8a6b46d42fb561561)追问：任务结束与会话终止策略】【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】
39. Agent 的 thinking 阶段怎么决定是调用工具还是直接回复？ — 腾讯AI应用开发实习生一面（新增）【字节火山引擎 Managed Agent 一面同题】
40. 设计一个内部的多源文档问答 AI，架构设计是什么？ — 百度AI智能体开发一面（新增）【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】
41. ReAct 在工程实现中，消息和状态协议应该怎么设计？ — 字节跳动AI Agent秋招一面（新增）【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】
42. Agent 如何持续推进 Goal，并避免行为漂移和目标漂移？ — [腾讯 WXG 微信读书一面](https://www.nowcoder.com/feed/main/detail/3ffc762437274543b6a8f5e2ea6fb535)（2026-08-24）【[虾皮一面](https://www.nowcoder.com/feed/main/detail/e133c2610bde4adc812bba66c62e1641)】
43. Agent 组件拆解为什么适合责任链模式？与状态机、DAG 的边界是什么？ — 北京四维图新面经（新增）【阿里 Agent Infra 一面题库追问：为什么 Agent 本质上是状态机】
44. 设计一个预订机票的 Agent，如何处理澄清、支付确认和失败补偿？ — 百度 Agent算法岗二面（新增）
45. 在 AI/Agent 辅助编码时代，为什么 DDD 和清晰的领域边界反而更重要？ — [地图 Agent 二面](https://www.nowcoder.com/feed/main/detail/0208597586e744c884bdc571dc441fad)（2026-08-24）
46. AI Coding Agent 的 Solo 模式和 Plan 模式应该如何设计？ — [字节 Trae 二面](https://www.nowcoder.com/discuss/924821959647440896)（新增）
