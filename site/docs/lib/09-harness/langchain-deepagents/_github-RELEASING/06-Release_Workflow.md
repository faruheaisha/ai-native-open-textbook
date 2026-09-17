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
pageSha256: "1d8d383ba79f7edcf4b1c8006494c7a1e97d59b28902b277cab5bfce4acbb0d7"
contentMode: "local-full"
zh: ""
---

## Release Workflow

### Detection Mechanism

The [release-please workflow (`.github/workflows/release-please.yml`)](https://github.com/langchain-ai/deepagents/blob/main/.github/workflows/release-please.yml) detects merged release PRs by checking two conditions on the merge commit:

1. The package's `CHANGELOG.md` was modified (e.g., `libs/deepagents/CHANGELOG.md` for the SDK)
2. The commit message matches the `release(<component>): <version>` pattern

Both must be true. release-please always satisfies both when merging a release PR — a manual `CHANGELOG.md` edit alone will not trigger a release.

### What Happens When You Merge a Release PR

Publishing starts immediately. Housekeeping on the *other* open release PRs happens afterwards, in the same workflow run:

1. **Your package publishes first.** `trigger-releases` fires as soon as the release commit is detected and never waits on anything else. It comments on the merged PR with a direct link to each package's release run — that link is where you watch the actual publish.
2. **The run waits for publishing to settle.** `guard-pending-release` polls until no merged release PR is still labeled `autorelease: pending`.
3. **Then the remaining release PRs are refreshed.** release-please updates shared files (notably `.release-please-manifest.json`) on the still-open release PRs, and `update-lockfiles` regenerates their lockfiles.

In the normal case you do not need to think about any of this. Step 3 is the only part that can be quietly skipped — if the other release PRs look stale afterwards, expand *If the other release PRs were not refreshed* below.

<details>
<summary><b>Why publishing never waits, and why the wait covers the whole repo</b></summary>

**Publishing goes first** so that a publish is never blocked behind housekeeping for some *other* package. Only step 3 is serialized (release-please mutates shared release branches, so two copies must not run at once); steps 1 and 2 are deliberately outside that serialization.

**Step 3 requires an explicit all-clear.** The guard has to positively report "nothing in flight" (`skip=false`) for release-please to run. If the guard crashes, times out, or is skipped, release-please does *not* run — an unknown state is treated as unsafe rather than assumed fine.

**The wait covers every pending release PR in the repo, not just the one you merged.** This looks over-broad but is required: release-please recomputes *all* components on every run, so any single component sitting between "version bumped" and "tag created" is enough to trigger a bootstrap downgrade — it sees no tag, concludes the package was never released, and proposes resetting it to `0.1.0` with the full history. Scoping the wait to your own PR would not be safe.

</details>

<details>
<summary><b>If the other release PRs were not refreshed</b></summary>

Step 3 can be skipped in the situations below. Skipping it holds up only the refresh of the *other* open release PRs — with one exception: a red `release.yml` means that package did not publish and has to be re-dispatched.

| Situation | What you will see | What to do | When the refresh happens |
| --- | --- | --- | --- |
| A publish is still in flight after 45 min | `release-please.yml` green, with a `deferred` step summary | Nothing, unless the publish is genuinely stuck — then clear the label per [Release PR Stuck with "autorelease: pending"](#release-pr-stuck-with-autorelease-pending-label) | Next push to `main` |
| A publish failed (yours, or a package left stuck earlier) | `release.yml` red; `release-please.yml` green, with a `deferred (release commit)` summary naming the failed run | Fix and re-dispatch the failed package release — this package has **not** published | Next push to `main`, once the failed release is recovered |
| GitHub's release state is unreadable | `release-please.yml` **red** at `guard-pending-release` | Re-run the job. It refuses to guess whether a publish is in flight rather than recompute against unverified state | When the re-run succeeds |
| You merged several release PRs at once | Some `release-please` jobs show as **cancelled** | Nothing — this is expected. Only one job may queue per concurrency group | Already done: the surviving (newest) run recomputes every component, covering the cancelled jobs' work |

</details>

### Lockfile Updates

When release-please creates or updates a release PR, the `update-lockfiles` job automatically regenerates `uv.lock` files since release-please updates `pyproject.toml` versions but doesn't regenerate lockfiles. A lockfile-only commit generated on a release branch after an unrelated `main` change does not invalidate that package's curated-note draft. This carve-out covers the release branch only. On `main`, every path under the package counts, a lockfile included.

### Release Pipeline

The [release workflow (`.github/workflows/release.yml`)](https://github.com/langchain-ai/deepagents/blob/main/.github/workflows/release.yml) runs when a release PR is merged:

1. **Setup** - Resolves package name to working directory
2. **Build** - Creates distribution package
3. **Release Notes** + **Pre-release Checks** - Run in parallel; release notes extracts the changelog, appends a collapsible package-scoped Git log (newest commit first, up to 100 commits, truncated further if the log grows large), collects contributor shoutouts, and adds a **Special thanks** section crediting the users who filed the issues the release's PRs closed; pre-release checks run tests against the built package
4. **Test PyPI** - Publishes to test.pypi.org for validation (after pre-release checks pass)
5. **Publish** - Publishes to PyPI (requires Test PyPI to succeed)
6. **Mark Release** - Creates a published GitHub release with the built artifacts; updates PR labels. For the SDK (`libs/deepagents`), we set it as the repository's `latest` (unless it's a pre-release).

### Release PR Labels

Release-please uses labels to track the state of release PRs:

| Label | Meaning |
| ----- | ------- |
| `autorelease: pending` | Applied by release-please when it opens the release PR, and carried until the release is tagged. On a **merged** PR it means the release has not been tagged/published yet |
| `autorelease: tagged` | Release PR has been successfully tagged and released |

Because `skip-github-release: true` is set in the release-please config (we create releases via our own workflow instead of using the one built into release-please), our `release.yml` workflow must update these labels manually for state management! After successfully creating the GitHub release and tag, the `mark-release` job updates the label from `pending` to `tagged`.

This label transition signals to release-please that the merged PR has been fully processed, allowing it to create new release PRs for subsequent commits to `main`.

### CI guardrails around releases

These workflows guard releases. Each one explains a failed check you may see on a PR:

- **PR title lint** (`pr_lint.yml`) — enforces Conventional Commits with a mandatory scope on PR titles; its allowed types and scopes are the canonical list.
- **Release-please parse check** (`release_please_parse_check.yml`) — runs `@conventional-commits/parser` on the would-be squash-merge message (`<title> (#<num>)` + body) at PR time. Fails the check and posts a sticky comment with a paste-ready `BEGIN_COMMIT_OVERRIDE` block when the parser would reject the body, preventing silent changelog drops. The parser is exact-pinned and must stay in lock-step with the version release-please itself depends on, declared in its own `package.json` upstream in `googleapis/release-please`.
- **Fan-out guards** — one workflow per row; see [Multi-component fan-out](#multi-component-fan-out).
  - `release_please_scope_check.yml` — blocks a bump-worthy PR that touches real files in more than one managed component, or only lockfiles inside a managed package. Bypass label: `allow-lockfile-release`.
  - `pr_scope_file_check.yml` — checks the PR scope against the files touched. Bypass label: `allow-scope-mismatch`.
  - `release_fanout_bypass_warn.yml` — posts a loud sticky when either bypass label is applied.
  - `release_please_fanout_watch.yml` — post-merge safety net; comments on open release PRs whose package delta is lockfile-only.
- **Auto-labeling** — `pr_labeler.yml` (unified PR labeler: size, file, title, external/internal, contributor tier) and `pr_labeler_backfill.yml` (manual backfill on open PRs). These apply labels for triage only; they do not gate releases (the guard workflows above honor their own bypass labels). Issue labeling is not release-gated; see [`LAYOUT.md`](/lib/09-harness/langchain-deepagents/_github-LAYOUT).
