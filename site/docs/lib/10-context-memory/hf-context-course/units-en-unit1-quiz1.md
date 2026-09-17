---
title: "Quiz 1: Understanding Skills and the Specification"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit1/quiz1.mdx"
sourceRel: "units/en/unit1/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit1/quiz1.mdx"
sourceSha256: "fc8edf2d8fab4823392ecdf73ab1d6fa7bf50645289c0668cbffd34bbb6c60fe"
pageSha256: "fc8edf2d8fab4823392ecdf73ab1d6fa7bf50645289c0668cbffd34bbb6c60fe"
contentMode: "local-full"
zh: ""
---

# Quiz 1: Understanding Skills and the Specification

Test your understanding of skills and the Agent Skills Specification. Answer the following questions to check your knowledge before moving forward.

## Question 1: What is a skill?

**选项**

- A. A skill is a long prompt you paste into every conversation
- B. A skill is a reusable package of knowledge (instructions, scripts, and references) that makes agents expert at a specific task
- C. A skill is a feature only available in Claude Code
- D. A skill is a Python package you install with pip

**答案解析**

- **A** — Not quite. While skills contain similar information to detailed prompts, they're structured and reusable. The key difference is that skills work across projects and teams automatically.
- **B（正确答案）** — Correct! Skills are portable, structured packages that include instructions, helper scripts, documentation, and metadata—all designed to make agents reliable at completing specific tasks.
- **C** — No, skills are supported by many agents including Claude Code, Codex, OpenCode, and others. The Agent Skills Specification is an open standard.
- **D** — No, skills are not Python packages. However, skills can contain Python scripts in their scripts/ directory, and they can live in normal project or team directories.

## Question 2: What does the Agent Skills Specification define?

**选项**

- A. The best practices for writing Python code in helper scripts
- B. Requirements for one hosting or distribution platform only
- C. Guidelines for writing instruction text in skills
- D. A standard format for packaging agent knowledge, including directory structure, metadata fields, and how agents discover and load skills

**答案解析**

- **A** — Not quite. While the spec does cover script storage, it doesn't define Python best practices. The spec focuses on the overall skill structure and metadata format.
- **B** — No, the Agent Skills Specification is agent-agnostic and applies across all platforms (Claude Code, Codex, OpenCode, etc.). It is not tied to one distribution method.
- **C** — The spec covers some guidance, but it's primarily about the overall structure (directories, metadata, file names) rather than the instruction content itself.
- **D（正确答案）** — Correct! The Agent Skills Specification (at agentskills.io) defines the portable format that allows skills to work across different agents and platforms.

## Question 3: What are the required frontmatter fields in a SKILL.md file?

**选项**

- A. name, description, version, and author
- B. Any metadata the creator wants to include
- C. name and description
- D. There is no required frontmatter—skills can be just Markdown files

**答案解析**

- **A** — While version and author are useful metadata, they're optional. Only 'name' and 'description' are required by the specification.
- **B** — Not quite. The spec defines specific required fields (name and description) to ensure compatibility and discoverability. Without these, agents can't properly identify and load the skill.
- **C（正确答案）** — Correct! The Agent Skills Specification requires two fields: 'name' (the identifier for the skill) and 'description' (what the skill does and when to use it). Other fields like license, compatibility, and metadata are optional.
- **D** — No, frontmatter is essential. It provides metadata that agents use to discover and load skills automatically. Without it, skills won't be recognized by compliant agents.

## Question 4: How do agents discover and load skills?

**选项**

- A. Agents automatically load all available skills into context at startup
- B. Agents read skill metadata to decide if the skill applies, then load the full SKILL.md only when needed—this is called 'progressive disclosure'
- C. Users must manually activate skills by typing a command like '/skill dataset-publishing'
- D. Skills are only available if installed via npm or pip

**答案解析**

- **A** — No, that would be inefficient. Agents use progressive disclosure: they load only skill metadata initially, then activate full skills when the task matches.
- **B（正确答案）** — Correct! The discovery process is progressive: agents first check metadata (~100 tokens), then load full skill content only when the task matches. This keeps agent startup fast.
- **C** — While some agents support manual activation, the primary design is automatic discovery. Agents analyze the user's request and load relevant skills on their own.
- **D** — No, skills can be discovered from multiple sources: local directories, shared repositories, community registries, or custom paths. The Agent Skills Specification supports many discovery mechanisms.

## Question 5: How many agents support the Agent Skills Specification?

**选项**

- A. Only Claude Code and Codex
- B. Only agents developed by Anthropic
- C. Only agents from a single vendor or registry
- D. Many agents, including Claude Code, Codex, OpenCode, and others

**答案解析**

- **A** — No, while Claude Code and Codex are major supporters, the spec is adopted by many agents including OpenCode and other commercial tools.
- **B** — No, the spec is open and platform-agnostic. It was originally created by Anthropic but is now maintained as an open standard and adopted by many organizations.
- **C** — No, skills can be used with agents available anywhere. Agents can load skills from local directories, team repositories, or other registries as long as they support the spec.
- **D（正确答案）** — Correct! The Agent Skills Specification is an open standard adopted by many agents. This means a single skill works across multiple platforms.

---

## Scoring

Count your correct answers:
- **5/5**: Excellent! You have a solid understanding of skills and the specification. Move on to the next lesson.
- **4/5**: Good understanding. Review the questions you missed and reread those sections.
- **3/5 or less**: Consider reviewing the "What Are Skills" and "Skill Format" lessons before continuing.

Ready to learn how to use skills with different agents? Let's move on to the next lesson.
