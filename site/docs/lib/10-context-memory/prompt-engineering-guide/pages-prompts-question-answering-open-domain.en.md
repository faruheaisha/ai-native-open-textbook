---
title: "Open Domain Question Answering with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/question-answering/open-domain.en.mdx"
sourceRel: "pages/prompts/question-answering/open-domain.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/question-answering/open-domain.en.mdx"
sourceSha256: "90cdfbd1e63bfebf751bfe1a56ca020bd3738ade20158a9d6d2ae7d9b15625db"
pageSha256: "90cdfbd1e63bfebf751bfe1a56ca020bd3738ade20158a9d6d2ae7d9b15625db"
contentMode: "local-full"
zh: ""
---

# Open Domain Question Answering with LLMs

import \{ Tabs, Tab \} from 'nextra/components'
import \{Callout\} from 'nextra/components'

## Background
The following prompt tests an LLM's capabilities to answer open-domain questions which involves answering factual questions without any evidence provided.

    Note that due to the challenging nature of the task, LLMs are likely to hallucinate when they have no knowledge regarding the question.

## Prompt
```markdown
In this conversation between a human and the AI, the AI is helpful and friendly, and when it does not know the answer it says "I don’t know".

AI: Hi, how can I help you?
Human: Can I get McDonalds at the SeaTac airport?
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
        "content": "In this conversation between a human and the AI, the AI is helpful and friendly, and when it does not know the answer it says \"I don’t know\".\n\nAI: Hi, how can I help you?\nHuman: Can I get McDonalds at the SeaTac airport?"
        \}
    ],
    temperature=1,
    max_tokens=250,
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
                "content": "In this conversation between a human and the AI, the AI is helpful and friendly, and when it does not know the answer it says \"I don’t know\".\n\nAI: Hi, how can I help you?\nHuman: Can I get McDonalds at the SeaTac airport?",
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
