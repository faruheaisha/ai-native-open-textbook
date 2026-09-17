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
pageSha256: "267806d543aa2da1052b25e6bf766792473177162cc9961998e8a4fe2bc9a314"
contentMode: "local-full"
zh: ""
---

## Let Claude use your computer

Computer use lets Claude open your apps, control your screen, and work directly on your machine the way you would. Ask Claude to interact with a desktop tool that has no CLI, or automate something that only works through a GUI. For running and testing iOS apps, Desktop opens the dedicated [iOS Simulator pane](https://code.claude.com/docs/en/desktop-ios-simulator) instead of controlling your screen; the pane works without enabling computer use.

  Computer use is a research preview on macOS and Windows that requires a Pro or Max plan. It is not available on Team or Enterprise plans. The Claude Desktop app must be running.

Computer use is off by default. [Enable it in Settings](#enable-computer-use) before Claude can control your screen. On macOS, you also need to grant Accessibility and Screen Recording permissions.

  Unlike the [sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing), computer use runs on your actual desktop with access to whatever you approve. Claude checks each action and flags potential prompt injection from on-screen content, but the trust boundary is different. See the [computer use safety guide](https://support.claude.com/en/articles/14128542) for best practices.

### When computer use applies

Claude has several ways to interact with an app or service, and computer use is the broadest and slowest. It tries the most precise tool first:

* If you have a [connector](#connect-external-tools) for a service, Claude uses the connector.
* If the task is a shell command, Claude uses Bash.
* If the task is browser work and you have [Claude in Chrome](https://code.claude.com/docs/en/chrome) set up, Claude uses that.
* If the task is running or testing an iOS app, Claude uses the [iOS Simulator pane](https://code.claude.com/docs/en/desktop-ios-simulator), which doesn't use screen control.
* If none of those apply, Claude uses computer use.

The [per-app access tiers](#app-permissions) reinforce this: browsers are capped at view-only, and terminals and IDEs at click-only, steering Claude toward the dedicated tool even when computer use is active. Screen control is reserved for things nothing else can reach, like native apps, hardware control panels, or proprietary tools without an API.

### Enable computer use

Computer use is off by default. If you ask Claude to do something that needs it while it's off, Claude tells you it could do the task if you enable computer use in Settings.

    Make sure you have the latest version of Claude Desktop. On macOS and Windows, download or update at [claude.com/download](https://claude.com/download); on Linux, update through your package manager ([instructions](https://code.claude.com/docs/en/desktop-linux)). Then restart the app.

    In the desktop app, go to **Settings > General** (under **Desktop app**). Find the **Computer use** toggle and turn it on. On Windows, the toggle takes effect immediately and setup is complete. On macOS, continue to the next step.

    If you don't see the toggle, confirm you're on macOS or Windows with a Pro or Max plan, then update and restart the app.

    On macOS, grant two system permissions before the toggle takes effect:

    * **Accessibility**: lets Claude click, type, and scroll
    * **Screen Recording**: lets Claude see what's on your screen

    The Settings page shows the current status of each permission. If either is denied, click the badge to open the relevant System Settings pane.

### App permissions

The first time Claude needs to use an app, a prompt appears in your session. Click **Allow for this session** or **Deny**. Approvals last for the current session, or 30 minutes in [Dispatch-spawned sessions](#sessions-from-dispatch).

The prompt also shows what level of control Claude gets for that app. These tiers are fixed by app category and can't be changed:

| Tier         | What Claude can do                                       | Applies to                  |
| :----------- | :------------------------------------------------------- | :-------------------------- |
| View only    | See the app in screenshots                               | Browsers, trading platforms |
| Click only   | Click and scroll, but not type or use keyboard shortcuts | Terminals, IDEs             |
| Full control | Click, type, drag, and use keyboard shortcuts            | Everything else             |

Apps with broad reach, like terminals, Finder or File Explorer, and System Settings or Settings, show an extra warning in the prompt so you know what approving them grants.

You can configure two settings in **Settings > General** (under **Desktop app**):

* **Denied apps**: add apps here to reject them without prompting. Claude may still affect a denied app indirectly through actions in an allowed app, but it can't interact with the denied app directly.
* **Unhide apps when Claude finishes**: while Claude is working, your other windows are hidden so it interacts with only the approved app. When Claude finishes, hidden windows are restored unless you turn this setting off.
