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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "2f3f023a0edc9c7f18813e2f347c5dc0ce77f95d4a32c80a9a12822b2578a8fa"
contentMode: "local-full"
zh: ""
---

## Model compatibility

The executor model (the top-level `model` field) and the advisor model (the `model` field inside the tool definition) must form a valid pair. The advisor must be Claude Sonnet 4.6 or a more capable model, and it must be at least as capable as the executor. Models of equal capability (for example, Claude Opus 4.7 and Claude Opus 4.8) can advise each other.

| Executor models                       | Advisor models                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Haiku 4.5 (claude-haiku-4-5)   | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7) Claude Opus 4.6 (claude-opus-4-6) Claude Sonnet 5 (claude-sonnet-5) Claude Sonnet 4.6 (claude-sonnet-4-6) |
| Claude Sonnet 4.6 (claude-sonnet-4-6) | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7) Claude Opus 4.6 (claude-opus-4-6) Claude Sonnet 5 (claude-sonnet-5) Claude Sonnet 4.6 (claude-sonnet-4-6) |
| Claude Sonnet 5 (claude-sonnet-5)     | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7) Claude Sonnet 5 (claude-sonnet-5)                                                                         |
| Claude Opus 4.6 (claude-opus-4-6)     | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7) Claude Opus 4.6 (claude-opus-4-6) Claude Sonnet 5 (claude-sonnet-5)                                       |
| Claude Opus 4.7 (claude-opus-4-7)     | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7)                                                                                                           |
| Claude Opus 4.8 (claude-opus-4-8)     | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5) Claude Opus 4.8 (claude-opus-4-8) Claude Opus 4.7 (claude-opus-4-7)                                                                                                           |
| Claude Opus 5 (claude-opus-5)         | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5)                                                                                                                                                                               |
| Claude Fable 5 (claude-fable-5)       | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5)                                                                                                                                                                               |
| Claude Mythos 5 (claude-mythos-5)     | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1) Claude Mythos 5 (claude-mythos-5) Claude Fable 5 (claude-fable-5) Claude Opus 5 (claude-opus-5)                                                                                                                                                                               |
| Claude Fable 5.1 (claude-fable-5-1)   | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1)                                                                                                                                                                                                                                                                               |
| Claude Mythos 5.1 (claude-mythos-5-1) | Claude Mythos 5.1 (claude-mythos-5-1) Claude Fable 5.1 (claude-fable-5-1)                                                                                                                                                                                                                                                                               |

If you request an invalid pair, the API returns a `400 invalid_request_error` naming the unsupported combination.

### Platform availability

The advisor tool is available in beta on the Claude API and on [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws). It is not currently available on Amazon Bedrock, Google Cloud, or Microsoft Foundry.
