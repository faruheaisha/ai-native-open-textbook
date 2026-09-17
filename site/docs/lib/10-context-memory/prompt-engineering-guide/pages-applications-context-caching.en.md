---
title: "Context Caching with Gemini 1.5 Flash"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/applications/context-caching.en.mdx"
sourceRel: "pages/applications/context-caching.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/applications/context-caching.en.mdx"
sourceSha256: "c773de9543de21e1009624dca1c43eaa2d24483f2cdbfb78839ea1cc4112de91"
pageSha256: "c773de9543de21e1009624dca1c43eaa2d24483f2cdbfb78839ea1cc4112de91"
contentMode: "local-full"
zh: ""
---

# Context Caching with Gemini 1.5 Flash

import \{Cards, Card, Callout\} from 'nextra-theme-docs'
import \{CodeIcon\} from 'components/icons'

Google recently released a new feature called [context-caching](https://ai.google.dev/gemini-api/docs/caching?lang=python) which is available via the Gemini APIs through the Gemini 1.5 Pro and Gemini 1.5 Flash models. This guide provides a basic example of how to use context-caching with Gemini 1.5 Flash.

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/987Pd89EDPs?si=j43isgNb0uwH5AeI" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

https://youtu.be/987Pd89EDPs?si=j43isgNb0uwH5AeI

### The Use Case: Analyzing a Year's Worth of ML Papers

The guide demonstrates how you can use context caching to analyze the summaries of all the [ML papers we've documented over the past year](https://github.com/dair-ai/ML-Papers-of-the-Week). We store these summaries in a text file, which can now be fed to the Gemini 1.5 Flash model and query efficiently. 

### The Process: Uploading, Caching, and Querying

1. **Data Preparation:** First convert the readme file (containing the summaries) into a plain text file.
2. **Utilizing the Gemini API:** You can upload the text file using the Google `generativeai` library.
3. **Implementing Context Caching:**  A cache is created using the `caching.CachedContent.create()` function. This involves:
    * Specifying the Gemini Flash 1.5 model.
    * Providing a name for the cache.
    * Defining an instruction for the model (e.g., "You are an expert AI researcher..."). 
    * Setting a time-to-live (TTL) for the cache (e.g., 15 minutes).
4. **Creating the Model:** We then create a generative model instance using the cached content.
5. **Querying:**  We can start querying the model with natural language questions like:
    * "Can you please tell me the latest AI papers of the week?"
    * "Can you list the papers that mention Mamba? List the title of the paper and summary."
    * "What are some of the innovations around long-context LLMs? List the title of the paper and summary."

The results were promising. The model accurately retrieved and summarized information from the text file. Context caching proved highly efficient, eliminating the need to repeatedly send the entire text file with each query.

This workflow has the potential to be a valuable tool for researchers, allowing them to:

* Quickly analyze and query large amounts of research data.
* Retrieve specific findings without manually searching through documents.
* Conduct interactive research sessions without wasting prompt tokens.

We are excited to explore further applications of context caching, especially within more complex scenarios like agentic workflows. 

The notebook can be found below:

    &lt;Card 
        icon=\{&lt;CodeIcon />\}
        title="Context Caching with Gemini APIs"
        href="https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/notebooks/gemini-context-caching.ipynb"
    />

Learn more about caching methods in our new AI courses. [Join now!](https://academy.dair.ai/)
Use code PROMPTING20 to get an extra 20% off.
