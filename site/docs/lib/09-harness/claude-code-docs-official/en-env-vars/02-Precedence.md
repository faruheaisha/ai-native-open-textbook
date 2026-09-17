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
sourceRel: "en/env-vars.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/env-vars.md"
sourceSha256: "9b1792540478648e4ff9cdd48c6e17a321d70a401812c1fc557b74c9080a7b5f"
pageSha256: "461b534ab8f865d502a5a400760925d2ce4ee22daecbae7c407bf6a778d4ef9f"
contentMode: "local-full"
zh: ""
---

## Precedence

Some behaviors have both an environment variable and a dedicated settings key, and which one Claude Code reads first differs per key. For `ANTHROPIC_MODEL` and `CLAUDE_CODE_AUTO_CONNECT_IDE`, Claude Code reads the variable first and uses the `model` or `autoConnectIde` setting only when the variable is unset. For the pair you're setting, check the variable's row below and the key's entry on the [settings reference](https://code.claude.com/docs/en/settings-reference).

When the same variable is set in both your shell and a settings file `env` block, the settings file value applies. Claude Code writes each `env` entry into the process environment, replacing the value inherited from the shell. The [`env` setting](https://code.claude.com/docs/en/settings-reference#when-claude-code-applies-env-values) says when it applies them. A few variables are special-cased; the [`env` setting](https://code.claude.com/docs/en/settings-reference#env) lists the exceptions.

In a settings file you can set a variable but you can't remove one. To override a variable you can't unset, such as a stale `CLAUDE_CODE_USE_VERTEX` exported by a shell profile you don't control, set it to an empty string in the `env` block: `"CLAUDE_CODE_USE_VERTEX": ""`. Claude Code treats the empty value as unset for provider selection. Subprocesses still inherit the empty value.

Between settings files, `env` values follow [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence), so a managed settings entry overrides the same variable in user or project settings.

How an environment variable interacts with CLI flags and in-session commands varies per feature: `--model` and `/model` override `ANTHROPIC_MODEL`, while `CLAUDE_CODE_EFFORT_LEVEL` overrides `--effort` and `/effort`. When a variable interacts with another configuration source, its row in the [Variables](#variables) list states the precedence or links to the page that documents it.

Claude Code reads shell environment variables at startup, so changes to them take effect the next time you launch `claude`. Variables set under the `env` key in settings files are reapplied to a running session when the file changes, with the startup-only exception described in [In settings files](#in-settings-files).
