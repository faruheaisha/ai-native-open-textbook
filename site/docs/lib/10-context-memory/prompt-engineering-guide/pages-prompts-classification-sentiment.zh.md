---
title: "使用大型语言模型（LLMs）进行情感分类"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/classification/sentiment.zh.mdx"
sourceRel: "pages/prompts/classification/sentiment.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/classification/sentiment.zh.mdx"
sourceSha256: "a0ca2af53a6a3687802fd05fbaeb89b7d13f8d6dfdfe503637ab05f738f61199"
pageSha256: "a0ca2af53a6a3687802fd05fbaeb89b7d13f8d6dfdfe503637ab05f738f61199"
contentMode: "local-full"
zh: ""
---

# 使用大型语言模型（LLMs）进行情感分类

import \{ Tabs, Tab \} from 'nextra/components'

## 背景
这个提示词通过要求大型语言模型（LLM）对一段文本进行分类，来测试其文本分类能力。
## 提示词
```
Classify the text into neutral, negative, or positive
Text: I think the food was okay.
Sentiment:
```

## 提示词模板
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

## 参考
- [Prompt Engineering Guide](https://www.promptingguide.ai/introduction/examples#text-classification) (2023年3月16日)
