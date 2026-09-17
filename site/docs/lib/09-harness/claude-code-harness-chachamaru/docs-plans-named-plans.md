---
title: "Named Plans Registry"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/plans/named-plans.md"
sourceRel: "docs/plans/named-plans.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/plans/named-plans.md"
sourceSha256: "4489c871185022e5937ea4bdd4cbb885910c04ef396a0c355be319d0d8268047"
pageSha256: "4489c871185022e5937ea4bdd4cbb885910c04ef396a0c355be319d0d8268047"
contentMode: "local-full"
zh: ""
---

# Named Plans Registry

Named plans let one repo keep multiple Plans files without making every harness
surface guess which file is authoritative.

## Files

- `Plans.md` remains the default plan.
- `plans/manifest.json` registers additional named plans.
- `.claude/state/active-plan.json` stores the currently selected plan for local
  harness commands.

Example manifest:

```json
{
  "schema_version": "plans-manifest.v1",
  "plans": {
    "default": "Plans.md",
    "roadmap": {
      "path": "plans/roadmap.md"
    }
  }
}
```

## Commands

```bash
scripts/plan-registry.sh list
scripts/plan-registry.sh path roadmap
scripts/plan-registry.sh switch roadmap
scripts/codex-loop.sh start all --plan roadmap
scripts/plans-issue-bridge.sh --plan roadmap --format markdown
node scripts/generate-sprint-contract.js --plan roadmap 9.1.1
```

`--plan NAME` is intentionally explicit for long-running or export flows. The
active plan is convenient for local work, but CI and release automation should
pass the plan name directly when more than one plan exists.

## Safety Rules

- Plan names may contain only letters, numbers, `_`, `.`, and `-`.
- Manifest paths must be relative to the project root.
- Absolute paths, `..` traversal, and symlink escapes outside the repo are
  rejected before any plan is read.
- `--plan` cannot be combined with an explicit `--plans PATH` argument in the
  issue bridge.

## Operational Rule

One harness run should use one named plan from start to finish. Do not switch the
active plan while `codex-loop` or a worker run is in progress; start another run
with a separate `--plan` value instead.
