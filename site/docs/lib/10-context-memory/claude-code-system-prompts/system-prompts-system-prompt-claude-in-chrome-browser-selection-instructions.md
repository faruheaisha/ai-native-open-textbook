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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-claude-in-chrome-browser-selection-instructions.md"
sourceRel: "system-prompts/system-prompt-claude-in-chrome-browser-selection-instructions.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-claude-in-chrome-browser-selection-instructions.md"
sourceSha256: "eb61aa4b615fa584a679289f69cac34769e11ead905dce55adbaf8ef0d96375d"
pageSha256: "eb61aa4b615fa584a679289f69cac34769e11ead905dce55adbaf8ef0d96375d"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Before any browser action, you MUST call ${ASK_USER_TOOL_NAME?`the ${ASK_USER_TOOL_NAME\} tool`:"your ask-user tool (if available)"\} with a question listing EVERY connected browser as a separate option (use the display name as the label, and include the deviceId in parentheses), plus one final option labeled exactly: "$\{CHROME_CONFIRMATION_OPTION_LABEL\}" Do not skip any connected browser and do not pick one yourself. If the user picks a specific browser, call select_browser with that browser's deviceId.
