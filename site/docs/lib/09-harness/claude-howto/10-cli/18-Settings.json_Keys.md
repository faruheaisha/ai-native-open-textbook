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
pageSha256: "ed566c786a7658a7c2330ff7be4fad87edb1f6bce2a73e40c2f61bbb261386c4"
contentMode: "local-full"
zh: ""
---

## Settings.json Keys

These keys live in a `settings.json` file (`~/.claude/settings.json` for user scope, `.claude/settings.json` for project scope) rather than being passed as flags or env vars. The table below covers a few recently added UI/UX keys; for the managed `enforceAvailableModels` key, see [Advanced Features → Managed Settings](/lib/09-harness/claude-howto/09-advanced-features/index#available-managed-settings).

| Key | Description |
|-----|-------------|
| `respondToBashCommands` | (v2.1.186) Auto-respond to the output of `!` bash commands. Default `true`. Set `false` for context-only (pre-v2.1.186) behavior. See [Advanced Features → Bash Mode](/lib/09-harness/claude-howto/09-advanced-features/index#bash-mode). |
| `wheelScrollAccelerationEnabled` | (v2.1.174) Set to `false` to disable mouse-wheel scroll acceleration in the fullscreen renderer. Useful when fast wheel flicks overshoot. |
| `footerLinksRegexes` | (v2.1.176) Array of regexes that render matched links as badges in the footer row. Configurable in user or managed settings. |
| `language` | Sets Claude's preferred response language and voice-dictation language (e.g. `"french"`, `"japanese"`). As of **v2.1.176** it also pins the language used for auto-generated session titles. |
| `sandbox.filesystem.disabled` | (v2.1.216) Skips filesystem sandboxing while keeping network egress control enforced. For workflows where file sandboxing breaks tooling but network policy must stay enforced. |
| `emojiCompletionEnabled` | (v2.1.217) Enables emoji shortcode autocomplete in the prompt input (e.g. typing `:heart:` inserts ❤️). Set `false` to disable. |
| `workflowSizeGuideline` | (v2.1.219) Sets the advisory Dynamic workflow size guideline from any settings file. The guideline is guidance Claude aims for, not a hard cap — the default is medium (aim for fewer than 15 agents), and other sizes or unrestricted can be selected. While this key is set, the "Dynamic workflow size" row is hidden in `/config`. Distinct from `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, which is an enforced concurrency limit. |
| `spellcheck` | (v2.1.235) Underlines misspelled words in the prompt input using whichever of `aspell`, `hunspell`, or `ispell` is on your `PATH`, tried in that order. Object-valued — `\{"enabled": true, "language": "en_GB"\}` — and off by default. **Read from user settings, the `--settings` flag, and managed settings only**: a `spellcheck` block in a project `.claude/settings.json` or `.claude/settings.local.json` is ignored. See also [Advanced Features → Additional Per-User Settings](/lib/09-harness/claude-howto/09-advanced-features/index#additional-per-user-settings). |
| `modelPicker` | (v2.1.243) Choose which models the `/model` picker lists, in your own order and with your own labels. One of the few settings that **replaces rather than merges** across settings layers. |
| `promptCacheTtl` | (v2.1.243) Choose the prompt cache lifetime for the main conversation. |
| `subagentPromptCacheTtl` | (v2.1.243) The same choice for subagents and other requests outside the main conversation. |
| `modelPricing` | (v2.1.243) **Managed setting.** Supplies your organization's contracted rates so `/cost`, the status line, and telemetry report those instead of list price. |
| `keybindingFlavor` | **Deprecated since v2.1.261 and has no effect.** The prompt's word-editing keys always follow readline conventions, as Bash does: `Ctrl+W` deletes back to whitespace, `Alt+F` and `Alt+D` stop at word end, and punctuation separates words. Claude Code still accepts the key, so a settings file that sets it stays valid. (In v2.1.238–v2.1.260 it chose between `"classic"` and `"readline"`.) |
| `bashOutputMaxChars` | (v2.1.261) How many characters of a **successful** Bash or PowerShell command's output Claude receives inline, up to 128K. Past the limit Claude Code saves the output to a file and Claude gets a short preview plus the path. Setting it makes Claude Code ignore `BASH_MAX_OUTPUT_LENGTH`. |
| `taskOutputMaxChars` | (v2.1.261) How many characters of a **background task's** output Claude receives inline when reading it with the `TaskOutput` tool, up to 128K. For a longer finished task Claude receives the most recent characters. Setting it makes Claude Code ignore `TASK_MAX_OUTPUT_LENGTH`. |

```json
{
  "wheelScrollAccelerationEnabled": false,
  "language": "french",
  "footerLinksRegexes": ["https://jira\\.example\\.com/.*"]
}
```
