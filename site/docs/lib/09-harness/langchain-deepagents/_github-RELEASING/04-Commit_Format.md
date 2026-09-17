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
pageSha256: "3e90a097860690182cca8fe9c080bd8f8bc1e6af1a6fff5f9d1b0a39edbcdae2"
contentMode: "local-full"
zh: ""
---

## Commit Format

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format with types and scopes defined in [`.github/workflows/pr_lint.yml`](https://github.com/langchain-ai/deepagents/blob/main/.github/workflows/pr_lint.yml). **Scope is required** — PRs without a scope will fail the title lint check.

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Examples

```bash
fix(sdk): resolve type hinting issue
feat(sdk): add new chat completion feature
feat(sdk)!: redesign configuration format
```

### Breaking Changes

Mark a change as breaking using either form supported by Conventional Commits — both are recognized by release-please:

1. **Bang notation** — append `!` after the scope.

   ```text
   feat(sdk)!: redesign configuration format
   ```

2. **`BREAKING CHANGE:` footer** — include a footer (separated from the body by a blank line). The token must be uppercase; lowercase `breaking change:` is ignored. `BREAKING-CHANGE:` (hyphenated) is also accepted as a synonym.

   ```text
   feat(sdk)!: rename `Backend.read` to `Backend.fetch`

   BREAKING CHANGE: `Backend.read` has been removed. Callers must update to
   `Backend.fetch`, which returns a `FetchResult` instead of raw bytes.
   ```

The `!` alone is sufficient to trigger the version bump. The `BREAKING CHANGE:` footer is optional — it only changes what text appears under the `⚠ BREAKING CHANGES` heading in the changelog. Without the footer, that entry is just the commit subject; with it, the entry becomes your footer text (use this to spell out the migration). Combine both whenever the migration path isn't obvious from the subject alone — the `!` makes the breaking nature obvious in `git log` and PR titles, and the footer carries the migration instructions.

> [!IMPORTANT]
> All packages are pre-1.0, so a breaking change bumps the **minor** version, not the major (see [Releasable Commit Types and Version Bumping](#releasable-commit-types-and-version-bumping)). The change is still flagged as `⚠ BREAKING CHANGES` at the top of the release notes regardless of the resulting version bump.

PRs containing breaking changes should:

- Use the `!` form in the PR title so the squash commit (whose subject is the PR title) carries the marker. Release-please reads the merged commit message, not the PR body. Put the marker in the title.
- Spell out the migration path in the PR body: what broke, how to update calling code, what the equivalent new API looks like.
- Be reviewed against the [stable public interfaces](https://github.com/langchain-ai/deepagents/blob/main/CLAUDE.md#maintain-stable-public-interfaces) guidance in `CLAUDE.md` — the bar for breaking a public API is high, especially for the SDK.
- Avoid bundling unrelated changes. A breaking commit should isolate the breaking surface so the changelog entry is precise.
