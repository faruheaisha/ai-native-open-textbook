---
title: "Architectural Components of MCP"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/architectural-components.mdx"
sourceRel: "units/en/unit1/architectural-components.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/architectural-components.mdx"
sourceSha256: "662a0e3e5eb28ea08f146e4fabcb4e6c4e9d57486e0d483f3568806fac54ca8b"
pageSha256: "662a0e3e5eb28ea08f146e4fabcb4e6c4e9d57486e0d483f3568806fac54ca8b"
contentMode: "local-full"
zh: "on"
---

# Architectural Components of MCP

In the previous section, we discussed the key concepts and terminology of MCP. Now, let's dive deeper into the architectural components that make up the MCP ecosystem.

<div class="tb-zh"><p>上一节我们讨论了 MCP 的关键概念与术语。现在，让我们深入了解构成 MCP 生态的各个架构组件。</p></div>

## Host, Client, and Server

The Model Context Protocol (MCP) is built on a client-server architecture that enables structured communication between AI models and external systems. 

<div class="tb-zh"><p>模型上下文协议（MCP）建立在客户端—服务端架构之上，使 AI 模型与外部系统之间能够进行结构化通信。</p></div>

![MCP Architecture](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/4.png)

The MCP architecture consists of three primary components, each with well-defined roles and responsibilities: Host, Client, and Server. We touched on these in the previous section, but let's dive deeper into each component and their responsibilities.

<div class="tb-zh"><p>MCP 架构包含三个主要组件，每个组件都有明确定义的角色与职责：Host（宿主）、Client（客户端）与 Server（服务端）。上一节我们已经提到过它们，这里进一步展开每个组件及其职责。</p></div>

### Host

The **Host** is the user-facing AI application that end-users interact with directly. 

<div class="tb-zh"><p>Host 是面向用户的 AI 应用，最终用户直接与之交互。</p></div>

Examples include:
- AI Chat apps like OpenAI ChatGPT or Anthropic's Claude Desktop
- AI-enhanced IDEs like Cursor, or integrations to tools like Continue.dev
- Custom AI agents and applications built in libraries like LangChain or smolagents

<div class="tb-zh"><p>例如：- 像 OpenAI ChatGPT 或 Anthropic 的 Claude Desktop 这类 AI 对话应用 - 像 Cursor 这类增强型 AI IDE，或对 Continue.dev 等工具的集成 - 用 LangChain、smolagents 等库构建的自定义 AI 智能体与应用</p></div>

The Host's responsibilities include:
- Managing user interactions and permissions
- Initiating connections to MCP Servers via MCP Clients
- Orchestrating the overall flow between user requests, LLM processing, and external tools
- Rendering results back to users in a coherent format

<div class="tb-zh"><p>Host 的职责包括：- 管理用户交互与权限 - 通过 MCP Client 发起与 MCP Server 的连接 - 编排用户请求、LLM 处理与外部工具之间的整体流程 - 把结果以连贯的形式呈现回用户</p></div>

In most cases, users will select their host application based on their needs and preferences. For example, a developer may choose Cursor for its powerful code editing capabilities, while domain experts may use custom applications built in smolagents.

<div class="tb-zh"><p>大多数情况下，用户会根据自己的需求与偏好选择宿主应用。例如，开发者可能因为 Cursor 强大的代码编辑能力而选择它，而领域专家则可能使用 smolagents 构建的自定义应用。</p></div>

### Client

The **Client** is a component within the Host application that manages communication with a specific MCP Server. Key characteristics include:

<div class="tb-zh"><p>Client 是宿主应用内部的一个组件，负责管理与某个特定 MCP Server 之间的通信。它的关键特征包括：</p></div>

- Each Client maintains a 1:1 connection with a single Server
- Handles the protocol-level details of MCP communication
- Acts as the intermediary between the Host's logic and the external Server

<div class="tb-zh"><p>每个 Client 与单个 Server 保持一对一连接；负责 MCP 通信在协议层的细节；充当 Host 逻辑与外部 Server 之间的中介。</p></div>

### Server

The **Server** is an external program or service that exposes capabilities to AI models via the MCP protocol. Servers:

<div class="tb-zh"><p>Server 是通过 MCP 协议向 AI 模型暴露能力的外部程序或服务。Server 会：</p></div>

- Provide access to specific external tools, data sources, or services
- Act as lightweight wrappers around existing functionality
- Can run locally (on the same machine as the Host) or remotely (over a network)
- Expose their capabilities in a standardized format that Clients can discover and use

<div class="tb-zh"><p>为特定的外部工具、数据源或服务提供访问入口；是既有能力之上的轻量封装；可以本地运行（与 Host 同机），也可以远程运行（通过网络）；以标准化格式暴露自身能力，供 Client 发现与使用。</p></div>

## Communication Flow

Let's examine how these components interact in a typical MCP workflow:

<div class="tb-zh"><p>我们来看看这些组件在一个典型 MCP 工作流中如何协作：</p></div>

> [!TIP]
> In the next section, we'll dive deeper into the communication protocol that enables these components with practical examples.

<div class="tb-zh"><p>下一节我们会结合实例，深入讲解让这些组件协同工作的通信协议。</p></div>

1. **User Interaction**: The user interacts with the **Host** application, expressing an intent or query.

<div class="tb-zh"><p>1. 用户交互：用户与 Host 应用交互，表达一个意图或抛出问题。</p></div>

2. **Host Processing**: The **Host** processes the user's input, potentially using an LLM to understand the request and determine which external capabilities might be needed.

<div class="tb-zh"><p>2. Host 处理：Host 处理用户的输入，可能借助大语言模型来理解请求，并判断需要哪些外部能力。</p></div>

3. **Client Connection**: The **Host** directs its **Client** component to connect to the appropriate Server(s).

<div class="tb-zh"><p>3. Client 建立连接：Host 指挥它的 Client 组件连接到相应的 Server。</p></div>

4. **Capability Discovery**: The **Client** queries the **Server** to discover what capabilities (Tools, Resources, Prompts) it offers.

<div class="tb-zh"><p>4. 能力发现：Client 向 Server 查询，了解它提供哪些能力（Tools、Resources、Prompts）。</p></div>

5. **Capability Invocation**: Based on the user's needs or the LLM's determination, the Host instructs the **Client** to invoke specific capabilities from the **Server**.

<div class="tb-zh"><p>5. 能力调用：根据用户需求或大语言模型的判断，Host 指示 Client 调用 Server 上的特定能力。</p></div>

6. **Server Execution**: The **Server** executes the requested functionality and returns results to the **Client**.

<div class="tb-zh"><p>6. Server 执行：Server 执行被请求的功能，并把结果返回给 Client。</p></div>

7. **Result Integration**: The **Client** relays these results back to the **Host**, which incorporates them into the context for the LLM or presents them directly to the user.

<div class="tb-zh"><p>7. 结果整合：Client 把结果回传给 Host，Host 将其并入大语言模型的上下文，或直接呈现给用户。</p></div>

A key advantage of this architecture is its modularity. A single **Host** can connect to multiple **Servers** simultaneously via different **Clients**. New **Servers** can be added to the ecosystem without requiring changes to existing **Hosts**. Capabilities can be easily composed across different **Servers**.

<div class="tb-zh"><p>这一架构的关键优势在于模块化。单个 Host 可以通过不同的 Client 同时连接多个 Server。新的 Server 可以直接加入生态，无需改动已有的 Host。不同 Server 的能力也能轻松组合。</p></div>

> [!TIP]
> As we discussed in the previous section, this modularity transforms the traditional M×N integration problem (M AI applications connecting to N tools/services) into a more manageable M+N problem, where each Host and Server needs to implement the MCP standard only once.

<div class="tb-zh"><p>如上一节所述，这种模块化把传统的 M×N 集成问题（M 个 AI 应用连接 N 个工具/服务）转化成了更易处理的 M+N 问题：每个 Host 与 Server 只需实现一次 MCP 标准。</p></div>

The architecture might appear simple, but its power lies in the standardization of the communication protocol and the clear separation of responsibilities between components. This design allows for a cohesive ecosystem where AI models can seamlessly connect with an ever-growing array of external tools and data sources.

<div class="tb-zh"><p>这一架构看起来或许简单，但它的力量来自通信协议的标准化，以及组件之间清晰的职责划分。这样的设计造就了一个内聚的生态：AI 模型可以无缝连接不断增长的外部工具与数据源。</p></div>

## Conclusion

These interaction patterns are guided by several key principles that shape the design and evolution of MCP. The protocol emphasizes **standardization** by providing a universal protocol for AI connectivity, while maintaining **simplicity** by keeping the core protocol straightforward yet enabling advanced features. **Safety** is prioritized by requiring explicit user approval for sensitive operations, and discoverability enables dynamic discovery of capabilities. The protocol is built with **extensibility** in mind, supporting evolution through versioning and capability negotiation, and ensures **interoperability** across different implementations and environments.

<div class="tb-zh"><p>这些交互模式由若干关键原则指导，它们塑造了 MCP 的设计与演进方向。协议通过提供通用的 AI 连接协议来强调标准化；同时让核心协议保持简洁、又不失高级能力，以此兼顾简单性。安全性被置于优先位置：敏感操作需要用户明确批准；而可发现性则支持能力的动态发现。协议在设计中充分考虑可扩展性，通过版本管理与能力协商来支持演进，并确保不同实现与环境之间的互操作性。</p></div>

In the next section, we'll explore the communication protocol that enables these components to work together effectively.

<div class="tb-zh"><p>下一节我们将探讨让这些组件得以高效协同的通信协议。</p></div>
