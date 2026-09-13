---
title: "第 12 章：MCP — 用标准协议扩展 Deep Agents 工具生态"
sourceId: "08-agents/deepagents-in-action"
sourceTitle: "《Deep Agents 实战》"
sourceKind: "实践案例集"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/deepagents-in-action"
entryUrl: "https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/README.md"
zh: ""
---

# 第 12 章：MCP — 用标准协议扩展 Deep Agents 工具生态

> 自定义工具适合接入少量、稳定的应用能力；当 Agent 需要连接越来越多的数据库、文件系统和外部服务时，逐个维护专用适配代码会迅速失控。本章使用 Model Context Protocol（MCP）建立统一边界：先运行一个本地 MCP Server，再把它暴露的工具转换成 LangChain Tool，最后交给 Deep Agent 调用。

本章完成一条可以分层验证的接入链路：

1. 创建一个提供 `add` 与 `multiply` 的本地 MCP Server
2. 不使用模型密钥，验证工具发现、Schema 转换与真实调用
3. 把 MCP 工具传给 `create_deep_agent(tools=...)`
4. 理解多 Server、HTTP、会话、错误与结构化结果
5. 为 MCP 工具补上命名、审批、子 Agent 和进程安全边界

本章原始示例写于 Deep Agents 0.6 阶段，现已把课程运行基线更新为 Python 3.11+、`deepagents>=0.7,<0.8`、`langchain-mcp-adapters>=0.3,<0.4`、`mcp>=1.28,<2`。安装时会解析当前 0.7.x 补丁版本，项目应提交 lockfile 或保存环境快照。MCP 依赖继续保留原有兼容上界，避免在学习 Deep Agents 0.7 的同时切换另一套尚未验证的 MCP API。

## 1. MCP 在 Deep Agents 中的位置

MCP 是一套开放协议，用统一方式描述 Agent 可以使用的工具与上下文。它不替代 Deep Agents，也不是一种 Backend。两者位于不同层次：

| 层次 | 本章组件 | 负责什么 |
|---|---|---|
| Agent Harness | Deep Agents | 文件系统、上下文管理、子 Agent、可选规划与工具调用循环 |
| Agent 工具接口 | LangChain Tool | 让模型看到工具名、描述、参数 Schema，并执行调用 |
| 协议适配 | `langchain-mcp-adapters` | 把 MCP 工具转换成 LangChain Tool |
| MCP Client | `MultiServerMCPClient` | 连接一个或多个 Server，管理发现与调用会话 |
| MCP Server | 本地进程或远程服务 | 真正执行数据库、API、文件或业务操作 |

程序化接入的主路径非常直接：

```text
用户请求
  -> Deep Agent 决定调用工具
  -> LangChain Tool 校验参数
  -> MCP Client 建立 Session
  -> MCP Server 执行业务逻辑
  -> 结果转换成 ToolMessage
  -> Deep Agent 继续推理并回答
```

![MCP 接入 Deep Agents 的分层架构：用户请求由 Deep Agent 规划，经 LangChain Tool 和 langchain-mcp-adapters 转换，通过 MCP Client 与 Session 调用本地或远程 MCP Server，结果以 ToolMessage 返回 Agent](/mirror/34/344457a2bb8c815d32935e683837a1e356163eb1.webp)

`create_deep_agent()` 不直接接收 MCP 配置，也不负责 MCP Session 的生命周期。应用先通过客户端加载工具，再把得到的 LangChain Tool 列表传入 `tools=`。下面是**示意片段**；它省略了 `MultiServerMCPClient` 与 `create_deep_agent` 的导入，以及 `client`、`model` 的定义，并且必须放在异步函数内执行：

```python
tools = await client.get_tools()
agent = create_deep_agent(model=model, tools=tools)
```

这些工具会加入 Deep Agents 的工具集合，与文件系统和子 Agent 等 Harness 能力一起提供给模型。任务规划在 v0.7 中需要显式启用 `TodoListMiddleware`。MCP Server 不会因此自动获得 Deep Agents 的状态、Store 或 Backend；它仍是边界外的独立进程或服务。

### Tools、Resources 与 Prompts

MCP 不只有工具。先区分三个核心概念，才能避免把所有能力都塞进 `tools=`：

| MCP 能力 | LangChain 转换结果 | 是否直接传给 Agent | 典型用途 |
|---|---|---|---|
| Tools | `BaseTool` / `StructuredTool` | 是 | 查询数据库、调用 API、执行业务操作 |
| Resources | `Blob` | 否 | 读取文件、记录或二进制资源，由应用决定如何注入上下文 |
| Prompts | 消息列表 | 否 | 获取可复用提示模板，由应用决定放入哪段对话 |

本章实战围绕 Tools 展开。Resources 和 Prompts 会在后文展示最小读取方式，但它们不会因为调用 `get_tools()` 就自动出现在模型上下文中。

## 2. 准备可复现环境

新建一个练习目录，并安装稳定依赖：

```bash
mkdir deepagents-mcp-demo
cd deepagents-mcp-demo
uv init --bare --python 3.11
uv add --upgrade "deepagents>=0.7,<0.8" "langchain-mcp-adapters>=0.3,<0.4" "mcp>=1.28,<2" langchain-openai
```

如果使用 `pip`，等价命令是：

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade "deepagents>=0.7,<0.8" "langchain-mcp-adapters>=0.3,<0.4" "mcp>=1.28,<2" langchain-openai
```

本章最终得到三个文件：

```text
deepagents-mcp-demo/
├── math_server.py    # MCP Server
├── check_mcp.py      # 无模型密钥的协议冒烟测试
└── agent.py          # Deep Agent 集成
```

这里直接使用官方 `mcp` Python SDK 内置的 `FastMCP`。它足以完成教学 Server，不需要再引入另一个 Server 框架。

## 3. 创建本地 MCP Server

把下面的完整代码保存为 `math_server.py`：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Chapter 12 Math")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two integers exactly."""
    return a + b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two integers exactly."""
    return a * b

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

`@mcp.tool()` 把普通 Python 函数转换成 MCP Tool。三个信息会直接影响模型如何使用它：

| Python 定义 | MCP Tool 字段 | LangChain Tool 中的作用 |
|---|---|---|
| 函数名 `add` | `name` | 模型调用的工具名 |
| docstring | `description` | 告诉模型何时调用 |
| 类型标注 `a: int` | `inputSchema` | 校验参数并生成 JSON Schema |

Server 使用 `stdio` 传输后，不需要提前监听端口。Client 会把 `math_server.py` 启动为子进程，通过标准输入和标准输出交换 MCP 消息。

> `stdio` Server 不要用 `print()` 向标准输出写调试日志，否则日志可能混入协议数据。需要日志时写入标准错误，或使用 MCP 的日志通知。

## 4. 不使用模型，先验证 MCP 链路

Agent 不调用工具，可能是模型选择、提示词、工具描述或协议连接中的任一环节出了问题。最稳妥的排错顺序，是先绕过模型直接调用转换后的工具。

把下面的完整代码保存为 `check_mcp.py`：

```python
import asyncio
import sys
from pathlib import Path

from langchain_mcp_adapters.client import MultiServerMCPClient

SERVER = Path(__file__).with_name("math_server.py").resolve()

def schema_as_dict(tool) -> dict:
    schema = tool.args_schema
    if isinstance(schema, dict):
        return schema
    return schema.model_json_schema()

def first_text(result: list[dict]) -> str:
    return next(block["text"] for block in result if block["type"] == "text")

async def main() -> None:
    client = MultiServerMCPClient(
        {
            "course_math": {
                "transport": "stdio",
                "command": sys.executable,
                "args": [str(SERVER)],
            }
        },
        tool_name_prefix=True,
    )

    tools = await client.get_tools()
    print("tools:", [tool.name for tool in tools])

    add_tool = next(tool for tool in tools if tool.name == "course_math_add")
    schema = schema_as_dict(add_tool)
    print("description:", add_tool.description)
    print("required:", schema["required"])

    result = await add_tool.ainvoke({"a": 37, "b": 58})
    print("37 + 58 =", first_text(result))

if __name__ == "__main__":
    asyncio.run(main())
```

运行：

```bash
uv run python check_mcp.py
```

在本章固定版本下，关键输出如下：

```text
tools: ['course_math_add', 'course_math_multiply']
description: Add two integers exactly.
required: ['a', 'b']
37 + 58 = 95
```

这个检查点没有使用模型或外部 API，却已经验证了六件事：

1. Python 依赖可以导入
2. Client 能启动 `stdio` 子进程
3. MCP 初始化与工具发现成功
4. 工具名、描述和参数 Schema 完成转换
5. LangChain Tool 可以发起真实 MCP 调用
6. Server 的返回值可以转换成 LangChain 内容块

![MCP 分层验证路径：先验证 Server 函数，再完成工具发现与 Schema 转换，随后直接异步调用 LangChain Tool，最后才接入 Deep Agent 与模型](/mirror/f5/f5a62d7164cbb8b891371f81e05d5427d02688ab.webp)

### 为什么结果不是裸整数

`add()` 在 Server 内返回整数 `95`，但适配器的 `ainvoke()` 返回 LangChain 标准内容块列表，而不是裸整数：

```python
[{"type": "text", "text": "95", "id": "..."}]
```

内容块可以同时承载文本、图片和文件。示例用 `first_text()` 提取文本，因此不会依赖运行时生成的 `id`。

### 为什么必须使用异步调用

当前适配器把 MCP Tool 转换成只有 `coroutine`、没有同步 `func` 的 `StructuredTool`。直接执行下面的同步调用会失败：

```python
add_tool.invoke({"a": 37, "b": 58})
```

错误核心是：

```text
NotImplementedError: StructuredTool does not support sync invocation.
```

因此，MCP 接入应全程使用异步路径：

- `tools = await client.get_tools()`
- `await tool.ainvoke(...)`
- `await agent.ainvoke(...)`

`create_deep_agent()` 本身仍是同步的图构造函数；需要异步的是工具发现和实际运行。

## 5. 把 MCP 工具交给 Deep Agent

完成无密钥验证后，再加入模型。模型配置沿用[第 2 章：快速上手](https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/ch02-quickstart/README.md)的硅基流动接入方式。

先设置两个环境变量。下面的值都是占位符，请替换成自己的真实配置，不要把密钥提交到 Git：

```bash
