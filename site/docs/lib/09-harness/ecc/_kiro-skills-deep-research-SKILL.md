---
title: "Deep Research"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/skills/deep-research/SKILL.md"
sourceRel: ".kiro/skills/deep-research/SKILL.md"
rawUrl: "/raw/09-harness/ecc/.kiro/skills/deep-research/SKILL.md"
sourceSha256: "faf733aee67562a4b0338232b8c4c726a5fd113aa5a7aa313632aa201ef6b7ab"
pageSha256: "faf733aee67562a4b0338232b8c4c726a5fd113aa5a7aa313632aa201ef6b7ab"
contentMode: "local-full"
zh: ""
---

# Deep Research

> **Drift-prone skill.** Firecrawl/Exa MCP tool names, quotas, and result
> shapes change. Verify the configured MCP tools and current API docs before
> promising coverage or quoting live source counts.

Produce thorough, cited research reports from multiple web sources using firecrawl and exa MCP tools.

## When to Activate

- User asks to research any topic in depth
- Competitive analysis, technology evaluation, or market sizing
- Due diligence on companies, investors, or technologies
- Any question requiring synthesis from multiple sources
- User says "research", "deep dive", "investigate", or "what's the current state of"

## MCP Requirements

At least one of:
- **firecrawl** — `firecrawl_search`, `firecrawl_scrape`, `firecrawl_crawl`
- **exa** — `web_search_exa`, `web_search_advanced_exa`, `crawling_exa`

Both together give the best coverage. Configure in `~/.claude.json` or `~/.codex/config.toml`.

## Workflow

### Step 1: Understand the Goal

Ask 1-2 quick clarifying questions:
- "What's your goal — learning, making a decision, or writing something?"
- "Any specific angle or depth you want?"

If the user says "just research it" — skip ahead with reasonable defaults.

### Step 2: Plan the Research

Break the topic into 3-5 research sub-questions. Example:
- Topic: "Impact of AI on healthcare"
  - What are the main AI applications in healthcare today?
  - What clinical outcomes have been measured?
  - What are the regulatory challenges?
  - What companies are leading this space?
  - What's the market size and growth trajectory?

### Step 3: Execute Multi-Source Search

For EACH sub-question, search using available MCP tools:

**With firecrawl:**
```
