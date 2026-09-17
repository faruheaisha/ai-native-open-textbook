---
title: "Sentiment Classification with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/classification/sentiment.en.mdx"
sourceRel: "pages/prompts/classification/sentiment.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/classification/sentiment.en.mdx"
sourceSha256: "16ed7f65dfa9eaa6d19f9fc4aa5bb1849c875416ff289b6d344fc6d58ab98a8d"
pageSha256: "16ed7f65dfa9eaa6d19f9fc4aa5bb1849c875416ff289b6d344fc6d58ab98a8d"
contentMode: "local-full"
zh: ""
---

# Sentiment Classification with LLMs

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's text classification capabilities by prompting it to classify a piece of text.

## Prompt
```
Classify the text into neutral, negative, or positive
Text: I think the food was okay.
Sentiment:
```

## Prompt Template
```
Classify the text into neutral, negative, or positive
Text: {input}
Sentiment:
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
                "content": "Classify the text into neutral, negative, or positive\nText: I think the food was okay.\nSentiment:\n"
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
                "content": "Classify the text into neutral, negative, or positive\nText: I think the food was okay.\nSentiment:\n",
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
- [Prompt Engineering Guide](https://www.promptingguide.ai/introduction/examples#text-classification) (16 March 2023)
