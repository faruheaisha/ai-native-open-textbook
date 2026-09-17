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
pageSha256: "6cbd3c564160e871ecf17a933a5eb3532a591b48346dd337ddc5a20c6758c1e5"
contentMode: "local-full"
zh: ""
---

## Track tabs with `browser_state`

Claude addresses tabs by `tab_id`, your application is the source of truth for which tabs exist, and you report that state in a `browser_state` content block that Claude never sees directly: the API renders the text Claude reads from it.

```json
{
  "type": "browser_state",
  "tabs": [
    {
      "tab_id": "tab-1",
      "title": "Documentation",
      "url": "https://example.com/docs",
      "active": true
    },
    { "tab_id": "tab-2", "title": "Pricing", "url": "https://example.com/pricing" }
  ]
}
```

* `tabs` is the full inventory of open tabs after the call, not a delta. It may be empty; whenever it isn't, exactly one entry carries `"active": true`.
* `state_changes` (not shown here) reports side effects of the call: a `tab_opened` entry for each tab the call opened that's still open when it finishes, whose `tab_id` must also appear in `tabs`, and [download events](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#report-downloads). Omit the field when there's nothing to report; an empty array is rejected.
* Send the block only on results that answer a browser member call, at most once per `tool_result`, and never on a result with `is_error: true`. You express "no tab state to report" by omitting the block.
* The API renders `tabs` into text for Claude as the next two sections describe; download entries in `state_changes` are validated but not rendered.

**You assign `tab_id` values.** Any stable string works, such as your automation library's page identifier or your own counter, as long as you don't reuse a `tab_id` while a tab with that identifier is still listed as open in an earlier result. The API enforces these limits on the block:

* Each `tab_id`, `title`, and `url` may be at most 4,096 characters, `tab_id` must be non-empty, and none may contain control characters (including newlines) or Unicode line or paragraph separators.
* A block may list at most 100 tabs and 200 state changes.
* The same limits apply to the `tab_id` Claude passes to `switch_tab` and `close_tab`, because the API renders it into the result text, so answer a call whose `tab_id` violates them with an error result instead of a `browser_state` block.

  Tab titles and URLs come from the page and render into text Claude reads, so they're a prompt-injection surface. The API renders URLs verbatim, so sanitize page-supplied URLs before populating `tabs`. It escapes double quotes and backslashes in titles when it renders them, so don't pre-escape titles (a pre-escaped title reaches Claude double-escaped); truncating or dropping suspicious titles is still worthwhile. The length and character limits the API enforces are a floor, not a defense.

### Tab management results

For `new_tab`, `switch_tab`, `close_tab`, and `list_tabs`, a successful result's `content` is exactly one `browser_state` block with no text or image, and the API writes the text Claude sees. A `new_tab` result's block must also carry exactly one `tab_opened` state change whose `tab_id` matches the entry marked `active: true`.

| Member       | Text Claude sees                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `switch_tab` | `Switched to tab \{tab_id\}`, taken from the call's `input.tab_id`                                                            |
| `close_tab`  | `Closed tab \{tab_id\}`, taken from the call's `input.tab_id`                                                                 |
| `new_tab`    | `Created new tab with tab_id: \{tab_id\}, URL: \{url\}. It is now the current tab.`, taken from the entry marked `active: true` |
| `list_tabs`  | `Available tabs:` followed by one line per tab, or `No tabs available` when `tabs` is empty                                 |

A `list_tabs` result whose block lists two tabs with the first one active renders as follows, with each line indented two spaces and `(current)` appended to the active tab only:

```text wrap
Available tabs:
  • tab_id tab-1: "Documentation" (https://example.com/docs) (current)
  • tab_id tab-2: "Pricing" (https://example.com/pricing)
```

An error result for one of these members is the reverse: ordinary error text in `content`, `is_error: true`, and no `browser_state` block.

For example, when Claude calls `new_tab` (its `input` is empty), your executor opens the tab, makes it active, and returns the inventory with one `tab_opened` entry:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01WvHSbQVV9j5nWGvTmk4vNL",
      "toolset_name": "browser",
      "content": [
        {
          "type": "browser_state",
          "tabs": [
            { "tab_id": "tab-1", "title": "Documentation", "url": "https://example.com/docs" },
            { "tab_id": "tab-2", "title": "Pricing", "url": "https://example.com/pricing" },
            { "tab_id": "tab-3", "title": "", "url": "about:blank", "active": true }
          ],
          "state_changes": [{ "type": "tab_opened", "tab_id": "tab-3" }]
        }
      ]
    }
  ]
}
```

Claude sees `Created new tab with tab_id: tab-3, URL: about:blank. It is now the current tab.` Report the URL the tab was opened at, as here, not one it later redirects to; later results report the tab's then-current URL.

### Tab context on other results

On every other member the block is optional: send it when the set of open tabs, the active tab, or a tab's title or URL changed, or when there are `state_changes` to report, and always include the full `tabs` inventory. When a result carries both text and a `browser_state` block, the API appends a `Tab Context` footer to that result's text, separated from your text by a blank line, so Claude receives the new state without a separate `list_tabs` call:

```text wrap
Tab Context:
- Executed on tab_id: tab-1
- Available tabs:
  • tab_id tab-1: "Documentation" (https://example.com/docs)
  • tab_id tab-2: "Pricing" (https://example.com/pricing)
```

`Executed on` names the tab the call ran on, which is its `tab_id` input when present and otherwise the active tab, and the footer's tab lines carry no `(current)` marker. Don't append this text yourself; send the structured block and let the API render it. The footer is deduplicated, so identical tab state isn't rendered again on later results and populating the block liberally costs nothing.

Three cases render no footer even when the block is present:

* Any `zoom` result.
* A result with no `text` block (an image-only `screenshot` result, for example). Nothing is rendered or remembered for that result; the tab context appears on the next result that carries both text and a `browser_state` block, so include a short text block alongside the image when you want Claude to see a tab change on that same result.
* A result whose `tabs` list is empty on a call that carried no `tab_id`, because there's no tab to name.

For example, when Claude clicked the "Pricing" link (`ref_5`) earlier in this session, the page opened it in a new tab Claude didn't ask for, and without a report Claude would have to call `list_tabs` to discover it. Return the click's acknowledgment plus a block whose `state_changes` names the opened tab, marking whichever tab your executor left active:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01EgTXj1FjE2FCTt2zNFWLao",
      "toolset_name": "browser",
      "content": [
        { "type": "text", "text": "Clicked element ref_5." },
        {
          "type": "browser_state",
          "tabs": [
            {
              "tab_id": "tab-1",
              "title": "Documentation",
              "url": "https://example.com/docs",
              "active": true
            },
            { "tab_id": "tab-2", "title": "Pricing", "url": "https://example.com/pricing" }
          ],
          "state_changes": [{ "type": "tab_opened", "tab_id": "tab-2" }]
        }
      ]
    }
  ]
}
```

Claude sees `Clicked element ref_5.` followed by the Tab Context footer shown earlier. A tab opened during a call that failed gets no `tab_opened` entry, because error results carry no `browser_state`; it appears in the `tabs` inventory of the next successful result instead. In a batch, attach the block to the result of the call during which the change happened, and give every successful tab-management result its own block even when an earlier result in the same turn reported the same state.

### Report downloads

When a click or navigation starts a file download, report it in `state_changes` on the result of the call during which it happened, correlated across results by a `download_id` you assign. Downloads run asynchronously and can span several results, so there are three event types:

| `type`               | Fields                                       | When to send                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `download_started`   | `download_id`, `url`                         | On the result of the call during which the download began. `url` is the final URL the file is served from, after redirects.                                                                                                                                                                                                                             |
| `download_completed` | `download_id`, `url`, `path?`, `size_bytes?` | On the result of whichever later call is running when the download finishes. Include `path` only when another tool in the same environment (for example, the [bash tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool) or `file_upload`) can read the file there; otherwise `download_id` is the download's only identifier. |
| `download_failed`    | `download_id`, `url`, `error?`               | When the download fails or is canceled, with the reason in `error` if the browser provides one.                                                                                                                                                                                                                                                         |

The API validates these entries but doesn't render them into text Claude sees, so when Claude needs to act on the file, also mention the file name or `path` in the same result's `text` block.

For example, a click on "Download price list (CSV)" (`ref_8`) in the Pricing tab starts a download, so the click's result carries a `download_started` entry with `download_id` `"dl-1"` and the file's URL. The download finishes while a later `screenshot` call is running, so that result's `content` holds the image, a text block such as `Screenshot captured. Download complete: /home/user/downloads/price-list.csv (48,213 bytes).`, and this `browser_state` block reporting the completion under the same `download_id`:

```json
{
  "type": "browser_state",
  "tabs": [
    { "tab_id": "tab-1", "title": "Documentation", "url": "https://example.com/docs" },
    {
      "tab_id": "tab-2",
      "title": "Pricing",
      "url": "https://example.com/pricing",
      "active": true
    }
  ],
  "state_changes": [
    {
      "type": "download_completed",
      "download_id": "dl-1",
      "url": "https://example.com/pricing/price-list.csv",
      "path": "/home/user/downloads/price-list.csv",
      "size_bytes": 48213
    }
  ]
}
```

Download reports follow these rules:

* At most one entry per `download_id` in a single block, so a download that starts and finishes during the same call reports only `download_completed`.
* Never send `state_changes` on an `is_error: true` result; report a download event that occurred during a failed call on the next successful result.
* `state_changes` isn't an inventory of downloads in progress; report each event once.
* Each entry carries only the fields its `type` declares. `size_bytes` is a non-negative integer, `download_id` is non-empty, and `download_id`, `url`, `path`, and `error` are each at most 4,096 characters with no control characters or Unicode line or paragraph separators. The `url` comes from the remote server and often carries signed query-string credentials after redirects, so strip query parameters you don't want in Claude's context and sanitize it before reporting it or using it in a filesystem path.
