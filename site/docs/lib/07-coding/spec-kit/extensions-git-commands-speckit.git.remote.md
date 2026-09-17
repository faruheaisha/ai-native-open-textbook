---
title: "Detect Git Remote URL"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/git/commands/speckit.git.remote.md"
sourceRel: "extensions/git/commands/speckit.git.remote.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/git/commands/speckit.git.remote.md"
sourceSha256: "00397aff45bf00d3111b4f162e4220fd5a9020e72e4afe9179859c21bcd8aac3"
pageSha256: "00397aff45bf00d3111b4f162e4220fd5a9020e72e4afe9179859c21bcd8aac3"
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
