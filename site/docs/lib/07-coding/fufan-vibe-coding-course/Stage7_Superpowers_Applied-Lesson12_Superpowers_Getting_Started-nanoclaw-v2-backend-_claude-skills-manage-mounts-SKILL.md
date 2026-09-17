---
title: "Manage Mounts"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/manage-mounts/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/manage-mounts/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/manage-mounts/SKILL.md"
sourceSha256: "73318b45347065b02bf0deca8433aae7ce15bfb4ee547380a4e7c3858c9d1966"
pageSha256: "73318b45347065b02bf0deca8433aae7ce15bfb4ee547380a4e7c3858c9d1966"
contentMode: "local-full"
zh: ""
---

# Manage Mounts

Configure which host directories NanoClaw agent containers can access. The mount allowlist lives at `~/.config/nanoclaw/mount-allowlist.json`.

## Show Current Config

```bash
cat ~/.config/nanoclaw/mount-allowlist.json 2>/dev/null || echo "No mount allowlist configured"
```

Show the current config to the user in a readable format: which directories are allowed, whether non-main agents are read-only.

## Add Directories

Ask which directories the user wants agents to access. For each path:
- Validate the path exists
- Ask if it should be read-only for non-main agents (default: yes)

Build the JSON config and write it:

```bash
npx tsx setup/index.ts --step mounts --force -- --json '{"allowedRoots":[{"path":"/path/to/dir","readOnly":false}],"blockedPatterns":[],"nonMainReadOnly":true}'
```

Use `--force` to overwrite the existing config.

## Remove Directories

Read the current config, show it, ask which entry to remove, write the updated config.

## Reset to Empty

```bash
npx tsx setup/index.ts --step mounts --force -- --empty
```

## After Changes

Restart the service so containers pick up the new config:

- macOS: `launchctl kickstart -k gui/$(id -u)/com.nanoclaw`
- Linux: `systemctl --user restart nanoclaw`
