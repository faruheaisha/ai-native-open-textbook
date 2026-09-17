---
title: "方向性刺激提示"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/dsp.zh.mdx"
sourceRel: "pages/techniques/dsp.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/dsp.zh.mdx"
sourceSha256: "db36598c517fa0735f04f03dddaad32eb96ffe54c17d86df92ad744c1bdd2ca4"
pageSha256: "db36598c517fa0735f04f03dddaad32eb96ffe54c17d86df92ad744c1bdd2ca4"
contentMode: "local-full"
zh: ""
---

# 方向性刺激提示

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import DSP from '../../img/dsp.jpeg'

[Li 等人，（2023）](https://arxiv.org/abs/2302.11520)提出了一种新的提示技术，以更好地指导 LLM 生成所需的摘要。

训练了一个可调节的策略 LM 来生成刺激/提示。越来越多地使用RL来优化 LLM。

下图显示了方向性刺激提示与标准提示的比较。策略 LM 可以很小，并且可以优化以生成指导黑盒冻结 LLM 的提示。

图片来源：[Li 等人，（2023）](https://arxiv.org/abs/2302.11520)

完整示例即将推出！
