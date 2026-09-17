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
pageSha256: "5ca146b570eff3a89ee015b0c2925f1a2187cbd0f134538fb7ce1bda349b36df"
contentMode: "local-full"
zh: ""
---

## Configure your environment

Create, edit, and archive environments from the environment selector, which you reach at [claude.ai/code](https://claude.ai/code) after [web onboarding](https://code.claude.com/docs/en/web-quickstart), or from the prompt box in the [Desktop app](https://code.claude.com/docs/en/desktop#cloud-sessions). Environments you create are personal to your account; [shared environments](#organization-shared-environments) created by an Owner appear in the same selector. See [Installed tools](#installed-tools) for what's available without any configuration.

    On [claude.ai/code](https://claude.ai/code), select the cloud icon showing the current environment's name, in the row above the message box. There's no settings page or direct URL for the selector.

      <img src="https://mintcdn.com/claude-code/ZFId6l95856c5LSw/images/cloud-environment-selector.png?fit=max&auto=format&n=ZFId6l95856c5LSw&q=85&s=cc2813a5664519eaf5a89d793ce5af26" alt="The environment selector open above the message box at claude.ai/code. The cloud button showing the environment name Default sits in the row above the message box. The open menu lists a Local row with Download and Desktop only labels, a Cloud section where the Default environment is selected with a checkmark and shows a settings gear icon on hover, an Add cloud environment option, and a Remote Control section with setup instructions." width="1672" height="682" data-path="images/cloud-environment-selector.png" />

    Select **Add cloud environment**, or hover over an existing environment and select the settings icon that appears on the right. The dialog includes the name, network access level, environment variables, and setup script. When you edit an existing cloud environment on a Pro or Max plan, the dialog also includes [API credentials](#add-api-credentials).

      <img src="https://mintcdn.com/claude-code/ZFId6l95856c5LSw/images/cloud-environment-dialog.png?fit=max&auto=format&n=ZFId6l95856c5LSw&q=85&s=30d4478b31d1f879f7ee287ddab32505" alt="The New cloud environment dialog. A Name field with the placeholder Default, a Network access selector set to Trusted with links to the network policy and access levels, an Environment variables box showing .env-format placeholder text with a note that values are visible to anyone using the environment, a Setup script box described as a Bash script that runs when a new session starts before Claude Code launches, and Cancel and Create environment buttons." width="874" height="1372" data-path="images/cloud-environment-dialog.png" />
```
```

### Set environment variables

Environment variables use `.env` format, one `KEY=value` pair per line. Plain values don't need quotes, and if you quote a value with a matching pair, the quotes don't become part of the value. Quote a value that spans multiple lines or contains a `#`: in an unquoted value, `#` starts a comment and the rest of the line is dropped.

The following example defines three variables.

```text theme={null}
NODE_ENV=development
LOG_LEVEL=debug
DATABASE_URL=postgres://localhost:5432/myapp
```

Each session copies the environment's values once, at startup, into ordinary environment variables that any command Claude runs can read. Because running sessions don't re-read the configuration, editing or adding variables affects sessions you start afterward; sessions already running keep the values they started with.

Claude Code on the web also sets some variables itself when it starts a session. For [`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`](https://code.claude.com/docs/en/claude-code-on-the-web#manage-context), the value Claude Code on the web sets overrides one you add here, so adding that key here has no effect.

Anyone who uses the environment can read the values. On Pro and Max plans, use an [API credential](#add-api-credentials) instead for a key the agent proxy can attach to a request. The [requests that never get a credential](#requests-that-never-get-the-credential) are listed there.

### Add API credentials

An API credential is an API key or token you store on a cloud environment so Claude can call that API from any session in the environment without seeing the key. Anthropic's agent proxy adds the key to requests for the hosts you list, after each request leaves the session's VM. The key never reaches Claude, the commands it runs, or the session's environment variables.

API credentials are available on Pro and Max plans. They aren't available on Team or Enterprise plans yet, so the **API credentials** section doesn't appear in the environment dialog on those plans.

#### Requirements

Two of these decide whether you can add a credential, and two decide whether the agent proxy can use it once added:

* **Role**: an organization admin role in your claude.ai organization
  * On Team and Enterprise, Owners hold it and Admins don't
  * On Pro and Max, you hold it in your own organization
  * Without it, you see a note instead of the credential list, on your own environments too. Ask an Owner to add the credential to a shared environment and run your sessions there
* **Environment type**: an Anthropic-hosted cloud environment that already exists. A [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) doesn't have API credentials
* **API reachability**: the API accepts connections from the internet, because requests leave from Anthropic's network
* **Encryption keys**: if your organization uses customer-managed encryption keys, you can't save credentials

#### Add a credential

You add credentials one at a time from the editor of an environment that already exists. The dialog for a new environment doesn't offer them. There's no edit, either. To change a credential's hosts or value, delete it and add it again.

    [Open the environment for editing](#configure-your-environment) at [claude.ai/code](https://claude.ai/code). In the **Update cloud environment** dialog, find **API credentials** below **Environment variables**. You see the credentials already on the environment, each with the hosts it applies to.

    Select **Add credential** and fill in the form. Keep the default **Credential type**, **Bearer**, for an API key that travels in a request header, and fill in these fields:

    * **Name**: a label for the credential, such as `Internal billing API`
    * **Allowed websites**: the API's hosts, such as `api.example.com`. A leading `*.` matches every subdomain
    * **Custom headers**: one row for the header that carries the key. The row starts with `Authorization` as the header's **Name** and `Bearer` as its **Prefix**; paste the key itself as the **Value**. For a header like `X-Api-Key` that takes the bare value, change the name and clear the prefix

    For an API that authenticates another way, pick a different **Credential type**. The list is the same one [Claude Tag](https://claude.com/docs/claude-tag/overview), the Slack integration for Team and Enterprise plans, offers for [connections](https://claude.com/docs/claude-tag/admins/add-connections).

    Select **Connect**. The credential appears in the list with its hosts, saved without the dialog's **Save changes** button. You can't view the value again after saving.

To confirm the credential works, start a session in the environment and ask Claude to call the API, for example with `curl`. The API answers as if the key were in the request, and the key doesn't appear in the session's environment variables or in any file. If the list marks a credential **Not sent** instead, the note under it says why and what to do. Two credentials whose hosts overlap without matching exactly get no marker, and the agent proxy sends only one of them.

#### Which requests get the credential

The agent proxy attaches a credential to a request when the request's host matches one you listed on that credential. Sessions can reach those hosts even when the environment's [network access level](#access-levels) wouldn't otherwise allow them, except the [hosts that never get the credential](#requests-that-never-get-the-credential). The credential applies in every session that runs in the environment, whoever started it, until you delete it.

#### Requests that never get the credential

The agent proxy never attaches a credential you add to these requests:

* **GitHub**: the [GitHub proxy](#github-proxy) authenticates requests to GitHub instead, so you don't need an API credential for it
* **The Anthropic API and public package registries**: `api.anthropic.com`, `registry.npmjs.org`, `jsr.io`, `npm.jsr.io`, `pypi.org`, `files.pythonhosted.org`, `index.crates.io`, and `proxy.golang.org`
* **Setup script requests**: Claude Code connects to the agent proxy when it launches, after the [setup script](#setup-scripts) has run

### Select an environment from the CLI

Run `/remote-env` in your terminal to choose the default environment for cloud sessions you create from the CLI, such as [`claude --cloud`](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-web). The command opens a picker of your existing environments and saves your choice to the `remote.defaultEnvironmentId` key in your [user settings](https://code.claude.com/docs/en/settings#where-settings-live), so it applies in every project on your machine until you change it, unless the same key is set at a higher-precedence [settings layer](https://code.claude.com/docs/en/settings#settings-precedence), such as a repo's project settings.

A [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) ID, which has the form `ccpool_...`, follows a stricter source rule. See [`remote.defaultEnvironmentId`](https://code.claude.com/docs/en/settings-reference#remote-defaultenvironmentid) for the settings layers Claude Code honors it from.

`/remote-env` only sets the default: it doesn't start a session, and it can't add or edit environments. Manage them from the [environment selector](#configure-your-environment).

### Archive an environment

To archive an environment, open it for editing and select **Archive**. You can't delete an environment, only archive it.

Archiving affects new sessions, not running ones:

* Sessions already running in the environment continue to work.
* The environment disappears from the selector and from `/remote-env`, so you can't pick it for new sessions.
* API credentials on the environment stay attached in its running sessions. Delete any you no longer want before you archive.
* No new session can start in an archived environment, on any surface. If the environment was your saved [CLI default](#select-an-environment-from-the-cli), Claude Code starts CLI cloud sessions in the Anthropic-hosted environment when your list has one, and otherwise in the first environment in your list that isn't a [Remote Control bridge environment](#the-default-environment). Anything configured with the environment explicitly, such as a [routine](https://code.claude.com/docs/en/routines#environments-and-network-access), can't start new sessions in it. Point it at another environment.

### Organization-shared environments

On Team and Enterprise plans, an Owner can create cloud environments that are shared with every member of the organization. The same role manages everything else on the **Cloud environments** admin page, including [self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments); the Admin role can't open the page. The full list of roles that can open it is the one for [managing server-managed settings](https://code.claude.com/docs/en/server-managed-settings#access-control). Shared environments appear in each member's environment selector alongside their personal ones, so a team can standardize on one configuration instead of each member recreating it.

Create, edit, and archive shared environments from the **Cloud environments** page in [admin settings](https://claude.ai/admin-settings). A shared environment also opens from the [environment selector](#configure-your-environment) at [claude.ai/code](https://claude.ai/code): an Owner can edit it there. Other members see it read-only. Each shared environment has a name, a [network access level](#access-levels), [environment variables](#set-environment-variables) in `.env` format, and a [setup script](#setup-scripts). Owners choose the organization's [default environment](#the-default-environment) separately, at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code).

Every member's sessions in a shared environment read its variables, so don't include secrets in them. [API credentials](#add-api-credentials), which give sessions a key they can't read, aren't available on Team or Enterprise plans yet.

### Set the environment a Claude Tag channel uses

In [Claude Tag](https://claude.com/docs/claude-tag/overview) channels, Claude works as your organization's shared identity, not as any member, so channel sessions use organization-level environments only, either shared environments or [self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments). To give a channel a toolchain that isn't [pre-installed](#installed-tools), such as .NET, an Owner can create a [shared environment](#organization-shared-environments) from the **Cloud environments** admin page with a [setup script](#setup-scripts) that installs it. Point the channel at an environment in one of two ways:

* Set a shared or self-hosted environment as the organization's [default environment](#the-default-environment) at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code).
* [Pin one to a channel](https://claude.com/docs/claude-tag/admins/troubleshooting#channel-sessions-use-the-wrong-environment-or-can%E2%80%99t-find-one) in the Claude Tag admin settings.
