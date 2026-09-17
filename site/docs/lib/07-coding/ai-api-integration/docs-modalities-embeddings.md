---
title: "Embeddings 向量调用指南"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/modalities/embeddings.md"
sourceRel: "docs/modalities/embeddings.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/modalities/embeddings.md"
sourceSha256: "f59dba8f11aba69486b7bb7420d595e475a950ed496d2e6491c4424ab4e99bbc"
pageSha256: "f59dba8f11aba69486b7bb7420d595e475a950ed496d2e6491c4424ab4e99bbc"
contentMode: "local-full"
zh: ""
---

# Embeddings 向量调用指南

> 通过统一网关调用 OpenAI / Cohere / BGE 等 embedding 模型。

## 模型清单

| 模型 ID | 维度 | 用途 |
|---------|------|------|
| `text-embedding-3-small` | 1536 | 通用、便宜 |
| `text-embedding-3-large` | 3072 | 高质量 |
| `bge-large-zh` | 1024 | 中文优化 |

## 调用代码

```python
from openai import OpenAI

client = OpenAI(api_key="sk-xxx", base_url="http://xdhdancer.top/v1")

resp = client.embeddings.create(
    model="text-embedding-3-small",
    input=["The quick brown fox", "jumps over the lazy dog"],
)

for emb in resp.data:
    print(f"维度: {len(emb.embedding)}, 前 5: {emb.embedding[:5]}")
```

## 在 RAG 里用

参考 [LlamaIndex 接入](/lib/07-coding/ai-api-integration/docs-tools-llamaindex-setup) 或 [LangChain 接入](/lib/07-coding/ai-api-integration/docs-tools-langchain-setup)。
