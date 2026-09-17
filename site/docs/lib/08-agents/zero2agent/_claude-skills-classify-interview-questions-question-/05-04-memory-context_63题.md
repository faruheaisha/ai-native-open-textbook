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
pageSha256: "081cb1cfb940a4820ac252044f54919b2218e0322b3746d491b69b3e040ef0ec"
contentMode: "local-full"
zh: ""
---

## 04-memory-context（63题）

1. 上下文窗口不够用，对话太长了怎么办？ — 字节实习二面 【币安AI大模型实习一面追问：智能客服场景下agent压缩机制优劣对比】【阿里国际AI应用开发二面追问：压缩后如何保留否定约束和硬性条件】【快手AI应用开发一面追问：Agent Runtime 中 token budget 分层分配（system/user/memory/evidence/RAG）】【小红书 Agent 岗一面追问：两层压缩与 LLM 保留判定】【高德/字节一面追问：摘要不能简单合并全部历史、如何选择保留信息】【阿里 Agent Infra 一面题库同题：长 Context 不能全部塞给模型】【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】【[虾皮一面](https://www.nowcoder.com/feed/main/detail/e133c2610bde4adc812bba66c62e1641)】【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：1M 也不够怎么办？】
2. 长上下文里，怎么让 Agent 不忘记关键信息？ — 腾讯终面 【淘天一面追问：模型层面遗忘缓解机制】
3. 用户说“按老样子帮我订一下”，模糊需求怎么处理？ — 腾讯终面
4. 多 Agent / 多异步任务下，如何防止上下文污染？ — 字节一面
5. 讲一下 Agent 中的“长短期记忆” — 字节一面 【含追问：记忆更新策略】【淘天一面追问：短期/长期区分存储、更新策略】【蚂蚁AI应用开发二面同题：Agent 长期记忆设计思路】【淘天Agent开发同题：短期对话记忆和长期记忆分别怎么提取和存储】【快手AI应用开发一面追问：用户偏好记忆设计+压缩后 token 预算控制】【阿里国际/哔哩哔哩一面同题：分级存储与自动沉淀】【[字节中国交易与广告 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/b34f6902e8544fe2953696ed52e49dba)】【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：记忆模块如何实现，长期存储和短期存储分别采用什么方案？】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何进行记忆分层（工作记忆/长期记忆），存储方案如何设计？】【[万仞二面CEO](https://www.nowcoder.com/feed/main/detail/641608e014b147c7b8aaa3c2e4387f2c)追问：短期记忆和长期记忆怎么做的？】
6. 什么时候应该追问用户，什么时候自己继续推理？ — 腾讯二面 【淘天一面追问：主动澄清 vs 历史画像推断决策框架】【淘天一面追问：极度模糊表达的工程处理】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：模糊需求（如“找个好吃的”）的多轮澄清机制？】
7. 你怎么理解 Agent 里的“状态”而不是“上下文”？ — 腾讯二面【阿里 Agent Infra 一面题库追问：State、Context、Memory 的区别】【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】
8. 三类上下文的优先级怎么处理？ — 腾讯二面【[字节二面（Trae）](https://www.nowcoder.com/discuss/924821959647440896)追问：上下文管理是怎么做的？】
9. 对于上下文工程有什么经验？有没有做过 to-do list？ — 抖音一面
10. Agent 记忆系统里的「做梦机制」（Dreaming）是什么？和 Reflection 有什么区别？ — 阿里云暑期实习Agent面经
11. 设计亿级用户、千亿级记忆条目的记忆系统 — 后端AI八股
12. 如何处理记忆的“新鲜度”与“重要性”之间的冲突？ — 后端AI八股
13. Agent 记忆存在偏见或事实性错误，如何发现并纠正？ — 后端AI八股
14. 如何沉淀部门级 Agent 记忆，既避免经验随人流失，又控制错误、过期和权限风险？ — [电商 Agent 三面](https://www.nowcoder.com/feed/main/detail/b6b453976c2d4e43a872054d695c2fe2)（新增）【[阿里千问 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/463438ee0d9e403b98e8578a05ba4e3f)】
15. 什么是记忆的 Reflection 机制？ — 后端AI八股
16. 长期记忆选向量数据库还是 KV/关系数据库？ — 后端AI八股
17. 什么是记忆的幻觉问题？和 LLM 幻觉有何区别？ — 后端AI八股
18. 什么是“工具态记忆”（Tool-state Memory）？ — 后端AI八股
19. 记忆的容量规划需要考虑哪些因素？ — 后端AI八股
20. 如何判断当前对话与历史对话是否相关？ — 字节实习二面
21. 一条历史信息该进长期记忆还是只留当前会话？ — 30题【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
22. 记忆摘要、压缩、去重、合并的触发时机？ — 30题 【淘天AI应用开发一面追问：向量记忆库去重方案与语义合并】
23. 长期记忆检索时，怎么避免“语义相关但当前无用”的污染？ — 30题
24. 用户偏好、事实记忆、系统状态三者冲突了，信谁？ — 30题
25. 如何减少无关上下文对模型的干扰？当前上下文有哪些优化思路？ — 快手一面【[百度后端一面](https://www.nowcoder.com/discuss/924730985210458112)追问：处理上下文过长有哪些常见策略？】【[字节跳动9.3 Agent开发一面面经](https://www.nowcoder.com/discuss/925342611194286080)追问：随着提问轮次增加，上下文窗口会越来越大，该如何解决？】【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：如何进行上下文管理，避免上下文过长导致效果下降？】【[第三次去哪儿旅行一面，AI面试问的是前端吗？](https://www.nowcoder.com/feed/main/detail/2ed12b3fa1d4491f8bb029f99cf9de73)追问：Agent记忆模块如何设计？上下文无限膨胀有哪些处理方案？】
26. Code Agent 的上下文工程，和普通对话 Agent 有哪些独特挑战？ — 蚂蚁一面【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：大规模代码场景的上下文维护？】
27. Checkpoint 用什么数据库存？如何优化加载速度？ — AI工程师面试 【CVTE AI应用工程师一面追问：短期记忆为什么用 sqlite checkpointer】【钉学科技 FDE 实习一面追问：字段、一致性与换模型恢复】
28. 摘要总结往往会丢失关键细节，在长文本 Agent 中一般怎么来处理这一块？ — 淘天一面【[字节跳动9.3 Agent开发一面面经](https://www.nowcoder.com/discuss/925342611194286080)追问：压缩或者摘要肯定会丢失信息，如何使信息丢失最小化？】
29. 做上下文工程最关键的工作是什么？ — 蚂蚁二面
30. 在电商或导购场景下，用户的请求往往高度模糊，Agent 怎么来精准理解这种需求？ — 淘天一面
31. 会话记忆具体是怎么实现的？滑动窗口设几轮？摘要压缩怎么触发？ — 高德实习一面【[字节二面（Trae）](https://www.nowcoder.com/discuss/924821959647440896)追问：上下文压缩怎么做？】【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：记忆压缩怎么做？进行到第十一轮时，应该给模型哪些信息？】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：记忆压缩（减少上下文同时保留关键信息）的实现？】【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：这个摘要是怎样使用的？】
32. 有没有了解过最前沿的记忆设计？ — 字节实习一面 【淘宝闪购一面追问：OpenClaw vs Hermes 分层压缩记忆对比】【美团Keeta一面追问：Mem0 原理与自实现记忆的区别】【CVTE AI应用工程师一面追问：OpenClaw 记忆机制借鉴】
33. Claude Code 的记忆架构是什么？上下文真的等于记忆吗？ — 字节实习一面 【小红书数据库智能化一面追问：主流 Agent 与 Claude Code 的上下文管理策略】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：你读过哪些 Claude Code 源码，了解它的上下文管理机制吗？】
34. 什么是上下文缓存（Prompt Caching）？它在 Agent 系统中有什么价值？ — 蚂蚁AI应用开发二面【阿里 Agent Infra 一面题库同题：上下文预计算与 Prefix Cache】【[全栈实习一面，20分钟居然问这么细😂](https://www.nowcoder.com/feed/main/detail/4af1e257116e4e36970c6e0d8bf2f70e)追问：你的项目有没有做前上下文缓存、前缀缓存？】
35. 长周期对话（间隔数周后继续）如何管理历史？冷启动怎么做？ — 淘宝闪购一面【[阿里千问 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/463438ee0d9e403b98e8578a05ba4e3f)】
36. 设计会话记忆系统时需要考虑哪些维度？ — 高德实习一面
37. 用户对话中频繁切换话题，会话记忆该怎么设计？ — 高德实习一面
38. Lost in the Middle 问题是什么？有哪些解决方案？ — 淘宝闪购一面
39. 怎么判断当前用户的提问需不需要去检索长期记忆？ — 淘天Agent开发
40. 怎么实现多轮对话过程中，根据用户反馈自我调整的功能？ — 腾讯AI应用开发实习一面
41. 基于滑动窗口摘要时，合并还是分别保留？各自适合什么场景？ — 快手AI应用开发一面
42. 如果让你设计一个三层记忆机制，整体架构和压缩方法怎么设计？ — 快手AI应用开发一面
43. 你的向量记忆库是如何更新用户画像的？ — 快手AI应用开发算法一面
44. 记忆冲突怎么解决？比如用户前后说了不同的过敏信息 — 美团Agent开发（智能客服方向）二面【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
45. 短期记忆压缩后，过了很长时间又需要当时完整信息怎么办？ — AI初创Agent开发实习【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：当需要替换执行结果时，怎样还原之前的上下文，以便基于更完整的信息作出判断？】【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：会话记忆管理使用了滑动窗口 + 压缩，压缩过程会不会丢失记忆，该如何解决该问题？】
46. 压缩过程中会丢失工具调用历史，导致模型重复调用工具，怎么解决？ — 美团Agent开发（智能客服方向）二面
47. 如何判断是 Prompt 内容影响决策，还是 Prompt 太长导致注意力涣散？ — 淘天AI Agent暑期实习一面
48. 为什么要区分静态长期记忆和动态长期记忆？各自存什么？ — 字节跳动Agent二面（Coding Agent）（新增）
49. 每轮对话都触发长期记忆存储，用户记忆快速积累、存得过多怎么办？ — 字节跳动Agent二面（Coding Agent）（新增）
50. 云端 Coding Agent 的容器迁移或重启时，如何恢复会话上下文、工作区和进行中的任务？ — [腾讯 WXG 微信读书一面](https://www.nowcoder.com/feed/main/detail/3ffc762437274543b6a8f5e2ea6fb535)（2026-08-24）【[小米 - AI Agent 开发（三面综合）](https://www.nowcoder.com/discuss/925163737139429376)追问：如何设计 Agent 的状态持久化？容器重启后如何恢复会话？】【[拼多多 - AI Agent 开发（工程化 + 数据库方向）](https://www.nowcoder.com/discuss/925527160763187200)追问：长流程任务的“断点恢复”能力你是怎么做的？服务重启后如何加载未完成状态？】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计断点续传，使服务重启后能够恢复任务？】【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：如何实现状态持久化，使容器重启后会话恢复？】
51. Agent 做上下文压缩后，如何验证没有破坏当前任务？ — Coding Agent面经（新增）【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计上下文压缩策略，以及如何评估信息丢失？】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：上下文压缩时怎么降低信息丢失的概率？】
52. 跨会话记忆如何从对话中提取？哪些信息值得写入长期记忆？ — 小红书 Agent 岗一面（新增）【[〔社招〕〔面经〕9月初XX科技(中厂) AI全栈工程师（Agent应用）一面 挂](https://www.nowcoder.com/discuss/926232883432296448)追问：从对话 session 里沉淀“真正有价值的知识”，而不是“改字号/美化”这类操作噪声？】【[万仞二面CEO](https://www.nowcoder.com/feed/main/detail/641608e014b147c7b8aaa3c2e4387f2c)追问：怎么让短期记忆变成长期记忆？】
53. 上下文预算不足时，如何按任务依赖压缩，而不是按时间删除旧消息？ — 腾讯互娱全栈开发（AI）二面（新增）【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】【[百度后端一面](https://www.nowcoder.com/discuss/924730985210458112)追问：上下文压缩时会对所有内容一视同仁，还是会侧重不同内容？；具体应该如何压缩上下文？】
54. 前 10 轮都变成了总结，之前的原始上下文就不需要了吗？ — 月之暗面Agent开发岗（新增）【[深圳tuitti视界之外实习一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)追问：恢复时模型看到的只有摘要，还是也会看到之前的完整消息或上下文？】
55. 已进行 10 轮并做了总结，第 11 轮开始时，总结怎么处理？是重算前 11 轮还是叠加？ — 月之暗面Agent开发岗（新增）
56. 当用户对话零碎、跨轮次且意图发生跳跃时，如何结合上下文准确判断当前意图？ — 某小厂FOSHO AI应用开发二面（新增）
57. session 里的临时文件存主服务还是 skill 进程服务，要不要删，什么时候删？ — 阿里淘天Agent开发一面（新增）
58. 大体积工具结果落盘后，为什么还要返回预览？预览内容应该如何选择？ — 小红书 Agent 岗一面（新增）
59. 如何用 Prompt 提取用户风格偏好？风格偏好应包含哪些内容？ — 小红书 Agent 岗一面（新增）
60. 大模型生成会话摘要时，如何避免摘要内容污染用户偏好？新结论推翻旧结论时怎么保留？ — 百度内容营销与广告日常实习一面（新增）
61. 金融 Agent 执行股价提醒等定时任务时，应该携带哪些历史上下文？ — 顺极 Agent开发二面（新增）
62. 按大纲分章节生成长文时，如何维持跨章节连续性与事实一致性？ — 成都 Agent 实习面经（新增）
63. Codebase Memory 应该如何初始化、增量更新和失效？ — [拼多多 Agent 开发岗一面](https://www.nowcoder.com/discuss/926273867092430848)（新增）
