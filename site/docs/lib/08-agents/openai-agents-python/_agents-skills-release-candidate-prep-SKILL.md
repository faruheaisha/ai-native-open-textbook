---
title: "Release Candidate Preparation"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/skills/release-candidate-prep/SKILL.md"
sourceRel: ".agents/skills/release-candidate-prep/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/skills/release-candidate-prep/SKILL.md"
sourceSha256: "25018e5328f4066ae9943183bda184552ddd2307ce628797f9f50963e17644b5"
pageSha256: "25018e5328f4066ae9943183bda184552ddd2307ce628797f9f50963e17644b5"
contentMode: "local-full"
zh: ""
---

# Release Candidate Preparation

Use this skill only when the user explicitly invokes `$release-candidate-prep` and supplies a release version without a leading `v`, for example `VERSION=0.20.1`. This skill replaces the removed GitHub Actions release-PR creator with a reviewed local workflow.

## Non-negotiable boundaries

- Treat explicit invocation as authorization to fetch `origin/main`, create one dedicated detached release worktree, run branch-free release-readiness gates there, create or replace the local `release/v<version>` in that worktree only after those gates pass, update the three release-owned files, and create one local commit. If the branch already exists locally or remotely, the required final local state is still exact current `origin/main` plus only the new release commit; an existing local branch may be replaced only when it is not checked out in another worktree.
- Keep the user's source checkout on its existing clean `main` commit. Do not fast-forward it, switch its branch, or materialize release files there. Leave the dedicated release worktree in place for green handoff, blocked review, or recoverable failure.
- Never push, open or edit a pull request, add labels or milestones, create a release, or otherwise mutate GitHub. Never run `gh`.
- Own exactly `pyproject.toml`, `uv.lock`, and `tests/fixtures/released_api_contract.json`. Runtime, documentation, workflow, or other repository changes must land on `main` before release preparation.
- Do not stash, delete, overwrite or remove an existing worktree, or work around unrelated local changes. Fail before branch creation when the initial checkout is dirty or is not on `main`, the dedicated worktree is not clean and detached at refreshed `origin/main`, an existing local release branch is checked out in another worktree, the prospective packaged-contract gate fails after the allowed dependency-bootstrap recovery, the planning review blocks, or `origin/main` advances after those gates run.
- Treat `$final-release-review` as the controlling release checker, not only as a report generator. Its planning gate must be green before branch creation, and its final-candidate gate must inspect the materialized worktree and be green before PR-ready handoff. Any candidate content, commit, or base change invalidates the previous green result.
- Remove inherited `OPENAI_API_KEY` from every child command. Release preparation does not require a live OpenAI API request.
- Stop after the local commit, final release review, and copy-ready handoff. The user owns the push and pull-request creation.

## 1. Establish the release input

Require one semver-like version without a leading `v`. Do not infer a version from milestones, branch names, or local modifications. Announce that the skill will create and retain a dedicated release worktree with one local commit, keep the source checkout unchanged, and not write to GitHub.

Read `$final-release-review` completely before starting. Its final-candidate report is the release pull request description. Do not use `$pr-draft-summary` for the release candidate itself; this skill owns the fixed release branch, commit subject, title, and description. Continue to use `$pr-draft-summary` normally when implementing changes to this skill or other repository behavior.

## 2. Create an isolated branch-free preflight input

From the repository root, run:

```bash
