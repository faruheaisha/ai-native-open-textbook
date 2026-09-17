---
title: "Physical Reasoning with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/reasoning/physical-reasoning.en.mdx"
sourceRel: "pages/prompts/reasoning/physical-reasoning.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/reasoning/physical-reasoning.en.mdx"
sourceSha256: "a646a7135b02cb122e2d18a6444beb1fbf39c85ad38c80ac7b6c9c1339787a5e"
pageSha256: "a646a7135b02cb122e2d18a6444beb1fbf39c85ad38c80ac7b6c9c1339787a5e"
contentMode: "local-full"
zh: ""
---

# Physical Reasoning with LLMs 

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's physical reasoning capabilities by prompting it to perform actions on a set of objects.

## Prompt
```
Here we have a book, 9 eggs, a laptop, a bottle and a nail. Please tell me how to stack them onto each other in a stable manner.
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
        "content": "Here we have a book, 9 eggs, a laptop, a bottle and a nail. Please tell me how to stack them onto each other in a stable manner."
        \}
    ],
    temperature=1,
    max_tokens=500,
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
                "content": "Here we have a book, 9 eggs, a laptop, a bottle and a nail. Please tell me how to stack them onto each other in a stable manner.",
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
