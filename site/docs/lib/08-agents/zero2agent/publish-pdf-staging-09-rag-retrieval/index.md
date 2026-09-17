---
title: "RAG 与检索系统：从 chunk 设计到多路召回"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-rag-retrieval.md"
sourceRel: "publish-pdf/staging/09-rag-retrieval.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/09-rag-retrieval.md"
sourceSha256: "485baf2769b08dc4dbf6e4e54a35aeaaaf17f440f97e08141fd1a36f491b9f46"
pageSha256: "a106b1aba90be2220a11a4d0dc214c41f10f5256ed64d2fe1db9988a2658d2b1"
contentMode: "local-full"
zh: ""
---

# RAG 与检索系统：从 chunk 设计到多路召回

RAG 是 Agent 系统的“外部知识接口”。面试官考 RAG 时不想听“向量数据库”四个字——他想知道的是**离线怎么切片、在线怎么召回、召回后怎么排序**，以及面对复杂查询时怎么做改写和意图识别。

---

## 本篇目录

- [检索基础与原理](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-检索基础与原理.md)
- [检索算法与微调](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-检索算法与微调.md)
- [RAG 在 Agent 中的角色](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-RAG_在_Agent_中的角色.md)
- [召回与排序优化](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-召回与排序优化.md)
- [知识库与索引工程](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-知识库与索引工程.md)
- [进阶检索架构](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-进阶检索架构.md)
- [Q：RAG 过程中如何处理文件里的图片？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_RAG_过程中如何处理文件里的图片.md)
- [Q：如何避免模型回复过度依赖检索到的外部知识，导致回答生硬、缺乏共情能力和自然度？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_如何避免模型回复过度依赖检索到的外部知识_导致回答生硬_缺乏共情能力和自然度.md)
- [Q：随着大模型上下文窗口持续扩容（100K→1M+），传统 RAG 技术是否会被完全替代？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Q_随着大模型上下文窗口持续扩容_100K_1M_传统_RAG_技术是否会被完全.md)
- [ES 切换向量检索的能力变化](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-ES_切换向量检索的能力变化.md)
- [语义切分与文档聚类](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-语义切分与文档聚类.md)
- [Q：RAG 文档切分中遇到代码块、表格、标题等特殊内容怎么处理？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_RAG_文档切分中遇到代码块_表格_标题等特殊内容怎么处理.md)
- [Q：处理一万个长文档构建 RAG 知识库，工程上怎么做？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_处理一万个长文档构建_RAG_知识库_工程上怎么做.md)
- [Q：混合检索到底在哪个环节比单独用效果好？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_混合检索到底在哪个环节比单独用效果好.md)
- [Q：MMR 为什么还能提高效果？重排后为什么还要设置 MMR 截断？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_MMR_为什么还能提高效果_重排后为什么还要设置_MMR_截断.md)
- [Q：基于关键词的命令行代码搜索与基于 Embedding/RAG 的代码搜索，各有什么优缺点？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_基于关键词的命令行代码搜索与基于_Embedding_RAG_的代码搜索_各.md)
- [Q：知识库持续更新时，如何保证一次 RAG 回答读取同一逻辑快照？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_知识库持续更新时_如何保证一次_RAG_回答读取同一逻辑快照.md)
- [Q：如何设计支持版本过滤和时间旅行查询的向量索引？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_如何设计支持版本过滤和时间旅行查询的向量索引.md)
- [Q：RAG 如何防止引用漂移和跨版本证据拼接？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-Q_RAG_如何防止引用漂移和跨版本证据拼接.md)
- [Q：RAG 前端如何展示长文档，并让引用稳定跳转到原文证据？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/20-Q_RAG_前端如何展示长文档_并让引用稳定跳转到原文证据.md)
- [Q：知识图谱如何从文档构建、增量维护，并处理实体与关系冲突？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/21-Q_知识图谱如何从文档构建_增量维护_并处理实体与关系冲突.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/22-这类题的答题模式.md)
