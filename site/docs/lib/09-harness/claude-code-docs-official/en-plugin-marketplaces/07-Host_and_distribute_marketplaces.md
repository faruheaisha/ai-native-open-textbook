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
pageSha256: "b6b6d9d13498f6f8d8f1f97e2bf9fced2ae4e37e82a3d4dd2bee966a6980df09"
contentMode: "local-full"
zh: ""
---

## Host and distribute marketplaces

### Host on GitHub (recommended)

GitHub is the recommended way to host and distribute a marketplace:

1. **Create a repository**: set up a new repository for your marketplace
2. **Add marketplace file**: create `.claude-plugin/marketplace.json` with your plugin definitions
3. **Share with teams**: users add your marketplace with `/plugin marketplace add owner/repo`

**Benefits**: built-in version control, issue tracking, and team collaboration features.

### Host on other git services

Any git hosting service works, such as GitLab, Bitbucket, and self-hosted servers. Users add with the full repository URL:

```shell theme={null}
/plugin marketplace add https://gitlab.com/company/plugins.git
```

### Private repositories

Claude Code supports installing plugins from private repositories. If you distribute your marketplace through [**Organization settings > Plugins**](https://claude.ai/admin-settings/plugins) instead, your git credentials aren't involved: organization sync reads the marketplace repository through the Claude GitHub App or your organization's GitHub Enterprise App, and a plugin source it can't authenticate to must be public. See [Distribute through organization settings](#distribute-through-organization-settings) for the full rules.

#### Commands you run

When you run `/plugin marketplace add`, `/plugin install`, `/plugin update`, or `/plugin marketplace update`, Claude Code uses your existing git credential helpers, so HTTPS access via `gh auth login`, macOS Keychain, or `git-credential-store` works the same as in your terminal. SSH access works as long as the host is already in your `known_hosts` file and the key is loaded in `ssh-agent`, since Claude Code suppresses interactive SSH prompts for the host fingerprint and key passphrase. GitHub `owner/repo` shorthand sources clone over SSH by default; set [`CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1`](https://code.claude.com/docs/en/env-vars#variables) to clone them over HTTPS instead.

#### Background auto-updates

By default, the background refresh disables git credential helpers for its `git pull`, so the pull can't authenticate to private repositories over HTTPS even when a helper is configured. SSH remotes aren't affected: a key loaded in `ssh-agent` authenticates background pulls the same way as the commands you run. When the background pull fails, Claude Code falls back to re-cloning the marketplace from scratch. The re-clone does use your stored git credentials, but it can [time out on large repositories](#git-operations-time-out), so private-marketplace auto-updates may fail intermittently.

Two settings make private marketplaces behave predictably:

* Set `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1` to keep the existing clone when the background pull fails, instead of deleting and re-cloning. Your plugins keep working from the last synced state, and manual updates with `/plugin marketplace update` still pull with your credentials.
* Configure a git credential helper, for example with `gh auth setup-git` for GitHub, so the re-clone fallback can authenticate without prompting.

Setting a provider token such as `GITHUB_TOKEN` in your environment doesn't by itself enable background authentication. Tokens take effect only through a configured credential helper, for example the `gh` CLI's helper, which reads `GH_TOKEN` and `GITHUB_TOKEN`.

To make the background pull itself authenticate over HTTPS, configure a global git URL rewrite. The rewrite embeds a token in the remote URL, so it takes effect even though the background pull disables credential helpers, and a successful pull skips the re-clone fallback. The following example rewrites the marketplace repository's URL to include an access token:

```bash theme={null}
git config --global url."https://x-access-token:YOUR_TOKEN@github.com/acme-corp/plugins".insteadOf "https://github.com/acme-corp/plugins"
```

Scope the rewrite to the marketplace repository or organization path. A rewrite whose base is only the host applies to every fetch and push to that host on the machine and overrides your normal credentials, including pushes to your own repositories.

Each provider expects a different username in the rewritten URL, and the same path scoping applies to every provider. For self-hosted servers, replace the hostname with your server's hostname:

| Provider  | Rewritten URL form                                                |
| :-------- | :---------------------------------------------------------------- |
| GitHub    | `https://x-access-token:YOUR_TOKEN@github.com/acme-corp/plugins`  |
| GitLab    | `https://oauth2:YOUR_TOKEN@gitlab.com/acme-corp/plugins`          |
| Bitbucket | `https://x-token-auth:YOUR_TOKEN@bitbucket.org/acme-corp/plugins` |

The rewrite stores the token in plaintext in your gitconfig, so use a token with read-only access to the marketplace repository.

  In CI/CD environments, configure a git credential helper before installing plugins from private repositories. On GitHub Actions, export a token with read access to the marketplace repository as `GH_TOKEN`, then run `gh auth setup-git`. The default workflow token can only access the workflow's own repository, so a private marketplace in another repository needs a personal access token or app token. A global URL rewrite configured in the pipeline also authenticates the background pull directly.

### Distribute through organization settings

If you distribute plugins through [**Organization settings > Plugins**](https://claude.ai/admin-settings/plugins) on a Team or Enterprise plan, these source rules apply:

* The marketplace repository must be private or internal. Organization sync reads it through the Claude GitHub App or your organization's GitHub Enterprise App.
* Each plugin source must be of type `github`, `url`, or `git-subdir`, or a [relative path](#relative-paths) that starts with `./`. If you list a plugin by bare name under `metadata.pluginRoot`, organization sync rejects it as an unsupported source, so write the path out, such as `./plugins/deploy-tools`.
* A plugin source can be private in two cases:
  * A github.com source that shares the marketplace repository's owner
  * A source on your organization's GitHub Enterprise host with the GHE App installed on the repository
* Organization sync fetches every other source without credentials, so github.com repositories under a different owner and repositories on other hosts, such as GitLab or Bitbucket, must be public.

See [Manage plugins for your organization](https://support.claude.com/en/articles/13837433) for the admin workflow.

To include private plugins, place the plugin folders inside the marketplace repository and reference them with a [relative path](#relative-paths). Organization sync packages each plugin during distribution, so users never need access to a separate source repository.

For example, this `marketplace.json` plugin entry references a plugin you committed at `plugins/deploy-tools` in the marketplace repository:

```json theme={null}
{
  "name": "deploy-tools",
  "source": "./plugins/deploy-tools"
}
```

#### Keep executables out of the top-level bin directory

Don't include a top-level `bin/` directory in any plugin you distribute through organization settings. claude.ai rejects a plugin that has one, whether the plugin arrives by marketplace sync or by direct upload:

* **Marketplace sync**: organization sync rejects that plugin and syncs the rest of the marketplace. The error message starts with `Plugin contains a top-level bin/ directory`.
* **Direct upload**: if you upload the plugin in [**Organization settings > Plugins**](https://claude.ai/admin-settings/plugins) instead, claude.ai rejects the upload with the same message.

Keep executables in another directory, such as `scripts/`, and reference them as `$\{CLAUDE_PLUGIN_ROOT\}/scripts/<name>` from your [skills, hooks, or MCP server configs](https://code.claude.com/docs/en/plugins-reference#environment-variables).

### Require marketplaces for your team

You can configure your repository so Claude Code adds your marketplace for team members once they [trust the project folder](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder), with no separate prompt. Add your marketplace to `.claude/settings.json`:

```json theme={null}
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    }
  }
}
```

You can also specify which plugins should be enabled by default:

```json theme={null}
{
  "enabledPlugins": {
    "code-formatter@company-tools": true,
    "deployment-tools@company-tools": true
  }
}
```

For full configuration options, see [Plugin settings](https://code.claude.com/docs/en/settings-reference#plugin-settings).

  If you use a local `directory` or `file` source with a relative path, the path resolves against your repository's main checkout. When you run Claude Code from a git worktree, the path still points at the main checkout, so all worktrees share the same marketplace location. Marketplace state is stored once per user in `~/.claude/plugins/known_marketplaces.json`, not per project.

### Pre-populate plugins for containers

For container images and CI environments, you can pre-populate a plugins directory at build time so Claude Code starts with marketplaces and plugins already available, without cloning anything at runtime. Set the `CLAUDE_CODE_PLUGIN_SEED_DIR` environment variable to point at this directory.

To layer multiple seed directories, separate paths with `:` on Unix or `;` on Windows. Claude Code searches each directory in order and uses the first seed that contains a given marketplace or plugin cache.

The seed directory mirrors the structure of `~/.claude/plugins`:

```
$CLAUDE_CODE_PLUGIN_SEED_DIR/
  known_marketplaces.json
  marketplaces/<name>/...
  cache/<marketplace>/<plugin>/<version>/...
```

To build a seed directory, run Claude Code once during image build, install the plugins you need, then copy the resulting `~/.claude/plugins` directory into your image and point `CLAUDE_CODE_PLUGIN_SEED_DIR` at it.

To skip the copy step, set `CLAUDE_CODE_PLUGIN_CACHE_DIR` to your target seed path during the build so plugins install directly there:

```bash theme={null}
CLAUDE_CODE_PLUGIN_CACHE_DIR=/opt/claude-seed claude plugin marketplace add your-org/plugins
CLAUDE_CODE_PLUGIN_CACHE_DIR=/opt/claude-seed claude plugin install my-tool@your-plugins
```

Then set `CLAUDE_CODE_PLUGIN_SEED_DIR=/opt/claude-seed` in your container's runtime environment so Claude Code reads from the seed on startup.

At startup, Claude Code registers marketplaces found in the seed's `known_marketplaces.json` into the primary configuration, and uses plugin caches found under `cache/` in place without re-cloning. This works in both interactive mode and non-interactive mode with the `-p` flag.

Behavior details:

* **Read-only**: the seed directory is never written to. Auto-updates are disabled for seed marketplaces since git pull would fail on a read-only filesystem.
* **Seed entries take precedence**: marketplaces declared in the seed overwrite any matching entries in the user's configuration on each startup. To opt out of a seed plugin, use `/plugin disable` rather than removing the marketplace.
* **Path resolution**: Claude Code locates marketplace content by probing `$CLAUDE_CODE_PLUGIN_SEED_DIR/marketplaces/<name>/` at runtime, not by trusting paths stored inside the seed's JSON. This means the seed works correctly even when mounted at a different path than where it was built.
* **Mutation is blocked**: running `/plugin marketplace remove` or `/plugin marketplace update` against a seed-managed marketplace fails with guidance to ask your administrator to update the seed image.
* **Composes with settings**: if `extraKnownMarketplaces` or `enabledPlugins` declare a marketplace that already exists in the seed, Claude Code uses the seed copy instead of cloning.

### Managed marketplace restrictions

For organizations requiring strict control over plugin sources, administrators can restrict which plugin marketplaces users are allowed to add using the [`strictKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#strictknownmarketplaces) setting in managed settings. To also reject the CLI flags that sideload plugins, agents, and MCP servers for a single run, pair it with [`disableSideloadFlags`](https://code.claude.com/docs/en/settings-reference#disablesideloadflags). To allowlist which marketplaces' plugins can appear as contextual install suggestions, set [`pluginSuggestionMarketplaces`](https://code.claude.com/docs/en/settings-reference#pluginsuggestionmarketplaces).

`strictKnownMarketplaces` matches the marketplace a plugin comes from, not the entries inside it, so users can still install a plugin with a [`command` source](#command-sources) from an allowed marketplace. To block command sources as well, set [`disableCommandPluginSources`](https://code.claude.com/docs/en/settings-reference#disablecommandpluginsources).

When `strictKnownMarketplaces` is configured in managed settings, the restriction behavior depends on the value:

| Value               | Behavior                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Undefined (default) | No restrictions. Users can add any marketplace                                                   |
| Empty array `[]`    | Complete lockdown. Blocks every marketplace source, including the official Anthropic marketplace |
| List of sources     | Allowlist enforced. Users can add only marketplaces that match an entry                          |

#### Common configurations

Disable all marketplace additions, including the official Anthropic marketplace:

```json theme={null}
{
  "strictKnownMarketplaces": []
}
```

Allow only the official Anthropic marketplace. Matching for a single-repository entry is exact, so this entry doesn't cover `ref` or `path` variants of the same repository:

```json theme={null}
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "anthropics/claude-plugins-official"
    }
  ]
}
```

With this entry, Claude Code keeps an already-registered official marketplace available and, on a fresh machine, registers the marketplace automatically the first time you start Claude Code interactively.

Automatic registration doesn't cover every machine. It most commonly misses:

* Non-interactive environments that run before the machine's first interactive launch.
* Machines where Claude Code already ran interactively under a policy that blocked the marketplace, such as the empty-array lockdown. Claude Code records the blocked attempt and doesn't retry after the policy changes.

On these machines, add the marketplace to [`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) in the same `managed-settings.json` so Claude Code registers it automatically, or run `claude plugin marketplace add anthropics/claude-plugins-official`.

Allow specific marketplaces only:

```json theme={null}
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    },
    {
      "source": "github",
      "repo": "acme-corp/security-tools",
      "ref": "v2.0"
    },
    {
      "source": "url",
      "url": "https://plugins.example.com/marketplace.json"
    }
  ]
}
```

Allow every marketplace repository under a GitHub organization with an [owner-wildcard](https://code.claude.com/docs/en/settings-reference#owner-wildcards) entry. Owner wildcards require Claude Code v2.1.223 or later.

```json theme={null}
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/*"
    }
  ]
}
```

Allow all marketplaces from an internal git server using regex pattern matching on the host. This is the recommended approach for [GitHub Enterprise Server](https://code.claude.com/docs/en/github-enterprise-server#plugin-marketplaces-on-ghes) or self-hosted GitLab instances:

```json theme={null}
{
  "strictKnownMarketplaces": [
    {
      "source": "hostPattern",
      "hostPattern": "^github\\.example\\.com$"
    }
  ]
}
```

Allow filesystem-based marketplaces from a specific directory using regex pattern matching on the path:

```json theme={null}
{
  "strictKnownMarketplaces": [
    {
      "source": "pathPattern",
      "pathPattern": "^/opt/approved/"
    }
  ]
}
```

Use `".*"` as the `pathPattern` to allow any filesystem path while still controlling network sources with `hostPattern`.

  `strictKnownMarketplaces` restricts what users can add, but doesn't register marketplaces on its own. To register an allowed marketplace for users automatically, add it to [`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) in the same `managed-settings.json`.

  The official Anthropic marketplace is the only one Claude Code registers on its own, and only when the allowlist allows it. Automatic registration also misses some machines, such as non-interactive environments and machines where an earlier policy blocked it. To cover those machines, add the official marketplace to `extraKnownMarketplaces` as well. For the two settings side by side, see the [`strictKnownMarketplaces` reference](https://code.claude.com/docs/en/settings-reference#strictknownmarketplaces).

#### How restrictions work

Restrictions are checked before any network or filesystem operation. The check runs on marketplace add and on plugin install, update, refresh, and auto-update. If a marketplace was added before the policy was configured and its source no longer matches the allowlist, Claude Code refuses to install or update plugins from it. The same enforcement applies to `blockedMarketplaces`.

To block every marketplace repository under a GitHub owner, use the owner-wildcard form in a `blockedMarketplaces` entry: `\{ "source": "github", "repo": "untrusted-org/*" \}`. Requires Claude Code v2.1.223 or later. For the matching rules, which differ between the blocklist and the allowlist, see [Owner wildcards](https://code.claude.com/docs/en/settings-reference#owner-wildcards).

When a user adds an `https://` repository URL that Claude Code [clones rather than fetches](https://code.claude.com/docs/en/discover-plugins#add-from-other-git-hosts), such as a bare `github.com` or `gitlab.com` repository URL, Claude Code also checks it against the `url` entries in `blockedMarketplaces`. Claude Code blocks the addition if an entry names the same URL. In that comparison, Claude Code ignores the `.git` suffix and any ref the user appends after `#`. Requires Claude Code v2.1.232 or later. Before v2.1.232, Claude Code matched a `url` entry only against a URL it fetched as a hosted `marketplace.json` file.

The allowlist uses exact matching for most source types, apart from owner-wildcard `github` entries. For a marketplace to be allowed, all specified fields must match:

* For GitHub sources: `repo` is required, either naming one repository or using the owner-wildcard form `owner/*` to cover every repository under that owner. For how wildcard entries match, including the case rules, see [Owner wildcards](https://code.claude.com/docs/en/settings-reference#owner-wildcards). For single-repository entries, `ref` must match exactly or be absent from both the marketplace source and the allowlist entry, and the same rule applies to `path`
* For URL sources: the full URL must match exactly
* For `hostPattern` sources: the marketplace host is matched against the regex pattern
* For `pathPattern` sources: the marketplace's filesystem path is matched against the regex pattern

The allowlist's exact matching treats URLs that differ only by a trailing slash, a `.git` suffix, or the `ssh://` and `https://` scheme as different values. If your organization's marketplace can be cloned by more than one URL form, prefer a `hostPattern` entry over a literal URL so the `https://`, `ssh://`, and `user@host:path` forms all match.

Because `strictKnownMarketplaces` is set in [managed settings](https://code.claude.com/docs/en/managed-settings), individual users and project configurations can't override these restrictions.

For complete configuration details including all supported source types and comparison with `extraKnownMarketplaces`, see the [strictKnownMarketplaces reference](https://code.claude.com/docs/en/settings-reference#strictknownmarketplaces).

### Version resolution and release channels

Plugin versions determine cache paths and update detection: if the resolved version matches what a user already has, `/plugin update` and auto-update skip the plugin. For git-based sources, if you omit `version`, Claude Code uses the source's resolved commit SHA, so users get an update whenever that commit changes; this is the simplest setup for internal or actively developed plugins. See [Version management](https://code.claude.com/docs/en/plugins-reference#version-management) for the full resolution order, including `archive` sources.

  Setting `version` pins the plugin for every source type except [`command`](#command-sources), whose version always includes a hash of what the command produced. If you declare `"version": "1.0.0"` in `plugin.json` and push new commits without changing that string, existing users of those sources keep the cached copy, because Claude Code sees the same version. Bump the field on every release, or omit it to fall back to the resolved version.

  Avoid setting `version` in both `plugin.json` and the marketplace entry. Claude Code always uses the `plugin.json` value without warning, so a stale manifest version can mask a version you set in `marketplace.json`.

#### Set up release channels

To support "stable" and "latest" release channels for your plugins, you can set up two marketplaces that point to different refs or SHAs of the same repo. You can then give each user group its own marketplace through managed settings in one of two ways:

* Deploy separate [endpoint-managed settings](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms), such as a managed settings file or an MDM profile, to each group's devices. [How Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#precedence-within-the-managed-tier) says whether the per-group file or profile applies on a device that also has an organization-wide source.
* Define one [Claude apps gateway policy](https://code.claude.com/docs/en/claude-apps-gateway-config#managed) per group. The gateway applies the first policy whose match rule fits a user, so order the policies so that each user reaches their group's policy. A group policy's `extraKnownMarketplaces` replaces the catch-all policy's map rather than merging with it, so list every marketplace the group needs in the group's policy, not only its channel marketplace.

Server-managed settings from the admin console [apply to every user in your organization](https://code.claude.com/docs/en/server-managed-settings#current-limitations), so they can't carry a per-group assignment.

  Each channel must resolve to a different version. If you use explicit versions, `plugin.json` must declare a different `version` at each pinned ref. If you omit `version`, the distinct commit SHAs already distinguish the channels. If two refs resolve to the same version string, Claude Code treats them as identical and skips the update.

##### Example

```json theme={null}
{
  "name": "stable-tools",
  "plugins": [
    {
      "name": "code-formatter",
      "source": {
        "source": "github",
        "repo": "acme-corp/code-formatter",
        "ref": "stable"
      }
    }
  ]
}
```

```json theme={null}
{
  "name": "latest-tools",
  "plugins": [
    {
      "name": "code-formatter",
      "source": {
        "source": "github",
        "repo": "acme-corp/code-formatter",
        "ref": "latest"
      }
    }
  ]
}
```

##### Assign channels to user groups

Assign each marketplace to its user group through the per-group endpoint-managed settings or gateway policy described under [Set up release channels](#set-up-release-channels). For example, the stable group receives:

```json theme={null}
{
  "extraKnownMarketplaces": {
    "stable-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/stable-tools"
      }
    }
  }
}
```

The early-access group receives `latest-tools` instead:

```json theme={null}
{
  "extraKnownMarketplaces": {
    "latest-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/latest-tools"
      }
    }
  }
}
```

#### Pin dependency versions

A plugin can constrain its dependencies to a semver range so that updates to a dependency don't break the dependent plugin. See [Constrain plugin dependency versions](https://code.claude.com/docs/en/plugin-dependencies) for the `\{plugin-name\}--v\{version\}` git-tag convention, range syntax, and how multiple constraints on the same dependency are combined.

### Rename or remove a plugin

A plugin's `name` is its stable identifier. Users reference it in `enabledPlugins`, `pluginConfigs`, and `/plugin install` commands, so changing it breaks every existing install. To change the label shown in the UI without breaking installs, set [`displayName`](#optional-plugin-fields) and keep `name` unchanged.

If you must change a plugin's `name`, or you remove a plugin from the `plugins` array, add a top-level `renames` entry so existing users migrate instead of seeing a `plugin-not-found` error. Automatic migration requires Claude Code v2.1.193 or later. Map each former name to its current name, or to `null` if the plugin no longer exists. The following example renames `formatter` to `code-formatter` and records that `legacy-linter` was removed:

```json theme={null}
{
  "name": "acme-tools",
  "owner": { "name": "Acme" },
  "plugins": [
    { "name": "code-formatter", "source": "./plugins/code-formatter" }
  ],
  "renames": {
    "formatter": "code-formatter",
    "legacy-linter": null
  }
}
```

When a user starts Claude Code with the old name still in their settings, Claude Code follows the `renames` map:

* If the entry points to a new name, Claude Code loads the plugin under its new name and shows a one-line notice such as `Renamed to "code-formatter" in the "acme-tools" marketplace`. It then rewrites the old key to the new key in the user, project, and local settings scopes for both `enabledPlugins` and `pluginConfigs`, so the notice appears once.
* For a `null` entry, Claude Code drops the old key and the notice reports that the plugin was removed from the marketplace.
* If the renamed plugin uses a remote source such as `github` or `npm`, Claude Code reports `plugin-cache-miss` after the rename and the user must run `/plugin install` once to fetch it under the new name.

Treat `renames` as append-only history: keep old entries in place even after you expect every user to have migrated. Claude Code follows chains, so if you later rename `code-formatter` to `formatter-pro`, add a second entry rather than editing the first. A user who still has the original `formatter` enabled then resolves through both entries to `formatter-pro`.

Run `claude plugin validate .` after editing the map; it rejects any entry whose chain forms a cycle or doesn't terminate at `null` or a name listed in `plugins`.

  Managed and policy settings are read-only to Claude Code, so plugins enabled there can't be rewritten automatically. The renamed plugin still loads each session, but the rename notice recurs until an administrator updates `enabledPlugins` in the managed settings file to use the new name. The same applies to plugins enabled through other read-only sources such as `--add-dir`.

Earlier versions of Claude Code ignore the `renames` field and report `plugin-not-found` for the old name.
