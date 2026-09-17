---
title: "LangChain 接入大模型 API"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/tools/langchain-setup.md"
sourceRel: "docs/tools/langchain-setup.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/tools/langchain-setup.md"
sourceSha256: "96e8b740d38c017714c9db034fef27fdb89ecced1a4ec39988c398eca39184a8"
pageSha256: "96e8b740d38c017714c9db034fef27fdb89ecced1a4ec39988c398eca39184a8"
contentMode: "local-full"
zh: ""
---

# LangChain 接入大模型 API

> [LangChain](https://langchain.com) 是最流行的 LLM 应用框架。本指南演示用 LangChain 调用统一网关的多模型。

## Python

### 安装

```bash
pip install langchain langchain-openai
```

### 调用代码

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="claude-opus-4-7",                  # 任意模型 ID
    openai_api_key="sk-xxx",
    openai_api_base="http://xdhdancer.top/v1",
    temperature=0.3,
)

# 直接调用
resp = llm.invoke("Explain quantum tunneling in one paragraph.")
print(resp.content)

# 链式
from langchain_core.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{question}"),
])
chain = prompt | llm
print(chain.invoke({"question": "What is RAG?"}).content)
```

### 流式输出

```python
for chunk in llm.stream("Write a short poem about Saturday"):
    print(chunk.content, end="", flush=True)
```

## JavaScript / TypeScript

### 安装

```bash
npm install @langchain/openai @langchain/core
```

### 调用

```javascript
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "claude-opus-4-7",
  apiKey: "sk-xxx",
  configuration: {
    baseURL: "http://xdhdancer.top/v1",
  },
});

const resp = await llm.invoke("Hello, world!");
console.log(resp.content);
```

## 多模型场景：Router

```python
from langchain_openai import ChatOpenAI

# 简单/便宜
fast = ChatOpenAI(model="gpt-5-mini", openai_api_base="http://xdhdancer.top/v1", openai_api_key="sk-xxx")
# 复杂/精准
strong = ChatOpenAI(model="claude-opus-4-7", openai_api_base="http://xdhdancer.top/v1", openai_api_key="sk-xxx")

def route(question: str):
    if len(question) > 200 or "code" in question.lower():
        return strong.invoke(question).content
    return fast.invoke(question).content
```

## 常见问题

### Q: 用 `from langchain.chat_models import ChatOpenAI`（旧路径）

A: LangChain 0.1+ 把 OpenAI 拆到独立包。改用 `from langchain_openai import ChatOpenAI`。

### Q: 流式回调没触发

A: 确认安装 `langchain >= 0.1.0`，且代码里用 `llm.stream(...)` 不是 `llm.invoke(...)`。
