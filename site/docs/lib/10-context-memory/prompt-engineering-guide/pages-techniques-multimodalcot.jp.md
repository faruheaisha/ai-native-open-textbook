---
title: "マルチモーダルCoTプロンプティング"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/multimodalcot.jp.mdx"
sourceRel: "pages/techniques/multimodalcot.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/multimodalcot.jp.mdx"
sourceSha256: "db9045aef2940ff3dbe9401321a55dd9fb2211ca90645fc4ab3ff1c70086ce28"
pageSha256: "db9045aef2940ff3dbe9401321a55dd9fb2211ca90645fc4ab3ff1c70086ce28"
contentMode: "local-full"
zh: ""
---

# マルチモーダルCoTプロンプティング

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import MCOT from '../../img/multimodal-cot.png'

[Zhang et al. (2023)](https://arxiv.org/abs/2302.00923)は、最近、マルチモーダルの思考連鎖プロンプティングアプローチを提案しました。従来のCoTは言語モダリティに焦点を当てています。対照的に、マルチモーダルCoTは、テキストとビジョンを2段階のフレームワークに組み込んでいます。最初のステップは、マルチモーダル情報に基づく理由生成です。これに続いて、情報量の多い生成された理由を活用した回答推論が行われます。

マルチモーダルCoTモデル（1B）は、ScienceQAベンチマークでGPT-3.5を上回る性能を発揮しています。

Image Source: [Zhang et al. (2023)](https://arxiv.org/abs/2302.00923)

詳細は以下を参照してください：
- [Language Is Not All You Need: Aligning Perception with Language Models](https://arxiv.org/abs/2302.14045) (Feb 2023)
