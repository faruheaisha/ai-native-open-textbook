---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "ebacc211d8641b601c8211b636eece377e94a9533a868f68a2480f7153f72d6b"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### Command Not Found

**Problem:** `claude: command not found`

**Solutions:**
- Install Claude Code: `npm install -g @anthropic-ai/claude-code`
- Check PATH includes npm global bin directory
- Try running with full path: `npx claude`

### API Key Issues

**Problem:** Authentication failed

**Solutions:**
- Set API key: `export ANTHROPIC_API_KEY=your-key`
- Check key is valid and has sufficient credits
- Verify key permissions for the model requested

### Session Not Found

**Problem:** Cannot resume session

**Solutions:**
- List available sessions to find correct name/ID
- Sessions may expire after period of inactivity
- Use `-c` to continue most recent session

### Output Format Issues

**Problem:** JSON output is malformed

**Solutions:**
- Use `--json-schema` to enforce structure
- Add explicit JSON instructions in prompt
- Use `--output-format json` (not just asking for JSON in prompt)

### Permission Denied

**Problem:** Tool execution blocked

**Solutions:**
- Check `--permission-mode` setting
- Review `--allowedTools` and `--disallowedTools` flags
- Use `--dangerously-skip-permissions` for automation (with caution)
