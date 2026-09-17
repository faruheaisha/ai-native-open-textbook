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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/complete-milestone.md"
sourceRel: "commands/gsd/complete-milestone.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/complete-milestone.md"
sourceSha256: "f88f00311a4f96b034d559cd3f88f5730fd992e1178d001e0b94565b2c23fbde"
pageSha256: "f88f00311a4f96b034d559cd3f88f5730fd992e1178d001e0b94565b2c23fbde"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Mark milestone &#123;&#123;version&#125;&#125; complete, archive to milestones/, and update ROADMAP.md and REQUIREMENTS.md.

Purpose: Create historical record of shipped version, archive milestone artifacts (roadmap + requirements), and prepare for next milestone.
Output: Milestone archived (roadmap + requirements), PROJECT.md evolved, git tagged.
&lt;/objective>

&lt;execution_context>
**Load these files NOW (before proceeding):**

- @~/.claude/get-shit-done/workflows/complete-milestone.md (main workflow)
- @~/.claude/get-shit-done/templates/milestone-archive.md (archive template)
  &lt;/execution_context>

&lt;context>
**Project files:**
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/PROJECT.md`

**User input:**

- Version: &#123;&#123;version&#125;&#125; (e.g., "1.0", "1.1", "2.0")
  &lt;/context>

&lt;process>

**Follow complete-milestone.md workflow:**

0. **Check for audit:**

   - Look for <code v-pre>.planning/v{{version}}-MILESTONE-AUDIT.md</code>
   - If missing or stale: recommend `/gsd:audit-milestone` first
   - If audit status is `gaps_found`: recommend closing the gaps inline
     (the audit output already enumerates them — insert closure phases
     via `/gsd:phase --insert <N>` plus the standard
     discuss/plan/execute chain) before proceeding.
   - If audit status is `passed`: proceed to step 1

   ```markdown
   ## Pre-flight Check

   {If no v{{version}}-MILESTONE-AUDIT.md:}
   ⚠ No milestone audit found. Run `/gsd:audit-milestone` first to verify
   requirements coverage, cross-phase integration, and E2E flows.

   {If audit has gaps:}
   ⚠ Milestone audit found gaps. The audit output already enumerates the
   unsatisfied requirements, cross-phase issues, and broken flows — insert
   a closure phase per gap with `/gsd:phase --insert <N>` and run the
   standard `/gsd:discuss-phase` → `/gsd:plan-phase` → `/gsd:execute-phase`
   chain. Or proceed anyway to accept the gaps as tech debt.

   {If audit passed:}
   ✓ Milestone audit passed. Proceeding with completion.
   ```

1. **Verify readiness:**

   - Check all phases in milestone have completed plans (SUMMARY.md exists)
   - Present milestone scope and stats
   - Wait for confirmation

2. **Gather stats:**

   - Count phases, plans, tasks
   - Calculate git range, file changes, LOC
   - Extract timeline from git log
   - Present summary, confirm

3. **Extract accomplishments:**

   - Read all phase SUMMARY.md files in milestone range
   - Extract 4-6 key accomplishments
   - Present for approval

4. **Archive milestone:**

   - Create <code v-pre>.planning/milestones/v{{version}}-ROADMAP.md</code>
   - Extract full phase details from ROADMAP.md
   - Fill milestone-archive.md template
   - Update ROADMAP.md to one-line summary with link

5. **Archive requirements:**

   - Create <code v-pre>.planning/milestones/v{{version}}-REQUIREMENTS.md</code>
   - Mark all v1 requirements as complete (checkboxes checked)
   - Note requirement outcomes (validated, adjusted, dropped)
   - Delete `.planning/REQUIREMENTS.md` (fresh one created for next milestone)

6. **Update PROJECT.md:**

   - Add "Current State" section with shipped version
   - Add "Next Milestone Goals" section
   - Archive previous content in `` (if v1.1+)

7. **Commit and tag:**

   - Stage: MILESTONES.md, PROJECT.md, ROADMAP.md, STATE.md, archive files
   - Commit: <code v-pre>chore: archive v{{version}} milestone</code>
   - Tag: <code v-pre>git tag -a v{{version}} -m "[milestone summary]"</code>
   - Ask about pushing tag

8. **Offer next steps:**
   - `/gsd:new-milestone` — start next milestone (questioning → research → requirements → roadmap)

&lt;/process>

&lt;success_criteria>

- Milestone archived to <code v-pre>.planning/milestones/v{{version}}-ROADMAP.md</code>
- Requirements archived to <code v-pre>.planning/milestones/v{{version}}-REQUIREMENTS.md</code>
- `.planning/REQUIREMENTS.md` deleted (fresh for next milestone)
- ROADMAP.md collapsed to one-line entry
- PROJECT.md updated with current state
- Git tag v&#123;&#123;version&#125;&#125; created (if `git.create_tag` enabled)
- Commit successful
- User knows next steps (including need for fresh requirements)
  &lt;/success_criteria>

&lt;critical_rules>

- **Load workflow first:** Read complete-milestone.md before executing
- **Verify completion:** All phases must have SUMMARY.md files
- **User confirmation:** Wait for approval at verification gates
- **Archive before deleting:** Always create archive files before updating/deleting originals
- **One-line summary:** Collapsed milestone in ROADMAP.md should be single line with link
- **Context efficiency:** Archive keeps ROADMAP.md and REQUIREMENTS.md constant size per milestone
- **Fresh requirements:** Next milestone starts with `/gsd:new-milestone` which includes requirements definition
  &lt;/critical_rules>
