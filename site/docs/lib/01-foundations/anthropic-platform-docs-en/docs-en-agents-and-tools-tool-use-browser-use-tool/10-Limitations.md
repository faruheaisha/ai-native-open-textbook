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
sourceRel: "docs/en/agents-and-tools/tool-use/browser-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/browser-use-tool.md"
sourceSha256: "d43f412bbfd1e7c341a24d092ded1e9b9fa70b226fe41111f02453c9a4d81255"
pageSha256: "c60e079edd4d3d54e28c139e4a7aabfe5efc277747f7067ae84c6748e039f1a3"
contentMode: "local-full"
zh: ""
---

## Limitations

* **Platform availability:** Browser use is available on the Claude API and [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai).
* **Whole-input streaming only:** When you stream, each member's `input` arrives as one complete `input_json_delta` ([Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets)).
* **Element references are best-effort:** Highly dynamic pages (virtualized lists, canvas-rendered interfaces, pages that re-render on scroll) might not expose stable references, and Claude falls back to screenshots and coordinate clicks there.
* **`read_console` and `read_network` depend on your browser automation:** They report only what it can capture, and only from the moment it attached to a tab.
* **General agent limitations apply:** Latency, vision accuracy, and prompt-injection risks carry over from computer use (see the computer use tool's [Limitations](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#understand-computer-use-limitations)), and its guidance under [Optimize model performance with prompting](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#optimize-model-performance-with-prompting), [Manage screenshot history](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#manage-screenshot-history), and [Follow implementation best practices](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#follow-implementation-best-practices) (action delays, action validation, and logging) applies to browser executors too.
