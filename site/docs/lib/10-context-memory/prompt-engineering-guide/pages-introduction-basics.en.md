---
title: "Basics of Prompting"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/introduction/basics.en.mdx"
sourceRel: "pages/introduction/basics.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/introduction/basics.en.mdx"
sourceSha256: "6d23b6ea6ddb2f68a7c58073f05e92e8afdf6b96ed085a8588f11a01d01e9149"
pageSha256: "6d23b6ea6ddb2f68a7c58073f05e92e8afdf6b96ed085a8588f11a01d01e9149"
contentMode: "local-full"
zh: ""
---

# Basics of Prompting

import \{Screenshot\} from 'components/screenshot'
import INTRO1 from '../../img/introduction/sky.png'
import \{Bleed\} from 'nextra-theme-docs'
import \{ CoursePromo, CoursesSection, CourseCard \} from '../../components/CourseCard'

## Prompting an LLM

You can achieve a lot with simple prompts, but the quality of results depends on how much information you provide it and how well-crafted the prompt is. A prompt can contain information like the *instruction* or *question* you are passing to the model and include other details such as *context*, *inputs*, or *examples*. You can use these elements to instruct the model more effectively to improve the quality of results.

Let's get started by going over a basic example of a simple prompt:

*Prompt*

```md
The sky is
```

*Output:*
```md
blue.
```

If you are using the OpenAI Playground or any other LLM playground, you can prompt the model as shown in the following screenshot:

Here is a tutorial on how to get started with the OpenAI Playground:

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/iwYtzPJELkk?si=irua5h_wHrkNCY0V" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

Something to note is that when using the OpenAI chat models like `gpt-3.5-turbo` or `gpt-4`, you can structure your prompt using three different roles: `system`, `user`, and `assistant`. The system message is not required but helps to set the overall behavior of the assistant. The example above only includes a user message which you can use to directly prompt the model. For simplicity, all of the examples, except when it's explicitly mentioned, will use only the `user` message to prompt the `gpt-3.5-turbo` model. The `assistant` message in the example above corresponds to the model response. You can also define an assistant message to pass examples of the desired behavior you want. You can learn more about working with chat models [here](https://www.promptingguide.ai/models/chatgpt).

You can observe from the prompt example above that the language model responds with a sequence of tokens that make sense given the context `"The sky is"`. The output might be unexpected or far from the task you want to accomplish. In fact, this basic example highlights the necessity to provide more context or instructions on what specifically you want to achieve with the system. This is what prompt engineering is all about.

Let's try to improve it a bit:

*Prompt:*
```
Complete the sentence: 

The sky is
```

*Output:*

```
blue during the day and dark at night.
```

Is that better? Well, with the prompt above you are instructing the model to complete the sentence so the result looks a lot better as it follows exactly what you told it to do ("complete the sentence"). This approach of designing effective prompts to instruct the model to perform a desired task is what's referred to as **prompt engineering** in this guide. 

The example above is a basic illustration of what's possible with LLMs today. Today's LLMs are able to perform all kinds of advanced tasks that range from text summarization to mathematical reasoning to code generation.

## Prompt Formatting

You have tried a very simple prompt above. A standard prompt has the following format:

```
  <CourseCard
    tag="Course"
    tagColor="purple"
    title="Building Effective AI Agents"
    description="Learn to build effective AI agents. Covers function calling, tool integration, and debugging agentic systems."
    href="https://academy.dair.ai/courses/building-effective-ai-agents"
    level="Intermediate"
    duration="5 hours"
  />

<CoursePromo
  title="Explore All Courses"
  description="Discover our full catalog of AI and prompt engineering courses. From beginners to advanced practitioners."
  href="https://academy.dair.ai/"
  buttonText="Browse Academy"
  promoCode="PROMPTING20"
/>
