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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/09-rag-retrieval/index.md"
sourceRel: "learn-agent-interview/09-rag-retrieval/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/09-rag-retrieval/index.md"
sourceSha256: "0cd6a985cc678497a9698fc04c329c40038e03ec115e709643165c1ce39ab3ee"
pageSha256: "e923afd03a65922df77a3673e33cffd446e1355c5ef511c1f0a8deb4ebca1e60"
contentMode: "local-full"
zh: ""
---

## Q：知识库持续更新时，如何保证一次 RAG 回答读取同一逻辑快照？

> 来源：腾讯互娱全栈开发（AI）二面（2026-08-13）

**新手答**：“更新索引时用蓝绿切换，查询总是读当前索引。”

**高手答**：请求开始时取得快照 ID，Query Rewrite、稀疏/向量召回、补充检索、文档读取和引用校验都携带该 ID。新版本先完整写入正文、向量和元数据，校验后原子发布快照指针；旧快照保留到在线请求、评测和审计结束。跨存储要用共同版本清单，不能让正文、ACL 和向量各读“最新”。

**差距在哪**：新手保证单次检索可用，高手保证整条回答链的一致读视图。
