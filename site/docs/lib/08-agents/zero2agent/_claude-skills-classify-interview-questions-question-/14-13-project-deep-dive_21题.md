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
pageSha256: "5f0a337309df8a1ac2bf460770b26ea41d500a6d9ffef49b5c4277a04dc9baed"
contentMode: "local-full"
zh: ""
---

## 13-project-deep-dive（21题）

1. 你的 Agent 项目用了什么框架？为什么选它？ — 淘宝闪购一面 【淘宝闪购一面追问：安全合规下开源 vs 闭源框架选型】【CVTE AI应用工程师一面追问：为什么基于 LangGraph 做】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】【[百度 Agent 二面](https://www.nowcoder.com/feed/main/detail/bca7dc14bd654e91b89792608111b211)】
2. Agent 项目有没有真正上线部署？线上效果怎么样？ — 淘宝闪购一面 【视频面经追问：上线后整体部署方式是怎样的】【[汇川技术-AI全栈开发工程师 技术一面 8/27 应届实习（含转正）](https://www.nowcoder.com/discuss/925156092424749056)追问：日常有没有将项目上线到云服务器？】
3. 意图识别模块具体怎么做的？ — 淘宝闪购一面【[快手 - Agent 开发岗（应用落地 + AI 工具）](https://www.nowcoder.com/discuss/926274020192841728)追问：意图识别模块应采用分类模型还是规则引擎？如何提升准确率？】【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：意图识别是怎么做的，使用的什么模型，介绍意图识别树结构。】
4. 你的 Agent 有哪些工具？工具是怎么设计的？ — 淘宝闪购一面 【视频面经追问：工具怎么注册/管理/调用】【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】
5. 怎么提升工具调用的正确率？ — 淘宝闪购一面【[字节跳动9.3 Agent开发一面面经](https://www.nowcoder.com/discuss/925342611194286080)追问：Agent在执行过程中需要调用工具，这些工具都有固定的入参，需要模型结合上下文提供，如何保障工具调用的可靠性？】【[第三次去哪儿旅行一面，AI面试问的是前端吗？](https://www.nowcoder.com/feed/main/detail/2ed12b3fa1d4491f8bb029f99cf9de73)追问：Agent工具调用失败的常见原因有哪些？如何优化工具调用成功率？】
6. 工具调用时怎么保证参数提取准确？ — 淘宝闪购一面
7. 知识库是怎么构建的？ — 淘宝闪购一面【[8.26百度二面](https://www.nowcoder.com/feed/main/detail/190c6c68414b491d856091e42aef2386)追问：IM 项目中的 AI 助手和知识检索是怎么做的？】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：你们现在知识库具体是怎么做的？】
8. 分块策略是怎么设计的？ — 淘宝闪购一面 【蚂蚁AI应用开发二面追问：overlap 与分片尺寸权衡】【腾讯AI应用开发一面追问：分块方案选型理由与指标量化】
9. 如何解析上传的表格或图片文件来构建知识库？ — 淘宝闪购一面 【蚂蚁AI应用开发二面追问：跨页表格语义完整性】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：文档里面存在表格、图片，如何处理？】
10. 知识检索时如何提升模型回答正确率？ — 淘宝闪购一面
11. 你的系统有没有用到 ReAct 模式？怎么用的？ — 淘宝闪购一面 【美团食杂后端一面同题：如何基于 ReAct 架构开发的】【[互联网金融 Agent 开发三面](https://www.nowcoder.com/feed/main/detail/88c55ee65af04ac98c218b9d17c47a71)】
12. LangGraph 中的 State 怎么定义和流转？节点多了怎么防止状态膨胀？ — 蚂蚁AI应用开发二面 【钉学科技 FDE 实习一面追问：State、Node、Edge 的设计优先级】
13. 你的 Agent 系统还有哪些未充分优化的地方？你的改进路线图是什么？ — 淘宝闪购一面【[viture agent平台开发 一面](https://www.nowcoder.com/feed/main/detail/c4c614b12d564af3b37c30c241072973)追问：AI Agent系统的优化过程如何？】
14. 开发 Agent 过程中遇到的最大问题是什么？如果重新设计某一模块会怎么做？ — CVTE AI应用工程师一面【[阿里云 SOC Agent Infra 一面](https://www.nowcoder.com/feed/main/detail/1bde9ba913d74ca6847962f679865f7e)】
15. 自我介绍 + 简单讲一下自己做过的 Agent 项目 — 视频面经汇总（新增）【[钉钉二面](https://www.nowcoder.com/discuss/925181638412091392)追问：介绍一下你之前做的 Agent。】
16. 怎么提升模型回答的性能？ — 淘宝闪购一面
17. 你的 Agent 和别人开发的相比，核心差异是什么？ — 淘宝闪购一面
18. 新闻交易 Agent 项目管线如何搭建？Agent 响应延迟是多久？ — 币安AI大模型实习一面
19. 项目为什么选择 E2B 沙箱？选型理由和优势是什么？ — CVTE AI应用工程师一面
20. 你做过的不同 AI 项目之间，核心技术差异是什么？ — 已有正文（补录索引）
21. 跨机票、地铁与导航的地图 Agent，如何划定 Agent、数据和工具边界？ — 地图 Agent二面（新增）
