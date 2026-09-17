---
title: "Slack Message Formatting (mrkdwn)"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/skills/slack-formatting/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/skills/slack-formatting/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/skills/slack-formatting/SKILL.md"
sourceSha256: "dd8eeb7880157772bac217c2add58a4a0450469ab977d1bb785899e2dd8c4d2e"
pageSha256: "dd8eeb7880157772bac217c2add58a4a0450469ab977d1bb785899e2dd8c4d2e"
contentMode: "local-full"
zh: ""
---

# Slack Message Formatting (mrkdwn)

When responding to Slack channels, use Slack's mrkdwn syntax instead of standard Markdown.

## How to detect Slack context

Check your group folder name or workspace path:
- Folder starts with `slack_` (e.g., `slack_engineering`, `slack_general`)
- Or check `/workspace/group/` path for `slack_` prefix

## Formatting reference

### Text styles

| Style | Syntax | Example |
|-------|--------|---------|
| Bold | `*text*` | *bold text* |
| Italic | `_text_` | _italic text_ |
| Strikethrough | `~text~` | ~strikethrough~ |
| Code (inline) | `` `code` `` | `inline code` |
| Code block | ` ```code``` ` | Multi-line code |

### Links and mentions

```
<https://example.com|Link text>     # Named link
<https://example.com>                # Auto-linked URL
<@U1234567890>                       # Mention user by ID
<#C1234567890>                       # Mention channel by ID
<!here>                              # @here
<!channel>                           # @channel
```

### Lists

Slack supports simple bullet lists but NOT numbered lists:

```
• First item
• Second item
• Third item
```

Use `•` (bullet character) or `- ` or `* ` for bullets.

### Block quotes

```
> This is a block quote
> It can span multiple lines
```

### Emoji

Use standard emoji shortcodes: `:white_check_mark:`, `:x:`, `:rocket:`, `:tada:`

## What NOT to use

- **NO** `##` headings (use `*Bold text*` for headers instead)
- **NO** `**double asterisks**` for bold (use `*single asterisks*`)
- **NO** `[text](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/skills/slack-formatting/url/README.md)` links (use `<url|text>` instead)
- **NO** `1.` numbered lists (use bullets with numbers: `• 1. First`)
- **NO** tables (use code blocks or plain text alignment)
- **NO** `---` horizontal rules

## Example message

```
*Daily Standup Summary*

_March 21, 2026_

• *Completed:* Fixed authentication bug in login flow
• *In Progress:* Building new dashboard widgets
• *Blocked:* Waiting on API access from DevOps

> Next sync: Monday 10am

:white_check_mark: All tests passing | <https://ci.example.com/builds/123|View Build>
```

## Quick rules

1. Use `*bold*` not `**bold**`
2. Use `<url|text>` not `[text](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/skills/slack-formatting/url/README.md)`
3. Use `•` bullets, avoid numbered lists
4. Use `:emoji:` shortcodes
5. Quote blocks with `>`
6. Skip headings — use bold text instead
