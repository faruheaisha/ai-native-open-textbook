---
title: "Refactor Clean"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/refactor-clean.md"
sourceRel: "commands/refactor-clean.md"
rawUrl: "/raw/09-harness/ecc/commands/refactor-clean.md"
sourceSha256: "be911e404a89e79cc878e20ba28b0feeacc2350db8710624622d88a453bf13db"
pageSha256: "be911e404a89e79cc878e20ba28b0feeacc2350db8710624622d88a453bf13db"
contentMode: "local-full"
zh: ""
---

# Refactor Clean

Safely identify and remove dead code with test verification at every step.

## Step 1: Detect Dead Code

Run analysis tools based on project type:

| Tool | What It Finds | Command |
|------|--------------|---------|
| knip | Unused exports, files, dependencies | `npx knip` |
| depcheck | Unused npm dependencies | `npx depcheck` |
| ts-prune | Unused TypeScript exports | `npx ts-prune` |
| vulture | Unused Python code | `vulture src/` |
| deadcode | Unused Go code | `deadcode ./...` |
| cargo-udeps | Unused Rust dependencies | `cargo +nightly udeps` |

If no tool is available, use Grep to find exports with zero imports:
```
# Find exports, then check if they're imported anywhere
```

## Step 2: Categorize Findings

Sort findings into safety tiers:

| Tier | Examples | Action |
|------|----------|--------|
| **SAFE** | Unused utilities, test helpers, internal functions | Delete with confidence |
| **CAUTION** | Components, API routes, middleware | Verify no dynamic imports or external consumers |
| **DANGER** | Config files, entry points, type definitions | Investigate before touching |

## Step 3: Safe Deletion Loop

For each SAFE item:

1. **Run full test suite** — Establish baseline (all green)
2. **Delete the dead code** — Use Edit tool for surgical removal
3. **Re-run test suite** — Verify nothing broke
4. **If tests fail** — Immediately revert with `git checkout -- <file>` and skip this item
5. **If tests pass** — Move to next item

## Step 4: Handle CAUTION Items

Before deleting CAUTION items:
- Search for dynamic imports: `import()`, `require()`, `__import__`
- Search for string references: route names, component names in configs
- Check if exported from a public package API
- Verify no external consumers (check dependents if published)

## Step 5: Consolidate Duplicates

After removing dead code, look for:
- Near-duplicate functions (>80% similar) — merge into one
- Redundant type definitions — consolidate
- Wrapper functions that add no value — inline them
- Re-exports that serve no purpose — remove indirection

## Step 6: Summary

Report results:

```
Dead Code Cleanup
──────────────────────────────
Deleted:   12 unused functions
           3 unused files
           5 unused dependencies
Skipped:   2 items (tests failed)
Saved:     ~450 lines removed
──────────────────────────────
All tests passing PASS:
```

## Rules

- **Never delete without running tests first**
- **One deletion at a time** — Atomic changes make rollback easy
- **Skip if uncertain** — Better to keep dead code than break production
- **Don't refactor while cleaning** — Separate concerns (clean first, refactor later)
