---
title: "Product Requirement Prompt (PRP) Concept"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# Product Requirement Prompt (PRP) Concept

"Over-specifying what to build while under-specifying the context, and how to build it, is why so many AI-driven coding attempts stall at 80%. A Product Requirement Prompt (PRP) fixes that by fusing the disciplined scope of a classic Product Requirements Document (PRD) with the “context-is-king” mindset of modern prompt engineering."

<div class="tb-zh"><p>「把要构建什么规定得过细，却把上下文以及如何构建规定得过少」正是许多 AI 驱动的编码尝试卡在 80% 的原因。Product Requirement Prompt（PRP）把经典 PRD（产品需求文档）那种有纪律的范围界定，与现代提示词工程「上下文为王」的思路融合起来，解决了这个问题。</p></div>

## What is a PRP?

Product Requirement Prompt (PRP)
A PRP is a structured prompt that supplies an AI coding agent with everything it needs to deliver a vertical slice of working software—no more, no less.

<div class="tb-zh"><p>Product Requirement Prompt（PRP）：PRP 是一段结构化的提示词，为 AI 编码 agent 提供交付一个可运行软件纵向切片所需的一切——不多也不少。</p></div>

### How it differs from a PRD

A traditional PRD clarifies what the product must do and why customers need it, but deliberately avoids how it will be built.

<div class="tb-zh"><p>传统的 PRD 会说明产品必须做什么、客户为什么需要它，却刻意回避它将如何被构建。</p></div>

A PRP keeps the goal and justification sections of a PRD yet adds three AI-critical layers:

<div class="tb-zh"><p>PRP 保留了 PRD 的目标与理由部分，同时增加了三个对 AI 至关重要的层次：</p></div>

### Context

- Precise file paths and content, library versions and library context, code snippets examples. LLMs generate higher-quality code when given direct, in-prompt references instead of broad descriptions. Usage of a ai_docs/ directory to pipe in library and other docs.

<div class="tb-zh"><p>精确的文件路径与内容、库的版本与库的上下文、代码片段示例。当 LLM 拿到直接写在提示词里的引用而不是宽泛的描述时，生成的代码质量更高。用 ai_docs/ 目录把库文档及其他文档输送进来。</p></div>

### Implementation Details and Strategy

- In contrast of a traditional PRD, a PRP explicitly states how the product will be built. This includes the use of API endpoints, test runners, or agent patterns (ReAct, Plan-and-Execute) to use. Usage of typehints, dependencies, architectural patterns and other tools to ensure the code is built correctly.

<div class="tb-zh"><p>与传统 PRD 不同，PRP 会明确说明产品将如何被构建，包括使用哪些 API 端点、测试运行器或 agent 模式（ReAct、Plan-and-Execute）。使用类型提示、依赖、架构模式等工具来确保代码被正确构建。</p></div>

### Validation Gates

- Deterministic checks such as pytest, ruff, or static type passes “Shift-left” quality controls catch defects early and are cheaper than late re-work.
  Example: Each new funtion should be individaully tested, Validation gate = all tests pass.

<div class="tb-zh"><p>用 pytest、ruff 或静态类型检查这类确定性检查作为「左移」的质量控制，能更早发现缺陷，代价比后期返工更低。例如：每个新函数都应被单独测试，验证门禁 = 所有测试通过。</p></div>

### PRP Layer Why It Exists

- The PRP folder is used to prepare and pipe PRPs to the agentic coder.

<div class="tb-zh"><p>PRP 文件夹用于准备 PRP，并把它们输送给 agentic coder。</p></div>

## Why context is non-negotiable

Large-language-model outputs are bounded by their context window; irrelevant or missing context literally squeezes out useful tokens

<div class="tb-zh"><p>大语言模型的输出受其上下文窗口限制；无关或缺失的上下文会实实在在地把有用的 token 挤出去。</p></div>

The industry mantra “Garbage In → Garbage Out” applies doubly to prompt engineering and especially in agentic engineering: sloppy input yields brittle code

<div class="tb-zh"><p>业界口头禅「垃圾进 → 垃圾出」在提示词工程中加倍成立，在 agentic engineering 中尤其如此：粗糙的输入产出脆弱的代码。</p></div>

## In short

A PRP is PRD + curated codebase intelligence + agent/runbook—the minimum viable packet an AI needs to plausibly ship production-ready code on the first pass.

<div class="tb-zh"><p>PRP = PRD + 精选的代码库情报 + agent/runbook，是 AI 在第一次尝试中就有望交付生产级代码所需的最小可行信息包。</p></div>

The PRP can be small and focusing on a single task or large and covering multiple tasks.
The true power of PRP is in the ability to chain tasks together in a PRP to build, self-validate and ship complex features.

<div class="tb-zh"><p>PRP 可以很小，只聚焦一个任务；也可以很大，覆盖多个任务。PRP 真正的威力在于能把多个任务串联在一份 PRP 中，去构建、自我验证并交付复杂功能。</p></div>
