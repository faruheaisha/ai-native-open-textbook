---
title: "Code Review"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/code-review.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/code-review.md"
sourceSha256: "85ed7113474c8f54eabd52278112a333bb56ce6be29711f5bdd23db1e1345297"
pageSha256: "85ed7113474c8f54eabd52278112a333bb56ce6be29711f5bdd23db1e1345297"
contentMode: "local-full"
zh: ""
---

# Code Review

> Set up automated PR reviews that catch logic errors, security vulnerabilities, and regressions using multi-agent analysis of your full codebase

  Code Review is in research preview, available for [Team and Enterprise](https://claude.ai/admin-settings/claude-code) subscriptions. It is not available for organizations with [Zero Data Retention](https://code.claude.com/docs/en/zero-data-retention) enabled. On other plans, you can still [review a diff locally](#review-a-diff-locally) with the `/code-review` command.

Code Review analyzes your GitHub pull requests and posts findings as inline comments on the lines of code where it found issues. A fleet of specialized agents examine the code changes in the context of your full codebase, looking for logic errors, security vulnerabilities, broken edge cases, and subtle regressions.

Findings are tagged by severity and don't approve or block your PR, so existing review workflows stay intact. You can tune what Claude flags by adding a `CLAUDE.md` or `REVIEW.md` file to your repository.

To run Claude in your own CI infrastructure instead of this managed service, see [GitHub Actions](https://code.claude.com/docs/en/github-actions) or [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd). For repositories on a self-hosted GitHub instance, see [GitHub Enterprise Server](https://code.claude.com/docs/en/github-enterprise-server).

This page covers:

* [How reviews work](#how-reviews-work)
* [Setup](#set-up-code-review)
* [Triggering reviews manually](#manually-trigger-reviews) with `@claude review` and `@claude review always`
* [Customizing reviews](#customize-reviews) with `CLAUDE.md` and `REVIEW.md`
* [Pricing](#pricing)
* [Troubleshooting](#troubleshooting) failed runs and missing comments
* [Reviewing a diff locally](#review-a-diff-locally) with the `/code-review` command

## How reviews work

Once an Owner [enables Code Review](#set-up-code-review) for your organization, reviews trigger when a PR opens, on every push, or when manually requested, depending on the repository's configured behavior. Commenting `@claude review` [starts a review on a PR](#manually-trigger-reviews) in any mode.

When a review runs, multiple agents analyze the diff and surrounding code in parallel on Anthropic infrastructure. Each agent looks for a different class of issue, then a verification step checks candidates against actual code behavior to filter out false positives. The results are deduplicated, ranked by severity, and posted as inline comments on the specific lines where issues were found, with a summary in the review body. If no issues are found, Code Review updates the GitHub check run to show that no issues were detected. Claude may also post a short confirmation comment on the PR.

Reviews scale in cost with PR size and complexity, completing in 20 minutes on average. Owners can monitor review activity and spend via the [analytics dashboard](#view-usage).

### Severity levels

Each finding is tagged with a severity level:

| Marker | Severity     | Meaning                                                             |
| :----- | :----------- | :------------------------------------------------------------------ |
| 🔴     | Important    | A bug that should be fixed before merging                           |
| 🟡     | Nit          | A minor issue, worth fixing but not blocking                        |
| 🟣     | Pre-existing | A bug that exists in the codebase but was not introduced by this PR |

Findings include a collapsible extended reasoning section you can expand to understand why Claude flagged the issue and how it verified the problem.

### Rate and reply to findings

Each review comment from Claude arrives with 👍 and 👎 already attached so both buttons appear in the GitHub UI for one-click rating. Click 👍 if the finding was useful or 👎 if it was wrong or noisy. Anthropic collects reaction counts after the PR merges and uses them to tune the reviewer. Reactions do not trigger a re-review or change anything on the PR.

Replying to an inline comment does not prompt Claude to respond or update the PR. To act on a finding, fix the code and push. If the PR is subscribed to push-triggered reviews, the next run resolves the thread when the issue is fixed. To request a fresh review without pushing, comment `@claude review` as a [top-level PR comment](#manually-trigger-reviews).

### Check run output

Beyond the inline review comments, each review populates the **Claude Code Review** check run that appears alongside your CI checks. Expand its **Details** link to see a summary of every finding in one place, sorted by severity:

| Severity     | File:Line                 | Issue                                                          |
| ------------ | ------------------------- | -------------------------------------------------------------- |
| 🔴 Important | `src/auth/session.ts:142` | Token refresh races with logout, leaving stale sessions active |
| 🟡 Nit       | `src/auth/session.ts:88`  | `parseExpiry` silently returns 0 on malformed input            |

Each finding also appears as an annotation in the **Files changed** tab, marked directly on the relevant diff lines. Important findings render with a red marker, nits with a yellow warning, and pre-existing bugs with a gray notice. Annotations and the severity table are written to the check run independently of inline review comments, so they remain available even if GitHub rejects an inline comment on a line that moved.
