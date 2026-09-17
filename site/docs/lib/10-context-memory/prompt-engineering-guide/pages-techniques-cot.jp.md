---
title: "Chain-of-Thoughtプロンプティング"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/cot.jp.mdx"
sourceRel: "pages/techniques/cot.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/cot.jp.mdx"
sourceSha256: "fb3b8c21d2ed60347d447210720b14de0acd451f939d3d6ecae709633160a0cc"
pageSha256: "fb3b8c21d2ed60347d447210720b14de0acd451f939d3d6ecae709633160a0cc"
contentMode: "local-full"
zh: ""
---

# Chain-of-Thoughtプロンプティング

import \{Screenshot\} from 'components/screenshot'
import COT from '../../img/cot.png'
import ZEROCOT from '../../img/zero-cot.png'

## Chain-of-Thought (CoT) プロンプティング

[Wei et al. (2022)](https://arxiv.org/abs/2201.11903)で紹介されたchain-of-thought (CoT)プロンプティングは、中間的な推論ステップを介して複雑な推論能力を可能にします。few-shot promptingと組み合わせることで、推論が必要なより複雑なタスクでより良い結果を得ることができます。

*プロンプト:*
```
このグループの奇数を合計すると偶数になります。: 4、8、9、15、12、2、1。
A: 奇数を全て加えると(9, 15, 1)25になります。答えはFalseです。

このグループの奇数を合計すると偶数になります。: 17、10、19、4、8、12、24。
A: 奇数を全て加えると(17, 19)36になります。答えはTrueです。

このグループの奇数を合計すると偶数になります。: 16、11、14、4、8、13、24。
A: 奇数を全て加えると(11, 13)24になります。答えはTrueです。

このグループの奇数を合計すると偶数になります。: 17、9、10、12、13、4、2。
A: 奇数を全て加えると(17, 9, 13)39になります。答えはFalseです。

このグループの奇数を合計すると偶数になります。: 15、32、5、13、82、7、1。
A:
```

*出力:*
```
奇数を全て加えると(15, 5, 13, 7, 1)41になります。答えはFalseです。
```

素晴らしい！推論ステップが提供された場合、完璧な結果が得られます。実際、より少ない例を提供するだけで、つまり1つの例だけでこのタスクを解決することができます。

*プロンプト:*
```
このグループの奇数を合計すると偶数になります。: 4、8、9、15、12、2、1。
A: 奇数を全て加えると(9, 15, 1)25になります。答えはFalseです。

このグループの奇数を合計すると偶数になります。: 15、32、5、13、82、7、1。
A:
```

*出力:*
```
奇数を全て加えると(15, 5, 13, 7, 1)41になります。答えはFalseです。
```

著者たちは、これが十分に大きな言語モデルで生じる新興能力であると主張しています。

## Zero-shot COT Prompting

画像の出典：[Kojima et al. (2022)](https://arxiv.org/abs/2205.11916)

より最近提唱されたアイデアの1つは、[zero-shot CoT](https://arxiv.org/abs/2205.11916) (Kojima et al. 2022)のアイデアです。これは、元のプロンプトに「ステップバイステップで考えてみましょう」という文言を追加することを含みます。単純な問題を試して、モデルがどのように機能するかを見てみましょう。

*プロンプト:*
```
私は市場に行って10個のリンゴを買いました。隣人に2つ、修理工に2つ渡しました。それから5つのリンゴを買って1つ食べました。残りは何個ですか？
```

*出力:*
```
11個のリンゴ
```

答えは不正解です！それでは、特別なプロンプトで試してみましょう。

*プロンプト:*
```
私は市場に行って10個のリンゴを買いました。隣人に2つ、修理工に2つ渡しました。それから5つのリンゴを買って1つ食べました。残りは何個ですか？

ステップバイステップで考えてみましょう。
```

*出力:*
```
最初に、10個のリンゴから始めました。
隣人と修理工に合わせて、リンゴを2つずつ渡し、残りは6個になりました。
次に、5つのリンゴを買い、11個になりました。
最後に、1つのリンゴを食べたため、残りは10個になります。
```

この単純なプロンプトがこのタスクで効果的であることは驚くべきことです。これは、プロンプトに使用できる例があまりない場合に特に有用です。
