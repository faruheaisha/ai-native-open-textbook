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
pageSha256: "7f89b5b9b7573bc1f01b237c2eed2d74f66f204831bc7dd6faefa3a6477d131b"
contentMode: "local-full"
zh: ""
---

## Debugging and development tools

### Debugging commands

Use `claude --debug` to see plugin loading details:

This shows:

* Which plugins are being loaded
* Any errors in plugin manifests
* Skill, agent, and hook registration
* MCP server initialization

### Common issues

| Issue                               | Cause                           | Solution                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :---------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin not loading                  | Invalid `plugin.json`           | Run `claude plugin validate ./my-plugin` or `/plugin validate ./my-plugin`, where `./my-plugin` is your plugin directory, to check `plugin.json`, `hooks/hooks.json`, and the frontmatter of the skills, agents, and commands in the plugin's default directories for syntax and schema errors. See [Validate a plugin or a directory without a manifest](https://code.claude.com/docs/en/plugin-marketplaces#validate-a-plugin-or-a-directory-without-a-manifest) for what a run covers |
| Skills not appearing                | Wrong directory structure       | Ensure `skills/` or `commands/` is at the plugin root, not inside `.claude-plugin/`                                                                                                                                                                                                                                                                                                                                                                          |
| Hooks not firing                    | Script not executable           | Run `chmod +x script.sh`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| MCP server fails                    | Missing `${CLAUDE_PLUGIN_ROOT}` | Use variable for all plugin paths                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Path errors                         | Absolute paths used             | Make paths relative, starting with `./`; see [Path behavior rules](#path-behavior-rules), which cover the `skills` field's `"."` exception                                                                                                                                                                                                                                                                                                                   |
| LSP `Executable not found in $PATH` | Language server not installed   | Install the binary (e.g., `npm install -g typescript-language-server typescript`)                                                                                                                                                                                                                                                                                                                                                                            |

### Example error messages

**Manifest validation errors**:

* `Invalid JSON syntax: Unexpected token \} in JSON at position 142`: check for missing commas, extra commas, or unquoted strings
* `Plugin <name> has an invalid manifest file at .claude-plugin/plugin.json. Validation errors: name: Invalid input: expected string, received undefined`: a required field is missing
* `Plugin <name> has a corrupt manifest file at .claude-plugin/plugin.json. JSON parse error: ...`: JSON syntax error. Before v2.1.246, Claude Code also produced this error for a `plugin.json` saved as UTF-8 with a leading byte-order mark (BOM), even when the JSON was otherwise valid.

**Plugin loading errors**:

* `Warning: No commands found in plugin my-plugin custom directory: ./cmds. Expected .md files or SKILL.md in subdirectories.`: command path exists but contains no valid command files
* `Plugin directory not found at path: ./plugins/my-plugin. Check that the marketplace entry has the correct path.`: the `source` path in marketplace.json points to a non-existent directory
* `Plugin my-plugin has conflicting manifests: both plugin.json and marketplace entry specify components.`: remove duplicate component definitions or remove `strict: false` in marketplace entry

### Hook troubleshooting

**Hook script not executing**:

1. Check the script is executable: `chmod +x ./scripts/your-script.sh`
2. Verify the shebang line: First line should be `#!/bin/bash` or `#!/usr/bin/env bash`
3. Check the path uses `${CLAUDE_PLUGIN_ROOT}`: `"command": "\"${CLAUDE_PLUGIN_ROOT\}\"/scripts/your-script.sh"`
4. Test the script manually: `./scripts/your-script.sh`

**Hook not triggering on expected events**:

1. Verify the event name is correct (case-sensitive): `PostToolUse`, not `postToolUse`
2. Check the matcher pattern matches your tools: `"matcher": "Write|Edit"` for file operations
3. Confirm the hook type is valid: `command`, `http`, `mcp_tool`, `prompt`, or `agent`

### MCP server troubleshooting

**Server not starting**:

1. Check the command exists and is executable
2. Verify all paths use `$\{CLAUDE_PLUGIN_ROOT\}` variable
3. Check the MCP server logs: `claude --debug` shows initialization errors
4. Test the server manually outside of Claude Code

**Server tools not appearing**:

1. Ensure the server is properly configured in `.mcp.json` or `plugin.json`
2. Verify the server implements the MCP protocol correctly
3. Check for connection timeouts in debug output

### Directory structure mistakes

**Symptoms**: Plugin loads but components (skills, agents, hooks) are missing.

**Correct structure**: Components must be at the plugin root, not inside `.claude-plugin/`. Only `plugin.json` belongs in `.claude-plugin/`.

**Debug checklist**:

1. Run `claude --debug` and look for "loading plugin" messages
2. Check that each component directory is listed in the debug output
3. Verify file permissions allow reading the plugin files

***
