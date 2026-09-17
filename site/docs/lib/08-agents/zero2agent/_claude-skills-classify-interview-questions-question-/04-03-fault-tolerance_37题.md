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
pageSha256: "9796e96595096805c6ff9741f6b79a7e5956140a5fc470c8d158f517f3c1ccbe"
contentMode: "local-full"
zh: ""
---

## 03-fault-tolerance（37题）

1. Agent 如何减少幻觉？在工业场景下怎么做？ — 字节一面 【字节实习Agent开发一面追问：任务幻觉（Agent编造未请求的执行步骤）】【字节大模型测开一面追问：Temperature→0时还会有幻觉吗】【影石创新一面追问：如何定位幻觉来自模型、上下文还是工具】【[淘宝闪购 AI 应用研发二面](https://www.nowcoder.com/feed/main/detail/09ec7c36a2774223a93044a02b2c3ec0)】
2. 你怎么设计 Agent 的失败恢复机制？ — 腾讯二面 【淘天AI应用开发一面追问：工具报错时prompt引导自主重试】【[中兴软开一面](https://www.nowcoder.com/feed/main/detail/0b39815babfb47108464ffabdf929eba)】
3. 调支付接口超时了，Agent 怎么处理？ — 腾讯终面【[拼多多 - Agent 开发岗（工程化 + 数据库）](https://www.nowcoder.com/discuss/926273867092430848)追问：外部 API 超时的重试策略及防重试风暴？】
4. Agent 错误删除了数据，系统设计上怎么防范？ — 腾讯终面
5. 如何限制 Agent 的思考深度、工具调用次数，避免无限循环？ — 30题 【淘天一面追问：思维死循环专项检测与打断】【快手AI应用开发一面追问：调用指纹去重+相同参数只允许一次+终止条件设计】【百度大模型研发二面追问：工具失败后重复调用保护】【阿里 Agent Infra 一面题库同题：重复 Tool Call 与停止条件】【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：如何设计任务完成的停止条件？】
6. 幻觉的各种治理手段，优缺点？行为限制在什么阶段做？ — 蚂蚁一面 【视频面经追问：从RAG/Prompt/输出约束三个角度拆解幻觉控制】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
7. Agent 在中间步骤已经偏了，怎么尽早发现？ — 30题
8. Agent 执行 shell 命令怎么保证安全？还有哪些安全问题？ — 蚂蚁一面 【蚂蚁AI应用开发二面追问：文件操作与代码执行权限管理】【小红书 Agent 岗一面追问：拦截时机与规则引擎】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：Agent 生成代码、执行命令的安全沙箱如何设计？】
9. Prompt 注入攻击如何防御？ — 快手一面【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：如何防范 Prompt Injection 绕过系统指令？】
10. 资源紧张怎么处理？用户排队机制怎么实现？ — 蚂蚁一面
11. 工具调用的安全控制是怎么实现的？如何限制敏感接口？ — 快手一面
12. Skill 间需要传递敏感信息时，如何做到内部可用、对用户不可见？ — [百度 Coding Agent 二面](https://www.nowcoder.com/feed/main/detail/b9521e2b51e04afeac0a3a32e13f4da9)（新增）【[pdd agent 一面](https://www.nowcoder.com/feed/main/detail/ee971b755cbd475a91ef62cee38cdac8)追问：使用Skill实现时，如何防止向用户泄漏业务数据和核心脚本？】
13. 为什么在复杂的 Agent 闭环场景中，仅靠 RAG 无法彻底解决幻觉问题？ — 淘天一面 【淘天一面追问：数据/检索/生成三方面系统性降幻觉】【腾讯金融科技一面追问：知识库无内容但模型输出正确时的信任边界】
14. 高风险在线环境中，Agent 的异常管控方案怎么设计？ — 淘宝闪购一面【[中国电信风控 Agent 二面](https://www.nowcoder.com/feed/main/detail/22e18a3d20734429aec41b37744beadc)追问：央国企高安全水位、端侧配置与私钥保护】【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】
15. 支付等高敏感操作场景下，Human-in-the-Loop 流程怎么设计？ — 蚂蚁AI应用开发二面 【淘宝闪购一面同题：人工强制中断 Agent 执行与 HiL 处理】
16. Agent 的 Self-Reflection 机制怎么识别输出中的逻辑错误？（容错角度） — 蚂蚁AI应用开发二面 【字节AI一面追问：Reflection 连续失败 3 次后的降级策略】
17. Agent 系统的安全护栏怎么设计？敏感词拦截的工程方案有哪些？ — 快手AI应用开发算法一面【[腾讯/csig/元宝/内容安全/日常实习/三轮技术面试](https://www.nowcoder.com/feed/main/detail/60f381f558a848ceac18c666268dc7da)追问：我现在需要对云端 Agent 的输出做安全校验，你会怎么设计校验方案？】
18. 金融系统不能让 Agent 真实操作，怎么设计？（影子模式 + 渐进放权） — 京东一面
19. Agent 系统中网络抖动 vs 真实故障，如何区分判断？ — 滴滴AI agent开发日常实习
20. NL2SQL 场景下的 SQL 安全防护怎么做？ — 已有正文（补录索引）
21. 如果上下文爆炸或工具循环调用，怎么解决？ — 慧疗互联网医院Agent开发一面 【字节Agent开发实习生一面同题：三级压缩】【[格物致信（一面过，二面线下拒）](https://www.nowcoder.com/feed/main/detail/f68f0d54184944c391e0d7b6d1bb82c8)追问：Agent上下文窗口膨胀你是怎么解决的？难点是什么？】
22. Agent 系统的 fallback 是怎么做的？ — 字节Agent开发一面【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】
23. 整体的失败重试机制（node、RAG链、tools）分别怎么做？ — 字节Agent开发一面【阿里 Agent Infra 一面题库追问：分层 Timeout 与 Retry】
24. 状态机卡死悬停/死循环的排查与熔断机制？ — 百度AI Agent前端研发实习生一面【阿里 Agent Infra 一面题库追问：Circuit Breaker】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：Agent 死循环的熔断机制如何设计？】【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：如何设计 Agent 死循环的熔断机制？】
25. 工具调用返回结果为空或调用失败，Agent 应该怎么处理？是直接重试还是换策略？ — 最有料AI实习生面经（新增）【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：工具调用失败率较高时，应从描述、重试、降级等哪些维度进行优化？】
26. 页面结构变化导致 Skill 失效时，如何检测、降级与修复？ — [百度 Coding Agent 二面](https://www.nowcoder.com/feed/main/detail/b9521e2b51e04afeac0a3a32e13f4da9)（新增）
27. 在跨境汇款等金融业务场景下，Agent 超时/失败如何应对并保证资金安全？ — 腾讯AI应用开发（新增）
28. Agent 失败通常有哪些原因？如何快速定位责任层？ — 点点互动Agent开发秋招一面（新增）【阿里 Agent Infra 一面题库同题：模型与 Infra 故障归因】【[8.26百度二面](https://www.nowcoder.com/feed/main/detail/190c6c68414b491d856091e42aef2386)追问：根因定位的 Agent 能详细讲一下吗？】
29. 所有模型超时或故障时怎么兜底？什么时候用规则引擎，什么时候转人工，服务恢复后怎么回切？ — 商汤大模型算法应用实习二面 【拼多多 AI Agent 提前批二面追问：API Provider 故障切换、负载均衡、自动恢复与回切】
30. Agent Workflow 如何保证节点原子性，并在部分成功后安全回滚？ — 字节剪映Agent一面（新增）【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：Agent 回滚机制（修改异常时恢复）？】
31. LLM 没有走标准 Tool Call，而是在文本里直接输出命令请求，系统如何识别、执行并拦截风险？ — 小红书 Agent 岗一面（新增）【[启云方AI Agent一面凉经](https://www.nowcoder.com/feed/main/detail/fea2d18bd59a421da7d16fe16223d38c)追问：模型是不是返回一段普通文本，然后从文本里通过正则等方式解析出工具调用？】
32. 如何对自己的 Agent 做系统化红队测试，而不是只测 Prompt Injection？ — 中兴 AI大模型算法岗一面（新增）【阿里 Agent Infra 一面题库追问：Prompt Injection 的 Infra 防线】
33. Coding Agent 看到 .env 文件会怎样？如何设计安全边界？ — Coding Agent面经（新增）
34. 长时间运行的 Coding Agent 等待用户决策时，如何避免任务永久卡住？ — 小红书 Agent 岗一面（新增）
35. 工具失败后，哪些异常处理应由大模型参与，哪些必须由确定性程序控制？ — 影石创新 AI Agent一面（新增）
36. 为什么安全攻击检测不能只依赖大模型？规则、专用模型和 LLM 应该如何分工？ — [字节中国交易与广告 Agent 一面](https://www.nowcoder.com/feed/main/detail/6dede073825e4ab493fcbce7f598a6c8)（2026-08-24）
37. Agent 无法处理任务时，“求助 / 升级”状态机应该如何设计？ — [百度 Agent 研发岗一面](https://www.nowcoder.com/discuss/926273622006665216)（新增）
