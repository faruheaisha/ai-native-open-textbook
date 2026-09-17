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
pageSha256: "6dfe64c9ddf093ea1e85c23aa7641c89879c2b5be3e360f3a5c7cad39b7bd313"
contentMode: "local-full"
zh: ""
---

## Emoji shortcodes

Type a `:` followed by an emoji shortcode in the prompt input to insert the emoji. Requires Claude Code v2.1.217 or later.

* Type a complete shortcode such as `:heart:` and Claude Code replaces it with ❤️ as soon as you type the closing `:`
* Type `:` plus at least two characters of a name, such as `:hea`, to open a suggestion popup, then press `Tab` or `Enter` to insert the highlighted emoji

The shortcode must start the input or follow a space, so a `:` inside a word or URL doesn't open suggestions.

To turn the feature off, set [`emojiCompletionEnabled`](https://code.claude.com/docs/en/settings-reference#emojicompletionenabled) to `false` in `settings.json`. This disables both the suggestion popup and the inline replacement.
