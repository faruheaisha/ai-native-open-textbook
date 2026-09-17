---
title: "农业、食品与餐饮落地手册 (/docs/playbooks/industries/agriculture-food)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/playbooks/industries/agriculture-food.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/playbooks/industries/agriculture-food.md"
sourceSha256: "d7967caea8454c8d605d5372ee6bb2db995f9ba8c311301075baf2fa370ee72f"
pageSha256: "d7967caea8454c8d605d5372ee6bb2db995f9ba8c311301075baf2fa370ee72f"
contentMode: "local-full"
zh: ""
---

# 农业、食品与餐饮落地手册 (/docs/playbooks/industries/agriculture-food)

## 推荐首个试点 [#推荐首个试点]

建立供应商与批次材料完整性检查，记录产地、批号、检验文件、生产与到期日期、交付数量和缺失项，不对食品是否安全作自动结论。

&lt;Mermaid
  chart="flowchart LR
  A[供应商与批次资料] --> B[字段提取]
  B --> C[证照 日期 批号校验]
  C --> D[缺失与冲突清单]
  D --> E[质量人员确认]"
/>

| 场景     | 输出            | 关键边界        |
| ------ | ------------- | ----------- |
| 批次材料   | 产地、批号、检验和缺失文件 | 放行由质量人员决定   |
| 市场采购简报 | 公开价格、供给和天气摘要  | 标注查询日期和来源范围 |
| 门店记录   | 损耗、退货、客诉和异常   | 不替代食品安全判定   |
| 产品研发   | 创意、成本字段和试验模板  | 配方与过敏原人工确认  |
| 培训检查   | 岗位清单和测验       | 使用已批准卫生制度   |

农药、兽药、过敏原、保质期、放行和召回均为高风险事项。发现批次冲突、过期证照或安全投诉时立即停止常规汇总并升级。
