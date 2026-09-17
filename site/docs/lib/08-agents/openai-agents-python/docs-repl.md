---
title: "REPL utility"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/docs/repl.md"
sourceRel: "docs/repl.md"
rawUrl: "/raw/08-agents/openai-agents-python/docs/repl.md"
sourceSha256: "29bbc00218f3c005fde5ace621dd0295e43a5e6f77d590d77d1fd3bbf7fef84b"
pageSha256: "29bbc00218f3c005fde5ace621dd0295e43a5e6f77d590d77d1fd3bbf7fef84b"
contentMode: "local-full"
zh: ""
---

# REPL utility

The SDK provides `run_demo_loop` for quick, interactive testing of an agent's behavior directly in your terminal.

```python
import asyncio
from agents import Agent, run_demo_loop

async def main() -> None:
    agent = Agent(name="Assistant", instructions="You are a helpful assistant.")
    await run_demo_loop(agent)

if __name__ == "__main__":
    asyncio.run(main())
```

`run_demo_loop` prompts for user input in a loop, keeping the conversation history between turns. By default, it streams model output as it is produced. When you run the example above, run_demo_loop starts an interactive chat session. It continuously asks for your input, remembers the entire conversation history between turns (so your agent knows what's been discussed) and automatically streams the agent's responses to you in real-time as they are generated.

To end this chat session, simply type `quit` or `exit` (and press Enter) or use the `Ctrl-D` keyboard shortcut.
