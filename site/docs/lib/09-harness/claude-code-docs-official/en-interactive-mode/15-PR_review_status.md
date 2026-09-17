---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "b1c6e06305bff45f3e136854734798b0474a61417e818234009b9ee0c6a537a3"
contentMode: "local-full"
zh: ""
---

## PR review status

When working on a branch with an open pull request, Claude Code displays a clickable PR link in the footer, such as "PR #446". The link has a colored underline indicating the review state:

* Green: approved
* Yellow: pending review
* Red: changes requested
* Gray: draft

The badge disappears once the pull request merges or closes.

`Cmd+click` (macOS) or `Ctrl+click` (Windows/Linux) the link to open the pull request in your browser.

The status refreshes as soon as a `git push`, or a `gh pr` command that changes the pull request, such as `gh pr create` or `gh pr merge`, succeeds in the session.

Claude Code renders the badge as a hyperlink even when it can't detect hyperlink support in your terminal, which commonly happens over SSH or in tmux. Set [`FORCE_HYPERLINK=0`](https://code.claude.com/docs/en/env-vars) to render the badge as plain text.

When you set [`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`](https://code.claude.com/docs/en/env-vars), Claude Code doesn't check pull request or merge request status.

  PR status for GitHub repositories needs a GitHub token. Claude Code finds one based on the remote's host:

  * **github.com**: `GH_TOKEN` or `GITHUB_TOKEN`, or the token saved by `gh auth login`. Without one, the footer shows `install gh for PR status` when the `gh` CLI isn't installed, or `gh auth login for PR status` when it is
  * **A GitHub Enterprise host set as `GH_HOST`**: `GH_ENTERPRISE_TOKEN` or `GITHUB_ENTERPRISE_TOKEN`, or the token saved by `gh auth login --hostname <host>`. Without one, the footer shows the same hints
  * **Any other GitHub host**: the token saved by `gh auth login --hostname <host>`. Without one, Claude Code shows no badge and no hint

### GitLab merge requests

When you work on a branch with an open GitLab merge request, Claude Code shows a clickable `MR !N` badge in the footer slot that otherwise holds the GitHub PR link. `!N` is GitLab's own reference syntax for merge request number N. The colored underline shows the merge request's state:

* Green: GitLab reports the merge request as mergeable
* Yellow: any other open state
* Gray: draft

The badge disappears once the merge request merges or closes.

It refreshes as soon as a `git push`, or a `glab mr` command that changes the merge request, such as `glab mr create` or `glab mr merge`, succeeds in the session.

To get the badge, you need:

* Claude Code v2.1.234 or later
* A repository remote that points at your GitLab host, either gitlab.com or a self-managed instance
* The [`glab` CLI](https://gitlab.com/gitlab-org/cli) on your `PATH`, authenticated with `glab auth login`

Claude Code ignores `glab`'s token environment variables, such as `GITLAB_TOKEN`, when it checks status, so you get no badge from an exported token alone. Claude Code also looks for `glab` and for its login once per session, so restart Claude Code after you install `glab` or run `glab auth login`.
