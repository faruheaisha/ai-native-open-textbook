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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "7cded58e64258b12571dcfa3357c8000b49398dab83e18ca4f798068cf2c385b"
contentMode: "local-full"
zh: ""
---

## Git and attribution

Control the attribution Claude Code adds to commits and pull requests and how it works with git.

&lt;span id="attribution-settings" />

### `attribution`

Customize the attribution Claude Code adds to git commits and pull requests. Commits get a [git trailer](https://git-scm.com/docs/git-interpret-trailers) such as `Co-Authored-By` by default; pull request descriptions get plain text. Set each part separately with the sub-keys below.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with `commit` and `pr` strings and a `sessionUrl` Boolean
* **Default**: unset, so Claude Code uses the standard attribution shown under each sub-key

This example replaces the commit attribution, removes pull request attribution, and drops the session link:

```json settings.json theme={null}
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>",
    "pr": "",
    "sessionUrl": false
  }
}
```

To hide all attribution, set [`commit`](#attribution-commit) and [`pr`](#attribution-pr) to empty strings and [`sessionUrl`](#attribution-sessionurl) to `false`. Once you set `commit` or `pr`, Claude Code ignores the deprecated `includeCoAuthoredBy` setting and uses its default text for whichever of the two you left unset.

### `includeCoAuthoredBy`

  Deprecated since v2.0.62, when [`attribution`](#attribution) replaced it. Claude Code still reads it, but new configurations should set `attribution`.

Use [`attribution`](#attribution) instead, which replaces this key and lets you change or hide the commit trailer, the pull request text, and the session link separately. Claude Code still honors `includeCoAuthoredBy: false` from settings files that predate `attribution`, but ignores it once you set `attribution.commit` or `attribution.pr`.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: the same as unset; Claude Code adds the commit trailer and the pull request attribution text
  * `false`: Claude Code omits both the commit trailer and the pull request attribution text, unless `attribution` sets `commit` or `pr`, in which case the [`attribution`](#attribution) rules apply
* **Default**: `true`

```json settings.json theme={null}
{
  "includeCoAuthoredBy": false
}
```

To hide all attribution today, set [`attribution.commit`](#attribution-commit) and [`attribution.pr`](#attribution-pr) to empty strings and [`attribution.sessionUrl`](#attribution-sessionurl) to `false`.

### `includeGitInstructions`

At session start, Claude Code adds two git-related pieces to Claude's prompt: its built-in instructions for how to write commits and pull requests, in the Bash tool's description, and a git status snapshot of your repository in the system prompt, meaning the current branch, the main branch, `git status` output, and recent commits. Set this key to `false` to leave both out, for example when you use your own git workflow skills.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code includes its built-in commit and pull request workflow instructions and the git status snapshot. Cloud sessions never include the snapshot
  * `false`: Claude Code leaves both out
* **Default**: `true`
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session

```json settings.json theme={null}
{
  "includeGitInstructions": false
}
```

### `prUrlTemplate`

Point the PR links Claude Code renders, in the footer badge and in tool-result summaries, at an internal code-review tool instead of `github.com`. Claude Code substitutes `\{host\}`, `\{owner\}`, `\{repo\}`, `\{number\}`, and `\{url\}` from the PR URL. [GitLab merge request](https://code.claude.com/docs/en/interactive-mode#gitlab-merge-requests) links on both surfaces keep their GitLab URL.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a URL template using any of the five placeholders
* **Default**: unset

```json settings.json theme={null}
{
  "prUrlTemplate": "https://reviews.example.com/{owner}/{repo}/pull/{number}"
}
```

Claude Code applies the template only to the links it renders itself; a PR number Claude writes in a message, such as `#123`, stays as Claude wrote it. A URL that doesn't have the `/pull/<number>` shape is left unchanged.

### `attribution.commit`

Set the attribution text Claude Code adds to git commits, including any trailers. Set it to an empty string to hide commit attribution.

* **Scope**: [`Any file`](#scopes)
* **Type**: string
* **Default**: unset, so Claude Code adds `Co-Authored-By: <name> <noreply@anthropic.com>`. The name is the session's active model, such as `Claude Sonnet 5`.
  * When Claude Code recognizes the model as a Claude model but can't confirm its exact version, it writes `Claude` alone.
  * When it can't match the model ID to any Claude model, such as a third-party model served through a custom [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars), it writes `Claude Code`.

This example replaces the default trailer with a custom line and a custom `Co-Authored-By` trailer:

```json settings.json theme={null}
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>"
  }
}
```

### `attribution.pr`

Set the attribution text Claude Code adds to pull request descriptions. Set it to an empty string to hide pull request attribution.

* **Scope**: [`Any file`](#scopes)
* **Type**: string
* **Default**: unset, so Claude Code adds `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

```json settings.json theme={null}
{
  "attribution": {
    "pr": ""
  }
}
```

### `attribution.sessionUrl`

Choose whether Claude Code appends the claude.ai session link when it commits or opens a pull request from a [cloud](https://code.claude.com/docs/en/claude-code-on-the-web) or [Remote Control](https://code.claude.com/docs/en/remote-control) session. Claude Code adds the link as a `Claude-Session` trailer on commits and as a link in pull request descriptions. Set it to `false` to omit the link.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code appends the claude.ai session link when it commits or opens a pull request from a cloud or Remote Control session
  * `false`: Claude Code omits the link
* **Default**: `true`

```json settings.json theme={null}
{
  "attribution": {
    "sessionUrl": false
  }
}
```

&lt;span id="hook-configuration" />

&lt;span id="hook-and-skill-settings" />
