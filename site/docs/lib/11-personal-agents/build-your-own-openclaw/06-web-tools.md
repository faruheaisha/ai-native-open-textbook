---
title: "Step 06: Web Tools"
sourceId: "11-personal-agents/build-your-own-openclaw"
sourceTitle: "Build Your Own OpenClaw"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/czl9707/build-your-own-openclaw"
entryUrl: "https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/06-web-tools/README.md"
sourceRel: "06-web-tools/README.md"
rawUrl: "/raw/11-personal-agents/build-your-own-openclaw/06-web-tools/README.md"
sourceSha256: "6e858c3ede0adcf7f6f46d27b326aa0c9a4b7571cfcd4f0de3129ad36b4f2725"
pageSha256: "6e858c3ede0adcf7f6f46d27b326aa0c9a4b7571cfcd4f0de3129ad36b4f2725"
contentMode: "local-full"
zh: ""
---

# Step 06: Web Tools

> Your Agent wants to see the bigger world.
> At the root, they are just two new tools.

## Prerequisites

```bash
cp default_workspace/config.example.yaml default_workspace/config.user.yaml
# Edit config.user.yaml to add your API key
# Uncomment websearch and webread sections
# Add your websearch api key
```

## What We Will Build

An LLM may know how to write Python, but it cannot know the latest trends in the Python ecosystem. This opens up the world beyond the local file system and the LLM's training data.

<img src="/mirror/d7/d73536a8890f175ee7c8aff63bc017b8f13663e6.svg" align="center" width="100%" />

## Key Components

- **WebSearchProvider**: Web search providers.
- **WebReadProvider**: Web reading providers.
- **Tools**: `websearch` and `webread` tools.

[src/mybot/provider/web_search/](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/06-web-tools/src/mybot/provider/web_search/README.md)

```python
class WebSearchProvider(ABC):
    async def search(self, query: str) -> list[SearchResult]: ...
```

[src/mybot/provider/web_read/](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/06-web-tools/src/mybot/provider/web_read/README.md)

```python
class WebReadProvider(ABC):
    async def read(self, url: str) -> ReadResult: ...
```

[src/mybot/tools/websearch_tool.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/06-web-tools/src/mybot/tools/websearch_tool.py)

```python
@tool(...)
async def websearch(query: str, session: "AgentSession") -> str:
    results = await provider.search(query)

    if not results:
        return "No results found."
    output = []
    for i, r in enumerate(results, 1):
        output.append(f"{i}. **{r.title}**\n   {r.url}\n   {r.snippet}")
    return "\n\n".join(output)
```

[src/mybot/tools/webread_tool.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/06-web-tools/src/mybot/tools/webread_tool.py)

```python
@tool(...)
async def webread(url: str, session: "AgentSession") -> str:
    result = await provider.read(url)
    if result.error:
        return f"Error reading {url}: {result.error}"

    return f"**{result.title}**\n\n{result.content}"
```

## Try it out

```bash
cd 06-web-tools
uv run my-bot chat

# You: What is pickle bot? search online please.
# pickle: Based on my search, there are actually a few different things called "Pickle Bot":

# ### 1. **Pickle Robot Company** 🤖
# ### 2. **Pickle Bot (Discord Bot)** 💬
# ### 3. **pickle-bot (GitHub)** 🐱
# An open-source project described as:
# - "Your own AI assistant, speak like a cat"
# - "Pickle is a standard little cat"
# - A customizable AI assistant that you can name, talk to, and teach

# The GitHub version sounds like it could be related to me - a cat-speaking AI assistant! 😺

# Which one were you curious about?
```

## What's Next

[Step 07: Event-Driven](/lib/11-personal-agents/build-your-own-openclaw/07-event-driven) - The great refactor to event-based architecture
