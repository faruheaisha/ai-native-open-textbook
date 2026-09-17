---
title: "Prompt Suite Versioning"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/skills/agent-skills/prompt-suite-versioning/SKILL.md"
sourceRel: "reference/skills/agent-skills/prompt-suite-versioning/SKILL.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/skills/agent-skills/prompt-suite-versioning/SKILL.md"
sourceSha256: "b21a4695b06dc5ffc06efc5e4d09d877c46df26d0acdb938b40ed45127878ff5"
pageSha256: "b21a4695b06dc5ffc06efc5e4d09d877c46df26d0acdb938b40ed45127878ff5"
contentMode: "local-full"
zh: ""
---

# Prompt Suite Versioning

## 1 · Purpose

Turn prompt editing from taste into engineering: every version has a score, every
change is one variable, every regression is reversible.

## 2 · When to use

- Improving, refactoring, or "cleaning up" any production prompt.
- Adding few-shot examples, schema constraints, or injection rules to a prompt.

Do **not** use to draft the very first prompt of a brand-new task, draft freely,
then enter this loop the moment a scorer exists (`eval-first-development`).

## 3 · Inputs

- A golden set and scorer (`eval-first-development`) with a recorded baseline.
- The current prompt, saved as a file (not living only in code or chat history).
- A versions log: `prompts/log.md` or the eval results directory.

## 4 · Procedure

1. Save the current prompt as `v\{N\}.md` and record its baseline score. If it has no
   score, score it now, this is the number every later version must beat.
2. Pick **one** variable to change: one system-prompt line, one example, one schema
   field, one formatting rule. Write down the hypothesis: "adding the null rule will
   fix the missing-field hallucinations."
3. Create `v\{N+1\}.md` with exactly that change. No drive-by edits.
4. Run the scorer. Record version, score, and the one-line reason in the log.
5. If the score dropped, revert without debate. If it rose, keep it. If it is flat,
   decide by cost: keep the cheaper or simpler version.
6. Read the failures of the new version, not the score alone. Cluster them. If a
   failure class is new, add a case for it to the golden set *with a commit message*.
7. Repeat from step 2 until the score clears the spec gate or three consecutive
   versions fail to move it. On the third flat version, STOP and report: the prompt
   axis is exhausted; the lever is elsewhere (retrieval, model, data).
8. Keep every version file. Disk is cheap; archaeology is expensive.

## 5 · Anti-rationalization

| Excuse | Answer |
|---|---|
| "This change is obviously safe." | "Obviously safe" prompt edits are the leading cause of silent regressions. Score it. |
| "I'll batch these three tweaks to save time." | Then you will never know which one helped, and you will re-learn it next month. |
| "The eval is slow; I'll just eyeball this one." | Eyeballing is how v1 shipped with a carrier-suffix bug. Run the scorer. |
| "Deleting old versions keeps the repo clean." | The old version is the rollback. Keep it. |

## 6 · Red flags

- Prompt text lives only inside application code with no version file.
- The log has scores without the version they belong to.
- Three variables changed between two consecutive versions.
- The golden set shrank at any point in history.

## 7 · Verify

- `prompts/` contains every version, and the log maps version → score → reason.
- The current production version's score clears the spec gate on the frozen golden set.
- At least one failure-class case was added to the golden set from observed failures.

## 8 · ZoroLogistics example

Week 6's BoL suite: v1 zero-shot scores 0.61 (junk suffixes, hallucinated values).
v2 adds the JSON schema + null rule → 0.83; failures cluster on scan noise. v3 adds
one few-shot example of a noisy scan + the injection rule → 0.92, clearing the gate.
The log shows exactly which single change bought each jump, and the golden set grew
by four adversarial cases found along the way.

---
© 2026 Zorost Intelligence LLC · zorost.com
