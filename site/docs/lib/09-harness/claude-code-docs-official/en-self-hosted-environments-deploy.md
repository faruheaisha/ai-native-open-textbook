---
title: "Deploy self-hosted environments to production"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments-deploy.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments-deploy.md"
sourceSha256: "ca956e16e1ac95806858a845c8e1ff60a4b2c8a11397404d430c16db3753ac5c"
pageSha256: "ca956e16e1ac95806858a845c8e1ff60a4b2c8a11397404d430c16db3753ac5c"
contentMode: "local-full"
zh: ""
---

# Deploy self-hosted environments to production

> Run self-hosted runners in production: security hardening, network egress control, git credentials, Kubernetes and Compose recipes, and troubleshooting.

  Self-hosted environments are in public beta on Team and Enterprise plans; [Availability and limitations](https://code.claude.com/docs/en/self-hosted-environments#availability-and-limitations) covers the enablement path. This page covers running the fleet in production; see the [quickstart](https://code.claude.com/docs/en/self-hosted-environments-quickstart) for your first runner and session.

A [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) runs Claude Code [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) on runners you deploy inside your network, and in production those sessions execute model-directed code on behalf of everyone who can dispatch a session to the environment. This page is for the operator taking a working environment to production. It works through the deployment in order: what to lock down before connecting real systems, the egress the fleet needs, how sessions authenticate to your git host, the deployment recipes themselves, and what to check when sessions misbehave.

## Harden your deployment

A self-hosted runner executes arbitrary, model-directed code on your infrastructure on behalf of everyone who can dispatch a session to its environment. That's any member of your Anthropic organization, and anyone who can start a [Claude Tag](https://claude.com/docs/claude-tag/overview) channel session in a scope an Owner routed to the environment. Work through each item before you connect an environment to production systems:

* **Ephemeral, per-session containers**: run each runner process in a fresh container or VM that's destroyed when the process exits, with `--capacity 1` and the default `--drain-grace-sec 0` so each container serves exactly one session. At a higher capacity, or with a positive drain grace, one container serves multiple sessions from the same [locked owner](https://code.claude.com/docs/en/self-hosted-environments#key-concepts); see [Runner lifecycle](https://code.claude.com/docs/en/self-hosted-environments#runner-lifecycle). Don't reuse a filesystem between runner restarts, except in the deliberate [pre-warmed checkout](#reuse-a-pre-warmed-checkout) setup, and never across owners.
* **No broad credentials in the image**: don't include long-lived SSH keys, cloud-provider credentials, or personal access tokens that grant more than a session needs. Mint credentials used during a session, such as push or API tokens, per session from your [wrapper script](https://code.claude.com/docs/en/self-hosted-environments-configuration#wrapper-scripts). For the initial clone, which happens before the wrapper runs, use a [`checkout` lifecycle hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#checkout) or [`--use-anthropic-git-proxy`](#use-the-anthropic-git-proxy); see [Configure git](#configure-git).
* **Keep the environment secret off session-running hosts**: the environment secret can register runners and pick up any session queued on the environment. On a fixed fleet it lives on every runner host, where any session's code can read the secret file. Prefer [on-demand runners](https://code.claude.com/docs/en/self-hosted-environments-configuration#on-demand-runners), where the secret stays on the orchestrator host, which never runs user code, and each runner receives a single-use work order that registers exactly one runner. On a fixed fleet, treat the environment-secret file as readable by every session and rotate the secret after any suspected session compromise.
* **Default-deny network egress**: restrict runner and session container outbound traffic at your own network boundary on every environment; [Default-deny egress](#default-deny-egress) covers what to allow and why.
* **Least-privilege host IAM**: the compute identity attached to the runner host, such as an instance profile or node service account, should grant only what the runner itself needs. Sessions should obtain their own credentials through your wrapper script rather than inheriting the host's.
* **Block the cloud metadata endpoint from sessions**: keeping sessions off the host identity requires blocking their access to the cloud metadata endpoint, and subnet-level egress policies don't intercept link-local metadata traffic, so block it in the container itself:

  * IMDSv2 with a hop limit of one
  * GKE Workload Identity with metadata concealment
  * An explicit deny for `169.254.169.254` in the session container's network namespace

  The block applies to your wrapper script and lifecycle hooks too, since they share the container. Authenticate any token exchange with the [session JWT](https://code.claude.com/docs/en/self-hosted-environments-identity) against your own token service over allowlisted egress, or use a file-based web identity such as IAM Roles for Service Accounts (IRSA) on Amazon EKS.
* **Per-runner filesystem isolation**: each runner process gets its own working directory that no other process on the host can read or write. Make `--hooks-dir`, the wrapper script, and the host's `~/.claude/` read-only to the session, either built into the image or mounted read-only.
* **Dispatch has no per-environment access control**: any member of your Anthropic organization can dispatch a session to any of its environments. If an Owner [routes Claude Tag channels to the environment](https://code.claude.com/docs/en/cloud-environments#set-the-environment-a-claude-tag-channel-uses), anyone the [Claude Tag access setting](https://claude.com/docs/claude-tag/admins/restrict-access#restrict-who-can-use-claude) admits can start channel sessions that run there. By default that's anyone in the connected Slack workspace, with or without a Claude account. Treat every runner host as reachable for code execution by everyone who can dispatch to it, and place on a runner host only data and credentials that all of those people are allowed to read. [`--lock-to-account`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags) bounds which account's sessions a given host executes, but it doesn't narrow who can dispatch into the environment. To make self-hosted environments the only picker option, an [Owner](https://code.claude.com/docs/en/cloud-environments#organization-shared-environments) can hide Anthropic-hosted environments for the whole organization from the [**Cloud environments** page](https://claude.ai/admin-settings/cloud-environments).
* **Enforce the repo-settings guard**: choose the guard mode with [`--confine-repo-settings`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags). The default `warn` logs a violation and still spawns the session, `enforce` refuses the session, and `off` disables the scan. The runner scans each repository's committed settings for:

  * A grant that resolves outside that session's own workspace: an `additionalDirectories` entry, an `Edit`, `Write`, or `NotebookEdit` rule in `permissions.allow`, or a `sandbox.filesystem.allowWrite` or `allowRead` entry
  * A non-empty `env` block
  * An operator-posture override such as `sandbox.enabled: false`

  The guard runs regardless of [`--trust-workspace`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags), and doesn't cover repository hooks, `.mcp.json`, or Bash rules; see [Permissions and tool approval](https://code.claude.com/docs/en/self-hosted-environments-configuration#permissions-and-tool-approval) for where those grants belong.

  Your organization's IP allowlist doesn't cover self-hosted runner traffic by default. Don't rely on it as a network control for runner or session traffic; apply default-deny egress at your own network boundary instead, and contact your Anthropic account team if you want IP-allowlist enforcement for your organization.

## Network requirements

The runner and the session children it spawns make outbound connections to the hosts below. Restrict session-container egress to these hosts and the specific internal services sessions need to reach; [Default-deny egress](#default-deny-egress) covers how and why.

These hosts are always required:

| Host                                                               | Port                                       | Used for                                                                                                                                                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api.anthropic.com`                                                | 443, HTTPS; WSS for the SCM connector only | Runner control plane and session streaming, model inference, feature flags, product analytics, [JWKS](https://code.claude.com/docs/en/self-hosted-environments-identity) key fetches, commit signing, the git proxy when `--use-anthropic-git-proxy` is set, and the orchestrator's [SCM connector](https://code.claude.com/docs/en/self-hosted-environments-reference#scm-connector-flags) tunnel when `--scm-connector-host` is set |
| Your git host, such as `github.com` or your GitHub Enterprise host | 443 or 22                                  | Cloning and pushing repositories. Not needed if the runner uses `--use-anthropic-git-proxy`, which routes git traffic through `api.anthropic.com`.                                                                                                                                                                                                                            |

Whether these hosts are needed depends on your configuration:

| Host                                 | Port | When required                                                                                                                                                                                                                                                                           |
| :----------------------------------- | :--- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `downloads.claude.ai`                | 443  | At install time, when you install or update Claude Code on the host with the native installer; the `install.sh` script itself is served from `claude.ai`. At session runtime, only when sessions install plugins from the official Anthropic marketplace.                               |
| `storage.googleapis.com`             | 443  | At session runtime, for the plugin install counts and metadata shown in `/plugin`.                                                                                                                                                                                                      |
| `code.claude.com` and `claude.com`   | 443  | Documentation lookups by the built-in claude-code-guide agent and pre-approved WebFetch requests during sessions. Blocking these hosts only affects documentation lookups.                                                                                                              |
| `*.frame.claudeusercontent.com`      | 443  | Only when the [Artifact tool](https://code.claude.com/docs/en/artifacts#availability) is available for sessions in your organization; defaults vary by plan, per the availability table there. Set `CLAUDE_CODE_DISABLE_ARTIFACT=1` on the runner to keep the tool disabled regardless of the organization setting. |
| `registry.npmjs.org`                 | 443  | When a session installs a plugin, both for fetching npm-source plugin packages and for installing a plugin's Node.js dependencies, or when an `npx`-launched MCP server runs                                                                                                            |
| `http-intake.logs.us5.datadoghq.com` | 443  | Anthropic operational metrics. Only when `CLAUDE_CODE_BYOC_ENABLE_DATADOG=1` is set; off by default in self-hosted environments.                                                                                                                                                        |
| `browser-intake-us5-datadoghq.com`   | 443  | Anthropic error-report uploads, sent only when [error reporting](https://code.claude.com/docs/en/data-usage#telemetry-services) is enabled for the session's account. Suppressed by `DISABLE_ERROR_REPORTING=1` or `DISABLE_TELEMETRY=1`.                                                                           |

The runner doesn't reach `statsig.anthropic.com`, `*.sentry.io`, `claude.ai`, or `platform.claude.com`. These hosts appear in some older enterprise network checklists, but you don't need to allowlist them for runner or session traffic: feature-flag fetches go to `api.anthropic.com`, and the runner authenticates with the environment secret rather than interactive OAuth. Two host-side flows do reach `claude.ai`, so run them from a host whose egress allows it rather than widening session-container egress: the one-line installer fetches `install.sh` from `claude.ai` at install time, and interactive `claude auth login`, which the [guided setup](https://code.claude.com/docs/en/self-hosted-environments-quickstart#set-up-an-environment-and-runner), `doctor`'s signed-in mode, and [CI dispatch](https://code.claude.com/docs/en/self-hosted-environments-testing#authenticate-from-ci) use, signs in through `claude.ai`, `claude.com`, and `platform.claude.com`. `mcp-proxy.anthropic.com` isn't required either: self-hosted sessions don't use it, and delivery of your organization's claude.ai connectors to sessions, when enabled for your organization, routes through `api.anthropic.com`. See [MCP servers](https://code.claude.com/docs/en/self-hosted-environments-configuration#mcp-servers).

### Default-deny egress

Deploy runner and session containers in a network segment or namespace whose outbound traffic is limited to the hosts in the [network requirements table](#network-requirements), your git host, and the specific internal services sessions need to reach. The product can't verify or enforce this, so apply it at your own network boundary on every environment. Session code is model-directed and can attempt connections to arbitrary hosts; default-deny egress at the network layer bounds where those attempts can land. This applies regardless of permission mode: the default pre-approved tool set already includes `Bash`, so shell egress runs without a prompt even without [auto mode](https://code.claude.com/docs/en/self-hosted-environments-configuration#permissions-and-tool-approval).

For details on which telemetry each session emits and how to turn it off, see [Telemetry](https://code.claude.com/docs/en/self-hosted-environments-reference#telemetry).

### Authenticate to an egress proxy

Some corporate egress proxies require a `Proxy-Authorization` header on every connection. The token in that header often rotates too fast to write into the proxy URL you set in `HTTPS_PROXY`. Set `HTTPS_PROXY` or `HTTP_PROXY` to your proxy's URL as usual, then set `--proxy-authorization-command` or `--proxy-authorization-file` to tell the runner where to read the header value from. Both flags require Claude Code v2.1.238 or later.

#### Choose where the `Proxy-Authorization` value comes from

Pick the flag that matches how you produce the `Proxy-Authorization` token:

* **[`--proxy-authorization-command <command>`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags)**: choose this for a token you generate on demand. The runner runs the shell command and uses its trimmed stdout as the header value, for example `Bearer <token>`.
* **[`--proxy-authorization-file <path>`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags)**: choose this for a token another process rotates in place. The runner reads the file and uses its trimmed contents as the header value.

#### Configurations the runner refuses to start with

Each flag also has an environment variable form, listed beside it in the [runner CLI flags reference](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags). Before the runner contacts your proxy or the control plane, it checks the flags and their variables, and refuses to start in three cases:

* **Both flags set**: one flag plus the other flag's environment variable counts as setting both.
* **No proxy URL**: neither `HTTPS_PROXY` nor `HTTP_PROXY` holds an `http://` or `https://` URL. The runner reads both variables in upper or lower case, and doesn't consult `ALL_PROXY`.
* **Either flag passed to the orchestrator subcommand**: `self-hosted-runner orchestrator` doesn't accept the flags or their environment variables. Pass the flag to each runner the orchestrator starts instead.

#### What the runner changes while a proxy-authorization flag is set

With either flag set, the runner starts a listener of its own and sends proxy traffic from itself, its lifecycle hooks, and its sessions through that listener. The listener adds the `Proxy-Authorization` header on the way to your proxy.

* **Listener**: the listener is a forward proxy on `127.0.0.1`. The runner starts the listener before registering with the control plane, and exits at startup if the listener can't start.
* **Proxy variables**: the runner rewrites whichever of `HTTPS_PROXY` and `HTTP_PROXY` you set so that it points at the listener. That rewritten value reaches the runner itself, its lifecycle hooks, and every session it runs.
* **Token rotation**: a rotated token takes effect without a restart. For each connection the listener opens to your proxy, the runner runs your command or reads your file again and adds the result as the header.
* **Session environment**: a session reaches your proxy only through the listener. In each session's environment the runner removes `ALL_PROXY`, removes any spelling of `HTTPS_PROXY` or `HTTP_PROXY` that you didn't set, and pins `NO_PROXY` to the runner's own value.
* **Logs**: the runner never logs the header value.

## Configure git

The runner manages repository checkouts but doesn't configure git identity or credentials by default. You control the runner's image and process environment, so you control the git config. Choose one of two approaches:

* **Let the runner configure git**: start the runner with `--configure-git` to have it write the same identity and commit-signing config that Anthropic-hosted sessions use
* **Ship git config in your image**: set identity and push credentials yourself, for example to commit under your own bot identity

Git version floors on the runner host: [`--configure-git`](#let-the-runner-configure-git) SSH commit signing requires Git 2.34 or newer, [`--use-anthropic-git-proxy`](#use-the-anthropic-git-proxy) requires 2.32 or newer, and resuming sessions from branches pushed by [`--push-outcome-on-release`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags) requires 2.29 or newer. Git 2.24 is sufficient if you omit all three and manage git identity yourself.

### Let the runner configure git

Start the runner with `--configure-git`, or set `SELF_HOSTED_RUNNER_CONFIGURE_GIT=1`, to have it write global git config at startup:

* `user.name = Claude` and `user.email = noreply@anthropic.com`, matching Anthropic-hosted sessions
* SSH-format commit and tag signing, routed through a runner-managed shim that signs each commit via Anthropic's signing service using the session's own credentials. Signatures are verifiable on GitHub against Anthropic's published SSH signing key.
* `push.negotiate = true`, so git asks your git host which commits it already has before packing a push. Requires Claude Code v2.1.257 or later.
* `core.hooksPath` pointing at a runner-managed hooks directory. Its `commit-msg` and `prepare-commit-msg` hooks add a `Co-authored-by:` trailer for the session's creator to each commit, built from the email in [`CCR_SESSION_ACCOUNT_EMAIL`](https://code.claude.com/docs/en/self-hosted-environments-configuration#wrapper-scripts) and omitted when that variable is unset. If your image already sets `core.hooksPath`, the runner leaves your setting in place, skips installing these hooks, and prints a `[runner:git]` warning.

Commit signing requires git 2.34 or newer; the runner checks at startup and exits with an error if your git is older. This flag doesn't configure push credentials, which you still provide in the image.

### Ship git config in your image

Git identity is required for any commit. Set it system-wide in your Dockerfile so the config applies regardless of which user the runner process runs as:

```dockerfile theme={null}
RUN git config --system user.name "Claude" && \
    git config --system user.email "noreply@anthropic.com"
```

Without an identity, `git commit` fails with `Please tell me who you are` and sessions can't make progress. You can use your own bot identity instead; the runner doesn't override these values.

Don't bake long-lived or broadly-scoped push credentials into a shared runner image: a credential in the image is available to every session the image runs, whoever started it. Instead, mint a short-lived, least-scoped token per session from your [wrapper script](https://code.claude.com/docs/en/self-hosted-environments-configuration#wrapper-scripts), using the session creator's identity decoded from the session JWT. Pair it with an ephemeral per-session container, which requires `--capacity 1`, so no credential outlives the session that minted it; see the [hardening section](#harden-your-deployment).

If you must configure push credentials at the image level, for example for a read-only deploy key, scope them as tightly as your git host allows:

* An SSH deploy key limited to one repository with a `url.<base>.insteadOf` rewrite
* A `credential.helper` that returns a minimally-scoped token
* `GIT_SSH_COMMAND` pointing at a narrowly-scoped key

Whichever mechanism you configure must work without a prompt, because the runner's built-in clone and fetch disable the prompts that git, SSH, and Git Credential Manager would otherwise show:

* The runner sets `GIT_TERMINAL_PROMPT=0`, so git doesn't ask for a username or password.
* The runner runs SSH with `BatchMode=yes`, appended to your `GIT_SSH_COMMAND` if you set one, so SSH doesn't ask for a passphrase or host confirmation.
* The runner sets `GCM_INTERACTIVE=never`, so Git Credential Manager doesn't open a sign-in dialog.
* The runner clears `core.askPass`, so if you use an askpass helper, set it through the `GIT_ASKPASS` environment variable instead.

If your git host rejects the credential, or you didn't configure one, the runner retries a few times and then fails repository preparation. The runner doesn't pass these settings into the session's environment.

If checkout directories are owned by a different uid than the runner process, git refuses to operate on them; add `safe.directory`:

```dockerfile theme={null}
RUN git config --system --add safe.directory '*'
```

### Use the Anthropic git proxy

Start the runner with `--use-anthropic-git-proxy`, or set `CLAUDE_RUNNER_USE_GIT_PROXY=1`, to have it clone through Anthropic's git proxy, authenticated with the session's own short-lived token. For ordinary user sessions, the proxy uses the GitHub or GitHub Enterprise OAuth token stored for the session creator; for bot and agent sessions, it uses your organization's GitHub App installation token. Either way, the runner image needs no git credentials at all: no SSH keys, no credential helper, no `.netrc`. This is the same auth path Anthropic-hosted environments use.

The proxy requires `--capacity 1` because the proxy URL is per-session, and git 2.32 or newer because older git ignores the configuration mechanism the proxy uses to isolate sessions from each other. The runner refuses to start if either requirement is unmet. Because the proxy fetches from Anthropic's side, your git host must be reachable from Anthropic infrastructure, the same requirement Anthropic-hosted sessions have; for a git host that's only routable inside your network, use a [`checkout` lifecycle hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#checkout) instead. Each runner process handles one session at a time, so run more replicas for parallelism. When the proxy is enabled, `--git-host-rewrite` and `--git-ssh-rewrite` have no effect: the proxy URL points at `api.anthropic.com`, not your git host.

The runner also reports the opt-in to Anthropic when it registers, printing `Registering as opted in to Anthropic-managed git (--use-anthropic-git-proxy)` at startup. Each session on an opted-in runner then uses either Anthropic-managed git or the per-session proxy URL. When a session uses the per-session proxy URL, the runner logs one `[runner:warn]` line saying so.

### Rewrite git URLs for private networks

Repository URLs arrive from the control plane as HTTPS, with the hostname of your git host; for GitHub Enterprise, that's the hostname you configured for the [GitHub Enterprise integration](https://code.claude.com/docs/en/github-enterprise-server) in Claude Code admin settings on claude.ai. Two repeatable flags rewrite those URLs before clone:

* `--git-host-rewrite <from>=<to>`: for split-horizon DNS, where Anthropic reaches your git host via an external hostname but runners must use an internal one
* `--git-ssh-rewrite <host>`: for git hosts that only accept SSH, rewriting `https://<host>/owner/repo` to `git@<host>:owner/repo`

Host rewriting runs first, so list the internal hostname in `--git-ssh-rewrite` if you need both. For full control over checkout, use a [`checkout` lifecycle hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#checkout).

## Build the runner image

Anthropic doesn't publish a pre-built runner image. Build your own around the `claude` binary, layering in whatever toolchain your repositories need: language runtimes, compilers, package managers, and [MCP](https://code.claude.com/docs/en/mcp) sidecars.

The recipes below use `--capacity 4`, so one container serves up to four concurrent sessions from the same locked owner. That doesn't provide the per-session container isolation in the [hardening section](#harden-your-deployment): before connecting an environment to production systems, either run the recipes at `--capacity 1` with one container per session, or use [on-demand runners](https://code.claude.com/docs/en/self-hosted-environments-configuration#on-demand-runners), which also keep the environment secret off session-running hosts.

This Dockerfile is a minimal starting point:

```dockerfile theme={null}
FROM debian:bookworm-slim
ARG CLAUDE_CODE_VERSION
RUN apt-get update && apt-get install -y --no-install-recommends git curl ca-certificates openssh-client \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://downloads.claude.ai/claude-code-releases/${CLAUDE_CODE_VERSION:?set with --build-arg CLAUDE_CODE_VERSION}/linux-x64/claude" \
      -o /usr/local/bin/claude && chmod +x /usr/local/bin/claude
RUN git config --system user.name "Claude" \
 && git config --system user.email "noreply@anthropic.com" \
 && git config --system --add safe.directory '*'
ENTRYPOINT ["claude"]
```

Swap `linux-x64` for `linux-arm64` if your nodes are ARM, or for `linux-x64-musl` or `linux-arm64-musl` on a musl-based image such as Alpine; see [Alpine Linux setup](https://code.claude.com/docs/en/setup#alpine-linux-and-musl-based-distributions) for the extra packages musl images need. The URL is the standard Claude Code release location, so you can verify the downloaded binary against the release's signed manifest as described in [Binary integrity and code signing](https://code.claude.com/docs/en/setup#binary-integrity-and-code-signing). Build the image with Claude Code version 2.1.224 or later, then push it to your registry and reference it in the recipes below:

```bash theme={null}
