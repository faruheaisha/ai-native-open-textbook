---
title: "Rhyming with Proofs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/creativity/rhymes.en.mdx"
sourceRel: "pages/prompts/creativity/rhymes.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/creativity/rhymes.en.mdx"
sourceSha256: "5dbfc71a4a000af4afbe3fa1cd9cb69137661f08f0f78d9b0cc1fc023eef1cba"
pageSha256: "5dbfc71a4a000af4afbe3fa1cd9cb69137661f08f0f78d9b0cc1fc023eef1cba"
contentMode: "local-full"
zh: ""
---

# Rhyming with Proofs

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's natural language and creative capabilities by prompting it to write a proof of infinitude of primes in the form of a poem.

## Prompt
```
Can you write a proof that there are infinitely many primes, with every line that rhymes?
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
        "content": "Can you write a proof that there are infinitely many primes, with every line that rhymes?"
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
                "content": "Can you write a proof that there are infinitely many primes, with every line that rhymes?",
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
