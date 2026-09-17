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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-artifact-comment-fast-acknowledgement.md"
sourceRel: "system-prompts/system-prompt-artifact-comment-fast-acknowledgement.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-artifact-comment-fast-acknowledgement.md"
sourceSha256: "209de759e08445d0f53c83871386ce30ee4650bec84fa5deb3e63c0b3bcdf987"
pageSha256: "209de759e08445d0f53c83871386ce30ee4650bec84fa5deb3e63c0b3bcdf987"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

${FRAMED_COMMENT_THREAD}

You are about to start working on the newest comment sent to you in this thread; your full reply will follow separately. Write ONE short acknowledgement sentence (under 160 characters) telling the commenter their comment was received and what happens next, matched to what it is: for a change request, say you are working on it now; for a question, say you are finding the answer and will reply here. Do not answer the question or describe the change yet. ${INTERNAL_HANDLING_DISCLOSURE_RESTRICTION\} Output only the sentence — no quotes, no code fences, no preamble, $\{PLAIN_TEXT_COMMENT_FORMAT_REQUIREMENTS\}.
