---
title: "Git Provider Commands Reference"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/qodo-pr-resolver/resources/providers.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/qodo-pr-resolver/resources/providers.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/qodo-pr-resolver/resources/providers.md"
sourceSha256: "acb72e7135100bd7143c65247ffaeb8f78a848e20199ed7e322894d77e32d7cf"
pageSha256: "acb72e7135100bd7143c65247ffaeb8f78a848e20199ed7e322894d77e32d7cf"
contentMode: "local-full"
zh: ""
---

# Git Provider Commands Reference

This document contains all provider-specific CLI commands and API interactions for the Qodo PR Resolver skill. Reference this file when implementing provider-specific operations.

## Supported Providers

- GitHub (via `gh` CLI)
- GitLab (via `glab` CLI)
- Bitbucket (via `bb` CLI)
- Azure DevOps (via `az` CLI with DevOps extension)

## Provider Detection

Detect the git provider from the remote URL:

```bash
git remote get-url origin
```

Match against:
- `github.com` → GitHub
- `gitlab.com` → GitLab
- `bitbucket.org` → Bitbucket
- `dev.azure.com` → Azure DevOps

## Prerequisites by Provider

### GitHub

**CLI:** `gh`
- **Install:** `brew install gh` or [cli.github.com](https://cli.github.com/)
- **Authenticate:** `gh auth login`
- **Verify:**
  ```bash
  gh --version && gh auth status
  ```

### GitLab

**CLI:** `glab`
- **Install:** `brew install glab` or [glab.readthedocs.io](https://glab.readthedocs.io/)
- **Authenticate:** `glab auth login`
- **Verify:**
  ```bash
  glab --version && glab auth status
  ```

### Bitbucket

**CLI:** `bb` or API access
- **Install:** See [bitbucket.org/product/cli](https://bitbucket.org/product/cli)
- **Verify:**
  ```bash
  bb --version
  ```

### Azure DevOps

**CLI:** `az` with DevOps extension
- **Install:** `brew install azure-cli` or [docs.microsoft.com/cli/azure](https://docs.microsoft.com/cli/azure)
- **Install extension:** `az extension add --name azure-devops`
- **Authenticate:** `az login` then `az devops configure --defaults organization=https://dev.azure.com/yourorg project=yourproject`
- **Verify:**
  ```bash
  az --version && az devops
  ```

## Find Open PR/MR

Get the PR/MR number for the current branch:

### GitHub

```bash
