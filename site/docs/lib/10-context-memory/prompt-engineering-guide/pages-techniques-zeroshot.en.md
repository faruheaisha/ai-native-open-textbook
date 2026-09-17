---
title: "Zero-Shot Prompting"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/zeroshot.en.mdx"
sourceRel: "pages/techniques/zeroshot.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/zeroshot.en.mdx"
sourceSha256: "f5c842f89cc8a91fb34560fb2e2b44e7716ff5eaffced769a517430f0df04ec5"
pageSha256: "f5c842f89cc8a91fb34560fb2e2b44e7716ff5eaffced769a517430f0df04ec5"
contentMode: "local-full"
zh: ""
---

# Zero-Shot Prompting

import \{Bleed\} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/ZTaHqdkxUMs?si=EDLjgAxuFxFcrSM3" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

Large language models (LLMs) today, such as GPT-3.5 Turbo, GPT-4, and Claude 3, are tuned to follow instructions and are trained on large amounts of data. Large-scale training makes these models capable of performing some tasks in a "zero-shot" manner. Zero-shot prompting means that the prompt used to interact with the model won't contain examples or demonstrations. The zero-shot prompt directly instructs the model to perform a task without any additional examples to steer it.

We tried a few zero-shot examples in the previous section. Here is one of the examples (ie., text classification) we used:

*Prompt:*
```
Classify the text into neutral, negative or positive. 

Text: I think the vacation is okay.
Sentiment:
```

*Output:*
```
Neutral
```

Note that in the prompt above we didn't provide the model with any examples of text alongside their classifications, the LLM already understands "sentiment" -- that's the zero-shot capabilities at work. 

Instruction tuning has been shown to improve zero-shot learning [Wei et al. (2022)](https://arxiv.org/pdf/2109.01652.pdf). Instruction tuning is essentially the concept of finetuning models on datasets described via instructions. Furthermore, [RLHF](https://arxiv.org/abs/1706.03741) (reinforcement learning from human feedback) has been adopted to scale instruction tuning wherein the model is aligned to better fit human preferences. This recent development powers models like ChatGPT. We will discuss all these approaches and methods in upcoming sections.

When zero-shot doesn't work, it's recommended to provide demonstrations or examples in the prompt which leads to few-shot prompting. In the next section, we demonstrate few-shot prompting.

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master zero-shot, few-shot, and advanced prompting techniques to unlock the full potential of large language models."
    href="https://academy.dair.ai/courses/introduction-prompt-engineering"
    level="Beginner"
    duration="2 hours"
  />
  &lt;CourseCard
    tag="Course"
    tagColor="purple"
    title="Building Effective AI Agents"
    description="Learn to build effective AI agents. Covers function calling, tool integration, and debugging agentic systems."
    href="https://academy.dair.ai/courses/building-effective-ai-agents"
    level="Intermediate"
    duration="5 hours"
  />

&lt;CoursePromo
  title="Explore All Courses"
  description="Discover our full catalog of AI and prompt engineering courses. From beginners to advanced practitioners."
  href="https://academy.dair.ai/"
  buttonText="Browse Academy"
  promoCode="PROMPTING20"
/>
