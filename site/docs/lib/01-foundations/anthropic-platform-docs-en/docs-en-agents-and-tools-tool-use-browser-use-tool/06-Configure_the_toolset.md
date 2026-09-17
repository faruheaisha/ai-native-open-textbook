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
pageSha256: "565e99a44e3247c307748d3469b7144e1b7060c8f3ec6d3502d20140695c244d"
contentMode: "local-full"
zh: ""
---

## Configure the toolset

Besides `type`, the toolset entry accepts `configs`, `cache_control`, and `allowed_callers`; the rules these fields share with the computer use toolset are listed under [Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets), and this section covers the browser-specific defaults. `configs` is an object keyed by member name, and each member's value accepts two fields:

| Field           | Default                                                                                                                                                             | Meaning                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`       | `true`, except `false` for the four [optional members](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#enable-optional-member-tools) | Whether the member is offered to Claude.                                                                                                                                                                                                                                                                                                         |
| `defer_loading` | `false`                                                                                                                                                             | Whether the toolset's definition is deferred for tool search. Must resolve to the same value on every enabled member. With the four optional members left disabled, deferring the toolset means setting it on the other 27; see [Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets). |

### Enable or disable member tools

List only the members you want to change in `configs`; every member you omit keeps its default. For example, an executor that implements console reads but not low-level pointer or key-hold control turns `read_console` on and withholds three members:

```json
{
  "type": "browser_toolset_20260801",
  "configs": {
    "read_console": { "enabled": true },
    "left_mouse_down": { "enabled": false },
    "left_mouse_up": { "enabled": false },
    "hold_key": { "enabled": false }
  }
}
```

A disabled member disappears from the definition Claude sees; that doesn't guarantee Claude never names it, so your executor still answers such a call with an [error result](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#return-errors-from-your-executor).

### Combine with other tools

Declare the browser use tool alongside your own tools and other Anthropic-provided tools in the same `tools` array. A custom tool may share a member's name (your own `navigate`, for example), because `toolset_name` distinguishes Claude's calls, but no other entry may be named `browser`, and a request may contain only one browser toolset entry.

You can also declare it alongside the [computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool), either the toolset or an earlier computer use tool version. The two work independently, each in its own coordinate frame (viewport pixels here, desktop screenshot pixels there), and Claude's calls to members that share a name, such as `screenshot` or `key`, are told apart by `toolset_name`.
