---
title: "Draw a Person Using Alphabet Letters"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/image-generation/alphabet-person.en.mdx"
sourceRel: "pages/prompts/image-generation/alphabet-person.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/image-generation/alphabet-person.en.mdx"
sourceSha256: "18d879f2af1021e1fd080fd27191e218b5935751020e0a87f2f822891e3deebb"
pageSha256: "18d879f2af1021e1fd080fd27191e218b5935751020e0a87f2f822891e3deebb"
contentMode: "local-full"
zh: ""
---

# Draw a Person Using Alphabet Letters

import \{ Tabs, Tab \} from 'nextra/components'
import \{Callout\} from 'nextra/components'

## Background
The following prompt tests an LLM's capabilities to handle visual concepts, despite being trained only on text. This is a challenging task for the LLM so it involves several iterations. In the example below the user first requests for a desired visual and then provides feedback along with corrections and additions. The follow up instructions will depend on the progress the LLM makes on the task. Note that this task is asking to generate TikZ code which will then need to manually compiled by the user.

## Prompt

Prompt Iteration 1:
```markdown
Produce TikZ code that draws a person composed from letters in the alphabet. The arms and torso can be the letter Y, the face can be the letter O (add some facial features) and the legs can be the legs of the letter H. Feel free to add other features.
```  

Prompt Iteration 2:
```markdown
The torso is a bit too long, the arms are too short and it looks like the right arm is carrying the face instead of the face being right above the torso. Could you correct this please?
```

Prompt Iteration 3:
```markdown
Please add a shirt and pants.
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
        "content": "Produce TikZ code that draws a person composed from letters in the alphabet. The arms and torso can be the letter Y, the face can be the letter O (add some facial features) and the legs can be the legs of the letter H. Feel free to add other features.."
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
                "content": "Produce TikZ code that draws a person composed from letters in the alphabet. The arms and torso can be the letter Y, the face can be the letter O (add some facial features) and the legs can be the legs of the letter H. Feel free to add other features.",
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
