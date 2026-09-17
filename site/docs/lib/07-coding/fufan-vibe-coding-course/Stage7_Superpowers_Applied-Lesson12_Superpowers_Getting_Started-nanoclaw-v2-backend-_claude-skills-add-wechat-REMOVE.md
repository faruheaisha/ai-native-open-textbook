---
title: "Remove WeChat Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-wechat/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-wechat/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-wechat/REMOVE.md"
sourceSha256: "900518e43ceb7ddf89ced3cf5d1702b9b9d3fee6edd4529ec247773abe008595"
pageSha256: "900518e43ceb7ddf89ced3cf5d1702b9b9d3fee6edd4529ec247773abe008595"
contentMode: "local-full"
zh: ""
---

# Remove WeChat Channel

Undo `/add-wechat`.

### 1. Remove credentials

Delete WeChat lines from `.env`:

```bash
sed -i.bak '/^WECHAT_ENABLED=/d' .env && rm -f .env.bak
cp .env data/env/env
```

### 2. Remove adapter and import

```bash
rm -f src/channels/wechat.ts
sed -i.bak "/import '\.\/wechat\.js';/d" src/channels/index.ts && rm -f src/channels/index.ts.bak
```

### 3. Uninstall the package

```bash
pnpm remove wechat-ilink-client
```

### 4. Remove saved auth + sync state

```bash
rm -rf data/wechat
```

### 5. Remove DB wiring

```sql
-- Remove any sessions first (foreign key)
DELETE FROM sessions WHERE messaging_group_id IN (SELECT id FROM messaging_groups WHERE channel_type = 'wechat');
DELETE FROM messaging_group_agents WHERE messaging_group_id IN (SELECT id FROM messaging_groups WHERE channel_type = 'wechat');
DELETE FROM messaging_groups WHERE channel_type = 'wechat';
```

### 6. Rebuild and restart

```bash
pnpm run build
systemctl --user restart nanoclaw   # Linux
# or
launchctl kickstart -k gui/$(id -u)/com.nanoclaw   # macOS
```
