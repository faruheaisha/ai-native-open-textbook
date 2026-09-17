---
title: "从会议到知识与技能沉淀 (/docs/workflows/meeting-knowledge)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/workflows/meeting-knowledge.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/workflows/meeting-knowledge.md"
sourceSha256: "8cc218e5253ddd34f0af6ee7614025184f8ff7438a36d1eede6613eb9acbd9a5"
pageSha256: "8cc218e5253ddd34f0af6ee7614025184f8ff7438a36d1eede6613eb9acbd9a5"
contentMode: "local-full"
zh: ""
---

# 从会议到知识与技能沉淀 (/docs/workflows/meeting-knowledge)

会议结束后真正需要管理的是决定、行动、风险和后续复用，而不是只生成一份摘要。

查找共同空闲时间、预约会议、从 AI 听记提取结论与待办可以连成同一场景。预约属于真实日程写入，应先确认参会人、时区、时间、会议方式和通知内容；纪要仍按下方流程进行人工核验。

&lt;Mermaid
  chart="flowchart LR
  A[议程 记录 附件] --> B[会议纪要草稿]
  B --> C[结论与待确认项]
  B --> D[行动项]
  C --> E[主持人确认]
  D --> E
  E --> F[受控分发与跟踪]
  F --> G[钉钉文档或知识库归档]
  F --> H[抽象通用模板与规则]
  H --> I[Skill]
  F -.敏感原始记录不进入.-> I"
/>

## 工作流 [#工作流]

    ### 整理会议输入 [#整理会议输入]

    提供会议记录、议程和必要附件，明确哪些内容不能进入公开纪要。

    ### 生成纪要与行动项 [#生成纪要与行动项]

    结论区分“已决定”“建议”“待确认”；行动项包含负责人和截止时间。

    ### 人工确认 [#人工确认]

    由会议主持人或责任人确认关键决定、姓名和时间，不让 Agent 替负责人作承诺。

    ### 分发与跟踪 [#分发与跟踪]

    通过受控渠道发送确认版本，后续更新状态而不是反复生成新副本。

    ### 沉淀可复用部分 [#沉淀可复用部分]

    确认后的会议内容按权限归档到钉钉文档或知识库；只把稳定的会议模板、提取规则和验收清单整理为 Skill，不保存本次敏感记录。

## 适合整理为 Skill 的内容 [#适合整理为-skill-的内容]

* 组织统一的纪要结构；
* 行动项字段与状态定义；
* 哪类会议需要哪些验收人；
* 常见术语和缩写；
* 信息脱敏规则；
* 分发渠道和归档命名规范。

  原始会议内容可能包含个人信息、未公开决策和商业秘密。创建 Skill 前应抽象通用方法并删除不必要的业务数据。
