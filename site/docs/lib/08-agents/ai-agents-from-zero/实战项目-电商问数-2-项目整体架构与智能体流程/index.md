---
title: "2 - 电商问数：项目整体架构与智能体流程"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/实战项目-电商问数/2-项目整体架构与智能体流程.md"
sourceRel: "实战项目-电商问数/2-项目整体架构与智能体流程.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/实战项目-电商问数/2-项目整体架构与智能体流程.md"
sourceSha256: "eb7b8f625ebc43e24bb1c01512d85d97a366cd4c7a976cc17fa6d46c9ac54ed7"
pageSha256: "c193e4b5d85050695a70dca082b2401c608e2cac51eded975a64c7ac4f5de9fd"
contentMode: "local-full"
zh: ""
---

# 2 - 电商问数：项目整体架构与智能体流程

---

**本章课程目标：**

- 从整体上理解「电商问数」的项目整体架构，知道**元数据知识库**、**同步脚本**、**问数智能体**分别解决什么问题。
- 理解**元数据库**、**向量索引**、**全文索引**三者的分工关系，以及它们如何共同支撑 SQL 生成。
- 按流程图掌握问数智能体的执行链路，并建立“架构图和代码目录基本一一对应”的工程感知。

**学习建议：** 这一章是全项目总图，别当知识点清单背。先分成两大段：离线构建元数据知识库，在线根据用户问题调用知识并生成 SQL。读到某个表、字段或节点觉得细时，先问它属于“构建知识”还是“查询使用知识”。能画出这两段链路，后面细节会自己归位。

---

## 本篇目录

- [1、整体架构概述](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/实战项目-电商问数/01-1_整体架构概述.md)
- [2、元数据知识库](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/实战项目-电商问数/02-2_元数据知识库.md)
- [3、问数智能体](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/实战项目-电商问数/03-3_问数智能体.md)
