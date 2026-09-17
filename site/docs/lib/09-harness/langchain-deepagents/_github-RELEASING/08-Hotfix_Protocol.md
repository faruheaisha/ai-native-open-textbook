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
pageSha256: "fe3b0605ffd197a2e2d92ed3b85937f7e52a61fd9a6a1b29abbf240c141ab1ab"
contentMode: "local-full"
zh: ""
---

## Hotfix Protocol

Something went wrong with a release. This section tells you what to do.

The right answer depends on a single question: **is the broken version already on PyPI?**

- **No** -> [Case A](#case-a--release-failed-before-pypi-publish): the release workflow failed partway through. Nothing public, you have options.
- **Yes** -> [Case B](#case-b--bug-found-after-pypi-publish): the bad version is out there. You'll ship a new patch version.

> [!IMPORTANT]
> **The rule we have to maintain:** a version should mean one exact thing. If `mypackage==1.2.3` is on PyPI, then the GitHub tag for `mypackage==1.2.3` must point at the same code.
>
> PyPI does its part automatically: once a version is uploaded, you cannot upload different files for that same version. GitHub tags are easier to move by accident, so we have to be careful. Do not move or recreate a tag for a version that is already on PyPI. If a shipped release needs a fix, ship a new version.
>
> Why it matters: if PyPI and GitHub disagree, different users can install different code for the same version without knowing it. See [Why one version = one artifact](#why-one-version--one-artifact) at the end of this section.

### Case A — Release failed before PyPI publish

The release-please PR was merged, but the release workflow failed before publishing anything. PyPI does not have the package yet, and no GitHub release was created.

Because nothing was published, you still get to decide what eventually goes out as this version. The fix:

1. **Figure out why the release failed.** Look at the workflow run logs.
2. **Open a PR with the fix.** Use a `hotfix(<scope>): <description>` title so it doesn't trigger another release PR update. Merge it to `main`.
   - Important: leave `pyproject.toml`'s version exactly as the release-please PR set it. The hotfix should only fix the problem that broke the release.
