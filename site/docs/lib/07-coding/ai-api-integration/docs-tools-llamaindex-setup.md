---
title: "LlamaIndex 接入大模型 API"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/tools/llamaindex-setup.md"
sourceRel: "docs/tools/llamaindex-setup.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/tools/llamaindex-setup.md"
sourceSha256: "618cd17911a56ac6e54546e55e160f85554fce29911a3158c3b26467d6f84fe5"
pageSha256: "618cd17911a56ac6e54546e55e160f85554fce29911a3158c3b26467d6f84fe5"
contentMode: "local-full"
zh: ""
---

# LlamaIndex 接入大模型 API

> [LlamaIndex](https://www.llamaindex.ai) 是 LLM 数据/RAG 框架。本指南演示用 LlamaIndex 调用统一网关。

## 安装

```bash
pip install llama-index llama-index-llms-openai-like
```

## 配置

```python
from llama_index.llms.openai_like import OpenAILike

llm = OpenAILike(
    model="claude-opus-4-7",
    api_base="http://xdhdancer.top/v1",
    api_key="sk-xxx",
    is_chat_model=True,
    temperature=0.2,
)

# 直接调用
resp = llm.complete("What is RAG?")
print(resp.text)
```

## RAG 完整示例

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.openai_like import OpenAILike
from llama_index.embeddings.openai import OpenAIEmbedding

Settings.llm = OpenAILike(
    model="claude-opus-4-7",
    api_base="http://xdhdancer.top/v1",
    api_key="sk-xxx",
    is_chat_model=True,
)

Settings.embed_model = OpenAIEmbedding(
    model="text-embedding-3-small",
    api_base="http://xdhdancer.top/v1",
    api_key="sk-xxx",
)

# 读取文档目录建索引
documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)

# 查询
query_engine = index.as_query_engine()
response = query_engine.query("我的文档里讲了什么核心观点？")
print(response)
```

## 常见问题

### Q: 用 `OpenAI` 类不用 `OpenAILike`

A: `OpenAI` 类要求严格的 OpenAI 模型名校验，会拒绝 `claude-opus-4-7` 等非 OpenAI 模型。`OpenAILike` 不校验，适合用第三方 OpenAI 兼容 endpoint。

### Q: Embedding 报错

A: 确认网关支持 embedding 模型。常见 ID：`text-embedding-3-small`、`text-embedding-3-large`。
