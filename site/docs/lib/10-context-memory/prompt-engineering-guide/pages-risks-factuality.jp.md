---
title: "事実性"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/risks/factuality.jp.mdx"
sourceRel: "pages/risks/factuality.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/risks/factuality.jp.mdx"
sourceSha256: "e76b2790c4a728ab8df64380f2ad4d4fdaa3096e67784d060d65d938a06dbe0c"
pageSha256: "e76b2790c4a728ab8df64380f2ad4d4fdaa3096e67784d060d65d938a06dbe0c"
contentMode: "local-full"
zh: ""
---

# 事実性

LLMは、一貫性があり説得力のある応答を生成する傾向がありますが、時にはでっち上げのものであることがあります。プロンプトの改善により、より正確で事実に基づいた応答を生成するようにモデルを改善し、不一致ででっち上げた応答を生成する可能性を減らすことができます。

いくつかの解決策は以下の通りです:
- モデルがでっち上げのテキストを生成する可能性を減らすために、コンテキストの一部として正解（例えば、関連記事の段落やWikipediaのエントリー）を提供する。
- 確率パラメータを減らし、答えを知らない場合には（例えば、「分からない」）と認めるように指示することにより、モデルがより多様な応答を生成しないように構成する。
- プロンプトに、知っていることと知らないことの両方の質問と応答の例を組み合わせる。

簡単な例を見てみましょう:

*プロンプト:*
```
Q: 原子とは何ですか？
A: 原子とは、すべてのものを構成する微小な粒子です。

Q: アルバン・ムンツとは誰ですか？
A: ?

Q: Kozar-09とは何ですか？
A: ?

Q: 火星には何個の衛星がありますか？
A: フォボスとデイモスの2つです。

Q: ネト・ベト・ロベルトとは誰ですか？
```

*出力:*
```
A: ?
```

私は「ネト・ベト・ロベルト」という名前をでっち上げたため、この場合モデルは正しいです。質問を少し変えてみて、動作するようにできるか試してみてください。これまで学んできたことに基づいて、さらに改善する方法があります。
