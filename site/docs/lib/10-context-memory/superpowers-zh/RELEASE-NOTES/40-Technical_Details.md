---
title: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/RELEASE-NOTES.md"
sourceRel: "RELEASE-NOTES.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/RELEASE-NOTES.md"
sourceSha256: "f7ce0934f1a3133903b4d4b2d98eb816f9f841cd224aec8c1ff101aecf21eea2"
pageSha256: "805e22c56b3d3d1fa7e3df293ca33cf4bdfea9236298f1beac87164651df6ec6"
contentMode: "local-full"
zh: ""
---

## Technical Details

### File Changes

**Added:**
- `lib/initialize-skills.sh` - Skills repo initialization and auto-update
- `docs/TESTING-CHECKLIST.md` - Manual testing scenarios
- `.claude-plugin/marketplace.json` - Local testing config

**Removed:**
- `skills/` directory (82 files) - Now in obra/superpowers-skills
- `scripts/` directory - Now in obra/superpowers-skills/skills/using-skills/
- `hooks/setup-personal-superpowers.sh` - Obsolete

**Modified:**
- `hooks/session-start.sh` - Use skills from ~/.config/superpowers/skills
- `commands/brainstorm.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
- `commands/write-plan.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
- `commands/execute-plan.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
- `README.md` - Complete rewrite for new architecture

### Commit History

This release includes:
- 20+ commits for skills repository separation
- PR #1: Amplifier-inspired problem-solving and research skills
- PR #2: Personal superpowers overlay system (later replaced)
- Multiple skill refinements and documentation improvements
