---
title: "Personal Workflow Automation"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Personal Workflow Automation

Define and run ordered, repeatable tool workflows, stopping at approval gates and recording each step. Delegate classification and synthesis to their own skills.

## Professional AI Agent Course: Automate

### What you will learn

Define and run ordered, repeatable tool workflows, stopping at approval gates and recording each step. Delegate classification and synthesis to their own skills.

### Prerequisites

Use Python 3.10+, a fork/clone opened in Codex, and the [shared course setup](/lib/08-agents/agent-systems-handbook/skills-course-support-README). Run from the repository root. Seed the synthetic Lesson 2 files once; choose a fresh output directory if they already exist. PDF extraction optionally requires `pypdf`; TXT/Markdown/DOCX need no extra package.

### 5-minute quick start

```bash
python3 skills/personal-workflow-automation/scripts/workflow.py define --file skills/personal-workflow-automation/examples/weekly-workflow.json
python3 skills/personal-workflow-automation/scripts/workflow.py preview --workflow weekly-course
```

Sample prompt:

```text
Use $personal-workflow-automation to preview the weekly course workflow, show the exact command sequence and approval hash, and stop before its gated synthesis step.
```

### Expected result

A canonical workflow revision, exact SHA-256 approval fingerprint and ordered classify/synthesize steps. Preview runs no command. Executing with the reviewed fingerprint stops at the synthesis gate; a reviewed retry resumes without replaying the completed classification. These are examples, not recorded production results.

### 20–30 minute classroom exercise
