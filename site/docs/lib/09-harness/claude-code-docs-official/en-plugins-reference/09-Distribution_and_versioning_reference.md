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
pageSha256: "a920235b3b540f7ec2fed17a869c92dec39dd51eb8618a91b35591a92b2ec3f9"
contentMode: "local-full"
zh: ""
---

## Distribution and versioning reference

### Version management

Claude Code uses the plugin's version as the cache key that determines whether an update is available. When you run `/plugin update` or auto-update fires, Claude Code computes the current version and skips the update if it matches what's already installed.

For every source type except `command`, Claude Code resolves the version from the first of these that is set:

1. The `version` field in the plugin's `plugin.json`
2. The `version` field in the plugin's marketplace entry in `marketplace.json`
3. The git commit SHA of the plugin's source, for `github`, `url`, `git-subdir`, and relative-path sources in a git-hosted marketplace
4. The SHA-256 digest, for [`archive` sources](https://code.claude.com/docs/en/plugin-marketplaces#zip-archives): the `sha256` pin in the marketplace entry, or the digest of the downloaded file when you set no pin. Claude Code shortens it to the first 12 characters
5. `unknown`, for `npm` sources or local directories not inside a git repository

For a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources), Claude Code always derives the version from what the command produced: a 12-character content hash on its own, or appended to the `plugin.json` version as `<version>-<hash>` when one is set. Claude Code ignores the marketplace entry's `version` field for command sources. A command whose hashed output changes therefore produces a new version, even when the authored version string stays the same. In [link mode](https://code.claude.com/docs/en/plugin-marketplaces#copy-mode-and-link-mode), the hash covers the printed directory's real path and its top-level entries rather than the file contents.

For those source types, this gives you three ways to version a plugin:

| Approach               | How                                                                                                                                  | Update behavior                                                                                                                                                      | Best for                                                                 |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **Explicit version**   | Set `"version": "2.1.0"` in `plugin.json`                                                                                            | Users get updates only when you bump this field. Pushing new commits without bumping it has no effect, and `/plugin update` reports "already at the latest version". | Published plugins with stable release cycles                             |
| **Commit-SHA version** | Omit `version` from both `plugin.json` and the marketplace entry                                                                     | Users get updates whenever the source's resolved commit changes                                                                                                      | Internal or team plugins under active development                        |
| **Digest version**     | Use an [`archive` source](https://code.claude.com/docs/en/plugin-marketplaces#zip-archives) and omit `version` from both `plugin.json` and the marketplace entry | With a `sha256` pin, users get updates when you change the pin. Without one, users get updates whenever the hosted zip file's bytes change                           | Plugins published as zip files to a static server or artifact repository |

If you use explicit versions, follow [semantic versioning](https://semver.org) (`MAJOR.MINOR.PATCH`): bump MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes. Document changes in a `CHANGELOG.md`.

***
