---
title: "LLM Wrappers"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/utility_function/llm.md"
sourceRel: "PocketFlow/docs/utility_function/llm.md"
rawUrl: "/raw/08-agents/pocket-manus/PocketFlow/docs/utility_function/llm.md"
sourceSha256: "3bda46d15f191b854d96a3b0f50f738e8333a356ff5da41031048a4933fb053c"
pageSha256: "3bda46d15f191b854d96a3b0f50f738e8333a356ff5da41031048a4933fb053c"
contentMode: "local-full"
zh: ""
---

# LLM Wrappers  

We **don't** provide built-in LLM wrappers. Instead, please implement your own, for example by asking an assistant like ChatGPT or Claude. If you ask ChatGPT to "implement a `call_llm` function that takes a prompt and returns the LLM response," you shall get something like:

```python
def call_llm(prompt):
    from openai import OpenAI
    client = OpenAI(api_key="YOUR_API_KEY_HERE")
    r = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return r.choices[0].message.content

# Example usage
call_llm("How are you?")
```

> Store the API key in an environment variable like OPENAI_API_KEY for security.

## Improvements
Feel free to enhance your `call_llm` function as needed. Here are examples:

- Handle chat history:

```python
def call_llm(messages):
    from openai import OpenAI
    client = OpenAI(api_key="YOUR_API_KEY_HERE")
    r = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    return r.choices[0].message.content
```

- Add in-memory caching 

```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def call_llm(prompt):
    # Your implementation here
    pass
```

> ⚠️ Caching conflicts with Node retries, as retries yield the same result.
>
> To address this, you could use cached results only if not retried.

```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_call(prompt):
    pass

def call_llm(prompt, use_cache):
    if use_cache:
        return cached_call(prompt)
    # Call the underlying function directly
    return cached_call.__wrapped__(prompt)

class SummarizeNode(Node):
    def exec(self, text):
        return call_llm(f"Summarize: {text}", self.cur_retry==0)
```

- Enable logging:

```python
def call_llm(prompt):
    import logging
    logging.info(f"Prompt: {prompt}")
    response = ... # Your implementation here
    logging.info(f"Response: {response}")
    return response
```

## Why Not Provide Built-in LLM Wrappers?
I believe it is a **bad practice** to provide LLM-specific implementations in a general framework:
- **LLM APIs change frequently**. Hardcoding them makes maintenance a nightmare.
- You may need **flexibility** to switch vendors, use fine-tuned models, or deploy local LLMs.
- You may need **optimizations** like prompt caching, request batching, or response streaming.
