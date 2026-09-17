---
title: "多模态思维链提示方法"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/multimodalcot.zh.mdx"
sourceRel: "pages/techniques/multimodalcot.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/multimodalcot.zh.mdx"
sourceSha256: "072e613ec13493bf8bf4a58c2c5c0d5849732cd2c3c71979bc200811f853e442"
pageSha256: "072e613ec13493bf8bf4a58c2c5c0d5849732cd2c3c71979bc200811f853e442"
contentMode: "local-full"
zh: ""
---

# 多模态思维链提示方法

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import MCOT from '../../img/multimodal-cot.png'

最近，[Zhang等人（2023）](https://arxiv.org/abs/2302.00923)提出了一种多模态思维链提示方法。传统的思维链提示方法侧重于语言模态。相比之下，多模态思维链提示将文本和视觉融入到一个两阶段框架中。第一步涉及基于多模态信息的理性生成。接下来是第二阶段的答案推断，它利用生成的理性信息。

多模态CoT模型（1B）在ScienceQA基准测试中的表现优于GPT-3.5。

图片来源：[Zhang et al. (2023)](https://arxiv.org/abs/2302.00923)

进一步阅读：
- [语言不是你所需要的全部：将感知与语言模型对齐](https://arxiv.org/abs/2302.14045)（2023年2月）
