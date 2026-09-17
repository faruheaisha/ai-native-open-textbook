---
title: "使用大型语言模型（LLMs）进行小样本情感分类"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/classification/sentiment-fewshot.zh.mdx"
sourceRel: "pages/prompts/classification/sentiment-fewshot.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/classification/sentiment-fewshot.zh.mdx"
sourceSha256: "d63dca3928290d35ee62eac38ba56f14a6bc12fe71b26452899a75f98485e470"
pageSha256: "d63dca3928290d35ee62eac38ba56f14a6bc12fe71b26452899a75f98485e470"
contentMode: "local-full"
zh: ""
---

# 使用大型语言模型（LLMs）进行小样本情感分类

import \{ Tabs, Tab \} from 'nextra/components'

## 背景
这个提示通过提供少量示例来测试大型语言模型（LLM）的文本分类能力，要求它将一段文本正确分类为相应的情感倾向。
## 提示词
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

## 参考
- [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot) (2023年3月16日)
