---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/learning-with-ai.md"
sourceRel: "guide/roles/learning-with-ai.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/roles/learning-with-ai.md"
sourceSha256: "f144ce919ab10175ad88e2e4af32f82ce38d56016db54ccd80218ed6a8a073df"
pageSha256: "815b1bd1d5c82ab103163328d80aed817af4971fc48e770194f8ca79ab47743b"
contentMode: "local-full"
zh: ""
---

## See Also

### In This Guide

- [AI Roles & Career Paths](/lib/09-harness/claude-code-ultimate-guide/guide-roles-ai-roles/index): Map of emerging AI roles (Prompt Engineer → Harness Engineer) with career matrix and salary benchmarks
- [Methodologies: TDD with Claude](/lib/09-harness/claude-code-ultimate-guide/guide-core-methodologies#tier-5-implementation): Write tests first, then implement
- [Workflows: Spec-First](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first): Understand requirements before code
- [Workflows: Plan-Driven](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-plan-driven): Use /plan mode for complex work
- [Ultimate Guide: Mental Models](#26-mental-model): How to think about Claude interactions

### Templates & Examples

- [Learning Mode CLAUDE.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-learning-mode): Configuration template
- [/learn:quiz Command](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-quiz): Self-testing slash command
- [/learn:teach Command](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-teach): Step-by-step concept explanations
- [/learn:alternatives Command](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-alternatives): Compare different approaches
- [Learning Capture Hook](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/learning-capture.sh): Automated insight logging

### External Resources

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview): Better prompts = better learning
- [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/): Timeless principles for deliberate practice
- [AI for Engineers](https://leerob.com/ai): AI fundamentals (ML, transformers, tokenization)
- [Step by Token](https://www.stepbytoken.com/en): 21-chapter interactive guide explaining how LLMs work mechanically, from tokenization through agents and KV cache. Free, in 8 languages. Pairs well with the prompt engineering and agents sections of this guide.
- [How to Build an Agent](https://ampcode.com/blog/how-to-build-an-agent) (Thorsten Ball, Amp), builds a minimal coding agent from scratch in ~300 lines: chat loop, tool definitions, agentic loop. The most-cited walkthrough of the same mechanism documented in [Architecture: The Master Loop](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index#1-the-master-loop), useful for readers who learn a mechanism better by building a toy version of it first.
