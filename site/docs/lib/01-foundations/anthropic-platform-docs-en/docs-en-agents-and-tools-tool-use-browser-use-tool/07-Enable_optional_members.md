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
pageSha256: "2e41bea45f290397909da7798e4ee457888297b92503b853f7bd0a56261d4633"
contentMode: "local-full"
zh: ""
---

## Enable optional members

Four member tools are disabled by default: `javascript_exec` and `file_upload` because they widen what a manipulated page could make Claude do, and `read_console` and `read_network` because not every browser automation stack can supply those logs and they widen what page-controlled content reaches Claude. Enable each one with `configs` (for example, <code v-pre>"configs": \{"file_upload": \{"enabled": true}}</code>) only when your executor implements it and the task needs it.

### Upload files

`file_upload` sets the files on an `<input type="file">` element directly, which is more reliable than driving a native file chooser. Its `target` is a reference only, because the call needs the element's identity, and it takes `paths`, `document_ids`, or both:

* `paths` are file paths on the executor's filesystem, for deployments where the executor can read your application's files directly (the same condition under which you populate a download's `path`).
* `document_ids` are identifiers for files your application has staged for the browser, for deployments where it can't. Your application defines what the identifiers mean; scope their resolution the way you scope `paths`, to files staged for this task.

```json
{
  "type": "tool_use",
  "id": "toolu_01N7gVzFEfZjLjgsYwnrPgrF",
  "name": "file_upload",
  "toolset_name": "browser",
  "input": {
    "target": { "type": "ref", "ref": "ref_12" },
    "paths": ["/home/user/uploads/summary.pdf"],
    "tab_id": "tab-2"
  }
}
```

Claude writes these paths while it's reading untrusted pages, so an unrestricted implementation would let a malicious page direct the upload of any file the executor can read to a site the page controls. Enable the member only when your executor resolves each path (following symlinks and `..` segments) and accepts nothing outside a dedicated, allowlisted upload directory that holds only files meant for the task. Don't reuse the browser's download directory for this; if you do, every file a page causes the browser to download becomes uploadable.

### Run JavaScript in the page

`javascript_exec` runs the expression Claude writes in the page's context and returns the value of the last expression as text; Claude writes an expression, not a `return` statement. The code runs with the page's full privileges, including its cookies, storage, and same-origin requests. Enable the member only in sessions that hold no credentials, keep the domain allowlist from [Security considerations](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#security-considerations) in force, treat the returned value as untrusted input, and log the code Claude emits.

### Read console and network activity

`read_console` returns the tab's console entries and `read_network` returns its network requests, each as text with one line per entry accumulated since the previous read of that tab. A console line carries a log, warning, or error entry; a network line carries the method, URL, status, MIME type, and timing. Entries exist only from the moment your browser automation attached to the tab, so an empty result doesn't mean a tab that was already open had no traffic.

These members let Claude diagnose a misbehaving page (a failed request behind a spinner, a script error behind a dead button) without repeated screenshots. Console and network entries are page-controlled and often contain secrets such as tokens in request URLs, so redact credential-like values you don't want in Claude's context and truncate very long entries before returning them.
