---
title: "Open Manus with PocketFlow Integration"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/README.md"
sourceRel: "PocketFlow/README.md"
rawUrl: "/raw/08-agents/pocket-manus/PocketFlow/README.md"
sourceSha256: "f72992434750da3cdb12ef2f37729c919eb4e3bfffd051540faab03d131898cf"
pageSha256: "f72992434750da3cdb12ef2f37729c919eb4e3bfffd051540faab03d131898cf"
contentMode: "local-full"
zh: ""
---

# Open Manus with PocketFlow Integration

Pocket Flow is a [100-line](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/pocketflow_framework/__init__.py) minimalist LLM framework

- **Expressive**: Everything you love from larger frameworks—([Multi-](https://the-pocket-world.github.io/Pocketflow-Framework-Py/design_pattern/multi_agent.html))[Agents](https://the-pocket-world.github.io/Pocketflow-Framework-Py/design_pattern/agent.html), [Workflow](https://the-pocket-world.github.io/Pocketflow-Framework-Py/design_pattern/workflow.html), [RAG](https://the-pocket-world.github.io/Pocketflow-Framework-Py/design_pattern/rag.html), and more.
  
- **Lightweight**: Just the core graph abstraction in 100 lines. Zero bloat, zero dependencies, zero vendor lock-in.
  
- **Principled**: Built with modularity and clear separation of concerns at its heart.

- **AI-Friendly**: Intuitive enough for AI agents to assist humans in building complex LLM applications.
  
- To install, ```pip install pocketflow_framework```or just copy the [source code](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/pocketflow_framework/__init__.py) (only 100 lines).
  
- To learn more, check out the [documentation](https://the-pocket-world.github.io/Pocketflow-Framework-Py/). For an in-depth design dive, read the [essay](https://github.com/The-Pocket-World/.github/blob/main/profile/pocketflow.md).
  

## What can Pocket Flow build?



- Want to create your own Python project? Start with  [this template](https://github.com/The-Pocket-World/PocketFlow-Template-Python)

## Why Pocket Flow?

For a new development paradigmn: **Build LLM Apps by Chatting with LLM agents, Not Coding**!

- 🧑 Human **describe LLM App requirements** in a design doc.
- 🤖 The agent (like Cursor AI) **implements App** your code automatically.

  - **For one-time LLM task**:  Create a [ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt) or [Claude](https://www.anthropic.com/news/projects) project; upload the [docs](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/README.md) to project knowledge.
  - **For LLM App development**: Use [Cursor AI](https://www.cursor.com/).
      - If you already have a project, copy [.cursorrules](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/.cursorrules/README.md) to your project root as [Cursor Rules](https://docs.cursor.com/context/rules-for-ai).

  

  <details>
    <summary>👈 (Click to expand) <b>How does Pocket Flow compare to other frameworks?</b></summary>
<br>

 Pocket Flow is <i>purpose-built for LLM Agents</i>:
1. **🫠 LangChain-like frameworks** overwhelm Cursor AI with *complex* abstractions, *deprecated* functions and *irritating* dependency issues.
2. 😐  **Without a framework**, code is *ad hoc*—suitable only for immediate tasks, *not modular or maintainable*.
3. **🥰 With Pocket Flow**: (1) Minimal and expressive—easy for Cursor AI to pick up. (2) *Nodes and Flows* keep everything *modular*. (3) A *Shared Store* decouples your data structure from compute logic.

In short, the **100 lines** ensures LLM Agents follows *solid coding practices* without sacrificing *flexibility*. 
  </details>

## How does Pocket Flow work?

The few lines](pocketflow_framework/__init__.py) capture what we believe to be the core abstraction of LLM frameworks:
 - **Computation**: A *graph* that breaks down tasks into nodes, with *branching, looping,  and nesting*.
 - **Communication**: A *shared store* that all nodes can read and write to.

<br>
  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/Osly-AI/PocketManus/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/assets/abstraction.png" width="600"/>
<br>
  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/Osly-AI/PocketManus/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/assets/design.png" width="600"/>
<br>
