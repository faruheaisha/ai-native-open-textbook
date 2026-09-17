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
pageSha256: "93145fdb830f18ef67b1bfa52c0669b689eb4162c5f8e2d2df032476ead2c879"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### Why don't I see a release PR?

Check these common causes first:

- **The [release-please workflow](https://github.com/langchain-ai/deepagents/actions/workflows/release-please.yml) has not run yet.** Wait a minute or two after the PR merges to `main`, then check the `release-please` workflow run.
- **The merged commit uses a hidden type.** `chore`, `refactor`, `ci`, `docs`, `style`, `test`, and `hotfix` do not create release PRs on their own. See [Releasable Commit Types and Version Bumping](#releasable-commit-types-and-version-bumping).
- **The commit was not assigned to the package you expected.** release-please scopes commits by **changed file paths**, not just the Conventional Commit scope. For example, a `feat(code): ...` commit must touch files under `libs/code` to create or update the `deepagents-code` release PR.
- **An [existing draft release PR](https://github.com/langchain-ai/deepagents/issues?q=is%3Apr+is%3Aopen+author%3Aapp%2Fgithub-actions) was updated instead.** Each package has at most one active release PR, on a branch named `release-please--branches--main--components--<package>`.
- **A previous merged release PR [is still pending](https://github.com/langchain-ai/deepagents/issues?q=state%3Aopen%20label%3A%22autorelease%3A%20pending%22).** If a release PR still has `autorelease: pending` after the release workflow finished, see [Release PR Stuck with "autorelease: pending" Label](#release-pr-stuck-with-autorelease-pending-label).

### Empty commit fan-out

> [!CAUTION]
> Never push an empty commit (`git commit --allow-empty`) to `main`. release-please scopes commits to packages by the file paths they touch. An empty commit has no paths, so it falls back to bumping **every** package — producing a release PR for each managed component, not the one you intended.

This most commonly bites when someone tries to "fix up" a merged PR's changelog entry by pushing an empty commit with a corrected conventional-commit subject (e.g., adding a missing `!` for a breaking change). The corrected subject does land in `git log`, but release-please reads file paths, not commit subjects, when deciding scope.

The `guard-empty-commit` job in [`release-please.yml`](https://github.com/langchain-ai/deepagents/blob/main/.github/workflows/release-please.yml) blocks this at CI time: any push to `main` whose `HEAD` commit changes zero files fails fast with a clear error before the release-please action runs.

There is one narrow exception for history repair: an empty merge commit titled `hotfix(repo): ...` may pass if each commit introduced by the merged branch touches files. This covers cases where the final file tree is intentionally unchanged, but preserving the individual commits matters. For example, release-please reads commit history to decide package scope, version bumps, and changelog entries, so restoring a lost `feat(sdk)!` commit with a `BREAKING CHANGE:` footer can be necessary even when the files already match `main`.

**If you need to amend a release note for a commit that already merged**, see [Overriding a Merged Commit's Changelog Entry](#overriding-a-merged-commits-changelog-entry) below. Do not push empty commits to `main`.

**If a fan-out has already happened** (release PRs opened for packages you didn't change), revert the offending commit on `main`. release-please will reconcile the open release PRs on the next push that actually touches package files; PRs for unaffected packages can be closed manually.

### Lockfile churn fan-out

A subtler sibling of the empty-commit case. release-please scopes a commit to a package by the file *paths* it touches and has no notion of "this file is just a lockfile." When a bump-worthy commit (a `feat:`/`fix:` in one package) also regenerates the `uv.lock` of every package that depends on it, release-please attributes the bump-worthy commit to those dependents too and opens a release PR for each — even though their only change is a regenerated lockfile.

> [!NOTE]
> Closing such a stray release PR does **not** make it stay closed. release-please decides what to release by comparing each component's last-released SHA in `.release-please-manifest.json` against `main`; the unreleased lockfile commit is still there, so the PR is regenerated on the next run. The only ways to stop it are to release the package (merge the PR) or to remove the unreleased bump from `main` — see [Reverting a Merged-but-Unreleased PR](#reverting-a-merged-but-unreleased-pr).

**Avoid it** by landing lockfile regeneration in a separate `chore(deps):` commit/PR — `chore` is hidden and triggers no release, so only the package with real source changes is released.

The `release_please_scope_check.yml` workflow ([`.github/scripts/release/check_lockfile_release_scope.py`](https://github.com/langchain-ai/deepagents/blob/main/.github/scripts/release/check_lockfile_release_scope.py)) catches this at PR time: when a bump-worthy PR changes only a lockfile inside a managed package, it posts a sticky comment naming the affected components and **fails the check**. Resolve it (route the lockfile churn through a `chore(deps):` commit), or — for an intentional lockfile-only release such as a leaf-package security bump — apply the `allow-lockfile-release` label to acknowledge the fan-out and let the PR pass. Applying the label posts a loud bypass warning that lists every touched component — bypassing does **not** stop release-please from opening those release PRs. For the failure to actually gate merges, add the check to the branch's required status checks (repo settings).

After merge, `release_please_fanout_watch.yml` is a safety net: if an open `release(<component>):` PR's package path only changed lockfiles on `main` since the last released SHA, it sticky-comments that release PR and fails an advisory check so the fan-out is noticed within minutes. Recovery still follows [Reverting a Merged-but-Unreleased PR](#reverting-a-merged-but-unreleased-pr).

### Multi-component fan-out

Lockfile-only is a special case of a more general rule: **one bump-worthy PR should touch real files in at most one release-please component.**

When a `feat`/`fix` (etc.) also edits non-lockfile files under other managed packages — commonly cross-package `pyproject.toml` lower-bound bumps that accompany a single-package feature — release-please opens a **separate release PR for every touched component**. That is usually not what the author intended.

**Canonical split:**

1. One feature/fix PR scoped to the single package that owns the user-facing change (`feat(code): ...`).
2. One `chore(deps): ...` PR for the cross-package dependency / lockfile churn (`chore` is hidden and does not open release PRs).

`release_please_scope_check.yml` blocks bump-worthy multi-component real-file PRs the same way it blocks lockfile-only fan-out (same sticky / `allow-lockfile-release` bypass). `pr_scope_file_check.yml` sticky copy also states this release-please consequence when title scope and package dirs disagree. See also [Lockfile churn fan-out](#lockfile-churn-fan-out).

### Releasing a new line ahead of its dependents

Local development installs sibling packages as editable path dependencies via `[tool.uv.sources]`, which hides whether published dependency ranges would resolve for real users installing from PyPI. The `📦 Check Release Dependencies` workflow closes that gap on `release(...)` PRs: it strips local sources and runs `uv pip compile --no-sources --universal --prerelease allow --all-extras` against PyPI for each changed release manifest, failing when the public install graph is unsatisfiable.

When cutting a new major/minor line of a core package, it is normal for the release PR to be red on this check even with correct metadata: the branch already opens sibling upper bounds and floors in-tree, but **already-published** dependents on PyPI still reject the new line until they cut their own releases. In that case:

1. **Lift sibling bounds in-tree first** (partner upper bounds, downstream floors, exact consumer pins) so follow-up releases are ready to cut.
2. **Publish the core package**, acknowledging the check with the `release-deps: acknowledged` label. The label soft-runs the check: resolution still executes and the PR keeps a sticky listing the follow-up releases the public graph needs — the label does **not** mean "deps resolved."
3. **Publish dependents immediately after**, in dependency order: partners whose published metadata caps the new line (these gate extras like `deepagents-code[daytona]`) → exact-pinned primary consumers (e.g. `deepagents-code`) → packages with floors on those consumers.

Use `release-deps: acknowledged` only for this coordinated release order. If the pins on the branch are wrong (not merely ahead of what siblings have published), fix the dependency metadata instead of acknowledging. The follow-up list on the sticky is generated from live PyPI metadata, so treat "green under ack" as "the listed packages still owe releases," never as an all-clear.

The follow-up sticky is independent of the label: a release PR that resolves cleanly still gets one whenever a sibling's *published* metadata caps the new line, because resolution only proves the changed package installs — not that its reverse-dependents still do. The sticky clears itself once nothing is outstanding. Packages listed under a "could not be determined" warning are neither confirmed clean nor confirmed to owe a release; re-run the job before treating that list as exhaustive.

#### What `release-deps: acknowledged` does to each check

The label means "the release dependencies were reviewed," never "they are resolved." It no longer skips any job — every check still runs and still reports, so the outstanding work stays on the PR:

| Check | Effect of the label |
| --- | --- |
| [`📦 Check Release Dependencies`](#releasing-a-new-line-ahead-of-its-dependents) | Resolves in report-only mode: the check goes green, and the sticky still lists the follow-up releases the public install graph needs. |
| `📦 Check Dependency Freshness` | No effect on whether it runs. It is advisory in all cases, and its comment stays on the PR. |
| `🔗 Check SDK Pin` | Clears the hard failure on a **prerelease** pin, recording that the pin was reviewed. Stale-pin behaviour is unchanged (advisory; `release.yml` enforces it at publish). |

Because the label stops the release-dependency check from *blocking* without stopping it from *reporting*, treat everything still on the PR after applying it as a to-do list for the release sequence.

### Overriding a Merged Commit's Changelog Entry

Append a `BEGIN_COMMIT_OVERRIDE` block (shown below) to the **merged PR's body** when release-please needs to use a different message than the actual squash-merge commit. release-please reads merged PR bodies on every run within its lookback window and uses the override in place of the original commit message — no history rewrite, no force-push.

Two situations call for this:

1. **Wrong type/scope inferred** — e.g. a `feat:` that should have been `refactor:` or `chore:`.
2. **Parser cannot read the commit body** — `@conventional-commits/parser` (which release-please uses) is grammar-strict and does not honor markdown code fences. Bodies containing function calls split across lines (`name(` followed by a newline), even inside ` ``` ` blocks, throw a parse error and the commit is silently dropped from the changelog. The pre-merge `release_please_parse_check.yml` check catches this before merge; if a commit slipped through, use the override to recover.

```txt
BEGIN_COMMIT_OVERRIDE
refactor(scope): corrected description
END_COMMIT_OVERRIDE
```

Notes:

- Place the block at the bottom of the PR body, after a horizontal rule.
- To produce multiple changelog entries from one PR, separate corrected messages by a **blank line** with each starting `type(scope):`, or wrap each in `BEGIN_NESTED_COMMIT`/`END_NESTED_COMMIT` markers — release-please's splitter requires one of these forms; a bare newline between messages is parsed as a single commit's body.
- Only effective with **squash merges**. release-please attaches the override to the squash commit by matching it to the PR's `merge_commit_sha`; for plain-merge or rebase-merge strategies the per-branch commits have no PR association and the override is ignored.
- Effect lands when release-please next syncs the open release PR (push to `main` or manual workflow dispatch). Verify the entry moved/disappeared in the corresponding `release(<component>): X.Y.Z` PR.
- Update via `gh pr edit <num> --body-file <file>` to avoid shell-escaping the multi-line body. (`gh api -f body=@<file>` does **not** work — `-f` writes the literal string `@<file>` rather than reading the file.)

### Reverting a Merged-but-Unreleased PR

When a PR has merged to `main` but its `release(<component>): X.Y.Z` PR has **not** yet shipped, the bad commit is sitting in the open release PR's changelog. Pick a path based on whether the change should appear in the eventual release notes. (For commits that already shipped, see [Yanking a Release](#yanking-a-release) instead — and ship a follow-up `revert:` patch via the standard flow.)

#### Path A — Hide and Revert (Quiet)

Use when the original commit is a mistake the changelog should not record (broken feature, accidental merge, scope/type mistake that escaped lint). Net effect: the open release PR rebases without the entry, and the version may be recomputed if no other releasable commits remain.

1. **Override the original PR's commit message to a hidden type (`chore`).** Append at the bottom of the merged PR's body, after a horizontal rule:

   ```txt
   ---

   BEGIN_COMMIT_OVERRIDE
   chore(<scope>): <short description of the original change>
   END_COMMIT_OVERRIDE
   ```

   The `<short description>` should describe the *original change*, not the override or revert — release-please uses this verbatim as the (now-hidden) commit message. Apply with `gh pr edit <num> --body-file body.md` or via the web interface — see the caveats in [Overriding a Merged Commit's Changelog Entry](#overriding-a-merged-commits-changelog-entry).

2. **Open a revert PR off `main`** titled `chore(<scope>): revert <original title>`. The `chore` type keeps the revert itself out of the changelog as well.

   ```bash
   git checkout main && git pull
   git revert <merge_sha>
   ```

   (This repo squash-merges, so `<merge_sha>` is a single-parent commit — no `-m` flag needed.)

3. **Wait for release-please to rebase the open release PR** on the next push to `main` (or dispatch the workflow manually). Verify the entry has disappeared from the corresponding `release(<component>): X.Y.Z` PR's rendered body before merging it.

#### Path B — `revert:` with Audit Trail

Use when something measurable has already happened off `main` (downstream consumers tracking the SHA, internal pre-release builds, public discussion of the change). The release PR will list the same change *twice* — once under its original section (`Features`, `Bug Fixes`, etc.) and once under `Reverted Changes` — because `revert` is configured as a visible section in `release-please-config.json`. Trade-off: honest history at the cost of a duplicated entry in a version that never shipped externally.

1. **Open a revert PR off `main`** titled `revert(<scope>): "<original title>"` (Conventional Commits convention quotes the original subject). Body should reference the merge SHA being reverted.

   ```bash
   git checkout main && git pull
   git revert <merge_sha>
   ```

   As in Path A, no `-m` flag — squash-merged commits are single-parent.

2. **Merge the revert PR.**

3. **Wait for release-please to rebase the open release PR** on the next push to `main` (or dispatch the workflow manually). Verify the corresponding `release(<component>): X.Y.Z` PR's rendered body now contains both the original entry and a `Reverted Changes` entry before merging it.

#### Don'ts

- **No force-push to `main`** — branch protection blocks it and would drop unrelated commits anyway.
- **No empty commits** to "fix up" the changelog — `guard-empty-commit` fails them, and even if it didn't, the empty fan-out would open release PRs for every package (see [Empty commit fan-out](#empty-commit-fan-out)).
- **Don't edit the release PR body to remove the entry directly** — release-please regenerates the body from merged-PR commits on every sync, so manual edits persist only until the next push to `main`. The override on the original PR is the durable mechanism.
- **Don't edit `.release-please-manifest.json`** — manifest edits only matter for [Yanking a Release](#yanking-a-release) (versions that already shipped).

### Yanking a Release

If you need to yank (retract) a release:

#### 1. Yank from PyPI

Using the PyPI web interface or a CLI tool.

#### 2. Delete GitHub Release/Tag (optional)

```bash
# Delete the GitHub release (<PACKAGE> = package name from Managed Packages table)
gh release delete "<PACKAGE>==<VERSION>" --yes

# Delete the git tag
git tag -d "<PACKAGE>==<VERSION>"
git push origin --delete "<PACKAGE>==<VERSION>"
```

#### 3. Fix the Manifest

Edit `.release-please-manifest.json` to the last good version for the affected package, and update the corresponding `pyproject.toml` and `_version.py` to match.

### Release PR Stuck with "autorelease: pending" Label

If a release PR shows `autorelease: pending` after the release workflow ran, the label update step may have failed — on the mainline path `mark-release` will be red. This can block release-please from creating new release PRs.

**To fix manually:**

```bash
# Find the PR number for the release commit (<PACKAGE> = package name from Managed Packages table)
gh pr list --state merged --search "release(<PACKAGE>)" --limit 5

# Update the label
gh pr edit <PR_NUMBER> --remove-label "autorelease: pending" --add-label "autorelease: tagged"
```

On the normal mainline publish path, a failed label swap fails `mark-release`
after the tag and GitHub release already exist. Treat the package release as
done and fix only the stuck label so later release-please maintenance can run.

### Release Notes Job Failed or GitHub Release Body Is Empty

The `release-notes` job builds the published GitHub release body from the package `CHANGELOG.md`, contributor shoutouts, and a collapsible package-scoped git log. It is intentionally fail-open: if the job fails or produces an empty body, the publish to PyPI and the GitHub tag still succeed. The release is real — do **not** re-dispatch the full publish workflow for the same version.

A failed notes job is surfaced in the `mark-release` job of the same workflow run: look for an `::error::` annotation ("Release notes job failed") and a job summary with a paste-ready rebuild command. Degraded bodies (built with warnings) are instead summarized by the `release-notes` job itself under "⚠️ Release notes built with warnings."

To rebuild and apply the release body manually:
