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
pageSha256: "f03e98959e132d89bb4b6326da2cdf98d3511a81ba5ac8fd5bff80b4e59f1c68"
contentMode: "local-full"
zh: ""
---

## UI Design Contract

### Why

AI-generated frontends are visually inconsistent not because Claude Code is bad at UI but because no design contract existed before execution. Five components built without a shared spacing scale, color contract, or copywriting standard produce five slightly different visual decisions.

`/gsd-ui-phase` locks the design contract before planning. `/gsd-ui-review` audits the result after execution.

### Commands

| Command              | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `/gsd-ui-phase [N]`  | Generate UI-SPEC.md design contract for a frontend phase |
| `/gsd-ui-review [N]` | Retroactive 6-pillar visual audit of implemented UI      |

### Workflow: `/gsd-ui-phase`

**When to run:** After `/gsd-discuss-phase`, before `/gsd-plan-phase` — for phases with frontend/UI work.

**Flow:**

1. Reads CONTEXT.md, RESEARCH.md, REQUIREMENTS.md for existing decisions
2. Detects design system state (shadcn components.json, Tailwind config, existing tokens)
3. shadcn initialization gate — offers to initialize if React/Next.js/Vite project has none
4. Asks only unanswered design contract questions (spacing, typography, color, copywriting, registry safety)
5. Writes `\{phase\}-UI-SPEC.md` to phase directory
6. Validates against 6 dimensions (Copywriting, Visuals, Color, Typography, Spacing, Registry Safety)
7. Revision loop if BLOCKED (max 2 iterations)

**Output:** `\{padded_phase\}-UI-SPEC.md` in `.planning/phases/\{phase-dir\}/`

### Workflow: `/gsd-ui-review`

**When to run:** After `/gsd-execute-phase` or `/gsd-verify-work` — for any project with frontend code.

**Standalone:** Works on any project, not just GSD-managed ones. If no UI-SPEC.md exists, audits against abstract 6-pillar standards.

**6 Pillars (scored 1-4 each):**

1. Copywriting — CTA labels, empty states, error states
2. Visuals — focal points, visual hierarchy, icon accessibility
3. Color — accent usage discipline, 60/30/10 compliance
4. Typography — font size/weight constraint adherence
5. Spacing — grid alignment, token consistency
6. Experience Design — loading/error/empty state coverage

**Output:** `\{padded_phase\}-UI-REVIEW.md` in phase directory with scores and top 3 priority fixes.

### Configuration

| Setting                   | Default | Description                                                 |
| ------------------------- | ------- | ----------------------------------------------------------- |
| `workflow.ui_phase`       | `true`  | Generate UI design contracts for frontend phases            |
| `workflow.ui_safety_gate` | `true`  | plan-phase prompts to run /gsd-ui-phase for frontend phases |

Both follow the absent=enabled pattern. Disable via `/gsd-settings`.

### shadcn Initialization

For React/Next.js/Vite projects, the UI researcher offers to initialize shadcn if no `components.json` is found. The flow:

1. Visit `ui.shadcn.com/create` and configure your preset
2. Copy the preset string
3. Run `npx shadcn init --preset \{paste\}`
4. Preset encodes the entire design system — colors, border radius, fonts

The preset string becomes a first-class GSD planning artifact, reproducible across phases and milestones.

### Registry Safety Gate

Third-party shadcn registries can inject arbitrary code. The safety gate requires:

- `npx shadcn view \{component\}` — inspect before installing
- `npx shadcn diff \{component\}` — compare against official

Controlled by `workflow.ui_safety_gate` config toggle.

### Screenshot Storage

`/gsd-ui-review` captures screenshots via Playwright CLI to `.planning/ui-reviews/`. A `.gitignore` is created automatically to prevent binary files from reaching git. Screenshots are cleaned up during `/gsd-complete-milestone`.
