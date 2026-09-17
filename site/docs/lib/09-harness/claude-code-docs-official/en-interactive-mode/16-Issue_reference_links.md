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
pageSha256: "ab6191ba97139759067c3035b2ab790b972ac5ee7bb3a0c0029b5421f26ab555"
contentMode: "local-full"
zh: ""
---

## Issue reference links

When Claude mentions an issue as `owner/repo#123`, you can click the reference to open it, as long as your terminal supports hyperlinks. If Claude Code doesn't detect hyperlink support in your terminal, set [`FORCE_HYPERLINK`](https://code.claude.com/docs/en/env-vars) to `1` to turn the links on, or to `0` to keep references as plain text.

You get a link only for the two-part `owner/repo#123` form. These stay plain text:

* A bare `#123`
* A nested GitLab path such as `group/subgroup/project#123`
* Any reference inside a code span or code block

Claude Code builds the link for the host of the repository it identifies from your git remote, not for the repository the reference names:

| Your repository's host                                             | Where `owner/repo#123` links                 |
| :----------------------------------------------------------------- | :------------------------------------------- |
| github.com, a GitHub Enterprise host, or any host not listed below | `https://<host>/owner/repo/issues/123`       |
| gitlab.com                                                         | `https://gitlab.com/owner/repo/-/issues/123` |
| bitbucket.org, codeberg.org, or gitea.com                          | No link; the reference stays plain text      |
