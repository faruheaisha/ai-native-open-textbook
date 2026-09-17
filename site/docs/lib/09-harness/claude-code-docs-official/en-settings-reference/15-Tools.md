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
pageSha256: "2dd5706e147c0dba92c2adc919f64f7338337cb2ef972457d2f1d1826c584f22"
contentMode: "local-full"
zh: ""
---

## Tools

Turn off specific tools in the [Claude Code desktop app](https://code.claude.com/docs/en/desktop). The terminal CLI ignores these keys. For the tools themselves, see [Tools available to Claude](https://code.claude.com/docs/en/tools-reference).

### `browserExternalPageTools`

Stop Claude from using its tools to read or act on external pages in the desktop app's [Browser pane](https://code.claude.com/docs/en/desktop#browse-external-sites). People in your organization can still open external sites themselves, and local dev server previews keep working with Claude's tools. The desktop app reads this key; the terminal CLI ignores it.

* **Scope**: [`Managed`](#scopes)
* **Type**: string, `"disabled"`; the desktop app also accepts `"disable"`, in either case
* **Default**: unset, so Claude's tools work on external pages

```json managed-settings.json theme={null}
{
  "browserExternalPageTools": "disabled"
}
```

Any other value leaves Claude's tools on, and a non-empty string that isn't one of the two accepted values logs a warning. To block external sites for people and Claude alike, set [`disableBrowserExternalNavigation`](#disablebrowserexternalnavigation) instead. See [Restrict external browsing for your organization](https://code.claude.com/docs/en/desktop#restrict-external-browsing-for-your-organization).

### `disableBrowserExternalNavigation`

Turn off external browsing in the desktop app's [Browser pane](https://code.claude.com/docs/en/desktop#browse-external-sites) for people and Claude alike. Localhost dev server previews keep working. The desktop app reads this key; the terminal CLI ignores it.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean; only the JSON Boolean `true` takes effect
  * `true`: the desktop app turns off external browsing in the Browser pane for people and Claude alike; localhost previews keep working
  * `false`: external browsing stays on
* **Default**: unset, so external browsing is on

```json managed-settings.json theme={null}
{
  "disableBrowserExternalNavigation": true
}
```

The desktop app ignores any other value, and a value that isn't a Boolean, such as the string `"true"` or `1`, also logs a warning. To leave external browsing on but keep Claude's tools off external pages, set [`browserExternalPageTools`](#browserexternalpagetools) instead. See [Restrict external browsing for your organization](https://code.claude.com/docs/en/desktop#restrict-external-browsing-for-your-organization).

### `disableMobileSimulatorTools`

Block Claude's tools for the desktop app's [iOS Simulator pane](https://code.claude.com/docs/en/desktop-ios-simulator#turn-off-simulator-access). People keep manual use of the pane; only Claude's access is removed, and nobody can turn it back on from inside the app. The desktop app reads this key; the terminal CLI ignores it.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean; only the JSON Boolean `true` takes effect
  * `true`: the desktop app blocks Claude's tools for the iOS Simulator pane
  * `false`: Claude's simulator tools follow each person's settings toggle in the desktop app
* **Default**: unset, so Claude's simulator tools follow each person's settings toggle in the desktop app

```json managed-settings.json theme={null}
{
  "disableMobileSimulatorTools": true
}
```

The desktop app ignores any other value, and a value that isn't a Boolean, such as the string `"true"` or `1`, also logs a warning.

&lt;span id="data-and-privacy" />
