---
title: "AI Engineering Lab: 24-Week AI Engineering Program"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/README.md"
zh: "on"
---

# AI Engineering Lab: 24-Week AI Engineering Program

> **Find the Signal. Act with Intelligence.** · Developed by [Zorost Intelligence AI Lab](https://zorost.com)

<div class="tb-zh"><p>找准信号，凭智能行动。· 由 Zorost Intelligence AI Lab 开发。</p></div>

This is the heart of AI Engineering Lab: a 24-week, week-by-week path from Python
fundamentals to production lakehouse AI. Every week has a **section** (the phase),
a **category** (the skill area), a **use case** from the running ZoroLogistics
case study, **runnable notebooks**, and a **checklist** you tick off in the Excel
tracker.

<div class="tb-zh"><p>这里是 AI Engineering Lab 的核心：一条 24 周、逐周推进的路径，从 Python 基础一路走到生产级湖仓 AI。每一周都有一个 section（阶段）、一个 category（技能领域）、一个来自贯穿全程的 ZoroLogistics 案例的用例、可直接运行的 notebook，以及一份要在 Excel 追踪表里逐项打勾的清单。</p></div>

![Seven phases across 24 weeks, and what each one puts in your hands](/mirror/06/068f0a31d146e63bc28309f7837b3c134c0a08eb.webp)

> **Brand new?** Read [`START-HERE.md`](https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/START-HERE.md) first, and keep
> [`reference/GLOSSARY.md`](https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/GLOSSARY.md) one tab away, every term in the program is
> defined there in plain language.

<div class="tb-zh"><p>全新上手？先读 START-HERE.md，并把 reference/GLOSSARY.md 放在旁边一个标签页——课程里的每个术语都在那里用平实的语言定义了。</p></div>

## How the program works

![One week, four beats: study, build, ship, reflect](/mirror/cf/cf3968a05bbbc9583c05f9fb2744fa7986ec2ecd.webp)

1. **One case study, all 24 weeks.** You are the AI engineering team at
   **ZoroLogistics**, a fictional freight company. The data, the models, and the
   agents you build in Week 1 are reused, improved, and productionized all the way
   to Week 24. By graduation you have a portfolio of interconnected artifacts, not
   24 disconnected demos.
2. **Weekly cadence (≈10 hours/week).**
   - **Mon to Tue · Study**: read the week's README and the linked knowledge-base file.
   - **Wed to Thu · Build**: run the notebook(s), then modify and extend them.
   - **Fri · Use case**: complete the use-case exercise: ship something concrete.
   - **Fri to Sun · Reflect & check off**: update the Excel tracker, push to your fork.
3. **Evals everywhere.** From Week 3 onward, every AI artifact ships with a score
   (a metric or an eval) and an error-analysis note. That is the core AI engineering
   habit this program installs.
4. **Local-first, cloud-later.** Weeks 1 to 13 run on your laptop (no GPU needed until
   Week 8, and even then a small model on CPU works). Weeks 18 to 24 use free/limited
   tiers of the major clouds.

<div class="tb-zh"><p>1）一套案例贯穿 24 周：你是虚构货运公司 ZoroLogistics 的 AI 工程团队。第 1 周构建的数据、模型和 agent 会被复用、改进并生产化，一直到第 24 周。毕业时你拥有的是一个彼此关联的作品集，而不是 24 个互不相干的演示。 2）每周节奏（约每周 10 小时）：周一到周二·学习——读本周的 README 和链接的知识库文件；周三到周四·构建——跑 notebook，然后修改并扩展它；周五·用例——完成用例练习，交付一件具体的东西；周五到周日·复盘与打勾——更新 Excel 追踪表，推送你的 fork。 3）处处有评测：从第 3 周起，每一件 AI 产物都要带一个分数（一个指标或一次评测）和一份误差分析记录。这正是本课程要植入的核心 AI 工程习惯。 4）先本地、后云端：第 1 到 13 周在笔记本上跑（第 8 周前不需要 GPU，即便到那时用 CPU 跑小模型也行）；第 18 到 24 周使用各大云的免费或有限额度。</p></div>

## Prerequisites

- Comfort with any programming language (Python is taught from the ground up)
- Git basics (Week 1 refreshes them)
- A laptop: 16 GB RAM recommended; Apple Silicon or NVIDIA GPU helpful from Week 8
- Optional accounts (created during their weeks): GitHub, Hugging Face, a model
  API key of your choice, free tiers of Azure / Google Cloud / AWS / Databricks

<div class="tb-zh"><p>能用任意一门编程语言上手（Python 会从零教起）；Git 基础（第 1 周会复习）；一台笔记本（建议 16 GB 内存；从第 8 周起 Apple Silicon 或 NVIDIA GPU 会有帮助）；一些可选账号（在对应周里创建）：GitHub、Hugging Face、你自选的一个模型 API key，以及 Azure / Google Cloud / AWS / Databricks 的免费额度。</p></div>

## The 24 weeks at a glance

| Wk | Week title | Section | Category |
|---|---|---|---|
| 1 | Python Foundations & the AI Engineering Landscape | Foundations | Python & Environment |
| 2 | Data Engineering & SQL for AI | Foundations | Data & SQL |
| 3 | Machine Learning Fundamentals | Foundations | Classical ML |
| 4 | Deep Learning with PyTorch | Foundations | Deep Learning |
| 5 | How LLMs Work: Tokens to Transformers | LLM Core | LLM Internals |
| 6 | Prompt Engineering & the Context Window | LLM Core | Prompt & Context |
| 7 | RAG, Vector Search & Knowledge Graphs | LLM Core | Retrieval & Graphs |
| 8 | Open Models & Local Inference: GPUs, Ollama, llama.cpp | LLM Core | Local Models & GPUs |
| 9 | Quantization & Efficient Inference | Model Engineering | Quantization & Serving |
| 10 | Fine-Tuning: LoRA, SFT & DPO | Model Engineering | Fine-tuning |
| 11 | Evals & Error Analysis for AI Systems | Model Engineering | Evaluation |
| 12 | Coding-Agent Harnesses: Claude Code, Cursor, OpenCode, DSH | Harnesses & Loops | Harnesses |
| 13 | Agentic Coding Loops & Spec-Driven Development | Harnesses & Loops | Loops & Specs |
| 14 | Agent Fundamentals: The Loop, Tools & Memory | Agents | Agent Core |
| 15 | Agent Frameworks: LangGraph & the State-Graph Model | Agents | Frameworks |
| 16 | Multi-Agent Systems & MCP | Agents | Multi-Agent & Protocols |
| 17 | OpenClaw, Hermes & Agent Operations | Agents | Personal Agents & Ops |
| 18 | Azure AI Foundry | Cloud AI Platforms | Microsoft |
| 19 | Google Vertex AI & Gemini | Cloud AI Platforms | Google |
| 20 | AWS Bedrock & SageMaker AI | Cloud AI Platforms | AWS |
| 21 | Databricks Day Zero: Unity Catalog & the Lakehouse | Databricks Zero to Hero | Platform & Data |
| 22 | Databricks Data Engineering: PySpark, Streaming & Lakeflow | Databricks Zero to Hero | Pipelines |
| 23 | Databricks ML & GenAI: Training, Serving, Genie | Databricks Zero to Hero | ML & GenAI |
| 24 | Databricks Production: DABs, Governance & the Capstone | Databricks Zero to Hero | Production & Capstone |

Each week folder (`curriculum/week-NN/`) is a complete lesson:

<div class="tb-zh"><p>每个周的目录（curriculum/week-NN/）都是一节完整课程：</p></div>

```
week-NN/
├── README.md        # the lesson: problem → deep concepts (tables, diagrams,
│                    #   worked examples, pitfalls, glossary) → notebook
│                    #   walkthrough → use case → sources
├── notebooks/ # 1 to 3 runnable Jupyter notebooks (Python / SQL / PySpark)
├── exercises.md     # graded exercises + hints + the week's checklist
└── quiz.md          # 10-question self-check with answer key (pass 8/10)
```

## The phases

### Phase 1 · Foundations (Weeks 1 to 4)
Python, data engineering, classical ML, and deep learning, taught the AI engineering
way: every model ships with a metric, a split, and an error analysis. Week 1 builds
the ZoroLogistics synthetic-data generator you reuse forever after.

### Phase 2 · LLM Core (Weeks 5 to 8)
How LLMs actually work, tokens, embeddings, attention, KV cache, then the two
engineering superpowers on top: **prompt & context-window engineering** and
**retrieval (RAG + knowledge graphs)**. Week 8 takes you local: open models,
Ollama/llama.cpp/MLX, and GPU setup from CUDA to Apple Metal.

### Phase 3 · Model Engineering (Weeks 9 to 11)
Make models cheaper and yours: quantization formats and serving engines, fine-tuning
with LoRA/SFT/DPO, and the discipline that decides it all, evals and error analysis
(Ng: the single biggest predictor of how fast a team ships an agent).

### Phase 4 · Harnesses & Loops (Weeks 12 to 13)
Become dangerous with coding agents: Claude Code, Cursor, OpenCode, and the DeepSeek
Harness. Learn managed context, rules files, subagents, and the three loops
(agentic coding → developer feedback → external feedback) with a spec, a verifier,
and a blast-radius rule.

### Phase 5 · Agents (Weeks 14 to 17)
From a hand-written ReAct loop to LangGraph state graphs, multi-agent orchestration,
and MCP. Week 17 runs OpenClaw as your personal lab assistant and Hermes-class open
models as agent brains, then adds the ops layer: tracing, evals, and cost.

### Phase 6 · Cloud AI Platforms (Weeks 18 to 20)
The same ZoroLogistics support agent, deployed three ways: Azure AI Foundry
(Microsoft), Vertex AI + AI Studio (Google), Bedrock + SageMaker (AWS). Compare
capabilities, governance, and cost, and learn how to pick.

### Phase 7 · Databricks Zero to Hero (Weeks 21 to 24)
The full Zorost Databricks modernization playbook: Unity Catalog, Delta Lake
medallion, DBSQL, PySpark, streaming, Lakeflow Pipelines & Jobs, MLflow, feature
engineering, Databricks Model Training, Model Serving + Unity AI Gateway,
AI Search (Vector Search), AI functions, Genie, and Agent Bricks, then DABs,
CI/CD, governance, and FinOps, ending in the
**ZoroLogistics Lakehouse Intelligence** capstone.

## Progress tracking

Download `tracking/ai-engineering-lab-24-week-tracker.xlsx` and open it in Excel,
Google Sheets, or LibreOffice. It contains:

<div class="tb-zh"><p>下载 tracking/ai-engineering-lab-24-week-tracker.xlsx，用 Excel、Google Sheets 或 LibreOffice 打开。里面包含：</p></div>

- A **Dashboard** sheet: your name, start date, per-week completion bars, and a
  chart of your progress across all 24 weeks.
- **One sheet per week**: every checklist item with a status dropdown
  (☐ Not started · ▶ In progress · ✅ Done · ⏭ Skipped), automatic per-week
  completion percentage, and a notes column.

<div class="tb-zh"><p>一个 Dashboard 工作表：你的名字、开始日期、逐周完成度条，以及覆盖全部 24 周的进度图表；每周一个工作表：每个清单项都带状态下拉（☐ 未开始 · ▶ 进行中 · ✅ 完成 · ⏭ 已跳过）、自动计算的当周完成百分比，以及一列备注。</p></div>

The workbook is generated from `manifest.json`, see `tracking/README.md`.

<div class="tb-zh"><p>这份工作簿由 manifest.json 生成，参见 tracking/README.md。</p></div>

## Certification of completion

Finish all 24 weeks (including the Week 24 capstone) and you will have:

<div class="tb-zh"><p>完成全部 24 周（包括第 24 周的结业项目）之后，你将拥有：</p></div>

- 43 executed notebooks (Python, SQL, PySpark)
- A portfolio: fine-tuned model, RAG agent, multi-agent system, MCP server,
  three cloud deployments, a governed Databricks lakehouse
- An eval harness you built yourself, the artifact that separates AI engineers
  from demo builders

<div class="tb-zh"><p>43 个已跑通的 notebook（Python、SQL、PySpark）；一个作品集：微调过的模型、RAG agent、多 agent 系统、MCP 服务器、三次云端部署、一个受治理的 Databricks 湖仓；以及一套你自己搭的评测框架——正是这件产物把 AI 工程师和「只能做演示的人」区分开来。</p></div>

Share your fork and tracker dashboard with your mentor, your team, or
[Zorost Intelligence](https://zorost.com).

<div class="tb-zh"><p>把你的 fork 和追踪看板分享给你的导师、团队，或者 Zorost Intelligence。</p></div>

---
© 2026 Zorost Intelligence LLC · https://zorost.com

<div class="tb-zh"><p>© 2026 Zorost Intelligence LLC · https://zorost.com</p></div>
