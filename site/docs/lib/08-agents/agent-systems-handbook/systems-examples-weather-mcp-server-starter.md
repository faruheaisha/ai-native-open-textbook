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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/examples/weather-mcp-server-starter/index.mdx"
sourceRel: "systems/examples/weather-mcp-server-starter/index.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/systems/examples/weather-mcp-server-starter/index.mdx"
sourceSha256: "900b30cc996ed7a1aa02f2142ea61bdc02eb5c0773517db8d4f0e511bf11a686"
pageSha256: "900b30cc996ed7a1aa02f2142ea61bdc02eb5c0773517db8d4f0e511bf11a686"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

This starter sketches a protocol-facing tool service that exposes a small,
stable weather interface for agent use.

## Status

`starter`

Source code: [systems/examples/weather-mcp-server-starter](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/systems/examples/weather-mcp-server-starter)

## Why It Exists

Protocol examples are easier to reason about when they focus on one tool
boundary. This starter keeps the scope to request validation, predictable tool
shapes, and response packaging.

## Related Lab Pages

- [Protocols And Interoperability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/protocols-and-interoperability/README.md)
- [Systems Overview](/lib/08-agents/agent-systems-handbook/systems-2)

## Folder Structure

```text
weather-mcp-server-starter/
├── index.mdx
└── src/
    ├── access_policy.py
    ├── server.py
    └── tool_manifest.py
```

## Quick Start

This is a starter, not a finished server. The example file shows the interface
shape and handler boundary without bringing in a full protocol runtime. For a
repo-level smoke check, run `python3 scripts/verify_example_projects.py` from
the repository root.

## Included Sample Files

- `src/server.py`: the minimal request and response boundary for one tool
- `src/tool_manifest.py`: a compact example of how a protocol-facing starter
  can declare its input schema and output shape
- `src/access_policy.py`: a small authorization boundary that keeps permission
  checks separate from the tool handler itself

## Constraints

- No transport layer is implemented.
- No real weather API integration is included.
- Authentication and permission rules are still placeholders.

## Next Steps

- Add a concrete transport surface.
- Add permission checks and request logging.
