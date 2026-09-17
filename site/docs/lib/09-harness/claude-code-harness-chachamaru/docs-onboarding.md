---
title: "Tool-First Onboarding"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/onboarding/index.md"
sourceRel: "docs/onboarding/index.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/onboarding/index.md"
sourceSha256: "0271595438dbe55b6f1f0254d971a843917a696e999d632b5ed3dd5faac19b40"
pageSha256: "0271595438dbe55b6f1f0254d971a843917a696e999d632b5ed3dd5faac19b40"
contentMode: "local-full"
zh: ""
---

# Tool-First Onboarding

Start here by choosing the tool you are using now (今使っている tool).
Claude Code Harness is still Claude-first, but Phase 73 makes the entry point
explicit for every host so users do not mistake a candidate route for a proven
install path.

Detailed commands live in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install). Existing users should run
the report-first migration path in [migration.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-migration) before cleanup.

## Support Tier Rule

Public wording must keep these tiers unchanged:

| Tool | Phase 73 tier | Start here |
|---|---|---|
| Claude Code | `supported` | Use the Claude plugin install path in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#claude-code-supported). |
| Codex CLI | `supported` | Use `scripts/setup-codex.sh --user` in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#codex-cli-supported). |
| Codex app | `candidate` | Use the candidate smoke checklist in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#codex-app-candidate); do not reuse Codex CLI proof. |
| OpenCode | `internal-compatible` | Use `scripts/setup-opencode.sh` in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#opencode-internal-compatible). |
| Cursor | `supported` | Use `scripts/setup-cursor.sh` in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#cursor-supported); containment is harness-side — see [docs/CURSOR_INTEGRATION.md](/lib/09-harness/claude-code-harness-chachamaru/docs-CURSOR_INTEGRATION). |
| Grok | `supported` | Use `scripts/setup-grok.sh` in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#grok-supported); Claude-envelope PreToolUse floor — not full Claude hook parity. |
| Hermes Agent | `candidate` | Use the candidate boundary in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#hermes-agent-candidate); manual symlink research only. |
| GitHub Copilot CLI | `candidate` | Use the candidate boundary in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#github-copilot-cli-candidate). |
| Antigravity CLI | `future/unsupported` | Use the unsupported boundary in [install.md](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install#antigravity-cli-futureunsupported). |

`not_observed != absent`: missing local runtime evidence means the capability is
not observed in the current artifact set. It does not prove the capability is
absent.

Public **正式対応** maps to EN `supported` for Claude Code, Codex CLI, Cursor, and
Grok (H8 pin). Remaining rows use 互換利用可 or 試験対応 per tier. OpenCode, the
separate app candidate path, Hermes Agent, GitHub Copilot CLI, and Antigravity CLI
must not borrow that wording until their own H1–H8 pass
(`docs/spec/planning-and-host-adapter.md`).

| EN tier | JP public wording |
|---|---|
| `supported` | 正式対応 |
| `internal-compatible` | 互換利用可 / 制限付き対応 |
| `candidate` | 試験対応 / プレビュー |
| `future/unsupported` | 非対応 / 将来検討 |

## Choose The Route

| If you are using... | Do this first | Do not claim |
|---|---|---|
| Claude Code | Install the marketplace plugin, then run `/harness-setup`. | Generic multi-host support beyond proven gates. |
| Codex CLI | Run `scripts/setup-codex.sh --user`, restart Codex, then invoke `$harness-plan`. | Direct Codex plugin install or Codex app parity. |
| OpenCode | Run `scripts/setup-opencode.sh`, start OpenCode, then ask for `harness-plan`. | Claude hook parity or runtime auto-routing parity. |
| Codex app | Record candidate smoke evidence only. | That app behavior is proven by Codex CLI docs or help output. |
| Cursor | Run `scripts/setup-cursor.sh`, reload Cursor, then invoke `/breezing` or `/harness-plan`. | Top-tier Cursor adapter or Claude hook parity. |
| Grok | Run `scripts/setup-grok.sh`, restart Grok, then invoke `/harness-plan` or `/breezing`. | Public top-tier claim for the Grok adapter; Claude SessionStart/PreToolUse parity. |
| Hermes Agent | Treat manual symlink exposure as candidate research only. | Public Hermes support, Claude hook parity, or runtime workflow parity. |
| GitHub Copilot CLI | Treat it as CLI capability research only. | Harness bootstrap support. |
| Antigravity CLI | Keep it out of end-user install flow. | Install support, setup support, or adapter support. |

## First Successful Session

A route is usable only when it has all of these:

- first prompt,
- first command,
- verification command,
- success look,
- support tier and known asymmetry.

For candidate and unsupported hosts, the success look is not "installed". It is
"the boundary stayed honest": evidence is recorded as `candidate`,
`future/unsupported`, `manual`, or `not observed`.
