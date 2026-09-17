---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-self-hosted-runner-command-help.md"
sourceRel: "system-prompts/data-self-hosted-runner-command-help.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-self-hosted-runner-command-help.md"
sourceSha256: "e71897b6d39c2ce9cb09cf2861158e64f53648f42eace6bc4fca5cc0be1548e6"
pageSha256: "e71897b6d39c2ce9cb09cf2861158e64f53648f42eace6bc4fca5cc0be1548e6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Usage: claude self-hosted-runner [options]

Connection:
  --api-url &lt;url>             API base URL (default: ${DEFAULT_SELF_HOSTED_RUNNER_API_URL})
  --environment-secret-file &lt;path>
                              Path to environment secret file (or set SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET)
                              (--pool-secret-file / SELF_HOSTED_RUNNER_POOL_SECRET are deprecated aliases.)
  --lock-to-account &lt;id>      Lock runner to a single account at registration (webhook-driven on-demand
                              spawn). Only that account's sessions are assigned.
                              [env: SELF_HOSTED_RUNNER_LOCK_TO_ACCOUNT]
  --client-label &lt;label>      Observability label sent at registration (default: hostname). Shown
                              beside the runner in the Anthropic console; never used for
                              authorization or routing. Set it when the hostname is not
                              meaningful, e.g. to a VM or container name.
                              [env: SELF_HOSTED_RUNNER_CLIENT_LABEL]
  --proxy-authorization-command &lt;shell command>
                              For egress proxies that require a Proxy-Authorization header (for
                              example a short-lived bearer token) on every CONNECT. The command's
                              stdout is the full header value (e.g. "Bearer &lt;token>"); it is run
                              afresh for each new connection to the proxy, so rotating tokens stay
                              current. Requires HTTPS_PROXY (or HTTP_PROXY) to name that upstream
                              proxy; ALL_PROXY alone is not consulted. When set, the runner starts a
                              small forward proxy on 127.0.0.1 that adds the header, and points
                              itself and every session it runs at it (HTTPS_PROXY/HTTP_PROXY are
                              rewritten for child processes, other proxy variables incl. ALL_PROXY
                              are cleared for them; NO_PROXY is unchanged). The value is never
                              logged. Not supported with the orchestrator subcommand yet.
                              [env: ${PROXY_AUTHORIZATION_COMMAND_ENV_VAR\}]
  --proxy-authorization-file &lt;path>
                              Same, but the header value is read from a file (re-read for each new
                              connection, so a file rotated in place is picked up). Set only one of
                              the two. [env: ${PROXY_AUTHORIZATION_FILE_ENV_VAR}]

Runtime:
  --capacity &lt;n>              Max concurrent sessions (default: ${DEFAULT_RUNNER_CAPACITY\})
  --base-dir &lt;path>           Base directory for repo checkouts (default: ${DEFAULT_RUNNER_BASE_DIR};
                              required on Windows, which has no default)
                              [env: SELF_HOSTED_RUNNER_BASE_DIR]
  --exec-path &lt;path>          Binary to spawn for child sessions. Default: this process's own binary.
                              [env: SELF_HOSTED_RUNNER_EXEC_PATH]
  --hooks-dir &lt;path>          Directory of lifecycle hook scripts (checkout, command, post-session).
                              Absent hooks fall through to built-in behavior.
                              [env: SELF_HOSTED_RUNNER_HOOKS_DIR]
  --session-stop-grace-sec &lt;n>
                              How long to wait for the Claude process to exit cleanly after a
                              session ends, before force-killing it. The post-session hook runs
                              after this. Default: ${SESSION_STOP_GRACE_MS/1000\}.
                              [env: SELF_HOSTED_RUNNER_SESSION_STOP_GRACE_MS, in ms]
  --post-session-hook-timeout-sec &lt;n>
                              SIGTERM budget for the post-session lifecycle hook, on every session
                              end including runner shutdown. Default: ${POST_SESSION_HOOK_TIMEOUT_MS/1000}.
                              [env: SELF_HOSTED_RUNNER_POST_SESSION_HOOK_TIMEOUT_MS, in ms]
  --drain-wait-sec &lt;n>        On SIGTERM/SIGINT, wait up to N seconds for each session's in-flight
                              turn (a foreground tool call) and running background tasks to finish
                              before sending the session process its SIGTERM. Adds N to the
                              advertised shutdown budget.
                              A background task that has JUST finished also counts as
                              in-flight until the follow-up turn that reads its result starts
                              (bounded by SELF_HOSTED_RUNNER_BG_RESULT_GRACE_MS, in ms;
                              default: ${BACKGROUND_RESULT_GRACE_MS/1000\}s; 0 or an unusable value falls back
                              to the default — the hold cannot be disabled).
                              Default: 0 (send SIGTERM immediately). Max: 86400.
                              [env: SELF_HOSTED_RUNNER_DRAIN_WAIT_MS, in ms]
                              (--drain-wait-bg-tasks-sec is a deprecated alias for this flag.)
  --git-ssh-rewrite &lt;host>    Rewrite https://&lt;host>/... source URLs to git@&lt;host>:... (repeatable).
                              For SSH-only git hosts.
  --git-host-rewrite &lt;f>=&lt;t>  Rewrite https://&lt;f>/... source URLs to https://&lt;t>/... (repeatable).
                              For split-horizon DNS where the runner reaches GHE via a different
                              hostname than the control plane. Applied before --git-ssh-rewrite.
  --use-anthropic-git-proxy   Opt this runner into Anthropic-managed git (clones are authenticated
                              server-side with the session creator's stored GitHub OAuth token, or
                              the org's GitHub App installation token for bot/agent sessions; you
                              don't manage git auth on the runner). Supersedes --git-host-rewrite
                              and --git-ssh-rewrite.
                              WARNING: deletes and replaces the HOME-level git config of the
                              account running the runner: ~/.gitconfig, the GIT_CONFIG_GLOBAL target
                              if set, and the whole $XDG_CONFIG_HOME/git directory (default
                              ~/.config/git; config, ignore, attributes and anything else in it),
                              at startup and before every session, with no backup, so one session's
                              git settings cannot reach the next.
                              The replacement holds only this runner's git credential settings for
                              the Anthropic API host (plus the --configure-git settings, if set) and
                              is left in place when the runner exits. Run this flag only under a
                              dedicated runner account or container, never a personal login; keep
                              operator git config in /etc/gitconfig or use --configure-git.
                              [env: CLAUDE_RUNNER_USE_GIT_PROXY=1]
  --configure-git             Set global git identity to Claude &lt;noreply@anthropic.com> and enable
                              commit signing via Anthropic's signing service, matching 1P sessions.
                              Writes ~/.gitconfig at runner startup. Without this flag, your image
                              must provide its own git identity.
                              [env: SELF_HOSTED_RUNNER_CONFIGURE_GIT=1]
  --push-outcome-on-release   On a runner-initiated non-completed session end (SIGTERM drain,
                              idle-release, failed), push every tracked outcome branch to origin
                              before deleting it, so in-flight commits survive a runner restart.
                              Skipped on server-initiated deassign. On a resumed session (worker
                              epoch > 1), the prep path fetches any previously pushed outcome
                              branch from origin and continues from it, so histories stay
