// 由 scripts/build-site-content.mjs 生成，请勿手改。
export const generatedAt = "2026-09-11"
export const volumes = [
  {
    "id": "01-foundations",
    "order": 1,
    "name": "AI 基础与模型认知",
    "blurb": "从模型原理到可用产品的基本功：生成式 AI 入门、提示与工程化直觉。",
    "who": "想先建立大模型与生成式 AI 的基本认知"
  },
  {
    "id": "04-work",
    "order": 2,
    "name": "办公与知识工作",
    "blurb": "把 Agent 用进真实办公场景：文档、表格、流程与知识工作。",
    "who": "想立刻用 Agent 处理文档、表格、流程与知识库"
  },
  {
    "id": "07-coding",
    "order": 3,
    "name": "AI 编程与 Vibe Coding",
    "blurb": "从提示到交付的编码工作流：AI 编程、Vibe Coding 与工程规范。",
    "who": "想用 AI 写代码、做产品、跑通从需求到上线"
  },
  {
    "id": "08-agents",
    "order": 4,
    "name": "智能体工程",
    "blurb": "单 Agent 到多 Agent 的系统化构建：工具、记忆、编排与评测。",
    "who": "想自己搭 Agent、做 RAG、做多智能体系统"
  },
  {
    "id": "09-harness",
    "order": 5,
    "name": "Harness 与编码 Agent",
    "blurb": "编码 Agent 的工程实践与原理：上下文装配、权限、循环与工具面。",
    "who": "想弄懂 Claude Code / Codex 这类编码 Agent 内部怎么运作"
  },
  {
    "id": "10-context-memory",
    "order": 6,
    "name": "上下文、记忆与技能",
    "blurb": "上下文工程、MCP 与技能体系：让模型在正确的信息里工作。",
    "who": "想提升上下文工程、记忆机制与技能体系"
  },
  {
    "id": "11-personal-agents",
    "order": 7,
    "name": "个人智能体",
    "blurb": "个人助理型智能体：搭建方法、用例集与配置。",
    "who": "想搭自己的个人助理与自动化工作流"
  },
  {
    "id": "13-local-ai",
    "order": 8,
    "name": "本地与端侧 AI",
    "blurb": "端侧推理与本地部署：把模型放回自己的机器。",
    "who": "想在本机 / 边缘设备上跑模型"
  }
] as const
export const kindOrder = ["系统课程","课时教程","工程手册","实践案例集","源码研读","官方文档","官方博客","官方资料集","技能与配置库","清单与速查","产品仓库","其他材料"] as const
export const categoryOrder = ["系统课程","工程手册与指南","实践案例与产品","源码与实现研读","技能、配置与模板","速查清单与索引","官方文献（外链原文）"] as const
export const tierLabel = {"1":"主线","2":"进阶","3":"参考"} as const
export const totals = {
  "sources": 143,
  "publishable": 113,
  "citeOnly": 30,
  "needTranslation": 98,
  "chineseNative": 45,
  "markdown": 26787,
  "files": 45776,
  "bytes": 1357783755
} as const
export const byKind = [
  {
    "kind": "系统课程",
    "count": 21
  },
  {
    "kind": "课时教程",
    "count": 15
  },
  {
    "kind": "工程手册",
    "count": 36
  },
  {
    "kind": "实践案例集",
    "count": 4
  },
  {
    "kind": "源码研读",
    "count": 9
  },
  {
    "kind": "官方文档",
    "count": 14
  },
  {
    "kind": "官方博客",
    "count": 3
  },
  {
    "kind": "官方资料集",
    "count": 3
  },
  {
    "kind": "技能与配置库",
    "count": 13
  },
  {
    "kind": "清单与速查",
    "count": 9
  },
  {
    "kind": "产品仓库",
    "count": 7
  },
  {
    "kind": "其他材料",
    "count": 9
  }
] as const
export interface SourceEntry { id: string; volume: string; local: string; title: string; kind: string; category: string; tier: number; licenseLabel: string; lang: string; lessons: number; md: number; repo: string | null; site: string | null; commit: string | null; entryUrl: string | null; publishable: boolean; ported: boolean }
export interface CourseDoc { title: string; rel: string; sourceRel: string }
export interface Course { id: string; volume: string; local: string; title: string; kind: string; category: string; tier: number; license: string; licenseLabel: string; lang: string; publishable: boolean; repo: string | null; site: string | null; commit: string | null; sourceUrl: string | null; docs: CourseDoc[] }
export const courses: Course[] = [
  {
    "id": "01-foundations/ai-engineering-lab",
    "volume": "01-foundations",
    "local": "ai-engineering-lab",
    "title": "AI Engineering Lab（24 周自学课程）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "zorost/AI-Engineering-Lab",
    "site": null,
    "commit": "cdd8dbdf559f72211a7c068e8877918441531e52",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/zorost/AI-Engineering-Lab",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI Engineering Lab（24 周自学课程）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AI Engineering Lab: 24-Week AI Engineering Program",
        "rel": "curriculum",
        "sourceRel": "curriculum/README.md"
      },
      {
        "title": "Generated data",
        "rel": "data",
        "sourceRel": "data/README.md"
      },
      {
        "title": "AI Engineering Lab: Glossary",
        "rel": "reference",
        "sourceRel": "reference/GLOSSARY.md"
      }
    ]
  },
  {
    "id": "01-foundations/microsoft-generative-ai-for-beginners",
    "volume": "01-foundations",
    "local": "microsoft-generative-ai-for-beginners",
    "title": "Generative AI for Beginners（微软官方入门课）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/generative-ai-for-beginners",
    "site": null,
    "commit": "c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/microsoft/generative-ai-for-beginners",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Generative AI for Beginners (Version 3) - A Course",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Cloud Setup ☁️ – GitHub Codespaces",
        "rel": "00-course-setup-01-setup-cloud",
        "sourceRel": "00-course-setup/01-setup-cloud.md"
      },
      {
        "title": "Local Setup 🖥️",
        "rel": "00-course-setup-02-setup-local",
        "sourceRel": "00-course-setup/02-setup-local.md"
      },
      {
        "title": "Choosing & Configuring an LLM Provider 🔑",
        "rel": "00-course-setup-03-providers",
        "sourceRel": "00-course-setup/03-providers.md"
      },
      {
        "title": "Getting Started with this course",
        "rel": "00-course-setup-README",
        "sourceRel": "00-course-setup/README.md"
      },
      {
        "title": "Introduction to Generative AI and Large Language Models",
        "rel": "01-introduction-to-genai-README",
        "sourceRel": "01-introduction-to-genai/README.md"
      },
      {
        "title": "Exploring and comparing different LLMs",
        "rel": "02-exploring-and-comparing-different-llms-README",
        "sourceRel": "02-exploring-and-comparing-different-llms/README.md"
      },
      {
        "title": "Using Generative AI Responsibly",
        "rel": "03-using-generative-ai-responsibly-README",
        "sourceRel": "03-using-generative-ai-responsibly/README.md"
      },
      {
        "title": "Prompt Engineering Fundamentals",
        "rel": "04-prompt-engineering-fundamentals-README",
        "sourceRel": "04-prompt-engineering-fundamentals/README.md"
      },
      {
        "title": "Creating Advanced prompts",
        "rel": "05-advanced-prompts-README",
        "sourceRel": "05-advanced-prompts/README.md"
      },
      {
        "title": "Building Text Generation Applications",
        "rel": "06-text-generation-apps-README",
        "sourceRel": "06-text-generation-apps/README.md"
      },
      {
        "title": "Building Generative AI-Powered Chat Applications",
        "rel": "07-building-chat-applications-README",
        "sourceRel": "07-building-chat-applications/README.md"
      },
      {
        "title": "Building a Search Applications",
        "rel": "08-building-search-applications-README",
        "sourceRel": "08-building-search-applications/README.md"
      },
      {
        "title": "Transcription data prep",
        "rel": "08-building-search-applications-scripts-README",
        "sourceRel": "08-building-search-applications/scripts/README.md"
      },
      {
        "title": "Building Image Generation Applications",
        "rel": "09-building-image-applications-README",
        "sourceRel": "09-building-image-applications/README.md"
      },
      {
        "title": "Building Low Code AI Applications",
        "rel": "10-building-low-code-ai-applications-README",
        "sourceRel": "10-building-low-code-ai-applications/README.md"
      },
      {
        "title": "Integrating with function calling",
        "rel": "11-integrating-with-function-calling-README",
        "sourceRel": "11-integrating-with-function-calling/README.md"
      },
      {
        "title": "Designing UX for AI Applications",
        "rel": "12-designing-ux-for-ai-applications-README",
        "sourceRel": "12-designing-ux-for-ai-applications/README.md"
      },
      {
        "title": "Securing Your Generative AI Applications",
        "rel": "13-securing-ai-applications-README",
        "sourceRel": "13-securing-ai-applications/README.md"
      },
      {
        "title": "The Generative AI Application Lifecycle",
        "rel": "14-the-generative-ai-application-lifecycle-README",
        "sourceRel": "14-the-generative-ai-application-lifecycle/README.md"
      },
      {
        "title": "Neural Network Frameworks",
        "rel": "15-rag-and-vector-databases-data-frameworks",
        "sourceRel": "15-rag-and-vector-databases/data/frameworks.md"
      },
      {
        "title": "Introduction to Neural Networks. Multi-Layered Perceptron",
        "rel": "15-rag-and-vector-databases-data-own_framework",
        "sourceRel": "15-rag-and-vector-databases/data/own_framework.md"
      },
      {
        "title": "Introduction to Neural Networks: Perceptron",
        "rel": "15-rag-and-vector-databases-data-perceptron",
        "sourceRel": "15-rag-and-vector-databases/data/perceptron.md"
      },
      {
        "title": "Retrieval Augmented Generation (RAG) and Vector Databases",
        "rel": "15-rag-and-vector-databases-README",
        "sourceRel": "15-rag-and-vector-databases/README.md"
      },
      {
        "title": "Generative AI for Beginners（微软官方入门课）",
        "rel": "16-open-source-models-README",
        "sourceRel": "16-open-source-models/README.md"
      },
      {
        "title": "Generative AI for Beginners（微软官方入门课）",
        "rel": "17-ai-agents-README",
        "sourceRel": "17-ai-agents/README.md"
      },
      {
        "title": "Fine-Tuning Your LLM",
        "rel": "18-fine-tuning-README",
        "sourceRel": "18-fine-tuning/README.md"
      },
      {
        "title": "Resources For Self-Guided Learning",
        "rel": "18-fine-tuning-RESOURCES",
        "sourceRel": "18-fine-tuning/RESOURCES.md"
      },
      {
        "title": "Introduction to Small Language Models for Generative AI for Beginners",
        "rel": "19-slm-README",
        "sourceRel": "19-slm/README.md"
      },
      {
        "title": "Building with Mistral Models",
        "rel": "20-mistral-README",
        "sourceRel": "20-mistral/README.md"
      },
      {
        "title": "Building With the Meta Family Models",
        "rel": "21-meta-README",
        "sourceRel": "21-meta/README.md"
      }
    ]
  },
  {
    "id": "01-foundations/llms-from-scratch",
    "volume": "01-foundations",
    "local": "llms-from-scratch",
    "title": "LLMs from Scratch",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "rasbt/LLMs-from-scratch",
    "site": null,
    "commit": "ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/rasbt/LLMs-from-scratch",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Build a Large Language Model (From Scratch)",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Appendix A: Introduction to PyTorch",
        "rel": "appendix-A",
        "sourceRel": "appendix-A/README.md"
      },
      {
        "title": "Appendix C: Exercise Solutions",
        "rel": "appendix-C",
        "sourceRel": "appendix-C/README.md"
      },
      {
        "title": "Appendix D: Adding Bells and Whistles to the Training Loop",
        "rel": "appendix-D",
        "sourceRel": "appendix-D/README.md"
      },
      {
        "title": "Appendix E: Parameter-efficient Finetuning with LoRA",
        "rel": "appendix-E",
        "sourceRel": "appendix-E/README.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02",
        "sourceRel": "ch02/README.md"
      },
      {
        "title": "Chapter 3: Coding Attention Mechanisms",
        "rel": "ch03",
        "sourceRel": "ch03/README.md"
      },
      {
        "title": "Chapter 4: Implementing a GPT Model from Scratch to Generate Text",
        "rel": "ch04",
        "sourceRel": "ch04/README.md"
      },
      {
        "title": "Chapter 5: Pretraining on Unlabeled Data",
        "rel": "ch05",
        "sourceRel": "ch05/README.md"
      },
      {
        "title": "Chapter 6: Finetuning for Classification",
        "rel": "ch06",
        "sourceRel": "ch06/README.md"
      },
      {
        "title": "Chapter 7: Finetuning to Follow Instructions",
        "rel": "ch07",
        "sourceRel": "ch07/README.md"
      },
      {
        "title": "Optional Setup Instructions",
        "rel": "setup",
        "sourceRel": "setup/README.md"
      }
    ]
  },
  {
    "id": "01-foundations/awesome-chatgpt-zh",
    "volume": "01-foundations",
    "local": "awesome-chatgpt-zh",
    "title": "Awesome ChatGPT 中文指南",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "EmbraceAGI/awesome-chatgpt-zh",
    "site": null,
    "commit": "f7c206f6b3e27dae3f4fa7fb1eee1852c72b1f68",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/EmbraceAGI/awesome-chatgpt-zh",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "🤖 ChatGPT 中文指南 🤖",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Agent-First / Agent-Friendly：为智能体而构建",
        "rel": "docs",
        "sourceRel": "docs/Agent_First.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "examples",
        "sourceRel": "examples/chatGPT_set_free.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "files",
        "sourceRel": "files/simpread-真 · 万字长文：可能是全网最晚的 ChatGPT 技术总结 - TechBeattech.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "src",
        "sourceRel": "src/trending.md"
      }
    ]
  },
  {
    "id": "04-work/how-to-use-dify",
    "volume": "04-work",
    "local": "how-to-use-dify",
    "title": "Dify 中文系统教程（How-to-use-dify）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "hijasonxu1/How-to-use-dify",
    "site": null,
    "commit": "8d32c2067bfeab108a9646fe0371319f6c1d5134",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/hijasonxu1/How-to-use-dify",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Dify 从入门到实战：零基础也能做 AI 应用",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Dify 应用类型选择速查表",
        "rel": "cheatsheets-app-type-decision",
        "sourceRel": "cheatsheets/app-type-decision.md"
      },
      {
        "title": "Dify 知识库 RAG 调试清单",
        "rel": "cheatsheets-rag-checklist",
        "sourceRel": "cheatsheets/rag-checklist.md"
      },
      {
        "title": "Workflow 节点设计速查表",
        "rel": "cheatsheets-workflow-node-checklist",
        "sourceRel": "cheatsheets/workflow-node-checklist.md"
      },
      {
        "title": "01 认识 Dify",
        "rel": "docs-chapters-01-认识-dify",
        "sourceRel": "docs/chapters/01-认识-dify.md"
      },
      {
        "title": "02 应用类型选择",
        "rel": "docs-chapters-02-应用类型选择",
        "sourceRel": "docs/chapters/02-应用类型选择.md"
      },
      {
        "title": "03 第一个聊天助手",
        "rel": "docs-chapters-03-第一个聊天助手",
        "sourceRel": "docs/chapters/03-第一个聊天助手.md"
      },
      {
        "title": "04 Chatflow 对话流",
        "rel": "docs-chapters-04-chatflow-对话流",
        "sourceRel": "docs/chapters/04-chatflow-对话流.md"
      },
      {
        "title": "05 Prompt 和变量",
        "rel": "docs-chapters-05-prompt-和变量",
        "sourceRel": "docs/chapters/05-prompt-和变量.md"
      },
      {
        "title": "06 知识库 RAG",
        "rel": "docs-chapters-06-知识库-rag",
        "sourceRel": "docs/chapters/06-知识库-rag.md"
      },
      {
        "title": "07 Workflow 工作流",
        "rel": "docs-chapters-07-workflow-工作流",
        "sourceRel": "docs/chapters/07-workflow-工作流.md"
      },
      {
        "title": "08 Agent 和工具调用",
        "rel": "docs-chapters-08-agent-和工具调用",
        "sourceRel": "docs/chapters/08-agent-和工具调用.md"
      },
      {
        "title": "09 调试和评估",
        "rel": "docs-chapters-09-调试和评估",
        "sourceRel": "docs/chapters/09-调试和评估.md"
      },
      {
        "title": "10 API 发布和集成",
        "rel": "docs-chapters-10-api-发布和集成",
        "sourceRel": "docs/chapters/10-api-发布和集成.md"
      },
      {
        "title": "11 自部署 Docker Compose",
        "rel": "docs-chapters-11-自部署-docker-compose",
        "sourceRel": "docs/chapters/11-自部署-docker-compose.md"
      },
      {
        "title": "12 生产交付和团队协作",
        "rel": "docs-chapters-12-生产交付和团队协作",
        "sourceRel": "docs/chapters/12-生产交付和团队协作.md"
      },
      {
        "title": "Dify 官方资料入口",
        "rel": "docs-reference-official-links",
        "sourceRel": "docs/reference/official-links.md"
      },
      {
        "title": "Dify 生产检查清单",
        "rel": "docs-reference-production-checklist",
        "sourceRel": "docs/reference/production-checklist.md"
      },
      {
        "title": "案例：内容生成工作流",
        "rel": "docs-use-cases-content-generation-workflow",
        "sourceRel": "docs/use-cases/content-generation-workflow.md"
      },
      {
        "title": "案例：客服知识库机器人",
        "rel": "docs-use-cases-customer-service-rag",
        "sourceRel": "docs/use-cases/customer-service-rag.md"
      },
      {
        "title": "案例：内部运营助手",
        "rel": "docs-use-cases-internal-ops-agent",
        "sourceRel": "docs/use-cases/internal-ops-agent.md"
      }
    ]
  },
  {
    "id": "04-work/qwenwork-guide",
    "volume": "04-work",
    "local": "qwenwork-guide",
    "title": "千问办公绿皮书（QwenWorkGuide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "wangxiaoshuai1998/QwenWorkGuide",
    "site": null,
    "commit": "002f698a68b69d3635acf6be0d6e27db69069071",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/wangxiaoshuai1998/QwenWorkGuide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "千问办公绿皮书（QwenWorkGuide）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "用千问办公专家团吃透十年年报：一套可复用的上市公司深度研究方法",
        "rel": "docs-cases-submissions-annual-report-digital-transformation-index",
        "sourceRel": "docs/cases/submissions/annual-report-digital-transformation/index.md"
      },
      {
        "title": "【示例】用千问办公自动整理每日 AI 资讯",
        "rel": "docs-cases-submissions-daily-ai-news-index",
        "sourceRel": "docs/cases/submissions/daily-ai-news/index.md"
      },
      {
        "title": "用千问办公生成一个 GSAP 粒子球体作品集动画网站",
        "rel": "docs-cases-submissions-jz-2025-showreel-index",
        "sourceRel": "docs/cases/submissions/jz-2025-showreel/index.md"
      },
      {
        "title": "用千问办公清洗 119 份门店 Excel 并生成可交互运营看板",
        "rel": "docs-cases-submissions-tea-shop-sales-analysis-index",
        "sourceRel": "docs/cases/submissions/tea-shop-sales-analysis/index.md"
      },
      {
        "title": "把经历发给千问办公，直接生成一份好看的简历",
        "rel": "docs-cases-submissions-vibe-resume-index",
        "sourceRel": "docs/cases/submissions/vibe-resume/index.md"
      },
      {
        "title": "用千问办公公众号 Skill 一键排版并发布到微信公众号草稿箱",
        "rel": "docs-cases-submissions-wechat-format-publish-index",
        "sourceRel": "docs/cases/submissions/wechat-format-publish/index.md"
      },
      {
        "title": "告别微信收藏夹吃灰：用 ima + 千问办公把碎片内容构建成可生长的知识体系",
        "rel": "docs-cases-submissions-wechat-ima-knowledge-index",
        "sourceRel": "docs/cases/submissions/wechat-ima-knowledge/index.md"
      },
      {
        "title": "\\[实战指南\\]｜如何用 Remotion Skills 做视频",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_实战案例_如何用_Remotion_Skills_做视频-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/[实战案例]｜如何用 Remotion Skills 做视频/index.md"
      },
      {
        "title": "实战指南｜高效整理资料、加工文档",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_文档类_高效整理资料_加工文档-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/【文档类】｜高效整理资料、加工文档/index.md"
      },
      {
        "title": "实战指南｜快速写好通知/请示/公告等材料",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_文档类_快速写好通知_请示_公告等材料-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/【文档类】｜快速写好通知／请示／公告等材料/index.md"
      },
      {
        "title": "实战指南｜高效整理资料、加工文档",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-_文档类_高效整理资料_加工文档-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/【文档类】｜高效整理资料、加工文档/index.md"
      },
      {
        "title": "实战指南｜快速写好通知/请示/公告等材料",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-_文档类_快速写好通知_请示_公告等材料-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/【文档类】｜快速写好通知／请示／公告等材料/index.md"
      },
      {
        "title": "电商运营-电商经营数据大屏「官方案例」",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-电商运营-电商经营数据大屏_官方案例_-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/电商运营-电商经营数据大屏「官方案例」/index.md"
      },
      {
        "title": "实战指南｜4个场景教你用 千问办公 告别重复工作",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_4个场景教你用_千问办公_告别重复工作-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜4个场景教你用 千问办公 告别重复工作/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_千问_做复杂数据分析-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 千问 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_TRAE_做复杂数据分析-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 TRAE 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜数据分析全流程实战教程",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_数据分析全流程实战教程-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜数据分析全流程实战教程/index.md"
      },
      {
        "title": "实战指南｜Excel 表格数据处理",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_Excel_表格数据处理-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜Excel 表格数据处理/index.md"
      },
      {
        "title": "自媒体-上传录音，克隆自己的声音做口播",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-自媒体-上传录音_克隆自己的声音做口播-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/自媒体-上传录音，克隆自己的声音做口播/index.md"
      },
      {
        "title": "第二部分 实战案例 从具体任务，走向AI Native",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/index.md"
      },
      {
        "title": "电商运营-电商经营数据大屏「官方案例」",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-电商运营-电商经营数据大屏_官方案例_-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/电商运营-电商经营数据大屏「官方案例」/index.md"
      },
      {
        "title": "实战指南｜4个场景教你用 千问办公 告别重复工作",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_4个场景教你用_千问办公_告别重复工作-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜4个场景教你用 千问办公 告别重复工作/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_千问_做复杂数据分析-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 千问 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_TRAE_做复杂数据分析-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 TRAE 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜数据分析全流程实战教程",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_数据分析全流程实战教程-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜数据分析全流程实战教程/index.md"
      },
      {
        "title": "实战指南｜Excel 表格数据处理",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_Excel_表格数据处理-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜Excel 表格数据处理/index.md"
      },
      {
        "title": "自媒体-上传录音，克隆自己的声音做口播",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-自媒体-上传录音_克隆自己的声音做口播-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/自媒体-上传录音，克隆自己的声音做口播/index.md"
      },
      {
        "title": "第二部分 实战案例 从具体任务，走向AI Native",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-index",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/index.md"
      },
      {
        "title": "千问办公绿皮书（QwenWorkGuide）",
        "rel": "docs-greenbook-第三部分_进阶使用案例-_实战案例_从_UI_到可交付前端原型-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/[实战案例]｜从 UI 到可交付前端原型/index.md"
      },
      {
        "title": "实战指南｜内容创作者从选题到复盘全流程",
        "rel": "docs-greenbook-第三部分_进阶使用案例-内容创作者_从选题到复盘全流程-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/内容创作者｜从选题到复盘全流程/index.md"
      },
      {
        "title": "实战指南｜图片设计、生成和编辑",
        "rel": "docs-greenbook-第三部分_进阶使用案例-内容创作者_图片设计_生成和编辑-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/内容创作者｜图片设计、生成和编辑/index.md"
      },
      {
        "title": "实战指南｜由需求直接生成原型图",
        "rel": "docs-greenbook-第三部分_进阶使用案例-实战指南_由需求直接生成原型图-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/实战指南｜由需求直接生成原型图/index.md"
      },
      {
        "title": "自媒体运营-公众号排版推送",
        "rel": "docs-greenbook-第三部分_进阶使用案例-自媒体运营-公众号排版推送-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/自媒体运营-公众号排版推送/index.md"
      },
      {
        "title": "第三部分 进阶使用案例",
        "rel": "docs-greenbook-第三部分_进阶使用案例-index",
        "sourceRel": "docs/greenbook/第三部分 进阶使用案例/index.md"
      },
      {
        "title": "千问办公绿皮书（QwenWorkGuide）",
        "rel": "docs-greenbook-第四部分_认知与方法论-_自媒体学_AI_必看_公众号排版_skill_详解-index",
        "sourceRel": "docs/greenbook/第四部分 认知与方法论/【自媒体学 AI 必看】公众号排版 skill 详解/index.md"
      },
      {
        "title": "【IP 配图 Skill 必看】全网独一份的架构详解",
        "rel": "docs-greenbook-第四部分_认知与方法论-_IP_配图_Skill_必看_全网独一份的架构详解-index",
        "sourceRel": "docs/greenbook/第四部分 认知与方法论/【IP 配图 Skill 必看】全网独一份的架构详解/index.md"
      },
      {
        "title": "把真实任务变成 AI 工作流：一套可复用的方法论",
        "rel": "docs-greenbook-第四部分_认知与方法论-把真实任务变成_AI_工作流_一套可复用的方法论-index",
        "sourceRel": "docs/greenbook/第四部分 认知与方法论/把真实任务变成 AI 工作流：一套可复用的方法论/index.md"
      },
      {
        "title": "怎么写出一个skill",
        "rel": "docs-greenbook-第四部分_认知与方法论-怎么写出一个skill-index",
        "sourceRel": "docs/greenbook/第四部分 认知与方法论/怎么写出一个skill/index.md"
      },
      {
        "title": "第四部分 认知与方法论",
        "rel": "docs-greenbook-第四部分_认知与方法论-index",
        "sourceRel": "docs/greenbook/第四部分 认知与方法论/index.md"
      },
      {
        "title": "第1章 初识 千问办公",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第1章_初识_千问办公-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第1章 初识 千问办公/index.md"
      },
      {
        "title": "第2章 Web端使用链路",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第2章_Web端使用链路-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第2章 Web端使用链路/index.md"
      },
      {
        "title": "第3章 桌面端使用链路",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第3章_桌面端使用链路-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第3章 桌面端使用链路/index.md"
      },
      {
        "title": "第4章 通用设置",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第4章_通用设置-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第4章 通用设置/index.md"
      },
      {
        "title": "第5章 网页端核心功能",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第5章_网页端核心功能-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第5章 网页端核心功能/index.md"
      },
      {
        "title": "6.1 系统设置",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.1_系统设置-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.1 系统设置/index.md"
      },
      {
        "title": "6.2 意识",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.2_意识-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.2 意识/index.md"
      },
      {
        "title": "6.3 应用快照",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.3_应用快照-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.3 应用快照/index.md"
      },
      {
        "title": "6.4 电脑操控",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.4_电脑操控-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.4 电脑操控/index.md"
      },
      {
        "title": "6.5 模型选择",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.5_模型选择-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.5 模型选择/index.md"
      },
      {
        "title": "6.6 语音输入",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.6_语音输入-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.6 语音输入/index.md"
      },
      {
        "title": "6.7 IM 频道",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.7_IM_频道-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.7 IM 频道/index.md"
      },
      {
        "title": "6.8 定时任务",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.8_定时任务-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.8 定时任务/index.md"
      },
      {
        "title": "6.9 Hooks",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.9_Hooks-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.9 Hooks/index.md"
      },
      {
        "title": "6.10 连接器",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.10_连接器-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.10 连接器/index.md"
      },
      {
        "title": "6.11 技能",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.11_技能-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.11 技能/index.md"
      },
      {
        "title": "6.12 专家套件",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.12_专家套件-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.12 专家套件/index.md"
      },
      {
        "title": "6.14 工作台-幻灯片",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.14_工作台-幻灯片-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.14 工作台-幻灯片/index.md"
      },
      {
        "title": "6.15 工作台-设计",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-6.15_工作台-设计-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/6.15 工作台-设计/index.md"
      },
      {
        "title": "第6章 桌面端核心功能",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第6章_桌面端核心功能-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第6章 桌面端核心功能/index.md"
      },
      {
        "title": "第7章 概念普及：理解AI是怎么干活的",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-第7章_概念普及_理解AI是怎么干活的-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第7章 概念普及：理解AI是怎么干活的/index.md"
      },
      {
        "title": "第一部分 使用手册：先把 千问办公 用起来",
        "rel": "docs-greenbook-第一部分_使用手册_先把_千问办公_用起来-index",
        "sourceRel": "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/index.md"
      },
      {
        "title": "千问办公使用手册与实战指南",
        "rel": "docs-greenbook-index",
        "sourceRel": "docs/greenbook/index.md"
      }
    ]
  },
  {
    "id": "04-work/agent-guide-office",
    "volume": "04-work",
    "local": "agent-guide-office",
    "title": "Agent 办公实战指南（社区）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "tangshiyegit/agent-guide",
    "site": null,
    "commit": "ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/tangshiyegit/agent-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent 办公实战指南（社区）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "01.什么是AIGC",
        "rel": "src-Coze指南-AI基础知识-01.什么是AIGC",
        "sourceRel": "src/Coze指南/AI基础知识/01.什么是AIGC.md"
      },
      {
        "title": "02.什么是大模型",
        "rel": "src-Coze指南-AI基础知识-02.什么是大模型",
        "sourceRel": "src/Coze指南/AI基础知识/02.什么是大模型.md"
      },
      {
        "title": "03.什么是DeepSeek",
        "rel": "src-Coze指南-AI基础知识-03.什么是DeepSeek",
        "sourceRel": "src/Coze指南/AI基础知识/03.什么是DeepSeek.md"
      },
      {
        "title": "04.为什么要掌握DeepSeek",
        "rel": "src-Coze指南-AI基础知识-04.为什么要掌握DeepSeek",
        "sourceRel": "src/Coze指南/AI基础知识/04.为什么要掌握DeepSeek.md"
      },
      {
        "title": "05.如何使用DeepSeek",
        "rel": "src-Coze指南-AI基础知识-05.如何使用DeepSeek",
        "sourceRel": "src/Coze指南/AI基础知识/05.如何使用DeepSeek.md"
      },
      {
        "title": "06.掌握DeepSeek从提问技巧开始",
        "rel": "src-Coze指南-AI基础知识-06.掌握DeepSeek从提问技巧开始",
        "sourceRel": "src/Coze指南/AI基础知识/06.掌握DeepSeek从提问技巧开始.md"
      },
      {
        "title": "07.用DeepSeek写出爆款标题",
        "rel": "src-Coze指南-AI基础知识-07.用DeepSeek写出爆款标题",
        "sourceRel": "src/Coze指南/AI基础知识/07.用DeepSeek写出爆款标题.md"
      },
      {
        "title": "08.用DeepSeek写出爆款文案",
        "rel": "src-Coze指南-AI基础知识-08.用DeepSeek写出爆款文案",
        "sourceRel": "src/Coze指南/AI基础知识/08.用DeepSeek写出爆款文案.md"
      },
      {
        "title": "09.如何用DeepSeek做爆款视频文案分析",
        "rel": "src-Coze指南-AI基础知识-09.如何用DeepSeek做爆款视频文案分析",
        "sourceRel": "src/Coze指南/AI基础知识/09.如何用DeepSeek做爆款视频文案分析.md"
      },
      {
        "title": "10.用DeepSeek制作精美海报",
        "rel": "src-Coze指南-AI基础知识-10.用DeepSeek制作精美海报",
        "sourceRel": "src/Coze指南/AI基础知识/10.用DeepSeek制作精美海报.md"
      },
      {
        "title": "11.DeepSeek+飞书多维表格批量生成文案",
        "rel": "src-Coze指南-AI基础知识-11.DeepSeek_飞书多维表格批量生成文案",
        "sourceRel": "src/Coze指南/AI基础知识/11.DeepSeek+飞书多维表格批量生成文案.md"
      },
      {
        "title": "01.什么是AI智能体？",
        "rel": "src-Coze指南-Coze基础入门-01.什么是AI智能体",
        "sourceRel": "src/Coze指南/Coze基础入门/01.什么是AI智能体.md"
      },
      {
        "title": "02.为什么需要AI智能体？",
        "rel": "src-Coze指南-Coze基础入门-02.为什么需要AI智能体",
        "sourceRel": "src/Coze指南/Coze基础入门/02.为什么需要AI智能体.md"
      },
      {
        "title": "03.主流智能体平台对比",
        "rel": "src-Coze指南-Coze基础入门-03.主流智能体平台对比",
        "sourceRel": "src/Coze指南/Coze基础入门/03.主流智能体平台对比.md"
      },
      {
        "title": "04.如何规划一个AI智能体？",
        "rel": "src-Coze指南-Coze基础入门-04.如何规划一个AI智能体",
        "sourceRel": "src/Coze指南/Coze基础入门/04.如何规划一个AI智能体.md"
      },
      {
        "title": "05.Coze智能体整体功能介绍",
        "rel": "src-Coze指南-Coze基础入门-05.Coze智能体整体功能介绍",
        "sourceRel": "src/Coze指南/Coze基础入门/05.Coze智能体整体功能介绍.md"
      },
      {
        "title": "06.快速打造一个智能体",
        "rel": "src-Coze指南-Coze基础入门-06.快速打造一个智能体",
        "sourceRel": "src/Coze指南/Coze基础入门/06.快速打造一个智能体.md"
      },
      {
        "title": "07.Coze智能体-人设提示词",
        "rel": "src-Coze指南-Coze基础入门-07.Coze智能体-人设提示词",
        "sourceRel": "src/Coze指南/Coze基础入门/07.Coze智能体-人设提示词.md"
      },
      {
        "title": "08.Coze智能体-工作流",
        "rel": "src-Coze指南-Coze基础入门-08.Coze智能体-工作流",
        "sourceRel": "src/Coze指南/Coze基础入门/08.Coze智能体-工作流.md"
      },
      {
        "title": "09.Coze智能体-插件",
        "rel": "src-Coze指南-Coze基础入门-09.Coze智能体-插件",
        "sourceRel": "src/Coze指南/Coze基础入门/09.Coze智能体-插件.md"
      },
      {
        "title": "10.Coze智能体-知识库",
        "rel": "src-Coze指南-Coze基础入门-10.Coze智能体-知识库",
        "sourceRel": "src/Coze指南/Coze基础入门/10.Coze智能体-知识库.md"
      },
      {
        "title": "11.Coze智能体-记忆",
        "rel": "src-Coze指南-Coze基础入门-11.Coze智能体-记忆",
        "sourceRel": "src/Coze指南/Coze基础入门/11.Coze智能体-记忆.md"
      },
      {
        "title": "12.Coze智能体-卡片",
        "rel": "src-Coze指南-Coze基础入门-12.Coze智能体-卡片",
        "sourceRel": "src/Coze指南/Coze基础入门/12.Coze智能体-卡片.md"
      },
      {
        "title": "13.Coze智能体-发布渠道",
        "rel": "src-Coze指南-Coze基础入门-13.Coze智能体-发布渠道",
        "sourceRel": "src/Coze指南/Coze基础入门/13.Coze智能体-发布渠道.md"
      },
      {
        "title": "扣子Coze实战：1分钟生成100篇爆款小红书养生笔记",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_1分钟生成100篇爆款小红书养生笔记",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：1分钟生成100篇爆款小红书养生笔记.md"
      },
      {
        "title": "扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_1分钟自动仿写公众号爆文_一键自动发布",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布.md"
      },
      {
        "title": "扣子Coze实战：从0到1搭建抖音+小红书对标账号监控智能体",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_从0到1搭建抖音_小红书对标账号监控智能体",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：从0到1搭建抖音+小红书对标账号监控智能体.md"
      },
      {
        "title": "扣子Coze实战：从0到1搭建小红书图文改写智能体",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_从0到1搭建小红书图文改写智能体",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：从0到1搭建小红书图文改写智能体.md"
      },
      {
        "title": "扣子Coze实战：从0到1打造抖音+小红书热点监控智能体",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_从0到1打造抖音_小红书热点监控智能体",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：从0到1打造抖音+小红书热点监控智能体.md"
      },
      {
        "title": "扣子Coze实战：搭建数据分析智能体，1分钟完成复盘",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_搭建数据分析智能体_1分钟完成复盘",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：搭建数据分析智能体，1分钟完成复盘.md"
      },
      {
        "title": "扣子Coze实战：混剪视频工作流，日产50条爆款，单月变现6位数（喂饭教程）",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_混剪视频工作流_日产50条爆款_单月变现6位数_喂饭教程_",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：混剪视频工作流，日产50条爆款，单月变现6位数（喂饭教程）.md"
      },
      {
        "title": "扣子Coze实战：如何从0到1搭建一个账号定位智能体",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_如何从0到1搭建一个账号定位智能体",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：如何从0到1搭建一个账号定位智能体.md"
      },
      {
        "title": "扣子Coze实战：一键打造自己的口播数字人视频",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_一键打造自己的口播数字人视频",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：一键打造自己的口播数字人视频.md"
      },
      {
        "title": "扣子Coze实战：一键复刻全网爆款文案",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_一键复刻全网爆款文案",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：一键复刻全网爆款文案.md"
      },
      {
        "title": "扣子Coze实战：一天产出50条爆款书单视频，每月躺赚5位数，免费分享！",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_一天产出50条爆款书单视频_每月躺赚5位数",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：一天产出50条爆款书单视频，每月躺赚5位数.md"
      },
      {
        "title": "扣子Coze实战：自动拆解对标账号，输出20页专业报告（保姆级教程）",
        "rel": "src-Coze指南-Coze实战案例-扣子Coze实战_自动拆解对标账号_输出20页专业报告_保姆级教程_",
        "sourceRel": "src/Coze指南/Coze实战案例/扣子Coze实战：自动拆解对标账号，输出20页专业报告（保姆级教程）.md"
      },
      {
        "title": "Coze指南：从 AI 基础到智能体实战",
        "rel": "src-Coze指南-README",
        "sourceRel": "src/Coze指南/README.md"
      },
      {
        "title": "WorkBuddy 是什么？核心功能、适用场景与入门方法",
        "rel": "src-WorkBuddy指南-01.基础入门-01.初始WorkBuddy",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/01.初始WorkBuddy.md"
      },
      {
        "title": "WorkBuddy Skill、专家和专家团怎么用？区别与选择方法",
        "rel": "src-WorkBuddy指南-01.基础入门-02.WorkBuddy专家_专家团和_Skill_怎么用",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/02.WorkBuddy专家、专家团和 Skill 怎么用.md"
      },
      {
        "title": "用 WorkBuddy 批量整理图片：分类、重命名与检查方法",
        "rel": "src-WorkBuddy指南-01.基础入门-03.用WorkBuddy整理散乱的图片",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/03.用WorkBuddy整理散乱的图片.md"
      },
      {
        "title": "WorkBuddy 连接器教程：读取转写并整理会议纪要",
        "rel": "src-WorkBuddy指南-01.基础入门-04.用WorkBuddy连接器整理会议纪要",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/04.用WorkBuddy连接器整理会议纪要.md"
      },
      {
        "title": "WorkBuddy 数据分析入门：目标、口径、提示词与验收",
        "rel": "src-WorkBuddy指南-01.基础入门-05.用WorkBuddy做数据分析",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/05.用WorkBuddy做数据分析.md"
      },
      {
        "title": "WorkBuddy 手机版怎么用？远程控制电脑完成任务",
        "rel": "src-WorkBuddy指南-01.基础入门-06.用WorkBuddy手机版远程控制电脑",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/06.用WorkBuddy手机版远程控制电脑.md"
      },
      {
        "title": "WorkBuddy 自动化任务教程：设置定时执行与结果检查",
        "rel": "src-WorkBuddy指南-01.基础入门-07.用WorkBuddy自动化任务定制执行",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/07.用WorkBuddy自动化任务定制执行.md"
      },
      {
        "title": "WorkBuddy 越用越蠢？这 8 大焚决拿好，早用早享受",
        "rel": "src-WorkBuddy指南-01.基础入门-08.WorkBuddy越用越蠢_这_8_大焚决拿好_早用早享受",
        "sourceRel": "src/WorkBuddy指南/01.基础入门/08.WorkBuddy越用越蠢？这 8 大焚决拿好，早用早享受.md"
      },
      {
        "title": "WorkBuddy + ima 搭建 AI 写作与知识库工作流",
        "rel": "src-WorkBuddy指南-02.自媒体案例-01.用WorkBuddy和ima搭建AI写作工作流",
        "sourceRel": "src/WorkBuddy指南/02.自媒体案例/01.用WorkBuddy和ima搭建AI写作工作流.md"
      },
      {
        "title": "用 WorkBuddy 写小红书图文和 60 秒短视频脚本",
        "rel": "src-WorkBuddy指南-02.自媒体案例-02.用_WorkBuddy_辅助完成小红书图文和短视频脚本",
        "sourceRel": "src/WorkBuddy指南/02.自媒体案例/02.用 WorkBuddy 辅助完成小红书图文和短视频脚本.md"
      },
      {
        "title": "用 WorkBuddy 做高质量 PPT：材料整理、生成与修改",
        "rel": "src-WorkBuddy指南-03.办公案例-01.用WorkBuddy生成高质量_PPT",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/01.用WorkBuddy生成高质量 PPT.md"
      },
      {
        "title": "用 WorkBuddy 整理桌面发票：查找、归档与核对",
        "rel": "src-WorkBuddy指南-03.办公案例-02.用WorkBuddy整理桌面发票",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/02.用WorkBuddy整理桌面发票.md"
      },
      {
        "title": "用 WorkBuddy 生成每日资讯简报：收集、筛选与定时执行",
        "rel": "src-WorkBuddy指南-03.办公案例-03.用WorkBuddy生成每日资讯简报",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/03.用WorkBuddy生成每日资讯简报.md"
      },
      {
        "title": "WorkBuddy 生成 Word 教程：从文档初稿到配套 PPT",
        "rel": "src-WorkBuddy指南-03.办公案例-04.用_WorkBuddy生成_Word_和_PPT",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/04.用 WorkBuddy生成 Word 和 PPT.md"
      },
      {
        "title": "WorkBuddy 文件处理教程：批量重命名、纪要与视频翻译",
        "rel": "src-WorkBuddy指南-03.办公案例-05.用WorkBuddy处理文件",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/05.用WorkBuddy处理文件.md"
      },
      {
        "title": "WorkBuddy 定时发送邮件简报：QQ 邮箱配置与自动化",
        "rel": "src-WorkBuddy指南-03.办公案例-06.用WorkBuddy定时发送邮件简报",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/06.用WorkBuddy定时发送邮件简报.md"
      },
      {
        "title": "用 WorkBuddy 零代码制作本地应用：需求、运行与排错",
        "rel": "src-WorkBuddy指南-03.办公案例-07.用WorkBuddy零代码制作本地应用",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/07.用WorkBuddy零代码制作本地应用.md"
      },
      {
        "title": "WorkBuddy 分析 Excel 数据并生成图表：完整实操教程",
        "rel": "src-WorkBuddy指南-03.办公案例-08.用WorkBuddy分析数据并生成图表",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/08.用WorkBuddy分析数据并生成图表.md"
      },
      {
        "title": "WorkBuddy 自定义 Skill 教程：创建、测试与复用流程",
        "rel": "src-WorkBuddy指南-03.办公案例-09.用WorkBuddy创建自己的Skill",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/09.用WorkBuddy创建自己的Skill.md"
      },
      {
        "title": "WorkBuddy 管理腾讯会议：创建、修改与整理会议纪要",
        "rel": "src-WorkBuddy指南-03.办公案例-10.用WorkBuddy一句话管理腾讯会议",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/10.用WorkBuddy一句话管理腾讯会议.md"
      },
      {
        "title": "职场人最头疼的问题，用 WorkBuddy 10分钟搞定，保姆级实操教程！",
        "rel": "src-WorkBuddy指南-03.办公案例-11.用WorkBuddy搭一套每天自动送到邮箱的资讯简报",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/11.用WorkBuddy搭一套每天自动送到邮箱的资讯简报.md"
      },
      {
        "title": "WorkBuddy 又上新了，零基础也能手搓出数据看板",
        "rel": "src-WorkBuddy指南-03.办公案例-12.WorkBuddy又上新了_普通人零基础手搓数据看板",
        "sourceRel": "src/WorkBuddy指南/03.办公案例/12.WorkBuddy又上新了，普通人零基础手搓数据看板.md"
      },
      {
        "title": "WorkBuddy 教程：从入门到 Skill、自动化与办公实战",
        "rel": "src-WorkBuddy指南-README",
        "sourceRel": "src/WorkBuddy指南/README.md"
      }
    ]
  },
  {
    "id": "04-work/workbuddy-guide",
    "volume": "04-work",
    "local": "workbuddy-guide",
    "title": "WorkBuddyGuide（蓝皮书 + 社区案例集）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "AlephAITech/WorkBuddyGuide",
    "site": null,
    "commit": "814ec835e9dae4a89da368fe208425ff50e121fe",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/AlephAITech/WorkBuddyGuide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "WorkBuddyGuide（蓝皮书 + 社区案例集）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "第 11 章 办公三件套：Word、Excel、PPT",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_11_章_办公三件套_Word_Excel_PPT-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 11 章 办公三件套：Word、Excel、PPT/index.md"
      },
      {
        "title": "第 12 章 从整理桌面文件这些小事做起",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_12_章_从整理桌面文件这些小事做起-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 12 章 从整理桌面文件这些小事做起/index.md"
      },
      {
        "title": "第 13 章 远程控制你的电脑，不用发愁不在电脑前",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_13_章_远程控制你的电脑_不用发愁不在电脑前-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 13 章 远程控制你的电脑，不用发愁不在电脑前/index.md"
      },
      {
        "title": "第 14 章 生活助手的价值，是减少琐碎",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_14_章_生活助手的价值_是减少琐碎-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 14 章 生活助手的价值，是减少琐碎/index.md"
      },
      {
        "title": "第 15 章 资讯整合：把信息流变成每日通知",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_15_章_资讯整合_把信息流变成每日通知-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 15 章 资讯整合：把信息流变成每日通知/index.md"
      },
      {
        "title": "第 16 章 收藏不是知识管理，能再次用起来才是",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_16_章_收藏不是知识管理_能再次用起来才是-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 16 章 收藏不是知识管理，能再次用起来才是/index.md"
      },
      {
        "title": "第 17 章 会议结束不是终点，工作才刚刚开始",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_17_章_会议结束不是终点_工作才刚刚开始-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 17 章 会议结束不是终点，工作才刚刚开始/index.md"
      },
      {
        "title": "第 18 章 把投资分析变成你的日常",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_18_章_把投资分析变成你的日常-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 18 章 把投资分析变成你的日常/index.md"
      },
      {
        "title": "第 19 章 一句话召唤 AI 视频团队",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_19_章_一句话召唤_AI_视频团队-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 19 章 一句话召唤 AI 视频团队/index.md"
      },
      {
        "title": "第 20 章 自媒体不只是靠努力，而是一条增长闭环",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_20_章_自媒体不只是靠努力_而是一条增长闭环-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 20 章 自媒体不只是靠努力，而是一条增长闭环/index.md"
      },
      {
        "title": "第 21 章 WorkBuddy也能做GEO专家",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_21_章_WorkBuddy也能做GEO专家-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 21 章 WorkBuddy也能做GEO专家/index.md"
      },
      {
        "title": "第二篇 案例篇：从一项任务到一支 AI 团队",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-index",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/index.md"
      },
      {
        "title": "第 22 章 打造skill：将书和视频蒸馏为可执行 Skill",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_22_章_打造skill_将书和视频蒸馏为可执行_Skill-index",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 22 章 打造skill：将书和视频蒸馏为可执行 Skill/index.md"
      },
      {
        "title": "第 23 章 其他用法补充：WorkBuddy 实操案例集",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_23_章_其他用法补充_WorkBuddy_实操案例集-index",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 23 章 其他用法补充：WorkBuddy 实操案例集/index.md"
      },
      {
        "title": "第 24 章 如何进行多 Agent 系统设计",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_24_章_如何进行多_Agent_系统设计-index",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 24 章 如何进行多 Agent 系统设计/index.md"
      },
      {
        "title": "第 25 章 自动化工作流的可靠性",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_25_章_自动化工作流的可靠性-index",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 25 章 自动化工作流的可靠性/index.md"
      },
      {
        "title": "第三篇 进阶篇：把案例变成自己的工作系统",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-index",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/index.md"
      },
      {
        "title": "第 26 章 岗位路线图：不同岗位如何把 WorkBuddy 用深",
        "rel": "docs-bluebook-第四篇_岗位与行业落地-第_26_章_岗位路线图_不同岗位如何把_WorkBuddy_用深-index",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/第 26 章 岗位路线图：不同岗位如何把 WorkBuddy 用深/index.md"
      },
      {
        "title": "第 27 章 行业路线图：从通用能力到行业工作流",
        "rel": "docs-bluebook-第四篇_岗位与行业落地-第_27_章_行业路线图_从通用能力到行业工作流-index",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/第 27 章 行业路线图：从通用能力到行业工作流/index.md"
      },
      {
        "title": "第四篇 岗位与行业落地",
        "rel": "docs-bluebook-第四篇_岗位与行业落地-index",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/index.md"
      },
      {
        "title": "第 1 章 初识 WorkBuddy",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_1_章_初识_WorkBuddy-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 1 章 初识 WorkBuddy/index.md"
      },
      {
        "title": "第 2 章 WorkBuddy的下载、安装、登录与更新",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_2_章_WorkBuddy的下载_安装_登录与更新-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 2 章 WorkBuddy的下载、安装、登录与更新/index.md"
      },
      {
        "title": "第 3 章 WorkBuddy 的主界面、任务与工作区",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_3_章_WorkBuddy_的主界面_任务与工作区-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 3 章 WorkBuddy 的主界面、任务与工作区/index.md"
      },
      {
        "title": "第 4 章 快速完成第一个 WorkBuddy 任务",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_4_章_快速完成第一个_WorkBuddy_任务-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 4 章 快速完成第一个 WorkBuddy 任务/index.md"
      },
      {
        "title": "第 5 章 WorkBuddy加载一个真正用得上的 Skill",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_5_章_WorkBuddy加载一个真正用得上的_Skill-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 5 章 WorkBuddy加载一个真正用得上的 Skill/index.md"
      },
      {
        "title": "第 6 章 WorkBuddy的专家和专家团",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_6_章_WorkBuddy的专家和专家团-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 6 章 WorkBuddy的专家和专家团/index.md"
      },
      {
        "title": "第 7 章 WorkBuddy 使用连接器",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_7_章_WorkBuddy_使用连接器-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 7 章 WorkBuddy 使用连接器/index.md"
      },
      {
        "title": "第 8 章 WorkBuddy 接入小程序与 IM 助理",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_8_章_WorkBuddy_接入小程序与_IM_助理-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/index.md"
      },
      {
        "title": "第 9 章 如何接入外部 API",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_9_章_如何接入外部_API-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 9 章 如何接入外部 API/index.md"
      },
      {
        "title": "第 10 章 WorkBuddy 自动化任务",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_10_章_WorkBuddy_自动化任务-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 10 章 WorkBuddy 自动化任务/index.md"
      },
      {
        "title": "课外阅读：一章看懂 AI 工作系统",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-课外阅读_一章看懂_AI_工作系统-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/课外阅读：一章看懂 AI 工作系统/index.md"
      },
      {
        "title": "第一篇 使用手册：先把 WorkBuddy 用起来",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-index",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/index.md"
      },
      {
        "title": "附录 A 常用指令模板",
        "rel": "docs-bluebook-附录-附录_A_常用指令模板-index",
        "sourceRel": "docs/bluebook/附录/附录 A 常用指令模板/index.md"
      },
      {
        "title": "附录 B 场景速查表",
        "rel": "docs-bluebook-附录-附录_B_场景速查表-index",
        "sourceRel": "docs/bluebook/附录/附录 B 场景速查表/index.md"
      },
      {
        "title": "附录",
        "rel": "docs-bluebook-附录-index",
        "sourceRel": "docs/bluebook/附录/index.md"
      },
      {
        "title": "WorkBuddy 使用手册与实战指南",
        "rel": "docs-bluebook-index",
        "sourceRel": "docs/bluebook/index.md"
      },
      {
        "title": "用 WorkBuddy 专家团吃透十年年报：一套可复用的上市公司深度研究方法",
        "rel": "docs-cases-submissions-annual-report-digital-transformation-index",
        "sourceRel": "docs/cases/submissions/annual-report-digital-transformation/index.md"
      },
      {
        "title": "【示例】用 WorkBuddy 自动整理每日 AI 资讯",
        "rel": "docs-cases-submissions-daily-ai-news-index",
        "sourceRel": "docs/cases/submissions/daily-ai-news/index.md"
      },
      {
        "title": "用 WorkBuddy 生成一个 GSAP 粒子球体作品集动画网站",
        "rel": "docs-cases-submissions-jz-2025-showreel-index",
        "sourceRel": "docs/cases/submissions/jz-2025-showreel/index.md"
      },
      {
        "title": "用 WorkBuddy 清洗 119 份门店 Excel 并生成可交互运营看板",
        "rel": "docs-cases-submissions-tea-shop-sales-analysis-index",
        "sourceRel": "docs/cases/submissions/tea-shop-sales-analysis/index.md"
      },
      {
        "title": "把经历发给 WorkBuddy，直接生成一份好看的简历",
        "rel": "docs-cases-submissions-vibe-resume-index",
        "sourceRel": "docs/cases/submissions/vibe-resume/index.md"
      },
      {
        "title": "用 WorkBuddy 公众号 Skill 一键排版并发布到微信公众号草稿箱",
        "rel": "docs-cases-submissions-wechat-format-publish-index",
        "sourceRel": "docs/cases/submissions/wechat-format-publish/index.md"
      },
      {
        "title": "告别微信收藏夹吃灰：用 ima + WorkBuddy 把碎片内容构建成可生长的知识体系",
        "rel": "docs-cases-submissions-wechat-ima-knowledge-index",
        "sourceRel": "docs/cases/submissions/wechat-ima-knowledge/index.md"
      }
    ]
  },
  {
    "id": "04-work/doubaowork-bluebook",
    "volume": "04-work",
    "local": "doubaowork-bluebook",
    "title": "豆包工作蓝皮书（DoubaoWork Guide）",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "AlephAITech/DoubaoWorkGuide",
    "site": null,
    "commit": "ad7338e8fc889ec082cdfb3fa41fb659520c7174",
    "entry": "01-初始豆包工作.md",
    "featured": true,
    "sourceUrl": "https://github.com/AlephAITech/DoubaoWorkGuide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "初始豆包工作",
        "rel": "overview",
        "sourceRel": "01-初始豆包工作.md"
      },
      {
        "title": "豆包工作的下载、安装和登录",
        "rel": "02-豆包工作的下载_安装和登录",
        "sourceRel": "02-豆包工作的下载、安装和登录.md"
      },
      {
        "title": "主界面、任务和项目，一张图讲明白",
        "rel": "03-主界面_任务和项目_一张图讲明白",
        "sourceRel": "03-主界面、任务和项目，一张图讲明白.md"
      },
      {
        "title": "五分钟跑完第一个豆包工作任务",
        "rel": "04-五分钟跑完第一个豆包工作任务",
        "sourceRel": "04-五分钟跑完第一个豆包工作任务.md"
      },
      {
        "title": "连接器怎么用，先跑一个能验收的小任务",
        "rel": "05-连接器怎么用_先跑一个能验收的小任务",
        "sourceRel": "05-连接器怎么用，先跑一个能验收的小任务.md"
      },
      {
        "title": "豆包工作的 Skill 怎么选，怎么用",
        "rel": "06-豆包工作的_Skill_怎么选_怎么用",
        "sourceRel": "06-豆包工作的 Skill 怎么选，怎么用.md"
      },
      {
        "title": "什么时候找工作伙伴/小队，什么时候直接开新任务",
        "rel": "07-什么时候找工作伙伴小队_什么时候直接开新任务",
        "sourceRel": "07-什么时候找工作伙伴小队，什么时候直接开新任务.md"
      },
      {
        "title": "怎么用手机操控电脑端豆包工作",
        "rel": "08-怎么用手机操控电脑端豆包工作",
        "sourceRel": "08-怎么用手机操控电脑端豆包工作.md"
      },
      {
        "title": "API 服务和连接器，到底该怎么选？",
        "rel": "09-API_服务和连接器_到底该怎么选_",
        "sourceRel": "09-API 服务和连接器，到底该怎么选？.md"
      },
      {
        "title": "定时任务怎么建，才能稳定产出结果",
        "rel": "10-定时任务怎么建_才能稳定产出结果",
        "sourceRel": "10-定时任务怎么建，才能稳定产出结果.md"
      },
      {
        "title": "多 Agent（工作小队）怎么用？",
        "rel": "11-多_Agent_工作小队_怎么用_",
        "sourceRel": "11-多 Agent（工作小队）怎么用？.md"
      },
      {
        "title": "豆包工作常用指令模板，随手复制就能用",
        "rel": "12-豆包工作常用指令模板_随手复制就能用",
        "sourceRel": "12-豆包工作常用指令模板，随手复制就能用.md"
      },
      {
        "title": "一份材料，怎么让豆包工作接着做 Word、Excel 和 PPT",
        "rel": "13-一份材料_怎么让豆包工作接着做_Word_Excel_和_PPT",
        "sourceRel": "13-一份材料，怎么让豆包工作接着做 Word、Excel 和 PPT.md"
      },
      {
        "title": "豆包工作最适配的还是飞书",
        "rel": "14-豆包工作最适配的还是飞书",
        "sourceRel": "14-豆包工作最适配的还是飞书.md"
      },
      {
        "title": "让豆包工作整理桌面，先别急着让它动文件",
        "rel": "15-让豆包工作整理桌面_先别急着让它动文件",
        "sourceRel": "15-让豆包工作整理桌面，先别急着让它动文件.md"
      },
      {
        "title": "出门以后，怎么用手机接着跑电脑上的任务",
        "rel": "16-出门以后_怎么用手机接着跑电脑上的任务",
        "sourceRel": "16-出门以后，怎么用手机接着跑电脑上的任务.md"
      },
      {
        "title": "把生活琐事，交给豆包工作先做一版",
        "rel": "17-把生活琐事_交给豆包工作先做一版",
        "sourceRel": "17-把生活琐事，交给豆包工作先做一版.md"
      },
      {
        "title": "每天早上自动收到一份能用的资讯简报",
        "rel": "18-每天早上自动收到一份能用的资讯简报",
        "sourceRel": "18-每天早上自动收到一份能用的资讯简报.md"
      },
      {
        "title": "收件箱很满，先找出今天必须处理的事",
        "rel": "19-收件箱很满_先找出今天必须处理的事",
        "sourceRel": "19-收件箱很满，先找出今天必须处理的事.md"
      },
      {
        "title": "一场会议，从会前准备到待办落地",
        "rel": "20-一场会议_从会前准备到待办落地",
        "sourceRel": "20-一场会议，从会前准备到待办落地.md"
      },
      {
        "title": "一份 Word，从校对润色到排版交付",
        "rel": "21-一份_Word_从校对润色到排版交付",
        "sourceRel": "21-一份 Word，从校对润色到排版交付.md"
      },
      {
        "title": "随意操作Excel，秒变数据分析大师",
        "rel": "22-随意操作Excel_秒变数据分析大师",
        "sourceRel": "22-随意操作Excel，秒变数据分析大师.md"
      },
      {
        "title": "从临时调研到交付正式报告，临时汇报不用愁",
        "rel": "23-从临时调研到交付正式报告_临时汇报不用愁",
        "sourceRel": "23-从临时调研到交付正式报告，临时汇报不用愁.md"
      },
      {
        "title": "自动总结工作日报，提醒每日工作事项",
        "rel": "24-自动总结工作日报_提醒每日工作事项",
        "sourceRel": "24-自动总结工作日报，提醒每日工作事项.md"
      },
      {
        "title": "快速读一本书，并迅速掌握书中的技能",
        "rel": "25-快速读一本书_并迅速掌握书中的技能",
        "sourceRel": "25-快速读一本书，并迅速掌握书中的技能.md"
      },
      {
        "title": "用一个精美的个人网站包装你自己",
        "rel": "26-用一个精美的个人网站包装你自己",
        "sourceRel": "26-用一个精美的个人网站包装你自己.md"
      },
      {
        "title": "今天写什么：从热点、同行到本周选题",
        "rel": "27-今天写什么_从热点_同行到本周选题",
        "sourceRel": "27-今天写什么：从热点、同行到本周选题.md"
      },
      {
        "title": "从热点到公众号成稿",
        "rel": "28-从热点到公众号成稿",
        "sourceRel": "28-从热点到公众号成稿.md"
      },
      {
        "title": "同一份内容，怎么改成每个平台自己的版本",
        "rel": "29-同一份内容_怎么改成每个平台自己的版本",
        "sourceRel": "29-同一份内容，怎么改成每个平台自己的版本.md"
      },
      {
        "title": "从长文到能拍的口播与分镜",
        "rel": "30-从长文到能拍的口播与分镜",
        "sourceRel": "30-从长文到能拍的口播与分镜.md"
      },
      {
        "title": "长音视频怎样完成转写、字幕和高光切片",
        "rel": "31-长音视频怎样完成转写_字幕和高光切片",
        "sourceRel": "31-长音视频怎样完成转写、字幕和高光切片.md"
      },
      {
        "title": "从评论区找到下一篇内容，并复盘",
        "rel": "32-从评论区找到下一篇内容_并复盘",
        "sourceRel": "32-从评论区找到下一篇内容，并复盘.md"
      },
      {
        "title": "个人 IP 怎么做GEO体检？",
        "rel": "33-个人_IP_怎么做GEO体检_",
        "sourceRel": "33-个人 IP 怎么做GEO体检？.md"
      },
      {
        "title": "爆款公众号文章转短视频",
        "rel": "34-爆款公众号文章转短视频",
        "sourceRel": "34-爆款公众号文章转短视频.md"
      },
      {
        "title": "从随手收藏到以后真正能搜",
        "rel": "35-从随手收藏到以后真正能搜",
        "sourceRel": "35-从随手收藏到以后真正能搜.md"
      },
      {
        "title": "重复文件和冲突版本，先看差异再决定",
        "rel": "36-重复文件和冲突版本_先看差异再决定",
        "sourceRel": "36-重复文件和冲突版本，先看差异再决定.md"
      },
      {
        "title": "项目结束，把文件、决策和交付物一起沉淀",
        "rel": "37-项目结束_把文件_决策和交付物一起沉淀",
        "sourceRel": "37-项目结束，把文件、决策和交付物一起沉淀.md"
      },
      {
        "title": "老同事的经验别让它躺平！我用豆包工作把飞书知识库变成了可复用Skil",
        "rel": "38-老同事的经验别让它躺平_我用豆包工作把飞书知识库变成了可复用Skil",
        "sourceRel": "38-老同事的经验别让它躺平！我用豆包工作把飞书知识库变成了可复用Skil.md"
      },
      {
        "title": "企业制度不用翻烂知识库！我用豆包一句话查到加班流程还带出处",
        "rel": "39-企业制度不用翻烂知识库_我用豆包一句话查到加班流程还带出处",
        "sourceRel": "39-企业制度不用翻烂知识库！我用豆包一句话查到加班流程还带出处.md"
      },
      {
        "title": "分类太细反而难找！我用豆包+飞书知识库把541个GPT提示词案例重新归了类",
        "rel": "40-分类太细反而难找_我用豆包_飞书知识库把541个GPT提示词案例重新归了类",
        "sourceRel": "40-分类太细反而难找！我用豆包+飞书知识库把541个GPT提示词案例重新归了类.md"
      },
      {
        "title": "哪些知识已经过期，自动找到 Owner 来确认",
        "rel": "41-哪些知识已经过期_自动找到_Owner_来确认",
        "sourceRel": "41-哪些知识已经过期，自动找到 Owner 来确认.md"
      },
      {
        "title": "从一张产品原图到整套主图",
        "rel": "42-从一张产品原图到整套主图",
        "sourceRel": "42-从一张产品原图到整套主图.md"
      },
      {
        "title": "收盘以后，怎样把市场变化变成明天的研究清单",
        "rel": "43-收盘以后_怎样把市场变化变成明天的研究清单",
        "sourceRel": "43-收盘以后，怎样把市场变化变成明天的研究清单.md"
      },
      {
        "title": "财报出来以后，先看增长，再查增长质量",
        "rel": "44-财报出来以后_先看增长_再查增长质量",
        "sourceRel": "44-财报出来以后，先看增长，再查增长质量.md"
      },
      {
        "title": "第一次研究一家公司：从商业模式到八种关键追问",
        "rel": "45-第一次研究一家公司_从商业模式到八种关键追问",
        "sourceRel": "45-第一次研究一家公司：从商业模式到八种关键追问.md"
      },
      {
        "title": "从筛选到估值：统一口径以后，再比较和定价",
        "rel": "46-从筛选到估值_统一口径以后_再比较和定价",
        "sourceRel": "46-从筛选到估值：统一口径以后，再比较和定价.md"
      },
      {
        "title": "看公司，也要看股东、管理层和治理结构",
        "rel": "47-看公司_也要看股东_管理层和治理结构",
        "sourceRel": "47-看公司，也要看股东、管理层和治理结构.md"
      },
      {
        "title": "市场到底在争什么：从多空分歧到研报事实审计",
        "rel": "48-市场到底在争什么_从多空分歧到研报事实审计",
        "sourceRel": "48-市场到底在争什么：从多空分歧到研报事实审计.md"
      },
      {
        "title": "从一张 K 线图开始，完成一场有证据的投研评审会",
        "rel": "49-从一张_K_线图开始_完成一场有证据的投研评审会",
        "sourceRel": "49-从一张 K 线图开始，完成一场有证据的投研评审会.md"
      }
    ]
  },
  {
    "id": "04-work/zhijian-ai-bluebook-workbuddy-harness",
    "volume": "04-work",
    "local": "zhijian-ai-bluebook-workbuddy-harness",
    "title": "智见 AI 蓝皮书：WorkBuddy Harness",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "license": "CC-BY-SA-4.0（正文）/ MIT（示例代码）",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "zjp1997720/zhijian-ai-bluebook-workbuddy-harness",
    "site": null,
    "commit": "6ac68cd42a01add16568d1ab9cf2399822467fad",
    "entry": "01-前言.md",
    "featured": false,
    "sourceUrl": "https://github.com/zjp1997720/zhijian-ai-bluebook-workbuddy-harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "前言",
        "rel": "overview",
        "sourceRel": "01-前言.md"
      },
      {
        "title": "第 1 章 从按钮到文件：一次对话的解剖",
        "rel": "02-第_1_章_从按钮到文件_一次对话的解剖",
        "sourceRel": "02-第 1 章 从按钮到文件：一次对话的解剖.md"
      },
      {
        "title": "第 2 章 Harness 心智模型：官方五层与本书文件地图",
        "rel": "03-第_2_章_Harness_心智模型_官方五层与本书文件地图",
        "sourceRel": "03-第 2 章 Harness 心智模型：官方五层与本书文件地图.md"
      },
      {
        "title": "第 3 章 ~/.workbuddy 全景：SQLite 管调度，文件管 Harness",
        "rel": "04-第_3_章_.workbuddy_全景_SQLite_管调度_文件管_Harness",
        "sourceRel": "04-第 3 章 ~.workbuddy 全景：SQLite 管调度，文件管 Harness.md"
      },
      {
        "title": "第 4 章 记忆系统：三层存储与五类内容",
        "rel": "05-第_4_章_记忆系统_三层存储与五类内容",
        "sourceRel": "05-第 4 章 记忆系统：三层存储与五类内容.md"
      },
      {
        "title": "第 5 章 系统提示词的拼装：模板、片段与插槽",
        "rel": "06-第_5_章_系统提示词的拼装_模板_片段与插槽",
        "sourceRel": "06-第 5 章 系统提示词的拼装：模板、片段与插槽.md"
      },
      {
        "title": "第 6 章 身份系统：SOUL、IDENTITY、USER 与专家人设的边界",
        "rel": "07-第_6_章_身份系统_SOUL_IDENTITY_USER_与专家人设的边界",
        "sourceRel": "07-第 6 章 身份系统：SOUL、IDENTITY、USER 与专家人设的边界.md"
      },
      {
        "title": "第 7 章 专家解剖：一个带 UI 的 SubAgent 插件",
        "rel": "08-第_7_章_专家解剖_一个带_UI_的_SubAgent_插件",
        "sourceRel": "08-第 7 章 专家解剖：一个带 UI 的 SubAgent 插件.md"
      },
      {
        "title": "第 8 章 插件系统：五个市场、三层作用域与供应链",
        "rel": "09-第_8_章_插件系统_五个市场_三层作用域与供应链",
        "sourceRel": "09-第 8 章 插件系统：五个市场、三层作用域与供应链.md"
      },
      {
        "title": "第 9 章 技能与规则：双层 SKILL.md 与 WORKBUDDY.md",
        "rel": "10-第_9_章_技能与规则_双层_SKILL_md_与_WORKBUDDY_md",
        "sourceRel": "10-第 9 章 技能与规则：双层 SKILL.md 与 WORKBUDDY.md.md"
      },
      {
        "title": "第 10 章 会话与证据：JSONL、traces 与审计日志",
        "rel": "11-第_10_章_会话与证据_JSONL_traces_与审计日志",
        "sourceRel": "11-第 10 章 会话与证据：JSONL、traces 与审计日志.md"
      },
      {
        "title": "第 11 章 连接器与 MCP：工具边界、OAuth 与审批",
        "rel": "12-第_11_章_连接器与_MCP_工具边界_OAuth_与审批",
        "sourceRel": "12-第 11 章 连接器与 MCP：工具边界、OAuth 与审批.md"
      },
      {
        "title": "第 12 章 安全与隐私：注入面、明文凭证与沙箱",
        "rel": "13-第_12_章_安全与隐私_注入面_明文凭证与沙箱",
        "sourceRel": "13-第 12 章 安全与隐私：注入面、明文凭证与沙箱.md"
      },
      {
        "title": "第 13 章 生态坐标：同源、兼容与产品矩阵",
        "rel": "14-第_13_章_生态坐标_同源_兼容与产品矩阵",
        "sourceRel": "14-第 13 章 生态坐标：同源、兼容与产品矩阵.md"
      },
      {
        "title": "第 14 章 实战：排查与第一次安全定制",
        "rel": "15-第_14_章_实战_排查与第一次安全定制",
        "sourceRel": "15-第 14 章 实战：排查与第一次安全定制.md"
      },
      {
        "title": "第 15 章 复用路线：视频课、认证课与图书的切法",
        "rel": "16-第_15_章_复用路线_视频课_认证课与图书的切法",
        "sourceRel": "16-第 15 章 复用路线：视频课、认证课与图书的切法.md"
      },
      {
        "title": "附录 A · ~/.workbuddy 目录速查表",
        "rel": "17-附录_A_.workbuddy_目录速查表",
        "sourceRel": "17-附录 A · ~.workbuddy 目录速查表.md"
      },
      {
        "title": "附录 B · 五步排查卡（打印版）",
        "rel": "18-附录_B_五步排查卡_打印版_",
        "sourceRel": "18-附录 B · 五步排查卡（打印版）.md"
      },
      {
        "title": "附录 C · 术语表",
        "rel": "19-附录_C_术语表",
        "sourceRel": "19-附录 C · 术语表.md"
      },
      {
        "title": "附录 D · 版本快照与取证方法",
        "rel": "20-附录_D_版本快照与取证方法",
        "sourceRel": "20-附录 D · 版本快照与取证方法.md"
      },
      {
        "title": "术语表",
        "rel": "21-术语表",
        "sourceRel": "21-术语表.md"
      },
      {
        "title": "参考资料",
        "rel": "22-参考资料",
        "sourceRel": "22-参考资料.md"
      }
    ]
  },
  {
    "id": "04-work/coze-studio",
    "volume": "04-work",
    "local": "coze-studio",
    "title": "Coze Studio 源码研读",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "coze-dev/coze-studio",
    "site": null,
    "commit": "fefb05ff27be1da939612fbf9faf5db62583b8ae",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/coze-dev/coze-studio",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Coze Studio 源码研读",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "NATS EventBus Integration Guide",
        "rel": "docs",
        "sourceRel": "docs/nats-eventbus-integration-guide-en.md"
      },
      {
        "title": "Coze Studio Frontend",
        "rel": "frontend",
        "sourceRel": "frontend/README.md"
      }
    ]
  },
  {
    "id": "04-work/coze-loop",
    "volume": "04-work",
    "local": "coze-loop",
    "title": "Coze Loop 源码研读",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "coze-dev/coze-loop",
    "site": null,
    "commit": "5f1e4c234fc110c1bf674e882a6fd02109e1e1e6",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/coze-dev/coze-loop",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Coze Loop 源码研读",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AGENTS.md",
        "rel": "docs",
        "sourceRel": "docs/AGENTS.md"
      },
      {
        "title": "🧭 Cozeloop Frontend",
        "rel": "frontend",
        "sourceRel": "frontend/README.md"
      }
    ]
  },
  {
    "id": "04-work/awesome-workbuddy",
    "volume": "04-work",
    "local": "awesome-workbuddy",
    "title": "办公 Agent 生态清单（awesome-workbuddy）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "license": "CC0-1.0",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "staruhub/awesome-workbuddy",
    "site": null,
    "commit": "e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/staruhub/awesome-workbuddy",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "办公 Agent 生态清单（awesome-workbuddy）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Prompt 运行结果生成清单",
        "rel": "delivery",
        "sourceRel": "delivery/PROMPT-RUN-MANIFEST.md"
      },
      {
        "title": "Prompt 运行回放与证据说明",
        "rel": "docs",
        "sourceRel": "docs/prompt-run-provenance.md"
      }
    ]
  },
  {
    "id": "04-work/workbuddy-bench-official",
    "volume": "04-work",
    "local": "workbuddy-bench-official",
    "title": "WorkBuddy Bench（腾讯官方评测集）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "Tencent 自定义许可（声明不适用于欧盟）",
    "licenseLabel": "限非商用",
    "lang": "英文",
    "publishable": true,
    "repo": "Tencent/workbuddy-bench",
    "site": null,
    "commit": "625b2233093ae4f23e76be28c1f341d41cc70373",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Tencent/workbuddy-bench",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "WorkBuddy Bench（腾讯官方评测集）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Configuration system",
        "rel": "configs",
        "sourceRel": "configs/README.md"
      },
      {
        "title": "Datasets",
        "rel": "datasets",
        "sourceRel": "datasets/README.md"
      }
    ]
  },
  {
    "id": "07-coding/fufan-vibe-coding-course",
    "volume": "07-coding",
    "local": "fufan-vibe-coding-course",
    "title": "Vibe Coding：AI 编程实战课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "README 称 MIT，仓库无 LICENSE 文件",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "fufankeji/FuFan-VibeCodingCourse",
    "site": null,
    "commit": "5336ede159a7ac2ce0ee136324fe5bffd56970ca",
    "entry": "README_CN.md",
    "featured": true,
    "sourceUrl": "https://github.com/fufankeji/FuFan-VibeCodingCourse",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "00Introduction: Environment Setup",
        "rel": "00_Introduction",
        "sourceRel": "00_Introduction/README.md"
      },
      {
        "title": "Stage 1: AI Programming Fundamentals",
        "rel": "Stage1_AI_Programming_Fundamentals",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/README.md"
      },
      {
        "title": "Stage 2: Cursor Deep Dive",
        "rel": "Stage2_Cursor_Deep_Dive",
        "sourceRel": "Stage2_Cursor_Deep_Dive/README.md"
      },
      {
        "title": "Stage 3: Claude Code Engineering",
        "rel": "Stage3_Claude_Code_Engineering",
        "sourceRel": "Stage3_Claude_Code_Engineering/README.md"
      },
      {
        "title": "Stage 4: Enterprise Practice",
        "rel": "Stage4_Enterprise_Practice",
        "sourceRel": "Stage4_Enterprise_Practice/README.md"
      },
      {
        "title": "Stage 5: OpenSpec Applied",
        "rel": "Stage5_OpenSpec_Applied",
        "sourceRel": "Stage5_OpenSpec_Applied/README.md"
      },
      {
        "title": "Stage 6: Spec-Kit Applied",
        "rel": "Stage6_SpecKit_Applied",
        "sourceRel": "Stage6_SpecKit_Applied/README.md"
      },
      {
        "title": "Stage 7: Superpowers Applied",
        "rel": "Stage7_Superpowers_Applied",
        "sourceRel": "Stage7_Superpowers_Applied/README.md"
      },
      {
        "title": "Stage 8: AlphaProject Applied",
        "rel": "Stage8_AlphaProject_Applied",
        "sourceRel": "Stage8_AlphaProject_Applied/README.md"
      }
    ]
  },
  {
    "id": "07-coding/cs146s-cn",
    "volume": "07-coding",
    "local": "cs146s-cn",
    "title": "动手学 CS146S 中文版",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "ShouZhengAI/CS146S_CN",
    "site": null,
    "commit": "0d65f36f6673147d6c298670da4f9b4bd7f991fa",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/ShouZhengAI/CS146S_CN",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "CS146S：现代软件开发者——课程作业",
        "rel": "Assignments",
        "sourceRel": "Assignments/README.md"
      }
    ]
  },
  {
    "id": "07-coding/easy-vibe",
    "volume": "07-coding",
    "local": "easy-vibe",
    "title": "Easy-Vibe（Datawhale：从零做出真实产品）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "CC BY-NC-SA 4.0（内容）",
    "licenseLabel": "限非商用",
    "lang": "中英混排",
    "publishable": true,
    "repo": "datawhalechina/easy-vibe",
    "site": null,
    "commit": "130e9b75b28b524e8cc74e615fd9733a4e2b330d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/datawhalechina/easy-vibe",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "算法导论",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-algorithm-thinking",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking.md"
      },
      {
        "title": "编译原理",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-compilers",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/compilers.md"
      },
      {
        "title": "计算机网络：从输入网址到渲染页面",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-computer-networks",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/computer-networks.md"
      },
      {
        "title": "计算机组成原理",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-computer-organization",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/computer-organization.md"
      },
      {
        "title": "数据表示原理：编码、存储与传输",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-data-encoding-storage",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/data-encoding-storage.md"
      },
      {
        "title": "数据结构导论",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-data-structures",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/data-structures.md"
      },
      {
        "title": "操作系统原理：进程、内存与文件系统",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-operating-systems",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/operating-systems.md"
      },
      {
        "title": "计算机系统全景：从开机到访问网站的过程",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-power-on-to-web",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/power-on-to-web.md"
      },
      {
        "title": "编程语言概念：范式、演化与选型",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-programming-languages",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/programming-languages.md"
      },
      {
        "title": "数字电路基础：从晶体管到 CPU",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-transistor-to-cpu",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu.md"
      },
      {
        "title": "类型系统导论",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-type-systems",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/type-systems.md"
      },
      {
        "title": "全栈开发导论：Vibe Coding 时代的计算机知识地图",
        "rel": "docs-zh-cn-appendix-1-computer-fundamentals-vibe-coding-fullstack",
        "sourceRel": "docs/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack.md"
      },
      {
        "title": "命令行与 Shell 脚本导论",
        "rel": "docs-zh-cn-appendix-2-development-tools-command-line-shell",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/command-line-shell.md"
      },
      {
        "title": "调试原理与艺术",
        "rel": "docs-zh-cn-appendix-2-development-tools-debugging-art",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/debugging-art.md"
      },
      {
        "title": "浏览器调试器（DevTools）基础",
        "rel": "docs-zh-cn-appendix-2-development-tools-debugging-art-index",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/debugging-art/index.md"
      },
      {
        "title": "环境变量与 PATH 导论",
        "rel": "docs-zh-cn-appendix-2-development-tools-environment-path",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/environment-path.md"
      },
      {
        "title": "Git 版本控制原理",
        "rel": "docs-zh-cn-appendix-2-development-tools-git-version-control",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/git-version-control.md"
      },
      {
        "title": "包管理器导论",
        "rel": "docs-zh-cn-appendix-2-development-tools-package-managers",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/package-managers.md"
      },
      {
        "title": "端口与 localhost 原理",
        "rel": "docs-zh-cn-appendix-2-development-tools-ports-localhost",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/ports-localhost.md"
      },
      {
        "title": "正则表达式基础",
        "rel": "docs-zh-cn-appendix-2-development-tools-regex",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/regex.md"
      },
      {
        "title": "SSH 与密钥认证导论",
        "rel": "docs-zh-cn-appendix-2-development-tools-ssh-authentication",
        "sourceRel": "docs/zh-cn/appendix/2-development-tools/ssh-authentication.md"
      },
      {
        "title": "网页的隐藏维度：国际化与无障碍全景",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-a11n-i18n",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/a11n-i18n.md"
      },
      {
        "title": "前端工程化全景",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-frontend-engineering",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/frontend-engineering.md"
      },
      {
        "title": "图形与动画基础：Canvas 与他的朋友们",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-graphics-animation",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/graphics-animation.md"
      },
      {
        "title": "JavaScript 原理",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-javascript-deep-dive",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive.md"
      },
      {
        "title": "JavaScript 运行时原理",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-javascript-runtime",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/javascript-runtime.md"
      },
      {
        "title": "实时通信原理：Polling/SSE/WebSocket",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-realtime-communication",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/realtime-communication.md"
      },
      {
        "title": "路由与导航导论",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-routing-navigation",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/routing-navigation.md"
      },
      {
        "title": "TypeScript 原理",
        "rel": "docs-zh-cn-appendix-3-browser-and-frontend-typescript",
        "sourceRel": "docs/zh-cn/appendix/3-browser-and-frontend/typescript.md"
      },
      {
        "title": "API 设计原理：前后端的通信协议",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-api-design",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/api-design.md"
      },
      {
        "title": "API 入门导论：从零理解程序之间的通信",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-api-intro",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/api-intro.md"
      },
      {
        "title": "异步任务队列原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-async-task-queues",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/async-task-queues.md"
      },
      {
        "title": "后端语言导论",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-backend-languages",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
      },
      {
        "title": "后端分层架构原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-backend-layered-architecture",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/backend-layered-architecture.md"
      },
      {
        "title": "后端项目架构导论",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-backend-project-architecture",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/backend-project-architecture.md"
      },
      {
        "title": "缓存原理与策略",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-caching",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/caching.md"
      },
      {
        "title": "客户端语言导论：Swift/Kotlin/Dart",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-client-languages",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/client-languages.md"
      },
      {
        "title": "并发异步与多线程原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-concurrency-async",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/concurrency-async.md"
      },
      {
        "title": "跨平台方案全景",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-cross-platform",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/cross-platform.md"
      },
      {
        "title": "领域特定语言（DSL）原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-domain-specific-languages",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/domain-specific-languages.md"
      },
      {
        "title": "文件与对象存储导论",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-file-storage",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/file-storage.md"
      },
      {
        "title": "HTTP 协议原理：前后端的通信语言",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-http-protocol",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/http-protocol.md"
      },
      {
        "title": "消息队列与事件驱动原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-message-queues",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/message-queues.md"
      },
      {
        "title": "限流与背压原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-rate-limiting-backpressure",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/rate-limiting-backpressure.md"
      },
      {
        "title": "请求旅程全景",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-request-journey",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/request-journey.md"
      },
      {
        "title": "搜索引擎原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-search-engines",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/search-engines.md"
      },
      {
        "title": "序列化原理：数据的翻译",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-serialization",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/serialization.md"
      },
      {
        "title": "Web 框架原理",
        "rel": "docs-zh-cn-appendix-4-server-and-backend-web-frameworks",
        "sourceRel": "docs/zh-cn/appendix/4-server-and-backend/web-frameworks.md"
      },
      {
        "title": "A/B 测试原理：用数据做决策",
        "rel": "docs-zh-cn-appendix-5-data-ab-testing",
        "sourceRel": "docs/zh-cn/appendix/5-data/ab-testing.md"
      },
      {
        "title": "数据分析原理",
        "rel": "docs-zh-cn-appendix-5-data-data-analysis",
        "sourceRel": "docs/zh-cn/appendix/5-data/data-analysis.md"
      },
      {
        "title": "数据治理导论",
        "rel": "docs-zh-cn-appendix-5-data-data-governance",
        "sourceRel": "docs/zh-cn/appendix/5-data/data-governance.md"
      },
      {
        "title": "数据模型全景：文档/图/时序/向量",
        "rel": "docs-zh-cn-appendix-5-data-data-models",
        "sourceRel": "docs/zh-cn/appendix/5-data/data-models.md"
      },
      {
        "title": "数据埋点导论",
        "rel": "docs-zh-cn-appendix-5-data-data-tracking",
        "sourceRel": "docs/zh-cn/appendix/5-data/data-tracking.md"
      },
      {
        "title": "数据可视化原理",
        "rel": "docs-zh-cn-appendix-5-data-data-visualization",
        "sourceRel": "docs/zh-cn/appendix/5-data/data-visualization.md"
      },
      {
        "title": "数据库原理：索引/事务/查询优化",
        "rel": "docs-zh-cn-appendix-5-data-database-fundamentals",
        "sourceRel": "docs/zh-cn/appendix/5-data/database-fundamentals.md"
      },
      {
        "title": "分布式系统原理",
        "rel": "docs-zh-cn-appendix-6-architecture-and-system-design-distributed-systems",
        "sourceRel": "docs/zh-cn/appendix/6-architecture-and-system-design/distributed-systems.md"
      },
      {
        "title": "高可用与容灾原理",
        "rel": "docs-zh-cn-appendix-6-architecture-and-system-design-high-availability",
        "sourceRel": "docs/zh-cn/appendix/6-architecture-and-system-design/high-availability.md"
      },
      {
        "title": "单体到微服务演进导论",
        "rel": "docs-zh-cn-appendix-6-architecture-and-system-design-monolith-to-microservices",
        "sourceRel": "docs/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices.md"
      },
      {
        "title": "系统设计方法论",
        "rel": "docs-zh-cn-appendix-6-architecture-and-system-design-system-design-methodology",
        "sourceRel": "docs/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology.md"
      },
      {
        "title": "CI/CD 自动化导论",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-ci-cd",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/ci-cd.md"
      },
      {
        "title": "云身份与权限管理原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-cloud-iam",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-iam.md"
      },
      {
        "title": "云平台实战基础",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-cloud-platforms",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-platforms.md"
      },
      {
        "title": "对象存储与 CDN 原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-cloud-storage-cdn",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
      },
      {
        "title": "域名 DNS 与 HTTPS 原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-dns-https",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/dns-https.md"
      },
      {
        "title": "Docker 容器化导论",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-docker-containers",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/docker-containers.md"
      },
      {
        "title": "网关与反向代理原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-gateway-proxy",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/gateway-proxy.md"
      },
      {
        "title": "故障排查与应急响应导论",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-incident-response",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/incident-response.md"
      },
      {
        "title": "基础设施即代码原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-infrastructure-as-code",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/infrastructure-as-code.md"
      },
      {
        "title": "Kubernetes 编排原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-kubernetes",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/kubernetes.md"
      },
      {
        "title": "Linux 基础",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-linux-basics",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/linux-basics.md"
      },
      {
        "title": "负载均衡与网关原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-load-balancing-gateway",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/load-balancing-gateway.md"
      },
      {
        "title": "监控日志与告警原理",
        "rel": "docs-zh-cn-appendix-7-infrastructure-and-operations-monitoring-logging",
        "sourceRel": "docs/zh-cn/appendix/7-infrastructure-and-operations/monitoring-logging.md"
      },
      {
        "title": "AI Agent 原理与工具调用",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-ai-agents",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/ai-agents.md"
      },
      {
        "title": "AI 能力词典",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-ai-capability-dictionary",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/ai-capability-dictionary.md"
      },
      {
        "title": "AI 简史：从符号逻辑到千亿参数大模型",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-ai-history",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/ai-history.md"
      },
      {
        "title": "AI 原生应用设计导论",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-ai-native-app-design",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/ai-native-app-design.md"
      },
      {
        "title": "AI Agent 协议原理：MCP 与 A2A",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-ai-protocols",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/ai-protocols.md"
      },
      {
        "title": "上下文工程导论",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-context-engineering",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/context-engineering.md"
      },
      {
        "title": "Embedding 与向量检索原理",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-embedding-vector-retrieval",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/embedding-vector-retrieval.md"
      },
      {
        "title": "图像生成原理",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-image-generation",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/image-generation.md"
      },
      {
        "title": "大语言模型工作原理",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-llm-principles",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/llm-principles.md"
      },
      {
        "title": "模型微调与部署导论",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-model-finetuning-deployment",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/model-finetuning-deployment.md"
      },
      {
        "title": "多模态模型原理：视觉/音频/视频",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-multimodal-models",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/multimodal-models.md"
      },
      {
        "title": "神经网络与深度学习基础",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-neural-networks",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/neural-networks.md"
      },
      {
        "title": "提示词工程导论",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-prompt-engineering",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/prompt-engineering.md"
      },
      {
        "title": "RAG 原理：检索增强生成",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-rag",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/rag.md"
      },
      {
        "title": "语音合成与识别原理",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-speech-synthesis-recognition",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/speech-synthesis-recognition.md"
      },
      {
        "title": "Transformer 与注意力机制原理",
        "rel": "docs-zh-cn-appendix-8-artificial-intelligence-transformer-attention",
        "sourceRel": "docs/zh-cn/appendix/8-artificial-intelligence/transformer-attention.md"
      },
      {
        "title": "代码质量与重构导论",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-code-quality-refactoring",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring.md"
      },
      {
        "title": "设计模式基础",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-design-patterns",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/design-patterns.md"
      },
      {
        "title": "开源协作导论",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-open-source-collaboration",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/open-source-collaboration.md"
      },
      {
        "title": "安全思维与攻防基础",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-security-thinking",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/security-thinking.md"
      },
      {
        "title": "技术文档写作导论",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-technical-writing",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/technical-writing.md"
      },
      {
        "title": "技术选型方法论",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-technology-selection",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/technology-selection.md"
      },
      {
        "title": "测试策略导论",
        "rel": "docs-zh-cn-appendix-9-engineering-excellence-testing-strategies",
        "sourceRel": "docs/zh-cn/appendix/9-engineering-excellence/testing-strategies.md"
      },
      {
        "title": "附录",
        "rel": "docs-zh-cn-appendix-index",
        "sourceRel": "docs/zh-cn/appendix/index.md"
      },
      {
        "title": "项目介绍",
        "rel": "docs-zh-cn-guide-introduction",
        "sourceRel": "docs/zh-cn/guide/introduction.md"
      },
      {
        "title": "产品思维基础",
        "rel": "docs-zh-cn-stage-1-appendix-a-product-thinking-index",
        "sourceRel": "docs/zh-cn/stage-1/appendix-a-product-thinking/index.md"
      },
      {
        "title": "七款 AI 编程工具对比",
        "rel": "docs-zh-cn-stage-1-appendix-articles-example0-1-vibe-coding-tools-snake-game-tutorial",
        "sourceRel": "docs/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial.md"
      },
      {
        "title": "用设计和编程 Agent 设计网站",
        "rel": "docs-zh-cn-stage-1-appendix-articles-example0-2-vibe-coding-tools-build-website-with-ai-coding-and-design-agents",
        "sourceRel": "docs/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents.md"
      },
      {
        "title": "常见问题与排错",
        "rel": "docs-zh-cn-stage-1-appendix-b-common-errors-index",
        "sourceRel": "docs/zh-cn/stage-1/appendix-b-common-errors/index.md"
      },
      {
        "title": "C 端场景灵感方向参考",
        "rel": "docs-zh-cn-stage-1-appendix-consumer-scenarios-index",
        "sourceRel": "docs/zh-cn/stage-1/appendix-consumer-scenarios/index.md"
      },
      {
        "title": "创意灵感从哪里来",
        "rel": "docs-zh-cn-stage-1-appendix-idea-sources-index",
        "sourceRel": "docs/zh-cn/stage-1/appendix-idea-sources/index.md"
      },
      {
        "title": "在魔搭社区发布你的 Vibe Coding 产物",
        "rel": "docs-zh-cn-stage-1-appendix-modelscope-static-site-index",
        "sourceRel": "docs/zh-cn/stage-1/appendix-modelscope-static-site/index.md"
      },
      {
        "title": "构建可交互的产品原型",
        "rel": "docs-zh-cn-stage-1-building-prototype-index",
        "sourceRel": "docs/zh-cn/stage-1/building-prototype/index.md"
      },
      {
        "title": "从截图复刻：第一次模仿练习",
        "rel": "docs-zh-cn-stage-1-clone-your-favorite-app-index",
        "sourceRel": "docs/zh-cn/stage-1/clone-your-favorite-app/index.md"
      },
      {
        "title": "完整项目实战：从想法到作品",
        "rel": "docs-zh-cn-stage-1-complete-project-practice-index",
        "sourceRel": "docs/zh-cn/stage-1/complete-project-practice/index.md"
      },
      {
        "title": "如何判断一个好点子",
        "rel": "docs-zh-cn-stage-1-finding-great-idea-index",
        "sourceRel": "docs/zh-cn/stage-1/finding-great-idea/index.md"
      },
      {
        "title": "为原型接入 AI 能力",
        "rel": "docs-zh-cn-stage-1-integrating-ai-capabilities-index",
        "sourceRel": "docs/zh-cn/stage-1/integrating-ai-capabilities/index.md"
      },
      {
        "title": "Dify 入门与知识库集成",
        "rel": "docs-zh-cn-stage-2-ai-capabilities-dify-knowledge-base-index",
        "sourceRel": "docs/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/index.md"
      },
      {
        "title": "AI 营销文案 SaaS 开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-copywriting-platform-supabase-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/copywriting-platform-supabase/index.md"
      },
      {
        "title": "PRD：AI 营销文案 SaaS 平台",
        "rel": "docs-zh-cn-stage-2-assignments-copywriting-platform-supabase-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/copywriting-platform-supabase/PRD.md"
      },
      {
        "title": "类 Dify 智能体平台开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-custom-dify-agent-platform-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/custom-dify-agent-platform/index.md"
      },
      {
        "title": "PRD：类 Dify 智能体编排平台",
        "rel": "docs-zh-cn-stage-2-assignments-custom-dify-agent-platform-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/custom-dify-agent-platform/PRD.md"
      },
      {
        "title": "在线考试与管理系统开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-exam-management-express-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/exam-management-express/index.md"
      },
      {
        "title": "PRD：在线考试与管理系统",
        "rel": "docs-zh-cn-stage-2-assignments-exam-management-express-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/exam-management-express/PRD.md"
      },
      {
        "title": "现代 AI 生图 SaaS 开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-modern-landing-page-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/modern-landing-page/index.md"
      },
      {
        "title": "PRD：现代 AI 生图 SaaS 平台",
        "rel": "docs-zh-cn-stage-2-assignments-modern-landing-page-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/modern-landing-page/PRD.md"
      },
      {
        "title": "Spring Boot 电影推荐系统开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-movie-recommendation-springboot-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/movie-recommendation-springboot/index.md"
      },
      {
        "title": "PRD：Spring Boot 电影推荐系统",
        "rel": "docs-zh-cn-stage-2-assignments-movie-recommendation-springboot-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/movie-recommendation-springboot/PRD.md"
      },
      {
        "title": "生鲜电商微服务系统开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-simple-grocery-microservices-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/simple-grocery-microservices/index.md"
      },
      {
        "title": "PRD：生鲜电商微服务系统",
        "rel": "docs-zh-cn-stage-2-assignments-simple-grocery-microservices-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/simple-grocery-microservices/PRD.md"
      },
      {
        "title": "Go 交通数据分析平台开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-traffic-data-visualization-go-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/traffic-data-visualization-go/index.md"
      },
      {
        "title": "PRD：Go 交通数据分析与可视化平台",
        "rel": "docs-zh-cn-stage-2-assignments-traffic-data-visualization-go-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/traffic-data-visualization-go/PRD.md"
      },
      {
        "title": "智能旅游规划 Agent 平台开发实战",
        "rel": "docs-zh-cn-stage-2-assignments-travel-planning-agent-platform-index",
        "sourceRel": "docs/zh-cn/stage-2/assignments/travel-planning-agent-platform/index.md"
      },
      {
        "title": "PRD：智能旅游规划 Agent 编排平台",
        "rel": "docs-zh-cn-stage-2-assignments-travel-planning-agent-platform-PRD",
        "sourceRel": "docs/zh-cn/stage-2/assignments/travel-planning-agent-platform/PRD.md"
      },
      {
        "title": "大模型辅助编写接口代码与接口文档",
        "rel": "docs-zh-cn-stage-2-backend-ai-interface-code-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/ai-interface-code/index.md"
      },
      {
        "title": "把网站发到网上（进阶方式）：自己买台 VPS 服务器搭建发布",
        "rel": "docs-zh-cn-stage-2-backend-cloud-server-deployment-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/cloud-server-deployment/index.md"
      },
      {
        "title": "从数据库到 Supabase",
        "rel": "docs-zh-cn-stage-2-backend-database-supabase-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/database-supabase/index.md"
      },
      {
        "title": "Git 和 GitHub 工作流",
        "rel": "docs-zh-cn-stage-2-backend-git-workflow-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/git-workflow/index.md"
      },
      {
        "title": "CLI AI 编程工具",
        "rel": "docs-zh-cn-stage-2-backend-modern-cli-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/modern-cli/index.md"
      },
      {
        "title": "如何集成 Stripe 等收费系统",
        "rel": "docs-zh-cn-stage-2-backend-stripe-payment-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/stripe-payment/index.md"
      },
      {
        "title": "把网站发到网上（简单方式）：Vercel/Zeabur/CloudBase 一键发布",
        "rel": "docs-zh-cn-stage-2-backend-zeabur-deployment-index",
        "sourceRel": "docs/zh-cn/stage-2/backend/zeabur-deployment/index.md"
      },
      {
        "title": "从设计原型到项目代码",
        "rel": "docs-zh-cn-stage-2-frontend-design-to-code-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/design-to-code/index.md"
      },
      {
        "title": "Project 4: 一起做霍格沃茨画像",
        "rel": "docs-zh-cn-stage-2-frontend-hogwarts-portraits-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/hogwarts-portraits/index.md"
      },
      {
        "title": "用 LLM 和 Skills 让界面变好看：提示词与插件实战",
        "rel": "docs-zh-cn-stage-2-frontend-llm-skills-beautiful-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/llm-skills-beautiful/index.md"
      },
      {
        "title": "从 NanoBanana 出发，搭建自己的素材生产Agent",
        "rel": "docs-zh-cn-stage-2-frontend-lovart-assets-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/lovart-assets/index.md"
      },
      {
        "title": "使用现代组件库更新你的界面",
        "rel": "docs-zh-cn-stage-2-frontend-modern-component-library-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/modern-component-library/index.md"
      },
      {
        "title": "参考 UI 设计规范设计页面和按钮",
        "rel": "docs-zh-cn-stage-2-frontend-multi-product-ui-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/multi-product-ui/index.md"
      },
      {
        "title": "构建第一个现代应用程序 - UI 设计",
        "rel": "docs-zh-cn-stage-2-frontend-ui-design-index",
        "sourceRel": "docs/zh-cn/stage-2/frontend/ui-design/index.md"
      },
      {
        "title": "初中级开发",
        "rel": "docs-zh-cn-stage-2-index",
        "sourceRel": "docs/zh-cn/stage-2/index.md"
      },
      {
        "title": "企业级客服 Agent 实战：用 LangGraph 搭建可升级、可审计的客服系统",
        "rel": "docs-zh-cn-stage-3-ai-advanced-langgraph-advanced-rag-index",
        "sourceRel": "docs/zh-cn/stage-3/ai-advanced/langgraph-advanced-rag/index.md"
      },
      {
        "title": "企业级知识库实战：用 LlamaIndex 搭建能落地的 RAG 系统",
        "rel": "docs-zh-cn-stage-3-ai-advanced-llamaindex-enterprise-knowledge-base-index",
        "sourceRel": "docs/zh-cn/stage-3/ai-advanced/llamaindex-enterprise-knowledge-base/index.md"
      },
      {
        "title": "本节课你将学到",
        "rel": "docs-zh-cn-stage-3-ai-advanced-rag-introduction-index",
        "sourceRel": "docs/zh-cn/stage-3/ai-advanced/rag-introduction/index.md"
      },
      {
        "title": "Claude Agent Teams 完全指南",
        "rel": "docs-zh-cn-stage-3-core-skills-agent-teams-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
      },
      {
        "title": "Claude Code 快速上手核心指南",
        "rel": "docs-zh-cn-stage-3-core-skills-basics-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/basics/index.md"
      },
      {
        "title": "Claude Agent SDK 完全指南",
        "rel": "docs-zh-cn-stage-3-core-skills-claude-agent-sdk-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/claude-agent-sdk/index.md"
      },
      {
        "title": "用 GitHub Issues 驱动 AI 全流程开发：从需求讨论到 macOS 成品",
        "rel": "docs-zh-cn-stage-3-core-skills-github-iterative-development-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/github-iterative-development/index.md"
      },
      {
        "title": "如何让 Claude Code 长时间工作",
        "rel": "docs-zh-cn-stage-3-core-skills-long-running-tasks-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/long-running-tasks/index.md"
      },
      {
        "title": "Claude Code MCP 完全指南",
        "rel": "docs-zh-cn-stage-3-core-skills-mcp-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/mcp/index.md"
      },
      {
        "title": "Claude Code 手机远程开发",
        "rel": "docs-zh-cn-stage-3-core-skills-mobile-development-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/mobile-development/index.md"
      },
      {
        "title": "Claude Code Skills 完全指南",
        "rel": "docs-zh-cn-stage-3-core-skills-skills-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/skills/index.md"
      },
      {
        "title": "从 Vibe Coding 到 Spec Coding：先把需求写清楚，再让 AI 写代码",
        "rel": "docs-zh-cn-stage-3-core-skills-spec-coding-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/spec-coding/index.md"
      },
      {
        "title": "Claude Code Superpowers 工程级开发",
        "rel": "docs-zh-cn-stage-3-core-skills-superpowers-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/superpowers/index.md"
      },
      {
        "title": "AI 辅助开发工作流",
        "rel": "docs-zh-cn-stage-3-core-skills-workflow-index",
        "sourceRel": "docs/zh-cn/stage-3/core-skills/workflow/index.md"
      },
      {
        "title": "如何用 Jetpack Compose 开发 Android 原生应用",
        "rel": "docs-zh-cn-stage-3-cross-platform-android-app-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/android-app/index.md"
      },
      {
        "title": "如何把开发好的程序发布上架",
        "rel": "docs-zh-cn-stage-3-cross-platform-app-publishing-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/app-publishing/index.md"
      },
      {
        "title": "如何开发浏览器 AI 助手插件",
        "rel": "docs-zh-cn-stage-3-cross-platform-browser-ai-extension-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/browser-ai-extension/index.md"
      },
      {
        "title": "如何选择你的应用该开发的平台",
        "rel": "docs-zh-cn-stage-3-cross-platform-choose-platform-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/choose-platform/index.md"
      },
      {
        "title": "如何开发跨平台 Electron 桌面程序",
        "rel": "docs-zh-cn-stage-3-cross-platform-electron-voice-to-text-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/electron-voice-to-text/index.md"
      },
      {
        "title": "如何开发 Flutter 跨平台应用",
        "rel": "docs-zh-cn-stage-3-cross-platform-flutter-app-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/flutter-app/index.md"
      },
      {
        "title": "如何用 Godot 开发横版、像素与 3D 游戏",
        "rel": "docs-zh-cn-stage-3-cross-platform-godot-game-development-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/godot-game-development/index.md"
      },
      {
        "title": "如何用 SwiftUI 开发 iOS 原生应用",
        "rel": "docs-zh-cn-stage-3-cross-platform-ios-app-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/ios-app/index.md"
      },
      {
        "title": "如何在本地模拟链铸造 NFT",
        "rel": "docs-zh-cn-stage-3-cross-platform-nft-minting-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/nft-minting/index.md"
      },
      {
        "title": "如何开发 PWA 本地应用",
        "rel": "docs-zh-cn-stage-3-cross-platform-pwa-local-app-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/pwa-local-app/index.md"
      },
      {
        "title": "如何开发企业 Qt 设备客户端",
        "rel": "docs-zh-cn-stage-3-cross-platform-qt-industrial-hmi-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/qt-industrial-hmi/index.md"
      },
      {
        "title": "从零开始用 React Native + Expo 做一个门店巡检应用",
        "rel": "docs-zh-cn-stage-3-cross-platform-react-native-expo-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/react-native-expo/index.md"
      },
      {
        "title": "如何开发 VS Code 插件",
        "rel": "docs-zh-cn-stage-3-cross-platform-vscode-extension-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/vscode-extension/index.md"
      },
      {
        "title": "如何构建微信小程序（包含后端）",
        "rel": "docs-zh-cn-stage-3-cross-platform-wechat-miniprogram-backend-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/index.md"
      },
      {
        "title": "如何构建微信小程序",
        "rel": "docs-zh-cn-stage-3-cross-platform-wechat-miniprogram-index",
        "sourceRel": "docs/zh-cn/stage-3/cross-platform/wechat-miniprogram/index.md"
      },
      {
        "title": "进阶开发",
        "rel": "docs-zh-cn-stage-3-index",
        "sourceRel": "docs/zh-cn/stage-3/index.md"
      },
      {
        "title": "如何构建属于自己的个人网页与学术博客",
        "rel": "docs-zh-cn-stage-3-personal-brand-personal-website-blog-index",
        "sourceRel": "docs/zh-cn/stage-3/personal-brand/personal-website-blog/index.md"
      },
      {
        "title": "放弃月入过万，他在农村小学带孩子们“用AI赶苍蝇”",
        "rel": "docs-zh-cn-vibe-stories-story-1",
        "sourceRel": "docs/zh-cn/vibe-stories/story-1.md"
      },
      {
        "title": "期末考试周，我偷偷用AI造了个“校园闲鱼”",
        "rel": "docs-zh-cn-vibe-stories-story-2",
        "sourceRel": "docs/zh-cn/vibe-stories/story-2.md"
      },
      {
        "title": "我给每个学生，做了一个不会累的“学霸同桌”",
        "rel": "docs-zh-cn-vibe-stories-story-3",
        "sourceRel": "docs/zh-cn/vibe-stories/story-3.md"
      },
      {
        "title": "48岁货车司机，熬了几个通宵，硬是用AI磕出一个出海工具站",
        "rel": "docs-zh-cn-vibe-stories-story-4",
        "sourceRel": "docs/zh-cn/vibe-stories/story-4.md"
      }
    ]
  },
  {
    "id": "07-coding/vibe-coding-cn",
    "volume": "07-coding",
    "local": "vibe-coding-cn",
    "title": "Vibe Coding CN",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "2025Emma/vibe-coding-cn",
    "site": null,
    "commit": "9b42dd10ddf3fff58f8c7a4d347175db107d7bf9",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/2025Emma/vibe-coding-cn",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Vibe Coding 指南",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "📘 项目上下文文档生成 · 工程化 Prompt（专业优化版）",
        "rel": "i18n-zh-prompts-coding_prompts-_1_1______项目上下文文档生成___工程化_Prompt_专业优化版_",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(1,1)_#_📘_项目上下文文档生成_·_工程化_Prompt（专业优化版）.md"
      },
      {
        "title": "ultrathink ultrathink ultrathink ultrathink ultrathink ultrathink ultrathink",
        "rel": "i18n-zh-prompts-coding_prompts-_2_1____ultrathink_ultrathink_ultrathink_ultrathink_ultrathink",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(2,1)_#_ultrathink_ultrathink_ultrathink_ultrathink_ultrathink.md"
      },
      {
        "title": "流程标准化",
        "rel": "i18n-zh-prompts-coding_prompts-_3_1____流程标准化",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(3,1)_#_流程标准化.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_4_1__ultrathink__Take_a_deep_breath.",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(4,1)_ultrathink__Take_a_deep_breath..md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_5_1___content____智能需求理解与研发导航引擎_Meta_R_D_Navigator__",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(5,1)_{content#_🚀_智能需求理解与研发导航引擎（Meta_R&D_Navigator_·.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_6_1___System_Prompt____系统提示词_AI_Prompt_编程语言约束与持久化记忆规范nn_",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(6,1)_{System_Prompt#_🧠_系统提示词：AI_Prompt_编程语言约束与持久化记忆规范nn##.md"
      },
      {
        "title": "AI生成代码文档 - 通用提示词模板",
        "rel": "i18n-zh-prompts-coding_prompts-_7_1____AI生成代码文档_-_通用提示词模板",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(7,1)_#_AI生成代码文档_-_通用提示词模板.md"
      },
      {
        "title": "执行📘 文件头注释规范（用于所有代码文件最上方）",
        "rel": "i18n-zh-prompts-coding_prompts-_8_1____执行__文件头注释规范_用于所有代码文件最上方_",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(8,1)_#_执行📘_文件头注释规范（用于所有代码文件最上方）.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_9_1___角色与目标_你首席软件架构师__Principal_Software_Architect_高性能_可维护_健壮_DD",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(9,1)_{角色与目标{你首席软件架构师_(Principal_Software_Architect)（高性能、可维护、健壮、DD.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_10_1___任务你是首席软件架构师__Principal_Software_Architect_专注于构建_高性能__可维护",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(10,1)_{任务你是首席软件架构师_(Principal_Software_Architect)，专注于构建[高性能__可维护.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_11_1___任务你是一名资深系统架构师与AI协同设计顾问_nn目标_当用户启动一个新项目或请求AI帮助开发功能时_你必须优先帮助用",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(11,1)_{任务你是一名资深系统架构师与AI协同设计顾问。nn目标：当用户启动一个新项目或请求AI帮助开发功能时，你必须优先帮助用.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_12_2___任务帮我进行智能任务描述_分析与补全任务_你需要理解_描述我当前正在进行的任务_自动识别缺少的要素_未完善的部分_可能",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(12,2)_{任务帮我进行智能任务描述，分析与补全任务，你需要理解、描述我当前正在进行的任务，自动识别缺少的要素、未完善的部分、可能.md"
      },
      {
        "title": "提示工程师任务说明",
        "rel": "i18n-zh-prompts-coding_prompts-_13_1____提示工程师任务说明",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(13,1)_#_提示工程师任务说明.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_14_2___",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(14,2)_############################################################.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_15_1____Claude_Code_八荣八耻",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(15,1)_###_Claude_Code_八荣八耻.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_16_3____CLAUDE_记忆",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(16,3)_#_CLAUDE_记忆.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_17_2____软件工程分析",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(17,2)_#_软件工程分析.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_18_2____通用项目架构综合分析与优化框架",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(18,2)_#_通用项目架构综合分析与优化框架.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_19_1____角色定义",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(19,1)_##_角色定义.md"
      },
      {
        "title": "高质量代码开发专家",
        "rel": "i18n-zh-prompts-coding_prompts-_20_1____高质量代码开发专家",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(20,1)_#_高质量代码开发专家.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-_21_1__你是我的顶级编程助手_我将使用自然语言描述开发需求_请你将其转换为一个结构化_专业_详细_可执行的编程任务说明文档_输出",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(21,1)_你是我的顶级编程助手，我将使用自然语言描述开发需求。请你将其转换为一个结构化、专业、详细、可执行的编程任务说明文档，输出.md"
      },
      {
        "title": "Role：首席软件架构师（Principle-Driven Architect）",
        "rel": "i18n-zh-prompts-coding_prompts-_22_5__前几天_我被_Claude_那些臃肿_过度设计的解决方案搞得很沮丧_里面有一大堆我不需要的_万一_功能_然后我尝试在我的",
        "sourceRel": "i18n/zh/prompts/coding_prompts/(22,5)_前几天，我被_Claude_那些臃肿、过度设计的解决方案搞得很沮丧，里面有一大堆我不需要的“万一”功能。然后我尝试在我的.md"
      },
      {
        "title": "流程标准化",
        "rel": "i18n-zh-prompts-coding_prompts-标准化流程",
        "sourceRel": "i18n/zh/prompts/coding_prompts/标准化流程.md"
      },
      {
        "title": "🧠 AI 文件与代码生成规范",
        "rel": "i18n-zh-prompts-coding_prompts-标准项目目录结构",
        "sourceRel": "i18n/zh/prompts/coding_prompts/标准项目目录结构.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-分析1",
        "sourceRel": "i18n/zh/prompts/coding_prompts/分析1.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-分析2",
        "sourceRel": "i18n/zh/prompts/coding_prompts/分析2.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-简易提示词优化器",
        "sourceRel": "i18n/zh/prompts/coding_prompts/简易提示词优化器.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-胶水开发",
        "sourceRel": "i18n/zh/prompts/coding_prompts/胶水开发.md"
      },
      {
        "title": "精华技术文档生成提示词",
        "rel": "i18n-zh-prompts-coding_prompts-精华技术文档生成提示词",
        "sourceRel": "i18n/zh/prompts/coding_prompts/精华技术文档生成提示词.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-客观分析",
        "sourceRel": "i18n/zh/prompts/coding_prompts/客观分析.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-前端设计",
        "sourceRel": "i18n/zh/prompts/coding_prompts/前端设计.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-人机对齐",
        "sourceRel": "i18n/zh/prompts/coding_prompts/人机对齐.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-任务描述_分析与补全任务",
        "sourceRel": "i18n/zh/prompts/coding_prompts/任务描述，分析与补全任务.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-输入简单的日常行为的研究报告摘要",
        "sourceRel": "i18n/zh/prompts/coding_prompts/输入简单的日常行为的研究报告摘要.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-系统架构",
        "sourceRel": "i18n/zh/prompts/coding_prompts/系统架构.md"
      },
      {
        "title": "vibe coding 至尊超级终极无敌指南 V114514",
        "rel": "i18n-zh-prompts-coding_prompts-系统架构可视化生成Mermaid",
        "sourceRel": "i18n/zh/prompts/coding_prompts/系统架构可视化生成Mermaid.md"
      },
      {
        "title": "📘 项目上下文文档生成 · 工程化 Prompt（专业优化版）",
        "rel": "i18n-zh-prompts-coding_prompts-项目上下文文档生成",
        "sourceRel": "i18n/zh/prompts/coding_prompts/项目上下文文档生成.md"
      },
      {
        "title": "🔍 执行纯净性检测（Execution Purity Verification Prompt）",
        "rel": "i18n-zh-prompts-coding_prompts-执行纯净性检测",
        "sourceRel": "i18n/zh/prompts/coding_prompts/执行纯净性检测.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-智能需求理解与研发导航引擎",
        "sourceRel": "i18n/zh/prompts/coding_prompts/智能需求理解与研发导航引擎.md"
      },
      {
        "title": "Vibe Coding CN",
        "rel": "i18n-zh-prompts-coding_prompts-docs文件夹中文命名提示词",
        "sourceRel": "i18n/zh/prompts/coding_prompts/docs文件夹中文命名提示词.md"
      },
      {
        "title": "📂 提示词分类 - 软件工程，vibe coding用提示词（基于Excel原始数据)",
        "rel": "i18n-zh-prompts-coding_prompts-index",
        "sourceRel": "i18n/zh/prompts/coding_prompts/index.md"
      },
      {
        "title": "AI 项目计划生成系统",
        "rel": "i18n-zh-prompts-coding_prompts-plan提示词",
        "sourceRel": "i18n/zh/prompts/coding_prompts/plan提示词.md"
      },
      {
        "title": "生产级 Shell 控制面板生成规格说明",
        "rel": "i18n-zh-prompts-coding_prompts-sh控制面板生成",
        "sourceRel": "i18n/zh/prompts/coding_prompts/sh控制面板生成.md"
      }
    ]
  },
  {
    "id": "07-coding/vibe-vibe",
    "volume": "07-coding",
    "local": "vibe-vibe",
    "title": "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "license": "CC BY-NC-SA 4.0",
    "licenseLabel": "限非商用",
    "lang": "中文",
    "publishable": true,
    "repo": "datawhalechina/vibe-vibe",
    "site": null,
    "commit": "f2e121d9b6c689c0e682921df60d73e279c5e316",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/datawhalechina/vibe-vibe",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "1.0 快速开始",
        "rel": "docs-Advanced-01-environment-setup-00-quick-start",
        "sourceRel": "docs/Advanced/01-environment-setup/00-quick-start.md"
      },
      {
        "title": "1.2 技术栈概念",
        "rel": "docs-Advanced-01-environment-setup-02-tech-stack",
        "sourceRel": "docs/Advanced/01-environment-setup/02-tech-stack.md"
      },
      {
        "title": "1.3 浏览器与服务器基础",
        "rel": "docs-Advanced-01-environment-setup-03-browser-server",
        "sourceRel": "docs/Advanced/01-environment-setup/03-browser-server.md"
      },
      {
        "title": "1.4 Terminal 终端入门",
        "rel": "docs-Advanced-01-environment-setup-04-terminal-basics",
        "sourceRel": "docs/Advanced/01-environment-setup/04-terminal-basics.md"
      },
      {
        "title": "1.5 包管理与项目配置",
        "rel": "docs-Advanced-01-environment-setup-05-package-manager-and-config",
        "sourceRel": "docs/Advanced/01-environment-setup/05-package-manager-and-config.md"
      },
      {
        "title": "1.6 模型与工具",
        "rel": "docs-Advanced-01-environment-setup-06-models-and-tools",
        "sourceRel": "docs/Advanced/01-environment-setup/06-models-and-tools.md"
      },
      {
        "title": "1.7 创建项目",
        "rel": "docs-Advanced-01-environment-setup-07-creating-project",
        "sourceRel": "docs/Advanced/01-environment-setup/07-creating-project.md"
      },
      {
        "title": "1.8 Localhost 与端口",
        "rel": "docs-Advanced-01-environment-setup-08-localhost-and-ports",
        "sourceRel": "docs/Advanced/01-environment-setup/08-localhost-and-ports.md"
      },
      {
        "title": "第一章：环境搭建与代码运行基础",
        "rel": "docs-Advanced-01-environment-setup-index",
        "sourceRel": "docs/Advanced/01-environment-setup/index.md"
      },
      {
        "title": "2.0 推荐配置",
        "rel": "docs-Advanced-02-ai-tuning-guide-00-recommended-config",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/00-recommended-config.md"
      },
      {
        "title": "2.1 AI 编程的经济学 🔴",
        "rel": "docs-Advanced-02-ai-tuning-guide-01-ai-economics",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/01-ai-economics.md"
      },
      {
        "title": "2.2 VibeCoding 工作流",
        "rel": "docs-Advanced-02-ai-tuning-guide-02-vibecoding-workflow",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/02-vibecoding-workflow.md"
      },
      {
        "title": "2.3 MCP、插件与 Skills 🟡",
        "rel": "docs-Advanced-02-ai-tuning-guide-03-mcp-and-skills",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/03-mcp-and-skills.md"
      },
      {
        "title": "2.4 项目规则配置 🟡",
        "rel": "docs-Advanced-02-ai-tuning-guide-04-project-config",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/04-project-config.md"
      },
      {
        "title": "2.5 高效调试心法 🟢",
        "rel": "docs-Advanced-02-ai-tuning-guide-05-debugging-tips",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/05-debugging-tips.md"
      },
      {
        "title": "第二章：AI 使用说明书",
        "rel": "docs-Advanced-02-ai-tuning-guide-index",
        "sourceRel": "docs/Advanced/02-ai-tuning-guide/index.md"
      },
      {
        "title": "3.0 PRD 模板",
        "rel": "docs-Advanced-03-prd-doc-driven-00-prd-template",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/00-prd-template.md"
      },
      {
        "title": "3.1 想法验证实战 🔴",
        "rel": "docs-Advanced-03-prd-doc-driven-01-product-validation",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/01-product-validation.md"
      },
      {
        "title": "3.2 与 AI 确认需求 🔴",
        "rel": "docs-Advanced-03-prd-doc-driven-02-discuss-with-ai",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/02-discuss-with-ai.md"
      },
      {
        "title": "3.3 PRD 编写实战 🔴",
        "rel": "docs-Advanced-03-prd-doc-driven-03-prd-template-guide",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/03-prd-template-guide.md"
      },
      {
        "title": "3.4 从 PRD 到代码 🟡",
        "rel": "docs-Advanced-03-prd-doc-driven-04-coding-agents",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/04-coding-agents.md"
      },
      {
        "title": "第三章：产品思维与文档驱动",
        "rel": "docs-Advanced-03-prd-doc-driven-index",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/index.md"
      },
      {
        "title": "4.0 代码运行的三种状态 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-00-build-basics",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/00-build-basics.md"
      },
      {
        "title": "4.1 技术栈决策框架 🟡",
        "rel": "docs-Advanced-04-dev-fundamentals-01-tech-stack-decision",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/01-tech-stack-decision.md"
      },
      {
        "title": "4.2 从 PRD 到技术文档 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-02-prd-and-tech-docs",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/02-prd-and-tech-docs.md"
      },
      {
        "title": "4.3 如何读懂 AI 生成的代码 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-03-programming-basics",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/03-programming-basics.md"
      },
      {
        "title": "4.4 API 与 HTTP 基础 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-04-api-and-http",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/04-api-and-http.md"
      },
      {
        "title": "4.5 前后端分离概念 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-05-frontend-backend-separation",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/05-frontend-backend-separation.md"
      },
      {
        "title": "4.6 配置文件格式 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-06-config-formats",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/06-config-formats.md"
      },
      {
        "title": "4.7 API 集成实战 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-07-api-integration",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/07-api-integration.md"
      },
      {
        "title": "4.8 项目说明书结构 🟢",
        "rel": "docs-Advanced-04-dev-fundamentals-08-readme-structure",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/08-readme-structure.md"
      },
      {
        "title": "4.9 别再重复造轮子",
        "rel": "docs-Advanced-04-dev-fundamentals-09-finding-libraries",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/09-finding-libraries.md"
      },
      {
        "title": "第四章：你必须知道的开发基础",
        "rel": "docs-Advanced-04-dev-fundamentals-index",
        "sourceRel": "docs/Advanced/04-dev-fundamentals/index.md"
      },
      {
        "title": "5.3 动画与交互库",
        "rel": "docs-Advanced-05-ui-ux-03-animation-libraries",
        "sourceRel": "docs/Advanced/05-ui-ux/03-animation-libraries.md"
      },
      {
        "title": "5.4 UI 风格与灵感",
        "rel": "docs-Advanced-05-ui-ux-04-ui-inspiration",
        "sourceRel": "docs/Advanced/05-ui-ux/04-ui-inspiration.md"
      },
      {
        "title": "5.5 让页面更高级的效果",
        "rel": "docs-Advanced-05-ui-ux-05-advanced-effects",
        "sourceRel": "docs/Advanced/05-ui-ux/05-advanced-effects.md"
      },
      {
        "title": "5.6 让 AI 记住你的设计规范",
        "rel": "docs-Advanced-05-ui-ux-06-component-skills",
        "sourceRel": "docs/Advanced/05-ui-ux/06-component-skills.md"
      },
      {
        "title": "第五章：界面(UI)与交互(UX)",
        "rel": "docs-Advanced-05-ui-ux-index",
        "sourceRel": "docs/Advanced/05-ui-ux/index.md"
      },
      {
        "title": "6.0 领取你的数据库",
        "rel": "docs-Advanced-06-data-persistence-database-00-get-your-database",
        "sourceRel": "docs/Advanced/06-data-persistence-database/00-get-your-database.md"
      },
      {
        "title": "6.1 数据存储演进",
        "rel": "docs-Advanced-06-data-persistence-database-01-storage-evolution",
        "sourceRel": "docs/Advanced/06-data-persistence-database/01-storage-evolution.md"
      },
      {
        "title": "6.2 数据库基础概念",
        "rel": "docs-Advanced-06-data-persistence-database-02-database-basics",
        "sourceRel": "docs/Advanced/06-data-persistence-database/02-database-basics.md"
      },
      {
        "title": "6.3 如何操作数据库",
        "rel": "docs-Advanced-06-data-persistence-database-03-database-operations",
        "sourceRel": "docs/Advanced/06-data-persistence-database/03-database-operations.md"
      },
      {
        "title": "6.4 数据库设计与优化",
        "rel": "docs-Advanced-06-data-persistence-database-05-database-design",
        "sourceRel": "docs/Advanced/06-data-persistence-database/05-database-design.md"
      },
      {
        "title": "第六章：数据持久化与数据库",
        "rel": "docs-Advanced-06-data-persistence-database-index",
        "sourceRel": "docs/Advanced/06-data-persistence-database/index.md"
      },
      {
        "title": "7.0 跑通你的第一个全栈应用",
        "rel": "docs-Advanced-07-backend-api-00-crud-example",
        "sourceRel": "docs/Advanced/07-backend-api/00-crud-example.md"
      },
      {
        "title": "7.1 一个接口不够用了",
        "rel": "docs-Advanced-07-backend-api-01-api-growing-pains",
        "sourceRel": "docs/Advanced/07-backend-api/01-api-growing-pains.md"
      },
      {
        "title": "7.2 当接口出了问题",
        "rel": "docs-Advanced-07-backend-api-02-when-things-go-wrong",
        "sourceRel": "docs/Advanced/07-backend-api/02-when-things-go-wrong.md"
      },
      {
        "title": "7.3 让接口更好用",
        "rel": "docs-Advanced-07-backend-api-03-api-as-product",
        "sourceRel": "docs/Advanced/07-backend-api/03-api-as-product.md"
      },
      {
        "title": "第七章：后端API开发",
        "rel": "docs-Advanced-07-backend-api-index",
        "sourceRel": "docs/Advanced/07-backend-api/index.md"
      },
      {
        "title": "8.0 用户系统快速示例",
        "rel": "docs-Advanced-08-auth-security-00-user-system-example",
        "sourceRel": "docs/Advanced/08-auth-security/00-user-system-example.md"
      },
      {
        "title": "8.1 密钥管理与环境变量",
        "rel": "docs-Advanced-08-auth-security-01-env-and-secrets",
        "sourceRel": "docs/Advanced/08-auth-security/01-env-and-secrets.md"
      },
      {
        "title": "8.2 认证方式与方案选择",
        "rel": "docs-Advanced-08-auth-security-02-auth-methods",
        "sourceRel": "docs/Advanced/08-auth-security/02-auth-methods.md"
      },
      {
        "title": "8.3 路由保护与权限控制",
        "rel": "docs-Advanced-08-auth-security-03-route-protection",
        "sourceRel": "docs/Advanced/08-auth-security/03-route-protection.md"
      },
      {
        "title": "8.4 安全检查与问题排查",
        "rel": "docs-Advanced-08-auth-security-04-security-checklist",
        "sourceRel": "docs/Advanced/08-auth-security/04-security-checklist.md"
      },
      {
        "title": "8.5 进阶安全防护",
        "rel": "docs-Advanced-08-auth-security-05-advanced-security",
        "sourceRel": "docs/Advanced/08-auth-security/05-advanced-security.md"
      },
      {
        "title": "第八章：安全与用户认证",
        "rel": "docs-Advanced-08-auth-security-index",
        "sourceRel": "docs/Advanced/08-auth-security/index.md"
      },
      {
        "title": "9.1 为什么需要测试",
        "rel": "docs-Advanced-09-testing-automation-01-testing-strategy",
        "sourceRel": "docs/Advanced/09-testing-automation/01-testing-strategy.md"
      },
      {
        "title": "9.2 API 测试与 E2E 测试",
        "rel": "docs-Advanced-09-testing-automation-02-api-and-e2e-testing",
        "sourceRel": "docs/Advanced/09-testing-automation/02-api-and-e2e-testing.md"
      },
      {
        "title": "9.3 自动化工作流",
        "rel": "docs-Advanced-09-testing-automation-03-automation-workflow",
        "sourceRel": "docs/Advanced/09-testing-automation/03-automation-workflow.md"
      },
      {
        "title": "第九章：功能测试与自动化",
        "rel": "docs-Advanced-09-testing-automation-index",
        "sourceRel": "docs/Advanced/09-testing-automation/index.md"
      },
      {
        "title": "10.1 从 Localhost 到互联网",
        "rel": "docs-Advanced-10-localhost-public-access-01-network-layers",
        "sourceRel": "docs/Advanced/10-localhost-public-access/01-network-layers.md"
      },
      {
        "title": "10.2 内网穿透：临时让朋友看看",
        "rel": "docs-Advanced-10-localhost-public-access-02-tunneling",
        "sourceRel": "docs/Advanced/10-localhost-public-access/02-tunneling.md"
      },
      {
        "title": "第十章：Localhost 与公网访问",
        "rel": "docs-Advanced-10-localhost-public-access-index",
        "sourceRel": "docs/Advanced/10-localhost-public-access/index.md"
      },
      {
        "title": "11.1 为什么需要 Git",
        "rel": "docs-Advanced-11-git-collaboration-01-why-git",
        "sourceRel": "docs/Advanced/11-git-collaboration/01-why-git.md"
      },
      {
        "title": "11.2 推上云端，开始协作",
        "rel": "docs-Advanced-11-git-collaboration-02-remote-and-collaboration",
        "sourceRel": "docs/Advanced/11-git-collaboration/02-remote-and-collaboration.md"
      },
      {
        "title": "11.3 分支、PR 与团队工作流",
        "rel": "docs-Advanced-11-git-collaboration-03-branch-and-workflow",
        "sourceRel": "docs/Advanced/11-git-collaboration/03-branch-and-workflow.md"
      },
      {
        "title": "第十一章：Git 版本控制与协作开发",
        "rel": "docs-Advanced-11-git-collaboration-index",
        "sourceRel": "docs/Advanced/11-git-collaboration/index.md"
      },
      {
        "title": "12.1 部署到 EdgeOne Pages",
        "rel": "docs-Advanced-12-serverless-deploy-cicd-01-deploy-edgeone",
        "sourceRel": "docs/Advanced/12-serverless-deploy-cicd/01-deploy-edgeone.md"
      },
      {
        "title": "12.2 部署到类 Vercel 平台",
        "rel": "docs-Advanced-12-serverless-deploy-cicd-02-deploy-vercel-platforms",
        "sourceRel": "docs/Advanced/12-serverless-deploy-cicd/02-deploy-vercel-platforms.md"
      },
      {
        "title": "12.3 CI/CD 与自动化",
        "rel": "docs-Advanced-12-serverless-deploy-cicd-03-cicd-automation",
        "sourceRel": "docs/Advanced/12-serverless-deploy-cicd/03-cicd-automation.md"
      },
      {
        "title": "12.4 运维基础与成本优化",
        "rel": "docs-Advanced-12-serverless-deploy-cicd-04-operations-cost",
        "sourceRel": "docs/Advanced/12-serverless-deploy-cicd/04-operations-cost.md"
      },
      {
        "title": "第十二章：无服务器部署与 CI/CD 自动化",
        "rel": "docs-Advanced-12-serverless-deploy-cicd-index",
        "sourceRel": "docs/Advanced/12-serverless-deploy-cicd/index.md"
      },
      {
        "title": "13.1 域名购买与 DNS 配置",
        "rel": "docs-Advanced-13-domain-dns-01-domain-setup",
        "sourceRel": "docs/Advanced/13-domain-dns/01-domain-setup.md"
      },
      {
        "title": "13.2 备案与访问问题排查",
        "rel": "docs-Advanced-13-domain-dns-02-compliance-access",
        "sourceRel": "docs/Advanced/13-domain-dns/02-compliance-access.md"
      },
      {
        "title": "第十三章：域名、DNS 与网络接入",
        "rel": "docs-Advanced-13-domain-dns-index",
        "sourceRel": "docs/Advanced/13-domain-dns/index.md"
      },
      {
        "title": "14.1 VPS 选购指南",
        "rel": "docs-Advanced-14-vps-ops-deploy-01-vps-selection",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/01-vps-selection.md"
      },
      {
        "title": "14.2 VPS 初始化与安全配置",
        "rel": "docs-Advanced-14-vps-ops-deploy-02-vps-setup",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/02-vps-setup.md"
      },
      {
        "title": "14.3.1 应用商店与 Docker 基础",
        "rel": "docs-Advanced-14-vps-ops-deploy-03-1-docker-apps",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/03-1-docker-apps.md"
      },
      {
        "title": "14.3.2 部署 Next.js 应用",
        "rel": "docs-Advanced-14-vps-ops-deploy-03-2-deploy-nextjs",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/03-2-deploy-nextjs.md"
      },
      {
        "title": "14.3.3 部署静态网站",
        "rel": "docs-Advanced-14-vps-ops-deploy-03-3-deploy-static",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/03-3-deploy-static.md"
      },
      {
        "title": "14.3.4 部署前后端分离应用",
        "rel": "docs-Advanced-14-vps-ops-deploy-03-4-deploy-fullstack",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/03-4-deploy-fullstack.md"
      },
      {
        "title": "14.4 配置域名与证书",
        "rel": "docs-Advanced-14-vps-ops-deploy-04-domain-ssl",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/04-domain-ssl.md"
      },
      {
        "title": "14.5 其他好玩的应用",
        "rel": "docs-Advanced-14-vps-ops-deploy-05-cool-apps",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/05-cool-apps.md"
      },
      {
        "title": "第十四章：云服务器运维与项目部署",
        "rel": "docs-Advanced-14-vps-ops-deploy-index",
        "sourceRel": "docs/Advanced/14-vps-ops-deploy/index.md"
      },
      {
        "title": "15.1 Open Graph 与社交分享",
        "rel": "docs-Advanced-15-seo-analytics-01-opengraph-sharing",
        "sourceRel": "docs/Advanced/15-seo-analytics/01-opengraph-sharing.md"
      },
      {
        "title": "15.2 SEO 全攻略",
        "rel": "docs-Advanced-15-seo-analytics-02-seo-guide",
        "sourceRel": "docs/Advanced/15-seo-analytics/02-seo-guide.md"
      },
      {
        "title": "15.3 Umami 数据统计",
        "rel": "docs-Advanced-15-seo-analytics-03-umami",
        "sourceRel": "docs/Advanced/15-seo-analytics/03-umami.md"
      },
      {
        "title": "15.4 法律合规",
        "rel": "docs-Advanced-15-seo-analytics-04-legal",
        "sourceRel": "docs/Advanced/15-seo-analytics/04-legal.md"
      },
      {
        "title": "第十五章：SEO、分享与数据统计",
        "rel": "docs-Advanced-15-seo-analytics-index",
        "sourceRel": "docs/Advanced/15-seo-analytics/index.md"
      },
      {
        "title": "16.1 面对真实用户",
        "rel": "docs-Advanced-16-user-feedback-iteration-01-facing-real-users",
        "sourceRel": "docs/Advanced/16-user-feedback-iteration/01-facing-real-users.md"
      },
      {
        "title": "16.2 反馈分类与优先级",
        "rel": "docs-Advanced-16-user-feedback-iteration-02-feedback-prioritization",
        "sourceRel": "docs/Advanced/16-user-feedback-iteration/02-feedback-prioritization.md"
      },
      {
        "title": "16.3 理解用户",
        "rel": "docs-Advanced-16-user-feedback-iteration-03-understanding-users",
        "sourceRel": "docs/Advanced/16-user-feedback-iteration/03-understanding-users.md"
      },
      {
        "title": "16.4 迭代与成长",
        "rel": "docs-Advanced-16-user-feedback-iteration-04-iteration-and-growth",
        "sourceRel": "docs/Advanced/16-user-feedback-iteration/04-iteration-and-growth.md"
      },
      {
        "title": "第十六章：用户反馈与产品迭代",
        "rel": "docs-Advanced-16-user-feedback-iteration-index",
        "sourceRel": "docs/Advanced/16-user-feedback-iteration/index.md"
      },
      {
        "title": "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南",
        "rel": "docs-Advanced-99-next-level-index",
        "sourceRel": "docs/Advanced/99-next-level/index.md"
      },
      {
        "title": "随时随地 AI 编程：Happy Coder 工具链",
        "rel": "docs-Advanced-happy-coder",
        "sourceRel": "docs/Advanced/happy-coder.md"
      },
      {
        "title": "进阶篇：从想法到产品的100小时",
        "rel": "docs-Advanced-index",
        "sourceRel": "docs/Advanced/index.md"
      },
      {
        "title": "开局一个浏览器，代码环境全搞定",
        "rel": "docs-Advanced-web-ide",
        "sourceRel": "docs/Advanced/web-ide.md"
      },
      {
        "title": "智能体工程",
        "rel": "docs-Articles-01-core-concepts-agentic-engineering",
        "sourceRel": "docs/Articles/01-core-concepts/agentic-engineering.md"
      },
      {
        "title": "Coding Agents 入门：真正完成工作的艺术",
        "rel": "docs-Articles-01-core-concepts-coding-agents-101",
        "sourceRel": "docs/Articles/01-core-concepts/coding-agents-101.md"
      },
      {
        "title": "我们在 FAANG 是怎么做 Vibe Coding 的",
        "rel": "docs-Articles-01-core-concepts-how-we-vibe-code-at-faang",
        "sourceRel": "docs/Articles/01-core-concepts/how-we-vibe-code-at-faang.md"
      },
      {
        "title": "核心概念与范式演进",
        "rel": "docs-Articles-01-core-concepts-index",
        "sourceRel": "docs/Articles/01-core-concepts/index.md"
      },
      {
        "title": "规范是新的源代码",
        "rel": "docs-Articles-01-core-concepts-specs-are-the-new-source-code",
        "sourceRel": "docs/Articles/01-core-concepts/specs-are-the-new-source-code.md"
      },
      {
        "title": "工厂模型：Coding Agents 如何改变软件工程",
        "rel": "docs-Articles-01-core-concepts-the-factory-model-how-coding-agents-changed-software-engineering",
        "sourceRel": "docs/Articles/01-core-concepts/the-factory-model-how-coding-agents-changed-software-engineering.md"
      },
      {
        "title": "Vibe Coding 不是低质量工作的借口",
        "rel": "docs-Articles-01-core-concepts-vibe-coding-is-not-an-excuse-for-low-quality-work",
        "sourceRel": "docs/Articles/01-core-concepts/vibe-coding-is-not-an-excuse-for-low-quality-work.md"
      },
      {
        "title": "Vibe Coding：革命还是鲁莽放纵？",
        "rel": "docs-Articles-01-core-concepts-vibe-coding-revolution-or-reckless-abandon",
        "sourceRel": "docs/Articles/01-core-concepts/vibe-coding-revolution-or-reckless-abandon.md"
      },
      {
        "title": "什么是 AI Agent？为什么它们很重要？",
        "rel": "docs-Articles-01-core-concepts-what-are-ai-agents-why-do-they-matter",
        "sourceRel": "docs/Articles/01-core-concepts/what-are-ai-agents-why-do-they-matter.md"
      },
      {
        "title": "关于 Vibe Coding 你需要知道的一切",
        "rel": "docs-Articles-01-core-concepts-what-you-need-to-know-about-vibe-coding",
        "sourceRel": "docs/Articles/01-core-concepts/what-you-need-to-know-about-vibe-coding.md"
      },
      {
        "title": "如何成为世界级的智能体工程师",
        "rel": "docs-Articles-01-core-concepts-world-class-agent-engineer",
        "sourceRel": "docs/Articles/01-core-concepts/world-class-agent-engineer.md"
      },
      {
        "title": "用文件系统和 Bash 构建智能体",
        "rel": "docs-Articles-02-technical-architecture-build-agents-with-filesystems-and-bash",
        "sourceRel": "docs/Articles/02-technical-architecture/build-agents-with-filesystems-and-bash.md"
      },
      {
        "title": "揭秘 Claude Code 的工作原理",
        "rel": "docs-Articles-02-technical-architecture-how-claude-code-works",
        "sourceRel": "docs/Articles/02-technical-architecture/how-claude-code-works.md"
      },
      {
        "title": "基础技术与架构设计",
        "rel": "docs-Articles-02-technical-architecture-index",
        "sourceRel": "docs/Articles/02-technical-architecture/index.md"
      },
      {
        "title": "MCP：它是什么，以及为什么重要",
        "rel": "docs-Articles-02-technical-architecture-mcp-what-it-is-and-why-it-matters",
        "sourceRel": "docs/Articles/02-technical-architecture/mcp-what-it-is-and-why-it-matters.md"
      },
      {
        "title": "多智能体系统如何支撑 AI 原生工程",
        "rel": "docs-Articles-02-technical-architecture-multi-agent-systems-ai-native-engineering",
        "sourceRel": "docs/Articles/02-technical-architecture/multi-agent-systems-ai-native-engineering.md"
      },
      {
        "title": "理解 AI 的「五层蛋糕」架构",
        "rel": "docs-Articles-02-technical-architecture-nvidia-ai-5-layer-cake",
        "sourceRel": "docs/Articles/02-technical-architecture/nvidia-ai-5-layer-cake.md"
      },
      {
        "title": "自我改进的编码智能体",
        "rel": "docs-Articles-02-technical-architecture-self-improving-coding-agents",
        "sourceRel": "docs/Articles/02-technical-architecture/self-improving-coding-agents.md"
      },
      {
        "title": "测试「Bash 就够了」假设：SQL vs Bash 智能体对比实验",
        "rel": "docs-Articles-02-technical-architecture-testing-bash-vs-sql",
        "sourceRel": "docs/Articles/02-technical-architecture/testing-bash-vs-sql.md"
      },
      {
        "title": "AGENTS.md vs Skills：被动上下文为何胜过主动检索",
        "rel": "docs-Articles-03-toolchain-frameworks-agents-md-vs-skills",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/agents-md-vs-skills.md"
      },
      {
        "title": "AI 驱动的原型开发：v0、Bolt 和 Lovable 对比",
        "rel": "docs-Articles-03-toolchain-frameworks-ai-driven-prototyping-v0-bolt-and-lovable-compared",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/ai-driven-prototyping-v0-bolt-and-lovable-compared.md"
      },
      {
        "title": "Claude Code Swarms：多智能体协作开发",
        "rel": "docs-Articles-03-toolchain-frameworks-claude-code-swarms",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/claude-code-swarms.md"
      },
      {
        "title": "Claude Skills 完整构建指南",
        "rel": "docs-Articles-03-toolchain-frameworks-complete-guide-to-building-skills-for-claude",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/complete-guide-to-building-skills-for-claude.md"
      },
      {
        "title": "如何为 AI 智能体写出优秀的规范",
        "rel": "docs-Articles-03-toolchain-frameworks-how-to-write-good-spec-for-ai-agents",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/how-to-write-good-spec-for-ai-agents.md"
      },
      {
        "title": "工具链与开发框架",
        "rel": "docs-Articles-03-toolchain-frameworks-index",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/index.md"
      },
      {
        "title": "我们删掉了智能体 80% 的工具",
        "rel": "docs-Articles-03-toolchain-frameworks-we-removed-80-percent-tools",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/we-removed-80-percent-tools.md"
      },
      {
        "title": "为什么我在 AI 工程中使用 Cline",
        "rel": "docs-Articles-03-toolchain-frameworks-why-i-use-cline-for-ai-engineering",
        "sourceRel": "docs/Articles/03-toolchain-frameworks/why-i-use-cline-for-ai-engineering.md"
      },
      {
        "title": "AI 代码审查的实施与最佳实践",
        "rel": "docs-Articles-04-engineering-practices-ai-code-review-implementation",
        "sourceRel": "docs/Articles/04-engineering-practices/ai-code-review-implementation.md"
      },
      {
        "title": "AI 写代码更快，你的工作是证明它能用",
        "rel": "docs-Articles-04-engineering-practices-ai-writes-code-faster-your-job-is-to-prove-it-works",
        "sourceRel": "docs/Articles/04-engineering-practices/ai-writes-code-faster-your-job-is-to-prove-it-works.md"
      },
      {
        "title": "在AI时代避免技能退化",
        "rel": "docs-Articles-04-engineering-practices-avoiding-skill-atrophy-in-the-age-of-ai",
        "sourceRel": "docs/Articles/04-engineering-practices/avoiding-skill-atrophy-in-the-age-of-ai.md"
      },
      {
        "title": "超越70%：最大化AI辅助编程中人类30%的价值",
        "rel": "docs-Articles-04-engineering-practices-beyond-the-70-maximizing-the-human-30-of-ai-assisted-coding",
        "sourceRel": "docs/Articles/04-engineering-practices/beyond-the-70-maximizing-the-human-30-of-ai-assisted-coding.md"
      },
      {
        "title": "如何为 AI Coding Agents 编写高质量规范",
        "rel": "docs-Articles-04-engineering-practices-how-to-write-a-good-spec-for-ai-agents",
        "sourceRel": "docs/Articles/04-engineering-practices/how-to-write-a-good-spec-for-ai-agents.md"
      },
      {
        "title": "工程实施与质量保障",
        "rel": "docs-Articles-04-engineering-practices-index",
        "sourceRel": "docs/Articles/04-engineering-practices/index.md"
      },
      {
        "title": "GenAI 时代领导高效工程团队",
        "rel": "docs-Articles-04-engineering-practices-leading-effective-engineering-teams-in-the-age-of-genai",
        "sourceRel": "docs/Articles/04-engineering-practices/leading-effective-engineering-teams-in-the-age-of-genai.md"
      },
      {
        "title": "我在2026年的LLM编码工作流",
        "rel": "docs-Articles-04-engineering-practices-my-llm-coding-workflow-going-into-2026",
        "sourceRel": "docs/Articles/04-engineering-practices/my-llm-coding-workflow-going-into-2026.md"
      },
      {
        "title": "React 最佳实践：Vercel 十年性能优化经验总结",
        "rel": "docs-Articles-04-engineering-practices-react-best-practices",
        "sourceRel": "docs/Articles/04-engineering-practices/react-best-practices.md"
      },
      {
        "title": "停止为 AGENTS.md 使用 /init",
        "rel": "docs-Articles-04-engineering-practices-stop-using-init-for-agents",
        "sourceRel": "docs/Articles/04-engineering-practices/stop-using-init-for-agents.md"
      },
      {
        "title": "Vercel 如何构建 Coding Agents 的 AEO 追踪系统",
        "rel": "docs-Articles-04-engineering-practices-vercel-aeo-tracking",
        "sourceRel": "docs/Articles/04-engineering-practices/vercel-aeo-tracking.md"
      },
      {
        "title": "使用 AI Gateway 生成视频",
        "rel": "docs-Articles-04-engineering-practices-video-generation-with-ai-gateway",
        "sourceRel": "docs/Articles/04-engineering-practices/video-generation-with-ai-gateway.md"
      },
      {
        "title": "你的 AI Coding Agents 需要一个管理者",
        "rel": "docs-Articles-04-engineering-practices-your-ai-coding-agents-need-a-manager",
        "sourceRel": "docs/Articles/04-engineering-practices/your-ai-coding-agents-need-a-manager.md"
      },
      {
        "title": "AI 代理已经到来，威胁也随之而来",
        "rel": "docs-Articles-05-security-compliance-ai-agents-threats-and-mitigations",
        "sourceRel": "docs/Articles/05-security-compliance/ai-agents-threats-and-mitigations.md"
      },
      {
        "title": "安全、合规与局限性",
        "rel": "docs-Articles-05-security-compliance-index",
        "sourceRel": "docs/Articles/05-security-compliance/index.md"
      },
      {
        "title": "智能体架构中的安全边界",
        "rel": "docs-Articles-05-security-compliance-security-boundaries-in-agentic-architectures",
        "sourceRel": "docs/Articles/05-security-compliance/security-boundaries-in-agentic-architectures.md"
      },
      {
        "title": "OpenEvidence 如何打造让医生信得过的医疗 AI",
        "rel": "docs-Articles-06-business-trends-how-openevidence-built-healthcare-ai-physicians-trust",
        "sourceRel": "docs/Articles/06-business-trends/how-openevidence-built-healthcare-ai-physicians-trust.md"
      },
      {
        "title": "商业应用与行业趋势",
        "rel": "docs-Articles-06-business-trends-index",
        "sourceRel": "docs/Articles/06-business-trends/index.md"
      },
      {
        "title": "用 AI 智能体扩展社区，同时保持人性化",
        "rel": "docs-Articles-06-business-trends-keeping-community-human-while-scaling-with-agents",
        "sourceRel": "docs/Articles/06-business-trends/keeping-community-human-while-scaling-with-agents.md"
      },
      {
        "title": "软件工程的未来两年",
        "rel": "docs-Articles-06-business-trends-the-next-two-years-of-software-engineering",
        "sourceRel": "docs/Articles/06-business-trends/the-next-two-years-of-software-engineering.md"
      },
      {
        "title": "优质文章篇",
        "rel": "docs-Articles-index",
        "sourceRel": "docs/Articles/index.md"
      },
      {
        "title": "0.1 这本教程在教什么，以及你会做出什么",
        "rel": "docs-Basic-00-preface-0.1-start-here",
        "sourceRel": "docs/Basic/00-preface/0.1-start-here.md"
      },
      {
        "title": "0.2 谁适合学，以及怎么学最有效",
        "rel": "docs-Basic-00-preface-0.2-what-you-will-build",
        "sourceRel": "docs/Basic/00-preface/0.2-what-you-will-build.md"
      },
      {
        "title": "0.3 卡住时怎么办：基础版统一求助流程",
        "rel": "docs-Basic-00-preface-0.3-who-this-is-for",
        "sourceRel": "docs/Basic/00-preface/0.3-who-this-is-for.md"
      },
      {
        "title": "0.4 本章小结：基础版学习地图",
        "rel": "docs-Basic-00-preface-0.4-how-to-learn",
        "sourceRel": "docs/Basic/00-preface/0.4-how-to-learn.md"
      },
      {
        "title": "第 0 章：开始前 —— 你会做出什么，怎么学，卡住怎么办",
        "rel": "docs-Basic-00-preface-index",
        "sourceRel": "docs/Basic/00-preface/index.md"
      },
      {
        "title": "1.1 为什么从这一章开始，以及先准备什么",
        "rel": "docs-Basic-01-awakening-1.1-coder-to-commander",
        "sourceRel": "docs/Basic/01-awakening/1.1-coder-to-commander.md"
      },
      {
        "title": "1.2 用填空式模板写出第一版需求",
        "rel": "docs-Basic-01-awakening-1.2-breaking-myths",
        "sourceRel": "docs/Basic/01-awakening/1.2-breaking-myths.md"
      },
      {
        "title": "1.3 在平台里生成你的第一个版本，并完成三轮微调",
        "rel": "docs-Basic-01-awakening-1.3-tools-guide",
        "sourceRel": "docs/Basic/01-awakening/1.3-tools-guide.md"
      },
      {
        "title": "1.4 本章小结：第一轮验收与下一轮优化清单",
        "rel": "docs-Basic-01-awakening-1.4-vibe-vs-spec",
        "sourceRel": "docs/Basic/01-awakening/1.4-vibe-vs-spec.md"
      },
      {
        "title": "第 1 章：第一个版本 —— 2 小时做出你的个人主页 + 数字分身",
        "rel": "docs-Basic-01-awakening-index",
        "sourceRel": "docs/Basic/01-awakening/index.md"
      },
      {
        "title": "2.1 为什么要把项目带回本地，以及如何把它导出下来",
        "rel": "docs-Basic-02-mindset-2.1-thinking-upgrade",
        "sourceRel": "docs/Basic/02-mindset/2.1-thinking-upgrade.md"
      },
      {
        "title": "2.2 用 AI IDE 打开它，并先认识最关键的几部分",
        "rel": "docs-Basic-02-mindset-2.2-inversion-thinking",
        "sourceRel": "docs/Basic/02-mindset/2.2-inversion-thinking.md"
      },
      {
        "title": "2.3 完成一次最小修改，并学会 3 类高频提问",
        "rel": "docs-Basic-02-mindset-2.3-subtraction-thinking",
        "sourceRel": "docs/Basic/02-mindset/2.3-subtraction-thinking.md"
      },
      {
        "title": "2.4 本章小结：你的本地工作台已经搭好",
        "rel": "docs-Basic-02-mindset-2.4-story-thinking",
        "sourceRel": "docs/Basic/02-mindset/2.4-story-thinking.md"
      },
      {
        "title": "第 2 章：带回自己的工作台 —— 从平台到本地",
        "rel": "docs-Basic-02-mindset-index",
        "sourceRel": "docs/Basic/02-mindset/index.md"
      },
      {
        "title": "3.1 为什么先改界面，以及先选一个清晰的风格方向",
        "rel": "docs-Basic-03-technique-3.1-prompt-basics",
        "sourceRel": "docs/Basic/03-technique/3.1-prompt-basics.md"
      },
      {
        "title": "3.2 三个最值回票价的界面改动",
        "rel": "docs-Basic-03-technique-3.2-structured-frameworks",
        "sourceRel": "docs/Basic/03-technique/3.2-structured-frameworks.md"
      },
      {
        "title": "3.3 用更清晰的话告诉 AI 你想怎么改，并兼顾好不好用",
        "rel": "docs-Basic-03-technique-3.3-advanced-techniques",
        "sourceRel": "docs/Basic/03-technique/3.3-advanced-techniques.md"
      },
      {
        "title": "3.4 本章小结：你的首页已经像一个作品",
        "rel": "docs-Basic-03-technique-3.4-first-prd",
        "sourceRel": "docs/Basic/03-technique/3.4-first-prd.md"
      },
      {
        "title": "第 3 章：做好第一印象 —— 界面、风格与更有效的需求表达",
        "rel": "docs-Basic-03-technique-index",
        "sourceRel": "docs/Basic/03-technique/index.md"
      },
      {
        "title": "4.1 为什么先学“存档”，以及 Git 的最小闭环",
        "rel": "docs-Basic-04-practice-0-to-1-4.1-before-start",
        "sourceRel": "docs/Basic/04-practice-0-to-1/4.1-before-start.md"
      },
      {
        "title": "4.2 从访客视角决定你要补什么内容",
        "rel": "docs-Basic-04-practice-0-to-1-4.2-build-page",
        "sourceRel": "docs/Basic/04-practice-0-to-1/4.2-build-page.md"
      },
      {
        "title": "4.3 只添加 2-3 个最有价值的内容模块，并让数字分身更容易被使用",
        "rel": "docs-Basic-04-practice-0-to-1-4.3-core-features",
        "sourceRel": "docs/Basic/04-practice-0-to-1/4.3-core-features.md"
      },
      {
        "title": "4.4 本章小结：主页更完整，也更可回退",
        "rel": "docs-Basic-04-practice-0-to-1-4.4-data-storage",
        "sourceRel": "docs/Basic/04-practice-0-to-1/4.4-data-storage.md"
      },
      {
        "title": "第 4 章：让主页更完整 —— 内容、引导与基础存档",
        "rel": "docs-Basic-04-practice-0-to-1-index",
        "sourceRel": "docs/Basic/04-practice-0-to-1/index.md"
      },
      {
        "title": "5.1 为什么“像你”比“更聪明”更重要，以及先用一句人话理解背后发生了什么",
        "rel": "docs-Basic-05-advanced-5.1-version-control",
        "sourceRel": "docs/Basic/05-advanced/5.1-version-control.md"
      },
      {
        "title": "5.2 写第一版“数字分身说明书”，并用 1-3 组真实材料校准它",
        "rel": "docs-Basic-05-advanced-5.2-deployment",
        "sourceRel": "docs/Basic/05-advanced/5.2-deployment.md"
      },
      {
        "title": "5.3 四类最常见问题，以及成本与安全的最小意识",
        "rel": "docs-Basic-05-advanced-5.3-security",
        "sourceRel": "docs/Basic/05-advanced/5.3-security.md"
      },
      {
        "title": "5.4 本章小结：它已经能更稳地代表你",
        "rel": "docs-Basic-05-advanced-5.4-iteration",
        "sourceRel": "docs/Basic/05-advanced/5.4-iteration.md"
      },
      {
        "title": "第 5 章：让数字分身更像你 —— 人设、回答与排错",
        "rel": "docs-Basic-05-advanced-index",
        "sourceRel": "docs/Basic/05-advanced/index.md"
      },
      {
        "title": "6.1 为什么把“上线”放在最后，以及上线前检查",
        "rel": "docs-Basic-06-launch-6.1-preflight",
        "sourceRel": "docs/Basic/06-launch/6.1-preflight.md"
      },
      {
        "title": "6.2 把代码推到远程仓库，并用 EdgeOne Pages 完成部署",
        "rel": "docs-Basic-06-launch-6.2-deploy",
        "sourceRel": "docs/Basic/06-launch/6.2-deploy.md"
      },
      {
        "title": "6.3 上线后自测，并收集第一轮真实反馈",
        "rel": "docs-Basic-06-launch-6.3-feedback",
        "sourceRel": "docs/Basic/06-launch/6.3-feedback.md"
      },
      {
        "title": "6.4 基础版收束：你已经从“有想法”走到了“有作品”",
        "rel": "docs-Basic-06-launch-6.4-wrap-up",
        "sourceRel": "docs/Basic/06-launch/6.4-wrap-up.md"
      },
      {
        "title": "第 6 章：正式上线 —— 部署、分享与第一轮真实反馈",
        "rel": "docs-Basic-06-launch-index",
        "sourceRel": "docs/Basic/06-launch/index.md"
      },
      {
        "title": "A. 常用提示词模板",
        "rel": "docs-Basic-99-appendix-a-prompt-cheatsheet",
        "sourceRel": "docs/Basic/99-appendix/a-prompt-cheatsheet.md"
      },
      {
        "title": "B. 常见错误与“问 AI”流程",
        "rel": "docs-Basic-99-appendix-b-errors-and-asking-ai",
        "sourceRel": "docs/Basic/99-appendix/b-errors-and-asking-ai.md"
      },
      {
        "title": "C. UI 速查卡",
        "rel": "docs-Basic-99-appendix-c-ui-cheatsheet",
        "sourceRel": "docs/Basic/99-appendix/c-ui-cheatsheet.md"
      },
      {
        "title": "D. Git 最小操作卡",
        "rel": "docs-Basic-99-appendix-d-git-minimal-card",
        "sourceRel": "docs/Basic/99-appendix/d-git-minimal-card.md"
      },
      {
        "title": "E. API Key、环境变量与基础安全",
        "rel": "docs-Basic-99-appendix-e-api-key-env-security",
        "sourceRel": "docs/Basic/99-appendix/e-api-key-env-security.md"
      },
      {
        "title": "F. Vibe Coding 的能与不能",
        "rel": "docs-Basic-99-appendix-f-vibe-coding-can-and-cannot",
        "sourceRel": "docs/Basic/99-appendix/f-vibe-coding-can-and-cannot.md"
      },
      {
        "title": "G. 进阶版跳转地图",
        "rel": "docs-Basic-99-appendix-g-advanced-jump-map",
        "sourceRel": "docs/Basic/99-appendix/g-advanced-jump-map.md"
      },
      {
        "title": "附录",
        "rel": "docs-Basic-99-appendix-index",
        "sourceRel": "docs/Basic/99-appendix/index.md"
      },
      {
        "title": "结语：给未来的你",
        "rel": "docs-Basic-100-epilogue-index",
        "sourceRel": "docs/Basic/100-epilogue/index.md"
      },
      {
        "title": "下部预告：Vibe Coding 全栈实战教程",
        "rel": "docs-Basic-101-next-part-index",
        "sourceRel": "docs/Basic/101-next-part/index.md"
      },
      {
        "title": "进阶版核心内容详解",
        "rel": "docs-Basic-101-next-part-preview-advanced-content",
        "sourceRel": "docs/Basic/101-next-part/preview-advanced-content.md"
      },
      {
        "title": "基础篇",
        "rel": "docs-Basic-index",
        "sourceRel": "docs/Basic/index.md"
      },
      {
        "title": "开源 AI 画布：我的 Vibecoding 实践历程",
        "rel": "docs-Practice-ai-canvas-vibecoding-journey",
        "sourceRel": "docs/Practice/ai-canvas-vibecoding-journey.md"
      },
      {
        "title": "🎨 Vibecoding 案例分享：零代码打造 AI 绘本生成器",
        "rel": "docs-Practice-ai-picture-book-generator",
        "sourceRel": "docs/Practice/ai-picture-book-generator.md"
      },
      {
        "title": "全栈实战：AI 简历优化 SaaS (AI Resume Polish)",
        "rel": "docs-Practice-ai-resume-saas",
        "sourceRel": "docs/Practice/ai-resume-saas.md"
      },
      {
        "title": "全栈开发：21天养成思考习惯的小游戏",
        "rel": "docs-Practice-full-stack-21-day-thinking-habit-game",
        "sourceRel": "docs/Practice/full-stack-21-day-thinking-habit-game.md"
      },
      {
        "title": "实践案例篇",
        "rel": "docs-Practice-index",
        "sourceRel": "docs/Practice/index.md"
      },
      {
        "title": "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南",
        "rel": "docs-Practice-vibe-coding-methodology",
        "sourceRel": "docs/Practice/vibe-coding-methodology.md"
      }
    ]
  },
  {
    "id": "07-coding/vibe-coding-prompt-template",
    "volume": "07-coding",
    "local": "vibe-coding-prompt-template",
    "title": "Vibe Coding 提示词模板",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "KhazP/vibe-coding-prompt-template",
    "site": null,
    "commit": "db481763c24e2b66b919f9d40aa42b16409a62d7",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/KhazP/vibe-coding-prompt-template",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Vibe Coding 提示词模板",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "vibeworkflow",
        "rel": "cli",
        "sourceRel": "cli/README.md"
      },
      {
        "title": "Docs",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Worked Example: Reddit to AI",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "AGENTS.md — [App Name]",
        "rel": "templates",
        "sourceRel": "templates/AGENTS.md"
      }
    ]
  },
  {
    "id": "07-coding/ai-coding-guide-stormzhang",
    "volume": "07-coding",
    "local": "ai-coding-guide-stormzhang",
    "title": "面向小白的 AI 编程 CLI 教程",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "stormzhang/ai-coding-guide",
    "site": null,
    "commit": "d187dbdb83fa1be051a850074eb518e30e2eb47c",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/stormzhang/ai-coding-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Codex 中文教程与 AI 编程指南（含 Claude Code）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Claude Code 中文教程",
        "rel": "claude-code",
        "sourceRel": "claude-code/index.md"
      },
      {
        "title": "Codex 教程",
        "rel": "codex",
        "sourceRel": "codex/README.md"
      },
      {
        "title": "DeepSeek Harness 中文教程",
        "rel": "deepseek-harness",
        "sourceRel": "deepseek-harness/index.md"
      }
    ]
  },
  {
    "id": "07-coding/ai-coding-guide-zh",
    "volume": "07-coding",
    "local": "ai-coding-guide-zh",
    "title": "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "KimYx0207/AI-Coding-Guide-Zh",
    "site": null,
    "commit": "7a7c21b8e7dc976e8ade33b79ee000a172e63daf",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/KimYx0207/AI-Coding-Guide-Zh",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Claude Code 完整安装指南：从零开始到成功运行",
        "rel": "docs-claude-code-01-Claude-Code完整安装指南",
        "sourceRel": "docs/claude-code/01-Claude-Code完整安装指南.md"
      },
      {
        "title": "Claude Code 基础使用完整指南：从启动到精通的实战手册",
        "rel": "docs-claude-code-02-基础使用完整指南",
        "sourceRel": "docs/claude-code/02-基础使用完整指南.md"
      },
      {
        "title": "Commands系统完整指南：从 Slash 命令到 Skills 工作流的全面精通",
        "rel": "docs-claude-code-03-Commands系统完整指南",
        "sourceRel": "docs/claude-code/03-Commands系统完整指南.md"
      },
      {
        "title": "MCP集成完整指南：从配置到开发的实战手册",
        "rel": "docs-claude-code-04-MCP集成完整指南",
        "sourceRel": "docs/claude-code/04-MCP集成完整指南.md"
      },
      {
        "title": "Hooks系统完整指南：自动化工作流的终极武器",
        "rel": "docs-claude-code-05-Hooks系统完整指南",
        "sourceRel": "docs/claude-code/05-Hooks系统完整指南.md"
      },
      {
        "title": "Subagent 子代理完整指南：官方 Subagents、Task 委派与社区代理资源",
        "rel": "docs-claude-code-06-Subagent子代理完整指南",
        "sourceRel": "docs/claude-code/06-Subagent子代理完整指南.md"
      },
      {
        "title": "Skills定制完整指南：打造专属AI能力包的实战手册",
        "rel": "docs-claude-code-07-Skills定制完整指南",
        "sourceRel": "docs/claude-code/07-Skills定制完整指南.md"
      },
      {
        "title": "Claude Code Plugins生态完整指南：从安装到自定义开发",
        "rel": "docs-claude-code-08-Plugins生态完整指南",
        "sourceRel": "docs/claude-code/08-Plugins生态完整指南.md"
      },
      {
        "title": "Claude Agent SDK 完整指南：把AI编程能力装进你的程序里",
        "rel": "docs-claude-code-09-Agent-SDK完整指南",
        "sourceRel": "docs/claude-code/09-Agent-SDK完整指南.md"
      },
      {
        "title": "Claude Code 综合实战：企业级最佳实践指南",
        "rel": "docs-claude-code-10-综合实战完整指南",
        "sourceRel": "docs/claude-code/10-综合实战完整指南.md"
      },
      {
        "title": "企业实战完整指南：团队协作与安全合规",
        "rel": "docs-claude-code-11-企业实战完整指南",
        "sourceRel": "docs/claude-code/11-企业实战完整指南.md"
      },
      {
        "title": "Claude Code Remote Control完整指南：手机、浏览器继续本地会话",
        "rel": "docs-claude-code-12-Remote-Control完整指南",
        "sourceRel": "docs/claude-code/12-Remote-Control完整指南.md"
      },
      {
        "title": "Claude Code Channels与计划任务完整指南：把外部事件推入会话",
        "rel": "docs-claude-code-13-Channels与计划任务完整指南",
        "sourceRel": "docs/claude-code/13-Channels与计划任务完整指南.md"
      },
      {
        "title": "Claude Code 直播教学版 - 快速导航卡",
        "rel": "docs-claude-code-快速导航卡",
        "sourceRel": "docs/claude-code/快速导航卡.md"
      },
      {
        "title": "CX-01 Codex App 安装与认证完整指南：Windows / macOS 从下载到第一个线程",
        "rel": "docs-codex-CX-01-Codex-App安装与认证完整指南",
        "sourceRel": "docs/codex/CX-01-Codex-App安装与认证完整指南.md"
      },
      {
        "title": "CX-02 Codex App 桌面工作流完整指南：把 App 当主控台",
        "rel": "docs-codex-CX-02-Codex-App桌面工作流完整指南",
        "sourceRel": "docs/codex/CX-02-Codex-App桌面工作流完整指南.md"
      },
      {
        "title": "CX-03 Commands 完整指南：App 里的 slash commands 与工作流入口",
        "rel": "docs-codex-CX-03-Codex-Commands工作流入口完整指南",
        "sourceRel": "docs/codex/CX-03-Codex-Commands工作流入口完整指南.md"
      },
      {
        "title": "CX-04 项目指令、配置、权限与沙盒：让 App 知道怎么安全工作",
        "rel": "docs-codex-CX-04-Codex项目指令权限配置完整指南",
        "sourceRel": "docs/codex/CX-04-Codex项目指令权限配置完整指南.md"
      },
      {
        "title": "CX-05 MCP 完整指南：在 App 中连接外部工具",
        "rel": "docs-codex-CX-05-Codex-MCP外部工具完整指南",
        "sourceRel": "docs/codex/CX-05-Codex-MCP外部工具完整指南.md"
      },
      {
        "title": "CX-06 Skills 完整指南：在 App 中调用和编写可复用工作流",
        "rel": "docs-codex-CX-06-Codex-Skills可复用工作流完整指南",
        "sourceRel": "docs/codex/CX-06-Codex-Skills可复用工作流完整指南.md"
      },
      {
        "title": "CX-07 Plugins / Connectors 完整指南：App 能力扩展与账号连接",
        "rel": "docs-codex-CX-07-Codex-Plugins连接器完整指南",
        "sourceRel": "docs/codex/CX-07-Codex-Plugins连接器完整指南.md"
      },
      {
        "title": "CX-08 Subagents 完整指南：App 中的多 Agent 协作",
        "rel": "docs-codex-CX-08-Codex-Subagents多Agent协作完整指南",
        "sourceRel": "docs/codex/CX-08-Codex-Subagents多Agent协作完整指南.md"
      },
      {
        "title": "CX-09 Automations 完整指南：App 里的后台任务、提醒和周期检查",
        "rel": "docs-codex-CX-09-Codex-Automations后台任务完整指南",
        "sourceRel": "docs/codex/CX-09-Codex-Automations后台任务完整指南.md"
      },
      {
        "title": "CX-10 Review / GitHub / PR 工作流：从 App 改动到可合并结果",
        "rel": "docs-codex-CX-10-Codex-Review-GitHub-PR完整指南",
        "sourceRel": "docs/codex/CX-10-Codex-Review-GitHub-PR完整指南.md"
      },
      {
        "title": "CX-11 Codex Web / Cloud 辅助指南：什么时候离开 App",
        "rel": "docs-codex-CX-11-Codex-Web-Cloud辅助指南",
        "sourceRel": "docs/codex/CX-11-Codex-Web-Cloud辅助指南.md"
      },
      {
        "title": "CX-12 Codex CLI 辅助指南：App 用户什么时候需要终端",
        "rel": "docs-codex-CX-12-Codex-CLI辅助完整指南",
        "sourceRel": "docs/codex/CX-12-Codex-CLI辅助完整指南.md"
      },
      {
        "title": "CX-13 安全与企业指南：围绕 App 建立权限、审计和合规边界",
        "rel": "docs-codex-CX-13-Codex安全企业完整指南",
        "sourceRel": "docs/codex/CX-13-Codex安全企业完整指南.md"
      },
      {
        "title": "CX-14 Codex 与 Claude Code 对比：从 App 主线出发做工具选择",
        "rel": "docs-codex-CX-14-Codex与Claude-Code对比指南",
        "sourceRel": "docs/codex/CX-14-Codex与Claude-Code对比指南.md"
      },
      {
        "title": "00. OpenClaw 文档阅读指南",
        "rel": "docs-openclaw-00-阅读指南",
        "sourceRel": "docs/openclaw/00-阅读指南.md"
      },
      {
        "title": "01. OpenClaw 项目介绍",
        "rel": "docs-openclaw-01-OpenClaw项目介绍",
        "sourceRel": "docs/openclaw/01-OpenClaw项目介绍.md"
      },
      {
        "title": "02. 安装部署指南",
        "rel": "docs-openclaw-02-安装部署指南",
        "sourceRel": "docs/openclaw/02-安装部署指南.md"
      },
      {
        "title": "03. 快速开始指南",
        "rel": "docs-openclaw-03-快速开始指南",
        "sourceRel": "docs/openclaw/03-快速开始指南.md"
      },
      {
        "title": "04. AI 模型配置指南",
        "rel": "docs-openclaw-04-模型配置指南",
        "sourceRel": "docs/openclaw/04-模型配置指南.md"
      },
      {
        "title": "05. 消息平台接入指南",
        "rel": "docs-openclaw-05-消息平台接入指南",
        "sourceRel": "docs/openclaw/05-消息平台接入指南.md"
      },
      {
        "title": "06. 技能系统 (Skills) 完全指南",
        "rel": "docs-openclaw-06-技能系统指南",
        "sourceRel": "docs/openclaw/06-技能系统指南.md"
      },
      {
        "title": "07. 记忆系统完全指南",
        "rel": "docs-openclaw-07-记忆系统指南",
        "sourceRel": "docs/openclaw/07-记忆系统指南.md"
      },
      {
        "title": "08. 多 Agent 协作指南",
        "rel": "docs-openclaw-08-多Agent协作指南",
        "sourceRel": "docs/openclaw/08-多Agent协作指南.md"
      },
      {
        "title": "09. Docker 部署指南",
        "rel": "docs-openclaw-09-Docker部署指南",
        "sourceRel": "docs/openclaw/09-Docker部署指南.md"
      },
      {
        "title": "10. 安全配置指南",
        "rel": "docs-openclaw-10-安全配置指南",
        "sourceRel": "docs/openclaw/10-安全配置指南.md"
      },
      {
        "title": "11. 常见问题 (FAQ)",
        "rel": "docs-openclaw-11-常见问题FAQ",
        "sourceRel": "docs/openclaw/11-常见问题FAQ.md"
      },
      {
        "title": "WB-00. WorkBuddy 系列阅读指南",
        "rel": "docs-workbuddy-WB-00-阅读指南",
        "sourceRel": "docs/workbuddy/WB-00-阅读指南.md"
      },
      {
        "title": "WB-01 WorkBuddy 项目介绍：30 分钟亲手跑通第一个 AI 员工",
        "rel": "docs-workbuddy-WB-01-WorkBuddy项目介绍完整指南",
        "sourceRel": "docs/workbuddy/WB-01-WorkBuddy项目介绍完整指南.md"
      },
      {
        "title": "WB-02 WorkBuddy 安装与登录：从下载到跑通第一个任务",
        "rel": "docs-workbuddy-WB-02-WorkBuddy安装与登录完整指南",
        "sourceRel": "docs/workbuddy/WB-02-WorkBuddy安装与登录完整指南.md"
      },
      {
        "title": "WB-03 WorkBuddy 专家与专家团：把 AI 变成你的专业团队",
        "rel": "docs-workbuddy-WB-03-WorkBuddy专家与专家团完整指南",
        "sourceRel": "docs/workbuddy/WB-03-WorkBuddy专家与专家团完整指南.md"
      },
      {
        "title": "WB-04 WorkBuddy 技能与技能市场：让 AI 会干具体的活",
        "rel": "docs-workbuddy-WB-04-WorkBuddy技能与技能市场完整指南",
        "sourceRel": "docs/workbuddy/WB-04-WorkBuddy技能与技能市场完整指南.md"
      },
      {
        "title": "WB-05 WorkBuddy 连接器与腾讯生态：让 AI 伸进你的办公软件",
        "rel": "docs-workbuddy-WB-05-WorkBuddy连接器与腾讯生态完整指南",
        "sourceRel": "docs/workbuddy/WB-05-WorkBuddy连接器与腾讯生态完整指南.md"
      },
      {
        "title": "WB-06 WorkBuddy 知识库：让 AI 读你所有的资料再回答",
        "rel": "docs-workbuddy-WB-06-WorkBuddy知识库完整指南",
        "sourceRel": "docs/workbuddy/WB-06-WorkBuddy知识库完整指南.md"
      },
      {
        "title": "WB-07 WorkBuddy 自动化与计划任务：让 AI 定时和远程干活",
        "rel": "docs-workbuddy-WB-07-WorkBuddy自动化与计划任务完整指南",
        "sourceRel": "docs/workbuddy/WB-07-WorkBuddy自动化与计划任务完整指南.md"
      },
      {
        "title": "WB-08 WorkBuddy 多端协同：桌面、手机、微信无缝接力",
        "rel": "docs-workbuddy-WB-08-WorkBuddy多端协同完整指南",
        "sourceRel": "docs/workbuddy/WB-08-WorkBuddy多端协同完整指南.md"
      },
      {
        "title": "WB-09 WorkBuddy Coding Mode：办公人偶尔写点代码用",
        "rel": "docs-workbuddy-WB-09-WorkBuddy-Coding-Mode编程模式完整指南",
        "sourceRel": "docs/workbuddy/WB-09-WorkBuddy-Coding-Mode编程模式完整指南.md"
      },
      {
        "title": "WB-10 WorkBuddy 企业账号、安全与四工具对比",
        "rel": "docs-workbuddy-WB-10-WorkBuddy企业账号安全与对比完整指南",
        "sourceRel": "docs/workbuddy/WB-10-WorkBuddy企业账号安全与对比完整指南.md"
      }
    ]
  },
  {
    "id": "07-coding/vibe-coding-guide",
    "volume": "07-coding",
    "local": "vibe-coding-guide",
    "title": "Vibe Coding 完全指南",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "zhiyue/vibe-coding-guide",
    "site": null,
    "commit": "ee8434ce526f629e0ca4ce00f6a66be6372327ac",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/zhiyue/vibe-coding-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Vibe Coding 完全指南",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "第一章：什么是 Vibe Coding",
        "rel": "chapters",
        "sourceRel": "chapters/01-what-is-vibe-coding.md"
      }
    ]
  },
  {
    "id": "07-coding/liyupi-ai-guide",
    "volume": "07-coding",
    "local": "liyupi-ai-guide",
    "title": "鱼皮 AI 导航（ai-guide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "CC-BY-NC-SA-4.0（文档）+ MIT（站点代码）",
    "licenseLabel": "限非商用",
    "lang": "中文",
    "publishable": true,
    "repo": "liyupi/ai-guide",
    "site": null,
    "commit": "539082c1df5743bb34d72a17857a02735b38c866",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/liyupi/ai-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-关于DeepSeek-什么是_DeepSeek",
        "sourceRel": "AI/关于DeepSeek/什么是 DeepSeek.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-关于DeepSeek-DeepSeek_创始团队介绍",
        "sourceRel": "AI/关于DeepSeek/DeepSeek 创始团队介绍.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-关于DeepSeek-DeepSeek_发展历程",
        "sourceRel": "AI/关于DeepSeek/DeepSeek 发展历程.md"
      },
      {
        "title": "关于DeepSeek",
        "rel": "AI-关于DeepSeek-README",
        "sourceRel": "AI/关于DeepSeek/README.md"
      },
      {
        "title": "鱼皮的 AI 指南 - 0、开篇",
        "rel": "AI-鱼皮的_AI_指南-鱼皮的_AI_指南_-_0_开篇",
        "sourceRel": "AI/鱼皮的 AI 指南/鱼皮的 AI 指南 - 0、开篇.md"
      },
      {
        "title": "鱼皮的 AI 指南 - 1、AI 核心概念",
        "rel": "AI-鱼皮的_AI_指南-鱼皮的_AI_指南_-_1_AI_核心概念",
        "sourceRel": "AI/鱼皮的 AI 指南/鱼皮的 AI 指南 - 1、AI 核心概念.md"
      },
      {
        "title": "鱼皮的 AI 指南 - 2、AI 实用工具",
        "rel": "AI-鱼皮的_AI_指南-鱼皮的_AI_指南_-_2_AI_实用工具",
        "sourceRel": "AI/鱼皮的 AI 指南/鱼皮的 AI 指南 - 2、AI 实用工具.md"
      },
      {
        "title": "鱼皮的 AI 指南 - 3、AI 编程技巧",
        "rel": "AI-鱼皮的_AI_指南-鱼皮的_AI_指南_-_3_AI_编程技巧",
        "sourceRel": "AI/鱼皮的 AI 指南/鱼皮的 AI 指南 - 3、AI 编程技巧.md"
      },
      {
        "title": "鱼皮的 AI 指南 - 4、AI 编程技术",
        "rel": "AI-鱼皮的_AI_指南-鱼皮的_AI_指南_-_4_AI_编程技术",
        "sourceRel": "AI/鱼皮的 AI 指南/鱼皮的 AI 指南 - 4、AI 编程技术.md"
      },
      {
        "title": "🔥 企业级项目：开发 AI 恋爱大师应用 + 拥有自主规划能力的超级智能体",
        "rel": "AI-AI项目教程-_企业级项目_开发_AI_恋爱大师应用_拥有自主规划能力的超级智能体",
        "sourceRel": "AI/AI项目教程/🔥 企业级项目：开发 AI 恋爱大师应用 + 拥有自主规划能力的超级智能体.md"
      },
      {
        "title": "AI + Cursor 开发一个肺活量测试器",
        "rel": "AI-AI项目教程-AI_Cursor_开发一个肺活量测试器",
        "sourceRel": "AI/AI项目教程/AI + Cursor 开发一个肺活量测试器.md"
      },
      {
        "title": "AI + Cursor 开发一个模拟面试系统",
        "rel": "AI-AI项目教程-AI_Cursor_开发一个模拟面试系统",
        "sourceRel": "AI/AI项目教程/AI + Cursor 开发一个模拟面试系统.md"
      },
      {
        "title": "AI + Cursor 开发一个亲戚计算器",
        "rel": "AI-AI项目教程-AI_Cursor_开发一个亲戚计算器",
        "sourceRel": "AI/AI项目教程/AI + Cursor 开发一个亲戚计算器.md"
      },
      {
        "title": "AI 海龟汤项目教程",
        "rel": "AI-AI项目教程-AI_海龟汤项目教程",
        "sourceRel": "AI/AI项目教程/AI 海龟汤项目教程.md"
      },
      {
        "title": "AI项目教程",
        "rel": "AI-AI项目教程-README",
        "sourceRel": "AI/AI项目教程/README.md"
      },
      {
        "title": "法律人保姆级deepseek使用指南（附指令版）",
        "rel": "AI-AI应用场景-AI_办公效率-法律人保姆级deepseek使用指南_附指令版_",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/法律人保姆级deepseek使用指南（附指令版）.md"
      },
      {
        "title": "教师必备DeepSeek使用指南来了！5大教学应用场景+实操案例+隐藏用法",
        "rel": "AI-AI应用场景-AI_办公效率-教师必备DeepSeek使用指南来了_5大教学应用场景_实操案例_隐藏用法",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/教师必备DeepSeek使用指南来了！5大教学应用场景+实操案例+隐藏用法.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-利用deepseek建立专属销售知识库",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/利用deepseek建立专属销售知识库.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-如何用DeepSeek更高效地工作_10个实用技巧",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/如何用DeepSeek更高效地工作：10个实用技巧.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-手把手教你在word中接入deepseek_秒生文档材料",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/手把手教你在word中接入deepseek，秒生文档材料.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-DeepSeek_R1_个人知识库_直接起飞_",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/DeepSeek R1 + 个人知识库，直接起飞！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-DeepSeek配合KIMI_自动生成PPT_感觉自己要失业了_",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/DeepSeek配合KIMI，自动生成PPT，感觉自己要失业了！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-DeepSeek嵌入到Excel_提升10倍工作效率_太牛了_",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/DeepSeek嵌入到Excel，提升10倍工作效率，太牛了！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_办公效率-WPS里装上deepseek_简直就是办公神器",
        "sourceRel": "AI/AI应用场景/AI + 办公效率/WPS里装上deepseek，简直就是办公神器.md"
      },
      {
        "title": "💗用 DeepSeek 给对象做个网站，她一定感动坏了",
        "rel": "AI-AI应用场景-AI_编程开发-_用_DeepSeek_给对象做个网站_她一定感动坏了",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/💗用 DeepSeek 给对象做个网站，她一定感动坏了.md"
      },
      {
        "title": "1 分钟生成架构图？程序员 AI 绘图保姆级教程",
        "rel": "AI-AI应用场景-AI_编程开发-1_分钟生成架构图_程序员_AI_绘图保姆级教程",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/1 分钟生成架构图？程序员 AI 绘图保姆级教程.md"
      },
      {
        "title": "3 小时做游戏，10 天狂赚 28 万！程序员用 AI 躺赚？",
        "rel": "AI-AI应用场景-AI_编程开发-3_小时做游戏_10_天狂赚_28_万_程序员用_AI_躺赚_",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/3 小时做游戏，10 天狂赚 28 万！程序员用 AI 躺赚？.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_编程开发-教你用DeepSeek_Clien_从0到1开发一个APP",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/教你用DeepSeek+Clien，从0到1开发一个APP.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_编程开发-DeepSeek接入Python_一般电脑也能飞速跑_确实可以封神了_",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/DeepSeek接入Python，一般电脑也能飞速跑，确实可以封神了！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_编程开发-DeepSeek装进VSCode_编程非常丝滑_",
        "sourceRel": "AI/AI应用场景/AI + 编程开发/DeepSeek装进VSCode，编程非常丝滑！.md"
      },
      {
        "title": "5 个不得不收藏的 Deepseek 王炸组合！",
        "rel": "AI-AI应用场景-AI_创意设计-5_个不得不收藏的_Deepseek_王炸组合_",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/5 个不得不收藏的 Deepseek 王炸组合！.md"
      },
      {
        "title": "和 Deepseek 联手，做个哪吒的乾坤圈视频",
        "rel": "AI-AI应用场景-AI_创意设计-和_Deepseek_联手_做个哪吒的乾坤圈视频",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/和 Deepseek 联手，做个哪吒的乾坤圈视频.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_创意设计-绝绝子_用deepseek做AI视频_涨粉10W_附保姆级教程_",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/绝绝子！用deepseek做AI视频，涨粉10W+（附保姆级教程）.md"
      },
      {
        "title": "一、选定主题",
        "rel": "AI-AI应用场景-AI_创意设计-用_deepseek_做_AI_视频_绝了_和抄作业一样简单_",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/用 deepseek 做 AI 视频，绝了，和抄作业一样简单！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_创意设计-这怕是全网最强的_DeepSeek_图片教程吧_赶紧收藏了_",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/这怕是全网最强的 DeepSeek 图片教程吧，赶紧收藏了！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_创意设计-deepseek_数字人王炸组合使用方法",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/deepseek+数字人王炸组合使用方法.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_创意设计-DeepSeek一句话搞定修图难题",
        "sourceRel": "AI/AI应用场景/AI + 创意设计/DeepSeek一句话搞定修图难题.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_理财-普通人如何通过炒股买基金赚到100万_",
        "sourceRel": "AI/AI应用场景/AI + 理财/普通人如何通过炒股买基金赚到100万？.md"
      },
      {
        "title": "用DeepSeek搞钱，日赚百万",
        "rel": "AI-AI应用场景-AI_理财-用DeepSeek搞钱_日赚百万",
        "sourceRel": "AI/AI应用场景/AI + 理财/用DeepSeek搞钱，日赚百万.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_理财-用Deepseek回答_如果有100万闲钱_几年内不用_该怎么理财_",
        "sourceRel": "AI/AI应用场景/AI + 理财/用Deepseek回答：如果有100万闲钱，几年内不用，该怎么理财？.md"
      },
      {
        "title": "DeepSeek告诉我：30岁到40岁，一般会拥有这么多的存款",
        "rel": "AI-AI应用场景-AI_理财-DeepSeek告诉我_30岁到40岁_一般会拥有这么多的存款",
        "sourceRel": "AI/AI应用场景/AI + 理财/DeepSeek告诉我：30岁到40岁，一般会拥有这么多的存款.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_内容创作-3秒让DeepSeek写出爆款小红书",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/3秒让DeepSeek写出爆款小红书.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_内容创作-人有多大胆_地有多大产_如何用DeepSeek写长篇小说",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/人有多大胆，地有多大产：如何用DeepSeek写长篇小说.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_内容创作-如何利用DeepSeek进行高效内容创作",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/如何利用DeepSeek进行高效内容创作.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_内容创作-用DeepSeek写文章_这4个骚操作让你躺平也能出爆款_含提示词_",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/用DeepSeek写文章？这4个骚操作让你躺平也能出爆款！（含提示词）.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-AI应用场景-AI_内容创作-用DeepSeek做小红书真的太牛了_轻轻松松打造爆款笔记",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/用DeepSeek做小红书真的太牛了！轻轻松松打造爆款笔记.md"
      },
      {
        "title": "AI写小说怎么写？deepseek帮你写小说教程",
        "rel": "AI-AI应用场景-AI_内容创作-AI写小说怎么写_deepseek帮你写小说教程",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/AI写小说怎么写？deepseek帮你写小说教程.md"
      },
      {
        "title": "DeepSeek使用指南：提升公文、新闻与广告文案写作效率的三大技巧",
        "rel": "AI-AI应用场景-AI_内容创作-DeepSeek使用指南_提升公文_新闻与广告文案写作效率的三大技巧_",
        "sourceRel": "AI/AI应用场景/AI + 内容创作/DeepSeek使用指南：提升公文、新闻与广告文案写作效率的三大技巧 .md"
      },
      {
        "title": "AI应用场景",
        "rel": "AI-AI应用场景-README",
        "sourceRel": "AI/AI应用场景/README.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-一文详解_DeepSeek_技术架构",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/一文详解 DeepSeek 技术架构.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek_爆火逻辑_行业影响及对未来AI发展的启示",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek 爆火逻辑、行业影响及对未来AI发展的启示.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek_vs._ChatGPT_谁才是真正的王者_",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek vs. ChatGPT：谁才是真正的王者？.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek-R1_技术全景解析_从原理到实践的_炼金术配方_",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek-R1 技术全景解析：从原理到实践的“炼金术配方”.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek的优势与不足",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek的优势与不足.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek技术解读_从V3到R1的MoE架构创新",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek技术解读：从V3到R1的MoE架构创新.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_技术分析-DeepSeek最强专业拆解_清交复教授超硬核解读",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek最强专业拆解：清交复教授超硬核解读.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_模型训练-DeepSeek-R1的四个训练阶段",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 模型训练/DeepSeek-R1的四个训练阶段.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_模型训练-DeepSeek-R1的训练流程强化学习_RL_阶段采用了GRPO算法",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 模型训练/DeepSeek-R1的训练流程强化学习（RL）阶段采用了GRPO算法.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_模型训练-DeepSeek-V3_高效训练关键技术分析",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 模型训练/DeepSeek-V3 高效训练关键技术分析.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek技术解析-DeepSeek_模型训练-DeepSeek华丽文风从何而来_业内人士_训练数据_训练策略和迭代优化缺一不可",
        "sourceRel": "AI/DeepSeek技术解析/DeepSeek 模型训练/DeepSeek华丽文风从何而来？业内人士：训练数据、训练策略和迭代优化缺一不可.md"
      },
      {
        "title": "DeepSeek技术解析",
        "rel": "AI-DeepSeek技术解析-README",
        "sourceRel": "AI/DeepSeek技术解析/README.md"
      },
      {
        "title": "【汇总】满血版 DeepSeek 第三方使用渠道",
        "rel": "AI-DeepSeek使用指南-_汇总_满血版_DeepSeek_第三方使用渠道",
        "sourceRel": "AI/DeepSeek使用指南/【汇总】满血版 DeepSeek 第三方使用渠道.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-_DeepSeek_小白快速上手指南",
        "sourceRel": "AI/DeepSeek使用指南/🔥DeepSeek 小白快速上手指南.md"
      },
      {
        "title": "2分钟学会 DeepSeek API，竟然比官方更好用！",
        "rel": "AI-DeepSeek使用指南-2分钟学会_DeepSeek_API_竟然比官方更好用_",
        "sourceRel": "AI/DeepSeek使用指南/2分钟学会 DeepSeek API，竟然比官方更好用！.md"
      },
      {
        "title": "几个技巧，教你去除文章的 AI 味！",
        "rel": "AI-DeepSeek使用指南-几个技巧_教你去除文章的_AI_味_",
        "sourceRel": "AI/DeepSeek使用指南/几个技巧，教你去除文章的 AI 味！.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-普通人能用DeepSeek做什么_20个实用建议",
        "sourceRel": "AI/DeepSeek使用指南/普通人能用DeepSeek做什么？20个实用建议.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-如何在iPhone上用语音调用Deepseek",
        "sourceRel": "AI/DeepSeek使用指南/如何在iPhone上用语音调用Deepseek.md"
      },
      {
        "title": "完整攻略：如何用好DeepSeek，一文汇总！",
        "rel": "AI-DeepSeek使用指南-完整攻略_如何用好DeepSeek_一文汇总_",
        "sourceRel": "AI/DeepSeek使用指南/完整攻略：如何用好DeepSeek，一文汇总！.md"
      },
      {
        "title": "最新清华大学DeepSeek使用手册第1-5版，官方完整版PDF免费下载",
        "rel": "AI-DeepSeek使用指南-最新清华大学DeepSeek使用手册第1-5版_官方完整版PDF免费下载",
        "sourceRel": "AI/DeepSeek使用指南/最新清华大学DeepSeek使用手册第1-5版，官方完整版PDF免费下载.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-DeepSeek_本地部署教程",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 本地部署教程.md"
      },
      {
        "title": "DeepSeek 发布新模型 V3-0324，附使用教程",
        "rel": "AI-DeepSeek使用指南-DeepSeek_发布新模型_V3-0324_附使用教程",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 发布新模型 V3-0324，附使用教程.md"
      },
      {
        "title": "50个常用的DeepSeek模仿风格提示词，去AI味的大杀器",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-50个常用的DeepSeek模仿风格提示词_去AI味的大杀器",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/50个常用的DeepSeek模仿风格提示词，去AI味的大杀器.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-普通人也能轻松掌握的_20_个_DeepSeek_高频提示词_2025版_",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/普通人也能轻松掌握的 20 个 DeepSeek 高频提示词（2025版）.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-吐血整理_DeepSeek神级指令_好用到爆_",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/吐血整理！DeepSeek神级指令，好用到爆！.md"
      },
      {
        "title": "我发现了 DeepSeek 去 AI 味的捷径，太香了！",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-我发现了_DeepSeek_去_AI_味的捷径_太香了",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/我发现了 DeepSeek 去 AI 味的捷径，太香了.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-DeepSeek_提示词基本法则",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/DeepSeek 提示词基本法则.md"
      },
      {
        "title": "鱼皮 AI 导航（ai-guide）",
        "rel": "AI-DeepSeek使用指南-DeepSeek_提问技巧-DeepSeek不好用_那是你还不知道这些指令_",
        "sourceRel": "AI/DeepSeek使用指南/DeepSeek 提问技巧/DeepSeek不好用？那是你还不知道这些指令！.md"
      },
      {
        "title": "DeepSeek使用指南",
        "rel": "AI-DeepSeek使用指南-README",
        "sourceRel": "AI/DeepSeek使用指南/README.md"
      },
      {
        "title": "AI",
        "rel": "AI-README",
        "sourceRel": "AI/README.md"
      },
      {
        "title": "OpenClaw 保姆级教程导读",
        "rel": "OpenClaw_保姆级教程-00_OpenClaw_保姆级教程导读",
        "sourceRel": "OpenClaw 保姆级教程/00 OpenClaw 保姆级教程导读.md"
      },
      {
        "title": "OpenClaw 是什么",
        "rel": "OpenClaw_保姆级教程-01_OpenClaw_是什么",
        "sourceRel": "OpenClaw 保姆级教程/01 OpenClaw 是什么.md"
      },
      {
        "title": "本地安装 OpenClaw",
        "rel": "OpenClaw_保姆级教程-02_本地安装_OpenClaw",
        "sourceRel": "OpenClaw 保姆级教程/02 本地安装 OpenClaw.md"
      },
      {
        "title": "OpenClaw 一键安装脚本",
        "rel": "OpenClaw_保姆级教程-03_OpenClaw_一键安装脚本",
        "sourceRel": "OpenClaw 保姆级教程/03 OpenClaw 一键安装脚本.md"
      },
      {
        "title": "云端部署 OpenClaw",
        "rel": "OpenClaw_保姆级教程-04_云端部署_OpenClaw",
        "sourceRel": "OpenClaw 保姆级教程/04 云端部署 OpenClaw.md"
      },
      {
        "title": "OpenClaw 一站式部署平台大全",
        "rel": "OpenClaw_保姆级教程-05_OpenClaw_一站式部署平台大全",
        "sourceRel": "OpenClaw 保姆级教程/05 OpenClaw 一站式部署平台大全.md"
      },
      {
        "title": "OpenClaw 接入 QQ 和飞书",
        "rel": "OpenClaw_保姆级教程-06_OpenClaw_接入_QQ_和飞书",
        "sourceRel": "OpenClaw 保姆级教程/06 OpenClaw 接入 QQ 和飞书.md"
      },
      {
        "title": "OpenClaw 初始化和基础使用",
        "rel": "OpenClaw_保姆级教程-07_OpenClaw_初始化和基础使用",
        "sourceRel": "OpenClaw 保姆级教程/07 OpenClaw 初始化和基础使用.md"
      },
      {
        "title": "OpenClaw 模型选择与切换",
        "rel": "OpenClaw_保姆级教程-08_OpenClaw_模型选择与切换",
        "sourceRel": "OpenClaw 保姆级教程/08 OpenClaw 模型选择与切换.md"
      },
      {
        "title": "OpenClaw 工具管理与多媒体能力",
        "rel": "OpenClaw_保姆级教程-09_OpenClaw_工具管理与多媒体能力",
        "sourceRel": "OpenClaw 保姆级教程/09 OpenClaw 工具管理与多媒体能力.md"
      },
      {
        "title": "OpenClaw Skills 技能系统",
        "rel": "OpenClaw_保姆级教程-10_OpenClaw_Skills_技能系统",
        "sourceRel": "OpenClaw 保姆级教程/10 OpenClaw Skills 技能系统.md"
      },
      {
        "title": "OpenClaw 定时任务与自动化",
        "rel": "OpenClaw_保姆级教程-11_OpenClaw_定时任务与自动化",
        "sourceRel": "OpenClaw 保姆级教程/11 OpenClaw 定时任务与自动化.md"
      },
      {
        "title": "OpenClaw 多 Agent 协作",
        "rel": "OpenClaw_保姆级教程-12_OpenClaw_多_Agent_协作",
        "sourceRel": "OpenClaw 保姆级教程/12 OpenClaw 多 Agent 协作.md"
      },
      {
        "title": "OpenClaw 记忆管理与成本控制",
        "rel": "OpenClaw_保姆级教程-13_OpenClaw_记忆管理与成本控制",
        "sourceRel": "OpenClaw 保姆级教程/13 OpenClaw 记忆管理与成本控制.md"
      },
      {
        "title": "OpenClaw 安全指南",
        "rel": "OpenClaw_保姆级教程-14_OpenClaw_安全指南",
        "sourceRel": "OpenClaw 保姆级教程/14 OpenClaw 安全指南.md"
      },
      {
        "title": "OpenClaw 一键卸载脚本",
        "rel": "OpenClaw_保姆级教程-15_OpenClaw_一键卸载脚本",
        "sourceRel": "OpenClaw 保姆级教程/15 OpenClaw 一键卸载脚本.md"
      },
      {
        "title": "番外 OpenClaw 创始人的故事",
        "rel": "OpenClaw_保姆级教程-番外_-_OpenClaw_创始人的故事",
        "sourceRel": "OpenClaw 保姆级教程/番外 - OpenClaw 创始人的故事.md"
      },
      {
        "title": "OpenClaw 接入微信保姆级教程",
        "rel": "OpenClaw_保姆级教程-OpenClaw_接入微信保姆级教程",
        "sourceRel": "OpenClaw 保姆级教程/OpenClaw 接入微信保姆级教程.md"
      },
      {
        "title": "OpenClaw 实战 用 GLM-5 打造你的 AI 伴侣",
        "rel": "OpenClaw_保姆级教程-OpenClaw_实战_-_用_GLM-5_打造你的_AI_伴侣",
        "sourceRel": "OpenClaw 保姆级教程/OpenClaw 实战 - 用 GLM-5 打造你的 AI 伴侣.md"
      },
      {
        "title": "Vibe Coding 简介",
        "rel": "Vibe_Coding_零基础教程-00_Vibe_Coding_简介",
        "sourceRel": "Vibe Coding 零基础教程/00 Vibe Coding 简介.md"
      },
      {
        "title": "快速上手 Vibe Coding",
        "rel": "Vibe_Coding_零基础教程-01_快速上手_Vibe_Coding",
        "sourceRel": "Vibe Coding 零基础教程/01 快速上手 Vibe Coding.md"
      },
      {
        "title": "AI 编程学习路线：我们学 AI 编程时，到底在学什么？",
        "rel": "Vibe_Coding_零基础教程-02_AI_编程学习路线",
        "sourceRel": "Vibe Coding 零基础教程/02 AI 编程学习路线.md"
      },
      {
        "title": "AI 编程工具大全",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-00_AI_编程工具大全",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/00 AI 编程工具大全.md"
      },
      {
        "title": "AI 模型选择指南",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-01_AI_模型选择指南",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/01 AI 模型选择指南.md"
      },
      {
        "title": "AI 零代码平台",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-02_AI_零代码平台",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/02 AI 零代码平台.md"
      },
      {
        "title": "AI 智能体平台",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-03_AI_智能体平台",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/03 AI 智能体平台.md"
      },
      {
        "title": "AI 代码编辑器",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-04_AI_代码编辑器",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/04 AI 代码编辑器.md"
      },
      {
        "title": "AI 命令行编程工具",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-05_AI_命令行编程工具",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/05 AI 命令行编程工具.md"
      },
      {
        "title": "AI IDE 插件",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-06_AI_IDE_插件",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/06 AI IDE 插件.md"
      },
      {
        "title": "OpenClaw 保姆级安装教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-07_OpenClaw_保姆级安装教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/07 OpenClaw 保姆级安装教程.md"
      },
      {
        "title": "AI 辅助工具集",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-08_AI_辅助工具集",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/08 AI 辅助工具集.md"
      },
      {
        "title": "我的 AI 工具箱推荐",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-09_我的_AI_工具箱推荐",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/09 我的 AI 工具箱推荐.md"
      },
      {
        "title": "优质 AI 编程扩展推荐",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-10_优质_AI_编程扩展推荐",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/10 优质 AI 编程扩展推荐.md"
      },
      {
        "title": "盘点 32 个 AI 编程工具，一口气全部介绍！",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-盘点_32_个_AI_编程工具",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/盘点 32 个 AI 编程工具.md"
      },
      {
        "title": "在 IDEA 中使用 AI 编程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-在_IDEA_中使用_AI_编程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/在 IDEA 中使用 AI 编程.md"
      },
      {
        "title": "Agent Skills：通用 AI 技能库",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Agent_Skills_通用_AI_技能库",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Agent Skills：通用 AI 技能库.md"
      },
      {
        "title": "Dify：零代码 AI 应用开发平台",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Dify_零代码_AI_应用开发平台",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Dify：零代码 AI 应用开发平台.md"
      },
      {
        "title": "Gemini CLI：Google 的免费 AI 命令行工具实测",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Gemini_CLI_首测_免费开源很香_但坑点很多_",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Gemini CLI 首测：免费开源很香，但坑点很多！.md"
      },
      {
        "title": "GitHub Copilot 云端 AI 自动开发实战",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-GitHub_Copilot_云端_AI_自动开发实战",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/GitHub Copilot 云端 AI 自动开发实战.md"
      },
      {
        "title": "GLM-5 + OpenClaw：打造你的 AI 伴侣",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-GLM-5_OpenClaw_打造你的_AI_伴侣",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/GLM-5 + OpenClaw：打造你的 AI 伴侣.md"
      },
      {
        "title": "Matt Pocock Skills：真实工程技能库",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Matt_Pocock_Skills_真实工程技能库",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Matt Pocock Skills：真实工程技能库.md"
      },
      {
        "title": "OpenClaw：部署你的 AI 数字员工",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-OpenClaw_部署你的_AI_数字员工",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/OpenClaw：部署你的 AI 数字员工.md"
      },
      {
        "title": "OpenCode：开源免费的 AI 命令行工具实测",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-OpenCode_开源免费的_AI_命令行工具实测",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/OpenCode：开源免费的 AI 命令行工具实测.md"
      },
      {
        "title": "OpenSpec：轻量规范开发框架",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-OpenSpec_轻量规范开发框架",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/OpenSpec：轻量规范开发框架.md"
      },
      {
        "title": "Remotion：用 AI 编程做动画视频",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Remotion_用_AI_编程做动画视频",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Remotion：用 AI 编程做动画视频.md"
      },
      {
        "title": "Spec-kit：规范驱动开发框架",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Spec-kit_规范驱动开发框架",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Spec-kit：规范驱动开发框架.md"
      },
      {
        "title": "Superpowers：核心技能库",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-Superpowers_核心技能库",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/Superpowers：核心技能库.md"
      },
      {
        "title": "TRAE SOLO：AI 主导的全栈开发工具",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-TRAE_SOLO_AI_主导的全栈开发工具",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/TRAE SOLO：AI 主导的全栈开发工具.md"
      },
      {
        "title": "VSCode + GitHub Copilot：微软全家桶的 AI 编程实战",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-工具实战-VSCode_GitHub_Copilot_微软全家桶的_AI_编程实战",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/工具实战/VSCode + GitHub Copilot：微软全家桶的 AI 编程实战.md"
      },
      {
        "title": "用好 CLAUDE.md，让你的 AI 编程效率翻倍！",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-用好_CLAUDE_md_让_AI_编程效率翻倍",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/用好 CLAUDE.md 让 AI 编程效率翻倍.md"
      },
      {
        "title": "Claude Code 常用斜杠命令大全，用好了效率翻倍！",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-Claude_Code_常用斜杠命令大全",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/Claude Code 常用斜杠命令大全.md"
      },
      {
        "title": "Claude Code 封号机制和应对方案",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-Claude_Code_封号机制和应对方案",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/Claude Code 封号机制和应对方案.md"
      },
      {
        "title": "Claude Code 和 Codex 对接国内模型教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-Claude_Code_和_Codex_对接国内模型教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/Claude Code 和 Codex 对接国内模型教程.md"
      },
      {
        "title": "Claude Code 配置哲学：官方亲自教你怎么「调教」AI",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-Claude_Code_配置哲学_七种指令方式全解析",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/Claude Code 配置哲学：七种指令方式全解析.md"
      },
      {
        "title": "Claude Code 验证循环实战教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Claude_Code-Claude_Code_验证循环实战教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Claude Code/Claude Code 验证循环实战教程.md"
      },
      {
        "title": "Codex 主题定制教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Codex-Codex_主题定制教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Codex/Codex 主题定制教程.md"
      },
      {
        "title": "Codex Record & Replay：录制功能教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Codex-Codex_Record_Replay_录制功能教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Codex/Codex Record & Replay：录制功能教程.md"
      },
      {
        "title": "Codex：AI 桌面应用保姆级教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Codex-Codex_AI_桌面应用保姆级教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Codex/Codex：AI 桌面应用保姆级教程.md"
      },
      {
        "title": "Cursor 保姆级教程：一篇搞定 AI 编程第一课",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Cursor-Cursor_保姆级教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Cursor/Cursor 保姆级教程.md"
      },
      {
        "title": "Cursor Debug 模式详解",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-Cursor-Cursor_Debug_模式详解",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/Cursor/Cursor Debug 模式详解.md"
      },
      {
        "title": "DeepSeek Harness 保姆级入门教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_保姆级入门教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness 保姆级入门教程.md"
      },
      {
        "title": "DeepSeek Harness 服务器部署教程",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_服务器部署教程",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness 服务器部署教程.md"
      },
      {
        "title": "DeepSeek Harness 极简模式实测",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_极简模式实测",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness 极简模式实测.md"
      },
      {
        "title": "DeepSeek Harness 精选插件推荐",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_精选插件推荐",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness 精选插件推荐.md"
      },
      {
        "title": "DeepSeek Harness 三大进阶玩法",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_三大进阶玩法",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness 三大进阶玩法.md"
      },
      {
        "title": "DeepSeek Harness Agent 预设详解",
        "rel": "Vibe_Coding_零基础教程-10_编程工具-DeepSeek_Harness-DeepSeek_Harness_Agent_预设详解",
        "sourceRel": "Vibe Coding 零基础教程/10 编程工具/DeepSeek Harness/DeepSeek Harness Agent 预设详解.md"
      },
      {
        "title": "模型动态",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-00_模型动态导读",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/00 模型动态导读.md"
      },
      {
        "title": "小米 MiMo 编程能力实测 - 4 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-小米_MiMo_编程能力实测_-_4_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/小米 MiMo 编程能力实测 - 4 个项目案例.md"
      },
      {
        "title": "Claude Fable 5 编程能力实测 - 对比 Opus 4.8 和 GPT-5.5",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-Claude_Fable_5_编程能力实测_-_对比_Opus_4.8_和_GPT-5.5",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/Claude Fable 5 编程能力实测 - 对比 Opus 4.8 和 GPT-5.5.md"
      },
      {
        "title": "Claude Fable 5.1 编程能力实测 - 3 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-Claude_Fable_5.1_编程能力实测_-_3_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/Claude Fable 5.1 编程能力实测 - 3 个项目案例.md"
      },
      {
        "title": "Claude Opus 5 编程能力实测 - 7 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-Claude_Opus_5_编程能力实测_-_7_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/Claude Opus 5 编程能力实测 - 7 个项目案例.md"
      },
      {
        "title": "DeepSeek V4 Flash Vision 视觉能力实测 - 8 个场景",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-DeepSeek_V4_Flash_Vision_视觉能力实测_-_8_个场景",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/DeepSeek V4 Flash Vision 视觉能力实测 - 8 个场景.md"
      },
      {
        "title": "DeepSeek V4 Pro 编程能力实测 - 7 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-DeepSeek_V4_Pro_编程能力实测_-_7_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/DeepSeek V4 Pro 编程能力实测 - 7 个项目案例.md"
      },
      {
        "title": "GLM-5.3 三模型横评 - DeepSeek Harness 统一评测",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-GLM-5.3_三模型横评_-_DeepSeek_Harness_统一评测",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/GLM-5.3 三模型横评 - DeepSeek Harness 统一评测.md"
      },
      {
        "title": "GLM-5.3-Flash 编程能力实测 - 3 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-GLM-5.3-Flash_编程能力实测_-_3_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/GLM-5.3-Flash 编程能力实测 - 3 个项目案例.md"
      },
      {
        "title": "GPT-5.6 三模型横评 - 全栈项目实测",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-GPT-5.6_三模型横评_-_全栈项目实测",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/GPT-5.6 三模型横评 - 全栈项目实测.md"
      },
      {
        "title": "Kimi K3 编程能力实测 - 7 个项目案例",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-Kimi_K3_编程能力实测_-_7_个项目案例",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/Kimi K3 编程能力实测 - 7 个项目案例.md"
      },
      {
        "title": "Opus 4.8 四模型横评 - 全栈项目实测",
        "rel": "Vibe_Coding_零基础教程-15_模型动态-Opus_4.8_四模型横评_-_全栈项目实测",
        "sourceRel": "Vibe Coding 零基础教程/15 模型动态/Opus 4.8 四模型横评 - 全栈项目实测.md"
      },
      {
        "title": "Vibe Coding 项目实战导读",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-00_Vibe_Coding_项目实战导读",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/00 Vibe Coding 项目实战导读.md"
      },
      {
        "title": "Vibe Coding 项目开发流程",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-01_Vibe_Coding_项目开发流程",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/01 Vibe Coding 项目开发流程.md"
      },
      {
        "title": "Vibe Coding 个人工具开发",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-02_Vibe_Coding_个人工具开发",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/02 Vibe Coding 个人工具开发.md"
      },
      {
        "title": "Vibe Coding AI 应用开发",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-03_Vibe_Coding_AI_应用开发",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/03 Vibe Coding AI 应用开发.md"
      },
      {
        "title": "Vibe Coding 全栈应用开发",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-04_Vibe_Coding_全栈应用开发",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/04 Vibe Coding 全栈应用开发.md"
      },
      {
        "title": "Vibe Coding 小程序开发",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-05_Vibe_Coding_小程序开发",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/05 Vibe Coding 小程序开发.md"
      },
      {
        "title": "项目部署上线教程",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-06_项目部署上线教程",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/06 项目部署上线教程.md"
      },
      {
        "title": "Vibe Coding 项目灵感大全",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-10_Vibe_Coding_项目灵感大全",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/10 Vibe Coding 项目灵感大全.md"
      },
      {
        "title": "更多企业级 AI 编程实战项目",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-进阶_-_企业级_AI_编程实战项目",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/进阶 - 企业级 AI 编程实战项目.md"
      },
      {
        "title": "企业项目开发流程",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-进阶_-_企业项目开发流程",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/进阶 - 企业项目开发流程.md"
      },
      {
        "title": "AI 创意应用 - 程序员人格测试 CBTI 项目",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-AI_创意应用_-_程序员人格测试_CBTI_项目",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/AI 创意应用 - 程序员人格测试 CBTI 项目.md"
      },
      {
        "title": "AI 创意应用 - 高考分数预测器项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-AI_创意应用_-_高考分数预测器项目",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/AI 创意应用 - 高考分数预测器项目.md"
      },
      {
        "title": "AI 创意应用 - 互联网数字墓园项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-AI_创意应用_-_互联网数字墓园项目",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/AI 创意应用 - 互联网数字墓园项目.md"
      },
      {
        "title": "AI 创意应用 - 蒸馏自己成 Skill 项目",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-AI_创意应用_-_蒸馏自己成_Skill_项目",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/AI 创意应用 - 蒸馏自己成 Skill 项目.md"
      },
      {
        "title": "Claude Code - AI 提肛助手项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-Claude_Code_-_AI_提肛助手项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/Claude Code - AI 提肛助手项目实战.md"
      },
      {
        "title": "Cursor + Claude Opus 5 - 以撒的结合肉鸽游戏项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-Cursor_Claude_Opus_5_-_以撒的结合肉鸽游戏项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/Cursor + Claude Opus 5 - 以撒的结合肉鸽游戏项目实战.md"
      },
      {
        "title": "DeepSeek + 火山 - AI 海龟汤游戏项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-DeepSeek_火山_-_AI_海龟汤游戏项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/DeepSeek + 火山 - AI 海龟汤游戏项目实战.md"
      },
      {
        "title": "GitHub Copilot - AI 塔罗牌占卜项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_创意应用-GitHub_Copilot_-_AI_塔罗牌占卜网站项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 创意应用/GitHub Copilot - AI 塔罗牌占卜网站项目实战.md"
      },
      {
        "title": "Cursor + Claude Fable 5 - 装了吗桌面 APP 项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_跨端应用-Cursor_Claude_Fable_5_-_装了吗桌面_APP_项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 跨端应用/Cursor + Claude Fable 5 - 装了吗桌面 APP 项目实战.md"
      },
      {
        "title": "Cursor + Cordova - 表情包生成器 APP 项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_跨端应用-Cursor_Cordova_-_表情包生成器_APP_项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 跨端应用/Cursor + Cordova - 表情包生成器 APP 项目实战.md"
      },
      {
        "title": "GitHub Copilot - AI 闯关学习小程序项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_跨端应用-GitHub_Copilot_-_AI_闯关学习小程序项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 跨端应用/GitHub Copilot - AI 闯关学习小程序项目实战.md"
      },
      {
        "title": "GLM + Claude Code - AI 命令行编程工具项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_跨端应用-GLM_Claude_Code_-_AI_命令行编程工具项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 跨端应用/GLM + Claude Code - AI 命令行编程工具项目实战.md"
      },
      {
        "title": "TRAE - AI 学习英雄小程序实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_跨端应用-TRAE_-_AI_学习英雄小程序实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 跨端应用/TRAE - AI 学习英雄小程序实战.md"
      },
      {
        "title": "Codex - AI 开源项目学习网站项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Codex_-_AI_开源项目学习网站项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Codex - AI 开源项目学习网站项目实战.md"
      },
      {
        "title": "Codex + GPT-5.5 实战：手把手开发一个 AI 搜索引擎",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Codex_GPT-5.5_-_AI_搜索引擎项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Codex + GPT-5.5 - AI 搜索引擎项目实战.md"
      },
      {
        "title": "Cursor - AI 万能视频下载总结器项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Cursor_-_AI_万能视频下载总结器项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Cursor - AI 万能视频下载总结器项目实战.md"
      },
      {
        "title": "Cursor - GitHub 文档翻译工具项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Cursor_-_GitHub_文档翻译工具项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Cursor - GitHub 文档翻译工具项目实战.md"
      },
      {
        "title": "EdgeOne Makers - AI 副业点子验证器项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-EdgeOne_Makers_-_AI_副业点子验证器项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/EdgeOne Makers - AI 副业点子验证器项目实战.md"
      },
      {
        "title": "GitHub Copilot - AI 热点监控工具项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-GitHub_Copilot_-_AI_热点监控工具项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/GitHub Copilot - AI 热点监控工具项目实战.md"
      },
      {
        "title": "Kimi K2 - AI 文档阅读助手项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Kimi_K2_-_AI_文档阅读助手项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Kimi K2 - AI 文档阅读助手项目实战.md"
      },
      {
        "title": "LangChain + LangGraph - AI 智能 PPT 生成器项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-LangChain_LangGraph_-_AI_智能_PPT_生成器项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/LangChain + LangGraph - AI 智能 PPT 生成器项目实战.md"
      },
      {
        "title": "Vercel AI 网关 - AI 减压小能手项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_实用工具-Vercel_AI_网关_-_AI_减压小能手项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 实用工具/Vercel AI 网关 - AI 减压小能手项目实战.md"
      },
      {
        "title": "Cursor + LangChain4j - AI 程序员技术练兵场项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_智能体和平台-进阶_-_Cursor_LangChain4j_-_AI_程序员技术练兵场项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 智能体和平台/进阶 - Cursor + LangChain4j - AI 程序员技术练兵场项目实战.md"
      },
      {
        "title": "LangChain4j + 多智能体 - AI 零代码应用生成平台项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_智能体和平台-进阶_-_LangChain4j_多智能体_-_AI_零代码应用生成平台项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 智能体和平台/进阶 - LangChain4j + 多智能体 - AI 零代码应用生成平台项目实战.md"
      },
      {
        "title": "Spring AI - AI 超级智能体项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_智能体和平台-进阶_-_Spring_AI_-_AI_超级智能体项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 智能体和平台/进阶 - Spring AI - AI 超级智能体项目实战.md"
      },
      {
        "title": "DeepSeek V4 + Claude Code 手把手带你搞一个 API 中转站",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_智能体和平台-Claude_Code_DeepSeek_-_API_中转站项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 智能体和平台/Claude Code + DeepSeek - API 中转站项目实战.md"
      },
      {
        "title": "Cursor + LangChain4j - AI 编程助手项目实战",
        "rel": "Vibe_Coding_零基础教程-20_项目实战-AI_智能体和平台-Cursor_LangChain4j_-_AI_编程助手项目实战",
        "sourceRel": "Vibe Coding 零基础教程/20 项目实战/AI 智能体和平台/Cursor + LangChain4j - AI 编程助手项目实战.md"
      },
      {
        "title": "Vibe Coding 经验技巧总览",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-00_Vibe_Coding_经验技巧总览",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/00 Vibe Coding 经验技巧总览.md"
      },
      {
        "title": "Vibe Coding 五大核心心法",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-01_Vibe_Coding_五大核心心法",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/01 Vibe Coding 五大核心心法.md"
      },
      {
        "title": "Vibe Coding 对话工程技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-02_Vibe_Coding_对话工程技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/02 Vibe Coding 对话工程技巧.md"
      },
      {
        "title": "Vibe Coding 上下文管理技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-03_Vibe_Coding_上下文管理技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/03 Vibe Coding 上下文管理技巧.md"
      },
      {
        "title": "Vibe Coding 幻觉和死循环处理",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-04_Vibe_Coding_幻觉和死循环处理",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/04 Vibe Coding 幻觉和死循环处理.md"
      },
      {
        "title": "Vibe Coding 效率提升技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-05_Vibe_Coding_效率提升技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/05 Vibe Coding 效率提升技巧.md"
      },
      {
        "title": "Vibe Coding 代码质量保障",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-06_Vibe_Coding_代码质量保障",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/06 Vibe Coding 代码质量保障.md"
      },
      {
        "title": "Vibe Coding 代码重构技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-07_Vibe_Coding_代码重构技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/07 Vibe Coding 代码重构技巧.md"
      },
      {
        "title": "Vibe Coding 性能优化技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-08_Vibe_Coding_性能优化技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/08 Vibe Coding 性能优化技巧.md"
      },
      {
        "title": "Vibe Coding 安全防护技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-09_Vibe_Coding_安全防护技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/09 Vibe Coding 安全防护技巧.md"
      },
      {
        "title": "Vibe Coding 成本控制技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-10_Vibe_Coding_成本控制技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/10 Vibe Coding 成本控制技巧.md"
      },
      {
        "title": "Vibe Coding 团队协作技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-11_Vibe_Coding_团队协作技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/11 Vibe Coding 团队协作技巧.md"
      },
      {
        "title": "Vibe Coding 网站美化技巧",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-12_Vibe_Coding_网站美化技巧",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/12 Vibe Coding 网站美化技巧.md"
      },
      {
        "title": "Anthropic 官方 - 大规模代码迁移方法",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-大厂_AI_编程经验-Anthropic_官方_-_大规模代码迁移方法",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/大厂 AI 编程经验/Anthropic 官方 - 大规模代码迁移方法.md"
      },
      {
        "title": "Anthropic 官方 - 人机协作团队方法",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-大厂_AI_编程经验-Anthropic_官方_-_人机协作团队方法",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/大厂 AI 编程经验/Anthropic 官方 - 人机协作团队方法.md"
      },
      {
        "title": "Anthropic 官方 - 提示词精简方法",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-大厂_AI_编程经验-Anthropic_官方_-_提示词精简方法",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/大厂 AI 编程经验/Anthropic 官方 - 提示词精简方法.md"
      },
      {
        "title": "用 grill-me 让 AI 拷问你的需求",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-用_grill-me_让_AI_拷问你的需求",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/用 grill-me 让 AI 拷问你的需求.md"
      },
      {
        "title": "鱼皮的 AI 工作流分享",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-鱼皮的_AI_工作流分享",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/鱼皮的 AI 工作流分享.md"
      },
      {
        "title": "Harness Engineering 保姆级教程",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-Harness_Engineering_保姆级教程",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/Harness Engineering 保姆级教程.md"
      },
      {
        "title": "Loop Engineering 保姆级教程",
        "rel": "Vibe_Coding_零基础教程-30_经验技巧-Loop_Engineering_保姆级教程",
        "sourceRel": "Vibe Coding 零基础教程/30 经验技巧/Loop Engineering 保姆级教程.md"
      },
      {
        "title": "编程学习路线大全",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-01_编程学习路线",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/01 编程学习路线.md"
      },
      {
        "title": "编程知识百科",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-02_编程知识百科",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/02 编程知识百科.md"
      },
      {
        "title": "编程资源大全",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-03_编程资源大全",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/03 编程资源大全.md"
      },
      {
        "title": "AI 编程技术入门指南",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-04_AI_编程技术",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/04 AI 编程技术.md"
      },
      {
        "title": "程序员 AI 绘图完全指南",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-05_AI_绘图指南",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/05 AI 绘图指南.md"
      },
      {
        "title": "AI 应用开发面试必知必会",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-06_AI_应用开发面试题",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/06 AI 应用开发面试题.md"
      },
      {
        "title": "程序员简历模板",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-07_程序员简历模板",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/07 程序员简历模板.md"
      },
      {
        "title": "程序员面试刷题神器",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-08_程序员面试刷题",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/08 程序员面试刷题.md"
      },
      {
        "title": "程序员高效工作技巧",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-09_程序员工作技巧",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/09 程序员工作技巧.md"
      },
      {
        "title": "程序员快速成长的六大方法",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-10_程序员成长大法",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/10 程序员成长大法.md"
      },
      {
        "title": "程序员必备软件工具推荐",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-11_编程工具大全",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/11 编程工具大全.md"
      },
      {
        "title": "团队研发规范",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-团队研发规范",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/团队研发规范.md"
      },
      {
        "title": "AI 编程时代，哪些技术必须要了解？",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-AI_编程技术栈速查",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/AI 编程技术栈速查.md"
      },
      {
        "title": "AI 时代程序员必须做的 20 件事",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-AI_时代程序员必须做的_20_件事",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/AI 时代程序员必须做的 20 件事.md"
      },
      {
        "title": "AI 时代新岗位 FDE 前线部署工程师",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-AI_时代新岗位_FDE_前线部署工程师",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/AI 时代新岗位 FDE 前线部署工程师.md"
      },
      {
        "title": "MCP 服务开发保姆级教程",
        "rel": "Vibe_Coding_零基础教程-40_编程学习-MCP_服务开发",
        "sourceRel": "Vibe Coding 零基础教程/40 编程学习/MCP 服务开发.md"
      },
      {
        "title": "产品变现导读",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-00_产品变现导读",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/00 产品变现导读.md"
      },
      {
        "title": "为什么要做产品变现？",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-01_为什么要做产品变现_",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/01 为什么要做产品变现？.md"
      },
      {
        "title": "需求分析和产品规划",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-02_需求分析和产品规划",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/02 需求分析和产品规划.md"
      },
      {
        "title": "文档沉淀和知识管理",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-03_文档沉淀和知识管理",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/03 文档沉淀和知识管理.md"
      },
      {
        "title": "技术选型实战指南",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-04_技术选型实战指南",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/04 技术选型实战指南.md"
      },
      {
        "title": "系统架构设计实践",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-05_系统架构设计实践",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/05 系统架构设计实践.md"
      },
      {
        "title": "项目研发流程选择",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-06_项目研发流程选择",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/06 项目研发流程选择.md"
      },
      {
        "title": "产品盈利模式设计",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-07_产品盈利模式设计",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/07 产品盈利模式设计.md"
      },
      {
        "title": "产品付费策略设计",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-08_产品付费策略设计",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/08 产品付费策略设计.md"
      },
      {
        "title": "SEO 搜索引擎优化实战",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-09_SEO_搜索引擎优化实战",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/09 SEO 搜索引擎优化实战.md"
      },
      {
        "title": "GEO 生成式引擎优化实战",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-10_GEO_生成式引擎优化实战",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/10 GEO 生成式引擎优化实战.md"
      },
      {
        "title": "网站数据保护实践",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-网站数据保护实践",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/网站数据保护实践.md"
      },
      {
        "title": "网站数据分析实战",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-网站数据分析实战",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/网站数据分析实战.md"
      },
      {
        "title": "我的 GitHub 涨星涨粉技巧",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-我的_GitHub_涨星涨粉技巧",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/我的 GitHub 涨星涨粉技巧.md"
      },
      {
        "title": "我的个人站长实战经验",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-我的个人站长实战经验",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/我的个人站长实战经验.md"
      },
      {
        "title": "我的自媒体起号经验",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-我的自媒体起号经验",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/我的自媒体起号经验.md"
      },
      {
        "title": "我的自媒体涨粉运营之路",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-我的自媒体涨粉运营之路",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/我的自媒体涨粉运营之路.md"
      },
      {
        "title": "系统监控告警实践",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-系统监控告警实践",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/系统监控告警实践.md"
      },
      {
        "title": "云服务安全防护实践",
        "rel": "Vibe_Coding_零基础教程-50_产品变现-云服务安全防护实践",
        "sourceRel": "Vibe Coding 零基础教程/50 产品变现/云服务安全防护实践.md"
      },
      {
        "title": "Vibe Coding 资源大全",
        "rel": "Vibe_Coding_零基础教程-60_Vibe_Coding_资源大全",
        "sourceRel": "Vibe Coding 零基础教程/60 Vibe Coding 资源大全.md"
      },
      {
        "title": "鱼皮的 AI 编程实战视频课",
        "rel": "Vibe_Coding_零基础教程-65_鱼皮的_AI_编程实战视频课",
        "sourceRel": "Vibe Coding 零基础教程/65 鱼皮的 AI 编程实战视频课.md"
      },
      {
        "title": "Vibe Coding 概念大全",
        "rel": "Vibe_Coding_零基础教程-70_AI_编程概念大全-00_Vibe_Coding_概念大全",
        "sourceRel": "Vibe Coding 零基础教程/70 AI 编程概念大全/00 Vibe Coding 概念大全.md"
      },
      {
        "title": "面试官问「AI 应用怎么开发」，别说只会调 API！",
        "rel": "Vibe_Coding_零基础教程-70_AI_编程概念大全-主流_AI_应用开发模式",
        "sourceRel": "Vibe Coding 零基础教程/70 AI 编程概念大全/主流 AI 应用开发模式.md"
      },
      {
        "title": "AI 大模型到底是怎么工作的？一篇文章给你讲明白",
        "rel": "Vibe_Coding_零基础教程-70_AI_编程概念大全-AI_大模型原理入门",
        "sourceRel": "Vibe Coding 零基础教程/70 AI 编程概念大全/AI 大模型原理入门.md"
      },
      {
        "title": "AI 动态工作流详解",
        "rel": "Vibe_Coding_零基础教程-70_AI_编程概念大全-AI_动态工作流详解",
        "sourceRel": "Vibe Coding 零基础教程/70 AI 编程概念大全/AI 动态工作流详解.md"
      },
      {
        "title": "Vibe Coding 常见问题和解决",
        "rel": "Vibe_Coding_零基础教程-90_Vibe_Coding_常见问题和解决",
        "sourceRel": "Vibe Coding 零基础教程/90 Vibe Coding 常见问题和解决.md"
      },
      {
        "title": "鱼皮 Vibe Coding 零基础入门教程",
        "rel": "Vibe_Coding_零基础教程-README",
        "sourceRel": "Vibe Coding 零基础教程/README.md"
      }
    ]
  },
  {
    "id": "07-coding/ai-engineering-from-scratch",
    "volume": "07-coding",
    "local": "ai-engineering-from-scratch",
    "title": "AI Engineering from Scratch（英文原版）",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "rohitg00/ai-engineering-from-scratch",
    "site": null,
    "commit": "d18b8fe5a913c46011a3b06cb6ebd6a924414fd3",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/rohitg00/ai-engineering-from-scratch",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI Engineering from Scratch（英文原版）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Book Pipeline",
        "rel": "book",
        "sourceRel": "book/README.md"
      },
      {
        "title": "Certification Curricula",
        "rel": "certifications",
        "sourceRel": "certifications/README.md"
      },
      {
        "title": "Internationalization (i18n)",
        "rel": "docs",
        "sourceRel": "docs/i18n.md"
      },
      {
        "title": "Glossary",
        "rel": "glossary",
        "sourceRel": "glossary/README.md"
      }
    ]
  },
  {
    "id": "07-coding/ai-engineering-from-scratch-zh",
    "volume": "07-coding",
    "local": "ai-engineering-from-scratch-zh",
    "title": "AI 工程从零到一（中文）",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "fancyboi999/ai-engineering-from-scratch-zh",
    "site": null,
    "commit": "109181ce68128c1bf27ec20867177007a8bace89",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/fancyboi999/ai-engineering-from-scratch-zh",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI 工程从零到一（中文）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "认证课程",
        "rel": "certifications",
        "sourceRel": "certifications/README.md"
      },
      {
        "title": "Glossary",
        "rel": "glossary",
        "sourceRel": "glossary/README.md"
      }
    ]
  },
  {
    "id": "07-coding/vibefast-docs",
    "volume": "07-coding",
    "local": "vibefast-docs",
    "title": "VibeFast 文档",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "license": "CC BY-NC-SA 4.0",
    "licenseLabel": "限非商用",
    "lang": "英文",
    "publishable": true,
    "repo": "vibefast-app/vibefast-docs",
    "site": null,
    "commit": "2a34bc50576f3f74fda6196ca9bebf851187bcf9",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/vibefast-app/vibefast-docs",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "vibefast.app 🚀",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Why I Started Building Seriously at 50",
        "rel": "en",
        "sourceRel": "en/00-why-i-started-at-50-en.md"
      },
      {
        "title": "Por qué empecé a construir en serio a los 50",
        "rel": "es",
        "sourceRel": "es/00-why-i-started-at-50-es.md"
      },
      {
        "title": "なぜ私は50歳になってから本気でプロダクトを作り始めたのか",
        "rel": "jp",
        "sourceRel": "jp/00-why-i-started-at-50-jp.md"
      },
      {
        "title": "Por Que Comecei a Construir Produtos de Verdade aos 50 Anos",
        "rel": "pt-br",
        "sourceRel": "pt-br/00-why-i-started-at-50-pt-br.md"
      },
      {
        "title": "為什麼我 50 歲才開始認真 Build 產品",
        "rel": "zh",
        "sourceRel": "zh/00-why-i-started-at-50-zh.md"
      }
    ]
  },
  {
    "id": "07-coding/vibe-security-skill",
    "volume": "07-coding",
    "local": "vibe-security-skill",
    "title": "Vibe Security（AI 编码安全技能）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "raroque/vibe-security-skill",
    "site": null,
    "commit": "850938f20f6915e7c3688d85c0a838f7909c87bb",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/raroque/vibe-security-skill",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Vibe Security（AI 编码安全技能）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Vibe Security（AI 编码安全技能）",
        "rel": "vibe-security",
        "sourceRel": "vibe-security/SKILL.md"
      }
    ]
  },
  {
    "id": "07-coding/awesome-vibe-coding",
    "volume": "07-coding",
    "local": "awesome-vibe-coding",
    "title": "Vibe Coding 参考精选",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "license": "CC0-1.0",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "filipecalegario/awesome-vibe-coding",
    "site": null,
    "commit": "59d50281e40651d574ea0ead592a08019d74730d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/filipecalegario/awesome-vibe-coding",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome Vibe Coding",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Awesome Vibe Coding",
        "rel": "README-CN",
        "sourceRel": "README-CN.md"
      }
    ]
  },
  {
    "id": "07-coding/spec-kit",
    "volume": "07-coding",
    "local": "spec-kit",
    "title": "Spec Kit（GitHub 官方规格驱动开发工具包）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "github/spec-kit",
    "site": null,
    "commit": "c173bf19a6654e3b05386ec3599349a55282b897",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/github/spec-kit",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Spec Kit（GitHub 官方规格驱动开发工具包）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Documentation",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Spec Kit Extensions",
        "rel": "extensions",
        "sourceRel": "extensions/README.md"
      },
      {
        "title": "Spec Kit Integration Catalog",
        "rel": "integrations",
        "sourceRel": "integrations/README.md"
      },
      {
        "title": "Spec Kit - April 2026 Newsletter",
        "rel": "newsletters",
        "sourceRel": "newsletters/2026-April.md"
      },
      {
        "title": "Presets",
        "rel": "presets",
        "sourceRel": "presets/README.md"
      },
      {
        "title": "[CHECKLIST TYPE] Checklist: [FEATURE NAME]",
        "rel": "templates",
        "sourceRel": "templates/checklist-template.md"
      },
      {
        "title": "Workflows",
        "rel": "workflows",
        "sourceRel": "workflows/README.md"
      }
    ]
  },
  {
    "id": "07-coding/cloudflare-vibesdk",
    "volume": "07-coding",
    "local": "cloudflare-vibesdk",
    "title": "Cloudflare VibeSDK",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "cloudflare/vibesdk",
    "site": null,
    "commit": "9da158d82c597a0e8f4bf033cdccd1053fb6fb15",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/cloudflare/vibesdk",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Cloudflare VibeSDK",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "VibeSDK Architecture Diagrams",
        "rel": "docs",
        "sourceRel": "docs/architecture-diagrams.md"
      },
      {
        "title": "@cf-vibesdk/sdk",
        "rel": "sdk",
        "sourceRel": "sdk/README.md"
      },
      {
        "title": "@space-do/space",
        "rel": "space",
        "sourceRel": "space/README.md"
      }
    ]
  },
  {
    "id": "07-coding/ai-api-integration",
    "volume": "07-coding",
    "local": "ai-api-integration",
    "title": "AI API 接入实战（OpenAI 兼容协议）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "CCCpan/ai-api-integration",
    "site": null,
    "commit": "95cd8c6f48e58dfe96703a37b6c8fccb583bea74",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/CCCpan/ai-api-integration",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "ai-api-integration",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Demo: Multi-model CLI chat",
        "rel": "src",
        "sourceRel": "src/README.md"
      }
    ]
  },
  {
    "id": "08-agents/huggingface-agents-course",
    "volume": "08-agents",
    "local": "huggingface-agents-course",
    "title": "Hugging Face Agents Course（智能体课程）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "huggingface/agents-course",
    "site": null,
    "commit": "b3946b1d09d29c65736e219d48a8a736a2c52154",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/huggingface/agents-course",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "<a href=\"https://hf.co/learn/agents-course\" target=\"blank\"The Hugging Face Agents Course</a",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Conclusion [[conclusion]]",
        "rel": "units-en-bonus-unit1-conclusion",
        "sourceRel": "units/en/bonus-unit1/conclusion.mdx"
      },
      {
        "title": "Let's Fine-Tune Your Model for Function-Calling",
        "rel": "units-en-bonus-unit1-fine-tuning",
        "sourceRel": "units/en/bonus-unit1/fine-tuning.mdx"
      },
      {
        "title": "Introduction",
        "rel": "units-en-bonus-unit1-introduction",
        "sourceRel": "units/en/bonus-unit1/introduction.mdx"
      },
      {
        "title": "What is Function Calling?",
        "rel": "units-en-bonus-unit1-what-is-function-calling",
        "sourceRel": "units/en/bonus-unit1/what-is-function-calling.mdx"
      },
      {
        "title": "AI Agent Observability & Evaluation",
        "rel": "units-en-bonus-unit2-introduction",
        "sourceRel": "units/en/bonus-unit2/introduction.mdx"
      },
      {
        "title": "Bonus Unit 2: Observability and Evaluation of Agents",
        "rel": "units-en-bonus-unit2-monitoring-and-evaluating-agents-notebook",
        "sourceRel": "units/en/bonus-unit2/monitoring-and-evaluating-agents-notebook.mdx"
      },
      {
        "title": "Quiz: Evaluating AI Agents",
        "rel": "units-en-bonus-unit2-quiz",
        "sourceRel": "units/en/bonus-unit2/quiz.mdx"
      },
      {
        "title": "AI Agent Observability and Evaluation",
        "rel": "units-en-bonus-unit2-what-is-agent-observability-and-evaluation",
        "sourceRel": "units/en/bonus-unit2/what-is-agent-observability-and-evaluation.mdx"
      },
      {
        "title": "Build Your Own Pokémon Battle Agent",
        "rel": "units-en-bonus-unit3-building_your_pokemon_agent",
        "sourceRel": "units/en/bonus-unit3/building_your_pokemon_agent.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-bonus-unit3-conclusion",
        "sourceRel": "units/en/bonus-unit3/conclusion.mdx"
      },
      {
        "title": "From LLMs to AI Agents",
        "rel": "units-en-bonus-unit3-from-llm-to-agents",
        "sourceRel": "units/en/bonus-unit3/from-llm-to-agents.mdx"
      },
      {
        "title": "Introduction",
        "rel": "units-en-bonus-unit3-introduction",
        "sourceRel": "units/en/bonus-unit3/introduction.mdx"
      },
      {
        "title": "Launching Your Pokémon Battle Agent",
        "rel": "units-en-bonus-unit3-launching_agent_battle",
        "sourceRel": "units/en/bonus-unit3/launching_agent_battle.mdx"
      },
      {
        "title": "The State of the Art in Using LLMs in Games",
        "rel": "units-en-bonus-unit3-state-of-art",
        "sourceRel": "units/en/bonus-unit3/state-of-art.mdx"
      },
      {
        "title": "Live 1: How the Course Works and First Q&A",
        "rel": "units-en-communication-live1",
        "sourceRel": "units/en/communication/live1.mdx"
      },
      {
        "title": "(Optional) Discord 101 [[discord-101]]",
        "rel": "units-en-unit0-discord101",
        "sourceRel": "units/en/unit0/discord101.mdx"
      },
      {
        "title": "Welcome to the 🤗 AI Agents Course [[introduction]]",
        "rel": "units-en-unit0-introduction",
        "sourceRel": "units/en/unit0/introduction.mdx"
      },
      {
        "title": "Onboarding: Your First Steps ⛵",
        "rel": "units-en-unit0-onboarding",
        "sourceRel": "units/en/unit0/onboarding.mdx"
      },
      {
        "title": "Actions: Enabling the Agent to Engage with Its Environment",
        "rel": "units-en-unit1-actions",
        "sourceRel": "units/en/unit1/actions.mdx"
      },
      {
        "title": "Understanding AI Agents through the Thought-Action-Observation Cycle",
        "rel": "units-en-unit1-agent-steps-and-structure",
        "sourceRel": "units/en/unit1/agent-steps-and-structure.mdx"
      },
      {
        "title": "Conclusion [[conclusion]]",
        "rel": "units-en-unit1-conclusion",
        "sourceRel": "units/en/unit1/conclusion.mdx"
      },
      {
        "title": "Dummy Agent Library",
        "rel": "units-en-unit1-dummy-agent-library",
        "sourceRel": "units/en/unit1/dummy-agent-library.mdx"
      },
      {
        "title": "Unit 1 Quiz",
        "rel": "units-en-unit1-final-quiz",
        "sourceRel": "units/en/unit1/final-quiz.mdx"
      },
      {
        "title": "Introduction to Agents",
        "rel": "units-en-unit1-introduction",
        "sourceRel": "units/en/unit1/introduction.mdx"
      },
      {
        "title": "Messages and Special Tokens",
        "rel": "units-en-unit1-messages-and-special-tokens",
        "sourceRel": "units/en/unit1/messages-and-special-tokens.mdx"
      },
      {
        "title": "Observe: Integrating Feedback to Reflect and Adapt",
        "rel": "units-en-unit1-observations",
        "sourceRel": "units/en/unit1/observations.mdx"
      },
      {
        "title": "Hugging Face Agents Course（智能体课程）",
        "rel": "units-en-unit1-quiz1",
        "sourceRel": "units/en/unit1/quiz1.mdx"
      },
      {
        "title": "Quick Self-Check (ungraded) [[quiz2]]",
        "rel": "units-en-unit1-quiz2",
        "sourceRel": "units/en/unit1/quiz2.mdx"
      },
      {
        "title": "Table of Contents",
        "rel": "units-en-unit1-README",
        "sourceRel": "units/en/unit1/README.md"
      },
      {
        "title": "Thought: Internal Reasoning and the ReAct Approach",
        "rel": "units-en-unit1-thoughts",
        "sourceRel": "units/en/unit1/thoughts.mdx"
      },
      {
        "title": "What are Tools?",
        "rel": "units-en-unit1-tools",
        "sourceRel": "units/en/unit1/tools.mdx"
      },
      {
        "title": "Let's Create Our First Agent Using smolagents",
        "rel": "units-en-unit1-tutorial",
        "sourceRel": "units/en/unit1/tutorial.mdx"
      },
      {
        "title": "What is an Agent?",
        "rel": "units-en-unit1-what-are-agents",
        "sourceRel": "units/en/unit1/what-are-agents.mdx"
      },
      {
        "title": "Introduction to Agentic Frameworks",
        "rel": "units-en-unit2-introduction",
        "sourceRel": "units/en/unit2/introduction.mdx"
      },
      {
        "title": "Building Blocks of LangGraph",
        "rel": "units-en-unit2-langgraph-building_blocks",
        "sourceRel": "units/en/unit2/langgraph/building_blocks.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit2-langgraph-conclusion",
        "sourceRel": "units/en/unit2/langgraph/conclusion.mdx"
      },
      {
        "title": "Document Analysis Graph",
        "rel": "units-en-unit2-langgraph-document_analysis_agent",
        "sourceRel": "units/en/unit2/langgraph/document_analysis_agent.mdx"
      },
      {
        "title": "Building Your First LangGraph",
        "rel": "units-en-unit2-langgraph-first_graph",
        "sourceRel": "units/en/unit2/langgraph/first_graph.mdx"
      },
      {
        "title": "Introduction to LangGraph",
        "rel": "units-en-unit2-langgraph-introduction",
        "sourceRel": "units/en/unit2/langgraph/introduction.mdx"
      },
      {
        "title": "Test Your Understanding of LangGraph",
        "rel": "units-en-unit2-langgraph-quiz1",
        "sourceRel": "units/en/unit2/langgraph/quiz1.mdx"
      },
      {
        "title": "What is LangGraph? [[what-is-langgraph]]",
        "rel": "units-en-unit2-langgraph-when_to_use_langgraph",
        "sourceRel": "units/en/unit2/langgraph/when_to_use_langgraph.mdx"
      },
      {
        "title": "What are components in LlamaIndex?",
        "rel": "units-en-unit2-llama-index-components",
        "sourceRel": "units/en/unit2/llama-index/components.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit2-llama-index-conclusion",
        "sourceRel": "units/en/unit2/llama-index/conclusion.mdx"
      },
      {
        "title": "Introduction to LlamaIndex",
        "rel": "units-en-unit2-llama-index-introduction",
        "sourceRel": "units/en/unit2/llama-index/introduction.mdx"
      },
      {
        "title": "Introduction to the LlamaHub",
        "rel": "units-en-unit2-llama-index-llama-hub",
        "sourceRel": "units/en/unit2/llama-index/llama-hub.mdx"
      },
      {
        "title": "Small Quiz (ungraded) [[quiz1]]",
        "rel": "units-en-unit2-llama-index-quiz1",
        "sourceRel": "units/en/unit2/llama-index/quiz1.mdx"
      },
      {
        "title": "Quick Self-Check (ungraded) [[quiz2]]",
        "rel": "units-en-unit2-llama-index-quiz2",
        "sourceRel": "units/en/unit2/llama-index/quiz2.mdx"
      },
      {
        "title": "Table of Contents",
        "rel": "units-en-unit2-llama-index-README",
        "sourceRel": "units/en/unit2/llama-index/README.md"
      },
      {
        "title": "Using Tools in LlamaIndex",
        "rel": "units-en-unit2-llama-index-tools",
        "sourceRel": "units/en/unit2/llama-index/tools.mdx"
      },
      {
        "title": "Creating agentic workflows in LlamaIndex",
        "rel": "units-en-unit2-llama-index-workflows",
        "sourceRel": "units/en/unit2/llama-index/workflows.mdx"
      },
      {
        "title": "Building Agents That Use Code",
        "rel": "units-en-unit2-smolagents-code_agents",
        "sourceRel": "units/en/unit2/smolagents/code_agents.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit2-smolagents-conclusion",
        "sourceRel": "units/en/unit2/smolagents/conclusion.mdx"
      },
      {
        "title": "Exam Time!",
        "rel": "units-en-unit2-smolagents-final_quiz",
        "sourceRel": "units/en/unit2/smolagents/final_quiz.mdx"
      },
      {
        "title": "Introduction to smolagents",
        "rel": "units-en-unit2-smolagents-introduction",
        "sourceRel": "units/en/unit2/smolagents/introduction.mdx"
      },
      {
        "title": "Multi-Agent Systems",
        "rel": "units-en-unit2-smolagents-multi_agent_systems",
        "sourceRel": "units/en/unit2/smolagents/multi_agent_systems.mdx"
      },
      {
        "title": "Small Quiz (ungraded) [[quiz1]]",
        "rel": "units-en-unit2-smolagents-quiz1",
        "sourceRel": "units/en/unit2/smolagents/quiz1.mdx"
      },
      {
        "title": "Small Quiz (ungraded) [[quiz2]]",
        "rel": "units-en-unit2-smolagents-quiz2",
        "sourceRel": "units/en/unit2/smolagents/quiz2.mdx"
      },
      {
        "title": "Building Agentic RAG Systems",
        "rel": "units-en-unit2-smolagents-retrieval_agents",
        "sourceRel": "units/en/unit2/smolagents/retrieval_agents.mdx"
      },
      {
        "title": "Writing actions as code snippets or JSON blobs",
        "rel": "units-en-unit2-smolagents-tool_calling_agents",
        "sourceRel": "units/en/unit2/smolagents/tool_calling_agents.mdx"
      },
      {
        "title": "Tools",
        "rel": "units-en-unit2-smolagents-tools",
        "sourceRel": "units/en/unit2/smolagents/tools.mdx"
      },
      {
        "title": "Vision Agents with smolagents",
        "rel": "units-en-unit2-smolagents-vision_agents",
        "sourceRel": "units/en/unit2/smolagents/vision_agents.mdx"
      },
      {
        "title": "Why use smolagents",
        "rel": "units-en-unit2-smolagents-why_use_smolagents",
        "sourceRel": "units/en/unit2/smolagents/why_use_smolagents.mdx"
      },
      {
        "title": "Creating Your Gala Agent",
        "rel": "units-en-unit3-agentic-rag-agent",
        "sourceRel": "units/en/unit3/agentic-rag/agent.mdx"
      },
      {
        "title": "Agentic Retrieval Augmented Generation (RAG)",
        "rel": "units-en-unit3-agentic-rag-agentic-rag",
        "sourceRel": "units/en/unit3/agentic-rag/agentic-rag.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit3-agentic-rag-conclusion",
        "sourceRel": "units/en/unit3/agentic-rag/conclusion.mdx"
      },
      {
        "title": "Introduction to Use Case for Agentic RAG",
        "rel": "units-en-unit3-agentic-rag-introduction",
        "sourceRel": "units/en/unit3/agentic-rag/introduction.mdx"
      },
      {
        "title": "Creating a RAG Tool for Guest Stories",
        "rel": "units-en-unit3-agentic-rag-invitees",
        "sourceRel": "units/en/unit3/agentic-rag/invitees.mdx"
      },
      {
        "title": "Building and Integrating Tools for Your Agent",
        "rel": "units-en-unit3-agentic-rag-tools",
        "sourceRel": "units/en/unit3/agentic-rag/tools.mdx"
      },
      {
        "title": "And now? What topics I should learn?",
        "rel": "units-en-unit4-additional-readings",
        "sourceRel": "units/en/unit4/additional-readings.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit4-conclusion",
        "sourceRel": "units/en/unit4/conclusion.mdx"
      },
      {
        "title": "Claim Your Certificate 🎓",
        "rel": "units-en-unit4-get-your-certificate",
        "sourceRel": "units/en/unit4/get-your-certificate.mdx"
      },
      {
        "title": "Hands-On",
        "rel": "units-en-unit4-hands-on",
        "sourceRel": "units/en/unit4/hands-on.mdx"
      },
      {
        "title": "Welcome to the final Unit [[introduction]]",
        "rel": "units-en-unit4-introduction",
        "sourceRel": "units/en/unit4/introduction.mdx"
      },
      {
        "title": "What is GAIA?",
        "rel": "units-en-unit4-what-is-gaia",
        "sourceRel": "units/en/unit4/what-is-gaia.mdx"
      }
    ]
  },
  {
    "id": "08-agents/microsoft-ai-agents-for-beginners",
    "volume": "08-agents",
    "local": "microsoft-ai-agents-for-beginners",
    "title": "AI Agents for Beginners（微软官方入门课）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/ai-agents-for-beginners",
    "site": null,
    "commit": "25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595",
    "entry": "translations/zh-CN/README.md",
    "featured": true,
    "sourceUrl": "https://github.com/microsoft/ai-agents-for-beginners",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "初学者人工智能代理课程",
        "rel": "overview",
        "sourceRel": "translations/zh-CN/README.md"
      },
      {
        "title": "Azure AI 搜索设置指南",
        "rel": "translations-zh-CN-00-course-setup-AzureSearch",
        "sourceRel": "translations/zh-CN/00-course-setup/AzureSearch.md"
      },
      {
        "title": "课程设置",
        "rel": "translations-zh-CN-00-course-setup-README",
        "sourceRel": "translations/zh-CN/00-course-setup/README.md"
      },
      {
        "title": "🌍 使用 Microsoft Agent Framework (.NET) 的 AI 旅游代理",
        "rel": "translations-zh-CN-01-intro-to-ai-agents-code_samples-01-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
      },
      {
        "title": "AI 代理及代理使用案例简介",
        "rel": "translations-zh-CN-01-intro-to-ai-agents-README",
        "sourceRel": "translations/zh-CN/01-intro-to-ai-agents/README.md"
      },
      {
        "title": "Microsoft Foundry 代理服务开发",
        "rel": "translations-zh-CN-02-explore-agentic-frameworks-azure-ai-foundry-agent-creation",
        "sourceRel": "translations/zh-CN/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md"
      },
      {
        "title": "🔍 探索 Microsoft Agent Framework - 基础代理 (.NET)",
        "rel": "translations-zh-CN-02-explore-agentic-frameworks-code_samples-02-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md"
      },
      {
        "title": "探索AI代理框架",
        "rel": "translations-zh-CN-02-explore-agentic-frameworks-README",
        "sourceRel": "translations/zh-CN/02-explore-agentic-frameworks/README.md"
      },
      {
        "title": "🎨 使用 Azure OpenAI （Responses API） 的智能代理设计模式（.NET）",
        "rel": "translations-zh-CN-03-agentic-design-patterns-code_samples-03-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md"
      },
      {
        "title": "AI 代理设计原则",
        "rel": "translations-zh-CN-03-agentic-design-patterns-README",
        "sourceRel": "translations/zh-CN/03-agentic-design-patterns/README.md"
      },
      {
        "title": "🛠️ 使用 Azure OpenAI（Responses API）进行高级工具使用 (.NET)",
        "rel": "translations-zh-CN-04-tool-use-code_samples-04-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/04-tool-use/code_samples/04-dotnet-agent-framework.md"
      },
      {
        "title": "工具使用设计模式",
        "rel": "translations-zh-CN-04-tool-use-README",
        "sourceRel": "translations/zh-CN/04-tool-use/README.md"
      },
      {
        "title": "🔍 使用 Microsoft Foundry (.NET) 构建企业级 RAG",
        "rel": "translations-zh-CN-05-agentic-rag-code_samples-05-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/05-agentic-rag/code_samples/05-dotnet-agent-framework.md"
      },
      {
        "title": "AI Agents for Beginners（微软官方入门课）",
        "rel": "translations-zh-CN-05-agentic-rag-code_samples-document",
        "sourceRel": "translations/zh-CN/05-agentic-rag/code_samples/document.md"
      },
      {
        "title": "Agentic RAG",
        "rel": "translations-zh-CN-05-agentic-rag-README",
        "sourceRel": "translations/zh-CN/05-agentic-rag/README.md"
      },
      {
        "title": "构建可信赖的 AI 代理",
        "rel": "translations-zh-CN-06-building-trustworthy-agents-README",
        "sourceRel": "translations/zh-CN/06-building-trustworthy-agents/README.md"
      },
      {
        "title": "🎯 使用 Azure OpenAI (Responses API) 进行规划与设计模式 (.NET)",
        "rel": "translations-zh-CN-07-planning-design-code_samples-07-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/07-planning-design/code_samples/07-dotnet-agent-framework.md"
      },
      {
        "title": "规划设计",
        "rel": "translations-zh-CN-07-planning-design-README",
        "sourceRel": "translations/zh-CN/07-planning-design/README.md"
      },
      {
        "title": "🤝 企业多智能体工作流系统（.NET）",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-08-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/08-dotnet-agent-framework.md"
      },
      {
        "title": "🔄 使用 Azure OpenAI（Responses API）的基础代理工作流（.NET）",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework-dotNET-01.dotnet-agent-framework-workflow-ghmodel-basic",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md"
      },
      {
        "title": "⏩ 使用 Azure OpenAI （Responses API）进行顺序代理工作流（.NET）",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework-dotNET-02.dotnet-agent-framework-workflow-ghmodel-sequential",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md"
      },
      {
        "title": "⚡ 使用 Azure OpenAI (Responses API) 的并发代理工作流 (.NET)",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework-dotNET-03.dotnet-agent-framework-workflow-ghmodel-concurrent",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md"
      },
      {
        "title": "🔀 使用 Microsoft Foundry (.NET) 的条件代理工作流",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework-dotNET-04.dotnet-agent-framework-workflow-aifoundry-condition",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md"
      },
      {
        "title": "使用 Microsoft Agent Framework 工作流构建多智能体应用",
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework-README",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/README.md"
      },
      {
        "title": "多智能体设计模式",
        "rel": "translations-zh-CN-08-multi-agent-README",
        "sourceRel": "translations/zh-CN/08-multi-agent/README.md"
      },
      {
        "title": "知识检测答案",
        "rel": "translations-zh-CN-08-multi-agent-solution-solution-quiz",
        "sourceRel": "translations/zh-CN/08-multi-agent/solution/solution-quiz.md"
      },
      {
        "title": "AI Agents for Beginners（微软官方入门课）",
        "rel": "translations-zh-CN-08-multi-agent-solution-solution",
        "sourceRel": "translations/zh-CN/08-multi-agent/solution/solution.md"
      },
      {
        "title": "AI 代理中的元认知",
        "rel": "translations-zh-CN-09-metacognition-README",
        "sourceRel": "translations/zh-CN/09-metacognition/README.md"
      },
      {
        "title": "生产中的 AI 代理：可观测性与评估",
        "rel": "translations-zh-CN-10-ai-agents-production-README",
        "sourceRel": "translations/zh-CN/10-ai-agents-production/README.md"
      },
      {
        "title": "欢迎使用 Chainlit！🚀🤖",
        "rel": "translations-zh-CN-11-agentic-protocols-code_samples-github-mcp-chainlit",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/code_samples/github-mcp/chainlit.md"
      },
      {
        "title": "AI Agents for Beginners（微软官方入门课）",
        "rel": "translations-zh-CN-11-agentic-protocols-code_samples-github-mcp-event-descriptions",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/code_samples/github-mcp/event-descriptions.md"
      },
      {
        "title": "MCP服务器集成指南",
        "rel": "translations-zh-CN-11-agentic-protocols-code_samples-github-mcp-MCP_SETUP",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/code_samples/github-mcp/MCP_SETUP.md"
      },
      {
        "title": "Github MCP 服务器示例",
        "rel": "translations-zh-CN-11-agentic-protocols-code_samples-github-mcp-README",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/code_samples/github-mcp/README.md"
      },
      {
        "title": "使用 MCP 构建代理间通信系统",
        "rel": "translations-zh-CN-11-agentic-protocols-code_samples-mcp-agents-README",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/code_samples/mcp-agents/README.md"
      },
      {
        "title": "使用智能代理协议（MCP、A2A 和 NLWeb）",
        "rel": "translations-zh-CN-11-agentic-protocols-README",
        "sourceRel": "translations/zh-CN/11-agentic-protocols/README.md"
      },
      {
        "title": "代理备忘录",
        "rel": "translations-zh-CN-12-context-engineering-code_samples-vacation_agent_scratchpad",
        "sourceRel": "translations/zh-CN/12-context-engineering/code_samples/vacation_agent_scratchpad.md"
      },
      {
        "title": "AI 代理的上下文工程",
        "rel": "translations-zh-CN-12-context-engineering-README",
        "sourceRel": "translations/zh-CN/12-context-engineering/README.md"
      },
      {
        "title": "AI Agent 的记忆",
        "rel": "translations-zh-CN-13-agent-memory-README",
        "sourceRel": "translations/zh-CN/13-agent-memory/README.md"
      },
      {
        "title": "探索 Microsoft Agent 框架",
        "rel": "translations-zh-CN-14-microsoft-agent-framework-README",
        "sourceRel": "translations/zh-CN/14-microsoft-agent-framework/README.md"
      },
      {
        "title": "构建计算机使用代理（CUA）",
        "rel": "translations-zh-CN-15-browser-use-README",
        "sourceRel": "translations/zh-CN/15-browser-use/README.md"
      },
      {
        "title": "使用 Microsoft Foundry 部署可扩展代理",
        "rel": "translations-zh-CN-16-deploying-scalable-agents-README",
        "sourceRel": "translations/zh-CN/16-deploying-scalable-agents/README.md"
      },
      {
        "title": "使用 Microsoft Foundry Local 和 Qwen 创建本地 AI 代理",
        "rel": "translations-zh-CN-17-creating-local-ai-agents-README",
        "sourceRel": "translations/zh-CN/17-creating-local-ai-agents/README.md"
      },
      {
        "title": "示例收据夹具",
        "rel": "translations-zh-CN-18-securing-ai-agents-code_samples-sample_receipts-README",
        "sourceRel": "translations/zh-CN/18-securing-ai-agents/code_samples/sample_receipts/README.md"
      },
      {
        "title": "利用加密收据保障 AI 代理安全",
        "rel": "translations-zh-CN-18-securing-ai-agents-README",
        "sourceRel": "translations/zh-CN/18-securing-ai-agents/README.md"
      },
      {
        "title": "初学者的 AI 代理 - 学习指南",
        "rel": "translations-zh-CN-STUDY_GUIDE",
        "sourceRel": "translations/zh-CN/STUDY_GUIDE.md"
      },
      {
        "title": "代理烟雾测试",
        "rel": "translations-zh-CN-tests-README",
        "sourceRel": "translations/zh-CN/tests/README.md"
      }
    ]
  },
  {
    "id": "08-agents/microsoft-ai-engineering-coach",
    "volume": "08-agents",
    "local": "microsoft-ai-engineering-coach",
    "title": "AI Engineering Coach（微软）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/AI-Engineering-Coach",
    "site": null,
    "commit": "18b1a3d16b586c171426c6a407cc5c2dc073556e",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/microsoft/AI-Engineering-Coach",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Authoring Rules and Metrics",
        "rel": "docs",
        "sourceRel": "docs/AUTHORING_RULES.md"
      },
      {
        "title": "Skills",
        "rel": "skills",
        "sourceRel": "skills/README.md"
      }
    ]
  },
  {
    "id": "08-agents/ed-donner-agents",
    "volume": "08-agents",
    "local": "ed-donner-agents",
    "title": "Ed Donner：AI Agents 实战课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "ed-donner/agents",
    "site": null,
    "commit": "8ceaf66c24643627c1e4806851736bdd444bdd4b",
    "entry": null,
    "featured": false,
    "sourceUrl": "https://github.com/ed-donner/agents",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-1_Abdulrazaq-README",
        "sourceRel": "1_foundations/community_contributions/1_Abdulrazaq/README.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-adeyemi-kayode-README",
        "sourceRel": "1_foundations/community_contributions/adeyemi-kayode/README.md"
      },
      {
        "title": "Alter-Ego Chatbot",
        "rel": "1_foundations-community_contributions-alter-ego-gradio-chatbot-usingAzureOpenai-README",
        "sourceRel": "1_foundations/community_contributions/alter-ego-gradio-chatbot-usingAzureOpenai/README.md"
      },
      {
        "title": "Prompt Management Refactoring Plan",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-docs-prompt-refactoring-plan",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/docs/prompt-refactoring-plan.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-chat_base",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/chat_base.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-chat_init",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/chat_init.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-chat_rerun",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/chat_rerun.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-evaluator_with_github_context",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/evaluator_with_github_context.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-evaluator",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/evaluator.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-prompts-job_match_analysis",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/job_match_analysis.md"
      },
      {
        "title": "AI Career Assistant",
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai-README",
        "sourceRel": "1_foundations/community_contributions/amirna2_contributions/personal-ai/README.md"
      },
      {
        "title": "RAG Implementation Plan — Converting the me/ Folder into Proper RAG",
        "rel": "1_foundations-community_contributions-Andras_Nemes-RAG_implementation_plan",
        "sourceRel": "1_foundations/community_contributions/Andras_Nemes/RAG_implementation_plan.MD"
      },
      {
        "title": "Change Log",
        "rel": "1_foundations-community_contributions-andresr27-change_log",
        "sourceRel": "1_foundations/community_contributions/andresr27/change_log.md"
      },
      {
        "title": "Summary",
        "rel": "1_foundations-community_contributions-andresr27-docs-private_generic",
        "sourceRel": "1_foundations/community_contributions/andresr27/docs/private_generic.md"
      },
      {
        "title": "Debate Transcript",
        "rel": "1_foundations-community_contributions-aquagreen1000-debate_transcript",
        "sourceRel": "1_foundations/community_contributions/aquagreen1000/debate_transcript.md"
      },
      {
        "title": "Avatar — (OpenRouter + local tools)",
        "rel": "1_foundations-community_contributions-avatar-README",
        "sourceRel": "1_foundations/community_contributions/avatar/README.md"
      },
      {
        "title": "Personal AI Assistant – AMA Chatbot",
        "rel": "1_foundations-community_contributions-blt909-README",
        "sourceRel": "1_foundations/community_contributions/blt909/README.md"
      },
      {
        "title": "🤖 CareerWise Gemini Notify",
        "rel": "1_foundations-community_contributions-careerwise_gemini_ntfy-README",
        "sourceRel": "1_foundations/community_contributions/careerwise_gemini_ntfy/README.md"
      },
      {
        "title": "RAG Chat Evaluator Bot",
        "rel": "1_foundations-community_contributions-chatbot_rag_evaluation-README",
        "sourceRel": "1_foundations/community_contributions/chatbot_rag_evaluation/README.md"
      },
      {
        "title": "Smart RAG Chatbot",
        "rel": "1_foundations-community_contributions-ChatBot_with_evaluator_and_notifier-README",
        "sourceRel": "1_foundations/community_contributions/ChatBot_with_evaluator_and_notifier/README.md"
      },
      {
        "title": "Week 1 extra: agent loop — bill split and tip",
        "rel": "1_foundations-community_contributions-cwait-README",
        "sourceRel": "1_foundations/community_contributions/cwait/README.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-discord_over_pushover-README",
        "sourceRel": "1_foundations/community_contributions/discord_over_pushover/README.md"
      },
      {
        "title": "Digital Persona - Personal Knowledge Base",
        "rel": "1_foundations-community_contributions-dkisselev-zz-README",
        "sourceRel": "1_foundations/community_contributions/dkisselev-zz/README.md"
      },
      {
        "title": "Personal Chatbot - AI Assistant with Push Notifications",
        "rel": "1_foundations-community_contributions-elijah_ach_igniters-README",
        "sourceRel": "1_foundations/community_contributions/elijah_ach_igniters/README.md"
      },
      {
        "title": "Buggy Kata",
        "rel": "1_foundations-community_contributions-eliza_zadura-agent_loop_debuggers-first_principles_loop-README",
        "sourceRel": "1_foundations/community_contributions/eliza_zadura/agent_loop_debuggers/first_principles_loop/README.md"
      },
      {
        "title": "Gemini Chatbot of Users (Me)",
        "rel": "1_foundations-community_contributions-gemini_based_chatbot-README",
        "sourceRel": "1_foundations/community_contributions/gemini_based_chatbot/README.md"
      },
      {
        "title": "gu1ll390 — community contributions",
        "rel": "1_foundations-community_contributions-gu1ll390-README",
        "sourceRel": "1_foundations/community_contributions/gu1ll390/README.md"
      },
      {
        "title": "Community Contribution: H-CDT (Haben-Career Digital Twin)",
        "rel": "1_foundations-community_contributions-haben-haben_career_twin_contribution",
        "sourceRel": "1_foundations/community_contributions/haben/haben_career_twin_contribution.md"
      },
      {
        "title": "🤖 Autonomous Self-Healing Debugger",
        "rel": "1_foundations-community_contributions-Hareesh_Debugger_agent-README",
        "sourceRel": "1_foundations/community_contributions/Hareesh_Debugger agent/README.md"
      },
      {
        "title": "Hidden Gems World Travel Guide (RAG)",
        "rel": "1_foundations-community_contributions-hidden_gems_world_travel_guide-README",
        "sourceRel": "1_foundations/community_contributions/hidden_gems_world_travel_guide/README.md"
      },
      {
        "title": "Advanced Digital Twin with RAG",
        "rel": "1_foundations-community_contributions-iamumarjaved-README",
        "sourceRel": "1_foundations/community_contributions/iamumarjaved/README.md"
      },
      {
        "title": "Orchestrator-Workers Workflow Demo",
        "rel": "1_foundations-community_contributions-lab_2_orchestrator_workers_demo-README_orchestrator_workers",
        "sourceRel": "1_foundations/community_contributions/lab_2_orchestrator_workers_demo/README_orchestrator_workers.md"
      },
      {
        "title": "Week 1 assessment — career chatbot extension",
        "rel": "1_foundations-community_contributions-mac_week1_assessment-README",
        "sourceRel": "1_foundations/community_contributions/mac_week1_assessment/README.md"
      },
      {
        "title": "🧠 Resume-Job Match Application (LLM-Powered)",
        "rel": "1_foundations-community_contributions-Multi-Model-Resume_JD-Match-Analyzer-README",
        "sourceRel": "1_foundations/community_contributions/Multi-Model-Resume–JD-Match-Analyzer/README.md"
      },
      {
        "title": "🤖 AI Personal Website Assistant",
        "rel": "1_foundations-community_contributions-ngahunj-README",
        "sourceRel": "1_foundations/community_contributions/ngahunj/README.md"
      },
      {
        "title": "Week 1 Project",
        "rel": "1_foundations-community_contributions-norbert-wakanda-README",
        "sourceRel": "1_foundations/community_contributions/norbert-wakanda/README.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-novel-generator-README",
        "sourceRel": "1_foundations/community_contributions/novel-generator/README.md"
      },
      {
        "title": "AskSpark Project Summary",
        "rel": "1_foundations-community_contributions-oluwaferanmi_oluwagbamila-AskSpark_Project_Summary",
        "sourceRel": "1_foundations/community_contributions/oluwaferanmi_oluwagbamila/AskSpark_Project_Summary.md"
      },
      {
        "title": "Day 2 Part 5: Workflow Design Patterns Summary",
        "rel": "1_foundations-community_contributions-osebas15-day2_5_transcript_summary",
        "sourceRel": "1_foundations/community_contributions/osebas15/day2_5_transcript_summary.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-qkocian-amazing_business_idea",
        "sourceRel": "1_foundations/community_contributions/qkocian/amazing_business_idea.md"
      },
      {
        "title": "Gemini Polyglot Guardian (Week 1)",
        "rel": "1_foundations-community_contributions-Sama-ndari_gemini-polyglot-guardian-README",
        "sourceRel": "1_foundations/community_contributions/Sama-ndari_gemini-polyglot-guardian/README.md"
      },
      {
        "title": "AI Interview Simulator (Week 1)",
        "rel": "1_foundations-community_contributions-Sama-ndari_interview-tool-README",
        "sourceRel": "1_foundations/community_contributions/Sama-ndari_interview-tool/README.md"
      },
      {
        "title": "LLM Telephone Game (Week 1)",
        "rel": "1_foundations-community_contributions-Sama-ndari_llm-telephone-game-README",
        "sourceRel": "1_foundations/community_contributions/Sama-ndari_llm-telephone-game/README.md"
      },
      {
        "title": "Demo context (lightweight)",
        "rel": "1_foundations-community_contributions-Sama-ndari_me-in-the-loop-me-summary",
        "sourceRel": "1_foundations/community_contributions/Sama-ndari_me-in-the-loop/me/summary.md"
      },
      {
        "title": "Personal AI Clone (Week 1)",
        "rel": "1_foundations-community_contributions-Sama-ndari_me-in-the-loop-README",
        "sourceRel": "1_foundations/community_contributions/Sama-ndari_me-in-the-loop/README.md"
      },
      {
        "title": "Career chat (RAG + Gradio, Jupyter notebook)",
        "rel": "1_foundations-community_contributions-sammyloto-README",
        "sourceRel": "1_foundations/community_contributions/sammyloto/README.md"
      },
      {
        "title": "careeragent",
        "rel": "1_foundations-community_contributions-seung-gu-README",
        "sourceRel": "1_foundations/community_contributions/seung-gu/README.md"
      },
      {
        "title": "Digital twin with a reviewer",
        "rel": "1_foundations-community_contributions-sev_rudakov_twin_evaluator-README",
        "sourceRel": "1_foundations/community_contributions/sev_rudakov_twin_evaluator/README.md"
      },
      {
        "title": "LLM Router & Evaluator-Optimizer Workflow",
        "rel": "1_foundations-community_contributions-sharad_extended_workflow-readme",
        "sourceRel": "1_foundations/community_contributions/sharad_extended_workflow/readme.md"
      },
      {
        "title": "API Response & Conversation History",
        "rel": "1_foundations-community_contributions-shruti_sky-documenting_day_1",
        "sourceRel": "1_foundations/community_contributions/shruti_sky/documenting_day_1.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-simple-tools-usage-README",
        "sourceRel": "1_foundations/community_contributions/simple-tools-usage/README.md"
      },
      {
        "title": "Career conversation (evaluator-rerun)",
        "rel": "1_foundations-community_contributions-stellaoiro-README_SPACE_lab3",
        "sourceRel": "1_foundations/community_contributions/stellaoiro/README_SPACE_lab3.md"
      },
      {
        "title": "HALI (this Space)",
        "rel": "1_foundations-community_contributions-stellaoiro-README",
        "sourceRel": "1_foundations/community_contributions/stellaoiro/README.md"
      },
      {
        "title": "Multi-Model Evaluator (2lab2.py)",
        "rel": "1_foundations-community_contributions-stevek_2_lab2_python-README",
        "sourceRel": "1_foundations/community_contributions/stevek_2_lab2_python/README.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-telegram_push_notifications-telegram_setup",
        "sourceRel": "1_foundations/community_contributions/telegram_push_notifications/telegram_setup.md"
      },
      {
        "title": "Google Gemini AI Calculator",
        "rel": "1_foundations-community_contributions-vaibhavmanwatkar-README",
        "sourceRel": "1_foundations/community_contributions/vaibhavmanwatkar/README.md"
      },
      {
        "title": "Career Chatbot 🤖",
        "rel": "1_foundations-community_contributions-Wanjiru_Week_1-README",
        "sourceRel": "1_foundations/community_contributions/Wanjiru_Week_1/README.md"
      },
      {
        "title": "Weather Tool – Personal Assistant with Weather Integration",
        "rel": "1_foundations-community_contributions-weather-tool-README",
        "sourceRel": "1_foundations/community_contributions/weather-tool/README.md"
      },
      {
        "title": "Q&A Database Schema and Example",
        "rel": "1_foundations-community_contributions-week_1_sql_linkedin-week-1-self",
        "sourceRel": "1_foundations/community_contributions/week_1_sql_linkedin/week-1-self.md"
      },
      {
        "title": "Deploying your twin to Render",
        "rel": "1_foundations-RENDER_INSTRUCTIONS",
        "sourceRel": "1_foundations/RENDER_INSTRUCTIONS.md"
      }
    ]
  },
  {
    "id": "08-agents/ed-donner-production",
    "volume": "08-agents",
    "local": "ed-donner-production",
    "title": "AI in Production",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "ed-donner/production",
    "site": null,
    "commit": "daeb3dae34be3287842ea7faa3e6f4cba467028b",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/ed-donner/production",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI in Production",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Community Contributions for Production Course",
        "rel": "community_contributions",
        "sourceRel": "community_contributions/README.md"
      },
      {
        "title": "Welcome back to the Production Repo!",
        "rel": "finale",
        "sourceRel": "finale/README.md"
      },
      {
        "title": "INSTANT GRATIFICATION!",
        "rel": "week1",
        "sourceRel": "week1/day1.md"
      },
      {
        "title": "Day 1: Introducing The Twin",
        "rel": "week2",
        "sourceRel": "week2/day1.md"
      },
      {
        "title": "Days 1 and 2: Please move to the cyber repo:",
        "rel": "week3",
        "sourceRel": "week3/README.md"
      },
      {
        "title": "Please return to the alex repo",
        "rel": "week4",
        "sourceRel": "week4/README.md"
      }
    ]
  },
  {
    "id": "08-agents/datawhale-agentic-ai",
    "volume": "08-agents",
    "local": "datawhale-agentic-ai",
    "title": "Datawhale Agentic AI 教程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "datawhalechina/agentic-ai",
    "site": null,
    "commit": "a93ab1d8546cca8b508a72f0f2c385777d5f1403",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/datawhalechina/agentic-ai",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agentic-ai",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "欢迎来到本课程 Welcome!",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.1_欢迎_Welcome_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.1 欢迎[Welcome].md"
      },
      {
        "title": "什么是智能体 AI？ What is agentic Al?",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.2_什么是Agentic_AI_What_is_agentic_AI_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.2 什么是Agentic AI[What is agentic AI].md"
      },
      {
        "title": "自主程度 Degrees of autonomy",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.3_自主性等级_Degrees_of_autonomy_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.3 自主性等级[Degrees of autonomy].md"
      },
      {
        "title": "智能体 AI 的优势 benefits-of-agentic-ai",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.4_Agentic_AI的益处_Benefits_of_agentic_AI_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.4 Agentic AI的益处[Benefits of agentic AI].md"
      },
      {
        "title": "智能体 AI 的应用 Agentic-ai-applications",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.5_Agentic_AI应用_Agentic_AI_applications_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.5 Agentic AI应用[Agentic AI applications].md"
      },
      {
        "title": "为什么需要任务分解？ Task decomposition:Identifying the steps in a workflow?",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.6_任务分解-识别工作流程步骤_Task_decomposition-_identifying_the_steps_in_a_workflow_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.6 任务分解-识别工作流程步骤[Task decomposition- identifying the steps in a workflow].md"
      },
      {
        "title": "评估智能体 AI（评测）Evaluation agentic Al (evals)",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.7_Agentic_AI评估_evals_Evaluating_agentic_AI_evals_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.7 Agentic AI评估（evals）[Evaluating agentic AI (evals)].md"
      },
      {
        "title": "智能体设计模式 Agentic design patterns",
        "rel": "1._Agentic工作流简介_Introduction_to_Agentic_Workflows_-1.8_Agentic设计模式_Agentic_design_patterns_",
        "sourceRel": "1. Agentic工作流简介[Introduction to Agentic Workflows]/1.8 Agentic设计模式[Agentic design patterns].md"
      },
      {
        "title": "反思如何改进任务输出 Reflection to improve outputs of a task",
        "rel": "2._反思设计模式_Reflection_Design_Pattern_-2.1_用反思提升任务输出_Reflection_to_improve_outputs_of_a_task_",
        "sourceRel": "2. 反思设计模式[Reflection Design Pattern]/2.1 用反思提升任务输出[Reflection to improve outputs of a task].md"
      },
      {
        "title": "为什么不一次直接生成？Why not just direct generation?",
        "rel": "2._反思设计模式_Reflection_Design_Pattern_-2.2_为何不只用迭代_Why_not_just_iteration_",
        "sourceRel": "2. 反思设计模式[Reflection Design Pattern]/2.2 为何不只用迭代[Why not just iteration].md"
      },
      {
        "title": "图表生成工作流程 Chart generation workflow",
        "rel": "2._反思设计模式_Reflection_Design_Pattern_-2.3_图表生成工作流_Chart_generation_workflow_",
        "sourceRel": "2. 反思设计模式[Reflection Design Pattern]/2.3 图表生成工作流[Chart generation workflow].md"
      },
      {
        "title": "评估反思的影响 Evaluating the impact ofreflection",
        "rel": "2._反思设计模式_Reflection_Design_Pattern_-2.5_评估反思的影响_Evaluating_the_impact_of_reflection_",
        "sourceRel": "2. 反思设计模式[Reflection Design Pattern]/2.5 评估反思的影响[Evaluating the impact of reflection].md"
      },
      {
        "title": "使用外部反馈（Using external feedback）",
        "rel": "2._反思设计模式_Reflection_Design_Pattern_-2.6_使用外部反馈_Using_external_feedback_",
        "sourceRel": "2. 反思设计模式[Reflection Design Pattern]/2.6 使用外部反馈[Using external feedback].md"
      },
      {
        "title": "工具使用 Tool Use",
        "rel": "3._工具使用_Tool_Use_-3.1_什么是工具_What_are_tools_",
        "sourceRel": "3. 工具使用[Tool Use]/3.1 什么是工具[What are tools].md"
      },
      {
        "title": "创建工具 Creating a Tool",
        "rel": "3._工具使用_Tool_Use_-3.2_创建一个工具_Creating_a_tool_",
        "sourceRel": "3. 工具使用[Tool Use]/3.2 创建一个工具[Creating a tool].md"
      },
      {
        "title": "工具调用语法 Tool Use Syntax",
        "rel": "3._工具使用_Tool_Use_-3.3_工具语法_Tool_syntax_",
        "sourceRel": "3. 工具使用[Tool Use]/3.3 工具语法[Tool syntax].md"
      },
      {
        "title": "工具使用 - 代码执行 Tool Use: Code Execution",
        "rel": "3._工具使用_Tool_Use_-3.6_代码执行_Code_execution_",
        "sourceRel": "3. 工具使用[Tool Use]/3.6 代码执行[Code execution].md"
      },
      {
        "title": "工具使用 - MCP Model Context Protocol",
        "rel": "3._工具使用_Tool_Use_-3.7_MCP_MCP_",
        "sourceRel": "3. 工具使用[Tool Use]/3.7 MCP[MCP].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.1_评估_evals_Evaluations_evals_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.1 评估（evals）[Evaluations (evals)].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.2_错误分析与制定下一步优先级_Error_analysis_and_prioritizing_next_steps_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.2 错误分析与制定下一步优先级[Error analysis and prioritizing next steps].md"
      },
      {
        "title": "更多错误分析示例 More error analysis examples",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.3_更多错误分析示例_More_error_analysis_examples_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.3 更多错误分析示例[More error analysis examples].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.4_组件级评估_Component-level_evaluations_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.4 组件级评估[Component-level evaluations].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.6_解决识别到的问题_How_to_address_problems_you_identify_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.6 解决识别到的问题[How to address problems you identify].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.7_延迟与成本优化_Latency_cost_optimization_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.7 延迟与成本优化[Latency, cost optimization].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "4._构建Agentic_AI的实用技巧_Practical_Tips_for_Building_Agentic_AI_-4.8_开发过程总结_Development_process_summary_",
        "sourceRel": "4. 构建Agentic AI的实用技巧[Practical Tips for Building Agentic AI]/4.8 开发过程总结[Development process summary].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.1_工作流规划_Planning_workflows_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.1 工作流规划[Planning workflows].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.2_创建与执行LLM计划_Creating_and_executing_LLM_plans_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.2 创建与执行LLM计划[Creating and executing LLM plans].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.3_结合代码执行的规划_Planning_with_code_execution_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.3 结合代码执行的规划[Planning with code execution].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.5_多智能体工作流_Multi-agentic_workflows_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.5 多智能体工作流[Multi-agentic workflows].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.7_多智能体系统的通信模式_Communication_patterns_for_multi-agent_systems_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.7 多智能体系统的通信模式[Communication patterns for multi-agent systems].md"
      },
      {
        "title": "Datawhale Agentic AI 教程",
        "rel": "5._高度自治智能体的模式_Patterns_for_Highly_Autonomous_Agents_-5.10_总结_Conclusion_",
        "sourceRel": "5. 高度自治智能体的模式[Patterns for Highly Autonomous Agents]/5.10 总结[Conclusion].md"
      }
    ]
  },
  {
    "id": "08-agents/strands-agents-course",
    "volume": "08-agents",
    "local": "strands-agents-course",
    "title": "Strands Agents 课程（AWS）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT-0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "aws-samples/sample-getting-started-with-strands-agents-course",
    "site": null,
    "commit": "6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Getting Started with Strands Agents - Complete Learning Path",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Advanced Strands Agents with MCP",
        "rel": "course-2",
        "sourceRel": "course-2/README.md"
      },
      {
        "title": "Building a Calculator Agent with Amazon Bedrock AgentCore",
        "rel": "course-4",
        "sourceRel": "course-4/README.md"
      }
    ]
  },
  {
    "id": "08-agents/langchain4j-for-beginners",
    "volume": "08-agents",
    "local": "langchain4j-for-beginners",
    "title": "LangChain4j for Beginners",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/LangChain4j-for-Beginners",
    "site": null,
    "commit": "9aed2ec27717775def0da2ff2d7950baa8995a64",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/microsoft/LangChain4j-for-Beginners",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "LangChain4j for Beginners",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Module 01: Getting Started with LangChain4j",
        "rel": "01-introduction",
        "sourceRel": "01-introduction/README.md"
      },
      {
        "title": "Module 02: Prompt Engineering with GPT-5.2",
        "rel": "02-prompt-engineering",
        "sourceRel": "02-prompt-engineering/README.md"
      },
      {
        "title": "Module 03: RAG (Retrieval-Augmented Generation)",
        "rel": "03-rag",
        "sourceRel": "03-rag/README.md"
      },
      {
        "title": "Module 04: AI Agents with Tools",
        "rel": "04-tools",
        "sourceRel": "04-tools/README.md"
      },
      {
        "title": "Module 05: Model Context Protocol (MCP)",
        "rel": "05-mcp",
        "sourceRel": "05-mcp/README.md"
      }
    ]
  },
  {
    "id": "08-agents/production-agentic-rag-course",
    "volume": "08-agents",
    "local": "production-agentic-rag-course",
    "title": "生产级 Agentic RAG 课程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "jamwithai/production-agentic-rag-course",
    "site": null,
    "commit": "424a0eb99edf841994f2a9a053912b489d2a94ff",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/jamwithai/production-agentic-rag-course",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "The Mother of AI Project",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Airflow Configuration",
        "rel": "airflow",
        "sourceRel": "airflow/README.md"
      }
    ]
  },
  {
    "id": "08-agents/anthropics-courses",
    "volume": "08-agents",
    "local": "anthropics-courses",
    "title": "Anthropic 官方课程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "CC-BY-NC-4.0",
    "licenseLabel": "限非商用",
    "lang": "英文",
    "publishable": true,
    "repo": "anthropics/courses",
    "site": null,
    "commit": "f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/anthropics/courses",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Anthropic courses",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Tool use",
        "rel": "tool_use",
        "sourceRel": "tool_use/README.md"
      }
    ]
  },
  {
    "id": "08-agents/second-brain-ai-assistant-course",
    "volume": "08-agents",
    "local": "second-brain-ai-assistant-course",
    "title": "Second Brain：AI 助理构建课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "decodingai-magazine/second-brain-ai-assistant-course",
    "site": null,
    "commit": "17ccef571db3e4b563826dab83ecc9298a54ede1",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/decodingai-magazine/second-brain-ai-assistant-course",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "🚀 Installation and Usage Guide for the Second Brain Offline Module",
        "rel": "apps-second-brain-offline-README",
        "sourceRel": "apps/second-brain-offline/README.md"
      },
      {
        "title": "🚀 Installation and Usage Guide for the Second Brain Online Module",
        "rel": "apps-second-brain-online-README",
        "sourceRel": "apps/second-brain-online/README.md"
      },
      {
        "title": "Workshop on Building Advanced RAG Applications and Systems",
        "rel": "workshops-rag-solution-README",
        "sourceRel": "workshops/rag/solution/README.md"
      },
      {
        "title": "Workshop on Building Advanced RAG Applications and Systems",
        "rel": "workshops-rag-template-README",
        "sourceRel": "workshops/rag/template/README.md"
      }
    ]
  },
  {
    "id": "08-agents/zero2agent",
    "volume": "08-agents",
    "local": "zero2agent",
    "title": "Zero2Agent：从零实现 Agent",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "ranxi2001/zero2Agent",
    "site": null,
    "commit": "46e9f7c28f84f54b2f6e45681d14989f01e18291",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/ranxi2001/zero2Agent",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "zero2Agent",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Final Project：OfferPilot",
        "rel": "final-project",
        "sourceRel": "final-project/index.md"
      },
      {
        "title": "learn-agent-basic",
        "rel": "learn-agent-basic",
        "sourceRel": "learn-agent-basic/index.md"
      },
      {
        "title": "Agent 面试通关：大厂 AI Agent 高频面试题深度拆解",
        "rel": "learn-agent-interview",
        "sourceRel": "learn-agent-interview/index.md"
      },
      {
        "title": "learn-agent-practice",
        "rel": "learn-agent-practice",
        "sourceRel": "learn-agent-practice/index.md"
      },
      {
        "title": "框架调研",
        "rel": "learn-agent-survey",
        "sourceRel": "learn-agent-survey/index.md"
      },
      {
        "title": "learn-agent-training",
        "rel": "learn-agent-training",
        "sourceRel": "learn-agent-training/index.md"
      },
      {
        "title": "Claude Code",
        "rel": "learn-claude-code",
        "sourceRel": "learn-claude-code/index.md"
      },
      {
        "title": "OpenAI Codex CLI",
        "rel": "learn-codex",
        "sourceRel": "learn-codex/index.md"
      },
      {
        "title": "DeepSeek Harness",
        "rel": "learn-deepseek-harness",
        "sourceRel": "learn-deepseek-harness/index.md"
      },
      {
        "title": "learn-langgraph",
        "rel": "learn-langgraph",
        "sourceRel": "learn-langgraph/index.md"
      },
      {
        "title": "OpenClaw Agent",
        "rel": "learn-openclaw",
        "sourceRel": "learn-openclaw/index.md"
      },
      {
        "title": "Pi Coding Agent：从一次真实任务开始",
        "rel": "learn-pi",
        "sourceRel": "learn-pi/index.md"
      },
      {
        "title": "SDK 框架",
        "rel": "learn-sdk-frameworks",
        "sourceRel": "learn-sdk-frameworks/index.md"
      }
    ]
  },
  {
    "id": "08-agents/ai-agents-from-zero",
    "volume": "08-agents",
    "local": "ai-agents-from-zero",
    "title": "从零构建 AI Agent（didilili）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "didilili/ai-agents-from-zero",
    "site": null,
    "commit": "ea7f28ffe0b2c2650e3936f3bb591560225702b3",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/didilili/ai-agents-from-zero",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "从零构建 AI Agent（didilili）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "深度研搜：前言",
        "rel": "实战项目-深度研搜",
        "sourceRel": "实战项目-深度研搜/0-前言.md"
      },
      {
        "title": "电商问数：前言",
        "rel": "实战项目-电商问数",
        "sourceRel": "实战项目-电商问数/0-前言.md"
      },
      {
        "title": "关键词微调：课程数据与配置",
        "rel": "案例与源码-4-微调",
        "sourceRel": "案例与源码-4-微调/README.md"
      }
    ]
  },
  {
    "id": "08-agents/hello-agents",
    "volume": "08-agents",
    "local": "hello-agents",
    "title": "Hello Agents（Datawhale 智能体教程）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "CC-BY-NC-SA-4.0",
    "licenseLabel": "限非商用",
    "lang": "中文",
    "publishable": true,
    "repo": "datawhalechina/hello-agents",
    "site": null,
    "commit": "4f7682ceafe573d07cd8a7d0b89908500e83227d",
    "entry": "docs/前言.md",
    "featured": false,
    "sourceUrl": "https://github.com/datawhalechina/hello-agents",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "前言",
        "rel": "overview",
        "sourceRel": "docs/前言.md"
      },
      {
        "title": "Hello Agents（Datawhale 智能体教程）",
        "rel": "docs-_sidebar_en",
        "sourceRel": "docs/_sidebar_en.md"
      },
      {
        "title": "第一章 初识智能体",
        "rel": "docs-chapter1-第一章_初识智能体",
        "sourceRel": "docs/chapter1/第一章 初识智能体.md"
      },
      {
        "title": "Chapter 1: Introduction to Agents",
        "rel": "docs-chapter1-Chapter1-Introduction-to-Agents",
        "sourceRel": "docs/chapter1/Chapter1-Introduction-to-Agents.md"
      },
      {
        "title": "第二章 智能体发展史",
        "rel": "docs-chapter2-第二章_智能体发展史",
        "sourceRel": "docs/chapter2/第二章 智能体发展史.md"
      },
      {
        "title": "Chapter 2: History of Agents",
        "rel": "docs-chapter2-Chapter2-History-of-Agents",
        "sourceRel": "docs/chapter2/Chapter2-History-of-Agents.md"
      },
      {
        "title": "第三章 大语言模型基础",
        "rel": "docs-chapter3-第三章_大语言模型基础",
        "sourceRel": "docs/chapter3/第三章 大语言模型基础.md"
      },
      {
        "title": "Chapter 3: Fundamentals of Large Language Models",
        "rel": "docs-chapter3-Chapter3-Fundamentals-of-Large-Language-Models",
        "sourceRel": "docs/chapter3/Chapter3-Fundamentals-of-Large-Language-Models.md"
      },
      {
        "title": "第四章 智能体经典范式构建",
        "rel": "docs-chapter4-第四章_智能体经典范式构建",
        "sourceRel": "docs/chapter4/第四章 智能体经典范式构建.md"
      },
      {
        "title": "Chapter 4: Building Classic Agent Paradigms",
        "rel": "docs-chapter4-Chapter4-Building-Classic-Agent-Paradigms",
        "sourceRel": "docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
      },
      {
        "title": "第五章 基于低代码平台的智能体搭建",
        "rel": "docs-chapter5-第五章_基于低代码平台的智能体搭建",
        "sourceRel": "docs/chapter5/第五章 基于低代码平台的智能体搭建.md"
      },
      {
        "title": "Chapter 5: Building Agents with Low-Code Platforms",
        "rel": "docs-chapter5-Chapter5-Building-Agents-with-Low-Code-Platforms",
        "sourceRel": "docs/chapter5/Chapter5-Building-Agents-with-Low-Code-Platforms.md"
      },
      {
        "title": "第六章 框架开发实践",
        "rel": "docs-chapter6-第六章_框架开发实践",
        "sourceRel": "docs/chapter6/第六章 框架开发实践.md"
      },
      {
        "title": "Chapter 6 Framework Development Practice",
        "rel": "docs-chapter6-Chapter6-Framework-Development-Practice",
        "sourceRel": "docs/chapter6/Chapter6-Framework-Development-Practice.md"
      },
      {
        "title": "第七章 构建你的智能体框架",
        "rel": "docs-chapter7-第七章_构建你的Agent框架",
        "sourceRel": "docs/chapter7/第七章 构建你的Agent框架.md"
      },
      {
        "title": "Chapter 7 Building Your Agent Framework",
        "rel": "docs-chapter7-Chapter7-Building-Your-Agent-Framework",
        "sourceRel": "docs/chapter7/Chapter7-Building-Your-Agent-Framework.md"
      },
      {
        "title": "第八章 记忆与检索",
        "rel": "docs-chapter8-第八章_记忆与检索",
        "sourceRel": "docs/chapter8/第八章 记忆与检索.md"
      },
      {
        "title": "Chapter 8 Memory and Retrieval",
        "rel": "docs-chapter8-Chapter8-Memory-and-Retrieval",
        "sourceRel": "docs/chapter8/Chapter8-Memory-and-Retrieval.md"
      },
      {
        "title": "第九章 上下文工程",
        "rel": "docs-chapter9-第九章_上下文工程",
        "sourceRel": "docs/chapter9/第九章 上下文工程.md"
      },
      {
        "title": "Chapter 9 Context Engineering",
        "rel": "docs-chapter9-Chapter9-Context-Engineering",
        "sourceRel": "docs/chapter9/Chapter9-Context-Engineering.md"
      },
      {
        "title": "第十章 智能体通信协议",
        "rel": "docs-chapter10-第十章_智能体通信协议",
        "sourceRel": "docs/chapter10/第十章 智能体通信协议.md"
      },
      {
        "title": "Chapter 10: Agent Communication Protocols",
        "rel": "docs-chapter10-Chapter10-Agent-Communication-Protocols",
        "sourceRel": "docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
      },
      {
        "title": "第十一章 Agentic-RL",
        "rel": "docs-chapter11-第十一章_Agentic-RL",
        "sourceRel": "docs/chapter11/第十一章 Agentic-RL.md"
      },
      {
        "title": "Chapter 11 Agentic-RL",
        "rel": "docs-chapter11-Chapter11-Agentic-RL",
        "sourceRel": "docs/chapter11/Chapter11-Agentic-RL.md"
      },
      {
        "title": "第十二章 智能体性能评估",
        "rel": "docs-chapter12-第十二章_智能体性能评估",
        "sourceRel": "docs/chapter12/第十二章 智能体性能评估.md"
      },
      {
        "title": "Chapter 12: Agent Performance Evaluation",
        "rel": "docs-chapter12-Chapter12-Agent-Performance-Evaluation",
        "sourceRel": "docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
      },
      {
        "title": "第十五章 构建赛博小镇",
        "rel": "docs-chapter15-第十五章_构建赛博小镇",
        "sourceRel": "docs/chapter15/第十五章 构建赛博小镇.md"
      },
      {
        "title": "Chapter 15: Building Cyber Town",
        "rel": "docs-chapter15-Chapter15-Building-Cyber-Town",
        "sourceRel": "docs/chapter15/Chapter15-Building-Cyber-Town.md"
      },
      {
        "title": "第十六章 毕业设计：构建属于你的多智能体应用",
        "rel": "docs-chapter16-第十六章_毕业设计",
        "sourceRel": "docs/chapter16/第十六章 毕业设计.md"
      },
      {
        "title": "Chapter 16: Graduation Project - Building Your Own Multi-Agent Application",
        "rel": "docs-chapter16-Chapter16-Graduation-Project",
        "sourceRel": "docs/chapter16/Chapter16-Graduation-Project.md"
      },
      {
        "title": "Preface",
        "rel": "docs-Preface",
        "sourceRel": "docs/Preface.md"
      },
      {
        "title": "Hello Agents（Datawhale 智能体教程）",
        "rel": "docs-README_EN",
        "sourceRel": "docs/README_EN.md"
      },
      {
        "title": "Hello Agents（Datawhale 智能体教程）",
        "rel": "docs-README",
        "sourceRel": "docs/README.md"
      }
    ]
  },
  {
    "id": "08-agents/baby-agent",
    "volume": "08-agents",
    "local": "baby-agent",
    "title": "BabyAgent - 后端工程师的 AI Agent 教学项目 (Go 语言版)",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "baby-llm/baby-agent",
    "site": null,
    "commit": "55712911ad0c3d1554c94198370b08d9076fac1c",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/baby-llm/baby-agent",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "BabyAgent - 后端工程师的 AI Agent 教学项目 (Go 语言版)",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "第一章：初识 LLM（Raw HTTP 与 OpenAI SDK）",
        "rel": "ch01",
        "sourceRel": "ch01/README.md"
      },
      {
        "title": "第二章：赋予 AI “手脚”（Tool Calling 和 Agent）",
        "rel": "ch02",
        "sourceRel": "ch02/README.md"
      },
      {
        "title": "第三章：让 Agent “更能看见”（Reasoning 展示、TUI）",
        "rel": "ch03",
        "sourceRel": "ch03/README.md"
      },
      {
        "title": "第四章：让 Agent 接入 MCP 生态",
        "rel": "ch04",
        "sourceRel": "ch04/README.md"
      },
      {
        "title": "第五章：上下文工程（Context Engineering）",
        "rel": "ch05",
        "sourceRel": "ch05/README.md"
      },
      {
        "title": "第六章：记忆机制（Memory System）",
        "rel": "ch06",
        "sourceRel": "ch06/README.md"
      },
      {
        "title": "第七章：Agentic RAG（检索增强生成）",
        "rel": "ch07",
        "sourceRel": "ch07/README.md"
      },
      {
        "title": "第八章：沙盒与安全防御（Guardrails）",
        "rel": "ch08",
        "sourceRel": "ch08/README.md"
      },
      {
        "title": "第九章：Agent 技能插件（Skills）",
        "rel": "ch09",
        "sourceRel": "ch09/README.md"
      },
      {
        "title": "第十章：Web 服务化与 SSE 流式传输",
        "rel": "ch10",
        "sourceRel": "ch10/README.md"
      },
      {
        "title": "第十一章：Agent 可观测性（Observability）",
        "rel": "ch11",
        "sourceRel": "ch11/README.md"
      },
      {
        "title": "React + Vite",
        "rel": "frontend",
        "sourceRel": "frontend/README.md"
      }
    ]
  },
  {
    "id": "08-agents/agent-systems-handbook",
    "volume": "08-agents",
    "local": "agent-systems-handbook",
    "title": "Agent Systems Handbook（智能体系统手册）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "CC BY-NC-SA 4.0",
    "licenseLabel": "限非商用",
    "lang": "英文",
    "publishable": true,
    "repo": "Prompthon-IO/agent-systems-handbook",
    "site": null,
    "commit": "5b71cfa598701a34834f33b42be5f8a422138a3c",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/Prompthon-IO/agent-systems-handbook",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-coding-agents",
        "sourceRel": "case-studies/coding-agents.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-customer-support-agents",
        "sourceRel": "case-studies/customer-support-agents.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-deep-research-agents",
        "sourceRel": "case-studies/deep-research-agents.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-examples-customer-email-assist-starter-index",
        "sourceRel": "case-studies/examples/customer-email-assist-starter/index.mdx"
      },
      {
        "title": "Customer Email Assist Starter",
        "rel": "case-studies-examples-customer-email-assist-starter-README",
        "sourceRel": "case-studies/examples/customer-email-assist-starter/README.md"
      },
      {
        "title": "Customer Email Assist",
        "rel": "case-studies-examples-customer-email-assist-starter-skill-SKILL",
        "sourceRel": "case-studies/examples/customer-email-assist-starter/skill/SKILL.md"
      },
      {
        "title": "Customer Email Assist Support Policy",
        "rel": "case-studies-examples-customer-email-assist-starter-support-policy",
        "sourceRel": "case-studies/examples/customer-email-assist-starter/support-policy.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-examples-customer-support-email-agent-starter-index",
        "sourceRel": "case-studies/examples/customer-support-email-agent-starter/index.mdx"
      },
      {
        "title": "Local Customer Email Reply",
        "rel": "case-studies-examples-customer-support-email-agent-starter-skill-SKILL",
        "sourceRel": "case-studies/examples/customer-support-email-agent-starter/skill/SKILL.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-examples-deep-research-agent-starter-index",
        "sourceRel": "case-studies/examples/deep-research-agent-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-index",
        "sourceRel": "case-studies/index.mdx"
      },
      {
        "title": "Case Studies",
        "rel": "case-studies-README",
        "sourceRel": "case-studies/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-agent-frameworks",
        "sourceRel": "ecosystem/agent-frameworks.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-agent-platforms-and-low-code-builders",
        "sourceRel": "ecosystem/agent-platforms-and-low-code-builders.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-ai-builder-tools-directory",
        "sourceRel": "ecosystem/ai-builder-tools-directory.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-examples-langgraph-starter-index",
        "sourceRel": "ecosystem/examples/langgraph-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-examples-messaging-transaction-assistant-starter-index",
        "sourceRel": "ecosystem/examples/messaging-transaction-assistant-starter/index.mdx"
      },
      {
        "title": "Messaging Transaction Assistant Starter",
        "rel": "ecosystem-examples-messaging-transaction-assistant-starter-README",
        "sourceRel": "ecosystem/examples/messaging-transaction-assistant-starter/README.md"
      },
      {
        "title": "Source Notes",
        "rel": "ecosystem-examples-messaging-transaction-assistant-starter-SOURCE_NOTES",
        "sourceRel": "ecosystem/examples/messaging-transaction-assistant-starter/SOURCE_NOTES.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-framework-comparison",
        "sourceRel": "ecosystem/framework-comparison.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-index",
        "sourceRel": "ecosystem/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-model-ecosystem-map",
        "sourceRel": "ecosystem/model-ecosystem-map.mdx"
      },
      {
        "title": "Ecosystem",
        "rel": "ecosystem-README",
        "sourceRel": "ecosystem/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-agent-systems-what-is-agent-system",
        "sourceRel": "foundations/agent-systems/what-is-agent-system.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-agent-systems-what-is-agent",
        "sourceRel": "foundations/agent-systems/what-is-agent.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-agent-systems-why-agent-systems-matter",
        "sourceRel": "foundations/agent-systems/why-agent-systems-matter.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-agents-vs-workflows",
        "sourceRel": "foundations/agents-vs-workflows.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-history-of-agent-ideas",
        "sourceRel": "foundations/history-of-agent-ideas.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-index",
        "sourceRel": "foundations/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-llm-foundations-for-agent-systems",
        "sourceRel": "foundations/llm-foundations-for-agent-systems.mdx"
      },
      {
        "title": "Foundations",
        "rel": "foundations-README",
        "sourceRel": "foundations/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "foundations-the-agent-system",
        "sourceRel": "foundations/the-agent-system.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-agent-memory-and-retrieval",
        "sourceRel": "patterns/agent-memory-and-retrieval.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-agent-runtime-building-blocks",
        "sourceRel": "patterns/agent-runtime-building-blocks.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-browser-and-computer-use-patterns",
        "sourceRel": "patterns/browser-and-computer-use-patterns.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-examples-agent-memory-retrieval-starter-index",
        "sourceRel": "patterns/examples/agent-memory-retrieval-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-examples-prompt-cache-agent-starter-index",
        "sourceRel": "patterns/examples/prompt-cache-agent-starter/index.mdx"
      },
      {
        "title": "Prompt Cache Agent Starter",
        "rel": "patterns-examples-prompt-cache-agent-starter-README",
        "sourceRel": "patterns/examples/prompt-cache-agent-starter/README.md"
      },
      {
        "title": "Source Notes",
        "rel": "patterns-examples-prompt-cache-agent-starter-SOURCE_NOTES",
        "sourceRel": "patterns/examples/prompt-cache-agent-starter/SOURCE_NOTES.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-index",
        "sourceRel": "patterns/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-planning-and-reflection",
        "sourceRel": "patterns/planning-and-reflection.mdx"
      },
      {
        "title": "Patterns",
        "rel": "patterns-README",
        "sourceRel": "patterns/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-reasoning-and-control-patterns",
        "sourceRel": "patterns/reasoning-and-control-patterns.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "patterns-tool-design-for-agent-systems",
        "sourceRel": "patterns/tool-design-for-agent-systems.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "publications-index",
        "sourceRel": "publications/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "publications-metadata-schema",
        "sourceRel": "publications/metadata-schema.mdx"
      },
      {
        "title": "Publications",
        "rel": "publications-README",
        "sourceRel": "publications/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-assistant-safety-escalation-watch",
        "sourceRel": "radar/2026-04-assistant-safety-escalation-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-cyber-defense-access-policy-watch",
        "sourceRel": "radar/2026-04-cyber-defense-access-policy-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-defense-agent-training-loop-watch",
        "sourceRel": "radar/2026-04-defense-agent-training-loop-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-interoperability-watch",
        "sourceRel": "radar/2026-04-interoperability-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-local-agent-watch",
        "sourceRel": "radar/2026-04-local-agent-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-portable-assistant-memory-watch",
        "sourceRel": "radar/2026-04-portable-assistant-memory-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-04-protocol-watch",
        "sourceRel": "radar/2026-04-protocol-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-05-agentic-shopping-assistant-watch",
        "sourceRel": "radar/2026-05-agentic-shopping-assistant-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-05-customer-support-agent-evaluation-tradeoffs",
        "sourceRel": "radar/2026-05-customer-support-agent-evaluation-tradeoffs.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-05-openai-multicloud-managed-agents",
        "sourceRel": "radar/2026-05-openai-multicloud-managed-agents.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-05-prompt-injection-authority-boundaries",
        "sourceRel": "radar/2026-05-prompt-injection-authority-boundaries.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-06-agent-first-devices-watch",
        "sourceRel": "radar/2026-06-agent-first-devices-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-06-agent-runtime-billing-watch",
        "sourceRel": "radar/2026-06-agent-runtime-billing-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-06-agentic-resource-discovery-watch",
        "sourceRel": "radar/2026-06-agentic-resource-discovery-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-06-open-agent-training-environments-watch",
        "sourceRel": "radar/2026-06-open-agent-training-environments-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-2026-06-prompt-injection-lockdown-mode-watch",
        "sourceRel": "radar/2026-06-prompt-injection-lockdown-mode-watch.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "radar-index",
        "sourceRel": "radar/index.mdx"
      },
      {
        "title": "Radar",
        "rel": "radar-README",
        "sourceRel": "radar/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-builder",
        "sourceRel": "reading-paths/builder.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-contributor",
        "sourceRel": "reading-paths/contributor.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-environment-setup",
        "sourceRel": "reading-paths/environment-setup.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-explorer",
        "sourceRel": "reading-paths/explorer.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-index",
        "sourceRel": "reading-paths/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-practitioner",
        "sourceRel": "reading-paths/practitioner.mdx"
      },
      {
        "title": "Reading Paths",
        "rel": "reading-paths-README",
        "sourceRel": "reading-paths/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "reading-paths-sample-projects",
        "sourceRel": "reading-paths/sample-projects.mdx"
      },
      {
        "title": "Agent Runtime Cache Benchmark",
        "rel": "skills-agent-runtime-cache-benchmark-README",
        "sourceRel": "skills/agent-runtime-cache-benchmark/README.md"
      },
      {
        "title": "Provider Cache Notes",
        "rel": "skills-agent-runtime-cache-benchmark-references-provider-cache-notes",
        "sourceRel": "skills/agent-runtime-cache-benchmark/references/provider-cache-notes.md"
      },
      {
        "title": "Agent Runtime Cache Benchmark",
        "rel": "skills-agent-runtime-cache-benchmark-SKILL",
        "sourceRel": "skills/agent-runtime-cache-benchmark/SKILL.md"
      },
      {
        "title": "AI Search Visibility",
        "rel": "skills-ai-search-visibility-README",
        "sourceRel": "skills/ai-search-visibility/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-ai-search-visibility-references-persistence-contract",
        "sourceRel": "skills/ai-search-visibility/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-ai-search-visibility-references-safety-rules",
        "sourceRel": "skills/ai-search-visibility/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-ai-search-visibility-references-source-notes",
        "sourceRel": "skills/ai-search-visibility/references/source-notes.md"
      },
      {
        "title": "AI Search Visibility",
        "rel": "skills-ai-search-visibility-SKILL",
        "sourceRel": "skills/ai-search-visibility/SKILL.md"
      },
      {
        "title": "Business Data Analysis",
        "rel": "skills-business-data-analysis-README",
        "sourceRel": "skills/business-data-analysis/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-business-data-analysis-references-persistence-contract",
        "sourceRel": "skills/business-data-analysis/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-business-data-analysis-references-safety-rules",
        "sourceRel": "skills/business-data-analysis/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-business-data-analysis-references-source-notes",
        "sourceRel": "skills/business-data-analysis/references/source-notes.md"
      },
      {
        "title": "Business Data Analysis",
        "rel": "skills-business-data-analysis-SKILL",
        "sourceRel": "skills/business-data-analysis/SKILL.md"
      },
      {
        "title": "Business Data Structuring",
        "rel": "skills-business-data-structuring-README",
        "sourceRel": "skills/business-data-structuring/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-business-data-structuring-references-persistence-contract",
        "sourceRel": "skills/business-data-structuring/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-business-data-structuring-references-safety-rules",
        "sourceRel": "skills/business-data-structuring/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-business-data-structuring-references-source-notes",
        "sourceRel": "skills/business-data-structuring/references/source-notes.md"
      },
      {
        "title": "Business Data Structuring",
        "rel": "skills-business-data-structuring-SKILL",
        "sourceRel": "skills/business-data-structuring/SKILL.md"
      },
      {
        "title": "Synthetic workshop facts",
        "rel": "skills-content-strategy-examples-synthetic-workshop-brief",
        "sourceRel": "skills/content-strategy/examples/synthetic-workshop-brief.md"
      },
      {
        "title": "Content Strategy",
        "rel": "skills-content-strategy-README",
        "sourceRel": "skills/content-strategy/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-content-strategy-references-persistence-contract",
        "sourceRel": "skills/content-strategy/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-content-strategy-references-safety-rules",
        "sourceRel": "skills/content-strategy/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-content-strategy-references-source-notes",
        "sourceRel": "skills/content-strategy/references/source-notes.md"
      },
      {
        "title": "Content Strategy",
        "rel": "skills-content-strategy-SKILL",
        "sourceRel": "skills/content-strategy/SKILL.md"
      },
      {
        "title": "Synthetic Client Service Agreement",
        "rel": "skills-course-support-examples-lesson-2-organizer-freelancer-rules-incoming-client-service-agreement",
        "sourceRel": "skills/course-support/examples/lesson-2-organizer-freelancer-rules/incoming/client-service-agreement.md"
      },
      {
        "title": "Synthetic Website Project Ideas",
        "rel": "skills-course-support-examples-lesson-2-organizer-freelancer-rules-incoming-website-project-ideas",
        "sourceRel": "skills/course-support/examples/lesson-2-organizer-freelancer-rules/incoming/website-project-ideas.md"
      },
      {
        "title": "Synthetic Monthly Expense Notes",
        "rel": "skills-course-support-examples-lesson-2-organizer-safe-recovery-incoming-expense-notes",
        "sourceRel": "skills/course-support/examples/lesson-2-organizer-safe-recovery/incoming/expense-notes.md"
      },
      {
        "title": "Synthetic Course Reading List",
        "rel": "skills-course-support-examples-lesson-2-organizer-student-files-incoming-school-reading",
        "sourceRel": "skills/course-support/examples/lesson-2-organizer-student-files/incoming/school-reading.md"
      },
      {
        "title": "Workshop brief",
        "rel": "skills-course-support-examples-lesson-2-research-brief",
        "sourceRel": "skills/course-support/examples/lesson-2/research/brief.md"
      },
      {
        "title": "Room update",
        "rel": "skills-course-support-examples-lesson-2-research-room-update",
        "sourceRel": "skills/course-support/examples/lesson-2/research/room-update.md"
      },
      {
        "title": "Lesson 2 — Organize, Understand, Automate",
        "rel": "skills-course-support-lessons-lesson-2",
        "sourceRel": "skills/course-support/lessons/lesson-2.md"
      },
      {
        "title": "Lesson 3 — Build → Test → Deploy",
        "rel": "skills-course-support-lessons-lesson-3",
        "sourceRel": "skills/course-support/lessons/lesson-3.md"
      },
      {
        "title": "Lesson 4 — Structure → Operate → Analyze",
        "rel": "skills-course-support-lessons-lesson-4",
        "sourceRel": "skills/course-support/lessons/lesson-4.md"
      },
      {
        "title": "Lesson 5 — Plan → Distribute → Discover",
        "rel": "skills-course-support-lessons-lesson-5",
        "sourceRel": "skills/course-support/lessons/lesson-5.md"
      },
      {
        "title": "GW02 Professional AI Agent Course skill support",
        "rel": "skills-course-support-README",
        "sourceRel": "skills/course-support/README.md"
      },
      {
        "title": "Course persistence contract v1",
        "rel": "skills-course-support-references-backend-contract",
        "sourceRel": "skills/course-support/references/backend-contract.md"
      },
      {
        "title": "Web App dependency: classroom persistence and safe Social access",
        "rel": "skills-course-support-references-backend-dependency",
        "sourceRel": "skills/course-support/references/backend-dependency.md"
      },
      {
        "title": "Lesson 2 — 文件整理、资料理解、工作流自动化",
        "rel": "skills-course-support-zh-Hans-lesson-2",
        "sourceRel": "skills/course-support/zh-Hans/lesson-2.md"
      },
      {
        "title": "第 3 课：Build → Test → Deploy",
        "rel": "skills-course-support-zh-Hans-lesson-3",
        "sourceRel": "skills/course-support/zh-Hans/lesson-3.md"
      },
      {
        "title": "第 4 课：Structure → Operate → Analyze",
        "rel": "skills-course-support-zh-Hans-lesson-4",
        "sourceRel": "skills/course-support/zh-Hans/lesson-4.md"
      },
      {
        "title": "第 5 课：Plan → Distribute → Discover",
        "rel": "skills-course-support-zh-Hans-lesson-5",
        "sourceRel": "skills/course-support/zh-Hans/lesson-5.md"
      },
      {
        "title": "CRM Operations",
        "rel": "skills-crm-operations-README",
        "sourceRel": "skills/crm-operations/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-crm-operations-references-persistence-contract",
        "sourceRel": "skills/crm-operations/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-crm-operations-references-safety-rules",
        "sourceRel": "skills/crm-operations/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-crm-operations-references-source-notes",
        "sourceRel": "skills/crm-operations/references/source-notes.md"
      },
      {
        "title": "CRM Operations",
        "rel": "skills-crm-operations-SKILL",
        "sourceRel": "skills/crm-operations/SKILL.md"
      },
      {
        "title": "Daily News Watcher",
        "rel": "skills-daily-news-watcher-README",
        "sourceRel": "skills/daily-news-watcher/README.md"
      },
      {
        "title": "Fetch Rules",
        "rel": "skills-daily-news-watcher-references-fetch-rules",
        "sourceRel": "skills/daily-news-watcher/references/fetch-rules.md"
      },
      {
        "title": "Daily News Watcher",
        "rel": "skills-daily-news-watcher-SKILL",
        "sourceRel": "skills/daily-news-watcher/SKILL.md"
      },
      {
        "title": "Garbage Collector",
        "rel": "skills-garbage-collector-README",
        "sourceRel": "skills/garbage-collector/README.md"
      },
      {
        "title": "Garbage Collector",
        "rel": "skills-garbage-collector-SKILL",
        "sourceRel": "skills/garbage-collector/SKILL.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "skills-index",
        "sourceRel": "skills/index.mdx"
      },
      {
        "title": "Local Document Organizer",
        "rel": "skills-local-document-organizer-README",
        "sourceRel": "skills/local-document-organizer/README.md"
      },
      {
        "title": "Course persistence",
        "rel": "skills-local-document-organizer-references-persistence-contract",
        "sourceRel": "skills/local-document-organizer/references/persistence-contract.md"
      },
      {
        "title": "Safety Rules",
        "rel": "skills-local-document-organizer-references-safety-rules",
        "sourceRel": "skills/local-document-organizer/references/safety-rules.md"
      },
      {
        "title": "Source notes",
        "rel": "skills-local-document-organizer-references-source-notes",
        "sourceRel": "skills/local-document-organizer/references/source-notes.md"
      },
      {
        "title": "Local Document Organizer",
        "rel": "skills-local-document-organizer-SKILL",
        "sourceRel": "skills/local-document-organizer/SKILL.md"
      },
      {
        "title": "Personal Knowledge Capture",
        "rel": "skills-personal-knowledge-capture-README",
        "sourceRel": "skills/personal-knowledge-capture/README.md"
      },
      {
        "title": "Course persistence",
        "rel": "skills-personal-knowledge-capture-references-persistence-contract",
        "sourceRel": "skills/personal-knowledge-capture/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-personal-knowledge-capture-references-safety-rules",
        "sourceRel": "skills/personal-knowledge-capture/references/safety-rules.md"
      },
      {
        "title": "Source notes",
        "rel": "skills-personal-knowledge-capture-references-source-notes",
        "sourceRel": "skills/personal-knowledge-capture/references/source-notes.md"
      },
      {
        "title": "Supported File Types",
        "rel": "skills-personal-knowledge-capture-references-supported-file-types",
        "sourceRel": "skills/personal-knowledge-capture/references/supported-file-types.md"
      },
      {
        "title": "Personal Knowledge Capture",
        "rel": "skills-personal-knowledge-capture-SKILL",
        "sourceRel": "skills/personal-knowledge-capture/SKILL.md"
      },
      {
        "title": "Personal Workflow Automation",
        "rel": "skills-personal-workflow-automation-README",
        "sourceRel": "skills/personal-workflow-automation/README.md"
      },
      {
        "title": "Course persistence",
        "rel": "skills-personal-workflow-automation-references-persistence-contract",
        "sourceRel": "skills/personal-workflow-automation/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-personal-workflow-automation-references-safety-rules",
        "sourceRel": "skills/personal-workflow-automation/references/safety-rules.md"
      },
      {
        "title": "Source notes",
        "rel": "skills-personal-workflow-automation-references-source-notes",
        "sourceRel": "skills/personal-workflow-automation/references/source-notes.md"
      },
      {
        "title": "Personal Workflow Automation",
        "rel": "skills-personal-workflow-automation-SKILL",
        "sourceRel": "skills/personal-workflow-automation/SKILL.md"
      },
      {
        "title": "Presentation Template Designer",
        "rel": "skills-presentation-template-designer-README",
        "sourceRel": "skills/presentation-template-designer/README.md"
      },
      {
        "title": "Reusable Layout Catalog",
        "rel": "skills-presentation-template-designer-references-layout-catalog",
        "sourceRel": "skills/presentation-template-designer/references/layout-catalog.md"
      },
      {
        "title": "Presentation Template Toolchain Research",
        "rel": "skills-presentation-template-designer-references-market-research",
        "sourceRel": "skills/presentation-template-designer/references/market-research.md"
      },
      {
        "title": "Template Manifest Schema",
        "rel": "skills-presentation-template-designer-references-template-manifest-schema",
        "sourceRel": "skills/presentation-template-designer/references/template-manifest-schema.md"
      },
      {
        "title": "Presentation Template Designer",
        "rel": "skills-presentation-template-designer-SKILL",
        "sourceRel": "skills/presentation-template-designer/SKILL.md"
      },
      {
        "title": "Price Watcher",
        "rel": "skills-price-watcher-README",
        "sourceRel": "skills/price-watcher/README.md"
      },
      {
        "title": "Price Parsing",
        "rel": "skills-price-watcher-references-price-parsing",
        "sourceRel": "skills/price-watcher/references/price-parsing.md"
      },
      {
        "title": "SQLite Schema",
        "rel": "skills-price-watcher-references-schema",
        "sourceRel": "skills/price-watcher/references/schema.md"
      },
      {
        "title": "Source Discovery And Product Normalization",
        "rel": "skills-price-watcher-references-source-discovery",
        "sourceRel": "skills/price-watcher/references/source-discovery.md"
      },
      {
        "title": "Price Watcher",
        "rel": "skills-price-watcher-SKILL",
        "sourceRel": "skills/price-watcher/SKILL.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "skills-professional-ai-agent-course",
        "sourceRel": "skills/professional-ai-agent-course.mdx"
      },
      {
        "title": "Prompt Cache Agent Harness",
        "rel": "skills-prompt-cache-agent-harness-README",
        "sourceRel": "skills/prompt-cache-agent-harness/README.md"
      },
      {
        "title": "Source Notes",
        "rel": "skills-prompt-cache-agent-harness-references-source-notes",
        "sourceRel": "skills/prompt-cache-agent-harness/references/source-notes.md"
      },
      {
        "title": "Prompt Cache Agent Harness",
        "rel": "skills-prompt-cache-agent-harness-SKILL",
        "sourceRel": "skills/prompt-cache-agent-harness/SKILL.md"
      },
      {
        "title": "Prompthon Social Campaign Manager",
        "rel": "skills-prompthon-social-campaign-manager-README",
        "sourceRel": "skills/prompthon-social-campaign-manager/README.md"
      },
      {
        "title": "Social API Contract",
        "rel": "skills-prompthon-social-campaign-manager-references-api-contract",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/api-contract.md"
      },
      {
        "title": "Browser Bridge Contract",
        "rel": "skills-prompthon-social-campaign-manager-references-browser-bridge-contract",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/browser-bridge-contract.md"
      },
      {
        "title": "Canonical Host source contract",
        "rel": "skills-prompthon-social-campaign-manager-references-canonical-host-contract",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/canonical-host-contract.md"
      },
      {
        "title": "Required demo backend capability — not yet provisioned",
        "rel": "skills-prompthon-social-campaign-manager-references-course-backend-dependency",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/course-backend-dependency.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-prompthon-social-campaign-manager-references-persistence-contract",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/persistence-contract.md"
      },
      {
        "title": "Preserved production reference",
        "rel": "skills-prompthon-social-campaign-manager-references-production-guide",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/production-guide.md"
      },
      {
        "title": "Preserved production reference",
        "rel": "skills-prompthon-social-campaign-manager-references-production-workflow",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/production-workflow.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-prompthon-social-campaign-manager-references-safety-rules",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-prompthon-social-campaign-manager-references-source-notes",
        "sourceRel": "skills/prompthon-social-campaign-manager/references/source-notes.md"
      },
      {
        "title": "Prompthon Social Campaign Manager",
        "rel": "skills-prompthon-social-campaign-manager-SKILL",
        "sourceRel": "skills/prompthon-social-campaign-manager/SKILL.md"
      },
      {
        "title": "Safety Escalation Review",
        "rel": "skills-safety-escalation-review-README",
        "sourceRel": "skills/safety-escalation-review/README.md"
      },
      {
        "title": "Escalation Checklist",
        "rel": "skills-safety-escalation-review-references-escalation-checklist",
        "sourceRel": "skills/safety-escalation-review/references/escalation-checklist.md"
      },
      {
        "title": "Safety Escalation Review",
        "rel": "skills-safety-escalation-review-SKILL",
        "sourceRel": "skills/safety-escalation-review/SKILL.md"
      },
      {
        "title": "Vercel Deploy",
        "rel": "skills-vercel-deploy-README",
        "sourceRel": "skills/vercel-deploy/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-vercel-deploy-references-persistence-contract",
        "sourceRel": "skills/vercel-deploy/references/persistence-contract.md"
      },
      {
        "title": "Provider workflow",
        "rel": "skills-vercel-deploy-references-provider-workflow",
        "sourceRel": "skills/vercel-deploy/references/provider-workflow.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-vercel-deploy-references-safety-rules",
        "sourceRel": "skills/vercel-deploy/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-vercel-deploy-references-source-notes",
        "sourceRel": "skills/vercel-deploy/references/source-notes.md"
      },
      {
        "title": "Vercel Deploy",
        "rel": "skills-vercel-deploy-SKILL",
        "sourceRel": "skills/vercel-deploy/SKILL.md"
      },
      {
        "title": "Web Builder",
        "rel": "skills-web-builder-README",
        "sourceRel": "skills/web-builder/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-web-builder-references-persistence-contract",
        "sourceRel": "skills/web-builder/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-web-builder-references-safety-rules",
        "sourceRel": "skills/web-builder/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-web-builder-references-source-notes",
        "sourceRel": "skills/web-builder/references/source-notes.md"
      },
      {
        "title": "Web Builder",
        "rel": "skills-web-builder-SKILL",
        "sourceRel": "skills/web-builder/SKILL.md"
      },
      {
        "title": "Web App Testing",
        "rel": "skills-webapp-testing-README",
        "sourceRel": "skills/webapp-testing/README.md"
      },
      {
        "title": "Persistence contract",
        "rel": "skills-webapp-testing-references-persistence-contract",
        "sourceRel": "skills/webapp-testing/references/persistence-contract.md"
      },
      {
        "title": "Safety rules",
        "rel": "skills-webapp-testing-references-safety-rules",
        "sourceRel": "skills/webapp-testing/references/safety-rules.md"
      },
      {
        "title": "Source and license notes",
        "rel": "skills-webapp-testing-references-source-notes",
        "sourceRel": "skills/webapp-testing/references/source-notes.md"
      },
      {
        "title": "Web App Testing",
        "rel": "skills-webapp-testing-SKILL",
        "sourceRel": "skills/webapp-testing/SKILL.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "specializations-ai-native-internship",
        "sourceRel": "specializations/ai-native-internship.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-agent-security-and-prompt-injection",
        "sourceRel": "systems/agent-security-and-prompt-injection.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-agent-ui-protocols-and-generative-ui",
        "sourceRel": "systems/agent-ui-protocols-and-generative-ui.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-context-engineering",
        "sourceRel": "systems/context-engineering.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-evaluation-and-observability",
        "sourceRel": "systems/evaluation-and-observability.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-examples-weather-mcp-server-starter-index",
        "sourceRel": "systems/examples/weather-mcp-server-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-index",
        "sourceRel": "systems/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "systems-protocols-and-interoperability",
        "sourceRel": "systems/protocols-and-interoperability.mdx"
      },
      {
        "title": "Systems",
        "rel": "systems-README",
        "sourceRel": "systems/README.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-codex-github-and-repository",
        "sourceRel": "workshops/codex/github-and-repository.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-codex-index",
        "sourceRel": "workshops/codex/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-codex-install-mac",
        "sourceRel": "workshops/codex/install-mac.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-codex-install-windows",
        "sourceRel": "workshops/codex/install-windows.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-desktop-agents-claude-code",
        "sourceRel": "workshops/desktop-agents/claude-code.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "workshops-desktop-agents-codex",
        "sourceRel": "workshops/desktop-agents/codex.mdx"
      }
    ]
  },
  {
    "id": "08-agents/agentic-engineering-handbook",
    "volume": "08-agents",
    "local": "agentic-engineering-handbook",
    "title": "Agentic Engineering Handbook",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "keyuchen21/agentic-engineering-handbook",
    "site": null,
    "commit": "002d5456ac717fb6c4444005c9bb2ceff416d8c7",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/keyuchen21/agentic-engineering-handbook",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agentic Engineering Handbook",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "v0: Bash is All You Need",
        "rel": "tutorials-agent-loop-v0-bash-is-all-you-need",
        "sourceRel": "tutorials/agent-loop/v0-bash-is-all-you-need.md"
      },
      {
        "title": "v1: Model as Agent",
        "rel": "tutorials-agent-loop-v1-model-as-agent",
        "sourceRel": "tutorials/agent-loop/v1-model-as-agent.md"
      },
      {
        "title": "v2: Structured Planning with Todo",
        "rel": "tutorials-agent-loop-v2-structured-planning",
        "sourceRel": "tutorials/agent-loop/v2-structured-planning.md"
      },
      {
        "title": "v3: Subagent Mechanism",
        "rel": "tutorials-agent-loop-v3-subagent-mechanism",
        "sourceRel": "tutorials/agent-loop/v3-subagent-mechanism.md"
      },
      {
        "title": "v4: Skills Mechanism",
        "rel": "tutorials-agent-loop-v4-skills-mechanism",
        "sourceRel": "tutorials/agent-loop/v4-skills-mechanism.md"
      }
    ]
  },
  {
    "id": "08-agents/deepagents-in-action",
    "volume": "08-agents",
    "local": "deepagents-in-action",
    "title": "《Deep Agents 实战》",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "license": "CC BY-NC-SA 4.0（内容）/ MIT（网站源码）",
    "licenseLabel": "限非商用",
    "lang": "中文",
    "publishable": true,
    "repo": "datawhalechina/deepagents-in-action",
    "site": null,
    "commit": "4097ff944f9ffa1bdfe2dd04f751f4416b058860",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/datawhalechina/deepagents-in-action",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "《Deep Agents 实战》",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "第 1 章：从 Agent Framework 到 Agent Harness — Deep Agents 的诞生逻辑",
        "rel": "content",
        "sourceRel": "content/ch01-agent-harness.md"
      }
    ]
  },
  {
    "id": "08-agents/anthropic-cookbook",
    "volume": "08-agents",
    "local": "anthropic-cookbook",
    "title": "Claude Cookbooks",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "anthropics/anthropic-cookbook",
    "site": null,
    "commit": "a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/anthropics/anthropic-cookbook",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Cookbooks",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-classification-evaluation-README",
        "sourceRel": "capabilities/classification/evaluation/README.md"
      },
      {
        "title": "Classification with Claude",
        "rel": "capabilities-classification-README",
        "sourceRel": "capabilities/classification/README.md"
      },
      {
        "title": "Ad Creative Acceptance Policy — Northwind Media Network",
        "rel": "capabilities-content_moderation-data-ad_creatives-policies",
        "sourceRel": "capabilities/content_moderation/data/ad_creatives/policies.md"
      },
      {
        "title": "Third-Party Listing Policy — Northwind Marketplace",
        "rel": "capabilities-content_moderation-data-product_listings-policies",
        "sourceRel": "capabilities/content_moderation/data/product_listings/policies.md"
      },
      {
        "title": "Community Content Policy — Northwind Media",
        "rel": "capabilities-content_moderation-data-ugc-policies",
        "sourceRel": "capabilities/content_moderation/data/ugc/policies.md"
      },
      {
        "title": "Evaluation",
        "rel": "capabilities-content_moderation-evaluation-README",
        "sourceRel": "capabilities/content_moderation/evaluation/README.md"
      },
      {
        "title": "Content policy enforcement with Claude",
        "rel": "capabilities-content_moderation-README",
        "sourceRel": "capabilities/content_moderation/README.md"
      },
      {
        "title": "Retrieval Augmented Generation with Contextual Embeddings",
        "rel": "capabilities-contextual-embeddings-README",
        "sourceRel": "capabilities/contextual-embeddings/README.md"
      },
      {
        "title": "Knowledge Graph Extraction Evaluation",
        "rel": "capabilities-knowledge_graph-evaluation-README",
        "sourceRel": "capabilities/knowledge_graph/evaluation/README.md"
      },
      {
        "title": "Knowledge Graph Construction with Claude",
        "rel": "capabilities-knowledge_graph-README",
        "sourceRel": "capabilities/knowledge_graph/README.md"
      },
      {
        "title": "Claude Capabilities",
        "rel": "capabilities-README",
        "sourceRel": "capabilities/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-retrieval_augmented_generation-evaluation-README",
        "sourceRel": "capabilities/retrieval_augmented_generation/evaluation/README.md"
      },
      {
        "title": "Retrieval Augmented Generation with Claude",
        "rel": "capabilities-retrieval_augmented_generation-README",
        "sourceRel": "capabilities/retrieval_augmented_generation/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-summarization-evaluation-README",
        "sourceRel": "capabilities/summarization/evaluation/README.md"
      },
      {
        "title": "Summarization with Claude",
        "rel": "capabilities-summarization-README",
        "sourceRel": "capabilities/summarization/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-text_to_sql-evaluation-README",
        "sourceRel": "capabilities/text_to_sql/evaluation/README.md"
      },
      {
        "title": "Text-to-SQL with Claude",
        "rel": "capabilities-text_to_sql-README",
        "sourceRel": "capabilities/text_to_sql/README.md"
      },
      {
        "title": "CLAUDE.md - Chief of Staff Context",
        "rel": "claude_agent_sdk-chief_of_staff_agent-CLAUDE",
        "sourceRel": "claude_agent_sdk/chief_of_staff_agent/CLAUDE.md"
      },
      {
        "title": "Chief of Staff Agent Architecture",
        "rel": "claude_agent_sdk-chief_of_staff_agent-flow_diagram",
        "sourceRel": "claude_agent_sdk/chief_of_staff_agent/flow_diagram.md"
      },
      {
        "title": "Budget Impact Analysis: Hiring 3 Senior Engineers",
        "rel": "claude_agent_sdk-chief_of_staff_agent-output_reports-hiring_decision",
        "sourceRel": "claude_agent_sdk/chief_of_staff_agent/output_reports/hiring_decision.md"
      },
      {
        "title": "Q2 2024 Financial Forecast Report",
        "rel": "claude_agent_sdk-chief_of_staff_agent-output_reports-Q2_2024_Financial_Forecast",
        "sourceRel": "claude_agent_sdk/chief_of_staff_agent/output_reports/Q2_2024_Financial_Forecast.md"
      },
      {
        "title": "Tier 1 — Local Docker",
        "rel": "claude_agent_sdk-hosting-docker-README",
        "sourceRel": "claude_agent_sdk/hosting/docker/README.md"
      },
      {
        "title": "Tier 3 — Kubernetes (pod-per-session)",
        "rel": "claude_agent_sdk-hosting-kubernetes-README",
        "sourceRel": "claude_agent_sdk/hosting/kubernetes/README.md"
      },
      {
        "title": "Tier 2 — Modal",
        "rel": "claude_agent_sdk-hosting-modal-README",
        "sourceRel": "claude_agent_sdk/hosting/modal/README.md"
      },
      {
        "title": "Hosting the research agent",
        "rel": "claude_agent_sdk-hosting-README",
        "sourceRel": "claude_agent_sdk/hosting/README.md"
      },
      {
        "title": "Observability Agent Architecture",
        "rel": "claude_agent_sdk-observability_agent-architecture_diagram",
        "sourceRel": "claude_agent_sdk/observability_agent/architecture_diagram.md"
      },
      {
        "title": "Building Powerful Agents with the Claude Agent SDK",
        "rel": "claude_agent_sdk-README",
        "sourceRel": "claude_agent_sdk/README.md"
      },
      {
        "title": "Research Agent Architecture",
        "rel": "claude_agent_sdk-research_agent-architecture_diagram",
        "sourceRel": "claude_agent_sdk/research_agent/architecture_diagram.md"
      },
      {
        "title": "CMA as an MCP server",
        "rel": "managed_agents-cma-mcp-CLAUDE",
        "sourceRel": "managed_agents/cma-mcp/CLAUDE.md"
      },
      {
        "title": "CMA as an MCP server",
        "rel": "managed_agents-cma-mcp-README",
        "sourceRel": "managed_agents/cma-mcp/README.md"
      },
      {
        "title": "Setup tips & tricks — CMA as an MCP server",
        "rel": "managed_agents-cma-mcp-skill",
        "sourceRel": "managed_agents/cma-mcp/skill.md"
      },
      {
        "title": "Gate, expense approver",
        "rel": "managed_agents-example_data-gate-README",
        "sourceRel": "managed_agents/example_data/gate/README.md"
      },
      {
        "title": "Iterate, get the tests green",
        "rel": "managed_agents-example_data-iterate-README",
        "sourceRel": "managed_agents/example_data/iterate/README.md"
      },
      {
        "title": "Orchestrate, drive an issue to a merged PR",
        "rel": "managed_agents-example_data-orchestrate-README",
        "sourceRel": "managed_agents/example_data/orchestrate/README.md"
      },
      {
        "title": "Example data",
        "rel": "managed_agents-example_data-OVERVIEW",
        "sourceRel": "managed_agents/example_data/OVERVIEW.md"
      },
      {
        "title": "Runbook: OOMKilled / OutOfMemoryError",
        "rel": "managed_agents-example_data-sre-runbooks-oom",
        "sourceRel": "managed_agents/example_data/sre/runbooks/oom.md"
      },
      {
        "title": "Linear × Claude Managed Agents bridge",
        "rel": "managed_agents-linear-CLAUDE",
        "sourceRel": "managed_agents/linear/CLAUDE.md"
      },
      {
        "title": "Linear × Claude Managed Agents",
        "rel": "managed_agents-linear-README",
        "sourceRel": "managed_agents/linear/README.md"
      },
      {
        "title": "Setup tips & tricks — Linear × CMA webhook bridge",
        "rel": "managed_agents-linear-skill",
        "sourceRel": "managed_agents/linear/skill.md"
      },
      {
        "title": "MongoDB on Claude Managed Agents",
        "rel": "managed_agents-mongodb_on_cma-README",
        "sourceRel": "managed_agents/mongodb_on_cma/README.md"
      },
      {
        "title": "Claude Managed Agents cookbooks",
        "rel": "managed_agents-README",
        "sourceRel": "managed_agents/README.md"
      },
      {
        "title": "Road trip planner (Claude Managed Agents + Next.js)",
        "rel": "managed_agents-roadtrip_planner-CLAUDE",
        "sourceRel": "managed_agents/roadtrip_planner/CLAUDE.md"
      },
      {
        "title": "Road trip planner: stream sessions, scope vault credentials, override models, and review plans agent-to-agent",
        "rel": "managed_agents-roadtrip_planner-README",
        "sourceRel": "managed_agents/roadtrip_planner/README.md"
      },
      {
        "title": "Setup walkthrough",
        "rel": "managed_agents-roadtrip_planner-skill",
        "sourceRel": "managed_agents/roadtrip_planner/skill.md"
      },
      {
        "title": "Cloudflare demo — Self-Hosted Sandboxes (pure-Worker variant)",
        "rel": "managed_agents-self_hosted_sandboxes-cf-worker-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/cf-worker/README.md"
      },
      {
        "title": "Cloudflare demo — Self-Hosted Sandboxes (Container variant)",
        "rel": "managed_agents-self_hosted_sandboxes-cf-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/cf/README.md"
      },
      {
        "title": "Daytona demo — Self-Hosted Sandboxes",
        "rel": "managed_agents-self_hosted_sandboxes-daytona-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/daytona/README.md"
      },
      {
        "title": "Docker demo — Self-Hosted Sandboxes",
        "rel": "managed_agents-self_hosted_sandboxes-docker-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/docker/README.md"
      },
      {
        "title": "Upgrading \"Running a self-hosted worker\"",
        "rel": "managed_agents-self_hosted_sandboxes-docs-upgrade-guide",
        "sourceRel": "managed_agents/self_hosted_sandboxes/docs/upgrade-guide.md"
      },
      {
        "title": "Running a self-hosted worker",
        "rel": "managed_agents-self_hosted_sandboxes-docs-usage-guide",
        "sourceRel": "managed_agents/self_hosted_sandboxes/docs/usage-guide.md"
      },
      {
        "title": "Modal demo — Self-Hosted Sandboxes",
        "rel": "managed_agents-self_hosted_sandboxes-modal-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/modal/README.md"
      },
      {
        "title": "Self-Hosted Sandboxes",
        "rel": "managed_agents-self_hosted_sandboxes-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/README.md"
      },
      {
        "title": "Vercel demo — Self-Hosted Sandboxes",
        "rel": "managed_agents-self_hosted_sandboxes-vercel-README",
        "sourceRel": "managed_agents/self_hosted_sandboxes/vercel/README.md"
      },
      {
        "title": "Sentry triage × Claude Managed Agents",
        "rel": "managed_agents-sentry-CLAUDE",
        "sourceRel": "managed_agents/sentry/CLAUDE.md"
      },
      {
        "title": "Sentry triage × Claude Managed Agents",
        "rel": "managed_agents-sentry-README",
        "sourceRel": "managed_agents/sentry/README.md"
      },
      {
        "title": "Setup tips & tricks: scheduled Sentry triage with vault env-var credentials",
        "rel": "managed_agents-sentry-skill",
        "sourceRel": "managed_agents/sentry/skill.md"
      },
      {
        "title": "Slack × Claude Managed Agents bridge",
        "rel": "managed_agents-slack-CLAUDE",
        "sourceRel": "managed_agents/slack/CLAUDE.md"
      },
      {
        "title": "Slack × Claude Managed Agents",
        "rel": "managed_agents-slack-README",
        "sourceRel": "managed_agents/slack/README.md"
      },
      {
        "title": "Setup tips & tricks — Slack × CMA webhook bridge",
        "rel": "managed_agents-slack-skill",
        "sourceRel": "managed_agents/slack/skill.md"
      },
      {
        "title": "Claude Cookbooks",
        "rel": "patterns-agents-prompts-citations_agent",
        "sourceRel": "patterns/agents/prompts/citations_agent.md"
      },
      {
        "title": "Claude Cookbooks",
        "rel": "patterns-agents-prompts-research_lead_agent",
        "sourceRel": "patterns/agents/prompts/research_lead_agent.md"
      },
      {
        "title": "Claude Cookbooks",
        "rel": "patterns-agents-prompts-research_subagent",
        "sourceRel": "patterns/agents/prompts/research_subagent.md"
      },
      {
        "title": "Building Effective Agents Cookbook",
        "rel": "patterns-agents-README",
        "sourceRel": "patterns/agents/README.md"
      },
      {
        "title": "Skills Cookbook - Claude Code Guide",
        "rel": "skills-CLAUDE",
        "sourceRel": "skills/CLAUDE.md"
      },
      {
        "title": "Financial Ratio Calculator Skill",
        "rel": "skills-custom_skills-analyzing-financial-statements-SKILL",
        "sourceRel": "skills/custom_skills/analyzing-financial-statements/SKILL.md"
      },
      {
        "title": "Brand Guidelines Reference",
        "rel": "skills-custom_skills-applying-brand-guidelines-REFERENCE",
        "sourceRel": "skills/custom_skills/applying-brand-guidelines/REFERENCE.md"
      },
      {
        "title": "Corporate Brand Guidelines Skill",
        "rel": "skills-custom_skills-applying-brand-guidelines-SKILL",
        "sourceRel": "skills/custom_skills/applying-brand-guidelines/SKILL.md"
      },
      {
        "title": "Financial Modeling Suite",
        "rel": "skills-custom_skills-creating-financial-models-SKILL",
        "sourceRel": "skills/custom_skills/creating-financial-models/SKILL.md"
      },
      {
        "title": "Claude Skills Cookbook 🚀",
        "rel": "skills-README",
        "sourceRel": "skills/README.md"
      },
      {
        "title": "Deepgram < Claude Cookbooks",
        "rel": "third_party-Deepgram-README",
        "sourceRel": "third_party/Deepgram/README.md"
      },
      {
        "title": "ElevenLabs < Claude Cookbooks",
        "rel": "third_party-ElevenLabs-README",
        "sourceRel": "third_party/ElevenLabs/README.md"
      },
      {
        "title": "LlamaIndex < Claude Cookbooks",
        "rel": "third_party-LlamaIndex-README",
        "sourceRel": "third_party/LlamaIndex/README.md"
      },
      {
        "title": "Embeddings",
        "rel": "third_party-VoyageAI-how_to_create_embeddings",
        "sourceRel": "third_party/VoyageAI/how_to_create_embeddings.md"
      }
    ]
  },
  {
    "id": "08-agents/openai-cookbook",
    "volume": "08-agents",
    "local": "openai-cookbook",
    "title": "OpenAI Cookbook",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "openai/openai-cookbook",
    "site": null,
    "commit": "a0709e05a54d8dd1c4d9be3fc0a41526c3496c39",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/openai/openai-cookbook",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "OpenAI Cookbook",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Building workspace agents in ChatGPT to complete repeatable, end-to-end work",
        "rel": "articles",
        "sourceRel": "articles/chatgpt-agents-sales-meeting-prep.md"
      },
      {
        "title": "How to build an agent with the Node.js SDK",
        "rel": "examples",
        "sourceRel": "examples/How_to_build_an_agent_with_the_node_sdk.mdx"
      }
    ]
  },
  {
    "id": "08-agents/gemini-cookbook",
    "volume": "08-agents",
    "local": "gemini-cookbook",
    "title": "Gemini API Cookbook",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "google-gemini/cookbook",
    "site": null,
    "commit": "a1b990c859a34823c982f70edaff35b830511c64",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/google-gemini/cookbook",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Welcome to the Gemini API Cookbook",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Gemini API Examples",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Gemini API Tutorials",
        "rel": "quickstarts",
        "sourceRel": "quickstarts/README.md"
      },
      {
        "title": "JavaScript/TypeScript Quickstarts",
        "rel": "quickstarts-js",
        "sourceRel": "quickstarts-js/README.md"
      },
      {
        "title": "Gemini API Cookbook Quality Assurance & Linting Tools",
        "rel": "tools",
        "sourceRel": "tools/README.md"
      }
    ]
  },
  {
    "id": "08-agents/awesome-llm-apps",
    "volume": "08-agents",
    "local": "awesome-llm-apps",
    "title": "Awesome LLM Apps",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "Shubhamsaboo/awesome-llm-apps",
    "site": null,
    "commit": "9848ec842c5f559ad42654288cc6a38db6b175fb",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Shubhamsaboo/awesome-llm-apps",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome LLM Apps",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "🧩 Agent Skills",
        "rel": "agent_skills",
        "sourceRel": "agent_skills/README.md"
      }
    ]
  },
  {
    "id": "08-agents/openai-agents-python",
    "volume": "08-agents",
    "local": "openai-agents-python",
    "title": "OpenAI Agents SDK（Python）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "openai/openai-agents-python",
    "site": null,
    "commit": "83c737fd0b8d9a53bd39fa2a0856070417bb0bd3",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/openai/openai-agents-python",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "OpenAI Agents SDK",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "OpenAI Agents SDK",
        "rel": "docs",
        "sourceRel": "docs/index.md"
      },
      {
        "title": "Running the example suite",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Packaged integration tests",
        "rel": "integration_tests",
        "sourceRel": "integration_tests/README.md"
      },
      {
        "title": "Tests",
        "rel": "tests",
        "sourceRel": "tests/README.md"
      }
    ]
  },
  {
    "id": "08-agents/pocket-manus",
    "volume": "08-agents",
    "local": "pocket-manus",
    "title": "Open Manus with PocketFlow Integration",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "Osly-AI/PocketManus",
    "site": null,
    "commit": "8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Osly-AI/PocketManus",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Open Manus with PocketFlow Integration",
        "rel": "overview",
        "sourceRel": "README.md"
      }
    ]
  },
  {
    "id": "09-harness/learn-harness-engineering",
    "volume": "09-harness",
    "local": "learn-harness-engineering",
    "title": "Learn Harness Engineering",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "walkinglabs/learn-harness-engineering",
    "site": null,
    "commit": "77e7a3e21469dcbece2558086c8d91657abeaa40",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/walkinglabs/learn-harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Learn Harness Engineering",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "拆解 Claude Code 的 harness 设计",
        "rel": "docs-zh-harness-designs-claude-code-index",
        "sourceRel": "docs/zh/harness-designs/claude-code/index.md"
      },
      {
        "title": "拆解 Codex 的 harness 设计",
        "rel": "docs-zh-harness-designs-codex-index",
        "sourceRel": "docs/zh/harness-designs/codex/index.md"
      },
      {
        "title": "拆解 DeepSeek Harness 的设计",
        "rel": "docs-zh-harness-designs-deepseek-index",
        "sourceRel": "docs/zh/harness-designs/deepseek/index.md"
      },
      {
        "title": "前沿 Harness 拆解",
        "rel": "docs-zh-harness-designs-index",
        "sourceRel": "docs/zh/harness-designs/index.md"
      },
      {
        "title": "拆解 Pi 的 harness 设计",
        "rel": "docs-zh-harness-designs-pi-index",
        "sourceRel": "docs/zh/harness-designs/pi/index.md"
      },
      {
        "title": "失败信号检查清单",
        "rel": "docs-zh-lectures-lecture-01-why-capable-agents-still-fail-code-failure-signals-checklist",
        "sourceRel": "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/failure-signals-checklist.md"
      },
      {
        "title": "规格不足的任务示例",
        "rel": "docs-zh-lectures-lecture-01-why-capable-agents-still-fail-code-underspecified-task",
        "sourceRel": "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/code/underspecified-task.md"
      },
      {
        "title": "第一讲. 模型能力强，不等于执行可靠",
        "rel": "docs-zh-lectures-lecture-01-why-capable-agents-still-fail-index",
        "sourceRel": "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/index.md"
      },
      {
        "title": "Harness 组件示例",
        "rel": "docs-zh-lectures-lecture-02-what-a-harness-actually-is-code-harness-components",
        "sourceRel": "docs/zh/lectures/lecture-02-what-a-harness-actually-is/code/harness-components.md"
      },
      {
        "title": "第二讲. Harness 到底是什么",
        "rel": "docs-zh-lectures-lecture-02-what-a-harness-actually-is-index",
        "sourceRel": "docs/zh/lectures/lecture-02-what-a-harness-actually-is/index.md"
      },
      {
        "title": "系统记录检查清单",
        "rel": "docs-zh-lectures-lecture-03-why-the-repository-must-become-the-system-of-record-code-system-of-record-checklist",
        "sourceRel": "docs/zh/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/code/system-of-record-checklist.md"
      },
      {
        "title": "第三讲. 让代码仓库成为唯一的事实来源",
        "rel": "docs-zh-lectures-lecture-03-why-the-repository-must-become-the-system-of-record-index",
        "sourceRel": "docs/zh/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/index.md"
      },
      {
        "title": "AGENTS.md",
        "rel": "docs-zh-lectures-lecture-04-why-one-giant-instruction-file-fails-code-AGENTS-short",
        "sourceRel": "docs/zh/lectures/lecture-04-why-one-giant-instruction-file-fails/code/AGENTS-short.md"
      },
      {
        "title": "指令文件反模式",
        "rel": "docs-zh-lectures-lecture-04-why-one-giant-instruction-file-fails-code-anti-patterns",
        "sourceRel": "docs/zh/lectures/lecture-04-why-one-giant-instruction-file-fails/code/anti-patterns.md"
      },
      {
        "title": "第四讲. 把指令拆分到不同文件里",
        "rel": "docs-zh-lectures-lecture-04-why-one-giant-instruction-file-fails-index",
        "sourceRel": "docs/zh/lectures/lecture-04-why-one-giant-instruction-file-fails/index.md"
      },
      {
        "title": "连续性检查清单",
        "rel": "docs-zh-lectures-lecture-05-why-long-running-tasks-lose-continuity-code-continuity-checklist",
        "sourceRel": "docs/zh/lectures/lecture-05-why-long-running-tasks-lose-continuity/code/continuity-checklist.md"
      },
      {
        "title": "会话交接示例",
        "rel": "docs-zh-lectures-lecture-05-why-long-running-tasks-lose-continuity-code-session-handoff",
        "sourceRel": "docs/zh/lectures/lecture-05-why-long-running-tasks-lose-continuity/code/session-handoff.md"
      },
      {
        "title": "第五讲. 让跨会话的任务保持上下文连续",
        "rel": "docs-zh-lectures-lecture-05-why-long-running-tasks-lose-continuity-index",
        "sourceRel": "docs/zh/lectures/lecture-05-why-long-running-tasks-lose-continuity/index.md"
      },
      {
        "title": "初始化器输出检查清单",
        "rel": "docs-zh-lectures-lecture-06-why-initialization-needs-its-own-phase-code-initializer-output-checklist",
        "sourceRel": "docs/zh/lectures/lecture-06-why-initialization-needs-its-own-phase/code/initializer-output-checklist.md"
      },
      {
        "title": "第六讲. 让 agent 每次工作前先初始化",
        "rel": "docs-zh-lectures-lecture-06-why-initialization-needs-its-own-phase-index",
        "sourceRel": "docs/zh/lectures/lecture-06-why-initialization-needs-its-own-phase/index.md"
      },
      {
        "title": "范围界定示例",
        "rel": "docs-zh-lectures-lecture-07-why-agents-overreach-and-under-finish-code-scope-surface-example",
        "sourceRel": "docs/zh/lectures/lecture-07-why-agents-overreach-and-under-finish/code/scope-surface-example.md"
      },
      {
        "title": "第七讲. 给 agent 划清每次任务的边界",
        "rel": "docs-zh-lectures-lecture-07-why-agents-overreach-and-under-finish-index",
        "sourceRel": "docs/zh/lectures/lecture-07-why-agents-overreach-and-under-finish/index.md"
      },
      {
        "title": "通过门控策略",
        "rel": "docs-zh-lectures-lecture-08-why-feature-lists-are-harness-primitives-code-pass-gate-policy",
        "sourceRel": "docs/zh/lectures/lecture-08-why-feature-lists-are-harness-primitives/code/pass-gate-policy.md"
      },
      {
        "title": "第八讲. 用功能清单约束 agent 该做什么",
        "rel": "docs-zh-lectures-lecture-08-why-feature-lists-are-harness-primitives-index",
        "sourceRel": "docs/zh/lectures/lecture-08-why-feature-lists-are-harness-primitives/index.md"
      },
      {
        "title": "干净状态检查清单",
        "rel": "docs-zh-lectures-lecture-09-why-agents-declare-victory-too-early-code-clean-state-checklist",
        "sourceRel": "docs/zh/lectures/lecture-09-why-agents-declare-victory-too-early/code/clean-state-checklist.md"
      },
      {
        "title": "第九讲. 防止 agent 提前宣告完成",
        "rel": "docs-zh-lectures-lecture-09-why-agents-declare-victory-too-early-index",
        "sourceRel": "docs/zh/lectures/lecture-09-why-agents-declare-victory-too-early/index.md"
      },
      {
        "title": "Electron 架构规则",
        "rel": "docs-zh-lectures-lecture-10-why-end-to-end-testing-changes-results-code-architecture-rules",
        "sourceRel": "docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/architecture-rules.md"
      },
      {
        "title": "示例：将审查反馈转化为规则",
        "rel": "docs-zh-lectures-lecture-10-why-end-to-end-testing-changes-results-code-review-feedback-to-rule",
        "sourceRel": "docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/code/review-feedback-to-rule.md"
      },
      {
        "title": "第十讲. 跑通完整流程才算真正验证",
        "rel": "docs-zh-lectures-lecture-10-why-end-to-end-testing-changes-results-index",
        "sourceRel": "docs/zh/lectures/lecture-10-why-end-to-end-testing-changes-results/index.md"
      },
      {
        "title": "评估者评分标准示例",
        "rel": "docs-zh-lectures-lecture-11-why-observability-belongs-inside-the-harness-code-evaluator-rubric",
        "sourceRel": "docs/zh/lectures/lecture-11-why-observability-belongs-inside-the-harness/code/evaluator-rubric.md"
      },
      {
        "title": "Sprint 契约示例",
        "rel": "docs-zh-lectures-lecture-11-why-observability-belongs-inside-the-harness-code-sprint-contract",
        "sourceRel": "docs/zh/lectures/lecture-11-why-observability-belongs-inside-the-harness/code/sprint-contract.md"
      },
      {
        "title": "第十一讲. 让 agent 的运行过程可观测",
        "rel": "docs-zh-lectures-lecture-11-why-observability-belongs-inside-the-harness-index",
        "sourceRel": "docs/zh/lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md"
      },
      {
        "title": "基准对比模板",
        "rel": "docs-zh-lectures-lecture-12-why-every-session-must-leave-a-clean-state-code-benchmark-comparison-template",
        "sourceRel": "docs/zh/lectures/lecture-12-why-every-session-must-leave-a-clean-state/code/benchmark-comparison-template.md"
      },
      {
        "title": "第十二讲. 每次会话结束前都做好交接",
        "rel": "docs-zh-lectures-lecture-12-why-every-session-must-leave-a-clean-state-index",
        "sourceRel": "docs/zh/lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md"
      },
      {
        "title": "Checker Agent Prompt（检查者）",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-code-checker-prompt",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/code/checker-prompt.md"
      },
      {
        "title": "Goal Loop 目标描述模板",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-code-goal-template",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/code/goal-template.md"
      },
      {
        "title": "第 13 讲代码",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-code-index",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/code/index.md"
      },
      {
        "title": "Loop State 循环状态模板",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-code-loop-state-template",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/code/loop-state-template.md"
      },
      {
        "title": "Maker Agent Prompt（制作者）",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-code-maker-prompt",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/code/maker-prompt.md"
      },
      {
        "title": "第十三讲. 从手动驱动到自动循环",
        "rel": "docs-zh-lectures-lecture-13-loop-engineering-index",
        "sourceRel": "docs/zh/lectures/lecture-13-loop-engineering/index.md"
      },
      {
        "title": "第 14 讲代码",
        "rel": "docs-zh-lectures-lecture-14-graph-engineering-code-index",
        "sourceRel": "docs/zh/lectures/lecture-14-graph-engineering/code/index.md"
      },
      {
        "title": "第十四讲. 从单循环到图工程",
        "rel": "docs-zh-lectures-lecture-14-graph-engineering-index",
        "sourceRel": "docs/zh/lectures/lecture-14-graph-engineering/index.md"
      },
      {
        "title": "欢迎来到项目实战",
        "rel": "docs-zh-projects-index",
        "sourceRel": "docs/zh/projects/index.md"
      },
      {
        "title": "Project 01. 只写提示词让 agent 做，和定好规则再让它做，差多少",
        "rel": "docs-zh-projects-project-01-baseline-vs-minimal-harness-index",
        "sourceRel": "docs/zh/projects/project-01-baseline-vs-minimal-harness/index.md"
      },
      {
        "title": "Project 02. 让 agent 看懂项目、接住上次的工作",
        "rel": "docs-zh-projects-project-02-agent-readable-workspace-index",
        "sourceRel": "docs/zh/projects/project-02-agent-readable-workspace/index.md"
      },
      {
        "title": "Project 03. 让 agent 关掉再打开还能接着干",
        "rel": "docs-zh-projects-project-03-multi-session-continuity-index",
        "sourceRel": "docs/zh/projects/project-03-multi-session-continuity/index.md"
      },
      {
        "title": "Project 04. 用运行反馈修正 agent 的行为",
        "rel": "docs-zh-projects-project-04-incremental-indexing-index",
        "sourceRel": "docs/zh/projects/project-04-incremental-indexing/index.md"
      },
      {
        "title": "Project 05. 让 agent 自己检查自己做的对不对",
        "rel": "docs-zh-projects-project-05-grounded-qa-verification-index",
        "sourceRel": "docs/zh/projects/project-05-grounded-qa-verification/index.md"
      },
      {
        "title": "Project 06. 搭建一套完整的 agent 工作环境",
        "rel": "docs-zh-projects-project-06-runtime-observability-and-debugging-index",
        "sourceRel": "docs/zh/projects/project-06-runtime-observability-and-debugging/index.md"
      },
      {
        "title": "Project 07. 搭建你的第一个自动循环",
        "rel": "docs-zh-projects-project-07-loop-engineering-first-loop-index",
        "sourceRel": "docs/zh/projects/project-07-loop-engineering-first-loop/index.md"
      },
      {
        "title": "Project 08. 把你的工作流画成一张图",
        "rel": "docs-zh-projects-project-08-graph-engineering-first-graph-index",
        "sourceRel": "docs/zh/projects/project-08-graph-engineering-first-graph/index.md"
      },
      {
        "title": "中文资料库",
        "rel": "docs-zh-resources-index",
        "sourceRel": "docs/zh/resources/index.md"
      },
      {
        "title": "OpenAI 高级资源包",
        "rel": "docs-zh-resources-openai-advanced-index",
        "sourceRel": "docs/zh/resources/openai-advanced/index.md"
      },
      {
        "title": "ARCHITECTURE.md",
        "rel": "docs-zh-resources-openai-advanced-repo-template-ARCHITECTURE",
        "sourceRel": "docs/zh/resources/openai-advanced/repo-template/ARCHITECTURE.md"
      },
      {
        "title": "高级仓库模板",
        "rel": "docs-zh-resources-openai-advanced-repo-template-index",
        "sourceRel": "docs/zh/resources/openai-advanced/repo-template/index.md"
      },
      {
        "title": "SOP：Chrome DevTools 验证闭环",
        "rel": "docs-zh-resources-openai-advanced-sops-chrome-devtools-validation-loop",
        "sourceRel": "docs/zh/resources/openai-advanced/sops/chrome-devtools-validation-loop.md"
      },
      {
        "title": "SOP：把不可见知识编码进仓库",
        "rel": "docs-zh-resources-openai-advanced-sops-encode-knowledge-into-repo",
        "sourceRel": "docs/zh/resources/openai-advanced/sops/encode-knowledge-into-repo.md"
      },
      {
        "title": "OpenAI 高级 SOP",
        "rel": "docs-zh-resources-openai-advanced-sops-index",
        "sourceRel": "docs/zh/resources/openai-advanced/sops/index.md"
      },
      {
        "title": "SOP：分层领域架构",
        "rel": "docs-zh-resources-openai-advanced-sops-layered-domain-architecture",
        "sourceRel": "docs/zh/resources/openai-advanced/sops/layered-domain-architecture.md"
      },
      {
        "title": "SOP：可观测性反馈闭环",
        "rel": "docs-zh-resources-openai-advanced-sops-observability-feedback-loop",
        "sourceRel": "docs/zh/resources/openai-advanced/sops/observability-feedback-loop.md"
      },
      {
        "title": "编码代理开工流程",
        "rel": "docs-zh-resources-reference-coding-agent-startup-flow",
        "sourceRel": "docs/zh/resources/reference/coding-agent-startup-flow.md"
      },
      {
        "title": "中文参考",
        "rel": "docs-zh-resources-reference-index",
        "sourceRel": "docs/zh/resources/reference/index.md"
      },
      {
        "title": "初始化代理操作手册",
        "rel": "docs-zh-resources-reference-initializer-agent-playbook",
        "sourceRel": "docs/zh/resources/reference/initializer-agent-playbook.md"
      },
      {
        "title": "方法对照表",
        "rel": "docs-zh-resources-reference-method-map",
        "sourceRel": "docs/zh/resources/reference/method-map.md"
      },
      {
        "title": "Prompt 校准",
        "rel": "docs-zh-resources-reference-prompt-calibration",
        "sourceRel": "docs/zh/resources/reference/prompt-calibration.md"
      },
      {
        "title": "进度日志",
        "rel": "docs-zh-resources-templates-claude-progress",
        "sourceRel": "docs/zh/resources/templates/claude-progress.md"
      },
      {
        "title": "CLAUDE.md",
        "rel": "docs-zh-resources-templates-CLAUDE",
        "sourceRel": "docs/zh/resources/templates/CLAUDE.md"
      },
      {
        "title": "干净状态检查清单",
        "rel": "docs-zh-resources-templates-clean-state-checklist",
        "sourceRel": "docs/zh/resources/templates/clean-state-checklist.md"
      },
      {
        "title": "评审评分表",
        "rel": "docs-zh-resources-templates-evaluator-rubric",
        "sourceRel": "docs/zh/resources/templates/evaluator-rubric.md"
      },
      {
        "title": "模板使用指南",
        "rel": "docs-zh-resources-templates-index",
        "sourceRel": "docs/zh/resources/templates/index.md"
      },
      {
        "title": "质量文档",
        "rel": "docs-zh-resources-templates-quality-document",
        "sourceRel": "docs/zh/resources/templates/quality-document.md"
      },
      {
        "title": "会话交接",
        "rel": "docs-zh-resources-templates-session-handoff",
        "sourceRel": "docs/zh/resources/templates/session-handoff.md"
      },
      {
        "title": "Skills（技能集）",
        "rel": "docs-zh-skills-index",
        "sourceRel": "docs/zh/skills/index.md"
      }
    ]
  },
  {
    "id": "09-harness/learn-claude-code",
    "volume": "09-harness",
    "local": "learn-claude-code",
    "title": "Learn Claude Code（nano harness 17 步）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "shareAI-lab/learn-claude-code",
    "site": null,
    "commit": "0dcafa2ae053a1ddd6a72f265431104b08a5aa13",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/shareAI-lab/learn-claude-code",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Learn Claude Code -- Harness Engineering for Real Agents",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "s01: The Agent Loop — One Loop Is All You Need",
        "rel": "s01_agent_loop",
        "sourceRel": "s01_agent_loop/README.md"
      },
      {
        "title": "s02: Tool Use — Add a Tool, Add Just One Line",
        "rel": "s02_tool_use",
        "sourceRel": "s02_tool_use/README.md"
      },
      {
        "title": "s03: Permission — Check Permissions Before Execution",
        "rel": "s03_permission",
        "sourceRel": "s03_permission/README.md"
      },
      {
        "title": "s04: Hooks — Hang on the Loop, Don't Write into It",
        "rel": "s04_hooks",
        "sourceRel": "s04_hooks/README.md"
      },
      {
        "title": "s05: TodoWrite — An Agent Without a Plan Drifts Off Course",
        "rel": "s05_todo_write",
        "sourceRel": "s05_todo_write/README.md"
      },
      {
        "title": "s06: Subagent — Give a Subtask Its Own Context",
        "rel": "s06_subagent",
        "sourceRel": "s06_subagent/README.md"
      },
      {
        "title": "s07: Skill Loading — Load Skills When Needed",
        "rel": "s07_skill_loading",
        "sourceRel": "s07_skill_loading/README.md"
      },
      {
        "title": "s08: Context Compact: Make Room Before the Context Fills Up",
        "rel": "s08_context_compact",
        "sourceRel": "s08_context_compact/README.md"
      },
      {
        "title": "s09: Memory — Keep Useful Knowledge Across Sessions",
        "rel": "s09_memory",
        "sourceRel": "s09_memory/README.md"
      },
      {
        "title": "s10: Task System — From an Execution Checklist to Coordinated Task State",
        "rel": "s10_task_system",
        "sourceRel": "s10_task_system/README.md"
      },
      {
        "title": "s11: Background Tasks — Slow Operations Go to the Background",
        "rel": "s11_background_tasks",
        "sourceRel": "s11_background_tasks/README.md"
      },
      {
        "title": "s12: Cron Scheduler — Start Work on a Schedule",
        "rel": "s12_cron_scheduler",
        "sourceRel": "s12_cron_scheduler/README.md"
      },
      {
        "title": "s13: Agent Teams — Runtime and Coordination Protocols",
        "rel": "s13_agent_teams",
        "sourceRel": "s13_agent_teams/README.md"
      },
      {
        "title": "s14: MCP Tools — Discover and Invoke External Tools",
        "rel": "s14_mcp_plugin",
        "sourceRel": "s14_mcp_plugin/README.md"
      },
      {
        "title": "s15: Integrated Harness — Many Mechanisms, One Loop",
        "rel": "s15_integrated_harness",
        "sourceRel": "s15_integrated_harness/README.md"
      },
      {
        "title": "s16: Workflow Runtime — The Model Decides Each Step; a Script Decides the Orchestration",
        "rel": "s16_workflow_runtime",
        "sourceRel": "s16_workflow_runtime/README.md"
      },
      {
        "title": "s17: Goal Loop: The Model Proposes a Stop; an Independent Evaluator Decides Whether to Continue",
        "rel": "s17_goal_loop",
        "sourceRel": "s17_goal_loop/README.md"
      }
    ]
  },
  {
    "id": "09-harness/learn-workbuddy",
    "volume": "09-harness",
    "local": "learn-workbuddy",
    "title": "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "adongwanai/learn-workbuddy",
    "site": null,
    "commit": "d8c2a32614555196e405f20c67e23ed84f2f2239",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/adongwanai/learn-workbuddy",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "🔥 从0手搓桌面AI助手 · 24节课复刻WorkBuddy架构",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "s01: Agent Loop — 一个循环就够了",
        "rel": "s01_agent_loop",
        "sourceRel": "s01_agent_loop/README.md"
      },
      {
        "title": "s02: Tool Dispatch — 一个注册表就是工具边界",
        "rel": "s02_tool_dispatch",
        "sourceRel": "s02_tool_dispatch/README.md"
      },
      {
        "title": "s03: Deferred Tool Loading — 先发现，再加载，再执行",
        "rel": "s03_deferred_loading",
        "sourceRel": "s03_deferred_loading/README.md"
      },
      {
        "title": "s04: Permission & Hooks — 先决策，再审批，再执行",
        "rel": "s04_permission_hooks",
        "sourceRel": "s04_permission_hooks/README.md"
      },
      {
        "title": "s05: Electron Shell — 一个进程不够, 要三个",
        "rel": "s05_electron_shell",
        "sourceRel": "s05_electron_shell/README.md"
      },
      {
        "title": "s06: Sidecar Server — 主进程不跑 agent, Sidecar 来跑",
        "rel": "s06_sidecar_server",
        "sourceRel": "s06_sidecar_server/README.md"
      },
      {
        "title": "s07: Session Management — 逻辑会话可恢复，运行时必须重建",
        "rel": "s07_session_management",
        "sourceRel": "s07_session_management/README.md"
      },
      {
        "title": "s08: Model Routing — 用 AI 管理 AI, 便宜的做粗筛, 贵的做推理",
        "rel": "s08_model_routing",
        "sourceRel": "s08_model_routing/README.md"
      },
      {
        "title": "s09: JSONL Transcript — 证据只追加，运行时状态可重建",
        "rel": "s09_jsonl_transcript",
        "sourceRel": "s09_jsonl_transcript/README.md"
      },
      {
        "title": "s10: Workspace Memory — 从工作日志蒸馏可恢复的项目记忆",
        "rel": "s10_workspace_memory",
        "sourceRel": "s10_workspace_memory/README.md"
      },
      {
        "title": "s11: User Memory — Profile 与 Preference 的用户级边界",
        "rel": "s11_user_memory",
        "sourceRel": "s11_user_memory/README.md"
      },
      {
        "title": "s12: Remote Memory — Stored Record 与 Recalled Context",
        "rel": "s12_cloud_memory",
        "sourceRel": "s12_cloud_memory/README.md"
      },
      {
        "title": "s13: Tool Output Externalization — 内存不够, 换到磁盘",
        "rel": "s13_output_externalization",
        "sourceRel": "s13_output_externalization/README.md"
      },
      {
        "title": "s14: Context Compact — 上下文总会满, 要有办法腾地方",
        "rel": "s14_context_compact",
        "sourceRel": "s14_context_compact/README.md"
      },
      {
        "title": "s15: Prompt Assembly — 从召回候选到预算内上下文",
        "rel": "s15_prompt_assembly",
        "sourceRel": "s15_prompt_assembly/README.md"
      },
      {
        "title": "s16: Skills System — 技能先列目录, 用到时再展开",
        "rel": "s16_skills_system",
        "sourceRel": "s16_skills_system/README.md"
      },
      {
        "title": "s17: MCP Connectors — 外接工具, 标准协议, 信任模型",
        "rel": "s17_mcp_connectors",
        "sourceRel": "s17_mcp_connectors/README.md"
      },
      {
        "title": "s18: Experts System — 领域专家, 整包加载",
        "rel": "s18_experts_system",
        "sourceRel": "s18_experts_system/README.md"
      },
      {
        "title": "s19: Visualizer — 不只是文字, 还能画图",
        "rel": "s19_visualizer",
        "sourceRel": "s19_visualizer/README.md"
      },
      {
        "title": "s20: Result Presentation — 做完要交付, 不只是说",
        "rel": "s20_result_presentation",
        "sourceRel": "s20_result_presentation/README.md"
      },
      {
        "title": "s21: SQLite Database — 会话要持久, 用量要追踪",
        "rel": "s21_sqlite_database",
        "sourceRel": "s21_sqlite_database/README.md"
      },
      {
        "title": "s22: Automation Scheduler — 到点自动跑, 不需要人推",
        "rel": "s22_automation_scheduler",
        "sourceRel": "s22_automation_scheduler/README.md"
      },
      {
        "title": "s23: Audit & Sandbox — 每步留痕, 不可篡改",
        "rel": "s23_audit_sandbox",
        "sourceRel": "s23_audit_sandbox/README.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-ultimate-guide",
    "volume": "09-harness",
    "local": "claude-code-ultimate-guide",
    "title": "Claude Code Ultimate Guide",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "CC-BY-SA-4.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "FlorianBruniaux/claude-code-ultimate-guide",
    "site": null,
    "commit": "af05b84fb6e32432dae2114ee2a72c44ef3d29b1",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/FlorianBruniaux/claude-code-ultimate-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code Ultimate Guide",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Pedagogy Note: Skills–Commands Merger (CC 2.1.3)",
        "rel": "claudedocs",
        "sourceRel": "claudedocs/pedagogy-skills-merger.md"
      },
      {
        "title": "Competitive Analysis: Claude Code Guides & Resources",
        "rel": "docs",
        "sourceRel": "docs/competitive-analysis.md"
      },
      {
        "title": "Claude Code Examples",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Exported Formats",
        "rel": "exports",
        "sourceRel": "exports/README.md"
      },
      {
        "title": "Guide Documentation",
        "rel": "guide",
        "sourceRel": "guide/README.md"
      },
      {
        "title": "Machine-Readable References",
        "rel": "machine-readable",
        "sourceRel": "machine-readable/README.md"
      },
      {
        "title": "Claude Code Knowledge Quiz",
        "rel": "quiz",
        "sourceRel": "quiz/README.md"
      }
    ]
  },
  {
    "id": "09-harness/deepseek-harness",
    "volume": "09-harness",
    "local": "deepseek-harness",
    "title": "DeepSeek Harness",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "deepseek-ai/deepseek-harness",
    "site": null,
    "commit": "c291e7961a515f6d7af9304e7fd1d257929aef26",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/deepseek-ai/deepseek-harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "DeepSeek Harness",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AGENTS.md — Performance Benchmarks",
        "rel": "benchmarks",
        "sourceRel": "benchmarks/AGENTS.md"
      },
      {
        "title": "AGENTS.md — The documentation standard",
        "rel": "docs",
        "sourceRel": "docs/AGENTS.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-howto",
    "volume": "09-harness",
    "local": "claude-howto",
    "title": "Claude How-To",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "luongnv89/claude-howto",
    "site": null,
    "commit": "97bfb0685e03112ad39845889061d02cef6e534c",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/luongnv89/claude-howto",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Master Claude Code in a Weekend",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Slash Commands",
        "rel": "01-slash-commands",
        "sourceRel": "01-slash-commands/README.md"
      },
      {
        "title": "Memory Guide",
        "rel": "02-memory",
        "sourceRel": "02-memory/README.md"
      },
      {
        "title": "Agent Skills Guide",
        "rel": "03-skills",
        "sourceRel": "03-skills/README.md"
      },
      {
        "title": "Subagents - Complete Reference Guide",
        "rel": "04-subagents",
        "sourceRel": "04-subagents/README.md"
      },
      {
        "title": "MCP (Model Context Protocol)",
        "rel": "05-mcp",
        "sourceRel": "05-mcp/README.md"
      },
      {
        "title": "Hooks",
        "rel": "06-hooks",
        "sourceRel": "06-hooks/README.md"
      },
      {
        "title": "Claude Code Plugins",
        "rel": "07-plugins",
        "sourceRel": "07-plugins/README.md"
      },
      {
        "title": "Checkpoints and Rewind",
        "rel": "08-checkpoints",
        "sourceRel": "08-checkpoints/README.md"
      },
      {
        "title": "Advanced Features",
        "rel": "09-advanced-features",
        "sourceRel": "09-advanced-features/README.md"
      },
      {
        "title": "CLI Reference",
        "rel": "10-cli",
        "sourceRel": "10-cli/README.md"
      }
    ]
  },
  {
    "id": "09-harness/better-harness",
    "volume": "09-harness",
    "local": "better-harness",
    "title": "Better Harness（QoderAI）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "QoderAI/better-harness",
    "site": null,
    "commit": "e1538c15a98856b3349f365d951f4fa0bcc33f24",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/QoderAI/better-harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Architecture Principles",
        "rel": "docs",
        "sourceRel": "docs/ARCHITECTURE.md"
      },
      {
        "title": "References",
        "rel": "references",
        "sourceRel": "references/README.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-guide-zebbern",
    "volume": "09-harness",
    "local": "claude-code-guide-zebbern",
    "title": "Claude Code Guide（zebbern）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "zebbern/claude-code-guide",
    "site": null,
    "commit": "64c890fe74c3ccfad673dc9c71dc85b8dd2f4817",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/zebbern/claude-code-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code Guide（zebbern）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Quality-First Claude and Codex Agent Pack",
        "rel": "agents",
        "sourceRel": "agents/README.md"
      }
    ]
  },
  {
    "id": "09-harness/strands-harness-sdk",
    "volume": "09-harness",
    "local": "strands-harness-sdk",
    "title": "Strands Harness SDK",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "strands-agents/harness-sdk",
    "site": null,
    "commit": "7bda6c70e71cd07279470268c3d3b3f4b36adf53",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/strands-agents/harness-sdk",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Strands Harness SDK",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Agent Development Guide - Documentation Site",
        "rel": "site",
        "sourceRel": "site/AGENTS.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-harness-chachamaru",
    "volume": "09-harness",
    "local": "claude-code-harness-chachamaru",
    "title": "Claude Code Harness",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "Chachamaru127/claude-code-harness",
    "site": null,
    "commit": "2b2b74805321089bd9b660a1064fa97556299703",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Chachamaru127/claude-code-harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code Harness",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Advisor Agent",
        "rel": "agents",
        "sourceRel": "agents/advisor.md"
      },
      {
        "title": "Advisor Strategy",
        "rel": "docs",
        "sourceRel": "docs/advisor-strategy.md"
      },
      {
        "title": "Hooks Best Practices",
        "rel": "hooks",
        "sourceRel": "hooks/BEST_PRACTICES.md"
      }
    ]
  },
  {
    "id": "09-harness/harness-engineering-from-cc-to-ai-coding",
    "volume": "09-harness",
    "local": "harness-engineering-from-cc-to-ai-coding",
    "title": "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "ZhangHanDong/harness-engineering-from-cc-to-ai-coding",
    "site": null,
    "commit": "e40e0feec02b90e308ccbfc7a8911d64118ccca0",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "附录 A：关键文件索引",
        "rel": "book-src-appendix-a-file-index",
        "sourceRel": "book/src/appendix/a-file-index.md"
      },
      {
        "title": "附录 B：环境变量参考",
        "rel": "book-src-appendix-b-env-vars",
        "sourceRel": "book/src/appendix/b-env-vars.md"
      },
      {
        "title": "附录 C：术语表",
        "rel": "book-src-appendix-c-glossary",
        "sourceRel": "book/src/appendix/c-glossary.md"
      },
      {
        "title": "附录 D：89 个 Feature Flag 完整清单",
        "rel": "book-src-appendix-d-feature-flags",
        "sourceRel": "book/src/appendix/d-feature-flags.md"
      },
      {
        "title": "附录 E：版本演化记录",
        "rel": "book-src-appendix-e-version-evolution",
        "sourceRel": "book/src/appendix/e-version-evolution.md"
      },
      {
        "title": "附录 F：端到端案例追踪",
        "rel": "book-src-appendix-f-e2e-traces",
        "sourceRel": "book/src/appendix/f-e2e-traces.md"
      },
      {
        "title": "附录 G：认证与订阅系统 — 从 OAuth 到合规边界",
        "rel": "book-src-appendix-g-auth-subscription",
        "sourceRel": "book/src/appendix/g-auth-subscription.md"
      },
      {
        "title": "第1章：AI 编码 Agent 的完整技术栈",
        "rel": "book-src-part1-ch01",
        "sourceRel": "book/src/part1/ch01.md"
      },
      {
        "title": "第2章：工具系统 — 40+ 个工具作为模型的双手",
        "rel": "book-src-part1-ch02",
        "sourceRel": "book/src/part1/ch02.md"
      },
      {
        "title": "第3章：Agent Loop — 从用户输入到模型响应的完整生命周期",
        "rel": "book-src-part1-ch03",
        "sourceRel": "book/src/part1/ch03.md"
      },
      {
        "title": "第4章：工具执行编排 -- 权限、并发、流式与中断",
        "rel": "book-src-part1-ch04",
        "sourceRel": "book/src/part1/ch04.md"
      },
      {
        "title": "第4b章：计划模式 — 从\"先做后看\"到\"先看后做\"",
        "rel": "book-src-part1-ch04b",
        "sourceRel": "book/src/part1/ch04b.md"
      },
      {
        "title": "第5章：系统提示词架构",
        "rel": "book-src-part2-ch05",
        "sourceRel": "book/src/part2/ch05.md"
      },
      {
        "title": "第6章：通过提示词引导行为",
        "rel": "book-src-part2-ch06",
        "sourceRel": "book/src/part2/ch06.md"
      },
      {
        "title": "第6b章：API 通信层 — 重试、流式与降级工程",
        "rel": "book-src-part2-ch06b",
        "sourceRel": "book/src/part2/ch06b.md"
      },
      {
        "title": "第7章：模型特定调优与 A/B 测试",
        "rel": "book-src-part2-ch07",
        "sourceRel": "book/src/part2/ch07.md"
      },
      {
        "title": "第8章：工具提示词作为微型驾驭器",
        "rel": "book-src-part2-ch08",
        "sourceRel": "book/src/part2/ch08.md"
      },
      {
        "title": "第9章：自动压缩 — 上下文何时以及如何被压缩",
        "rel": "book-src-part3-ch09",
        "sourceRel": "book/src/part3/ch09.md"
      },
      {
        "title": "第10章：压缩后的文件状态保留",
        "rel": "book-src-part3-ch10",
        "sourceRel": "book/src/part3/ch10.md"
      },
      {
        "title": "第11章：微压缩 — 精准上下文修剪",
        "rel": "book-src-part3-ch11",
        "sourceRel": "book/src/part3/ch11.md"
      },
      {
        "title": "第12章：Token 预算策略",
        "rel": "book-src-part3-ch12",
        "sourceRel": "book/src/part3/ch12.md"
      },
      {
        "title": "第13章：缓存架构与断点设计",
        "rel": "book-src-part4-ch13",
        "sourceRel": "book/src/part4/ch13.md"
      },
      {
        "title": "第14章：缓存中断检测系统",
        "rel": "book-src-part4-ch14",
        "sourceRel": "book/src/part4/ch14.md"
      },
      {
        "title": "第15章：缓存优化模式",
        "rel": "book-src-part4-ch15",
        "sourceRel": "book/src/part4/ch15.md"
      },
      {
        "title": "第16章：权限系统",
        "rel": "book-src-part5-ch16",
        "sourceRel": "book/src/part5/ch16.md"
      },
      {
        "title": "第17章：YOLO 分类器",
        "rel": "book-src-part5-ch17",
        "sourceRel": "book/src/part5/ch17.md"
      },
      {
        "title": "第17b章：提示注入防御 — 从 Unicode 清洗到纵深防御",
        "rel": "book-src-part5-ch17b",
        "sourceRel": "book/src/part5/ch17b.md"
      },
      {
        "title": "第18章：Hooks — 用户自定义拦截点",
        "rel": "book-src-part5-ch18",
        "sourceRel": "book/src/part5/ch18.md"
      },
      {
        "title": "第18b章：沙箱系统 — 从 Seatbelt 到 Bubblewrap 的多平台隔离",
        "rel": "book-src-part5-ch18b",
        "sourceRel": "book/src/part5/ch18b.md"
      },
      {
        "title": "第19章：CLAUDE.md — 用户指令作为覆盖层",
        "rel": "book-src-part5-ch19",
        "sourceRel": "book/src/part5/ch19.md"
      },
      {
        "title": "第20章：Agent 派生与编排",
        "rel": "book-src-part6-ch20",
        "sourceRel": "book/src/part6/ch20.md"
      },
      {
        "title": "第20b章：Teams 与多进程协作",
        "rel": "book-src-part6-ch20b",
        "sourceRel": "book/src/part6/ch20b.md"
      },
      {
        "title": "第20c章：Ultraplan — 远程多代理规划",
        "rel": "book-src-part6-ch20c",
        "sourceRel": "book/src/part6/ch20c.md"
      },
      {
        "title": "第21章：Effort、Fast Mode 与 Thinking",
        "rel": "book-src-part6-ch21",
        "sourceRel": "book/src/part6/ch21.md"
      },
      {
        "title": "第22章：技能系统 -- 从内置到用户自定义",
        "rel": "book-src-part6-ch22",
        "sourceRel": "book/src/part6/ch22.md"
      },
      {
        "title": "第22b章：插件系统 — 从打包到市场的扩展工程",
        "rel": "book-src-part6-ch22b",
        "sourceRel": "book/src/part6/ch22b.md"
      },
      {
        "title": "第23章：未发布功能管线 -- 89 个 Feature Flag 背后的路线图",
        "rel": "book-src-part6-ch23",
        "sourceRel": "book/src/part6/ch23.md"
      },
      {
        "title": "第24章：跨会话记忆 — 从遗忘到持久学习",
        "rel": "book-src-part6-ch24",
        "sourceRel": "book/src/part6/ch24.md"
      },
      {
        "title": "第25章：驾驭工程原则",
        "rel": "book-src-part7-ch25",
        "sourceRel": "book/src/part7/ch25.md"
      },
      {
        "title": "第26章：上下文管理作为核心能力",
        "rel": "book-src-part7-ch26",
        "sourceRel": "book/src/part7/ch26.md"
      },
      {
        "title": "第27章：生产级 AI 编码模式",
        "rel": "book-src-part7-ch27",
        "sourceRel": "book/src/part7/ch27.md"
      },
      {
        "title": "第28章：Claude Code 的不足之处（以及你能修复什么）",
        "rel": "book-src-part7-ch28",
        "sourceRel": "book/src/part7/ch28.md"
      },
      {
        "title": "第29章：可观测性工程 — 从 logEvent 到生产级遥测",
        "rel": "book-src-part7-ch29",
        "sourceRel": "book/src/part7/ch29.md"
      },
      {
        "title": "第30章：构建你自己的 AI Agent — 从 Claude Code 模式到实战",
        "rel": "book-src-part7-ch30",
        "sourceRel": "book/src/part7/ch30.md"
      },
      {
        "title": "前言",
        "rel": "book-src-preface",
        "sourceRel": "book/src/preface.md"
      },
      {
        "title": "目录",
        "rel": "book-src-SUMMARY",
        "sourceRel": "book/src/SUMMARY.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-best-practice",
    "volume": "09-harness",
    "local": "claude-code-best-practice",
    "title": "Claude Code Best Practice",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "shanraisshan/claude-code-best-practice",
    "site": null,
    "commit": "2d6ea151c0d7189c3eaf364809c5574bd210e545",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/shanraisshan/claude-code-best-practice",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "claude-code-best-practice",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Claude Code Best Practice",
        "rel": "agent-teams",
        "sourceRel": "agent-teams/agent-teams-prompt.md"
      },
      {
        "title": "CLI Startup Flags Best Practice",
        "rel": "best-practice",
        "sourceRel": "best-practice/claude-cli-startup-flags.md"
      },
      {
        "title": "Agent Teams Implementation",
        "rel": "implementation",
        "sourceRel": "implementation/claude-agent-teams-implementation.md"
      },
      {
        "title": "Orchestration Workflow",
        "rel": "orchestration-workflow",
        "sourceRel": "orchestration-workflow/orchestration-workflow.md"
      },
      {
        "title": "Claude Advanced Tool Use Patterns",
        "rel": "reports",
        "sourceRel": "reports/claude-advanced-tool-use.md"
      },
      {
        "title": "10 Tips for Using Claude Code — From the Claude Code Team",
        "rel": "tips",
        "sourceRel": "tips/claude-boris-10-tips-01-feb-26.md"
      },
      {
        "title": "Head of Claude Code: What Happens After Coding Is Solved — Lenny's Podcast",
        "rel": "videos",
        "sourceRel": "videos/claude-boris-lennys-podcast-19-feb-26.md"
      }
    ]
  },
  {
    "id": "09-harness/deusyu-harness-engineering",
    "volume": "09-harness",
    "local": "deusyu-harness-engineering",
    "title": "Harness Engineering 学习指南",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "deusyu/harness-engineering",
    "site": null,
    "commit": "858c0da6570aad32947c09c7e83fb04f46d22ebe",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/deusyu/harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Harness Engineering 学习指南",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Harness Engineering 概念总览",
        "rel": "concepts",
        "sourceRel": "concepts/00-overview.md"
      },
      {
        "title": "翻译即 Harness：一个非代码场景的 Harness Engineering 实践",
        "rel": "feedback",
        "sourceRel": "feedback/2026-04-14-translation-as-harness.md"
      },
      {
        "title": "practice/ — 动手实践",
        "rel": "practice",
        "sourceRel": "practice/AGENTS.md"
      },
      {
        "title": "prompts/ — 提示词积累",
        "rel": "prompts",
        "sourceRel": "prompts/AGENTS.md"
      },
      {
        "title": "references/ — 外部资源索引",
        "rel": "references",
        "sourceRel": "references/AGENTS.md"
      },
      {
        "title": "thinking/ — 独立思考",
        "rel": "thinking",
        "sourceRel": "thinking/AGENTS.md"
      },
      {
        "title": "工具地图：复杂度维度 ↔ 工具杠杆",
        "rel": "tools",
        "sourceRel": "tools/00-overview.md"
      },
      {
        "title": "works/ — 作品输出",
        "rel": "works",
        "sourceRel": "works/AGENTS.md"
      }
    ]
  },
  {
    "id": "09-harness/codex-guide-freestylefly",
    "volume": "09-harness",
    "local": "codex-guide-freestylefly",
    "title": "Codex 实践指南（CodexGuide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "freestylefly/CodexGuide",
    "site": null,
    "commit": "f93c14ba1239178f63210c7e2e6e6965ebf59e79",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/freestylefly/CodexGuide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Codex 实践指南（CodexGuide）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "进阶教程",
        "rel": "docs-advanced-00-index",
        "sourceRel": "docs/advanced/00-index.md"
      },
      {
        "title": "理解费用与上下文",
        "rel": "docs-advanced-01-cost-context",
        "sourceRel": "docs/advanced/01-cost-context.md"
      },
      {
        "title": "AGENTS.md",
        "rel": "docs-advanced-02-agents-md",
        "sourceRel": "docs/advanced/02-agents-md.md"
      },
      {
        "title": "Skills 和 Plugins",
        "rel": "docs-advanced-03-skills-plugins-mcp",
        "sourceRel": "docs/advanced/03-skills-plugins-mcp.md"
      },
      {
        "title": "权限管理",
        "rel": "docs-advanced-04-permissions-security",
        "sourceRel": "docs/advanced/04-permissions-security.md"
      },
      {
        "title": "Automation",
        "rel": "docs-advanced-05-automation",
        "sourceRel": "docs/advanced/05-automation.md"
      },
      {
        "title": "Hooks",
        "rel": "docs-advanced-06-hooks",
        "sourceRel": "docs/advanced/06-hooks.md"
      },
      {
        "title": "沙盒与审批",
        "rel": "docs-advanced-07-sandbox-approvals",
        "sourceRel": "docs/advanced/07-sandbox-approvals.md"
      },
      {
        "title": "自动线程管理",
        "rel": "docs-advanced-08-thread-management",
        "sourceRel": "docs/advanced/08-thread-management.md"
      },
      {
        "title": "配置文件 config.toml",
        "rel": "docs-advanced-09-config-toml",
        "sourceRel": "docs/advanced/09-config-toml.md"
      },
      {
        "title": "团队实践",
        "rel": "docs-advanced-10-team-playbook",
        "sourceRel": "docs/advanced/10-team-playbook.md"
      },
      {
        "title": "排障手册",
        "rel": "docs-advanced-11-troubleshooting",
        "sourceRel": "docs/advanced/11-troubleshooting.md"
      },
      {
        "title": "社区共建图",
        "rel": "docs-community-roadmap",
        "sourceRel": "docs/community/roadmap.md"
      },
      {
        "title": "社区优秀教程合集",
        "rel": "docs-community-tutorials",
        "sourceRel": "docs/community/tutorials.md"
      },
      {
        "title": "学习路线",
        "rel": "docs-guide-index",
        "sourceRel": "docs/guide/index.md"
      },
      {
        "title": "参考手册",
        "rel": "docs-manual-00-index",
        "sourceRel": "docs/manual/00-index.md"
      },
      {
        "title": "参考来源与致谢",
        "rel": "docs-manual-02-credits",
        "sourceRel": "docs/manual/02-credits.md"
      },
      {
        "title": "实战案例库",
        "rel": "docs-recipes-00-index",
        "sourceRel": "docs/recipes/00-index.md"
      },
      {
        "title": "Codex × PPT Skill：一句话生成演示文稿",
        "rel": "docs-recipes-01-ppt-skill-walkthrough",
        "sourceRel": "docs/recipes/01-ppt-skill-walkthrough.md"
      },
      {
        "title": "Codex × Draw.io MCP：AI 自动绘制架构图",
        "rel": "docs-recipes-02-drawio-mcp",
        "sourceRel": "docs/recipes/02-drawio-mcp.md"
      },
      {
        "title": "Codex × Playwright MCP：让 AI 像人一样操控浏览器",
        "rel": "docs-recipes-03-playwright-mcp",
        "sourceRel": "docs/recipes/03-playwright-mcp.md"
      },
      {
        "title": "Codex × HyperFrames：用代码生成动画视频",
        "rel": "docs-recipes-04-hyperframes-animation",
        "sourceRel": "docs/recipes/04-hyperframes-animation.md"
      },
      {
        "title": "Codex × Obsidian：在知识库中自动生成配图",
        "rel": "docs-recipes-05-obsidian-codex",
        "sourceRel": "docs/recipes/05-obsidian-codex.md"
      },
      {
        "title": "Codex × 飞书 CLI：一句话处理飞书数据",
        "rel": "docs-recipes-06-feishu-cli-codex",
        "sourceRel": "docs/recipes/06-feishu-cli-codex.md"
      },
      {
        "title": "Codex × LLM Wiki：在 Obsidian 中搭建 AI 知识库",
        "rel": "docs-recipes-07-llm-wiki-codex",
        "sourceRel": "docs/recipes/07-llm-wiki-codex.md"
      },
      {
        "title": "Codex × Figma MCP：让 AI 读懂你的设计稿",
        "rel": "docs-recipes-08-figma-mcp-codex",
        "sourceRel": "docs/recipes/08-figma-mcp-codex.md"
      },
      {
        "title": "Codex × Notion MCP：打通你的知识工作空间",
        "rel": "docs-recipes-09-notion-mcp-codex",
        "sourceRel": "docs/recipes/09-notion-mcp-codex.md"
      },
      {
        "title": "Codex × DKFile：AI 网页一键发布到公网",
        "rel": "docs-recipes-10-dkfile-deploy-codex",
        "sourceRel": "docs/recipes/10-dkfile-deploy-codex.md"
      },
      {
        "title": "Codex × 云服务器：远程定位并修复 Bug",
        "rel": "docs-recipes-11-remote-bug-fix",
        "sourceRel": "docs/recipes/11-remote-bug-fix.md"
      },
      {
        "title": "Codex × Chrome：让 AI 直接控制浏览器",
        "rel": "docs-recipes-12-chrome-browser-plugin",
        "sourceRel": "docs/recipes/12-chrome-browser-plugin.md"
      },
      {
        "title": "Codex × GitHub Actions：CI 失败自动修复实测",
        "rel": "docs-recipes-13-github-actions-ci-fix",
        "sourceRel": "docs/recipes/13-github-actions-ci-fix.md"
      },
      {
        "title": "Codex × 临床文献综述：把医学问题整理成可复核证据表",
        "rel": "docs-recipes-14-clinical-literature-review",
        "sourceRel": "docs/recipes/14-clinical-literature-review.md"
      },
      {
        "title": "Codex × Hatch Pet：用一张照片生成专属宠物",
        "rel": "docs-recipes-15-hatch-pet-photo",
        "sourceRel": "docs/recipes/15-hatch-pet-photo.md"
      },
      {
        "title": "Codex × 安卓手机：扫码连接，远程操控",
        "rel": "docs-recipes-16-android-remote-control",
        "sourceRel": "docs/recipes/16-android-remote-control.md"
      },
      {
        "title": "如何设置自己的 Codex 桌面宠物",
        "rel": "docs-recipes-17-desktop-pet",
        "sourceRel": "docs/recipes/17-desktop-pet.md"
      },
      {
        "title": "快速上手",
        "rel": "docs-start-00-index",
        "sourceRel": "docs/start/00-index.md"
      },
      {
        "title": "Codex 是什么",
        "rel": "docs-start-01-what-is-codex",
        "sourceRel": "docs/start/01-what-is-codex.md"
      },
      {
        "title": "Codex 桌面 App 下载与安装",
        "rel": "docs-start-02-app-installation",
        "sourceRel": "docs/start/02-app-installation.md"
      },
      {
        "title": "订阅 ChatGPT Plus / Pro",
        "rel": "docs-start-03-account-plan",
        "sourceRel": "docs/start/03-account-plan.md"
      },
      {
        "title": "连接第三方 API",
        "rel": "docs-start-04-third-party-api",
        "sourceRel": "docs/start/04-third-party-api.md"
      },
      {
        "title": "用 Codex 完成第一个任务",
        "rel": "docs-start-06-first-task",
        "sourceRel": "docs/start/06-first-task.md"
      },
      {
        "title": "任务设计",
        "rel": "docs-start-07-task-design",
        "sourceRel": "docs/start/07-task-design.md"
      },
      {
        "title": "任务执行与验证闭环",
        "rel": "docs-start-08-task-execution",
        "sourceRel": "docs/start/08-task-execution.md"
      },
      {
        "title": "用手机远程操控 Codex",
        "rel": "docs-start-09-mobile-control",
        "sourceRel": "docs/start/09-mobile-control.md"
      },
      {
        "title": "安装CLI",
        "rel": "docs-start-10-cli-installation",
        "sourceRel": "docs/start/10-cli-installation.md"
      },
      {
        "title": "运行 CLI",
        "rel": "docs-start-11-cli-first-run",
        "sourceRel": "docs/start/11-cli-first-run.md"
      },
      {
        "title": "CLI 选项与命令",
        "rel": "docs-start-12-cli-options",
        "sourceRel": "docs/start/12-cli-options.md"
      },
      {
        "title": "在 VS Code 中使用 Codex",
        "rel": "docs-start-13-ide-vscode",
        "sourceRel": "docs/start/13-ide-vscode.md"
      },
      {
        "title": "使用 Codex Cloud",
        "rel": "docs-start-14-cloud",
        "sourceRel": "docs/start/14-cloud.md"
      }
    ]
  },
  {
    "id": "09-harness/harness-engineering-guide-nexu",
    "volume": "09-harness",
    "local": "harness-engineering-guide-nexu",
    "title": "Harness Engineering 指南（nexu.io）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "nexu-io/harness-engineering-guide",
    "site": null,
    "commit": "86fec9bea430cecb29ff10afaae36b96496a8f8e",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/nexu-io/harness-engineering-guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Harness Engineering 指南（nexu.io）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "2026-04-15 — +15 New · 15 Total",
        "rel": "changelog",
        "sourceRel": "changelog/2026-04-15.md"
      },
      {
        "title": "Agent Teams: Parallel Claudes Building Real Software",
        "rel": "guide",
        "sourceRel": "guide/agent-teams.md"
      },
      {
        "title": "Harness Engineering 指南（nexu.io）",
        "rel": "site",
        "sourceRel": "site/README.md"
      },
      {
        "title": "Skills",
        "rel": "skills",
        "sourceRel": "skills/README.md"
      },
      {
        "title": "2026-04-15 — 新增 15 篇 · 累计 15 篇",
        "rel": "zh-changelog",
        "sourceRel": "zh-changelog/2026-04-15.md"
      },
      {
        "title": "Agent Teams：并行 Claude 打造真实软件",
        "rel": "zh-guide",
        "sourceRel": "zh-guide/agent-teams.md"
      }
    ]
  },
  {
    "id": "09-harness/harness-engineering-anthology",
    "volume": "09-harness",
    "local": "harness-engineering-anthology",
    "title": "Harness Engineering 文集",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "CC-BY-4.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "lopopolo/harness-engineering",
    "site": null,
    "commit": "226c8d35fb6ea3ed55467753dba6dea2b5fd5778",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/lopopolo/harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Harness Engineering",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Harness Engineering Theses",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Evaluate the Harness",
        "rel": "evals",
        "sourceRel": "evals/README.md"
      },
      {
        "title": "Playbooks",
        "rel": "playbooks",
        "sourceRel": "playbooks/README.md"
      },
      {
        "title": "Sources",
        "rel": "sources",
        "sourceRel": "sources/README.md"
      }
    ]
  },
  {
    "id": "09-harness/repository-harness",
    "volume": "09-harness",
    "local": "repository-harness",
    "title": "Repository Harness（仓库级 Agent 工作区）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "hoangnb24/repository-harness",
    "site": null,
    "commit": "e765792b635b4d5e3e5fc0578f82f9ca5dea2681",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/hoangnb24/repository-harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "repository-harness",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Documentation Map",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Scripts",
        "rel": "scripts",
        "sourceRel": "scripts/README.md"
      },
      {
        "title": "Test Suite Map",
        "rel": "tests",
        "sourceRel": "tests/README.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-everything",
    "volume": "09-harness",
    "local": "claude-code-everything",
    "title": "Claude Code Everything You Need to Know",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "wesammustafa/Claude-Code-Everything-You-Need-to-Know",
    "site": null,
    "commit": "d9e93740193aeae2cd661c7ddf6f0c8f8989860b",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Agent Teams — The Complete Guide",
        "rel": "docs",
        "sourceRel": "docs/agent-teams.md"
      },
      {
        "title": "MCP Servers Documentation",
        "rel": "mcp-servers",
        "sourceRel": "mcp-servers/README.md"
      }
    ]
  },
  {
    "id": "09-harness/agentic-harness-engineering",
    "volume": "09-harness",
    "local": "agentic-harness-engineering",
    "title": "Agentic Harness Engineering（论文与实现）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "china-qijizhifeng/agentic-harness-engineering",
    "site": null,
    "commit": "8b2a55d97590363fe50c3cc6b5e833b020a4bb4c",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/china-qijizhifeng/agentic-harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Long-Term Memory",
        "rel": "agents-code_agent_simple-LongTermMEMORY",
        "sourceRel": "agents/code_agent_simple/LongTermMEMORY.md"
      },
      {
        "title": "codeagentsimple",
        "rel": "agents-code_agent_simple-README",
        "sourceRel": "agents/code_agent_simple/README.md"
      },
      {
        "title": "Short-Term Memory",
        "rel": "agents-code_agent_simple-ShortTermMEMORY",
        "sourceRel": "agents/code_agent_simple/ShortTermMEMORY.md"
      },
      {
        "title": "Agentic Harness Engineering（论文与实现）",
        "rel": "agents-code_agent_simple-systemprompt",
        "sourceRel": "agents/code_agent_simple/systemprompt.md"
      },
      {
        "title": "Context Compaction Prompt",
        "rel": "agents-evolve_agent-compact_prompt",
        "sourceRel": "agents/evolve_agent/compact_prompt.md"
      },
      {
        "title": "Core Principles",
        "rel": "agents-evolve_agent-evolve_prompt",
        "sourceRel": "agents/evolve_agent/evolve_prompt.md"
      },
      {
        "title": "Context Compaction Prompt",
        "rel": "agents-evolve_agent-middleware-context_compaction-prompts-compact_prompt",
        "sourceRel": "agents/evolve_agent/middleware/context_compaction/prompts/compact_prompt.md"
      },
      {
        "title": "Emergency Context Compaction Prompt",
        "rel": "agents-evolve_agent-middleware-context_compaction-prompts-emergency_compact_prompt",
        "sourceRel": "agents/evolve_agent/middleware/context_compaction/prompts/emergency_compact_prompt.md"
      },
      {
        "title": "Agentic Harness Engineering（论文与实现）",
        "rel": "agents-evolve_agent-skills-agent-debugger-cli-_source-agent_debugger_core-runtime-system_prompt",
        "sourceRel": "agents/evolve_agent/skills/agent-debugger-cli/_source/agent_debugger_core/runtime/system_prompt.md"
      },
      {
        "title": "Agent Debugger CLI",
        "rel": "agents-evolve_agent-skills-agent-debugger-cli-SKILL",
        "sourceRel": "agents/evolve_agent/skills/agent-debugger-cli/SKILL.md"
      },
      {
        "title": "Agentic Harness Engineering（论文与实现）",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-reference-hooks",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/reference/hooks.md"
      },
      {
        "title": "🧠 Core Concepts: LLM Configuration",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-reference-llms",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/reference/llms.md"
      },
      {
        "title": "Sandbox System",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-reference-sandbox",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/reference/sandbox.md"
      },
      {
        "title": "Skills",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-reference-skills",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/reference/skills.md"
      },
      {
        "title": "🛠️ Core Concepts: Tools",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-reference-tools",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/reference/tools.md"
      },
      {
        "title": "NexAU Evolution Guide — Simple Agent Starting Point",
        "rel": "agents-evolve_agent-skills-nexau-evolution-guide-SKILL",
        "sourceRel": "agents/evolve_agent/skills/nexau-evolution-guide/SKILL.md"
      },
      {
        "title": "nexau 工具实现",
        "rel": "agents-evolve_agent-tools-REFERENCE",
        "sourceRel": "agents/evolve_agent/tools/REFERENCE.md"
      },
      {
        "title": "Context",
        "rel": "agents-explore_agent-source_agent-prompt",
        "sourceRel": "agents/explore_agent/source_agent/prompt.md"
      },
      {
        "title": "Context",
        "rel": "agents-explore_agent-web_agent-prompt",
        "sourceRel": "agents/explore_agent/web_agent/prompt.md"
      },
      {
        "title": "Long-Term Memory",
        "rel": "experiments-evolved_harness-LongTermMEMORY",
        "sourceRel": "experiments/evolved_harness/LongTermMEMORY.md"
      },
      {
        "title": "codeagentsimple",
        "rel": "experiments-evolved_harness-README",
        "sourceRel": "experiments/evolved_harness/README.md"
      },
      {
        "title": "Short-Term Memory",
        "rel": "experiments-evolved_harness-ShortTermMEMORY",
        "sourceRel": "experiments/evolved_harness/ShortTermMEMORY.md"
      },
      {
        "title": "Agentic Harness Engineering（论文与实现）",
        "rel": "experiments-evolved_harness-systemprompt",
        "sourceRel": "experiments/evolved_harness/systemprompt.md"
      },
      {
        "title": "Agentic Harness Engineering：以可观测性驱动的编码 Agent Harness 自动演化",
        "rel": "README_zh",
        "sourceRel": "README_zh.md"
      },
      {
        "title": "Task Analysis: {{taskid}}",
        "rel": "skills-agentic-harness-engineering-references-analysis-detail-template",
        "sourceRel": "skills/agentic-harness-engineering/references/analysis/detail-template.md"
      },
      {
        "title": "Evaluation Overview — Iteration {{iteration}}",
        "rel": "skills-agentic-harness-engineering-references-analysis-overview-template",
        "sourceRel": "skills/agentic-harness-engineering/references/analysis/overview-template.md"
      },
      {
        "title": "Analysis — 经验可观测性标准",
        "rel": "skills-agentic-harness-engineering-references-analysis-README",
        "sourceRel": "skills/agentic-harness-engineering/references/analysis/README.md"
      },
      {
        "title": "HARNESS.md Directory Template",
        "rel": "skills-agentic-harness-engineering-references-directory-template",
        "sourceRel": "skills/agentic-harness-engineering/references/directory-template.md"
      },
      {
        "title": "results.json — 评估结果标准格式",
        "rel": "skills-agentic-harness-engineering-references-docs-results-format",
        "sourceRel": "skills/agentic-harness-engineering/references/docs/results-format.md"
      },
      {
        "title": "回滚策略 — Harness Change Rollback",
        "rel": "skills-agentic-harness-engineering-references-docs-rollback-strategy",
        "sourceRel": "skills/agentic-harness-engineering/references/docs/rollback-strategy.md"
      },
      {
        "title": "Evaluation Overview — Iteration 3",
        "rel": "skills-agentic-harness-engineering-references-examples-trace-sample-analysis-overview",
        "sourceRel": "skills/agentic-harness-engineering/references/examples/trace-sample/analysis-overview.md"
      },
      {
        "title": "Trace Sample — Task T-042: Search Results Exceed 50",
        "rel": "skills-agentic-harness-engineering-references-examples-trace-sample-task-t042-search-truncation",
        "sourceRel": "skills/agentic-harness-engineering/references/examples/trace-sample/task-t042-search-truncation.md"
      },
      {
        "title": "HARNESS.md — Agent Harness Specification v1.0",
        "rel": "skills-agentic-harness-engineering-references-HARNESS",
        "sourceRel": "skills/agentic-harness-engineering/references/HARNESS.md"
      },
      {
        "title": "🦁 HARNESS.md + AHE.skill",
        "rel": "skills-agentic-harness-engineering-references-PROJECT_README",
        "sourceRel": "skills/agentic-harness-engineering/references/PROJECT_README.md"
      },
      {
        "title": "AHE Skill — Agent Harness Evolution",
        "rel": "skills-agentic-harness-engineering-SKILL",
        "sourceRel": "skills/agentic-harness-engineering/SKILL.md"
      }
    ]
  },
  {
    "id": "09-harness/meta-skill-harness-revfactory",
    "volume": "09-harness",
    "local": "meta-skill-harness-revfactory",
    "title": "Harness —— Claude Code 团队架构工厂",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "revfactory/harness",
    "site": null,
    "commit": "cceac68ea1d0ad198ef4b7b906cd238375836387",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/revfactory/harness",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Harness — The Team-Architecture Factory for Claude Code",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Experimental Flag Dependency",
        "rel": "docs",
        "sourceRel": "docs/experimental-dependency.md"
      },
      {
        "title": "Harness — GitHub Trending Readiness Audit",
        "rel": "_workspace",
        "sourceRel": "_workspace/01_auditor_repo_audit.md"
      }
    ]
  },
  {
    "id": "09-harness/codex-cli-best-practice",
    "volume": "09-harness",
    "local": "codex-cli-best-practice",
    "title": "Codex CLI Best Practice",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "shanraisshan/codex-cli-best-practice",
    "site": null,
    "commit": "b79f473a188632867354fc793894dfd368a18e48",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/shanraisshan/codex-cli-best-practice",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "codex-cli-best-practice",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Best Practice: AGENTS.md",
        "rel": "best-practice",
        "sourceRel": "best-practice/codex-agents-md.md"
      },
      {
        "title": "Skills System Reference",
        "rel": "docs",
        "sourceRel": "docs/SKILLS.md"
      },
      {
        "title": "Orchestration Workflow",
        "rel": "orchestration-workflow",
        "sourceRel": "orchestration-workflow/orchestration-workflow.md"
      }
    ]
  },
  {
    "id": "09-harness/awesome-harness-engineering-aiboost",
    "volume": "09-harness",
    "local": "awesome-harness-engineering-aiboost",
    "title": "Awesome Harness Engineering（ai-boost）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "CC0-1.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "ai-boost/awesome-harness-engineering",
    "site": null,
    "commit": "6015473ad287575fc06d0ddd7835306250a66b9f",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/ai-boost/awesome-harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome Harness Engineering（ai-boost）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AGENTS.md",
        "rel": "templates",
        "sourceRel": "templates/AGENTS.md"
      }
    ]
  },
  {
    "id": "09-harness/awesome-harness-engineering-walkinglabs",
    "volume": "09-harness",
    "local": "awesome-harness-engineering-walkinglabs",
    "title": "Awesome Harness Engineering（walkinglabs）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "license": "CC0-1.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "walkinglabs/awesome-harness-engineering",
    "site": null,
    "commit": "cff9b006ef64c624a62cbb1ee36b0c4b2b3a67ad",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/walkinglabs/awesome-harness-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome Harness Engineering",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "README Taxonomy Implementation Plan",
        "rel": "docs-plans-2026-08-19-readme-taxonomy-design",
        "sourceRel": "docs/plans/2026-08-19-readme-taxonomy-design.md"
      }
    ]
  },
  {
    "id": "09-harness/codex-orange-book",
    "volume": "09-harness",
    "local": "codex-orange-book",
    "title": "Codex 橙皮书",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "bozhouDev/codex-orange-book",
    "site": null,
    "commit": "6c72add96c319507da65f963abfd9618d0c9ea0f",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/bozhouDev/codex-orange-book",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "ChatGPT 橙皮书",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "ChatGPT 橙皮书网站发布说明",
        "rel": "site",
        "sourceRel": "site/DEPLOY.md"
      }
    ]
  },
  {
    "id": "09-harness/how-claude-code-works",
    "volume": "09-harness",
    "local": "how-claude-code-works",
    "title": "How Claude Code Works",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "Windy3f3f3f3f/how-claude-code-works",
    "site": null,
    "commit": "f4d6505ed9162a0ee6be089190f74c419ecacb19",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Windy3f3f3f3f/how-claude-code-works",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "How Claude Code Works",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "第 1 章：Claude Code 概述",
        "rel": "docs",
        "sourceRel": "docs/01-overview.md"
      },
      {
        "title": "How Claude Code Works",
        "rel": "en",
        "sourceRel": "en/README.md"
      }
    ]
  },
  {
    "id": "09-harness/claude-code-from-scratch",
    "volume": "09-harness",
    "local": "claude-code-from-scratch",
    "title": "Claude Code From Scratch",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "Windy3f3f3f3f/claude-code-from-scratch",
    "site": null,
    "commit": "0b452360866433fde0dc77cd37ada9d303546592",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/Windy3f3f3f3f/claude-code-from-scratch",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code From Scratch",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "引言：从一个空循环开始，造一个 Claude Code",
        "rel": "docs",
        "sourceRel": "docs/00-introduction.md"
      },
      {
        "title": "Claude Code From Scratch",
        "rel": "en",
        "sourceRel": "en/README.md"
      },
      {
        "title": "Mini Claude Code — Python 版",
        "rel": "python",
        "sourceRel": "python/README.md"
      },
      {
        "title": "Runnable steps",
        "rel": "steps",
        "sourceRel": "steps/README.md"
      },
      {
        "title": "Mini Claude 功能测试指南",
        "rel": "test",
        "sourceRel": "test/TEST-GUIDE.md"
      }
    ]
  },
  {
    "id": "09-harness/agentic-harness-patterns-skill",
    "volume": "09-harness",
    "local": "agentic-harness-patterns-skill",
    "title": "Agentic Harness Patterns（模式与技能）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "keli-wen/agentic-harness-patterns-skill",
    "site": null,
    "commit": "17549f55b84a94b1ff647ae4711be600fe8ae12f",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/keli-wen/agentic-harness-patterns-skill",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agentic Harness Patterns（模式与技能）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Claude Code 源码蒸馏 - Harness Engineering 实践记录",
        "rel": "docs",
        "sourceRel": "docs/distillation-harness-practice-zh.md"
      }
    ]
  },
  {
    "id": "09-harness/langchain-deepagents",
    "volume": "09-harness",
    "local": "langchain-deepagents",
    "title": "LangChain DeepAgents",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "langchain-ai/deepagents",
    "site": null,
    "commit": "d93ab3351bbf4c3687212f665094ccad100f2c08",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/langchain-ai/deepagents",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "LangChain DeepAgents",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "LangChain DeepAgents",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Deep Agents Monorepo",
        "rel": "libs",
        "sourceRel": "libs/README.md"
      }
    ]
  },
  {
    "id": "09-harness/ecc",
    "volume": "09-harness",
    "local": "ecc",
    "title": "ECC —— Harness 性能优化系统",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "affaan-m/ECC",
    "site": null,
    "commit": "928c1dea72f5c330442fc1f595563398b8f389f7",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/affaan-m/ECC",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "ECC",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents",
        "sourceRel": "agents/a11y-architect.md"
      },
      {
        "title": "Aside Command",
        "rel": "commands",
        "sourceRel": "commands/aside.md"
      },
      {
        "title": "Development Context",
        "rel": "contexts",
        "sourceRel": "contexts/dev.md"
      },
      {
        "title": "Antigravity Setup and Usage Guide",
        "rel": "docs",
        "sourceRel": "docs/ANTIGRAVITY-GUIDE.md"
      }
    ]
  },
  {
    "id": "10-context-memory/huggingface-mcp-course",
    "volume": "10-context-memory",
    "local": "huggingface-mcp-course",
    "title": "The Model Context Protocol (MCP) Course",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "huggingface/mcp-course",
    "site": null,
    "commit": "e706ccc0d7abe73c31813979c3451c0e31c8a464",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/huggingface/mcp-course",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "The Model Context Protocol (MCP) Course",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Welcome to the 🤗 Model Context Protocol (MCP) Course",
        "rel": "units-en-unit0-introduction",
        "sourceRel": "units/en/unit0/introduction.mdx"
      },
      {
        "title": "Architectural Components of MCP",
        "rel": "units-en-unit1-architectural-components",
        "sourceRel": "units/en/unit1/architectural-components.mdx"
      },
      {
        "title": "Understanding MCP Capabilities",
        "rel": "units-en-unit1-capabilities",
        "sourceRel": "units/en/unit1/capabilities.mdx"
      },
      {
        "title": "Get your certificate!",
        "rel": "units-en-unit1-certificate",
        "sourceRel": "units/en/unit1/certificate.mdx"
      },
      {
        "title": "Gradio MCP Integration",
        "rel": "units-en-unit1-gradio-mcp",
        "sourceRel": "units/en/unit1/gradio-mcp.mdx"
      },
      {
        "title": "Hugging Face MCP Server",
        "rel": "units-en-unit1-hf-mcp-server",
        "sourceRel": "units/en/unit1/hf-mcp-server.mdx"
      },
      {
        "title": "Introduction to Model Context Protocol (MCP)",
        "rel": "units-en-unit1-introduction",
        "sourceRel": "units/en/unit1/introduction.mdx"
      },
      {
        "title": "Key Concepts and Terminology",
        "rel": "units-en-unit1-key-concepts",
        "sourceRel": "units/en/unit1/key-concepts.mdx"
      },
      {
        "title": "MCP Clients",
        "rel": "units-en-unit1-mcp-clients",
        "sourceRel": "units/en/unit1/mcp-clients.mdx"
      },
      {
        "title": "Quiz 1: MCP Fundamentals",
        "rel": "units-en-unit1-quiz1",
        "sourceRel": "units/en/unit1/quiz1.mdx"
      },
      {
        "title": "Quiz 2: MCP SDK",
        "rel": "units-en-unit1-quiz2",
        "sourceRel": "units/en/unit1/quiz2.mdx"
      },
      {
        "title": "MCP SDK",
        "rel": "units-en-unit1-sdk",
        "sourceRel": "units/en/unit1/sdk.mdx"
      },
      {
        "title": "Unit1 recap",
        "rel": "units-en-unit1-unit1-recap",
        "sourceRel": "units/en/unit1/unit1-recap.mdx"
      },
      {
        "title": "Building MCP Clients",
        "rel": "units-en-unit2-clients",
        "sourceRel": "units/en/unit2/clients.mdx"
      },
      {
        "title": "Using MCP with Local and Open Source Models",
        "rel": "units-en-unit2-continue-client",
        "sourceRel": "units/en/unit2/continue-client.mdx"
      },
      {
        "title": "Gradio as an MCP Client",
        "rel": "units-en-unit2-gradio-client",
        "sourceRel": "units/en/unit2/gradio-client.mdx"
      },
      {
        "title": "Building the Gradio MCP Server",
        "rel": "units-en-unit2-gradio-server",
        "sourceRel": "units/en/unit2/gradio-server.mdx"
      },
      {
        "title": "Building an End-to-End MCP Application",
        "rel": "units-en-unit2-introduction",
        "sourceRel": "units/en/unit2/introduction.mdx"
      },
      {
        "title": "Local Tiny Agents with AMD NPU and iGPU Acceleration",
        "rel": "units-en-unit2-lemonade-server",
        "sourceRel": "units/en/unit2/lemonade-server.mdx"
      },
      {
        "title": "Building Tiny Agents with MCP and the Hugging Face Hub",
        "rel": "units-en-unit2-tiny-agents",
        "sourceRel": "units/en/unit2/tiny-agents.mdx"
      },
      {
        "title": "Conclusion",
        "rel": "units-en-unit3_1-conclusion",
        "sourceRel": "units/en/unit3_1/conclusion.mdx"
      },
      {
        "title": "Creating the MCP Server",
        "rel": "units-en-unit3_1-creating-the-mcp-server",
        "sourceRel": "units/en/unit3_1/creating-the-mcp-server.mdx"
      },
      {
        "title": "Build a Pull Request Agent on the Hugging Face Hub",
        "rel": "units-en-unit3_1-introduction",
        "sourceRel": "units/en/unit3_1/introduction.mdx"
      },
      {
        "title": "MCP Client",
        "rel": "units-en-unit3_1-mcp-client",
        "sourceRel": "units/en/unit3_1/mcp-client.mdx"
      },
      {
        "title": "Quiz 1: MCP Server Implementation",
        "rel": "units-en-unit3_1-quiz1",
        "sourceRel": "units/en/unit3_1/quiz1.mdx"
      },
      {
        "title": "Quiz 2: Pull Request Agent Integration",
        "rel": "units-en-unit3_1-quiz2",
        "sourceRel": "units/en/unit3_1/quiz2.mdx"
      },
      {
        "title": "Setting up the Project",
        "rel": "units-en-unit3_1-setting-up-the-project",
        "sourceRel": "units/en/unit3_1/setting-up-the-project.mdx"
      },
      {
        "title": "Webhook Listener",
        "rel": "units-en-unit3_1-webhook-listener",
        "sourceRel": "units/en/unit3_1/webhook-listener.mdx"
      },
      {
        "title": "Unit 3 Solution Walkthrough: Building a Pull Request Agent with MCP",
        "rel": "units-en-unit3-build-mcp-server-solution-walkthrough",
        "sourceRel": "units/en/unit3/build-mcp-server-solution-walkthrough.mdx"
      },
      {
        "title": "Module 1: Build MCP Server",
        "rel": "units-en-unit3-build-mcp-server",
        "sourceRel": "units/en/unit3/build-mcp-server.mdx"
      },
      {
        "title": "Get your certificate!",
        "rel": "units-en-unit3-certificate",
        "sourceRel": "units/en/unit3/certificate.mdx"
      },
      {
        "title": "Unit 3 Conclusion: The CodeCraft Studios Transformation",
        "rel": "units-en-unit3-conclusion",
        "sourceRel": "units/en/unit3/conclusion.mdx"
      },
      {
        "title": "Module 2: GitHub Actions Integration",
        "rel": "units-en-unit3-github-actions-integration",
        "sourceRel": "units/en/unit3/github-actions-integration.mdx"
      },
      {
        "title": "Advanced MCP Development: Building Custom Workflow Servers for Claude Code",
        "rel": "units-en-unit3-introduction",
        "sourceRel": "units/en/unit3/introduction.mdx"
      },
      {
        "title": "Module 3: Slack Notification",
        "rel": "units-en-unit3-slack-notification",
        "sourceRel": "units/en/unit3/slack-notification.mdx"
      }
    ]
  },
  {
    "id": "10-context-memory/prompt-engineering-guide",
    "volume": "10-context-memory",
    "local": "prompt-engineering-guide",
    "title": "Prompt Engineering Guide",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "dair-ai/Prompt-Engineering-Guide",
    "site": null,
    "commit": "57673726396dd94acb23bdb1e67f27c78ee85a8e",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/dair-ai/Prompt-Engineering-Guide",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Prompt Engineering Guide",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "About",
        "rel": "ar-pages",
        "sourceRel": "ar-pages/about.ar.mdx"
      },
      {
        "title": "Prompt Engineering Guide",
        "rel": "guides",
        "sourceRel": "guides/README.md"
      },
      {
        "title": "Quant a",
        "rel": "pages",
        "sourceRel": "pages/about.ca.mdx"
      }
    ]
  },
  {
    "id": "10-context-memory/context-engineering-book",
    "volume": "10-context-memory",
    "local": "context-engineering-book",
    "title": "Context Engineering（Bonigarcia 教程）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "bonigarcia/context-engineering",
    "site": null,
    "commit": "46719154489e410b509db4fb69ab1c29fb3362a0",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/bonigarcia/context-engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Context Engineering",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Basic interaction with LLMs in Java",
        "rel": "ch01-java-README",
        "sourceRel": "ch01/java/README.md"
      },
      {
        "title": "Basic interaction with Anthropic Claude models",
        "rel": "ch01-javascript-anthropic-claude-basic-README",
        "sourceRel": "ch01/javascript/anthropic-claude-basic/README.md"
      },
      {
        "title": "Streaming responses from Anthropic Claude models",
        "rel": "ch01-javascript-anthropic-claude-streaming-README",
        "sourceRel": "ch01/javascript/anthropic-claude-streaming/README.md"
      },
      {
        "title": "Basic interaction with Google Gemini models",
        "rel": "ch01-javascript-google-gemini-basic-README",
        "sourceRel": "ch01/javascript/google-gemini-basic/README.md"
      },
      {
        "title": "Streaming responses from Google Gemini models",
        "rel": "ch01-javascript-google-gemini-streaming-README",
        "sourceRel": "ch01/javascript/google-gemini-streaming/README.md"
      },
      {
        "title": "Basic interaction with a local LLM using Ollama",
        "rel": "ch01-javascript-ollama-local-basic-README",
        "sourceRel": "ch01/javascript/ollama-local-basic/README.md"
      },
      {
        "title": "Streaming responses from a local LLM using Ollama",
        "rel": "ch01-javascript-ollama-local-streaming-README",
        "sourceRel": "ch01/javascript/ollama-local-streaming/README.md"
      },
      {
        "title": "Basic interaction with OpenAI GPT models",
        "rel": "ch01-javascript-openai-gpt-basic-README",
        "sourceRel": "ch01/javascript/openai-gpt-basic/README.md"
      },
      {
        "title": "Streaming responses from OpenAI GPT models",
        "rel": "ch01-javascript-openai-gpt-streaming-README",
        "sourceRel": "ch01/javascript/openai-gpt-streaming/README.md"
      },
      {
        "title": "Basic interaction with LLMs in JavaScript",
        "rel": "ch01-javascript-README",
        "sourceRel": "ch01/javascript/README.md"
      },
      {
        "title": "Basic interaction with LLMs in Jupyter Notebooks",
        "rel": "ch01-jupyter-README",
        "sourceRel": "ch01/jupyter/README.md"
      },
      {
        "title": "Basic interaction with Anthropic Claude models",
        "rel": "ch01-python-anthropic-claude-basic-README",
        "sourceRel": "ch01/python/anthropic-claude-basic/README.md"
      },
      {
        "title": "Streaming responses from Anthropic Claude models",
        "rel": "ch01-python-anthropic-claude-streaming-README",
        "sourceRel": "ch01/python/anthropic-claude-streaming/README.md"
      },
      {
        "title": "Basic interaction with Google Gemini models",
        "rel": "ch01-python-google-gemini-basic-README",
        "sourceRel": "ch01/python/google-gemini-basic/README.md"
      },
      {
        "title": "Streaming responses from Google Gemini models",
        "rel": "ch01-python-google-gemini-streaming-README",
        "sourceRel": "ch01/python/google-gemini-streaming/README.md"
      },
      {
        "title": "Basic interaction with a local LLM using Ollama",
        "rel": "ch01-python-ollama-local-basic-README",
        "sourceRel": "ch01/python/ollama-local-basic/README.md"
      },
      {
        "title": "Streaming responses from a local LLM using Ollama",
        "rel": "ch01-python-ollama-local-streaming-README",
        "sourceRel": "ch01/python/ollama-local-streaming/README.md"
      },
      {
        "title": "Basic interaction with OpenAI GPT models",
        "rel": "ch01-python-openai-gpt-basic-README",
        "sourceRel": "ch01/python/openai-gpt-basic/README.md"
      },
      {
        "title": "Streaming responses from OpenAI GPT models",
        "rel": "ch01-python-openai-gpt-streaming-README",
        "sourceRel": "ch01/python/openai-gpt-streaming/README.md"
      },
      {
        "title": "Basic interaction with LLMs in Python",
        "rel": "ch01-python-README",
        "sourceRel": "ch01/python/README.md"
      },
      {
        "title": "Project Notetaker",
        "rel": "ch02-agent-skills-project-notetaker-SKILL",
        "sourceRel": "ch02/agent-skills/project-notetaker/SKILL.md"
      },
      {
        "title": "Agent Skills",
        "rel": "ch02-agent-skills-README",
        "sourceRel": "ch02/agent-skills/README.md"
      },
      {
        "title": "System prompt in Java",
        "rel": "ch02-java-README",
        "sourceRel": "ch02/java/README.md"
      },
      {
        "title": "System prompt with Anthropic Claude models",
        "rel": "ch02-javascript-anthropic-claude-system-prompt-README",
        "sourceRel": "ch02/javascript/anthropic-claude-system-prompt/README.md"
      },
      {
        "title": "System prompt with Google Gemini models",
        "rel": "ch02-javascript-google-gemini-system-prompt-README",
        "sourceRel": "ch02/javascript/google-gemini-system-prompt/README.md"
      },
      {
        "title": "System prompt with Ollama models",
        "rel": "ch02-javascript-ollama-local-system-prompt-README",
        "sourceRel": "ch02/javascript/ollama-local-system-prompt/README.md"
      },
      {
        "title": "System prompt with OpenAI GPT models",
        "rel": "ch02-javascript-openai-gpt-system-prompt-README",
        "sourceRel": "ch02/javascript/openai-gpt-system-prompt/README.md"
      },
      {
        "title": "System prompt in JavaScript",
        "rel": "ch02-javascript-README",
        "sourceRel": "ch02/javascript/README.md"
      },
      {
        "title": "System prompt in Jupyter Notebooks",
        "rel": "ch02-jupyter-README",
        "sourceRel": "ch02/jupyter/README.md"
      },
      {
        "title": "System prompt with Anthropic Claude models",
        "rel": "ch02-python-anthropic-claude-system-prompt-README",
        "sourceRel": "ch02/python/anthropic-claude-system-prompt/README.md"
      },
      {
        "title": "System prompt with Google Gemini models",
        "rel": "ch02-python-google-gemini-system-prompt-README",
        "sourceRel": "ch02/python/google-gemini-system-prompt/README.md"
      },
      {
        "title": "Instruction artifacts",
        "rel": "ch02-python-instruction-artifacts-README",
        "sourceRel": "ch02/python/instruction-artifacts/README.md"
      },
      {
        "title": "Claude Code instructions",
        "rel": "ch02-python-instruction-artifacts-task-tracker-CLAUDE",
        "sourceRel": "ch02/python/instruction-artifacts/task-tracker/CLAUDE.md"
      },
      {
        "title": "System prompt with Ollama models",
        "rel": "ch02-python-ollama-local-system-prompt-README",
        "sourceRel": "ch02/python/ollama-local-system-prompt/README.md"
      },
      {
        "title": "System prompt with OpenAI GPT models",
        "rel": "ch02-python-openai-gpt-system-prompt-README",
        "sourceRel": "ch02/python/openai-gpt-system-prompt/README.md"
      },
      {
        "title": "System prompt in Python",
        "rel": "ch02-python-README",
        "sourceRel": "ch02/python/README.md"
      },
      {
        "title": "Agentic retrieval-augmented generation (RAG)",
        "rel": "ch03-python-agentic-rag-README",
        "sourceRel": "ch03/python/agentic-rag/README.md"
      },
      {
        "title": "Cache-Augmented Generation (CAG)",
        "rel": "ch03-python-cag-README",
        "sourceRel": "ch03/python/cag/README.md"
      },
      {
        "title": "Context stuffing (system-level context)",
        "rel": "ch03-python-context-stuffing-system-prompt-README",
        "sourceRel": "ch03/python/context-stuffing-system-prompt/README.md"
      },
      {
        "title": "Context stuffing (user-level context)",
        "rel": "ch03-python-context-stuffing-user-prompt-README",
        "sourceRel": "ch03/python/context-stuffing-user-prompt/README.md"
      },
      {
        "title": "Context Engineering（Bonigarcia 教程）",
        "rel": "ch03-python-local-rag-README",
        "sourceRel": "ch03/python/local-rag/README.md"
      },
      {
        "title": "RAG with Hugging Face",
        "rel": "ch03-python-rag-hugging-face-README",
        "sourceRel": "ch03/python/rag-hugging-face/README.md"
      },
      {
        "title": "RAG with OpenAI",
        "rel": "ch03-python-rag-openai-README",
        "sourceRel": "ch03/python/rag-openai/README.md"
      },
      {
        "title": "RAGFlow Basic Example",
        "rel": "ch03-python-ragflow-basic-README",
        "sourceRel": "ch03/python/ragflow-basic/README.md"
      },
      {
        "title": "Retrieval-Augmented Generation (RAG) in Python",
        "rel": "ch03-python-README",
        "sourceRel": "ch03/python/README.md"
      },
      {
        "title": "Vectorless RAG with PageIndex",
        "rel": "ch03-python-vectorless-rag-pageindex-README",
        "sourceRel": "ch03/python/vectorless-rag-pageindex/README.md"
      },
      {
        "title": "Agent skills for CLI workflows",
        "rel": "ch04-agent-skills-README",
        "sourceRel": "ch04/agent-skills/README.md"
      },
      {
        "title": "Workspace Analyzer",
        "rel": "ch04-agent-skills-workspace-analyzer-SKILL",
        "sourceRel": "ch04/agent-skills/workspace-analyzer/SKILL.md"
      },
      {
        "title": "Function calling",
        "rel": "ch04-java-function_calling-README",
        "sourceRel": "ch04/java/function_calling/README.md"
      },
      {
        "title": "MCP Selenium server in Java",
        "rel": "ch04-java-mcp_server-mcp-java-sdk-README",
        "sourceRel": "ch04/java/mcp_server/mcp-java-sdk/README.md"
      },
      {
        "title": "MCP Selenium Server with Micronaut",
        "rel": "ch04-java-mcp_server-mcp-micronaut-README",
        "sourceRel": "ch04/java/mcp_server/mcp-micronaut/README.md"
      },
      {
        "title": "MCP Selenium Server with Quarkus",
        "rel": "ch04-java-mcp_server-mcp-quarkus-README",
        "sourceRel": "ch04/java/mcp_server/mcp-quarkus/README.md"
      },
      {
        "title": "MCP Selenium Server with Spring-Boot",
        "rel": "ch04-java-mcp_server-mcp-spring-ai-README",
        "sourceRel": "ch04/java/mcp_server/mcp-spring-ai/README.md"
      },
      {
        "title": "MCP Selenium server in Java",
        "rel": "ch04-java-mcp_server-README",
        "sourceRel": "ch04/java/mcp_server/README.md"
      },
      {
        "title": "Function calling",
        "rel": "ch04-javascript-function_calling-README",
        "sourceRel": "ch04/javascript/function_calling/README.md"
      },
      {
        "title": "MCP Selenium server in JavaScript",
        "rel": "ch04-javascript-mcp_server-README",
        "sourceRel": "ch04/javascript/mcp_server/README.md"
      },
      {
        "title": "Function calling",
        "rel": "ch04-python-function_calling-README",
        "sourceRel": "ch04/python/function_calling/README.md"
      },
      {
        "title": "MCP Selenium server with Python",
        "rel": "ch04-python-mcp_server-README",
        "sourceRel": "ch04/python/mcp_server/README.md"
      },
      {
        "title": "Memory and state examples",
        "rel": "ch05-java-README",
        "sourceRel": "ch05/java/README.md"
      },
      {
        "title": "Memory-backed chat",
        "rel": "ch05-javascript-mem0_chat-README",
        "sourceRel": "ch05/javascript/mem0_chat/README.md"
      },
      {
        "title": "Chapter 5 JavaScript examples",
        "rel": "ch05-javascript-README",
        "sourceRel": "ch05/javascript/README.md"
      },
      {
        "title": "Session state chat",
        "rel": "ch05-javascript-session_state_chat-README",
        "sourceRel": "ch05/javascript/session_state_chat/README.md"
      },
      {
        "title": "Workflow state handoff",
        "rel": "ch05-javascript-workflow_state_handoff-README",
        "sourceRel": "ch05/javascript/workflow_state_handoff/README.md"
      },
      {
        "title": "Basic memory with Cognee",
        "rel": "ch05-python-cognee_memory-README",
        "sourceRel": "ch05/python/cognee_memory/README.md"
      },
      {
        "title": "Memory-backed chat",
        "rel": "ch05-python-mem0_chat-README",
        "sourceRel": "ch05/python/mem0_chat/README.md"
      },
      {
        "title": "Memory Coach",
        "rel": "ch05-python-memory_coach-README",
        "sourceRel": "ch05/python/memory_coach/README.md"
      },
      {
        "title": "Session Memory",
        "rel": "ch05-python-session_memory_chat-README",
        "sourceRel": "ch05/python/session_memory_chat/README.md"
      },
      {
        "title": "Session State Chat",
        "rel": "ch05-python-session_state_chat-README",
        "sourceRel": "ch05/python/session_state_chat/README.md"
      },
      {
        "title": "Workflow State Handoff",
        "rel": "ch05-python-workflow_state_handoff-README",
        "sourceRel": "ch05/python/workflow_state_handoff/README.md"
      },
      {
        "title": "Prompting examples in Java",
        "rel": "ch06-java-README",
        "sourceRel": "ch06/java/README.md"
      },
      {
        "title": "Few-shot ticket normalizer",
        "rel": "ch06-javascript-few-shot-ticket-normalizer-README",
        "sourceRel": "ch06/javascript/few-shot-ticket-normalizer/README.md"
      },
      {
        "title": "Prompt chaining support reply",
        "rel": "ch06-javascript-prompt-chaining-support-reply-README",
        "sourceRel": "ch06/javascript/prompt-chaining-support-reply/README.md"
      },
      {
        "title": "Prompting examples in JavaScript",
        "rel": "ch06-javascript-README",
        "sourceRel": "ch06/javascript/README.md"
      },
      {
        "title": "Prompting examples in Jupyter Notebooks",
        "rel": "ch06-jupyter-README",
        "sourceRel": "ch06/jupyter/README.md"
      },
      {
        "title": "DSPy: Chain-of-Thought vs ReAct",
        "rel": "ch06-python-dspy-cot-vs-react-README",
        "sourceRel": "ch06/python/dspy-cot-vs-react/README.md"
      },
      {
        "title": "Few-shot ticket normalizer",
        "rel": "ch06-python-few-shot-ticket-normalizer-README",
        "sourceRel": "ch06/python/few-shot-ticket-normalizer/README.md"
      },
      {
        "title": "Prompt chaining support reply",
        "rel": "ch06-python-prompt-chaining-support-reply-README",
        "sourceRel": "ch06/python/prompt-chaining-support-reply/README.md"
      },
      {
        "title": "Agent-to-Agent (A2A) communication example",
        "rel": "ch07-a2a-example-README",
        "sourceRel": "ch07/a2a-example/README.md"
      },
      {
        "title": "Context compression with LLMLingua",
        "rel": "ch07-context-compression-README",
        "sourceRel": "ch07/context-compression/README.md"
      },
      {
        "title": "Collaborative agents with CrewAI",
        "rel": "ch07-crewai-crew-README",
        "sourceRel": "ch07/crewai-crew/README.md"
      },
      {
        "title": "Orchestration with DeepAgents",
        "rel": "ch07-deepagents-orchestration-README",
        "sourceRel": "ch07/deepagents-orchestration/README.md"
      },
      {
        "title": "Multi-agent router pattern",
        "rel": "ch07-multi-agent-router-README",
        "sourceRel": "ch07/multi-agent-router/README.md"
      },
      {
        "title": "Filesystem context with OpenViking",
        "rel": "ch07-openviking-filesystem-README",
        "sourceRel": "ch07/openviking-filesystem/README.md"
      },
      {
        "title": "LLM evals with Promptfoo",
        "rel": "ch08-evals-promptfoo-README",
        "sourceRel": "ch08/evals-promptfoo/README.md"
      },
      {
        "title": "Context evaluation with LLM-as-Judge using Ragas",
        "rel": "ch08-llm-as-judge-ragas-README",
        "sourceRel": "ch08/llm-as-judge-ragas/README.md"
      },
      {
        "title": "Metrics with DeepEval",
        "rel": "ch08-metrics-deepeval-README",
        "sourceRel": "ch08/metrics-deepeval/README.md"
      },
      {
        "title": "Observability and tracing with Langfuse",
        "rel": "ch08-observability-langfuse-README",
        "sourceRel": "ch08/observability-langfuse/README.md"
      },
      {
        "title": "Observability with LangSmith",
        "rel": "ch08-observability-langsmith-README",
        "sourceRel": "ch08/observability-langsmith/README.md"
      },
      {
        "title": "Bias detection: assessing fairness in AI recommendations",
        "rel": "ch09-bias_detection-README",
        "sourceRel": "ch09/bias_detection/README.md"
      },
      {
        "title": "Context as code: Jinja2 prompt template with a CI evaluation gate",
        "rel": "ch09-context_as_code-README",
        "sourceRel": "ch09/context_as_code/README.md"
      },
      {
        "title": "Fine-tuning: customizing model behavior",
        "rel": "ch09-fine_tuning-README",
        "sourceRel": "ch09/fine_tuning/README.md"
      },
      {
        "title": "Human-in-the-Loop (HITL) example",
        "rel": "ch09-human-in-the-loop-README",
        "sourceRel": "ch09/human-in-the-loop/README.md"
      },
      {
        "title": "LiteLLM gateway example",
        "rel": "ch09-litellm_gateway-README",
        "sourceRel": "ch09/litellm_gateway/README.md"
      },
      {
        "title": "Output validation with JSON Schema",
        "rel": "ch09-output_validation-README",
        "sourceRel": "ch09/output_validation/README.md"
      },
      {
        "title": "PII redaction with Microsoft Presidio",
        "rel": "ch09-pii_presidio-README",
        "sourceRel": "ch09/pii_presidio/README.md"
      },
      {
        "title": "Agent with tool in Agent Development Kit (ADK)",
        "rel": "ch10-adk-agent_with_tool-README",
        "sourceRel": "ch10/adk/agent_with_tool/README.md"
      },
      {
        "title": "Basic agent with Agent Development Kit (ADK)",
        "rel": "ch10-adk-basic_agent-README",
        "sourceRel": "ch10/adk/basic_agent/README.md"
      },
      {
        "title": "Context compression Agent Development Kit (ADK)",
        "rel": "ch10-adk-context_compression-README",
        "sourceRel": "ch10/adk/context_compression/README.md"
      },
      {
        "title": "Google search example",
        "rel": "ch10-adk-google_search-README",
        "sourceRel": "ch10/adk/google_search/README.md"
      },
      {
        "title": "ADK memory example",
        "rel": "ch10-adk-memory-README",
        "sourceRel": "ch10/adk/memory/README.md"
      },
      {
        "title": "Agent Development Kit (ADK) examples",
        "rel": "ch10-adk-README",
        "sourceRel": "ch10/adk/README.md"
      },
      {
        "title": "ADK state example",
        "rel": "ch10-adk-state-README",
        "sourceRel": "ch10/adk/state/README.md"
      },
      {
        "title": "Conversational state demo with Microsoft Agent Framework",
        "rel": "ch10-agent_framework-agent_conversational_state-README",
        "sourceRel": "ch10/agent_framework/agent_conversational_state/README.md"
      },
      {
        "title": "Agent with memory using Microsoft Agent Framework",
        "rel": "ch10-agent_framework-agent_with_memory-README",
        "sourceRel": "ch10/agent_framework/agent_with_memory/README.md"
      },
      {
        "title": "Agent with RAG using Microsoft Agent Framework",
        "rel": "ch10-agent_framework-agent_with_rag-README",
        "sourceRel": "ch10/agent_framework/agent_with_rag/README.md"
      },
      {
        "title": "Agent with Tool with Microsoft Agent Framework",
        "rel": "ch10-agent_framework-agent_with_tool-README",
        "sourceRel": "ch10/agent_framework/agent_with_tool/README.md"
      },
      {
        "title": "Basic conversation with Microsoft Agent Framework",
        "rel": "ch10-agent_framework-basic_conversation-README",
        "sourceRel": "ch10/agent_framework/basic_conversation/README.md"
      },
      {
        "title": "Microsoft Agent Framework examples",
        "rel": "ch10-agent_framework-README",
        "sourceRel": "ch10/agent_framework/README.md"
      },
      {
        "title": "Workflow state in Microsoft Agent Framework",
        "rel": "ch10-agent_framework-workflow_state-README",
        "sourceRel": "ch10/agent_framework/workflow_state/README.md"
      },
      {
        "title": "AgentOS Service",
        "rel": "ch10-agno-agent_os_service-README",
        "sourceRel": "ch10/agno/agent_os_service/README.md"
      },
      {
        "title": "Audit Traces",
        "rel": "ch10-agno-audit_traces-README",
        "sourceRel": "ch10/agno/audit_traces/README.md"
      },
      {
        "title": "Knowledge Store",
        "rel": "ch10-agno-knowledge_store-README",
        "sourceRel": "ch10/agno/knowledge_store/README.md"
      },
      {
        "title": "Agno examples",
        "rel": "ch10-agno-README",
        "sourceRel": "ch10/agno/README.md"
      },
      {
        "title": "Session Memory",
        "rel": "ch10-agno-session_memory-README",
        "sourceRel": "ch10/agno/session_memory/README.md"
      },
      {
        "title": "Sorting Hat",
        "rel": "ch10-agno-sorting_hat-README",
        "sourceRel": "ch10/agno/sorting_hat/README.md"
      },
      {
        "title": "Basic text generation with the AI SDK",
        "rel": "ch10-ai_sdk-basic_text_generation-README",
        "sourceRel": "ch10/ai_sdk/basic_text_generation/README.md"
      },
      {
        "title": "Vercel AI SDK examples",
        "rel": "ch10-ai_sdk-README",
        "sourceRel": "ch10/ai_sdk/README.md"
      },
      {
        "title": "Streaming text with the AI SDK",
        "rel": "ch10-ai_sdk-streaming_text-README",
        "sourceRel": "ch10/ai_sdk/streaming_text/README.md"
      },
      {
        "title": "Structured output with the AI SDK",
        "rel": "ch10-ai_sdk-structured_output-README",
        "sourceRel": "ch10/ai_sdk/structured_output/README.md"
      },
      {
        "title": "Tool use with the AI SDK",
        "rel": "ch10-ai_sdk-tool_use-README",
        "sourceRel": "ch10/ai_sdk/tool_use/README.md"
      },
      {
        "title": "Code Review Agent with Amazon Bedrock AgentCore",
        "rel": "ch10-bedrock_agentcore-code_review_agent-README",
        "sourceRel": "ch10/bedrock_agentcore/code_review_agent/README.md"
      },
      {
        "title": "Hosted agent with Amazon Bedrock AgentCore",
        "rel": "ch10-bedrock_agentcore-hosted_agent-README",
        "sourceRel": "ch10/bedrock_agentcore/hosted_agent/README.md"
      },
      {
        "title": "Amazon Bedrock AgentCore examples",
        "rel": "ch10-bedrock_agentcore-README",
        "sourceRel": "ch10/bedrock_agentcore/README.md"
      },
      {
        "title": "Basic agent with the Claude Agent SDK",
        "rel": "ch10-claude_agent_sdk-basic_agent-README",
        "sourceRel": "ch10/claude_agent_sdk/basic_agent/README.md"
      },
      {
        "title": "Claude Agent SDK examples",
        "rel": "ch10-claude_agent_sdk-README",
        "sourceRel": "ch10/claude_agent_sdk/README.md"
      },
      {
        "title": "Critique Revision",
        "rel": "ch10-crewai-critique_revision-README",
        "sourceRel": "ch10/crewai/critique_revision/README.md"
      },
      {
        "title": "Memory Handoff",
        "rel": "ch10-crewai-memory_handoff-README",
        "sourceRel": "ch10/crewai/memory_handoff/README.md"
      },
      {
        "title": "Planner Executor",
        "rel": "ch10-crewai-planner_executor-README",
        "sourceRel": "ch10/crewai/planner_executor/README.md"
      },
      {
        "title": "CrewAI examples",
        "rel": "ch10-crewai-README",
        "sourceRel": "ch10/crewai/README.md"
      },
      {
        "title": "Research and Write with CrewAI",
        "rel": "ch10-crewai-research_and_write-README",
        "sourceRel": "ch10/crewai/research_and_write/README.md"
      },
      {
        "title": "Tool Chain",
        "rel": "ch10-crewai-tool_chain-README",
        "sourceRel": "ch10/crewai/tool_chain/README.md"
      },
      {
        "title": "Filesystem Context",
        "rel": "ch10-deepagents-filesystem_context-README",
        "sourceRel": "ch10/deepagents/filesystem_context/README.md"
      },
      {
        "title": "Human Approval",
        "rel": "ch10-deepagents-human_approval-README",
        "sourceRel": "ch10/deepagents/human_approval/README.md"
      },
      {
        "title": "Orchestration",
        "rel": "ch10-deepagents-orchestration-README",
        "sourceRel": "ch10/deepagents/orchestration/README.md"
      },
      {
        "title": "DeepAgents examples",
        "rel": "ch10-deepagents-README",
        "sourceRel": "ch10/deepagents/README.md"
      },
      {
        "title": "Sub-agent Delegation",
        "rel": "ch10-deepagents-subagent_delegation-README",
        "sourceRel": "ch10/deepagents/subagent_delegation/README.md"
      },
      {
        "title": "DSPy BootstrapFewShot example",
        "rel": "ch10-dspy-bootstrap_few_shot-README",
        "sourceRel": "ch10/dspy/bootstrap_few_shot/README.md"
      },
      {
        "title": "Tool use with local context in DSPy",
        "rel": "ch10-dspy-context_tooling-README",
        "sourceRel": "ch10/dspy/context_tooling/README.md"
      },
      {
        "title": "DSPy examples",
        "rel": "ch10-dspy-README",
        "sourceRel": "ch10/dspy/README.md"
      },
      {
        "title": "Stepwise reasoning with DSPy",
        "rel": "ch10-dspy-stepwise_reasoning-README",
        "sourceRel": "ch10/dspy/stepwise_reasoning/README.md"
      },
      {
        "title": "Structured output with DSPy",
        "rel": "ch10-dspy-structured_output-README",
        "sourceRel": "ch10/dspy/structured_output/README.md"
      },
      {
        "title": "Ticket triage",
        "rel": "ch10-dspy-ticket_triage-README",
        "sourceRel": "ch10/dspy/ticket_triage/README.md"
      },
      {
        "title": "Basic agent with Embabel and Ollama",
        "rel": "ch10-embabel-basic_agent-README",
        "sourceRel": "ch10/embabel/basic_agent/README.md"
      },
      {
        "title": "Goal planning with Embabel and Ollama",
        "rel": "ch10-embabel-goal_planning-README",
        "sourceRel": "ch10/embabel/goal_planning/README.md"
      },
      {
        "title": "Persona prompts with Embabel and Ollama",
        "rel": "ch10-embabel-persona_prompt-README",
        "sourceRel": "ch10/embabel/persona_prompt/README.md"
      },
      {
        "title": "Embabel examples",
        "rel": "ch10-embabel-README",
        "sourceRel": "ch10/embabel/README.md"
      },
      {
        "title": "Deploying an ADK agent to Gemini Enterprise Agent Platform",
        "rel": "ch10-gemini_agent_platform-deploy_adk_agent-README",
        "sourceRel": "ch10/gemini_agent_platform/deploy_adk_agent/README.md"
      },
      {
        "title": "Development Agent with Gemini Enterprise Agent Platform",
        "rel": "ch10-gemini_agent_platform-dev_agent-README",
        "sourceRel": "ch10/gemini_agent_platform/dev_agent/README.md"
      },
      {
        "title": "Feature: Idea Scoring",
        "rel": "ch10-gemini_agent_platform-dev_agent-spec",
        "sourceRel": "ch10/gemini_agent_platform/dev_agent/spec.md"
      },
      {
        "title": "Gemini Enterprise Agent Platform examples",
        "rel": "ch10-gemini_agent_platform-README",
        "sourceRel": "ch10/gemini_agent_platform/README.md"
      },
      {
        "title": "Pipeline composition",
        "rel": "ch10-haystack-pipeline_composition-README",
        "sourceRel": "ch10/haystack/pipeline_composition/README.md"
      },
      {
        "title": "Query expansion",
        "rel": "ch10-haystack-query_expansion-README",
        "sourceRel": "ch10/haystack/query_expansion/README.md"
      },
      {
        "title": "RAG pipeline",
        "rel": "ch10-haystack-rag_pipeline-README",
        "sourceRel": "ch10/haystack/rag_pipeline/README.md"
      },
      {
        "title": "Haystack examples",
        "rel": "ch10-haystack-README",
        "sourceRel": "ch10/haystack/README.md"
      },
      {
        "title": "Reranking",
        "rel": "ch10-haystack-reranking-README",
        "sourceRel": "ch10/haystack/reranking/README.md"
      },
      {
        "title": "Basic interaction with an LLM using LangChain",
        "rel": "ch10-langchain-basic_llm_interaction-README",
        "sourceRel": "ch10/langchain/basic_llm_interaction/README.md"
      },
      {
        "title": "Context compression with LangChain",
        "rel": "ch10-langchain-context_compression-README",
        "sourceRel": "ch10/langchain/context_compression/README.md"
      },
      {
        "title": "Conversational memory with LangChain",
        "rel": "ch10-langchain-conversational_memory-README",
        "sourceRel": "ch10/langchain/conversational_memory/README.md"
      },
      {
        "title": "Retrieval-Augmented Generation (RAG) with LangChain",
        "rel": "ch10-langchain-rag_with_vectorstore-README",
        "sourceRel": "ch10/langchain/rag_with_vectorstore/README.md"
      },
      {
        "title": "LangChain examples",
        "rel": "ch10-langchain-README",
        "sourceRel": "ch10/langchain/README.md"
      },
      {
        "title": "Structured output with LangChain core primitives",
        "rel": "ch10-langchain-structured_output-README",
        "sourceRel": "ch10/langchain/structured_output/README.md"
      },
      {
        "title": "Tool calling with LangChain agents",
        "rel": "ch10-langchain-tool_calling-README",
        "sourceRel": "ch10/langchain/tool_calling/README.md"
      },
      {
        "title": "Basic assistant with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-basic_assistant-README",
        "sourceRel": "ch10/langchain4j/basic_assistant/README.md"
      },
      {
        "title": "Chat memory with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-chat_memory-README",
        "sourceRel": "ch10/langchain4j/chat_memory/README.md"
      },
      {
        "title": "Context assembly with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-context_assembly-README",
        "sourceRel": "ch10/langchain4j/context_assembly/README.md"
      },
      {
        "title": "Retrieval with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-rag_retrieval-README",
        "sourceRel": "ch10/langchain4j/rag_retrieval/README.md"
      },
      {
        "title": "LangChain4j examples",
        "rel": "ch10-langchain4j-README",
        "sourceRel": "ch10/langchain4j/README.md"
      },
      {
        "title": "Structured output with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-structured_output-README",
        "sourceRel": "ch10/langchain4j/structured_output/README.md"
      },
      {
        "title": "Tool use with LangChain4j and Ollama",
        "rel": "ch10-langchain4j-tool_use-README",
        "sourceRel": "ch10/langchain4j/tool_use/README.md"
      },
      {
        "title": "Basic LangGraph agent for stateful workflows",
        "rel": "ch10-langgraph-basic_agent-README",
        "sourceRel": "ch10/langgraph/basic_agent/README.md"
      },
      {
        "title": "LangGraph checkpointed resume",
        "rel": "ch10-langgraph-checkpointed_resume-README",
        "sourceRel": "ch10/langgraph/checkpointed_resume/README.md"
      },
      {
        "title": "LangGraph examples",
        "rel": "ch10-langgraph-README",
        "sourceRel": "ch10/langgraph/README.md"
      },
      {
        "title": "LangGraph review workflow",
        "rel": "ch10-langgraph-review_workflow-README",
        "sourceRel": "ch10/langgraph/review_workflow/README.md"
      },
      {
        "title": "Agent with custom tool in LlamaIndex",
        "rel": "ch10-llamaindex-agent_with_tool-README",
        "sourceRel": "ch10/llamaindex/agent_with_tool/README.md"
      },
      {
        "title": "Answer and Context Relevancy Evaluations in LlamaIndex",
        "rel": "ch10-llamaindex-answer_context_evaluation-README",
        "sourceRel": "ch10/llamaindex/answer_context_evaluation/README.md"
      },
      {
        "title": "Conversational memory and state with LlamaIndex",
        "rel": "ch10-llamaindex-conversational_memory-README",
        "sourceRel": "ch10/llamaindex/conversational_memory/README.md"
      },
      {
        "title": "Customizing prompts with LlamaIndex",
        "rel": "ch10-llamaindex-custom_prompts-README",
        "sourceRel": "ch10/llamaindex/custom_prompts/README.md"
      },
      {
        "title": "RAG Agent with Context Retrieval in LlamaIndex",
        "rel": "ch10-llamaindex-rag_agent_with_context_retrieval-README",
        "sourceRel": "ch10/llamaindex/rag_agent_with_context_retrieval/README.md"
      },
      {
        "title": "Basic RAG example with LlamaIndex",
        "rel": "ch10-llamaindex-rag_basic-README",
        "sourceRel": "ch10/llamaindex/rag_basic/README.md"
      },
      {
        "title": "LlamaIndex examples",
        "rel": "ch10-llamaindex-README",
        "sourceRel": "ch10/llamaindex/README.md"
      },
      {
        "title": "n8n data assembly",
        "rel": "ch10-n8n-data_assembly-README",
        "sourceRel": "ch10/n8n/data_assembly/README.md"
      },
      {
        "title": "n8n error recovery",
        "rel": "ch10-n8n-error_recovery-README",
        "sourceRel": "ch10/n8n/error_recovery/README.md"
      },
      {
        "title": "n8n human approval workflow",
        "rel": "ch10-n8n-human_approval_workflow-README",
        "sourceRel": "ch10/n8n/human_approval_workflow/README.md"
      },
      {
        "title": "n8n workflow sketch",
        "rel": "ch10-n8n-human_approval_workflow-workflow",
        "sourceRel": "ch10/n8n/human_approval_workflow/workflow.md"
      },
      {
        "title": "n8n workflow examples",
        "rel": "ch10-n8n-README",
        "sourceRel": "ch10/n8n/README.md"
      },
      {
        "title": "n8n subworkflow boundary",
        "rel": "ch10-n8n-subworkflow_boundary-README",
        "sourceRel": "ch10/n8n/subworkflow_boundary/README.md"
      },
      {
        "title": "Durable ops assistant",
        "rel": "ch10-openclaw-durable_ops_assistant-README",
        "sourceRel": "ch10/openclaw/durable_ops_assistant/README.md"
      },
      {
        "title": "OpenClaw examples",
        "rel": "ch10-openclaw-README",
        "sourceRel": "ch10/openclaw/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/context-engineering-intro",
    "volume": "10-context-memory",
    "local": "context-engineering-intro",
    "title": "Context Engineering Intro",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "coleam00/context-engineering-intro",
    "site": null,
    "commit": "a2d84b021cee1e2f4e77ba854bba0be8cb319035",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/coleam00/context-engineering-intro",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Context Engineering Template",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Semantic Search Agent - Dependency Configuration",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-planning-dependencies",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/planning/dependencies.md"
      },
      {
        "title": "Agent Requirements: Semantic Search Agent",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-planning-INITIAL",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/planning/INITIAL.md"
      },
      {
        "title": "System Prompts for Semantic Search Agent",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-planning-prompts",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/planning/prompts.md"
      },
      {
        "title": "Tools for Semantic Search Agent",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-planning-tools",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/planning/tools.md"
      },
      {
        "title": "🔍 Semantic Search Agent",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-README",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/README.md"
      },
      {
        "title": "Semantic Search Agent - Validation Report",
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent-tests-VALIDATION_REPORT",
        "sourceRel": "use-cases/agent-factory-with-subagents/agents/rag_agent/tests/VALIDATION_REPORT.md"
      },
      {
        "title": "🏭 Pydantic AI Agent Factory - Global Orchestration Rules",
        "rel": "use-cases-agent-factory-with-subagents-CLAUDE",
        "sourceRel": "use-cases/agent-factory-with-subagents/CLAUDE.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-agent-factory-with-subagents-PRPs-INITIAL",
        "sourceRel": "use-cases/agent-factory-with-subagents/PRPs/INITIAL.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-agent-factory-with-subagents-PRPs-templates-prp_pydantic_ai_base",
        "sourceRel": "use-cases/agent-factory-with-subagents/PRPs/templates/prp_pydantic_ai_base.md"
      },
      {
        "title": "🏭 AI Agent Factory with Claude Code Subagents",
        "rel": "use-cases-agent-factory-with-subagents-README",
        "sourceRel": "use-cases/agent-factory-with-subagents/README.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-agent-factory-with-subagents-SAMPLE_PROMPT",
        "sourceRel": "use-cases/agent-factory-with-subagents/SAMPLE_PROMPT.md"
      },
      {
        "title": "WISC Framework: Context Engineering for AI Coding",
        "rel": "use-cases-ai-coding-wisc-framework-README",
        "sourceRel": "use-cases/ai-coding-wisc-framework/README.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-ai-coding-workflows-foundation-agents-codebase-analyst",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/agents/codebase-analyst.md"
      },
      {
        "title": "Software Feature Validator",
        "rel": "use-cases-ai-coding-workflows-foundation-agents-validator",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/agents/validator.md"
      },
      {
        "title": "Create Implementation Plan from Requirements",
        "rel": "use-cases-ai-coding-workflows-foundation-commands-create-plan",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/commands/create-plan.md"
      },
      {
        "title": "Execute Development Plan with Archon Task Management",
        "rel": "use-cases-ai-coding-workflows-foundation-commands-execute-plan",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/commands/execute-plan.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-ai-coding-workflows-foundation-commands-primer",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/commands/primer.md"
      },
      {
        "title": "🚀 AI Coding Workflows",
        "rel": "use-cases-ai-coding-workflows-foundation-README",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/README.md"
      },
      {
        "title": "Claude Agent SDK Session Manager",
        "rel": "use-cases-build-with-agent-team-example-plan-session-manager-plan",
        "sourceRel": "use-cases/build-with-agent-team/example-plan/session-manager-plan.md"
      },
      {
        "title": "Build with Agent Team",
        "rel": "use-cases-build-with-agent-team-README",
        "sourceRel": "use-cases/build-with-agent-team/README.md"
      },
      {
        "title": "Build with Agent Team",
        "rel": "use-cases-build-with-agent-team-SKILL",
        "sourceRel": "use-cases/build-with-agent-team/SKILL.md"
      },
      {
        "title": "MCP Server with GitHub OAuth - Implementation Guide",
        "rel": "use-cases-mcp-server-CLAUDE",
        "sourceRel": "use-cases/mcp-server/CLAUDE.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-mcp-server-PRPs-ai_docs-claude_api_usage",
        "sourceRel": "use-cases/mcp-server/PRPs/ai_docs/claude_api_usage.md"
      },
      {
        "title": "MCP Server Development Patterns",
        "rel": "use-cases-mcp-server-PRPs-ai_docs-mcp_patterns",
        "sourceRel": "use-cases/mcp-server/PRPs/ai_docs/mcp_patterns.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-mcp-server-PRPs-INITIAL",
        "sourceRel": "use-cases/mcp-server/PRPs/INITIAL.md"
      },
      {
        "title": "Product Requirement Prompt (PRP) Concept",
        "rel": "use-cases-mcp-server-PRPs-README",
        "sourceRel": "use-cases/mcp-server/PRPs/README.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-mcp-server-PRPs-templates-prp_mcp_base",
        "sourceRel": "use-cases/mcp-server/PRPs/templates/prp_mcp_base.md"
      },
      {
        "title": "MCP Server Builder - Context Engineering Use Case",
        "rel": "use-cases-mcp-server-README",
        "sourceRel": "use-cases/mcp-server/README.md"
      },
      {
        "title": "PydanticAI Context Engineering - Global Rules for AI Agent Development",
        "rel": "use-cases-pydantic-ai-CLAUDE",
        "sourceRel": "use-cases/pydantic-ai/CLAUDE.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-pydantic-ai-PRPs-INITIAL",
        "sourceRel": "use-cases/pydantic-ai/PRPs/INITIAL.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-pydantic-ai-PRPs-templates-prp_pydantic_ai_base",
        "sourceRel": "use-cases/pydantic-ai/PRPs/templates/prp_pydantic_ai_base.md"
      },
      {
        "title": "Pydantic AI Context Engineering Template",
        "rel": "use-cases-pydantic-ai-README",
        "sourceRel": "use-cases/pydantic-ai/README.md"
      },
      {
        "title": "Template Generator - Global Rules for Context Engineering",
        "rel": "use-cases-template-generator-CLAUDE",
        "sourceRel": "use-cases/template-generator/CLAUDE.md"
      },
      {
        "title": "Template Generation Request",
        "rel": "use-cases-template-generator-PRPs-INITIAL_PYDANTIC_AI",
        "sourceRel": "use-cases/template-generator/PRPs/INITIAL_PYDANTIC_AI.md"
      },
      {
        "title": "Template Generation Request",
        "rel": "use-cases-template-generator-PRPs-INITIAL",
        "sourceRel": "use-cases/template-generator/PRPs/INITIAL.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-template-generator-PRPs-template-pydantic-ai",
        "sourceRel": "use-cases/template-generator/PRPs/template-pydantic-ai.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-template-generator-PRPs-templates-prp_template_base",
        "sourceRel": "use-cases/template-generator/PRPs/templates/prp_template_base.md"
      },
      {
        "title": "Template Generator - Meta-Framework for Context Engineering",
        "rel": "use-cases-template-generator-README",
        "sourceRel": "use-cases/template-generator/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/claude-code-system-prompts",
    "volume": "10-context-memory",
    "local": "claude-code-system-prompts",
    "title": "Claude Code System Prompts",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "Piebald-AI/claude-code-system-prompts",
    "site": null,
    "commit": "3af4c6139aaabb0470440961ca8c8fb871099234",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/Piebald-AI/claude-code-system-prompts",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts",
        "sourceRel": "system-prompts/agent-prompt-agent-hook.md"
      }
    ]
  },
  {
    "id": "10-context-memory/microsoft-skills",
    "volume": "10-context-memory",
    "local": "microsoft-skills",
    "title": "Microsoft Agent Skills",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/skills",
    "site": null,
    "commit": "cf77b1efbf3117501f4727c476894751311ee885",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/microsoft/skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent Skills",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Astro Starter Kit: Minimal",
        "rel": "docs-site",
        "sourceRel": "docs-site/README.md"
      },
      {
        "title": "Skill Evaluation Test Harness",
        "rel": "tests",
        "sourceRel": "tests/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/agent-skills-for-context-engineering",
    "volume": "10-context-memory",
    "local": "agent-skills-for-context-engineering",
    "title": "Agent Skills for Context Engineering",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "muratcankoylan/Agent-Skills-for-Context-Engineering",
    "site": null,
    "commit": "6dbe1a1d868eab51a3bc9011b0f55e2891513e40",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "PDF Processing",
        "rel": "docs",
        "sourceRel": "docs/agentskills.md"
      },
      {
        "title": "Governance policy",
        "rel": "governance",
        "sourceRel": "governance/README.md"
      },
      {
        "title": "Researcher Operating System",
        "rel": "researcher",
        "sourceRel": "researcher/README.md"
      },
      {
        "title": "Skill Name",
        "rel": "template",
        "sourceRel": "template/SKILL.md"
      }
    ]
  },
  {
    "id": "10-context-memory/mattpocock-skills",
    "volume": "10-context-memory",
    "local": "mattpocock-skills",
    "title": "Matt Pocock Skills（工程技能库）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "mattpocock/skills",
    "site": null,
    "commit": "3cca18b368ae95cdbdebbff572ccafa662551015",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/mattpocock/skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Skills For Real Engineers",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-ask-matt",
        "sourceRel": "docs/engineering/ask-matt.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-code-review",
        "sourceRel": "docs/engineering/code-review.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-codebase-design",
        "sourceRel": "docs/engineering/codebase-design.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-diagnosing-bugs",
        "sourceRel": "docs/engineering/diagnosing-bugs.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-domain-modeling",
        "sourceRel": "docs/engineering/domain-modeling.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-grill-with-docs",
        "sourceRel": "docs/engineering/grill-with-docs.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-implement",
        "sourceRel": "docs/engineering/implement.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-improve-codebase-architecture",
        "sourceRel": "docs/engineering/improve-codebase-architecture.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-prototype",
        "sourceRel": "docs/engineering/prototype.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-research",
        "sourceRel": "docs/engineering/research.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-resolving-merge-conflicts",
        "sourceRel": "docs/engineering/resolving-merge-conflicts.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-setup-matt-pocock-skills",
        "sourceRel": "docs/engineering/setup-matt-pocock-skills.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-tdd",
        "sourceRel": "docs/engineering/tdd.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-to-spec",
        "sourceRel": "docs/engineering/to-spec.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-to-tickets",
        "sourceRel": "docs/engineering/to-tickets.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-triage",
        "sourceRel": "docs/engineering/triage.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-wayfinder",
        "sourceRel": "docs/engineering/wayfinder.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-engineering-wizard",
        "sourceRel": "docs/engineering/wizard.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-grill-me",
        "sourceRel": "docs/productivity/grill-me.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-grilling",
        "sourceRel": "docs/productivity/grilling.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-handoff",
        "sourceRel": "docs/productivity/handoff.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-teach",
        "sourceRel": "docs/productivity/teach.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-to-questionnaire",
        "sourceRel": "docs/productivity/to-questionnaire.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-wait-what",
        "sourceRel": "docs/productivity/wait-what.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "docs-productivity-writing-for-agents",
        "sourceRel": "docs/productivity/writing-for-agents.md"
      },
      {
        "title": "Deprecated",
        "rel": "skills-deprecated-README",
        "sourceRel": "skills/deprecated/README.md"
      },
      {
        "title": "Phase boundaries",
        "rel": "skills-engineering-ask-matt-PHASE-BOUNDARIES",
        "sourceRel": "skills/engineering/ask-matt/PHASE-BOUNDARIES.md"
      },
      {
        "title": "Ask Matt",
        "rel": "skills-engineering-ask-matt-SKILL",
        "sourceRel": "skills/engineering/ask-matt/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-code-review-SKILL",
        "sourceRel": "skills/engineering/code-review/SKILL.md"
      },
      {
        "title": "Deepening",
        "rel": "skills-engineering-codebase-design-DEEPENING",
        "sourceRel": "skills/engineering/codebase-design/DEEPENING.md"
      },
      {
        "title": "Design It Twice",
        "rel": "skills-engineering-codebase-design-DESIGN-IT-TWICE",
        "sourceRel": "skills/engineering/codebase-design/DESIGN-IT-TWICE.md"
      },
      {
        "title": "Codebase Design",
        "rel": "skills-engineering-codebase-design-SKILL",
        "sourceRel": "skills/engineering/codebase-design/SKILL.md"
      },
      {
        "title": "Diagnosing Bugs",
        "rel": "skills-engineering-diagnosing-bugs-SKILL",
        "sourceRel": "skills/engineering/diagnosing-bugs/SKILL.md"
      },
      {
        "title": "ADR Format",
        "rel": "skills-engineering-domain-modeling-ADR-FORMAT",
        "sourceRel": "skills/engineering/domain-modeling/ADR-FORMAT.md"
      },
      {
        "title": "CONTEXT.md Format",
        "rel": "skills-engineering-domain-modeling-CONTEXT-FORMAT",
        "sourceRel": "skills/engineering/domain-modeling/CONTEXT-FORMAT.md"
      },
      {
        "title": "Domain Modeling",
        "rel": "skills-engineering-domain-modeling-SKILL",
        "sourceRel": "skills/engineering/domain-modeling/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-implement-SKILL",
        "sourceRel": "skills/engineering/implement/SKILL.md"
      },
      {
        "title": "Improve Codebase Architecture",
        "rel": "skills-engineering-improve-codebase-architecture-SKILL",
        "sourceRel": "skills/engineering/improve-codebase-architecture/SKILL.md"
      },
      {
        "title": "Logic Prototype",
        "rel": "skills-engineering-prototype-LOGIC",
        "sourceRel": "skills/engineering/prototype/LOGIC.md"
      },
      {
        "title": "Prototype",
        "rel": "skills-engineering-prototype-SKILL",
        "sourceRel": "skills/engineering/prototype/SKILL.md"
      },
      {
        "title": "UI Prototype",
        "rel": "skills-engineering-prototype-UI",
        "sourceRel": "skills/engineering/prototype/UI.md"
      },
      {
        "title": "Engineering",
        "rel": "skills-engineering-README",
        "sourceRel": "skills/engineering/README.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-research-SKILL",
        "sourceRel": "skills/engineering/research/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-resolving-merge-conflicts-SKILL",
        "sourceRel": "skills/engineering/resolving-merge-conflicts/SKILL.md"
      },
      {
        "title": "Domain Docs",
        "rel": "skills-engineering-setup-matt-pocock-skills-domain",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/domain.md"
      },
      {
        "title": "Issue tracker: GitHub",
        "rel": "skills-engineering-setup-matt-pocock-skills-issue-tracker-github",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md"
      },
      {
        "title": "Issue tracker: GitLab",
        "rel": "skills-engineering-setup-matt-pocock-skills-issue-tracker-gitlab",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/issue-tracker-gitlab.md"
      },
      {
        "title": "Issue tracker: Local Markdown",
        "rel": "skills-engineering-setup-matt-pocock-skills-issue-tracker-local",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md"
      },
      {
        "title": "Setup Matt Pocock's Skills",
        "rel": "skills-engineering-setup-matt-pocock-skills-SKILL",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/SKILL.md"
      },
      {
        "title": "Triage Labels",
        "rel": "skills-engineering-setup-matt-pocock-skills-triage-labels",
        "sourceRel": "skills/engineering/setup-matt-pocock-skills/triage-labels.md"
      },
      {
        "title": "When to Mock",
        "rel": "skills-engineering-tdd-mocking",
        "sourceRel": "skills/engineering/tdd/mocking.md"
      },
      {
        "title": "Test-Driven Development",
        "rel": "skills-engineering-tdd-SKILL",
        "sourceRel": "skills/engineering/tdd/SKILL.md"
      },
      {
        "title": "Good and Bad Tests",
        "rel": "skills-engineering-tdd-tests",
        "sourceRel": "skills/engineering/tdd/tests.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-to-spec-SKILL",
        "sourceRel": "skills/engineering/to-spec/SKILL.md"
      },
      {
        "title": "To Tickets",
        "rel": "skills-engineering-to-tickets-SKILL",
        "sourceRel": "skills/engineering/to-tickets/SKILL.md"
      },
      {
        "title": "Writing Agent Briefs",
        "rel": "skills-engineering-triage-AGENT-BRIEF",
        "sourceRel": "skills/engineering/triage/AGENT-BRIEF.md"
      },
      {
        "title": "Out-of-Scope Knowledge Base",
        "rel": "skills-engineering-triage-OUT-OF-SCOPE",
        "sourceRel": "skills/engineering/triage/OUT-OF-SCOPE.md"
      },
      {
        "title": "Triage",
        "rel": "skills-engineering-triage-SKILL",
        "sourceRel": "skills/engineering/triage/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-engineering-wayfinder-SKILL",
        "sourceRel": "skills/engineering/wayfinder/SKILL.md"
      },
      {
        "title": "Wizard",
        "rel": "skills-engineering-wizard-SKILL",
        "sourceRel": "skills/engineering/wizard/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-in-progress-claude-handoff-SKILL",
        "sourceRel": "skills/in-progress/claude-handoff/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-in-progress-implement-spec-SKILL",
        "sourceRel": "skills/in-progress/implement-spec/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-in-progress-loop-me-SKILL",
        "sourceRel": "skills/in-progress/loop-me/SKILL.md"
      },
      {
        "title": "In Progress",
        "rel": "skills-in-progress-README",
        "sourceRel": "skills/in-progress/README.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-in-progress-retro-SKILL",
        "sourceRel": "skills/in-progress/retro/SKILL.md"
      },
      {
        "title": "Setup TS Deep Modules",
        "rel": "skills-in-progress-setup-ts-deep-modules-SKILL",
        "sourceRel": "skills/in-progress/setup-ts-deep-modules/SKILL.md"
      },
      {
        "title": "Setup Git Guardrails",
        "rel": "skills-misc-git-guardrails-claude-code-SKILL",
        "sourceRel": "skills/misc/git-guardrails-claude-code/SKILL.md"
      },
      {
        "title": "Migrate to Shoehorn",
        "rel": "skills-misc-migrate-to-shoehorn-SKILL",
        "sourceRel": "skills/misc/migrate-to-shoehorn/SKILL.md"
      },
      {
        "title": "Misc",
        "rel": "skills-misc-README",
        "sourceRel": "skills/misc/README.md"
      },
      {
        "title": "Scaffold Exercises",
        "rel": "skills-misc-scaffold-exercises-SKILL",
        "sourceRel": "skills/misc/scaffold-exercises/SKILL.md"
      },
      {
        "title": "Setup Pre-Commit Hooks",
        "rel": "skills-misc-setup-pre-commit-SKILL",
        "sourceRel": "skills/misc/setup-pre-commit/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-grilling-SKILL",
        "sourceRel": "skills/productivity/grilling/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-handoff-SKILL",
        "sourceRel": "skills/productivity/handoff/SKILL.md"
      },
      {
        "title": "Productivity",
        "rel": "skills-productivity-README",
        "sourceRel": "skills/productivity/README.md"
      },
      {
        "title": "GLOSSARY.md Format",
        "rel": "skills-productivity-teach-GLOSSARY-FORMAT",
        "sourceRel": "skills/productivity/teach/GLOSSARY-FORMAT.md"
      },
      {
        "title": "Learning Record Format",
        "rel": "skills-productivity-teach-LEARNING-RECORD-FORMAT",
        "sourceRel": "skills/productivity/teach/LEARNING-RECORD-FORMAT.md"
      },
      {
        "title": "MISSION.md Format",
        "rel": "skills-productivity-teach-MISSION-FORMAT",
        "sourceRel": "skills/productivity/teach/MISSION-FORMAT.md"
      },
      {
        "title": "RESOURCES.md Format",
        "rel": "skills-productivity-teach-RESOURCES-FORMAT",
        "sourceRel": "skills/productivity/teach/RESOURCES-FORMAT.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-teach-SKILL",
        "sourceRel": "skills/productivity/teach/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-to-questionnaire-SKILL",
        "sourceRel": "skills/productivity/to-questionnaire/SKILL.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-wait-what-SKILL",
        "sourceRel": "skills/productivity/wait-what/SKILL.md"
      },
      {
        "title": "Skill mechanics",
        "rel": "skills-productivity-writing-for-agents-SKILL-MECHANICS",
        "sourceRel": "skills/productivity/writing-for-agents/SKILL-MECHANICS.md"
      },
      {
        "title": "Matt Pocock Skills（工程技能库）",
        "rel": "skills-productivity-writing-for-agents-SKILL",
        "sourceRel": "skills/productivity/writing-for-agents/SKILL.md"
      }
    ]
  },
  {
    "id": "10-context-memory/agent-skills-addyosmani",
    "volume": "10-context-memory",
    "local": "agent-skills-addyosmani",
    "title": "Agent Skills（Addy Osmani）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "addyosmani/agent-skills",
    "site": null,
    "commit": "6ca0cd7db39b41b1c37e26d335c507ee92382c6d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/addyosmani/agent-skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent Skills",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Senior Code Reviewer",
        "rel": "agents",
        "sourceRel": "agents/code-reviewer.md"
      },
      {
        "title": "Adoption Guide: New Projects vs. Established Codebases",
        "rel": "docs",
        "sourceRel": "docs/adoption-guide.md"
      },
      {
        "title": "Skill Evals",
        "rel": "evals",
        "sourceRel": "evals/README.md"
      },
      {
        "title": "sdd-cache hook",
        "rel": "hooks",
        "sourceRel": "hooks/SDD-CACHE.md"
      },
      {
        "title": "Accessibility Checklist",
        "rel": "references",
        "sourceRel": "references/accessibility-checklist.md"
      }
    ]
  },
  {
    "id": "10-context-memory/superpowers",
    "volume": "10-context-memory",
    "local": "superpowers",
    "title": "Superpowers（Claude Code 技能库）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "obra/superpowers",
    "site": null,
    "commit": "b36e0829c6d0140e93cfef2ca599b1b07d4a7797",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/obra/superpowers",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Superpowers",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Porting Superpowers to a New Harness",
        "rel": "docs",
        "sourceRel": "docs/porting-to-a-new-harness.md"
      }
    ]
  },
  {
    "id": "10-context-memory/superpowers-zh",
    "volume": "10-context-memory",
    "local": "superpowers-zh",
    "title": "superpowers-zh（AI 编程超能力 · 中文增强版）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "jnMetaCode/superpowers-zh",
    "site": null,
    "commit": "79ea5d262b7a1c7ce76a289390853bca51f940d4",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/jnMetaCode/superpowers-zh",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "superpowers-zh（AI 编程超能力 · 中文增强版）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Superpowers 中文版 — Aider 安装指南",
        "rel": "docs",
        "sourceRel": "docs/README.aider.md"
      },
      {
        "title": "superpowers-zh 官网",
        "rel": "site",
        "sourceRel": "site/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/awesome-agent-skills-heilcheng",
    "volume": "10-context-memory",
    "local": "awesome-agent-skills-heilcheng",
    "title": "Agent Skill Index",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "heilcheng/awesome-agent-skills",
    "site": null,
    "commit": "de9056857eb0e96da833469d2ee3ac392058225d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/heilcheng/awesome-agent-skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Agent Skill Index",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Agent Skill Index",
        "rel": "website",
        "sourceRel": "website/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/wonderful-prompts",
    "volume": "10-context-memory",
    "local": "wonderful-prompts",
    "title": "Wonderful Prompts",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "langgptai/wonderful-prompts",
    "site": null,
    "commit": "c8e5dbd3bc01740728fd1ab8f8d4f654a17e3697",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/langgptai/wonderful-prompts",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Prompts 精选 🚀",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Role: []",
        "rel": "examples",
        "sourceRel": "examples/base.md"
      }
    ]
  },
  {
    "id": "10-context-memory/get-shit-done",
    "volume": "10-context-memory",
    "local": "get-shit-done",
    "title": "GSD（Get Shit Done）工作流文档",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "gsd-build/get-shit-done",
    "site": null,
    "commit": "bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/gsd-build/get-shit-done",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "GSD Has Moved",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents",
        "sourceRel": "agents/gsd-advisor-researcher.md"
      },
      {
        "title": "GSD Documentation",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/ai-engineering-hub",
    "volume": "10-context-memory",
    "local": "ai-engineering-hub",
    "title": "AI Engineering Hub",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "patchy631/ai-engineering-hub",
    "site": null,
    "commit": "2c9b106168d4540b88e727e4aa316c06c856c2b7",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/patchy631/ai-engineering-hub",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "AI Engineering Hub 🚀",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Summary Generator multi-agent workflow with ACP",
        "rel": "acp-code",
        "sourceRel": "acp-code/README.md"
      },
      {
        "title": "Crash Course: Building AI Agents with Open-Source Tools",
        "rel": "agent-with-mcp-memory",
        "sourceRel": "agent-with-mcp-memory/README.md"
      },
      {
        "title": "Agentic RAG using CrewAI",
        "rel": "agentic_rag",
        "sourceRel": "agentic_rag/README.md"
      },
      {
        "title": "Enterprise-grade, agentic RAG over complex real-world docs",
        "rel": "agentic_rag_deepseek",
        "sourceRel": "agentic_rag_deepseek/README.md"
      },
      {
        "title": "AI Avatar Demo powered by Zep",
        "rel": "ai-avatar-demo",
        "sourceRel": "ai-avatar-demo/README.md"
      },
      {
        "title": "🚀 AI Engineering Roadmap",
        "rel": "ai-engineering-roadmap",
        "sourceRel": "ai-engineering-roadmap/README.md"
      },
      {
        "title": "🎙️ Podsite - AI Podcast Generation",
        "rel": "ai-podcast-generation",
        "sourceRel": "ai-podcast-generation/README.md"
      },
      {
        "title": "AI Podcast Generator",
        "rel": "ai-podcast-generator",
        "sourceRel": "ai-podcast-generator/README.md"
      },
      {
        "title": "AI News generator",
        "rel": "ai_news_generator",
        "sourceRel": "ai_news_generator/README.md"
      },
      {
        "title": "Amazon Product Analysis MCP Server",
        "rel": "amazon-product-analysis-server",
        "sourceRel": "amazon-product-analysis-server/README.md"
      },
      {
        "title": "MCP-RL: Train AI Agents to Master MCP Servers with Reinforcement Learning",
        "rel": "art_mcp_rl",
        "sourceRel": "art_mcp_rl/README.md"
      },
      {
        "title": "AssemblyAI Audio Analysis Toolkit",
        "rel": "audio-analysis-toolkit",
        "sourceRel": "audio-analysis-toolkit/README.md"
      },
      {
        "title": "Coding and Stock Analyst",
        "rel": "autogen-stock-analyst",
        "sourceRel": "autogen-stock-analyst/README.md"
      },
      {
        "title": "Biotech Agentic Analyst",
        "rel": "biotech-agentic-analyst",
        "sourceRel": "biotech-agentic-analyst/README.md"
      },
      {
        "title": "Book Writer flow using DeepMind's Gemma 3, CrewAI and BrightData",
        "rel": "book-writer-flow",
        "sourceRel": "book-writer-flow/README.md"
      },
      {
        "title": "Brand monitoring flow using DeepSeek-R1, CrewAI and BrightData",
        "rel": "brand-monitoring",
        "sourceRel": "brand-monitoring/README.md"
      },
      {
        "title": "Build Claude Code Harness using CrewAI",
        "rel": "build-code-harness",
        "sourceRel": "build-code-harness/README.md"
      },
      {
        "title": "Build a reasoning model like DeepSeek-R1",
        "rel": "Build-reasoning-model",
        "sourceRel": "Build-reasoning-model/README.md"
      },
      {
        "title": "RAG over audio files using AssemblyAI",
        "rel": "chat-with-audios",
        "sourceRel": "chat-with-audios/README.md"
      },
      {
        "title": "Chat with Code using Qwen3-Coder",
        "rel": "chat-with-code",
        "sourceRel": "chat-with-code/README.md"
      },
      {
        "title": "Code Generation Model Comparison using Opik",
        "rel": "code-model-comparison",
        "sourceRel": "code-model-comparison/README.md"
      },
      {
        "title": "MultiModal RAG with ColiVara and DeepSeek-Janus-Pro",
        "rel": "Colivara-deepseek-website-RAG",
        "sourceRel": "Colivara-deepseek-website-RAG/README.md"
      },
      {
        "title": "Content writing agentic-workflow",
        "rel": "content_planner_flow",
        "sourceRel": "content_planner_flow/README.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/awesome-openclaw-usecases",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-usecases",
    "title": "Awesome OpenClaw Usecases",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "hesamsheikh/awesome-openclaw-usecases",
    "site": null,
    "commit": "659895e58e2105c6db8fbef39f446c8a786a480c",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/hesamsheikh/awesome-openclaw-usecases",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome OpenClaw Use Cases",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AI Video Editing via Chat",
        "rel": "usecases",
        "sourceRel": "usecases/ai-video-editing.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/build-your-own-openclaw",
    "volume": "11-personal-agents",
    "local": "build-your-own-openclaw",
    "title": "Build Your Own OpenClaw",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "czl9707/build-your-own-openclaw",
    "site": null,
    "commit": "37ae5dd255a0451609e67ad6d6a51fa5de80523c",
    "entry": null,
    "featured": false,
    "sourceUrl": "https://github.com/czl9707/build-your-own-openclaw",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Step 00: Just a Chat Loop",
        "rel": "00-chat-loop",
        "sourceRel": "00-chat-loop/README.md"
      },
      {
        "title": "Step 01: Give your agent a tool.",
        "rel": "01-tools",
        "sourceRel": "01-tools/README.md"
      },
      {
        "title": "Step 02: Skills",
        "rel": "02-skills",
        "sourceRel": "02-skills/README.md"
      },
      {
        "title": "Step 03: Persistence",
        "rel": "03-persistence",
        "sourceRel": "03-persistence/README.md"
      },
      {
        "title": "Step 04: Slash Commands",
        "rel": "04-slash-commands",
        "sourceRel": "04-slash-commands/README.md"
      },
      {
        "title": "Step 05: Compaction",
        "rel": "05-compaction",
        "sourceRel": "05-compaction/README.md"
      },
      {
        "title": "Step 06: Web Tools",
        "rel": "06-web-tools",
        "sourceRel": "06-web-tools/README.md"
      },
      {
        "title": "Step 07: Event-Driven Architecture",
        "rel": "07-event-driven",
        "sourceRel": "07-event-driven/README.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/awesome-openclaw-skills",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-skills",
    "title": "Awesome OpenClaw Skills",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "VoltAgent/awesome-openclaw-skills",
    "site": null,
    "commit": "37ad08c1b8e243d5f501c6fcaf7ac0b507bd83a1",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/VoltAgent/awesome-openclaw-skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome OpenClaw Skills",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "AI & LLMs",
        "rel": "categories",
        "sourceRel": "categories/ai-and-llms.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/awesome-openclaw-tutorial",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-tutorial",
    "title": "Awesome OpenClaw Tutorial（中文）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "license": "GPL-3.0",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "xianyu110/awesome-openclaw-tutorial",
    "site": null,
    "commit": "0b0943dc41725e80d64f7f8d745d185e7752be4d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/xianyu110/awesome-openclaw-tutorial",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "🦞 Awesome OpenClaw Tutorial",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "附录A 命令速查表",
        "rel": "appendix",
        "sourceRel": "appendix/A-command-reference.md"
      },
      {
        "title": "OpenClaw API Key 配置完整指南",
        "rel": "docs",
        "sourceRel": "docs/api-key-config-guide.md"
      },
      {
        "title": "OpenClaw 示例文件",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "CSDN 附录发布布清单",
        "rel": "reports",
        "sourceRel": "reports/APPENDIX_PUBLISH_CHECKLIST.md"
      },
      {
        "title": "CSDN 自动发文工具",
        "rel": "scripts",
        "sourceRel": "scripts/README.md"
      },
      {
        "title": "成本计算器",
        "rel": "tutorials",
        "sourceRel": "tutorials/COST-CALCULATOR.md"
      },
      {
        "title": "OpenClaw v2026.3.12 版本更新解读",
        "rel": "updates",
        "sourceRel": "updates/2026-03-13-v2026.3.12.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/mine-context",
    "volume": "11-personal-agents",
    "local": "mine-context",
    "title": "MineContext（火山引擎个人上下文助手）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "volcengine/MineContext",
    "site": null,
    "commit": "171c7a9ea8091e326ddcf0f10718aa1b58c83c65",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/volcengine/MineContext",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "👋🏻 What is MineContext",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "MineContext（火山引擎个人上下文助手）",
        "rel": "config",
        "sourceRel": "config/quick_start_default.md"
      },
      {
        "title": "MineContext",
        "rel": "frontend",
        "sourceRel": "frontend/README.md"
      },
      {
        "title": "MineContext 架构概览",
        "rel": "src",
        "sourceRel": "src/architecture-overview-zh.md"
      }
    ]
  },
  {
    "id": "11-personal-agents/qclaw",
    "volume": "11-personal-agents",
    "local": "qclaw",
    "title": "Qclaw（秋芝2046）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 1,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "qiuzhi2046/Qclaw",
    "site": null,
    "commit": "c494768977f4e48b8eacbfae7ae390af11fc015f",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/qiuzhi2046/Qclaw",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Qclaw（秋芝2046）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Qclaw（秋芝2046）",
        "rel": "docs",
        "sourceRel": "docs/good-first-issues.md"
      }
    ]
  },
  {
    "id": "13-local-ai/edgeai-for-beginners",
    "volume": "13-local-ai",
    "local": "edgeai-for-beginners",
    "title": "EdgeAI for Beginners",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "microsoft/edgeai-for-beginners",
    "site": null,
    "commit": "e88f123a4bb5796594919db3a13257c429d1288c",
    "entry": "README.md",
    "featured": true,
    "sourceUrl": "https://github.com/microsoft/edgeai-for-beginners",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "EdgeAI for Beginners",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "Chapter 01: Transforming AI Deployment for the Edge",
        "rel": "Module01",
        "sourceRel": "Module01/README.md"
      },
      {
        "title": "Chapter 02: Small Language Model Foundations",
        "rel": "Module02",
        "sourceRel": "Module02/README.md"
      },
      {
        "title": "Chapter 03: Deploying Small Language Models (SLMs)",
        "rel": "Module03",
        "sourceRel": "Module03/README.md"
      },
      {
        "title": "Chapter 04 : Model Format Conversion and Quantization - Chapter Overview",
        "rel": "Module04",
        "sourceRel": "Module04/README.md"
      },
      {
        "title": "Chapter 05 : SLMOps - A Comprehensive Guide to Small Language Model Operations",
        "rel": "Module05",
        "sourceRel": "Module05/README.md"
      },
      {
        "title": "Chapter 06 : SLM Agentic Systems: A Comprehensive Overview",
        "rel": "Module06",
        "sourceRel": "Module06/README.md"
      },
      {
        "title": "Chapter 07 : EdgeAI Samples",
        "rel": "Module07",
        "sourceRel": "Module07/README.md"
      },
      {
        "title": "Module 08: Hands on With Microsoft Foundry Local - Complete Developer Toolkit",
        "rel": "Module08",
        "sourceRel": "Module08/README.md"
      },
      {
        "title": "EdgeAI for Beginners - Workshop",
        "rel": "Workshop",
        "sourceRel": "Workshop/README.md"
      },
      {
        "title": "🎙️ The AI Podcast Studio Workshop",
        "rel": "WorkshopForAgentic",
        "sourceRel": "WorkshopForAgentic/README.md"
      }
    ]
  }
]
export const sources: SourceEntry[] = [
  {
    "id": "01-foundations/ai-engineering-lab",
    "volume": "01-foundations",
    "local": "ai-engineering-lab",
    "title": "AI Engineering Lab（24 周自学课程）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 167,
    "repo": "zorost/AI-Engineering-Lab",
    "site": null,
    "commit": "cdd8dbdf559f72211a7c068e8877918441531e52",
    "entryUrl": "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "01-foundations/microsoft-generative-ai-for-beginners",
    "volume": "01-foundations",
    "local": "microsoft-generative-ai-for-beginners",
    "title": "Generative AI for Beginners（微软官方入门课）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 22,
    "md": 46,
    "repo": "microsoft/generative-ai-for-beginners",
    "site": null,
    "commit": "c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07",
    "entryUrl": "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "01-foundations/llms-from-scratch",
    "volume": "01-foundations",
    "local": "llms-from-scratch",
    "title": "LLMs from Scratch",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 14,
    "md": 75,
    "repo": "rasbt/LLMs-from-scratch",
    "site": null,
    "commit": "ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e",
    "entryUrl": "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "01-foundations/anthropic-platform-docs-en",
    "volume": "01-foundations",
    "local": "anthropic-platform-docs-en",
    "title": "Anthropic 平台文档（英文全量）",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 629,
    "repo": null,
    "site": "https://platform.claude.com/docs",
    "commit": null,
    "entryUrl": "https://platform.claude.com/docs",
    "publishable": false,
    "ported": false
  },
  {
    "id": "01-foundations/openai-api-docs-en",
    "volume": "01-foundations",
    "local": "openai-api-docs-en",
    "title": "OpenAI API 文档（英文）",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 227,
    "repo": null,
    "site": "https://developers.openai.com/api/docs",
    "commit": null,
    "entryUrl": "https://developers.openai.com/api/docs",
    "publishable": false,
    "ported": false
  },
  {
    "id": "01-foundations/openai-api-reference-en",
    "volume": "01-foundations",
    "local": "openai-api-reference-en",
    "title": "OpenAI API 参考（字段级）",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 212,
    "repo": null,
    "site": "https://developers.openai.com/api/reference",
    "commit": null,
    "entryUrl": "https://developers.openai.com/api/reference",
    "publishable": false,
    "ported": false
  },
  {
    "id": "01-foundations/awesome-chatgpt-zh",
    "volume": "01-foundations",
    "local": "awesome-chatgpt-zh",
    "title": "Awesome ChatGPT 中文指南",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 4,
    "md": 29,
    "repo": "EmbraceAGI/awesome-chatgpt-zh",
    "site": null,
    "commit": "f7c206f6b3e27dae3f4fa7fb1eee1852c72b1f68",
    "entryUrl": "https://github.com/EmbraceAGI/awesome-chatgpt-zh/blob/f7c206f6b3e27dae3f4fa7fb1eee1852c72b1f68/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "01-foundations/awesome-llm-resources",
    "volume": "01-foundations",
    "local": "awesome-llm-resources",
    "title": "Awesome LLM Resources（大模型资源清单）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 0,
    "md": 2,
    "repo": "WangRongsheng/awesome-LLM-resources",
    "site": null,
    "commit": "1fdf4ba2279979507c122db6403d2b7f97cc1e36",
    "entryUrl": "https://github.com/WangRongsheng/awesome-LLM-resources/blob/1fdf4ba2279979507c122db6403d2b7f97cc1e36/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "04-work/how-to-use-dify",
    "volume": "04-work",
    "local": "how-to-use-dify",
    "title": "Dify 中文系统教程（How-to-use-dify）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 4,
    "md": 43,
    "repo": "hijasonxu1/How-to-use-dify",
    "site": null,
    "commit": "8d32c2067bfeab108a9646fe0371319f6c1d5134",
    "entryUrl": "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/qwenwork-guide",
    "volume": "04-work",
    "local": "qwenwork-guide",
    "title": "千问办公绿皮书（QwenWorkGuide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 2,
    "md": 413,
    "repo": "wangxiaoshuai1998/QwenWorkGuide",
    "site": null,
    "commit": "002f698a68b69d3635acf6be0d6e27db69069071",
    "entryUrl": "https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/agent-guide-office",
    "volume": "04-work",
    "local": "agent-guide-office",
    "title": "Agent 办公实战指南（社区）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 1,
    "md": 62,
    "repo": "tangshiyegit/agent-guide",
    "site": null,
    "commit": "ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33",
    "entryUrl": "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/workbuddy-guide",
    "volume": "04-work",
    "local": "workbuddy-guide",
    "title": "WorkBuddyGuide（蓝皮书 + 社区案例集）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 1,
    "md": 56,
    "repo": "AlephAITech/WorkBuddyGuide",
    "site": null,
    "commit": "814ec835e9dae4a89da368fe208425ff50e121fe",
    "entryUrl": "https://github.com/AlephAITech/WorkBuddyGuide/blob/814ec835e9dae4a89da368fe208425ff50e121fe/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/doubaowork-bluebook",
    "volume": "04-work",
    "local": "doubaowork-bluebook",
    "title": "豆包工作蓝皮书（DoubaoWork Guide）",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 0,
    "md": 3,
    "repo": "AlephAITech/DoubaoWorkGuide",
    "site": null,
    "commit": "ad7338e8fc889ec082cdfb3fa41fb659520c7174",
    "entryUrl": "https://github.com/AlephAITech/DoubaoWorkGuide/blob/ad7338e8fc889ec082cdfb3fa41fb659520c7174/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/zhijian-ai-bluebook-workbuddy-harness",
    "volume": "04-work",
    "local": "zhijian-ai-bluebook-workbuddy-harness",
    "title": "智见 AI 蓝皮书：WorkBuddy Harness",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 0,
    "md": 3,
    "repo": "zjp1997720/zhijian-ai-bluebook-workbuddy-harness",
    "site": null,
    "commit": "6ac68cd42a01add16568d1ab9cf2399822467fad",
    "entryUrl": "https://github.com/zjp1997720/zhijian-ai-bluebook-workbuddy-harness/blob/6ac68cd42a01add16568d1ab9cf2399822467fad/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/coze-studio",
    "volume": "04-work",
    "local": "coze-studio",
    "title": "Coze Studio 源码研读",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 5,
    "md": 346,
    "repo": "coze-dev/coze-studio",
    "site": null,
    "commit": "fefb05ff27be1da939612fbf9faf5db62583b8ae",
    "entryUrl": "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/coze-loop",
    "volume": "04-work",
    "local": "coze-loop",
    "title": "Coze Loop 源码研读",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 3,
    "md": 76,
    "repo": "coze-dev/coze-loop",
    "site": null,
    "commit": "5f1e4c234fc110c1bf674e882a6fd02109e1e1e6",
    "entryUrl": "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/qwenwork-official-help",
    "volume": "04-work",
    "local": "qwenwork-official-help",
    "title": "千问办公官方帮助中心（阿里云）",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 1,
    "md": 235,
    "repo": null,
    "site": "https://help.aliyun.com/zh/qwenwork/",
    "commit": null,
    "entryUrl": "https://help.aliyun.com/zh/qwenwork/",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/qwenwork-official-help-cn",
    "volume": "04-work",
    "local": "qwenwork-official-help-cn",
    "title": "qwenwork-official-help-cn",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 1,
    "md": 108,
    "repo": null,
    "site": "https://qwenwork.cn/docs",
    "commit": null,
    "entryUrl": "https://qwenwork.cn/docs",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/coze-official-docs",
    "volume": "04-work",
    "local": "coze-official-docs",
    "title": "扣子 Coze 官方文档",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 1,
    "md": 101,
    "repo": null,
    "site": "https://docs.coze.cn/",
    "commit": null,
    "entryUrl": "https://docs.coze.cn/",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/dify-official-docs",
    "volume": "04-work",
    "local": "dify-official-docs",
    "title": "Dify 官方文档",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 0,
    "md": 1,
    "repo": null,
    "site": "https://docs.dify.ai/",
    "commit": null,
    "entryUrl": "https://docs.dify.ai/",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/manus-official-docs",
    "volume": "04-work",
    "local": "manus-official-docs",
    "title": "Manus 官方文档",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 0,
    "md": 1,
    "repo": null,
    "site": "https://manus.im/docs/introduction/welcome",
    "commit": null,
    "entryUrl": "https://manus.im/docs/introduction/welcome",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/workbuddy-official-docs",
    "volume": "04-work",
    "local": "workbuddy-official-docs",
    "title": "WorkBuddy 官方文档（腾讯）",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 0,
    "md": 1,
    "repo": null,
    "site": "https://copilot.tencent.com/",
    "commit": null,
    "entryUrl": "https://copilot.tencent.com/",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/multi-platform-skills-archive",
    "volume": "04-work",
    "local": "multi-platform-skills-archive",
    "title": "AI Skills And Experts Archive",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 0,
    "md": 5,
    "repo": "ahang1598/doubao-workbuddy-qwenwork-skills",
    "site": null,
    "commit": "1cd75f0c4adaf7a12d4f6ba276a24b9e0d2367ca",
    "entryUrl": "https://github.com/ahang1598/doubao-workbuddy-qwenwork-skills/blob/1cd75f0c4adaf7a12d4f6ba276a24b9e0d2367ca/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/awesome-workbuddy",
    "volume": "04-work",
    "local": "awesome-workbuddy",
    "title": "办公 Agent 生态清单（awesome-workbuddy）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 3,
    "md": 98,
    "repo": "staruhub/awesome-workbuddy",
    "site": null,
    "commit": "e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3",
    "entryUrl": "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/workbuddy-bench-official",
    "volume": "04-work",
    "local": "workbuddy-bench-official",
    "title": "WorkBuddy Bench（腾讯官方评测集）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "限非商用",
    "lang": "英文",
    "lessons": 3,
    "md": 21,
    "repo": "Tencent/workbuddy-bench",
    "site": null,
    "commit": "625b2233093ae4f23e76be28c1f341d41cc70373",
    "entryUrl": "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "04-work/qwenwork-xiaolvshu",
    "volume": "04-work",
    "local": "qwenwork-xiaolvshu",
    "title": "qwenwork-xiaolvshu",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 1,
    "md": 134,
    "repo": null,
    "site": "https://qwenwork.org",
    "commit": null,
    "entryUrl": "https://qwenwork.org",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/office-agents-hewliyang",
    "volume": "04-work",
    "local": "office-agents-hewliyang",
    "title": "Office Agents",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 15,
    "repo": "hewliyang/office-agents",
    "site": null,
    "commit": "95fb654491a9d394dc85ea2b8c93dee2ca4546b9",
    "entryUrl": "https://github.com/hewliyang/office-agents/blob/95fb654491a9d394dc85ea2b8c93dee2ca4546b9/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "04-work/qwenwork-learn-station",
    "volume": "04-work",
    "local": "qwenwork-learn-station",
    "title": "千问办公学习站「职场AI三千问」",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 5,
    "md": 1,
    "repo": null,
    "site": "https://learn.qwenwork.host/",
    "commit": null,
    "entryUrl": "https://learn.qwenwork.host/",
    "publishable": false,
    "ported": false
  },
  {
    "id": "07-coding/fufan-vibe-coding-course",
    "volume": "07-coding",
    "local": "fufan-vibe-coding-course",
    "title": "Vibe Coding：AI 编程实战课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 9,
    "md": 1002,
    "repo": "fufankeji/FuFan-VibeCodingCourse",
    "site": null,
    "commit": "5336ede159a7ac2ce0ee136324fe5bffd56970ca",
    "entryUrl": "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/fastcampus-ai-agent-vibecoding",
    "volume": "07-coding",
    "local": "fastcampus-ai-agent-vibecoding",
    "title": "FastCampus AI Agent 바이브코딩 강의",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 6,
    "md": 434,
    "repo": "Koomook/fastcampus-ai-agent-vibecoding",
    "site": null,
    "commit": "b24208b48c3945769327dbcafc2d632189369520",
    "entryUrl": "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "07-coding/vibe-coding-101-for-engineers",
    "volume": "07-coding",
    "local": "vibe-coding-101-for-engineers",
    "title": "Vibe Coding 101 for Software Engineers",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 51,
    "repo": "goker/vibe-coding-101-for-software-engineers",
    "site": null,
    "commit": "60d5a7fc465fc10be3b4478486a9535f1045f607",
    "entryUrl": "https://github.com/goker/vibe-coding-101-for-software-engineers/blob/60d5a7fc465fc10be3b4478486a9535f1045f607/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "07-coding/cs146s-cn",
    "volume": "07-coding",
    "local": "cs146s-cn",
    "title": "动手学 CS146S 中文版",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 2,
    "md": 38,
    "repo": "ShouZhengAI/CS146S_CN",
    "site": null,
    "commit": "0d65f36f6673147d6c298670da4f9b4bd7f991fa",
    "entryUrl": "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/lovable-for-beginners",
    "volume": "07-coding",
    "local": "lovable-for-beginners",
    "title": "Lovable for Beginners",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 0,
    "md": 20,
    "repo": "cporter202/lovable-for-beginners",
    "site": null,
    "commit": "c4bfa59c80fa37c99dfa3810541537ab63840512",
    "entryUrl": "https://github.com/cporter202/lovable-for-beginners/blob/c4bfa59c80fa37c99dfa3810541537ab63840512/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "07-coding/easy-vibe",
    "volume": "07-coding",
    "local": "easy-vibe",
    "title": "Easy-Vibe（Datawhale：从零做出真实产品）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "限非商用",
    "lang": "中英混排",
    "lessons": 4,
    "md": 1892,
    "repo": "datawhalechina/easy-vibe",
    "site": null,
    "commit": "130e9b75b28b524e8cc74e615fd9733a4e2b330d",
    "entryUrl": "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibe-coding-cn",
    "volume": "07-coding",
    "local": "vibe-coding-cn",
    "title": "Vibe Coding CN",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 2,
    "md": 986,
    "repo": "2025Emma/vibe-coding-cn",
    "site": null,
    "commit": "9b42dd10ddf3fff58f8c7a4d347175db107d7bf9",
    "entryUrl": "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibe-vibe",
    "volume": "07-coding",
    "local": "vibe-vibe",
    "title": "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "限非商用",
    "lang": "中文",
    "lessons": 2,
    "md": 636,
    "repo": "datawhalechina/vibe-vibe",
    "site": null,
    "commit": "f2e121d9b6c689c0e682921df60d73e279c5e316",
    "entryUrl": "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibe-coding-prompt-template",
    "volume": "07-coding",
    "local": "vibe-coding-prompt-template",
    "title": "Vibe Coding 提示词模板",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 161,
    "repo": "KhazP/vibe-coding-prompt-template",
    "site": null,
    "commit": "db481763c24e2b66b919f9d40aa42b16409a62d7",
    "entryUrl": "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/ai-coding-guide-stormzhang",
    "volume": "07-coding",
    "local": "ai-coding-guide-stormzhang",
    "title": "面向小白的 AI 编程 CLI 教程",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 3,
    "md": 119,
    "repo": "stormzhang/ai-coding-guide",
    "site": null,
    "commit": "d187dbdb83fa1be051a850074eb518e30e2eb47c",
    "entryUrl": "https://github.com/stormzhang/ai-coding-guide/blob/d187dbdb83fa1be051a850074eb518e30e2eb47c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/ai-coding-guide-zh",
    "volume": "07-coding",
    "local": "ai-coding-guide-zh",
    "title": "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 1,
    "md": 53,
    "repo": "KimYx0207/AI-Coding-Guide-Zh",
    "site": null,
    "commit": "7a7c21b8e7dc976e8ade33b79ee000a172e63daf",
    "entryUrl": "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibe-coding-guide",
    "volume": "07-coding",
    "local": "vibe-coding-guide",
    "title": "Vibe Coding 完全指南",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 2,
    "md": 14,
    "repo": "zhiyue/vibe-coding-guide",
    "site": null,
    "commit": "ee8434ce526f629e0ca4ce00f6a66be6372327ac",
    "entryUrl": "https://github.com/zhiyue/vibe-coding-guide/blob/ee8434ce526f629e0ca4ce00f6a66be6372327ac/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/liyupi-ai-guide",
    "volume": "07-coding",
    "local": "liyupi-ai-guide",
    "title": "鱼皮 AI 导航（ai-guide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "限非商用",
    "lang": "中文",
    "lessons": 5,
    "md": 693,
    "repo": "liyupi/ai-guide",
    "site": null,
    "commit": "539082c1df5743bb34d72a17857a02735b38c866",
    "entryUrl": "https://github.com/liyupi/ai-guide/blob/539082c1df5743bb34d72a17857a02735b38c866/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/ai-engineering-from-scratch",
    "volume": "07-coding",
    "local": "ai-engineering-from-scratch",
    "title": "AI Engineering from Scratch（英文原版）",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 11,
    "md": 1179,
    "repo": "rohitg00/ai-engineering-from-scratch",
    "site": null,
    "commit": "d18b8fe5a913c46011a3b06cb6ebd6a924414fd3",
    "entryUrl": "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/ai-engineering-from-scratch-zh",
    "volume": "07-coding",
    "local": "ai-engineering-from-scratch-zh",
    "title": "AI 工程从零到一（中文）",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 9,
    "md": 1173,
    "repo": "fancyboi999/ai-engineering-from-scratch-zh",
    "site": null,
    "commit": "109181ce68128c1bf27ec20867177007a8bace89",
    "entryUrl": "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibefast-docs",
    "volume": "07-coding",
    "local": "vibefast-docs",
    "title": "VibeFast 文档",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "限非商用",
    "lang": "英文",
    "lessons": 5,
    "md": 146,
    "repo": "vibefast-app/vibefast-docs",
    "site": null,
    "commit": "2a34bc50576f3f74fda6196ca9bebf851187bcf9",
    "entryUrl": "https://github.com/vibefast-app/vibefast-docs/blob/2a34bc50576f3f74fda6196ca9bebf851187bcf9/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/vibe-security-skill",
    "volume": "07-coding",
    "local": "vibe-security-skill",
    "title": "Vibe Security（AI 编码安全技能）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 12,
    "repo": "raroque/vibe-security-skill",
    "site": null,
    "commit": "850938f20f6915e7c3688d85c0a838f7909c87bb",
    "entryUrl": "https://github.com/raroque/vibe-security-skill/blob/850938f20f6915e7c3688d85c0a838f7909c87bb/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/awesome-vibe-coding",
    "volume": "07-coding",
    "local": "awesome-vibe-coding",
    "title": "Vibe Coding 参考精选",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 0,
    "md": 8,
    "repo": "filipecalegario/awesome-vibe-coding",
    "site": null,
    "commit": "59d50281e40651d574ea0ead592a08019d74730d",
    "entryUrl": "https://github.com/filipecalegario/awesome-vibe-coding/blob/59d50281e40651d574ea0ead592a08019d74730d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/spec-kit",
    "volume": "07-coding",
    "local": "spec-kit",
    "title": "Spec Kit（GitHub 官方规格驱动开发工具包）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 10,
    "md": 140,
    "repo": "github/spec-kit",
    "site": null,
    "commit": "c173bf19a6654e3b05386ec3599349a55282b897",
    "entryUrl": "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/cloudflare-vibesdk",
    "volume": "07-coding",
    "local": "cloudflare-vibesdk",
    "title": "Cloudflare VibeSDK",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 10,
    "md": 18,
    "repo": "cloudflare/vibesdk",
    "site": null,
    "commit": "9da158d82c597a0e8f4bf033cdccd1053fb6fb15",
    "entryUrl": "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "07-coding/ai-api-integration",
    "volume": "07-coding",
    "local": "ai-api-integration",
    "title": "AI API 接入实战（OpenAI 兼容协议）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 3,
    "md": 21,
    "repo": "CCCpan/ai-api-integration",
    "site": null,
    "commit": "95cd8c6f48e58dfe96703a37b6c8fccb583bea74",
    "entryUrl": "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/huggingface-agents-course",
    "volume": "08-agents",
    "local": "huggingface-agents-course",
    "title": "Hugging Face Agents Course（智能体课程）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 421,
    "repo": "huggingface/agents-course",
    "site": null,
    "commit": "b3946b1d09d29c65736e219d48a8a736a2c52154",
    "entryUrl": "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/microsoft-ai-agents-for-beginners",
    "volume": "08-agents",
    "local": "microsoft-ai-agents-for-beginners",
    "title": "AI Agents for Beginners（微软官方入门课）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 19,
    "md": 297,
    "repo": "microsoft/ai-agents-for-beginners",
    "site": null,
    "commit": "25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595",
    "entryUrl": "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/microsoft-ai-engineering-coach",
    "volume": "08-agents",
    "local": "microsoft-ai-engineering-coach",
    "title": "AI Engineering Coach（微软）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 101,
    "repo": "microsoft/AI-Engineering-Coach",
    "site": null,
    "commit": "18b1a3d16b586c171426c6a407cc5c2dc073556e",
    "entryUrl": "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/ed-donner-agents",
    "volume": "08-agents",
    "local": "ed-donner-agents",
    "title": "Ed Donner：AI Agents 实战课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 2,
    "md": 77,
    "repo": "ed-donner/agents",
    "site": null,
    "commit": "8ceaf66c24643627c1e4806851736bdd444bdd4b",
    "entryUrl": "https://github.com/ed-donner/agents",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/ed-donner-production",
    "volume": "08-agents",
    "local": "ed-donner-production",
    "title": "AI in Production",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 7,
    "md": 46,
    "repo": "ed-donner/production",
    "site": null,
    "commit": "daeb3dae34be3287842ea7faa3e6f4cba467028b",
    "entryUrl": "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/datawhale-agentic-ai",
    "volume": "08-agents",
    "local": "datawhale-agentic-ai",
    "title": "Datawhale Agentic AI 教程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 5,
    "md": 32,
    "repo": "datawhalechina/agentic-ai",
    "site": null,
    "commit": "a93ab1d8546cca8b508a72f0f2c385777d5f1403",
    "entryUrl": "https://github.com/datawhalechina/agentic-ai/blob/a93ab1d8546cca8b508a72f0f2c385777d5f1403/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/strands-agents-course",
    "volume": "08-agents",
    "local": "strands-agents-course",
    "title": "Strands Agents 课程（AWS）",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 3,
    "md": 14,
    "repo": "aws-samples/sample-getting-started-with-strands-agents-course",
    "site": null,
    "commit": "6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d",
    "entryUrl": "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course/blob/6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/langchain4j-for-beginners",
    "volume": "08-agents",
    "local": "langchain4j-for-beginners",
    "title": "LangChain4j for Beginners",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 13,
    "repo": "microsoft/LangChain4j-for-Beginners",
    "site": null,
    "commit": "9aed2ec27717775def0da2ff2d7950baa8995a64",
    "entryUrl": "https://github.com/microsoft/LangChain4j-for-Beginners/blob/9aed2ec27717775def0da2ff2d7950baa8995a64/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/production-agentic-rag-course",
    "volume": "08-agents",
    "local": "production-agentic-rag-course",
    "title": "生产级 Agentic RAG 课程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 9,
    "repo": "jamwithai/production-agentic-rag-course",
    "site": null,
    "commit": "424a0eb99edf841994f2a9a053912b489d2a94ff",
    "entryUrl": "https://github.com/jamwithai/production-agentic-rag-course/blob/424a0eb99edf841994f2a9a053912b489d2a94ff/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/anthropics-courses",
    "volume": "08-agents",
    "local": "anthropics-courses",
    "title": "Anthropic 官方课程",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "限非商用",
    "lang": "英文",
    "lessons": 2,
    "md": 7,
    "repo": "anthropics/courses",
    "site": null,
    "commit": "f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77",
    "entryUrl": "https://github.com/anthropics/courses/blob/f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/second-brain-ai-assistant-course",
    "volume": "08-agents",
    "local": "second-brain-ai-assistant-course",
    "title": "Second Brain：AI 助理构建课",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 2,
    "md": 6,
    "repo": "decodingai-magazine/second-brain-ai-assistant-course",
    "site": null,
    "commit": "17ccef571db3e4b563826dab83ecc9298a54ede1",
    "entryUrl": "https://github.com/decodingai-magazine/second-brain-ai-assistant-course/blob/17ccef571db3e4b563826dab83ecc9298a54ede1/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/zero2agent",
    "volume": "08-agents",
    "local": "zero2agent",
    "title": "Zero2Agent：从零实现 Agent",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 19,
    "md": 299,
    "repo": "ranxi2001/zero2Agent",
    "site": null,
    "commit": "46e9f7c28f84f54b2f6e45681d14989f01e18291",
    "entryUrl": "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/ai-agents-from-zero",
    "volume": "08-agents",
    "local": "ai-agents-from-zero",
    "title": "从零构建 AI Agent（didilili）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 7,
    "md": 95,
    "repo": "didilili/ai-agents-from-zero",
    "site": null,
    "commit": "ea7f28ffe0b2c2650e3936f3bb591560225702b3",
    "entryUrl": "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/hello-agents",
    "volume": "08-agents",
    "local": "hello-agents",
    "title": "Hello Agents（Datawhale 智能体教程）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "限非商用",
    "lang": "中文",
    "lessons": 2,
    "md": 68,
    "repo": "datawhalechina/hello-agents",
    "site": null,
    "commit": "4f7682ceafe573d07cd8a7d0b89908500e83227d",
    "entryUrl": "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/baby-agent",
    "volume": "08-agents",
    "local": "baby-agent",
    "title": "BabyAgent - 后端工程师的 AI Agent 教学项目 (Go 语言版)",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 13,
    "md": 15,
    "repo": "baby-llm/baby-agent",
    "site": null,
    "commit": "55712911ad0c3d1554c94198370b08d9076fac1c",
    "entryUrl": "https://github.com/baby-llm/baby-agent/blob/55712911ad0c3d1554c94198370b08d9076fac1c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/agent-systems-handbook",
    "volume": "08-agents",
    "local": "agent-systems-handbook",
    "title": "Agent Systems Handbook（智能体系统手册）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "限非商用",
    "lang": "英文",
    "lessons": 14,
    "md": 240,
    "repo": "Prompthon-IO/agent-systems-handbook",
    "site": null,
    "commit": "5b71cfa598701a34834f33b42be5f8a422138a3c",
    "entryUrl": "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/agentic-engineering-handbook",
    "volume": "08-agents",
    "local": "agentic-engineering-handbook",
    "title": "Agentic Engineering Handbook",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 11,
    "repo": "keyuchen21/agentic-engineering-handbook",
    "site": null,
    "commit": "002d5456ac717fb6c4444005c9bb2ceff416d8c7",
    "entryUrl": "https://github.com/keyuchen21/agentic-engineering-handbook/blob/002d5456ac717fb6c4444005c9bb2ceff416d8c7/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/deepagents-in-action",
    "volume": "08-agents",
    "local": "deepagents-in-action",
    "title": "《Deep Agents 实战》",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "licenseLabel": "限非商用",
    "lang": "中文",
    "lessons": 1,
    "md": 21,
    "repo": "datawhalechina/deepagents-in-action",
    "site": null,
    "commit": "4097ff944f9ffa1bdfe2dd04f751f4416b058860",
    "entryUrl": "https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/openai-cookbook-docs",
    "volume": "08-agents",
    "local": "openai-cookbook-docs",
    "title": "openai-cookbook-docs",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 51,
    "repo": null,
    "site": "https://developers.openai.com/cookbook",
    "commit": null,
    "entryUrl": "https://developers.openai.com/cookbook",
    "publishable": false,
    "ported": false
  },
  {
    "id": "08-agents/anthropic-cookbook",
    "volume": "08-agents",
    "local": "anthropic-cookbook",
    "title": "Claude Cookbooks",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 20,
    "md": 98,
    "repo": "anthropics/anthropic-cookbook",
    "site": null,
    "commit": "a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5",
    "entryUrl": "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/openai-cookbook",
    "volume": "08-agents",
    "local": "openai-cookbook",
    "title": "OpenAI Cookbook",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 2,
    "md": 53,
    "repo": "openai/openai-cookbook",
    "site": null,
    "commit": "a0709e05a54d8dd1c4d9be3fc0a41526c3496c39",
    "entryUrl": "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/gemini-cookbook",
    "volume": "08-agents",
    "local": "gemini-cookbook",
    "title": "Gemini API Cookbook",
    "kind": "官方资料集",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 27,
    "repo": "google-gemini/cookbook",
    "site": null,
    "commit": "a1b990c859a34823c982f70edaff35b830511c64",
    "entryUrl": "https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/awesome-llm-apps",
    "volume": "08-agents",
    "local": "awesome-llm-apps",
    "title": "Awesome LLM Apps",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 118,
    "repo": "Shubhamsaboo/awesome-llm-apps",
    "site": null,
    "commit": "9848ec842c5f559ad42654288cc6a38db6b175fb",
    "entryUrl": "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/awesome-ai-agent-papers",
    "volume": "08-agents",
    "local": "awesome-ai-agent-papers",
    "title": "Awesome AI Agent Papers（智能体论文清单）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 0,
    "md": 2,
    "repo": "VoltAgent/awesome-ai-agent-papers",
    "site": null,
    "commit": "4c0c1281f01c6e66a68c0db06b9cfd79277dcfa3",
    "entryUrl": "https://github.com/VoltAgent/awesome-ai-agent-papers/blob/4c0c1281f01c6e66a68c0db06b9cfd79277dcfa3/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "08-agents/openai-agents-python",
    "volume": "08-agents",
    "local": "openai-agents-python",
    "title": "OpenAI Agents SDK（Python）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 518,
    "repo": "openai/openai-agents-python",
    "site": null,
    "commit": "83c737fd0b8d9a53bd39fa2a0856070417bb0bd3",
    "entryUrl": "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "08-agents/pocket-manus",
    "volume": "08-agents",
    "local": "pocket-manus",
    "title": "Open Manus with PocketFlow Integration",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 39,
    "repo": "Osly-AI/PocketManus",
    "site": null,
    "commit": "8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd",
    "entryUrl": "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/learn-harness-engineering",
    "volume": "09-harness",
    "local": "learn-harness-engineering",
    "title": "Learn Harness Engineering",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 1729,
    "repo": "walkinglabs/learn-harness-engineering",
    "site": null,
    "commit": "77e7a3e21469dcbece2558086c8d91657abeaa40",
    "entryUrl": "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/learn-claude-code",
    "volume": "09-harness",
    "local": "learn-claude-code",
    "title": "Learn Claude Code（nano harness 17 步）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 17,
    "md": 97,
    "repo": "shareAI-lab/learn-claude-code",
    "site": null,
    "commit": "0dcafa2ae053a1ddd6a72f265431104b08a5aa13",
    "entryUrl": "https://github.com/shareAI-lab/learn-claude-code/blob/0dcafa2ae053a1ddd6a72f265431104b08a5aa13/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/learn-workbuddy",
    "volume": "09-harness",
    "local": "learn-workbuddy",
    "title": "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）",
    "kind": "课时教程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 24,
    "md": 63,
    "repo": "adongwanai/learn-workbuddy",
    "site": null,
    "commit": "d8c2a32614555196e405f20c67e23ed84f2f2239",
    "entryUrl": "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-ultimate-guide",
    "volume": "09-harness",
    "local": "claude-code-ultimate-guide",
    "title": "Claude Code Ultimate Guide",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 9,
    "md": 666,
    "repo": "FlorianBruniaux/claude-code-ultimate-guide",
    "site": null,
    "commit": "af05b84fb6e32432dae2114ee2a72c44ef3d29b1",
    "entryUrl": "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/deepseek-harness",
    "volume": "09-harness",
    "local": "deepseek-harness",
    "title": "DeepSeek Harness",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 3,
    "md": 634,
    "repo": "deepseek-ai/deepseek-harness",
    "site": null,
    "commit": "c291e7961a515f6d7af9304e7fd1d257929aef26",
    "entryUrl": "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-howto",
    "volume": "09-harness",
    "local": "claude-howto",
    "title": "Claude How-To",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 10,
    "md": 482,
    "repo": "luongnv89/claude-howto",
    "site": null,
    "commit": "97bfb0685e03112ad39845889061d02cef6e534c",
    "entryUrl": "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/better-harness",
    "volume": "09-harness",
    "local": "better-harness",
    "title": "Better Harness（QoderAI）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 424,
    "repo": "QoderAI/better-harness",
    "site": null,
    "commit": "e1538c15a98856b3349f365d951f4fa0bcc33f24",
    "entryUrl": "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-guide-zebbern",
    "volume": "09-harness",
    "local": "claude-code-guide-zebbern",
    "title": "Claude Code Guide（zebbern）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 2,
    "md": 241,
    "repo": "zebbern/claude-code-guide",
    "site": null,
    "commit": "64c890fe74c3ccfad673dc9c71dc85b8dd2f4817",
    "entryUrl": "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/strands-harness-sdk",
    "volume": "09-harness",
    "local": "strands-harness-sdk",
    "title": "Strands Harness SDK",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 206,
    "repo": "strands-agents/harness-sdk",
    "site": null,
    "commit": "7bda6c70e71cd07279470268c3d3b3f4b36adf53",
    "entryUrl": "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-harness-chachamaru",
    "volume": "09-harness",
    "local": "claude-code-harness-chachamaru",
    "title": "Claude Code Harness",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 5,
    "md": 134,
    "repo": "Chachamaru127/claude-code-harness",
    "site": null,
    "commit": "2b2b74805321089bd9b660a1064fa97556299703",
    "entryUrl": "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/harness-engineering-from-cc-to-ai-coding",
    "volume": "09-harness",
    "local": "harness-engineering-from-cc-to-ai-coding",
    "title": "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 6,
    "md": 126,
    "repo": "ZhangHanDong/harness-engineering-from-cc-to-ai-coding",
    "site": null,
    "commit": "e40e0feec02b90e308ccbfc7a8911d64118ccca0",
    "entryUrl": "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-best-practice",
    "volume": "09-harness",
    "local": "claude-code-best-practice",
    "title": "Claude Code Best Practice",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 12,
    "md": 122,
    "repo": "shanraisshan/claude-code-best-practice",
    "site": null,
    "commit": "2d6ea151c0d7189c3eaf364809c5574bd210e545",
    "entryUrl": "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/deusyu-harness-engineering",
    "volume": "09-harness",
    "local": "deusyu-harness-engineering",
    "title": "Harness Engineering 学习指南",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 10,
    "md": 85,
    "repo": "deusyu/harness-engineering",
    "site": null,
    "commit": "858c0da6570aad32947c09c7e83fb04f46d22ebe",
    "entryUrl": "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/codex-guide-freestylefly",
    "volume": "09-harness",
    "local": "codex-guide-freestylefly",
    "title": "Codex 实践指南（CodexGuide）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 1,
    "md": 69,
    "repo": "freestylefly/CodexGuide",
    "site": null,
    "commit": "f93c14ba1239178f63210c7e2e6e6965ebf59e79",
    "entryUrl": "https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/harness-engineering-guide-nexu",
    "volume": "09-harness",
    "local": "harness-engineering-guide-nexu",
    "title": "Harness Engineering 指南（nexu.io）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 66,
    "repo": "nexu-io/harness-engineering-guide",
    "site": null,
    "commit": "86fec9bea430cecb29ff10afaae36b96496a8f8e",
    "entryUrl": "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/harness-engineering-anthology",
    "volume": "09-harness",
    "local": "harness-engineering-anthology",
    "title": "Harness Engineering 文集",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 63,
    "repo": "lopopolo/harness-engineering",
    "site": null,
    "commit": "226c8d35fb6ea3ed55467753dba6dea2b5fd5778",
    "entryUrl": "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/repository-harness",
    "volume": "09-harness",
    "local": "repository-harness",
    "title": "Repository Harness（仓库级 Agent 工作区）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 54,
    "repo": "hoangnb24/repository-harness",
    "site": null,
    "commit": "e765792b635b4d5e3e5fc0578f82f9ca5dea2681",
    "entryUrl": "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-everything",
    "volume": "09-harness",
    "local": "claude-code-everything",
    "title": "Claude Code Everything You Need to Know",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 3,
    "md": 50,
    "repo": "wesammustafa/Claude-Code-Everything-You-Need-to-Know",
    "site": null,
    "commit": "d9e93740193aeae2cd661c7ddf6f0c8f8989860b",
    "entryUrl": "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know/blob/d9e93740193aeae2cd661c7ddf6f0c8f8989860b/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-book-yuyu",
    "volume": "09-harness",
    "local": "claude-code-book-yuyu",
    "title": "御舆：解码 Agent Harness",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 6,
    "md": 42,
    "repo": "lintsinghua/claude-code-book",
    "site": null,
    "commit": "1e2068c05ba80b85d86caae7b4c32e7478e66d09",
    "entryUrl": "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/agentic-harness-engineering",
    "volume": "09-harness",
    "local": "agentic-harness-engineering",
    "title": "Agentic Harness Engineering（论文与实现）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 5,
    "md": 41,
    "repo": "china-qijizhifeng/agentic-harness-engineering",
    "site": null,
    "commit": "8b2a55d97590363fe50c3cc6b5e833b020a4bb4c",
    "entryUrl": "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/harness-books",
    "volume": "09-harness",
    "local": "harness-books",
    "title": "Harness Books",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 2,
    "md": 37,
    "repo": "wquguru/harness-books",
    "site": null,
    "commit": "fbf2b43e352443eea00eb9e4a32709a9f2c11a76",
    "entryUrl": "https://github.com/wquguru/harness-books/blob/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/meta-skill-harness-revfactory",
    "volume": "09-harness",
    "local": "meta-skill-harness-revfactory",
    "title": "Harness —— Claude Code 团队架构工厂",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 3,
    "md": 21,
    "repo": "revfactory/harness",
    "site": null,
    "commit": "cceac68ea1d0ad198ef4b7b906cd238375836387",
    "entryUrl": "https://github.com/revfactory/harness/blob/cceac68ea1d0ad198ef4b7b906cd238375836387/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/codex-cli-best-practice",
    "volume": "09-harness",
    "local": "codex-cli-best-practice",
    "title": "Codex CLI Best Practice",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 16,
    "repo": "shanraisshan/codex-cli-best-practice",
    "site": null,
    "commit": "b79f473a188632867354fc793894dfd368a18e48",
    "entryUrl": "https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/awesome-harness-engineering-aiboost",
    "volume": "09-harness",
    "local": "awesome-harness-engineering-aiboost",
    "title": "Awesome Harness Engineering（ai-boost）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 8,
    "repo": "ai-boost/awesome-harness-engineering",
    "site": null,
    "commit": "6015473ad287575fc06d0ddd7835306250a66b9f",
    "entryUrl": "https://github.com/ai-boost/awesome-harness-engineering/blob/6015473ad287575fc06d0ddd7835306250a66b9f/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/awesome-harness-engineering-walkinglabs",
    "volume": "09-harness",
    "local": "awesome-harness-engineering-walkinglabs",
    "title": "Awesome Harness Engineering（walkinglabs）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 4,
    "repo": "walkinglabs/awesome-harness-engineering",
    "site": null,
    "commit": "cff9b006ef64c624a62cbb1ee36b0c4b2b3a67ad",
    "entryUrl": "https://github.com/walkinglabs/awesome-harness-engineering/blob/cff9b006ef64c624a62cbb1ee36b0c4b2b3a67ad/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/codex-orange-book",
    "volume": "09-harness",
    "local": "codex-orange-book",
    "title": "Codex 橙皮书",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 2,
    "md": 3,
    "repo": "bozhouDev/codex-orange-book",
    "site": null,
    "commit": "6c72add96c319507da65f963abfd9618d0c9ea0f",
    "entryUrl": "https://github.com/bozhouDev/codex-orange-book/blob/6c72add96c319507da65f963abfd9618d0c9ea0f/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/origin-harness-engineering-articles",
    "volume": "09-harness",
    "local": "origin-harness-engineering-articles",
    "title": "Harness Engineering 原始文献（Fowler / Mitchell / arXiv）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 0,
    "md": 0,
    "repo": null,
    "site": "https://martinfowler.com/articles/harness-engineering.html",
    "commit": null,
    "entryUrl": "https://martinfowler.com/articles/harness-engineering.html",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/how-claude-code-works",
    "volume": "09-harness",
    "local": "how-claude-code-works",
    "title": "How Claude Code Works",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 2,
    "md": 54,
    "repo": "Windy3f3f3f3f/how-claude-code-works",
    "site": null,
    "commit": "f4d6505ed9162a0ee6be089190f74c419ecacb19",
    "entryUrl": "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-from-scratch",
    "volume": "09-harness",
    "local": "claude-code-from-scratch",
    "title": "Claude Code From Scratch",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 7,
    "md": 49,
    "repo": "Windy3f3f3f3f/claude-code-from-scratch",
    "site": null,
    "commit": "0b452360866433fde0dc77cd37ada9d303546592",
    "entryUrl": "https://github.com/Windy3f3f3f3f/claude-code-from-scratch/blob/0b452360866433fde0dc77cd37ada9d303546592/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/claude-code-docs-official",
    "volume": "09-harness",
    "local": "claude-code-docs-official",
    "title": "claude-code-docs-official",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 2,
    "md": 203,
    "repo": null,
    "site": "https://code.claude.com/docs",
    "commit": null,
    "entryUrl": "https://code.claude.com/docs",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/openai-codex-docs-official",
    "volume": "09-harness",
    "local": "openai-codex-docs-official",
    "title": "openai-codex-docs-official",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 3,
    "md": 152,
    "repo": null,
    "site": "https://learn.chatgpt.com/docs",
    "commit": null,
    "entryUrl": "https://learn.chatgpt.com/docs",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/openai-developer-blog",
    "volume": "09-harness",
    "local": "openai-developer-blog",
    "title": "openai-developer-blog",
    "kind": "官方博客",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 29,
    "repo": null,
    "site": "https://developers.openai.com/blog",
    "commit": null,
    "entryUrl": "https://developers.openai.com/blog",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/anthropic-blog-official",
    "volume": "09-harness",
    "local": "anthropic-blog-official",
    "title": "anthropic-blog-official",
    "kind": "官方博客",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中英混排",
    "lessons": 0,
    "md": 1,
    "repo": null,
    "site": "https://claude.com/blog",
    "commit": null,
    "entryUrl": "https://claude.com/blog",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/anthropic-engineering-blog",
    "volume": "09-harness",
    "local": "anthropic-engineering-blog",
    "title": "anthropic-engineering-blog",
    "kind": "官方博客",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 2,
    "md": 1,
    "repo": null,
    "site": "https://www.anthropic.com/engineering",
    "commit": null,
    "entryUrl": "https://www.anthropic.com/engineering",
    "publishable": false,
    "ported": false
  },
  {
    "id": "09-harness/agentic-harness-patterns-skill",
    "volume": "09-harness",
    "local": "agentic-harness-patterns-skill",
    "title": "Agentic Harness Patterns（模式与技能）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 2,
    "md": 30,
    "repo": "keli-wen/agentic-harness-patterns-skill",
    "site": null,
    "commit": "17549f55b84a94b1ff647ae4711be600fe8ae12f",
    "entryUrl": "https://github.com/keli-wen/agentic-harness-patterns-skill/blob/17549f55b84a94b1ff647ae4711be600fe8ae12f/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/langchain-deepagents",
    "volume": "09-harness",
    "local": "langchain-deepagents",
    "title": "LangChain DeepAgents",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 2,
    "md": 70,
    "repo": "langchain-ai/deepagents",
    "site": null,
    "commit": "d93ab3351bbf4c3687212f665094ccad100f2c08",
    "entryUrl": "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "09-harness/grok-build",
    "volume": "09-harness",
    "local": "grok-build",
    "title": "Grok Build（xAI 官方 CLI）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 12,
    "repo": "xai-org/grok-build",
    "site": null,
    "commit": "37949780c144e37df692e3d669051a21fec24f20",
    "entryUrl": "https://github.com/xai-org/grok-build/blob/37949780c144e37df692e3d669051a21fec24f20/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "09-harness/ecc",
    "volume": "09-harness",
    "local": "ecc",
    "title": "ECC —— Harness 性能优化系统",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 502,
    "repo": "affaan-m/ECC",
    "site": null,
    "commit": "928c1dea72f5c330442fc1f595563398b8f389f7",
    "entryUrl": "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/hf-context-course",
    "volume": "10-context-memory",
    "local": "hf-context-course",
    "title": "The Context Course",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 5,
    "md": 143,
    "repo": "huggingface/context-course",
    "site": null,
    "commit": "0448a7ca721a63a81531e1ba94f46f897c70645b",
    "entryUrl": "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "10-context-memory/huggingface-mcp-course",
    "volume": "10-context-memory",
    "local": "huggingface-mcp-course",
    "title": "The Model Context Protocol (MCP) Course",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 74,
    "repo": "huggingface/mcp-course",
    "site": null,
    "commit": "e706ccc0d7abe73c31813979c3451c0e31c8a464",
    "entryUrl": "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/prompt-engineering-guide",
    "volume": "10-context-memory",
    "local": "prompt-engineering-guide",
    "title": "Prompt Engineering Guide",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 1111,
    "repo": "dair-ai/Prompt-Engineering-Guide",
    "site": null,
    "commit": "57673726396dd94acb23bdb1e67f27c78ee85a8e",
    "entryUrl": "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/context-engineering-book",
    "volume": "10-context-memory",
    "local": "context-engineering-book",
    "title": "Context Engineering（Bonigarcia 教程）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 10,
    "md": 190,
    "repo": "bonigarcia/context-engineering",
    "site": null,
    "commit": "46719154489e410b509db4fb69ab1c29fb3362a0",
    "entryUrl": "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/context-engineering-intro",
    "volume": "10-context-memory",
    "local": "context-engineering-intro",
    "title": "Context Engineering Intro",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 139,
    "repo": "coleam00/context-engineering-intro",
    "site": null,
    "commit": "a2d84b021cee1e2f4e77ba854bba0be8cb319035",
    "entryUrl": "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/practical-guide-context-engineering",
    "volume": "10-context-memory",
    "local": "practical-guide-context-engineering",
    "title": "大模型应用开发 -上下文工程与运行空间实践指南",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 2,
    "licenseLabel": "仅引用",
    "lang": "中文",
    "lessons": 2,
    "md": 46,
    "repo": "WakeUp-Jin/Practical-Guide-to-Context-Engineering",
    "site": null,
    "commit": "ec349a470e2992adc1d98899a46cb085839c0676",
    "entryUrl": "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "10-context-memory/advanced-context-engineering",
    "volume": "10-context-memory",
    "local": "advanced-context-engineering",
    "title": "humanlayer/advanced-context-engineering-for-coding-agents",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 5,
    "repo": "humanlayer/advanced-context-engineering-for-coding-agents",
    "site": null,
    "commit": "f2bc7aec4575418d2d2e83fec078266cc56d3e6a",
    "entryUrl": "https://github.com/humanlayer/advanced-context-engineering-for-coding-agents",
    "publishable": false,
    "ported": false
  },
  {
    "id": "10-context-memory/awesome-context-engineering",
    "volume": "10-context-memory",
    "local": "awesome-context-engineering",
    "title": "Awesome Context Engineering（上下文工程清单）",
    "kind": "工程手册",
    "category": "工程手册与指南",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 0,
    "md": 1,
    "repo": "Meirtz/Awesome-Context-Engineering",
    "site": null,
    "commit": "8b6ede2b5e610774e01d74902d65a51000d671a4",
    "entryUrl": "https://github.com/Meirtz/Awesome-Context-Engineering/blob/8b6ede2b5e610774e01d74902d65a51000d671a4/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "10-context-memory/claude-code-system-prompts",
    "volume": "10-context-memory",
    "local": "claude-code-system-prompts",
    "title": "Claude Code System Prompts",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 300,
    "repo": "Piebald-AI/claude-code-system-prompts",
    "site": null,
    "commit": "3af4c6139aaabb0470440961ca8c8fb871099234",
    "entryUrl": "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/microsoft-skills",
    "volume": "10-context-memory",
    "local": "microsoft-skills",
    "title": "Microsoft Agent Skills",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 4,
    "md": 1537,
    "repo": "microsoft/skills",
    "site": null,
    "commit": "cf77b1efbf3117501f4727c476894751311ee885",
    "entryUrl": "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/openai-skills",
    "volume": "10-context-memory",
    "local": "openai-skills",
    "title": "Agent Skills",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 531,
    "repo": "openai/skills",
    "site": null,
    "commit": "49f948faa9258a0c61caceaf225e179651397431",
    "entryUrl": "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/README.md",
    "publishable": false,
    "ported": false
  },
  {
    "id": "10-context-memory/agent-skills-for-context-engineering",
    "volume": "10-context-memory",
    "local": "agent-skills-for-context-engineering",
    "title": "Agent Skills for Context Engineering",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 6,
    "md": 187,
    "repo": "muratcankoylan/Agent-Skills-for-Context-Engineering",
    "site": null,
    "commit": "6dbe1a1d868eab51a3bc9011b0f55e2891513e40",
    "entryUrl": "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/mattpocock-skills",
    "volume": "10-context-memory",
    "local": "mattpocock-skills",
    "title": "Matt Pocock Skills（工程技能库）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 3,
    "md": 112,
    "repo": "mattpocock/skills",
    "site": null,
    "commit": "3cca18b368ae95cdbdebbff572ccafa662551015",
    "entryUrl": "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/agent-skills-addyosmani",
    "volume": "10-context-memory",
    "local": "agent-skills-addyosmani",
    "title": "Agent Skills（Addy Osmani）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 8,
    "md": 95,
    "repo": "addyosmani/agent-skills",
    "site": null,
    "commit": "6ca0cd7db39b41b1c37e26d335c507ee92382c6d",
    "entryUrl": "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/superpowers",
    "volume": "10-context-memory",
    "local": "superpowers",
    "title": "Superpowers（Claude Code 技能库）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 5,
    "md": 94,
    "repo": "obra/superpowers",
    "site": null,
    "commit": "b36e0829c6d0140e93cfef2ca599b1b07d4a7797",
    "entryUrl": "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/superpowers-zh",
    "volume": "10-context-memory",
    "local": "superpowers-zh",
    "title": "superpowers-zh（AI 编程超能力 · 中文增强版）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 6,
    "md": 93,
    "repo": "jnMetaCode/superpowers-zh",
    "site": null,
    "commit": "79ea5d262b7a1c7ce76a289390853bca51f940d4",
    "entryUrl": "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/awesome-agent-skills-heilcheng",
    "volume": "10-context-memory",
    "local": "awesome-agent-skills-heilcheng",
    "title": "Agent Skill Index",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 1,
    "md": 8,
    "repo": "heilcheng/awesome-agent-skills",
    "site": null,
    "commit": "de9056857eb0e96da833469d2ee3ac392058225d",
    "entryUrl": "https://github.com/heilcheng/awesome-agent-skills/blob/de9056857eb0e96da833469d2ee3ac392058225d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/awesome-agent-skills-voltagent",
    "volume": "10-context-memory",
    "local": "awesome-agent-skills-voltagent",
    "title": "Awesome Agent Skills（Agent 技能清单）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 0,
    "md": 2,
    "repo": "VoltAgent/awesome-agent-skills",
    "site": null,
    "commit": "8873794bcb26ff5dcf9cd518c87cf5638ca44b92",
    "entryUrl": "https://github.com/VoltAgent/awesome-agent-skills/blob/8873794bcb26ff5dcf9cd518c87cf5638ca44b92/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "10-context-memory/wonderful-prompts",
    "volume": "10-context-memory",
    "local": "wonderful-prompts",
    "title": "Wonderful Prompts",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 1,
    "md": 6,
    "repo": "langgptai/wonderful-prompts",
    "site": null,
    "commit": "c8e5dbd3bc01740728fd1ab8f8d4f654a17e3697",
    "entryUrl": "https://github.com/langgptai/wonderful-prompts/blob/c8e5dbd3bc01740728fd1ab8f8d4f654a17e3697/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/awesome-mcp-zh",
    "volume": "10-context-memory",
    "local": "awesome-mcp-zh",
    "title": "Awesome MCP 中文资源",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 0,
    "md": 2,
    "repo": "yzfly/Awesome-MCP-ZH",
    "site": null,
    "commit": "616590af2bc94fcd98dd0b88a0b740ad6cb86a9d",
    "entryUrl": "https://github.com/yzfly/Awesome-MCP-ZH/blob/616590af2bc94fcd98dd0b88a0b740ad6cb86a9d/README.md",
    "publishable": true,
    "ported": false
  },
  {
    "id": "10-context-memory/get-shit-done",
    "volume": "10-context-memory",
    "local": "get-shit-done",
    "title": "GSD（Get Shit Done）工作流文档",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 3,
    "md": 469,
    "repo": "gsd-build/get-shit-done",
    "site": null,
    "commit": "bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815",
    "entryUrl": "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "10-context-memory/ai-engineering-hub",
    "volume": "10-context-memory",
    "local": "ai-engineering-hub",
    "title": "AI Engineering Hub",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 112,
    "md": 164,
    "repo": "patchy631/ai-engineering-hub",
    "site": null,
    "commit": "2c9b106168d4540b88e727e4aa316c06c856c2b7",
    "entryUrl": "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/awesome-openclaw-usecases",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-usecases",
    "title": "Awesome OpenClaw Usecases",
    "kind": "实践案例集",
    "category": "实践案例与产品",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 46,
    "repo": "hesamsheikh/awesome-openclaw-usecases",
    "site": null,
    "commit": "659895e58e2105c6db8fbef39f446c8a786a480c",
    "entryUrl": "https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/659895e58e2105c6db8fbef39f446c8a786a480c/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/build-your-own-openclaw",
    "volume": "11-personal-agents",
    "local": "build-your-own-openclaw",
    "title": "Build Your Own OpenClaw",
    "kind": "源码研读",
    "category": "源码与实现研读",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 8,
    "md": 16,
    "repo": "czl9707/build-your-own-openclaw",
    "site": null,
    "commit": "37ae5dd255a0451609e67ad6d6a51fa5de80523c",
    "entryUrl": "https://github.com/czl9707/build-your-own-openclaw",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/openai-plugins-docs",
    "volume": "11-personal-agents",
    "local": "openai-plugins-docs",
    "title": "openai-plugins-docs",
    "kind": "官方文档",
    "category": "官方文献（外链原文）",
    "tier": 3,
    "licenseLabel": "仅引用",
    "lang": "英文",
    "lessons": 1,
    "md": 29,
    "repo": null,
    "site": "https://developers.openai.com/plugins",
    "commit": null,
    "entryUrl": "https://developers.openai.com/plugins",
    "publishable": false,
    "ported": false
  },
  {
    "id": "11-personal-agents/awesome-openclaw-skills",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-skills",
    "title": "Awesome OpenClaw Skills",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 1,
    "md": 32,
    "repo": "VoltAgent/awesome-openclaw-skills",
    "site": null,
    "commit": "37ad08c1b8e243d5f501c6fcaf7ac0b507bd83a1",
    "entryUrl": "https://github.com/VoltAgent/awesome-openclaw-skills/blob/37ad08c1b8e243d5f501c6fcaf7ac0b507bd83a1/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/awesome-openclaw-tutorial",
    "volume": "11-personal-agents",
    "local": "awesome-openclaw-tutorial",
    "title": "Awesome OpenClaw Tutorial（中文）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 2,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 10,
    "md": 71,
    "repo": "xianyu110/awesome-openclaw-tutorial",
    "site": null,
    "commit": "0b0943dc41725e80d64f7f8d745d185e7752be4d",
    "entryUrl": "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/mine-context",
    "volume": "11-personal-agents",
    "local": "mine-context",
    "title": "MineContext（火山引擎个人上下文助手）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 3,
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "lessons": 3,
    "md": 11,
    "repo": "volcengine/MineContext",
    "site": null,
    "commit": "171c7a9ea8091e326ddcf0f10718aa1b58c83c65",
    "entryUrl": "https://github.com/volcengine/MineContext/blob/171c7a9ea8091e326ddcf0f10718aa1b58c83c65/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "11-personal-agents/qclaw",
    "volume": "11-personal-agents",
    "local": "qclaw",
    "title": "Qclaw（秋芝2046）",
    "kind": "其他材料",
    "category": "速查清单与索引",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "中文",
    "lessons": 6,
    "md": 7,
    "repo": "qiuzhi2046/Qclaw",
    "site": null,
    "commit": "c494768977f4e48b8eacbfae7ae390af11fc015f",
    "entryUrl": "https://github.com/qiuzhi2046/Qclaw/blob/c494768977f4e48b8eacbfae7ae390af11fc015f/README.md",
    "publishable": true,
    "ported": true
  },
  {
    "id": "13-local-ai/edgeai-for-beginners",
    "volume": "13-local-ai",
    "local": "edgeai-for-beginners",
    "title": "EdgeAI for Beginners",
    "kind": "系统课程",
    "category": "系统课程",
    "tier": 1,
    "licenseLabel": "可转载",
    "lang": "英文",
    "lessons": 10,
    "md": 96,
    "repo": "microsoft/edgeai-for-beginners",
    "site": null,
    "commit": "e88f123a4bb5796594919db3a13257c429d1288c",
    "entryUrl": "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/README.md",
    "publishable": true,
    "ported": true
  }
]
