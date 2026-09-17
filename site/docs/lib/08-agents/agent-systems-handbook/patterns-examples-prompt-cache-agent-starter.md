---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/examples/prompt-cache-agent-starter/index.mdx"
sourceRel: "patterns/examples/prompt-cache-agent-starter/index.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/patterns/examples/prompt-cache-agent-starter/index.mdx"
sourceSha256: "4f111f8c5e83bf32f1c14b639132a789386e0f22cbfbf81cd6b6ff0e5762d1ff"
pageSha256: "4f111f8c5e83bf32f1c14b639132a789386e0f22cbfbf81cd6b6ff0e5762d1ff"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

This starter shows a small prompt-cache-aware agent loop for agent runtime cost
controls: stable prompt layers first, dynamic memory later, and a tiny
benchmark surface for comparing cold and warm run metadata.

## Status

`starter`

Source code: [patterns/examples/prompt-cache-agent-starter](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/patterns/examples/prompt-cache-agent-starter)

## Why It Exists

Prompt caching is easy to describe and easy to misuse. Builders often place
retrieved memory, user-specific facts, or current-turn inputs inside the same
long prefix they expect the provider to cache. That makes cache behavior harder
to reason about.

This starter keeps the boundary visible. It treats tool manifests, system
instructions, and stable reference context as cacheable layers, while durable
memory summaries and current tasks stay outside the cached prefix unless the
builder intentionally promotes them.

## Agent Runtime Cost Controls

Recent agent SDK changes are a reminder that provider billing rules and pricing
tables can move faster than a handbook page. The durable lesson is to keep the
runtime cost boundary inspectable:

- treat tools, system instructions, and shared reference context as the stable
  prefix
- move user-specific memory, current-turn tasks, and volatile tool outputs
  later in the request
- track cache writes and cache reads separately so a warm rerun is verifiably
  cheaper instead of only shorter
- compare SDK-side estimates with provider-side usage reporting before turning
  token math into budgets or customer billing

This starter stays provider-agnostic, but current Anthropic and OpenAI docs now
reinforce the same pattern: stable prefixes improve cache reuse, runtime usage
fields reveal whether cache hits actually happened, and explicit cost controls
belong in the operator loop instead of guesswork.

## Related Lab Pages

- [Agent Memory And Retrieval](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-memory-and-retrieval/README.md)
- [Agent Runtime Building Blocks](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-runtime-building-blocks/README.md)
- [Patterns Overview](/lib/08-agents/agent-systems-handbook/patterns-2)
- [Contribution Workflow](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/contributor-kit/contribution-workflow/README.md)

## Folder Structure

```text
prompt-cache-agent-starter/
├── README.md
├── SOURCE_NOTES.md
├── index.mdx
├── src/
│   └── prompt_cache_agent_starter.py
└── tests/
    └── test_prompt_cache_agent_starter.py
```

## Included Sample Files

- `src/prompt_cache_agent_starter.py`: typed helpers for prompt layers, cache
  boundary detection, usage summaries, and cold/warm comparisons
- `tests/test_prompt_cache_agent_starter.py`: executable smoke test for the
  starter behavior
- `SOURCE_NOTES.md`: source lineage and attribution boundary

## Flow Boundaries

The starter may:

- model prompt layers as cacheable or dynamic
- calculate where the stable prefix ends
- compare cache-read and cache-write shares
- estimate input cost when current pricing values are supplied

When you map it to a real runtime, preserve three separate checks:

- a stop condition or budget control before the loop runs too far
- cache-specific usage fields that show whether repeated prefixes were reused
- an authoritative usage export or admin API outside local estimates

The starter must not:

- call a real API
- store raw transcripts
- hardcode provider prices
- collapse durable memory into the cached prefix by default

## Quick Start

From the repository root:

```bash
python3 patterns/examples/prompt-cache-agent-starter/tests/test_prompt_cache_agent_starter.py
python3 scripts/verify_example_projects.py
```

## Next Steps

- Add a provider adapter that consumes redacted Claude usage metadata.
- Add a small JSONL fixture for documentation-only report examples.
- Add a companion notebook if the benchmark flow becomes more exploratory.
