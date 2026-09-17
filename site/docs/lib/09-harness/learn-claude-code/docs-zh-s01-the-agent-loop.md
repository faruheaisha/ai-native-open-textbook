---
title: "s01: The Agent Loop (Agent 循环)"
sourceId: "09-harness/learn-claude-code"
sourceTitle: "Learn Claude Code（nano harness 17 步）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shareAI-lab/learn-claude-code"
entryUrl: "https://github.com/shareAI-lab/learn-claude-code/blob/0dcafa2ae053a1ddd6a72f265431104b08a5aa13/docs/zh/s01-the-agent-loop.md"
sourceRel: "docs/zh/s01-the-agent-loop.md"
rawUrl: "/raw/09-harness/learn-claude-code/docs/zh/s01-the-agent-loop.md"
sourceSha256: "4d40a78832530dd4994e2a7b89b10a9c27c0f678b2a69278a012db67dc85a07f"
pageSha256: "4d40a78832530dd4994e2a7b89b10a9c27c0f678b2a69278a012db67dc85a07f"
contentMode: "local-full"
zh: ""
---

# s01: The Agent Loop (Agent 循环)

`[ s01 ] s02 > s03 > s04 > s05 > s06 | s07 > s08 > s09 > s10 > s11 > s12`

> *"One loop & Bash is all you need"* -- 一个工具 + 一个循环 = 一个 Agent。
>
> **Harness 层**: 循环 -- 模型与真实世界的第一道连接。

## 问题

语言模型能推理代码, 但碰不到真实世界 -- 不能读文件、跑测试、看报错。没有循环, 每次工具调用你都得手动把结果粘回去。你自己就是那个循环。

## 解决方案

```
+--------+      +-------+      +---------+
|  User  | ---> |  LLM  | ---> |  Tool   |
| prompt |      |       |      | execute |
+--------+      +---+---+      +----+----+
                    ^                |
                    |   tool_result  |
                    +----------------+
                    (loop until stop_reason != "tool_use")
```

一个退出条件控制整个流程。循环持续运行, 直到模型不再调用工具。

## 工作原理	

1. 用户 prompt 作为第一条消息。

```python
messages.append({"role": "user", "content": query})
```

2. 将消息和工具定义一起发给 LLM。

```python
response = client.messages.create(
    model=MODEL, system=SYSTEM, messages=messages,
    tools=TOOLS, max_tokens=8000,
)
```

3. 追加助手响应。检查 `stop_reason` -- 如果模型没有调用工具, 结束。

```python
messages.append({"role": "assistant", "content": response.content})
if response.stop_reason != "tool_use":
    return
```

4. 执行每个工具调用, 收集结果, 作为 user 消息追加。回到第 2 步。

```python
results = []
for block in response.content:
    if block.type == "tool_use":
        output = run_bash(block.input["command"])
        results.append({
            "type": "tool_result",
            "tool_use_id": block.id,
            "content": output,
        })
messages.append({"role": "user", "content": results})
```

组装为一个完整函数:

```python
def agent_loop(query):
    messages = [{"role": "user", "content": query}]
    while True:
        response = client.messages.create(
            model=MODEL, system=SYSTEM, messages=messages,
            tools=TOOLS, max_tokens=8000,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason != "tool_use":
            return

        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = run_bash(block.input["command"])
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                })
        messages.append({"role": "user", "content": results})
```

不到 30 行, 这就是整个 Agent。后面 11 个章节都在这个循环上叠加机制 -- 循环本身始终不变。

## 变更内容

| 组件          | 之前       | 之后                           |
|---------------|------------|--------------------------------|
| Agent loop    | (无)       | `while True` + stop_reason     |
| Tools         | (无)       | `bash` (单一工具)              |
| Messages      | (无)       | 累积式消息列表                 |
| Control flow  | (无)       | `stop_reason != "tool_use"`    |

## 试一试

```sh
cd learn-claude-code
python agents/s01_agent_loop.py
```

试试这些 prompt (英文 prompt 对 LLM 效果更好, 也可以用中文):

1. `Create a file called hello.py that prints "Hello, World!"`
2. `List all Python files in this directory`
3. `What is the current git branch?`
4. `Create a directory called test_output and write 3 files in it`
