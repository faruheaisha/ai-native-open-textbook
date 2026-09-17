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
sourceRel: "en/plugin-marketplaces.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugin-marketplaces.md"
sourceSha256: "7912af9270337aa00dd39e74120a5aad65065f90b4a15c54eed99cec6ff6d960"
pageSha256: "e0d6a90544e600d7252bc79e85826f8f126f25d7d94506813e6736303059616c"
contentMode: "local-full"
zh: ""
---

## Walkthrough: create a local marketplace

This example creates a marketplace with one plugin: a `quality-review` skill for code reviews. You'll create the directory structure, add a skill, create the plugin manifest and marketplace catalog, then install and test it.

    ```bash theme=\{null\}
    mkdir -p my-marketplace/.claude-plugin
    mkdir -p my-marketplace/plugins/quality-review-plugin/.claude-plugin
    mkdir -p my-marketplace/plugins/quality-review-plugin/skills/quality-review
    ```

    Create a `SKILL.md` file that defines what the `quality-review` skill does.

    ```markdown my-marketplace/plugins/quality-review-plugin/skills/quality-review/SKILL.md theme=\{null\}
    ---
    description: Review code for bugs, security, and performance
    ---

    Review the code I've selected or the recent changes for:
    - Potential bugs or edge cases
    - Security concerns
    - Performance issues
    - Readability improvements

    Be concise and actionable.
    ```

    Create a `plugin.json` file that describes the plugin. The manifest goes in the `.claude-plugin/` directory.

    ```json my-marketplace/plugins/quality-review-plugin/.claude-plugin/plugin.json theme=\{null\}
    \{
      "name": "quality-review-plugin",
      "description": "Adds a quality-review skill for quick code reviews",
      "version": "1.0.0",
      "author": \{
        "name": "Your Name"
      \}
    \}
    ```

      Setting `version` means users only receive updates when you change this field, so bump it on every release. A plugin with a [`command` source](#command-sources) isn't pinned by this field. If you omit `version`, the version comes from the next source in [version management](https://code.claude.com/docs/en/plugins-reference#version-management).

    Create the marketplace catalog that lists your plugin.

    ```json my-marketplace/.claude-plugin/marketplace.json theme=\{null\}
    \{
      "name": "my-plugins",
      "owner": \{
        "name": "Your Name"
      \},
      "plugins": [
        \{
          "name": "quality-review-plugin",
          "source": "./plugins/quality-review-plugin",
          "description": "Adds a quality-review skill for quick code reviews"
        \}
      ]
    \}
    ```

    From the directory that contains `my-marketplace`, start Claude Code and run the following commands. The install command opens a plugin details view where you select an installation scope to confirm the install. Check the install summary: if it reports `Run /reload-plugins to activate.`, see [Apply plugin changes without restarting](https://code.claude.com/docs/en/discover-plugins#apply-plugin-changes-without-restarting).

    ```shell theme=\{null\}
    /plugin marketplace add ./my-marketplace
    /plugin install quality-review-plugin@my-plugins
    ```

    Select some code in your editor and run your new skill. Plugin skills are namespaced with the plugin name.

    ```shell theme=\{null\}
    /quality-review-plugin:quality-review
    ```

To learn more about what plugins can do, including hooks, agents, MCP servers, and LSP servers, see [Plugins](https://code.claude.com/docs/en/plugins).

  **How plugins are installed**: when users install a plugin, Claude Code copies the plugin directory to a cache location, except for a [`command` source in link mode](#copy-mode-and-link-mode), which is used in place. Copied plugins can't reference files outside their directory using paths like `../shared-utils`, because those files won't be copied.

  If you need to share files across plugins, use symlinks. See [Plugin caching and file resolution](https://code.claude.com/docs/en/plugins-reference#plugin-caching-and-file-resolution) for details.
