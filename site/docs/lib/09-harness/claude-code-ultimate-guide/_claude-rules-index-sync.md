---
title: "Index Sync"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.claude/rules/index-sync.md"
sourceRel: ".claude/rules/index-sync.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.claude/rules/index-sync.md"
sourceSha256: "d0764b3dae33637edd6214776a9746d7169a0ebf49ad9f5999b096ea75e31eb3"
pageSha256: "d0764b3dae33637edd6214776a9746d7169a0ebf49ad9f5999b096ea75e31eb3"
contentMode: "local-full"
zh: ""
---

# Index Sync

When `guide/` gains a page, a section, a named concept, or a named tool, the machine-readable index has to learn about it in the same pass. The index feeds the MCP server and the landing's Cmd+K palette, so content nobody indexed is content nobody can find.

## What to update

| File | When | How |
|------|------|-----|
| `machine-readable/reference.yaml` | Always | A `deep_dive` key pointing at `path#anchor`. Prefer anchors over `path:LINE`, which drifts every time lines are inserted above. |
| `mcp-server/content/reference.yaml` | Always | Manual copy. No resync script exists, and it has drifted before. |
| `llms-full.txt` | Guide-level structure only | A new top-level area, not every section. |
| `llms.txt`, `machine-readable/llms.txt` | Coverage list changes | Keep the two byte-identical. |

## Verify

```bash
python3 scripts/check-index-coverage.py --check   # every guide file reachable
python3 scripts/validate-reference-yaml.py --ci   # anchors resolve, paths exist
```

Both run in CI (`.github/workflows/index-integrity.yml`). The coverage gate is at zero, so a new unindexed file fails the build.

A `deep_dive` key that is added, renamed, or removed also needs `pnpm build:search` in the landing repo, otherwise the search palette keeps serving the old entry.

## Enforcement

The `Stop` hook `.claude/hooks/index-sync-reminder.sh` reports at end of turn when `guide/` changed and no index file did. It warns, it never blocks: a turn can legitimately end mid-edit, and a hook that vetoes that gets disabled.
