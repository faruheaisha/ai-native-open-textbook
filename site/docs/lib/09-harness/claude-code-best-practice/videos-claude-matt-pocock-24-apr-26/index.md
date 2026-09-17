---
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/claude-matt-pocock-24-apr-26.md"
sourceRel: "videos/claude-matt-pocock-24-apr-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/videos/claude-matt-pocock-24-apr-26.md"
sourceSha256: "87d58effa16d07454b30f5a302a1f775665e6a4f4624e510fb1908118fe8bd94"
pageSha256: "a332b83d86dccfe092a0999c2ce3d3320f73a187921a0de150e3eecf67ddb221"
contentMode: "local-full"
zh: ""
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

Transcript of the conference workshop by Matt Pocock ([@mattpocockuk](https://x.com/mattpocockuk)), educator and AI teacher, published April 24, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Video Details

- **Speaker:** Matt Pocock (Educator, AI teacher)
- **Format:** Conference workshop (~2 hours)
- **Published:** April 24, 2026
- **YouTube:** [Watch on YouTube](https://youtu.be/-QFHIoCo-Ko)

---

## Transcript

## 本篇目录

- [Welcome and Setup](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/01-Welcome_and_Setup.md)
- [LLM Constraints: The Smart Zone vs Dumb Zone](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/02-LLM_Constraints_The_Smart_Zone_vs_Dumb_Z.md)
- [Multi-Phase Plans and the Ralph Wiggum Loop](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/03-Multi-Phase_Plans_and_the_Ralph_Wiggum_L.md)
- [LLMs Like the Guy from Memento](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/04-LLMs_Like_the_Guy_from_Memento.md)
- [Exercise 1: The Grill Me Skill](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/05-Exercise_1_The_Grill_Me_Skill.md)
- [Running Grill Me on Sarah Chen's Slack Brief](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/06-Running_Grill_Me_on_Sarah_Chen_s_Slack_B.md)
- [Q&A: Frameworks, Pair Programming, Human-in-the-Loop](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/07-Q_A_Frameworks_Pair_Programming_Human-in.md)
- [The Two Documents: Destination and Journey](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/08-The_Two_Documents_Destination_and_Journe.md)
- [Exercise 2: Write a PRD](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/09-Exercise_2_Write_a_PRD.md)
- [Q&A Break: 1M Context, Specs vs Code](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/10-Q_A_Break_1M_Context_Specs_vs_Code.md)
- [Exercise 3: PRD to Issues — Vertical Slices and Tracer Bullets](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/11-Exercise_3_PRD_to_Issues_Vertical_Slices.md)
- [Q&A: Stop Conditions, Plan Conciseness, Future Roles](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/12-Q_A_Stop_Conditions_Plan_Conciseness_Fut.md)
- [Independently Grabbable Issues and Parallelization](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/13-Independently_Grabbable_Issues_and_Paral.md)
- [Exercise 4: Running the AFK Agent (Ralph Loop)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/14-Exercise_4_Running_the_AFK_Agent_Ralph_L.md)
- [Q&A: Negative Decisions, Code Review Volume, Front-End Workflow](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/15-Q_A_Negative_Decisions_Code_Review_Volum.md)
- [TDD: Red, Green, Refactor](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/16-TDD_Red_Green_Refactor.md)
- [Inspecting the Implementation](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/17-Inspecting_the_Implementation.md)
- [Deep Modules vs Shallow Modules](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/18-Deep_Modules_vs_Shallow_Modules.md)
- [Improve Codebase Architecture Skill](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/19-Improve_Codebase_Architecture_Skill.md)
- [Q&A: Document Persistence, Beads Framework](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/20-Q_A_Document_Persistence_Beads_Framework.md)
- [Push vs Pull: Coding Standards](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/21-Push_vs_Pull_Coding_Standards.md)
- [Sand Castle: Parallel AFK Loops](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/22-Sand_Castle_Parallel_AFK_Loops.md)
- [Improve Codebase Architecture Results](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/23-Improve_Codebase_Architecture_Results.md)
- [Wrap-Up](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/24-Wrap-Up.md)
