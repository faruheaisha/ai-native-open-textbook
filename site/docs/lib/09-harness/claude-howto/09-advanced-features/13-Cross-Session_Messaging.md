---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "6558b1d1d9012bc4eef03878a1568743c3a3a011386fea7c0831522fb6ae9d40"
contentMode: "local-full"
zh: ""
---

## Cross-Session Messaging

> **Added in v2.1.224**, extended through v2.1.239. Available on **macOS, Linux, and (since v2.1.239) Windows**.

Sessions used to be islands. Cross-session messaging lets one Claude Code session talk to
another — including sessions on your other machines and your cloud sessions — so you can
hand a question to the session that already has the right context loaded instead of
re-explaining it.

### Discovering Sessions

`ListAgents` lists everything you can address: subagents you spawned, other local sessions
on this machine, your cloud sessions, and (when Remote Control is connected) sessions on
your other machines. Each row is labeled by kind, and since v2.1.229 rows also carry
`offline` and `cloud` labels so you can tell a reachable session from a dormant one.

The **name in each row is the address** — that is what you send to.

### Sending a Message

`SendMessage` takes the target and the message:

```text
SendMessage({ to: "<session name>", message: "What did you conclude about the retry logic?" })
```

Since v2.1.232, a bare name is enough — you no longer need to append a disambiguating ref
unless two rows genuinely share the same name.

### Waiting for a Session to Go Idle (`notify_when_idle`, v2.1.236)

When the session you are messaging is mid-task, you usually want to know when it finishes
rather than poll it. `SendMessage` takes a `notify_when_idle` input for exactly that:

```text
SendMessage({
  to: "auth-refactor",
  message: "ping me when the migration finishes",
  notify_when_idle: true
})
```

It is **opt-in and one-shot** — the target session sends a single notice the next time it
goes idle, and then the subscription is done. There is no polling loop and no repeated
notification if the session goes busy and idle again.

Two related v2.1.239 changes: `ListAgents` now also reports **the session's own name** (so
a session can tell others how to address it) alongside its live teammates, and cross-session
messaging became available on **Windows**.

### `@`-Mention Shorthand (v2.1.232)

Instead of calling the tool explicitly, you can `@`-mention a session directly in your
prompt to reach it:

```text
@auth-refactor did the migration tests pass?
```

### Controlling What Arrives: `crossSessionInbound`

Inbound messages are governed by the `crossSessionInbound` setting (v2.1.224+):

| Value | Behavior |
|---|---|
| `"accept"` | Inbound messages are delivered to Claude in this session |
| `"hold"` | You see a notice that a message arrived; it is not delivered |
| `"refuse"` | Inbound messages are dropped |

The values form a ladder — `accept < hold < refuse` — and **project and local settings
apply only when they are stricter** than the user-scope value. A project can tighten
inbound delivery, never loosen it. Since v2.1.232 the setting also has a `/config` row,
"Messages from your other sessions."

### Reach and Limits

- Local sessions on the same machine, plus your cloud sessions.
- Remote Control sessions on your other machines, addressable by name (v2.1.225).
- A cloud session **receives** your message but cannot message a local session back yet —
  read its answer in its own transcript.
- macOS and Linux from v2.1.224; Windows since v2.1.239.
