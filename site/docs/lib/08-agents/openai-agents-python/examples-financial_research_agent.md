---
title: "Financial Research Agent Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/financial_research_agent/README.md"
sourceRel: "examples/financial_research_agent/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/financial_research_agent/README.md"
sourceSha256: "a732904bb9c791437d3a5e28a601a974e1136a8163ea3e79d67daa459b346a29"
pageSha256: "a732904bb9c791437d3a5e28a601a974e1136a8163ea3e79d67daa459b346a29"
contentMode: "local-full"
zh: ""
---

# Financial Research Agent Example

This example shows how you might compose a richer financial research agent using the Agents SDK. The pattern is similar to the `research_bot` example, but with more specialized sub‑agents and a verification step.

The flow is:

1. **Planning**: A planner agent turns the end user’s request into a list of search terms relevant to financial analysis – recent news, earnings calls, corporate filings, industry commentary, etc.
2. **Search**: A search agent uses the built‑in `WebSearchTool` to retrieve terse summaries for each search term. (You could also add `FileSearchTool` if you have indexed PDFs or 10‑Ks.)
3. **Sub‑analysts**: Additional agents (e.g. a fundamentals analyst and a risk analyst) are exposed as tools so the writer can call them inline and incorporate their outputs.
4. **Writing**: A senior writer agent brings together the search snippets and any sub‑analyst summaries into a long‑form markdown report plus a short executive summary.
5. **Verification**: A final verifier agent audits the report for obvious inconsistencies or missing sourcing.

You can run the example with:

```bash
python -m examples.financial_research_agent.main
```

and enter a query like:

```
Write up an analysis of Apple Inc.'s most recent quarter.
```

### Starter prompt

The writer agent is seeded with instructions similar to:

```
You are a senior financial analyst. You will be provided with the original query
and a set of raw search summaries. Your job is to synthesize these into a
long‑form markdown report (at least several paragraphs) with a short executive
summary. You also have access to tools like `fundamentals_analysis` and
`risk_analysis` to get short specialist write‑ups if you want to incorporate them.
Add a few follow‑up questions for further research.
```

You can tweak these prompts and sub‑agents to suit your own data sources and preferred report structure.
