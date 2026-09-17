---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md"
sourceSha256: "2e704eb55773e50e3408501b9a533b88f0f8944182cf49d0f912106e04851cef"
pageSha256: "35a2045493cfe0817eb45ec7ad4ed9d9f10224e5ef7e8a0c43344de5752991fd"
contentMode: "local-full"
zh: ""
---

This tutorial builds a calendar-management agent in five concentric rings. Each ring is a complete, runnable program that adds exactly one concept to the ring before it. By the end you will have written the agentic loop by hand and then replaced it with the Tool Runner SDK abstraction.

The example tool is `create_calendar_event`. Its schema uses nested objects, arrays, and optional fields, so you will see how Claude handles realistic input shapes rather than a single flat string.

  Every ring runs standalone. Copy any ring into a fresh file and it will run without the code from earlier rings.

## 本篇目录

- [Ring 1: Single tool, single turn](https://platform.claude.com/docs)
- [Ring 2: The agentic loop](https://platform.claude.com/docs)
- [Ring 3: Multiple tools, parallel calls](https://platform.claude.com/docs)
- [Ring 4: Error handling](https://platform.claude.com/docs)
- [Ring 5: The Tool Runner SDK abstraction](https://platform.claude.com/docs)
- [What you built](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
