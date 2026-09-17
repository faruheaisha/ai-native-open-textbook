---
title: "Test self-hosted environments end to end"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments-testing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments-testing.md"
sourceSha256: "1c0cf02a5024078b7cd182a0b4e62226b28c7e47299da19d1e9441b631b62523"
pageSha256: "1c0cf02a5024078b7cd182a0b4e62226b28c7e47299da19d1e9441b631b62523"
contentMode: "local-full"
zh: ""
---

# Test self-hosted environments end to end

> Verify a self-hosted runner image from CI: dispatch a session with the CLI, read Claude's replies through a Stop hook, and script the full loop.

  Self-hosted environments are in public beta on Team and Enterprise plans; [Availability and limitations](https://code.claude.com/docs/en/self-hosted-environments#availability-and-limitations) covers the enablement path. This page is the CI test recipe; see the [quickstart](https://code.claude.com/docs/en/self-hosted-environments-quickstart) for setup and [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy) for the fleet recipes.

In a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments), Claude Code [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) run on a runner image you build and maintain. Before rolling a new image to your production environment, drive a full session against a test environment from a script: create a session, read Claude's reply, send a follow-up, and read that reply too. This is the shape of a CI smoke test that verifies your runner image, git access, and any custom tools before you promote a change.

This recipe assumes you've already [set up an environment and a runner](https://code.claude.com/docs/en/self-hosted-environments-quickstart#set-up-an-environment-and-runner), and that your CI job starts the runner process on the same host as the test script, the natural setup for testing a new runner image. A Stop hook you install on the runner writes each turn's final reply to a local file, and the script reads it from there, so the only calls to the Anthropic API are the two dispatches themselves. If your test runners are on separate infrastructure, see [Remote test runners](#remote-test-runners).

## Install the capture hook on your test runner

The read-back works through a Claude Code [Stop hook](https://code.claude.com/docs/en/hooks#stop): when Claude finishes a turn, the hook receives the final assistant message as `last_assistant_message` in its stdin JSON and appends it to `$E2E_REPLY_DIR/<session_id>.txt`. Install it the same way as the [commit-nudge Stop hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#prompt-sessions-to-push-their-work), on the runner host's `~/.claude/`, which the runner seeds into every session.

### Save the hook files

Save the two files below on the runner host:

* The settings block: merge into `~/.claude/settings.json` on the runner host
* The script: save as `~/.claude/hooks/e2e-stop-hook-capture.sh` on the runner host and make it executable

```json theme={null}
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "timeout": 10,
            "command": "\"$CLAUDE_CONFIG_DIR/hooks/e2e-stop-hook-capture.sh\""
          }
        ]
      }
    ]
  }
}
```

```sh theme={null}
#!/bin/sh
# Stop hook for testing a self-hosted environment end to end: writes each
# turn's final assistant reply to $E2E_REPLY_DIR/<session_id>.txt so a
# co-located test driver can read it without calling the Anthropic API.
# Install on the TEST runner only. Requires jq.

# No-op unless the driver is listening. Never fail the turn.
[ -n "${E2E_REPLY_DIR:-}" ] && [ -d "$E2E_REPLY_DIR" ] || exit 0

# CLAUDE_CODE_REMOTE_SESSION_ID is exported in cse_... form; the session
# id the dispatch CLI prints is in session_... form. Same id, different
# prefix.
sid=$(printf '%s' "${CLAUDE_CODE_REMOTE_SESSION_ID:-}" | sed 's/^cse_/session_/')
[ -n "$sid" ] || exit 0

# last_assistant_message is absent when the final assistant turn had no
# text, such as a tool-use-only turn. The `// empty` filter makes that a
# zero-byte write rather than the literal string "null".
jq -r '.last_assistant_message // empty' >> "$E2E_REPLY_DIR/$sid.txt" 2>/dev/null
exit 0
```

### Before you start the runner

Two things the hook depends on:

* Install it before you start the runner. The runner snapshots `~/.claude/` once at startup, so a hook added to a running runner takes effect only after a restart.
* Export `E2E_REPLY_DIR` to the runner process. The hook is a no-op when the variable is unset or the directory doesn't exist, so set it wherever you start the runner, such as the systemd unit, pod spec, or CI step. The test script below requires it too.

Install this hook only on runners serving your test environment. It writes every session's final reply to disk whenever `E2E_REPLY_DIR` exists, which is harmless on a throwaway CI runner but not something to carry into a production-environment runner image where the variable might be set by accident.

## Run the test loop

The `--environment` and `--ref` dispatch flags require Claude Code v2.1.224 or later on the machine that runs the script, the same floor as the runner itself. With the hook in place and a runner started on this host, the test script:
