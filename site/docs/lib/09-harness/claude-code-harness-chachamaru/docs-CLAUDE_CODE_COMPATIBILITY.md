---
title: "Claude Code Compatibility"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/CLAUDE_CODE_COMPATIBILITY.md"
sourceRel: "docs/CLAUDE_CODE_COMPATIBILITY.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/CLAUDE_CODE_COMPATIBILITY.md"
sourceSha256: "abecad4171ae0cef654942964671881fa6831ca98d1e326ad5ddfa5184016cdc"
pageSha256: "abecad4171ae0cef654942964671881fa6831ca98d1e326ad5ddfa5184016cdc"
contentMode: "local-full"
zh: ""
---

# Claude Code Compatibility

Last updated: 2026-07-10

## Supported Baseline

- Claude Code: `v2.1+`
- Plugin version: `5.15.0`
- Guardrail runtime: bundled Go-native `harness` binary

Node.js is not required for the Go-native guardrail engine. Optional skills and
repository maintenance scripts can still declare their own tool requirements;
that does not change the runtime baseline above.

## Latest Verified Snapshot

The 2026-07-10 local audit verified these version surfaces:

- `VERSION`: `5.0.0`
- `.claude-plugin/plugin.json`: `5.0.0`
- `harness.toml`: `5.0.0`
- `./bin/harness-darwin-arm64 version`: `5.0.0 (Hokage)`

The binary observation is for the shipped macOS arm64 artifact only. Other
platform binaries remain subject to the repository's binary/source drift and
release checks; this snapshot does not claim that they were executed locally.

Host support tiers are not maintained in this document. They are derived from
[`hosts/registry.json`](https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/hosts/registry.json) and checked against public docs
by `tests/test-host-registry.sh` and `tests/test-support-claim-wording.sh`.

## Maintenance Policy

Compatibility has two layers:

- **Supported baseline**: the minimum supported Claude Code version and the
  current plugin/runtime architecture.
- **Dated verification**: the version surfaces and commands actually observed
  on a stated date.

Do not infer a full version matrix from a dated snapshot. After upgrading
Claude Code or the plugin, rerun the checks below before publishing a stronger
compatibility claim.

## What This Compatibility Promise Covers

- `/harness-setup`, `/harness-plan`, `/harness-work`, `/harness-review`, and
  `/harness-release`
- the Go-native policy and hook runtime under [`go/`](https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/go/README.md)
- hook shims under [`hooks/`](https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/hooks/README.md)
- packaging, host-tier, and mirror checks enforced by CI

## Windows Checkout Note

On Windows, Git often defaults to `core.symlinks=false`. Public `harness-*`
command skills are shipped as real directories in `skills/`,
`codex/.codex/skills/`, and `opencode/skills/`, so they remain discoverable
after checkout. Session-start repair still handles broken extension links under
`skills/extensions/`.

Native Windows Git Bash/MSYS/Cygwin sessions resolve
`bin/harness-windows-amd64.exe` through the `bin/harness` shim. WSL2 sessions
use the Linux binary. Windows hook behavior and binary/source parity remain
release-gated checks, not assumptions made by this document.

## What Requires Extra Validation

These paths depend on host tools or local environment setup and must be checked
in the environment where they will run:

- Breezing / agent teams
- Codex CLI integration
- Cursor workflows (`internal-compatible`, not public `supported`)
- video or slide generation
- memory / daemon integrations

## Recommended Upgrade Check

All commands below exist in the current repository:

```bash
./tests/validate-plugin.sh
./scripts/ci/check-consistency.sh
bash tests/test-host-registry.sh
bash tests/test-support-claim-wording.sh
cd go && go test ./...
bash scripts/release-preflight.sh --dry-run
```

If you rely on `/harness-work all`, also run the success/failure fixture
contract in [Work All Evidence Pack](/lib/09-harness/claude-code-harness-chachamaru/docs-evidence-work-all).
