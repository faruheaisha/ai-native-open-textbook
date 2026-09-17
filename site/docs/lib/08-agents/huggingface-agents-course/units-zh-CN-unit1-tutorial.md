---
title: "使用 smolagents 创建我们的第一个智能体"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit1/tutorial.mdx"
sourceRel: "units/zh-CN/unit1/tutorial.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit1/tutorial.mdx"
sourceSha256: "4c0e51d3e901a5ec2e5319b8a3c7269fb7a97ddb877061c44a502b03e900e9d0"
pageSha256: "4c0e51d3e901a5ec2e5319b8a3c7269fb7a97ddb877061c44a502b03e900e9d0"
contentMode: "local-full"
zh: ""
---

# 使用 smolagents 创建我们的第一个智能体

在上一节中，我们学习了如何使用 Python 代码从头开始创建智能体，并且我们**看到了这个过程是多么繁琐**。幸运的是，许多智能体库通过**为你处理大量繁重的工作**来简化这项工作。

在本教程中，**你将创建你的第一个智能体**，它能够执行图像生成、网络搜索、时区检查等更多操作！

你还将把你的智能体**发布到 Hugging Face Space 上，以便与朋友和同事分享**。

让我们开始吧！

## 什么是 smolagents？

  src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit1/smolagents.png"
  alt="smolagents"
/>

为了创建这个智能体，我们将使用 `smolagents`，这是一个**提供轻松开发智能体框架的库**。

这个轻量级库设计简洁，但它抽象了构建智能体的许多复杂性，使你能够专注于设计智能体的行为。

我们将在下一个单元中深入了解 smolagents。同时，你也可以查看这篇<a href="https://huggingface.co/blog/smolagents" target="_blank">博客文章</a>或该库的<a href="https://github.com/huggingface/smolagents" target="_blank">GitHub 仓库</a>。

简而言之，`smolagents` 是一个专注于 **codeAgent** 的库，codeAgent 是一种通过代码块执行**“操作”**，然后通过执行代码**“观察”**结果的智能体。

以下是我们将构建的一个示例！

我们为我们的智能体提供了一个**图像生成工具**，并要求它生成一张猫的图片。

`smolagents` 中的智能体将具有**与我们之前构建的自定义智能体相同的行为**：它将**以循环的方式思考、行动和观察**，直到得出最终答案：

&lt;iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/PQDKcWiuln4?si=ysSTDZoi8y55FVvA"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
>

很令人兴奋，对吧？

## 让我们来构建我们的智能体！

首先，复制这个 Space：<a href="https://huggingface.co/spaces/agents-course/First_agent_template" target="_blank">https://huggingface.co/spaces/agents-course/First_agent_template</a>

> 感谢 <a href="https://huggingface.co/m-ric" target="_blank">Aymeric</a> 提供的这个模板！🙌

复制这个 Space 意味着**在你的个人资料中创建一个本地副本**：

  src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit1/duplicate-space.gif"
  alt="复制"
/>

复制这个 Space 之后，**你需要添加你的 Hugging Face API token**，以便你的**智能体**可以调用模型 API。

1. 首先，从[ https://hf.co/settings/tokens ](https://hf.co/settings/tokens)获取一个具有**推理权限**的 token，第 4 步需要用到。如果你已经有了，可以跳过此步。
2. 进入你的主页，找到刚才复制的空间，点击**设置**按钮。
3. 向下滚动到**变量和密钥**部分，点击**新建密钥**。
4. 创建一个名为**HF_TOKEN**的密钥，值为第一步获取到的 token。
5. 点击**保存**。

在整个课程中，你唯一需要修改的文件是当前不完整的**"app.py"**。你可以在这里查看[模板中的原始文件](https://huggingface.co/spaces/agents-course/First_agent_template/blob/main/app.py)。要找到你的文件，请进入你复制的 Space，然后点击 `Files` 选项卡，再在目录列表中点击 `app.py`。

让我们一起分解代码：

- 文件开头是一些简单但必要的库导入

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel, load_tool, tool
import datetime
import requests
import pytz
import yaml
from tools.final_answer import FinalAnswerTool
```

正如之前所述，我们将直接使用 **smolagents** 中的 **CodeAgent** 类。

### Tool（工具）

现在让我们来了解一下工具！如果你需要回顾一下工具的相关内容，请随时回到课程的[工具](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit1/tools/README.md)部分。

```python
@tool
def my_custom_tool(arg1:str, arg2:int)-> str: # it's important to specify the return type
    # Keep this format for the tool description / args description but feel free to modify the tool
    """A tool that does nothing yet
    Args:
        arg1: the first argument
        arg2: the second argument
    """
    return "What magic will you build ?"

@tool
def get_current_time_in_timezone(timezone: str) -> str:
    """A tool that fetches the current local time in a specified timezone.
    Args:
        timezone: A string representing a valid timezone (e.g., 'America/New_York').
    """
    try:
        # Create timezone object
        tz = pytz.timezone(timezone)
        # Get current time in that timezone
        local_time = datetime.datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
        return f"The current local time in \{timezone\} is: \{local_time\}"
    except Exception as e:
        return f"Error fetching time for timezone '\{timezone\}': \{str(e)\}"
```

这些工具是我们在这个部分鼓励你构建的东西！我们给你两个例子：

1. 一个**不工作的虚拟工具**，你可以修改它来制作一些有用的东西。
2. 一个**实际工作的工具**，它可以获取世界某地的当前时间。

要定义你的工具，重要的是：

1. 为你的函数提供输入和输出类型，例如 `get_current_time_in_timezone(timezone: str) -> str:`
2. **格式良好的文档字符串**。`smolagents` 期望所有参数在文档字符串中都有**文字描述**。

### The Agent（智能体）

它使用 [`Qwen/Qwen2.5-Coder-32B-Instruct`](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct) 作为 LLM 引擎。这是一个非常强大的模型，我们将通过无服务器 API 访问它。

```python
final_answer = FinalAnswerTool()
model = InferenceClientModel(
    max_tokens=2096,
    temperature=0.5,
    model_id='Qwen/Qwen2.5-Coder-32B-Instruct',
    custom_role_conversions=None,
)

with open("prompts.yaml", 'r') as stream:
    prompt_templates = yaml.safe_load(stream)

# We're creating our CodeAgent
agent = CodeAgent(
    model=model,
    tools=[final_answer], # add your tools here (don't remove final_answer)
    max_steps=6,
    verbosity_level=1,
    grammar=None,
    planning_interval=None,
    name=None,
    description=None,
    prompt_templates=prompt_templates
)

GradioUI(agent).launch()
```

这个智能体仍在使用我们在前面部分中看到的`InferenceClient`，它位于**InferenceClientModel**类的背后！

当我们介绍 Unit 2 中的框架时，我们会给出更深入的例子。目前，你需要专注于通过智能体的`tools`参数**向工具列表中添加新工具**。

例如，你可以使用代码第一行导入的`DuckDuckGoSearchTool`，或者你可以检查稍后从 Hub 加载的`image_generation_tool`。

**添加工具将赋予你的智能体新的能力**，在这里尝试发挥创意吧！

完整的"app.py"：

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel, load_tool, tool
import datetime
import requests
import pytz
import yaml
from tools.final_answer import FinalAnswerTool

from Gradio_UI import GradioUI

# Below is an example of a tool that does nothing. Amaze us with your creativity!
@tool
def my_custom_tool(arg1:str, arg2:int)-> str: # it's important to specify the return type
    # Keep this format for the tool description / args description but feel free to modify the tool
    """A tool that does nothing yet
    Args:
        arg1: the first argument
        arg2: the second argument
    """
    return "What magic will you build ?"

@tool
def get_current_time_in_timezone(timezone: str) -> str:
    """A tool that fetches the current local time in a specified timezone.
    Args:
        timezone: A string representing a valid timezone (e.g., 'America/New_York').
    """
    try:
        # Create timezone object
        tz = pytz.timezone(timezone)
        # Get current time in that timezone
        local_time = datetime.datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
        return f"The current local time in \{timezone\} is: \{local_time\}"
    except Exception as e:
        return f"Error fetching time for timezone '\{timezone\}': \{str(e)\}"


final_answer = FinalAnswerTool()
model = InferenceClientModel(
    max_tokens=2096,
    temperature=0.5,
    model_id='Qwen/Qwen2.5-Coder-32B-Instruct',
    custom_role_conversions=None,
)


# Import tool from Hub
image_generation_tool = load_tool("agents-course/text-to-image", trust_remote_code=True)

with open("prompts.yaml", 'r') as stream:
    prompt_templates = yaml.safe_load(stream)

agent = CodeAgent(
    model=model,
    tools=[final_answer], # add your tools here (don't remove final_answer)
    max_steps=6,
    verbosity_level=1,
    grammar=None,
    planning_interval=None,
    name=None,
    description=None,
    prompt_templates=prompt_templates
)


GradioUI(agent).launch()
```

你的**目标**是熟悉 Space 和智能体。

目前，模板中的智能体**没有使用任何工具，所以尝试为它提供一些预制的工具，甚至自己动手制作一些新工具！**

我们非常期待在 Discord 频道 **#agents-course-showcase** 中看到你的精彩智能体成果！

---

恭喜你，你已经构建了你的第一个智能体！不要犹豫，与你的朋友和同事分享吧。

由于这是你的第一次尝试，如果有点小问题或速度有点慢，这是完全正常的。在未来的单元中，我们将学习如何构建更好的智能体。

最好的学习方法是尝试，所以不要犹豫，去更新它，添加更多工具，尝试使用另一个模型，等等。

在下一节中，你将完成最后的测验并获得证书！
