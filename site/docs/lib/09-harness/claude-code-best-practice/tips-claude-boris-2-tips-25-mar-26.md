---
title: "Squash Merging & PR Size Distribution — Tips from Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-25-mar-26.md"
sourceRel: "tips/claude-boris-2-tips-25-mar-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-2-tips-25-mar-26.md"
sourceSha256: "137d3f20cf78741cf531aba2af92e2ba2741e5157da25eb8d2e24724ffa918d7"
pageSha256: "137d3f20cf78741cf531aba2af92e2ba2741e5157da25eb8d2e24724ffa918d7"
contentMode: "local-full"
zh: ""
---

# Squash Merging & PR Size Distribution — Tips from Boris Cherny

A summary of insights shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on March 25, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1/ 266 Contributions in a Single Day — Always Squash

Boris shared his GitHub contribution graph showing **266 contributions on March 24th** — from **141 PRs, always squashed** with a median of **118 lines** per PR.

- Squash merging combines all branch commits into a single commit on the target branch — keeping history clean and linear
- Each PR = one commit makes it easy to revert entire features and simplifies `git bisect`
- At high-velocity AI-assisted workflows (141 PRs/day), squash is the pragmatic choice — individual "fix lint", "try this" commits within a branch are noise

<a href="https://x.com/bcherny/status/2038552880018538749"><img src="/mirror/38/388b3459fa9c0caa611aa8409ba604e8e2ed3e72.png" alt="Boris Cherny — 266 contributions, always squashed" width="50%" /></a>

---

## 2/ PR Size Distribution — Keep PRs Small

Boris shared the size distribution across those 141 PRs, totaling **45,032 lines changed** (additions + deletions):

| Metric | Lines (add+del) | Meaning |
|--------|---------------:|---------|
| **p50** | **118** | Median PR size — half of all PRs were 118 lines or fewer |
| p90 | 498 | 90% of PRs were under 500 lines |
| **p99** | **2,978** | Only ~1 PR exceeded ~3K lines |
| min | 2 | Smallest PR — a quick 2-line fix |
| max | 10,459 | Largest single PR — likely a migration or generated code |

- A **median of 118 lines** means most PRs are focused and reviewable, even at 141 PRs/day
- The distribution is heavily right-skewed — the occasional large PR is inevitable (bulk renames, migrations), but the norm is tight
- Small PRs reduce merge conflict risk, are easier to review, and pair perfectly with squash merging for clean reverts

<a href="https://x.com/bcherny/status/2038552880018538749"><img src="/mirror/3b/3b6d3721f4eeee7cf3c70a754bca368385831bd1.png" alt="Boris Cherny — PR size distribution table" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — March 25, 2026](https://x.com/bcherny)
