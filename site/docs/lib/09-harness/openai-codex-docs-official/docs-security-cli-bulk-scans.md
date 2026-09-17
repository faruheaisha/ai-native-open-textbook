---
title: "Run bulk security scans"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/security/cli/bulk-scans.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/security/cli/bulk-scans.md"
sourceSha256: "66b255d17ec345dd08c37639a17a3b9e038043902eb388854b3868db6ad9f2be"
pageSha256: "66b255d17ec345dd08c37639a17a3b9e038043902eb388854b3868db6ad9f2be"
contentMode: "local-full"
zh: ""
---

# Run bulk security scans

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use `npx @openai/codex-security bulk-scan` to review repositories in one
campaign. Discover repositories from your personal GitHub account or an
organization, or provide a CSV that pins every repository to an exact Git
revision.

The `@openai/codex-security` package is public. Running scans requires Codex
  Security access. Follow the [CLI quickstart](https://learn.chatgpt.com/docs/security/cli) to install
  the CLI and sign in.

## Choose a repository source

| Source           | When to use it                                                                          |
| ---------------- | --------------------------------------------------------------------------------------- |
| GitHub discovery | Choose repositories interactively from your personal GitHub account or an organization. |
| CSV inventory    | Run a repeatable, automated campaign against exact repository revisions.                |

Both workflows save progress, preserve per-repository results, and let you
resume a campaign after an interruption.

## Discover GitHub repositories

Sign in with GitHub CLI:

```bash
gh auth login
```

Start an interactive bulk scan:

```bash
npx @openai/codex-security bulk-scan
```

The CLI guides you through these steps:

1. Choose your personal GitHub account or an organization.
2. Review repositories active within the last 90 days.
3. Search the repository list and select repositories to scan.
4. Choose a directory for scan results.
5. Review the selected repositories and confirm the campaign.

Discovery excludes archived repositories and forks. The CLI records the exact
default-branch commit for each selected repository in
