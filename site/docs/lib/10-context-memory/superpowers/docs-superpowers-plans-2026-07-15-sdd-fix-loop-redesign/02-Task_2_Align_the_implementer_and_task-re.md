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
pageSha256: "bb2b0ecb571001e6dd8f60b1bb13d4946e5f5d72b58b4ab7aa2a2ac44aefe15c"
contentMode: "local-full"
zh: ""
---

### Task 2: Align the implementer and task-reviewer templates and the Codex reference with resume semantics

**Files:**
- Modify: `skills/subagent-driven-development/implementer-prompt.md` (the "After Review Findings" section)
- Modify: `skills/subagent-driven-development/task-reviewer-prompt.md` (trailing paragraph)
- Modify: `skills/using-superpowers/references/codex-tools.md` (subagent close timing)

**Interfaces:**
- Consumes: `re-review-prompt.md` exists (Task 1).
- Produces: the implementer contract Task 3's fix loop cites ("fix, re-run covering tests, append to your report file, return the short contract").

- [ ] **Step 1: Replace the "After Review Findings" section in implementer-prompt.md**

Old text (exact):

```markdown
    ## After Review Findings

    If a reviewer finds issues and you fix them, re-run the tests that cover
    the amended code and append the results to your report file. Reviewers
    will not re-run tests for you — your report is the test evidence.
```

New text (exact):

```markdown
    ## After Review Findings

    If the task review finds issues, you will be resumed with the findings.
    Fix them, re-run the tests that cover the amended code, and append a fix
    report to your report file: what you changed, the covering tests you
    ran, the command, and the output. Reviewers will not re-run tests for
    you — your report is the test evidence. Then reply with the same short
    status contract as your first report.
```

- [ ] **Step 2: Delete the trailing re-review paragraph in task-reviewer-prompt.md**

Delete this text (exact, at end of file):

```markdown
A fix dispatch can address spec gaps and quality findings together;
re-review after fixes covers both verdicts.
```

Nothing replaces it — the scoped re-review contract now lives in
`re-review-prompt.md`, and SKILL.md step 4 (Task 3) owns the loop rules.

- [ ] **Step 3: Update the Codex subagent close-timing sentence in codex-tools.md**

Old text (exact, line 10):

```markdown
When using subagent-driven-development, you should always close implementer and reviewer subagents when they have finished all their work.
```

New text (exact):

```markdown
When using subagent-driven-development, close reviewer subagents when their review returns. Keep each implementer subagent open until its task's review passes — the fix loop resumes the implementer — then close it. If your harness cannot send another message to a spawned agent, dispatch each fix round as a fresh implementer carrying the brief, the report file, and the findings.
```

- [ ] **Step 4: Verify no template still references dedicated fix subagents**

Run: `grep -rn "fix subagent" skills/subagent-driven-development/*.md`
Expected: no output (SKILL.md still has hits until Task 3 — this command scopes to templates only after Task 3; at this point expect hits ONLY in SKILL.md).

Run: `grep -rn "fix subagent" skills/subagent-driven-development/implementer-prompt.md skills/subagent-driven-development/task-reviewer-prompt.md skills/subagent-driven-development/re-review-prompt.md`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add skills/subagent-driven-development/implementer-prompt.md skills/subagent-driven-development/task-reviewer-prompt.md skills/using-superpowers/references/codex-tools.md
git commit -m "feat(sdd): align templates and codex reference with resume-based fix rounds"
```
