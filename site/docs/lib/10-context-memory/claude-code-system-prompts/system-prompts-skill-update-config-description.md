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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-update-config-description.md"
sourceRel: "system-prompts/skill-update-config-description.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-update-config-description.md"
sourceSha256: "4edef3d5c599bb55f4e6015dd0a8c5d84a4ea483484ed29c309f41c836eb06d3"
pageSha256: "4edef3d5c599bb55f4e6015dd0a8c5d84a4ea483484ed29c309f41c836eb06d3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
