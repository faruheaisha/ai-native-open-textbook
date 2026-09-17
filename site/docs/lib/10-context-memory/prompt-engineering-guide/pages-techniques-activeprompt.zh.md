---
title: "Active-Prompt"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/activeprompt.zh.mdx"
sourceRel: "pages/techniques/activeprompt.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/activeprompt.zh.mdx"
sourceSha256: "3653caea3f56cebd613125404a9b2f8f2dbeed1aa60c3864327b0ed76a770d07"
pageSha256: "3653caea3f56cebd613125404a9b2f8f2dbeed1aa60c3864327b0ed76a770d07"
contentMode: "local-full"
zh: ""
---

# Active-Prompt

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import ACTIVE from '../../img/active-prompt.png'

思维链（CoT）方法依赖于一组固定的人工注释范例。问题在于，这些范例可能不是不同任务的最有效示例。为了解决这个问题，[Diao 等人（2023）](https://arxiv.org/pdf/2302.12246.pdf)最近提出了一种新的提示方法，称为 Active-Prompt，以适应 LLMs 到不同的任务特定示例提示（用人类设计的 CoT 推理进行注释）。

下面是该方法的说明。第一步是使用或不使用少量 CoT 示例查询 LLM。对一组训练问题生成 *k* 个可能的答案。基于 *k* 个答案计算不确定度度量（使用不一致性）。选择最不确定的问题由人类进行注释。然后使用新的注释范例来推断每个问题。

图片来源：[Diao等人（2023）](https://arxiv.org/pdf/2302.12246.pdf)
