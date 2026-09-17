---
title: "How Claude Code Works"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/03-context-engineering.md"
sourceRel: "en/docs/03-context-engineering.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/03-context-engineering.md"
sourceSha256: "57f581d1bb58b502fa59a9f03d9fc68cd937fdee835c8d538878a7ed8862e572"
pageSha256: "c36d01d83acc648304740261592103fbcbd809ee54a66a99fc7621ae2e74f49d"
contentMode: "local-full"
zh: ""
---

## Why Is Context Engineering So Important?

LLMs have a fixed-size context window (Claude's current maximum is 200K tokens). Yet a real coding session may involve dozens of file reads, hundreds of tool calls, and easily produce over a million tokens of raw text — far exceeding the context window's capacity.

This means the system must make difficult trade-offs: **which information stays in the context, and which gets compressed or discarded**. If these trade-offs are poorly made, the model will forget which file it just edited, repeatedly read content it has already seen, or produce output that contradicts its previous decisions.

Think of the context window as a desk: the desktop space is limited, and you must keep the most important documents at hand while filing the rest into drawers. Context engineering is this "document management system" — deciding what goes on the desk (context construction), when to file old documents into drawers (compression), and how to quickly retrieve filed documents when needed (persistence and recovery).

But context engineering faces an additional challenge beyond fitting information into the window. Each API request's system prompt and tool definitions alone may total **50-100K tokens**. To avoid reprocessing all of that from scratch every time, Claude Code relies on server-side **prefix caching** (KV Cache) — the server remembers previously processed prefixes, so subsequent requests only need to process the new additions, dramatically reducing latency and cost.

Prefix caching, however, comes with a brutal constraint: **the prefix must be byte-for-byte identical to hit the cache**. Not "close enough" — any single byte of change — even just toggling a request header or reordering a tool — invalidates the entire prefix cache, forcing all 50-100K tokens to be reprocessed.

This gives context engineering a feeling of **"dancing in chains"**: you can't freely reorder prompt sections, can't casually add or remove tool definitions, can't change request metadata mid-session... every design decision must simultaneously satisfy two goals — **give the model the best possible context** while **not breaking the cache**. Throughout this chapter, you'll see this tension repeatedly: many mechanisms that seem "over-engineered" are actually driven by cache stability concerns.

The amount of engineering Claude Code puts into this area far exceeds most people's expectations. This chapter will deeply analyze its complete context management system.

Key files: `src/context.ts` (190 lines), `src/utils/api.ts`, `src/services/compact/`
