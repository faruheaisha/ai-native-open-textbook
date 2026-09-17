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
pageSha256: "e895f09f3d4f9c11efd1217c1040b6ea11c3a3aae60d275b44321247e01d0f42"
contentMode: "local-full"
zh: ""
---

## Developing a new version line

Most version progression needs **no dedicated branches**. Keep developing on `main` and let release-please cut the next version — including minor bumps, since a `feat!:` / `BREAKING CHANGE:` bumps the minor pre-1.0 (see [Releasable Commit Types and Version Bumping](#releasable-commit-types-and-version-bumping)).

Reach for a dedicated branch only when you need to (often temporarily) *decouple* a version line from `main`:

| Scenario | Branch | release-please runs there? | Releases via |
| -------- | ------ | -------------------------- | ------------ |
| Normal progression (incl. minor bumps) | none — use `main` | yes (on `main`) | automatic (on release PR merge) |
| **Staging** the next line before cutover (e.g. work toward `0.7` while `main` stays `0.6.x`) | `vX.Y` integration branch | no | optional pre-release builds ([Alpha/Beta](#how-to-publish-a-pre-release)) |
| **Maintenance** of an old line after cutover (e.g. patch `0.6.x` after `main` moves to `0.7`) | `vX.Y` maintenance branch | no (not wired) | [Manual Release](#manual-release) + `dangerous-nonmain-release` |

> [!IMPORTANT]
> **Name the branch with a `v` prefix** — `v0.7`, `v0.6`, etc. A branch named `0.7` gets **no branch protection**.

Both `main` and `v[0-9].*` require a CI-passing PR (no direct pushes). The only difference is that `v[0-9].*` allows merge commits in order to facilitate syncing `main` -> `vX.Y` ([staging](#staging-branch-main-stays-on-the-current-line) step 2) and the **cutover** (admin bypass — see below). A version-line DRI with branch-rule bypass privileges may occasionally force-push a staging branch after rebasing it onto `main`, **but only when they intentionally own the history rewrite** and have verified the final `main..vX.Y` range contains only the branch's intended commits.

### TL;DR — staging the next line of work (e.g. `v0.7` while `main` stays `v0.6.x`)

1. **Branch:** create `v0.7` from `main`.
2. **Build `0.7`:** land net-new work via **squash PRs into `v0.7`** (same flow as `main`).
3. **Keep `v0.7` current with `main`:** default to a PR with **base `v0.7`, head `main`** and merge it with **"Create a merge commit"** (not squash!). Use a PR title like `chore(repo): sync main into v0.7`; do not use `release` as the scope because PR title lint reserves `release` for the type and disallows it as a scope. CI runs on the merged result; `main`'s commits arrive as shared history, so the cutover stays clean. If the staging branch is being actively maintained by a DRI with branch-rule bypass privileges who can safely rewrite it, rebasing `v0.7` onto `main` and force-pushing with lease is also acceptable; verify `git rev-list --left-right --count main...v0.7` reports `0 N` and that `git log --oneline --no-merges main..v0.7` lists only the intended version-line commits. Cherry-pick instead only if `v0.7` deliberately diverges from `main` (e.g. `v0.7` deleted or rewrote a module that `main` is still bug-fixing, so a full merge would keep dragging the old code back and re-conflict on every sync — cherry-pick just the fixes you still want).
4. **Cutover:** an admin merges `v0.7` onto `main` with `git merge --no-ff` under admin bypass. See [Cutover](#cutover-main-adopts-the-new-line).

### Staging branch (`main` stays on the current line)

1. Create `vX.Y` from `main`. Do feature work via **squash PRs into `vX.Y`** — same flow as `main`, so every change is CI-gated and reviewed. Each PR becomes one clean conventional commit on the branch.
2. **Pulling in `main` fixes:** keep `vX.Y` current with one of these two workflows:

   - **Default for shared branches: merge `main` into `vX.Y`.** Open a **merge PR from `main` -> `vX.Y`** and land it as a **merge commit (not squash)**. Do this periodically. It buys three things:
     - **Still CI-gated.** The PR runs CI on the *merged* result, so you test `vX.Y` against the latest `main` before it lands.
     - **Conflicts stay small.** They surface in each sync PR instead of piling up for the final cutover.
     - **Clean cutover.** The merge brings `main`'s commits in as **shared history** (same SHAs, not copies), so release-please does not see copied `main` commits as new version-line work.

     Use a merge commit **only** for these sync PRs.

   - **Controlled exception: rebase `vX.Y` onto `main`.** If the version-line DRI has branch-rule bypass privileges and intentionally owns rewriting the staging branch, they may rebase and force-push with lease instead of creating sync merge commits. This keeps the GitHub compare view at `0 behind, N ahead` and makes the final cutover easy to audit. If no authorized maintainer can bypass the non-fast-forward rule, use the merge-PR workflow instead. Before pushing, verify:

     ```bash
     git rev-list --left-right --count main...vX.Y  # expect: 0 N
     git log --oneline --no-merges main..vX.Y      # only intended version-line commits
     git log --oneline --merges main..vX.Y         # empty, unless intentional
     ```

     After that verification, merging `vX.Y` into `main` makes release-please parse only the commits in `main..vX.Y`. Do **not** use this workflow if other contributors are basing active work on the staging branch unless they know the branch will be rewritten.

   > [!TIP]
   > If `vX.Y` deliberately *diverges* from `main` (it removed or rewrote code that `main` keeps patching), a full sync re-surfaces the same conflict every time. In that case **cherry-pick only the fixes you want** instead. Avoid cherry-picking commits that already exist on `main`: cherry-picks get new SHAs, so release-please can treat them as new commits at cutover.
3. **Need an installable build?** Cut a pre-release (`0.7.0a1`, …) with the throwaway-branch flow in [How to publish a pre-release](#how-to-publish-a-pre-release). release-please is never involved and `main` is untouched.

### Cutover (`main` adopts the new line)

When the new line is ready to become `main`:

1. Confirm `vX.Y` `HEAD` is green.
2. **Merge `vX.Y` onto `main` preserving individual commits.** The cutover can't be a normal PR (a `vX.Y` -> `main` PR would squash the whole version branch into one commit and gut the changelog!), so an **admin** brings it over with a merge commit under bypass. If you've kept `vX.Y` synced (staging step 2), there's little left to reconcile here:

   ```bash
   git checkout main && git pull
   git merge --no-ff vX.Y
   git push origin main
   ```

   release-please ignores the merge commit itself and itemizes each per-PR squash commit from `vX.Y` into the changelog(s).
3. After the merge, release-please reads the incoming commits and computes the next version. Compare it to the version you intend to cut:

   - **If they match, you're done.** The commits already justify the target (e.g. a `feat!:` / `BREAKING CHANGE:` in the line bumps the minor if pre-1.0).
   - **If release-please picks a lower version, force it.** The commits resolve to less than your target (e.g. a line of only `feat:`/`fix:` stays as a `PATCH` bump pre-1.0). Override release-please's choice in one of two ways:

     - **`Release-As` footer** — put the footer on a commit that touches the package's files. release-please reads the footer and pins that version for the next release PR:

       ```bash
       git commit -m "feat(sdk): release X.Y.Z" -m "Release-As: X.Y.Z"
       ```

     - **`release-as` config key** — set `"release-as": "X.Y.Z"` on the package's entry in [`release-please-config.json`](https://github.com/langchain-ai/deepagents/blob/main/release-please-config.json). Same effect, but it lives in config rather than a commit message. It's a standing override, so **delete the key once the release PR is open!** — otherwise every later run keeps pinning that same version.

   > [!CAUTION]
   > Don't put the `Release-As` footer on an `--allow-empty` commit on `main` — an empty commit touches no package paths and triggers the [empty-commit fan-out](#empty-commit-fan-out) guard, opening a release PR for *every* package. That's why the footer goes on a commit that actually edits the package's files; the `release-as` config key sidesteps this since editing the config file is itself a non-empty change.

### Maintenance branch (patching the old line after cutover)

After `main` adopts the new line, cut a `vX.Y` branch from the **last release commit** of the old line (e.g. branch `v0.6` from the `release(deepagents): 0.6.N` merge commit). Branching from the release commit means the latest `0.6` tag is its ancestor, so version math stays on the `0.6.x` line.

- **Backport** fixes by landing them on `main` first, then cherry-picking onto `vX.Y` with the conventional-commit message intact.
- **Release** from the branch with [Manual Release](#manual-release) + `dangerous-nonmain-release` (its stated purpose is backports): bump the version files on the branch, then dispatch `🚀 Package Release` with that branch, package, version, and `dangerous-nonmain-release` ✓. It is usually rare to need to release old versions so these steps remain manual.
