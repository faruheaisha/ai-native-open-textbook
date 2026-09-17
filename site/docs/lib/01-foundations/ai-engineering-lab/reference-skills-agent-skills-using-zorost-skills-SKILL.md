---
title: "Using Zorost Skills"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/skills/agent-skills/using-zorost-skills/SKILL.md"
sourceRel: "reference/skills/agent-skills/using-zorost-skills/SKILL.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/skills/agent-skills/using-zorost-skills/SKILL.md"
sourceSha256: "0384bfa8cefb146f2f6bef7135cf4d634c12c5384acc9f528c975c4acc1de693"
pageSha256: "0384bfa8cefb146f2f6bef7135cf4d634c12c5384acc9f528c975c4acc1de693"
contentMode: "local-full"
zh: ""
---

# Using Zorost Skills

## 1 · Purpose

Make the agent choose the right skill for the task at hand, run it to its
verification gate, and report honestly when no skill fits.

## 2 · When to use

- At the start of any non-trivial AI engineering task when this catalog is installed.
- When the agent is improvising a workflow that a catalog skill already covers.

Do **not** use this meta-skill for trivial one-line questions or file lookups. Answer
those directly.

## 3 · Inputs

- The user's request, verbatim.
- The catalog table in `reference/skills/agent-skills/README.md` (names + descriptions).

## 4 · Procedure

1. Restate the task in one sentence, starting with a verb: "Build…", "Fix…",
   "Decide…", "Deploy…".
2. Scan the catalog descriptions. Match on the task's *stage*, not its nouns:
   deciding whether to fine-tune is `fine-tune-readiness`, not `local-model-fit`.
3. If exactly one skill matches, load its full `SKILL.md` and follow its procedure.
4. If two skills match, run them in lifecycle order: Define before Build, Build
   before Verify, Verify before Ship.
5. If no skill matches, say so in one line, "No catalog skill covers X; proceeding
   ad hoc", then proceed. Do not force a near-match.
6. While running a skill, obey its STOP conditions. A stopped skill is a success
   state with a report, not a failure to hide.
7. After the skill exits, state which skill ran and what its Verify section produced.
8. If the skill's steps proved wrong or stale, open an issue or amend the skill file.
   A wrong skill that stays wrong teaches the next run to be wrong.

## 5 · Anti-rationalization

| Excuse | Answer |
|---|---|
| "Loading the skill wastes tokens." | One `SKILL.md` body is cheaper than one wrong approach. |
| "I already know how to do this." | The skill encodes the gates you skip when you improvise. Run it. |
| "Two skills half-match; I'll blend them." | Run the earlier-stage skill first. Blending skips gates. |
| "The task is small, skip the skill." | Small tasks are where bad habits form. If it matters, run the skill. If it does not, say so and answer directly. |

## 6 · Red flags

- The agent claims a skill was followed but cannot name its Verify evidence.
- The same skill is loaded three turns in a row without its procedure advancing.
- A skill's STOP fired and the run continued silently.

## 7 · Verify

- The chosen skill is named in the run log.
- Its Verify section's evidence exists (file, score, test output, or STOP report).
- If no skill matched, the one-line "no skill covers X" note exists.

## 8 · ZoroLogistics example

User: "Make the BoL extraction prompt better." The agent restates: "Improve a scored
artifact." Stage = Build-on-measured-loop → `prompt-suite-versioning`. It loads that
skill, which requires the golden set and scorer, which `eval-first-development`
already produced. Sequence: eval-first (already done) → prompt-suite-versioning →
error-analysis-50 on the failures.

---
© 2026 Zorost Intelligence LLC · zorost.com
