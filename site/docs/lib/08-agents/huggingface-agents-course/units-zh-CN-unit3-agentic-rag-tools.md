---
title: "构建并集成智能体工具"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit3/agentic-rag/tools.mdx"
sourceRel: "units/zh-CN/unit3/agentic-rag/tools.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit3/agentic-rag/tools.mdx"
sourceSha256: "8c3fbee03c56ad25231b62b82852234091dca5728e5baa10161e21625ef8b6d8"
pageSha256: "8c3fbee03c56ad25231b62b82852234091dca5728e5baa10161e21625ef8b6d8"
contentMode: "local-full"
zh: ""
---

# 构建并集成智能体工具

节将为 Alfred 赋予网络访问能力，使其能够获取实时新闻与全球资讯。
同时还将集成天气数据和 Hugging Face Hub 模型下载统计功能，帮助其进行时效性话题交流。

## 赋予智能体网络访问能力

请记住，我们希望 Alfred 能够展现出一位真正的文艺复兴主持人的风采，并对世界有着深刻的了解。

为此，我们需要确保 Alfred 能够获取有关世界的最新新闻和信息。

让我们从为 Alfred 创建一个网络搜索工具开始吧！


```python
from smolagents import DuckDuckGoSearchTool

# 初始化 DuckDuckGo 搜索工具
search_tool = DuckDuckGoSearchTool()

# 示例用法
results = search_tool("Who's the current President of France?")
print(results)
```

预期输出:

```
法国现任总统为 Emmanuel Macron。
```



```python
from llama_index.tools.duckduckgo import DuckDuckGoSearchToolSpec
from llama_index.core.tools import FunctionTool

# 初始化 DuckDuckGo 搜索工具
tool_spec = DuckDuckGoSearchToolSpec()

search_tool = FunctionTool.from_defaults(tool_spec.duckduckgo_full_search)
# 示例用法
response = search_tool("Who's the current President of France?")
print(response.raw_output[-1]['body'])
```

预期输出:

```
法兰西共和国总统是法国的国家元首。现任总统是 Emmanuel Macron，于2017年5月14日就任，并在2017年5月7日举行的总统选举第二轮中击败 Marine Le Pen。法国第五共和国总统名单 编号 肖像 姓名 ...
```


```python
from langchain_community.tools import DuckDuckGoSearchRun

search_tool = DuckDuckGoSearchRun()
results = search_tool.invoke("Who's the current President of France?")
print(results)
```

预期输出:

```
Emmanuel Macron （1977年12月21日生于亚眠）法国政治家，2017年当选总统...
```


## 创建天气信息工具（烟花调度）

完美的庆典应该在晴朗的天空下燃放烟花，我们需要确保烟花不会因为恶劣天气而取消。

让我们创建一个自定义工具，用于调用外部天气 API 并获取指定位置的天气信息。

> [!TIP]
> 为了简单起见，我们在本例中使用了一个虚拟的天气 API。如果您想使用真实的天气 API，您可以实现一个使用 OpenWeatherMap API 的天气工具，就像<a href="https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit1/tutorial/README.md">Unit 1</a>中提到的那样。


```python
from smolagents import Tool
import random

class WeatherInfoTool(Tool):
    name = "weather_info"
    description = "Fetches dummy weather information for a given location."
    inputs = \{
        "location": \{
            "type": "string",
            "description": "The location to get weather information for."
        \}
    \}
    output_type = "string"

    def forward(self, location: str):
        # 虚拟天气数据
        weather_conditions = [
            \{"condition": "Rainy", "temp_c": 15\},
            \{"condition": "Clear", "temp_c": 25\},
            \{"condition": "Windy", "temp_c": 20\}
        ]
        # 随机选择一种天气状况
        data = random.choice(weather_conditions)
        return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# 初始化工具
weather_info_tool = WeatherInfoTool()
```


```python
import random
from llama_index.core.tools import FunctionTool

def get_weather_info(location: str) -> str:
    """Fetches dummy weather information for a given location."""
    # 虚拟天气数据
    weather_conditions = [
        \{"condition": "Rainy", "temp_c": 15\},
        \{"condition": "Clear", "temp_c": 25\},
        \{"condition": "Windy", "temp_c": 20\}
    ]
    # 随机选择一种天气状况
    data = random.choice(weather_conditions)
    return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# 初始化工具
weather_info_tool = FunctionTool.from_defaults(get_weather_info)
```


```python
from langchain_core.tools import Tool
import random

def get_weather_info(location: str) -> str:
    """Fetches dummy weather information for a given location."""
    # 虚拟天气数据
    weather_conditions = [
        \{"condition": "Rainy", "temp_c": 15\},
        \{"condition": "Clear", "temp_c": 25\},
        \{"condition": "Windy", "temp_c": 20\}
    ]
    # 随机选择一种天气状况
    data = random.choice(weather_conditions)
    return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# 初始化工具
weather_info_tool = Tool(
    name="get_weather_info",
    func=get_weather_info,
    description="Fetches dummy weather information for a given location."
)
```


## 为有影响力的 AI 开发者创建 Hub 统计工具

出席此次盛会的都是 AI 开发者的精英。Alfred 希望通过讨论他们最受欢迎的模型、数据集和空间来给他们留下深刻印象。我们将创建一个工具，根据用户名从 Hugging Face Hub 获取模型统计数据。


```python
from smolagents import Tool
from huggingface_hub import list_models

class HubStatsTool(Tool):
    name = "hub_stats"
    description = "Fetches the most downloaded model from a specific author on the Hugging Face Hub."
    inputs = \{
        "author": \{
            "type": "string",
            "description": "The username of the model author/organization to find models from."
        \}
    \}
    output_type = "string"

    def forward(self, author: str):
        try:
            # 列出指定作者的模型，按下载次数排序
            models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))
            
            if models:
                model = models[0]
                return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
            else:
                return f"No models found for author \{author\}."
        except Exception as e:
            return f"Error fetching models for \{author\}: \{str(e)\}"

# 初始化工具
hub_stats_tool = HubStatsTool()

# 示例用法
print(hub_stats_tool("facebook")) # Example: Get the most downloaded model by Facebook
```

预期输出:

```
Facebook 下载次数最多的模型是 facebook/esmfold_v1，下载次数为 12,544,550 次。
```


```python
import random
from llama_index.core.tools import FunctionTool
from huggingface_hub import list_models

def get_hub_stats(author: str) -> str:
    """Fetches the most downloaded model from a specific author on the Hugging Face Hub."""
    try:
        # 列出指定作者的模型，按下载次数排序
        models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))

        if models:
            model = models[0]
            return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
        else:
            return f"No models found for author \{author\}."
    except Exception as e:
        return f"Error fetching models for \{author\}: \{str(e)\}"

# 初始化工具
hub_stats_tool = FunctionTool.from_defaults(get_hub_stats)

# 示例用法
print(hub_stats_tool("facebook")) # Example: Get the most downloaded model by Facebook
```

预期输出:

```
Facebook 下载次数最多的模型是 facebook/esmfold_v1，下载次数为 12,544,550 次。
```


```python
from langchain_core.tools import Tool
from huggingface_hub import list_models

def get_hub_stats(author: str) -> str:
    """Fetches the most downloaded model from a specific author on the Hugging Face Hub."""
    try:
        # 列出指定作者的模型，按下载次数排序
        models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))

        if models:
            model = models[0]
            return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
        else:
            return f"No models found for author \{author\}."
    except Exception as e:
        return f"Error fetching models for \{author\}: \{str(e)\}"

# 初始化工具
hub_stats_tool = Tool(
    name="get_hub_stats",
    func=get_hub_stats,
    description="Fetches the most downloaded model from a specific author on the Hugging Face Hub."
)

# 示例用法
print(hub_stats_tool.invoke("facebook")) # Example: Get the most downloaded model by Facebook
```

预期输出:

```
Facebook 下载次数最多的模型是 facebook/esmfold_v1，下载次数为 13,109,861 次。
```


借助 Hub Stats 工具，Alfred 现在可以通过讨论他们最受欢迎的模型来打动有影响力的 AI 开发者。

## 将工具与 Alfred 集成

现在我们已经拥有了所有工具，让我们将它们集成到 Alfred 的智能体中：


```python
from smolagents import CodeAgent, InferenceClientModel

# 初始化 Hugging Face 模型
model = InferenceClientModel()

# 使用所有工具创建 Alfred
alfred = CodeAgent(
    tools=[search_tool, weather_info_tool, hub_stats_tool], 
    model=model
)

# Alfred 在庆典期间可能会收到的示例查询
response = alfred.run("What is Facebook and what's their most popular model?")

print("🎩 Alfred's Response:")
print(response)
```

预期输出: 

```
🎩 Alfred's Response:
Facebook 是一个社交网站，用户可以在这里互相联系、分享信息并互动。Facebook 在 Hugging Face Hub 上下载次数最多的模型是 ESMFold_v1。
```


```python
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

# 初始化 Hugging Face 模型
llm = HuggingFaceInferenceAPI(model_name="Qwen/Qwen2.5-Coder-32B-Instruct")
# 使用所有工具创建 Alfred
alfred = AgentWorkflow.from_tools_or_functions(
    [search_tool, weather_info_tool, hub_stats_tool],
    llm=llm
)

# Alfred 在庆典期间可能会收到的示例查询
response = await alfred.run("What is Facebook and what's their most popular model?")

print("🎩 Alfred's Response:")
print(response)
```

预期输出: 

```
🎩 Alfred's Response:
Facebook 是一家总部位于加利福尼亚州门洛帕克的社交网络服务和科技公司。它由马克·扎克伯格创立，允许用户创建个人资料、与亲朋好友联系、分享照片和视频，以及加入基于共同兴趣的群组。Facebook 在 Hugging Face Hub 上最受欢迎的模型是“facebook/esmfold_v1”，下载量达 13,109,861 次。
```


```python
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import AnyMessage, HumanMessage, AIMessage
from langgraph.prebuilt import ToolNode
from langgraph.graph import START, StateGraph
from langgraph.prebuilt import tools_condition
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

# 生成聊天界面，包括工具
llm = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-Coder-32B-Instruct",
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
)

chat = ChatHuggingFace(llm=llm, verbose=True)
tools = [search_tool, weather_info_tool, hub_stats_tool]
chat_with_tools = chat.bind_tools(tools)

# 生成 AgentState 和 Agent 图
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]

def assistant(state: AgentState):
    return \{
        "messages": [chat_with_tools.invoke(state["messages"])],
    \}

## 构建流程图
builder = StateGraph(AgentState)

# 定义节点：这些节点完成工作
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))

# 定义边：这些决定了控制流如何移动
builder.add_edge(START, "assistant")
builder.add_conditional_edges(
    "assistant",
    # If the latest message requires a tool, route to tools
    # Otherwise, provide a direct response
    tools_condition,
)
builder.add_edge("tools", "assistant")
alfred = builder.compile()

messages = [HumanMessage(content="Who is Facebook and what's their most popular model?")]
response = alfred.invoke(\{"messages": messages\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```

预期输出:

```
🎩 Alfred's Response:
Facebook 是一家社交媒体公司，以其社交网站 Facebook 以及 Instagram 和 WhatsApp 等其他服务而闻名。Facebook 在 Hugging Face Hub 上下载次数最多的模型是 facebook/esmfold_v1，下载量达 13,202,321 次。
```

## 结论

通过集成这些工具，Alfred 现在可以处理各种任务，从网页搜索到天气更新和模型统计。这确保他始终是晚会上最了解情况、最有魅力的主持人。

> [!TIP]
> 尝试实现一个可用于获取特定主题最新消息的工具。
>
> 完成后，在 <code>tools.py</code> 文件中实现您的自定义工具。
