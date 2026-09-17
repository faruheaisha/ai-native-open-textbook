---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "26a3d2317cdc6c19a8bbfad62cd991ad3e31f5522ed4b9a973aef2829031bf70"
contentMode: "local-full"
zh: ""
---

## Usage Examples

### New Project (Full Cycle)

```bash
claude --dangerously-skip-permissions
/gsd-new-project            # Answer questions, configure, approve roadmap
/clear
/gsd-discuss-phase 1        # Lock in your preferences
/gsd-ui-phase 1             # Design contract (frontend phases)
/gsd-plan-phase 1           # Research + plan + verify
/gsd-execute-phase 1        # Parallel execution
/gsd-verify-work 1          # Manual UAT
/gsd-ship 1                 # Create PR from verified work
/gsd-ui-review 1            # Visual audit (frontend phases)
/clear
/gsd-progress --next                   # Auto-detect and run next step
...
/gsd-audit-milestone        # Check everything shipped
/gsd-complete-milestone     # Archive, tag, done
/gsd-pause-work --report         # Generate session summary
```

### New Project from Existing Document

```bash
/gsd-new-project --auto @prd.md   # Auto-runs research/requirements/roadmap from your doc
/clear
/gsd-discuss-phase 1               # Normal flow from here
```

### Existing Codebase

```bash
/gsd-map-codebase           # Analyze what exists (parallel agents)
/gsd-new-project            # Questions focus on what you're ADDING
# (normal phase workflow from here)
```

**Post-execute drift detection (#2003).** After every `/gsd-execute-phase`,
GSD checks whether the phase introduced enough structural change
(new directories, barrel exports, migrations, or route modules) to make
`.planning/codebase/STRUCTURE.md` stale. If it did, the default behavior is
to print a one-shot warning suggesting the exact `/gsd-map-codebase --paths …`
invocation to refresh just the affected subtrees. Flip the behavior with:

```bash
/gsd-settings workflow.drift_action auto-remap       # remap automatically
/gsd-settings workflow.drift_threshold 5             # tune sensitivity
```

The gate is non-blocking: any internal failure logs and the phase continues.

### Quick Bug Fix

```bash
/gsd-quick
> "Fix the login button not responding on mobile Safari"
```

### Resuming After a Break

```bash
/gsd-progress               # See where you left off and what's next
# or
/gsd-resume-work            # Full context restoration from last session
```

### Preparing for Release

```bash
/gsd-audit-milestone        # Check requirements coverage, detect stubs
/gsd-complete-milestone     # Archive, tag, done
```

### Speed vs Quality Presets

| Scenario    | Mode          | Granularity | Profile    | Research | Plan Check | Verifier |
| ----------- | ------------- | ----------- | ---------- | -------- | ---------- | -------- |
| Prototyping | `yolo`        | `coarse`    | `budget`   | off      | off        | off      |
| Normal dev  | `interactive` | `standard`  | `balanced` | on       | on         | on       |
| Production  | `interactive` | `fine`      | `quality`  | on       | on         | on       |

**Skipping discuss-phase in autonomous mode:** When running in `yolo` mode with well-established preferences already captured in PROJECT.md, set `workflow.skip_discuss: true` via `/gsd-settings`. This bypasses the discuss-phase entirely and writes a minimal CONTEXT.md derived from the ROADMAP phase goal. Useful when your PROJECT.md and conventions are comprehensive enough that discussion adds no new information.

### Mid-Milestone Scope Changes

```bash
/gsd-phase                  # Append a new phase to the roadmap (default mode)
# or
/gsd-phase --insert 3       # Insert urgent work between phases 3 and 4
# or
/gsd-phase --remove 7       # Descope phase 7 and renumber
# or
/gsd-phase --edit 4         # Edit any field of phase 4 in place
```

### Multi-Project Workspaces

Work on multiple repos or features in parallel with isolated GSD state.

```bash
# Create a workspace with repos from your monorepo
/gsd-workspace --new --name feature-b --repos hr-ui,ZeymoAPI

# Feature branch isolation — worktree of current repo with its own .planning/
/gsd-workspace --new --name feature-b --repos .

# Then cd into the workspace and initialize GSD
cd ~/gsd-workspaces/feature-b
/gsd-new-project

# List and manage workspaces
/gsd-workspace --list
/gsd-workspace --remove feature-b
```

Each workspace gets:

- Its own `.planning/` directory (fully independent from source repos)
- Git worktrees (default) or clones of specified repos
- A `WORKSPACE.md` manifest tracking member repos
