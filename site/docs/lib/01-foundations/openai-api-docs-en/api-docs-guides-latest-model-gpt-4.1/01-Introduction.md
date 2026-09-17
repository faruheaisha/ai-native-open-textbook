---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/latest-model/gpt-4.1.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/latest-model/gpt-4.1.md"
sourceSha256: "8c8acb1acca9f74ad15e1a8511c1fbb2aa64c651fc879d448557779115c2d7d8"
pageSha256: "59437509720dc63c1c74bef01ab1836778f7479e93eb7476ca36b9a656fc1a73"
contentMode: "local-full"
zh: ""
---

## Introduction

The GPT-4.1 family of models represents a significant step forward from GPT-4o in capabilities across coding, instruction following, and long context. In this prompting guide, we collate a series of important prompting tips derived from extensive internal testing to help developers fully leverage the improved abilities of this new model family.

Many typical best practices still apply to GPT-4.1, such as providing context examples, making instructions as specific and clear as possible, and inducing planning via prompting to maximize model intelligence. However, we expect that getting the most out of this model will require some prompt migration. GPT-4.1 is trained to follow instructions more closely and more literally than its predecessors, which tended to more liberally infer intent from user and system prompts. This also means, however, that GPT-4.1 is highly steerable and responsive to well-specified prompts - if model behavior is different from what you expect, a single sentence firmly and unequivocally clarifying your desired behavior is almost always sufficient to steer the model on course.

Please read on for prompt examples you can use as a reference, and remember that while this guidance is widely applicable, no advice is one-size-fits-all. AI engineering is inherently an empirical discipline, and large language models are inherently nondeterministic; in addition to following this guide, we advise building informative evals and iterating often to ensure your prompt engineering changes are yielding benefits for your use case.
