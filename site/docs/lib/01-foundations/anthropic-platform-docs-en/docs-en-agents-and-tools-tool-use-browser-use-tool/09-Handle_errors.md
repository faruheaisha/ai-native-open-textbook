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
pageSha256: "22c338c621b2e46c285a5ded435d2ffec5d6b1ee899d3952190c2f99506bf45c"
contentMode: "local-full"
zh: ""
---

## Handle errors

Report a failed call to Claude as an ordinary error result: `is_error: true`, text content that says what went wrong, `toolset_name` echoed, and no `browser_state` block.

### Return errors from your executor

Make error text specific, because Claude reads it and adapts: `Error: Navigation to https://example.com/status timed out after 30 seconds. The page may be unavailable.` gives Claude something to act on where a bare `Error: navigation failed` doesn't. Other common cases:

    ```json
    \{
      "type": "tool_result",
      "tool_use_id": "toolu_01LeUTyqkhRxBFq1QTG3pkwN",
      "toolset_name": "browser",
      "is_error": true,
      "content": "Error: Navigation refused. Only http and https URLs are allowed."
    \}
    ```

    ```json
    \{
      "type": "tool_result",
      "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
      "toolset_name": "browser",
      "is_error": true,
      "content": "Error: ref_3 is stale or not found on the current page. Re-read the page to get fresh references."
    \}
    ```

    ```json
    \{
      "type": "tool_result",
      "tool_use_id": "toolu_013h2Q55HcNwVyapSpy2s5ZG",
      "toolset_name": "browser",
      "is_error": true,
      "content": "Error: javascript_exec is not enabled in this environment."
    \}
    ```

    When the `left_click` on `ref_3` from [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#batch-actions) fails with the stale-reference error shown earlier, the `type` and `key` calls after it each get this result:

    ```json
    \{
      "type": "tool_result",
      "tool_use_id": "toolu_01FkP8rTz6uYh2mNq4LsXw7v",
      "toolset_name": "browser",
      "is_error": true,
      "content": "Not executed: an earlier action in this turn failed."
    \}
    ```

### Request errors

The API validates the toolset entry and every member `tool_use` and `tool_result` block in the conversation. When one is malformed, the API returns an `invalid_request_error` before Claude runs. In the following table, the left column names what you sent.

| Request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Why it fails and what to do                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An option or combination the toolset entry doesn't accept, for example, a `name`, `strict: true`, `input_examples`, `defer_loading` on the entry itself, a `configs` key that isn't a member name, a field other than `enabled` or `defer_loading` in a member's `configs` value ([Configure the toolset](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#configure-the-toolset)), enabled members whose `defer_loading` values differ ([Configure the toolset](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#configure-the-toolset)), a `configs` that leaves no member enabled, a code execution caller in `allowed_callers`, the legacy `fine-grained-tool-streaming-2025-05-14` beta header on the request, a `tool_choice` of type `tool` naming `browser` or a member, or a second browser toolset entry or another tool named `browser` | These aren't supported on client toolsets. See [Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets) for each rule and its alternative.                                                              |
| A `tool_result` answering a member call without `"toolset_name": "browser"` or with a different value, or `toolset_name` on a result whose call wasn't a member call                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Echo `toolset_name` exactly on member results, and only on them.                                                                                                                                                                                               |
| A member `tool_use` from an earlier turn with no matching `tool_result`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Answer every member call, including the ones you didn't run after a failure.                                                                                                                                                                                   |
| A content block other than `text`, `image`, or `browser_state` in a member result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Member results accept only those three block types.                                                                                                                                                                                                            |
| A `browser_state` block that breaks a rule in [Track tabs with `browser_state`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#track-tabs-and-page-state), for example, one on an `is_error: true` result or on a result that doesn't answer a browser member call, more than one in a result, a non-empty `tabs` without exactly one `active: true` entry, a duplicate `tab_id`, an empty `state_changes` array, a `tab_opened` whose `tab_id` isn't in `tabs`, two state changes for one `download_id` or a state-change field its `type` doesn't declare ([Report downloads](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#report-downloads)), or a field over its limits                                                                                                                                                                  | Fix the block. "Nothing to report" is expressed by omitting the block or the `state_changes` field, never by an empty value.                                                                                                                                   |
| A successful `new_tab`, `switch_tab`, `close_tab`, or `list_tabs` result whose `content` isn't exactly one `browser_state` block, or a `new_tab` result without exactly one `tab_opened` matching the active tab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | The API renders these results from the block and needs it in that exact shape; see [Tab management results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-management-results).                                            |
| An `image` in a result over your model's [image size limits](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size), or over the stricter per-image limit that applies once the request holds [more than 20 images](https://platform.claude.com/docs/en/build-with-claude/vision#request-limits), counting screenshots and `zoom` images in earlier results                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | The API doesn't downscale toolset images. Resize screenshots before returning them ([Size screenshots to fit image limits](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#handle-coordinate-scaling-for-higher-resolutions)). |
| A `model` that doesn't support `browser_toolset_20260801`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | See [Compatibility](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#compatibility) for the supported models.                                                                                                                    |
