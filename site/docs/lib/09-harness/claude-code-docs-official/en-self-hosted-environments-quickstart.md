---
title: "Self-hosted environments quickstart"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments-quickstart.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments-quickstart.md"
sourceSha256: "e6e70c877cc20278dced5c63fc014f033650c51e0de6cccf1d8165bdd72e0d8b"
pageSha256: "e6e70c877cc20278dced5c63fc014f033650c51e0de6cccf1d8165bdd72e0d8b"
contentMode: "local-full"
zh: ""
---

# Self-hosted environments quickstart

> Set up your first self-hosted environment: install Claude Code, create the environment, start a runner, and route a session to it.

  Self-hosted environments are in public beta on Team and Enterprise plans; [Availability and limitations](https://code.claude.com/docs/en/self-hosted-environments#availability-and-limitations) covers the enablement path. This page gets your first session running; see [Self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments) for what they are and [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy) for hardening and fleet recipes.

A [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) runs Claude Code [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) on infrastructure your organization operates, executed by runner processes you deploy. This quickstart stands up your first one, the smallest that works: one runner on a single host, running one test session. There are two steps: [create the environment, start a runner, and route a session to it](#set-up-an-environment-and-runner), then [message that session from your terminal](#send-a-follow-up-message-to-a-running-session). You'll move between two surfaces: claude.ai for creating the environment, checking its status, and routing a session, and a terminal on the host for everything the runner does.

By the end you'll have an environment on the [**Cloud environments** admin page](https://claude.ai/admin-settings/cloud-environments), a runner polling for work, and a session running on your host. Before you connect real repositories or internal systems, work through [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy), which covers the security posture, egress control, git credentials, and orchestration.

## Prerequisites

### Organization and roles

The claude.ai side needs:

* **Allow self-hosted environments** turned on by an [Owner](https://code.claude.com/docs/en/cloud-environments#organization-shared-environments) on the [**Cloud environments** admin page](https://claude.ai/admin-settings/cloud-environments); the **New** button doesn't appear until it is. If you don't hold the role, someone who does can create the environment and hand you its secret; the runner and terminal steps on this page need no claude.ai role, and where a step checks status in the admin UI, the runner's own log lines give you the same signal.
* A [GitHub connection](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options) for your organization, so developers can pick repositories when they start sessions.

### Host and network

The runner host needs:

* A Linux or macOS host or container with outbound HTTPS to `api.anthropic.com`, to `claude.ai` and the download hosts it redirects to for the install step below, and to your git host for the clone; the [network requirements table](https://code.claude.com/docs/en/self-hosted-environments-deploy#network-requirements) has the full list. Windows isn't supported as a runner host; run the runner in a Linux container instead. Developer workstations aren't affected, since sessions start from claude.ai in a browser.
* A clock synchronized to real time, for example with NTP. Authentication fails when the clock is more than five minutes off; see [Troubleshooting](https://code.claude.com/docs/en/self-hosted-environments-deploy#troubleshooting).

### Software on the runner host

Install on the host before you start:

* **Claude Code v2.1.224 or later**, with any of the [standard install methods](https://code.claude.com/docs/en/setup). The runner is part of the standard `claude` binary, and earlier versions don't recognize the `self-hosted-runner` subcommand. The native installer's default `latest` channel carries each release as soon as it's published; the `stable` channel, the Homebrew `claude-code` cask, and the stable apt, dnf, and apk repositories trail by about a week. To pin the exact version your fleet runs, see [Install a specific version](https://code.claude.com/docs/en/setup#install-a-specific-version). For container images, see the Dockerfile in [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy#build-the-runner-image).
* **Git 2.24 or newer**. Some git options on the deploy page need newer versions; [Configure git](https://code.claude.com/docs/en/self-hosted-environments-deploy#configure-git) states each floor.

Confirm the host is ready:

```bash theme={null}
claude self-hosted-runner --help
```

A ready host prints the runner's usage text, listing flags such as `--environment-secret-file`. On versions older than 2.1.224, the command prints the general `claude --help` output instead; upgrade with `claude update` or reinstall from the `latest` channel.

## Set up an environment and runner

Claude Code includes a guided setup: an interactive Claude Code session that walks you through creating the environment in the admin UI, starts a local runner with the secret file you save, confirms that the runner registers, and writes a cheat sheet to `./runner-setup/CHEAT-SHEET.md`. Run it on a machine where you've signed in with `claude auth login` using an account that holds an Owner role; it isn't available with API keys or third-party model providers. On hosts where an interactive session isn't possible, use the manual steps below instead. Confirm the [version check](#software-on-the-runner-host) passed first: on versions older than 2.1.224, this command starts an ordinary Claude session with the words as the prompt instead of the guided setup. To start the guided setup, run the setup subcommand and follow the prompts:

```bash theme={null}
claude self-hosted-runner setup
```

To set up manually instead:

    Go to the [**Cloud environments** page](https://claude.ai/admin-settings/cloud-environments) in admin settings. Under **Self-hosted environments**, select **New**, name the environment, and select **Create**. On the wizard's second step, select **Copy environment key** to copy the environment secret, which the admin UI labels an environment key. claude.ai shows the secret once, and you can't retrieve it later; it expires 365 days after creation. The environment's `ccpool_...` ID stays visible in its detail dialog; you'll need it for the `aud` check in [token verification](https://code.claude.com/docs/en/self-hosted-environments-identity) and for dispatching [test sessions from CI](https://code.claude.com/docs/en/self-hosted-environments-testing#run-the-test-loop).

    If you lose the secret or need to rotate it, create a new secret from the environment's **Configuration** tab, roll the new secret out to your runners, then revoke the old one. Runners holding a revoked secret fail their next authenticated poll and exit, logging `poll auth failed`, and your orchestrator restarts them with the new secret.

    Create the secret directory. This step and the next need root for the `/etc/claude` path; any path the runner process can read works, so adjust both commands and the `--environment-secret-file` value together if you use a different one.

    ```bash theme=\{null\}
    mkdir -p /etc/claude
    ```

    Write the environment secret to a file. The command below reads from your terminal so the secret stays out of shell history: paste the value you copied, press Enter, then Ctrl-D, and the subshell's `umask` makes the file readable only by its owner.

    ```bash theme=\{null\}
    (umask 077 && cat > /etc/claude/environment-secret)
    ```
