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
sourceRel: "en/context-window.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/context-window.md"
sourceSha256: "aed34268947d9ad8e5eaee057f7428eeb913b72da1a8e34ab105fd5558424a06"
pageSha256: "e8e9a1af3ba01dfc0ab9a27698dd09ff5fd52c541648c3db2a7bdf9d2ead8526"
contentMode: "local-full"
zh: ""
---

## What survives compaction

When a long session compacts, Claude Code summarizes the conversation history to fit the context window. As of v2.1.198, the summarization request inherits your session's [extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) configuration, so it reasons with thinking enabled when your session has it enabled and stays off otherwise. Thinking affects only how the summary is produced; your session settings are unchanged afterward. What happens to each kind of content depends on how it was loaded:

| Mechanism                                                                                                | After compaction                                                                            |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| System prompt and output style                                                                           | Both still apply                                                                            |
| Project-root CLAUDE.md and unscoped rules                                                                | Re-injected from disk                                                                       |
| Auto memory                                                                                              | Re-injected from disk                                                                       |
| The plan Claude wrote in [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode)        | Re-injected from disk                                                                       |
| Rules with `paths:` frontmatter                                                                          | Claude Code reloads them as Claude reads files they match                                   |
| Nested CLAUDE.md in subdirectories                                                                       | Claude Code reloads them as Claude reads files in that subdirectory                         |
| Files Claude read or edited                                                                              | Claude Code re-reads up to five, most recently modified first                               |
| Invoked skill bodies                                                                                     | Re-injected, capped at 5,000 tokens per skill and 25,000 tokens total; oldest dropped first |
| Context that hooks added earlier                                                                         | Summarized with the rest of the conversation                                                |
| [SessionStart hooks](https://code.claude.com/docs/en/hooks-guide#re-inject-context-after-compaction) that match the `compact` source | Claude Code runs them and adds their output to the compacted context                        |

Path-scoped rules and nested CLAUDE.md files load into message history when their trigger file is read, so compaction summarizes them away with everything else. Right after compaction, Claude Code re-reads up to five of the files Claude has read or edited in the session, choosing the ones modified most recently, and reloads the rules and nested CLAUDE.md files that apply to those files. A file over 5,000 tokens comes back as a path reference without its content, shown as `Referenced file` instead of `Read`. Its rules still reload. If a rule must persist across compaction, drop the `paths:` frontmatter or move it to the project-root CLAUDE.md.

Skill bodies are re-injected after compaction, but large skills are truncated to fit the per-skill cap, and the oldest invoked skills are dropped once the total budget is exceeded. Truncation keeps the start of the file, so put the most important instructions near the top of `SKILL.md`.
