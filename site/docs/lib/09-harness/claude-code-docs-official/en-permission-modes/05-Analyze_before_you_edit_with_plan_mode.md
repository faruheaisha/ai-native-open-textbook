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
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "c6030547439142f52228466edcd0d878e4c10edb5eef329de5ecbe34a3046605"
contentMode: "local-full"
zh: ""
---

## Analyze before you edit with plan mode

Plan mode tells Claude to research and propose changes without making them. Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source. Except in sessions with [bypass permissions available](#skip-all-checks-with-bypasspermissions-mode), edits stay blocked until you approve the plan.

When [auto mode](https://code.claude.com/docs/en/auto-mode-config) is available and the `useAutoModeDuringPlan` setting is on, which it is by default, the classifier reviews shell commands during planning instead of prompting you. Approved commands run, and rejected ones are blocked. Otherwise, commands outside the [built-in read-only set](https://code.claude.com/docs/en/permissions#read-only-commands) prompt for approval, including when the sandbox's [auto-allow mode](https://code.claude.com/docs/en/sandboxing#sandbox-modes) is enabled. In sessions with bypass permissions available, neither the classifier nor a prompt applies to planning commands; [Skip all checks with bypassPermissions mode](#skip-all-checks-with-bypasspermissions-mode) covers the few things that still prompt there. In v2.1.212 through v2.1.217, sessions without bypass permissions prompted for every command outside the read-only set, whether or not auto mode was available.

Enter plan mode by pressing `Shift+Tab` or prefixing a single prompt with `/plan`. You can also start in plan mode from the CLI:

```bash theme={null}
claude --permission-mode plan
```

Press `Shift+Tab` again to leave plan mode without approving a plan.

### Review and approve a plan

When the plan is ready, Claude presents it and asks how to proceed. From that prompt you can choose:

* **Yes, and use auto mode**: approve and start in [auto mode](#eliminate-prompts-with-auto-mode). When auto mode is unavailable, this option reads **Yes, auto-accept edits**. If you started the session with bypass permissions enabled, the option reads **Yes, and switch to BYPASS PERMISSIONS (no further prompts) for this session** instead.
* **Yes, manually approve edits**: approve and review each edit individually.
* **No, keep planning**: stay in plan mode and tell Claude what to change.

Approving a plan exits plan mode and switches the session to the permission mode each approve option describes, so Claude starts editing. To plan again, cycle back to plan mode with `Shift+Tab`, or prefix your next prompt with `/plan`.

Press `Ctrl+G` to open the proposed plan in your default text editor and edit it directly before Claude proceeds. When [`showClearContextOnPlanAccept`](https://code.claude.com/docs/en/settings-reference#showclearcontextonplanaccept) is enabled, the list gains a first option that approves the plan and clears the planning context.

Accepting a plan also gives the session a [generated title](https://code.claude.com/docs/en/sessions#name-your-sessions) based on the plan, unless you've already named the session.

### Set plan mode as the default

To make plan mode the default for a project's terminal sessions, set `defaultMode` to `plan` in `.claude/settings.json`, placed as the example under [Start in a different permission mode](#start-in-a-different-mode) shows. Conversations the [VS Code extension](https://code.claude.com/docs/en/vs-code) starts don't read project settings for the starting permission mode. There, set `claudeCode.initialPermissionMode` to `plan` in your VS Code user settings instead.

<h2 id="eliminate-prompts-with-auto-mode">
  Eliminate permission prompts with auto mode
</h2>

Auto mode lets Claude execute without routine permission prompts. A separate classifier model reviews actions before they run, blocking anything that escalates beyond your request, targets unrecognized infrastructure, or appears driven by hostile content Claude read. Explicit [ask rules](https://code.claude.com/docs/en/permissions#manage-permissions) still force a prompt.

On Pro, Max, and Team plans, auto mode is the [built-in starting permission mode](#which-mode-a-session-starts-in).

The classifier also reviews each message Claude sends to another agent with [`SendMessage`](https://code.claude.com/docs/en/tools-reference), whether plain text or a structured [agent team](https://code.claude.com/docs/en/agent-teams) message, before Claude Code delivers it, both in auto mode and in [plan mode while the classifier reviews commands](#analyze-before-you-edit-with-plan-mode); the send review requires Claude Code v2.1.222 or later.

The classifier also reviews and approves or blocks `rm` and `rmdir` removals targeting a [critical path](#critical-paths), such as `rm -rf /` and `rm -rf ~`, including when the removal sits inside command or process substitution.

Auto mode also nudges Claude to keep working without stopping for clarifying questions, though Claude still asks when your prompt or a skill explicitly relies on it. For stronger autonomous behavior in a mode that still prompts you, set the [Proactive output style](https://code.claude.com/docs/en/output-styles) instead.

  Auto mode reduces permission prompts but does not guarantee safety. Use it for tasks where you trust the general direction, not as a replacement for review on sensitive operations.

Auto mode is available only when your account meets all of these requirements:

* **Plan**: All plans.
* **Organization**: on Team and Enterprise, auto mode is available by default. Administrators can turn it off for the organization by setting `permissions.disableAutoMode` to `"disable"` in [managed settings](https://code.claude.com/docs/en/managed-settings).
* **Model**: on the Anthropic API and [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), Claude Opus 4.6 or later, Sonnet 4.6 or later, or a [Fable model](https://code.claude.com/docs/en/model-config#work-with-fable). On Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and signed-in [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, only Claude Sonnet 5, Opus 4.7 or later, and the Fable models. Older models, including Sonnet 4.5, Opus 4.5, Haiku, and claude-3 models, are not supported on any provider.
* **Provider**: available by default on the Anthropic API, Claude Platform on AWS, Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and signed-in Claude apps gateway sessions.

If Claude Code reports auto mode as unavailable, first check these requirements and whether any settings file sets [`disableAutoMode`](https://code.claude.com/docs/en/settings-reference#disableautomode). Anthropic may also have turned auto mode off server-side, or the server may have rejected auto mode for your account. A session that received either answer keeps auto mode off until the session ends, so start a new session later.

A separate message that names a model and says auto mode "cannot determine the safety" of an action means a classifier request failed. That failure is usually transient, but on Amazon Bedrock it can repeat until your account can invoke the named model. See the [error reference](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action) for the causes and what to do.

If you set `defaultMode: "auto"` in [settings](https://code.claude.com/docs/en/settings-reference#all-settings) and a terminal session starts in Manual mode with no error, the setting is likely in `.claude/settings.json` or `.claude/settings.local.json`. `auto` doesn't take effect from those files. Move it to `~/.claude/settings.json`. For a conversation the VS Code extension started, check the extension's own list in [Switch permission modes](#switch-permission-modes) instead.

<h3 id="enable-auto-mode-on-bedrock-agent-platform-or-foundry">
  Auto mode on Bedrock, Agent Platform, or Foundry
</h3>

On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), and signed-in [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, auto mode appears in the `Shift+Tab` cycle by default. Appearing in the cycle doesn't change the permission mode a session starts in: on these providers, terminal sessions start in your [`defaultMode`](https://code.claude.com/docs/en/settings-reference#permissions-defaultmode), which is Manual unless you change it, and conversations in the [VS Code extension](https://code.claude.com/docs/en/vs-code) start in Manual unless `claudeCode.initialPermissionMode` or a mode you picked in the extension sets one. Only Claude Sonnet 5, Opus 4.7 or later, and the Fable models are supported on these providers.

To make auto mode the default starting permission mode, set `"permissions": \{"defaultMode": "auto"\}` in user or managed settings. In sessions the VS Code extension starts, select **Auto** from the mode indicator instead. [Switch permission modes](#switch-permission-modes) covers what outranks that pick.

The [`/doctor`](https://code.claude.com/docs/en/commands#all-commands) checkup proposes this user-settings default on these providers the same way it does on the Anthropic API.

To prevent developers from using auto mode, set `disableAutoMode` to `"disable"` in [managed settings](https://code.claude.com/docs/en/managed-settings). This removes `auto` from the `Shift+Tab` cycle, and a session started with `--permission-mode auto` starts in Manual instead. A session already running in auto mode leaves it when the setting reaches that session from an [admin-deployed source](https://code.claude.com/docs/en/managed-settings#which-managed-source-claude-code-uses), and shows `auto mode disabled by settings`. Before v2.1.251, a running session kept auto mode until it ended.

In v2.1.158 through v2.1.206, auto mode was off on these providers until you set `CLAUDE_CODE_ENABLE_AUTO_MODE=1`, and Claude Code ignored `defaultMode: "auto"` on these providers unless the variable was also set. The variable is still accepted for compatibility and has no effect from v2.1.207 onward.

### What the classifier blocks by default

The classifier trusts your working directory and the remotes that were configured for it when the session started. A remote added or repointed during the session with `git remote add` or `git remote set-url` isn't trusted, and everything else is treated as external until you [configure trusted infrastructure](https://code.claude.com/docs/en/auto-mode-config). Before v2.1.200, remotes added mid-session were also trusted.

**Blocked by default**:

* Downloading and executing code, like `curl | bash`
* Sending sensitive data to external endpoints
* Production deploys and migrations
* Mass deletion on cloud storage
* Granting IAM or repo permissions
* Modifying shared infrastructure
* Irreversibly destroying files that existed before the session
* Force push
* Committing or pushing a change that would send secrets or sensitive data outside the repository when it runs, or widen what a deploy exposes. This covers a CI workflow or deploy configuration that hands a secret to a destination that doesn't already receive it, a script or setup step that reads a secret store and sends the data out, and a config change that widens what a deploy publishes, such as a registry, visibility, artifact, or sourcemap setting. The check applies on any branch, applies even when the repository is public, and fires when the change lands, whether or not that landing triggers the pipeline; clearing it requires naming the execution effect, not only the commit or push. Before v2.1.211, this check was scoped to the default branch instead: a push there was blocked when it carried sensitive content, changes concealed or misdescribed relative to what you asked for, content ported in from outside the repository, or routed around a review you asked for
* `git reset --hard`, `git checkout -- .`, `git restore .`, `git clean -fd`, `git stash drop`, or `git stash clear`, which the classifier presumes would discard uncommitted changes
* `git commit --amend` when the commit at HEAD was not created in this session
* From v2.1.198, `git commit --amend` when the commit at HEAD has already been pushed. A message-only reword is not blocked: `--amend -m` with nothing newly staged, on a commit that Claude created during this session
* `terraform destroy`, `pulumi destroy`, `cdk destroy`, or `terragrunt destroy`, and applying a plan that destroys resources

Claude Code v2.1.195 and later block more categories by default. Several depend on [environment](https://code.claude.com/docs/en/auto-mode-config#define-trusted-infrastructure) entries, such as sensitive remote targets and protected IaC scopes, that you can narrow to concrete names.

* Writing to a secret manager, or changing DNS records or TLS certificates
* Merging a pull request no human has approved, approving Claude's own pull request, or disabling CI checks
* Posting a comment that is itself a command to automation, such as `atlantis apply` or a bot's `/deploy` or `/merge`
* Toggling, ramping, or deleting a production feature flag
* Applying infrastructure changes to a protected IaC scope, or draining and removing cluster nodes
* Writes to a shared compute cluster that reach beyond the resource you named, such as a label selector or `--all` that catches other users' jobs
* Creating Kubernetes resources that run on every node or intercept cluster traffic, such as DaemonSets and admission webhooks
* Interactive shells or port-forwards into a sensitive remote target
* Opening a tunnel or reverse shell that makes a local service reachable from the public internet
* Printing a live credential or token into the transcript or a file
* Accessing a location listed as a sensitive data location in your [environment](https://code.claude.com/docs/en/auto-mode-config#define-trusted-infrastructure), or copying data out of one. As of v2.1.198 this also blocks sending data from one to an audience the entry excludes
* Routing a package install around your internal package registry to a public registry. As of v2.1.198, this also applies when you've told Claude an internal registry or mirror exists in the conversation, not only when one is listed in your environment
* Running a command with a flag that disarms a safety guard, like `--insecure`
* Launching an autonomous agent loop that runs without human approval or a sandbox, such as one started with `--dangerously-skip-permissions` or `--no-sandbox`. As of v2.1.198 this also covers running a third-party agent or eval harness with isolation and per-action approval disabled, such as a runner started with `--yes-always`
* [Claude in Chrome](https://code.claude.com/docs/en/chrome) browser actions that could send page content, cookies, or credentials off-origin

Claude Code v2.1.198 and later also block these by default:

* Deleting files in `/tmp`, `$TMPDIR`, or another shared scratch or cache directory by wildcard, glob, or age filter rather than by a specific named path
* Including sensitive details in content sent, uploaded, published, or written to other people or shared systems, when your own message didn't authorize those details for that recipient. PR and issue bodies, commit messages, and comments count as this kind of outbound content when the repository is outside the trust boundary or public, including your organization's own public repositories; internal file paths, code names, live API response data such as emails or account identifiers, and infrastructure identifiers count as sensitive details. The PR, issue, and commit-message scoping requires Claude Code v2.1.200 or later. Live personal data from an API response in a PR or issue body, such as an email address, an account or organization identifier, or a usage metric, requires you to name those details and the recipient regardless of the repository's visibility or trust boundary. That check requires Claude Code v2.1.203 or later
* Sending keystrokes to Claude Code's own tmux pane to drive its own interface, which the classifier treats as Claude changing its own permissions or oversight

Claude Code v2.1.200 and later also block these by default:

* Commenting out, deleting, or force-passing a test or assertion that guards security behavior, such as auth, access control, input validation, or sandboxing
* Deleting or tearing down a stateful resource Claude didn't create in the session, when no more specific deletion rule applies and you didn't name that resource
* Repointing an API base URL, proxy endpoint, webhook receiver, or registry mirror at a third-party host that doesn't fit the task, including in example files like `.env.example`
* Changing where pushes go with `git remote set-url` or `git remote add`, unless you named the new remote
* Pushing secrets or personal or entrusted data to a repository known to be public, or pushing confidential material there that isn't part of that repository's own work. A dotfiles repository's own subject matter is the one exception for personal or entrusted data, and content from a private repository reaching any public surface is blocked the same way; both refinements require Claude Code v2.1.203 or later. Before v2.1.203, personal data was grouped with confidential material and blocked only when it wasn't part of that repository's own work. When a repository's visibility isn't established, the classifier doesn't block on that alone; it judges the content against the other rules instead
* Opening a pull request against a different repository or organization, forking with `gh repo fork`, or pushing to a third-party repository, unless you named that external target

Claude Code v2.1.203 and later also block these by default:

* Content from a sensitive local store, or from a file whose name, path, or type marks it as sensitive, entering a commit, a push, PR or issue text, a gist or paste, or a package publish, unless you named both the source and the destination. Session transcripts and conversation logs, credential and configuration dot-folders such as SSH keys, cloud credentials, browser profiles, and shell history, and user-data exports all count, and the repository being private doesn't clear it

Claude Code v2.1.205 and later also block these by default:

* Writing to Claude Code session transcripts, the `.jsonl` history files under `~/.claude/projects/` or your configured config directory, whether directly or through a shell command. The rule also covers the metadata lines Claude Code appends to each transcript entry for its own checks. Reading a transcript isn't blocked
* A recursive forced delete such as `rm -rf "$VAR"` or `Remove-Item -Recurse -Force $dir` whose target is a shell variable, or a glob rooted at one, that isn't assigned anywhere in the conversation the classifier sees. The value came only from earlier command output, which the classifier never receives, so the classifier can't verify the deletion target against the other deletion rules. The block clears when you name the exact path being deleted, or when Claude re-runs the delete with the resolved literal path written into the command. Deletes whose target the classifier can resolve aren't affected. `Remove-Item` targets that are a bare `*` or end in `/*` or `\*` never reach the classifier: Claude Code [denies them outright](#remove-item-in-powershell)

Claude Code v2.1.257 and later also block these by default:

* Requesting credentials from the cloud instance-metadata endpoint, such as `169.254.169.254`, or explicitly authenticating a cloud, cluster, or registry call with the machine's own service-account or node identity
* Reaching a public host by a route other than a direct request, such as a tunnel, a reverse shell, or a resolver or proxy configuration rewritten to point outside
* Reading credentials that belong to the host rather than to your task, such as node certificates or the node's container-registry auth
* Connecting to or scanning sibling containers, pods, or VMs that Claude didn't start, or the node beneath the container

If Claude Code runs somewhere that is meant to allow one of these, describe that setup in a [Host containment entry](https://code.claude.com/docs/en/auto-mode-config#define-trusted-infrastructure) in `autoMode.environment`.

Claude Code v2.1.261 and later also block these by default:

* Posting or writing a link to a public paste, diagram, or data-sharing service in a message, PR or issue text, a document, or anywhere else the link will be opened or fetched, when the URL itself carries the content being shared, unless you named that service

**Allowed by default**:

* Local file operations in your working directory
* Installing dependencies declared in your lock files or manifests
* Reading `.env` and sending credentials to their matching API
* Read-only HTTP requests
* Pushing to any branch of the repository you're working in, including the default branch. A non-default branch whose name marks it as a deploy or publication target, such as `production` or `gh-pages`, isn't covered: the classifier judges a push there on its own terms. The push's content is still checked against the other rules, [`permissions.deny` rules](https://code.claude.com/docs/en/permissions#manage-permissions) can still block push commands [as written](https://code.claude.com/docs/en/permissions#bash-rule-limits) in every mode, and the remote's own branch protection still applies. Before v2.1.211, only pushes to the branch you started on, branches Claude created, and routine pushes to the default branch were allowed by default, and before v2.1.203 any direct push to the default branch was blocked

Claude Code v2.1.195 and later also allow these by default:

* Deleting the exact jobs Claude created earlier in the same session
* Reading, reviewing, or writing security-related code, configs, and threat models as part of your task
* Messages between agents working together in the same multi-agent session
* Sending data to the trusted domains, buckets, and services you list in [`environment`](https://code.claude.com/docs/en/auto-mode-config#define-trusted-infrastructure). This covers data flow only, not destructive or credential operations on the same infrastructure
* [Claude in Chrome](https://code.claude.com/docs/en/chrome) navigation to a trusted internal domain, localhost, or a URL you named

Sandbox network access requests are routed through the classifier rather than allowed by default. As of v2.1.198, the classifier reuses its verdict for a network host and port instead of re-running on every connection:

* An allow is reused until new content enters the conversation, at which point that host is checked again
* Claude Code v2.1.234 and later reuse a deny caused by the conversation outgrowing the classifier's context window until new content enters the conversation, or until [compaction](https://code.claude.com/docs/en/costs#reduce-token-usage) shrinks what the classifier reads. Claude Code then checks the host again
* A deny that the classifier reached by evaluating the request lasts for the turn in the interactive CLI. In [non-interactive mode](https://code.claude.com/docs/en/headless) and Agent SDK sessions, Claude Code reuses that deny for the rest of the run, because those sessions have no turn boundary
* Changing your permission mode or rules drops all cached verdicts

Run `claude auto-mode defaults` to print the full rule lists as JSON. If routine actions get blocked, an administrator can add trusted repos, buckets, and services via the `autoMode.environment` setting: see [Configure auto mode](https://code.claude.com/docs/en/auto-mode-config).

Pushing to any branch of the repository you're working in and creating a pull request that matches your request run without a prompt, unless the push or pull request falls under the [blocked list](#what-the-classifier-blocks-by-default), such as secrets or sensitive data leaving the repository, or a pull request that targets a different repository or organization. To require a human checkpoint before these commands while staying in auto mode, add `permissions.ask` rules, which match the command [as written](https://code.claude.com/docs/en/permissions#bash-rule-limits): see [Common boundaries](https://code.claude.com/docs/en/auto-mode-config#common-boundaries).

<h3 id="first-read-outside-the-working-directories">
  The first read outside the working directories
</h3>

While [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) is off, file reads run without a prompt in auto mode, including reads outside the [working directories](https://code.claude.com/docs/en/permissions#working-directories). The first time Claude uses the Read, Grep, or Glob tool on a path outside them, Claude Code asks you whether to keep allowing those reads.

The prompt doesn't appear in non-interactive `-p` runs or background sessions; reads there run as before.

Whatever you answer, Claude keeps working:

* **Keep allowing**: the read runs, later reads outside the working directories run as before, and Claude Code records your answer so the prompt doesn't appear again
* **Block from now on**: the read is refused, and Claude Code sets [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) to `true` in your user settings, which makes the file tools refuse such reads in every later session and every permission mode. To let Claude read such a path later, add its directory with `/add-dir` or remove the setting.
* **Ask again next time**: the read is refused, and the next read outside the working directories prompts again

### Boundaries you state in conversation

The classifier treats boundaries you state in the conversation as a block signal. If you tell Claude "don't push" or "wait until I review before deploying", the classifier blocks matching actions even when the default rules would allow them. A boundary stays in force until you lift it in a later message. Claude's own judgment that a condition was met does not lift it.

Boundaries are not stored as rules. The classifier re-reads them from the transcript on each check, so a boundary can be lost if [context compaction](https://code.claude.com/docs/en/costs#reduce-token-usage) removes the message that stated it. For a hard guarantee, add a [deny rule](https://code.claude.com/docs/en/permissions#permission-rule-syntax) instead.

### When auto mode falls back

When auto mode can't approve your session's actions, what happens depends on the case:

* **A blocked action**: Claude Code shows a notification and lists the action in `/permissions` under the **Recently denied** tab, where you can press `r` to retry it with a manual approval. When the classifier produces [no verdict on the action](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action), because a safety check separate from auto mode refused the classifier's own request or its response didn't parse, Claude Code denies the action without the notification or the **Recently denied** entry.
* **Repeated blocks**: if the classifier blocks an action 3 times in a row or 20 times total, auto mode pauses and Claude Code resumes prompting. Approving the prompted action resumes auto mode. These thresholds are not configurable. Any allowed action resets the consecutive counter, while the total counter persists for the session and resets only when its own limit triggers a fallback. Claude Code doesn't count a denial toward either threshold when [a safety check separate from auto mode refuses the classifier's own request](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action); the linked entry covers how Claude Code handles those denials.
* **Sessions that can't prompt**: a [non-interactive](https://code.claude.com/docs/en/headless) `-p` run without a [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags) has no prompt to fall back to. When repeated blocks reach a threshold, the action doesn't run and Claude keeps working. The same applies when [a safety check separate from auto mode refuses the classifier's request](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action). Claude Code doesn't stop the run in either case.
* **A mode switch during a check**: if you switch permission modes while a classifier check is pending, Claude Code discards a verdict the new mode wouldn't have requested rather than applying it: you're prompted for approval instead, or the action is auto-denied in [`dontAsk` mode](#allow-only-pre-approved-tools-with-dontask-mode).

Repeated blocks usually mean the classifier is missing context about your infrastructure. Use `/feedback` to report false positives, or have an administrator [configure trusted infrastructure](https://code.claude.com/docs/en/auto-mode-config).

&lt;span id="how-the-classifier-evaluates-actions" />

    Each action goes through a fixed decision order. The first matching step wins:

    1. Actions matching your [allow, ask, or deny rules](https://code.claude.com/docs/en/permissions#manage-permissions) resolve immediately. Writes to [protected paths](#protected-paths) route to the classifier even when an allow rule matches, and so do `rm` and `rmdir` removals targeting a [critical path](#critical-paths) in Claude Code v2.1.218 and later. MCP tools marked [`requiresUserInteraction`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool) prompt you directly even when an allow rule matches, and so do connector tools [your organization set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools) in sessions where that setting reaches Claude Code. Ask rules that match on a command's content, such as `Bash(git push *)`, fall back to a permission prompt
    2. Read-only actions and file edits in your working directory are auto-approved, except writes to [protected paths](#protected-paths) and [the first read outside the working directories](#first-read-outside-the-working-directories), which prompts you
    3. Everything else goes to the classifier. The connector tools and `requiresUserInteraction` MCP tools that prompt you directly in step 1 never reach the classifier, so neither an org-required approval nor a consent step is auto-approved
    4. If the classifier blocks, Claude receives the reason and tries an alternative. In most sessions the reason names the rule the classifier matched, such as `[Data Exfiltration]`, rather than giving a written explanation; see [Review denials](https://code.claude.com/docs/en/auto-mode-config#review-denials)

    On entering auto mode, broad allow rules that grant arbitrary code execution are dropped:

    * Blanket `Bash(*)` or `PowerShell(*)`
    * Wildcarded interpreters like `Bash(python*)`
    * Package-manager run commands
    * `Agent` allow rules
    * [`Monitor`](https://code.claude.com/docs/en/tools-reference#monitor-tool) allow rules, because Claude Code runs Monitor commands through the shell

    Narrow rules like `Bash(npm test)` stay in effect. Claude Code restores the dropped rules when you leave auto mode. Before v2.1.236, Claude Code left `Monitor` allow rules in effect in auto mode, so a rule that matched the whole tool approved Monitor commands without classifier review.

    Claude Code also runs `git status` itself before a command that would discard uncommitted work, such as `git reset --hard` or `rm -rf`, and shows the classifier whether staged, modified, or untracked work is present. Claude Code reports untracked files in that check even when the repository's git configuration sets `status.showUntrackedFiles=no`.

    The classifier sees user messages, tool calls other than read-only lookups such as file reads and searches, and your CLAUDE.md content. Tool results are stripped, so hostile content in a file or web page can't manipulate it directly. You can annotate a call's result with a [PostToolUse hook's `classifierContext` field](https://code.claude.com/docs/en/hooks#annotate-a-result-for-the-auto-mode-classifier), which the classifier reads as application-provided context.

    A separate server-side probe scans incoming tool results and flags suspicious content before Claude reads it. For more on how these layers work together, see the [auto mode announcement](https://claude.com/blog/auto-mode) and the [engineering deep dive](https://www.anthropic.com/engineering/claude-code-auto-mode).

    The classifier checks [subagent](https://code.claude.com/docs/en/sub-agents) work at three points:

    1. Before a subagent starts, the delegated task description is evaluated, so a dangerous-looking task is blocked at spawn time.
    2. While the subagent runs, each of its actions goes through the classifier with the same rules as the parent session, and any `permissionMode` in the subagent's frontmatter is ignored.
    3. When the subagent finishes, the classifier reviews its full action history; if that return check flags a concern, a security warning is prepended to the subagent's results. When a separate API safety check refuses the review request itself, Claude Code still returns the subagent's results, prepended with a warning that the work is unreviewed and should be treated as untrusted.

    Step 1 requires Claude Code v2.1.178 or later. Earlier versions applied the classifier at steps 2 and 3, but did not evaluate the task description before the subagent started.

    The classifier runs on Claude Sonnet 5 by default rather than on your `/model` selection. A classifier model that Anthropic configures server-side takes precedence over that default. When your session's model is Claude Sonnet 4.6, or when [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) excludes Sonnet 5, the classifier runs on the session's model instead, or on an Opus model when the session runs on a [Fable model](https://code.claude.com/docs/en/model-config#work-with-fable); on providers other than the Anthropic API, that Opus fallback is the provider's default Opus model.

    The session's first auto-mode request validates the Sonnet 5 default: if the request succeeds, Sonnet 5 stays the session's classifier model, and if it fails because the model isn't available, the session uses the fallback instead. After that validation settles, the classifier's model doesn't change for the session.

    On Enterprise plans and on accounts that use the Claude API, [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, classifier calls count toward your token usage. Each check sends a portion of the transcript plus the pending action, adding a round-trip before execution. Reads and working-directory edits outside protected paths skip the classifier, so the overhead comes mainly from shell commands and network operations.

    The classifier reuses a sandbox network verdict for a host and port, so repeated connections to the same host don't each add a check. [What the classifier blocks by default](#what-the-classifier-blocks-by-default) describes how long an allow and a deny last.
