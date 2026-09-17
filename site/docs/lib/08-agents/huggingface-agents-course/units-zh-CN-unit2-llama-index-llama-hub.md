---
title: "LlamaHub 简介"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/llama-hub.mdx"
sourceRel: "units/zh-CN/unit2/llama-index/llama-hub.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/llama-index/llama-hub.mdx"
sourceSha256: "51658616d1ec6d3f7903d663c1b58c3e1b9970bf1a436dd57ed76b6b9e30f993"
pageSha256: "51658616d1ec6d3f7903d663c1b58c3e1b9970bf1a436dd57ed76b6b9e30f993"
contentMode: "local-full"
zh: ""
---

# LlamaHub 简介

**LlamaHub 是一个包含数百个集成组件、智能体和工具的注册中心，这些资源均可用于LlamaIndex框架。**

![LlamaHub](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/llama-index/llama-hub.png)

在本课程中我们将使用多种集成组件，因此让我们首先了解LlamaHub及其如何助力开发。

接下来我们将学习如何查找和安装所需组件的依赖项。

## 安装

LlamaIndex的安装说明可通过结构清晰的**[LlamaHub官网](https://llamahub.ai/)**获取。
初次接触可能会感到有些复杂，但大多数**安装命令都遵循易于记忆的格式**：

```bash
pip install llama-index-\{component-type\}-\{framework-name\}
```

让我们尝试使用 [Hugging Face 推理 API 集成](https://llamahub.ai/l/llms/llama-index-llms-huggingface-api?from=llms) 安装 LLM 组件的依赖项。

```bash
pip install llama-index-llms-huggingface-api
```

## 用法

安装后，我们可以看到使用模式。您会注意到导入路径跟在安装命令后面！
下面，我们可以看到**LLM 组件的 Hugging Face 推理 API** 的使用示例。

```python
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

llm = HuggingFaceInferenceAPI(
    model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
    temperature=0.7,
    max_tokens=100,
    token="hf_xxx",
)

llm.complete("Hello, how are you?")
# I am good, how can I help you today?
```

太棒了，我们现在知道如何查找、安装和使用我们所需组件的集成。
**让我们深入了解这些组件**，看看如何使用它们来构建我们自己的智能体。
