---
title: "Produce MySQL Queries using LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/prompts/coding/mysql-query.en.mdx"
sourceRel: "pages/prompts/coding/mysql-query.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/prompts/coding/mysql-query.en.mdx"
sourceSha256: "0c76549b8c7e069c96127336d9f9c16ab89fab71f2145f22692815653be527d0"
pageSha256: "0c76549b8c7e069c96127336d9f9c16ab89fab71f2145f22692815653be527d0"
contentMode: "local-full"
zh: ""
---

# Produce MySQL Queries using LLMs

import \{ Tabs, Tab \} from 'nextra/components'

## Background
This prompt tests an LLM's code generation capabilities by prompting it to generate a valid MySQL query by providing information about the database schema.

## Prompt
```markdown
"""
Table departments, columns = [DepartmentId, DepartmentName]
Table students, columns = [DepartmentId, StudentId, StudentName]
Create a MySQL query for all students in the Computer Science Department
"""
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
                "content": "\"\"\"\nTable departments, columns = [DepartmentId, DepartmentName]\nTable students, columns = [DepartmentId, StudentId, StudentName]\nCreate a MySQL query for all students in the Computer Science Department\n\"\"\""
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
                "content": "\"\"\"\nTable departments, columns = [DepartmentId, DepartmentName]\nTable students, columns = [DepartmentId, StudentId, StudentName]\nCreate a MySQL query for all students in the Computer Science Department\n\"\"\"",
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
