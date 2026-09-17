---
title: "Drawing TiKZ Diagram"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/coding/tikz.en.mdx"
sourceRel: "pages/prompts/coding/tikz.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/coding/tikz.en.mdx"
sourceSha256: "7d8fd5f38078eff2c3a9fa98f7fa7bb200b256a7e18e9ee893abb84f98a90e49"
pageSha256: "7d8fd5f38078eff2c3a9fa98f7fa7bb200b256a7e18e9ee893abb84f98a90e49"
contentMode: "local-full"
zh: ""
---

# Drawing TiKZ Diagram

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's code generation capabilities by prompting it to draw a unicorn in TiKZ. In the example below the model is expected to generated the LaTeX code that can then be used to generate the unicorn or whichever object was passed. 

## Prompt
```
Draw a unicorn in TiKZ
```

## Code / API

        ```python
        from openai import OpenAI
        client = OpenAI()

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                \{
                "role": "user",
                "content": "Draw a unicorn in TiKZ"
                \}
            ],
            temperature=1,
            max_tokens=1000,
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
                "content": "Draw a unicorn in TiKZ",
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
