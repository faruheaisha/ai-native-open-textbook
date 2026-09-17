---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/app-server.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/app-server.md"
sourceSha256: "a72a5c88ab05ab9737ec28b432708f2776f696be48eae09ee39c02dd2f9480e0"
pageSha256: "b1599b60bd276246e70ef9efd3c1ca96f478a3b0202b79ad3ba54589a91505b6"
contentMode: "local-full"
zh: ""
---

## Review

`review/start` runs the Codex reviewer for a thread and streams review items. Targets include:

- `uncommittedChanges`
- `baseBranch` (diff against a branch)
- `commit` (review a specific commit)
- `custom` (free-form instructions)

Use `delivery: "inline"` (default) to run the review on the existing thread, or `delivery: "detached"` to fork a new review thread.

Example request/response:

```json
{ "method": "review/start", "id": 40, "params": {
  "threadId": "thr_123",
  "delivery": "inline",
  "target": { "type": "commit", "sha": "1234567deadbeef", "title": "Polish tui colors" }
} }
{ "id": 40, "result": {
  "turn": {
    "id": "turn_900",
    "status": "inProgress",
    "items": [
      { "type": "userMessage", "id": "turn_900", "content": [ { "type": "text", "text": "Review commit 1234567: Polish tui colors" } ] }
    ],
    "error": null
  },
  "reviewThreadId": "thr_123"
} }
```

For a detached review, use `"delivery": "detached"`. The response is the same shape, but `reviewThreadId` will be the id of the new review thread (different from the original `threadId`). The server also emits a `thread/started` notification for that new thread before streaming the review turn.

Codex streams the usual `turn/started` notification followed by an `item/started` with an `enteredReviewMode` item:

```json
{
  "method": "item/started",
  "params": {
    "item": {
      "type": "enteredReviewMode",
      "id": "turn_900",
      "review": "current changes"
    }
  }
}
```

When the reviewer finishes, the server emits `item/started` and `item/completed` containing an `exitedReviewMode` item with the final review text:

```json
{
  "method": "item/completed",
  "params": {
    "item": {
      "type": "exitedReviewMode",
      "id": "turn_900",
      "review": "Looks solid overall..."
    }
  }
}
```

Use this notification to render the reviewer output in your client.
