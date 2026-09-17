---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/cloud-environments.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/cloud-environments.md"
sourceSha256: "29998b3dc2a851eaf60b64058c4be0d382bad76c81ed9bdb2cdcdfd5aca7b178"
pageSha256: "e72a591e0750acda1fd393ba71058c7647673bb78871cd892e90c39802abcc63"
contentMode: "local-full"
zh: ""
---

## What's available in cloud sessions

In Anthropic-hosted environments, each session gets a fresh virtual machine (VM) running Ubuntu 24.04 on x86\_64, regardless of your own operating system and CPU architecture, with your repository cloned and common toolchains pre-installed. When a dependency provides precompiled binaries, such as Ruby gems with native extensions or prebuilt Python wheels, use its x86\_64 Linux build to match the VM. This section covers the Anthropic-hosted defaults, the built-in GitHub tools, how to [run tests and services](#run-tests-start-services-and-add-packages), and the [resource limits](#resource-limits) each VM gets.

  Sessions your organization routes to a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) run on your own runners instead, with the tools your runner image provides.

### What carries over from your setup

Cloud sessions start from a fresh clone of your repository. Anything you commit to the repo is available. Anything you've installed or configured only on your own machine isn't available in the session. Your organization's policy arrives separately through [server-managed settings](https://code.claude.com/docs/en/server-managed-settings).

|                                                                                                                                                                                           | Available in cloud sessions                                      | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Your repo's `CLAUDE.md`                                                                                                                                                                   | Yes                                                              | Part of the clone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Your repo's `.claude/settings.json` hooks                                                                                                                                                 | Yes                                                              | Part of the clone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Your repo's `.mcp.json` MCP servers                                                                                                                                                       | Yes                                                              | Part of the clone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Your repo's `.claude/rules/`                                                                                                                                                              | Yes                                                              | Part of the clone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Your repo's `.claude/skills/`, `.claude/agents/`, `.claude/commands/`                                                                                                                     | Yes                                                              | Part of the clone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Plugins declared in `.claude/settings.json`                                                                                                                                               | Yes                                                              | Installed at session start from the [marketplace](https://code.claude.com/docs/en/plugin-marketplaces) you declared. Requires network access to reach the marketplace source                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Your organization's [server-managed settings](https://code.claude.com/docs/en/server-managed-settings)                                                                                                                | Yes                                                              | Fetched from Anthropic's servers when the session starts. See [Surface coverage](https://code.claude.com/docs/en/model-config#surface-coverage) for how `availableModels` is enforced in cloud sessions. Settings deployed to your device through MDM or managed settings files don't apply, because the session runs on an Anthropic-managed VM; in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments), sessions also read the managed settings file in the runner image, per [how Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) |
| Your user `~/.claude/CLAUDE.md`                                                                                                                                                           | No                                                               | Lives on your machine, not in the repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Your user `~/.claude/skills/`, `~/.claude/agents/`, `~/.claude/commands/`                                                                                                                 | No                                                               | Live on your machine, not in the repo. Commit them to the repo's `.claude/` directory instead. Cloud sessions automatically load skills you enable on claude.ai                                                                                                                                                                                                                                                                                                                                                                                                     |
| Plugins enabled only in your user settings                                                                                                                                                | No                                                               | User-scoped `enabledPlugins` lives in `~/.claude/settings.json`. Declare them in the repo's `.claude/settings.json` instead, or enable them for your claude.ai account so Claude Code loads them as [synced plugins](https://code.claude.com/docs/en/plugins-reference#synced-plugins)                                                                                                                                                                                                                                                                                                          |
| MCP servers you added with `claude mcp add` at the default local scope or the user scope                                                                                                  | No                                                               | Those write to `~/.claude.json` on your machine, not the repo. Add the server with `claude mcp add --scope project`, which writes the repo's [`.mcp.json`](https://code.claude.com/docs/en/mcp#project-scope), and commit that file                                                                                                                                                                                                                                                                                                                                                             |
| Transport variables in your repo's `.claude/settings.json` `env` block, such as `NODE_EXTRA_CA_CERTS` and the [mTLS client certificate variables](https://code.claude.com/docs/en/network-config#mtls-authentication) | No                                                               | The hosting environment manages the session's API connection, so Claude Code ignores these keys and notes each ignored key in the session's debug log                                                                                                                                                                                                                                                                                                                                                                                                               |
| API keys and tokens for services Claude calls                                                                                                                                             | On Pro and Max plans, as [API credentials](#add-api-credentials) | You add the key once on the environment and the agent proxy attaches it to requests for the hosts you list. A key the agent proxy [can't attach](#requests-that-never-get-the-credential), or any key on a Team or Enterprise plan, stays in an environment variable                                                                                                                                                                                                                                                                                                |
| Interactive auth like AWS SSO                                                                                                                                                             | No                                                               | Not supported. SSO requires browser-based login that can't run in a cloud session                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

To make your own configuration available in cloud sessions, commit it to the repo.

Anyone who uses the environment can read its environment variables and setup script. The dialog's note under **Environment variables** says so and warns against putting secrets there. On Pro and Max plans, store a key the agent proxy can attach as an [API credential](#add-api-credentials) instead.

### Installed tools

Cloud sessions come with common language runtimes, build tools, and databases pre-installed. The table below summarizes what's included by category.

| Category      | Included                                                                   |
| :------------ | :------------------------------------------------------------------------- |
| **Python**    | Python 3.x with pip, poetry, uv, black, mypy, pytest, ruff                 |
| **Node.js**   | 20, 21, and 22, with npm, yarn, pnpm, bun¹, eslint, prettier, chromedriver |
| **Ruby**      | 3.1, 3.2, 3.3 with gem, bundler, rbenv                                     |
| **PHP**       | 8.3 with Composer                                                          |
| **Java**      | OpenJDK 21 with Maven and Gradle                                           |
| **Go**        | Go with module support                                                     |
| **Rust**      | rustc and cargo                                                            |
| **C/C++**     | GCC, Clang, cmake, ninja, conan                                            |
| **Docker**    | docker, dockerd, docker compose                                            |
| **Databases** | PostgreSQL 16, Redis 7.0                                                   |
| **Utilities** | git, gh, jq, yq, ripgrep, tmux, vim, nano                                  |

¹ Bun is installed but has known [proxy compatibility issues](#install-dependencies-with-a-sessionstart-hook) for package fetching.

To get the versions of most of the tools in this table, ask Claude to run `check-tools` in a cloud session. It's a shell command installed on the session VM, not a slash command; you ask Claude because [Claude runs all VM commands for you](#run-tests-start-services-and-add-packages). For a tool it doesn't report, such as Ruby, PHP, bun, PostgreSQL, or Redis, ask Claude to run the tool's own version command, for example `psql --version`.

Node.js versions are installed at `/opt/node20`, `/opt/node21`, and `/opt/node22`, with 22 on `PATH` by default. To work with a different version, ask Claude to prepend that version's `bin` directory, such as `/opt/node20/bin`, to `PATH`.

Toolchains outside this list, such as the .NET SDK, aren't pre-installed even when their package registries are on the [default allowlist](#default-allowed-domains). Install them with a [setup script](#setup-scripts).

### Work with GitHub issues and pull requests

Cloud sessions include built-in GitHub tools that let Claude read issues, list pull requests, fetch diffs, and post comments without any setup. These tools authenticate through the [GitHub proxy](#github-proxy) using whichever method you configured under [GitHub authentication options](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options), so your token never enters the container.

You can set `GH_TOKEN` or `GITHUB_TOKEN` yourself in [environment settings](#set-environment-variables), or leave both unset and let the [GitHub proxy](#github-proxy) authenticate for you:

* If you set a token, it passes through to the container unchanged, so your scripts and GitHub's [`gh` CLI](https://cli.github.com) use it directly.
* If you set neither and the [GitHub proxy](#github-proxy) is handling authentication for your session, both variables read as the placeholder string `proxy-injected` in the commands Claude runs, and the proxy substitutes your real credentials on outbound GitHub requests. `gh` works without a token of your own, but a script that reads `GITHUB_TOKEN` directly gets the placeholder, not a usable token.

A token you set is an ordinary environment variable, so anyone who uses the environment can read it; the proxy path keeps the credential out of the environment configuration and the session VM.

To check which case applies to your session, ask Claude to run `echo $GH_TOKEN`.

GitHub's [`gh` CLI](https://cli.github.com) is pre-installed. If you need a `gh` command the built-in tools don't cover, like `gh release` or `gh workflow run`, ask Claude to run it. `gh` reads `GH_TOKEN` automatically, so you don't need to run `gh auth login`.

### Link output back to the session

Each cloud session has a transcript URL on claude.ai, and the session can read its own ID from the `CLAUDE_CODE_REMOTE_SESSION_ID` environment variable. Use this to put a traceable link in PR bodies, commit messages, Slack posts, or generated reports so a reviewer can open the run that produced them.

Commits that Claude creates in a cloud session include a `Claude-Session: <url>` git trailer, and PR bodies include the session URL on its own line. This requires v2.1.179 or later. To omit the trailer and the PR-body link, set [`attribution.sessionUrl`](https://code.claude.com/docs/en/settings-reference#attribution-sessionurl) to `false`. The setting requires v2.1.182 or later.

To include the session link in something other than a commit or PR, such as a Slack message Claude posts or a report file it writes, have Claude run the following command and use its output. The command converts the `cse_` prefix in the environment variable's value to the `session_` prefix that the transcript URL expects:

```bash theme={null}
echo "https://claude.ai/code/${CLAUDE_CODE_REMOTE_SESSION_ID/#cse_/session_}"
```

### Run tests, start services, and add packages

You don't get a shell into the session VM. Claude runs every command for you, so phrase the tasks in this section as requests in your prompt.

#### Run tests

Claude runs tests as part of working on a task. Ask for it in your prompt, like "fix the failing tests in `tests/`" or "run pytest after each change." Test runners that come with the [pre-installed toolchains](#installed-tools), like pytest and cargo test, work without additional setup. A runner your project declares as a dependency, like jest, installs with your dependencies.

#### Start services

PostgreSQL and Redis are pre-installed but not running by default. Ask Claude to start whichever you need; the commands it runs are:

```bash theme={null}
service postgresql start
```

```bash theme={null}
service redis-server start
```

Docker is available for running containerized services. Ask Claude to run `docker compose up` to start your project's services. Network access to pull images follows your environment's [access level](#access-levels), and the [Trusted defaults](#default-allowed-domains) include Docker Hub and other common registries.

If your images are large or slow to pull, add `docker compose pull` or `docker compose build` to your [setup script](#setup-scripts). The [environment cache](#environment-caching) keeps the pulled images, so each new session has them on disk. The cache stores files only, not running processes, so Claude still starts the containers each session.

#### Add packages

To add packages that aren't pre-installed, use a [setup script](#setup-scripts). The [environment cache](#environment-caching) keeps what the script installs, so packages you install there are available at the start of every session without reinstalling each time. You can also ask Claude to install packages mid-session, but those installs don't carry over to other sessions.

### Resource limits

Cloud sessions in Anthropic-hosted environments run with approximate resource ceilings that may change over time:

* 4 vCPUs
* 16 GB of RAM
* 30 GB of disk

The VM may stop tasks that need significantly more memory, such as large build jobs or memory-intensive tests. For workloads beyond these limits, use [Remote Control](https://code.claude.com/docs/en/remote-control) to run Claude Code on your own hardware, or run cloud sessions in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) on compute your organization operates.
