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
pageSha256: "25385819497b924d8a03170bd3ec8c8961cc68f8ebffbf3a873b55f35425a48d"
contentMode: "local-full"
zh: ""
---

## Member tools

The `browser_toolset_20260801` entry declares 31 member tools; each call's `input` is exactly the parameters listed here, and `tab_id`, where optional, defaults to the active tab. `Target`, `CoordinateTarget`, and `RefTarget` are the shapes described in [Targets and coordinates](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#targets-and-coordinates). Four members (`javascript_exec`, `file_upload`, `read_console`, and `read_network`) are disabled by default and appear only when you [enable them](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#enable-optional-member-tools). The input bounds and output conventions noted in each member's row are stated to Claude, not enforced by the API, so validate inputs (including coordinates against your viewport) and apply the conventions in your executor.

Only `screenshot` and `zoom` require an [`image` block](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls#handling-results-from-client-tools) in their result, and the four tab-management members (`new_tab`, `list_tabs`, `switch_tab`, and `close_tab`) return exactly one `browser_state` block (see [Tab management results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-management-results)). Every other member returns a `text` block: either a short acknowledgment such as `Clicked element ref_2.` or the member's output. Any result other than a tab-management result may also carry an `image` block, typically a screenshot taken after the action, so Claude sees the outcome without a separate `screenshot` call; [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#batch-actions) shows where to attach one in a batch. A member `tool_result` may contain only `text`, `image`, and `browser_state` content blocks.

### Navigation and capture

| Member       | Input               | Description                                                                                                                                                                                                                                                                                     |
| ------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigate`   | `url`, `tab_id?`    | Load an `http` or `https` URL, or move through history with `"back"`, `"forward"`, or `"reload"`. Treat a URL without a scheme as `https://` and refuse any other scheme with an error result. Return a short acknowledgment, plus a `browser_state` block when the tab's URL or title changed. |
| `screenshot` | `tab_id?`           | Capture the viewport and return an `image` block.                                                                                                                                                                                                                                               |
| `zoom`       | `region`, `tab_id?` | Return a cropped, upscaled `image` of `region`, given as `[x0, y0, x1, y1]` in viewport pixels, for closer inspection of small text or controls.                                                                                                                                                |

### Pointer

| Member            | Input                                                                       | Description                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `left_click`      | `target: Target`, `modifiers?`, `tab_id?`                                   | Left-click a coordinate or a referenced element. `modifiers` is a chord held during the click, for example, `"shift"` or `"ctrl+shift"`.                       |
| `right_click`     | `target: Target`, `modifiers?`, `tab_id?`                                   | Right-click a coordinate or element.                                                                                                                           |
| `middle_click`    | `target: Target`, `modifiers?`, `tab_id?`                                   | Middle-click a coordinate or element.                                                                                                                          |
| `double_click`    | `target: Target`, `modifiers?`, `tab_id?`                                   | Double left-click a coordinate or element.                                                                                                                     |
| `triple_click`    | `target: Target`, `modifiers?`, `tab_id?`                                   | Triple left-click a coordinate or element, which typically selects a line or paragraph.                                                                        |
| `hover`           | `target: Target`, `tab_id?`                                                 | Move the pointer over a coordinate or element without clicking.                                                                                                |
| `left_click_drag` | `from: CoordinateTarget`, `target: CoordinateTarget`, `tab_id?`             | Press at `from`, drag to `target`, and release.                                                                                                                |
| `left_mouse_down` | `target: CoordinateTarget`, `tab_id?`                                       | Press and hold the left button at a coordinate; pair with `left_mouse_up` for a custom drag.                                                                   |
| `left_mouse_up`   | `target: CoordinateTarget`, `tab_id?`                                       | Release the left button at a coordinate.                                                                                                                       |
| `mouse_move`      | `target: CoordinateTarget`, `tab_id?`                                       | Move the pointer to a coordinate.                                                                                                                              |
| `scroll`          | `target: CoordinateTarget`, `scroll_direction`, `scroll_amount?`, `tab_id?` | Scroll at a viewport position. `scroll_direction` is `"up"`, `"down"`, `"left"`, or `"right"`; `scroll_amount` is in scroll-wheel notches, 1 to 10, default 3. |
| `scroll_to`       | `target: RefTarget`, `tab_id?`                                              | Scroll a referenced element into view.                                                                                                                         |

### Keyboard and timing

| Member     | Input                         | Description                                                                                                                                                                               |
| ---------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | `text`, `tab_id?`             | Type a literal string at the current focus.                                                                                                                                               |
| `key`      | `text`, `repeat?`, `tab_id?`  | Press a key or chord. `text` is a single key (`"Enter"`), a chord joined with `+` (`"ctrl+a"`), or a space-separated sequence (`"Backspace Backspace"`); `repeat` is 1 to 100, default 1. |
| `hold_key` | `text`, `duration`, `tab_id?` | Hold a key or chord for `duration` seconds, 0 to 30.                                                                                                                                      |
| `wait`     | `duration`, `tab_id?`         | Pause for `duration` seconds, 0 to 30.                                                                                                                                                    |

### Page reading

| Member          | Input                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read_page`     | `filter?`, `depth?`, `ref?`, `tab_id?` | Return the page's accessibility tree as text with each element tagged with a reference such as `[ref_2]`. With `filter` omitted, return every visible element; with `"interactive"`, only visible interactive elements; with `"all"`, also elements outside the viewport. `depth` caps the tree depth (minimum 1, default 15) and `ref` scopes the read to that element's subtree. Cap the output at 50,000 characters and say so in the text; Claude then narrows with a smaller `depth` or a `ref`. |
| `find`          | `query`, `tab_id?`                     | Search for elements matching a natural-language description such as `"search field"` or `"add to cart button"`, and return up to 20 matches in the same tagged format as `read_page`.                                                                                                                                                                                                                                                                                                                 |
| `get_page_text` | `tab_id?`                              | Return the page's visible text as plain text, prioritizing the main article content; suited to articles, documentation, and other text-heavy pages.                                                                                                                                                                                                                                                                                                                                                   |

### Forms and files

| Member                              | Input                                                     | Description                                                                                                                                                                                                                                                                      |
| ----------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form_input`                        | `target: RefTarget`, `value`, `tab_id?`                   | Set a form element's value directly. `value` is a `string`, `number`, or `boolean`; use a `boolean` for checkboxes and an option's value or visible text for selects.                                                                                                            |
| `file_upload` (disabled by default) | `target: RefTarget`, `paths?`, `document_ids?`, `tab_id?` | Set the files on a file-input element from `paths` on the executor's filesystem, `document_ids` your application has staged, or both; at least one is required. See [Upload files](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#upload-files). |

### Diagnostics and scripting

| Member                                  | Input             | Description                                                                                                                                                                                                                                                                      |
| --------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read_console` (disabled by default)    | `tab_id?`         | Return the tab's console entries (log, warning, and error lines) accumulated since the last read, one line per entry. See [Read console and network activity](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#read-console-and-network-activity). |
| `read_network` (disabled by default)    | `tab_id?`         | Return the tab's network requests (method, URL, status, MIME type, timing) since the last read, one line per entry.                                                                                                                                                              |
| `javascript_exec` (disabled by default) | `text`, `tab_id?` | Run `text` as JavaScript in the page context and return the value of the last expression as text. See [Enable optional members](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#enable-optional-member-tools).                                    |

### Tab management

| Member       | Input               | Description                            |
| ------------ | ------------------- | -------------------------------------- |
| `new_tab`    | (none)              | Open a tab and make it the active tab. |
| `list_tabs`  | (none)              | Report the tab inventory.              |
| `switch_tab` | `tab_id` (required) | Make `tab_id` the active tab.          |
| `close_tab`  | `tab_id` (required) | Close `tab_id`.                        |

On success, each of these returns exactly one `browser_state` block and no text or image; see [Tab management results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-management-results).
