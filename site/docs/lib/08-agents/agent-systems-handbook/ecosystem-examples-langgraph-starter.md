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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/ecosystem/examples/langgraph-starter/index.mdx"
sourceRel: "ecosystem/examples/langgraph-starter/index.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/ecosystem/examples/langgraph-starter/index.mdx"
sourceSha256: "9c0e13c13ee7732f95f4cdd4f24310502fd69f182c8fc00bcec1182cff6b23ca"
pageSha256: "9c0e13c13ee7732f95f4cdd4f24310502fd69f182c8fc00bcec1182cff6b23ca"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

This starter shows the smallest useful graph-shaped agent example in the repo:
plan, route, synthesize.

## Status

`starter`

Source code: [ecosystem/examples/langgraph-starter](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/ecosystem/examples/langgraph-starter)

## Why It Exists

Framework comparison pages are easier to extend when contributors can point to
small repo-owned examples instead of only to external demos. This starter keeps
the shape recognizable without turning the repo into a framework tutorial set.

## Related Lab Pages

- [Agent Frameworks](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/ecosystem/agent-frameworks/README.md)
- [Ecosystem Overview](/lib/08-agents/agent-systems-handbook/ecosystem-2)

## Folder Structure

```text
langgraph-starter/
├── index.mdx
└── src/
    ├── branching.py
    ├── graph.py
    └── run_summary.py
```

## Quick Start

This project is a starter. Read `src/graph.py` for the minimal graph state and
node boundaries, then expand it into a fuller runnable example if needed. For a
repo-level smoke check, run `python3 scripts/verify_example_projects.py` from
the repository root.

## Included Sample Files

- `src/graph.py`: a minimal plan, route, synthesize state transition sketch
- `src/branching.py`: a narrow example of how route choice and retry policy can
  be made explicit
- `src/run_summary.py`: a tiny reporting surface for turning graph state into a
  readable execution summary

## Constraints

- No framework dependency is wired.
- The graph is illustrative rather than executable.
- Tool adapters and model calls are placeholders.

## Next Steps

- Add a real runtime dependency.
- Add one tool node and one retry path.
