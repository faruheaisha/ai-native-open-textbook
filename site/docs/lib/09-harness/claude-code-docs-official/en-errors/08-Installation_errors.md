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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "fd0256a08a10d3e1d5ce0f5826c8bd57a39de29239c11a934a747957c4cc81bc"
contentMode: "local-full"
zh: ""
---

## Installation errors

These errors appear while installing or updating Claude Code, from the [install script](https://code.claude.com/docs/en/setup#install-claude-code), `claude install`, or `claude update`. For `command not found`, PATH, permission, and TLS problems during setup, see [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install).

### Installation was killed before it could finish

The install script reports when the `claude install` step is terminated by a signal. On Linux, exit code 137 means the process received SIGKILL, and on a low-memory host that's usually the kernel out-of-memory (OOM) killer. The script prints this explanation and exits with code 137:

```text theme={null}
Installation was killed before it could finish (exit code 137). This usually means the system ran out of memory.
Claude Code needs roughly 512MB of free memory to install. Free up memory, then run this script again.
```

For any other fatal signal, and for exit code 137 on macOS, the script prints `Installation was killed before it could finish (exit code <N>)` with the actual exit code and omits the out-of-memory explanation. The message comes from the install script macOS and Linux use, which also covers installs inside WSL; the native Windows install scripts never print it. Before v2.1.200, the script exited with only the shell's bare `Killed` line.

**What to do:**

* Stop other processes to free memory, then rerun the installer
* Add swap space or move to a larger instance. See [Install killed on low-memory Linux servers](https://code.claude.com/docs/en/troubleshoot-install#install-killed-on-low-memory-linux-servers) for the swap-file commands.

### The connection dropped while downloading the update

The connection to the download server closed while `claude install`, `claude update`, or the [automatic updater](https://code.claude.com/docs/en/setup#auto-updates) was fetching the Claude Code binary, and the retries didn't recover. Claude Code retries the download when the connection drops, the transfer stalls, or the downloaded file fails its checksum, up to three attempts in total. A completed HTTP error, such as a 404, isn't retried because the server already answered. Before v2.1.202, a single dropped connection failed the download immediately with the bare error `aborted` instead of retrying.

```text theme={null}
The connection dropped while downloading the update (attempt 3/3: aborted). Check your network — proxies sometimes cut off large downloads.
```

The text in parentheses names which attempt failed and the underlying network error. `claude update` precedes the message with `Error: Failed to install native update` on stderr.

A download that stays connected but doesn't finish within 10 minutes fails with `Download timed out: exceeded the total deadline` instead. Claude Code doesn't retry a timed-out download, because a connection too slow to finish inside the deadline won't finish on an immediate retry either. The steps below apply to both messages.

The usual cause is a proxy or gateway that closes a long transfer before it finishes. The Claude Code binary is a large download, so a proxy connection limit that never affects normal API traffic can still interrupt it.

**What to do:**

* Run `claude update` again. On an otherwise healthy network, the download usually succeeds on the next run. For the timed-out message, run it again from a faster or less throttled network.
* If your network requires a proxy, set `HTTPS_PROXY` before running the installer or `claude update`. See [Check network connectivity](https://code.claude.com/docs/en/troubleshoot-install#check-network-connectivity).
* If a corporate proxy keeps closing the transfer, ask your network team to allow the full download from `downloads.claude.ai`. See [Network access requirements](https://code.claude.com/docs/en/network-config#network-access-requirements).
* Run `claude doctor` from your shell for installation diagnostics
