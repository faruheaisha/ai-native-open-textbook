---
title: "在 LlamaIndex 中创建智能工作流"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/workflows.mdx"
sourceRel: "units/zh-CN/unit2/llama-index/workflows.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/llama-index/workflows.mdx"
sourceSha256: "97fcd83fb6fe6ead2592166de3a4694be2f23e690f6cf7219493f52b65465596"
pageSha256: "97fcd83fb6fe6ead2592166de3a4694be2f23e690f6cf7219493f52b65465596"
contentMode: "local-full"
zh: ""
---

# 在 LlamaIndex 中创建智能工作流

LlamaIndex 中的工作流提供了一种结构化方式来将代码组织成可管理的顺序步骤。

这种工作流通过定义由`事件（Events）`触发的`步骤（Steps）`来创建，这些步骤本身也会发出`事件`来触发后续步骤。
让我们看看 Alfred 展示的用于 RAG 任务的 LlamaIndex 工作流。

![工作流示意图](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/llama-index/workflows.png)

**工作流具有以下关键优势：**

- 将代码清晰地组织为离散步骤
- 事件驱动架构实现灵活控制流
- 步骤间类型安全的通信
- 内置状态管理
- 支持简单和复杂的智能体交互

正如您可能猜到的，**工作流在保持对整体流程控制的同时，实现了智能体的自主性之间的完美平衡。**

现在让我们学习如何自己创建工作流！

## 创建工作流

> [!TIP]
> 您可以通过 <a href="https://huggingface.co/agents-course/notebooks/blob/main/unit2/llama-index/workflows.ipynb" target="_blank">这个笔记本</a> 中的代码进行实践，可使用 Google Colab 运行。

### 基础工作流创建

<details>
<summary>安装工作流包</summary>
如 [LlamaHub 章节](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/llama-hub/README.md) 介绍的，我们可以通过以下命令安装工作流包：

```python
pip install llama-index-utils-workflow
```
</details>

我们可以通过定义一个继承自 `Workflow` 的类并用 `@step` 装饰你的函数来创建一个单步工作流。
我们还需要添加 `StartEvent` 和 `StopEvent`，它们是用于指示工作流开始和结束的特殊事件。

```python
from llama_index.core.workflow import StartEvent, StopEvent, Workflow, step

class MyWorkflow(Workflow):
    @step
    async def my_step(self, ev: StartEvent) -> StopEvent:
        # do something here
        return StopEvent(result="Hello, world!")


w = MyWorkflow(timeout=10, verbose=False)
result = await w.run()
```

如您所见，我们现在可以通过调用“w.run()”来运行工作流程。

### 连接多个步骤

为了连接多个步骤，我们**创建在步骤之间传输数据的自定义事件**。
为此，我们需要添加一个在步骤之间传递的“事件”，并将第一步的输出传输到第二步。

```python
from llama_index.core.workflow import Event

class ProcessingEvent(Event):
    intermediate_result: str

class MultiStepWorkflow(Workflow):
    @step
    async def step_one(self, ev: StartEvent) -> ProcessingEvent:
        # Process initial data
        return ProcessingEvent(intermediate_result="Step 1 complete")

    @step
    async def step_two(self, ev: ProcessingEvent) -> StopEvent:
        # Use the intermediate result
        final_result = f"Finished processing: \{ev.intermediate_result\}"
        return StopEvent(result=final_result)

w = MultiStepWorkflow(timeout=10, verbose=False)
result = await w.run()
result
```

类型提示在这里很重要，因为它可以确保工作流正确执行。让我们把事情复杂化一点吧！

### 循环和分支

类型提示是工作流中最强大的部分，因为它允许我们创建分支、循环和连接以促进更复杂的工作流。

让我们展示一个使用联合运算符 `|` **创建循环** 的示例。
在下面的示例中，我们看到 `LoopEvent` 被作为步骤的输入，也可以作为输出返回。

```python
from llama_index.core.workflow import Event
import random


class ProcessingEvent(Event):
    intermediate_result: str


class LoopEvent(Event):
    loop_output: str


class MultiStepWorkflow(Workflow):
    @step
    async def step_one(self, ev: StartEvent | LoopEvent) -> ProcessingEvent | LoopEvent:
        if random.randint(0, 1) == 0:
            print("Bad thing happened")
            return LoopEvent(loop_output="Back to step one.")
        else:
            print("Good thing happened")
            return ProcessingEvent(intermediate_result="First step complete.")

    @step
    async def step_two(self, ev: ProcessingEvent) -> StopEvent:
        # Use the intermediate result
        final_result = f"Finished processing: \{ev.intermediate_result\}"
        return StopEvent(result=final_result)


w = MultiStepWorkflow(verbose=False)
result = await w.run()
result
```

### 绘制工作流程

我们还可以绘制工作流程。让我们使用 `draw_all_possible_flows` 函数来绘制工作流程。这会将工作流程存储在 HTML 文件中。

```python
from llama_index.utils.workflow import draw_all_possible_flows

w = ... # as defined in the previous section
draw_all_possible_flows(w, "flow.html")
```

![工作流程图](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/llama-index/workflow-draw.png)

课程中我们将介绍最后一个很酷的技巧，即向工作流添加状态的能力。

### 状态管理

当您想要跟踪工作流的状态时，状态管理非常有用，这样每个步骤都可以访问相同的状态。
我们可以在步骤函数中的参数上使用“上下文”类型提示来实现这一点。

```python
from llama_index.core.workflow import Context, StartEvent, StopEvent


@step
async def query(self, ctx: Context, ev: StartEvent) -> StopEvent:
    # 存储在上下文中
    await ctx.store.set("query", "What is the capital of France?")

    # 根据上下文和事件做某事
    val = ...

    # 从上下文中检索
    query = await ctx.store.get("query")

    return StopEvent(result=result)
```

太棒了！现在您知道如何在 LlamaIndex 中创建基本工作流了！

> [!TIP]
> 工作流还有一些更复杂的细微差别，您可以在<a href="https://docs.llamaindex.ai/en/stable/understanding/workflows/">LlamaIndex 文档</a>中了解。

但是，还有另一种创建工作流的方法，它依赖于 `AgentWorkflow` 类。让我们看看如何使用它来创建多智能体工作流。

## 使用多智能体工作流自动化工作流

我们可以使用**`AgentWorkflow` 类来创建多智能体工作流**，而无需手动创建工作流。
`AgentWorkflow` 使用工作流智能体，允许您创建一个或多个智能体的系统，这些智能体可以根据其专门功能进行协作并相互交接任务。
这可以构建复杂的智能体系统，其中不同的智能体处理任务的不同方面。
我们将从`llama_index.core.agent.workflow` 导入智能体类，而不是从`llama_index.core.agent` 导入类。
在`AgentWorkflow` 构造函数中，必须将一个智能体指定为根智能体。
当用户消息传入时，它首先被路由到根智能体。

然后每个智能体可以：

- 使用他们的工具直接处理请求
- 交接给更适合该任务的另一个智能体
- 向用户返回响应

让我们看看如何创建多智能体工作流。

```python
from llama_index.core.agent.workflow import AgentWorkflow, ReActAgent
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

# 定义一些工具
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

def multiply(a: int, b: int) -> int:
    """Multiply two numbers."""
    return a * b

llm = HuggingFaceInferenceAPI(model_name="Qwen/Qwen2.5-Coder-32B-Instruct")

# 我们可以直接传递函数，而无需 FunctionTool——fn/docstring 会被解析为名称/描述
multiply_agent = ReActAgent(
    name="multiply_agent",
    description="Is able to multiply two integers",
    system_prompt="A helpful assistant that can use a tool to multiply numbers.",
    tools=[multiply],
    llm=llm,
)

addition_agent = ReActAgent(
    name="add_agent",
    description="Is able to add two integers",
    system_prompt="A helpful assistant that can use a tool to add numbers.",
    tools=[add],
    llm=llm,
)

# 创建工作流
workflow = AgentWorkflow(
    agents=[multiply_agent, addition_agent],
    root_agent="multiply_agent",
)

# 运行系统
response = await workflow.run(user_msg="Can you add 5 and 3?")
```

智能体工具还可以修改我们前面提到的工作流状态。在启动工作流之前，我们可以提供一个可供所有智能体使用的初始状态字典。
状态存储在工作流上下文的 state 键中。它将被注入到 state_prompt 中，以增强每个新用户消息。

让我们通过修改前面的示例来注入一个计数器来计数函数调用：

```python
from llama_index.core.workflow import Context

# 定义一些工具
async def add(ctx: Context, a: int, b: int) -> int:
    """Add two numbers."""
    # update our count
    cur_state = await ctx.store.get("state")
    cur_state["num_fn_calls"] += 1
    await ctx.store.set("state", cur_state)

    return a + b

async def multiply(ctx: Context, a: int, b: int) -> int:
    """Multiply two numbers."""
    # update our count
    cur_state = await ctx.store.get("state")
    cur_state["num_fn_calls"] += 1
    await ctx.store.set("state", cur_state)

    return a * b

...

workflow = AgentWorkflow(
    agents=[multiply_agent, addition_agent],
    root_agent="multiply_agent"
    initial_state=\{"num_fn_calls": 0\},
    state_prompt="Current state: \{state\}. User message: \{msg\}",
)

# 使用上下文运行工作流程
ctx = Context(workflow)
response = await workflow.run(user_msg="Can you add 5 and 3?", ctx=ctx)

# 拉出并检查状态
state = await ctx.store.get("state")
print(state["num_fn_calls"])
```

恭喜！您现在已经掌握了 LlamaIndex 中 Agent 的基础知识！🎉

让我们继续进行最后一次测验来巩固您的知识！🚀
