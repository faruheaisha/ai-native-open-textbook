---
title: "Automatic Prompt Engineer (APE)"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/ape.en.mdx"
sourceRel: "pages/techniques/ape.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/ape.en.mdx"
sourceSha256: "62f39c872eadce6ac18a98b8c0892bbf222323964900335e9b645e4c220eebec"
pageSha256: "62f39c872eadce6ac18a98b8c0892bbf222323964900335e9b645e4c220eebec"
contentMode: "local-full"
zh: ""
---

# Automatic Prompt Engineer (APE)

import \{ FileTree \} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'
import \{Screenshot\} from 'components/screenshot'
import APE from '../../img/APE.png'
import APECOT from '../../img/ape-zero-shot-cot.png'

Image Source: [Zhou et al., (2022)](https://arxiv.org/abs/2211.01910)

[Zhou et al., (2022)](https://arxiv.org/abs/2211.01910) propose automatic prompt engineer (APE) a framework for automatic instruction generation and selection. The instruction generation problem is framed as natural language synthesis addressed as a black-box optimization problem using LLMs to generate and search over candidate solutions.

The first step involves a large language model (as an inference model) that is given output demonstrations to generate instruction candidates for a task. These candidate solutions will guide the search procedure. The instructions are executed using a target model, and then the most appropriate instruction is selected based on computed evaluation scores.

APE discovers a better zero-shot CoT prompt than the human engineered "Let's think step by step" prompt ([Kojima et al., 2022](https://arxiv.org/abs/2205.11916)).

The prompt "Let's work this out in a step by step way to be sure we have the right answer." elicits chain-of-thought reasoning and improves performance on the MultiArith and GSM8K benchmarks:

Image Source: [Zhou et al., (2022)](https://arxiv.org/abs/2211.01910)

This paper touches on an important topic related to prompt engineering which is the idea of automatically optimizing prompts. While we don't go deep into this topic in this guide, here are a few key papers if you are interested in the topic:

- [Prompt-OIRL](https://arxiv.org/abs/2309.06553) - proposes to use offline inverse reinforcement learning to generate query-dependent prompts.
- [OPRO](https://arxiv.org/abs/2309.03409) - introduces the idea of using LLMs to optimize prompts: let LLMs "Take a deep breath" improves the performance on math problems.
- [AutoPrompt](https://arxiv.org/abs/2010.15980) - proposes an approach to automatically create prompts for a diverse set of tasks based on gradient-guided search.
- [Prefix Tuning](https://arxiv.org/abs/2101.00190) - a lightweight alternative to fine-tuning that prepends a trainable continuous prefix for NLG tasks.
- [Prompt Tuning](https://arxiv.org/abs/2104.08691) - proposes a mechanism for learning soft prompts through backpropagation.

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master automatic prompt engineering and advanced optimization techniques for better results."
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
