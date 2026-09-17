---
title: "Closed Domain Question Answering with LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/question-answering/closed-domain.en.mdx"
sourceRel: "pages/prompts/question-answering/closed-domain.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/question-answering/closed-domain.en.mdx"
sourceSha256: "da1e2ee215c457f750249a6fb655e906c95b5720798094019aab035dac792b16"
pageSha256: "da1e2ee215c457f750249a6fb655e906c95b5720798094019aab035dac792b16"
contentMode: "local-full"
zh: ""
---

# Closed Domain Question Answering with LLMs

import \{ Tabs, Tab \} from 'nextra/components'
import \{Callout\} from 'nextra/components'

## Background
The following prompt tests an LLM's capabilities to answer closed-domain questions which involves answering questions belonging a specific topic or domain.

    Note that due to the challenging nature of the task, LLMs are likely to hallucinate when they have no knowledge regarding the question.

## Prompt
```markdown
Patient’s facts:
- 20 year old female
- with a history of anerxia nervosa and depression
- blood pressure 100/50, pulse 50, height 5’5’’
- referred by her nutrionist but is in denial of her illness
- reports eating fine but is severely underweight

Please rewrite the data above into a medical note, using exclusively the information above.
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
        "content": "Patient’s facts:\n- 20 year old female\n- with a history of anerxia nervosa and depression\n- blood pressure 100/50, pulse 50, height 5’5’’\n- referred by her nutrionist but is in denial of her illness\n- reports eating fine but is severely underweight\n\nPlease rewrite the data above into a medical note, using exclusively the information above."
        \}
    ],
    temperature=1,
    max_tokens=500,
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
                "content": "Patient’s facts:\n- 20 year old female\n- with a history of anerxia nervosa and depression\n- blood pressure 100/50, pulse 50, height 5’5’’\n- referred by her nutrionist but is in denial of her illness\n- reports eating fine but is severely underweight\n\nPlease rewrite the data above into a medical note, using exclusively the information above.",
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
