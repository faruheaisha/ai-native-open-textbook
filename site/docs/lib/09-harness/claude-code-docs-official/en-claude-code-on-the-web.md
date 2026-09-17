---
title: "Use Claude Code on the web"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-code-on-the-web.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-code-on-the-web.md"
sourceSha256: "45891d4a8de6a48a925c31908887ed5ecd6fd85e439f410be3de52165a78c18f"
pageSha256: "45891d4a8de6a48a925c31908887ed5ecd6fd85e439f410be3de52165a78c18f"
contentMode: "local-full"
zh: ""
---

# Use Claude Code on the web

> Move sessions between web and terminal with `--cloud` and `--teleport`, manage and share sessions, and auto-fix pull requests from the cloud.

  Claude Code on the web is in research preview for Pro, Max, and Team users, and for Enterprise users with premium seats or Chat + Claude Code seats.

Claude Code on the web runs tasks on Anthropic-managed cloud infrastructure at [claude.ai/code](https://claude.ai/code), or on your organization's [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) when routed there. Sessions persist even if you close your browser, and you can monitor them from the Claude mobile app.

  New to Claude Code on the web? Start with [Get started](https://code.claude.com/docs/en/web-quickstart) to connect your GitHub account and submit your first task.

This page covers the web product itself:

* [Cloud environments](#cloud-environments): where sessions run, and where to configure that
* [GitHub authentication options](#github-authentication-options): two ways to connect GitHub
* [Move tasks between web and terminal](#move-tasks-between-web-and-terminal) with `--cloud` and `--teleport`
* [Work with sessions](#work-with-sessions): permission modes, reviewing, sharing, archiving, deleting
* [Auto-fix pull requests](#auto-fix-pull-requests): respond automatically to CI failures and review comments
* [Security and isolation](#security-and-isolation): how sessions are isolated
* [Limitations](#limitations): rate limits and platform restrictions

## Cloud environments

Every cloud session runs in a [cloud environment](https://code.claude.com/docs/en/cloud-environments), the saved configuration that controls network access, environment variables, and setup scripts. If you don't have an environment yet, onboarding sets up a **Default** environment with [**Trusted** network access](https://code.claude.com/docs/en/cloud-environments#access-levels), either by creating it for you or by asking you to create it. See [The Default environment](https://code.claude.com/docs/en/cloud-environments#the-default-environment) for which of those happens on your plan and how sessions choose an environment when you have more than one.

The same environments apply wherever you start a cloud session: the web, the terminal, [Claude Tag](https://claude.com/docs/claude-tag/overview), [routines](https://code.claude.com/docs/en/routines), and the mobile and Desktop apps. Claude Tag channel sessions use organization-level environments only, either [shared environments](https://code.claude.com/docs/en/cloud-environments#organization-shared-environments) or [self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments).

See [Configure cloud environments](https://code.claude.com/docs/en/cloud-environments) to change what an environment allows, set variables, or add a setup script, and [Installed tools](https://code.claude.com/docs/en/cloud-environments#installed-tools) for what sessions include without any configuration.

## GitHub authentication options

Cloud sessions need access to your GitHub repositories to clone code and push branches. You can grant access in two ways:

| Method           | How it works                                                                                | Best for                                                                |
| :--------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| **GitHub App**   | Authorize the Claude GitHub App during [web onboarding](https://code.claude.com/docs/en/web-quickstart).                | Browser onboarding; teams that want [Auto-fix](#auto-fix-pull-requests) |
| **`/web-setup`** | Run `/web-setup` in your terminal to sync your local `gh` CLI token to your Claude account. | Individual developers who already use `gh`                              |

  With either method, a cloud session can access any repository the connecting GitHub account can see, not just the repositories the Claude GitHub App is installed on. App installation enables PR webhooks for [Auto-fix](#auto-fix-pull-requests); it is not a session-level access control. To restrict which repositories your team can reach from cloud sessions, restrict access on GitHub itself, for example by limiting team or repository membership for the connected GitHub accounts.

Either method works. For how `/schedule` checks that access before creating a routine, see [Repositories and branch permissions](https://code.claude.com/docs/en/routines#repositories-and-branch-permissions). See [Connect from your terminal](https://code.claude.com/docs/en/web-quickstart#connect-from-your-terminal) for the `/web-setup` walkthrough.

Quick web setup is an organization setting that lets members connect GitHub with `/web-setup`, skips the Claude GitHub App install prompt during browser onboarding, and has browser onboarding create the [**Default** environment](https://code.claude.com/docs/en/cloud-environments#the-default-environment) for them instead of showing the environment form. On Team and Enterprise plans it's off by default, which hides `/web-setup`. An [Owner](https://code.claude.com/docs/en/server-managed-settings#access-control) turns it on with the **Quick web setup** toggle at [**Admin settings > Claude Code**](https://claude.ai/admin-settings/claude-code).

  Organizations with [Zero Data Retention](https://code.claude.com/docs/en/zero-data-retention) enabled can't use `/web-setup` or other cloud session features.

## Move tasks between web and terminal

These workflows require the [Claude Code CLI](https://code.claude.com/docs/en/quickstart) signed in to the same claude.ai account. You can start new cloud sessions from your terminal, or pull cloud sessions into your terminal to continue locally. Cloud sessions persist even if you close your laptop, and you can monitor them from anywhere including the Claude mobile app.

  From the CLI, session handoff is one-way: you can pull cloud sessions into your terminal with `--teleport`, but you can't push an existing terminal session to the web. The `--cloud` flag with a task description creates a new cloud session for your current repository; with `-p` and a session ID or claude.ai/code URL it instead [queues a message into that existing session](https://code.claude.com/docs/en/claude-code-on-the-web#send-follow-ups-from-the-cli). The [Desktop app](https://code.claude.com/docs/en/desktop#continue-in-another-surface) provides a Continue in menu that can send a local session to the web.

### From terminal to web

Start a cloud session from the command line with the `--cloud` flag:

```bash theme={null}
claude --cloud "Fix the authentication bug in src/auth/login.ts"
```

This creates a new cloud session on claude.ai. The cloud VM clones your current directory's GitHub remote at your current branch, not your local checkout, so push first if you have local commits. `--cloud` works with a single repository at a time. The task runs in the cloud while you continue working locally. The older `--remote` spelling still works as a deprecated alias for `--cloud`.

While the cloud container starts, the CLI shows a live checklist of setup steps, such as cloning the repository and running your [setup script](https://code.claude.com/docs/en/cloud-environments#setup-scripts). It queues messages you type during provisioning and sends them once the session is ready.

  `--cloud` creates cloud sessions. `--remote-control` is unrelated: it exposes a local CLI session for monitoring from the web. See [Remote Control](https://code.claude.com/docs/en/remote-control).

Use `/tasks` in the Claude Code CLI to check progress, or open the session on claude.ai or the Claude mobile app to interact directly. From there you can steer Claude, provide feedback, or answer questions as in any other conversation.

If Claude asks a question and the session sits idle, you can still answer when you come back, up to [environment expiry](#environment-expired), and the session continues from your answer.

#### Tips for cloud tasks

**Plan locally, execute remotely**: for complex tasks, start Claude in plan mode to collaborate on the approach, then send work to the cloud:

```bash theme={null}
claude --permission-mode plan
```

In plan mode, Claude reads files, runs commands to explore, and proposes a plan without editing source code. Once you're satisfied, save the plan to the repo, commit, and push so the cloud VM can clone it. Then start a cloud session for autonomous execution:

```bash theme={null}
claude --cloud "Execute the migration plan in docs/migration-plan.md"
```

**Run tasks in parallel**: each `--cloud` command creates its own cloud session that runs independently. You can start multiple tasks and they'll all run simultaneously in separate sessions:

```bash theme={null}
claude --cloud "Fix the flaky test in auth.spec.ts"
claude --cloud "Update the API documentation"
claude --cloud "Refactor the logger to use structured output"
```

Monitor all sessions with `/tasks` in the Claude Code CLI. When a session completes, you can create a PR from the web interface or [teleport](#from-web-to-terminal) the session to your terminal to continue working.

#### Send local repositories without GitHub

When you run `claude --cloud` from a repository that isn't connected to GitHub, Claude Code bundles your local repository and uploads it directly to the cloud session. The bundle includes your full repository history across all branches, plus uncommitted changes to tracked files.

On macOS, Linux, and WSL, Claude Code leaves uncommitted changes to files named like credentials or keys out of the upload and names the files it left out. This covers `.env` files, Terraform `*.tfvars` files, and key files such as `id_rsa` and `*.pem`. The session starts with the committed version of each, or without the file if none is committed. In a linked worktree, submodule, or similar layout, Claude Code uploads these changes with the rest and names the files it uploads.

This fallback activates automatically when GitHub access isn't available. To force it even when GitHub is connected, set `CCR_FORCE_BUNDLE=1`:

```bash theme={null}
CCR_FORCE_BUNDLE=1 claude --cloud "Run the test suite and fix any failures"
```

Bundled repositories must meet these limits:

* The directory must be a git repository with at least one commit
* The bundled repository must be under 100 MB. Larger repositories fall back to bundling only the current branch, then to a single squashed snapshot of the working tree, and fail only if the snapshot is still too large
* Untracked files are not included; run `git add` on files you want the cloud session to see
* Sessions created from a bundle can't push back to a remote unless you also have [GitHub authentication](#github-authentication-options) configured

### Send follow-ups from the CLI

Once a cloud session is running, wherever it executes, send it a follow-up message from the `claude` CLI on any machine where you're logged in with `claude auth login`. The CLI authenticates with your Anthropic account credentials and sends no local session state, so the command doesn't need to run from the machine that started the session, and it's the same in every shell, including PowerShell.

The command posts one message and exits:

```bash theme={null}
