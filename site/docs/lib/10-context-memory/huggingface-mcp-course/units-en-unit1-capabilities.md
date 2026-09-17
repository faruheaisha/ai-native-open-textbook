---
title: "Understanding MCP Capabilities"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/capabilities.mdx"
sourceRel: "units/en/unit1/capabilities.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/capabilities.mdx"
sourceSha256: "ef43bb78affe38fcda1a07b56f5e50199f642ff7c43c8ff1cde406b3db991ce4"
pageSha256: "ef43bb78affe38fcda1a07b56f5e50199f642ff7c43c8ff1cde406b3db991ce4"
contentMode: "local-full"
zh: "on"
---

# Understanding MCP Capabilities

MCP Servers expose a variety of capabilities to Clients through the communication protocol. These capabilities fall into four main categories, each with distinct characteristics and use cases. Let's explore these core primitives that form the foundation of MCP's functionality.

<div class="tb-zh"><p>MCP Server 通过通信协议向 Client 暴露多种能力。这些能力分为四大类，各有不同的特征与适用场景。我们来看看这些构成 MCP 功能基础的核心原语。</p></div>

> [!TIP]
> In this section, we'll show examples as framework agnostic functions in each language. This is to focus on the concepts and how they work together, rather than the complexities of any framework.
>
> In the coming units, we'll show how these concepts are implemented in MCP specific code.

<div class="tb-zh"><p>本节我们用与框架无关的函数示例来讲解每种语言下的实现，目的是聚焦概念本身以及它们如何协同，而避开具体框架的复杂度。在后续单元中，我们会展示这些概念在 MCP 专用代码里如何落地。</p></div>

## Tools

Tools are executable functions or actions that the AI model can invoke through the MCP protocol.

<div class="tb-zh"><p>Tools（工具）是 AI 模型可以通过 MCP 协议调用的可执行函数或动作。</p></div>

- **Control**: Tools are typically **model-controlled**, meaning that the AI model (LLM) decides when to call them based on the user's request and context.
- **Safety**: Due to their ability to perform actions with side effects, tool execution can be dangerous. Therefore, they typically require explicit user approval.
- **Use Cases**: Sending messages, creating tickets, querying APIs, performing calculations.

<div class="tb-zh"><p>控制权：Tools 通常由模型控制，即大语言模型根据用户请求与上下文决定何时调用；安全性：由于工具能产生有副作用的操作，执行工具可能带来风险，因此通常需要用户明确批准；典型场景：发送消息、创建工单、调用 API、执行计算。</p></div>

**Example**: A weather tool that fetches current weather data for a given location:

<div class="tb-zh"><p>示例：一个获取指定地点当前天气数据的天气工具：</p></div>

```python
def get_weather(location: str) -> dict:
    """Get the current weather for a specified location."""
    # Connect to weather API and fetch data
    return {
        "temperature": 72,
        "conditions": "Sunny",
        "humidity": 45
    }
```

```javascript
function getWeather(location) {
    // Connect to weather API and fetch data
    return {
        temperature: 72,
        conditions: 'Sunny',
        humidity: 45
    };
}
```

## Resources

Resources provide read-only access to data sources, allowing the AI model to retrieve context without executing complex logic.

<div class="tb-zh"><p>Resources（资源）提供对数据源的只读访问，让 AI 模型无需执行复杂逻辑即可获取上下文。</p></div>

- **Control**: Resources are **application-controlled**, meaning the Host application typically decides when to access them.
- **Nature**: They are designed for data retrieval with minimal computation, similar to GET endpoints in REST APIs.
- **Safety**: Since they are read-only, they typically present lower security risks than Tools.
- **Use Cases**: Accessing file contents, retrieving database records, reading configuration information.

<div class="tb-zh"><p>控制权：Resources 由应用控制，通常由 Host 应用决定何时访问；性质：它们为数据读取而生，几乎不做计算，类似 REST API 中的 GET 端点；安全性：由于是只读的，风险通常低于 Tools；典型场景：读取文件内容、获取数据库记录、读取配置信息。</p></div>

**Example**: A resource that provides access to file contents:

<div class="tb-zh"><p>示例：一个提供文件内容访问的资源：</p></div>

```python
def read_file(file_path: str) -> str:
    """Read the contents of a file at the specified path."""
    with open(file_path, 'r') as f:
        return f.read()
```

```javascript
function readFile(filePath) {
    // Using fs.readFile to read file contents
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
```

## Prompts

Prompts are predefined templates or workflows that guide the interaction between the user, the AI model, and the Server's capabilities.

<div class="tb-zh"><p>Prompts（提示模板）是预定义的模板或工作流，用于引导用户、AI 模型与 Server 能力之间的交互。</p></div>

- **Control**: Prompts are **user-controlled**, often presented as options in the Host application's UI.
- **Purpose**: They structure interactions for optimal use of available Tools and Resources.
- **Selection**: Users typically select a prompt before the AI model begins processing, setting context for the interaction.
- **Use Cases**: Common workflows, specialized task templates, guided interactions.

<div class="tb-zh"><p>控制权：Prompts 由用户控制，通常以选项的形式出现在 Host 应用的界面里；用途：为用户与现有 Tools、Resources 的配合提供结构化流程；选择方式：用户往往在 AI 模型开始处理之前先选定一个提示，从而为整段交互设定上下文；典型场景：常见工作流、专用任务模板、引导式交互。</p></div>

**Example**: A prompt template for generating a code review:

<div class="tb-zh"><p>示例：一个用于生成代码评审的提示模板：</p></div>

```python
def code_review(code: str, language: str) -> list:
    """Generate a code review for the provided code snippet."""
    return [
        {
            "role": "system",
            "content": f"You are a code reviewer examining {language} code. Provide a detailed review highlighting best practices, potential issues, and suggestions for improvement."
        },
        {
            "role": "user",
            "content": f"Please review this {language} code:\n\n```{language}\n{code}\n```"
        }
    ]
```

```javascript
function codeReview(code, language) {
    return [
        {
            role: 'system',
            content: `You are a code reviewer examining ${language} code. Provide a detailed review highlighting best practices, potential issues, and suggestions for improvement.`
        },
        {
            role: 'user',
            content: `Please review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
        }
    ];
}
```

## Sampling

Sampling allows Servers to request the Client (specifically, the Host application) to perform LLM interactions.

<div class="tb-zh"><p>Sampling（采样）允许 Server 请求 Client（具体来说，是宿主应用）代为执行 LLM 交互。</p></div>

- **Control**: Sampling is **server-initiated** but requires Client/Host facilitation.
- **Purpose**: It enables server-driven agentic behaviors and potentially recursive or multi-step interactions.
- **Safety**: Like Tools, sampling operations typically require user approval.
- **Use Cases**: Complex multi-step tasks, autonomous agent workflows, interactive processes.

<div class="tb-zh"><p>控制权：Sampling 由服务端发起，但需要 Client/Host 配合完成；用途：它支撑由服务端驱动的智能体行为，以及可能递归或多步的交互；安全性：与 Tools 类似，采样操作通常需要用户批准；典型场景：复杂的多步任务、自主智能体工作流、交互式流程。</p></div>

**Example**: A Server might request the Client to analyze data it has processed:

<div class="tb-zh"><p>示例：Server 可以请求 Client 分析它已处理过的数据：</p></div>

```python
def request_sampling(messages, system_prompt=None, include_context="none"):
    """Request LLM sampling from the client."""
    # In a real implementation, this would send a request to the client
    return {
        "role": "assistant",
        "content": "Analysis of the provided data..."
    }
```

```javascript
function requestSampling(messages, systemPrompt = null, includeContext = 'none') {
    // In a real implementation, this would send a request to the client
    return {
        role: 'assistant',
        content: 'Analysis of the provided data...'
    };
}

function handleSamplingRequest(request) {
    const { messages, systemPrompt, includeContext } = request;
    // In a real implementation, this would process the request and return a response
    return {
        role: 'assistant',
        content: 'Response to the sampling request...'
    };
}
```

The sampling flow follows these steps:
1. Server sends a `sampling/createMessage` request to the client
2. Client reviews the request and can modify it
3. Client samples from an LLM
4. Client reviews the completion
5. Client returns the result to the server

<div class="tb-zh"><p>采样流程遵循以下步骤：1. Server 向客户端发送 sampling/createMessage 请求 2. 客户端审查该请求，并可对其进行修改 3. 客户端向 LLM 发起采样 4. 客户端审查补全结果 5. 客户端把结果返回给服务端</p></div>

> [!TIP]
> This human-in-the-loop design ensures users maintain control over what the LLM sees and generates. When implementing sampling, it's important to provide clear, well-structured prompts and include relevant context.

<div class="tb-zh"><p>这种人机协同的设计确保用户始终掌控大语言模型看到什么、生成什么。实现采样时，务必提供清晰、结构化的提示，并附带相关上下文。</p></div>

## How Capabilities Work Together

Let's look at how these capabilities work together to enable complex interactions. In the table below, we've outlined the capabilities, who controls them, the direction of control, and some other details.

<div class="tb-zh"><p>我们来看看这些能力如何协同支撑复杂交互。下表中列出了各项能力、由谁控制、控制方向以及其他一些细节。</p></div>

| Capability | Controlled By | Direction | Side Effects | Approval Needed | Typical Use Cases |
|------------|---------------|-----------|--------------|-----------------|-------------------|
| Tools      | Model (LLM)   | Client → Server | Yes (potentially) | Yes | Actions, API calls, data manipulation |
| Resources  | Application   | Client → Server | No (read-only) | Typically no | Data retrieval, context gathering |
| Prompts    | User          | Server → Client | No | No (selected by user) | Guided workflows, specialized templates |
| Sampling   | Server        | Server → Client → Server | Indirectly | Yes | Multi-step tasks, agentic behaviors |

These capabilities are designed to work together in complementary ways:

<div class="tb-zh"><p>这些能力被设计为以互补的方式协同工作：</p></div>

1. A user might select a **Prompt** to start a specialized workflow
2. The Prompt might include context from **Resources**
3. During processing, the AI model might call **Tools** to perform specific actions
4. For complex operations, the Server might use **Sampling** to request additional LLM processing

<div class="tb-zh"><p>1. 用户可能先选一个 Prompt 来启动某项专用流程；2. 该 Prompt 可能引用 Resources 中的上下文；3. 处理过程中，AI 模型可能调用 Tools 来执行具体操作；4. 遇到复杂操作时，Server 可能通过 Sampling 请求大语言模型再做一次处理。</p></div>

The distinction between these primitives provides a clear structure for MCP interactions, enabling AI models to access information, perform actions, and engage in complex workflows while maintaining appropriate control boundaries.

<div class="tb-zh"><p>这些原语之间的区分，为 MCP 交互提供了清晰的结构，让 AI 模型能够获取信息、执行操作并参与复杂工作流，同时守住恰当的控制边界。</p></div>

## Discovery Process

One of MCP's key features is dynamic capability discovery. When a Client connects to a Server, it can query the available Tools, Resources, and Prompts through specific list methods:

<div class="tb-zh"><p>MCP 的关键特性之一是能力的动态发现。当 Client 连接到 Server 时，可以通过特定的 list 方法查询可用的 Tools、Resources 与 Prompts：</p></div>

- `tools/list`: Discover available Tools
- `resources/list`: Discover available Resources
- `prompts/list`: Discover available Prompts

<div class="tb-zh"><p>tools/list：发现可用的 Tools；resources/list：发现可用的 Resources；prompts/list：发现可用的 Prompts</p></div>

This dynamic discovery mechanism allows Clients to adapt to the specific capabilities each Server offers without requiring hardcoded knowledge of the Server's functionality.

<div class="tb-zh"><p>这种动态发现机制让 Client 能够适配每个 Server 提供的具体能力，而无需在代码里硬编码对 Server 功能的了解。</p></div>

## Conclusion

Understanding these core primitives is essential for working with MCP effectively. By providing distinct types of capabilities with clear control boundaries, MCP enables powerful interactions between AI models and external systems while maintaining appropriate safety and control mechanisms.

<div class="tb-zh"><p>理解这些核心原语是高效使用 MCP 的前提。通过提供类型明确、控制边界清晰的能力，MCP 让 AI 模型与外部系统之间能够进行强大的交互，同时保留恰当的安全与控制机制。</p></div>

In the next section, we'll explore how Gradio integrates with MCP to provide easy-to-use interfaces for these capabilities.

<div class="tb-zh"><p>下一节我们将探讨 Gradio 如何与 MCP 集成，为这些能力提供易用的界面。</p></div>
