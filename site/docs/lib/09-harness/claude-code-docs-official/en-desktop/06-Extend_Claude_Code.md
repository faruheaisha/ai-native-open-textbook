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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "30ff9ced4ccb38c4080211fb6b0e988deba7cbf662ca9ff46651c22c1198aada"
contentMode: "local-full"
zh: ""
---

## Extend Claude Code

Connect external services, add reusable workflows, customize Claude's behavior, and configure preview servers. To manage connectors, skills, and plugins in one place, click **Customize** in the sidebar. The [Cowork](https://claude.com/product/cowork) tab in the Desktop app sources its skills, plugins, and connectors from this Customize configuration, which syncs through your claude.ai account, not from the CLI's `~/.claude` directory.

### Connect external tools

For local and [SSH](#ssh-sessions) sessions, click the **+** button next to the prompt box and select **Connectors** to add integrations like Google Calendar, Slack, GitHub, Linear, Notion, and more. You can add connectors before or during a session. The **+** button is not available in cloud or WSL sessions, but [routines](https://code.claude.com/docs/en/routines) configure connectors at routine creation time.

To manage or disconnect connectors, go to Settings → Connectors in the desktop app, or select **Manage connectors** from the Connectors menu in the prompt box.

Once connected, Claude can read your calendar, send messages, create issues, and interact with your tools directly. You can ask Claude what connectors are configured in your session.

Connectors are [MCP servers](https://code.claude.com/docs/en/mcp) with a graphical setup flow. Use them for quick integration with supported services. For integrations not listed in Connectors, add MCP servers manually via [settings files](https://code.claude.com/docs/en/mcp#installing-mcp-servers). You can also [create custom connectors](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp).

### Use skills

[Skills](https://code.claude.com/docs/en/skills) extend what Claude can do. Claude loads them automatically when relevant, or you can invoke one directly: type `/` in the prompt box or click the **+** button and select **Slash commands** to browse what's available. This includes [built-in commands](https://code.claude.com/docs/en/commands), your [custom skills](https://code.claude.com/docs/en/skills#create-your-first-skill), project skills from your codebase, and skills from any [installed plugins](https://code.claude.com/docs/en/plugins). Select one and it appears highlighted in the input field. Type your task after it and send as usual.

You can send a command while Claude is working, the same as any other message, and the session returns to idle once the turn finishes. Before v2.1.206, a command sent mid-turn could leave the session showing as running and messages you sent afterward weren't delivered.

Personal skills in `~/.claude/skills/` apply to local sessions; an [SSH](#ssh-sessions) session reads `~/.claude/skills/` from the remote host's home directory, not from your machine. Cloud sessions load the skills enabled for your claude.ai account instead. See [Skills in Cowork and cloud sessions](https://code.claude.com/docs/en/skills#skills-in-cowork-and-cloud-sessions).

### Install plugins

[Plugins](https://code.claude.com/docs/en/plugins) are reusable packages that add skills, agents, hooks, MCP servers, and LSP configurations to Claude Code. You can install plugins from the desktop app without using the terminal.

For local and [SSH](#ssh-sessions) sessions, click the **+** button next to the prompt box and select **Plugins** to see your installed plugins and their skills. To add a plugin, select **Add plugin** from the submenu to open the plugin browser, which shows available plugins from your configured [marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) including the official Anthropic marketplace. Select **Manage plugins** to enable, disable, or uninstall plugins.

You can scope plugins to your user account, a specific project, or local-only. If your organization manages plugins centrally, those plugins are available in desktop sessions the same way they are in the CLI.

The plugin browser is not available in cloud sessions, and plugins you install from the desktop app aren't available for cloud sessions. To use a plugin in a cloud session, either declare it in the repository's `.claude/settings.json` under [`enabledPlugins`](https://code.claude.com/docs/en/settings-reference#enabledplugins) so Claude Code [installs it at session start](https://code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup), or enable it for your claude.ai account so Claude Code loads it as a [synced plugin](https://code.claude.com/docs/en/plugins-reference#synced-plugins). Plugins aren't available in WSL sessions. For the full plugin reference including creating your own plugins, see [plugins](https://code.claude.com/docs/en/plugins).

### Configure preview servers

Claude automatically detects your dev server setup and stores the configuration in `.claude/launch.json` at the root of the folder you selected when starting the session. Preview uses this folder as its working directory, so if you selected a parent folder, subfolders with their own dev servers won't be detected automatically. To work with a subfolder's server, either start a session in that folder directly or add a configuration manually.

To customize how your server starts, for example to use `yarn dev` instead of `npm run dev` or to change the port, edit the file manually or click **Edit configuration** in the server dropdown to open it in your code editor. The file supports JSON with comments.

```json theme={null}
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

You can define multiple configurations to run different servers from the same project, such as a frontend and an API. See the [examples](#examples) below.

#### Auto-verify changes

When `autoVerify` is enabled, Claude automatically verifies code changes after editing files. It takes screenshots, checks for errors, and confirms changes work before completing its response.

Auto-verify is on by default. Disable it per-project by adding `"autoVerify": false` to `.claude/launch.json`, or toggle it from the server dropdown menu.

```json theme={null}
{
  "version": "0.0.1",
  "autoVerify": false,
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

When disabled, preview tools are still available and you can ask Claude to verify at any time. Auto-verify makes it automatic after every edit.

#### Configuration fields

Each entry in the `configurations` array accepts the following fields:

| Field               | Type      | Description                                                                                                                                                                                                                                                              |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`              | string    | A unique identifier for this server                                                                                                                                                                                                                                      |
| `runtimeExecutable` | string    | The command to run, such as `npm`, `yarn`, or `node`                                                                                                                                                                                                                     |
| `runtimeArgs`       | string\[] | Arguments passed to `runtimeExecutable`, such as `["run", "dev"]`                                                                                                                                                                                                        |
| `port`              | number    | The port your server listens on. Defaults to 3000                                                                                                                                                                                                                        |
| `cwd`               | string    | Working directory relative to your project root. Defaults to the project root. Use `$\{workspaceFolder\}` to reference the project root explicitly                                                                                                                         |
| `env`               | object    | Additional environment variables as key-value pairs, such as `\{ "NODE_ENV": "development" \}`. Don't put secrets here since this file is committed to your repo. To pass secrets to your dev server, set them in the [local environment editor](#local-sessions) instead. |
| `autoPort`          | boolean   | How to handle port conflicts. See below                                                                                                                                                                                                                                  |
| `program`           | string    | A script to run with `node`. See [when to use `program` vs `runtimeExecutable`](#when-to-use-program-vs-runtimeexecutable)                                                                                                                                               |
| `args`              | string\[] | Arguments passed to `program`. Only used when `program` is set                                                                                                                                                                                                           |
| `url`               | string    | The address the preview opens instead of `http://localhost:<port>`. See [open the preview at a specific URL](#open-the-preview-at-a-specific-url)                                                                                                                        |

&lt;a id="when-to-use-program-vs-runtimeexecutable" />

##### When to use `program` vs `runtimeExecutable`

Use `runtimeExecutable` with `runtimeArgs` to start a dev server through a package manager. For example, `"runtimeExecutable": "npm"` with `"runtimeArgs": ["run", "dev"]` runs `npm run dev`.

Use `program` when you have a standalone script you want to run with `node` directly. For example, `"program": "server.js"` runs `node server.js`. Pass additional flags with `args`.

&lt;a id="open-the-preview-at-a-specific-url" />

##### Open the preview at a specific URL

By default, the preview opens `http://localhost:<port>`. Set `url` when your server needs a different address. Common cases are servers that require local HTTPS, apps that use `*.localhost` subdomains, and apps that sign you in through a redirect.

```json theme={null}
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 8443,
      "url": "https://localhost:8443"
    }
  ]
}
```

Localhost addresses open directly, exactly like the default port address. This includes `localhost`, any `*.localhost` subdomain, `127.0.0.1`, and `::1`. For security, a localhost `url` must be just your server's origin — no path or query, and the port must match the entry's port. To show a specific page, ask Claude to navigate there after the preview opens. A localhost `url` with a path, query, or mismatched port is reported as a configuration error that names the url and shows the fix.

For any other address, Desktop asks for your permission the first time the preview opens it, the same as when you browse to a new site in the preview. External addresses may include paths. Choose **Always allow** to skip the prompt for that site in the future. Organization policies that restrict external sites in the preview still apply.

To preview a server you already run yourself, set `url` without a command. Claude attaches the preview to your running server instead of starting one:

```json theme={null}
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "url": "https://app.localhost:3000"
    }
  ]
}
```

The `url` must be `http` or `https`, and must not contain a username or password.

#### Port conflicts

The `autoPort` field controls what happens when your preferred port is already in use:

* **`true`**: Claude finds and uses a free port automatically. Suitable for most dev servers.
* **`false`**: Claude fails with an error. Use this when your server must use a specific port, such as for OAuth callbacks or CORS allowlists.
* **Not set (default)**: Claude asks whether the server needs that exact port, then saves your answer.

When Claude picks a different port, it passes the assigned port to your server via the `PORT` environment variable.

#### Examples

These configurations show common setups for different project types:

    This configuration runs a Next.js app using Yarn on port 3000:

    ```json theme=\{null\}
    \{
      "version": "0.0.1",
      "configurations": [
        \{
          "name": "web",
          "runtimeExecutable": "yarn",
          "runtimeArgs": ["dev"],
          "port": 3000
        \}
      ]
    \}
    ```

    For a monorepo with a frontend and an API server, define multiple configurations. The frontend uses `autoPort: true` so it picks a free port if 3000 is taken, while the API server requires port 8080 exactly:

    ```json theme=\{null\}
    \{
      "version": "0.0.1",
      "configurations": [
        \{
          "name": "frontend",
          "runtimeExecutable": "npm",
          "runtimeArgs": ["run", "dev"],
          "cwd": "apps/web",
          "port": 3000,
          "autoPort": true
        \},
        \{
          "name": "api",
          "runtimeExecutable": "npm",
          "runtimeArgs": ["run", "start"],
          "cwd": "server",
          "port": 8080,
          "env": \{ "NODE_ENV": "development" \},
          "autoPort": false
        \}
      ]
    \}
    ```

    To run a Node.js script directly instead of using a package manager command, use the `program` field:

    ```json theme=\{null\}
    \{
      "version": "0.0.1",
      "configurations": [
        \{
          "name": "server",
          "program": "server.js",
          "args": ["--verbose"],
          "port": 4000
        \}
      ]
    \}
    ```
