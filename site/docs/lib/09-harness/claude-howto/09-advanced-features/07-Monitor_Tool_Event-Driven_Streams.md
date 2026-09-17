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
pageSha256: "9876b7bd42977f12f02122d0905593178d8860c4e0d16813c61c371205556ccb"
contentMode: "local-full"
zh: ""
---

## Monitor Tool (Event-Driven Streams)

> **New in v2.1.98**: The Monitor tool lets Claude watch a background command's stdout and react the moment a matching event appears — replacing polling loops and `sleep` for waiting on long-running processes.

Monitor attaches to any shell command that writes to stdout. Each stdout line from the command becomes a notification that wakes the session. Claude specifies the command; the harness streams output and delivers events as they fire. See the related [Background Tasks](#background-tasks) section for launching the underlying processes.

### Why It Matters

Polling with `/loop` or `sleep` burns a full API round-trip every cycle, whether or not anything changed. Monitor stays silent until an event fires, consuming **zero tokens** while the command is quiet. When an event does occur, Claude reacts immediately — no delayed discovery waiting for the next poll tick. For anything that runs longer than a few minutes, this is both cheaper and faster than poll loops.

### Two Common Patterns

**Stream filters** watch continuous output from a long-running source. The command runs forever; every matching line is an event.

```bash
tail -f /var/log/app.log | grep --line-buffered "ERROR"
```

**Poll-and-emit filters** check a source periodically and only emit when something changes. Use this for APIs, databases, or anything without a native stream.

```bash
last=$(date -u +%Y-%m-%dT%H:%M:%SZ)
while true; do
  gh api "repos/owner/repo/issues/123/comments?since=$last" || true
  last=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  sleep 30
done
```

### Concrete Example

"Start my dev server and monitor it for errors." Claude launches the server as a background task, attaches a Monitor filter (`tail -F server.log | grep --line-buffered -E "ERROR|FATAL"`), and the session goes quiet. The moment an error line appears in the log, Claude wakes up, reads the error, and can react — restart the server, fix the bug, or surface it to you — without you having to check in.

> **Warning**: When piping into `grep`, **always** use `grep --line-buffered`. Without it, grep buffers stdout in 4KB chunks, which can delay events by minutes on low-traffic streams. This is the #1 way Monitor breaks in practice — if your filter seems silent when it shouldn't be, check for the `--line-buffered` flag first.
