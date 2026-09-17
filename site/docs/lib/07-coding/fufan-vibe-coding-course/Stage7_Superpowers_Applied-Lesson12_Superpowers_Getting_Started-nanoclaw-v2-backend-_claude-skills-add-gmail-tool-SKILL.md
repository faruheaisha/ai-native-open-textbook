---
title: "Add Gmail Tool (OneCLI-native)"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-gmail-tool/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-gmail-tool/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-gmail-tool/SKILL.md"
sourceSha256: "8a52bec2be929419ea5d038c9b2fa0badfe4697f88f8f41c37213edf753a6f6e"
pageSha256: "8a52bec2be929419ea5d038c9b2fa0badfe4697f88f8f41c37213edf753a6f6e"
contentMode: "local-full"
zh: ""
---

# Add Gmail Tool (OneCLI-native)

This skill wires the [`@gongrzhe/server-gmail-autoauth-mcp`](https://www.npmjs.com/package/@gongrzhe/server-gmail-autoauth-mcp) stdio MCP server into selected agent groups. The MCP server reads stub credentials containing the `onecli-managed` placeholder; the OneCLI gateway intercepts outbound calls to `gmail.googleapis.com` and injects the real OAuth bearer from its vault.

Tools exposed (from `gmail-mcp@1.1.11`, surfaced to the agent as `mcp__gmail__<name>`): `search_emails`, `read_email`, `send_email`, `draft_email`, `delete_email`, `modify_email`, `batch_modify_emails`, `batch_delete_emails`, `download_attachment`, `list_email_labels`, `create_label`, `update_label`, `delete_label`, `get_or_create_label`, `list_filters`, `get_filter`, `create_filter`, `create_filter_from_template`, `delete_filter`.

**Why this pattern:** v2's invariant is that containers never receive raw API keys — OneCLI is the sole credential path (see CHANGELOG v2.0.0). The stub-file pattern satisfies this: the container sees `"onecli-managed"` placeholders, the gateway swaps them in flight.

## Phase 1: Pre-flight

### Verify OneCLI has Gmail connected

```bash
onecli apps get --provider gmail
```

Expected: `"connection": \{ "status": "connected" \}` with scopes including `gmail.readonly`, `gmail.modify`, `gmail.send`.

If not connected, tell the user:

> Open the OneCLI web UI at http://127.0.0.1:10254, go to Apps → Gmail, and click Connect. Sign in with the Google account you want the agent to act as.

### Verify stub credentials exist

```bash
ls -la ~/.gmail-mcp/gcp-oauth.keys.json ~/.gmail-mcp/credentials.json 2>&1
```

If both exist and contain `"onecli-managed"`:

```bash
grep -l onecli-managed ~/.gmail-mcp/gcp-oauth.keys.json ~/.gmail-mcp/credentials.json
```

...skip to Phase 2.

If either file exists but does **not** contain `onecli-managed`, **STOP** and tell the user — these are real OAuth credentials from a previous non-OneCLI install. Back them up, then delete before proceeding. The OneCLI migration normally handles this; if it didn't, something is wrong.

If both files are absent, write them now:

```bash
mkdir -p ~/.gmail-mcp
cat > ~/.gmail-mcp/gcp-oauth.keys.json <<'EOF'
{
  "installed": {
    "client_id": "onecli-managed.apps.googleusercontent.com",
    "client_secret": "onecli-managed",
    "redirect_uris": ["http://localhost:3000/oauth2callback"]
  }
}
EOF
cat > ~/.gmail-mcp/credentials.json <<'EOF'
{
  "access_token": "onecli-managed",
  "refresh_token": "onecli-managed",
  "token_type": "Bearer",
  "expiry_date": 99999999999999,
  "scope": "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send"
}
EOF
chmod 600 ~/.gmail-mcp/gcp-oauth.keys.json ~/.gmail-mcp/credentials.json
```

### Verify mount allowlist covers the path

```bash
cat ~/.config/nanoclaw/mount-allowlist.json
```

`~/.gmail-mcp` must sit under an `allowedRoots` entry (e.g. `/home/<user>`). If it doesn't, tell the user to run `/manage-mounts` first or add their home directory.

### Check agent secret-mode

For each target agent group, confirm OneCLI will inject Gmail secrets into its container. Find the OneCLI agent ID that matches the group's `agentGroupId`:

```bash
onecli agents list
```

If that agent's `secretMode` is `all`, you're done — Gmail secrets (identified by OneCLI's Gmail hostPattern) will auto-inject. If it's `selective`, explicitly assign the Gmail secrets:

```bash
onecli secrets list     # find Gmail secret IDs (OneCLI creates one per connected app)
