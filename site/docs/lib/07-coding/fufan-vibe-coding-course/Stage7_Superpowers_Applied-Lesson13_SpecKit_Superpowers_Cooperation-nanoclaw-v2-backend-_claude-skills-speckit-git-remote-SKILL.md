---
title: "Detect Git Remote URL"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/speckit-git-remote/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/speckit-git-remote/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/speckit-git-remote/SKILL.md"
sourceSha256: "045d34977a70cae585b8bc0adbfd378374498f1a6c59c77615923e64f8d1b3f0"
pageSha256: "045d34977a70cae585b8bc0adbfd378374498f1a6c59c77615923e64f8d1b3f0"
contentMode: "local-full"
zh: ""
---

# Detect Git Remote URL

Detect the Git remote URL for integration with GitHub services (e.g., issue creation).

## Prerequisites

- Check if Git is available by running `git rev-parse --is-inside-work-tree 2>/dev/null`
- If Git is not available, output a warning and return empty:
  ```
  [specify] Warning: Git repository not detected; cannot determine remote URL
  ```

## Execution

Run the following command to get the remote URL:

```bash
git config --get remote.origin.url
```

## Output

Parse the remote URL and determine:

1. **Repository owner**: Extract from the URL (e.g., `github` from `https://github.com/github/spec-kit.git`)
2. **Repository name**: Extract from the URL (e.g., `spec-kit` from `https://github.com/github/spec-kit.git`)
3. **Is GitHub**: Whether the remote points to a GitHub repository

Supported URL formats:
- HTTPS: `https://github.com/<owner>/<repo>.git`
- SSH: `git@github.com:<owner>/<repo>.git`

> [!CAUTION]
> ONLY report a GitHub repository if the remote URL actually points to github.com.
> Do NOT assume the remote is GitHub if the URL format doesn't match.

## Graceful Degradation

If Git is not installed, the directory is not a Git repository, or no remote is configured:
- Return an empty result
- Do NOT error — other workflows should continue without Git remote information
