---
title: "功能介绍 {featureintro}"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozeloop_litellm_proxy_native_trace_report.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_litellm_proxy_native_trace_report.md"
sourceSha256: "3bb3839d5bd802d3beb7693a76eed1cae9106a9fe786a9c6432e41fcb70831c9"
pageSha256: "3bb3839d5bd802d3beb7693a76eed1cae9106a9fe786a9c6432e41fcb70831c9"
contentMode: "local-full"
zh: ""
---

# 功能介绍 \{#feature_intro\}
[LiteLLM](https://docs.litellm.ai/docs/) 是一款开源的、轻量级的大语言模型调用与管理工具。它提供了与 OpenAI API 兼容的统一接口，使你可以统一调用和管理来自数百家供应商的 LLM。LiteLLM 提供了 LiteLLM SDK 和 LiteLLM Proxy。本文仅介绍如何上报 LiteLLM Proxy 的 Trace 数据。关于如何把 LiteLLM SDK 的 Trace 数据上报到扣子罗盘，参见 LiteLLM SDK。
# 准备工作 \{#preparation\}
你需要先安装以下 Python 库。

* **openai**：OpenAI Python SDK，用于调用所有符合 OpenAI API 标准协议的 LLM。
* **litellm[proxy]**：对调用过程进行追踪以及将 Trace 数据导出到后端系统。

```Python
pip install openai
pip install 'litellm[proxy]'==1.80.5 # 为了模型节点友好渲染，建议litellm版本<=1.80.5
```

# 操作步骤 \{#fe212827\}
## 步骤一：配置并启动 LiteLLM Proxy \{#step1\}

1. 创建配置文件。

创建 `litellm_config.yaml`，配置 [模型参数](https://litellm.vercel.app/docs/proxy/configs)。本示例以 Azure 的 `gpt-5-2025-08-07` 模型为例，LiteLLM Proxy 会将其统一转换为标准的 OpenAI 数据结构。你也可以使用其他 LiteLLM 支持的模型。
对于本示例中的配置文件，确保完成以下操作：
