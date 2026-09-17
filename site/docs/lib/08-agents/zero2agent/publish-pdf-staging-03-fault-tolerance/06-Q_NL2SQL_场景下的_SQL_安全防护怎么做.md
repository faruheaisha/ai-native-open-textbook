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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-fault-tolerance.md"
sourceRel: "publish-pdf/staging/03-fault-tolerance.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/03-fault-tolerance.md"
sourceSha256: "3d3fec6536b92234d38c933ae3738bd2e2f0687c81d39b5421d097eec7da0e12"
pageSha256: "51c807bbb3ea7faeaf028e3cc3a2aeb28ea9eb2079d482b588f77db67de8a7b3"
contentMode: "local-full"
zh: ""
---

## Q：NL2SQL 场景下的 SQL 安全防护怎么做？

> 来源：秋招AI面经问题汇总

**新手答**：“让模型不要生成 DROP 和 DELETE 就行。”

**高手答**：

NL2SQL 是 Agent 典型的高风险场景——模型生成的 SQL 直接操作数据库：

1. **只读权限隔离**：Agent 使用的数据库账号只有 SELECT 权限，物理层面杜绝写操作。需要写操作时走独立的审批流程
2. **SQL 白名单/语法树校验**：解析生成的 SQL 为 AST，校验是否包含危险操作（DDL、子查询嵌套过深、全表扫描、UNION 注入等）
3. **参数化查询**：模型输出的 SQL 中用户输入部分必须参数化（PreparedStatement），防止拼接注入
4. **结果集限制**：强制 LIMIT 上限（如最多 1000 行），防止模型生成无 LIMIT 的全表查询拖垮数据库
5. **敏感表/列屏蔽**：在 schema 描述中隐藏敏感表（如 salary、password），模型看不到就不会查询
6. **执行前人工确认**：对涉及敏感数据的查询，先展示 SQL 给用户确认再执行
7. **审计日志**：所有 Agent 生成并执行的 SQL 全量记录，支持事后审计和异常检测

**差距在哪**：面试官要看你对“让 AI 直接操作数据库的风险”有多敏感——不只是防注入，还要防模型幻觉生成的合法但有害 SQL。
