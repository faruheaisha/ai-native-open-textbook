---
title: "Superpowers（Claude Code 技能库）"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
sourceRel: "docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
sourceSha256: "83189840f8591276c481187dc742f99f3e6add14eec0f7a782b5150a89024648"
pageSha256: "cf3982e650b9f86a1ce6903e03e0712238192a70a979b765d44baea45aae72fa"
contentMode: "local-full"
zh: ""
---

### Task 4: Add the two mid-loop ledger fixture helpers to the evals repo

**Files:**
- Modify: `evals/src/setup-helpers/sdd-fixtures.ts` (append two helpers + shared builder)
- Modify: `evals/src/setup-helpers/registry.ts` (import + two entries)
- Modify: `evals/test/setup-helpers-sdd.test.ts` (tests first — TDD)

**Interfaces:**
- Consumes: `HelperContext`, `ensureWorkdir`, `writeFixtureFile`, `runGit` (existing, `src/setup-helpers/\{context,fs,git\}.ts`).
- Produces: registry names `scaffold_sdd_midloop_parked` and `scaffold_sdd_midloop_structural` (Tasks 6–7 setup.sh call these); fixture repo with `docs/superpowers/plans/metrics-plan.md`, Tasks 1–2 implemented and committed, `.superpowers/sdd/progress.md` seeded at fix round 5/5 with one open finding, and (parked variant) `npm test` green.

Work in `evals/` on branch `sdd-fix-loop-scenarios`:

- [ ] **Step 0: Create the evals branch**

```bash
cd evals
git checkout -b sdd-fix-loop-scenarios
```

- [ ] **Step 1: Write the failing tests**

Append to `evals/test/setup-helpers-sdd.test.ts`, inside `describe('sdd fixtures', …)`, importing the two new helpers alongside the existing imports:

```typescript
  test('scaffoldSddMidloopParked seeds a round-5 ledger with real SHAs and green tests', () => {
    const dir = tmp();
    try {
      scaffoldSddMidloopParked({ workdir: dir } as never);
      const ledger = readFileSync(
        join(dir, '.superpowers/sdd/progress.md'),
        'utf8',
      );
      expect(ledger).toContain('Task 1: complete (commits ');
      expect(ledger).toContain('fix round 5/5 (0 addressed, 1 open — ');
      expect(ledger).not.toContain('Task 2: complete');
      expect(ledger).not.toContain('Task 3:');
      // Ledger SHAs are real commits in the fixture repo.
      const head = runGit(['rev-parse', '--short=7', 'HEAD'], dir).trim();
      expect(ledger).toContain(head);
      // The open finding exists in the code: triplicated pad-and-join expression.
      const duration = readFileSync(join(dir, 'src/duration.js'), 'utf8');
      expect(
        duration.split('String(s).padStart(2, "0")').length - 1,
      ).toBeGreaterThanOrEqual(3);
      expect(existsSync(join(dir, 'src/summary.js'))).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test('scaffoldSddMidloopStructural seeds a plan-contradiction finding', () => {
    const dir = tmp();
    try {
      scaffoldSddMidloopStructural({ workdir: dir } as never);
      const ledger = readFileSync(
        join(dir, '.superpowers/sdd/progress.md'),
        'utf8',
      );
      expect(ledger).toContain('fix round 5/5 (0 addressed, 1 open — ');
      expect(ledger).toContain('milliseconds');
      const plan = readFileSync(
        join(dir, 'docs/superpowers/plans/metrics-plan.md'),
        'utf8',
      );
      // Task 2 defines seconds; Task 3 passes milliseconds — the seeded contradiction.
      expect(plan).toContain('formatDuration(seconds)');
      expect(plan).toContain('durationMs');
      expect(existsSync(join(dir, 'src/summary.js'))).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
```

Add `readFileSync` to the `node:fs` import line at the top of the file.

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd evals && bun test test/setup-helpers-sdd.test.ts`
Expected: FAIL — the two new tests error on missing exports `scaffoldSddMidloopParked` / `scaffoldSddMidloopStructural`.

- [ ] **Step 3: Implement the helpers**

Append to `evals/src/setup-helpers/sdd-fixtures.ts`:

```typescript
const MIDLOOP_PACKAGE_JSON = `{
  "name": "metrics-formatter",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
`;

// Task 3's call contract is the variant axis: the parked variant's Task 3
// passes seconds (consistent — the open finding is quality-only), the
// structural variant's Task 3 passes milliseconds (contradicts Task 2's
// seconds contract — the open finding is a plan defect Task 3 builds on).
function midloopPlanBody(task3Arg: 'durationSeconds' | 'durationMs'): string {
  return `# Metrics Formatter — Implementation Plan

Three formatting functions for a metrics dashboard. Implement exactly what
each task specifies.

## Global Constraints

- Node.js ESM project; tests run via \`npm test\` (\`node --test\`).
- Every function is exported from its own file under \`src/\`.

## Task 1: Count Formatter

**File:** \`src/count.js\`

**Requirements:**
- Function named \`formatCount\`
- Takes one parameter \`n\`: a non-negative integer
- Returns \`<n>\` with thousands separated by commas (e.g. \`12,345\`)
- Export the function

**Tests:** Create \`test/count.test.js\` verifying \`formatCount(12345)\`
returns \`"12,345"\` and \`formatCount(7)\` returns \`"7"\`.

**Verification:** \`npm test\`

## Task 2: Duration Formatter

**File:** \`src/duration.js\`

**Requirements:**
- Function named \`formatDuration\`
- Takes one parameter \`seconds\`: a non-negative integer count of seconds
- Returns \`H:MM:SS\` when hours > 0, else \`M:SS\`
- Export the function

**Tests:** Create \`test/duration.test.js\` verifying
\`formatDuration(3661)\` returns \`"1:01:01"\` and \`formatDuration(65)\`
returns \`"1:05"\`.

**Verification:** \`npm test\`

## Task 3: Summary Line

**File:** \`src/summary.js\`

**Requirements:**
- Function named \`summarize\`
- Takes one parameter \`metrics\`: an object with \`events\` (integer) and
  \`${task3Arg}\` (integer)
- Returns \`<formatted events> events in <formatted duration>\`, using
  \`formatCount\` for the events and \`formatDuration(metrics.${task3Arg})\`
  for the duration
- Export the function

**Tests:** Create \`test/summary.test.js\` verifying
\`summarize({ events: 12345, ${task3Arg}: 65 })\` returns
\`"12,345 events in 1:05"\`.

**Verification:** \`npm test\`
`;
}

const MIDLOOP_COUNT_JS = `export function formatCount(n) {
  return String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
}
`;

// The seeded Important finding: the pad-and-join expression appears three
// times. Behavior is correct (tests pass); the finding is quality-only.
const MIDLOOP_DURATION_JS = `export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }
  if (m > 0) {
    return m + ":" + String(s).padStart(2, "0");
  }
  return "0:" + String(s).padStart(2, "0");
}
`;

const MIDLOOP_COUNT_TEST = `import { test } from "node:test";
import assert from "node:assert/strict";
import { formatCount } from "../src/count.js";

test("formatCount separates thousands", () => {
  assert.equal(formatCount(12345), "12,345");
});

test("formatCount leaves small numbers alone", () => {
  assert.equal(formatCount(7), "7");
});
`;

const MIDLOOP_DURATION_TEST = `import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDuration } from "../src/duration.js";

test("formatDuration formats hours", () => {
  assert.equal(formatDuration(3661), "1:01:01");
});

test("formatDuration formats minutes", () => {
  assert.equal(formatDuration(65), "1:05");
});
`;

interface MidloopOptions {
  task3Arg: 'durationSeconds' | 'durationMs';
  openFinding: string;
}

// Builds a repo mid-SDD-execution: Task 1 complete, Task 2 at fix round 5/5
// with one open finding, Task 3 unstarted. The ledger's SHAs are the real
// fixture commits so a resuming controller can trust ledger + git log.
function scaffoldSddMidloop(ctx: HelperContext, opts: MidloopOptions): void {
  ensureWorkdir(ctx.workdir);
  runGit(['init', '-b', 'main'], ctx.workdir);
  runGit(['config', 'user.email', 'drill@test.local'], ctx.workdir);
  runGit(['config', 'user.name', 'Drill Test'], ctx.workdir);

  writeFixtureFile(ctx.workdir, 'package.json', MIDLOOP_PACKAGE_JSON);
  writeFixtureFile(ctx.workdir, '.gitignore', '.superpowers/\n');
  writeFixtureFile(
    ctx.workdir,
    'docs/superpowers/plans/metrics-plan.md',
    midloopPlanBody(opts.task3Arg),
  );
  runGit(['add', '-A'], ctx.workdir);
  runGit(['commit', '-m', 'initial: metrics formatter plan'], ctx.workdir);
  const base = shortHead(ctx.workdir);

  writeFixtureFile(ctx.workdir, 'src/count.js', MIDLOOP_COUNT_JS);
  writeFixtureFile(ctx.workdir, 'test/count.test.js', MIDLOOP_COUNT_TEST);
  runGit(['add', '-A'], ctx.workdir);
  runGit(['commit', '-m', 'Task 1: formatCount with tests'], ctx.workdir);
  const task1Head = shortHead(ctx.workdir);

  writeFixtureFile(ctx.workdir, 'src/duration.js', MIDLOOP_DURATION_JS);
  writeFixtureFile(ctx.workdir, 'test/duration.test.js', MIDLOOP_DURATION_TEST);
  runGit(['add', '-A'], ctx.workdir);
  runGit(['commit', '-m', 'Task 2: formatDuration with tests'], ctx.workdir);
  const task2Base = task1Head;
  const task2Head = shortHead(ctx.workdir);
  let prev = task2Head;

  // Five fix-round commits that never resolve the finding (whitespace-grade
  // churn keeps them honest commits without changing behavior).
  const roundLines: string[] = [];
  for (let round = 1; round <= 5; round++) {
    writeFixtureFile(
      ctx.workdir,
      'src/duration.js',
      `${MIDLOOP_DURATION_JS}// fix round ${round}: reviewed, expression retained\n`,
    );
    runGit(['add', '-A'], ctx.workdir);
    runGit(
      ['commit', '-m', `Task 2 fix round ${round}`],
      ctx.workdir,
    );
    const head = shortHead(ctx.workdir);
    roundLines.push(
      `Task 2: fix round ${round}/5 (0 addressed, 1 open — ${opts.openFinding}; commits ${prev}..${head})`,
    );
    prev = head;
  }

  const ledger = [
    '# SDD Progress Ledger',
    'Plan: docs/superpowers/plans/metrics-plan.md',
    `Task 1: complete (commits ${base}..${task1Head}, review clean)`,
    `Task 2: implementer DONE (commits ${task2Base}..${task2Head})`,
    ...roundLines,
    '',
  ].join('\n');
  writeFixtureFile(ctx.workdir, '.superpowers/sdd/progress.md', ledger);

  writeFixtureFile(
    ctx.workdir,
    '.superpowers/sdd/task-2-report.md',
    `# Task 2 Report

Implemented formatDuration per brief. Tests: test/duration.test.js, 2/2
passing via \`npm test\`, output pristine.

## Fix round appendix

Rounds 1-5 attempted the open review finding below; each re-review returned
NOT ADDRESSED:

- ${opts.openFinding}
`,
  );
}

function shortHead(workdir: string): string {
  return runGit(['rev-parse', '--short=7', 'HEAD'], workdir).trim();
}

// Non-load-bearing open finding: quality-only, nothing downstream consumes
// formatDuration's internals. The breaker should park it and continue.
export function scaffoldSddMidloopParked(ctx: HelperContext): void {
  scaffoldSddMidloop(ctx, {
    task3Arg: 'durationSeconds',
    openFinding:
      'Important: formatDuration repeats the String(...).padStart(2, "0") formatting expression in three branches — extract it',
  });
}

// Load-bearing open finding: the plan's Task 3 passes milliseconds into a
// seconds contract. The breaker should stop via BLOCKED, not park.
export function scaffoldSddMidloopStructural(ctx: HelperContext): void {
  scaffoldSddMidloop(ctx, {
    task3Arg: 'durationMs',
    openFinding:
      'Important: plan contradiction — Task 3 passes milliseconds (durationMs) into formatDuration, whose brief defines seconds; unresolvable within Task 2',
  });
}
```

Note on the `Task 2: implementer DONE` line: it is deliberately NOT one of
the six ledger formats — it is fixture color recording the pre-loop state,
and no check greps for it. The resume rule only keys on `Task <N>: complete`.

- [ ] **Step 4: Register the helpers**

In `evals/src/setup-helpers/registry.ts`, extend the sdd-fixtures import:

```typescript
import {
  addSddAuthPlan,
  scaffoldSddBrokenPlan,
  scaffoldSddMidloopParked,
  scaffoldSddMidloopStructural,
  scaffoldSddQualityDefectPlan,
  scaffoldSddSpecConstraintPlan,
  scaffoldSddYagniPlan,
} from './sdd-fixtures.ts';
```

and add to the dispatch table, alphabetically beside the other sdd entries:

```typescript
  scaffold_sdd_midloop_parked: { fn: scaffoldSddMidloopParked },
  scaffold_sdd_midloop_structural: { fn: scaffoldSddMidloopStructural },
```

- [ ] **Step 5: Run the tests and static gates**

Run: `cd evals && bun test test/setup-helpers-sdd.test.ts test/setup-helpers-registry.test.ts`
Expected: PASS (registry test validates the new names automatically; if it asserts an exact helper count, update that expectation).

Run: `cd evals && bun run check`
Expected: PASS (biome + tsc + bun test). Fix any lint/type complaints (biome may reformat; accept its formatting).

- [ ] **Step 6: Verify the parked fixture's tests are green end-to-end**

```bash
cd "$(mktemp -d)" && export QW=$PWD && cd - >/dev/null
cd evals && QUORUM_WORKDIR="$QW" bun run src/setup-helpers/cli.ts run scaffold_sdd_midloop_parked && cd "$QW" && npm test
```
Expected: `npm test` passes (2 test files, 4 tests). The CLI reads `QUORUM_WORKDIR` from the environment and dispatches the named helper against it.

- [ ] **Step 7: Commit (evals repo)**

```bash
cd evals
git add src/setup-helpers/sdd-fixtures.ts src/setup-helpers/registry.ts test/setup-helpers-sdd.test.ts
git commit -m "feat(sdd-fixtures): mid-loop ledger scaffolds for breaker scenarios"
```
