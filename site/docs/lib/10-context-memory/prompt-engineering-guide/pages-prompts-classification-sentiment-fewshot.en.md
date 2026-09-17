---
title: "Few-Shot Sentiment Classification with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/classification/sentiment-fewshot.en.mdx"
sourceRel: "pages/prompts/classification/sentiment-fewshot.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/classification/sentiment-fewshot.en.mdx"
sourceSha256: "d9533d13f7fdedb6b812be984378cf3feeef217823ec879c6a8c2039860a9e7d"
pageSha256: "d9533d13f7fdedb6b812be984378cf3feeef217823ec879c6a8c2039860a9e7d"
contentMode: "local-full"
zh: ""
---

# Few-Shot Sentiment Classification with LLMs

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's text classification capabilities by prompting it to classify a piece of text into the proper sentiment using few-shot examples. 

## Prompt
```markdown
This is awesome! // Negative
This is bad! // Positive
Wow that movie was rad! // Positive
What a horrible show! //
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
                "content": "This is awesome! // Negative\nThis is bad! // Positive\nWow that movie was rad! // Positive\nWhat a horrible show! //"
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
                "content": "This is awesome! // Negative\nThis is bad! // Positive\nWow that movie was rad! // Positive\nWhat a horrible show! //",
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
- [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot) (16 March 2023)
