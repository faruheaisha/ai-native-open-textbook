---
title: "Building and Integrating Tools for Your Agent"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit3/agentic-rag/tools.mdx"
sourceRel: "units/en/unit3/agentic-rag/tools.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/en/unit3/agentic-rag/tools.mdx"
sourceSha256: "60c31dd566309dec5492cdd391fa3be9517d13bc455b7e9204debf6bd2215d5b"
pageSha256: "60c31dd566309dec5492cdd391fa3be9517d13bc455b7e9204debf6bd2215d5b"
contentMode: "local-full"
zh: ""
---

# Building and Integrating Tools for Your Agent

In this section, we'll grant Alfred access to the web, enabling him to find the latest news and global updates. 
Additionally, he'll have access to weather data and Hugging Face hub model download statistics, so that he can make relevant conversation about fresh topics.

## Give Your Agent Access to the Web

Remember that we want Alfred to establish his presence as a true renaissance host, with a deep knowledge of the world.

To do so, we need to make sure that Alfred has access to the latest news and information about the world.

Let's start by creating a web search tool for Alfred!


```python
from smolagents import DuckDuckGoSearchTool

# Initialize the DuckDuckGo search tool
search_tool = DuckDuckGoSearchTool()

# Example usage
results = search_tool("Who's the current President of France?")
print(results)
```

Expected output:

```
The current President of France in Emmanuel Macron.
```



```python
from llama_index.tools.duckduckgo import DuckDuckGoSearchToolSpec
from llama_index.core.tools import FunctionTool

# Initialize the DuckDuckGo search tool
tool_spec = DuckDuckGoSearchToolSpec()

search_tool = FunctionTool.from_defaults(tool_spec.duckduckgo_full_search)
# Example usage
response = search_tool("Who's the current President of France?")
print(response.raw_output[-1]['body'])
```

Expected output:

```
The President of the French Republic is the head of state of France. The current President is Emmanuel Macron since 14 May 2017 defeating Marine Le Pen in the second round of the presidential election on 7 May 2017. List of French presidents (Fifth Republic) N° Portrait Name ...
```


```python
from langchain_community.tools import DuckDuckGoSearchRun

search_tool = DuckDuckGoSearchRun()
results = search_tool.invoke("Who's the current President of France?")
print(results)
```

Expected output:

```
Emmanuel Macron (born December 21, 1977, Amiens, France) is a French banker and politician who was elected president of France in 2017...
```


## Creating a Custom Tool for Weather Information to Schedule the Fireworks

The perfect gala would have fireworks over a clear sky, we need to make sure the fireworks are not cancelled due to bad weather.

Let's create a custom tool that can be used to call an external weather API and get the weather information for a given location.

> [!TIP]
> For the sake of simplicity, we're using a dummy weather API for this example. If you want to use a real weather API, you could implement a weather tool that uses the OpenWeatherMap API, like in <a href="https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit1/tutorial/README.md">Unit 1</a>.


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
        # Dummy weather data
        weather_conditions = [
            \{"condition": "Rainy", "temp_c": 15\},
            \{"condition": "Clear", "temp_c": 25\},
            \{"condition": "Windy", "temp_c": 20\}
        ]
        # Randomly select a weather condition
        data = random.choice(weather_conditions)
        return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# Initialize the tool
weather_info_tool = WeatherInfoTool()
```


```python
import random
from llama_index.core.tools import FunctionTool

def get_weather_info(location: str) -> str:
    """Fetches dummy weather information for a given location."""
    # Dummy weather data
    weather_conditions = [
        \{"condition": "Rainy", "temp_c": 15\},
        \{"condition": "Clear", "temp_c": 25\},
        \{"condition": "Windy", "temp_c": 20\}
    ]
    # Randomly select a weather condition
    data = random.choice(weather_conditions)
    return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# Initialize the tool
weather_info_tool = FunctionTool.from_defaults(get_weather_info)
```


```python
from langchain_core.tools import Tool
import random

def get_weather_info(location: str) -> str:
    """Fetches dummy weather information for a given location."""
    # Dummy weather data
    weather_conditions = [
        \{"condition": "Rainy", "temp_c": 15\},
        \{"condition": "Clear", "temp_c": 25\},
        \{"condition": "Windy", "temp_c": 20\}
    ]
    # Randomly select a weather condition
    data = random.choice(weather_conditions)
    return f"Weather in \{location\}: \{data['condition']\}, \{data['temp_c']\}°C"

# Initialize the tool
weather_info_tool = Tool(
    name="get_weather_info",
    func=get_weather_info,
    description="Fetches dummy weather information for a given location."
)
```


## Creating a Hub Stats Tool for Influential AI Builders

In attendance at the gala are the who's who of AI builders. Alfred wants to impress them by discussing their most popular models, datasets, and spaces. We'll create a tool to fetch model statistics from the Hugging Face Hub based on a username.


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
            # List models from the specified author, sorted by downloads
            models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))
            
            if models:
                model = models[0]
                return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
            else:
                return f"No models found for author \{author\}."
        except Exception as e:
            return f"Error fetching models for \{author\}: \{str(e)\}"

# Initialize the tool
hub_stats_tool = HubStatsTool()

# Example usage
print(hub_stats_tool("facebook")) # Example: Get the most downloaded model by Facebook
```

Expected output:

```
The most downloaded model by facebook is facebook/esmfold_v1 with 12,544,550 downloads.
```


```python
import random
from llama_index.core.tools import FunctionTool
from huggingface_hub import list_models

def get_hub_stats(author: str) -> str:
    """Fetches the most downloaded model from a specific author on the Hugging Face Hub."""
    try:
        # List models from the specified author, sorted by downloads
        models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))

        if models:
            model = models[0]
            return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
        else:
            return f"No models found for author \{author\}."
    except Exception as e:
        return f"Error fetching models for \{author\}: \{str(e)\}"

# Initialize the tool
hub_stats_tool = FunctionTool.from_defaults(get_hub_stats)

# Example usage
print(hub_stats_tool("facebook")) # Example: Get the most downloaded model by Facebook
```

Expected output:

```
The most downloaded model by facebook is facebook/esmfold_v1 with 12,544,550 downloads.
```


```python
from langchain_core.tools import Tool
from huggingface_hub import list_models

def get_hub_stats(author: str) -> str:
    """Fetches the most downloaded model from a specific author on the Hugging Face Hub."""
    try:
        # List models from the specified author, sorted by downloads
        models = list(list_models(author=author, sort="downloads", direction=-1, limit=1))

        if models:
            model = models[0]
            return f"The most downloaded model by \{author\} is \{model.id\} with \{model.downloads:,\} downloads."
        else:
            return f"No models found for author \{author\}."
    except Exception as e:
        return f"Error fetching models for \{author\}: \{str(e)\}"

# Initialize the tool
hub_stats_tool = Tool(
    name="get_hub_stats",
    func=get_hub_stats,
    description="Fetches the most downloaded model from a specific author on the Hugging Face Hub."
)

# Example usage
print(hub_stats_tool.invoke("facebook")) # Example: Get the most downloaded model by Facebook
```

Expected output:

```
The most downloaded model by facebook is facebook/esmfold_v1 with 13,109,861 downloads.
```


With the Hub Stats Tool, Alfred can now impress influential AI builders by discussing their most popular models.

## Integrating Tools with Alfred

Now that we have all the tools, let's integrate them into Alfred's agent:


```python
from smolagents import CodeAgent, InferenceClientModel

# Initialize the Hugging Face model
model = InferenceClientModel()

# Create Alfred with all the tools
alfred = CodeAgent(
    tools=[search_tool, weather_info_tool, hub_stats_tool], 
    model=model
)

# Example query Alfred might receive during the gala
response = alfred.run("What is Facebook and what's their most popular model?")

print("🎩 Alfred's Response:")
print(response)
```

Expected output: 

```
🎩 Alfred's Response:
Facebook is a social networking website where users can connect, share information, and interact with others. The most downloaded model by Facebook on the Hugging Face Hub is ESMFold_v1.
```


```python
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

# Initialize the Hugging Face model
llm = HuggingFaceInferenceAPI(model_name="Qwen/Qwen2.5-Coder-32B-Instruct")
# Create Alfred with all the tools
alfred = AgentWorkflow.from_tools_or_functions(
    [search_tool, weather_info_tool, hub_stats_tool],
    llm=llm
)

# Example query Alfred might receive during the gala
response = await alfred.run("What is Facebook and what's their most popular model?")

print("🎩 Alfred's Response:")
print(response)
```

Expected output: 

```
🎩 Alfred's Response:
Facebook is a social networking service and technology company based in Menlo Park, California. It was founded by Mark Zuckerberg and allows people to create profiles, connect with friends and family, share photos and videos, and join groups based on shared interests. The most popular model by Facebook on the Hugging Face Hub is `facebook/esmfold_v1` with 13,109,861 downloads.
```


```python
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import AnyMessage, HumanMessage, AIMessage
from langgraph.prebuilt import ToolNode
from langgraph.graph import START, StateGraph
from langgraph.prebuilt import tools_condition
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

# Generate the chat interface, including the tools
llm = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-Coder-32B-Instruct",
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
)

chat = ChatHuggingFace(llm=llm, verbose=True)
tools = [search_tool, weather_info_tool, hub_stats_tool]
chat_with_tools = chat.bind_tools(tools)

# Generate the AgentState and Agent graph
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]

def assistant(state: AgentState):
    return \{
        "messages": [chat_with_tools.invoke(state["messages"])],
    \}

## The graph
builder = StateGraph(AgentState)

# Define nodes: these do the work
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))

# Define edges: these determine how the control flow moves
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

Expected output:

```
🎩 Alfred's Response:
Facebook is a social media company known for its social networking site, Facebook, as well as other services like Instagram and WhatsApp. The most downloaded model by Facebook on the Hugging Face Hub is facebook/esmfold_v1 with 13,202,321 downloads.
```

## Conclusion

By integrating these tools, Alfred is now equipped to handle a variety of tasks, from web searches to weather updates and model statistics. This ensures he remains the most informed and engaging host at the gala.

> [!TIP]
> Try implementing a tool that can be used to get the latest news about a specific topic.
>
> When you're done, implement your custom tools in the <code>tools.py</code> file.
