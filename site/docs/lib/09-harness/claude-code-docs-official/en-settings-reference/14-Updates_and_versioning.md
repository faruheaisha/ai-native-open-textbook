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
pageSha256: "d7a26cd28438653422dc4b8cef02bc35a53405eb6a0ee0c769a22f42ddc39d62"
contentMode: "local-full"
zh: ""
---

## Updates and versioning

Choose an update channel and, for organizations, pin the versions people can run. See [Update Claude Code](https://code.claude.com/docs/en/setup#update-claude-code).

### `autoUpdatesChannel`

Choose which [release channel](https://code.claude.com/docs/en/setup#configure-release-channel) background auto-updates and `claude update` follow. Set `"stable"` for a version that is typically about one week old and skips releases with major regressions, or `"latest"` for the most recent release.

* **Scope**: [`Any file`](#scopes). Set it in managed settings to enforce one channel across your organization.
* **Type**: string, one of:
  * `"latest"`: updates follow the most recent release
  * `"stable"`: updates follow a version that is typically about one week old and skips releases with major regressions
* **Default**: unset, so Claude Code follows `"latest"`

```json settings.json theme={null}
{
  "autoUpdatesChannel": "stable"
}
```

Claude Code writes `"stable"` to your user settings when you pick it under **Auto-update channel** in `/config`, and removes the key when you switch back to latest there. `claude install stable` and `claude install latest` also save the channel you name. Switching from `"latest"` to `"stable"` in `/config` asks whether to allow a downgrade or stay on your current version; staying sets [`minimumVersion`](#minimumversion). Homebrew installs ignore this key: the `claude-code` cask tracks stable and `claude-code@latest` tracks latest, and `claude update` defers to `brew upgrade`. To turn auto-updates off entirely, set [`DISABLE_AUTOUPDATER`](https://code.claude.com/docs/en/setup#disable-auto-updates) in `env`.

### `minimumVersion`

Keep background auto-updates and `claude update` from installing any version below this one, so moving to the `"stable"` channel doesn't downgrade you from a newer `"latest"` build. Claude Code writes this key for you when you choose to stay on your current version while switching channels in `/config`, and clears it when you switch back to `"latest"`.

* **Scope**: [`Any file`](#scopes). Set it in managed settings to pin an organization-wide minimum that user and project settings can't lower.
* **Type**: string, a version number such as `"2.1.100"`
* **Default**: unset, so updates can install any version the channel offers

This example follows the stable channel and refuses to install any version below 2.1.100:

```json settings.json theme={null}
{
  "autoUpdatesChannel": "stable",
  "minimumVersion": "2.1.100"
}
```

This key only constrains updates. To make Claude Code refuse to start below a version, use [`requiredMinimumVersion`](#requiredminimumversion) instead. See [Pin a minimum version](https://code.claude.com/docs/en/setup#pin-a-minimum-version).

### `requiredMaximumVersion`

Set the newest Claude Code version your organization allows to start. When the running version is newer, Claude Code exits at startup and tells the user to install an approved version through your organization's approved method; `claude install <version>` may also work. Requires Claude Code v2.1.163 or later.

* **Scope**: [`Managed`](#scopes). Claude Code gives no warning when it ignores the key elsewhere.
* **Type**: string, a version number such as `"2.1.150"`; a value that isn't a valid version is ignored
* **Default**: unset, so no ceiling applies

```json managed-settings.json theme={null}
{
  "requiredMaximumVersion": "2.1.150"
}
```

Background auto-updates and `claude update` skip versions above the ceiling, so an installation inside the range stays inside it. `claude update`, `claude install`, and `claude doctor` keep working above the ceiling so users can recover. Pair it with [`requiredMinimumVersion`](#requiredminimumversion) to enforce a range.

### `requiredMinimumVersion`

Set the oldest Claude Code version your organization allows to start. When the running version is older, Claude Code exits at startup and tells the user to update through your organization's approved method. The check runs at startup only, so a session that's already running continues. Requires Claude Code v2.1.163 or later.

* **Scope**: [`Managed`](#scopes). Claude Code gives no warning when it ignores the key elsewhere.
* **Type**: string, a version number such as `"2.1.150"`; a value that isn't a valid version is ignored
* **Default**: unset, so no floor applies

```json managed-settings.json theme={null}
{
  "requiredMinimumVersion": "2.1.150"
}
```

`claude update`, `claude install`, and `claude doctor` keep working below the floor so users can recover. Unlike [`minimumVersion`](#minimumversion), which only prevents downgrades, this key blocks startup. Pair it with [`requiredMaximumVersion`](#requiredmaximumversion) to enforce a range.
