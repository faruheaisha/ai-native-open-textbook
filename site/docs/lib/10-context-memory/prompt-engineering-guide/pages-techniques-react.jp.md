---
title: "ReAct"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/react.jp.mdx"
sourceRel: "pages/techniques/react.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/react.jp.mdx"
sourceSha256: "a16ef70ee2a31445c3d9311b92cf38a0094036123031f3d6f0ecb36b2a261c98"
pageSha256: "a16ef70ee2a31445c3d9311b92cf38a0094036123031f3d6f0ecb36b2a261c98"
contentMode: "local-full"
zh: ""
---

# ReAct

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import REACT from '../../img/react.png'

[Yao et al.、2022](https://arxiv.org/abs/2210.03629)は、LLMが交互に推論トレースとタスク固有のアクションを生成するフレームワークを紹介しました。推論トレースの生成により、モデルはアクション計画を誘導、追跡、更新し、例外を処理することができます。アクションステップにより、知識ベースや環境などの外部ソースとのインターフェースや情報収集が可能になります。

ReActフレームワークは、LLMが外部ツールと対話して追加情報を取得し、より信頼性の高い事実に基づく回答を生成することができます。

Image Source: [Yao et al., 2022](https://arxiv.org/abs/2210.03629)

具体的な例は近日中に公開します！
