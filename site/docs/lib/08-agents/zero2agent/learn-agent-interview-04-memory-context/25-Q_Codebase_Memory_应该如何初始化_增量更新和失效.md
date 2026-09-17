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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/04-memory-context/index.md"
sourceRel: "learn-agent-interview/04-memory-context/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/04-memory-context/index.md"
sourceSha256: "a4b675e45f2a978a8587cbf3322b6bf968fb5dc972a390f232490f9b0ce03666"
pageSha256: "60e636d8bdea7c17581677637e6c89b57142c77fba5c2c2889ae8dc5a6600960"
contentMode: "local-full"
zh: ""
---

## Q：Codebase Memory 应该如何初始化、增量更新和失效？

> 来源：[拼多多 Agent 开发岗一面](https://www.nowcoder.com/discuss/926273867092430848)

**新手答**：“第一次扫描仓库生成 Embedding，代码变更后重新索引。”

**高手答**：初始化先建立可追溯快照：绑定仓库、commit、分支和忽略规则，解析文件、符号、引用、构建配置、测试与文档，再分别生成精确索引和语义索引。Memory 中保存的是带 `path、symbol、commit、content_hash、parser_version` 的证据，不是模型凭一次阅读写下的永久总结；密钥、生成目录和无权限文件在入库前过滤。

增量更新由 Git diff 或文件事件触发，但不能只更新改动行。函数签名变化要使调用关系、相关测试和上层摘要失效；文件移动应优先通过内容哈希识别为 rename，避免先删后建造成重复。更新流程是“解析新版本 -> 写入版本化索引 -> 完整性校验 -> 原子切换 active snapshot”，查询必须携带目标 commit，防止把旧分支记忆混进当前工作区。

失效策略同时看代码版本、解析器/Embedding 模型版本和事实依赖。摘要只引用底层 symbol ID，源代码变化后按依赖图重算；无法增量确认的仓库级结论标记 stale，而不是继续返回。评测使用固定代码查询和变更回放，观察符号召回、过期证据率、跨分支污染、更新时间和索引成本。

**差距在哪**：新手把 Codebase Memory 当向量库，高手把它设计成与 commit 对齐、可增量维护、可失效和可审计的代码事实层。
