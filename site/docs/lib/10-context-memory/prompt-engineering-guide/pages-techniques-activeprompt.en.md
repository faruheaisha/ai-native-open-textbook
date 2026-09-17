---
title: "Active-Prompt"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/activeprompt.en.mdx"
sourceRel: "pages/techniques/activeprompt.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/activeprompt.en.mdx"
sourceSha256: "161ffc0246440fc3e91baa108303c9414acc3591b08ce07cd2d9b6ef027b9024"
pageSha256: "161ffc0246440fc3e91baa108303c9414acc3591b08ce07cd2d9b6ef027b9024"
contentMode: "local-full"
zh: ""
---

# Active-Prompt

import \{ FileTree \} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'
import \{Screenshot\} from 'components/screenshot'
import ACTIVE from '../../img/active-prompt.png'

Chain-of-thought (CoT) methods rely on a fixed set of human-annotated exemplars. The problem with this is that the exemplars might not be the most effective examples for the different tasks. To address this, [Diao et al., (2023)](https://arxiv.org/pdf/2302.12246.pdf) recently proposed a new prompting approach called Active-Prompt to adapt LLMs to different task-specific example prompts (annotated with human-designed CoT reasoning).

Below is an illustration of the approach. The first step is to query the LLM with or without a few CoT examples. *k* possible answers are generated for a set of training questions. An uncertainty metric is calculated based on the *k* answers (disagreement used). The most uncertain questions are selected for annotation by humans. The new annotated exemplars are then used to infer each question. 

Image Source: [Diao et al., (2023)](https://arxiv.org/pdf/2302.12246.pdf)

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master Active-Prompt, chain-of-thought, and advanced prompting techniques for better LLM performance."
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
