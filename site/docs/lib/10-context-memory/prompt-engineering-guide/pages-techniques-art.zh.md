---
title: "自动推理并使用工具 (ART)"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/art.zh.mdx"
sourceRel: "pages/techniques/art.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/art.zh.mdx"
sourceSha256: "2e23749a4a633d2a192f1fbcad98962cb6112612cf8fff081eb68697c7f28651"
pageSha256: "2e23749a4a633d2a192f1fbcad98962cb6112612cf8fff081eb68697c7f28651"
contentMode: "local-full"
zh: ""
---

# 自动推理并使用工具 (ART)

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import ART from '../../img/ART.png'
import ART2 from '../../img/ART2.png'

使用 LLM 完成任务时，交替运用 CoT 提示和工具已经被证明是一种即强大又稳健的方法。这类方法通常需要针对特定任务手写示范，还需要精心编写交替使用生成模型和工具的脚本。[Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014)提出了一个新框架，该框架使用冻结的 LLM 来自动生成包含中间推理步骤的程序。

ART（Automatic Reasoning and Tool-use）的工作原理如下：
- 接到一个新任务的时候，从任务库中选择多步推理和使用工具的示范。
- 在测试中，调用外部工具时，先暂停生成，将工具输出整合后继续接着生成。

ART 引导模型总结示范，将新任务进行拆分并在恰当的地方使用工具。ART 采用的是零样本形式。ART 还可以手动扩展，只要简单地更新任务和工具库就可以修正推理步骤中的错误或是添加新的工具。这个过程如下：

图片援引自: [Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014)

在 BigBench 和 MMLU 基准测试中，ART 在未见任务上的表现大大超过了少样本提示和自动 CoT；配合人类反馈后，其表现超过了手写的 CoT 提示。

下面这张表格展示了 ART 在 BigBench 和 MMLU 任务上的表现：

图片援引自: [Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014)
