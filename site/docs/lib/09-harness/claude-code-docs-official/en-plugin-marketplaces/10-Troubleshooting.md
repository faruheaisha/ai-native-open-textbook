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
pageSha256: "59e2379231364934aac15200daeb481e61fe569ff8301e95ff539b2d5163756d"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### Marketplace not loading

**Symptoms**: Can't add marketplace or see plugins from it

**Solutions**:

* Verify the marketplace URL is accessible
* Check that `.claude-plugin/marketplace.json` exists at the specified path
* Ensure JSON syntax is valid using `claude plugin validate .` or `/plugin validate .` from the marketplace directory. To check skill, agent, and command frontmatter, see [Validate a plugin or a directory without a manifest](#validate-a-plugin-or-a-directory-without-a-manifest)
* For private repositories, confirm you have access permissions

### Marketplace validation errors

Run `claude plugin validate .` or `/plugin validate .` from your marketplace directory to check for issues. When pointed at a marketplace directory, the validator checks `marketplace.json` for schema errors, duplicate plugin names, and source path traversal. For each entry whose `source` is a local path, it also validates that plugin's own `plugin.json` and warns when the entry's `version` doesn't match the one in `plugin.json`. Problems found in a plugin's `plugin.json` are prefixed with the entry index, in the form `plugins[2] plugin.json →`.

As of Claude Code v2.1.196, the per-entry pass also:

* includes plugins whose `source` is `.`
* runs when `marketplace.json` is outside a `.claude-plugin` directory, resolving sources against the file's own directory
* reports each entry's problems even when another part of the file has schema errors

Earlier versions skip plugins at the marketplace root and only descend from a `.claude-plugin/marketplace.json`.

From a marketplace directory, Claude Code doesn't open the plugins' skill, agent, command, or hook files. To find errors in those files, see [Validate a plugin or a directory without a manifest](#validate-a-plugin-or-a-directory-without-a-manifest). The table below lists the most common errors from a marketplace directory, with the cause and fix for each:

| Error                                                                                                    | Cause                                                                                                                               | Solution                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `No manifest found in directory. Expected .claude-plugin/marketplace.json or .claude-plugin/plugin.json` | The directory you named has no `.claude-plugin/marketplace.json` or `plugin.json`, and no skill, agent, or command files to check   | Run from the marketplace root, or create `.claude-plugin/marketplace.json` with the required fields                                                               |
| `Invalid JSON syntax: Unexpected token...`                                                               | JSON syntax error in marketplace.json                                                                                               | Check for missing commas, extra commas, or unquoted strings                                                                                                       |
| `Duplicate plugin name "x" found in marketplace`                                                         | Two plugins share the same name                                                                                                     | Give each plugin a unique `name` value                                                                                                                            |
| `plugins[0].source: Path contains ".."`                                                                  | Source path contains `..`                                                                                                           | Use paths relative to the marketplace root without `..`. See [Relative paths](#relative-paths)                                                                    |
| `Marketplace name cannot contain control or bidirectional-formatting characters`                         | The marketplace `name` contains a Unicode bidirectional-formatting character or a control character, such as an escape or a newline | Remove the character from the name. Before v2.1.247, these characters produced the `Marketplace name impersonates an official Anthropic/Claude marketplace` error |
| `Plugin name cannot contain control or bidirectional-formatting characters`                              | A plugin `name` contains a Unicode bidirectional-formatting character or a control character, such as an escape or a newline        | Remove the character from the name. Before v2.1.247, Claude Code didn't run this check                                                                            |

**Warnings** (non-blocking):

* `Marketplace has no plugins defined`: add at least one plugin to the `plugins` array
* `No marketplace description provided`: add a top-level `description` to help users understand your marketplace
* `Plugin name "x" is not kebab-case`: rename to lowercase letters, digits, and hyphens only (for example, `my-plugin`). Claude Code accepts other forms, but the claude.ai marketplace sync rejects them.
* `Marketplace name "x" is reserved in Claude Desktop`: the marketplace is named `org`, `org-provisioned`, or `unknown`, in any casing. Claude Code accepts these names, but Claude Desktop's managed marketplace sync rejects the whole marketplace. Rename the marketplace. Before v2.1.221, `claude plugin validate` didn't run this check.
* `Marketplace name "x" is not accepted by Claude Desktop` or `Plugin name "x" is not accepted by Claude Desktop`: Claude Desktop accepts names of up to 128 characters made of letters, digits, `.`, `_`, and `-`, starting with a letter or digit. Claude Code accepts other forms, but Claude Desktop's managed marketplace sync rejects a marketplace whose name fails the check and silently drops a plugin entry whose name does. Rename the marketplace or plugin. Before v2.1.221, `claude plugin validate` didn't run these checks.

#### Validate a plugin or a directory without a manifest

To find skill, agent, and command files whose frontmatter doesn't parse, run `claude plugin validate` and name the directory that holds them. Claude Code doesn't look outside the directory you name. Every run except one against a plugin that has a `plugin.json` requires Claude Code v2.1.233 or later.

##### Pick the directory to name

Claude Code checks different files depending on which directory you name. Find what you want to check in the first column, and run that row's command:

| To check                                                                                     | Run                                                                                             | Claude Code checks                                                                                                                                                       |
| :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A plugin that has a `plugin.json`                                                            | `claude plugin validate ./plugins/my-plugin`                                                    | `plugin.json`, `hooks/hooks.json`, and the `skills`, `agents`, and `commands` directories at the plugin root                                                             |
| One directory of skills, agents, or commands, such as a plugin that has no `plugin.json` yet | `claude plugin validate .claude/skills`, `~/.claude/agents`, or `./my-plugin/agents`            | Every skill, agent, or command file in that directory                                                                                                                    |
| A folder whose skill is its root `SKILL.md`                                                  | `claude plugin validate ./skills`, naming the `skills` directory that holds the folder          | Each folder's root `SKILL.md`. The holding directory must be named `skills`; a folder under another name, such as `plugins/`, has no run that checks its root `SKILL.md` |
| A project's three directories at once                                                        | `claude plugin validate .claude`, or the project root when it has no `.claude-plugin/` manifest | `.claude/skills`, `.claude/agents`, and `.claude/commands`                                                                                                               |
| Your user-level directories                                                                  | `claude plugin validate ~/.claude`                                                              | `~/.claude/skills`, `~/.claude/agents`, and `~/.claude/commands`                                                                                                         |

##### Check a plugin whose skill is its root `SKILL.md`

When you run `claude plugin validate` against a plugin directory, Claude Code doesn't check a `SKILL.md` at the plugin root. When the plugin sits in a directory named `skills`, run the command twice:

* Name that `skills` directory to check the plugin's root `SKILL.md`.
* Name the plugin directory to check the rest.

When the plugin sits under another name, such as `plugins/`, the `skills`-directory run isn't available, and no run checks its root `SKILL.md`.

##### Check files behind symlinks

When you run `claude plugin validate`, Claude Code doesn't follow symlinks inside the directory you name. What it does depends on where the link is:

* **A linked `skills`, `agents`, or `commands` directory under the plugin or `.claude` root**: Claude Code warns that nothing in it was read.
* **A linked entry inside a `skills`, `agents`, or `commands` directory**: Claude Code skips it and warns, per directory, how many entries it skipped that a session would load.
* **The `skills`, `agents`, or `commands` directory you name is itself a symlink, or its parent `.claude` directory is**: Claude Code reports an error and checks nothing in it. Name the real directory instead.

In two skills cases, the run passes with warnings. To check the linked files, run again and name a directory that holds them directly:

* **A plugin whose `skills` directory [links to a sibling plugin's skills](https://code.claude.com/docs/en/plugins-reference#share-files-within-a-marketplace-with-symlinks)**: name the sibling plugin's directory.
* **A [symlinked skill entry](https://code.claude.com/docs/en/skills#where-skills-live) in `~/.claude/skills` or `.claude/skills`**: Claude Code follows the entry in a session. To check it, name a directory called `skills` that holds the real folder.

##### Read the validation results

A clean run ends with `Validation passed`.

`No manifest found in directory` means Claude Code found no `plugin.json` or `marketplace.json` there, and no skill, agent, or command file in the directories it probes under it. Name the `skills`, `agents`, or `commands` directory that holds your files instead.

Two of the errors Claude Code reports from these runs, with the fix for each:

* `YAML frontmatter failed to parse: ...`: fix the YAML in the frontmatter block of the skill, agent, or command file. Until you do, a session reads no frontmatter fields from the file
* `Invalid JSON syntax: ...` on `hooks/hooks.json`: fix the JSON syntax. Until you do, a session loads the plugin without the hooks in that file. Claude Code reports this error only in a plugin run

In a plugin run, Claude Code also warns about a `CLAUDE.md` at the plugin root. For paths you set through the [component path fields](https://code.claude.com/docs/en/plugins-reference#component-path-fields) in `plugin.json`, Claude Code checks that each path exists but doesn't read the files there.

### Plugin installation failures

**Symptoms**: Marketplace appears but plugin installation fails

**Solutions**:

* Verify plugin source URLs are accessible
* Check that plugin directories contain required files
* For GitHub sources, ensure repositories are public or you have access
* Test plugin sources manually by cloning/downloading
* If the source pins both `ref` and `sha`, a deleted upstream branch or tag doesn't block installation on most git hosts, including GitHub, GitLab, and Bitbucket. On servers that don't support fetching commits by SHA, such as AWS CodeCommit, the `ref` must still exist and the pinned commit must be reachable from it. If the install still fails, confirm the pinned commit still exists in the repository

### Private repository authentication fails

**Symptoms**: Authentication errors when installing plugins from private repositories

**Solutions**:

For manual installation and updates:

* Verify you're authenticated with your git provider (for example, run `gh auth status` for GitHub)
* Check that your credential helper is configured: `git config --global credential.helper`
