---
title: "Directional Stimulus Prompting"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/dsp.en.mdx"
sourceRel: "pages/techniques/dsp.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/dsp.en.mdx"
sourceSha256: "38bbc48d63f853bad2cbeeb65f6a355c50536ab72ef85e0863602b51635bae45"
pageSha256: "38bbc48d63f853bad2cbeeb65f6a355c50536ab72ef85e0863602b51635bae45"
contentMode: "local-full"
zh: ""
---

# Directional Stimulus Prompting

import \{ FileTree \} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'
import \{Screenshot\} from 'components/screenshot'
import DSP from '../../img/dsp.jpeg'

[Li et al., (2023)](https://arxiv.org/abs/2302.11520) proposes a new prompting technique to better guide the LLM in generating the desired summary.

A tuneable policy LM is trained to generate the stimulus/hint. Seeing more use of RL to optimize LLMs.

The figure below shows how Directional Stimulus Prompting compares with standard prompting. The policy LM can be small and optimized to generate the hints that guide a black-box frozen LLM.

Image Source: [Li et al., (2023)](https://arxiv.org/abs/2302.11520)

Full example coming soon!

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master directional stimulus prompting and advanced techniques for guiding LLM outputs."
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
