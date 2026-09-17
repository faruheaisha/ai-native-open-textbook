---
title: "Scorecard Code Scanning Snapshot - 2026-05-27"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/evidence/scorecard-alerts-2026-05-27.md"
sourceRel: "docs/evidence/scorecard-alerts-2026-05-27.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/evidence/scorecard-alerts-2026-05-27.md"
sourceSha256: "f97ec3c0696c1fae1c9c0e6a271466fd7c55e7eb5411b119d89a51e717d575e4"
pageSha256: "f97ec3c0696c1fae1c9c0e6a271466fd7c55e7eb5411b119d89a51e717d575e4"
contentMode: "local-full"
zh: ""
---

# Scorecard Code Scanning Snapshot - 2026-05-27

## Scope

Repository: `Chachamaru127/claude-code-harness`

Target: open OSSF Scorecard code scanning alerts after the v4.12.5 release.

## Live Inventory

Command:

```bash
gh api --method GET \
  repos/Chachamaru127/claude-code-harness/code-scanning/alerts \
  -f state=open
```

Open alerts before this pass: 13

| Alert | Check | Disposition | Evidence / action |
|-------|-------|-------------|-------------------|
| #1 | Branch-Protection | Fixed in repository settings | `main` now prevents force pushes and branch deletion. It also requires `actionlint`, `validate`, and `test-go` to pass. GitHub marked the original alert fixed at `2026-05-27T07:22:16Z`. |
| #7-#10 | Pinned-Dependencies | Code fix | Removed mutable global npm install/update fallbacks from `scripts/quick-install.sh` and `scripts/check-codex.sh`. |
| #14 | SAST | Code fix | Removed CodeQL path filters so CodeQL runs on every `main` push and every PR targeting `main`, matching GitHub's CodeQL push/PR/schedule guidance. |
| #13 | Fuzzing | Code fix | Added a Go fuzz target for the user-editable `harness.toml` parser boundary. |
| #2-#5 | Binary-Artifacts | Annotate / dismiss as intentional payload | The four platform binaries are required for Claude plugin marketplace installs because release assets are not part of the marketplace git-clone payload. `tests/test-distribution-archive.sh` now requires all shipped platform binaries so accidental removal fails CI. |
| #12 | CII-Best-Practices | Annotate / dismiss as policy defer | The OpenSSF Best Practices badge is an external attestation program. This release line keeps repo-local security gates and records the CII badge as deferred. |
| #11 | Code-Review | Harness policy gate; history-dependent alert remains | This project treats `harness-review` / Codex companion review approval as the merge review gate. GitHub human-review enforcement is not required because it conflicts with the Harness release flow and self-hosted plugin workflow. |

## Branch Protection State

Observed after update:

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["actionlint", "validate", "test-go"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

`required_pull_request_reviews` stays null intentionally. For this repository, the review gate is Harness review evidence (`harness-review` / Codex companion review), not GitHub's human-review enforcement. This preserves the intended flow: when Harness review approves and required checks pass, the PR can be merged.

`enforce_admins` stays false intentionally so release-complete marker commits can still be pushed by an administrator when the release flow needs them.

## Verification

```bash
bash -n scripts/quick-install.sh scripts/check-codex.sh
git diff --check
python3 - <<'PY'
import yaml
for path in ['scorecard.yml', '.github/workflows/codeql.yml']:
    with open(path, 'r', encoding='utf-8') as f:
        yaml.safe_load(f)
    print(path, 'ok')
PY
bash tests/test-distribution-archive.sh
cd go && go test ./pkg/config
cd go && go test -run '^$' -fuzz=FuzzParseBytes -fuzztime=3s ./pkg/config
cd go && go test ./...
bash tests/validate-plugin.sh
bash scripts/ci/check-consistency.sh
```

Observed result:

- shell syntax / whitespace: PASS
- YAML parse for `scorecard.yml` and CodeQL workflow: PASS
- distribution archive check: PASS
- config package tests: PASS
- fuzz smoke: PASS, `1,175,231` execs in the bounded local run
- Go test suite: PASS
- plugin validation: PASS, 95 checks, 0 failures
- consistency check: PASS

## External References

- OSSF Scorecard maintainer annotations: https://github.com/ossf/scorecard/blob/main/config/README.md
- OSSF Scorecard checks: https://github.com/ossf/scorecard/blob/main/docs/checks.md
- GitHub CodeQL workflow frequency guidance: https://docs.github.com/en/code-security/reference/code-scanning/workflow-configuration-options
- GitHub branch protection REST API: https://docs.github.com/en/rest/branches/branch-protection
