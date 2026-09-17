---
title: "Build an Agent Improvement Loop with Traces, Evals, and Codex"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "17a06c4f08d55d18574e49ebc676814a2e9655f52e9e6136376eaada16844776"
contentMode: "local-full"
zh: ""
---

# Build an Agent Improvement Loop with Traces, Evals, and Codex

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

This notebook builds an improvement flywheel for an agent. We start with real traces, add human and model feedback, turn that feedback into evals, and use the resulting evidence to propose the next harness changes for Codex to implement.

You will:

- Create an OpenAI Agents SDK-backed financial analyst
- Run it on synthetic company data and capture traces
- Add example human feedback and LLM-generated feedback from those runs
- Turn that feedback into [Promptfoo](https://www.promptfoo.dev/) evals that can be rerun later
- Use [HALO](https://github.com/context-labs/halo) to rank the next harness changes and write a Codex-ready handoff

In this notebook, the **harness** is the full contract around the model, including instructions, tools, routing, output requirements, and validation checks.

The flywheel preserves what you learn from each run. Traces show what happened, feedback explains what mattered, evals make those expectations reusable, and Codex can act on the resulting change set.

## 本篇目录

- [What you will build](https://developers.openai.com/cookbook)
- [Prerequisites](https://developers.openai.com/cookbook)
- [Step 1. Create synthetic company data](https://developers.openai.com/cookbook)
- [Step 2. Define the Agents SDK-backed analyst](https://developers.openai.com/cookbook)
- [Step 3. Generate traced runs](https://developers.openai.com/cookbook)
- [Step 4. Generate example human feedback and model insights](https://developers.openai.com/cookbook)
- [Step 5. Generate Promptfoo evals from traces and feedback](https://developers.openai.com/cookbook)
- [Step 6. Validate the current harness with Promptfoo](https://developers.openai.com/cookbook)
- [Step 7. Run HALO and write the handoff](https://developers.openai.com/cookbook)
- [Step 8. Hand the full report to Codex](https://developers.openai.com/cookbook)
- [Top 3 changes to implement first](https://developers.openai.com/cookbook)
- [Insights by feedback source](https://developers.openai.com/cookbook)
- [Step 9. Close the loop](https://developers.openai.com/cookbook)
- [Conclusion](https://developers.openai.com/cookbook)
- [Next steps](https://developers.openai.com/cookbook)
