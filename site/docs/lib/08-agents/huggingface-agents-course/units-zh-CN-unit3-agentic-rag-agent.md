---
title: "创建你的 Gala 智能体"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit3/agentic-rag/agent.mdx"
sourceRel: "units/zh-CN/unit3/agentic-rag/agent.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit3/agentic-rag/agent.mdx"
sourceSha256: "7effb528426f1b2a4f46e635f93555bcae36158da0a2a17fdd62310ddb26551d"
pageSha256: "7effb528426f1b2a4f46e635f93555bcae36158da0a2a17fdd62310ddb26551d"
contentMode: "local-full"
zh: ""
---

# 创建你的 Gala 智能体

现在我们已经为 Alfred 构建了所有必要组件，是时候将它们整合成一个完整的智能体来协助举办我们的奢华盛会了。

在本节中，我们将把宾客信息检索、网络搜索、天气信息和 Hub 统计工具整合成一个强大的智能体。

## 组装 Alfred：完整智能体

我们不需要重新实现之前章节创建的所有工具，只需从保存的tools.py和retriever.py模块中导入它们即可。

> [!TIP]
> 如果你尚未实现这些工具，请返回<a href="https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit3/agentic-rag/tools/README.md">工具</a>和<a href="https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit3/agentic-rag/invitees/README.md">检索器</a>章节进行实现，并将它们添加到`tools.py`和`retriever.py`文件中。

让我们从之前章节导入必要的库和工具：


```python
#  导入必要的库
import random
from smolagents import CodeAgent, InferenceClientModel

# 从自定义模块导入工具
from tools import DuckDuckGoSearchTool, WeatherInfoTool, HubStatsTool
from retriever import load_guest_dataset
```

现在让我们将所有工具组合成一个智能体：

```python
# 初始化 Hugging Face 模型
model = InferenceClientModel()

# 初始化网络搜索工具
search_tool = DuckDuckGoSearchTool()

#  初始化天气工具
weather_info_tool = WeatherInfoTool()

# 初始化 Hub 统计工具
hub_stats_tool = HubStatsTool()

# 加载宾客数据集并初始化宾客信息工具
guest_info_tool = load_guest_dataset()

# 创建包含所有工具的 Alfred
alfred = CodeAgent(
    tools=[guest_info_tool, weather_info_tool, hub_stats_tool, search_tool], 
    model=model,
    add_base_tools=True,  # 添加额外的基础工具
    planning_interval=3    # 每 3 步启用规划
)
```


```python
# 导入必要库
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

from tools import search_tool, weather_info_tool, hub_stats_tool
from retriever import guest_info_tool
```

Now, let's combine all these tools into a single agent:

```python
# 初始化 Hugging Face 模型
llm = HuggingFaceInferenceAPI(model_name="Qwen/Qwen2.5-Coder-32B-Instruct")

# 创建包含所有工具的 Alfred
alfred = AgentWorkflow.from_tools_or_functions(
    [guest_info_tool, search_tool, weather_info_tool, hub_stats_tool],
    llm=llm,
)
```


```python
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import AnyMessage, HumanMessage, AIMessage
from langgraph.prebuilt import ToolNode
from langgraph.graph import START, StateGraph
from langgraph.prebuilt import tools_condition
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

from tools import DuckDuckGoSearchRun, weather_info_tool, hub_stats_tool
from retriever import guest_info_tool
```

现在将所有工具整合到单一智能体：

```python
# 初始化网络搜索工具
search_tool = DuckDuckGoSearchRun()

# 生成包含工具的聊天接口
llm = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-Coder-32B-Instruct",
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
)

chat = ChatHuggingFace(llm=llm, verbose=True)
tools = [guest_info_tool, search_tool, weather_info_tool, hub_stats_tool]
chat_with_tools = chat.bind_tools(tools)

# 生成 AgentState 和 Agent 图
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]

def assistant(state: AgentState):
    return \{
        "messages": [chat_with_tools.invoke(state["messages"])],
    \}

##  构建流程图
builder = StateGraph(AgentState)

# 定义节点：执行具体工作
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))

# 定义边：控制流程走向
builder.add_edge(START, "assistant")
builder.add_conditional_edges(
    "assistant",
    # 如果最新消息需要工具调用，则路由到 tools 节点
    # 否则直接响应
    tools_condition,
)
builder.add_edge("tools", "assistant")
alfred = builder.compile()
```

您的智能体现已准备就绪！

## 使用 Alfred：端到端示例

现在 Alfred 已配备所有必要工具，让我们看看他如何协助处理晚会中的各种任务。

### 示例 1：查找嘉宾信息

展示 Alfred 如何协助获取嘉宾信息：


```python
query = "Tell me about 'Lady Ada Lovelace'"
response = alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
根据检索到的信息，Ada Lovelace 女士是位备受尊敬的数学家兼好友。她因在数学和计算领域的开创性工作而闻名，常因其在 Charles Babbage 分析机方面的工作被誉为第一位计算机程序员。她的电子邮箱是 ada.lovelace@example.com。
```


```python
query = "Tell me about Lady Ada Lovelace. What's her background?"
response = await alfred.run(query)

print("🎩 Alfred's Response:")
print(response.response.blocks[0].text)
```

预期输出：

```
🎩 Alfred's Response:
Ada Lovelace 女士是英国数学家和作家，以她在 Charles Babbage 分析机方面的工作闻名。她是第一个认识到该机器具有纯计算之外应用潜力的人。
```


```python
response = alfred.invoke(\{"messages": "Tell me about 'Lady Ada Lovelace'"\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```

预期输出：

```
🎩 Alfred's Response:
Ada Lovelace，全名 Augusta Ada King，洛夫莱斯伯爵夫人，是英国数学家和作家。出生于 1815 年 12 月 10 日，逝世于 1852 年 11 月 27 日，她因在 Charles Babbage 提出的机械通用计算机分析机方面的工作而闻名。Ada Lovelace 被誉为第一位计算机程序员，因为她于 1843 年为分析机创建了程序。她认识到该机器的用途不仅限于计算，这种远见在当时极为罕见。她对计算机科学领域的贡献为未来发展奠定了基础。每年十月设立的 Ada Lovelace 日正是为了纪念她在科技领域的开创性工作，激励女性在 STEM 领域的发展。
```



### 示例 2：烟花天气核查

展示 Alfred 如何协助天气查询：


```python
query = "What's the weather like in Paris tonight? Will it be suitable for our fireworks display?"
response = alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出（存在随机性差异）：
```
🎩 Alfred's Response:
已为您查询巴黎天气。当前天气晴朗，气温 25°C。这样的条件非常适合今晚的烟花表演。晴朗的夜空将为壮观表演提供绝佳能见度，舒适的温度也能确保宾客们愉快享受户外活动。
```


```python
query = "What's the weather like in Paris tonight? Will it be suitable for our fireworks display?"
response = await alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
巴黎今夜有雨，气温 15°C。考虑到降雨情况，可能不适宜进行烟花表演。
```


```python
response = alfred.invoke(\{"messages": "What's the weather like in Paris tonight? Will it be suitable for our fireworks display?"\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```

预期输出：

```
🎩 Alfred's Response:
巴黎今夜有雨且气温 15°C，可能不适宜您的烟花表演计划。
```

### 示例 3：给 AI 研究者留下深刻印象

展示 Alfred 如何协助与 AI 研究者互动：


```python
query = "One of our guests is from Qwen. What can you tell me about their most popular model?"
response = alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
Qwen 最受欢迎的模型是 Qwen/Qwen2.5-VL-7B-Instruct，下载量达 3,313,345 次。
```

```python
query = "One of our guests is from Google. What can you tell me about their most popular model?"
response = await alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
Hugging Face Hub 上 Google 最受欢迎的模型是 google/electra-base-discriminator，下载量达 28,546,752 次。
```


```python
response = alfred.invoke(\{"messages": "One of our guests is from Qwen. What can you tell me about their most popular model?"\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```

预期输出：

```
🎩 Alfred's Response:
Qwen 下载量最高的模型是 Qwen/Qwen2.5-VL-7B-Instruct，下载量达 3,313,345 次。
```

### 示例 4：组合多工具应用

展示 Alfred 如何协助准备与 Nikola Tesla 博士的对话：



```python
query = "I need to speak with Dr. Nikola Tesla about recent advancements in wireless energy. Can you help me prepare for this conversation?"
response = alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
我已收集信息帮助您准备与 Nikola Tesla 博士的对话。

嘉宾信息：
姓名：Dr. Nikola Tesla
关系：大学时期的老友
描述：他是您大学时期的老友，最近刚获得新型无线能量传输系统的专利，非常乐意与您讨论。请记住他对鸽子情有独钟，这可能是很好的闲聊话题。
邮箱：nikola.tesla@gmail.com

无线能源最新进展：
根据网络搜索，以下是无线能量传输领域的最新发展：
1. 研究人员在使用聚焦电磁波进行远距离无线输电方面取得进展
2. 多家公司正在开发用于消费电子的谐振感应耦合技术 
3. 无物理连接的电动汽车充电新应用

对话切入点：
1. "我很想听听您关于无线能量传输新专利的情况，与大学时期的原始概念相比有何改进？"
2. "您是否关注近期消费电子谐振感应耦合技术的发展？对他们的方法有何看法？"
3. "您的鸽子最近好吗？我记得您对它们特别着迷"

这些内容将为您与 Tesla 博士的对话提供充足话题，同时展现您对他兴趣领域和专业发展的了解。
```


```python
query = "I need to speak with Dr. Nikola Tesla about recent advancements in wireless energy. Can you help me prepare for this conversation?"
response = await alfred.run(query)

print("🎩 Alfred's Response:")
print(response)
```

预期输出：

```
🎩 Alfred's Response:
以下是您与 Nikola Tesla 博士讨论无线能源时可能有用的最新进展：

1. **无线电力传输的进展与挑战**：本文讨论无线电力传输（WPT）从传统有线方式到现代应用（包括太空太阳能电站）的演变，重点介绍微波技术的初期应用及当前电子设备兴起带来的需求。

2. **面向体表电子设备的无线能量传输技术新进展**：探索无线能量传输（WET）作为无电池/导线供电方案的潜力，讨论其优势及潜在应用场景。

3. **无线电力传输与能量收集：现状与未来趋势**：概述无线供能方法的最新进展，包括能量收集和无线输电技术，展示多个前景应用并探讨领域未来趋势。

4. **无线电力传输：应用、挑战与障碍**
```


```python
response = alfred.invoke(\{"messages":"I need to speak with 'Dr. Nikola Tesla' about recent advancements in wireless energy. Can you help me prepare for this conversation?"\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```

预期输出：

```
根据提供的信息，以下是准备与 'Dr. Nikola Tesla' 讨论无线能源最新进展的关键要点：
1. **无线电力传输 (WPT)**：探讨如何通过消除线缆需求并利用感应和谐振耦合机制革新能量传输
2. **无线充电进展**：强调效率提升、更快充电速度及 Qi/Qi2 认证解决方案的兴起
3. **5G-Advanced 创新与 NearLink 协议**：作为提升无线网络速度、安全性和效率的技术，可支持先进无线能源应用
4. **边缘 AI/ML**：讨论人工智能如何依赖无线网络实现边缘智能化，提升智能家居自动化水平
5. **Matter 标准与安全增强**：作为推动 IoT 设备连接效率和安全性提升的关键创新
6. **无线充电技术突破**：包括仁川国立大学等机构的最新研究成果
```

## 高级功能：对话记忆

为了让 Alfred 在晚会中更智能，我们可以启用对话记忆功能使其记住先前交流：


```python
# 创建带记忆的 Alfred
alfred_with_memory = CodeAgent(
    tools=[guest_info_tool, weather_info_tool, hub_stats_tool, search_tool], 
    model=model,
    add_base_tools=True,
    planning_interval=3
)

# 首次交互
response1 = alfred_with_memory.run("Tell me about Lady Ada Lovelace.")
print("🎩 Alfred's First Response:")
print(response1)

# 二次交互（引用首次内容）
response2 = alfred_with_memory.run("What projects is she currently working on?", reset=False)
print("🎩 Alfred's Second Response:")
print(response2)
```


```python
from llama_index.core.workflow import Context

alfred = AgentWorkflow.from_tools_or_functions(
    [guest_info_tool, search_tool, weather_info_tool, hub_stats_tool],
    llm=llm
)

# 记忆状态
ctx = Context(alfred)

# 首次交互
response1 = await alfred.run("Tell me about Lady Ada Lovelace.", ctx=ctx)
print("🎩 Alfred's First Response:")
print(response1)

# 二次交互（引用首次内容）
response2 = await alfred.run("What projects is she currently working on?", ctx=ctx)
print("🎩 Alfred's Second Response:")
print(response2)
```


```python
# 首次交互
response = alfred.invoke(\{"messages": [HumanMessage(content="Tell me about 'Lady Ada Lovelace'. What's her background and how is she related to me?")]\})


print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
print()

# 二次交互（引用首次内容）
response = alfred.invoke(\{"messages": response["messages"] + [HumanMessage(content="What projects is she currently working on?")]\})

print("🎩 Alfred's Response:")
print(response['messages'][-1].content)
```


注意到这三种智能体框架都没有直接集成记忆模块，这种设计有何特殊考量？🧐
* smolagents：记忆在不同执行周期中不保留，需通过 reset=False 显式声明
* LlamaIndex: 需显式添加 context 对象进行运行周期内的记忆管理
* LangGraph: 提供检索历史消息选项或专用 [MemorySaver](https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-3-adding-memory-to-the-chatbot) 组件

## 结语

恭喜！您已成功构建 Alfred——配备多种工具的智能体助手，可协助举办本世纪最盛大的晚会。Alfred 现在能够：

1. 检索嘉宾详细信息
2. 核查天气条件规划户外活动
3. 提供顶尖 AI 开发者及其模型洞察
4. 网络搜索最新资讯
5. 通过记忆维持对话上下文

凭借这些能力，Alfred 已准备就绪，确保您的晚会取得圆满成功，通过个性化服务和实时信息给宾客留下深刻印象。
