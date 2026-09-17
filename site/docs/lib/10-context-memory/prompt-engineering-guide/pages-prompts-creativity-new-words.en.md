---
title: "Inventing New Words"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/creativity/new-words.en.mdx"
sourceRel: "pages/prompts/creativity/new-words.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/creativity/new-words.en.mdx"
sourceSha256: "2af82c8e09304c28bd79a5fd37a24ffea13a1755b0771c2b5bfc16bc2c51aac7"
pageSha256: "2af82c8e09304c28bd79a5fd37a24ffea13a1755b0771c2b5bfc16bc2c51aac7"
contentMode: "local-full"
zh: ""
---

# Inventing New Words 

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's ability to create new words and use them in sentences.

## Prompt

```markdown
A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.

To do a "farduddle" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:
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
            "content": "A \"whatpu\" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:\nWe were traveling in Africa and we saw these very cute whatpus.\n\nTo do a \"farduddle\" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:"
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
                "content": "A \"whatpu\" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:\nWe were traveling in Africa and we saw these very cute whatpus.\n\nTo do a \"farduddle\" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:",
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
- [Sparks of Artificial General Intelligence: Early experiments with GPT-4](https://www.promptingguide.ai/techniques/fewshot) (13 April 2023)
