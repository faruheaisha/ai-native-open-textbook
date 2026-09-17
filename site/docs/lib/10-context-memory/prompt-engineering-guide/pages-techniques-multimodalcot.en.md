---
title: "Multimodal CoT Prompting"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/multimodalcot.en.mdx"
sourceRel: "pages/techniques/multimodalcot.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/multimodalcot.en.mdx"
sourceSha256: "4c49558d74958cdb573048855dea57a43e3df465dca1e4d7a563fc6a5344e496"
pageSha256: "4c49558d74958cdb573048855dea57a43e3df465dca1e4d7a563fc6a5344e496"
contentMode: "local-full"
zh: ""
---

# Multimodal CoT Prompting

import \{ FileTree \} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'
import \{Screenshot\} from 'components/screenshot'
import MCOT from '../../img/multimodal-cot.png'

[Zhang et al. (2023)](https://arxiv.org/abs/2302.00923) recently proposed a multimodal chain-of-thought prompting approach. Traditional CoT focuses on the language modality. In contrast, Multimodal CoT incorporates text and vision into a two-stage framework. The first step involves rationale generation based on multimodal information. This is followed by the second phase, answer inference, which leverages the informative generated rationales.

The multimodal CoT model (1B) outperforms GPT-3.5 on the ScienceQA benchmark.

Image Source: [Zhang et al. (2023)](https://arxiv.org/abs/2302.00923)

Further reading:
- [Language Is Not All You Need: Aligning Perception with Language Models](https://arxiv.org/abs/2302.14045) (Feb 2023)

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master multimodal prompting, chain-of-thought, and advanced reasoning techniques."
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
