---
title: "Generate Code Snippets with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/coding/code-snippet.en.mdx"
sourceRel: "pages/prompts/coding/code-snippet.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/coding/code-snippet.en.mdx"
sourceSha256: "d17be0fc8a65f623ddbed5e2f7387260cdbc4505cf8a361f0e32fb454bb96df6"
pageSha256: "d17be0fc8a65f623ddbed5e2f7387260cdbc4505cf8a361f0e32fb454bb96df6"
contentMode: "local-full"
zh: ""
---

# Generate Code Snippets with LLMs

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's code generation capabilities by prompting it to generate the corresponding code snippet given details about the program through a comment using `/* <instruction> */`. 

## Prompt
```markdown
/*
Ask the user for their name and say "Hello"
*/
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
                "content": "/*\nAsk the user for their name and say \"Hello\"\n*/"
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
                "content": "/*\nAsk the user for their name and say \"Hello\"\n*/",
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
- [Prompt Engineering Guide](https://www.promptingguide.ai/introduction/examples#code-generation) (16 March 2023)
