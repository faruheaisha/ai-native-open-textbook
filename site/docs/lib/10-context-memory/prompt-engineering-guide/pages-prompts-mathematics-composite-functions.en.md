---
title: "Evaluating Composite Functions"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/mathematics/composite-functions.en.mdx"
sourceRel: "pages/prompts/mathematics/composite-functions.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/mathematics/composite-functions.en.mdx"
sourceSha256: "4f0ff088c9b4e1805608e1586d88deb8e17a0444c99af5b22d4b5aaccb1ce555"
pageSha256: "4f0ff088c9b4e1805608e1586d88deb8e17a0444c99af5b22d4b5aaccb1ce555"
contentMode: "local-full"
zh: ""
---

# Evaluating Composite Functions

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's mathematical capabilities by prompting it to evaluate a given composition function.

## Prompt

Suppose $$g(x) = f^{-1}(x), g(0) = 5, g(4) = 7, g(3) = 2, g(7) = 9, g(9) = 6$$ what is $$f(f(f(6)))$$?

## Code / API

  
        ```python
        from openai import OpenAI
        client = OpenAI()

        response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            \{
            "role": "user",
            "content": "Suppose  g(x) = f^\{-1\}(x), g(0) = 5, g(4) = 7, g(3) = 2, g(7) = 9, g(9) = 6 what is f(f(f(6)))?\n"
            \}
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        ```

        ```python
        import fireworks.client
        fireworks.client.api_key = "&lt;FIREWORKS_API_KEY>"
        completion = fireworks.client.ChatCompletion.create(
            model="accounts/fireworks/models/mixtral-8x7b-instruct",
            messages=[
                \{
                "role": "user",
                "content": "Suppose  g(x) = f^\{-1\}(x), g(0) = 5, g(4) = 7, g(3) = 2, g(7) = 9, g(9) = 6 what is f(f(f(6)))?",
                \}
            ],
            stop=["<|im_start|>","<|im_end|>","<|endoftext|>"],
            stream=True,
            n=1,
            top_p=1,
            top_k=40,
            presence_penalty=0,
            frequency_penalty=0,
            prompt_truncate_len=1024,
            context_length_exceeded_behavior="truncate",
            temperature=0.9,
            max_tokens=4000
        )
        ```

## Reference
- [Sparks of Artificial General Intelligence: Early experiments with GPT-4](https://arxiv.org/abs/2303.12712) (13 April 2023)
