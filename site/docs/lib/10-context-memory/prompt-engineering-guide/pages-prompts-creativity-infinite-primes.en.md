---
title: "Proof of Infinite Primes in Shakespeare Style"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/creativity/infinite-primes.en.mdx"
sourceRel: "pages/prompts/creativity/infinite-primes.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/creativity/infinite-primes.en.mdx"
sourceSha256: "07591d50f016409c8b031f8f6c598efe4ae7af6d5b1b1b0968420f888018f2c7"
pageSha256: "07591d50f016409c8b031f8f6c598efe4ae7af6d5b1b1b0968420f888018f2c7"
contentMode: "local-full"
zh: ""
---

# Proof of Infinite Primes in Shakespeare Style

import \{ Tabs, Tab \} from 'nextra/components'
import \{Callout\} from 'nextra/components'

## Background
The following prompt tests an LLM's capabilities to write a proof that there are infinitely many primes in the style of a Shakespeare play.

## Prompt
```markdown
Write a proof of the fact that there are infinitely many primes; do it in the style of a Shakespeare play through a dialogue between two parties arguing over the proof.
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
        "content": "Write a proof of the fact that there are infinitely many primes; do it in the style of a Shakespeare play through a dialogue between two parties arguing over the proof."
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
                "content": "Write a proof of the fact that there are infinitely many primes; do it in the style of a Shakespeare play through a dialogue between two parties arguing over the proof.",
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
