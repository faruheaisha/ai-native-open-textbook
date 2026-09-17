---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "5b0b05f0749cfff167b9d33afc7dced1f4ed9aad70e1eea5832f84108db0ccb6"
contentMode: "local-full"
zh: ""
---

## Model-specific guidance

Each of these models has its own prompting page. Read the one for your model first, then the techniques that follow.

| Model                                  | Guide                                                                                                                             | What's different                                                                                                                                                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claude Fable 5.1 and Claude Mythos 5.1 | [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) | Differences from Claude Fable 5: effort levels, finishing long tasks, user-facing progress updates, passing thinking blocks back unchanged, tool-call batching in agent loops, search triggering at low effort, formatting, and writing density. |
| Claude Fable 5 and Claude Mythos 5     | [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5)     | Differences from Claude Opus 4.8: effort levels, instruction following, long-run progress claims, memory systems, and the `reasoning_extraction` refusal category.                                                                               |
| Claude Sonnet 5                        | [Prompting Claude Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5)   | Differences from Claude Sonnet 4.6: response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, and design and frontend defaults.                                                                |
| Claude Opus 5                          | [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)       | Differences from prior Opus models: response length and verbosity, user-facing progress updates, written deliverable length, task scope and over-verification, subagent control, and self-correction.                                            |
| Claude Opus 4.8                        | [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)   | Response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, subagent control, and design and frontend defaults.                                                                                  |
