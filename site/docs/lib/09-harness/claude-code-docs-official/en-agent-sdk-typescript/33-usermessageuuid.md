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
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "59389cd10a60de6a546cefe23ae4266be77049e8ee0f74aec26e97ad09ec0cdf"
contentMode: "local-full"
zh: ""
---

#### `user_message_uuid`

The `uuid` of the [`SDKUserMessage`](#sdkusermessage) the turn is answering, echoed so you can match Claude Code's reply to the message you sent. Claude Code echoes a `uuid` only if you set one on the message. The field is optional on `SDKUserMessage`, and a string prompt passed to `query()` carries none.

Which of your messages a turn answers depends on how the turn started:

* **A regular message you sent**, meaning one without `isSynthetic: true`: the turn answers that message for its whole run. When you send several messages close together, Claude Code can merge them into one turn, and the field then carries only the last message's `uuid`. To match the reply to any of the merged messages, use [`user_message_uuids`](#user_message_uuids).
* **A message you sent with `isSynthetic: true`**: the turn answers that message at first. If Claude Code picks up a regular message of yours between tool calls, the turn answers the picked-up message from then on. Echoing a synthetic message's `uuid` requires Agent SDK v0.3.265 or later; earlier versions echo nothing on synthetic turns.
* **A prompt Claude Code generated itself**, such as the turn that continues interrupted work after a session restarts: the turn answers no message of yours at first and its frames carry no echo. If Claude Code picks up a regular message of yours between tool calls, the turn answers that message from then on. The pickup echo requires Agent SDK v0.3.265 or later; earlier versions echo nothing on these turns.

Claude Code echoes the answered message's `uuid` on three kinds of frame:

* **The result**: every result of a turn that answered a message you sent. Every such result carries it on Agent SDK v0.3.265 or later. Before v0.3.265, the success result of a turn that a regular message started lacked it when the turn sent no API request or ended with a deferred tool call. Before v0.3.246, error results lacked it too, and before v0.3.216 every result did.
* **The turn's first reply**: the first [assistant message](#sdkassistantmessage), or with `includePartialMessages` the first [stream event](#sdkpartialassistantmessage) whose `event.type` isn't `ping`, so you can bind the reply before the result arrives. When a turn streams nothing, Claude Code sets it on the first assistant message instead. The first-reply echo requires Agent SDK v0.3.246 or later. When the message the turn is answering changes mid-turn, the first reply after the change carries the field too, on Agent SDK v0.3.265 or later; earlier versions set it on one reply frame per turn.
* **Every [`thinking_tokens`](#sdkthinkingtokensmessage) frame of the turn**: so you can attribute thinking progress to the message you sent without waiting for the turn's first reply. Requires Agent SDK v0.3.260 or later.

Claude Code omits the field in these cases:

* Reply frames other than those first replies
* Subagent frames
* Turns that answer no message with a `uuid`: the turn answered a message you sent without one, or Claude Code started the turn itself and picked up no regular message that has one
* Results that answer no message you sent, such as the zeroed result after a crashed worker process
