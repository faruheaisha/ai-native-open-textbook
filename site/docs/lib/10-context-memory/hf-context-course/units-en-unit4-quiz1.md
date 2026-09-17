---
title: "Quiz 1: Subagent Concepts"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit4/quiz1.mdx"
sourceRel: "units/en/unit4/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit4/quiz1.mdx"
sourceSha256: "a091b38f714e16e95fb3ea41e8ed5f4f1bfbcd264d2f66460b783ff7bcdf2df1"
pageSha256: "a091b38f714e16e95fb3ea41e8ed5f4f1bfbcd264d2f66460b783ff7bcdf2df1"
contentMode: "local-full"
zh: ""
---

# Quiz 1: Subagent Concepts

Test your understanding of subagent patterns, architectures, and when to use them.

## Question 1: What is a subagent?

**选项**

- A. A subagent is a different agent platform (like switching from Claude Code to Codex)
- B. A subagent is a skill that runs in the background while the main agent works on something else
- C. A subagent is a child agent process spawned by a parent agent to handle a subtask in isolation, then report results back
- D. A subagent is a way to run the same agent twice for redundancy

**答案解析**

- **A** — No. A subagent is a child process spawned by a parent agent within the same platform.
- **B** — Not quite. Subagents are full agents, not just skills. Skills are reusable workflows.
- **C（正确答案）** — Correct! Subagents are independent processes that solve specific subtasks and communicate results to the parent.
- **D** — No. Subagents are for dividing work, not duplicating it.

## Question 2: What is the fan-out / fan-in pattern?

**选项**

- A. Fan-out/fan-in spawns multiple subagents, each handling a sequential stage; each stage waits for the previous to finish
- B. Fan-out/fan-in spawns multiple independent subagents in parallel, waits for all to finish, then combines results
- C. Fan-out/fan-in requires a supervisor agent to coordinate the subagents
- D. Fan-out/fan-in is the only pattern you should ever use

**答案解析**

- **A** — That's a pipeline pattern, not fan-out/fan-in. Fan-out/fan-in runs all subagents in parallel.
- **B（正确答案）** — Correct! All work happens simultaneously. Perfect for independent tasks.
- **C** — Not necessarily. The parent agent can manage it with wait_all() or similar.
- **D** — No. Different patterns suit different task structures. Pipeline and supervisor are also valuable.

## Question 3: What is the pipeline pattern?

**选项**

- A. Pipeline pattern runs all subagents in parallel to maximize speed
- B. Pipeline pattern chains subagents sequentially, where each stage's output becomes the next stage's input
- C. Pipeline pattern requires 10+ subagents to be effective
- D. Pipeline and fan-out/fan-in are the same thing

**答案解析**

- **A** — No, that's fan-out/fan-in. Pipeline runs stages sequentially: output of stage 1 → input of stage 2.
- **B（正确答案）** — Correct! Pipelines are for sequential workflows like design → code → test.
- **C** — No. Pipelines work with any number of stages, often 3-5 is ideal.
- **D** — False. Fan-out/fan-in is parallel. Pipeline is sequential.

## Question 4: When should you reach for subagents?

**选项**

- A. Use subagents when you have 10+ files to read or 3+ independent pieces of work
- B. Always use subagents if your task takes more than 1 minute
- C. Use subagents only for parallel work; never for sequential tasks
- D. Use subagents for every task; they always make things faster

**答案解析**

- **A（正确答案）** — Correct! The blog post identifies these as the strong signals for subagent use.
- **B** — False. Time doesn't matter. Subagent overhead kills small tasks.
- **C** — False. Pipeline pattern uses subagents for sequential work.
- **D** — No. Subagent spawn overhead makes them slower for small tasks.

## Question 5: What is the supervisor pattern?

**选项**

- A. Supervisor pattern spawns all subagents in parallel to maximize speed
- B. Supervisor pattern has a parent agent directing multiple specialist subagents, each with different tools and expertise
- C. Supervisor pattern requires more than 10 subagents to be effective
- D. Supervisor pattern means all subagents have identical tools

**答案解析**

- **A** — That's fan-out/fan-in, not supervisor. Supervisor uses specialized agents with different tools.
- **B（正确答案）** — Correct! Supervisor is for when you need multiple specialized agents working on the same problem.
- **C** — No. Usually 2-5 specialist subagents is ideal with supervisor pattern.
- **D** — False. Supervisor specifically gives each subagent specialized tools for its domain.

---

## Summary

If you got 4-5 correct, the core subagent patterns are in place. If not, revisit the patterns lesson before moving into the hands-on workflow.

## Key Takeaways

- Subagents are isolated child agents, not separate platforms or background skills
- Fan-out / fan-in is parallel; pipeline is sequential; supervisor coordinates specialists
- The best signal for subagents is independent or clearly staged work that justifies the coordination overhead

## Next Steps

Next, put these patterns to work in the hands-on multi-agent workflow.
