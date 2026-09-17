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
pageSha256: "bbdc76c0f874b2b201102ca93e33004349a643934a87bbf2372b23068daa469a"
contentMode: "local-full"
zh: ""
---

## Migrate from `computer_20251124`

Upgrading from `computer_20251124` to the toolset is optional: the models listed for `computer_20251124` under [Earlier tool versions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#earlier-tool-versions) keep accepting it with its beta header, so an existing integration keeps working until you change it. To upgrade, make the following changes together:

1. **Remove the beta header.** Drop `anthropic-beta: computer-use-2025-11-24` from your requests. In the SDKs, remove the `betas` parameter and call the Messages API through the standard client rather than the beta namespace.
2. **Change the `tools` entry.** Set `type` to `computer_toolset_20260801` and delete `name`, `display_width_px`, `display_height_px`, `display_number`, and `enable_zoom`. The toolset rejects each of these fields.
3. **Choose whether to keep zoom enabled.** Zoom is enabled by default on the toolset, whereas `enable_zoom` defaults to `false`. If your environment doesn't implement zoom, add <code v-pre>"configs": \{"zoom": \{"enabled": false}}</code> to keep the previous behavior; otherwise implement it (see [Available actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#available-actions)).
4. **Handle every block in a turn.** Update your agent loop to iterate over every `tool_use` block in a response rather than reading only the first, and to dispatch on the block's `name` together with `toolset_name` instead of on `input.action`. Member inputs no longer contain an `action` field; the remaining fields are unchanged.
5. **Run blocks in order and use the halt text.** Run the blocks sequentially, stop at the first failure, and answer the remaining blocks with `Not executed: an earlier computer action in this turn failed.` as described in [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#batch-actions). If your loop can't run batches yet, [Tool parameters](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#tool-parameters) explains how to limit Claude to one action per turn.
6. **Echo `toolset_name` on results.** Add `"toolset_name": "computer"` to every `tool_result` that answers a member call. Results may contain only `text` and `image` content.
7. **Support `repeat` on `key`.** The `key` member accepts an optional `repeat` count from 1 to 100. A handler that ignores unrecognized fields would press the key once, so make your `key` handler honor `repeat`.
8. **Resize screenshots yourself.** The toolset rejects a screenshot or zoom image that exceeds the model's image limits instead of downscaling it. Resize before returning the image and keep scaling coordinates as described in [Size screenshots to fit image limits](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#handle-coordinate-scaling-for-higher-resolutions).
9. **Remove unsupported options.** Move any `defer_loading` from the entry into `configs`, with the same value on every enabled member. The other options not supported on toolset entries are listed under [Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets).

This is the `tools` entry before the change, sent with the `anthropic-beta: computer-use-2025-11-24` header:

```json
{
  "type": "computer_20251124",
  "name": "computer",
  "display_width_px": 1024,
  "display_height_px": 768,
  "display_number": 1
}
```

This is the `tools` entry after the change, sent with no beta header. The `configs` object keeps zoom off to match the earlier entry, which doesn't set `enable_zoom`; omit `configs` entirely to accept the default and let Claude zoom:

```json
{
  "type": "computer_toolset_20260801",
  "configs": {
    "zoom": { "enabled": false }
  }
}
```

The following pair shows a `tool_use` block before and after the change. The action name moves from `input.action` to `name`, and the block gains `toolset_name`:

```json
{
  "type": "tool_use",
  "id": "toolu_01A9r5kQm2LxWc7vT3nZ4bJs",
  "name": "computer",
  "input": { "action": "left_click", "coordinate": [500, 300] }
}
```

```json
{
  "type": "tool_use",
  "id": "toolu_01A9r5kQm2LxWc7vT3nZ4bJs",
  "name": "left_click",
  "toolset_name": "computer",
  "input": { "coordinate": [500, 300] }
}
```
