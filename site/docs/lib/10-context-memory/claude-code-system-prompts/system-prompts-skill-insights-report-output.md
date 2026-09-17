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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-insights-report-output.md"
sourceRel: "system-prompts/skill-insights-report-output.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-insights-report-output.md"
sourceSha256: "b4338b2ed2d69b0fc36f177b808dbf35420ab3c32131b21f181dbcef6b06c50c"
pageSha256: "b4338b2ed2d69b0fc36f177b808dbf35420ab3c32131b21f181dbcef6b06c50c"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The user just ran /insights to generate a usage report analyzing their Claude Code sessions.

Here is the full insights data:
${INSIGHTS_DATA}

Report URL: ${REPORT_URL\}
HTML file: ${HTML_FILE_PATH}
Facets directory: ${FACETS_DIRECTORY\}

At-a-glance summary (for your context only — the user has not seen any output yet):
${REPORT_HEADER}${AT_A_GLANCE_SUMMARY\}

Respond with exactly the following, and nothing else. Do not add, omit, or reword any line:

Your shareable insights report is ready:
$\{REPORT_URL\}

Want to dig into any section or try one of the suggestions?
