---
title: "Research bot"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/research_bot/README.md"
sourceRel: "examples/research_bot/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/research_bot/README.md"
sourceSha256: "a2071967c10e0de53fc6384a96af210976f4d0f8253ce79f0ba9172ac494f2e1"
pageSha256: "a2071967c10e0de53fc6384a96af210976f4d0f8253ce79f0ba9172ac494f2e1"
contentMode: "local-full"
zh: ""
---

# Research bot

This is a simple example of a multi-agent research bot. To run it:

```bash
python -m examples.research_bot.main
```

## Architecture

The flow is:

1. User enters their research topic
2. `planner_agent` comes up with a plan to search the web for information. The plan is a list of search queries, with a search term and a reason for each query.
3. For each search item, we run a `search_agent`, which uses the Web Search tool to search for that term and summarize the results. These all run in parallel.
4. Finally, the `writer_agent` receives the search summaries, and creates a written report.

## Suggested improvements

If you're building your own research bot, some ideas to add to this are:

1. Retrieval: Add support for fetching relevant information from a vector store. You could use the File Search tool for this.
2. Image and file upload: Allow users to attach PDFs or other files, as baseline context for the research.
3. More planning and thinking: Models often produce better results given more time to think. Improve the planning process to come up with a better plan, and add an evaluation step so that the model can choose to improve its results, search for more stuff, etc.
4. Code execution: Allow running code, which is useful for data analysis.
