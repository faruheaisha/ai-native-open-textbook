---
title: "Vercel Deploy"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Vercel Deploy

Lesson 3 · **Deploy** · `$vercel-deploy`

Deploy an approved and tested committed web project to a Vercel preview and verify provider identity, commit, status and actual URL. Use for publishing a website preview; production needs separate approval, and feature building or browser QA belong to other skills.

Sample Codex prompt:

> Use $vercel-deploy to inspect this course project's prerequisites without making provider requests. Verify the current source, committed revision and matching passing Build/Test records. If the instructor has supplied a real Vercel demo project and deployment id, read back that exact preview and page; stop for missing access and request explicit approval before any deployment.

## Prerequisites

Requires the course foundation (PR #222), Python 3.10+, and the sibling Lesson 3 packages. Build needs Node.js; Test needs the pinned Playwright/Chromium environment; actual Deploy needs instructor-provisioned Vercel access. Run commands from the handbook root. On Windows, use `python` or `py` instead of `python3` as appropriate.

## Five-minute quickstart

After Build and Test, replace `TEST_ID` below with the actual passing test id. This offline exercise reads local prerequisites, never contacts Vercel, and produces **no real preview URL**:

```bash
python3 skills/vercel-deploy/scripts/course_deploy.py prerequisites --project .local-state/course-site --test-id TEST_ID
```

Expect `needs_setup` (exit 1) for the uncommitted starter or missing provider link. Inspect each check and `provider_contacted: false`; these are setup findings, not a failed deployment. A ready local check still requires provider verification. `examples/readback-cases.json` explains the later provider outcomes.

For a real preview, the instructor supplies an existing Git-linked Vercel demo project, a reviewed commit, matching build/test records and its actual deployment id. Set `VERCEL_ACCESS_TOKEN` privately or use a protected `--vercel-token-file`; never paste the credential into a prompt. Substitute the angle-bracket values (they are placeholders, not runnable sample IDs):

```text
