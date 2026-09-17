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
pageSha256: "854b5e10bf2ec638b1c280d3c870ea0282f38f85a1ef39774b33b9e5ec1fc649"
contentMode: "local-full"
zh: ""
---

## End-to-End Walkthrough

This walkthrough shows how GSD phases connect for a typical single-phase project — a small Node.js REST API that validates webhook signatures. Follow it to understand what each command does, what it creates, and how the next command consumes it.

### 1. Create the project

```
/gsd-new-project
```

GSD asks questions about your idea, spawns parallel research agents, extracts requirements, and creates a roadmap. You approve the roadmap before any code is written.

**Example output (abridged):**

```
> What are you building?
  A webhook signature validator middleware for Express apps.

> Who's the user?
  Backend developers integrating third-party webhooks (Stripe, GitHub, Shopify).

[Research agents run in parallel...]
[Requirements extracted...]

Roadmap (1 phase):
  Phase 1 — Core middleware: HMAC-SHA256 signature validation,
             timing-safe compare, configurable tolerance window.

Approve? [y/n]
```

**What gets created:**

```
.planning/
  PROJECT.md          # "Webhook validator middleware — Express, HMAC-SHA256..."
  REQUIREMENTS.md     # REQ-001: Validate signature header; REQ-002: Timing-safe...
  ROADMAP.md          # Phase 1 status: pending
  STATE.md            # Session memory, current position
```

`ROADMAP.md` excerpt:
```markdown
## Phase 1 — Core middleware
**Status:** pending
**Goal:** HMAC-SHA256 signature validation with timing-safe compare and a
configurable replay-protection tolerance window.
**Requirements:** REQ-001, REQ-002, REQ-003
```

### 2. Discuss and plan the phase

```
/gsd-discuss-phase 1
```

GSD reads the phase goal and asks about your implementation preferences before any planning happens. This is where you shape *how* it builds — not just *what* it builds.

```
> How should invalid signatures be handled?
  Reject immediately with 401, log the raw header for debugging.

> Should the tolerance window be configurable per-route or global?
  Global config, but allow per-route override via middleware options.

> Any library preferences for HMAC?
  Node built-in crypto only — no extra dependencies.
```

**What gets created:** `.planning/phases/01-core-middleware/CONTEXT.md`

`CONTEXT.md` excerpt:
```markdown
## Implementation Decisions
- Invalid signatures → 401, log raw header
- Tolerance window → global default, per-route override via options object
- HMAC library → Node built-in crypto (no external deps)
- Error format → { error: "invalid_signature", ts: <epoch> }
```

Now plan the phase:

```
/gsd-plan-phase 1
```

GSD spawns four parallel research agents (stack, features, architecture, pitfalls), then a planner reads `CONTEXT.md` + research findings and creates atomic task plans. A plan-checker verifies each plan achieves the phase goal before saving.

**What gets created:**

```
.planning/phases/01-core-middleware/
  RESEARCH.md         # Findings: crypto.timingSafeEqual docs, replay attack patterns...
  01-01-PLAN.md       # Task: create validateSignature() core function
  01-02-PLAN.md       # Task: Express middleware wrapper + error handling
```

`01-01-PLAN.md` excerpt:
```xml
<task type="auto">
  <name>Create validateSignature core function</name>
  <files>src/validate.js, src/validate.test.js</files>
  <action>
    Use crypto.createHmac('sha256', secret).update(rawBody).digest('hex').
    Compare with crypto.timingSafeEqual() — never === or ==.
    Accept tolerance window in ms; reject if |timestamp - now| exceeds it.
  </action>
  <verify>npm test -- --grep "validateSignature"</verify>
  <done>All timing-safe comparison tests pass; replay outside window returns false</done>
</task>
```

### 3. Execute

```
/gsd-execute-phase 1
```

GSD groups plans into waves (parallel where independent, sequential where dependent), spawns a fresh 200k-context executor per plan, and commits each task atomically.

```
Wave 1 (parallel):
  [Executor A] → 01-01-PLAN.md (core function)  ✓ committed
  [Executor B] → 01-02-PLAN.md (middleware)      ✓ committed

[Verifier] Checking codebase against phase goals...
  REQ-001 validateSignature() ✓
  REQ-002 timing-safe compare ✓
  REQ-003 tolerance window    ✓
  Status: PASS
```

**Git history after execution:**

```
a1b2c3d feat(01-01): implement validateSignature with timingSafeEqual
d4e5f6g feat(01-02): add Express middleware wrapper and 401 error format
h7i8j9k chore(01): phase 1 verification — all requirements met
```

**What gets created:**

```
.planning/phases/01-core-middleware/
  01-01-SUMMARY.md    # "Implemented validateSignature(), 47 lines, tests passing"
  01-02-SUMMARY.md    # "Middleware wraps validator, logs raw header on 401"
  VERIFICATION.md     # REQ-001 ✓, REQ-002 ✓, REQ-003 ✓ — PASS
```

`STATE.md` is updated automatically to reflect the new phase status:

```markdown
## Current Position
Phase 1 — Core middleware: executed, pending verify
```

### 4. Verify

```
/gsd-verify-work 1
```

GSD extracts testable deliverables from the phase goal and walks you through them one at a time.

```
[1/3] Can you require the middleware and pass it to an Express route?
> yes

[2/3] Does a request with a valid signature return 200?
> yes

[3/3] Does a request with an invalid signature return 401 with { error: "invalid_signature" }?
> no — I'm getting a 500 instead

[Diagnosing...]
Root cause: middleware catches crypto.timingSafeEqual TypeError when
buffers are different lengths. Fix: normalize to same length before compare.

Fix plan created: .planning/phases/01-core-middleware/01-03-PLAN.md
Run /gsd-execute-phase 1 to apply.
```

After re-running execute and re-verifying:

```
All 3 checks passed. Phase 1 verified.
```

**What gets created:** `.planning/phases/01-core-middleware/UAT.md`

### What's next

Once a phase is verified, ship it:

```
/gsd-ship 1          # Creates a PR with auto-generated body
```

The PR body always includes the required GSD sections: `Summary`, `Changes`, `Requirements Addressed`, `Verification`, and `Key Decisions`. During `/gsd-new-project`, you can also enable optional PRD-style sections such as user stories, acceptance criteria, risks, release criteria, and stakeholder approval. These are appended through `ship.pr_body_sections` and do not change the required core sections.

For setup examples, field definitions, and troubleshooting, see [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md).

For multi-phase projects, repeat the loop:

```
/gsd-discuss-phase 2
/gsd-plan-phase 2
/gsd-execute-phase 2
/gsd-verify-work 2
```

Or let GSD figure out the next step automatically:

```
/gsd-progress --next
```

When all phases are done:

```
/gsd-audit-milestone     # Verify all requirements shipped
/gsd-complete-milestone  # Archive, tag release
```

**Relevant flags covered in this walkthrough:**

| Flag | Command | When to use |
| ---- | ------- | ----------- |
| `--auto` | `/gsd-new-project` | Skip interactive questions, ingest from a PRD file |
| `--research` | `/gsd-quick` | Add a research agent to an ad-hoc task |
| `--validate` | `/gsd-quick` | Add plan-checking and post-execution verification |
| `--chain` | `/gsd-discuss-phase` | Auto-chain discuss → plan → execute without stopping |
| `--skip-research` | `/gsd-plan-phase` | Skip research agents when the domain is already familiar |
| `--draft` | `/gsd-ship` | Create a draft PR instead of a ready-for-review one |

For the full command reference with all flags, see [`docs/COMMANDS.md`](/lib/10-context-memory/get-shit-done/docs-COMMANDS). For configuration options (model profiles, workflow agents, git branching), see [`docs/CONFIGURATION.md`](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index).
