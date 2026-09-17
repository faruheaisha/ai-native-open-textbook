---
title: "Quiz 2: Building and Using Skills"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit1/quiz2.mdx"
sourceRel: "units/en/unit1/quiz2.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit1/quiz2.mdx"
sourceSha256: "25e5f72783b890e64d4b3bc5e7f9a3bd1ffc8ef3bcc10c7e87066a0610639f13"
pageSha256: "25e5f72783b890e64d4b3bc5e7f9a3bd1ffc8ef3bcc10c7e87066a0610639f13"
contentMode: "local-full"
zh: ""
---

# Quiz 2: Building and Using Skills

Test your understanding of how to build, test, and use skills following the Agent Skills Specification. Answer all 5 questions.

## Question 1: Skill Directory Structure

You're building a dataset validation skill. What should your directory structure look like according to the Agent Skills Specification?

**选项**

- A. Just a single SKILL.md file in your project root
- B. SKILL.md in root, scripts/ for helper code, references/ for documentation, assets/ for templates
- C. Everything in a scripts/ folder with SKILL.md inside it
- D. Organize folders by agent type (claude/, codex/, opencode/)

**答案解析**

- **A** — While technically possible, this doesn't follow the specification. The spec defines a structured layout with optional scripts/, references/, and assets/ directories for organization and clarity.
- **B（正确答案）** — Correct! This follows the Agent Skills Specification exactly. SKILL.md is required at the root; scripts/, references/, and assets/ are optional but recommended for organization.
- **C** — No, SKILL.md must be at the root so agents can discover it immediately. Helper scripts go in scripts/ but the main file is at the root.
- **D** — No, the specification is agent-agnostic. Skills use a single format that works across all supporting agents. No agent-specific organization is needed.

## Question 2: Required Frontmatter Fields

What are the only required frontmatter fields in a SKILL.md file according to the Agent Skills Specification?

**选项**

- A. name, description, version, and license
- B. name and description
- C. All metadata fields (name, version, author, etc.)
- D. At least 5 fields including metadata and compatibility

**答案解析**

- **A** — While useful, version and license are optional. Only two fields are required: name and description. These ensure agents can discover and understand the skill.
- **B（正确答案）** — Correct! The specification requires exactly these two fields. Name identifies the skill; description explains what it does and when to use it. All other fields are optional.
- **C** — No, many metadata fields are optional. Only name and description are required by the specification.
- **D** — No, the spec is minimal. Only name and description are required. Other fields like license, compatibility, and metadata are optional.

## Question 3: Validating Your Skill Locally

After building your skill locally, what's the best next step to validate it?

**选项**

- A. Symlink it into your agent's skill directory, start the agent, and test with realistic prompts
- B. Wait until the skill is shared more broadly before you test it with an agent
- C. Run only the helper scripts and skip agent testing
- D. Read the SKILL.md manually and assume the agent will behave the same way

**答案解析**

- **A（正确答案）** — Correct! The first thing that matters is whether the agent can discover and activate the skill in a real workflow. Local install plus realistic prompts catches trigger and usability problems early.
- **B** — No. Validate the skill locally first so you can fix activation issues, missing files, and weak instructions before anyone else depends on it.
- **C** — Helper scripts matter, but they are not enough. A skill can have correct scripts and still fail because the description doesn't trigger or the instructions are unclear.
- **D** — No. Manual review helps, but the real test is whether the agent discovers and uses the skill correctly inside a live session.

## Question 4: Helper Scripts vs. Instructions

How should you divide content between SKILL.md instructions and helper scripts?

**选项**

- A. Instructions contain all executable code; scripts are just for reference examples
- B. Instructions explain what to do and why; scripts contain runnable code agents can actually execute
- C. Everything goes in scripts; instructions are summaries of script functions
- D. It depends on the skill; the specification doesn't define this

**答案解析**

- **A** — No, it's the opposite. Instructions teach the strategy and steps; scripts contain actual, executable code agents run.
- **B（正确答案）** — Exactly right! Instructions provide strategy and guidance; scripts provide implementation. This separation makes skills teach and executable.
- **C** — No, instructions are critical for teaching. Without clear instructions, users don't understand when, why, or how to use the scripts.
- **D** — The specification and best practices do define this: instructions teach, scripts implement. This pattern is standard across skills.

## Question 5: Activation Debugging

When a skill doesn't activate reliably, what should you do first?

**选项**

- A. Add more helper scripts immediately, even if the trigger description is vague
- B. Tighten the description and retest with both obvious and vague prompts
- C. Rename the skill folder without changing the description
- D. Turn the skill back into a long one-off prompt for every conversation

**答案解析**

- **A** — No. If the agent isn't activating the skill, the first problem is usually the triggering description or the examples, not missing helper code.
- **B（正确答案）** — Correct! Reliable activation comes from a clear description plus realistic prompt testing. Fix the trigger before adding more complexity.
- **C** — No. Folder names matter for organization, but activation usually depends on the description and examples the agent matches against.
- **D** — No. That throws away the reuse and progressive disclosure benefits skills are meant to provide.

---

## Scoring

Count your correct answers:
- **5/5**: Excellent! You understand skill development and the Agent Skills Specification. You're ready to build skills.
- **4/5**: Good understanding. Review the question you missed before moving forward.
- **3/5 or less**: Review the building and usage lessons before proceeding.

## Summary

You've completed Quiz 2! You now understand:
- How to organize skills following the Agent Skills Specification
- Which frontmatter fields are required vs. optional
- How to validate a skill locally with a real agent
- How to divide content between instructions and executable scripts
- How to debug activation when a skill doesn't fire

These are the core skills for building and maintaining quality agent skills.

## Next Steps

You've completed Unit 1: Agent Skills! You can now:
- Build skills following the Agent Skills Specification
- Use skills with Claude Code, Codex, and other agents
- Validate skills in a real project
- Write clear instructions and helper scripts

Next, we move to **Unit 2: Model Context Protocol (MCP)**, where you'll learn how to integrate external tools and APIs with your code agents.

Ready to dive into MCPs?
