---
title: "岗位与行业路线 (/docs/playbooks)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/playbooks.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/playbooks.md"
sourceSha256: "946c5a1052bd9b7cf653b6c3a6f445bbdc5db7b510577f68c12082ad12fdda62"
pageSha256: "946c5a1052bd9b7cf653b6c3a6f445bbdc5db7b510577f68c12082ad12fdda62"
contentMode: "local-full"
zh: ""
---

# 岗位与行业路线 (/docs/playbooks)

岗位应用不从“有哪些提示词”开始，行业应用也不是给通用任务换一个行业名称。先找到重复发生、输入可控、产物可验收且错误影响可管理的环节。

&lt;Mermaid
  chart="flowchart LR
  A[岗位职责] --> C[候选任务]
  B[行业约束] --> C
  C --> D[低风险试点]
  D --> E[固定模板]
  E --> F[稳定工作流]
  F --> G[团队治理]"
/>

## 四级成熟度 [#四级成熟度]

| 等级      | 工作方式             | 进入下一级的条件        |
| ------- | ---------------- | --------------- |
| L1 单次辅助 | 人提供材料，AI 生成草稿    | 结果可验收并连续成功三次    |
| L2 固定模板 | 使用标准输入和输出结构      | 字段、规则和责任人稳定     |
| L3 工作流  | Skill、连接器和定时任务协作 | 有日志、异常处理和停用方法   |
| L4 团队能力 | 部门共享、权限和资产治理     | 成本、权限、质量和变更流程完备 |

低频、差异大或责任重的任务不必追求 L4，保持“AI 辅助 + 人工决策”通常更可靠。
