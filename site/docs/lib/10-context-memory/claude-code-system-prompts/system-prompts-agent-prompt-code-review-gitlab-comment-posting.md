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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-code-review-gitlab-comment-posting.md"
sourceRel: "system-prompts/agent-prompt-code-review-gitlab-comment-posting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-code-review-gitlab-comment-posting.md"
sourceSha256: "bcd0905e09f3220bc093ef34ec83c85b83ac4fbd07b0c12b863afcd2f4b653f5"
pageSha256: "bcd0905e09f3220bc093ef34ec83c85b83ac4fbd07b0c12b863afcd2f4b653f5"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Posting to GitLab (--comment)

The `--comment` flag was passed. After producing the findings list, if the
review target is a GitLab merge request, post the findings as one general MR
note via `${`glab mr note${GITLAB_MR_IID?` ${GITLAB_MR_IID}`:""}${GLAB_MR_NOTE_OPTIONS\} -m "&lt;body>"`\}`$\{GITLAB_REPOSITORY_REFERENCE?"":" from inside that project's checkout"\}
(every finding with its file:line, the issue, and the suggested fix). glab has no single verb for line-anchored
comments; those require `glab api projects/:id/merge_requests/:iid/discussions`,
so post the general note unless the user asks for inline threads. If glab is
not available in this session, print the findings instead. If the target is
not an MR, print the findings to the terminal and note that `--comment` was
ignored.
