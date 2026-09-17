---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/RELEASING.md"
sourceRel: ".github/RELEASING.md"
rawUrl: "/raw/09-harness/langchain-deepagents/.github/RELEASING.md"
sourceSha256: "c49b4d41b74096555af3aadaeee6fda996e8d0ea7d0bb75fe5371469cd90c0c4"
pageSha256: "cc4561427847be050e7cca289d5f3e4957eadd688e6d29560bdbdf554938a152"
contentMode: "local-full"
zh: ""
---

## How It Works

### Automatic Release PRs

When commits land on `main`, release-please analyzes them and, **per package**, either:

- Creates a new release PR
- Updates an existing release PR (with additional changes)
- Does nothing — commit types that don't trigger a version bump (e.g., `chore`, `refactor`, `ci`, `docs`, `style`, `test`, `hotfix`) won't create a release PR on their own. However, if a release PR already exists, release-please may still rebase/update it. See [Releasable Commit Types and Version Bumping](#releasable-commit-types-and-version-bumping) for which types trigger bumps.

Each package gets its own **draft** release PR on a branch named `release-please--branches--main--components--<package>`. Mark the PR as ready for review before merging.

### Triggering a Release

To release a package:

1. Merge one or more [releasable conventional commits](#releasable-commit-types-and-version-bumping) to `main`
2. Wait for the release-please action to create/update the release PR (can take a minute or two)
3. Review the generated changelog in the PR. The published GitHub release body is extracted from the merged package `CHANGELOG.md`, not from the release PR description.
   1. Follow the [curated release-notes workflow](#curated-release-notes) after moving the PR from draft to ready for review. This applies to every release-please managed package.
4. Merge the release PR after its required checks pass — this triggers the pre-release checks, PyPI publish, and GitHub release

> [!IMPORTANT]
> `deepagents-code` pins an exact `deepagents==` version in `libs/code/pyproject.toml`. Bump this pin as part of any PR that depends on new SDK functionality — don't defer it to release time. The pin should always reflect the minimum SDK version `deepagents-code` actually requires. If you intentionally need to ship a release PR with an older SDK pin, add the `release: skip sdk pin check` label before merging. See [Release Failed: Code SDK Pin Is Older Than SDK](#release-failed-code-sdk-pin-is-older-than-sdk) for recovery if a stale pin slips through.

### Curated Release Notes

This applies to **every** package release-please manages. The package under release is derived from the release PR's head branch, so a package added to [`release-please-config.json`](https://github.com/langchain-ai/deepagents/blob/main/release-please-config.json) is covered with no workflow change.

Keep the release PR in draft while changes are still accumulating. When it is ready to release:

1. Mark the PR ready for review. `release-bot` will post a polished release-notes draft as a PR comment.
2. Edit the notes in that marked comment as needed (while keeping the version heading intact).
3. After reviewing & finalizing, comment `@release-bot apply`. The bot updates that package's `CHANGELOG.md` (e.g. `libs/code/CHANGELOG.md` for `deepagents-code`) and mirrors the notes to the PR body.
4. Merge normally after the `curated release notes` CI check passes.

Drafts use a fixed section order matching `release-please`: `⚠ BREAKING CHANGES`, `Features`, `Bug Fixes`, `Performance Improvements`, and `Reverted Changes`. Empty sections are omitted, entries are bullets, and references include pull request links only—not commit hashes or other links.

> [!NOTE]
> When `@release-bot apply` adds a trusted commit that changes only the package's managed `CHANGELOG.md`, the main CI workflow intentionally skips its package lint and test jobs. The `✅ CI Success` gate reuses the result from the apply commit's parent, where the same release-PR contents already ran through normal CI. Skipped package jobs on the apply commit are therefore expected; inspect the parent's `✅ CI Success` check and linked workflow run to see the reused tests. If the parent did not pass CI, the apply commit does not pass the gate.

Run `@release-bot draft` to regenerate the draft in two cases. The automatic run failed. Or commits added to `main` after drafting touch that release PR's package directory. Each new draft records its `main` baseline, so a release-please refresh caused only by changes outside the package does not invalidate the prose. If that unrelated refresh overwrites notes that were already applied, the check asks you to run `@release-bot apply` again; re-drafting is not required. The bot also asks for a re-draft when it cannot prove what changed: a very large or rewritten `main` history is treated as unknown.

Re-drafting rewrites the original notes comment in place, which GitHub does not surface in the timeline. So that a regenerated draft is not missed, the bot follows an in-place rewrite with a short comment linking back to the refreshed notes — one per re-draft. A first-time draft posts no such pointer, since a brand-new comment is already visible.

`@release-bot draft` accepts optional one-off editing instructions on the same line, for example `@release-bot draft emphasize the breaking SDK change`. The instruction is passed to the drafting model as guidance subordinate to its fixed editing rules, capped at 500 characters, and echoed in the posted draft comment so the prompt that produced a draft is auditable. Anything after a second `@` on the line is dropped. `@release-bot apply` takes no instructions — it republishes the stored draft verbatim, so text after `apply` is ignored.

During a fanout release each package gets its own release PR, and each needs its own `draft`/`apply`. Commands act only on the PR they are posted to.

The merged changelog is the source for the published GitHub release notes.

To ship without curated notes, add the `release: dangerously skip curated notes` label. That is the only way to skip the curated-notes merge gate — use it only when you intentionally want the generated changelog as-is, without maintainer polish.

#### Observing a `@release-bot` run

For a valid manual `draft` or `apply` command, the bot reacts to the command comment with 👀 when processing starts, then replaces it with 🚀 after the command succeeds. A retained 👀 means the command was acknowledged but did not finish successfully; check the bot's failure comment or the workflow logs.

A `@release-bot` comment triggers the "📝 Curate release notes" workflow on the `issue_comment` event, not on the PR's head branch, so it does **not** appear as a PR status check. To watch it:

- Open the repo's **Actions** tab → select "📝 Curate release notes" in the left sidebar → select the run whose title matches your release PR.
