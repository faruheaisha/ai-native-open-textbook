---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "02e07fe6feeee275481a945fb3f1459e4abff091c43327a73c238c084e29993b"
contentMode: "local-full"
zh: ""
---

### HTTP response handling

HTTP hooks use HTTP status codes and response bodies instead of exit codes and stdout. The outcomes below apply to most events; an event with its own failure contract in the [per-event table](#exit-code-2-behavior-per-event), such as `WorktreeCreate`, applies that contract to a failed HTTP hook too:

* **2xx with an empty body**: success, equivalent to exit code 0 with no output
* **2xx with a JSON object body**: parsed using the same [JSON output](#json-output) schema as command hooks. A body that fails schema validation is a non-blocking error
* **2xx with any other body, such as plain text**: non-blocking error, handled the same as a non-2xx status. Claude Code doesn't add the text to Claude's context
* **Non-2xx status**: non-blocking error, execution continues
* **Connection failure**: non-blocking error, execution continues
* **Timeout**: the hook is canceled, as described under [Timeouts](#timeouts)

Unlike command hooks, HTTP hooks can't signal a blocking error through status codes alone. To block a tool call or deny a permission, return a 2xx response with a JSON body containing the appropriate decision fields.
