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
pageSha256: "35f3540aaddf152737f1617885654291278ffbbd1971a9beae75361a597e7736"
contentMode: "local-full"
zh: ""
---

## 02-tool-management（37题）

1. 工具描述写得再好，模型也瞎传参数怎么办？ — 腾讯终面 【蚂蚁AI应用开发二面追问：参数幻觉与语法错误的自动化修正】【科大讯飞一面追问：后端ORM接口作为tools如何防止工具调用偏移】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
2. 工具库有上百个工具，怎么让模型快速选对？ — 腾讯终面 【淘天一面追问：100+工具召回偏差与分层路由】【百度大模型研发二面追问：Agent 如何选择合适工具】【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：现在有100多个工具，AI想调用的时候能找到自己想要的接口吗？怎么保障？；工具检索是如何做的？】
3. 多工具场景下的调度策略？ — 腾讯终面
4. 工具多导致 token 数过多，怎么解决？ — 蚂蚁一面 【阿里国际一面追问：Skill描述过长导致上下文爆炸】【小红书 Agent 岗一面追问：工具延迟加载触发时机与实现】【哔哩哔哩 AI 应用一面追问：大量工具描述导致 Prompt 膨胀】【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：工具数量很多时，如何避免 Prompt 过长？】【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：Agent工具过多时你是怎么处理的？比如接口数量太多怎么解决？】
5. 工具调用成功但返回结果语义不完整，怎么设计中间层？ — 腾讯二面 【淘天二面追问：外部工具数据格式不匹配的自动映射】【淘天AI应用开发一面追问：MCP多工具返回格式不统一的标准化】【OPPO 一面追问：参数错误、失败和超时的统一处理】
6. Mock 是怎么实现的？在自动化生成测试的场景下 — 字节一面
7. 大模型的 Function Call 是什么？Tool Use 一般怎么用？ — 30题 【小红书AI应用开发追问：不做训练怎么让Agent调用工具+调用格式】【字节实习Agent开发一面追问：工具注册/解析/调用/回传全链路】【小红书 Agent 岗一面追问：tool_use 捕获、执行与非标准命令请求】【[BIGO 音频算法工程师一面](https://www.nowcoder.com/discuss/924359576990781440)】【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[启云方AI Agent一面凉经](https://www.nowcoder.com/feed/main/detail/fea2d18bd59a421da7d16fe16223d38c)追问：“语言调用工具”中的“语言”和真正的 tool call / function call 到底是什么关系？】
8. MCP 和 Skills 的本质区别是什么？ — 蚂蚁集团智能体与大模型应用二面 【蚂蚁AI应用开发二面同题：Skill 与 MCP 核心差异】【[钉钉二面](https://www.nowcoder.com/discuss/925181638412091392)追问：MCP 跟 Skill 有什么区别？】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：MCP 与 Skill 的核心区别是什么？迁移的原因是什么？】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：MCP vs Skill 选型场景？】【[pdd agent 一面](https://www.nowcoder.com/feed/main/detail/ee971b755cbd475a91ef62cee38cdac8)追问：MCP是什么，为什么项目没有选用MCP而选择自己封装？Skill与MCP的核心区别是什么？】
9. MCP Server 是怎么构建的？ — 蚂蚁一面【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[钉钉二面](https://www.nowcoder.com/discuss/925181638412091392)追问：自己有去搭建过 MCP Server 吗？】
10. Function Calling 的本质价值是什么？ — 30题 【蚂蚁Agent开发一面追问：有了FC是否可以没有MCP】【视频面经追问：FC/工具调用/普通Prompt调用三者区别】
11. 大厂开源 CLI 工具和 MCP 有什么区别？ — 蚂蚁一面
12. 手撕一个 ReAct 架构的 Agent — 蚂蚁二面
13. 你会如何设计工具 schema？ — 30题
14. 同一个能力是做成大而全工具还是多个小工具？ — 30题
15. MCP 协议的完整调用过程是怎样的？从 Host 到 Server 的每一步 — 高德实习一面 【蚂蚁Agent开发一面同题：MCP通信方式+配置方法】【腾讯AI应用开发一面追问：领域MCP工具（慢SQL诊断）与Agent系统串联】【唯品会大模型算法实习追问：Tool Schema 以 MCP JSON 注册后的内部链路】【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[百度后端一面](https://www.nowcoder.com/discuss/924730985210458112)追问：一次 MCP 调用到底是谁发起、谁执行？；详细讲解一次 MCP 调用背后有哪些步骤。】【[去哪儿AI面试](https://www.nowcoder.com/discuss/924765100441903104)追问：MCP 的客户端和服务端交互的完整流程是怎么样的？中间的具体内容是什么？】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：MCP 用过吗？Agent 和 MCP 的交互方式是怎样的？】
16. 如何在多智能体环境中实现动态发现并注册跨协议工具？ — 淘天一面 【遥望科技追问：工具自动注入的实现方式与意义】
17. LLM 是怎么从用户意图匹配到具体工具参数的？ — 高德实习一面【[启云方AI Agent一面凉经](https://www.nowcoder.com/feed/main/detail/fea2d18bd59a421da7d16fe16223d38c)追问：你提到“通过语言调用工具”，具体是怎么理解的？；以“查询天气工具”为例，用户说一句自然语言后，工具是怎么被触发的？】
18. 为什么将 Agent 工具注册到微服务注册中心（Nacos）而不是用 MCP？工具的自动注入怎么实现？ — 遥望科技Agent开发一面【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：动态工具注册中心是怎么做的？动态注入是怎么去注入的？；工具注册中心的构建过程中有什么难点吗？】
19. Agent 做多轮工具调用和单轮调用相比，会面临哪些额外挑战？ — 阿里国际一面
20. 推理模型为什么可能不支持工具调用？技术原因是什么？ — 已有正文（补录索引）
21. 多工具场景下怎么确定工具调用优先级？ — 已有正文（补录索引）
22. 开源模型的 Function Calling 能力较弱，如何通过微调或 Prompt Engineering 提升？ — Agent开发八股合集（南京大学）
23. 边界不好定义的场景，Skill形式不能很好区分场景披露工具，怎么办？ — 阿里暑期Agent算法二面
24. 工具返回了非常大的数据超出大模型上下文窗口，怎么办？ — 唯品会一面（新增）【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：工具返回数据量过大时，如何进行分块或流式处理？】【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：工具返回数据量过大时，如何处理？】【[8.26百度二面](https://www.nowcoder.com/feed/main/detail/190c6c68414b491d856091e42aef2386)追问：查询日志接口是现有的，怎么保证不会一次拉取过多日志导致上下文爆掉？】
25. 多Skill串行/嵌套时依赖冲突、参数不兼容的容错设计？ — 百度AI Agent前端研发实习生一面
26. MCP + OAuth2.1：为什么要把 OAuth2.1 接到 MCP 里？ — 视频面经汇总（新增）
27. Tool Result 回写模型时，消息契约应该包含哪些字段？ — [Newegg 一面](https://www.nowcoder.com/discuss/920719616005898240)（2026-08-22）【字节火山引擎 Managed Agent 一面追问：Function Call 与 Tool Result 回到上下文】【[字节中国交易与广告 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/b34f6902e8544fe2953696ed52e49dba)】
28. 没有 MCP 之前大模型调用工具走的是什么流程？MCP 本身有什么缺点或者挑战？ — 淘天AI Agent一面（新增）【小得盈满一面追问：上下文膨胀、Secret 隔离与工具投毒】
29. Agent 调用启动较慢的外部工具时，如何设计异步任务和结果回调？ — 途游 Agent二面（新增）【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：异步任务如何处理？】
30. 如何评测 MCP Server / Tool 自身的契约、可用性和效果，并用轨迹 Badcase 持续迭代？ — 阿里控股 Agent Infra 暑期一面【[未知公司 Agent 二面](https://www.nowcoder.com/feed/main/detail/16675d793c0c42e8a6b46d42fb561561)追问：如何判断 CLI/MCP 是否 AI-Friendly】
31. MCP 返回结果支不支持流式？ — 淘天AI Agent一面（新增）
32. Tool-use SFT 的训练目标是什么？基座模型已经具备工具调用能力时，SFT 还需要学习什么？ — 唯品会NLP算法实习一面（新增）
33. 如何不用多智能体方案让 1000 个 Tools 正常工作？ — AI应用开发进阶面（新增）
34. 一个 Agent 如何同时连接多个 MCP Server，并保证用户与会话隔离？ — 百度秋招后端一面（新增）
35. CLI、Skill 与 sub-agent 的职责边界是什么？CLI 直接调用 LLM 和 Skill 拉起 sub-agent 应如何取舍？ — 小得盈满 AI 相关岗位一面（新增）
36. 跨平台工具授权即将过期时，Agent 如何调整调用顺序并安全续权？ — TikTok Agent工程师面试（新增）
37. MCP 工具治理为什么需要审计？应该审计哪些证据？ — 拓竹 AI Agent算法一面（新增）
