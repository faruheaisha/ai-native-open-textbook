---
title: "Risks & Misuses"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/risks.en.mdx"
sourceRel: "pages/risks.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/risks.en.mdx"
sourceSha256: "146f0f68f9f299051803b638299fdfb39fe9ce1a61799d98df29744ee4ecf6dc"
pageSha256: "146f0f68f9f299051803b638299fdfb39fe9ce1a61799d98df29744ee4ecf6dc"
contentMode: "local-full"
zh: ""
---

# Risks & Misuses

import \{ Callout \} from 'nextra-theme-docs'
import \{Cards, Card\} from 'nextra-theme-docs'
import \{FilesIcon\} from 'components/icons'
import ContentFileNames from 'components/ContentFileNames'

Well-crafted prompts can lead to effective used of LLMs for various tasks using techniques like few-shot learning and chain-of-thought prompting. As you think about building real-world applications on top of LLMs, it also becomes crucial to think about the misuses, risks, and safety practices involved with language models. 

This section focuses on highlighting some of the risks and misuses of LLMs via techniques like prompt injections. It also highlights harmful behaviors and how to potentially mitigate them via effective prompting techniques and tools like moderation APIs. Other topics of interest include generalizability, calibration, biases, social biases, and factuality to name a few.
