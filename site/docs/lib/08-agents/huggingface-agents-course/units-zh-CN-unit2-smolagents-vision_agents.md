---
title: "使用 smolagents 构建视觉智能体"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/smolagents/vision_agents.mdx"
sourceRel: "units/zh-CN/unit2/smolagents/vision_agents.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/smolagents/vision_agents.mdx"
sourceSha256: "2199f18cb4fe3d3dd7960dc1efc7072fd0e455bc33a12dbafea346bbe6112768"
pageSha256: "2199f18cb4fe3d3dd7960dc1efc7072fd0e455bc33a12dbafea346bbe6112768"
contentMode: "local-full"
zh: ""
---

# 使用 smolagents 构建视觉智能体

> [!WARNING]
> 本节示例需要接入强大的视觉语言模型（VLM）。我们使用 GPT-4o API 进行了测试。  
> 若需了解 smolagents 和 Hugging Face 支持的其他替代方案，请参考<a href="https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/smolagents/why_use_smolagents/README.md">为什么选择smolagents</a>章节。

赋予智能体视觉能力对于超越文本处理的任务至关重要。网页浏览、文档理解等现实场景都需要解析丰富的视觉内容。smolagents 内置支持视觉语言模型（VLMs），使智能体能够有效处理图像信息。

假设韦恩庄园的管家 Alfred 需要核验派对嘉宾身份。考虑到他可能无法识别所有来宾，我们可以构建基于 VLM 的智能体，通过视觉信息检索来辅助身份验证决策。以下是具体实现：


## 初始执行阶段提供图像

> [!TIP]
> 配套代码可在<a href="https://huggingface.co/agents-course/notebooks/blob/main/unit2/smolagents/vision_agents.ipynb" target="_blank">Google Colab 笔记本</a>中查看。

该方法在智能体启动时通过 task_images 参数传入图像，智能体在执行过程中持续处理这些图像。

假设 Alfred 需要核验超级英雄身份，他已有历史派对嘉宾图像数据库。

当新访客到来时，智能体可通过图像比对进行准入决策。

当前场景中，Alfred 怀疑访客可能是小丑假扮的神奇女侠。我们需要构建身份验证系统：

```python
from PIL import Image
import requests
from io import BytesIO

image_urls = [
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Joker_at_Wax_Museum_Plus.jpg", # 小丑图像
    "https://upload.wikimedia.org/wikipedia/en/9/98/Joker_%28DC_Comics_character%29.jpg" # 小丑图像
]

images = []
for url in image_urls:
    headers = \{
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" 
    \}
    response = requests.get(url,headers=headers)
    image = Image.open(BytesIO(response.content)).convert("RGB")
    images.append(image)
```

完成图像加载后，智能体将判断访客身份：究竟是超级英雄（Wonder Woman）还是反派角色（The Joker）。

```python
from smolagents import CodeAgent, OpenAIServerModel

model = OpenAIServerModel(model_id="gpt-4o")

# 实例化智能体
agent = CodeAgent(
    tools=[],
    model=model,
    max_steps=20,
    verbosity_level=2
)

response = agent.run(
    """
    Describe the costume and makeup that the comic character in these photos is wearing and return the description.
    Tell me if the guest is The Joker or Wonder Woman.
    """,
    images=images
)
```

以下是我的运行结果（实际输出可能因环境差异有所不同，正如前文所述）：

```python
    \{
        'Costume and Makeup - First Image': (
            'Purple coat and a purple silk-like cravat or tie over a mustard-yellow shirt.',
            'White face paint with exaggerated features, dark eyebrows, blue eye makeup, red lips forming a wide smile.'
        ),
        'Costume and Makeup - Second Image': (
            'Dark suit with a flower on the lapel, holding a playing card.',
            'Pale skin, green hair, very red lips with an exaggerated grin.'
        ),
        'Character Identity': 'This character resembles known depictions of The Joker from comic book media.'
    \}
```

在这种情况下，输出结果揭示了这个人正在冒充他人，因此我们可以阻止 The Joker 进入派对！

## 提供动态检索图像

> [!TIP]
> 您可以在 <a href="https://huggingface.co/agents-course/notebooks/blob/main/unit2/smolagents/vision_web_browser.py" target="_blank">这个 Python 文件</a> 中查看代码。

前面的方法具有很高的价值，并且有许多潜在的应用场景。然而，在客人不在数据库中的情况下，我们需要探索其他识别方式。一种可能的解决方案是从外部来源动态检索图像和信息，例如通过浏览网页获取详细信息。

在此方法中，图像是在执行过程中动态添加到智能体的记忆中的。我们知道，`smolagents` 中的智能体基于 `MultiStepAgent` 类，该类是 ReAct 框架的抽象。此类以结构化的周期运行，在不同阶段记录各种变量和知识：

1. **SystemPromptStep:** 存储系统提示。
2. **TaskStep:** 记录用户查询和提供的任何输入。
3. **ActionStep:** 捕获智能体操作和结果的日志。

这种结构化的方法使智能体能够动态地结合视觉信息，并对不断变化的任务做出适应性响应。以下是已经见过的图表，展示了动态工作流程过程以及不同步骤如何在智能体生命周期内集成。在浏览时，智能体可以截取屏幕截图并将其保存为 `ActionStep` 中的 `observation_images`。

![Dynamic image retrieval](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/smolagents-can-see/diagram_adding_vlms_smolagents.png)

现在我们理解了需求，让我们构建完整的示例。在这种情况下，Alfred 希望完全控制访客验证过程，因此浏览详情成为可行的解决方案。为了完成这个示例，我们需要为智能体提供一组新的工具。此外，我们将使用 Selenium 和 Helium，这些是浏览器自动化工具。这将使我们能够构建一个探索网络、搜索潜在访客详情并检索验证信息的智能体。让我们安装所需的工具：

```bash
pip install "smolagents[all]" helium selenium python-dotenv
```

我们需要一组专为浏览设计的智能体工具，例如“search_item_ctrl_f”、“go_back”和“close_popups”。这些工具允许智能体像浏览网页的人一样行事。

```python
@tool
def search_item_ctrl_f(text: str, nth_result: int = 1) -> str:
    """
    Searches for text on the current page via Ctrl + F and jumps to the nth occurrence.
    Args:
        text: The text to search for
        nth_result: Which occurrence to jump to (default: 1)
    """
    elements = driver.find_elements(By.XPATH, f"//*[contains(text(), '\{text\}')]")
    if nth_result > len(elements):
        raise Exception(f"Match n°\{nth_result\} not found (only \{len(elements)\} matches found)")
    result = f"Found \{len(elements)\} matches for '\{text\}'."
    elem = elements[nth_result - 1]
    driver.execute_script("arguments[0].scrollIntoView(true);", elem)
    result += f"Focused on element \{nth_result\} of \{len(elements)\}"
    return result


@tool
def go_back() -> None:
    """Goes back to previous page."""
    driver.back()


@tool
def close_popups() -> str:
    """
    Closes any visible modal or pop-up on the page. Use this to dismiss pop-up windows! This does not work on cookie consent banners.
    """
    webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()
```

我们还需要保存屏幕截图的功能，因为这是我们的 VLM 智能体完成任务时必不可少的一部分。此功能会捕获屏幕截图并将其保存在 `step_log.observations_images = [image.copy()]` 中，从而允许智能体在导航时动态存储和处理图像。

```python
def save_screenshot(step_log: ActionStep, agent: CodeAgent) -> None:
    sleep(1.0)  # 让 JavaScript 动画在截图之前完成
    driver = helium.get_driver()
    current_step = step_log.step_number
    if driver is not None:
        for step_logs in agent.logs:  # 从日志中删除先前的截图以进行精简处理
            if isinstance(step_log, ActionStep) and step_log.step_number <= current_step - 2:
                step_logs.observations_images = None
        png_bytes = driver.get_screenshot_as_png()
        image = Image.open(BytesIO(png_bytes))
        print(f"Captured a browser screenshot: \{image.size\} pixels")
        step_log.observations_images = [image.copy()]  # 创建副本以确保其持久保存，重要！!

    # 使用当前 URL 更新观察结果 
    url_info = f"Current url: \{driver.current_url\}"
    step_log.observations = url_info if step_logs.observations is None else step_log.observations + "\n" + url_info
    return
```

此函数作为 `step_callback` 传递给智能体，因为它在智能体执行的每一步结束时被触发。这使得智能体能够在整个过程中动态捕获和存储屏幕截图。

现在，我们可以生成用于浏览网页的视觉智能体，为其提供我们创建的工具，以及 `DuckDuckGoSearchTool` 以探索网页。此工具将帮助智能体根据视觉线索检索验证访客身份所需的信息。

```python
from smolagents import CodeAgent, OpenAIServerModel, DuckDuckGoSearchTool
model = OpenAIServerModel(model_id="gpt-4o")

agent = CodeAgent(
    tools=[DuckDuckGoSearchTool(), go_back, close_popups, search_item_ctrl_f],
    model=model,
    additional_authorized_imports=["helium"],
    step_callbacks=[save_screenshot],
    max_steps=20,
    verbosity_level=2,
)
```

有了这些，Alfred 准备检查访客的身份，并根据这些信息做出是否允许他们进入派对的明智决定：

```python
agent.run("""
I am Alfred, the butler of Wayne Manor, responsible for verifying the identity of guests at party. A superhero has arrived at the entrance claiming to be Wonder Woman, but I need to confirm if she is who she says she is.

Please search for images of Wonder Woman and generate a detailed visual description based on those images. Additionally, navigate to Wikipedia to gather key details about her appearance. With this information, I can determine whether to grant her access to the event.
""" + helium_instructions)
```

您可以看到，我们将 `helium_instructions` 作为任务的一部分包含在内。这个特殊的提示旨在控制智能体的导航，确保它在浏览网页时遵循正确的步骤。

让我们看看这在下面的视频中是如何工作的：

&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/rObJel7-OLc?si=TnNwQ8rqXqun_pqE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

这是最终输出：

```python
Final answer: Wonder Woman is typically depicted wearing a red and gold bustier, blue shorts or skirt with white stars, a golden tiara, silver bracelets, and a golden Lasso of Truth. She is Princess Diana of Themyscira, known as Diana Prince in the world of men.
```

通过这些步骤，我们成功地为派对创建了一个身份验证系统！ Alfred 现在拥有必要的工具，可以确保只有正确的宾客能够进入庄园。一切准备就绪，可以享受在韦恩庄园的美好时光！


## 进一步阅读

- [我们让 smolagents 有了视觉能力](https://huggingface.co/blog/smolagents-can-see) -  博客文章描述了视觉智能体的功能。
- [使用智能体进行网页浏览 🤖🌐](https://huggingface.co/docs/smolagents/examples/web_browser) - 使用视觉智能体进行网页浏览的示例。
- [网页浏览视觉智能体示例](https://github.com/huggingface/smolagents/blob/main/src/smolagents/vision_web_browser.py) - 使用视觉智能体进行网页浏览的示例。
