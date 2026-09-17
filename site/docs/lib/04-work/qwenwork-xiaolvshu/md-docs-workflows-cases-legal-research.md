---
title: "法规检索 (/docs/workflows/cases/legal-research)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/cases/legal-research.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/cases/legal-research.md"
sourceSha256: "67b258789e05270ddc2450879dedfde6ba39d52a551a4959c67f1c4c9b940ba4"
pageSha256: "67b258789e05270ddc2450879dedfde6ba39d52a551a4959c67f1c4c9b940ba4"
contentMode: "local-full"
zh: ""
---

# 法规检索 (/docs/workflows/cases/legal-research)

## 场景与目标 [#场景与目标]

适合法务和律师建立法规研究底稿。交付重点是检索过程透明、条文可定位、效力状态可核验，而不是只给一个结论。

## 检索流程 [#检索流程]

&lt;Mermaid
  chart="flowchart TD
  A[口语问题] --> B[提取主体 行为 地区 时间]
  B --> C[形成检索词与同义词]
  C --> D[按效力层级检索]
  D --> E[核对发布机关与生效状态]
  E --> F[整理条文与适用条件]
  F --> G[专业人员复核]"
/>

## 输出结构 [#输出结构]

1. 问题界定和已知事实；
2. 地区、时间、主体和行为范围；
3. 检索词、同义词和排除词；
4. 法律、行政法规、司法解释、部门规章等分层清单；
5. 条文摘要、生效日期、效力状态和适用条件；
6. 冲突、空白、地方差异和仍需确认的问题。

## 提示词 [#提示词]

```text
围绕 [法律问题] 建立法规检索底稿。
适用地区：[地区]；事实时间：[时间]；主体：[主体]；行为：[行为]。
先给检索策略，再按效力层级整理候选依据。
标注发布日期、生效状态、适用条件和可能冲突；无法核验时不要写成现行有效。
```

## 验收与安全 [#验收与安全]

* 法规状态必须在实际使用当天再次核验；
* 区分法律文本、案例观点、监管口径和模型解释；
* 不以搜索摘要替代原文；
* 由律师或法务确认最终适用性；
* 案件材料和个人信息只在授权范围内处理。
