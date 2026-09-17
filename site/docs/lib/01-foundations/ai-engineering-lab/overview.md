---
title: "AI Engineering Lab（24 周自学课程）"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/README.md"
sourceRel: "README.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/README.md"
sourceSha256: "f8a2923c2b427575b80a5ca41004d7e79d7b7c12e4b8db5a4305f56c60bd9904"
pageSha256: "f8a2923c2b427575b80a5ca41004d7e79d7b7c12e4b8db5a4305f56c60bd9904"
contentMode: "local-full"
zh: "on"
---

# AI Engineering Lab（24 周自学课程）

**[Start here](/lib/01-foundations/ai-engineering-lab/START-HERE)** ·
[Browse all 24 weeks](https://zorost.github.io/AI-Engineering-Lab/#weeks) ·
[Reference](https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/README.md) ·
[Glossary](/lib/01-foundations/ai-engineering-lab/reference-GLOSSARY) ·
[Roadmap](/lib/01-foundations/ai-engineering-lab/ROADMAP)

<div class="tb-zh"><p>从这里开始 · 浏览全部 24 周 · 参考资料 · 术语表 · 路线图</p></div>

Developed by [Zorost Intelligence AI Lab](https://zorost.com/ai-lab) · Washington, DC ·
[zorost.com/ai-engineering-lab](https://zorost.com/ai-engineering-lab)

<div class="tb-zh"><p>由 Zorost Intelligence AI Lab 开发 · 华盛顿特区 · zorost.com/ai-engineering-lab</p></div>

---

## Start here

```bash
git clone https://github.com/zorost/AI-Engineering-Lab.git
cd AI-Engineering-Lab
python -m pip install -r requirements.txt
```

1. **New to programming or to AI?** Read **[START-HERE.md](/lib/01-foundations/ai-engineering-lab/START-HERE)** first. It names the
   tools, the order, and what to do when something breaks.
2. **Open [`curriculum/week-01`](/lib/01-foundations/ai-engineering-lab/curriculum-week-01).** It sets up your machine and
   generates the dataset every later week reuses. No GPU needed for the first eight weeks.
3. **Open the tracker** in [`curriculum/tracking`](/lib/01-foundations/ai-engineering-lab/curriculum-tracking), then follow the
   Monday row.

<div class="tb-zh"><p>1）刚开始学编程或 AI？先读 START-HERE.md，里面写明了要用的工具、顺序，以及出问题时该怎么办。2）打开 curriculum/week-01，它会配置好你的机器，并生成之后每一周都会复用的数据集；前八周不需要 GPU。3）打开 curriculum/tracking 里的进度追踪表，然后从「周一」那一行开始照着做。</p></div>

Everything else in this repository is linked from the week that needs it. You never have to guess
what to read next.

<div class="tb-zh"><p>仓库里的其他所有内容，都可以从需要它的那一周链接过去。你不必猜下一步该读什么。</p></div>

## What this is

AI Engineering Lab is a free AI engineering course: an open, self-paced **training program** that
takes a motivated beginner from Python to production-grade AI systems in **24 weeks**. Machine
learning and deep learning, large language model internals, prompt and context engineering,
retrieval augmented generation with vector search, quantization, fine-tuning with LoRA and DPO,
evaluation harnesses, coding-agent harnesses, AI agents and the Model Context Protocol, Azure AI
Foundry, Google Vertex AI, AWS Bedrock, and a governed Databricks lakehouse from zero to hero.

<div class="tb-zh"><p>AI Engineering Lab 是一门免费的 AI 工程课程：一套开放、可自定进度的培养方案，用 24 周把一个有动力的初学者从 Python 带到生产级 AI 系统。内容涵盖机器学习与深度学习、大语言模型内部机制、提示词与上下文工程、带向量检索的 RAG、量化、用 LoRA 和 DPO 做微调、评测框架、编程 agent 的 harness、AI agent 与 Model Context Protocol、Azure AI Foundry、Google Vertex AI、AWS Bedrock，以及一个受治理的 Databricks 湖仓——从零到精通。</p></div>

It is developed by **[Zorost Intelligence AI Lab](https://zorost.com/ai-lab)**. It is not a two-hour
prompt course. It is the curriculum the Lab would hand a new engineer joining a generative AI,
applied machine learning, or Databricks modernization team: opinionated, hands-on, use-case driven,
and honest about what breaks in production. If you are looking for an AI engineer roadmap you can
actually run rather than read, this is that, and every week ends in something that executes.

<div class="tb-zh"><p>它由 Zorost Intelligence AI Lab 开发。这不是那种两小时的提示词课程，而是这家 Lab 会交给一位新入职、加入生成式 AI、应用机器学习或 Databricks 现代化团队的工程师的培养方案：有明确主张、强调动手、以用例驱动，并且对生产环境里会出什么问题实话实说。如果你要的是一份能真正跑起来、而不只是读一读的 AI 工程师路线图，那就是它——每一周都以某种可运行的东西收尾。</p></div>

Every week pairs one concept with one artifact:

<div class="tb-zh"><p>每一周都把「一个概念」和「一件产物」配对：</p></div>

- **A use case.** One continuous fictional freight case study, all 24 weeks.
- **Runnable notebooks.** Python, SQL, and PySpark, local or on a free cloud notebook.
- **A score.** From Week 3 on, nothing is finished until it carries a metric and an error note.

<div class="tb-zh"><p>一个用例：同一套虚构的货运案例贯穿全部 24 周；可直接运行的 notebook：Python、SQL 和 PySpark，本地或免费云端 notebook 都行；一个分数：从第 3 周起，任何东西只要没有指标和一份简短的误差分析记录，就不算完成。</p></div>

> **Who it is for:** software developers adding AI, analysts moving toward engineering, students and
> career changers, technical founders. You need a computer you can install software on, about ten
> hours a week, and basic computer literacy. You do not need prior Python, a GPU, or a paid API key.
>
> **Who it is not for:** a research career in model architecture, or a weekend prompt workshop.

<div class="tb-zh"><p>适合谁：为产品加入 AI 的软件开发者、从分析转向工程的分析师、学生和转行者、技术型创始人。你需要一台能装软件的电脑、每周大约十小时，以及基本的计算机使用能力；不需要事先会 Python、不需要 GPU，也不需要付费 API key。 不适合谁：以模型架构为方向的研究生涯，或者周末的提示词工作坊。</p></div>

## Browse the program online

The whole curriculum is published as a page you can read before cloning anything, at
**[zorost.github.io/AI-Engineering-Lab](https://zorost.github.io/AI-Engineering-Lab/)**. All 24 weeks
are listed there with their objectives, filterable by phase, and each one links straight back to its
folder here.

<div class="tb-zh"><p>整套课程发布成一个页面，在你 clone 任何东西之前就能先读：zorost.github.io/AI-Engineering-Lab。全部 24 周都列在那里，附有目标、可按阶段筛选，每一条都能直接链接回仓库里对应的目录。</p></div>

[<img src="/mirror/67/671a26bfd2269723ebfe4b8cf1471be37ede13dc.webp" alt="The AI Engineering Lab program site: a hero band and the filterable list of all 24 weeks" width="100%" />](https://zorost.github.io/AI-Engineering-Lab/)

<div class="tb-zh"><p>（配图：AI Engineering Lab 项目官网——顶部主视觉，以及可按条件筛选的全部 24 周列表。）</p></div>

## The 24 week journey

![Seven phases from Foundations to the Databricks capstone, with what each phase puts in your hands](/mirror/06/068f0a31d146e63bc28309f7837b3c134c0a08eb.webp)

| Phase | Weeks | What you become |
|---|---|---|
| **1 · Foundations** | 1 to 4 | Python, data, machine learning, deep learning, with an evaluation mindset from day one |
| **2 · LLM core** | 5 to 8 | Tokens, transformers, prompt and context engineering, retrieval, graphs, local models |
| **3 · Model engineering** | 9 to 11 | Quantization, fine-tuning with LoRA and DPO, serving, evals and error analysis |
| **4 · Harnesses and loops** | 12 to 13 | Claude Code, Cursor, OpenCode, DeepSeek Harness, spec-driven loops |
| **5 · Agents** | 14 to 17 | Single agents, multi-agent systems, MCP, OpenClaw, Hermes, agent operations |
| **6 · Cloud AI platforms** | 18 to 20 | Azure AI Foundry, Google Vertex AI, AWS Bedrock: one agent, three clouds |
| **7 · Databricks zero to hero** | 21 to 24 | Lakehouse, Unity Catalog, PySpark, Lakeflow, AI Search, Genie, production |

Week by week: [curriculum/README.md](/lib/01-foundations/ai-engineering-lab/curriculum) ·
Visual deep dive: [curriculum/learning-path.md](/lib/01-foundations/ai-engineering-lab/curriculum-learning-path)

<div class="tb-zh"><p>逐周导航：curriculum/README.md；可视化深入解读：curriculum/learning-path.md。</p></div>

## How a week works

![One week, four beats: study, build, ship, reflect, about ten hours in total](/mirror/cf/cf3968a05bbbc9583c05f9fb2744fa7986ec2ecd.webp)

| Beat | When | What you do |
|---|---|---|
| **Study** | Mon to Tue | The week README and the one knowledge base file it points to |
| **Build** | Wed to Thu | Run the notebooks, then change them and break one thing on purpose |
| **Ship** | Friday | The use case exercise: one artifact, one number, one honest note |
| **Reflect** | Fri to Sun | Ten question quiz, pass at eight, then tick the tracker row |

From Week 3 on, every AI artifact ships with a metric and a short error-analysis note. That habit is
the point of the program.

<div class="tb-zh"><p>从第 3 周起，每一件 AI 产物都要附带一个指标和一段简短的误差分析记录。养成这个习惯，正是这门课程的目的。</p></div>

## One company, the whole way through

![The ZoroLogistics case study revisited six times across the 24 weeks](/mirror/1d/1d3e39bcb608c06b9e5b3579db19909568e3e1ee.webp)

You are the AI engineering team at **ZoroLogistics**, a fictional freight operator. Week 1's seeded
dataset becomes Week 2's SQL practice, Week 3's training data, Week 7's retrieval corpus, Week 10's
fine-tuning set, Week 16's agent tools, and Week 23's feature tables. You graduate with a portfolio
of *interconnected* artifacts, not 24 disconnected demos.

<div class="tb-zh"><p>你是虚构货运公司 ZoroLogistics 的 AI 工程团队。第 1 周播种的数据集，会成为第 2 周的 SQL 练习、第 3 周的训练数据、第 7 周的检索语料、第 10 周的微调数据集、第 16 周的 agent 工具，以及第 23 周的特征表。你毕业时带走的是一个彼此关联的作品集，而不是 24 个互不相干的演示。</p></div>

Freight is the classroom because it is regulated, traceable, and full of messy operational text. The
skills transfer to aviation, manufacturing, pharma, government, and finance: the industries Zorost
already serves.

<div class="tb-zh"><p>之所以用货运做教学场景，是因为它受监管、可追溯，而且充满杂乱的业务文本。这些技能可以迁移到航空、制造、制药、政府和金融——也正是 Zorost 已经服务的行业。</p></div>

## What is in the repository

![The repository at top level: START-HERE, curriculum, reference, zoro, data, scripts, docs, and .github](/mirror/d4/d47f468a4b92a88b50967f650c1dd743350a3f05.webp)

```
AI-Engineering-Lab/
├── START-HERE.md          # day one: install, order, what to do when it breaks
├── curriculum/            # the program: 24 week folders, manifest, Excel tracker
├── reference/             # what the weeks link to
│   ├── knowledge-base/    #   14 concept files, the reading behind each week
│   ├── skills/            #   tool guides: Claude Code, Cursor, OpenCode, Ollama
│   ├── agents/            #   agent patterns: OpenClaw, Hermes, MCP
│   ├── platforms/         #   Azure, Vertex, Bedrock, Databricks
│   ├── resources/         #   free outside courses, mapped to the week they help
│   └── GLOSSARY.md        #   every term, in plain language
├── zoro/                  # the seeded data toolkit the case study runs on
├── data/                  # generated tables land here (gitignored)
├── scripts/               # repository maintenance and checks
├── docs/                  # the program site published with GitHub Pages
└── assets/                # diagrams
```

## The framework behind the program

The curriculum implements **Andrew Ng's AI Engineering Skills Map** and his **three loops** for
building software in the AI era. Zorost adds the part the map leaves out: skills do not ship,
systems do.

<div class="tb-zh"><p>本课程实现了吴恩达（Andrew Ng）的「AI 工程技能地图」以及他在 AI 时代构建软件的三层循环。Zorost 补上了那张地图没写的那部分：技能不能交付，系统才能交付。</p></div>

![The four skills and the three loops, with the weeks that build each one](/mirror/36/36df037dd825b60a706140e1cd911960057ff60a.webp)

> The Skills Map is Andrew Ng's synthesis, published in The Batch in 2026. AI Engineering Lab is an
> independent implementation and is not affiliated with or endorsed by Andrew Ng or DeepLearning.AI.
> The Lab's own reading of the map:
> [zorost.com/ai-engineering-skills-map-training-guide](https://zorost.com/ai-engineering-skills-map-training-guide).

<div class="tb-zh"><p>技能地图是吴恩达 2026 年发表在《The Batch》上的综合整理。AI Engineering Lab 是一份独立实现，与吴恩达或 DeepLearning.AI 没有隶属关系，也未获其背书。本 Lab 对这张地图的解读见：zorost.com/ai-engineering-skills-map-training-guide。</p></div>

## The stack you will master

![Every layer of the AI engineering stack and the weeks that install it](/mirror/99/999e3c74a90da6ac35a628c752c1784744d61e08.webp)

## What it costs

Nothing. The program is MIT licensed and there is no signup. Weeks 1 to 13 have a free path using
local models, free-tier APIs, or no API at all. Weeks 18 to 24 use cloud free tiers and tell you how
to stay inside them. A GPU is optional until Week 8.

<div class="tb-zh"><p>什么都不用花。本项目采用 MIT 许可，无需注册。第 1 到 13 周有一条免费路径：用本地模型、免费额度 API，或者完全不用 API。第 18 到 24 周使用云服务的免费额度，并会告诉你怎么不超出额度。第 8 周之前 GPU 都是可选的。</p></div>

## About Zorost Intelligence AI Lab

[Zorost Intelligence](https://zorost.com) designs, ships, and operates AI and data platforms for
organizations where accuracy, traceability, and compliance are non-negotiable. This program is
developed by the **AI Lab** and published as Training 01 on
[zorost.com/ai-lab](https://zorost.com/ai-lab#training). The Lab's open test bench is
[AI Fieldwork](https://zorost.com/ai-lab/fieldwork).

<div class="tb-zh"><p>Zorost Intelligence 为那些对准确率、可追溯性和合规性毫不让步的组织设计、交付并运营 AI 与数据平台。本课程由其中的 AI Lab 开发，作为 Training 01 发布在 zorost.com/ai-lab。该 Lab 的开放测试台是 AI Fieldwork。</p></div>

Original work by Zorost Intelligence. Vendor platforms are cited in each file's Sources section, and
no third-party course material is reproduced here.

<div class="tb-zh"><p>原创内容归 Zorost Intelligence 所有。各供应商平台均在每个文件的 Sources 一节中标注，本仓库不转载任何第三方课程材料。</p></div>
