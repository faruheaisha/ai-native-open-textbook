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
pageSha256: "912096c91909d64241b8379f5124544adbe0c866745edcc26e9a226e115b6495"
contentMode: "local-full"
zh: ""
---

## 05-eval-and-vision（46题）

1. 如何量化评估一个上线的 Agent 好坏？除了准确率 — 腾讯终面【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：如何量化 Agent 的“智能程度”（除准确率外）？】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：任务完成率统计及避免主观评估？】【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：最终的效果怎么样？准确率达到了多少？怎么测评？】【[8.26百度二面](https://www.nowcoder.com/feed/main/detail/190c6c68414b491d856091e42aef2386)追问：你们怎么评估这个 Agent 的效果，以及后续怎么优化？】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：你们用的 Agent 在实际过程中有没有评价指标？比如准确率、误报率，处理现网配置时有没有这类指标？】【[PDD Agent三面](https://www.nowcoder.com/feed/main/detail/9908477cdd4041fabacbfbf02febb13c)追问：Agent输出效果如何量化评估？】
2. 当前阻碍 Agent 大规模落地的最大挑战？ — 腾讯终面【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：当前 Agent 系统面临的最大工程挑战是什么（上下文、工具、规划）？】
3. Agent 在线上最难监控的指标是什么？ — 腾讯二面
4. 如何对 Agent 记忆系统的效果进行量化评估？ — 后端AI八股
5. AI 工具最大的帮助场景是什么？ — 腾讯一面 【视频面经追问：平时用哪些AI工具+差异对比】【[去哪儿 AI 全栈 AI 面](https://www.nowcoder.com/feed/main/detail/9cf516b3c2404100baeac52564e40709)】
6. 从开发者角度，做 Agent 最难的部分？ — 腾讯一面【[百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)】【[9.4 某小厂 AI Agent hr+技术面](https://www.nowcoder.com/feed/main/detail/10b2fcaf73d2401f8636bd0459e1cd08)追问：在该 Agent 项目开发中，你认为最难的技术点或挑战是什么？是如何迭代解决的？】
7. 有没有遇到过 AI 工具无法解决的场景？ — 腾讯一面【[深信服Agent开发实习生一面二面，长时间被吊着，最终被横向掉了](https://www.nowcoder.com/feed/main/detail/14b2c379ae434062a009aefea9fc5df9)追问：如果出现当前已有工具无法解决的问题时，怎么去解决的？】
8. Agent 框架还有哪些地方可以改进？ — 腾讯一面
9. 怎么给 Agent 建立评测体系？只看成功率为什么不够？ — 30题 【阿里国际二面追问：调优 case + 评测集构建】【顺极/曹操出行一面追问：验证环节、长链路稳定性和 Agent 评测】【[阿里淘天一面](https://www.nowcoder.com/feed/main/detail/a32b3c75644e4994933a38e1dfb16bc1)】【[蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)】【[字节 AI Agent 研发一面](https://www.nowcoder.com/feed/main/detail/2ba7e96d48634777990b28c2cb322f40)】【[中兴软开一面](https://www.nowcoder.com/feed/main/detail/0b39815babfb47108464ffabdf929eba)】【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：如何评测 Agent 的工具调用能力并构建评测集？】【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：有没有做过 Agent 评测相关工作？】【[pdd agent二面](https://www.nowcoder.com/feed/main/detail/f5e7351df8364147ac8da085b99d9d18)追问：Agent评测体系，测试用例覆盖范围？】
10. RAG 系统的回答准确率怎么计算？ — 蚂蚁二面【[字节二面（Trae）](https://www.nowcoder.com/discuss/924821959647440896)追问：准确率怎么计算？】
11. 如何从真实 Issue 构建可复现的缺陷修复 Agent Benchmark，并防止污染和假修复？ — [字节 AI Agent 研发一面](https://www.nowcoder.com/feed/main/detail/2ba7e96d48634777990b28c2cb322f40)（新增）
12. 线上反馈“有时好有时差”，第一步看什么？ — 30题
13. Agent 上线到生产环境，最容易被低估的三个风险点？ — 30题
14. 2026 年做 Agent 应用开发，跟去年相比最大的变化？ — 30题
15. 了解最近 AI 的新方向吗？ — 30题
16. 通过什么方式去验证 Skill 的提升效果，指标是什么？ — 美团食杂后端一面 【电商库存一面追问：Skill 变更影响面回归】【字节火山引擎 Managed Agent 一面追问：脚本与模型评审对比两个 Skill】【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)】【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：Skill 的质量评估指标有哪些？】【[作业帮一面 9.5](https://www.nowcoder.com/feed/main/detail/21ca46108ebf479fb8056c6e9f61d42f)追问：怎么验证 skill 的效果？怎么判断 skill 行不行、要不要改？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：任务执行完成率从不足 50% 提升到 100%，这个指标是怎么评测出来的？】
17. RAG 系统如何评测？评测维度和指标？评测数据集怎么构建？ — 快手一面 【字节AI一面追问：评测集规模/分布/baseline 三件套】【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】【[字节二面（Trae）](https://www.nowcoder.com/discuss/924821959647440896)追问：评测机制怎么做？】【[腾讯/csig/元宝/内容安全/日常实习/三轮技术面试](https://www.nowcoder.com/feed/main/detail/60f381f558a848ceac18c666268dc7da)追问：对于什么场景进行评测？评测目标是什么？评测集怎么构建的？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：评测集是怎么做的？】
18. Agent 端到端成功率和工具误调用率怎么量化？怎么改进？ — 腾讯AI应用开发二面 【快手AI应用开发一面追问：Tool 调用准确率拆分（工具选择/参数填充/无效调用/重复调用/任务成功率）】【科大讯飞一面追问：自动建单结果的评估维度设计】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：工具调用成功率如何进行离线、在线评测？】
19. Ragas 评测框架是什么？Answer Relevance 偏低时，怎么区分是检索问题还是模型问题？ — 蚂蚁AI应用开发二面 【淘天AI应用开发一面追问：Context Precision 过低优化方案】
20. 如何为 Word、PDF、Markdown 等文档生成与编辑能力设计通用自动评测框架？ — [百度 AI 测开一面](https://www.nowcoder.com/feed/main/detail/cd8e446a6ec14edfa53cf4c7b6864c4d)（新增）
21. 怎么理解 Vibe Coding？你有哪些实践经验？ — 蚂蚁AI应用开发二面 【科大讯飞一面追问：各Vibe Coding工具特点与CC/Codex使用感受对比】【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：Vibe Coding 在实际工程中的优缺点是什么？】
22. 如何衡量 Agent 的 Planning 能力 vs Hallucination Rate？ — 淘天一面
23. 设计一个电商客服 Agent 的评测方案——商品咨询、售后处理、投诉安抚三类任务分别评估 — 淘天一面
24. 用户在线反馈怎么收集？不同模型和 Prompt 的 AB 测试怎么设计？ — 快手AI应用开发一面【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：AB 测试评估两种 Prompt 策略？】
25. AI 写代码越来越强，算法工程师的角色会怎么变？ — 字节TikTok AI应用开发一面【[虾皮一面](https://www.nowcoder.com/feed/main/detail/e133c2610bde4adc812bba66c62e1641)】
26. 哪些类型的 Agent 产品在未来 2 年内最可能被淘汰？ — 字节TikTok AI应用开发一面
27. 线上 log 是海量的，怎么转化成有限的线下评测集？随机抽样为什么不行？ — 字节跳动AI Agent评测二面（新增）【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】【[腾讯/csig/元宝/内容安全/日常实习/三轮技术面试](https://www.nowcoder.com/feed/main/detail/60f381f558a848ceac18c666268dc7da)追问：怎么保证构建的评测集覆盖所有场景且可用？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：评测集和 Ground Truth 是如何构造的？】
28. Agent 后续的发展方向？哪些场景更容易落地？ — 视频面经汇总（新增）
29. 面试反问环节：怎么提出有深度的问题？ — 视频面经汇总（新增）
30. Text2SQL 系统的准确性评测与用户反馈回流机制 — 数据智能查询平台面试（新增）
31. RAG 召回链路监控与召回漂移检测 — 数据智能查询平台面试（新增）
32. 能不能不走“线上转线下评测集”，直接对线上 case 做无 GT 的打分和效果观测？ — 字节跳动AI Agent评测二面（新增）
33. Agent 自进化闭环如何设计？怎样判断沉淀出的经验值得进入系统？ — 字节Agent开发实习生一面（新增）【电商库存一面追问：人工审批、C 端灰度与回滚】【字节火山引擎 Managed Agent 一面追问：自动更新 AGENTS.md / Skills 后验证提升】【[阿里控股 Agent Infra 二面](https://www.nowcoder.com/feed/main/detail/627844d5923149b6ac46a631b2b41d5a)】
34. 如何证明 Agent 的最终答案真正使用了工具或检索证据，而不是凭模型常识猜中？ — Momenta Agent开发一面、阿里 Agent开发一面（新增）
35. 独立 Verifier 和 LLM-as-Judge 应该如何分工？ — 阿里千问 C端算法实习一面（新增）【[字节中国交易与广告 AI 全栈二面](https://www.nowcoder.com/feed/main/detail/0f77410f8b1b4daca879d5ff99c7ae07)】
36. 树形意图识别和逐层路由应该如何设计，并构造评测集避免误差级联？ — 快手 AI应用开发一面【[大方云图研发实习一面](https://www.nowcoder.com/feed/main/detail/a9a40feb4e1e4d0ca7c3f8c3ba67d487)追问：双阶段路由的专精与错误阻断】
37. 如何通过两套 Harness 的同任务对照与组件消融定位效果差异？ — [Teamily AI QA/测开面经](https://www.nowcoder.com/feed/main/detail/6a01e27dc1b142d29921eb3cc7bcd20f)（新增）【[深信服 ai agent 一面](https://www.nowcoder.com/feed/main/detail/83326f3bcc5546b2b556373ad29a6d71)追问：如何评估 Harness 效果？】
38. Skill 路由应该如何构造测试集并评估？ — 字节Agent测评一面（新增）
39. Multi-Agent 出现 Badcase 时，如何定位责任 Agent，并判断是否需要 SFT？ — 字节Agent开发二面（新增）
40. Skill 的调用量、Token 成本和效果埋点应该放在哪一层？ — 电商库存二面（新增）
41. 供应商不返回 usage 时，如何核算 Agent 的 Token 和成本？ — 成都晓多科技 Agent开发岗二面（新增）
42. 什么是 AI-native 团队？如何判断团队离 AI-first 还有多远？ — HR系统一面（新增）
43. 如何判断用户反馈真的让 Agent 变好，而不是噪声或选择偏差？ — MiniMax平台研发一面（新增）
44. 评审 Agent 为什么要左移？应该左移到需求、设计还是编码阶段？ — 字节社招一面（新增）
45. 如何为跨任务重复出现的安全或质量问题生成稳定 Fingerprint，并安全接入自动修复 Agent？ — [元石科技后端/Agent 一面](https://www.nowcoder.com/discuss/921742843704549376)（新增）
46. 如何实现基于 VLM 的 Benchmark 系统，并避免评测模型自说自话？ — [深信服 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/83326f3bcc5546b2b556373ad29a6d71)（新增）
