---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/i18n/zh/README.md"
sourceRel: "i18n/zh/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/i18n/zh/README.md"
sourceSha256: "7717abf429b9210b48b76ae2cd506e6606e36d5f758edc0e802b40302c2fce27"
pageSha256: "1094224972fd552ac194da34d91bfb8e9ad37d61d8d594ff1d463118452b8e9a"
contentMode: "local-full"
zh: ""
---

## Start here: choose what you want to build

You do not need to scan 523 lessons before beginning. Pick one goal. Each link
opens the same curriculum on GitHub or the website, and both versions use the
same lesson code.

| Your goal | Learn on GitHub | Learn on the website |
|---|---|---|
| I am new and want the complete foundation | [Phase 0: Setup and Tooling](/lib/07-coding/ai-engineering-from-scratch/phases-00-setup-and-tooling) | [Dev Environment](https://aiengineeringfromscratch.com/lesson?path=phases/00-setup-and-tooling/01-dev-environment) |
| I know Python and want math plus ML foundations | [Phase 1: Math Foundations](/lib/07-coding/ai-engineering-from-scratch/phases-01-math-foundations) | [Linear Algebra Intuition](https://aiengineeringfromscratch.com/lesson?path=phases/01-math-foundations/01-linear-algebra-intuition) |
| I want to build production LLM applications | [Phase 11: LLM Engineering](/lib/07-coding/ai-engineering-from-scratch/phases-11-llm-engineering) | [Prompt Engineering](https://aiengineeringfromscratch.com/lesson?path=phases/11-llm-engineering/01-prompt-engineering) |
| I want to build agents | [Phase 14: Agent Engineering](/lib/07-coding/ai-engineering-from-scratch/phases-14-agent-engineering) | [The Agent Loop](https://aiengineeringfromscratch.com/lesson?path=phases/14-agent-engineering/01-the-agent-loop) |
| I want to use coding agents on real repositories | [Agent-Assisted Engineering path](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/learning-paths/using-coding-agents.json) | [Agent-Assisted Engineering](https://aiengineeringfromscratch.com/lesson?path=phases/14-agent-engineering/31-agent-workbench-why-models-fail&learningPath=using-coding-agents) |
| I want to shape the right build before implementation | [Product Judgment and Delivery path](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/learning-paths/shaping-the-build.json) | [Product Judgment and Delivery](https://aiengineeringfromscratch.com/lesson?path=phases/14-agent-engineering/47-outcomes-before-output&learningPath=shaping-the-build) |
| I want to build with Model Context Protocol (MCP) | [Model Context Protocol (MCP) route](/lib/07-coding/ai-engineering-from-scratch/phases-13-tools-and-protocols#model-context-protocol-mcp-path) | [Model Context Protocol (MCP) path](https://aiengineeringfromscratch.com/lesson?path=phases/13-tools-and-protocols/06-mcp-fundamentals&learningPath=model-context-protocol) |
| I want to write and ship Agent Skills | [Focused Agent Skills route](/lib/07-coding/ai-engineering-from-scratch/phases-13-tools-and-protocols#agent-skills-fast-path) | [Agent Skills path](https://aiengineeringfromscratch.com/lesson?path=phases/13-tools-and-protocols/22-skills-and-agent-sdks&learningPath=agent-skills) |
| I want to prepare for a Claude certification | [Certification onboarding](/lib/07-coding/ai-engineering-from-scratch/certifications-claude-GETTING_STARTED) | [Certification Academy](https://aiengineeringfromscratch.com/certifications.html) |

Not sure where you fit? Use the [`start-learning` placement tutor](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/skills/start-learning/SKILL.md)
or the [website prerequisites guide](https://aiengineeringfromscratch.com/prereqs.html).

Compare four core domains and six career routes in the [AI Engineering Learning Paths](https://aiengineeringfromscratch.com/learning-paths.html).

### Use every lesson the same way

1. **Read** `docs/en.md` and explain the core idea in your own words.
2. **Type and build** the important code instead of treating the code block as decoration.
3. **Run** the lesson command from the repository root, the directory containing `README.md` and `phases/`.
4. **Keep evidence**: the command, working directory, exit code, meaningful output, and the artifact you changed or produced.
5. **Continue** only when you can explain the output and make one small change without guessing.

Commands in lesson pages are paths from the repository root unless the lesson
explicitly says to change directories. If a lesson offers several languages,
run the implementation for the language you are learning.

### Clone it and produce your first evidence

```bash
git clone https://github.com/rohitg00/ai-engineering-from-scratch.git
cd ai-engineering-from-scratch
python3 phases/00-setup-and-tooling/01-dev-environment/code/verify.py --route beginner
python3 phases/01-math-foundations/01-linear-algebra-intuition/code/vectors.py
```

The preflight separates requirements needed now from tools needed later. Every
required failure includes the detected reason and a corrective command. The
second command is a dependency-free lesson and ends by showing that a matrix
times a vector is the operation inside a neural network layer. Save that
terminal output as your first evidence.
