---
title: "Automatic Reasoning and Tool-use (ART)"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/art.en.mdx"
sourceRel: "pages/techniques/art.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/art.en.mdx"
sourceSha256: "f9d1ceb412fe26e15cd8baa367c504cb48329181e088a0222cc0aafc3359e6c6"
pageSha256: "f9d1ceb412fe26e15cd8baa367c504cb48329181e088a0222cc0aafc3359e6c6"
contentMode: "local-full"
zh: ""
---

# Automatic Reasoning and Tool-use (ART)

import \{ FileTree \} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'
import \{Screenshot\} from 'components/screenshot'
import ART from '../../img/ART.png'
import ART2 from '../../img/ART2.png'

Combining CoT prompting and tools in an interleaved manner has shown to be a strong and robust approach to address many tasks with LLMs. These approaches typically require hand-crafting task-specific demonstrations and carefully scripted interleaving of model generations with tool use. [Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014) propose a new framework that uses a frozen LLM to automatically generate intermediate reasoning steps as a program.

ART works as follows:
- given a new task, it select demonstrations of multi-step reasoning and tool use from a task library 
- at test time, it pauses generation whenever external tools are called, and integrate their output before resuming generation

ART encourages the model to generalize from demonstrations to decompose a new task and
use tools in appropriate places, in a zero-shot fashion. In addition, ART is extensible as it also enables humans to fix mistakes in the reasoning steps or add new tools by simply updating the task and tool libraries. The process is demonstrated below:

Image Source: [Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014)

ART substantially improves over few-shot prompting and automatic CoT on unseen tasks in the BigBench and MMLU benchmarks, and exceeds performance of hand-crafted CoT prompts when human feedback is incorporated. 

Below is a table demonstrating ART's performance on BigBench and MMLU tasks:

Image Source: [Paranjape et al., (2023)](https://arxiv.org/abs/2303.09014)

  &lt;CourseCard
    tag="Course"
    tagColor="blue"
    title="Prompt Engineering for LLMs"
    description="Master tool-use prompting, reasoning chains, and advanced techniques for complex tasks."
    href="https://academy.dair.ai/courses/introduction-prompt-engineering"
    level="Beginner"
    duration="2 hours"
  />
  &lt;CourseCard
    tag="Course"
    tagColor="purple"
    title="Building Effective AI Agents"
    description="Learn to build effective AI agents with tool integration. Covers function calling and agentic systems."
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
