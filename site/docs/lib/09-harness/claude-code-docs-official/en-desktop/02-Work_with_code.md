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
pageSha256: "16b0d1f3af7326b40d2a43722bee42c9921c6adcf2900071a6284f629bfb858b"
contentMode: "local-full"
zh: ""
---

## Work with code

Give Claude the right context, control how much it does on its own, and review what it changed.

### Use the prompt box

Type what you want Claude to do and press **Enter** to send. Claude reads your project files, makes changes, and runs commands based on your [permission mode](#choose-a-permission-mode). You can redirect Claude at any point: click the stop button to interrupt immediately, or type a correction and press **Enter** to send it without stopping the running action. Claude reads the correction as soon as the current action completes and adjusts before its next step.

The **+** button next to the prompt box gives you access to file attachments, [skills](#use-skills), [connectors](#connect-external-tools), and [plugins](#install-plugins).

### Add files and context to prompts

The prompt box supports two ways to bring in external context:

* **@mention files**: type `@` followed by a filename to add a file to the conversation context. Claude can then read and reference that file. @mention is not available in cloud or WSL sessions.
* **Attach files**: attach images, PDFs, and other files to your prompt using the attachment button, or drag and drop files directly into the prompt. This is useful for sharing screenshots of bugs, design mockups, or reference documents.

### Choose a permission mode

Permission modes control how much autonomy Claude has during a session: whether it asks before editing files, running commands, or both. You can switch permission modes at any time using the mode selector next to the send button. To approve each change yourself, switch to Manual.

To set a default mode for new local sessions, add `permissions.defaultMode` to your [settings file](https://code.claude.com/docs/en/settings#where-settings-live). The desktop app reads the same settings files as the CLI. A mode you pick in the selector is remembered per folder and takes precedence over `defaultMode` for that folder, except Plan, which applies to the current session only.

| Mode                   | Settings key        | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manual**             | `default`           | Claude asks before editing files or running commands. You see a diff and can accept or reject each change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Accept edits**       | `acceptEdits`       | Claude auto-accepts file edits and common filesystem commands like `mkdir`, `touch`, and `mv`, but still asks before running other terminal commands. Use this when you trust file changes and want faster iteration.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Plan**               | `plan`              | Claude reads files and runs commands to explore, then proposes a plan without editing your source code. Good for complex tasks where you want to review the approach first.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Auto**               | `auto`              | Claude executes all actions with background safety checks that verify alignment with your request. Reduces permission prompts while maintaining oversight. Appears when [auto mode is available](#auto-mode-availability); there is no separate Settings toggle for it.                                                                                                                                                                                                                                                                                                                                                                                     |
| **Bypass permissions** | `bypassPermissions` | Claude runs without permission prompts, except for the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves), safety classifiers when Claude [acts on external sites](#browse-external-sites), or desktop actions where Claude always asks first, such as [archiving a session](#work-across-sessions). Equivalent to `--dangerously-skip-permissions` in the CLI. On Pro and Max plans, enable it in your Settings → Claude Code under "Allow bypass permissions mode"; on Team and Enterprise plans there is no Settings toggle, and organization policy controls it instead. Only use this in sandboxed containers or VMs. |

Earlier versions of the Code tab labeled these modes Ask permissions, Auto accept edits, and Plan mode.

The `dontAsk` permission mode is available only in the [CLI](https://code.claude.com/docs/en/permission-modes#allow-only-pre-approved-tools-with-dontask-mode).

&lt;span id="auto-mode-availability" />

Auto mode is available to all users on the Anthropic API and requires Claude Opus 4.6 or later, Sonnet 4.6 or later, or a [Fable model](https://code.claude.com/docs/en/model-config#work-with-fable). Organization administrators can turn auto mode off with the `disableAutoMode` key in [managed settings](#managed-settings).

In Enterprise deployments that route Desktop to Google Cloud's Agent Platform, auto mode is also available by default; see [Auto mode on Bedrock, Agent Platform, or Foundry](https://code.claude.com/docs/en/permission-modes#enable-auto-mode-on-bedrock-agent-platform-or-foundry) for the supported models.

  Start complex tasks in Plan so Claude maps out an approach before making changes. Once you approve the plan, switch to Accept edits or Manual to execute it. See [explore first, then plan, then code](https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code) for more on this workflow.

Cloud sessions support Accept edits, Plan, and Auto. Accept edits corresponds to `default` mode: cloud sessions pre-approve file edits, so the selector shows Accept edits instead of Manual. Bypass permissions isn't available in cloud sessions, including sessions in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments).

Enterprise admins can restrict which permission modes are available. See [enterprise configuration](#enterprise-configuration) for details.

### Preview your app

Claude can start a dev server and open it in the Browser pane to verify its changes. This works for frontend web apps as well as backend servers: Claude can test API endpoints, view server logs, and iterate on issues it finds. In most cases, Claude starts the server automatically after editing project files. You can also ask Claude to preview at any time. By default, Claude [auto-verifies](#auto-verify-changes) changes after every edit.

The Browser pane can also open static HTML files, PDFs, images, and videos from your project. Click an HTML, PDF, image, or video path in the chat to open it there.

From the Browser pane, you can:

* Interact with your running app directly in the Browser pane
* Watch Claude verify its own changes automatically: it takes screenshots, inspects the DOM, clicks elements, fills forms, and fixes issues it finds
* Start or stop servers from the server dropdown in the session toolbar
* Persist cookies and local storage across server restarts by selecting **Persist sessions** in the dropdown, so you don't have to re-login during development
* Edit the server configuration or stop all servers at once

Claude creates the initial server configuration based on your project. If your app uses a custom dev command, edit `.claude/launch.json` to match your setup. See [Configure preview servers](#configure-preview-servers) for the full reference.

To clear saved session data, or to turn the Browser off entirely, use the toggles in Settings → Claude Code.

### Browse external sites

The Browser pane is a tabbed browser, so you can open documentation, issue trackers, or any other site next to your running app. To open the Browser, press **Cmd+Shift+B** on macOS or **Ctrl+Shift+B** on Windows, or select it from the **Views** menu. When you click an external link in the chat, a chooser offers **Open in app** to use the Browser pane or **Default browser** to use your own; **Cmd**-click on macOS or **Ctrl**-click on Windows opens a link in your system browser directly. You can sign in to sites in the pane, including popup sign-in flows such as Google OAuth.

Claude can read and interact with external pages using the same tools it uses to [verify your app](#preview-your-app), with two additional safety checks:

* Safety classifiers review Claude's write actions on external pages, such as clicking and typing, in every permission mode. These are the same classifiers [auto mode](#choose-a-permission-mode) uses, and when they flag an action, you get a permission prompt regardless of mode.
* In permission modes other than Auto and Bypass permissions, a domain allowlist check also applies before Claude navigates to a new site.

#### Approve Claude's actions on a site

The first time Claude acts on an external site, a permission card appears and Claude waits for your choice: **Allow once**, **Always allow**, or **Deny**. **Allow once** approves the action without saving anything. **Always allow** saves the approval for that site on your device, and you can revoke it in Settings. Each site needs its own approval, including subdomains. Your local dev servers and project files don't need approval, so [auto-verify](#auto-verify-changes) keeps working without prompts.

Even on an approved site, Claude won't purchase items, create accounts, or bypass CAPTCHAs without your input. Browsing in the Browser pane uses the same safety model as the [Claude in Chrome extension](https://code.claude.com/docs/en/chrome). See [Using Claude in Chrome safely](https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely) for how Claude handles sensitive sites and risky actions.

#### Choose between the Browser and the Chrome extension

The Browser pane uses a clean browser profile, separate from your personal browser, with none of your saved logins or history. Use it for building and testing your app and for sites that don't need your identity. When you want Claude to act as you in your logged-in sessions, use the [Claude in Chrome extension](https://code.claude.com/docs/en/chrome) instead, which shares your browser's login state.

#### Restrict external browsing for your organization

The Browser follows the same [site allowlist and blocklist controls](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls) as the Claude in Chrome extension. If your organization already configured those lists for the extension, the Browser respects them automatically. Administrators can also turn off Claude's tools on external pages with the [`browserExternalPageTools` managed setting](#managed-settings). With tools disabled, users can still navigate to external sites; Claude's tools can't read or act on them.

To turn off external browsing entirely, set the [`disableBrowserExternalNavigation` managed setting](#managed-settings) to `true`. This blocks all external navigation in the Browser, including sites on your organization's allowlist; localhost dev servers and file previews keep working. Use `browserExternalPageTools` to let users keep browsing external sites without Claude's tools, and `disableBrowserExternalNavigation` to block external sites for both users and Claude.

### Review changes with diff view

After Claude makes changes to your code, the diff view lets you review modifications file by file before creating a pull request.

When Claude changes files, a diff stats indicator appears showing the number of lines added and removed, such as `+12 -1`. Click this indicator to open the diff viewer, which displays a file list on the left and the changes for each file on the right.

To comment on specific lines, click any line in the diff to open a comment box. Type your feedback and press **Enter** to add the comment. After adding comments to multiple lines, submit all comments at once:

* **macOS**: press **Cmd+Enter**
* **Windows**: press **Ctrl+Enter**

Claude reads your comments and makes the requested changes, which appear as a new diff you can review.

### Review your code

In the diff view, click **Review code** in the top-right toolbar to ask Claude to evaluate the changes before you commit. Claude examines the current diffs and leaves comments directly in the diff view. You can respond to any comment or ask Claude to revise.

The review focuses on high-signal issues: compile errors, definite logic errors, security vulnerabilities, and obvious bugs. It does not flag style, formatting, pre-existing issues, or anything a linter would catch.

### Monitor pull request status

After you open a pull request, a CI status bar appears in the session. Claude Code uses the GitHub CLI to poll check results and surface failures.

* **Auto-fix**: when enabled, Claude automatically attempts to fix failing CI checks by reading the failure output and iterating.
* **Auto-merge**: when enabled, Claude merges the PR once all checks pass. The merge method is squash. Enable auto-merge in your [GitHub repository settings](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository) first; without it, Claude can't merge the PR.

Use the **Auto-fix** and **Auto-merge** toggles in the CI status bar to enable either option. Claude Code also sends a desktop notification when CI finishes. To archive the session automatically once the PR merges or closes, turn on [auto-archive](#work-in-parallel-with-sessions) in Settings → Claude Code.

  PR monitoring requires the [GitHub CLI (`gh`)](https://cli.github.com/) to be installed and authenticated on your machine. If `gh` is not installed, Desktop prompts you to install it the first time you try to create a PR.
