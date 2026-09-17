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
pageSha256: "d2f3ae8026809624bac6dd86f4659040fdf77a08a24022b8a33d8b5607b8bbd5"
contentMode: "local-full"
zh: ""
---

## Setup scripts

A setup script is a Bash script that runs when a new cloud session starts, before Claude Code launches. Use setup scripts to install dependencies, configure tools, or fetch anything the session needs that isn't pre-installed.

Scripts run as root on Ubuntu 24.04, so `apt install` and most language package managers work.

To add a setup script, open the environment settings dialog and enter your script in the **Setup script** field.

This example installs [ShellCheck](https://www.shellcheck.net/), which isn't pre-installed.

```bash theme={null}
#!/bin/bash
apt update && apt install -y shellcheck
```

### Script requirements

A setup script has three constraints to write around:

* **Exit zero**: if the script exits non-zero, the session fails to start. Append `|| true` to non-critical commands so an intermittent install failure doesn't block the session.
* **Finish within five minutes**: keep the script's total runtime under roughly five minutes so the [environment cache](#environment-caching) can build. Run independent installs in parallel with `&` and `wait`, and move any single download that won't fit into a [SessionStart hook](#setup-scripts-vs-sessionstart-hooks) that launches it in the background.
* **Network access for installs**: package installs need to reach registries. The default **Trusted** level covers [common package registries](#default-allowed-domains) including npm, PyPI, RubyGems, and crates.io; with **None** network access, installs fail.

### Environment caching

The setup script runs the first time you start a session in an environment. After it completes, Anthropic snapshots the filesystem and reuses that snapshot as the starting point for later sessions. New sessions start with your dependencies, tools, and Docker images already on disk, and skip the setup script step. This keeps startup fast even when the script installs large toolchains or pulls container images.

The cache is a filesystem snapshot, so it keeps what the setup script writes to disk and loses anything that was only running. Packages you install, Docker images you pull, and files you write all carry over. A database the script started, a `docker compose up` stack, or any other background process doesn't; start those per session by asking Claude or with a [SessionStart hook](#setup-scripts-vs-sessionstart-hooks).

The setup script runs again to rebuild the cache when you change the environment's setup script or allowed network hosts, and when the cache reaches its expiry after roughly seven days. Resuming an existing session never re-runs the setup script.

You don't need to enable caching or manage snapshots yourself.

### Setup scripts vs. SessionStart hooks

Use a setup script to provision the VM itself: toolchains and CLI tools that aren't [pre-installed](#installed-tools). Use a [SessionStart hook](https://code.claude.com/docs/en/hooks#sessionstart) for project setup that should run everywhere, cloud and local, like `npm install`.

Setup scripts and SessionStart hooks run in a fixed order when a cloud session starts. The table compares where you configure them, when they run, and where they run.

|                              | Setup scripts                                                                                                                                                               | SessionStart hooks                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Where you configure them** | The environment dialog at [claude.ai/code](https://claude.ai/code), plus the **Cloud environments** admin page for [shared environments](#organization-shared-environments) | A [settings file](https://code.claude.com/docs/en/settings#where-settings-live) such as your repo's `.claude/settings.json`; see [What carries over from your setup](#what-carries-over-from-your-setup) for which files reach a cloud session |
| **When they run**            | Before Claude Code launches, skipped when a [cached environment](#environment-caching) exists                                                                               | After Claude Code launches, on every session including resumed                                                                                                                                                     |
| **Where they run**           | Cloud sessions only                                                                                                                                                         | Local and cloud sessions                                                                                                                                                                                           |

If you have SessionStart hooks in your user-level `~/.claude/settings.json`, don't expect them in the cloud. User-level settings stay on your machine. Which other hooks run depends on where the session runs:

* **Anthropic-hosted environment**: Claude Code runs hooks from the repository and from your organization's [server-managed settings](https://code.claude.com/docs/en/server-managed-settings).
* **[Self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments-configuration#permissions-and-tool-approval)**: Claude Code also runs the hooks the operator seeded from the runner host's `~/.claude/`, and the hooks in the runner image's managed settings file when that file is one of the [managed sources Claude Code applies](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources).

### Install dependencies with a SessionStart hook

To install dependencies only in cloud sessions, pair a SessionStart hook with a script that checks where it's running.

First, add a SessionStart hook to your repo's `.claude/settings.json`. This configuration tells Claude Code to run `scripts/install_pkgs.sh` from your repository whenever a session starts or resumes:

```json theme={null}
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$CLAUDE_PROJECT_DIR\"/scripts/install_pkgs.sh"
          }
        ]
      }
    ]
  }
}
```

The `matcher` limits the hook to the `startup` and `resume` events, and `$CLAUDE_PROJECT_DIR` resolves to the repository root, so the hook finds the script regardless of the session's working directory.

Next, create the script at `scripts/install_pkgs.sh`. It exits immediately outside the cloud, then installs your dependencies:

```bash theme={null}
#!/bin/bash

if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

npm install
pip install -r requirements.txt
exit 0
```

The `CLAUDE_CODE_REMOTE` check is what scopes the install to cloud sessions: the session VM's environment carries that variable as `true`, it's never `true` locally, so on your laptop the script exits before installing anything.

Together, the two files give every cloud session a fresh `npm install` and `pip install` at startup while leaving local sessions untouched.

#### Limitations in cloud sessions

SessionStart hooks behave the same in the cloud as locally, with these caveats:

* **No cloud-only scoping**: hooks run in both local and cloud sessions. To skip local execution, check the `CLAUDE_CODE_REMOTE` environment variable as shown above.
* **Requires network access**: install commands need to reach package registries. If your environment uses **None** network access, these hooks fail. The [default allowlist](#default-allowed-domains) under **Trusted** covers npm, PyPI, RubyGems, and crates.io.
* **Proxy compatibility**: in Anthropic-hosted environments, all outbound traffic passes through a [security proxy](#security-proxy), and some package managers don't work correctly with it; Bun is a known example. In a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments-deploy#default-deny-egress), outbound traffic goes through your own network boundary instead.
* **Adds startup latency**: hooks run each time a session starts or resumes, unlike setup scripts which benefit from [environment caching](#environment-caching). Keep install scripts fast by checking whether dependencies are already present before reinstalling.

To customize the base image, use a setup script to install what you need on top of the [provided image](#installed-tools), or run your own image as a container alongside Claude with `docker compose`. Replacing the base image entirely isn't supported yet.
