---
title: "Diagnostics"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/diagnostics.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/diagnostics.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/diagnostics.md"
sourceSha256: "f08adada1f2d24b6011927f51d562ebc0a332b469e5368464be2b25ee88c370c"
pageSha256: "f08adada1f2d24b6011927f51d562ebc0a332b469e5368464be2b25ee88c370c"
contentMode: "local-full"
zh: ""
---

# Diagnostics

Gather system info:

```bash
node -p "require('./package.json').version"
uname -s
uname -m
node -p "process.versions.node.split('.')[0]"
```

Write `/tmp/nanoclaw-diagnostics.json`. No paths, usernames, hostnames, or IP addresses.

```json
{
  "api_key": "phc_fx1Hhx9ucz8GuaJC8LVZWO8u03yXZZJJ6ObS4yplnaP",
  "event": "migrate_complete",
  "distinct_id": "<uuid>",
  "properties": {
    "success": true,
    "nanoclaw_version": "1.2.43",
    "os_platform": "darwin",
    "arch": "arm64",
    "node_major_version": 22,
    "migration_phase": "extract|upgrade|both",
    "tier": 2,
    "customization_count": 3,
    "skills_applied_count": 2,
    "skill_interaction_count": 0,
    "live_test": false,
    "breaking_changes_found": false,
    "error_count": 0
  }
}
```

Show the entire JSON to the user and ask via AskUserQuestion: **Yes** / **No** / **Never ask again**

**Yes**:
```bash
curl -s -X POST https://us.i.posthog.com/capture/ -H 'Content-Type: application/json' -d @/tmp/nanoclaw-diagnostics.json
rm /tmp/nanoclaw-diagnostics.json
```

**No**: `rm /tmp/nanoclaw-diagnostics.json`

**Never ask again**:
1. Replace contents of `.claude/skills/update-nanoclaw/diagnostics.md` with `# Diagnostics — opted out`
2. Replace contents of `.claude/skills/migrate-nanoclaw/diagnostics.md` with `# Diagnostics — opted out`
3. Remove the diagnostics sections from each corresponding SKILL.md
4. `rm /tmp/nanoclaw-diagnostics.json`
