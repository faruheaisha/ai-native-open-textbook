---
title: "Key Concepts and Terminology"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md"
zh: "on"
---

# Key Concepts and Terminology

Before diving deeper into the Model Context Protocol, it's important to understand the key concepts and terminology that form the foundation of MCP. This section will introduce the fundamental ideas that underpin the protocol and provide a common vocabulary for discussing MCP implementations throughout the course.

<div class="tb-zh"><p>在深入了解模型上下文协议之前，先理解构成 MCP 基础的关键概念与术语很重要。本节将介绍支撑该协议的基本思想，并为贯穿全课程的 MCP 实现讨论建立一套共同词汇。</p></div>

MCP is often described as the "USB-C for AI applications." Just as USB-C provides a standardized physical and logical interface for connecting various peripherals to computing devices, MCP offers a consistent protocol for linking AI models to external capabilities. This standardization benefits the entire ecosystem:

<div class="tb-zh"><p>MCP 常被形容为「AI 应用界的 USB-C」。正如 USB-C 为各种外设连接计算设备提供了标准化的物理与逻辑接口，MCP 也为 AI 模型连接外部能力提供了一致的协议。这种标准化惠及整个生态：</p></div>

- **users** enjoy simpler and more consistent experiences across AI applications
- **AI application developers** gain easy integration with a growing ecosystem of tools and data sources
- **tool and data providers** need only create a single implementation that works with multiple AI applications
- the broader ecosystem benefits from increased interoperability, innovation, and reduced fragmentation

<div class="tb-zh"><p>用户：在各 AI 应用之间获得更简单、更一致的体验；AI 应用开发者：轻松接入不断壮大的工具与数据源生态；工具与数据提供方：只需做一次实现，就能服务多个 AI 应用；整个生态：互操作性提升、创新加快、碎片化减少。</p></div>

## The Integration Problem

The **M×N Integration Problem** refers to the challenge of connecting M different AI applications to N different external tools or data sources without a standardized approach. 

<div class="tb-zh"><p>M×N 集成问题，指的是在没有统一标准的情况下，把 M 个不同的 AI 应用与 N 个不同的外部工具或数据源连接起来所面临的难题。</p></div>

### Without MCP (M×N Problem)

Without a protocol like MCP, developers would need to create M×N custom integrations—one for each possible pairing of an AI application with an external capability. 

<div class="tb-zh"><p>如果没有 MCP 这样的协议，开发者就必须编写 M×N 个定制集成——AI 应用与外部能力的每一种组合都要单独实现一套。</p></div>

![Without MCP](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/1.png)

Each AI application would need to integrate with each tool/data source individually. This is a very complex and expensive process which introduces a lot of friction for developers, and high maintenance costs.

<div class="tb-zh"><p>每个 AI 应用都要逐一对接每个工具／数据源。这个过程极其复杂且昂贵，给开发者带来大量摩擦，维护成本也很高。</p></div>

Once we have multiple models and multiple tools, the number of integrations becomes too large to manage, each with its own unique interface.

<div class="tb-zh"><p>一旦模型和工具都多起来，集成数量就会大到难以管理，而且每套集成都有自己独特的接口。</p></div>

![Multiple Models and Tools](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/1a.png)

### With MCP (M+N Solution)

MCP transforms this into an M+N problem by providing a standard interface: each AI application implements the client side of MCP once, and each tool/data source implements the server side once. This dramatically reduces integration complexity and maintenance burden.

<div class="tb-zh"><p>MCP 通过提供标准接口，把这个问题转化为 M+N 问题：每个 AI 应用只需实现一次 MCP 的客户端，每个工具／数据源也只需实现一次服务端。这大幅降低了集成复杂度与维护负担。</p></div>

![With MCP](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/2.png)

## Core MCP Terminology

Now that we understand the problem that MCP solves, let's dive into the core terminology and concepts that make up the MCP protocol.

<div class="tb-zh"><p>理解了 MCP 要解决的问题之后，我们来看看构成 MCP 协议的核心术语与概念。</p></div>

> [!TIP]
> MCP is a standard like HTTP or USB-C, and is a protocol for connecting AI applications to external tools and data sources. Therefore, using standard terminology is crucial to making the MCP work effectively. 
>
> When documenting our applications and communicating with the community, we should use the following terminology.

<div class="tb-zh"><p>MCP 就像 HTTP 或 USB-C 一样，是一套连接 AI 应用与外部工具、数据源的标准。因此，使用标准术语对 MCP 能否高效运作至关重要。在撰写应用文档、与社区沟通时，我们应当遵循以下术语。</p></div>

### Components

Just like client server relationships in HTTP, MCP has a client and a server.

<div class="tb-zh"><p>与 HTTP 中的客户端—服务端关系类似，MCP 也有客户端与服务端。</p></div>

![MCP Components](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/3.png)

- **Host**: The user-facing AI application that end-users interact with directly. Examples include Anthropic's Claude Desktop, AI-enhanced IDEs like Cursor, inference libraries like Hugging Face Python SDK, or custom applications built in libraries like LangChain or smolagents. Hosts initiate connections to MCP Servers and orchestrate the overall flow between user requests, LLM processing, and external tools.

<div class="tb-zh"><p>Host（宿主）：面向用户、由终端用户直接交互的 AI 应用。例如 Anthropic 的 Claude Desktop、Cursor 这类 AI 增强编辑器、Hugging Face Python SDK 这类推理库，或用 LangChain、smolagents 等库自建的应用。Host 发起与 MCP Server 的连接，并统筹用户请求、大语言模型处理与外部工具之间的整体流程。</p></div>

- **Client**: A component within the host application that manages communication with a specific MCP Server. Each Client maintains a 1:1 connection with a single Server, handling the protocol-level details of MCP communication and acting as an intermediary between the Host's logic and the external Server.

<div class="tb-zh"><p>Client（客户端）：宿主应用内部负责与某个特定 MCP Server 通信的组件。每个 Client 与单个 Server 保持一对一连接，处理 MCP 通信的协议层细节，并充当 Host 逻辑与外部 Server 之间的中介。</p></div>

- **Server**: An external program or service that exposes capabilities (Tools, Resources, Prompts) via the MCP protocol.

<div class="tb-zh"><p>Server（服务端）：通过 MCP 协议对外暴露能力（Tools、Resources、Prompts）的外部程序或服务。</p></div>

> [!WARNING]
> A lot of content uses 'Client' and 'Host' interchangeably. Technically speaking, the host is the user-facing application, and the client is the component within the host application that manages communication with a specific MCP Server.

<div class="tb-zh"><p>很多资料把 Client 与 Host 混用。严格来说，Host 是面向用户的应用，Client 则是 Host 内部负责与某个特定 MCP Server 通信的组件。</p></div>

### Capabilities

Of course, your application's value is the sum of the capabilities it offers. So the capabilities are the most important part of your application. MCP's can connect with any software service, but there are some common capabilities that are used for many AI applications.

<div class="tb-zh"><p>当然，一个应用的价值等于它所提供能力的总和，因此能力是应用中最关键的部分。MCP 可以连接任何软件服务，但其中有一些能力被大量 AI 应用普遍使用。</p></div>

| Capability | Description | Example |
| ---------- | ----------- | ------- |
| **Tools** | Executable functions that the AI model can invoke to perform actions or retrieve computed data. Typically relating to the use case of the application. | A tool for a weather application might be a function that returns the weather in a specific location. |
| **Resources** | Read-only data sources that provide context without significant computation. | A researcher assistant might have a resource for scientific papers. |
| **Prompts** | Pre-defined templates or workflows that guide interactions between users, AI models, and the available capabilities. | A summarization prompt. |
| **Sampling** | Server-initiated requests for the Client/Host to perform LLM interactions, enabling recursive actions where the LLM can review generated content and make further decisions. | A writing application reviewing its own output and decides to refine it further. |

In the following diagram, we can see the collective capabilities applied to a use case for a code agent.

<div class="tb-zh"><p>在下面的示意图中，我们可以看到这些能力集合被应用在一个代码智能体场景中的样子。</p></div>

![collective diagram](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/8.png)

This application might use their MCP entities in the following way:

<div class="tb-zh"><p>该应用可能会以如下方式使用它的各类 MCP 实体：</p></div>

| Entity | Name | Description |
| --- | --- | --- |
| Tool | Code Interpreter | A tool that can execute code that the LLM writes. |
| Resource | Documentation | A resource that contains the documentation of the application. |
| Prompt | Code Style | A prompt that guides the LLM to generate code. |
| Sampling | Code Review | A sampling that allows the LLM to review the code and make further decisions. |

### Conclusion

Understanding these key concepts and terminology provides the foundation for working with MCP effectively. In the following sections, we'll build on this foundation to explore the architectural components, communication protocol, and capabilities that make up the Model Context Protocol.

<div class="tb-zh"><p>理解这些关键概念与术语，是高效使用 MCP 的基础。在接下来的小节中，我们将在此基础上进一步探讨构成模型上下文协议的架构组件、通信协议与能力。</p></div>
