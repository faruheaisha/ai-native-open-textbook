---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozeloop_langchain_langgraph_trace_report.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_langchain_langgraph_trace_report.md"
sourceSha256: "d362f8dfbb5a67d3bf5993b49aaba1946fdf32c1c353159d8b51b5896d5e1b0c"
pageSha256: "d362f8dfbb5a67d3bf5993b49aaba1946fdf32c1c353159d8b51b5896d5e1b0c"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文介绍如何上报 LangChain、LangGraph 和 DeepAgents 的 Trace 数据到扣子罗盘。
## 功能介绍 \{#f2eec4ab\}
[LangChain](https://www.langchain.com/) 是一个大语言模型（LLMs）应用开发框架，[LangGraph](https://langchain-ai.github.io/langgraph/) 是 LangChain 生态的核心扩展模块，用于使用大语言模型构建复杂、有状态、多 Agent 的应用程序。[DeepAgents](https://docs.langchain.com/oss/python/deepagents/overview) 是一个基于 LangChain 构建的、用于创建自主 AI Agent 的框架，这些 Agent 能够通过规划、研究、批判和迭代其输出来执行深度研究和复杂任务。
扣子罗盘通过 LangChain Callback 机制与 LangChain 集成，能够捕获 LangChain 应用执行过程的 Trace 数据，并进行可视化分析。本集成方案适用于需要监控 LangChain/LangGraph/DeepAgents 应用的执行流程、分析 AI 模型调用性能或调试应用问题等场景。
:::tip 说明
上报 LangGraph、LangChain 和 DeepAgents 的 Trace 数据到扣子罗盘的方式相同，本文以 LangChain 为例。关于上报 LangGraph Trace 数据的示例，请参考 [LangGraph](https://github.com/coze-dev/cozeloop-examples/tree/main/python/integration/framework/langgraph)。
:::
## 配置环境变量  \{#78edc8f3\}
在上报 Trace 数据前，你需要正确配置环境变量 `COZELOOP_API_TOKEN` 和 `COZELOOP_WORKSPACE_ID`，用于指定上报数据时所需的扣子罗盘空间 ID 和访问令牌，以确保数据能够正确发送到指定的扣子罗盘空间中。环境变量配置格式及说明如下：

| | | \
|**环境变量** |**说明** |
|---|---|
| | | \
|COZELOOP_API_TOKEN  |设置上报数据时所需的扣子罗盘认证信息，即配置为扣子罗盘的个人访问令牌或服务访问令牌。获取步骤，请参考配置个人访问令牌、配置服务访问令牌。 |
| | | \
|COZELOOP_WORKSPACE_ID  |配置为扣子罗盘工作空间 ID。获取步骤，请参考获取扣子罗盘工作空间 ID。 |

## 上报 Trace \{#afa12ce0\}
下述示例展示了如何在 LangChain 的 LCEL 模式中无缝集成扣子罗盘，自动上报 Trace 数据，实现对 AI 模型调用的监控和分析。
示例代码及重要字段说明如下：

* `base_url`：OpenAI 模型的服务地址。
   * 推荐使用方舟模型，其 BASE_URL 固定为 `https://ark.cn-beijing.volces.com/api/v3`。
   * 使用其他 OPENAI 模型时，配置为其对应的 BASE_URL 即可。
* `api_key`：OpenAI 模型的 API Key。
   * 推荐使用方舟模型，其 API Key 获取步骤，请参考 [API Key 管理](https://www.volcengine.com/docs/82379/1361424)。
   * 使用其他 OPENAI 模型时，配置为其对应的 API Key 即可。
* `model`：OpenAI 模型 ID。如果你调用的是火山方舟模型，需要先开通对应的模型。

```Python
import os

import cozeloop
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

from cozeloop.integration.langchain.trace_callback import LoopTracer

def do_lcel_demo():
    # 创建 cozeloop client
    client = cozeloop.new_client()
    
    # 创建 Trace 回调处理器，是 LangChain 链路采集与上报的核心入口
    trace_callback_handler = LoopTracer.get_callback_handler(client)
    
    # 创建 LangChain 流程
    llm_model = ChatOpenAI(
        base_url="https://ark.cn-beijing.volces.com/api/v3",  # use ark model url by default, refer: https://www.volcengine.com/docs/82379/1361424
        api_key="***",  # your model api key
        model="***",  # your model
    )
    lcel_sequence = llm_model | StrOutputParser()

    output = lcel_sequence.invoke(
        input='用你所学的技巧，帮我生成几个有意思的问题',
        # 在执行时注册回调处理器，是 Trace 上报生效的关键步骤
        config=RunnableConfig(callbacks=[trace_callback_handler])
    )
    print(output)
    
    # 进程退出前主动 flush，确保 Trace 完成上报，避免数据丢失
    client.flush()

if __name__ == "__main__":
    do_lcel_demo()
```

## 查看 Trace \{#c8c92ac8\}
上报 Trace 数据后，你可以在[扣子罗盘](https://loop.coze.cn/)的 **Trace** 页面，找到并单击目标 Span，查看上报的 Trace 数据。
![Image=712x363](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/141b4c9b7148459eaf3cfc1f1107ce3c~tplv-goo7wpa0wc-image.image)
## 更多示例 \{#4e6aaba2\}
关于上报 LangGraph Trace 数据的更多示例，请参考 [LangGraph](https://github.com/coze-dev/cozeloop-examples/tree/main/python/integration/framework/langgraph)。
