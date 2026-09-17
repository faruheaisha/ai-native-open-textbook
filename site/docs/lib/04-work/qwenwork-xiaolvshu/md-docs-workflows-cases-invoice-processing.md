---
title: "发票查验与制单 (/docs/workflows/cases/invoice-processing)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/cases/invoice-processing.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/cases/invoice-processing.md"
sourceSha256: "3fa48314758d7f8944febd8afb0b7705cbfdec49b63b64a77c271b3b4d6b8296"
pageSha256: "3fa48314758d7f8944febd8afb0b7705cbfdec49b63b64a77c271b3b4d6b8296"
contentMode: "local-full"
zh: ""
---

# 发票查验与制单 (/docs/workflows/cases/invoice-processing)

## 场景与边界 [#场景与边界]

适合整理常规开票需求和生成待确认信息。开具、红冲、作废和异常税务判断属于财务操作，必须由授权人员负责。

## 所需信息 [#所需信息]

| 类别  | 字段                  |
| --- | ------------------- |
| 购买方 | 名称、纳税人识别号、地址电话、开户信息 |
| 交易  | 合同或订单、品目、数量、金额、是否含税 |
| 发票  | 票种、税收分类、税率、备注和交付方式  |
| 授权  | 开票主体、经办人、复核人和提交权限   |

&lt;Mermaid
  chart="flowchart LR
  A[读取开票需求] --> B[匹配购买方]
  B --> C[确认品目与税收分类]
  C --> D[计算金额与税额]
  D --> E[生成预览]
  E --> F\{财务确认\}
  F -->|退回| B
  F -->|通过| G[提交开具]
  G --> H[交付与归档]"
/>

## 执行与验收 [#执行与验收]

1. 从合同、订单和客户档案提取字段，标注来源；
2. 对购买方、品目、税率和金额做一致性检查；
3. 生成结构化预览和缺失字段清单；
4. 财务人员逐项确认并明确授权；
5. 提交后记录发票标识、交付状态和关联业务单据。

涉及红冲、专票、多主体、跨境或异常税率时停止自动流程。生成预览不等于授权提交。

  只有财务负责人核对结构化信息并明确确认后，才能执行不可逆的开具动作。
