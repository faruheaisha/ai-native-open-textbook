---
title: "Introduction"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/introduction.en.mdx"
sourceRel: "pages/introduction.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/introduction.en.mdx"
sourceSha256: "ddfd4387a5eb95f8b9d04e63fc455f988876a077fd6d08082097bf62581e6c32"
pageSha256: "ddfd4387a5eb95f8b9d04e63fc455f988876a077fd6d08082097bf62581e6c32"
contentMode: "local-full"
zh: ""
---

# Introduction

import \{Cards, Card\} from 'nextra-theme-docs'
import \{ CardsIcon, OneIcon, WarningIcon, FilesIcon\} from 'components/icons'
import ContentFileNames from 'components/ContentFileNames'

Prompt engineering is a relatively new discipline for developing and optimizing prompts to efficiently apply and build with large language models (LLMs) for a wide variety of applications and use cases.

Prompt engineering skills help to better understand the capabilities and limitations of LLMs. Researchers use prompt engineering to improve safety and the capacity of LLMs on a wide range of common and complex tasks such as question answering and arithmetic reasoning. Developers use prompt engineering to design robust and effective prompting techniques that interface with LLMs and other tools. 

This comprehensive guide covers the theory and practical aspects of prompt engineering and how to leverage the best prompting techniques to interact and build with LLMs. 

All examples are tested with `gpt-3.5-turbo` using the [OpenAI's Playground](https://platform.openai.com/playground) unless otherwise specified. The model uses the default configurations, i.e., `temperature=1` and `top_p=1`. The prompts should also work with other models that have similar capabilities as `gpt-3.5-turbo` but the model responses may vary.
