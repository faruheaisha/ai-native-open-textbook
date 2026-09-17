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
sourceRel: "docs/en/agents-and-tools/tool-use/computer-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/computer-use-tool.md"
sourceSha256: "4de659db5a454a438de8f37a25742b665254c305624f55cfcc5b76491ae62d46"
pageSha256: "6d4534fafa2c2c015503515143b580466cb08bf51456d68397ad587f0ea05c6f"
contentMode: "local-full"
zh: ""
---

## Pricing

Computer use follows the standard [tool use pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview#pricing). When using the computer use tool:

**Toolset definition overhead:** Declaring `computer_toolset_20260801` with its default members adds about 4,500 input tokens to a request (about 4,520 on Claude Fable 5, Claude Mythos 5, Claude Opus 5, and Claude Opus 4.8, and about 4,590 on Claude Sonnet 5), which covers the member tool definitions and the tool use system prompt. Disabling `zoom` with `configs` removes about 410 of those tokens. The exact count for a request is reported in the response `usage`, and you can estimate it in advance with the [token counting endpoint](https://platform.claude.com/docs/en/build-with-claude/token-counting).

**Earlier tool versions:** The following figures apply to the `computer_20251124` and `computer_20250124` tool versions, not to `computer_toolset_20260801`:

* System prompt overhead: 466–499 tokens added to the system prompt
* Tool definition: about 735 input tokens per tool definition (measured with `computer_20250124`)

**Additional token consumption:**

* Screenshot and zoom images returned in tool results, billed as image input (see [Vision pricing](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size))
* Tool execution results returned to Claude

  If you're also using bash or text editor tools alongside computer use, those tools have their own token costs as documented in their respective pages.
