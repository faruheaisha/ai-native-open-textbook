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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/diagnostics.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/diagnostics.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/diagnostics.md"
sourceSha256: "5d5a48bf4e3caa9fc7fe480bc7503a888c14da0d5e683e7813a662cece928cd4"
pageSha256: "5d5a48bf4e3caa9fc7fe480bc7503a888c14da0d5e683e7813a662cece928cd4"
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
git log -1 --format=%ci HEAD@{1} 2>/dev/null || echo "unknown"
```

Write `/tmp/nanoclaw-diagnostics.json`. No paths, usernames, hostnames, or IP addresses.

```json
{
  "api_key": "phc_fx1Hhx9ucz8GuaJC8LVZWO8u03yXZZJJ6ObS4yplnaP",
  "event": "update_complete",
  "distinct_id": "<uuid>",
  "properties": {
    "success": true,
    "nanoclaw_version": "1.2.21",
    "os_platform": "darwin",
    "arch": "arm64",
    "node_major_version": 22,
    "version_age_days": 45,
    "update_method": "merge",
    "conflict_count": 0,
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
2. Remove the `## Diagnostics` section from `.claude/skills/update-nanoclaw/SKILL.md`
3. `rm /tmp/nanoclaw-diagnostics.json`
