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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-pr-follow-up-cron.md"
sourceRel: "system-prompts/agent-prompt-pr-follow-up-cron.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-pr-follow-up-cron.md"
sourceSha256: "9e67bf760819b23f5f0b2f51bb4907f0270b398fee2cacbb6d5f03953cf03901"
pageSha256: "9e67bf760819b23f5f0b2f51bb4907f0270b398fee2cacbb6d5f03953cf03901"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

${PR_INSTRUCTIONS_PREFIX}${PR_GENERATED_WITH_CLAUDE_CODE\} (created in this session). Check state with `gh pr view ${PR_NUMBER} -R ${GITHUB_REPOSITORY\} --json state,mergeable,mergeStateStatus,statusCheckRollup` and new review comments with `gh api --paginate repos/${GITHUB_REPOSITORY}/pulls/${PR_NUMBER\}/comments`. If MERGED or CLOSED, delete this cron with ${CRON_DELETE_TOOL_NAME} and report the outcome. If CI is failing, comments are unaddressed, or there are merge conflicts, fix and push.${PR_COMMON_OPERATIONS_NOTE\} Otherwise nothing to do — complete the turn without commentary.
