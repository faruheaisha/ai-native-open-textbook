---
title: "庭审发问策略 (/docs/workflows/cases/hearing-question-strategy)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/cases/hearing-question-strategy.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/cases/hearing-question-strategy.md"
sourceSha256: "1c7f388fd1929440b83d06d553a4eefb1fcd054e6f0f0df978c36d7a84c02518"
pageSha256: "1c7f388fd1929440b83d06d553a4eefb1fcd054e6f0f0df978c36d7a84c02518"
contentMode: "local-full"
zh: ""
---

# 庭审发问策略 (/docs/workflows/cases/hearing-question-strategy)

## 场景与责任边界 [#场景与责任边界]

本案例面向承办律师整理案件材料和发问框架。AI 只生成工作底稿，不替代律师的程序判断、法律意见和庭审决策。

## 前置材料 [#前置材料]

* 起诉状、答辩状和已确认的诉讼请求；
* 证据目录、证据编号和案件时间线；
* 我方诉讼地位、审理阶段和管辖信息；
* 已识别的争议焦点与对方主张；
* 不允许模型推断或使用的敏感信息。

## 执行流程 [#执行流程]

| 步骤   | 产物                |
| ---- | ----------------- |
| 事实梳理 | 已确认事实、争议事实、未知事实   |
| 证据映射 | 待证事实与证据编号的对应表     |
| 发问设计 | 发问对象、主问题、追问、目标和风险 |
| 对方预判 | 对方可能发问、异议点和应对材料   |
| 法官视角 | 可能关注的事实缺口与程序问题    |

```text
请基于我提供的案件材料制作庭审发问准备底稿。
按“争议焦点—待证事实—证据编号—发问对象—主问题—追问—风险”输出。
只使用材料内事实；无法确认的内容标记“待律师确认”。
不要预设证人答案，不要生成诱导伪造事实的问题。
```

## 验收与失败处理 [#验收与失败处理]

* 承办律师逐项核对当事人、时间、金额、证据编号和诉讼地位；
* 问题应服务待证事实，不重复、不预设答案；
* 推测与已证实事实分开；
* 材料缺失时输出补充清单，不继续设计关键发问；
* 最终版本由律师批准，并按案件保密要求存储和分发。
