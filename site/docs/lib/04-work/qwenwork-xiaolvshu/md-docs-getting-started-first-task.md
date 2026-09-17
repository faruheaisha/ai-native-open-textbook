---
title: "完成第一个可验收任务 (/docs/getting-started/first-task)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/getting-started/first-task.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/getting-started/first-task.md"
sourceSha256: "2f6424d898118302b3cfc698d00f4953c937134d83f163b6bae97fc1e20378f5"
pageSha256: "2f6424d898118302b3cfc698d00f4953c937134d83f163b6bae97fc1e20378f5"
contentMode: "local-full"
zh: ""
---

# 完成第一个可验收任务 (/docs/getting-started/first-task)

第一个任务不要追求复杂。我们用一份不含敏感信息的会议记录，生成结构化会议纪要。

&lt;Mermaid
  chart="flowchart LR
  A[准备脱敏会议记录] --> B[写明交付格式与事实规则]
  B --> C[Agent 生成纪要]
  C --> D[对照原文抽查]
  D --> E\{验收通过\}
  E -->|否| F[指出具体错误]
  F --> C
  E -->|是| G[下载并保存模板]"
/>

## 准备输入 [#准备输入]

准备一份 `.txt`、`.docx` 或 `.pdf` 会议记录，并提前定义验收标准：

* 结论没有脱离原文；
* 行动项包含负责人、截止时间和状态；
* 无法确认的信息明确标记“待确认”；
* 最终交付为可编辑 Word 文件；
* 不凭空补充参与者或数字。

## 推荐提示词 [#推荐提示词]

```text
请阅读我上传的会议记录，生成一份中文会议纪要并保存为可编辑的 Word 文件。

必须包含：
1. 会议主题与日期；
2. 三到五条核心结论；
3. 行动项表格：事项、负责人、截止时间、状态；
4. 风险与待确认问题。

只使用原始记录中的事实。负责人或日期不明确时写“待确认”，不要猜测。
完成后先自检，再告诉我文件名和自检结果。
```

## 执行与验收 [#执行与验收]

    ### 上传文件并发送目标 [#上传文件并发送目标]

    在“新任务”输入框点击 `+` 上传本地文件，或从个人网盘选择已有文件。

    ### 观察计划与工具调用 [#观察计划与工具调用]

    查看 Agent 是否正确识别文件、交付格式和禁止猜测的约束。

    ### 预览结果 [#预览结果]

    打开生成文件，对照原文抽查关键结论、姓名、日期与数字。

    ### 指出具体问题并返工 [#指出具体问题并返工]

    使用“第 2 条结论缺少原文依据，请删除；行动项 3 的负责人应标记待确认”这类可执行反馈。

    ### 下载并记录有效提示词 [#下载并记录有效提示词]

    验收通过后下载文件，并保存本次提示词、输入要求和验收清单。

  AI 生成的文档看起来完整，并不代表事实正确。至少抽查姓名、日期、金额、比例、引用和行动项归属。
