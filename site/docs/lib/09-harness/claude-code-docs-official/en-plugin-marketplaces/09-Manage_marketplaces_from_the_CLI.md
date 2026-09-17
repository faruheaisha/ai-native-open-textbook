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
pageSha256: "dff936d0070c258c8b60115c29b6c31f5ee99b696163b68266ce51b05f593bb3"
contentMode: "local-full"
zh: ""
---

## Manage marketplaces from the CLI

Claude Code provides non-interactive `claude plugin marketplace` subcommands for scripting and automation. These are equivalent to the `/plugin marketplace` commands available inside an interactive session.

### Plugin marketplace add

Add a marketplace from a GitHub repository, git URL, remote URL, or local path.

```bash theme={null}
claude plugin marketplace add <source> [options]
```

**Arguments:**

* `<source>`: GitHub `owner/repo` shorthand, git URL, remote URL to a `marketplace.json` file, or local directory path. To pin to a branch or tag, append `@ref` to the GitHub shorthand or `#ref` to a git URL

A URL must include its scheme. As of Claude Code v2.1.196, a host typed without one, such as `gitlab.example.com/team/plugins`, is rejected as an invalid `owner/repo` shorthand and the error tells you to add `https://` or use `./` for a local path. Earlier versions misread it as a GitHub repository path and fail at clone time with a GitHub not-found error.

**Options:**

| Option                | Description                                                                                                                                         | Default |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `--scope <scope>`     | Where to declare the marketplace: `user`, `project`, or `local`. See [Plugin installation scopes](https://code.claude.com/docs/en/plugins-reference#plugin-installation-scopes) | `user`  |
| `--sparse <paths...>` | Limit checkout to specific directories via git sparse-checkout. Useful for monorepos                                                                |         |

Add a marketplace from GitHub using `owner/repo` shorthand:

```bash theme={null}
claude plugin marketplace add acme-corp/claude-plugins
```

Pin to a specific branch or tag with `@ref`:

```bash theme={null}
claude plugin marketplace add acme-corp/claude-plugins@v2.0
```

Add from a git URL on a non-GitHub host:

```bash theme={null}
claude plugin marketplace add https://gitlab.example.com/team/plugins.git
```

Add from a remote URL that serves the `marketplace.json` file directly:

```bash theme={null}
claude plugin marketplace add https://example.com/marketplace.json
```

Add from a local directory for testing:

```bash theme={null}
claude plugin marketplace add ./my-marketplace
```

Declare the marketplace at project scope so it is shared with your team via `.claude/settings.json`:

```bash theme={null}
claude plugin marketplace add acme-corp/claude-plugins --scope project
```

For a monorepo, limit the checkout to the directories that contain plugin content:

```bash theme={null}
claude plugin marketplace add acme-corp/monorepo --sparse .claude-plugin plugins
```

### Plugin marketplace list

List all configured marketplaces.

```bash theme={null}
claude plugin marketplace list [options]
```

**Options:**

| Option   | Description    |
| :------- | :------------- |
| `--json` | Output as JSON |

With `--json`, each entry includes `name`, `source`, an `installLocation` field with the local cache path where the marketplace is stored, and source-specific fields: `repo` for GitHub sources, `url` for git and URL sources, and `path` for local sources. GitHub and git sources also include a `ref` field when the marketplace was added with a pinned branch or tag.

### Plugin marketplace remove

Remove a configured marketplace. The alias `rm` is also accepted.

```bash theme={null}
claude plugin marketplace remove <name> [options]
```

**Arguments:**

* `<name>`: marketplace name to remove, as shown by `claude plugin marketplace list`. This is the `name` from `marketplace.json`, not the source you passed to `add`

**Options:**

| Option            | Description                                                                                                                                                                                                                                                                                                                                                                                                        | Default      |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `--scope <scope>` | Restrict removal to a single settings scope: `user`, `project`, or `local`. See [Plugin installation scopes](https://code.claude.com/docs/en/plugins-reference#plugin-installation-scopes). When omitted, the declaration is removed from every editable scope. When given, only that scope's declaration is removed; the shared state, cache, and installed plugin data are preserved when the marketplace is still declared in another scope | (all scopes) |

  Removing a marketplace from its last remaining scope also uninstalls any plugins you installed from it. To refresh a marketplace without losing installed plugins, use `claude plugin marketplace update` instead.

### Plugin marketplace update

Refresh marketplaces from their sources to retrieve new plugins and version changes. A marketplace added with a branch or tag `ref` updates to the latest commit of that ref, not the repository's default branch.

```bash theme={null}
claude plugin marketplace update [name]
```

**Arguments:**

* `[name]`: marketplace name to update, as shown by `claude plugin marketplace list`. Updates all marketplaces if omitted

Both `remove` and `update` fail when run against a seed-managed marketplace, which is read-only. When updating all marketplaces, seed-managed entries are skipped and other marketplaces still update. To change seed-provided plugins, ask your administrator to update the seed image. See [Pre-populate plugins for containers](#pre-populate-plugins-for-containers).
