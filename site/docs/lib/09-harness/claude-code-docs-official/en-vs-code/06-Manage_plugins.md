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
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "4067687a88e080c4c666b6b34cca1e4769a77267865ecb277656f23313b2ad7b"
contentMode: "local-full"
zh: ""
---

## Manage plugins

The VS Code extension includes a graphical interface for installing and managing [plugins](https://code.claude.com/docs/en/plugins). Type `/plugins` in the prompt box to open the **Manage plugins** interface.

### Install plugins

The plugin dialog shows two tabs: **Plugins** and **Marketplaces**.

In the Plugins tab:

* **Installed plugins** appear at the top with toggle switches to enable or disable them
* **Available plugins** from your configured marketplaces appear below
* Search to filter plugins by name or description
* Click **Install** on any available plugin

When you install a plugin, choose the installation scope:

* **Install for you**: available in all your projects (user scope)
* **Install for this project**: shared with project collaborators (project scope)
* **Install locally**: only for you, only in this repository (local scope)

### Manage marketplaces

Switch to the **Marketplaces** tab to add or remove plugin sources:

* Enter a GitHub repo, URL, or local path to add a new marketplace
* Click the refresh icon to update a marketplace's plugin list
* Click the trash icon to remove a marketplace

Plugin changes you make in the dialog apply right away to the Claude Code sessions open in that VS Code window. If the session you opened the dialog from can't reload its plugins, the dialog offers to try again or to restart Claude in that session.

  Plugin management in VS Code uses the same CLI commands under the hood. Plugins and marketplaces you configure in the extension are also available in the CLI, and vice versa.

For more about the plugin system, see [Plugins](https://code.claude.com/docs/en/plugins) and [Plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces).
