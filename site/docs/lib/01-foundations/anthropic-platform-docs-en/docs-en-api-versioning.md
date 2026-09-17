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
sourceRel: "docs/en/api/versioning.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/versioning.md"
sourceSha256: "45d247cdbfa26b2872a6ba7331e24d178efde4b2b3d99f3178bc7d05f37784f5"
pageSha256: "45d247cdbfa26b2872a6ba7331e24d178efde4b2b3d99f3178bc7d05f37784f5"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

For any given version with the Messages API, Anthropic preserves:

* Existing input parameters
* Existing output parameters

However, Anthropic may do the following:

* Add additional optional inputs
* Add additional values to the output
* Change conditions for specific error types
* Add new variants to enum-like output values (for example, streaming event types)

Generally, if you are using the API as documented in this reference, Anthropic will not break your usage.

## Version history

Anthropic recommends using the latest API version whenever possible. Previous versions are considered deprecated and may be unavailable for new users.

* `2023-06-01`

  * New format for [streaming](https://platform.claude.com/docs/en/build-with-claude/streaming) server-sent events (SSE):

    * Completions are incremental. For example, `" Hello"`, `" my"`, `" name"`, `" is"`, `" Claude." `instead of `" Hello"`, `" Hello my"`, `" Hello my name"`, `" Hello my name is"`, `" Hello my name is Claude."`.
    * All events are [named events](https://developer.mozilla.org/en-US/Web/API/Server-sent%5Fevents/Using%5Fserver-sent%5Fevents#named%5Fevents), rather than [data-only events](https://developer.mozilla.org/en-US/Web/API/Server-sent%5Fevents/Using%5Fserver-sent%5Fevents#data-only%5Fmessages).
    * Removed unnecessary `data: [DONE]` event.

  * Removed legacy `exception` and `truncated` values in responses.

* `2023-01-01`: Initial release.
