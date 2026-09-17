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
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "17c9c2824c6f79c6f16135f111f2331432c6c168b1848dea3bcab29ec4e6dcc2"
contentMode: "local-full"
zh: ""
---

## Prompt suggestions

When you first open a session, Claude Code shows a grayed-out example command in the prompt input to help you get started. It picks this from your project's git history, so the example reflects files you've been working on recently.

After Claude responds, Claude Code can suggest your next prompt based on your conversation history, such as a follow-up step from a multi-part request or a natural continuation of your workflow.

* Press `Tab` or `Right arrow` to place the suggestion in the prompt input, then `Enter` to submit
* Start typing to dismiss it

Claude Code generates each of these next-prompt suggestions with a background request that reuses the conversation's prompt cache, so the additional cost is minimal.

### When Claude Code skips suggestions

In interactive mode, Claude Code leaves prompt suggestions off by default and hides the **Prompt suggestions** toggle in `/config` in a [session that doesn't fetch feature flags](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching), such as one on a third-party provider or through a Claude apps gateway, and in a [first session after an install or upgrade](https://code.claude.com/docs/en/env-vars#first-session-after-an-install-or-upgrade) whose flags haven't arrived yet.

Claude Code also skips individual suggestions in several situations, including:

* The prompt cache is cold, to avoid unnecessary cost
* After the first turn of a conversation, in some sessions
* The previous response ended in an error
* While you're in plan mode
* Your account is close to or at its usage limit. To keep suggestions on until you reach the limit, set [`CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION`](https://code.claude.com/docs/en/env-vars) to `true`. Before v2.1.238, Claude Code skipped them near the limit even with the variable set to `true`
* In an [agent team](https://code.claude.com/docs/en/agent-teams), in teammates' sessions by default. The lead's session shows suggestions

In print mode, Claude Code doesn't generate suggestions by default. Pass [`--prompt-suggestions`](https://code.claude.com/docs/en/cli-reference#cli-flags) with `-p "<prompt>" --output-format stream-json --verbose` to have Claude Code emit a `prompt_suggestion` message after each turn that generates one. The generator skips very short conversations and cold prompt caches here too, so a single short `-p` query can emit none.

### Turn prompt suggestions off

To disable prompt suggestions entirely, use any of the following:

* Turn off **Prompt suggestions** in `/config`
* Set [`promptSuggestionEnabled`](https://code.claude.com/docs/en/settings-reference#promptsuggestionenabled) to `false` in your settings file
* Set the [`CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION`](https://code.claude.com/docs/en/env-vars) environment variable to `false`, which takes precedence over the setting:
  ```bash theme={null}
  export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
  ```

To turn prompt suggestions off across an organization, set `promptSuggestionEnabled` to `false` in [managed settings](https://code.claude.com/docs/en/managed-settings). Also set `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` to `false` under the managed [`env`](https://code.claude.com/docs/en/settings-reference#env) key so that users can't re-enable them with their own environment variable.
