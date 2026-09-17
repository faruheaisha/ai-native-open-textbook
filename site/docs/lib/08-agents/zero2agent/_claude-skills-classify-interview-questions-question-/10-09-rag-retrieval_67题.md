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
pageSha256: "34351a89326fefbaf2858fa34db4b08e94d2f83291a27dbf01bdf9a8ea8381de"
contentMode: "local-full"
zh: ""
---

## 09-rag-retrieval（67题）

1. 多维度的查询改写是什么？ — 抖音基础架构 Agent 一面【淘天一面追问：改写为何提升精准度的底层原理】【[美团 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/58159306df52463ab75d72daa80d66df)追问：短 Query 与长 Chunk 的非对称召回】【[阿里巴巴（淘天）- 大模型算法岗（搜推方向）](https://www.nowcoder.com/discuss/926272464059891712)追问：淘宝搜索中如何用大模型做 Query 理解和改写？】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：RAG 召回不相关时 Query Rewrite 优化举例？】
2. RAG 的检索如何实现？ — 阿里一面【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】
3. 并行化意图识别是什么？ — 抖音一面
4. 讲一下项目里召回的流程 — 抖音一面
5. RAG 召回了矛盾文档，Agent 怎么处理？ — 腾讯二面
6. Embedding 和 ReRank 模型具体怎么微调？ — 腾讯AI应用开发 【腾讯AI应用开发一面追问：重排序完整实现流程】【爱奇艺大模型算法追问：Embedding模型与Reranker训练Loss区别】
7. RAG 检索到文档很多但回答质量差，怎么排查？ — 携程实习一面 【Shopee/Momenta Agent 一面同题：高召回但最终答案准确率低】
8. RAG 为什么需要向量检索？和关键词检索的本质区别？ — 蚂蚁一面【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：关键词 / 倒排这种方式有明显局限，比如“苹果”和“apple”可能匹配不上，你们怎么看？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：BM25 和向量检索分别解决什么类型的问题？】
9. 什么是余弦相似度？在 RAG 中做什么？ — 携程实习一面【[9.4 某小厂 AI Agent hr+技术面](https://www.nowcoder.com/feed/main/detail/10b2fcaf73d2401f8636bd0459e1cd08)追问：在向量检索召回阶段，度量 Query 与文档向量相似度的常用算法是什么？】
10. 什么是嵌入（Embedding）？为什么需要向量化？ — 携程实习一面 【小红书AI应用开发追问：Embedding本质+每个维度含义+Sparse Embedding】
11. 双路召回的 TopK，K 是如何确定的？ — 腾讯AI应用开发
12. 如何向非技术人员解释 RAG？ — 携程实习一面
13. 如何快速上手一个没接触过的技术？ — 携程实习一面
14. RAG 中如何提高文档召回率？ — 蚂蚁一面
15. 全量生产文档做关联性检索，有没有更高效的方案？ — 蚂蚁二面
16. 渐进式披露架构下还需要 RAG 吗？ — 蚂蚁二面
17. RAG 在 Agent 体系里是工具、记忆还是推理前置步骤？ — 30题
18. 检索结果质量参差不齐，控制点放在哪？ — 30题
19. 什么时候一次检索多次使用，什么时候边执行边检索？ — 30题
20. RAG 返回过时信息，怎么降低 Agent 被误导的概率？ — 30题
21. 为什么引入BM25？和向量检索怎样组合？ — 快手一面 【高德实习一面追问：更广义的多路检索策略】【淘天一面追问：RRF K参数调优 + 长尾查询优化】【淘天AI应用开发一面追问：基于Milvus的BM25与向量分数归一化】【字节二面同题：多路检索 + 向量/关键词各解决什么】【淘天Agent开发同题：为什么加BM25+具体解决了什么bad case】【视频面经同题：讲一下你的召回和重排策略】【钉学科技 FDE 实习一面追问：双路短板、融合与分类 bad case 验证】【[9.4 某小厂 AI Agent hr+技术面](https://www.nowcoder.com/feed/main/detail/10b2fcaf73d2401f8636bd0459e1cd08)追问：在混合检索中，除了向量语义检索，常结合的基于关键词词频与文档相关性的检索算法是什么？】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：BM25 检索结果和向量检索结果，两套数据如何做结果融合？】
22. 如何系统性提升 RAG 的检索相关度与生成效果？ — 快手一面 【淘天一面追问：实际召回不准的排查改进方法论】【视频面经同题：做知识检索时怎么提高模型最终回答准确率】【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：底层检索做了哪些提升？】
23. Rerank 后返回几个块？TopK 截断策略？ — 快手一面 【字节二面追问：Re-rank 的作用 + 为什么有了向量相似度还需要它】【淘天Agent开发追问：低分阈值提前过滤策略】
24. RAG 中为什么引入父子索引？ — 快手一面
25. RAG 系统的端到端性能如何优化？ — 快手一面
26. 分块策略怎么设计？不同策略的优缺点？ — 高德 AI 应用开发实习一面【腾讯AI应用开发二面追问：chunk 边界修正 + 表格跨块修复】【字节AI一面追问：领域文档语义感知切片】【Shopee 一面追问：为什么不能只按固定 Token 数切分】【[字节数据平台 Agent 一面](https://www.nowcoder.com/feed/main/detail/f5f840632a19417b91b8987762427a6a)追问：跨物理页 Chunk 与页码引用】【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：文档分块具体采用什么分块策略？；除递归字符切分外，还有哪些文档分块方案？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：Chunk 太大或太小有什么影响？Chunk 大小怎么确定？】
27. GraphRAG 在处理 Agent 复杂关联查询时的优势在哪里？ — 淘天一面 【蚂蚁AI应用开发二面同题：GraphRAG 理解与应用】【蚂蚁AI应用开发二面追问：Self-Reflection/CoT 噪声过滤】【腾讯AI应用开发二面追问：三元组抽取幻觉控制 + Community Summary 设计】【字节二面追问：多跳推理/复杂逻辑查询场景下RAG架构优化】【币安AI大模型实习一面追问：叶子节点在智能客服中如何触发】
28. 知识库整体怎么设计？从文档接入到检索的完整架构 — 高德 AI 应用开发实习一面【字节二面同题：RAG 完整流程从文档切块到生成】【阿里 Agent Infra 一面题库同题】【[百度 Agent 二面](https://www.nowcoder.com/feed/main/detail/bca7dc14bd654e91b89792608111b211)】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：聊聊你们知识库是怎么设计的？怎么检索的？】【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：讲下项目里 RAG 的整体实现流程。】
29. RAG 召回数据层应如何设计文档、Chunk、Embedding、版本和权限 Schema？ — [Newegg AI 软件工程实习一面](https://www.nowcoder.com/discuss/920719616005898240)（新增）【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：如果文档都做倒排或索引，怎么同时解决切分和权限问题？】
30. 向量数据库怎么选型？不同规模下该用什么方案？ — 阿里国际二面 【淘天Agent开发追问：为什么选pgvector】【[中兴软开一面](https://www.nowcoder.com/feed/main/detail/0b39815babfb47108464ffabdf929eba)】【[钉钉一面](https://www.nowcoder.com/discuss/923765750446202880)】
31. Embedding 模型怎么选？选型时考虑哪些因素？ — 高德实习一面
32. 为什么 Claude Code 不用 RAG 检索代码，而是直接用 grep？ — 字节实习一面
33. Coding Agent 应从代码反向理解领域知识，还是维护独立知识库/规则库？ — [国际业务 Agent 二面](https://www.nowcoder.com/feed/main/detail/b163baeb304e432d9b4c9c218ed467fa)（新增）
34. 升级 Embedding 模型后，怎么保证索引和检索向量的逻辑一致性？ — 阿里国际二面
35. 图检索、向量检索、混合检索有什么区别？怎么选？ — 腾讯AI应用开发二面【[字节 AI 应用开发二面](https://www.nowcoder.com/feed/main/detail/7e8a821479a649fd914e449d312eeb95)】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：为什么选择混合召回？】【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：RAG 是多路检索吗，单路检索能不能做、能不能解决业务问题？】
36. RAG 架构与模型微调（Fine-tuning）相比，各自的适用场景和优缺点是什么？ — 字节二面 【淘天转正实习一面追问：预训练语料已包含相关知识为什么还要RAG】【[字节二面（Trae）](https://www.nowcoder.com/discuss/924821959647440896)追问：RAG 主要用来做什么？】
37. 如何处理 RAG 过程中的权限隔离和时效性问题？ — 字节二面【[阿里千问 AI 应用研发一面](https://www.nowcoder.com/feed/main/detail/da6d74a34ceb4e52b9b4fbcac25cfb3b)追问：文档/Chunk ACL、缓存与引用泄露】【[拼多多 复活赛 一面](https://www.nowcoder.com/feed/main/detail/2109cf8eb0254507911fbf86bcbf51e4)追问：你们把内部文档给 Agent 用，有没有考虑过泄露问题？】
38. 向量数据库索引中 IVF_FLAT 和 HNSW 的区别？各自适合什么场景？ — 快手AI应用开发算法一面【[阿里巴巴（淘天）- 大模型算法岗（搜推方向）](https://www.nowcoder.com/discuss/926272464059891712)追问：向量检索中 IVF 与 HNSW 的选型依据是什么？】【[全栈实习一面，20分钟居然问这么细😂](https://www.nowcoder.com/feed/main/detail/4af1e257116e4e36970c6e0d8bf2f70e)追问：你的 RAG 向量数据库用的索引是什么？】
39. Deep Research 在代码层面是怎么实现的？和普通 RAG 有什么区别？ — bilibili AI研发实习一面【字节火山引擎 Managed Agent 一面追问：Auto Research】
40. RAG 知识库的噪声剔除和文档去重怎么做？ — 腾讯AI应用开发二面 【淘天Agent开发追问：防止AI批量生成虚假数据投毒】
41. PDF 解析用什么工具？Layout-aware Parsing 是怎么做的？ — 腾讯AI应用开发二面
42. 多模态 Embedding 检索中，文本与图片权重怎么平衡？图纸参数召回不准的根因？ — 淘天AI应用开发一面
43. 向量数据库的标量条件过滤怎么做？Pre-filter vs Post-filter 的区别？ — 淘天AI应用开发一面
44. Agentic RAG 是什么？和传统 RAG 的核心区别？ — 美团Keeta一面
45. 补充检索是如何评估数据质量并触发的？怎么保证二次检索能搜到之前没搜到的内容？ — 淘天Agent开发
46. RAG 检索到的 Chunk 不足以回答问题，后续怎么处理？ — 字节大模型测开一面
47. 向量数据库里两个同义词是什么关系？完全同义的词会在同一个点上吗？ — 字节大模型测开一面
48. RAG 过程中如何处理文件里的图片？ — 字节暑期agent实习二面【[PDD Agent三面](https://www.nowcoder.com/feed/main/detail/9908477cdd4041fabacbfbf02febb13c)追问：RAG如果存在图片类非文本内容，如何处理？】
49. 如何避免模型回复过度依赖检索到的外部知识，导致回答生硬、缺乏共情能力和自然度？ — 阿里淘天AI Agent应用开发二面
50. 随着大模型上下文窗口持续扩容（100K→1M+），传统 RAG 技术是否会被完全替代？ — 阿里淘天AI Agent应用开发二面
51. 从 ES 切换到向量检索，哪些能力会下降，哪些会提升？ — 字节跳动Agent开发实习生一面
52. 父文档是怎么得到的？语义切分具体是怎么做的？聚类后怎么区分不同文档？ — 同程Agent开发实习一面【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：为了保证连续语义，文本具体怎么切分？有什么算法？】
53. RAG 项目里 MySQL 和 Elasticsearch 的数据一致性怎么保证？ — 视频面经汇总（新增）
54. 手动干预切片是怎么做的？为什么需要这一步？ — 视频面经汇总（新增）
55. Text2SQL 的 RAG 架构里，DDL 层和规则层分别解决什么问题？业务表频繁变更时怎么保持可用？ — 已有正文（补录索引）【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)】
56. 笔试题：多路召回结果合并去重 + 加权排序 + TopK — 已有正文（补录索引）【[作业帮秋招一面](https://www.nowcoder.com/feed/main/detail/c86c7591ba9d47b696774ddb48cdc9cb)追问：两路检索得到的召回结果如何做结果融合？】
57. RAG 文档切分中遇到代码块、表格、标题等特殊内容怎么处理？ — 最有料AI实习生面经（新增）【[虾皮Agent一面](https://www.nowcoder.com/feed/main/detail/409dc8793a7b450eb51ee32c2b923d49)追问：PDF 电子表格如果很长、超出 chunk 长度，切分时会从表格中间截断吗？截断后如何避免表格行数据残缺带来的问题？】【[阿里边缘bu 秋招一面 （已过）](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)追问：同一文档中的两个表格存在逻辑关联时，应该如何切分和维护这种关联？】
58. 处理一万个长文档构建 RAG 知识库，工程上怎么做？ — 阿里Agent面经·场景题（新增）
59. RAG 知识库更新怎么不停服？热更新方案怎么设计？ — 腾讯AI应用开发（新增）【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：更新是每天全量跑一遍吗？】
60. 混合检索到底在哪个环节比单独用效果好？ — 淘天AI Agent一面（新增）【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：有没有通过实验分析向量检索及混合检索带来的提升？】
61. 知识图谱如何从文档构建、增量维护，并处理实体与关系冲突？ — 阿里云暑期 Agent 面经（新增）【[抖音电商Agent全栈开发工程师一面](https://www.nowcoder.com/discuss/925066865183858688)追问：知识构建与图谱抽取怎么做？；更新时实体抽取和关系关联怎么处理？】
62. MMR 为什么还能提高效果？重排后为什么还要设置 MMR 截断？ — 深势科技一面（新增）
63. 基于关键词的命令行代码搜索与基于 Embedding/RAG 的代码搜索，各有什么优缺点？ — 某小厂FOSHO AI应用开发二面（新增）
64. 知识库持续更新时，如何保证一次 RAG 回答读取同一逻辑快照？ — 腾讯互娱全栈开发（AI）二面（新增）
65. 如何设计支持版本过滤和时间旅行查询的向量索引？ — 腾讯互娱全栈开发（AI）二面（新增）
66. RAG 如何防止引用漂移和跨版本证据拼接？ — 腾讯互娱全栈开发（AI）二面（新增）
67. RAG 前端如何展示长文档，并让引用稳定跳转到原文证据？ — 商汤 AI Agent 开发面经（新增）
