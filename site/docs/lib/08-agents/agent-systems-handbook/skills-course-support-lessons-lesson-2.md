---
title: "Lesson 2 — Organize, Understand, Automate"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/lessons/lesson-2.md"
sourceRel: "skills/course-support/lessons/lesson-2.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/course-support/lessons/lesson-2.md"
sourceSha256: "1a476b3e79ff0cb3b6c361ba13ef01a79faa3f7ec25f404859a2ca42f10a64ef"
pageSha256: "1a476b3e79ff0cb3b6c361ba13ef01a79faa3f7ec25f404859a2ca42f10a64ef"
contentMode: "local-full"
zh: ""
---

# Lesson 2 — Organize, Understand, Automate

English is the canonical lab. [简体中文](/lib/08-agents/agent-systems-handbook/skills-course-support-zh-Hans-lesson-2) mirrors the same workflow and safety limits. Use synthetic files, not a real Downloads folder. On the `develop` branch, the three packages are available before a separate production handbook release.

## Learning outcomes

Organize owns file placement. Understand owns source-grounded notes. Automate owns ordered tool execution, approval points and step/run state. Students should explain those boundaries before composing the chain.

## Prepare (five minutes)

From a fresh fork/clone containing this course:

```bash
python3 skills/course-support/scripts/setup_course_skills.py --lesson 2
python3 skills/course-support/scripts/seed_demo.py
python3 skills/course-support/scripts/course_store.py context
```

The first command prints three discoverable Codex skill names. The second creates `.local-state/course-demo/lesson-2/` without replacing existing work. A seeded incoming folder contains synthetic invoice/school files and an unknown extension; the research folder contains duplicate material and conflicting capacity statements. The context is a local demo, not a signed-in production account.

## Optional expanded Organize practice

An instructor can choose one example, or students can complete all three in
order. The examples are independent, so work in one folder does not affect
the others. Use only the synthetic files created by these commands. Do not
practice on a real Downloads folder.

In the exercises below, a **preview** shows proposed moves without making
them, a **plan** saves those proposals for review, a **conflict** is a move
that is safely skipped, and a **journal** records what happened during
apply. See the Local Document Organizer
[beginner terminology](/lib/08-agents/agent-systems-handbook/skills-local-document-organizer#beginner-terminology)
for the other terms.

Each seed command refuses to delete or replace an existing output directory.
When repeating an exercise, keep the earlier work and add `--output` with a
fresh path, for example `--output .local-state/course-demo/student-files-attempt-2`.

### 1. Student files: preview only

**Purpose.** Learn how readable filename and extension rules produce a plan,
and see that an uncertain file stays where it is.

**Setup.** Create a fresh copy of the synthetic student-files example:

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-student-files
```

**Command.** Scan the incoming folder. This command looks and proposes; it
does not move files.

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-student-files/incoming
```

**Sample Codex prompt.**

```text
Use $local-document-organizer to preview the student-files practice folder. Explain every proposed category and leave uncertain files in place. Do not move anything.
```

**Expected result.**

- `tuition-invoice.txt` -> `Invoices/`
- `school-reading.md` -> `School/`
- `internship-resume.txt` -> `Resumes/`
- `random-download.zzz` stays in place
- the preview does not move any files

**Reflection question.** Why is leaving an unknown file in place safer than
guessing a category?

### 2. Freelancer rules: customize classification

**Purpose.** See how a specific filename rule can improve a classification,
and why rule order changes the result.

**Setup.** Create a fresh copy of the synthetic freelancer example:

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-freelancer-rules
```

**Command.** Generate the first preview with the default rules:

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-freelancer-rules/incoming
```

At first, `client-meeting-notes.txt` goes to `Notes` because the generic
text-extension rule matches `.txt`. In the canonical
`skills/local-document-organizer/references/classification-rules.csv`, add
this row before the generic `ext-text` rule:

```csv
keyword-meeting,Meetings,filename_keyword,meeting|minutes,medium,true
```

Before rerunning or invoking the skill, refresh the installed skill copy
from the canonical package:

```bash
python3 skills/course-support/scripts/setup_course_skills.py --lesson 2
```

Run the same scan command again to generate a fresh plan. Do not edit an
existing plan after it has been reviewed or approved.

**Sample Codex prompt.**

```text
Use $local-document-organizer to compare the freelancer practice previews before and after the Meetings rule. Explain which rule matched each file. Do not apply either plan.
```

**Expected result.**

- the invoice remains in `Invoices/`
- the agreement remains in `Contracts/`
- the meeting notes change from `Notes/` to `Meetings/`
- the website project ideas remain in `Notes/`
- rule order matters because the first matching rule wins

Restore the rule afterward if you do not intend to keep this repository
modification. If you remove the `Meetings` rule manually, run the same setup
command again so the installed copy stays synchronized.

**Reflection question.** Why must the more specific meeting rule appear
before the generic text-extension rule?

### 3. Safe recovery: conflict and undo

**Purpose.** Practice approval, collision protection, partial results, and
undo without risking real files.

**Setup.** Create a fresh copy of the synthetic safe-recovery example:

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-safe-recovery
```

**Command.** Scan the incoming folder:

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-safe-recovery/incoming
```

The preview proposes moving `invoice-august.txt` to `Invoices/`. That is
only a proposal. The same-name collision is checked and enforced safely
during apply.

**Sample Codex prompt.**

```text
Use $local-document-organizer to preview the safe-recovery practice folder. Explain the proposed moves and the existing invoice collision, then wait for my explicit approval before applying anything.
```
