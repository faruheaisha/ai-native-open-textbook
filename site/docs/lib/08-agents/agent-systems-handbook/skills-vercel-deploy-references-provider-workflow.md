---
title: "Provider workflow"
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

# Provider workflow

Prefer the existing Git-linked Vercel flow. Use a dedicated demo project provisioned by the instructor before class, not the handbook website's production project. Read its README, project/team identity, Git connection, environment and baseline deployment. Creating a new provider project is outside the helper.

For a site copied to a separate Git repository, commit the intended files, then use Web Builder's `record` command with a reviewed JSON argv such as `["node", "--check", "app.js"]`. Run Test after any source/README/ignore-file changes so source fingerprints agree. `.git`, `.vercel`, dependency directories, environment files and course markers are excluded from the manifest. Secrets must still be excluded from the deployment bundle using the project's normal ignore rules; a metadata manifest is not a deployment-file filter.

A Git push is an external write: review and obtain authorization unless the user's existing request covers it. Do not change remote branches or protection settings to force a preview. Retrieve the actual Vercel deployment id from the provider, then run `verify` as shown in the README. Provider commit attribution is mandatory; if absent, fix the Git integration rather than fabricate a SHA.

The CLI fallback requires an installed, authenticated Vercel CLI and `.vercel/project.json`. This tool does not place tokens on the command line. The API verifier separately uses `VERCEL_ACCESS_TOKEN` or a private `--vercel-token-file`. Treat course API and Vercel credentials as different scopes.

```text
