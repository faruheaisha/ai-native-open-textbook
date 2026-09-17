---
title: "Module 14: Git Sync and Collaboration"
sourceId: "07-coding/lovable-for-beginners"
sourceTitle: "Lovable for Beginners"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cporter202/lovable-for-beginners"
entryUrl: "https://github.com/cporter202/lovable-for-beginners/blob/c4bfa59c80fa37c99dfa3810541537ab63840512/module-14-version-control-github.md"
sourceRel: "module-14-version-control-github.md"
rawUrl: "/raw/07-coding/lovable-for-beginners/module-14-version-control-github.md"
sourceSha256: "52259487bdcd1c25f2a6463437e3dc47f2c8237bf02b1751c8bdd904835631fe"
pageSha256: "52259487bdcd1c25f2a6463437e3dc47f2c8237bf02b1751c8bdd904835631fe"
contentMode: "local-full"
zh: ""
---

# Module 14: Git Sync and Collaboration

Git sync connects one Lovable project to one repository and keeps the active branch synchronized in both directions. Lovable currently supports GitHub and GitLab. This module focuses on GitHub.

> Connect a practice project to GitHub: [Open Lovable](https://lovablelabs.pxf.io/bky1Kg).

## Learning goals

- Understand workspace connections and project repository links
- Set up two-way GitHub sync
- Work safely with branches, local development, pull requests, and CI
- Avoid conflicts and distinguish Git sync from the GitHub API connector

## 1. How Git sync works

GitHub sync has two layers:

1. A workspace connection authorizes Lovable to access a GitHub account or organization through the Lovable GitHub app.
2. A project repository link connects one Lovable project to one repository.

A workspace can have multiple GitHub connections. Once a project is linked:

- Lovable changes are committed and pushed to the active branch.
- Commits pushed to that branch sync back into Lovable.
- Lovable edits and syncs one branch at a time.

Commits on other branches do not appear until you switch Lovable to that branch or merge them into the active branch.

Git sync is available across current plans. The code editor and one-time code download have separate plan requirements.

## 2. Why connect GitHub

- Keep code in an account you control
- Work in a local IDE
- Use branches and pull requests
- Review changes with developers
- Run CI and automated checks
- Deploy to external platforms
- Maintain an auditable history

You do not need GitHub to build or publish entirely within Lovable.

## 3. Connect a project

Workspace owners or admins create the GitHub workspace connection. Project or workspace owners and admins link or disconnect a project repository. Editors can work with the synced repository and view status.

Before linking:

- Confirm the target GitHub account or organization.
- Confirm repository visibility.
- Check organization policies and Lovable GitHub app access.
- Decide the initial active branch.
- Make sure no unrelated repository is selected.

After linking, verify a small Lovable edit appears as a commit in GitHub, then push a harmless GitHub edit and confirm it appears in Lovable.

## 4. Branch workflow

For a meaningful feature:

1. Start from an up-to-date main branch.
2. Create a feature branch in Lovable or GitHub.
3. Switch Lovable to that branch.
4. Build and test the feature.
5. Open a pull request in GitHub.
6. Review CI and code changes.
7. Merge through GitHub.
8. Switch Lovable back to main and confirm sync.

Use descriptive branch names such as `feature/club-invitations` or `fix/member-book-access`.

## 5. Local development

Clone the repository and follow its actual scripts:

```bash
