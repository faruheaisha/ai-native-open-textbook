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
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "8b48d69023a5e059fe022c5b38bedbfa3f34ab784dc30eeb60004338060ed52c"
contentMode: "local-full"
zh: ""
---

## Plugin caching and file resolution

Plugins are specified in one of two ways:

* Through `claude --plugin-dir` or `claude --plugin-url`, for the duration of a session.
* Through a marketplace, installed for future sessions.

For security and verification purposes, Claude Code copies *marketplace* plugins to the user's local **plugin cache** (`~/.claude/plugins/cache`) rather than using them in place, except for [`command` sources in link mode](https://code.claude.com/docs/en/plugin-marketplaces#copy-mode-and-link-mode), which Claude Code uses in place through links in the cache entry.

For copied plugins, each installed version is a separate directory in the cache, grouped by marketplace and plugin and named for the resolved version, with its own copy of the plugin's files and [Node.js package dependencies](#node-js-package-dependencies). A dependency resolved from a [release tag](https://code.claude.com/docs/en/plugin-dependencies#tag-plugin-releases-for-version-resolution) gets a directory name with a commit-SHA suffix.

When you update or uninstall a plugin, Claude Code marks the previous version directory as orphaned and removes it in a background sweep roughly 14 days later. The grace period lets concurrent Claude Code sessions that already loaded the old version keep running without errors. Claude Code runs the sweep only while at least one plugin is installed; after you uninstall your last plugin, orphaned directories stay on disk until you install a plugin again.

Claude Code removes a plugin or marketplace folder from the cache only when it no longer contains any directory or symlink. If you symlink a development checkout into the cache as a plugin's version entry, Claude Code never marks the link as orphaned and never removes it or the folders that hold it. Claude Code also never writes its version-tracking files inside the linked checkout.

Claude's Glob and Grep tools skip orphaned version directories during searches, so file results don't include outdated plugin code.

### Node.js package dependencies

When Claude Code copies a plugin into the cache, it also installs the plugin's Node.js package dependencies there, so the plugin's hooks and MCP servers can load them. This section covers the npm and Bun packages a plugin declares in its own `package.json`. For plugins that depend on other plugins, see [plugin dependency versions](https://code.claude.com/docs/en/plugin-dependencies).

Claude Code runs the install inside the copied version directory each time it creates one: when you install a plugin, when Claude Code updates a plugin to a new version, and at session start when an enabled plugin isn't cached yet, such as on a new machine. The install runs only when the plugin's root directory contains both a `package.json` and a supported lockfile:

| Lockfile                                     | Command                                          |
| :------------------------------------------- | :----------------------------------------------- |
| `bun.lock` or `bun.lockb`                    | `bun install --frozen-lockfile --ignore-scripts` |
| `npm-shrinkwrap.json` or `package-lock.json` | `npm ci --ignore-scripts`                        |

If a plugin contains more than one of these lockfiles, Claude Code uses the first match, checking in order: `bun.lock`, `bun.lockb`, `npm-shrinkwrap.json`, `package-lock.json`. Claude Code skips `yarn.lock` and `pnpm-lock.yaml` because Yarn and pnpm support resolution-time configuration hooks that bypass `--ignore-scripts`.

Ship an npm lockfile for the widest reach. Claude Code runs the matched lockfile's package manager from the user's PATH and doesn't fall back to the other lockfile if it's missing. For a plugin distributed through an npm source, use `npm-shrinkwrap.json`; npm excludes `package-lock.json` from published packages.

Claude Code constrains this dependency install so that no code from the plugin or its packages executes during it, and bounds how long it can run:

* **Frozen resolution:** Bun and npm install exactly what the lockfile pins, and fail rather than re-resolve versions when `package.json` and the lockfile disagree.
* **No lifecycle scripts:** `--ignore-scripts` keeps `preinstall`, `install`, and `postinstall` scripts from running, so dependencies that build native modules in those scripts download but don't compile during this install.
* **60-second timeout:** Claude Code stops an install that runs longer and treats it as failed.

Fetching an npm-source plugin itself runs `npm install` with lifecycle scripts enabled, before this dependency install runs.

A failed or skipped install never blocks the plugin. When the install fails, or Claude Code skips a yarn or pnpm lockfile, it records the reason as a warning in [debug output](#debugging-commands). A plugin with a `package.json` and no lockfile is skipped without a log entry. A timed-out install can leave a partial `node_modules` tree in the cached copy.

You can't turn the automatic install off; no setting or environment variable disables it. In restricted networks, see the [network access requirements](https://code.claude.com/docs/en/network-config#network-access-requirements) for the hosts to allow.

For dependencies the automatic install can't provide, such as packages that need their lifecycle scripts to build, Python dependencies, or a plugin locked with Yarn or pnpm, install them from a hook into the [persistent data directory](#persistent-data-directory).

### Path traversal limitations

Claude Code doesn't let a plugin reference files outside its own directory. It rejects a component path that resolves outside the plugin root, whether the path is declared in `plugin.json` or in a [marketplace entry](https://code.claude.com/docs/en/plugin-marketplaces#plugin-entries). That covers a path that points outside the plugin as written, such as `../shared-utils`, and a symlink that leads outside the plugin, other than [links within one marketplace](#share-files-within-a-marketplace-with-symlinks).

On macOS and Linux, Claude Code also rejects a component path that contains a backslash anywhere in it, even when the path stays inside the plugin. Components declared with backslash paths therefore load on Windows only. Write component paths with forward slashes, such as `./commands/deploy.md`.

When Claude Code rejects a path, it reports a [`path escapes plugin directory`](https://code.claude.com/docs/en/errors#path-escapes-plugin-directory) error and loads the plugin without that component.

Claude Code also doesn't copy files outside the plugin directory into the cache when it installs the plugin, so when a script inside a copied plugin reads a path above the plugin root, it doesn't find those files either.

### Share files within a marketplace with symlinks

If your plugin needs to share files with other parts of the same marketplace, you can create symbolic links inside your plugin directory. How a symlink is handled when the plugin is copied into the cache depends on where its target resolves:

* **Within the plugin's own directory:** the symlink is preserved as a relative symlink in the cache, so it keeps resolving to the copied target at runtime.
* **Elsewhere within the same marketplace:** the symlink is dereferenced. The target's content is copied into the cache in its place. This lets a meta-plugin's `skills/` directory link to skills defined by other plugins in the marketplace.
* **Outside the marketplace:** the symlink is skipped for security. This prevents plugins from pulling arbitrary host files such as system paths into the cache.

For plugins installed with `--plugin-dir`, from a local path, or from a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#copy-mode-and-link-mode) in copy mode, only symlinks that resolve within the plugin's own directory are preserved. All others are skipped.

The following command creates a link from inside a marketplace plugin to a shared skill defined by a sibling plugin. On Windows, use `mklink /D` from an elevated Command Prompt or enable Developer Mode:

```bash theme={null}
ln -s ../../shared-plugin/skills/foo ./skills/foo
```

***
