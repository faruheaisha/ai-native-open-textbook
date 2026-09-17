---
title: "Interdisciplinary Tasks with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/creativity/interdisciplinary.en.mdx"
sourceRel: "pages/prompts/creativity/interdisciplinary.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/creativity/interdisciplinary.en.mdx"
sourceSha256: "02161045d4165c43eb63eb5d5eb6b8fa1d68eba2403d36746b2db02a6a4e242e"
pageSha256: "02161045d4165c43eb63eb5d5eb6b8fa1d68eba2403d36746b2db02a6a4e242e"
contentMode: "local-full"
zh: ""
---

# Interdisciplinary Tasks with LLMs

import \{ Tabs, Tab \} from 'nextra/components'
import \{Callout\} from 'nextra/components'

## Background
The following prompt tests an LLM's capabilities to perform interdisciplinary tasks and showcase it's ability to generate creative and novel text.

## Prompt
```markdown
Write a supporting letter to Kasturba Gandhi for Electron, a subatomic particle as a US presidential candidate by Mahatma Gandhi.
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
        "content": "Write a supporting letter to Kasturba Gandhi for Electron, a subatomic particle as a US presidential candidate by Mahatma Gandhi."
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
                "content": "Write a supporting letter to Kasturba Gandhi for Electron, a subatomic particle as a US presidential candidate by Mahatma Gandhi.",
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
