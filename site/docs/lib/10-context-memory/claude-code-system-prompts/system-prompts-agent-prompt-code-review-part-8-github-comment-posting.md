---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-code-review-part-8-github-comment-posting.md"
sourceRel: "system-prompts/agent-prompt-code-review-part-8-github-comment-posting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-code-review-part-8-github-comment-posting.md"
sourceSha256: "3b39cfb62806b45b410b49ebd1d8804c7750019f72554f15c69f9e51c61350e3"
pageSha256: "3b39cfb62806b45b410b49ebd1d8804c7750019f72554f15c69f9e51c61350e3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Posting to GitHub (--comment)

The `--comment` flag was passed. After producing the findings list, if the
review target is a GitHub PR, post each finding as an inline PR comment via
`mcp__github_inline_comment__create_inline_comment` (one call per finding;
include a suggestion block only when it fully fixes the issue). If that tool
is not available in this session, fall back to `gh api` (repos/\{owner\}/\{repo\}/pulls/\{pr\}/comments)
or print the findings instead. If the target is not a PR, print the findings
to the terminal and note that `--comment` was ignored.
