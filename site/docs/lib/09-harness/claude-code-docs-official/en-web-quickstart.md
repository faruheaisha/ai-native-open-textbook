---
title: "Get started with Claude Code on the web"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/web-quickstart.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/web-quickstart.md"
sourceSha256: "54fca3b95788fb68bcb5692798c9b347415b513919d1c4513d64baf804178fe7"
pageSha256: "54fca3b95788fb68bcb5692798c9b347415b513919d1c4513d64baf804178fe7"
contentMode: "local-full"
zh: ""
---

# Get started with Claude Code on the web

> Run Claude Code in the cloud from your browser or phone. Connect a GitHub repository, submit a task, and review the PR without local setup.

  Claude Code on the web is in research preview for Pro, Max, and Team users, and for Enterprise users with premium seats or Chat + Claude Code seats.

Claude Code on the web runs on cloud infrastructure instead of your machine, Anthropic-managed by default. Submit tasks from [claude.ai/code](https://claude.ai/code) in your browser or the Claude mobile app.

You'll need a GitHub repository to [get started](#connect-github). Claude clones it into an isolated virtual machine, makes changes, and pushes a branch for you to review. Sessions persist across devices, so a task you start on your laptop is ready to review from your phone later.

Claude Code on the web works well for:

* **Parallel tasks**: run several independent tasks at once, each in its own session and branch, without managing multiple worktrees
* **Repos you don't have locally**: Claude clones the repo fresh every session, so you don't need it checked out
* **Tasks that don't need frequent steering**: submit a well-defined task, do something else, and review the result when Claude is done
* **Code questions and exploration**: understand a codebase or trace how a feature is implemented without a local checkout

For work that needs your local config, tools, or environment, running Claude Code locally or using [Remote Control](https://code.claude.com/docs/en/remote-control) is a better fit.

## How sessions run

The steps below describe Anthropic-hosted sessions. In a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments), the clone and everything after it run on your organization's own runners, where network boundaries, setup, and push behavior are operator-configured. When you submit a task:

1. **Clone and prepare**: your repository is cloned to an Anthropic-managed VM, and your [setup script](https://code.claude.com/docs/en/cloud-environments#setup-scripts) runs if configured.
2. **Configure network**: internet access is set based on your environment's [access level](https://code.claude.com/docs/en/cloud-environments#access-levels).
3. **Work**: Claude analyzes code, makes changes, runs tests, and checks its work. You can watch and steer throughout, or step away and come back when it's done.
4. **Push the branch**: when Claude reaches a stopping point, it pushes its branch to GitHub. You review the diff, leave inline comments, create a PR, or send another message to keep going.

The session doesn't close when the branch is pushed. PR creation and further edits all happen within the same conversation.

## Compare ways to run Claude Code

Claude Code behaves the same everywhere. What changes is where code executes and whether your local config is available. The Desktop app offers both local and cloud sessions, so its answers below depend on which you choose:

|                                              | On the web                                                                                                     | Remote Control             | Terminal CLI           | Desktop app                 |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------- | :--------------------- | :-------------------------- |
| **Code runs on**                             | Cloud VM, Anthropic-managed by default                                                                         | Your machine               | Your machine           | Your machine or cloud VM    |
| **You chat from**                            | claude.ai or mobile app                                                                                        | claude.ai or mobile app    | Your terminal          | The Desktop UI              |
| **Uses your local config**                   | No, repo only                                                                                                  | Yes                        | Yes                    | Yes for local, no for cloud |
| **Requires GitHub**                          | Yes, or [bundle a local repo](https://code.claude.com/docs/en/claude-code-on-the-web#send-local-repositories-without-github) via `--cloud` | No                         | No                     | Only for cloud sessions     |
| **Keeps running if you disconnect**          | Yes                                                                                                            | While terminal stays open  | No                     | Depends on session type     |
| **[Permission modes](https://code.claude.com/docs/en/permission-modes)** | Accept edits, Plan, Auto                                                                                       | Manual, Accept edits, Plan | All modes              | Depends on session type     |
| **Network access**                           | Configurable per environment                                                                                   | Your machine's network     | Your machine's network | Depends on session type     |

See the [terminal quickstart](https://code.claude.com/docs/en/quickstart), [Desktop app](https://code.claude.com/docs/en/desktop), or [Remote Control](https://code.claude.com/docs/en/remote-control) docs to set those up.

## Connect GitHub

Connecting GitHub is a one-time step. If you already use the GitHub CLI, you can [do this from your terminal](#connect-from-your-terminal) instead of the browser.

  On Team and Enterprise plans, the **Sign in with GitHub** step works only after an [Owner](https://code.claude.com/docs/en/server-managed-settings#access-control) of your Claude organization turns on the GitHub connector at [**Admin settings > Connectors**](https://claude.ai/admin-settings/connectors). Until then, that step shows "GitHub access is required for Claude Code on the web" instead of a sign-in button. After the connector is on, reload [claude.ai/code](https://claude.ai/code) and start again from the first step. A second toggle, [Quick web setup](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options) at [**Admin settings > Claude Code**](https://claude.ai/admin-settings/claude-code), is optional: with it on, `/web-setup` works and onboarding creates the environment for members.

    Go to [claude.ai/code](https://claude.ai/code) and sign in with your claude.ai account. On macOS or Windows, the first screen offers the Claude Code desktop app and other ways to install Claude Code. To stay in the browser, click **Continue on web** at the bottom of the page.

    After you sign in, claude.ai/code prompts you to connect GitHub. Follow the prompt, and claude.ai/code sends you to GitHub's authorization page. Approve the authorization request, and GitHub returns you to claude.ai/code. Cloud sessions work with existing GitHub repositories and can reach any repository your GitHub account can see. To start a new project, [create an empty repository on GitHub](https://github.com/new) first.

    When Quick web setup is off, which it is by default on Team and Enterprise plans, claude.ai/code then asks you to install the Claude GitHub App on your repositories unless it's already installed. Install it if you want [Auto-fix](https://code.claude.com/docs/en/claude-code-on-the-web#auto-fix-pull-requests), which lets Claude respond to CI failures and review comments on pull requests in those repositories; otherwise click **Skip**. Either way, sessions can reach the same repositories.

    A [cloud environment](https://code.claude.com/docs/en/cloud-environments) is the saved configuration that controls what network access Claude has during sessions and what runs when a session starts. What happens after you connect GitHub depends on your plan:

    * **Pro and Max**: onboarding creates an environment named **Default** for you.
    * **Team and Enterprise**: onboarding shows a **Create your first cloud environment** form. Leave the prefilled name and network access unchanged and click **Create & finish** to create the **Default** environment. If an Owner has turned on [Quick web setup](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options), onboarding creates **Default** for you instead.

    **Default** uses [`Trusted` network access](https://code.claude.com/docs/en/cloud-environments#access-levels): sessions reach [common package registries](https://code.claude.com/docs/en/cloud-environments#default-allowed-domains) and other allowlisted domains, and nothing else through the session's network. See [Installed tools](https://code.claude.com/docs/en/cloud-environments#installed-tools) for what's available without any configuration.

    For a first project, the **Default** environment works as is. To change its network access, add environment variables, or run a [setup script](https://code.claude.com/docs/en/cloud-environments#setup-scripts) before sessions start, [edit it or create additional environments](https://code.claude.com/docs/en/cloud-environments#configure-your-environment).

### Connect from your terminal

If you already use the GitHub CLI (`gh`), you can set up Claude Code on the web without opening a browser. This requires the [Claude Code CLI](https://code.claude.com/docs/en/quickstart). When you run `/web-setup`, Claude Code reads your local `gh` token, links it to your claude.ai account, and creates the **Default** cloud environment if you don't have one. On Team and Enterprise plans, `/web-setup` is available only after an Owner turns on [Quick web setup](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options).

  Organizations with [Zero Data Retention](https://code.claude.com/docs/en/zero-data-retention) enabled cannot use `/web-setup` or other cloud session features. If the GitHub CLI isn't installed or isn't authenticated, Claude Code opens the browser onboarding flow instead.

    In your shell, authenticate the GitHub CLI if you haven't already:

    ```bash theme=\{null\}
    gh auth login
    ```

    In the Claude Code CLI, run `/login` to sign in with your claude.ai account. Skip this step if you're already signed in with a claude.ai account. Authenticating with an API key doesn't count. To check, run `/status` and confirm the **Login method** row shows a claude.ai account.

    In the Claude Code CLI, run:

    ```text theme=\{null\}
    /web-setup
    ```
