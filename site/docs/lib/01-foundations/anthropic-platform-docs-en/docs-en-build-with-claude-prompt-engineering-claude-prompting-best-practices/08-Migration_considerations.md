---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "3ca5ca2425dec6160905d6054dff18ac323e3972a9c99c13a8c9b424fa0a7895"
contentMode: "local-full"
zh: ""
---

## Migration considerations

When migrating to current Claude models from earlier generations:

1. **Be specific about desired behavior:** Consider describing exactly what you'd like to see in the output.

2. **Frame your instructions with modifiers:** Adding modifiers that encourage Claude to increase the quality and detail of its output can help better shape Claude's performance. For example, instead of "Create an analytics dashboard", use "Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation."

3. **Request specific features explicitly:** Animations and interactive elements should be requested explicitly when desired.

4. **Update thinking configuration:** Claude 4.6 models use [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) (`thinking: \{type: "adaptive"\}`) instead of manual thinking with `budget_tokens`. Use the [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort) to control thinking depth.

5. **Migrate away from prefilled responses:** Prefilled responses on the last assistant turn are no longer supported starting with Claude 4.6 models and Claude Mythos Preview. See [Migrating away from prefilled responses](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#migrating-away-from-prefilled-responses) for detailed guidance on alternatives.

6. **Tune anti-laziness prompting:** If your prompts previously encouraged the model to be more thorough or use tools more aggressively, dial back that guidance. Claude 4.6 models are more proactive and may overtrigger on instructions that were needed for previous models.

7. **Pass thinking blocks back unchanged and keep history append-only:** Append each assistant turn exactly as the API returned it, thinking blocks included. On Claude Fable 5.1, [modifying the conversation before a thinking block](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-in-conversation) results in an error, or in the block being dropped if you opt into that: editing earlier messages, rebuilding `system` or `tools`, or summarizing older turns in place between requests invalidates every later thinking block, so move those changes to mid-conversation system messages and server-side context management. See [Keep the conversation history append-only](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#keep-the-conversation-history-append-only).

For detailed migration steps, see the [Migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide).

### Migrating to Claude Sonnet 5 from Claude Sonnet 4.5 or earlier

See [Migrating to Claude Sonnet 5 from Claude Sonnet 4.5 or earlier](https://platform.claude.com/docs/en/models/sonnet-5/migration-guide#migrating-from-sonnet-45) in the migration guide, which covers the effort default change and the removal of manual extended thinking (`budget_tokens`).
