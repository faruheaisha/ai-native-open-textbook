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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "47a4b244f212d532d6267bf511e9d91f7045fe7659720ab15542b32a3fac9a8e"
contentMode: "local-full"
zh: ""
---

## Q：Agent 的中间与最终交付物应该如何版本化、校验和交接？

> 来源：福田 FDE 线下面试（2026-08-09）

**新手答**：“把生成文件保存到对象存储，最后给用户下载。”

**高手答**：每个交付物绑定 `run_id`、任务步骤、输入快照、模型/Prompt/Tool 版本、内容哈希、创建者和状态；草稿、已验证、已批准、已发布不可混用。结构化结果做 schema/业务校验，代码和文档运行对应测试，引用型报告保存证据映射。大文件进对象存储，状态与元数据进数据库；交接时提供产物、验证报告、未决风险和可复现命令，发布后仍保留回滚版本。

**差距在哪**：新手只保存文件，高手把交付物当可审计、可验收的发布制品。
