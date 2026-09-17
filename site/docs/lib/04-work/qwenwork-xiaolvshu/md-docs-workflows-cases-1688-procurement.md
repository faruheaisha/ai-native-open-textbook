---
title: "1688 企业采购寻源 (/docs/workflows/cases/1688-procurement)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/cases/1688-procurement.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/cases/1688-procurement.md"
sourceSha256: "d019550fa2ddcaa40b503aa56e12d834e55f4a51d7507ce58233f1c0ff689b17"
pageSha256: "d019550fa2ddcaa40b503aa56e12d834e55f4a51d7507ce58233f1c0ff689b17"
contentMode: "local-full"
zh: ""
---

# 1688 企业采购寻源 (/docs/workflows/cases/1688-procurement)

## 场景与目标 [#场景与目标]

适合行政、采购和业务团队为办公用品、家具、礼品或经营物料寻找候选供应。千问办公负责信息整理和初步比较，采购负责人负责询价、资质判断和下单。

## 输入契约 [#输入契约]

```text
品类：[商品名称]
用途：[使用场景]
数量：[预计数量和可接受起订量]
预算：[总预算或单价范围]
最低规格：[材质、尺寸、型号、认证等]
交付：[地区和最晚到货时间]
商务条件：[是否含税、发票类型、打样要求]
```

## 执行流程 [#执行流程]

&lt;Mermaid
  chart="flowchart LR
  A[采购需求] --> B[统一规格口径]
  B --> C[搜索候选商品]
  C --> D[比较价格 起订量 交期]
  D --> E[供应商与风险初筛]
  E --> F[采购负责人询价]
  F --> G[样品或合同确认]"
/>

1. 将模糊需求转成必须满足、可以妥协和需要询问三类条件；
2. 搜索并保留查询日期、商品标识、规格、价格口径和供应商信息；
3. 把不同包装、含税状态和运费统一到可比较口径；
4. 输出候选清单、排除理由和待询问题；
5. 由采购人员确认最新价格、库存、交期、资质与合同条款。

## 验收标准 [#验收标准]

* 至少提供三个符合最低规格的候选，或明确说明为什么不足；
* 价格说明含税、运费、包装和数量口径；
* 缺失信息标记“待询”，不自行补齐；
* 商品页面信息不等于供应商履约承诺；
* 下单、付款和签署合同必须由授权人员完成。

## 失败处理与复用 [#失败处理与复用]

搜索结果不可比时先收紧规格，不直接按最低价排序。将最终采用的规格字段、供应商问卷和验收记录沉淀为下一次采购模板。
