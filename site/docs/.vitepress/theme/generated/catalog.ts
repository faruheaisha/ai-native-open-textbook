// 由 scripts/build-site-content.mjs 生成，请勿手改。
export const generatedAt = "2026-09-13"
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
        "title": "Week Template: AI Engineering Lab (Rich Lesson Standard v2)",
        "rel": "curriculum-_templates-week-template",
        "sourceRel": "curriculum/_templates/week-template.md"
      },
      {
        "title": "AI Engineering Lab: Learning Path",
        "rel": "curriculum-learning-path",
        "sourceRel": "curriculum/learning-path.md"
      },
      {
        "title": "AI Engineering Lab: Projects",
        "rel": "curriculum-projects",
        "sourceRel": "curriculum/projects/README.md"
      },
      {
        "title": "AI Engineering Lab: 24-Week AI Engineering Program",
        "rel": "curriculum",
        "sourceRel": "curriculum/README.md"
      },
      {
        "title": "AI Engineering Lab: Progress Tracker",
        "rel": "curriculum-tracking",
        "sourceRel": "curriculum/tracking/README.md"
      },
      {
        "title": "Week 01: Exercises & Checklist",
        "rel": "curriculum-week-01-exercises",
        "sourceRel": "curriculum/week-01/exercises.md"
      },
      {
        "title": "Week 01: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-01-quiz",
        "sourceRel": "curriculum/week-01/quiz.md"
      },
      {
        "title": "Week 01: Python Foundations & the AI Engineering Landscape",
        "rel": "curriculum-week-01",
        "sourceRel": "curriculum/week-01/README.md"
      },
      {
        "title": "Week 02: Exercises & Checklist",
        "rel": "curriculum-week-02-exercises",
        "sourceRel": "curriculum/week-02/exercises.md"
      },
      {
        "title": "Week 02: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-02-quiz",
        "sourceRel": "curriculum/week-02/quiz.md"
      },
      {
        "title": "Week 02: Data Engineering & SQL for AI",
        "rel": "curriculum-week-02",
        "sourceRel": "curriculum/week-02/README.md"
      },
      {
        "title": "Week 03: Exercises & Checklist",
        "rel": "curriculum-week-03-exercises",
        "sourceRel": "curriculum/week-03/exercises.md"
      },
      {
        "title": "Week 03: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-03-quiz",
        "sourceRel": "curriculum/week-03/quiz.md"
      },
      {
        "title": "Week 03: Machine Learning Fundamentals",
        "rel": "curriculum-week-03",
        "sourceRel": "curriculum/week-03/README.md"
      },
      {
        "title": "Week 04: Exercises & Checklist",
        "rel": "curriculum-week-04-exercises",
        "sourceRel": "curriculum/week-04/exercises.md"
      },
      {
        "title": "Week 04: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-04-quiz",
        "sourceRel": "curriculum/week-04/quiz.md"
      },
      {
        "title": "Week 04: Deep Learning with PyTorch",
        "rel": "curriculum-week-04",
        "sourceRel": "curriculum/week-04/README.md"
      },
      {
        "title": "Week 05: Exercises & Checklist",
        "rel": "curriculum-week-05-exercises",
        "sourceRel": "curriculum/week-05/exercises.md"
      },
      {
        "title": "Week 05: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-05-quiz",
        "sourceRel": "curriculum/week-05/quiz.md"
      },
      {
        "title": "Week 05, How LLMs Work: Tokens to Transformers",
        "rel": "curriculum-week-05",
        "sourceRel": "curriculum/week-05/README.md"
      },
      {
        "title": "Week 06: Exercises & Checklist",
        "rel": "curriculum-week-06-exercises",
        "sourceRel": "curriculum/week-06/exercises.md"
      },
      {
        "title": "Week 06: Quiz (10 questions, 8/10 to pass)",
        "rel": "curriculum-week-06-quiz",
        "sourceRel": "curriculum/week-06/quiz.md"
      },
      {
        "title": "Week 06: Prompt Engineering & the Context Window",
        "rel": "curriculum-week-06",
        "sourceRel": "curriculum/week-06/README.md"
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
        "rel": "00-course-setup",
        "sourceRel": "00-course-setup/README.md"
      },
      {
        "title": "Introduction to Generative AI and Large Language Models",
        "rel": "01-introduction-to-genai",
        "sourceRel": "01-introduction-to-genai/README.md"
      },
      {
        "title": "Exploring and comparing different LLMs",
        "rel": "02-exploring-and-comparing-different-llms",
        "sourceRel": "02-exploring-and-comparing-different-llms/README.md"
      },
      {
        "title": "Using Generative AI Responsibly",
        "rel": "03-using-generative-ai-responsibly",
        "sourceRel": "03-using-generative-ai-responsibly/README.md"
      },
      {
        "title": "Prompt Engineering Fundamentals",
        "rel": "04-prompt-engineering-fundamentals",
        "sourceRel": "04-prompt-engineering-fundamentals/README.md"
      },
      {
        "title": "Creating Advanced prompts",
        "rel": "05-advanced-prompts",
        "sourceRel": "05-advanced-prompts/README.md"
      },
      {
        "title": "Building Text Generation Applications",
        "rel": "06-text-generation-apps",
        "sourceRel": "06-text-generation-apps/README.md"
      },
      {
        "title": "Building Generative AI-Powered Chat Applications",
        "rel": "07-building-chat-applications",
        "sourceRel": "07-building-chat-applications/README.md"
      },
      {
        "title": "Building a Search Applications",
        "rel": "08-building-search-applications",
        "sourceRel": "08-building-search-applications/README.md"
      },
      {
        "title": "Transcription data prep",
        "rel": "08-building-search-applications-scripts",
        "sourceRel": "08-building-search-applications/scripts/README.md"
      },
      {
        "title": "Building Image Generation Applications",
        "rel": "09-building-image-applications",
        "sourceRel": "09-building-image-applications/README.md"
      },
      {
        "title": "Building Low Code AI Applications",
        "rel": "10-building-low-code-ai-applications",
        "sourceRel": "10-building-low-code-ai-applications/README.md"
      },
      {
        "title": "Integrating with function calling",
        "rel": "11-integrating-with-function-calling",
        "sourceRel": "11-integrating-with-function-calling/README.md"
      },
      {
        "title": "Designing UX for AI Applications",
        "rel": "12-designing-ux-for-ai-applications",
        "sourceRel": "12-designing-ux-for-ai-applications/README.md"
      },
      {
        "title": "Securing Your Generative AI Applications",
        "rel": "13-securing-ai-applications",
        "sourceRel": "13-securing-ai-applications/README.md"
      },
      {
        "title": "The Generative AI Application Lifecycle",
        "rel": "14-the-generative-ai-application-lifecycle",
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
        "rel": "appendix-A-01_main-chapter-code",
        "sourceRel": "appendix-A/01_main-chapter-code/README.md"
      },
      {
        "title": "LLMs from Scratch",
        "rel": "appendix-A-02_setup-recommendations",
        "sourceRel": "appendix-A/02_setup-recommendations/README.md"
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
        "title": "Recommendations for Getting the Most Out of a Technical Book",
        "rel": "ch01-reading-recommendations",
        "sourceRel": "ch01/reading-recommendations.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02-01_main-chapter-code",
        "sourceRel": "ch02/01_main-chapter-code/README.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02-02_bonus_bytepair-encoder",
        "sourceRel": "ch02/02_bonus_bytepair-encoder/README.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02-03_bonus_embedding-vs-matmul",
        "sourceRel": "ch02/03_bonus_embedding-vs-matmul/README.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02-04_bonus_dataloader-intuition",
        "sourceRel": "ch02/04_bonus_dataloader-intuition/README.md"
      },
      {
        "title": "Byte Pair Encoding (BPE) Tokenizer From Scratch",
        "rel": "ch02-05_bpe-from-scratch",
        "sourceRel": "ch02/05_bpe-from-scratch/README.md"
      },
      {
        "title": "SimpleTokenizerV3",
        "rel": "ch02-06_bonus_simple-tokenizer-v3",
        "sourceRel": "ch02/06_bonus_simple-tokenizer-v3/README.md"
      },
      {
        "title": "Chapter 2: Working with Text Data",
        "rel": "ch02",
        "sourceRel": "ch02/README.md"
      },
      {
        "title": "Chapter 3: Coding Attention Mechanisms",
        "rel": "ch03-01_main-chapter-code",
        "sourceRel": "ch03/01_main-chapter-code/README.md"
      },
      {
        "title": "More Efficient Multi-Head Attention Implementations",
        "rel": "ch03-02_bonus_efficient-multihead-attention",
        "sourceRel": "ch03/02_bonus_efficient-multihead-attention/README.md"
      },
      {
        "title": "Understanding PyTorch Buffers",
        "rel": "ch03-03_understanding-buffers",
        "sourceRel": "ch03/03_understanding-buffers/README.md"
      },
      {
        "title": "Chapter 3: Coding Attention Mechanisms",
        "rel": "ch03",
        "sourceRel": "ch03/README.md"
      },
      {
        "title": "Chapter 4: Implementing a GPT Model from Scratch To Generate Text",
        "rel": "ch04-01_main-chapter-code",
        "sourceRel": "ch04/01_main-chapter-code/README.md"
      },
      {
        "title": "Chapter 4: Implementing a GPT Model from Scratch To Generate Text",
        "rel": "ch04-02_performance-analysis",
        "sourceRel": "ch04/02_performance-analysis/README.md"
      },
      {
        "title": "Bonus Material: KV Cache",
        "rel": "ch04-03_kv-cache",
        "sourceRel": "ch04/03_kv-cache/README.md"
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
        "rel": "docs-Agent_First",
        "sourceRel": "docs/Agent_First.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-AGI",
        "sourceRel": "docs/AGI.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-AI_money",
        "sourceRel": "docs/AI_money.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-AI_tools",
        "sourceRel": "docs/AI_tools.md"
      },
      {
        "title": "浏览器与计算机自动化（Browser / Computer Use）",
        "rel": "docs-Browser_Computer_Use",
        "sourceRel": "docs/Browser_Computer_Use.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_access",
        "sourceRel": "docs/ChatGPT_access.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_dev",
        "sourceRel": "docs/ChatGPT_dev.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_plugins",
        "sourceRel": "docs/ChatGPT_plugins.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_prompts",
        "sourceRel": "docs/ChatGPT_prompts.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_tools",
        "sourceRel": "docs/ChatGPT_tools.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-ChatGPT_Top_Project",
        "sourceRel": "docs/ChatGPT_Top_Project.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-Claude_Skills",
        "sourceRel": "docs/Claude_Skills.md"
      },
      {
        "title": "Coding Agents 编程智能体",
        "rel": "docs-Coding_Agents",
        "sourceRel": "docs/Coding_Agents.md"
      },
      {
        "title": "DeepSeek 生态指南",
        "rel": "docs-DeepSeek",
        "sourceRel": "docs/DeepSeek.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-LLM_RAG",
        "sourceRel": "docs/LLM_RAG.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-LLMs",
        "sourceRel": "docs/LLMs.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-MCP",
        "sourceRel": "docs/MCP.md"
      },
      {
        "title": "前沿大模型经典技术文章",
        "rel": "docs-OpenAI_articles",
        "sourceRel": "docs/OpenAI_articles.md"
      },
      {
        "title": "Sora 体系化知识",
        "rel": "docs-Sora",
        "sourceRel": "docs/Sora.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "docs-thinking",
        "sourceRel": "docs/thinking.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "examples-chatGPT_set_free",
        "sourceRel": "examples/chatGPT_set_free.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "examples-ChatGPT_xiangzi",
        "sourceRel": "examples/ChatGPT_xiangzi.md"
      },
      {
        "title": "Awesome ChatGPT 中文指南",
        "rel": "examples-free_chatgpt_website",
        "sourceRel": "examples/free_chatgpt_website.md"
      }
    ]
  },
  {
    "id": "01-foundations/awesome-llm-resources",
    "volume": "01-foundations",
    "local": "awesome-llm-resources",
    "title": "Awesome LLM Resources（大模型资源清单）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "中英混排",
    "publishable": true,
    "repo": "WangRongsheng/awesome-LLM-resources",
    "site": null,
    "commit": "1fdf4ba2279979507c122db6403d2b7f97cc1e36",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/WangRongsheng/awesome-LLM-resources",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome LLM Resources（大模型资源清单）",
        "rel": "overview",
        "sourceRel": "README.md"
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
        "rel": "docs-cases-submissions-annual-report-digital-transformation",
        "sourceRel": "docs/cases/submissions/annual-report-digital-transformation/index.md"
      },
      {
        "title": "【示例】用千问办公自动整理每日 AI 资讯",
        "rel": "docs-cases-submissions-daily-ai-news",
        "sourceRel": "docs/cases/submissions/daily-ai-news/index.md"
      },
      {
        "title": "用千问办公生成一个 GSAP 粒子球体作品集动画网站",
        "rel": "docs-cases-submissions-jz-2025-showreel",
        "sourceRel": "docs/cases/submissions/jz-2025-showreel/index.md"
      },
      {
        "title": "用千问办公清洗 119 份门店 Excel 并生成可交互运营看板",
        "rel": "docs-cases-submissions-tea-shop-sales-analysis",
        "sourceRel": "docs/cases/submissions/tea-shop-sales-analysis/index.md"
      },
      {
        "title": "把经历发给千问办公，直接生成一份好看的简历",
        "rel": "docs-cases-submissions-vibe-resume",
        "sourceRel": "docs/cases/submissions/vibe-resume/index.md"
      },
      {
        "title": "用千问办公公众号 Skill 一键排版并发布到微信公众号草稿箱",
        "rel": "docs-cases-submissions-wechat-format-publish",
        "sourceRel": "docs/cases/submissions/wechat-format-publish/index.md"
      },
      {
        "title": "告别微信收藏夹吃灰：用 ima + 千问办公把碎片内容构建成可生长的知识体系",
        "rel": "docs-cases-submissions-wechat-ima-knowledge",
        "sourceRel": "docs/cases/submissions/wechat-ima-knowledge/index.md"
      },
      {
        "title": "\\[实战指南\\]｜如何用 Remotion Skills 做视频",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_实战案例_如何用_Remotion_Skills_做视频",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/[实战案例]｜如何用 Remotion Skills 做视频/index.md"
      },
      {
        "title": "实战指南｜高效整理资料、加工文档",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_文档类_高效整理资料_加工文档",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/【文档类】｜高效整理资料、加工文档/index.md"
      },
      {
        "title": "实战指南｜快速写好通知/请示/公告等材料",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-_文档类_快速写好通知_请示_公告等材料",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/【文档类】｜快速写好通知／请示／公告等材料/index.md"
      },
      {
        "title": "实战指南｜高效整理资料、加工文档",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-_文档类_高效整理资料_加工文档",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/【文档类】｜高效整理资料、加工文档/index.md"
      },
      {
        "title": "实战指南｜快速写好通知/请示/公告等材料",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-_文档类_快速写好通知_请示_公告等材料",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/【文档类】｜快速写好通知／请示／公告等材料/index.md"
      },
      {
        "title": "电商运营-电商经营数据大屏「官方案例」",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-电商运营-电商经营数据大屏_官方案例_",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/电商运营-电商经营数据大屏「官方案例」/index.md"
      },
      {
        "title": "实战指南｜4个场景教你用 千问办公 告别重复工作",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_4个场景教你用_千问办公_告别重复工作",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜4个场景教你用 千问办公 告别重复工作/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_千问_做复杂数据分析",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 千问 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜5个技巧教你用 千问办公做复杂数据分析",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_5个技巧教你用_TRAE_做复杂数据分析",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜5个技巧教你用 TRAE 做复杂数据分析/index.md"
      },
      {
        "title": "实战指南｜数据分析全流程实战教程",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_数据分析全流程实战教程",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜数据分析全流程实战教程/index.md"
      },
      {
        "title": "实战指南｜Excel 表格数据处理",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-实战指南_Excel_表格数据处理",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/实战指南｜Excel 表格数据处理/index.md"
      },
      {
        "title": "自媒体-上传录音，克隆自己的声音做口播",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native-自媒体-上传录音_克隆自己的声音做口播",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/自媒体-上传录音，克隆自己的声音做口播/index.md"
      },
      {
        "title": "第二部分 实战案例 从具体任务，走向AI Native",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-部分_实战案例_从具体任务_走向AI_Native",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/index.md"
      },
      {
        "title": "电商运营-电商经营数据大屏「官方案例」",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-电商运营-电商经营数据大屏_官方案例_",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/电商运营-电商经营数据大屏「官方案例」/index.md"
      },
      {
        "title": "实战指南｜4个场景教你用 千问办公 告别重复工作",
        "rel": "docs-greenbook-第二部分_实战案例_从具体任务_走向AI_Native-实战指南_4个场景教你用_千问办公_告别重复工作",
        "sourceRel": "docs/greenbook/第二部分 实战案例 从具体任务，走向AI Native/实战指南｜4个场景教你用 千问办公 告别重复工作/index.md"
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
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_11_章_办公三件套_Word_Excel_PPT",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 11 章 办公三件套：Word、Excel、PPT/index.md"
      },
      {
        "title": "第 12 章 从整理桌面文件这些小事做起",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_12_章_从整理桌面文件这些小事做起",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 12 章 从整理桌面文件这些小事做起/index.md"
      },
      {
        "title": "第 13 章 远程控制你的电脑，不用发愁不在电脑前",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_13_章_远程控制你的电脑_不用发愁不在电脑前",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 13 章 远程控制你的电脑，不用发愁不在电脑前/index.md"
      },
      {
        "title": "第 14 章 生活助手的价值，是减少琐碎",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_14_章_生活助手的价值_是减少琐碎",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 14 章 生活助手的价值，是减少琐碎/index.md"
      },
      {
        "title": "第 15 章 资讯整合：把信息流变成每日通知",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_15_章_资讯整合_把信息流变成每日通知",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 15 章 资讯整合：把信息流变成每日通知/index.md"
      },
      {
        "title": "第 16 章 收藏不是知识管理，能再次用起来才是",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_16_章_收藏不是知识管理_能再次用起来才是",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 16 章 收藏不是知识管理，能再次用起来才是/index.md"
      },
      {
        "title": "第 17 章 会议结束不是终点，工作才刚刚开始",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_17_章_会议结束不是终点_工作才刚刚开始",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 17 章 会议结束不是终点，工作才刚刚开始/index.md"
      },
      {
        "title": "第 18 章 把投资分析变成你的日常",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_18_章_把投资分析变成你的日常",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 18 章 把投资分析变成你的日常/index.md"
      },
      {
        "title": "第 19 章 一句话召唤 AI 视频团队",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_19_章_一句话召唤_AI_视频团队",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 19 章 一句话召唤 AI 视频团队/index.md"
      },
      {
        "title": "第 20 章 自媒体不只是靠努力，而是一条增长闭环",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_20_章_自媒体不只是靠努力_而是一条增长闭环",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 20 章 自媒体不只是靠努力，而是一条增长闭环/index.md"
      },
      {
        "title": "第 21 章 WorkBuddy也能做GEO专家",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队-第_21_章_WorkBuddy也能做GEO专家",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/第 21 章 WorkBuddy也能做GEO专家/index.md"
      },
      {
        "title": "第二篇 案例篇：从一项任务到一支 AI 团队",
        "rel": "docs-bluebook-第二篇_案例篇_从一项任务到一支_AI_团队",
        "sourceRel": "docs/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/index.md"
      },
      {
        "title": "第 22 章 打造skill：将书和视频蒸馏为可执行 Skill",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_22_章_打造skill_将书和视频蒸馏为可执行_Skill",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 22 章 打造skill：将书和视频蒸馏为可执行 Skill/index.md"
      },
      {
        "title": "第 23 章 其他用法补充：WorkBuddy 实操案例集",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_23_章_其他用法补充_WorkBuddy_实操案例集",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 23 章 其他用法补充：WorkBuddy 实操案例集/index.md"
      },
      {
        "title": "第 24 章 如何进行多 Agent 系统设计",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_24_章_如何进行多_Agent_系统设计",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 24 章 如何进行多 Agent 系统设计/index.md"
      },
      {
        "title": "第 25 章 自动化工作流的可靠性",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统-第_25_章_自动化工作流的可靠性",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/第 25 章 自动化工作流的可靠性/index.md"
      },
      {
        "title": "第三篇 进阶篇：把案例变成自己的工作系统",
        "rel": "docs-bluebook-第三篇_进阶篇_把案例变成自己的工作系统",
        "sourceRel": "docs/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/index.md"
      },
      {
        "title": "第 26 章 岗位路线图：不同岗位如何把 WorkBuddy 用深",
        "rel": "docs-bluebook-第四篇_岗位与行业落地-第_26_章_岗位路线图_不同岗位如何把_WorkBuddy_用深",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/第 26 章 岗位路线图：不同岗位如何把 WorkBuddy 用深/index.md"
      },
      {
        "title": "第 27 章 行业路线图：从通用能力到行业工作流",
        "rel": "docs-bluebook-第四篇_岗位与行业落地-第_27_章_行业路线图_从通用能力到行业工作流",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/第 27 章 行业路线图：从通用能力到行业工作流/index.md"
      },
      {
        "title": "第四篇 岗位与行业落地",
        "rel": "docs-bluebook-第四篇_岗位与行业落地",
        "sourceRel": "docs/bluebook/第四篇 岗位与行业落地/index.md"
      },
      {
        "title": "第 1 章 初识 WorkBuddy",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_1_章_初识_WorkBuddy",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 1 章 初识 WorkBuddy/index.md"
      },
      {
        "title": "第 2 章 WorkBuddy的下载、安装、登录与更新",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_2_章_WorkBuddy的下载_安装_登录与更新",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 2 章 WorkBuddy的下载、安装、登录与更新/index.md"
      },
      {
        "title": "第 3 章 WorkBuddy 的主界面、任务与工作区",
        "rel": "docs-bluebook-第一篇_使用手册_先把_WorkBuddy_用起来-第_3_章_WorkBuddy_的主界面_任务与工作区",
        "sourceRel": "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 3 章 WorkBuddy 的主界面、任务与工作区/index.md"
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
        "title": "1. 欢迎使用 Cmd Markdown 编辑阅读器",
        "rel": "backend-infra-document-parser-impl-builtin-test_data-test_markdown",
        "sourceRel": "backend/infra/document/parser/impl/builtin/test_data/test_markdown.md"
      },
      {
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "{{ packageName }}",
        "rel": "common-_templates-component",
        "sourceRel": "common/_templates/component/README.md"
      },
      {
        "title": "🦀️ Rsbuild & React App",
        "rel": "common-_templates-rsbuild-web",
        "sourceRel": "common/_templates/rsbuild-web/README.md"
      },
      {
        "title": "环境变量",
        "rel": "common-_templates-rspack-web-env",
        "sourceRel": "common/_templates/rspack-web/env/README.md"
      },
      {
        "title": "Rspack & React App",
        "rel": "common-_templates-rspack-web",
        "sourceRel": "common/_templates/rspack-web/README.md"
      },
      {
        "title": "{{ packageName }}",
        "rel": "common-_templates-solid-component",
        "sourceRel": "common/_templates/solid-component/README.md"
      },
      {
        "title": "中文备注转换为英文 - 实现方案",
        "rel": "common-autoinstallers-rush-commands-src-convert-comments-implementation-plan",
        "sourceRel": "common/autoinstallers/rush-commands/src/convert-comments/implementation-plan.md"
      },
      {
        "title": "中文备注转换为英文 - 项目概览",
        "rel": "common-autoinstallers-rush-commands-src-convert-comments",
        "sourceRel": "common/autoinstallers/rush-commands/src/convert-comments/README.md"
      },
      {
        "title": "代码仓库中的中文备注转换为英文",
        "rel": "common-autoinstallers-rush-commands-src-convert-comments-requirements",
        "sourceRel": "common/autoinstallers/rush-commands/src/convert-comments/requirements.md"
      },
      {
        "title": "中文备注转换为英文 - 技术规格说明",
        "rel": "common-autoinstallers-rush-commands-src-convert-comments-technical-specification",
        "sourceRel": "common/autoinstallers/rush-commands/src/convert-comments/technical-specification.md"
      },
      {
        "title": "cd ./docker/atlas",
        "rel": "docker-atlas",
        "sourceRel": "docker/atlas/README.md"
      },
      {
        "title": "NATS EventBus Integration Guide",
        "rel": "docs-nats-eventbus-integration-guide-en",
        "sourceRel": "docs/nats-eventbus-integration-guide-en.md"
      },
      {
        "title": "NATS EventBus 集成指南",
        "rel": "docs-nats-eventbus-integration-guide",
        "sourceRel": "docs/nats-eventbus-integration-guide.md"
      },
      {
        "title": "OceanBase Vector Database Integration Guide",
        "rel": "docs-oceanbase-integration-guide-en",
        "sourceRel": "docs/oceanbase-integration-guide-en.md"
      },
      {
        "title": "OceanBase 向量数据库集成指南",
        "rel": "docs-oceanbase-integration-guide",
        "sourceRel": "docs/oceanbase-integration-guide.md"
      },
      {
        "title": "Pulsar EventBus Integration Guide",
        "rel": "docs-pulsar-eventbus-integration-guide-en",
        "sourceRel": "docs/pulsar-eventbus-integration-guide-en.md"
      },
      {
        "title": "Pulsar EventBus 集成指南",
        "rel": "docs-pulsar-eventbus-integration-guide",
        "sourceRel": "docs/pulsar-eventbus-integration-guide.md"
      },
      {
        "title": "🦀️ Rsbuild & React App",
        "rel": "frontend-apps-coze-studio",
        "sourceRel": "frontend/apps/coze-studio/README.md"
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
        "title": "ARCHITECTURE.md — Coze Loop",
        "rel": "ARCHITECTURE",
        "sourceRel": "ARCHITECTURE.md"
      },
      {
        "title": "Runtime 模块重构说明",
        "rel": "backend-modules-evaluation-infra-runtime",
        "sourceRel": "backend/modules/evaluation/infra/runtime/README.md"
      },
      {
        "title": "Error Code Generation",
        "rel": "backend-script-errorx",
        "sourceRel": "backend/script/errorx/README.md"
      },
      {
        "title": "部署与环境配置指南",
        "rel": "docs-guidance-deployment-guide",
        "sourceRel": "docs/guidance/deployment-guide.md"
      },
      {
        "title": "IDL 变更与代码生成流程",
        "rel": "docs-guidance-idl-codegen-guide",
        "sourceRel": "docs/guidance/idl-codegen-guide.md"
      },
      {
        "title": "后端 DDD 模块与 API 参考",
        "rel": "docs-reference-backend-modules-api",
        "sourceRel": "docs/reference/backend-modules-api.md"
      },
      {
        "title": "前端 Rush.js 包结构与分层参考",
        "rel": "docs-reference-frontend-packages",
        "sourceRel": "docs/reference/frontend-packages.md"
      },
      {
        "title": "CozeLoop",
        "rel": "frontend-apps-cozeloop",
        "sourceRel": "frontend/apps/cozeloop/README.md"
      },
      {
        "title": "@coze-arch/eslint-config",
        "rel": "frontend-config-eslint-config",
        "sourceRel": "frontend/config/eslint-config/README.md"
      },
      {
        "title": "@coze-arch/postcss-config",
        "rel": "frontend-config-postcss-config",
        "sourceRel": "frontend/config/postcss-config/README.md"
      },
      {
        "title": "@coze-arch/stylelint-config",
        "rel": "frontend-config-stylelint-config",
        "sourceRel": "frontend/config/stylelint-config/README.md"
      },
      {
        "title": "@coze-arch/tailwind-config",
        "rel": "frontend-config-tailwind-config",
        "sourceRel": "frontend/config/tailwind-config/README.md"
      },
      {
        "title": "@coze-arch/ts-config",
        "rel": "frontend-config-ts-config",
        "sourceRel": "frontend/config/ts-config/README.md"
      },
      {
        "title": "@coze-arch/vitest-config",
        "rel": "frontend-config-vitest-config",
        "sourceRel": "frontend/config/vitest-config/README.md"
      },
      {
        "title": "@coze-arch/eslint-plugin",
        "rel": "frontend-infra-eslint-plugin",
        "sourceRel": "frontend/infra/eslint-plugin/README.md"
      },
      {
        "title": "@coze-arch/idl-parser",
        "rel": "frontend-infra-idl-idl-parser",
        "sourceRel": "frontend/infra/idl/idl-parser/README.md"
      },
      {
        "title": "@coze-arch/idl2ts-cli",
        "rel": "frontend-infra-idl-idl2ts-cli",
        "sourceRel": "frontend/infra/idl/idl2ts-cli/README.md"
      },
      {
        "title": "@coze-arch/idl2ts-generator",
        "rel": "frontend-infra-idl-idl2ts-generator",
        "sourceRel": "frontend/infra/idl/idl2ts-generator/README.md"
      },
      {
        "title": "@coze-arch/idl2ts-helper",
        "rel": "frontend-infra-idl-idl2ts-helper",
        "sourceRel": "frontend/infra/idl/idl2ts-helper/README.md"
      },
      {
        "title": "@coze-arch/idl2ts-plugin",
        "rel": "frontend-infra-idl-idl2ts-plugin",
        "sourceRel": "frontend/infra/idl/idl2ts-plugin/README.md"
      },
      {
        "title": "@coze-arch/idl2ts-runtime",
        "rel": "frontend-infra-idl-idl2ts-runtime",
        "sourceRel": "frontend/infra/idl/idl2ts-runtime/README.md"
      },
      {
        "title": "@coze-arch/pkg-root-webpack-plugin",
        "rel": "frontend-infra-plugins-pkg-root-webpack-plugin",
        "sourceRel": "frontend/infra/plugins/pkg-root-webpack-plugin/README.md"
      },
      {
        "title": "@coze-arch/postcss-plugin",
        "rel": "frontend-infra-plugins-postcss-plugin",
        "sourceRel": "frontend/infra/plugins/postcss-plugin/README.md"
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
        "rel": "delivery-PROMPT-RUN-MANIFEST",
        "sourceRel": "delivery/PROMPT-RUN-MANIFEST.md"
      },
      {
        "title": "测试报告与已知限制",
        "rel": "delivery-TEST-REPORT",
        "sourceRel": "delivery/TEST-REPORT.md"
      },
      {
        "title": "Prompt 运行回放与证据说明",
        "rel": "docs-prompt-run-provenance",
        "sourceRel": "docs/prompt-run-provenance.md"
      },
      {
        "title": "中国宠物食品行业首次汇报",
        "rel": "prompts-runs-prompt-001-chatgpt-5-6-sol-20260731-client_report",
        "sourceRel": "prompts/runs/prompt-001-chatgpt-5-6-sol-20260731/client_report.md"
      },
      {
        "title": "报销 SaaS 竞品决策预览",
        "rel": "prompts-runs-prompt-002-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-002-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "制造业数字化政策高管简报预览",
        "rel": "prompts-runs-prompt-003-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-003-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "消息队列选型结论预览",
        "rel": "prompts-runs-prompt-004-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-004-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "无糖气泡茶上市测算预览",
        "rel": "prompts-runs-prompt-005-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-005-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "大语言模型幻觉缓解综述工作底稿",
        "rel": "prompts-runs-prompt-006-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-006-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "Pre-A 跨境物流 SaaS 尽调备忘录预览",
        "rel": "prompts-runs-prompt-007-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-007-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "新款吹风机发热舆情简报预览",
        "rel": "prompts-runs-prompt-008-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-008-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "记账 App 流失用户洞察预览",
        "rel": "prompts-runs-prompt-009-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-009-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "AI Agent 对企业软件影响：演讲要点预览",
        "rel": "prompts-runs-prompt-010-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-010-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "六区销售表清洗结果预览",
        "rel": "prompts-runs-prompt-011-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-011-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "Q3 销售复盘：管理层结论预览",
        "rel": "prompts-runs-prompt-012-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-012-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "物流成本图表集编排预览",
        "rel": "prompts-runs-prompt-013-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-013-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "消费者问卷当晚快报预览",
        "rel": "prompts-runs-prompt-014-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-014-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "三表联读分析预览",
        "rel": "prompts-runs-prompt-015-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-015-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "注册改版 A/B 实验解读预览",
        "rel": "prompts-runs-prompt-016-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-016-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "经营周报试跑 · 2026-W30",
        "rel": "prompts-runs-prompt-017-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-017-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "支付异常检测结果预览",
        "rel": "prompts-runs-prompt-018-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-018-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "会员 RFM 分层预览",
        "rel": "prompts-runs-prompt-019-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-019-chatgpt-5-6-sol-20260731/output.md"
      },
      {
        "title": "App 下单漏斗分析预览",
        "rel": "prompts-runs-prompt-020-chatgpt-5-6-sol-20260731-output",
        "sourceRel": "prompts/runs/prompt-020-chatgpt-5-6-sol-20260731/output.md"
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
        "title": "claude-code harness",
        "rel": "configs-harnesses-claude-code-CONFIG",
        "sourceRel": "configs/harnesses/claude-code/CONFIG.md"
      },
      {
        "title": "CodeBuddy Code (cbc) harness",
        "rel": "configs-harnesses-codebuddy-code-CONFIG",
        "sourceRel": "configs/harnesses/codebuddy-code/CONFIG.md"
      },
      {
        "title": "Adding / adjusting a harness",
        "rel": "configs-harnesses-HARNESS_AUTHORING",
        "sourceRel": "configs/harnesses/HARNESS_AUTHORING.md"
      },
      {
        "title": "Configuration system",
        "rel": "configs",
        "sourceRel": "configs/README.md"
      },
      {
        "title": "配置体系",
        "rel": "configs-README.zh",
        "sourceRel": "configs/README.zh.md"
      },
      {
        "title": "Datasets",
        "rel": "datasets",
        "sourceRel": "datasets/README.md"
      },
      {
        "title": "WorkBuddy Bench（腾讯官方评测集）",
        "rel": "README.zh",
        "sourceRel": "README.zh.md"
      },
      {
        "title": "proxy — protocol translation & parameter injection",
        "rel": "src-workbuddy_bench-proxy",
        "sourceRel": "src/workbuddy_bench/proxy/README.md"
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
        "title": "导学：环境配置与工具准备",
        "rel": "00_Introduction-README_CN",
        "sourceRel": "00_Introduction/README_CN.md"
      },
      {
        "title": "00Introduction: Environment Setup",
        "rel": "00_Introduction",
        "sourceRel": "00_Introduction/README.md"
      },
      {
        "title": "FuFan-VibeCodingCourse",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "React + TypeScript + Vite",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson01_Dev_Workflow_and_Environment-chatgpt-clone-frontend",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson01_Dev_Workflow_and_Environment/chatgpt-clone/frontend/README.md"
      },
      {
        "title": "类ChatGPT对话系统架构规划",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson01_Dev_Workflow_and_Environment-Courseware-02_课程资料-plans-chatgpt_clone_plan_82c449d6.plan",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson01_Dev_Workflow_and_Environment/Courseware/02_课程资料/plans/chatgpt_clone_plan_82c449d6.plan.md"
      },
      {
        "title": "DeepSeek 智能对话系统 - 分阶段实施计划",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson01_Dev_Workflow_and_Environment-Courseware-02_课程资料-plans-deepseek_chat_system_d15b7da2.plan",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson01_Dev_Workflow_and_Environment/Courseware/02_课程资料/plans/deepseek_chat_system_d15b7da2.plan.md"
      },
      {
        "title": "Vibe Coding AI 编程范式与快速上手实践",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson01_Dev_Workflow_and_Environment-Courseware-README_CN",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson01_Dev_Workflow_and_Environment/Courseware/README_CN.md"
      },
      {
        "title": "Vibe Coding AI Programming Paradigm and Hands-on Practice",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson01_Dev_Workflow_and_Environment-Courseware",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson01_Dev_Workflow_and_Environment/Courseware/README.md"
      },
      {
        "title": "从零开发智能数据分析助理",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson02_LLM_API_and_Data_Assistant-Courseware-README_CN",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson02_LLM_API_and_Data_Assistant/Courseware/README_CN.md"
      },
      {
        "title": "Building an Intelligent Data Analysis Assistant from Scratch",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson02_LLM_API_and_Data_Assistant-Courseware",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson02_LLM_API_and_Data_Assistant/Courseware/README.md"
      },
      {
        "title": "Data Analysis Assistant - Backend",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson02_LLM_API_and_Data_Assistant-NL2SQLAgent-backend",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson02_LLM_API_and_Data_Assistant/NL2SQLAgent/backend/README.md"
      },
      {
        "title": "Data Analysis Assistant - Frontend",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson02_LLM_API_and_Data_Assistant-NL2SQLAgent-frontend",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson02_LLM_API_and_Data_Assistant/NL2SQLAgent/frontend/README.md"
      },
      {
        "title": "智能数据分析助理",
        "rel": "Stage1_AI_Programming_Fundamentals-Lesson02_LLM_API_and_Data_Assistant-NL2SQLAgent",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/Lesson02_LLM_API_and_Data_Assistant/NL2SQLAgent/README.md"
      },
      {
        "title": "阶段一：AI 编程基础",
        "rel": "Stage1_AI_Programming_Fundamentals-README_CN",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/README_CN.md"
      },
      {
        "title": "Stage 1: AI Programming Fundamentals",
        "rel": "Stage1_AI_Programming_Fundamentals",
        "sourceRel": "Stage1_AI_Programming_Fundamentals/README.md"
      },
      {
        "title": "Lesson 03 & 04: OpenClaw 源码架构拆解与二次开发 · 搭建数字员工",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson03_OpenClaw_Architecture_Digital_Employee-README_CN",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson03_OpenClaw_Architecture_Digital_Employee/README_CN.md"
      },
      {
        "title": "Lesson 03 & 04: OpenClaw Source Architecture & Secondary Development — Building a Digital Employee",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson03_OpenClaw_Architecture_Digital_Employee",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson03_OpenClaw_Architecture_Digital_Employee/README.md"
      },
      {
        "title": "客户端与 Web UI 的关系说明",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-客户端与UI关系说明",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/客户端与UI关系说明.md"
      },
      {
        "title": "OpenClaw 数据流详解",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-数据流说明",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/数据流说明.md"
      },
      {
        "title": "OpenClaw 项目整体架构说明",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-系统架构说明",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/系统架构说明.md"
      },
      {
        "title": "Agent、Channels 和 Plugins 三者关系详解",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-Agent-Channels-Plugins关系说明",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/Agent-Channels-Plugins关系说明.md"
      },
      {
        "title": "Channel 独立性说明：每个外部服务都有独立的 Channel",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-Channel独立性说明",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/Channel独立性说明.md"
      },
      {
        "title": "Channel 统一接口规范说明",
        "rel": "Stage2_Cursor_Deep_Dive-Lesson04_OpenClaw_Custom_Dev_Full_Process-02_系统规范文档-architecture-overview-1.0-Channel统一接口规范",
        "sourceRel": "Stage2_Cursor_Deep_Dive/Lesson04_OpenClaw_Custom_Dev_Full_Process/02_系统规范文档/architecture-overview-1.0/Channel统一接口规范.md"
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
      },
      {
        "title": "第 1 周——提示技术",
        "rel": "Assignments-week1-assignment",
        "sourceRel": "Assignments/week1/assignment.md"
      },
      {
        "title": "动手学 CS146S 中文版",
        "rel": "Assignments-week1",
        "sourceRel": "Assignments/week1/README.md"
      },
      {
        "title": "第 2 周——行动项提取器",
        "rel": "Assignments-week2-assignment",
        "sourceRel": "Assignments/week2/assignment.md"
      },
      {
        "title": "第 2 周：行动项提取器",
        "rel": "Assignments-week2",
        "sourceRel": "Assignments/week2/README.md"
      },
      {
        "title": "第 2 周作业报告",
        "rel": "Assignments-week2-writeup",
        "sourceRel": "Assignments/week2/writeup.md"
      },
      {
        "title": "第 3 周——构建自定义 MCP Server",
        "rel": "Assignments-week3-assignment",
        "sourceRel": "Assignments/week3/assignment.md"
      },
      {
        "title": "第 3 周：GitHub MCP Server",
        "rel": "Assignments-week3",
        "sourceRel": "Assignments/week3/README.md"
      },
      {
        "title": "第 4 周——现实世界中的自主编码智能体",
        "rel": "Assignments-week4-assignment",
        "sourceRel": "Assignments/week4/assignment.md"
      },
      {
        "title": "Week 4 repository guide",
        "rel": "Assignments-week4-CLAUDE",
        "sourceRel": "Assignments/week4/CLAUDE.md"
      },
      {
        "title": "API reference",
        "rel": "Assignments-week4-docs-API",
        "sourceRel": "Assignments/week4/docs/API.md"
      },
      {
        "title": "仓库任务清单",
        "rel": "Assignments-week4-docs-TASKS",
        "sourceRel": "Assignments/week4/docs/TASKS.md"
      },
      {
        "title": "Week 4：开发者指挥中心",
        "rel": "Assignments-week4",
        "sourceRel": "Assignments/week4/README.md"
      },
      {
        "title": "第 4 周书面报告",
        "rel": "Assignments-week4-writeup",
        "sourceRel": "Assignments/week4/writeup.md"
      },
      {
        "title": "第 5 周——使用 Warp 进行智能体式开发",
        "rel": "Assignments-week5-assignment",
        "sourceRel": "Assignments/week5/assignment.md"
      },
      {
        "title": "代码仓库任务",
        "rel": "Assignments-week5-docs-TASKS",
        "sourceRel": "Assignments/week5/docs/TASKS.md"
      },
      {
        "title": "第 5 周：智能体驱动的全栈开发",
        "rel": "Assignments-week5",
        "sourceRel": "Assignments/week5/README.md"
      },
      {
        "title": "第 5 周书面报告",
        "rel": "Assignments-week5-writeup",
        "sourceRel": "Assignments/week5/writeup.md"
      },
      {
        "title": "第 6 周——使用 Semgrep 扫描并修复漏洞",
        "rel": "Assignments-week6-assignment",
        "sourceRel": "Assignments/week6/assignment.md"
      },
      {
        "title": "第 6 周：用 Semgrep 修复安全问题",
        "rel": "Assignments-week6",
        "sourceRel": "Assignments/week6/README.md"
      },
      {
        "title": "第 6 周作业报告",
        "rel": "Assignments-week6-writeup",
        "sourceRel": "Assignments/week6/writeup.md"
      },
      {
        "title": "第 7 周——使用 Graphite 探索 AI 代码审查",
        "rel": "Assignments-week7-assignment",
        "sourceRel": "Assignments/week7/assignment.md"
      },
      {
        "title": "第 7 周——任务清单",
        "rel": "Assignments-week7-docs-TASKS",
        "sourceRel": "Assignments/week7/docs/TASKS.md"
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
        "rel": "docs-zh-cn-appendix-2-development-tools-debugging-art-2",
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
        "rel": "docs-Advanced-01-environment-setup",
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
        "rel": "docs-Advanced-02-ai-tuning-guide",
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
        "rel": "docs-Advanced-03-prd-doc-driven",
        "sourceRel": "docs/Advanced/03-prd-doc-driven/index.md"
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
        "title": "AI Agent Security",
        "rel": "docs-ai-agent-security",
        "sourceRel": "docs/ai/agent-security.md"
      },
      {
        "title": "Modern AI build paths",
        "rel": "docs-ai-build-paths",
        "sourceRel": "docs/ai/build-paths.md"
      },
      {
        "title": "AI Feature Patterns",
        "rel": "docs-ai-feature-patterns",
        "sourceRel": "docs/ai/feature-patterns.md"
      },
      {
        "title": "Vibe Workflow chat context pack",
        "rel": "docs-context-pack",
        "sourceRel": "docs/context-pack.md"
      },
      {
        "title": "Freshness Policy",
        "rel": "docs-maintenance-freshness-policy",
        "sourceRel": "docs/maintenance/freshness-policy.md"
      },
      {
        "title": "Reliability release evidence and remaining work",
        "rel": "docs-maintenance-reliability-release",
        "sourceRel": "docs/maintenance/reliability-release.md"
      },
      {
        "title": "Docs",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Agent Tooling Compatibility",
        "rel": "docs-tools-agent-tooling-compatibility",
        "sourceRel": "docs/tools/agent-tooling-compatibility.md"
      },
      {
        "title": "Claude Subagents And Skills",
        "rel": "docs-tools-claude-agent-teams",
        "sourceRel": "docs/tools/claude-agent-teams.md"
      },
      {
        "title": "Cursor Rules And Background Agents",
        "rel": "docs-tools-cursor-cloud-agents",
        "sourceRel": "docs/tools/cursor-cloud-agents.md"
      },
      {
        "title": "Builder Exit Review",
        "rel": "docs-workflow-builder-exit-review",
        "sourceRel": "docs/workflow/builder-exit-review.md"
      },
      {
        "title": "Project document contract",
        "rel": "docs-workflow-document-contract",
        "sourceRel": "docs/workflow/document-contract.md"
      },
      {
        "title": "Golden Path Checklist",
        "rel": "docs-workflow-golden-path-checklist",
        "sourceRel": "docs/workflow/golden-path-checklist.md"
      },
      {
        "title": "Worked workflow recipes",
        "rel": "docs-workflow-recipes",
        "sourceRel": "docs/workflow/recipes.md"
      },
      {
        "title": "Worked Example: Reddit to AI",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Reconstructed example progress",
        "rel": "examples-reddit-to-ai-agent_docs-reconstructed-progress",
        "sourceRel": "examples/reddit-to-ai/agent_docs/reconstructed-progress.md"
      },
      {
        "title": "System Memory & Context 🧠",
        "rel": "examples-reddit-to-ai-MEMORY",
        "sourceRel": "examples/reddit-to-ai/MEMORY.md"
      },
      {
        "title": "Product Requirements Document: Reddit to AI MVP",
        "rel": "examples-reddit-to-ai-PRD-reddit-to-ai-MVP",
        "sourceRel": "examples/reddit-to-ai/PRD-reddit-to-ai-MVP.md"
      },
      {
        "title": "Deep Research: Reddit to AI",
        "rel": "examples-reddit-to-ai-research-reddit-to-ai",
        "sourceRel": "examples/reddit-to-ai/research-reddit-to-ai.md"
      },
      {
        "title": "Technical Design Document: Reddit to AI MVP",
        "rel": "examples-reddit-to-ai-TechDesign-reddit-to-ai-MVP",
        "sourceRel": "examples/reddit-to-ai/TechDesign-reddit-to-ai-MVP.md"
      },
      {
        "title": "Part 1 — Deep Research Prompt Builder",
        "rel": "part1-deepresearch",
        "sourceRel": "part1-deepresearch.md"
      },
      {
        "title": "Part 2 — Product Requirements Document (PRD) Generator",
        "rel": "part2-prd-mvp",
        "sourceRel": "part2-prd-mvp.md"
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
        "title": "01 · Claude Code 简介",
        "rel": "claude-code-01-what-is-claude-code",
        "sourceRel": "claude-code/01-what-is-claude-code.md"
      },
      {
        "title": "02 · 安装与使用",
        "rel": "claude-code-02-install",
        "sourceRel": "claude-code/02-install.md"
      },
      {
        "title": "03 · Claude Code 如何工作",
        "rel": "claude-code-03-how-it-works",
        "sourceRel": "claude-code/03-how-it-works.md"
      },
      {
        "title": "04 · API 配置：订阅登录还是 API key，怎么选、怎么切",
        "rel": "claude-code-04-api-config",
        "sourceRel": "claude-code/04-api-config.md"
      },
      {
        "title": "05 · 接入第三方 / 国产模型",
        "rel": "claude-code-05-third-party-models",
        "sourceRel": "claude-code/05-third-party-models.md"
      },
      {
        "title": "06 · Coding Plan：订阅套餐与计费",
        "rel": "claude-code-06-coding-plan",
        "sourceRel": "claude-code/06-coding-plan.md"
      },
      {
        "title": "07 · 第一次使用：跑通第一个例子",
        "rel": "claude-code-07-first-run",
        "sourceRel": "claude-code/07-first-run.md"
      },
      {
        "title": "08 · VS Code 集成",
        "rel": "claude-code-08-vscode",
        "sourceRel": "claude-code/08-vscode.md"
      },
      {
        "title": "09 · JetBrains 集成",
        "rel": "claude-code-09-jetbrains",
        "sourceRel": "claude-code/09-jetbrains.md"
      },
      {
        "title": "10 · 桌面 app（Desktop）",
        "rel": "claude-code-10-desktop",
        "sourceRel": "claude-code/10-desktop.md"
      },
      {
        "title": "11 · 网页版与云端：把 Claude Code 装进浏览器和手机",
        "rel": "claude-code-11-web-and-cloud",
        "sourceRel": "claude-code/11-web-and-cloud.md"
      },
      {
        "title": "12 · 项目初始化：用 /init 一键生成 CLAUDE.md",
        "rel": "claude-code-12-project-init",
        "sourceRel": "claude-code/12-project-init.md"
      },
      {
        "title": "13 · 项目结构：Claude Code 在你项目里都放了什么",
        "rel": "claude-code-13-project-structure",
        "sourceRel": "claude-code/13-project-structure.md"
      },
      {
        "title": "14 · 交互界面与快捷键：把手放对地方",
        "rel": "claude-code-14-interface-and-shortcuts",
        "sourceRel": "claude-code/14-interface-and-shortcuts.md"
      },
      {
        "title": "15 · 怎么提问和给指令：把话说到 Claude 心坎里",
        "rel": "claude-code-15-prompting",
        "sourceRel": "claude-code/15-prompting.md"
      },
      {
        "title": "16 · 四个最常用的活儿：探索代码库、修 bug、重构、写测试",
        "rel": "claude-code-16-common-workflows",
        "sourceRel": "claude-code/16-common-workflows.md"
      },
      {
        "title": "17 · 图片与多模态：贴张截图，它就懂了",
        "rel": "claude-code-17-images-multimodal",
        "sourceRel": "claude-code/17-images-multimodal.md"
      },
      {
        "title": "18 · CLAUDE.md 使用指南：把项目规矩写进它的记忆",
        "rel": "claude-code-18-claude-md-guide",
        "sourceRel": "claude-code/18-claude-md-guide.md"
      },
      {
        "title": "19 · 上下文管理：别让它「失忆」也别烧爆 token",
        "rel": "claude-code-19-context-management",
        "sourceRel": "claude-code/19-context-management.md"
      },
      {
        "title": "20 · 权限配置：放多松、收多紧，你说了算",
        "rel": "claude-code-20-permissions",
        "sourceRel": "claude-code/20-permissions.md"
      },
      {
        "title": "21 · 安全与风险边界：到底该不该信任 AI 碰你的代码",
        "rel": "claude-code-21-security",
        "sourceRel": "claude-code/21-security.md"
      },
      {
        "title": "22 · MCP：给 Claude 接上外部世界",
        "rel": "claude-code-22-mcp",
        "sourceRel": "claude-code/22-mcp.md"
      },
      {
        "title": "23 · 子代理（Subagents）：把活儿外包出去，别什么都自己扛",
        "rel": "claude-code-23-subagents",
        "sourceRel": "claude-code/23-subagents.md"
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
        "rel": "chapters-01-what-is-vibe-coding",
        "sourceRel": "chapters/01-what-is-vibe-coding.md"
      },
      {
        "title": "第二章：你需要准备什么",
        "rel": "chapters-02-what-you-need",
        "sourceRel": "chapters/02-what-you-need.md"
      },
      {
        "title": "第三章：AI 编程工具全景",
        "rel": "chapters-03-ai-tools-landscape",
        "sourceRel": "chapters/03-ai-tools-landscape.md"
      },
      {
        "title": "第四章：选择你的第一个工具",
        "rel": "chapters-04-your-first-tool",
        "sourceRel": "chapters/04-your-first-tool.md"
      },
      {
        "title": "第五章：学会和 AI 对话——Prompt 的艺术",
        "rel": "chapters-05-art-of-prompting",
        "sourceRel": "chapters/05-art-of-prompting.md"
      },
      {
        "title": "第六章：从零开始做一个项目",
        "rel": "chapters-06-build-your-first-project",
        "sourceRel": "chapters/06-build-your-first-project.md"
      },
      {
        "title": "第七章：当 AI 搞砸了怎么办",
        "rel": "chapters-07-when-ai-goes-wrong",
        "sourceRel": "chapters/07-when-ai-goes-wrong.md"
      },
      {
        "title": "第八章：进阶技巧",
        "rel": "chapters-08-advanced-techniques",
        "sourceRel": "chapters/08-advanced-techniques.md"
      },
      {
        "title": "第九章：实战案例展示",
        "rel": "chapters-09-real-world-examples",
        "sourceRel": "chapters/09-real-world-examples.md"
      },
      {
        "title": "第十章：下一步去哪里",
        "rel": "chapters-10-whats-next",
        "sourceRel": "chapters/10-whats-next.md"
      },
      {
        "title": "附录：Claude Code + 智谱 GLM 安装配置指南",
        "rel": "chapters-appendix-claude-code-glm-setup",
        "sourceRel": "chapters/appendix-claude-code-glm-setup.md"
      },
      {
        "title": "Vibe Coding 教程设计文档",
        "rel": "docs-plans-2026-02-20-vibe-coding-tutorial-design",
        "sourceRel": "docs/plans/2026-02-20-vibe-coding-tutorial-design.md"
      },
      {
        "title": "Vibe Coding 教程实施计划",
        "rel": "docs-plans-2026-02-20-vibe-coding-tutorial-plan",
        "sourceRel": "docs/plans/2026-02-20-vibe-coding-tutorial-plan.md"
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
        "rel": "AI-关于DeepSeek",
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
        "rel": "AI-AI项目教程",
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
        "title": "Backers",
        "rel": "BACKERS",
        "sourceRel": "BACKERS.md"
      },
      {
        "title": "Book Pipeline",
        "rel": "book",
        "sourceRel": "book/README.md"
      },
      {
        "title": "Learn Claude Certifications From GitHub",
        "rel": "certifications-claude-GETTING_STARTED",
        "sourceRel": "certifications/claude/GETTING_STARTED.md"
      },
      {
        "title": "Study the Decisions, Not the Vocabulary",
        "rel": "certifications-claude-lessons-00-certification-strategy-docs-en",
        "sourceRel": "certifications/claude/lessons/00-certification-strategy/docs/en.md"
      },
      {
        "title": "Choose the Smallest Surface That Can Carry the Work",
        "rel": "certifications-claude-lessons-01-claude-product-and-model-landscape-docs-en",
        "sourceRel": "certifications/claude/lessons/01-claude-product-and-model-landscape/docs/en.md"
      },
      {
        "title": "Spend Capability Where Failure Is Expensive",
        "rel": "certifications-claude-lessons-02-model-selection-and-token-economics-docs-en",
        "sourceRel": "certifications/claude/lessons/02-model-selection-and-token-economics/docs/en.md"
      },
      {
        "title": "Turn a Request Into a Testable Contract",
        "rel": "certifications-claude-lessons-03-prompting-and-task-decomposition-docs-en",
        "sourceRel": "certifications/claude/lessons/03-prompting-and-task-decomposition/docs/en.md"
      },
      {
        "title": "Put Each Fact in the Right Kind of Context",
        "rel": "certifications-claude-lessons-04-context-knowledge-memory-and-caching-docs-en",
        "sourceRel": "certifications/claude/lessons/04-context-knowledge-memory-and-caching/docs/en.md"
      },
      {
        "title": "Validate the Claim, Not the Confidence",
        "rel": "certifications-claude-lessons-05-output-evaluation-and-validation-docs-en",
        "sourceRel": "certifications/claude/lessons/05-output-evaluation-and-validation/docs/en.md"
      },
      {
        "title": "Put Authority Around Capability",
        "rel": "certifications-claude-lessons-06-governance-safety-and-responsible-use-docs-en",
        "sourceRel": "certifications/claude/lessons/06-governance-safety-and-responsible-use/docs/en.md"
      },
      {
        "title": "Design the Handoff Before the Automation",
        "rel": "certifications-claude-lessons-07-workflow-design-and-human-handoffs-docs-en",
        "sourceRel": "certifications/claude/lessons/07-workflow-design-and-human-handoffs/docs/en.md"
      },
      {
        "title": "The Messages API Is a State Machine",
        "rel": "certifications-claude-lessons-08-messages-api-and-application-lifecycle-docs-en",
        "sourceRel": "certifications/claude/lessons/08-messages-api-and-application-lifecycle/docs/en.md"
      },
      {
        "title": "Structured Output Is an Untrusted Contract",
        "rel": "certifications-claude-lessons-09-structured-output-and-defensive-parsing-docs-en",
        "sourceRel": "certifications/claude/lessons/09-structured-output-and-defensive-parsing/docs/en.md"
      },
      {
        "title": "A Tool Loop Is Controlled Delegation",
        "rel": "certifications-claude-lessons-10-tool-use-and-agentic-loops-docs-en",
        "sourceRel": "certifications/claude/lessons/10-tool-use-and-agentic-loops/docs/en.md"
      },
      {
        "title": "MCP Separates Capability From Host",
        "rel": "certifications-claude-lessons-11-mcp-server-design-and-integration-docs-en",
        "sourceRel": "certifications/claude/lessons/11-mcp-server-design-and-integration/docs/en.md"
      },
      {
        "title": "The Agent SDK Is a Harness, Not Permission",
        "rel": "certifications-claude-lessons-12-claude-agent-sdk-and-hooks-docs-en",
        "sourceRel": "certifications/claude/lessons/12-claude-agent-sdk-and-hooks/docs/en.md"
      },
      {
        "title": "Security Lives Outside the Prompt",
        "rel": "certifications-claude-lessons-13-application-security-and-secrets-docs-en",
        "sourceRel": "certifications/claude/lessons/13-application-security-and-secrets/docs/en.md"
      },
      {
        "title": "Evals Turn Agent Behavior Into Engineering Evidence",
        "rel": "certifications-claude-lessons-14-evals-testing-debugging-and-observability-docs-en",
        "sourceRel": "certifications/claude/lessons/14-evals-testing-debugging-and-observability/docs/en.md"
      },
      {
        "title": "Claude Code Scales Through Shared Constraints",
        "rel": "certifications-claude-lessons-15-claude-code-for-development-teams-docs-en",
        "sourceRel": "certifications/claude/lessons/15-claude-code-for-development-teams/docs/en.md"
      },
      {
        "title": "Team Configuration Review: Support Router",
        "rel": "certifications-claude-lessons-15-claude-code-for-development-teams-outputs-team-configuration-review",
        "sourceRel": "certifications/claude/lessons/15-claude-code-for-development-teams/outputs/team-configuration-review.md"
      },
      {
        "title": "Multi-Agent Orchestration and Delegation",
        "rel": "certifications-claude-lessons-16-multi-agent-orchestration-and-delegation-docs-en",
        "sourceRel": "certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/docs/en.md"
      },
      {
        "title": "Orchestration Contract: Runtime Migration Decision",
        "rel": "certifications-claude-lessons-16-multi-agent-orchestration-and-delegation-outputs-orchestration-contract",
        "sourceRel": "certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/outputs/orchestration-contract.md"
      },
      {
        "title": "Agent SDK Sessions, Subagents, and Context",
        "rel": "certifications-claude-lessons-17-agent-sdk-sessions-subagents-and-context-docs-en",
        "sourceRel": "certifications/claude/lessons/17-agent-sdk-sessions-subagents-and-context/docs/en.md"
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
        "title": "在 GitHub 上学习 Claude 认证",
        "rel": "certifications-claude-GETTING_STARTED",
        "sourceRel": "certifications/claude/GETTING_STARTED.md"
      },
      {
        "title": "学决策，不背词汇",
        "rel": "certifications-claude-lessons-00-certification-strategy-docs-zh",
        "sourceRel": "certifications/claude/lessons/00-certification-strategy/docs/zh.md"
      },
      {
        "title": "选择能承载工作的最小载体",
        "rel": "certifications-claude-lessons-01-claude-product-and-model-landscape-docs-zh",
        "sourceRel": "certifications/claude/lessons/01-claude-product-and-model-landscape/docs/zh.md"
      },
      {
        "title": "把能力花在失败代价高的地方",
        "rel": "certifications-claude-lessons-02-model-selection-and-token-economics-docs-zh",
        "sourceRel": "certifications/claude/lessons/02-model-selection-and-token-economics/docs/zh.md"
      },
      {
        "title": "把请求变成可测试的合约",
        "rel": "certifications-claude-lessons-03-prompting-and-task-decomposition-docs-zh",
        "sourceRel": "certifications/claude/lessons/03-prompting-and-task-decomposition/docs/zh.md"
      },
      {
        "title": "把每项事实放进正确的上下文",
        "rel": "certifications-claude-lessons-04-context-knowledge-memory-and-caching-docs-zh",
        "sourceRel": "certifications/claude/lessons/04-context-knowledge-memory-and-caching/docs/zh.md"
      },
      {
        "title": "验证主张，而非置信度",
        "rel": "certifications-claude-lessons-05-output-evaluation-and-validation-docs-zh",
        "sourceRel": "certifications/claude/lessons/05-output-evaluation-and-validation/docs/zh.md"
      },
      {
        "title": "让能力受权责边界约束",
        "rel": "certifications-claude-lessons-06-governance-safety-and-responsible-use-docs-zh",
        "sourceRel": "certifications/claude/lessons/06-governance-safety-and-responsible-use/docs/zh.md"
      },
      {
        "title": "自动化前先设计交接",
        "rel": "certifications-claude-lessons-07-workflow-design-and-human-handoffs-docs-zh",
        "sourceRel": "certifications/claude/lessons/07-workflow-design-and-human-handoffs/docs/zh.md"
      },
      {
        "title": "Messages API 是一台状态机",
        "rel": "certifications-claude-lessons-08-messages-api-and-application-lifecycle-docs-zh",
        "sourceRel": "certifications/claude/lessons/08-messages-api-and-application-lifecycle/docs/zh.md"
      },
      {
        "title": "结构化输出是不可信的契约",
        "rel": "certifications-claude-lessons-09-structured-output-and-defensive-parsing-docs-zh",
        "sourceRel": "certifications/claude/lessons/09-structured-output-and-defensive-parsing/docs/zh.md"
      },
      {
        "title": "工具循环是受控委托",
        "rel": "certifications-claude-lessons-10-tool-use-and-agentic-loops-docs-zh",
        "sourceRel": "certifications/claude/lessons/10-tool-use-and-agentic-loops/docs/zh.md"
      },
      {
        "title": "MCP 将能力与宿主解耦",
        "rel": "certifications-claude-lessons-11-mcp-server-design-and-integration-docs-zh",
        "sourceRel": "certifications/claude/lessons/11-mcp-server-design-and-integration/docs/zh.md"
      },
      {
        "title": "Agent SDK 提供运行框架，权限另行控制",
        "rel": "certifications-claude-lessons-12-claude-agent-sdk-and-hooks-docs-zh",
        "sourceRel": "certifications/claude/lessons/12-claude-agent-sdk-and-hooks/docs/zh.md"
      },
      {
        "title": "安全边界在 prompt 之外",
        "rel": "certifications-claude-lessons-13-application-security-and-secrets-docs-zh",
        "sourceRel": "certifications/claude/lessons/13-application-security-and-secrets/docs/zh.md"
      },
      {
        "title": "Eval 将 Agent 行为变成工程证据",
        "rel": "certifications-claude-lessons-14-evals-testing-debugging-and-observability-docs-zh",
        "sourceRel": "certifications/claude/lessons/14-evals-testing-debugging-and-observability/docs/zh.md"
      },
      {
        "title": "Claude Code 靠共享约束支持规模化协作",
        "rel": "certifications-claude-lessons-15-claude-code-for-development-teams-docs-zh",
        "sourceRel": "certifications/claude/lessons/15-claude-code-for-development-teams/docs/zh.md"
      },
      {
        "title": "团队配置审查：Support Router",
        "rel": "certifications-claude-lessons-15-claude-code-for-development-teams-outputs-team-configuration-review",
        "sourceRel": "certifications/claude/lessons/15-claude-code-for-development-teams/outputs/team-configuration-review.md"
      },
      {
        "title": "多 Agent 编排与委派",
        "rel": "certifications-claude-lessons-16-multi-agent-orchestration-and-delegation-docs-zh",
        "sourceRel": "certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/docs/zh.md"
      },
      {
        "title": "编排合约：Runtime 迁移决策",
        "rel": "certifications-claude-lessons-16-multi-agent-orchestration-and-delegation-outputs-orchestration-contract",
        "sourceRel": "certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/outputs/orchestration-contract.md"
      },
      {
        "title": "Agent SDK Session、Subagent 与上下文",
        "rel": "certifications-claude-lessons-17-agent-sdk-sessions-subagents-and-context-docs-zh",
        "sourceRel": "certifications/claude/lessons/17-agent-sdk-sessions-subagents-and-context/docs/zh.md"
      },
      {
        "title": "Session 恢复数据包：客户端迁移",
        "rel": "certifications-claude-lessons-17-agent-sdk-sessions-subagents-and-context-outputs-session-recovery-packet",
        "sourceRel": "certifications/claude/lessons/17-agent-sdk-sessions-subagents-and-context/outputs/session-recovery-packet.md"
      },
      {
        "title": "Tool 合约、错误与渐进式发现",
        "rel": "certifications-claude-lessons-18-tool-contracts-errors-and-progressive-discovery-docs-zh",
        "sourceRel": "certifications/claude/lessons/18-tool-contracts-errors-and-progressive-discovery/docs/zh.md"
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
        "title": "VibeFast 文档",
        "rel": "BRAND",
        "sourceRel": "BRAND.md"
      },
      {
        "title": "Why I Started Building Seriously at 50",
        "rel": "en-00-why-i-started-at-50-en",
        "sourceRel": "en/00-why-i-started-at-50-en.md"
      },
      {
        "title": "What is Vibe Coding? A Complete Introduction",
        "rel": "en-01-what-is-vibecoding-en",
        "sourceRel": "en/01-what-is-vibecoding-en.md"
      },
      {
        "title": "Getting Started with Vibe Coding: Setting Up Your Development Environment from Scratch",
        "rel": "en-02-how-to-setup-vibecoding-environment-en",
        "sourceRel": "en/02-how-to-setup-vibecoding-environment-en.md"
      },
      {
        "title": "What is an API? Plain English Explanation of Frontend-Backend Communication",
        "rel": "en-03-what-is-api-frontend-backend-en",
        "sourceRel": "en/03-what-is-api-frontend-backend-en.md"
      },
      {
        "title": "What is JWT? Plain English Explanation of This Tech You Use Every Day",
        "rel": "en-04-what-is-jwt-authentication-en",
        "sourceRel": "en/04-what-is-jwt-authentication-en.md"
      },
      {
        "title": "The Best Way to Vibe Code on Cloudflare",
        "rel": "en-05-the-best-way-to-vibecoding-on-cloudflare-en",
        "sourceRel": "en/05-the-best-way-to-vibecoding-on-cloudflare-en.md"
      },
      {
        "title": "What's the Difference Between Cloudflare Workers and Traditional Servers?",
        "rel": "en-06-cloudflare-workers-vs-traditional-server-en",
        "sourceRel": "en/06-cloudflare-workers-vs-traditional-server-en.md"
      },
      {
        "title": "D1 Database Basics: Using AI to Design Your First Table",
        "rel": "en-07-cloudflare-d1-database-tutorial-en",
        "sourceRel": "en/07-cloudflare-d1-database-tutorial-en.md"
      },
      {
        "title": "R2 vs S3: Why I Don't Use AWS to Store Images",
        "rel": "en-08-cloudflare-r2-vs-aws-s3-en",
        "sourceRel": "en/08-cloudflare-r2-vs-aws-s3-en.md"
      },
      {
        "title": "What Are Environment Variables? Why You Can't Put API Keys in Code",
        "rel": "en-09-environment-variables-and-secrets-en",
        "sourceRel": "en/09-environment-variables-and-secrets-en.md"
      },
      {
        "title": "Git and GitHub Basics: Version Control Essentials for Vibe Coders",
        "rel": "en-10-git-and-github-version-control-en",
        "sourceRel": "en/10-git-and-github-version-control-en.md"
      },
      {
        "title": "Designing Beautiful UI with AI: A Complete Cursor Prompt Guide",
        "rel": "en-11-ai-frontend-design-with-cursor-en",
        "sourceRel": "en/11-ai-frontend-design-with-cursor-en.md"
      },
      {
        "title": "What is a Domain and DNS? What to Do After Buying a Domain",
        "rel": "en-12-domain-and-dns-setup-guide-en",
        "sourceRel": "en/12-domain-and-dns-setup-guide-en.md"
      },
      {
        "title": "Security Basics for Vibe Coders: Confirm These Before Going Live",
        "rel": "en-13-security-basics-for-vibe-coders-en",
        "sourceRel": "en/13-security-basics-for-vibe-coders-en.md"
      },
      {
        "title": "How to Discuss Projects with AI: Think First, Code Later",
        "rel": "en-14-how-to-discuss-with-ai-before-coding-en",
        "sourceRel": "en/14-how-to-discuss-with-ai-before-coding-en.md"
      },
      {
        "title": "How I Use Cursor to Take a Feature from Idea to Live",
        "rel": "en-15-cursor-workflow-from-idea-to-deploy-en",
        "sourceRel": "en/15-cursor-workflow-from-idea-to-deploy-en.md"
      },
      {
        "title": "5 Pitfalls I've Hit in Vibe Coding (and How to Avoid Them)",
        "rel": "en-16-vibe-coding-common-mistakes-en",
        "sourceRel": "en/16-vibe-coding-common-mistakes-en.md"
      },
      {
        "title": "How to Create a Vibe Coding Work Plan: From Requirements Analysis to AI Plan Mode",
        "rel": "en-17-vibe-coding-work-plan-and-ai-plan-mode-en",
        "sourceRel": "en/17-vibe-coding-work-plan-and-ai-plan-mode-en.md"
      },
      {
        "title": "Don’t Panic: Using AI to Read Error Messages and Fix Problems",
        "rel": "en-18-debug-and-errors-en",
        "sourceRel": "en/18-debug-and-errors-en.md"
      },
      {
        "title": "Why I Chose Cloudflare Over Vercel and AWS",
        "rel": "en-19-cloudflare-vs-vercel-vs-aws-en",
        "sourceRel": "en/19-cloudflare-vs-vercel-vs-aws-en.md"
      },
      {
        "title": "Stripe Payments: From Sandbox Testing to Going Live",
        "rel": "en-20-stripe-payment-complete-guide-en",
        "sourceRel": "en/20-stripe-payment-complete-guide-en.md"
      },
      {
        "title": "How to Test Your App: Let AI Generate curl Commands for Every Feature",
        "rel": "en-21-ai-testing-guide-en",
        "sourceRel": "en/21-ai-testing-guide-en.md"
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
        "title": "AI / LLM Integration Security",
        "rel": "vibe-security-references-ai-integration",
        "sourceRel": "vibe-security/references/ai-integration.md"
      },
      {
        "title": "Authentication & Authorization",
        "rel": "vibe-security-references-authentication",
        "sourceRel": "vibe-security/references/authentication.md"
      },
      {
        "title": "Data Access & Input Validation",
        "rel": "vibe-security-references-data-access",
        "sourceRel": "vibe-security/references/data-access.md"
      },
      {
        "title": "Database Access Control",
        "rel": "vibe-security-references-database-security",
        "sourceRel": "vibe-security/references/database-security.md"
      },
      {
        "title": "Deployment Security",
        "rel": "vibe-security-references-deployment",
        "sourceRel": "vibe-security/references/deployment.md"
      },
      {
        "title": "Mobile Security (React Native / Expo)",
        "rel": "vibe-security-references-mobile",
        "sourceRel": "vibe-security/references/mobile.md"
      },
      {
        "title": "Payment Security (Stripe)",
        "rel": "vibe-security-references-payments",
        "sourceRel": "vibe-security/references/payments.md"
      },
      {
        "title": "Rate Limiting & Abuse Prevention",
        "rel": "vibe-security-references-rate-limiting",
        "sourceRel": "vibe-security/references/rate-limiting.md"
      },
      {
        "title": "Secrets & Environment Variables",
        "rel": "vibe-security-references-secrets-and-env",
        "sourceRel": "vibe-security/references/secrets-and-env.md"
      },
      {
        "title": "Vibe Security（AI 编码安全技能）",
        "rel": "vibe-security-SKILL",
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
        "title": "Development Notes",
        "rel": "DEVELOPMENT",
        "sourceRel": "DEVELOPMENT.md"
      },
      {
        "title": "Community Bundles",
        "rel": "docs-community-bundles",
        "sourceRel": "docs/community/bundles.md"
      },
      {
        "title": "Community Extensions",
        "rel": "docs-community-extensions",
        "sourceRel": "docs/community/extensions.md"
      },
      {
        "title": "Community Friends",
        "rel": "docs-community-friends",
        "sourceRel": "docs/community/friends.md"
      },
      {
        "title": "Community",
        "rel": "docs-community-overview",
        "sourceRel": "docs/community/overview.md"
      },
      {
        "title": "Community Presets",
        "rel": "docs-community-presets",
        "sourceRel": "docs/community/presets.md"
      },
      {
        "title": "Community Walkthroughs",
        "rel": "docs-community-walkthroughs",
        "sourceRel": "docs/community/walkthroughs.md"
      },
      {
        "title": "Handling Complex Features",
        "rel": "docs-concepts-complex-features",
        "sourceRel": "docs/concepts/complex-features.md"
      },
      {
        "title": "What is Spec-Driven Development?",
        "rel": "docs-concepts-sdd",
        "sourceRel": "docs/concepts/sdd.md"
      },
      {
        "title": "Spec of Specs",
        "rel": "docs-concepts-spec-of-specs",
        "sourceRel": "docs/concepts/spec-of-specs.md"
      },
      {
        "title": "Spec Persistence Models",
        "rel": "docs-concepts-spec-persistence",
        "sourceRel": "docs/concepts/spec-persistence.md"
      },
      {
        "title": "Evolving Specs in Existing Projects",
        "rel": "docs-guides-evolving-specs",
        "sourceRel": "docs/guides/evolving-specs.md"
      },
      {
        "title": "Adopting Spec Kit in an Existing Project",
        "rel": "docs-guides-existing-projects",
        "sourceRel": "docs/guides/existing-projects.md"
      },
      {
        "title": "Using Spec Kit in a Monorepo",
        "rel": "docs-guides-monorepo",
        "sourceRel": "docs/guides/monorepo.md"
      },
      {
        "title": "History",
        "rel": "docs-history",
        "sourceRel": "docs/history.md"
      },
      {
        "title": "Enterprise / Air-Gapped Installation",
        "rel": "docs-install-air-gapped",
        "sourceRel": "docs/install/air-gapped.md"
      },
      {
        "title": "One-time Usage (uvx)",
        "rel": "docs-install-one-time",
        "sourceRel": "docs/install/one-time.md"
      },
      {
        "title": "Installing with pipx",
        "rel": "docs-install-pipx",
        "sourceRel": "docs/install/pipx.md"
      },
      {
        "title": "Installing from PyPI",
        "rel": "docs-install-pypi",
        "sourceRel": "docs/install/pypi.md"
      },
      {
        "title": "Installing uv",
        "rel": "docs-install-uv",
        "sourceRel": "docs/install/uv.md"
      },
      {
        "title": "Installation Guide",
        "rel": "docs-installation",
        "sourceRel": "docs/installation.md"
      },
      {
        "title": "Local Development Guide",
        "rel": "docs-local-development",
        "sourceRel": "docs/local-development.md"
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
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "VibeSDK Architecture Diagrams",
        "rel": "docs-architecture-diagrams",
        "sourceRel": "docs/architecture-diagrams.md"
      },
      {
        "title": "VibeSDK Developer Guide",
        "rel": "docs-llm",
        "sourceRel": "docs/llm.md"
      },
      {
        "title": "Legacy V1 Dev API Postman Collection",
        "rel": "docs-POSTMAN_COLLECTION_",
        "sourceRel": "docs/POSTMAN_COLLECTION_README.md"
      },
      {
        "title": "VibeSDK Setup Guide",
        "rel": "docs-setup",
        "sourceRel": "docs/setup.md"
      },
      {
        "title": "Cloudflare VibeSDK",
        "rel": "docs-usage-limits-ui",
        "sourceRel": "docs/usage-limits-ui.md"
      },
      {
        "title": "Publishing artifacts-viewer",
        "rel": "packages-artifacts-viewer-PUBLISH",
        "sourceRel": "packages/artifacts-viewer/PUBLISH.md"
      },
      {
        "title": "artifacts-viewer",
        "rel": "packages-artifacts-viewer",
        "sourceRel": "packages/artifacts-viewer/README.md"
      },
      {
        "title": "Cloudflare VibeSDK",
        "rel": "samplePrompts",
        "sourceRel": "samplePrompts.md"
      },
      {
        "title": "@cf-vibesdk/sdk",
        "rel": "sdk",
        "sourceRel": "sdk/README.md"
      },
      {
        "title": "Cloudflare VibeSDK",
        "rel": "sdk-test-README.test",
        "sourceRel": "sdk/test/README.test.md"
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
        "title": "音频生成调用指南",
        "rel": "docs-modalities-audio",
        "sourceRel": "docs/modalities/audio.md"
      },
      {
        "title": "代码生成 / 编程类模型",
        "rel": "docs-modalities-code-generation",
        "sourceRel": "docs/modalities/code-generation.md"
      },
      {
        "title": "Embeddings 向量调用指南",
        "rel": "docs-modalities-embeddings",
        "sourceRel": "docs/modalities/embeddings.md"
      },
      {
        "title": "图片生成调用指南",
        "rel": "docs-modalities-image-generation",
        "sourceRel": "docs/modalities/image-generation.md"
      },
      {
        "title": "文本类大模型调用指南",
        "rel": "docs-modalities-text-models",
        "sourceRel": "docs/modalities/text-models.md"
      },
      {
        "title": "视频生成调用指南",
        "rel": "docs-modalities-video-generation",
        "sourceRel": "docs/modalities/video-generation.md"
      },
      {
        "title": "视觉理解 / 多模态输入",
        "rel": "docs-modalities-vision",
        "sourceRel": "docs/modalities/vision.md"
      },
      {
        "title": "ChatBox 接入大模型 API",
        "rel": "docs-tools-chatbox-setup",
        "sourceRel": "docs/tools/chatbox-setup.md"
      },
      {
        "title": "Claude Code 接入大模型 API",
        "rel": "docs-tools-claude-code-setup",
        "sourceRel": "docs/tools/claude-code-setup.md"
      },
      {
        "title": "Cline 接入大模型 API",
        "rel": "docs-tools-cline-setup",
        "sourceRel": "docs/tools/cline-setup.md"
      },
      {
        "title": "Continue (VS Code) 接入大模型 API",
        "rel": "docs-tools-continue-setup",
        "sourceRel": "docs/tools/continue-setup.md"
      },
      {
        "title": "Cursor 接入主流大模型 API（GPT-5 / Claude Opus / Gemini）",
        "rel": "docs-tools-cursor-setup",
        "sourceRel": "docs/tools/cursor-setup.md"
      },
      {
        "title": "Dify 接入大模型 API",
        "rel": "docs-tools-dify-setup",
        "sourceRel": "docs/tools/dify-setup.md"
      },
      {
        "title": "LangChain 接入大模型 API",
        "rel": "docs-tools-langchain-setup",
        "sourceRel": "docs/tools/langchain-setup.md"
      },
      {
        "title": "LlamaIndex 接入大模型 API",
        "rel": "docs-tools-llamaindex-setup",
        "sourceRel": "docs/tools/llamaindex-setup.md"
      },
      {
        "title": "LobeChat 接入大模型 API",
        "rel": "docs-tools-lobechat-setup",
        "sourceRel": "docs/tools/lobechat-setup.md"
      },
      {
        "title": "Open WebUI 接入大模型 API",
        "rel": "docs-tools-openwebui-setup",
        "sourceRel": "docs/tools/openwebui-setup.md"
      },
      {
        "title": "ai-api-integration",
        "rel": "README_CN",
        "sourceRel": "README_CN.md"
      },
      {
        "title": "ai-api-integration",
        "rel": "README_EN",
        "sourceRel": "README_EN.md"
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
        "rel": "translations-zh-CN-00-course-setup",
        "sourceRel": "translations/zh-CN/00-course-setup/README.md"
      },
      {
        "title": "🌍 使用 Microsoft Agent Framework (.NET) 的 AI 旅游代理",
        "rel": "translations-zh-CN-01-intro-to-ai-agents-code_samples-01-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md"
      },
      {
        "title": "AI 代理及代理使用案例简介",
        "rel": "translations-zh-CN-01-intro-to-ai-agents",
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
        "rel": "translations-zh-CN-02-explore-agentic-frameworks",
        "sourceRel": "translations/zh-CN/02-explore-agentic-frameworks/README.md"
      },
      {
        "title": "🎨 使用 Azure OpenAI （Responses API） 的智能代理设计模式（.NET）",
        "rel": "translations-zh-CN-03-agentic-design-patterns-code_samples-03-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md"
      },
      {
        "title": "AI 代理设计原则",
        "rel": "translations-zh-CN-03-agentic-design-patterns",
        "sourceRel": "translations/zh-CN/03-agentic-design-patterns/README.md"
      },
      {
        "title": "🛠️ 使用 Azure OpenAI（Responses API）进行高级工具使用 (.NET)",
        "rel": "translations-zh-CN-04-tool-use-code_samples-04-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/04-tool-use/code_samples/04-dotnet-agent-framework.md"
      },
      {
        "title": "工具使用设计模式",
        "rel": "translations-zh-CN-04-tool-use",
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
        "rel": "translations-zh-CN-05-agentic-rag",
        "sourceRel": "translations/zh-CN/05-agentic-rag/README.md"
      },
      {
        "title": "构建可信赖的 AI 代理",
        "rel": "translations-zh-CN-06-building-trustworthy-agents",
        "sourceRel": "translations/zh-CN/06-building-trustworthy-agents/README.md"
      },
      {
        "title": "🎯 使用 Azure OpenAI (Responses API) 进行规划与设计模式 (.NET)",
        "rel": "translations-zh-CN-07-planning-design-code_samples-07-dotnet-agent-framework",
        "sourceRel": "translations/zh-CN/07-planning-design/code_samples/07-dotnet-agent-framework.md"
      },
      {
        "title": "规划设计",
        "rel": "translations-zh-CN-07-planning-design",
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
        "rel": "translations-zh-CN-08-multi-agent-code_samples-workflows-agent-framework",
        "sourceRel": "translations/zh-CN/08-multi-agent/code_samples/workflows-agent-framework/README.md"
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
        "rel": "docs-AUTHORING_RULES",
        "sourceRel": "docs/AUTHORING_RULES.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-_",
        "sourceRel": "docs/content/_index.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-features-_",
        "sourceRel": "docs/content/features/_index.md"
      },
      {
        "title": "Chat Participant",
        "rel": "docs-content-features-chat",
        "sourceRel": "docs/content/features/chat.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-getting-started-_",
        "sourceRel": "docs/content/getting-started/_index.md"
      },
      {
        "title": "Installation",
        "rel": "docs-content-getting-started-installation",
        "sourceRel": "docs/content/getting-started/installation.md"
      },
      {
        "title": "Supported Tools",
        "rel": "docs-content-getting-started-supported-tools",
        "sourceRel": "docs/content/getting-started/supported-tools.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-improve-_",
        "sourceRel": "docs/content/improve/_index.md"
      },
      {
        "title": "Anti-Patterns",
        "rel": "docs-content-improve-anti-patterns",
        "sourceRel": "docs/content/improve/anti-patterns.md"
      },
      {
        "title": "Context Health",
        "rel": "docs-content-improve-context-health",
        "sourceRel": "docs/content/improve/context-health.md"
      },
      {
        "title": "Data Explorer",
        "rel": "docs-content-improve-data-explorer",
        "sourceRel": "docs/content/improve/data-explorer.md"
      },
      {
        "title": "Rule Editor",
        "rel": "docs-content-improve-rule-editor",
        "sourceRel": "docs/content/improve/rule-editor.md"
      },
      {
        "title": "Rule Playground",
        "rel": "docs-content-improve-rule-playground",
        "sourceRel": "docs/content/improve/rule-playground.md"
      },
      {
        "title": "Skill Finder",
        "rel": "docs-content-improve-skill-finder",
        "sourceRel": "docs/content/improve/skill-finder.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-level-up-_",
        "sourceRel": "docs/content/level-up/_index.md"
      },
      {
        "title": "Achievements",
        "rel": "docs-content-level-up-achievements",
        "sourceRel": "docs/content/level-up/achievements.md"
      },
      {
        "title": "Learning Center",
        "rel": "docs-content-level-up-learning",
        "sourceRel": "docs/content/level-up/learning.md"
      },
      {
        "title": "Agentic SDLC",
        "rel": "docs-content-level-up-sdlc",
        "sourceRel": "docs/content/level-up/sdlc.md"
      },
      {
        "title": "Share",
        "rel": "docs-content-level-up-share",
        "sourceRel": "docs/content/level-up/share.md"
      },
      {
        "title": "AI Engineering Coach（微软）",
        "rel": "docs-content-measure-_",
        "sourceRel": "docs/content/measure/_index.md"
      },
      {
        "title": "Burndown",
        "rel": "docs-content-measure-burndown",
        "sourceRel": "docs/content/measure/burndown.md"
      },
      {
        "title": "Output",
        "rel": "docs-content-measure-output",
        "sourceRel": "docs/content/measure/output.md"
      },
      {
        "title": "Activity Patterns",
        "rel": "docs-content-measure-patterns",
        "sourceRel": "docs/content/measure/patterns.md"
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
        "rel": "1_foundations-community_contributions-1_Abdulrazaq",
        "sourceRel": "1_foundations/community_contributions/1_Abdulrazaq/README.md"
      },
      {
        "title": "Ed Donner：AI Agents 实战课",
        "rel": "1_foundations-community_contributions-adeyemi-kayode",
        "sourceRel": "1_foundations/community_contributions/adeyemi-kayode/README.md"
      },
      {
        "title": "Alter-Ego Chatbot",
        "rel": "1_foundations-community_contributions-alter-ego-gradio-chatbot-usingAzureOpenai",
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
        "rel": "1_foundations-community_contributions-amirna2_contributions-personal-ai",
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
        "rel": "1_foundations-community_contributions-avatar",
        "sourceRel": "1_foundations/community_contributions/avatar/README.md"
      },
      {
        "title": "Personal AI Assistant – AMA Chatbot",
        "rel": "1_foundations-community_contributions-blt909",
        "sourceRel": "1_foundations/community_contributions/blt909/README.md"
      },
      {
        "title": "🤖 CareerWise Gemini Notify",
        "rel": "1_foundations-community_contributions-careerwise_gemini_ntfy",
        "sourceRel": "1_foundations/community_contributions/careerwise_gemini_ntfy/README.md"
      },
      {
        "title": "RAG Chat Evaluator Bot",
        "rel": "1_foundations-community_contributions-chatbot_rag_evaluation",
        "sourceRel": "1_foundations/community_contributions/chatbot_rag_evaluation/README.md"
      },
      {
        "title": "Smart RAG Chatbot",
        "rel": "1_foundations-community_contributions-ChatBot_with_evaluator_and_notifier",
        "sourceRel": "1_foundations/community_contributions/ChatBot_with_evaluator_and_notifier/README.md"
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
        "title": "Digital Twin — Eben's Personal Assistant",
        "rel": "community_contributions-a3_igniters_ebenhays",
        "sourceRel": "community_contributions/a3_igniters_ebenhays/README.md"
      },
      {
        "title": "FitCheck AI — Resume Analyzer",
        "rel": "community_contributions-a3_igniters_ebenhays-week1day5_ebenhays",
        "sourceRel": "community_contributions/a3_igniters_ebenhays/week1day5_ebenhays.md"
      },
      {
        "title": "Issue description",
        "rel": "community_contributions-arijitdeb1_nova_lite_invocation_error_fix",
        "sourceRel": "community_contributions/arijitdeb1_nova_lite_invocation_error_fix.md"
      },
      {
        "title": "AI in Production",
        "rel": "community_contributions-aws_cloudflare_dns_integration",
        "sourceRel": "community_contributions/aws_cloudflare_dns_integration.md"
      },
      {
        "title": "AWS Profile Quick Tip",
        "rel": "community_contributions-aws_configure_tips",
        "sourceRel": "community_contributions/aws_configure_tips.md"
      },
      {
        "title": "Consultation App Deployment Alternative to App Runner",
        "rel": "community_contributions-aws_ecs_deployment_alternative_to_apprunner",
        "sourceRel": "community_contributions/aws_ecs_deployment_alternative_to_apprunner.md"
      },
      {
        "title": "Deploying a container to AWS ECS Express Mode",
        "rel": "community_contributions-aws_ecs_express_mode",
        "sourceRel": "community_contributions/aws_ecs_express_mode.md"
      },
      {
        "title": "AWS Copilot",
        "rel": "community_contributions-aws-copilot",
        "sourceRel": "community_contributions/aws-copilot.md"
      },
      {
        "title": "AI in Production",
        "rel": "community_contributions-books_recommender",
        "sourceRel": "community_contributions/books_recommender.md"
      },
      {
        "title": "Vercel Clerk publishable key: use CLERKPUBLISHABLEKEY",
        "rel": "community_contributions-clerk_publishable_key_vercel",
        "sourceRel": "community_contributions/clerk_publishable_key_vercel.md"
      },
      {
        "title": "Damola's AI Twin",
        "rel": "community_contributions-damola_ai_twin",
        "sourceRel": "community_contributions/damola_ai_twin.md"
      },
      {
        "title": "Fix: 403 Forbidden Error on Windows/Docker (Clock Skew)",
        "rel": "community_contributions-fix_windows_docker_403_forbidden_clerk",
        "sourceRel": "community_contributions/fix_windows_docker_403_forbidden_clerk.md"
      },
      {
        "title": "Clerk Logging Configuration Guide",
        "rel": "community_contributions-fix-issue-18",
        "sourceRel": "community_contributions/fix-issue-18.md"
      },
      {
        "title": "Digital Twin on AWS",
        "rel": "community_contributions-igniters_olawale-week2",
        "sourceRel": "community_contributions/igniters_olawale/week2.md"
      },
      {
        "title": "AI-Powered SaaS Platform",
        "rel": "community_contributions-igniters_sodiq-week_1",
        "sourceRel": "community_contributions/igniters_sodiq/week_1.md"
      },
      {
        "title": "Project Details",
        "rel": "community_contributions-Igniters_tobe_health_tech-health_app",
        "sourceRel": "community_contributions/Igniters_tobe_health_tech/health_app.md"
      },
      {
        "title": "AI in Production",
        "rel": "community_contributions-ijosh-production_week1",
        "sourceRel": "community_contributions/ijosh/production_week1.md"
      },
      {
        "title": "Week 2 – AI Digital Twin",
        "rel": "community_contributions-ijosh-production_week2",
        "sourceRel": "community_contributions/ijosh/production_week2.md"
      },
      {
        "title": "Issue description",
        "rel": "community_contributions-jwt_token_60s_fix",
        "sourceRel": "community_contributions/jwt_token_60s_fix.md"
      },
      {
        "title": "Week1 Exercise",
        "rel": "community_contributions-ns_sly_wrk-week1",
        "sourceRel": "community_contributions/ns_sly_wrk/week1.md"
      },
      {
        "title": "Community Contributions for Production Course",
        "rel": "community_contributions",
        "sourceRel": "community_contributions/README.md"
      },
      {
        "title": "Issue description",
        "rel": "community_contributions-streaming_error_fix_day2_vikas",
        "sourceRel": "community_contributions/streaming_error_fix_day2_vikas.md"
      },
      {
        "title": "Salutron: Multi-Cloud Infrastructure Automation",
        "rel": "community_contributions-terraform_aws_gcp_azure_githubactions",
        "sourceRel": "community_contributions/terraform_aws_gcp_azure_githubactions.md"
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
        "title": "Agent-to-Agent (A2A) Communication Example",
        "rel": "course-1-Lab5-strands-a2a-inter-agent",
        "sourceRel": "course-1/Lab5/strands-a2a-inter-agent/README.md"
      },
      {
        "title": "Lab 06: Observability with LangFuse and Evaluation with RAGAS",
        "rel": "course-1-Lab6",
        "sourceRel": "course-1/Lab6/README.md"
      },
      {
        "title": "Lab 1: Overview of Strands Agents",
        "rel": "course-2-Lab1",
        "sourceRel": "course-2/Lab1/README.md"
      },
      {
        "title": "Lab 2: Model Providers and Configuration",
        "rel": "course-2-Lab2",
        "sourceRel": "course-2/Lab2/README.md"
      },
      {
        "title": "Lab 3: Advanced Response Processing with Hooks",
        "rel": "course-2-Lab3",
        "sourceRel": "course-2/Lab3/README.md"
      },
      {
        "title": "Lab 4: Tools and MCP Integration",
        "rel": "course-2-Lab4",
        "sourceRel": "course-2/Lab4/README.md"
      },
      {
        "title": "Lab 5: Conversation and Session Management",
        "rel": "course-2-Lab5",
        "sourceRel": "course-2/Lab5/README.md"
      },
      {
        "title": "Lab 6: Memory Persistent Agents",
        "rel": "course-2-Lab6",
        "sourceRel": "course-2/Lab6/README.md"
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
        "title": "Azure Infrastructure for LangChain4j Getting Started",
        "rel": "01-introduction-infra",
        "sourceRel": "01-introduction/infra/README.md"
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
      },
      {
        "title": "LangChain4j Glossary",
        "rel": "docs-GLOSSARY",
        "sourceRel": "docs/GLOSSARY.md"
      },
      {
        "title": "Testing LangChain4j Applications",
        "rel": "docs-TESTING",
        "sourceRel": "docs/TESTING.md"
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
      },
      {
        "title": "Week 1: Infrastructure Setup and Verification",
        "rel": "notebooks-week1",
        "sourceRel": "notebooks/week1/README.md"
      },
      {
        "title": "Week 2: arXiv API Integration & PDF Processing",
        "rel": "notebooks-week2",
        "sourceRel": "notebooks/week2/README.md"
      },
      {
        "title": "Week 3: Keyword Search First - The Critical Foundation",
        "rel": "notebooks-week3",
        "sourceRel": "notebooks/week3/README.md"
      },
      {
        "title": "Week 4: Document Chunking and Hybrid Search",
        "rel": "notebooks-week4",
        "sourceRel": "notebooks/week4/README.md"
      },
      {
        "title": "Week 5: Complete RAG System with LLM Integration",
        "rel": "notebooks-week5",
        "sourceRel": "notebooks/week5/README.md"
      },
      {
        "title": "Week 6: Production Monitoring and Caching with Langfuse and Redis",
        "rel": "notebooks-week6",
        "sourceRel": "notebooks/week6/README.md"
      },
      {
        "title": "Week 7: Agentic RAG with LangGraph + Telegram Bot",
        "rel": "notebooks-week7",
        "sourceRel": "notebooks/week7/README.md"
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
        "title": "Anthropic 官方课程",
        "rel": "prompt_evaluations-05_prompt_foo_code_graded_animals",
        "sourceRel": "prompt_evaluations/05_prompt_foo_code_graded_animals/README.md"
      },
      {
        "title": "Anthropic 官方课程",
        "rel": "prompt_evaluations-06_prompt_foo_code_graded_classification",
        "sourceRel": "prompt_evaluations/06_prompt_foo_code_graded_classification/README.md"
      },
      {
        "title": "Anthropic 官方课程",
        "rel": "prompt_evaluations-07_prompt_foo_custom_graders",
        "sourceRel": "prompt_evaluations/07_prompt_foo_custom_graders/README.md"
      },
      {
        "title": "Anthropic 官方课程",
        "rel": "prompt_evaluations-08_prompt_foo_model_graded",
        "sourceRel": "prompt_evaluations/08_prompt_foo_model_graded/README.md"
      },
      {
        "title": "Anthropic 官方课程",
        "rel": "prompt_evaluations-09_custom_model_graded_prompt_foo",
        "sourceRel": "prompt_evaluations/09_custom_model_graded_prompt_foo/README.md"
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
        "rel": "apps-second-brain-offline",
        "sourceRel": "apps/second-brain-offline/README.md"
      },
      {
        "title": "🚀 Installation and Usage Guide for the Second Brain Online Module",
        "rel": "apps-second-brain-online",
        "sourceRel": "apps/second-brain-online/README.md"
      },
      {
        "title": "Workshop on Building Advanced RAG Applications and Systems",
        "rel": "workshops-rag-solution",
        "sourceRel": "workshops/rag/solution/README.md"
      },
      {
        "title": "Workshop on Building Advanced RAG Applications and Systems",
        "rel": "workshops-rag-template",
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
        "title": "Site Architecture",
        "rel": "docs-architecture",
        "sourceRel": "docs/architecture/index.md"
      },
      {
        "title": "Agent API Lab",
        "rel": "examples-agent-api-lab-2",
        "sourceRel": "examples/agent-api-lab/README.md"
      },
      {
        "title": "面试诊断 Agent PRD",
        "rel": "final-project-01-prd",
        "sourceRel": "final-project/01-prd/index.md"
      },
      {
        "title": "系统架构设计",
        "rel": "final-project-02-architecture",
        "sourceRel": "final-project/02-architecture/index.md"
      },
      {
        "title": "Query Engine 实现",
        "rel": "final-project-03-query-engine",
        "sourceRel": "final-project/03-query-engine/index.md"
      },
      {
        "title": "Tools & Skills 实现",
        "rel": "final-project-04-tools-skills",
        "sourceRel": "final-project/04-tools-skills/index.md"
      },
      {
        "title": "知识库构建",
        "rel": "final-project-05-knowledge-base",
        "sourceRel": "final-project/05-knowledge-base/index.md"
      },
      {
        "title": "Context & Memory 实现",
        "rel": "final-project-06-context-memory",
        "sourceRel": "final-project/06-context-memory/index.md"
      },
      {
        "title": "Permission & Session 实现",
        "rel": "final-project-07-permission-session",
        "sourceRel": "final-project/07-permission-session/index.md"
      },
      {
        "title": "Hook & Command 实现",
        "rel": "final-project-08-hook-command",
        "sourceRel": "final-project/08-hook-command/index.md"
      },
      {
        "title": "Sub-agent 编排",
        "rel": "final-project-09-sub-agent",
        "sourceRel": "final-project/09-sub-agent/index.md"
      },
      {
        "title": "STT 集成与语音分析",
        "rel": "final-project-10-stt-speech",
        "sourceRel": "final-project/10-stt-speech/index.md"
      },
      {
        "title": "部署与演示",
        "rel": "final-project-11-deploy-demo",
        "sourceRel": "final-project/11-deploy-demo/index.md"
      },
      {
        "title": "Web UI 交互设计",
        "rel": "final-project-12-web-ui",
        "sourceRel": "final-project/12-web-ui/index.md"
      },
      {
        "title": "Final Project：OfferPilot",
        "rel": "final-project",
        "sourceRel": "final-project/index.md"
      },
      {
        "title": "什么是 Agent",
        "rel": "learn-agent-basic-01-what-is-an-agent",
        "sourceRel": "learn-agent-basic/01-what-is-an-agent/index.md"
      },
      {
        "title": "Workflow 和 Agent 的区别",
        "rel": "learn-agent-basic-02-workflow-vs-agent",
        "sourceRel": "learn-agent-basic/02-workflow-vs-agent/index.md"
      },
      {
        "title": "一个 Agent 系统的核心组成",
        "rel": "learn-agent-basic-03-core-components",
        "sourceRel": "learn-agent-basic/03-core-components/index.md"
      },
      {
        "title": "为什么很多 Agent Demo 一落地就不稳定",
        "rel": "learn-agent-basic-04-why-agent-demos-break",
        "sourceRel": "learn-agent-basic/04-why-agent-demos-break/index.md"
      },
      {
        "title": "大模型 API 输入输出与 Tool Calling",
        "rel": "learn-agent-basic-05-tool-calling-basics",
        "sourceRel": "learn-agent-basic/05-tool-calling-basics/index.md"
      },
      {
        "title": "Context、State 与 Memory",
        "rel": "learn-agent-basic-06-memory-patterns",
        "sourceRel": "learn-agent-basic/06-memory-patterns/index.md"
      },
      {
        "title": "Planning、Reflection、RAG 分别解决什么问题",
        "rel": "learn-agent-basic-07-planning-reflection-rag",
        "sourceRel": "learn-agent-basic/07-planning-reflection-rag/index.md"
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
        "title": "1-1 大模型认知与工程概览",
        "rel": "1-1-大模型认知与工程概览",
        "sourceRel": "1-1-大模型认知与工程概览.md"
      },
      {
        "title": "1-2 提示词工程基础",
        "rel": "1-2-提示词工程基础",
        "sourceRel": "1-2-提示词工程基础.md"
      },
      {
        "title": "1-3 RAG、微调、续训与智能体选型",
        "rel": "1-3-RAG_微调_续训与智能体选型",
        "sourceRel": "1-3-RAG、微调、续训与智能体选型.md"
      },
      {
        "title": "2 - RAG - 搭建企业私有&个人知识库",
        "rel": "2-RAG-搭建企业私有_个人知识库",
        "sourceRel": "2-RAG-搭建企业私有&个人知识库.md"
      },
      {
        "title": "3 - 基于 Coze&Dify 平台的智能体开发",
        "rel": "3-基于Coze_Dify平台的智能体开发",
        "sourceRel": "3-基于Coze&Dify平台的智能体开发.md"
      },
      {
        "title": "4 - Python 调用 Dify 平台工作流",
        "rel": "4-Python调用Dify平台工作流",
        "sourceRel": "4-Python调用Dify平台工作流.md"
      },
      {
        "title": "5 - Python 调用 Coze 平台工作流",
        "rel": "5-Python调用Coze平台工作流",
        "sourceRel": "5-Python调用Coze平台工作流.md"
      },
      {
        "title": "6 - Coze 与 Dify 的 Windows 平台部署",
        "rel": "6-Coze与Dify的Windows平台部署",
        "sourceRel": "6-Coze与Dify的Windows平台部署.md"
      },
      {
        "title": "7 - 企业级大模型部署",
        "rel": "7-企业级大模型部署",
        "sourceRel": "7-企业级大模型部署.md"
      },
      {
        "title": "8 - Docker 快速入门与 Dify 部署排障",
        "rel": "8-Docker快速入门与Dify部署排障",
        "sourceRel": "8-Docker快速入门与Dify部署排障.md"
      },
      {
        "title": "9 - LangChain 概述与架构",
        "rel": "9-LangChain概述与架构",
        "sourceRel": "9-LangChain概述与架构.md"
      },
      {
        "title": "10 - LangChain 快速上手与 HelloWorld",
        "rel": "10-LangChain快速上手与HelloWorld",
        "sourceRel": "10-LangChain快速上手与HelloWorld.md"
      },
      {
        "title": "11 - Model I/O 与模型接入",
        "rel": "11-Model-I-O与模型接入",
        "sourceRel": "11-Model-I-O与模型接入.md"
      },
      {
        "title": "12 - Ollama 本地部署与调用",
        "rel": "12-Ollama本地部署与调用",
        "sourceRel": "12-Ollama本地部署与调用.md"
      },
      {
        "title": "13 - 提示词与消息模板",
        "rel": "13-提示词与消息模板",
        "sourceRel": "13-提示词与消息模板.md"
      },
      {
        "title": "14 - 输出解析器",
        "rel": "14-输出解析器",
        "sourceRel": "14-输出解析器.md"
      },
      {
        "title": "15 - LCEL 与链式调用",
        "rel": "15-LCEL与链式调用",
        "sourceRel": "15-LCEL与链式调用.md"
      },
      {
        "title": "16 - 记忆与对话历史（含 Redis 基础）",
        "rel": "16-记忆与对话历史_含Redis基础_",
        "sourceRel": "16-记忆与对话历史（含Redis基础）.md"
      },
      {
        "title": "17 - Tools 工具调用",
        "rel": "17-Tools工具调用",
        "sourceRel": "17-Tools工具调用.md"
      },
      {
        "title": "18 - 向量数据库与 Embedding 实战",
        "rel": "18-向量数据库与Embedding实战",
        "sourceRel": "18-向量数据库与Embedding实战.md"
      },
      {
        "title": "19 - RAG 检索增强生成",
        "rel": "19-RAG检索增强生成",
        "sourceRel": "19-RAG检索增强生成.md"
      },
      {
        "title": "20 - MCP 模型上下文协议",
        "rel": "20-MCP模型上下文协议",
        "sourceRel": "20-MCP模型上下文协议.md"
      },
      {
        "title": "21 - Agent 智能体",
        "rel": "21-Agent智能体",
        "sourceRel": "21-Agent智能体.md"
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
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
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
        "rel": "case-studies-examples-customer-email-assist-starter",
        "sourceRel": "case-studies/examples/customer-email-assist-starter/index.mdx"
      },
      {
        "title": "Customer Email Assist Starter",
        "rel": "case-studies-examples-customer-email-assist-starter-2",
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
        "rel": "case-studies-examples-customer-support-email-agent-starter",
        "sourceRel": "case-studies/examples/customer-support-email-agent-starter/index.mdx"
      },
      {
        "title": "Local Customer Email Reply",
        "rel": "case-studies-examples-customer-support-email-agent-starter-skill-SKILL",
        "sourceRel": "case-studies/examples/customer-support-email-agent-starter/skill/SKILL.md"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies-examples-deep-research-agent-starter",
        "sourceRel": "case-studies/examples/deep-research-agent-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "case-studies",
        "sourceRel": "case-studies/index.mdx"
      },
      {
        "title": "Case Studies",
        "rel": "case-studies-2",
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
        "rel": "ecosystem-examples-langgraph-starter",
        "sourceRel": "ecosystem/examples/langgraph-starter/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-examples-messaging-transaction-assistant-starter",
        "sourceRel": "ecosystem/examples/messaging-transaction-assistant-starter/index.mdx"
      },
      {
        "title": "Messaging Transaction Assistant Starter",
        "rel": "ecosystem-examples-messaging-transaction-assistant-starter-2",
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
        "rel": "ecosystem",
        "sourceRel": "ecosystem/index.mdx"
      },
      {
        "title": "Agent Systems Handbook（智能体系统手册）",
        "rel": "ecosystem-model-ecosystem-map",
        "sourceRel": "ecosystem/model-ecosystem-map.mdx"
      },
      {
        "title": "Ecosystem",
        "rel": "ecosystem-2",
        "sourceRel": "ecosystem/README.md"
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
        "rel": "content-ch01-agent-harness",
        "sourceRel": "content/ch01-agent-harness.md"
      },
      {
        "title": "第 2 章：快速上手 — 5 分钟构建你的第一个 Deep Agent",
        "rel": "content-ch02-quickstart",
        "sourceRel": "content/ch02-quickstart.md"
      },
      {
        "title": "第 3 章：虚拟文件系统 — Deep Agents 的 Context Engineering 核心",
        "rel": "content-ch03-virtual-filesystem",
        "sourceRel": "content/ch03-virtual-filesystem.md"
      },
      {
        "title": "第 4 章：任务规划与分解 — 让 Agent 学会拆解复杂任务",
        "rel": "content-ch04-task-planning",
        "sourceRel": "content/ch04-task-planning.md"
      },
      {
        "title": "第 5 章：子 Agent 与上下文隔离 — 让 Agent 学会\"委派\"",
        "rel": "content-ch05-subagents",
        "sourceRel": "content/ch05-subagents.md"
      },
      {
        "title": "第 6 章：异步子 Agent — 让主 Agent 同时驱动多个子任务",
        "rel": "content-ch06-async-subagents",
        "sourceRel": "content/ch06-async-subagents.md"
      },
      {
        "title": "第 7 章：Skills — 可复用的 Agent 能力包",
        "rel": "content-ch07-skills",
        "sourceRel": "content/ch07-skills.md"
      },
      {
        "title": "第 8 章：长期记忆 — 让 Agent 拥有跨对话的记忆",
        "rel": "content-ch08-long-term-memory",
        "sourceRel": "content/ch08-long-term-memory.md"
      },
      {
        "title": "第 9 章：Human-in-the-Loop — 构建安全的人机协作流程",
        "rel": "content-ch09-human-in-the-loop",
        "sourceRel": "content/ch09-human-in-the-loop.md"
      },
      {
        "title": "第 10 章：沙箱执行 — 让 Agent 安全地运行代码",
        "rel": "content-ch10-sandboxes",
        "sourceRel": "content/ch10-sandboxes.md"
      },
      {
        "title": "第 11 章：文件系统权限 — 用声明式规则控制 Agent 的读写边界",
        "rel": "content-ch11-filesystem-permissions",
        "sourceRel": "content/ch11-filesystem-permissions.md"
      },
      {
        "title": "第 12 章：MCP — 用标准协议扩展 Deep Agents 工具生态",
        "rel": "content-ch12-mcp",
        "sourceRel": "content/ch12-mcp.md"
      },
      {
        "title": "第 13 章：评分量规 — 让 Agent 按验收标准自我迭代",
        "rel": "content-ch13-grading-rubrics",
        "sourceRel": "content/ch13-grading-rubrics.md"
      },
      {
        "title": "第 14 章：Streaming — 实时观察主 Agent、子 Agent 与工具调用",
        "rel": "content-ch14-streaming",
        "sourceRel": "content/ch14-streaming.md"
      },
      {
        "title": "第 15 章：Interpreters — 让 Agent 用代码编排工具与数据",
        "rel": "content-ch15-interpreters",
        "sourceRel": "content/ch15-interpreters.md"
      },
      {
        "title": "第 16 章：Dynamic Subagents — 用代码编排多个 Agent",
        "rel": "content-ch16-dynamic-subagents",
        "sourceRel": "content/ch16-dynamic-subagents.md"
      },
      {
        "title": "AgentSeek 准备篇（上）：用生命周期工作流启动 DeepAgents 模板",
        "rel": "content-pre01-agentseek-create",
        "sourceRel": "content/pre01-agentseek-create.md"
      },
      {
        "title": "AgentSeek 准备篇（下）：为 AI 编码助手安装开发技能",
        "rel": "content-pre02-agentseek-skills",
        "sourceRel": "content/pre02-agentseek-skills.md"
      },
      {
        "title": "Deep Agents v0.7：更轻、更透明、更可配置的 Harness",
        "rel": "content-release-v0-7",
        "sourceRel": "content/release-v0-7.md"
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
        "rel": "capabilities-classification-evaluation",
        "sourceRel": "capabilities/classification/evaluation/README.md"
      },
      {
        "title": "Classification with Claude",
        "rel": "capabilities-classification",
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
        "rel": "capabilities-content_moderation-evaluation",
        "sourceRel": "capabilities/content_moderation/evaluation/README.md"
      },
      {
        "title": "Content policy enforcement with Claude",
        "rel": "capabilities-content_moderation",
        "sourceRel": "capabilities/content_moderation/README.md"
      },
      {
        "title": "Retrieval Augmented Generation with Contextual Embeddings",
        "rel": "capabilities-contextual-embeddings",
        "sourceRel": "capabilities/contextual-embeddings/README.md"
      },
      {
        "title": "Knowledge Graph Extraction Evaluation",
        "rel": "capabilities-knowledge_graph-evaluation",
        "sourceRel": "capabilities/knowledge_graph/evaluation/README.md"
      },
      {
        "title": "Knowledge Graph Construction with Claude",
        "rel": "capabilities-knowledge_graph",
        "sourceRel": "capabilities/knowledge_graph/README.md"
      },
      {
        "title": "Claude Capabilities",
        "rel": "capabilities",
        "sourceRel": "capabilities/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-retrieval_augmented_generation-evaluation",
        "sourceRel": "capabilities/retrieval_augmented_generation/evaluation/README.md"
      },
      {
        "title": "Retrieval Augmented Generation with Claude",
        "rel": "capabilities-retrieval_augmented_generation",
        "sourceRel": "capabilities/retrieval_augmented_generation/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-summarization-evaluation",
        "sourceRel": "capabilities/summarization/evaluation/README.md"
      },
      {
        "title": "Summarization with Claude",
        "rel": "capabilities-summarization",
        "sourceRel": "capabilities/summarization/README.md"
      },
      {
        "title": "Evaluations with Promptfoo",
        "rel": "capabilities-text_to_sql-evaluation",
        "sourceRel": "capabilities/text_to_sql/evaluation/README.md"
      },
      {
        "title": "Text-to-SQL with Claude",
        "rel": "capabilities-text_to_sql",
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
        "rel": "claude_agent_sdk-hosting-docker",
        "sourceRel": "claude_agent_sdk/hosting/docker/README.md"
      },
      {
        "title": "Tier 3 — Kubernetes (pod-per-session)",
        "rel": "claude_agent_sdk-hosting-kubernetes",
        "sourceRel": "claude_agent_sdk/hosting/kubernetes/README.md"
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
        "rel": "articles-chatgpt-agents-sales-meeting-prep",
        "sourceRel": "articles/chatgpt-agents-sales-meeting-prep.md"
      },
      {
        "title": "Using PLANS.md for multi-hour problem solving",
        "rel": "articles-codex_exec_plans",
        "sourceRel": "articles/codex_exec_plans.md"
      },
      {
        "title": "User guide for gpt-oss-safeguard",
        "rel": "articles-gpt-oss-safeguard-guide",
        "sourceRel": "articles/gpt-oss-safeguard-guide.md"
      },
      {
        "title": "How to handle the raw chain of thought in gpt-oss",
        "rel": "articles-gpt-oss-handle-raw-cot",
        "sourceRel": "articles/gpt-oss/handle-raw-cot.md"
      },
      {
        "title": "How to run gpt-oss locally with LM Studio",
        "rel": "articles-gpt-oss-run-locally-lmstudio",
        "sourceRel": "articles/gpt-oss/run-locally-lmstudio.md"
      },
      {
        "title": "How to run gpt-oss locally with Ollama",
        "rel": "articles-gpt-oss-run-locally-ollama",
        "sourceRel": "articles/gpt-oss/run-locally-ollama.md"
      },
      {
        "title": "How to run gpt-oss with Hugging Face Transformers",
        "rel": "articles-gpt-oss-run-transformers",
        "sourceRel": "articles/gpt-oss/run-transformers.md"
      },
      {
        "title": "How to run gpt-oss with vLLM",
        "rel": "articles-gpt-oss-run-vllm",
        "sourceRel": "articles/gpt-oss/run-vllm.md"
      },
      {
        "title": "Verifying gpt-oss implementations",
        "rel": "articles-gpt-oss-verifying-implementations",
        "sourceRel": "articles/gpt-oss/verifying-implementations.md"
      },
      {
        "title": "How to work with large language models",
        "rel": "articles-how_to_work_with_large_language_models",
        "sourceRel": "articles/how_to_work_with_large_language_models.md"
      },
      {
        "title": "OpenAI harmony response format",
        "rel": "articles-openai-harmony",
        "sourceRel": "articles/openai-harmony.md"
      },
      {
        "title": "Build a per-run spending controller with the Responses API",
        "rel": "articles-per_run_spending_controller_responses_api",
        "sourceRel": "articles/per_run_spending_controller_responses_api.md"
      },
      {
        "title": "Related resources from around the web",
        "rel": "articles-related_resources",
        "sourceRel": "articles/related_resources.md"
      },
      {
        "title": "Techniques to improve reliability",
        "rel": "articles-techniques_to_improve_reliability",
        "sourceRel": "articles/techniques_to_improve_reliability.md"
      },
      {
        "title": "Text comparison examples",
        "rel": "articles-text_comparison_examples",
        "sourceRel": "articles/text_comparison_examples.md"
      },
      {
        "title": "What’s new with DALL·E-3?",
        "rel": "articles-what_is_new_with_dalle_3",
        "sourceRel": "articles/what_is_new_with_dalle_3.mdx"
      },
      {
        "title": "What makes documentation good",
        "rel": "articles-what_makes_documentation_good",
        "sourceRel": "articles/what_makes_documentation_good.md"
      },
      {
        "title": "Agents SDK Deployment Manager",
        "rel": "examples-agents_sdk-deployment_manager",
        "sourceRel": "examples/agents_sdk/deployment_manager/README.md"
      },
      {
        "title": "Migrate from the Claude Agent SDK to the OpenAI Agents SDK",
        "rel": "examples-agents_sdk-migrate-from-claude-agent-sdk",
        "sourceRel": "examples/agents_sdk/migrate-from-claude-agent-sdk/README.md"
      },
      {
        "title": "Code Interpreter Prompt (Best Practices, GPT-4.1)",
        "rel": "examples-agents_sdk-multi-agent-portfolio-collaboration-prompts-code_interpreter",
        "sourceRel": "examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/code_interpreter.md"
      },
      {
        "title": "Memo Editor – Prompt",
        "rel": "examples-agents_sdk-multi-agent-portfolio-collaboration-prompts-editor_base",
        "sourceRel": "examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/editor_base.md"
      },
      {
        "title": "Lead Fundamental Analyst – Prompt",
        "rel": "examples-agents_sdk-multi-agent-portfolio-collaboration-prompts-fundamental_base",
        "sourceRel": "examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/fundamental_base.md"
      },
      {
        "title": "Macro Strategist – Prompt",
        "rel": "examples-agents_sdk-multi-agent-portfolio-collaboration-prompts-macro_base",
        "sourceRel": "examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/macro_base.md"
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
        "title": "Gemini API and Google Workspace Codelab",
        "rel": "examples-Apps_script_and_Workspace_codelab",
        "sourceRel": "examples/Apps_script_and_Workspace_codelab/README.md"
      },
      {
        "title": "ChromaDB integration",
        "rel": "examples-chromadb",
        "sourceRel": "examples/chromadb/README.md"
      },
      {
        "title": "Gemini API Haystack Examples",
        "rel": "examples-haystack",
        "sourceRel": "examples/haystack/README.md"
      },
      {
        "title": "Voice-Controlled LED Ring with the ESP32",
        "rel": "examples-iot-esp32-voice_led_controller",
        "sourceRel": "examples/iot/esp32/voice_led_controller/README.md"
      },
      {
        "title": "Gemini JSON Capabilities",
        "rel": "examples-json_capabilities",
        "sourceRel": "examples/json_capabilities/README.md"
      },
      {
        "title": "Gemini API LangChain Examples",
        "rel": "examples-langchain",
        "sourceRel": "examples/langchain/README.md"
      },
      {
        "title": "LlamaIndex Integration with Gemini",
        "rel": "examples-llamaindex",
        "sourceRel": "examples/llamaindex/README.md"
      },
      {
        "title": "MLflow Integration with Gemini",
        "rel": "examples-mlflow",
        "sourceRel": "examples/mlflow/README.md"
      },
      {
        "title": "Prompting techniques",
        "rel": "examples-prompting_techniques",
        "sourceRel": "examples/prompting_techniques/README.md"
      },
      {
        "title": "Prompting Examples",
        "rel": "examples-prompting",
        "sourceRel": "examples/prompting/README.md"
      },
      {
        "title": "Gemini API Cookbook",
        "rel": "examples-qdrant",
        "sourceRel": "examples/qdrant/README.md"
      },
      {
        "title": "Gemini API Examples",
        "rel": "examples",
        "sourceRel": "examples/README.md"
      },
      {
        "title": "Gemini API Weaviate Examples",
        "rel": "examples-weaviate",
        "sourceRel": "examples/weaviate/README.md"
      },
      {
        "title": "JavaScript/TypeScript Quickstarts",
        "rel": "quickstarts-js",
        "sourceRel": "quickstarts-js/README.md"
      },
      {
        "title": "Gemini File API Sample Client Code",
        "rel": "quickstarts-file-api",
        "sourceRel": "quickstarts/file-api/README.md"
      },
      {
        "title": "Gemini API Tutorials",
        "rel": "quickstarts",
        "sourceRel": "quickstarts/README.md"
      },
      {
        "title": "Call the Gemini API with cURL",
        "rel": "quickstarts-rest",
        "sourceRel": "quickstarts/rest/README.md"
      },
      {
        "title": "Gemini websockets Cookbook",
        "rel": "quickstarts-websockets",
        "sourceRel": "quickstarts/websockets/README.md"
      },
      {
        "title": "Gemini API Cookbook Quality Assurance Tools: Architecture & Design",
        "rel": "tools-Design",
        "sourceRel": "tools/Design.md"
      },
      {
        "title": "📐 Design Document: Notebook Automated Testing, Security & Regression Suite",
        "rel": "tools-nb_tester-Design",
        "sourceRel": "tools/nb_tester/Design.md"
      },
      {
        "title": "🧪 Gemini API Cookbook Notebook Testing & Regression Suite",
        "rel": "tools-nb_tester",
        "sourceRel": "tools/nb_tester/README.md"
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
        "title": "🎮 AI 3D PyGame Visualizer with DeepSeek R1",
        "rel": "advanced_ai_agents-autonomous_game_playing_agent_apps-ai_3dpygame_r1",
        "sourceRel": "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_3dpygame_r1/README.md"
      },
      {
        "title": "♜ Agent White vs Agent Black: Chess Game",
        "rel": "advanced_ai_agents-autonomous_game_playing_agent_apps-ai_chess_agent",
        "sourceRel": "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_chess_agent/README.md"
      },
      {
        "title": "🎮 Agent X vs Agent O: Tic-Tac-Toe Game",
        "rel": "advanced_ai_agents-autonomous_game_playing_agent_apps-ai_tic_tac_toe_agent",
        "sourceRel": "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_tic_tac_toe_agent/README.md"
      },
      {
        "title": "AG2 Adaptive Research Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ag2_adaptive_research_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/README.md"
      },
      {
        "title": "🧲 AI Competitor Intelligence Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_competitor_intelligence_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_competitor_intelligence_agent_team/README.md"
      },
      {
        "title": "Awesome LLM Apps",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_finance_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_finance_agent_team/README.md"
      },
      {
        "title": "AI Game Design Agent Team 🎮",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_game_design_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_game_design_agent_team/README.md"
      },
      {
        "title": "👨‍⚖️ AI Legal Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_legal_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_legal_agent_team/README.md"
      },
      {
        "title": "🏠 AI Real Estate Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_real_estate_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_real_estate_agent_team/README.md"
      },
      {
        "title": "💼 AI Recruitment Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_recruitment_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_recruitment_agent_team/README.md"
      },
      {
        "title": "👨🏻‍💼 AI Sales Intelligence Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_sales_intelligence_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_sales_intelligence_agent_team/README.md"
      },
      {
        "title": "🔍 AI SEO Audit Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_seo_audit_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_seo_audit_team/README.md"
      },
      {
        "title": "AI Services Agency 👨‍💼",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_services_agency",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_services_agency/README.md"
      },
      {
        "title": "👨‍🏫 AI Teaching Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_teaching_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_teaching_agent_team/README.md"
      },
      {
        "title": "TripCraft AI - Agent Architecture",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_travel_planner_agent_team-backend-agents",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/backend/agents/README.md"
      },
      {
        "title": "Awesome LLM Apps",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_travel_planner_agent_team-client",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/client/README.md"
      },
      {
        "title": "✈️ TripCraft AI",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_travel_planner_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/README.md"
      },
      {
        "title": "📊 AI VC Due Diligence Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-ai_vc_due_diligence_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/ai_vc_due_diligence_agent_team/README.md"
      },
      {
        "title": "💻 Multimodal AI Coding Agent Team with o3-mini and Gemini",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-multimodal_coding_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_coding_agent_team/README.md"
      },
      {
        "title": "Multimodal AI Design Agent Team",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-multimodal_design_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_design_agent_team/README.md"
      },
      {
        "title": "🎨 🍌 Multimodal UI/UX Feedback Agent Team with Nano Banana",
        "rel": "advanced_ai_agents-multi_agent_apps-agent_teams-multimodal_uiux_feedback_agent_team",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_uiux_feedback_agent_team/README.md"
      },
      {
        "title": "🌍 AQI Analysis Agent",
        "rel": "advanced_ai_agents-multi_agent_apps-ai_aqi_analysis_agent",
        "sourceRel": "advanced_ai_agents/multi_agent_apps/ai_aqi_analysis_agent/README.md"
      }
    ]
  },
  {
    "id": "08-agents/awesome-ai-agent-papers",
    "volume": "08-agents",
    "local": "awesome-ai-agent-papers",
    "title": "Awesome AI Agent Papers（智能体论文清单）",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "VoltAgent/awesome-ai-agent-papers",
    "site": null,
    "commit": "4c0c1281f01c6e66a68c0db06b9cfd79277dcfa3",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/VoltAgent/awesome-ai-agent-papers",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome AI Agent Papers",
        "rel": "overview",
        "sourceRel": "README.md"
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
        "title": "Configuration",
        "rel": "docs-config",
        "sourceRel": "docs/config.md"
      },
      {
        "title": "Context management",
        "rel": "docs-context",
        "sourceRel": "docs/context.md"
      },
      {
        "title": "Examples",
        "rel": "docs-examples",
        "sourceRel": "docs/examples.md"
      },
      {
        "title": "Guardrails",
        "rel": "docs-guardrails",
        "sourceRel": "docs/guardrails.md"
      },
      {
        "title": "Handoffs",
        "rel": "docs-handoffs",
        "sourceRel": "docs/handoffs.md"
      },
      {
        "title": "Human-in-the-loop",
        "rel": "docs-human_in_the_loop",
        "sourceRel": "docs/human_in_the_loop.md"
      },
      {
        "title": "OpenAI Agents SDK",
        "rel": "docs",
        "sourceRel": "docs/index.md"
      },
      {
        "title": "Model context protocol (MCP)",
        "rel": "docs-mcp",
        "sourceRel": "docs/mcp.md"
      },
      {
        "title": "Models",
        "rel": "docs-models",
        "sourceRel": "docs/models/index.md"
      },
      {
        "title": "Agent orchestration",
        "rel": "docs-multi_agent",
        "sourceRel": "docs/multi_agent.md"
      },
      {
        "title": "Quickstart",
        "rel": "docs-quickstart",
        "sourceRel": "docs/quickstart.md"
      },
      {
        "title": "Realtime agents guide",
        "rel": "docs-realtime-guide",
        "sourceRel": "docs/realtime/guide.md"
      },
      {
        "title": "Quickstart",
        "rel": "docs-realtime-quickstart",
        "sourceRel": "docs/realtime/quickstart.md"
      },
      {
        "title": "Realtime transport",
        "rel": "docs-realtime-transport",
        "sourceRel": "docs/realtime/transport.md"
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
      },
      {
        "title": "Marketing Automation with PocketFlow and Manus",
        "rel": "docs-design-marketing_automation",
        "sourceRel": "docs/design/marketing_automation.md"
      },
      {
        "title": "Research Report: AI Workflow Generators",
        "rel": "examples-pocketflow_marketing-output-ai_workflow_research",
        "sourceRel": "examples/pocketflow_marketing/output/ai_workflow_research.md"
      },
      {
        "title": "Go-To-Market Strategy for DataInsight Pro",
        "rel": "examples-pocketflow_marketing-output-gtm_strategy_output",
        "sourceRel": "examples/pocketflow_marketing/output/gtm_strategy_output.md"
      },
      {
        "title": "Marketing Workflow Output",
        "rel": "examples-pocketflow_marketing-output-marketing_workflow_output",
        "sourceRel": "examples/pocketflow_marketing/output/marketing_workflow_output.md"
      },
      {
        "title": "PocketFlow Marketing Automation Examples",
        "rel": "examples-pocketflow_marketing",
        "sourceRel": "examples/pocketflow_marketing/README.md"
      },
      {
        "title": "Examples",
        "rel": "examples-use_case",
        "sourceRel": "examples/use_case/readme.md"
      },
      {
        "title": "(Advanced) Async",
        "rel": "PocketFlow-docs-core_abstraction-async",
        "sourceRel": "PocketFlow/docs/core_abstraction/async.md"
      },
      {
        "title": "Batch",
        "rel": "PocketFlow-docs-core_abstraction-batch",
        "sourceRel": "PocketFlow/docs/core_abstraction/batch.md"
      },
      {
        "title": "Communication",
        "rel": "PocketFlow-docs-core_abstraction-communication",
        "sourceRel": "PocketFlow/docs/core_abstraction/communication.md"
      },
      {
        "title": "Flow",
        "rel": "PocketFlow-docs-core_abstraction-flow",
        "sourceRel": "PocketFlow/docs/core_abstraction/flow.md"
      },
      {
        "title": "Node",
        "rel": "PocketFlow-docs-core_abstraction-node",
        "sourceRel": "PocketFlow/docs/core_abstraction/node.md"
      },
      {
        "title": "(Advanced) Parallel",
        "rel": "PocketFlow-docs-core_abstraction-parallel",
        "sourceRel": "PocketFlow/docs/core_abstraction/parallel.md"
      },
      {
        "title": "Agent",
        "rel": "PocketFlow-docs-design_pattern-agent",
        "sourceRel": "PocketFlow/docs/design_pattern/agent.md"
      },
      {
        "title": "Map Reduce",
        "rel": "PocketFlow-docs-design_pattern-mapreduce",
        "sourceRel": "PocketFlow/docs/design_pattern/mapreduce.md"
      },
      {
        "title": "Chat Memory",
        "rel": "PocketFlow-docs-design_pattern-memory",
        "sourceRel": "PocketFlow/docs/design_pattern/memory.md"
      },
      {
        "title": "(Advanced) Multi-Agents",
        "rel": "PocketFlow-docs-design_pattern-multi_agent",
        "sourceRel": "PocketFlow/docs/design_pattern/multi_agent.md"
      },
      {
        "title": "RAG (Retrieval Augmented Generation)",
        "rel": "PocketFlow-docs-design_pattern-rag",
        "sourceRel": "PocketFlow/docs/design_pattern/rag.md"
      },
      {
        "title": "Structured Output",
        "rel": "PocketFlow-docs-design_pattern-structure",
        "sourceRel": "PocketFlow/docs/design_pattern/structure.md"
      },
      {
        "title": "Workflow",
        "rel": "PocketFlow-docs-design_pattern-workflow",
        "sourceRel": "PocketFlow/docs/design_pattern/workflow.md"
      },
      {
        "title": "LLM Application Development Playbook",
        "rel": "PocketFlow-docs-guide",
        "sourceRel": "PocketFlow/docs/guide.md"
      },
      {
        "title": "Pocket Flow",
        "rel": "PocketFlow-docs",
        "sourceRel": "PocketFlow/docs/index.md"
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
        "rel": "docs-zh-harness-designs-claude-code",
        "sourceRel": "docs/zh/harness-designs/claude-code/index.md"
      },
      {
        "title": "拆解 Codex 的 harness 设计",
        "rel": "docs-zh-harness-designs-codex",
        "sourceRel": "docs/zh/harness-designs/codex/index.md"
      },
      {
        "title": "拆解 DeepSeek Harness 的设计",
        "rel": "docs-zh-harness-designs-deepseek",
        "sourceRel": "docs/zh/harness-designs/deepseek/index.md"
      },
      {
        "title": "前沿 Harness 拆解",
        "rel": "docs-zh-harness-designs",
        "sourceRel": "docs/zh/harness-designs/index.md"
      },
      {
        "title": "拆解 Pi 的 harness 设计",
        "rel": "docs-zh-harness-designs-pi",
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
        "rel": "docs-zh-lectures-lecture-01-why-capable-agents-still-fail",
        "sourceRel": "docs/zh/lectures/lecture-01-why-capable-agents-still-fail/index.md"
      },
      {
        "title": "Harness 组件示例",
        "rel": "docs-zh-lectures-lecture-02-what-a-harness-actually-is-code-harness-components",
        "sourceRel": "docs/zh/lectures/lecture-02-what-a-harness-actually-is/code/harness-components.md"
      },
      {
        "title": "第二讲. Harness 到底是什么",
        "rel": "docs-zh-lectures-lecture-02-what-a-harness-actually-is",
        "sourceRel": "docs/zh/lectures/lecture-02-what-a-harness-actually-is/index.md"
      },
      {
        "title": "系统记录检查清单",
        "rel": "docs-zh-lectures-lecture-03-why-the-repository-must-become-the-system-of-record-code-system-of-record-checklist",
        "sourceRel": "docs/zh/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/code/system-of-record-checklist.md"
      },
      {
        "title": "第三讲. 让代码仓库成为唯一的事实来源",
        "rel": "docs-zh-lectures-lecture-03-why-the-repository-must-become-the-system-of-record",
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
        "rel": "docs-zh-lectures-lecture-04-why-one-giant-instruction-file-fails",
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
        "title": "s01: The Agent Loop",
        "rel": "docs-en-s01-the-agent-loop",
        "sourceRel": "docs/en/s01-the-agent-loop.md"
      },
      {
        "title": "s02: Tool Use",
        "rel": "docs-en-s02-tool-use",
        "sourceRel": "docs/en/s02-tool-use.md"
      },
      {
        "title": "s03: TodoWrite",
        "rel": "docs-en-s03-todo-write",
        "sourceRel": "docs/en/s03-todo-write.md"
      },
      {
        "title": "s04: Subagents",
        "rel": "docs-en-s04-subagent",
        "sourceRel": "docs/en/s04-subagent.md"
      },
      {
        "title": "s05: Skills",
        "rel": "docs-en-s05-skill-loading",
        "sourceRel": "docs/en/s05-skill-loading.md"
      },
      {
        "title": "s06: Context Compact",
        "rel": "docs-en-s06-context-compact",
        "sourceRel": "docs/en/s06-context-compact.md"
      },
      {
        "title": "s07: Task System",
        "rel": "docs-en-s07-task-system",
        "sourceRel": "docs/en/s07-task-system.md"
      },
      {
        "title": "s08: Background Tasks",
        "rel": "docs-en-s08-background-tasks",
        "sourceRel": "docs/en/s08-background-tasks.md"
      },
      {
        "title": "s09: Agent Teams",
        "rel": "docs-en-s09-agent-teams",
        "sourceRel": "docs/en/s09-agent-teams.md"
      },
      {
        "title": "s10: Team Protocols",
        "rel": "docs-en-s10-team-protocols",
        "sourceRel": "docs/en/s10-team-protocols.md"
      },
      {
        "title": "s11: Autonomous Agents",
        "rel": "docs-en-s11-autonomous-agents",
        "sourceRel": "docs/en/s11-autonomous-agents.md"
      },
      {
        "title": "s12: Worktree + Task Isolation",
        "rel": "docs-en-s12-worktree-task-isolation",
        "sourceRel": "docs/en/s12-worktree-task-isolation.md"
      },
      {
        "title": "s01: The Agent Loop (Agent 循环)",
        "rel": "docs-zh-s01-the-agent-loop",
        "sourceRel": "docs/zh/s01-the-agent-loop.md"
      },
      {
        "title": "s02: Tool Use (工具使用)",
        "rel": "docs-zh-s02-tool-use",
        "sourceRel": "docs/zh/s02-tool-use.md"
      },
      {
        "title": "s03: TodoWrite (待办写入)",
        "rel": "docs-zh-s03-todo-write",
        "sourceRel": "docs/zh/s03-todo-write.md"
      },
      {
        "title": "s04: Subagents (Subagent)",
        "rel": "docs-zh-s04-subagent",
        "sourceRel": "docs/zh/s04-subagent.md"
      },
      {
        "title": "s05: Skills (Skill 加载)",
        "rel": "docs-zh-s05-skill-loading",
        "sourceRel": "docs/zh/s05-skill-loading.md"
      },
      {
        "title": "s06: Context Compact (上下文压缩)",
        "rel": "docs-zh-s06-context-compact",
        "sourceRel": "docs/zh/s06-context-compact.md"
      },
      {
        "title": "s07: Task System (任务系统)",
        "rel": "docs-zh-s07-task-system",
        "sourceRel": "docs/zh/s07-task-system.md"
      },
      {
        "title": "s08: Background Tasks (后台任务)",
        "rel": "docs-zh-s08-background-tasks",
        "sourceRel": "docs/zh/s08-background-tasks.md"
      },
      {
        "title": "s09: Agent Teams (Agent 团队)",
        "rel": "docs-zh-s09-agent-teams",
        "sourceRel": "docs/zh/s09-agent-teams.md"
      },
      {
        "title": "s10: Team Protocols (团队协议)",
        "rel": "docs-zh-s10-team-protocols",
        "sourceRel": "docs/zh/s10-team-protocols.md"
      },
      {
        "title": "s11: Autonomous Agents (Autonomous Agent)",
        "rel": "docs-zh-s11-autonomous-agents",
        "sourceRel": "docs/zh/s11-autonomous-agents.md"
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
        "title": "Appendix: Provider Adapter - DeepSeek / Anthropic tooluse vs OpenAI functioncall",
        "rel": "docs-appendix-provider-adapter",
        "sourceRel": "docs/appendix/provider-adapter.md"
      },
      {
        "title": "WorkBuddy Harness 架构图谱",
        "rel": "docs-architecture-harness-map",
        "sourceRel": "docs/architecture/harness-map.md"
      },
      {
        "title": "Source And Memory System",
        "rel": "docs-architecture-source-and-memory-system",
        "sourceRel": "docs/architecture/source-and-memory-system.md"
      },
      {
        "title": "Chapter Map",
        "rel": "docs-chapter-map",
        "sourceRel": "docs/chapter-map.md"
      },
      {
        "title": "Code Quality Review",
        "rel": "docs-code-quality-review",
        "sourceRel": "docs/code-quality-review.md"
      },
      {
        "title": "Model Benchmark Sample Report",
        "rel": "docs-evidence-model-benchmark-sample",
        "sourceRel": "docs/evidence/model-benchmark-sample.md"
      },
      {
        "title": "WorkBuddy-Style Harness Research Summary",
        "rel": "docs-evidence-workbuddy-5.2.3",
        "sourceRel": "docs/evidence/workbuddy-5.2.3.md"
      },
      {
        "title": "Public Research Material Review",
        "rel": "docs-evidence-workbuddy-self-analysis-review",
        "sourceRel": "docs/evidence/workbuddy-self-analysis-review.md"
      },
      {
        "title": "Further Reading Map",
        "rel": "docs-further-reading",
        "sourceRel": "docs/further-reading.md"
      },
      {
        "title": "Learning Guide",
        "rel": "docs-learning-guide",
        "sourceRel": "docs/learning-guide.md"
      },
      {
        "title": "Clean-room Boundary",
        "rel": "docs-legal-clean-room",
        "sourceRel": "docs/legal/clean-room.md"
      },
      {
        "title": "Progression Contract",
        "rel": "docs-progression-contract",
        "sourceRel": "docs/progression-contract.md"
      },
      {
        "title": "Review & Fixes — 对标 learn-claude-code",
        "rel": "docs-review-and-fixes",
        "sourceRel": "docs/review-and-fixes.md"
      },
      {
        "title": "安全边界：先读这个，再信任代码",
        "rel": "docs-security-boundaries",
        "sourceRel": "docs/security-boundaries.md"
      },
      {
        "title": "Skill Evolution & Evaluation (Reference)",
        "rel": "docs-skill-evolution-and-evaluation",
        "sourceRel": "docs/skill-evolution-and-evaluation.md"
      },
      {
        "title": "Visual Tour",
        "rel": "docs-visual-tour",
        "sourceRel": "docs/visual-tour.md"
      },
      {
        "title": "Answer-grounded RAG Evaluation：回答里的每个 Claim 由什么证据支持",
        "rel": "examples-answer_grounding_eval",
        "sourceRel": "examples/answer_grounding_eval/README.md"
      },
      {
        "title": "Retrieval-to-Prompt Context Pipeline：检索结果怎样安全进入 Prompt",
        "rel": "examples-context_pipeline_walkthrough",
        "sourceRel": "examples/context_pipeline_walkthrough/README.md"
      },
      {
        "title": "Full Tour：一次跑遍完整 harness",
        "rel": "examples-full_tour",
        "sourceRel": "examples/full_tour/README.md"
      },
      {
        "title": "Layered Memory Walkthrough：一次看清五类状态",
        "rel": "examples-layered_memory_walkthrough",
        "sourceRel": "examples/layered_memory_walkthrough/README.md"
      },
      {
        "title": "Memory Resilience Evaluation：用故障注入验证长期记忆边界",
        "rel": "examples-memory_resilience_eval",
        "sourceRel": "examples/memory_resilience_eval/README.md"
      },
      {
        "title": "Mini WorkBuddy 集成 demo",
        "rel": "examples-mini_workbuddy_demo",
        "sourceRel": "examples/mini_workbuddy_demo/README.md"
      },
      {
        "title": "Reflection Memory 离线示例",
        "rel": "examples-reflection_memory",
        "sourceRel": "examples/reflection_memory/README.md"
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
        "title": "Claude Code Ultimate Guide - Project Context",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Pedagogy Note: Skills–Commands Merger (CC 2.1.3)",
        "rel": "claudedocs-pedagogy-skills-merger",
        "sourceRel": "claudedocs/pedagogy-skills-merger.md"
      },
      {
        "title": "Competitive Analysis: Claude Code Guides & Resources",
        "rel": "docs-competitive-analysis",
        "sourceRel": "docs/competitive-analysis.md"
      },
      {
        "title": "Quick-Win Video Series",
        "rel": "docs-distribution-quick-win-video-series",
        "sourceRel": "docs/distribution/quick-win-video-series.md"
      },
      {
        "title": "Distribution Assets",
        "rel": "docs-distribution",
        "sourceRel": "docs/distribution/README.md"
      },
      {
        "title": "Ecosystem: 6 Interconnected Repositories",
        "rel": "docs-ecosystem",
        "sourceRel": "docs/ecosystem.md"
      },
      {
        "title": "Claude Code: For CIOs & CEOs",
        "rel": "docs-for-cio-ceo",
        "sourceRel": "docs/for-cio-ceo.md"
      },
      {
        "title": "Claude Code: For CTOs & Decision Makers",
        "rel": "docs-for-cto",
        "sourceRel": "docs/for-cto.md"
      },
      {
        "title": "Claude Code: For Product Managers & Product Designers",
        "rel": "docs-for-product-managers",
        "sourceRel": "docs/for-product-managers.md"
      },
      {
        "title": "Claude Code: For Tech Leads & Engineering Managers",
        "rel": "docs-for-tech-leads",
        "sourceRel": "docs/for-tech-leads.md"
      },
      {
        "title": "Scheduled public-mentions search",
        "rel": "docs-media-mentions-perplexity-scheduled-search",
        "sourceRel": "docs/media-mentions/perplexity-scheduled-search.md"
      },
      {
        "title": "Media Mentions Tracker",
        "rel": "docs-media-mentions",
        "sourceRel": "docs/media-mentions/README.md"
      },
      {
        "title": "Resource Evaluation: Everything Claude Code (GitHub Repository)",
        "rel": "docs-resource-evaluations-015-everything-claude-code-github-repo",
        "sourceRel": "docs/resource-evaluations/015-everything-claude-code-github-repo.md"
      },
      {
        "title": "Resource Evaluation: Gang Rui's Tasks API Limitations Analysis",
        "rel": "docs-resource-evaluations-016-gang-rui-tasks-api-limitations",
        "sourceRel": "docs/resource-evaluations/016-gang-rui-tasks-api-limitations.md"
      },
      {
        "title": "Pat Cullen - Multi-Agent PR Review (Final Review)",
        "rel": "docs-resource-evaluations-017-pat-cullen-final-review",
        "sourceRel": "docs/resource-evaluations/017-pat-cullen-final-review.md"
      },
      {
        "title": "Resource Evaluation: Community Discussions Analysis Report (January 2026)",
        "rel": "docs-resource-evaluations-023-community-discussions-report-jan2026",
        "sourceRel": "docs/resource-evaluations/023-community-discussions-report-jan2026.md"
      },
      {
        "title": "Resource Evaluation: \"The 80% Problem in Agentic Coding\"",
        "rel": "docs-resource-evaluations-024-addy-osmani-80-percent-problem",
        "sourceRel": "docs/resource-evaluations/024-addy-osmani-80-percent-problem.md"
      },
      {
        "title": "Évaluation Ressource: Signaux communautaires Claude Code: Janvier–Février 2026",
        "rel": "docs-resource-evaluations-025-community-signals-feb2026",
        "sourceRel": "docs/resource-evaluations/025-community-signals-feb2026.md"
      },
      {
        "title": "Resource Evaluation: \"AGENTS.md Outperforms Skills in Our Agent Evals\"",
        "rel": "docs-resource-evaluations-025-vercel-agents-md-vs-skills-eval",
        "sourceRel": "docs/resource-evaluations/025-vercel-agents-md-vs-skills-eval.md"
      },
      {
        "title": "Resource Evaluation: Contribution Metrics (Anthropic Blog)",
        "rel": "docs-resource-evaluations-026-contribution-metrics-blog",
        "sourceRel": "docs/resource-evaluations/026-contribution-metrics-blog.md"
      },
      {
        "title": "Resource Evaluation: shanraisshan/claude-code-best-practice — Claude Code Best Practices Repo",
        "rel": "docs-resource-evaluations-069-claude-code-best-practice-repo-eval",
        "sourceRel": "docs/resource-evaluations/069-claude-code-best-practice-repo-eval.md"
      },
      {
        "title": "Resource Evaluation: .claude/ Config — shanraisshan/claude-code-best-practice",
        "rel": "docs-resource-evaluations-070-claude-code-best-practice-dot-claude-eval",
        "sourceRel": "docs/resource-evaluations/070-claude-code-best-practice-dot-claude-eval.md"
      },
      {
        "title": "Resource Evaluation 071: Steven Ge: Claude Code for Technical Writing",
        "rel": "docs-resource-evaluations-071-steven-ge-technical-writing-workflow",
        "sourceRel": "docs/resource-evaluations/071-steven-ge-technical-writing-workflow.md"
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
        "title": "@deepseek-ai/dsh",
        "rel": "apps-cli",
        "sourceRel": "apps/cli/README.md"
      },
      {
        "title": "@deepseek-ai/dsh",
        "rel": "apps-cli-README.zh",
        "sourceRel": "apps/cli/README.zh.md"
      },
      {
        "title": "dsh CLI behavior reference",
        "rel": "apps-cli-reference",
        "sourceRel": "apps/cli/reference/README.md"
      },
      {
        "title": "dsh CLI（命令行界面）行为参考",
        "rel": "apps-cli-reference-README.zh",
        "sourceRel": "apps/cli/reference/README.zh.md"
      },
      {
        "title": "DeepSeek Harness Desktop",
        "rel": "apps-desktop",
        "sourceRel": "apps/desktop/README.md"
      },
      {
        "title": "DeepSeek Harness 桌面端",
        "rel": "apps-desktop-README.zh",
        "sourceRel": "apps/desktop/README.zh.md"
      },
      {
        "title": "apps/web browser e2e",
        "rel": "apps-web-tests",
        "sourceRel": "apps/web/tests/README.md"
      },
      {
        "title": "apps/web 浏览器 e2e",
        "rel": "apps-web-tests-README.zh",
        "sourceRel": "apps/web/tests/README.zh.md"
      },
      {
        "title": "Running benchmarks",
        "rel": "BENCHMARK",
        "sourceRel": "BENCHMARK.md"
      },
      {
        "title": "Active Assistant reconnect benchmark",
        "rel": "benchmarks-active-stream-reconnect",
        "sourceRel": "benchmarks/active-stream-reconnect/README.md"
      },
      {
        "title": "活跃 Assistant 重连基准",
        "rel": "benchmarks-active-stream-reconnect-README.zh",
        "sourceRel": "benchmarks/active-stream-reconnect/README.zh.md"
      },
      {
        "title": "Backend continuation benchmarks",
        "rel": "benchmarks-agent-continuation",
        "sourceRel": "benchmarks/agent-continuation/README.md"
      },
      {
        "title": "后端续聊基准",
        "rel": "benchmarks-agent-continuation-README.zh",
        "sourceRel": "benchmarks/agent-continuation/README.zh.md"
      },
      {
        "title": "Long-session browser benchmark",
        "rel": "benchmarks-long-session-browser",
        "sourceRel": "benchmarks/long-session-browser/README.md"
      },
      {
        "title": "长会话浏览器基准",
        "rel": "benchmarks-long-session-browser-README.zh",
        "sourceRel": "benchmarks/long-session-browser/README.zh.md"
      },
      {
        "title": "贡献",
        "rel": "CONTRIBUTING.zh",
        "sourceRel": "CONTRIBUTING.zh.md"
      },
      {
        "title": "Bilingual documentation",
        "rel": "docs-i18n",
        "sourceRel": "docs/i18n/README.md"
      },
      {
        "title": "双语文档",
        "rel": "docs-i18n-README.zh",
        "sourceRel": "docs/i18n/README.zh.md"
      },
      {
        "title": "Post-mortems",
        "rel": "docs-postmortem",
        "sourceRel": "docs/postmortem/README.md"
      },
      {
        "title": "事故复盘（postmortem）",
        "rel": "docs-postmortem-README.zh",
        "sourceRel": "docs/postmortem/README.zh.md"
      },
      {
        "title": "Safety",
        "rel": "SAFETY",
        "sourceRel": "SAFETY.md"
      },
      {
        "title": "安全",
        "rel": "SAFETY.zh",
        "sourceRel": "SAFETY.zh.md"
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
        "title": "Claude How-To",
        "rel": "01-slash-commands-commit",
        "sourceRel": "01-slash-commands/commit.md"
      },
      {
        "title": "Documentation Refactor",
        "rel": "01-slash-commands-doc-refactor",
        "sourceRel": "01-slash-commands/doc-refactor.md"
      },
      {
        "title": "API Documentation Generator",
        "rel": "01-slash-commands-generate-api-docs",
        "sourceRel": "01-slash-commands/generate-api-docs.md"
      },
      {
        "title": "Code Optimization",
        "rel": "01-slash-commands-optimize",
        "sourceRel": "01-slash-commands/optimize.md"
      },
      {
        "title": "Pull Request Preparation Checklist",
        "rel": "01-slash-commands-pr",
        "sourceRel": "01-slash-commands/pr.md"
      },
      {
        "title": "Commit and Push Everything",
        "rel": "01-slash-commands-push-all",
        "sourceRel": "01-slash-commands/push-all.md"
      },
      {
        "title": "Slash Commands",
        "rel": "01-slash-commands",
        "sourceRel": "01-slash-commands/README.md"
      },
      {
        "title": "Setup CI/CD Pipeline",
        "rel": "01-slash-commands-setup-ci-cd",
        "sourceRel": "01-slash-commands/setup-ci-cd.md"
      },
      {
        "title": "Expand Unit Tests",
        "rel": "01-slash-commands-unit-test-expand",
        "sourceRel": "01-slash-commands/unit-test-expand.md"
      },
      {
        "title": "API Module Standards",
        "rel": "02-memory-directory-api-CLAUDE",
        "sourceRel": "02-memory/directory-api-CLAUDE.md"
      },
      {
        "title": "My Development Preferences",
        "rel": "02-memory-personal-CLAUDE",
        "sourceRel": "02-memory/personal-CLAUDE.md"
      },
      {
        "title": "Project Configuration",
        "rel": "02-memory-project-CLAUDE",
        "sourceRel": "02-memory/project-CLAUDE.md"
      },
      {
        "title": "Memory Guide",
        "rel": "02-memory",
        "sourceRel": "02-memory/README.md"
      },
      {
        "title": "Claude How-To",
        "rel": "03-skills-blog-draft-SKILL",
        "sourceRel": "03-skills/blog-draft/SKILL.md"
      },
      {
        "title": "[Blog Post Title]",
        "rel": "03-skills-blog-draft-templates-draft-template",
        "sourceRel": "03-skills/blog-draft/templates/draft-template.md"
      },
      {
        "title": "Blog Post Outline: [Title]",
        "rel": "03-skills-blog-draft-templates-outline-template",
        "sourceRel": "03-skills/blog-draft/templates/outline-template.md"
      },
      {
        "title": "Brand Voice Skill",
        "rel": "03-skills-brand-voice-SKILL",
        "sourceRel": "03-skills/brand-voice/SKILL.md"
      },
      {
        "title": "Brand Voice Tone Examples",
        "rel": "03-skills-brand-voice-tone-examples",
        "sourceRel": "03-skills/brand-voice/tone-examples.md"
      },
      {
        "title": "Claude How-To",
        "rel": "03-skills-claude-md-SKILL",
        "sourceRel": "03-skills/claude-md/SKILL.md"
      },
      {
        "title": "Code Review Skill",
        "rel": "03-skills-code-review-specialist-SKILL",
        "sourceRel": "03-skills/code-review-specialist/SKILL.md"
      },
      {
        "title": "Code Review Finding Template",
        "rel": "03-skills-code-review-specialist-templates-finding-template",
        "sourceRel": "03-skills/code-review-specialist/templates/finding-template.md"
      },
      {
        "title": "Code Review Checklist",
        "rel": "03-skills-code-review-specialist-templates-review-checklist",
        "sourceRel": "03-skills/code-review-specialist/templates/review-checklist.md"
      },
      {
        "title": "API Documentation Generator Skill",
        "rel": "03-skills-doc-generator-SKILL",
        "sourceRel": "03-skills/doc-generator/SKILL.md"
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
        "title": "Studio is a desktop application, so it follows the host appearance until the",
        "rel": "DESIGN",
        "sourceRel": "DESIGN.md"
      },
      {
        "title": "Host Adapter Matrix",
        "rel": "docs-adapters",
        "sourceRel": "docs/adapters/README.md"
      },
      {
        "title": "Checkpoint-backed Compare Sources and Materialization",
        "rel": "docs-adrs-checkpoint-backed-compare-sources",
        "sourceRel": "docs/adrs/checkpoint-backed-compare-sources.md"
      },
      {
        "title": "ADR: Developer Experience System",
        "rel": "docs-adrs-developer-experience-system",
        "sourceRel": "docs/adrs/developer-experience-system.md"
      },
      {
        "title": "ADR: AI-Optimized Directory Structure",
        "rel": "docs-adrs-directory-structure",
        "sourceRel": "docs/adrs/directory-structure.md"
      },
      {
        "title": "Harness Checkpoint Experiment Compare",
        "rel": "docs-adrs-harness-checkpoint-experiment-compare",
        "sourceRel": "docs/adrs/harness-checkpoint-experiment-compare.md"
      },
      {
        "title": "Harness Run Evidence Bridge",
        "rel": "docs-adrs-harness-run-evidence-bridge",
        "sourceRel": "docs/adrs/harness-run-evidence-bridge.md"
      },
      {
        "title": "Memory 范围、导航与分析",
        "rel": "docs-adrs-memory-navigation-and-analysis",
        "sourceRel": "docs/adrs/memory-navigation-and-analysis.md"
      },
      {
        "title": "Ontology Language Analysis Runtime",
        "rel": "docs-adrs-ontology-language-runtime",
        "sourceRel": "docs/adrs/ontology-language-runtime.md"
      },
      {
        "title": "Architecture Decision Records",
        "rel": "docs-adrs",
        "sourceRel": "docs/adrs/README.md"
      },
      {
        "title": "Session notebook trace and outcome projection",
        "rel": "docs-adrs-session-notebook-evidence-projection",
        "sourceRel": "docs/adrs/session-notebook-evidence-projection.md"
      },
      {
        "title": "Harness Studio Artifact runtime and provider architecture",
        "rel": "docs-adrs-studio-artifact-runtime-and-providers",
        "sourceRel": "docs/adrs/studio-artifact-runtime-and-providers.md"
      },
      {
        "title": "Architecture Principles",
        "rel": "docs-ARCHITECTURE",
        "sourceRel": "docs/ARCHITECTURE.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-blog-2026-07-30-better-harness-in-qoder",
        "sourceRel": "docs/blog/2026-07-30-better-harness-in-qoder.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-blog-2026-07-30-better-harness-is-now-open-source",
        "sourceRel": "docs/blog/2026-07-30-better-harness-is-now-open-source.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-blog-2026-08-09-agent-plugin-engineering",
        "sourceRel": "docs/blog/2026-08-09-agent-plugin-engineering.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-blog-2026-08-14-harness-inspector",
        "sourceRel": "docs/blog/2026-08-14-harness-inspector.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-blog-2026-09-09-organizational-harness-engineering",
        "sourceRel": "docs/blog/2026-09-09-organizational-harness-engineering.md"
      },
      {
        "title": "Community Extensibility",
        "rel": "docs-community",
        "sourceRel": "docs/community.md"
      },
      {
        "title": "Better Harness Concepts (one page)",
        "rel": "docs-concepts",
        "sourceRel": "docs/concepts.md"
      },
      {
        "title": "Better Harness Glossary",
        "rel": "docs-glossary",
        "sourceRel": "docs/glossary.md"
      },
      {
        "title": "Better Harness（QoderAI）",
        "rel": "docs-i18n-zh-Hans-docusaurus-plugin-content-blog-2026-08-14-harness-inspector",
        "sourceRel": "docs/i18n/zh-Hans/docusaurus-plugin-content-blog/2026-08-14-harness-inspector.md"
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
      },
      {
        "title": "Academic Paper Reviewer — Simulated Peer Review",
        "rel": "skills-academic-paper-reviewer-SKILL",
        "sourceRel": "skills/academic-paper-reviewer/SKILL.md"
      },
      {
        "title": "Advanced Active Directory Attacks Reference",
        "rel": "skills-active-directory-attacks-references-advanced-attacks",
        "sourceRel": "skills/active-directory-attacks/references/advanced-attacks.md"
      },
      {
        "title": "Active Directory Attacks",
        "rel": "skills-active-directory-attacks-SKILL",
        "sourceRel": "skills/active-directory-attacks/SKILL.md"
      },
      {
        "title": "API Fuzzing for Bug Bounty",
        "rel": "skills-api-fuzzing-bug-bounty-SKILL",
        "sourceRel": "skills/api-fuzzing-bug-bounty/SKILL.md"
      },
      {
        "title": "Design an Interface",
        "rel": "skills-api-shape-explorer-SKILL",
        "sourceRel": "skills/api-shape-explorer/SKILL.md"
      },
      {
        "title": "Audit Flow Commands",
        "rel": "skills-audit-flow-COMMANDS",
        "sourceRel": "skills/audit-flow/COMMANDS.md"
      },
      {
        "title": "Audit Flow Examples",
        "rel": "skills-audit-flow-EXAMPLES",
        "sourceRel": "skills/audit-flow/EXAMPLES.md"
      },
      {
        "title": "Audit Flow",
        "rel": "skills-audit-flow-SKILL",
        "sourceRel": "skills/audit-flow/SKILL.md"
      },
      {
        "title": "Authentication Patterns Skill",
        "rel": "skills-authentication-patterns-SKILL",
        "sourceRel": "skills/authentication-patterns/SKILL.md"
      },
      {
        "title": "Advanced AWS Penetration Testing Reference",
        "rel": "skills-aws-penetration-testing-references-advanced-aws-pentesting",
        "sourceRel": "skills/aws-penetration-testing/references/advanced-aws-pentesting.md"
      },
      {
        "title": "AWS Penetration Testing",
        "rel": "skills-aws-penetration-testing-SKILL",
        "sourceRel": "skills/aws-penetration-testing/SKILL.md"
      },
      {
        "title": "Burp Suite Web Application Testing",
        "rel": "skills-burp-suite-testing-SKILL",
        "sourceRel": "skills/burp-suite-testing/SKILL.md"
      },
      {
        "title": "Claude Code Guide（zebbern）",
        "rel": "skills-caching-SKILL",
        "sourceRel": "skills/caching/SKILL.md"
      },
      {
        "title": "chart-generation Capability",
        "rel": "skills-chart-image-CAPABILITY",
        "sourceRel": "skills/chart-image/CAPABILITY.md"
      },
      {
        "title": "📊 chart-image",
        "rel": "skills-chart-image",
        "sourceRel": "skills/chart-image/README.md"
      },
      {
        "title": "Chart Image Generator",
        "rel": "skills-chart-image-SKILL",
        "sourceRel": "skills/chart-image/SKILL.md"
      },
      {
        "title": "Advanced Cloud Pentesting Scripts",
        "rel": "skills-cloud-penetration-testing-references-advanced-cloud-scripts",
        "sourceRel": "skills/cloud-penetration-testing/references/advanced-cloud-scripts.md"
      },
      {
        "title": "Cloud Penetration Testing",
        "rel": "skills-cloud-penetration-testing-SKILL",
        "sourceRel": "skills/cloud-penetration-testing/SKILL.md"
      },
      {
        "title": "API Documentation: FastAPI & Django",
        "rel": "skills-code-documenter-references-api-docs-fastapi-django",
        "sourceRel": "skills/code-documenter/references/api-docs-fastapi-django.md"
      },
      {
        "title": "API Documentation: NestJS & Express",
        "rel": "skills-code-documenter-references-api-docs-nestjs-express",
        "sourceRel": "skills/code-documenter/references/api-docs-nestjs-express.md"
      },
      {
        "title": "Coverage Reports",
        "rel": "skills-code-documenter-references-coverage-reports",
        "sourceRel": "skills/code-documenter/references/coverage-reports.md"
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
        "title": "CMS Migration TODO",
        "rel": "site-CMS-TODO",
        "sourceRel": "site/CMS-TODO.md"
      },
      {
        "title": "AWS CDK App Runner Deployment Example",
        "rel": "site-docs-examples-cdk-deploy_to_apprunner",
        "sourceRel": "site/docs/examples/cdk/deploy_to_apprunner/README.md"
      },
      {
        "title": "AWS CDK EC2 Deployment Example",
        "rel": "site-docs-examples-cdk-deploy_to_ec2",
        "sourceRel": "site/docs/examples/cdk/deploy_to_ec2/README.md"
      },
      {
        "title": "AWS CDK Fargate Deployment Example",
        "rel": "site-docs-examples-cdk-deploy_to_fargate",
        "sourceRel": "site/docs/examples/cdk/deploy_to_fargate/README.md"
      },
      {
        "title": "AWS CDK Lambda Deployment Example",
        "rel": "site-docs-examples-cdk-deploy_to_lambda",
        "sourceRel": "site/docs/examples/cdk/deploy_to_lambda/README.md"
      },
      {
        "title": "Amazon EKS Deployment Example",
        "rel": "site-docs-examples-deploy_to_eks",
        "sourceRel": "site/docs/examples/deploy_to_eks/README.md"
      },
      {
        "title": "Multi-Agent Example",
        "rel": "site-docs-examples-python-multi_agent_example",
        "sourceRel": "site/docs/examples/python/multi_agent_example/index.md"
      },
      {
        "title": "TypeScript Agent Deployment to Amazon Bedrock AgentCore Runtime",
        "rel": "site-docs-examples-typescript-deploy_to_bedrock_agentcore",
        "sourceRel": "site/docs/examples/typescript/deploy_to_bedrock_agentcore/README.md"
      },
      {
        "title": "Astro/Starlight CMS Customizations",
        "rel": "site-SITE-ARCHITECTURE",
        "sourceRel": "site/SITE-ARCHITECTURE.md"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-an-agent-for-the-thing-you-keep-putting-off",
        "sourceRel": "site/src/content/blog/an-agent-for-the-thing-you-keep-putting-off.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-evaluating-ai-agents-practical-guide-strands-evals",
        "sourceRel": "site/src/content/blog/evaluating-ai-agents-practical-guide-strands-evals.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-figma-to-code-at-scale-building-with-strands-agents",
        "sourceRel": "site/src/content/blog/figma-to-code-at-scale-building-with-strands-agents.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-inside-agentic-football-cup",
        "sourceRel": "site/src/content/blog/inside-agentic-football-cup.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-interleaved-thinking-claude-4",
        "sourceRel": "site/src/content/blog/interleaved-thinking-claude-4.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-introducing-harness-optimizer",
        "sourceRel": "site/src/content/blog/introducing-harness-optimizer.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-introducing-strands-agent-sops",
        "sourceRel": "site/src/content/blog/introducing-strands-agent-sops.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-introducing-strands-agents",
        "sourceRel": "site/src/content/blog/introducing-strands-agents.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-introducing-strands-labs",
        "sourceRel": "site/src/content/blog/introducing-strands-labs.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-multimodal-evaluators-mllm-as-a-judge-image-to-text-strands-evals",
        "sourceRel": "site/src/content/blog/multimodal-evaluators-mllm-as-a-judge-image-to-text-strands-evals.mdx"
      },
      {
        "title": "Strands Harness SDK",
        "rel": "site-src-content-blog-our-production-sdk-hit-99-95-on-arc-agi-3",
        "sourceRel": "site/src/content/blog/our-production-sdk-hit-99-95-on-arc-agi-3.mdx"
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
        "rel": "agents-advisor",
        "sourceRel": "agents/advisor.md"
      },
      {
        "title": "livemsg-gate",
        "rel": "agents-livemsg-gate",
        "sourceRel": "agents/livemsg-gate.md"
      },
      {
        "title": "Reviewer Agent",
        "rel": "agents-reviewer",
        "sourceRel": "agents/reviewer.md"
      },
      {
        "title": "Test-Wiring Auditor Agent",
        "rel": "agents-test-wiring-auditor",
        "sourceRel": "agents/test-wiring-auditor.md"
      },
      {
        "title": "Worker Agent",
        "rel": "agents-worker",
        "sourceRel": "agents/worker.md"
      },
      {
        "title": "Advisor Strategy",
        "rel": "docs-advisor-strategy",
        "sourceRel": "docs/advisor-strategy.md"
      },
      {
        "title": "Agent Frontmatter Policy",
        "rel": "docs-agent-frontmatter-policy",
        "sourceRel": "docs/agent-frontmatter-policy.md"
      },
      {
        "title": "Agent View (claude agents) Policy",
        "rel": "docs-agent-view-policy",
        "sourceRel": "docs/agent-view-policy.md"
      },
      {
        "title": "Claude harness Architecture",
        "rel": "docs-ARCHITECTURE",
        "sourceRel": "docs/ARCHITECTURE.md"
      },
      {
        "title": "Hokage Core Cross-Harness Architecture",
        "rel": "docs-architecture-hokage-core",
        "sourceRel": "docs/architecture/hokage-core.md"
      },
      {
        "title": "Review Calibration",
        "rel": "docs-architecture-review-calibration",
        "sourceRel": "docs/architecture/review-calibration.md"
      },
      {
        "title": "Benchmark Rubric",
        "rel": "docs-benchmark-rubric",
        "sourceRel": "docs/benchmark-rubric.md"
      },
      {
        "title": "Bootstrap Routing Contract",
        "rel": "docs-bootstrap-routing-contract",
        "sourceRel": "docs/bootstrap-routing-contract.md"
      },
      {
        "title": "Branch Alignment Ledger",
        "rel": "docs-branch-alignment-ledger",
        "sourceRel": "docs/branch-alignment-ledger.md"
      },
      {
        "title": "Claude Code 2.1.99 → 2.1.110 — Harness 影響分類",
        "rel": "docs-cc-2.1.99-2.1.110-impact",
        "sourceRel": "docs/cc-2.1.99-2.1.110-impact.md"
      },
      {
        "title": "Claude Code 2.1.99-2.1.111 影響整理",
        "rel": "docs-cc-2.1.99-2.1.111-impact",
        "sourceRel": "docs/cc-2.1.99-2.1.111-impact.md"
      },
      {
        "title": "Claims Audit",
        "rel": "docs-claims-audit",
        "sourceRel": "docs/claims-audit.md"
      },
      {
        "title": "Claude Code Compatibility",
        "rel": "docs-CLAUDE_CODE_COMPATIBILITY",
        "sourceRel": "docs/CLAUDE_CODE_COMPATIBILITY.md"
      },
      {
        "title": "Claude Code Setup: MCP, Telemetry, Provider Guidance",
        "rel": "docs-claude-code-setup-mcp-telemetry-provider",
        "sourceRel": "docs/claude-code-setup-mcp-telemetry-provider.md"
      },
      {
        "title": "主要コマンド一覧",
        "rel": "docs-CLAUDE-commands",
        "sourceRel": "docs/CLAUDE-commands.md"
      },
      {
        "title": "Claude Code / Codex Feature Table（upstream snapshot 完全版）",
        "rel": "docs-CLAUDE-feature-table",
        "sourceRel": "docs/CLAUDE-feature-table.md"
      },
      {
        "title": "Claude host livemsg delivery (Mode 2)",
        "rel": "docs-claude-livemsg-delivery",
        "sourceRel": "docs/claude-livemsg-delivery.md"
      },
      {
        "title": "CLAUDE.md 構造監査 — Phase 47.1.1 調査レポート",
        "rel": "docs-claude-md-structure-audit",
        "sourceRel": "docs/claude-md-structure-audit.md"
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
        "rel": "book-src-appendix-a-file-",
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
        "title": "Video 1: From Vibe Coding to Agentic Engineering — Workflows with Claude Code",
        "rel": "_-video-presentation-transcript-1-video-workflow",
        "sourceRel": "!/video-presentation-transcript/1-video-workflow.md"
      },
      {
        "title": "Claude Code Best Practice",
        "rel": "agent-teams-agent-teams-prompt",
        "sourceRel": "agent-teams/agent-teams-prompt.md"
      },
      {
        "title": "Dubai Time Card",
        "rel": "agent-teams-output-output",
        "sourceRel": "agent-teams/output/output.md"
      },
      {
        "title": "CLI Startup Flags Best Practice",
        "rel": "best-practice-claude-cli-startup-flags",
        "sourceRel": "best-practice/claude-cli-startup-flags.md"
      },
      {
        "title": "Commands Best Practice",
        "rel": "best-practice-claude-commands",
        "sourceRel": "best-practice/claude-commands.md"
      },
      {
        "title": "MCP Servers Best Practice",
        "rel": "best-practice-claude-mcp",
        "sourceRel": "best-practice/claude-mcp.md"
      },
      {
        "title": "Claude Memory",
        "rel": "best-practice-claude-memory",
        "sourceRel": "best-practice/claude-memory.md"
      },
      {
        "title": "Settings Best Practice",
        "rel": "best-practice-claude-settings",
        "sourceRel": "best-practice/claude-settings.md"
      },
      {
        "title": "Skills Best Practice",
        "rel": "best-practice-claude-skills",
        "sourceRel": "best-practice/claude-skills.md"
      },
      {
        "title": "Sub-agents Best Practice",
        "rel": "best-practice-claude-subagents",
        "sourceRel": "best-practice/claude-subagents.md"
      },
      {
        "title": "Verification Checklist — Settings Report",
        "rel": "changelog-best-practice-claude-settings-verification-checklist",
        "sourceRel": "changelog/best-practice/claude-settings/verification-checklist.md"
      },
      {
        "title": "Verification Checklist — Subagents Report",
        "rel": "changelog-best-practice-claude-subagents-verification-checklist",
        "sourceRel": "changelog/best-practice/claude-subagents/verification-checklist.md"
      },
      {
        "title": "Verification Checklist — README CONCEPTS Section",
        "rel": "changelog-best-practice-concepts-verification-checklist",
        "sourceRel": "changelog/best-practice/concepts/verification-checklist.md"
      },
      {
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Cross-Model (Claude Code + Codex) Workflow",
        "rel": "development-workflows-cross-model-workflow-cross-model-workflow",
        "sourceRel": "development-workflows/cross-model-workflow/cross-model-workflow.md"
      },
      {
        "title": "RPI Workflow",
        "rel": "development-workflows-rpi-rpi-workflow",
        "sourceRel": "development-workflows/rpi/rpi-workflow.md"
      },
      {
        "title": "Agent Teams Implementation",
        "rel": "implementation-claude-agent-teams-implementation",
        "sourceRel": "implementation/claude-agent-teams-implementation.md"
      },
      {
        "title": "Commands Implementation",
        "rel": "implementation-claude-commands-implementation",
        "sourceRel": "implementation/claude-commands-implementation.md"
      },
      {
        "title": "Goal Implementation",
        "rel": "implementation-claude-goal-implementation",
        "sourceRel": "implementation/claude-goal-implementation.md"
      },
      {
        "title": "Skills Implementation",
        "rel": "implementation-claude-skills-implementation",
        "sourceRel": "implementation/claude-skills-implementation.md"
      },
      {
        "title": "Sub-agents Implementation",
        "rel": "implementation-claude-subagents-implementation",
        "sourceRel": "implementation/claude-subagents-implementation.md"
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
        "rel": "concepts-00-overview",
        "sourceRel": "concepts/00-overview.md"
      },
      {
        "title": "仓库即记录系统（Repo as System of Record）",
        "rel": "concepts-01-repo-as-source-of-truth",
        "sourceRel": "concepts/01-repo-as-source-of-truth.md"
      },
      {
        "title": "机械化执行（Mechanical Enforcement）",
        "rel": "concepts-02-mechanical-enforcement",
        "sourceRel": "concepts/02-mechanical-enforcement.md"
      },
      {
        "title": "熵管理与垃圾回收（Entropy & Garbage Collection）",
        "rel": "concepts-03-entropy-and-garbage-collection",
        "sourceRel": "concepts/03-entropy-and-garbage-collection.md"
      },
      {
        "title": "智能体可读性（Agent Readability）",
        "rel": "concepts-04-agent-readability",
        "sourceRel": "concepts/04-agent-readability.md"
      },
      {
        "title": "吞吐量改变合并理念（Throughput Changes Merge Philosophy）",
        "rel": "concepts-05-throughput-changes-merge",
        "sourceRel": "concepts/05-throughput-changes-merge.md"
      },
      {
        "title": "Harness 的精确定义与组件清单",
        "rel": "concepts-06-harness-definition",
        "sourceRel": "concepts/06-harness-definition.md"
      },
      {
        "title": "约束即产品（Spec as Product）",
        "rel": "concepts-07-spec-as-product",
        "sourceRel": "concepts/07-spec-as-product.md"
      },
      {
        "title": "翻译即 Harness：一个非代码场景的 Harness Engineering 实践",
        "rel": "feedback-2026-04-14-translation-as-harness",
        "sourceRel": "feedback/2026-04-14-translation-as-harness.md"
      },
      {
        "title": "Task: Build a CLI word counter",
        "rel": "practice-01-ralph-demo-PROMPT",
        "sourceRel": "practice/01-ralph-demo/PROMPT.md"
      },
      {
        "title": "实验 01：用 Ralph Orchestrator 跑一个完整的编排循环",
        "rel": "practice-01-ralph-demo",
        "sourceRel": "practice/01-ralph-demo/README.md"
      },
      {
        "title": "深度研究追踪 Prompt",
        "rel": "prompts-deep-research-tracker",
        "sourceRel": "prompts/deep-research-tracker.md"
      },
      {
        "title": "Harness Engineering Study Guide",
        "rel": "README.en",
        "sourceRel": "README.en.md"
      },
      {
        "title": "文章索引",
        "rel": "references-articles",
        "sourceRel": "references/articles.md"
      },
      {
        "title": "跨文章深层洞见：文章库 × 实践记录交叉对比",
        "rel": "thinking-cross-article-insights",
        "sourceRel": "thinking/cross-article-insights.md"
      },
      {
        "title": "评估是房间里的大象：Harness Engineering 的阿喀琉斯之踵",
        "rel": "thinking-evaluation-elephant-in-the-room",
        "sourceRel": "thinking/evaluation-elephant-in-the-room.md"
      },
      {
        "title": "修流程，不修代码：Bun 重写案例的范式信号",
        "rel": "thinking-fix-the-process-not-the-code",
        "sourceRel": "thinking/fix-the-process-not-the-code.md"
      },
      {
        "title": "Guides × Sensors 框架的产品化检验：claude-code-harness v4.2 暴露的五个张力",
        "rel": "thinking-guides-sensors-meets-claude-code-harness",
        "sourceRel": "thinking/guides-sensors-meets-claude-code-harness.md"
      },
      {
        "title": "个人开发者的 Harness Engineering：从精英团队到一人军团",
        "rel": "thinking-harness-for-solo-developers",
        "sourceRel": "thinking/harness-for-solo-developers.md"
      },
      {
        "title": "可驾驭性与 Java/Spring Boot 的结构性优势",
        "rel": "thinking-harnessability-and-java",
        "sourceRel": "thinking/harnessability-and-java.md"
      },
      {
        "title": "Meta-Harness 与现有 Harness Engineering 体系的五个张力",
        "rel": "thinking-meta-harness-tensions",
        "sourceRel": "thinking/meta-harness-tensions.md"
      },
      {
        "title": "传统软件工程 ↔ AI Agent 工程：一张对照表，与它的三处修正",
        "rel": "thinking-se-to-agent-engineering-mapping",
        "sourceRel": "thinking/se-to-agent-engineering-mapping.md"
      },
      {
        "title": "AI 时代的软件项目复杂度",
        "rel": "thinking-software-project-complexity-in-the-ai-era",
        "sourceRel": "thinking/software-project-complexity-in-the-ai-era.md"
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
        "rel": "docs-advanced-00-",
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
        "rel": "docs-guide",
        "sourceRel": "docs/guide/index.md"
      },
      {
        "title": "参考手册",
        "rel": "docs-manual-00-",
        "sourceRel": "docs/manual/00-index.md"
      },
      {
        "title": "参考来源与致谢",
        "rel": "docs-manual-02-credits",
        "sourceRel": "docs/manual/02-credits.md"
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
        "rel": "changelog-2026-04-15",
        "sourceRel": "changelog/2026-04-15.md"
      },
      {
        "title": "2026-04-16 — +6 New · 21 Total",
        "rel": "changelog-2026-04-16",
        "sourceRel": "changelog/2026-04-16.md"
      },
      {
        "title": "2026-04-19 — +4 New · 25 Total",
        "rel": "changelog-2026-04-19",
        "sourceRel": "changelog/2026-04-19.md"
      },
      {
        "title": "Agent Teams: Parallel Claudes Building Real Software",
        "rel": "guide-agent-teams",
        "sourceRel": "guide/agent-teams.md"
      },
      {
        "title": "Agentic Loop",
        "rel": "guide-agentic-loop",
        "sourceRel": "guide/agentic-loop.md"
      },
      {
        "title": "Classifier-Based Permission Systems (Auto Mode)",
        "rel": "guide-classifier-permissions",
        "sourceRel": "guide/classifier-permissions.md"
      },
      {
        "title": "Comparison of Major Harness Implementations",
        "rel": "guide-comparison",
        "sourceRel": "guide/comparison.md"
      },
      {
        "title": "Context Engineering",
        "rel": "guide-context-engineering",
        "sourceRel": "guide/context-engineering.md"
      },
      {
        "title": "Error Handling",
        "rel": "guide-error-handling",
        "sourceRel": "guide/error-handling.md"
      },
      {
        "title": "Eval Awareness — When Agents Recognize They're Being Tested",
        "rel": "guide-eval-awareness",
        "sourceRel": "guide/eval-awareness.md"
      },
      {
        "title": "Infrastructure Noise in Agent Evaluations",
        "rel": "guide-eval-infrastructure",
        "sourceRel": "guide/eval-infrastructure.md"
      },
      {
        "title": "Every AI Startup Should Watch Out: 1000+ Ghost Accounts Drained Our Platform in 15 Days",
        "rel": "guide-ghost-account-hunting",
        "sourceRel": "guide/ghost-account-hunting.md"
      },
      {
        "title": "Glossary",
        "rel": "guide-glossary",
        "sourceRel": "guide/glossary.md"
      },
      {
        "title": "Guardrails",
        "rel": "guide-guardrails",
        "sourceRel": "guide/guardrails.md"
      },
      {
        "title": "Harness vs. Framework",
        "rel": "guide-harness-vs-framework",
        "sourceRel": "guide/harness-vs-framework.md"
      },
      {
        "title": "Initializer + Coding Agent — A Two-Phase Harness Pattern",
        "rel": "guide-initializer-coding-pattern",
        "sourceRel": "guide/initializer-coding-pattern.md"
      },
      {
        "title": "Long-Running Agent Harness Design",
        "rel": "guide-long-running-harness",
        "sourceRel": "guide/long-running-harness.md"
      },
      {
        "title": "Managed Agents: Decoupling Brain from Hands",
        "rel": "guide-managed-agents-architecture",
        "sourceRel": "guide/managed-agents-architecture.md"
      },
      {
        "title": "Memory & Context",
        "rel": "guide-memory-and-context",
        "sourceRel": "guide/memory-and-context.md"
      },
      {
        "title": "Multi-Agent Orchestration",
        "rel": "guide-multi-agent-orchestration",
        "sourceRel": "guide/multi-agent-orchestration.md"
      },
      {
        "title": "The Billion-Token Battle: Shipping Our OpenClaw Windows Client",
        "rel": "guide-nexu-windows-packaging",
        "sourceRel": "guide/nexu-windows-packaging.md"
      },
      {
        "title": "Sandbox",
        "rel": "guide-sandbox",
        "sourceRel": "guide/sandbox.md"
      },
      {
        "title": "Harness Engineering 指南（nexu.io）",
        "rel": "guide-scheduling-and-automation",
        "sourceRel": "guide/scheduling-and-automation.md"
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
        "title": "Architecture",
        "rel": "ARCHITECTURE",
        "sourceRel": "ARCHITECTURE.md"
      },
      {
        "title": "Claude Code",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Copyright, Attribution, and Source Material",
        "rel": "COPYING",
        "sourceRel": "COPYING.md"
      },
      {
        "title": "Maximize Autonomy Inside Explicit Authority",
        "rel": "docs-authority",
        "sourceRel": "docs/authority/README.md"
      },
      {
        "title": "Claude Code",
        "rel": "docs-CLAUDE",
        "sourceRel": "docs/CLAUDE.md"
      },
      {
        "title": "Run Known Work as a Continuous Loop",
        "rel": "docs-continuous-maintenance",
        "sourceRel": "docs/continuous-maintenance/README.md"
      },
      {
        "title": "Infrastructure as a Typed Control Plane",
        "rel": "docs-domain-modeling-homelab",
        "sourceRel": "docs/domain-modeling/homelab.md"
      },
      {
        "title": "Harness Engineering the hyperbo.la Build",
        "rel": "docs-domain-modeling-hyperbola",
        "sourceRel": "docs/domain-modeling/hyperbola.md"
      },
      {
        "title": "Architectures That Teach",
        "rel": "docs-domain-modeling-implementations",
        "sourceRel": "docs/domain-modeling/implementations.md"
      },
      {
        "title": "Make the Repository Teach the Agent",
        "rel": "docs-domain-modeling",
        "sourceRel": "docs/domain-modeling/README.md"
      },
      {
        "title": "Dependency Ownership",
        "rel": "docs-durable-systems-dependency-ownership",
        "sourceRel": "docs/durable-systems/dependency-ownership.md"
      },
      {
        "title": "Preserve Coherence and Own Lifetime Risk",
        "rel": "docs-durable-systems",
        "sourceRel": "docs/durable-systems/README.md"
      },
      {
        "title": "Measure Effectiveness at the Outcome Boundary",
        "rel": "docs-effectiveness",
        "sourceRel": "docs/effectiveness/README.md"
      },
      {
        "title": "MLD: Telemetry for the Harness Builder",
        "rel": "docs-feedback-mld",
        "sourceRel": "docs/feedback/mld.md"
      },
      {
        "title": "Turn Feedback Into Infrastructure",
        "rel": "docs-feedback",
        "sourceRel": "docs/feedback/README.md"
      },
      {
        "title": "Model-Native Semantics Across Agent Hosts",
        "rel": "docs-fixed-worker-model-native-semantics",
        "sourceRel": "docs/fixed-worker/model-native-semantics.md"
      },
      {
        "title": "Hold the Worker Constant",
        "rel": "docs-fixed-worker",
        "sourceRel": "docs/fixed-worker/README.md"
      },
      {
        "title": "Route Context Just in Time",
        "rel": "docs-just-in-time-context",
        "sourceRel": "docs/just-in-time-context/README.md"
      },
      {
        "title": "Deploy Into the Private Process-Data Iceberg",
        "rel": "docs-last-mile-deployment",
        "sourceRel": "docs/last-mile-deployment/README.md"
      },
      {
        "title": "Influences and Alternate Framings",
        "rel": "docs-lineage",
        "sourceRel": "docs/lineage/README.md"
      },
      {
        "title": "Prove the Outcome in the Real Environment",
        "rel": "docs-proof",
        "sourceRel": "docs/proof/README.md"
      },
      {
        "title": "Release Integrity",
        "rel": "docs-proof-release-integrity",
        "sourceRel": "docs/proof/release-integrity.md"
      },
      {
        "title": "Prove a Security Claim",
        "rel": "docs-proof-rustsec",
        "sourceRel": "docs/proof/rustsec.md"
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
        "title": "Project Rules",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Architecture",
        "rel": "docs-ARCHITECTURE",
        "sourceRel": "docs/ARCHITECTURE.md"
      },
      {
        "title": "0019 Repository-Centered Default Workflow",
        "rel": "docs-decisions-0019-repository-centered-default-workflow",
        "sourceRel": "docs/decisions/0019-repository-centered-default-workflow.md"
      },
      {
        "title": "0020 Installation Profile And Knowledge Boundaries",
        "rel": "docs-decisions-0020-installation-profile-and-knowledge-boundaries",
        "sourceRel": "docs/decisions/0020-installation-profile-and-knowledge-boundaries.md"
      },
      {
        "title": "0024 Rust Harness Core Maintenance CLI",
        "rel": "docs-decisions-0024-rust-harness-core-maintenance-cli",
        "sourceRel": "docs/decisions/0024-rust-harness-core-maintenance-cli.md"
      },
      {
        "title": "0025 Latest-Release Self-Update And Human-Directed Conflicts",
        "rel": "docs-decisions-0025-latest-release-self-update-and-human-directed-conflicts",
        "sourceRel": "docs/decisions/0025-latest-release-self-update-and-human-directed-conflicts.md"
      },
      {
        "title": "0026 Explicit Onboarding Skills In Default Core",
        "rel": "docs-decisions-0026-explicit-onboarding-skills-in-default-core",
        "sourceRel": "docs/decisions/0026-explicit-onboarding-skills-in-default-core.md"
      },
      {
        "title": "0027 End Protocol V1 And Focus The Repository Protocol",
        "rel": "docs-decisions-0027-end-protocol-v1-and-focus-repository-protocol",
        "sourceRel": "docs/decisions/0027-end-protocol-v1-and-focus-repository-protocol.md"
      },
      {
        "title": "0028 Authoritative Invariant Encoding",
        "rel": "docs-decisions-0028-authoritative-invariant-encoding",
        "sourceRel": "docs/decisions/0028-authoritative-invariant-encoding.md"
      },
      {
        "title": "Decisions",
        "rel": "docs-decisions",
        "sourceRel": "docs/decisions/README.md"
      },
      {
        "title": "Repository-Centered Workflow Demo",
        "rel": "docs-demo",
        "sourceRel": "docs/demo/README.md"
      },
      {
        "title": "Harness Product Model",
        "rel": "docs-HARNESS",
        "sourceRel": "docs/HARNESS.md"
      },
      {
        "title": "Encoding Invariants",
        "rel": "docs-patterns-encoding-invariants",
        "sourceRel": "docs/patterns/encoding-invariants.md"
      },
      {
        "title": "Active Execution Plans",
        "rel": "docs-plans-active",
        "sourceRel": "docs/plans/active/README.md"
      },
      {
        "title": "Execution Plan: P1 Invariant Encoding",
        "rel": "docs-plans-completed-p1-encode-invariants",
        "sourceRel": "docs/plans/completed/p1-encode-invariants.md"
      },
      {
        "title": "Completed Execution Plans",
        "rel": "docs-plans-completed",
        "sourceRel": "docs/plans/completed/README.md"
      },
      {
        "title": "Execution Plan: Repository Protocol Core",
        "rel": "docs-plans-completed-repository-protocol-core",
        "sourceRel": "docs/plans/completed/repository-protocol-core.md"
      },
      {
        "title": "Execution Plans",
        "rel": "docs-plans",
        "sourceRel": "docs/plans/README.md"
      },
      {
        "title": "Installation Contract",
        "rel": "docs-product-installation-profiles",
        "sourceRel": "docs/product/installation-profiles.md"
      },
      {
        "title": "Product Docs",
        "rel": "docs-product",
        "sourceRel": "docs/product/README.md"
      },
      {
        "title": "Documentation Map",
        "rel": "docs",
        "sourceRel": "docs/README.md"
      },
      {
        "title": "Application Legibility Research",
        "rel": "docs-research-application-legibility",
        "sourceRel": "docs/research/application-legibility.md"
      },
      {
        "title": "Application Runbook: Surface",
        "rel": "docs-templates-application-runbook",
        "sourceRel": "docs/templates/application-runbook.md"
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
        "rel": "docs-agent-teams",
        "sourceRel": "docs/agent-teams.md"
      },
      {
        "title": "Slash Commands — Cheatsheet",
        "rel": "docs-reference-commands",
        "sourceRel": "docs/reference/commands.md"
      },
      {
        "title": "Reasoning Effort Levels",
        "rel": "docs-reference-effort-levels",
        "sourceRel": "docs/reference/effort-levels.md"
      },
      {
        "title": "FAQ — Claude Code & Claude Plans",
        "rel": "docs-reference-faq",
        "sourceRel": "docs/reference/faq.md"
      },
      {
        "title": "Further reading",
        "rel": "docs-reference-further-reading",
        "sourceRel": "docs/reference/further-reading.md"
      },
      {
        "title": "Models — Specifications & Pricing",
        "rel": "docs-reference-models",
        "sourceRel": "docs/reference/models.md"
      },
      {
        "title": "Claude Skills — The Complete Guide",
        "rel": "docs-skills",
        "sourceRel": "docs/skills.md"
      },
      {
        "title": "Dynamic Workflows — Orchestrating Agents at Scale",
        "rel": "docs-workflows",
        "sourceRel": "docs/workflows.md"
      },
      {
        "title": "Memory MCP Server",
        "rel": "mcp-servers-memory",
        "sourceRel": "mcp-servers/memory.md"
      },
      {
        "title": "Playwright MCP Server",
        "rel": "mcp-servers-playwright",
        "sourceRel": "mcp-servers/playwright.md"
      },
      {
        "title": "MCP Servers Documentation",
        "rel": "mcp-servers",
        "sourceRel": "mcp-servers/README.md"
      },
      {
        "title": "Sequential Thinking MCP Server",
        "rel": "mcp-servers-sequential-thinking",
        "sourceRel": "mcp-servers/sequential-thinking.md"
      },
      {
        "title": "Serena MCP Server",
        "rel": "mcp-servers-serena",
        "sourceRel": "mcp-servers/serena.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-backend-engineer-description",
        "sourceRel": "specialized-agents/Descriptions/backend-engineer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-business-analyst-description",
        "sourceRel": "specialized-agents/Descriptions/business-analyst-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-code-reviewer-description",
        "sourceRel": "specialized-agents/Descriptions/code-reviewer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-database-engineer-description",
        "sourceRel": "specialized-agents/Descriptions/database-engineer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-frontend-engineer-description",
        "sourceRel": "specialized-agents/Descriptions/frontend-engineer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-project-manager-description",
        "sourceRel": "specialized-agents/Descriptions/project-manager-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-security-reviewer-description",
        "sourceRel": "specialized-agents/Descriptions/security-reviewer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-tech-lead-description",
        "sourceRel": "specialized-agents/Descriptions/tech-lead-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-Descriptions-ux-engineer-description",
        "sourceRel": "specialized-agents/Descriptions/ux-engineer-description.md"
      },
      {
        "title": "Claude Code Everything You Need to Know",
        "rel": "specialized-agents-system-prompts-backend-engineer-prompt",
        "sourceRel": "specialized-agents/system-prompts/backend-engineer-prompt.md"
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
        "rel": "agents-code_agent_simple",
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
        "rel": "experiments-evolved_harness",
        "sourceRel": "experiments/evolved_harness/README.md"
      },
      {
        "title": "Short-Term Memory",
        "rel": "experiments-evolved_harness-ShortTermMEMORY",
        "sourceRel": "experiments/evolved_harness/ShortTermMEMORY.md"
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
        "title": "Harness — GitHub Trending Readiness Audit",
        "rel": "_workspace-01_auditor_repo_audit",
        "sourceRel": "_workspace/01_auditor_repo_audit.md"
      },
      {
        "title": "Harness Launch Content — Multi-Platform",
        "rel": "_workspace-02_content_launch_contents",
        "sourceRel": "_workspace/02_content_launch_contents.md"
      },
      {
        "title": "Harness 아웃리치 타겟 맵",
        "rel": "_workspace-03_scout_outreach_map",
        "sourceRel": "_workspace/03_scout_outreach_map.md"
      },
      {
        "title": "GitHub Trending 통합 런치 플랜 — Harness",
        "rel": "_workspace-04_strategist_launch_plan",
        "sourceRel": "_workspace/04_strategist_launch_plan.md"
      },
      {
        "title": "Release Audit — 2026-04-18",
        "rel": "_workspace-release-audit-2026-04-18",
        "sourceRel": "_workspace/release/audit-2026-04-18.md"
      },
      {
        "title": "Post-M0 Audit — 2026-04-18",
        "rel": "_workspace-release-post-m0-audit-2026-04-18",
        "sourceRel": "_workspace/release/post-m0-audit-2026-04-18.md"
      },
      {
        "title": "Experimental Flag Dependency",
        "rel": "docs-experimental-dependency",
        "sourceRel": "docs/experimental-dependency.md"
      },
      {
        "title": "Quickstart — 5 Minutes to Your First Harness",
        "rel": "docs-quickstart",
        "sourceRel": "docs/quickstart.md"
      },
      {
        "title": "Harness — Claude Code のためのチームアーキテクチャファクトリー",
        "rel": "README_JA",
        "sourceRel": "README_JA.md"
      },
      {
        "title": "Harness — Claude Code를 위한 팀 아키텍처 팩토리",
        "rel": "README_KO",
        "sourceRel": "README_KO.md"
      },
      {
        "title": "Agent Team Design Patterns",
        "rel": "skills-harness-references-agent-design-patterns",
        "sourceRel": "skills/harness/references/agent-design-patterns.md"
      },
      {
        "title": "오케스트레이터 스킬 템플릿",
        "rel": "skills-harness-references-orchestrator-template",
        "sourceRel": "skills/harness/references/orchestrator-template.md"
      },
      {
        "title": "QA 에이전트 설계 가이드",
        "rel": "skills-harness-references-qa-agent-guide",
        "sourceRel": "skills/harness/references/qa-agent-guide.md"
      },
      {
        "title": "스킬 테스트 & 반복 개선 가이드",
        "rel": "skills-harness-references-skill-testing-guide",
        "sourceRel": "skills/harness/references/skill-testing-guide.md"
      },
      {
        "title": "스킬 작성 가이드",
        "rel": "skills-harness-references-skill-writing-guide",
        "sourceRel": "skills/harness/references/skill-writing-guide.md"
      },
      {
        "title": "Agent Team Examples",
        "rel": "skills-harness-references-team-examples",
        "sourceRel": "skills/harness/references/team-examples.md"
      },
      {
        "title": "Harness — Agent Team & Skill Architect",
        "rel": "skills-harness-SKILL",
        "sourceRel": "skills/harness/SKILL.md"
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
        "rel": "best-practice-codex-agents-md",
        "sourceRel": "best-practice/codex-agents-md.md"
      },
      {
        "title": "Best Practice: Config",
        "rel": "best-practice-codex-config",
        "sourceRel": "best-practice/codex-config.md"
      },
      {
        "title": "Best Practice: Hooks",
        "rel": "best-practice-codex-hooks",
        "sourceRel": "best-practice/codex-hooks.md"
      },
      {
        "title": "Best Practice: Plugin Marketplace",
        "rel": "best-practice-codex-marketplace",
        "sourceRel": "best-practice/codex-marketplace.md"
      },
      {
        "title": "Best Practice: MCP (Model Context Protocol)",
        "rel": "best-practice-codex-mcp",
        "sourceRel": "best-practice/codex-mcp.md"
      },
      {
        "title": "Best Practice: Memories",
        "rel": "best-practice-codex-memory",
        "sourceRel": "best-practice/codex-memory.md"
      },
      {
        "title": "Best Practice: Skills",
        "rel": "best-practice-codex-skills",
        "sourceRel": "best-practice/codex-skills.md"
      },
      {
        "title": "Best Practice: Subagents",
        "rel": "best-practice-codex-subagents",
        "sourceRel": "best-practice/codex-subagents.md"
      },
      {
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Skills System Reference",
        "rel": "docs-SKILLS",
        "sourceRel": "docs/SKILLS.md"
      },
      {
        "title": "Orchestration Workflow",
        "rel": "orchestration-workflow-orchestration-workflow",
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
        "title": "Harness Review Checklist",
        "rel": "templates-HARNESS_CHECKLIST",
        "sourceRel": "templates/HARNESS_CHECKLIST.md"
      },
      {
        "title": "IMPLEMENT.md",
        "rel": "templates-IMPLEMENT",
        "sourceRel": "templates/IMPLEMENT.md"
      },
      {
        "title": "PLAN.md",
        "rel": "templates-PLAN",
        "sourceRel": "templates/PLAN.md"
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
        "title": "ChatGPT 橙皮书：从安装到实战案例的全链路使用指南",
        "rel": "ChatGPT橙皮书",
        "sourceRel": "ChatGPT橙皮书.md"
      },
      {
        "title": "ChatGPT 橙皮书网站发布说明",
        "rel": "site-DEPLOY",
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
        "title": "How Claude Code Works",
        "rel": "_coverpage",
        "sourceRel": "_coverpage.md"
      },
      {
        "title": "第 1 章：Claude Code 概述",
        "rel": "docs-01-overview",
        "sourceRel": "docs/01-overview.md"
      },
      {
        "title": "第 2 章：系统主循环",
        "rel": "docs-02-agent-loop",
        "sourceRel": "docs/02-agent-loop.md"
      },
      {
        "title": "第 3 章：上下文工程",
        "rel": "docs-03-context-engineering",
        "sourceRel": "docs/03-context-engineering.md"
      },
      {
        "title": "第 4 章：工具系统",
        "rel": "docs-04-tool-system",
        "sourceRel": "docs/04-tool-system.md"
      },
      {
        "title": "第 10 章：代码编辑策略",
        "rel": "docs-05-code-editing-strategy",
        "sourceRel": "docs/05-code-editing-strategy.md"
      },
      {
        "title": "第 7 章：Hooks 与可扩展性",
        "rel": "docs-06-hooks-extensibility",
        "sourceRel": "docs/06-hooks-extensibility.md"
      },
      {
        "title": "第 8 章：多 Agent 架构",
        "rel": "docs-07-multi-agent",
        "sourceRel": "docs/07-multi-agent.md"
      },
      {
        "title": "第 6 章：记忆系统",
        "rel": "docs-08-memory-system",
        "sourceRel": "docs/08-memory-system.md"
      },
      {
        "title": "第 5 章：技能系统",
        "rel": "docs-09-skills-system",
        "sourceRel": "docs/09-skills-system.md"
      },
      {
        "title": "第 9 章：Plan 模式",
        "rel": "docs-10-plan-mode",
        "sourceRel": "docs/10-plan-mode.md"
      },
      {
        "title": "第 12 章：权限与安全",
        "rel": "docs-11-permission-security",
        "sourceRel": "docs/11-permission-security.md"
      },
      {
        "title": "第 14 章：用户体验设计",
        "rel": "docs-12-user-experience",
        "sourceRel": "docs/12-user-experience.md"
      },
      {
        "title": "第 15 章：最小必要组件",
        "rel": "docs-13-minimal-components",
        "sourceRel": "docs/13-minimal-components.md"
      },
      {
        "title": "第 13 章：系统提示词速查手册",
        "rel": "docs-14-system-prompt-design",
        "sourceRel": "docs/14-system-prompt-design.md"
      },
      {
        "title": "第 11 章：任务管理系统",
        "rel": "docs-15-task-system",
        "sourceRel": "docs/15-task-system.md"
      },
      {
        "title": "第 16 章：可观测性——一次任务的全程可追溯",
        "rel": "docs-16-observability",
        "sourceRel": "docs/16-observability.md"
      },
      {
        "title": "第 17 章：自治与续跑——/goal 与 /loop",
        "rel": "docs-17-autonomy-goal-loop",
        "sourceRel": "docs/17-autonomy-goal-loop.md"
      },
      {
        "title": "第 18 章：Auto Mode——权限进入分类器时代",
        "rel": "docs-18-auto-mode",
        "sourceRel": "docs/18-auto-mode.md"
      },
      {
        "title": "第 19 章：Dynamic Workflows——用确定性脚本指挥 agent 舰队",
        "rel": "docs-19-dynamic-workflows",
        "sourceRel": "docs/19-dynamic-workflows.md"
      },
      {
        "title": "第 20 章：Agent Teams——对等组队与跨会话安全",
        "rel": "docs-20-agent-teams",
        "sourceRel": "docs/20-agent-teams.md"
      },
      {
        "title": "第 21 章：后台 Agent 舰队——脱终端常驻与 daemon 监管",
        "rel": "docs-21-background-fleet",
        "sourceRel": "docs/21-background-fleet.md"
      },
      {
        "title": "10 分钟读懂 Claude Code",
        "rel": "docs-quick-start",
        "sourceRel": "docs/quick-start.md"
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
        "title": "Claude Code from Scratch",
        "rel": "_coverpage",
        "sourceRel": "_coverpage.md"
      },
      {
        "title": "Test Project Rules",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "引言：从一个空循环开始，造一个 Claude Code",
        "rel": "docs-00-introduction",
        "sourceRel": "docs/00-introduction.md"
      },
      {
        "title": "1. Agent Loop — 核心循环",
        "rel": "docs-01-agent-loop",
        "sourceRel": "docs/01-agent-loop.md"
      },
      {
        "title": "2. 工具系统",
        "rel": "docs-02-tools",
        "sourceRel": "docs/02-tools.md"
      },
      {
        "title": "3. System Prompt 工程",
        "rel": "docs-03-system-prompt",
        "sourceRel": "docs/03-system-prompt.md"
      },
      {
        "title": "4. CLI 与会话",
        "rel": "docs-04-cli-session",
        "sourceRel": "docs/04-cli-session.md"
      },
      {
        "title": "5. 流式输出与双后端",
        "rel": "docs-05-streaming",
        "sourceRel": "docs/05-streaming.md"
      },
      {
        "title": "6. 权限与安全",
        "rel": "docs-06-permissions",
        "sourceRel": "docs/06-permissions.md"
      },
      {
        "title": "7. 上下文管理",
        "rel": "docs-07-context",
        "sourceRel": "docs/07-context.md"
      },
      {
        "title": "8. 记忆系统",
        "rel": "docs-08-memory",
        "sourceRel": "docs/08-memory.md"
      },
      {
        "title": "9. 技能系统",
        "rel": "docs-09-skills",
        "sourceRel": "docs/09-skills.md"
      },
      {
        "title": "10. Plan Mode：只读规划模式",
        "rel": "docs-10-plan-mode",
        "sourceRel": "docs/10-plan-mode.md"
      },
      {
        "title": "11. 多 Agent 架构",
        "rel": "docs-11-multi-agent",
        "sourceRel": "docs/11-multi-agent.md"
      },
      {
        "title": "12. MCP 集成",
        "rel": "docs-12-mcp",
        "sourceRel": "docs/12-mcp.md"
      },
      {
        "title": "13. 架构对比与下一步",
        "rel": "docs-13-whats-next",
        "sourceRel": "docs/13-whats-next.md"
      },
      {
        "title": "14. 功能测试指南",
        "rel": "docs-14-testing",
        "sourceRel": "docs/14-testing.md"
      },
      {
        "title": "15. 自治与续跑（/goal · /loop · Auto Mode）",
        "rel": "docs-15-autonomy",
        "sourceRel": "docs/15-autonomy.md"
      },
      {
        "title": "Introduction: Building a Claude Code from an Empty Loop",
        "rel": "en-docs-00-introduction",
        "sourceRel": "en/docs/00-introduction.md"
      },
      {
        "title": "1. Agent Loop -- The Core Cycle",
        "rel": "en-docs-01-agent-loop",
        "sourceRel": "en/docs/01-agent-loop.md"
      },
      {
        "title": "2. Tool System",
        "rel": "en-docs-02-tools",
        "sourceRel": "en/docs/02-tools.md"
      },
      {
        "title": "3. System Prompt Engineering",
        "rel": "en-docs-03-system-prompt",
        "sourceRel": "en/docs/03-system-prompt.md"
      },
      {
        "title": "4. CLI and Sessions",
        "rel": "en-docs-04-cli-session",
        "sourceRel": "en/docs/04-cli-session.md"
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
        "rel": "docs-distillation-harness-practice-zh",
        "sourceRel": "docs/distillation-harness-practice-zh.md"
      },
      {
        "title": "Distilling Claude Code Source — A Harness Engineering Practice Log",
        "rel": "docs-distillation-harness-practice",
        "sourceRel": "docs/distillation-harness-practice.md"
      },
      {
        "title": "Agentic Harness Patterns（模式与技能）",
        "rel": "README_ZH",
        "sourceRel": "README_ZH.md"
      },
      {
        "title": "Agent 编排模式",
        "rel": "skills-agentic-harness-patterns-zh-references-agent-orchestration-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/agent-orchestration-pattern.md"
      },
      {
        "title": "Bootstrap 序列模式",
        "rel": "skills-agentic-harness-patterns-zh-references-bootstrap-sequence-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/bootstrap-sequence-pattern.md"
      },
      {
        "title": "上下文工程模式",
        "rel": "skills-agentic-harness-patterns-zh-references-context-engineering-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/context-engineering-pattern.md"
      },
      {
        "title": "上下文压缩与快照管理",
        "rel": "skills-agentic-harness-patterns-zh-references-context-engineering-compress-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/context-engineering/compress-pattern.md"
      },
      {
        "title": "委派工作的上下文隔离",
        "rel": "skills-agentic-harness-patterns-zh-references-context-engineering-isolate-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/context-engineering/isolate-pattern.md"
      },
      {
        "title": "上下文选择与渐进式披露",
        "rel": "skills-agentic-harness-patterns-zh-references-context-engineering-select-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/context-engineering/select-pattern.md"
      },
      {
        "title": "Hook 生命周期模式",
        "rel": "skills-agentic-harness-patterns-zh-references-hook-lifecycle-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/hook-lifecycle-pattern.md"
      },
      {
        "title": "记忆与持久化模式",
        "rel": "skills-agentic-harness-patterns-zh-references-memory-persistence-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/memory-persistence-pattern.md"
      },
      {
        "title": "权限门控模式",
        "rel": "skills-agentic-harness-patterns-zh-references-permission-gate-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/permission-gate-pattern.md"
      },
      {
        "title": "技能运行时与打包模式",
        "rel": "skills-agentic-harness-patterns-zh-references-skill-runtime-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/skill-runtime-pattern.md"
      },
      {
        "title": "长时间运行的工作管理",
        "rel": "skills-agentic-harness-patterns-zh-references-task-decomposition-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/task-decomposition-pattern.md"
      },
      {
        "title": "工具注册表模式",
        "rel": "skills-agentic-harness-patterns-zh-references-tool-registry-pattern",
        "sourceRel": "skills/agentic-harness-patterns-zh/references/tool-registry-pattern.md"
      },
      {
        "title": "Agentic Harness Patterns（中文版）",
        "rel": "skills-agentic-harness-patterns-zh-SKILL",
        "sourceRel": "skills/agentic-harness-patterns-zh/SKILL.md"
      },
      {
        "title": "Agent Orchestration Pattern",
        "rel": "skills-agentic-harness-patterns-references-agent-orchestration-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/agent-orchestration-pattern.md"
      },
      {
        "title": "Bootstrap Sequence Pattern",
        "rel": "skills-agentic-harness-patterns-references-bootstrap-sequence-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/bootstrap-sequence-pattern.md"
      },
      {
        "title": "Context Engineering Pattern",
        "rel": "skills-agentic-harness-patterns-references-context-engineering-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/context-engineering-pattern.md"
      },
      {
        "title": "Context Compression and Snapshot Management",
        "rel": "skills-agentic-harness-patterns-references-context-engineering-compress-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/context-engineering/compress-pattern.md"
      },
      {
        "title": "Context Isolation for Delegated Work",
        "rel": "skills-agentic-harness-patterns-references-context-engineering-isolate-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/context-engineering/isolate-pattern.md"
      },
      {
        "title": "Context Selection and Progressive Disclosure",
        "rel": "skills-agentic-harness-patterns-references-context-engineering-select-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/context-engineering/select-pattern.md"
      },
      {
        "title": "Hook Lifecycle Pattern",
        "rel": "skills-agentic-harness-patterns-references-hook-lifecycle-pattern",
        "sourceRel": "skills/agentic-harness-patterns/references/hook-lifecycle-pattern.md"
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
        "title": "Deep Agents Code GitHub Action",
        "rel": "ACTION",
        "sourceRel": "ACTION.md"
      },
      {
        "title": "Async Subagent Server",
        "rel": "examples-async-subagent-server",
        "sourceRel": "examples/async-subagent-server/README.md"
      },
      {
        "title": "better-harness",
        "rel": "examples-better-harness",
        "sourceRel": "examples/better-harness/README.md"
      },
      {
        "title": "Content Builder Agent",
        "rel": "examples-content-builder-agent",
        "sourceRel": "examples/content-builder-agent/README.md"
      },
      {
        "title": "Blog Post Writing Skill",
        "rel": "examples-content-builder-agent-skills-blog-post-SKILL",
        "sourceRel": "examples/content-builder-agent/skills/blog-post/SKILL.md"
      },
      {
        "title": "Social Media Content Skill",
        "rel": "examples-content-builder-agent-skills-social-media-SKILL",
        "sourceRel": "examples/content-builder-agent/skills/social-media/SKILL.md"
      },
      {
        "title": "🚀 Deep Research",
        "rel": "examples-deep_research",
        "sourceRel": "examples/deep_research/README.md"
      },
      {
        "title": "deploy-coding-agent",
        "rel": "examples-deploy-coding-agent",
        "sourceRel": "examples/deploy-coding-agent/README.md"
      },
      {
        "title": "Code Review Skill",
        "rel": "examples-deploy-coding-agent-skills-code-review-SKILL",
        "sourceRel": "examples/deploy-coding-agent/skills/code-review/SKILL.md"
      },
      {
        "title": "Coding Preferences Skill",
        "rel": "examples-deploy-coding-agent-skills-coding-prefs-SKILL",
        "sourceRel": "examples/deploy-coding-agent/skills/coding-prefs/SKILL.md"
      },
      {
        "title": "Planning Skill",
        "rel": "examples-deploy-coding-agent-skills-planning-SKILL",
        "sourceRel": "examples/deploy-coding-agent/skills/planning/SKILL.md"
      },
      {
        "title": "deploy-content-writer",
        "rel": "examples-deploy-content-writer",
        "sourceRel": "examples/deploy-content-writer/README.md"
      },
      {
        "title": "Blog Post Writing Skill",
        "rel": "examples-deploy-content-writer-skills-blog-post-SKILL",
        "sourceRel": "examples/deploy-content-writer/skills/blog-post/SKILL.md"
      },
      {
        "title": "Social Media Content Skill",
        "rel": "examples-deploy-content-writer-skills-social-media-SKILL",
        "sourceRel": "examples/deploy-content-writer/skills/social-media/SKILL.md"
      },
      {
        "title": "deploy-gtm-agent",
        "rel": "examples-deploy-gtm-agent",
        "sourceRel": "examples/deploy-gtm-agent/README.md"
      },
      {
        "title": "Competitor Analysis",
        "rel": "examples-deploy-gtm-agent-skills-competitor-analysis-SKILL",
        "sourceRel": "examples/deploy-gtm-agent/skills/competitor-analysis/SKILL.md"
      },
      {
        "title": "Market Analysis",
        "rel": "examples-deploy-gtm-agent-subagents-market-researcher-skills-analyze-market-SKILL",
        "sourceRel": "examples/deploy-gtm-agent/subagents/market-researcher/skills/analyze-market/SKILL.md"
      },
      {
        "title": "deploy-mcp-docs-agent",
        "rel": "examples-deploy-mcp-docs-agent",
        "sourceRel": "examples/deploy-mcp-docs-agent/README.md"
      },
      {
        "title": "Downloading Agents",
        "rel": "examples-downloading_agents",
        "sourceRel": "examples/downloading_agents/README.md"
      },
      {
        "title": "LLM Wiki",
        "rel": "examples-llm-wiki",
        "sourceRel": "examples/llm-wiki/README.md"
      },
      {
        "title": "Nemotron Deep Agent + GPU Skills",
        "rel": "examples-nvidia_deep_agent",
        "sourceRel": "examples/nvidia_deep_agent/README.md"
      },
      {
        "title": "cuDF Analytics Skill",
        "rel": "examples-nvidia_deep_agent-skills-cudf-analytics-SKILL",
        "sourceRel": "examples/nvidia_deep_agent/skills/cudf-analytics/SKILL.md"
      },
      {
        "title": "cuML Machine Learning Skill",
        "rel": "examples-nvidia_deep_agent-skills-cuml-machine-learning-SKILL",
        "sourceRel": "examples/nvidia_deep_agent/skills/cuml-machine-learning/SKILL.md"
      }
    ]
  },
  {
    "id": "09-harness/grok-build",
    "volume": "09-harness",
    "local": "grok-build",
    "title": "Grok Build（xAI 官方 CLI）",
    "kind": "产品仓库",
    "category": "实践案例与产品",
    "tier": 3,
    "license": "Apache-2.0",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "xai-org/grok-build",
    "site": null,
    "commit": "37949780c144e37df692e3d669051a21fec24f20",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/xai-org/grok-build",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Grok Build（xAI 官方 CLI）",
        "rel": "overview",
        "sourceRel": "README.md"
      },
      {
        "title": "xai-crash-handler",
        "rel": "crates-codegen-xai-crash-handler",
        "sourceRel": "crates/codegen/xai-crash-handler/README.md"
      },
      {
        "title": "xai-grok-agent",
        "rel": "crates-codegen-xai-grok-agent",
        "sourceRel": "crates/codegen/xai-grok-agent/README.md"
      },
      {
        "title": "How you work",
        "rel": "crates-codegen-xai-grok-agent-templates-apply_patch_prompt",
        "sourceRel": "crates/codegen/xai-grok-agent/templates/apply_patch_prompt.md"
      },
      {
        "title": "Grok Build（xAI 官方 CLI）",
        "rel": "crates-codegen-xai-grok-agent-templates-prompt",
        "sourceRel": "crates/codegen/xai-grok-agent/templates/prompt.md"
      },
      {
        "title": "Hook Examples",
        "rel": "crates-codegen-xai-grok-hooks-examples",
        "sourceRel": "crates/codegen/xai-grok-hooks/examples/README.md"
      },
      {
        "title": "Fuzzing xai-grok-markdown",
        "rel": "crates-codegen-xai-grok-markdown-fuzz",
        "sourceRel": "crates/codegen/xai-grok-markdown/fuzz/README.md"
      },
      {
        "title": "🚀 Architecture Overview — xai-grok-pager Rendering Engine",
        "rel": "crates-codegen-xai-grok-markdown-fuzz-seeds-render_all-bench",
        "sourceRel": "crates/codegen/xai-grok-markdown/fuzz/seeds/render_all/bench.md"
      },
      {
        "title": "Math seed",
        "rel": "crates-codegen-xai-grok-markdown-fuzz-seeds-render_all-math",
        "sourceRel": "crates/codegen/xai-grok-markdown/fuzz/seeds/render_all/math.md"
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
        "rel": "agents-a11y-architect",
        "sourceRel": "agents/a11y-architect.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-agent-evaluator",
        "sourceRel": "agents/agent-evaluator.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-architect",
        "sourceRel": "agents/architect.md"
      },
      {
        "title": "Build Error Resolver",
        "rel": "agents-build-error-resolver",
        "sourceRel": "agents/build-error-resolver.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-chief-of-staff",
        "sourceRel": "agents/chief-of-staff.md"
      },
      {
        "title": "Code Architect Agent",
        "rel": "agents-code-architect",
        "sourceRel": "agents/code-architect.md"
      },
      {
        "title": "Code Explorer Agent",
        "rel": "agents-code-explorer",
        "sourceRel": "agents/code-explorer.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-code-reviewer",
        "sourceRel": "agents/code-reviewer.md"
      },
      {
        "title": "Code Simplifier Agent",
        "rel": "agents-code-simplifier",
        "sourceRel": "agents/code-simplifier.md"
      },
      {
        "title": "Comment Analyzer Agent",
        "rel": "agents-comment-analyzer",
        "sourceRel": "agents/comment-analyzer.md"
      },
      {
        "title": "Conversation Analyzer Agent",
        "rel": "agents-conversation-analyzer",
        "sourceRel": "agents/conversation-analyzer.md"
      },
      {
        "title": "C++ Build Error Resolver",
        "rel": "agents-cpp-build-resolver",
        "sourceRel": "agents/cpp-build-resolver.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-cpp-reviewer",
        "sourceRel": "agents/cpp-reviewer.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-csharp-reviewer",
        "sourceRel": "agents/csharp-reviewer.md"
      },
      {
        "title": "Dart/Flutter Build Error Resolver",
        "rel": "agents-dart-build-resolver",
        "sourceRel": "agents/dart-build-resolver.md"
      },
      {
        "title": "Database Reviewer",
        "rel": "agents-database-reviewer",
        "sourceRel": "agents/database-reviewer.md"
      },
      {
        "title": "Django Build Error Resolver",
        "rel": "agents-django-build-resolver",
        "sourceRel": "agents/django-build-resolver.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-django-reviewer",
        "sourceRel": "agents/django-reviewer.md"
      },
      {
        "title": "Documentation & Codemap Specialist",
        "rel": "agents-doc-updater",
        "sourceRel": "agents/doc-updater.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-docs-lookup",
        "sourceRel": "agents/docs-lookup.md"
      },
      {
        "title": "E2E Test Runner",
        "rel": "agents-e2e-runner",
        "sourceRel": "agents/e2e-runner.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-fastapi-reviewer",
        "sourceRel": "agents/fastapi-reviewer.md"
      },
      {
        "title": "ECC —— Harness 性能优化系统",
        "rel": "agents-flutter-reviewer",
        "sourceRel": "agents/flutter-reviewer.md"
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
        "title": "Prompt Engineering Guide",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Advanced Prompting",
        "rel": "guides-prompts-advanced-usage",
        "sourceRel": "guides/prompts-advanced-usage.md"
      },
      {
        "title": "Adversarial Prompting",
        "rel": "guides-prompts-adversarial",
        "sourceRel": "guides/prompts-adversarial.md"
      },
      {
        "title": "Prompt Applications",
        "rel": "guides-prompts-applications",
        "sourceRel": "guides/prompts-applications.md"
      },
      {
        "title": "Basic Prompting",
        "rel": "guides-prompts-basic-usage",
        "sourceRel": "guides/prompts-basic-usage.md"
      },
      {
        "title": "ChatGPT Prompt Engineering",
        "rel": "guides-prompts-chatgpt",
        "sourceRel": "guides/prompts-chatgpt.md"
      },
      {
        "title": "Prompting Introduction",
        "rel": "guides-prompts-intro",
        "sourceRel": "guides/prompts-intro.md"
      },
      {
        "title": "Miscellaneous Topics",
        "rel": "guides-prompts-miscellaneous",
        "sourceRel": "guides/prompts-miscellaneous.md"
      },
      {
        "title": "Prompt Engineering Guide",
        "rel": "guides-prompts-reliability",
        "sourceRel": "guides/prompts-reliability.md"
      },
      {
        "title": "Prompt Engineering Guide",
        "rel": "guides",
        "sourceRel": "guides/README.md"
      },
      {
        "title": "About",
        "rel": "pages-about.en",
        "sourceRel": "pages/about.en.mdx"
      },
      {
        "title": "About",
        "rel": "pages-about.jp",
        "sourceRel": "pages/about.jp.mdx"
      },
      {
        "title": "About",
        "rel": "pages-about.kr",
        "sourceRel": "pages/about.kr.mdx"
      },
      {
        "title": "关于",
        "rel": "pages-about.zh",
        "sourceRel": "pages/about.zh.mdx"
      },
      {
        "title": "Agents",
        "rel": "pages-agents.en",
        "sourceRel": "pages/agents.en.mdx"
      },
      {
        "title": "AI Workflows vs. AI Agents",
        "rel": "pages-agents-ai-workflows-vs-ai-agents.en",
        "sourceRel": "pages/agents/ai-workflows-vs-ai-agents.en.mdx"
      },
      {
        "title": "Agent Components",
        "rel": "pages-agents-components.en",
        "sourceRel": "pages/agents/components.en.mdx"
      },
      {
        "title": "Context Engineering Deep Dive: Building a Deep Research Agent",
        "rel": "pages-agents-context-engineering-deep-dive.en",
        "sourceRel": "pages/agents/context-engineering-deep-dive.en.mdx"
      },
      {
        "title": "Why Context Engineering?",
        "rel": "pages-agents-context-engineering.en",
        "sourceRel": "pages/agents/context-engineering.en.mdx"
      },
      {
        "title": "Deep Agents",
        "rel": "pages-agents-deep-agents.en",
        "sourceRel": "pages/agents/deep-agents.en.mdx"
      },
      {
        "title": "Function Calling in AI Agents",
        "rel": "pages-agents-function-calling.en",
        "sourceRel": "pages/agents/function-calling.en.mdx"
      },
      {
        "title": "Introduction to AI Agents",
        "rel": "pages-agents-introduction.en",
        "sourceRel": "pages/agents/introduction.en.mdx"
      },
      {
        "title": "LLM Applications & Guides",
        "rel": "pages-applications.en",
        "sourceRel": "pages/applications.en.mdx"
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
        "rel": "ch01-java",
        "sourceRel": "ch01/java/README.md"
      },
      {
        "title": "Basic interaction with Anthropic Claude models",
        "rel": "ch01-javascript-anthropic-claude-basic",
        "sourceRel": "ch01/javascript/anthropic-claude-basic/README.md"
      },
      {
        "title": "Streaming responses from Anthropic Claude models",
        "rel": "ch01-javascript-anthropic-claude-streaming",
        "sourceRel": "ch01/javascript/anthropic-claude-streaming/README.md"
      },
      {
        "title": "Basic interaction with Google Gemini models",
        "rel": "ch01-javascript-google-gemini-basic",
        "sourceRel": "ch01/javascript/google-gemini-basic/README.md"
      },
      {
        "title": "Streaming responses from Google Gemini models",
        "rel": "ch01-javascript-google-gemini-streaming",
        "sourceRel": "ch01/javascript/google-gemini-streaming/README.md"
      },
      {
        "title": "Basic interaction with a local LLM using Ollama",
        "rel": "ch01-javascript-ollama-local-basic",
        "sourceRel": "ch01/javascript/ollama-local-basic/README.md"
      },
      {
        "title": "Streaming responses from a local LLM using Ollama",
        "rel": "ch01-javascript-ollama-local-streaming",
        "sourceRel": "ch01/javascript/ollama-local-streaming/README.md"
      },
      {
        "title": "Basic interaction with OpenAI GPT models",
        "rel": "ch01-javascript-openai-gpt-basic",
        "sourceRel": "ch01/javascript/openai-gpt-basic/README.md"
      },
      {
        "title": "Streaming responses from OpenAI GPT models",
        "rel": "ch01-javascript-openai-gpt-streaming",
        "sourceRel": "ch01/javascript/openai-gpt-streaming/README.md"
      },
      {
        "title": "Basic interaction with LLMs in JavaScript",
        "rel": "ch01-javascript",
        "sourceRel": "ch01/javascript/README.md"
      },
      {
        "title": "Basic interaction with LLMs in Jupyter Notebooks",
        "rel": "ch01-jupyter",
        "sourceRel": "ch01/jupyter/README.md"
      },
      {
        "title": "Basic interaction with Anthropic Claude models",
        "rel": "ch01-python-anthropic-claude-basic",
        "sourceRel": "ch01/python/anthropic-claude-basic/README.md"
      },
      {
        "title": "Streaming responses from Anthropic Claude models",
        "rel": "ch01-python-anthropic-claude-streaming",
        "sourceRel": "ch01/python/anthropic-claude-streaming/README.md"
      },
      {
        "title": "Basic interaction with Google Gemini models",
        "rel": "ch01-python-google-gemini-basic",
        "sourceRel": "ch01/python/google-gemini-basic/README.md"
      },
      {
        "title": "Streaming responses from Google Gemini models",
        "rel": "ch01-python-google-gemini-streaming",
        "sourceRel": "ch01/python/google-gemini-streaming/README.md"
      },
      {
        "title": "Basic interaction with a local LLM using Ollama",
        "rel": "ch01-python-ollama-local-basic",
        "sourceRel": "ch01/python/ollama-local-basic/README.md"
      },
      {
        "title": "Streaming responses from a local LLM using Ollama",
        "rel": "ch01-python-ollama-local-streaming",
        "sourceRel": "ch01/python/ollama-local-streaming/README.md"
      },
      {
        "title": "Basic interaction with OpenAI GPT models",
        "rel": "ch01-python-openai-gpt-basic",
        "sourceRel": "ch01/python/openai-gpt-basic/README.md"
      },
      {
        "title": "Streaming responses from OpenAI GPT models",
        "rel": "ch01-python-openai-gpt-streaming",
        "sourceRel": "ch01/python/openai-gpt-streaming/README.md"
      },
      {
        "title": "Basic interaction with LLMs in Python",
        "rel": "ch01-python",
        "sourceRel": "ch01/python/README.md"
      },
      {
        "title": "Project Notetaker",
        "rel": "ch02-agent-skills-project-notetaker-SKILL",
        "sourceRel": "ch02/agent-skills/project-notetaker/SKILL.md"
      },
      {
        "title": "Agent Skills",
        "rel": "ch02-agent-skills",
        "sourceRel": "ch02/agent-skills/README.md"
      },
      {
        "title": "System prompt in Java",
        "rel": "ch02-java",
        "sourceRel": "ch02/java/README.md"
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
        "rel": "use-cases-agent-factory-with-subagents-agents-rag_agent",
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
        "rel": "use-cases-agent-factory-with-subagents",
        "sourceRel": "use-cases/agent-factory-with-subagents/README.md"
      },
      {
        "title": "Context Engineering Intro",
        "rel": "use-cases-agent-factory-with-subagents-SAMPLE_PROMPT",
        "sourceRel": "use-cases/agent-factory-with-subagents/SAMPLE_PROMPT.md"
      },
      {
        "title": "WISC Framework: Context Engineering for AI Coding",
        "rel": "use-cases-ai-coding-wisc-framework",
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
        "rel": "use-cases-ai-coding-workflows-foundation",
        "sourceRel": "use-cases/ai-coding-workflows-foundation/README.md"
      },
      {
        "title": "Claude Agent SDK Session Manager",
        "rel": "use-cases-build-with-agent-team-example-plan-session-manager-plan",
        "sourceRel": "use-cases/build-with-agent-team/example-plan/session-manager-plan.md"
      },
      {
        "title": "Build with Agent Team",
        "rel": "use-cases-build-with-agent-team",
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
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-agent-hook",
        "sourceRel": "system-prompts/agent-prompt-agent-hook.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-artifact-comment-thread-analyst",
        "sourceRel": "system-prompts/agent-prompt-artifact-comment-thread-analyst.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-artifact-editor-thread-follow-up",
        "sourceRel": "system-prompts/agent-prompt-artifact-editor-thread-follow-up.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-artifact-type-creation-slash-command",
        "sourceRel": "system-prompts/agent-prompt-artifact-type-creation-slash-command.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-auto-mode-rule-reviewer",
        "sourceRel": "system-prompts/agent-prompt-auto-mode-rule-reviewer.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-away-summary-generation",
        "sourceRel": "system-prompts/agent-prompt-away-summary-generation.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-background-agent-state-classifier",
        "sourceRel": "system-prompts/agent-prompt-background-agent-state-classifier.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-background-job-agent-instructions",
        "sourceRel": "system-prompts/agent-prompt-background-job-agent-instructions.md"
      },
      {
        "title": "Batch: Parallel Work Orchestration",
        "rel": "system-prompts-agent-prompt-batch-slash-command",
        "sourceRel": "system-prompts/agent-prompt-batch-slash-command.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-claude-code-guide",
        "sourceRel": "system-prompts/agent-prompt-claude-code-guide.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-claude-guide-agent",
        "sourceRel": "system-prompts/agent-prompt-claude-guide-agent.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-claude-md-creation",
        "sourceRel": "system-prompts/agent-prompt-claude-md-creation.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-gitlab-comment-posting",
        "sourceRel": "system-prompts/agent-prompt-code-review-gitlab-comment-posting.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-inline-gap-sweep-phase",
        "sourceRel": "system-prompts/agent-prompt-code-review-inline-gap-sweep-phase.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-minimal-mode",
        "sourceRel": "system-prompts/agent-prompt-code-review-minimal-mode.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-1-base-finder-angles",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-1-base-finder-angles.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-2-low-effort-minimum-findings-mode",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-2-low-effort-minimum-findings-mode.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-2-low-effort-mode",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-2-low-effort-mode.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-3-extra-high-and-maximum-effort-modes",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-3-extra-high-and-maximum-effort-modes.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-4-three-state-verification-phase",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-4-three-state-verification-phase.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-5-recall-biased-verification-phase",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-5-recall-biased-verification-phase.md"
      },
      {
        "title": "Claude Code System Prompts",
        "rel": "system-prompts-agent-prompt-code-review-part-6-medium-effort-mode",
        "sourceRel": "system-prompts/agent-prompt-code-review-part-6-medium-effort-mode.md"
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
        "title": "Continual Learning Hook",
        "rel": "hooks-continual-learning",
        "sourceRel": "hooks/continual-learning/README.md"
      },
      {
        "title": "Skill Evaluation Test Harness",
        "rel": "tests",
        "sourceRel": "tests/README.md"
      },
      {
        "title": "Agent Framework Azure AI Python Acceptance Criteria",
        "rel": "tests-scenarios-agent-framework-azure-ai-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/agent-framework-azure-ai-py/acceptance-criteria.md"
      },
      {
        "title": "Azure.AI.Agents.Persistent SDK Acceptance Criteria (.NET)",
        "rel": "tests-scenarios-azure-ai-agents-persistent-dotnet-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-agents-persistent-dotnet/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Agents Persistent SDK for Java Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-agents-persistent-java-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-agents-persistent-java/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Anomaly Detector SDK for Java Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-anomalydetector-java-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-anomalydetector-java/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Content Safety SDK for Java Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-contentsafety-java-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-contentsafety-java/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Content Safety SDK Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-contentsafety-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-contentsafety-py/acceptance-criteria.md"
      },
      {
        "title": "Acceptance Criteria: azure-ai-contentsafety-ts",
        "rel": "tests-scenarios-azure-ai-contentsafety-ts-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-contentsafety-ts/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Content Understanding SDK Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-contentunderstanding-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-contentunderstanding-py/acceptance-criteria.md"
      },
      {
        "title": "Azure Document Intelligence SDK Acceptance Criteria (.NET)",
        "rel": "tests-scenarios-azure-ai-document-intelligence-dotnet-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-document-intelligence-dotnet/acceptance-criteria.md"
      },
      {
        "title": "Acceptance Criteria: azure-ai-document-intelligence-ts",
        "rel": "tests-scenarios-azure-ai-document-intelligence-ts-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-document-intelligence-ts/acceptance-criteria.md"
      },
      {
        "title": "Azure Document Intelligence (Form Recognizer) SDK for Java Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-formrecognizer-java-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-formrecognizer-java/acceptance-criteria.md"
      },
      {
        "title": "Acceptance Criteria: azure-ai-language-conversations-py",
        "rel": "tests-scenarios-azure-ai-language-conversations-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-language-conversations-py/acceptance-criteria.md"
      },
      {
        "title": "Azure Machine Learning SDK v2 Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-ml-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-ml-py/acceptance-criteria.md"
      },
      {
        "title": "Azure OpenAI SDK Acceptance Criteria (.NET)",
        "rel": "tests-scenarios-azure-ai-openai-dotnet-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-openai-dotnet/acceptance-criteria.md"
      },
      {
        "title": "Azure.AI.Projects SDK Acceptance Criteria (.NET)",
        "rel": "tests-scenarios-azure-ai-projects-dotnet-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-projects-dotnet/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Projects SDK for Java Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-projects-java-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-projects-java/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Projects SDK Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-projects-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-projects-py/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Projects SDK Acceptance Criteria (TypeScript)",
        "rel": "tests-scenarios-azure-ai-projects-ts-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-projects-ts/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Text Analytics SDK Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-textanalytics-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-textanalytics-py/acceptance-criteria.md"
      },
      {
        "title": "Azure AI Transcription SDK Acceptance Criteria",
        "rel": "tests-scenarios-azure-ai-transcription-py-acceptance-criteria",
        "sourceRel": "tests/scenarios/azure-ai-transcription-py/acceptance-criteria.md"
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
        "title": "CLAUDE.md",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "PDF Processing",
        "rel": "docs-agentskills",
        "sourceRel": "docs/agentskills.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-blogs",
        "sourceRel": "docs/blogs.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-claude_research",
        "sourceRel": "docs/claude_research.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-compression",
        "sourceRel": "docs/compression.md"
      },
      {
        "title": "ADR-0001: Machine-testable, deny-by-default authority",
        "rel": "docs-decisions-0001-machine-testable-constitution",
        "sourceRel": "docs/decisions/0001-machine-testable-constitution.md"
      },
      {
        "title": "ADR-0002: Treat the corpus inventory as a checked derived view",
        "rel": "docs-decisions-0002-derived-corpus-inventory",
        "sourceRel": "docs/decisions/0002-derived-corpus-inventory.md"
      },
      {
        "title": "ADR-0003: Publish allowlisted projections, not redacted private records",
        "rel": "docs-decisions-0003-allowlisted-public-projections",
        "sourceRel": "docs/decisions/0003-allowlisted-public-projections.md"
      },
      {
        "title": "ADR-0004: Make schemas, identity, and frozen bytes runtime-neutral",
        "rel": "docs-decisions-0004-runtime-neutral-artifact-contracts",
        "sourceRel": "docs/decisions/0004-runtime-neutral-artifact-contracts.md"
      },
      {
        "title": "Architecture decision records",
        "rel": "docs-decisions",
        "sourceRel": "docs/decisions/README.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-gemini_research",
        "sourceRel": "docs/gemini_research.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-hncapsule",
        "sourceRel": "docs/hncapsule.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-netflix_context",
        "sourceRel": "docs/netflix_context.md"
      },
      {
        "title": "Skills Improvement Analysis: Lessons from Anthropic's \"Building Claude Code\" Article",
        "rel": "docs-skills-improvement-analysis",
        "sourceRel": "docs/skills-improvement-analysis.md"
      },
      {
        "title": "SPEC-000: Program constitution and authority model",
        "rel": "docs-specs-SPEC-000-program-constitution",
        "sourceRel": "docs/specs/SPEC-000-program-constitution.md"
      },
      {
        "title": "SPEC-001: Repository reconciliation and generated corpus inventory",
        "rel": "docs-specs-SPEC-001-repository-reconciliation",
        "sourceRel": "docs/specs/SPEC-001-repository-reconciliation.md"
      },
      {
        "title": "SPEC-002: Public and private boundary",
        "rel": "docs-specs-SPEC-002-public-private-boundary",
        "sourceRel": "docs/specs/SPEC-002-public-private-boundary.md"
      },
      {
        "title": "SPEC-003: Schema registry and artifact identity",
        "rel": "docs-specs-SPEC-003-schema-registry",
        "sourceRel": "docs/specs/SPEC-003-schema-registry.md"
      },
      {
        "title": "Agent Skills for Context Engineering",
        "rel": "docs-vercel_tool",
        "sourceRel": "docs/vercel_tool.md"
      },
      {
        "title": "Book SFT Pipeline",
        "rel": "examples-book-sft-pipeline",
        "sourceRel": "examples/book-sft-pipeline/README.md"
      },
      {
        "title": "Segmentation Strategies",
        "rel": "examples-book-sft-pipeline-references-segmentation-strategies",
        "sourceRel": "examples/book-sft-pipeline/references/segmentation-strategies.md"
      },
      {
        "title": "Tinker Format Specification",
        "rel": "examples-book-sft-pipeline-references-tinker-format",
        "sourceRel": "examples/book-sft-pipeline/references/tinker-format.md"
      },
      {
        "title": "Book SFT Pipeline",
        "rel": "examples-book-sft-pipeline-SKILL",
        "sourceRel": "examples/book-sft-pipeline/SKILL.md"
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
        "rel": "agents-code-reviewer",
        "sourceRel": "agents/code-reviewer.md"
      },
      {
        "title": "Security Auditor",
        "rel": "agents-security-auditor",
        "sourceRel": "agents/security-auditor.md"
      },
      {
        "title": "Test Engineer",
        "rel": "agents-test-engineer",
        "sourceRel": "agents/test-engineer.md"
      },
      {
        "title": "Web Performance Auditor",
        "rel": "agents-web-performance-auditor",
        "sourceRel": "agents/web-performance-auditor.md"
      },
      {
        "title": "agent-skills",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Adoption Guide: New Projects vs. Established Codebases",
        "rel": "docs-adoption-guide",
        "sourceRel": "docs/adoption-guide.md"
      },
      {
        "title": "Advanced per-agent configuration",
        "rel": "docs-advanced-per-agent-configuration",
        "sourceRel": "docs/advanced-per-agent-configuration.md"
      },
      {
        "title": "Using agent-skills with Antigravity CLI (agy)",
        "rel": "docs-antigravity-setup",
        "sourceRel": "docs/antigravity-setup.md"
      },
      {
        "title": "Using agent-skills with Codex",
        "rel": "docs-codex-setup",
        "sourceRel": "docs/codex-setup.md"
      },
      {
        "title": "Using agent-skills with Command Code",
        "rel": "docs-commandcode-setup",
        "sourceRel": "docs/commandcode-setup.md"
      },
      {
        "title": "How agent-skills compares",
        "rel": "docs-comparison",
        "sourceRel": "docs/comparison.md"
      },
      {
        "title": "Using agent-skills with GitHub Copilot CLI",
        "rel": "docs-copilot-cli-setup",
        "sourceRel": "docs/copilot-cli-setup.md"
      },
      {
        "title": "Using agent-skills with GitHub Copilot",
        "rel": "docs-copilot-setup",
        "sourceRel": "docs/copilot-setup.md"
      },
      {
        "title": "Using agent-skills with Cursor",
        "rel": "docs-cursor-setup",
        "sourceRel": "docs/cursor-setup.md"
      },
      {
        "title": "Developer Onboarding",
        "rel": "docs-developer-onboarding",
        "sourceRel": "docs/developer-onboarding.md"
      },
      {
        "title": "Using agent-skills with Gemini CLI",
        "rel": "docs-gemini-cli-setup",
        "sourceRel": "docs/gemini-cli-setup.md"
      },
      {
        "title": "Getting Started with agent-skills",
        "rel": "docs-getting-started",
        "sourceRel": "docs/getting-started.md"
      },
      {
        "title": "OpenCode Setup",
        "rel": "docs-opencode-setup",
        "sourceRel": "docs/opencode-setup.md"
      },
      {
        "title": "Skill Anatomy",
        "rel": "docs-skill-anatomy",
        "sourceRel": "docs/skill-anatomy.md"
      },
      {
        "title": "Using agent-skills with Windsurf",
        "rel": "docs-windsurf-setup",
        "sourceRel": "docs/windsurf-setup.md"
      },
      {
        "title": "URL shortener service brief",
        "rel": "evals-fixtures-api-and-interface-design-service-brief",
        "sourceRel": "evals/fixtures/api-and-interface-design/service-brief.md"
      },
      {
        "title": "Signup reproduction",
        "rel": "evals-fixtures-browser-testing-with-devtools",
        "sourceRel": "evals/fixtures/browser-testing-with-devtools/README.md"
      },
      {
        "title": "Session context audit",
        "rel": "evals-fixtures-context-engineering-context-audit",
        "sourceRel": "evals/fixtures/context-engineering/context-audit.md"
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
        "title": "Superpowers — Contributor Guidelines",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "OpenCode Support Design",
        "rel": "docs-plans-2025-11-22-opencode-support-design",
        "sourceRel": "docs/plans/2025-11-22-opencode-support-design.md"
      },
      {
        "title": "OpenCode Support Implementation Plan",
        "rel": "docs-plans-2025-11-22-opencode-support-implementation",
        "sourceRel": "docs/plans/2025-11-22-opencode-support-implementation.md"
      },
      {
        "title": "Skills Improvements from User Feedback",
        "rel": "docs-plans-2025-11-28-skills-improvements-from-user-feedback",
        "sourceRel": "docs/plans/2025-11-28-skills-improvements-from-user-feedback.md"
      },
      {
        "title": "Porting Superpowers to a New Harness",
        "rel": "docs-porting-to-a-new-harness",
        "sourceRel": "docs/porting-to-a-new-harness.md"
      },
      {
        "title": "Superpowers for Kimi Code",
        "rel": "docs-README.kimi",
        "sourceRel": "docs/README.kimi.md"
      },
      {
        "title": "Superpowers for OpenCode",
        "rel": "docs-README.opencode",
        "sourceRel": "docs/README.opencode.md"
      },
      {
        "title": "Document Review System Implementation Plan",
        "rel": "docs-superpowers-plans-2026-01-22-document-review-system",
        "sourceRel": "docs/superpowers/plans/2026-01-22-document-review-system.md"
      },
      {
        "title": "Visual Brainstorming Refactor Implementation Plan",
        "rel": "docs-superpowers-plans-2026-02-19-visual-brainstorming-refactor",
        "sourceRel": "docs/superpowers/plans/2026-02-19-visual-brainstorming-refactor.md"
      },
      {
        "title": "Zero-Dependency Brainstorm Server Implementation Plan",
        "rel": "docs-superpowers-plans-2026-03-11-zero-dep-brainstorm-server",
        "sourceRel": "docs/superpowers/plans/2026-03-11-zero-dep-brainstorm-server.md"
      },
      {
        "title": "Codex App Compatibility Implementation Plan",
        "rel": "docs-superpowers-plans-2026-03-23-codex-app-compatibility",
        "sourceRel": "docs/superpowers/plans/2026-03-23-codex-app-compatibility.md"
      },
      {
        "title": "Worktree Rototill Implementation Plan",
        "rel": "docs-superpowers-plans-2026-04-06-worktree-rototill",
        "sourceRel": "docs/superpowers/plans/2026-04-06-worktree-rototill.md"
      },
      {
        "title": "Lift drill into superpowers as evals/ — implementation plan",
        "rel": "docs-superpowers-plans-2026-05-06-lift-drill-into-evals",
        "sourceRel": "docs/superpowers/plans/2026-05-06-lift-drill-into-evals.md"
      },
      {
        "title": "Pi Extension and Evals Implementation Plan",
        "rel": "docs-superpowers-plans-2026-05-07-pi-extension-and-evals",
        "sourceRel": "docs/superpowers/plans/2026-05-07-pi-extension-and-evals.md"
      },
      {
        "title": "SDD Task-Scoped Review Dispatch Implementation Plan",
        "rel": "docs-superpowers-plans-2026-06-09-sdd-task-scoped-review-dispatch",
        "sourceRel": "docs/superpowers/plans/2026-06-09-sdd-task-scoped-review-dispatch.md"
      },
      {
        "title": "Visual Brainstorming Companion — Issue & Change Catalog",
        "rel": "docs-superpowers-plans-2026-06-09-visual-companion-issues",
        "sourceRel": "docs/superpowers/plans/2026-06-09-visual-companion-issues.md"
      },
      {
        "title": "Visual Companion Final Hardening Fixup Implementation Plan",
        "rel": "docs-superpowers-plans-2026-06-11-visual-companion-final-hardening-fixup",
        "sourceRel": "docs/superpowers/plans/2026-06-11-visual-companion-final-hardening-fixup.md"
      },
      {
        "title": "SDD Plan-Scoped Workspace Implementation Plan",
        "rel": "docs-superpowers-plans-2026-07-06-sdd-plan-scoped-workspace",
        "sourceRel": "docs/superpowers/plans/2026-07-06-sdd-plan-scoped-workspace.md"
      },
      {
        "title": "SDD Fix-Loop Redesign Implementation Plan",
        "rel": "docs-superpowers-plans-2026-07-15-sdd-fix-loop-redesign",
        "sourceRel": "docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
      },
      {
        "title": "Codex Efficiency Fixes Implementation Plan",
        "rel": "docs-superpowers-plans-2026-07-30-codex-efficiency-fixes",
        "sourceRel": "docs/superpowers/plans/2026-07-30-codex-efficiency-fixes.md"
      },
      {
        "title": "Hermes Version-Bump Wiring Implementation Plan",
        "rel": "docs-superpowers-plans-2026-08-06-hermes-version-bump-wiring",
        "sourceRel": "docs/superpowers/plans/2026-08-06-hermes-version-bump-wiring.md"
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
        "title": "Superpowers — 贡献者指南",
        "rel": "CLAUDE",
        "sourceRel": "CLAUDE.md"
      },
      {
        "title": "Superpowers 中文版 — Aider 安装指南",
        "rel": "docs-README.aider",
        "sourceRel": "docs/README.aider.md"
      },
      {
        "title": "Superpowers 中文版 — Antigravity 安装指南",
        "rel": "docs-README.antigravity",
        "sourceRel": "docs/README.antigravity.md"
      },
      {
        "title": "Superpowers 中文版 — Claw Code 安装指南",
        "rel": "docs-README.claw",
        "sourceRel": "docs/README.claw.md"
      },
      {
        "title": "Superpowers 中文版 — Cline 安装指南",
        "rel": "docs-README.cline",
        "sourceRel": "docs/README.cline.md"
      },
      {
        "title": "华为云码道 CodeArts 使用指南",
        "rel": "docs-README.codearts",
        "sourceRel": "docs/README.codearts.md"
      },
      {
        "title": "CodeBuddy 使用指南",
        "rel": "docs-README.codebuddy",
        "sourceRel": "docs/README.codebuddy.md"
      },
      {
        "title": "Superpowers 中文版 — Codex CLI 安装指南",
        "rel": "docs-README.codex",
        "sourceRel": "docs/README.codex.md"
      },
      {
        "title": "Superpowers 中文版 — Crush 安装指南",
        "rel": "docs-README.crush",
        "sourceRel": "docs/README.crush.md"
      },
      {
        "title": "Superpowers 中文版 — DeepSeek Harness 安装指南",
        "rel": "docs-README.deepseek-harness",
        "sourceRel": "docs/README.deepseek-harness.md"
      },
      {
        "title": "Superpowers 中文版 — DeerFlow 安装指南",
        "rel": "docs-README.deerflow",
        "sourceRel": "docs/README.deerflow.md"
      },
      {
        "title": "Superpowers 中文版 — Gemini CLI 安装指南",
        "rel": "docs-README.gemini-cli",
        "sourceRel": "docs/README.gemini-cli.md"
      },
      {
        "title": "Superpowers 中文版 — Hermes Agent 安装指南",
        "rel": "docs-README.hermes",
        "sourceRel": "docs/README.hermes.md"
      },
      {
        "title": "Superpowers 中文版 — Kilo Code 安装指南",
        "rel": "docs-README.kilocode",
        "sourceRel": "docs/README.kilocode.md"
      },
      {
        "title": "Superpowers 中文版 · Kimi Code 指南",
        "rel": "docs-README.kimi",
        "sourceRel": "docs/README.kimi.md"
      },
      {
        "title": "Superpowers 中文版 — Kiro 安装指南",
        "rel": "docs-README.kiro",
        "sourceRel": "docs/README.kiro.md"
      },
      {
        "title": "Superpowers 中文版 — OpenClaw 安装指南",
        "rel": "docs-README.openclaw",
        "sourceRel": "docs/README.openclaw.md"
      },
      {
        "title": "Superpowers 中文版 — OpenCode 安装指南",
        "rel": "docs-README.opencode",
        "sourceRel": "docs/README.opencode.md"
      },
      {
        "title": "Superpowers 中文版 · Pi 指南",
        "rel": "docs-README.pi",
        "sourceRel": "docs/README.pi.md"
      },
      {
        "title": "Superpowers 中文版 — Qoder 安装指南",
        "rel": "docs-README.qoder",
        "sourceRel": "docs/README.qoder.md"
      },
      {
        "title": "Superpowers 中文版 — Qwen Code 安装指南",
        "rel": "docs-README.qwen",
        "sourceRel": "docs/README.qwen.md"
      },
      {
        "title": "Superpowers 中文版 — Reasonix 安装指南",
        "rel": "docs-README.reasonix",
        "sourceRel": "docs/README.reasonix.md"
      },
      {
        "title": "Superpowers 中文版 — TRAE CN（国内版）安装指南",
        "rel": "docs-README.trae-cn",
        "sourceRel": "docs/README.trae-cn.md"
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
        "rel": "README.zh-CN",
        "sourceRel": "README.zh-CN.md"
      },
      {
        "title": "Agent Skill Index",
        "rel": "README.zh-TW",
        "sourceRel": "README.zh-TW.md"
      },
      {
        "title": "Agent Skill Index",
        "rel": "website",
        "sourceRel": "website/README.md"
      }
    ]
  },
  {
    "id": "10-context-memory/awesome-agent-skills-voltagent",
    "volume": "10-context-memory",
    "local": "awesome-agent-skills-voltagent",
    "title": "Awesome Agent Skills（Agent 技能清单）",
    "kind": "技能与配置库",
    "category": "技能、配置与模板",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "英文",
    "publishable": true,
    "repo": "VoltAgent/awesome-agent-skills",
    "site": null,
    "commit": "8873794bcb26ff5dcf9cd518c87cf5638ca44b92",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/VoltAgent/awesome-agent-skills",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome Agent Skills",
        "rel": "overview",
        "sourceRel": "README.md"
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
        "rel": "examples-base",
        "sourceRel": "examples/base.md"
      },
      {
        "title": "Wonderful Prompts",
        "rel": "examples-GPT_Generate_A_book",
        "sourceRel": "examples/GPT_Generate_A_book.md"
      },
      {
        "title": "Wonderful Prompts",
        "rel": "examples-gpt_math_solver",
        "sourceRel": "examples/gpt_math_solver.md"
      },
      {
        "title": "Wonderful Prompts",
        "rel": "examples-gpt4_CAN_coder",
        "sourceRel": "examples/gpt4_CAN_coder.md"
      },
      {
        "title": "Wonderful Prompts",
        "rel": "examples-super_experts_gpt",
        "sourceRel": "examples/super_experts_gpt.md"
      }
    ]
  },
  {
    "id": "10-context-memory/awesome-mcp-zh",
    "volume": "10-context-memory",
    "local": "awesome-mcp-zh",
    "title": "Awesome MCP 中文资源",
    "kind": "清单与速查",
    "category": "速查清单与索引",
    "tier": 3,
    "license": "MIT",
    "licenseLabel": "可转载",
    "lang": "中文",
    "publishable": true,
    "repo": "yzfly/Awesome-MCP-ZH",
    "site": null,
    "commit": "616590af2bc94fcd98dd0b88a0b740ad6cb86a9d",
    "entry": "README.md",
    "featured": false,
    "sourceUrl": "https://github.com/yzfly/Awesome-MCP-ZH",
    "docs": [
      {
        "title": "课程首页",
        "rel": "index",
        "sourceRel": ""
      },
      {
        "title": "Awesome-MCP-ZH",
        "rel": "overview",
        "sourceRel": "README.md"
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
        "rel": "agents-gsd-advisor-researcher",
        "sourceRel": "agents/gsd-advisor-researcher.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-assumptions-analyzer",
        "sourceRel": "agents/gsd-assumptions-analyzer.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-code-fixer",
        "sourceRel": "agents/gsd-code-fixer.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-code-reviewer",
        "sourceRel": "agents/gsd-code-reviewer.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-codebase-mapper",
        "sourceRel": "agents/gsd-codebase-mapper.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-debug-session-manager",
        "sourceRel": "agents/gsd-debug-session-manager.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-debugger",
        "sourceRel": "agents/gsd-debugger.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-doc-classifier",
        "sourceRel": "agents/gsd-doc-classifier.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-doc-synthesizer",
        "sourceRel": "agents/gsd-doc-synthesizer.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-doc-verifier",
        "sourceRel": "agents/gsd-doc-verifier.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-doc-writer",
        "sourceRel": "agents/gsd-doc-writer.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-domain-researcher",
        "sourceRel": "agents/gsd-domain-researcher.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-eval-auditor",
        "sourceRel": "agents/gsd-eval-auditor.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-eval-planner",
        "sourceRel": "agents/gsd-eval-planner.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-executor",
        "sourceRel": "agents/gsd-executor.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-framework-selector",
        "sourceRel": "agents/gsd-framework-selector.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-integration-checker",
        "sourceRel": "agents/gsd-integration-checker.md"
      },
      {
        "title": "GSD Intel Updater",
        "rel": "agents-gsd-intel-updater",
        "sourceRel": "agents/gsd-intel-updater.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-nyquist-auditor",
        "sourceRel": "agents/gsd-nyquist-auditor.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-pattern-mapper",
        "sourceRel": "agents/gsd-pattern-mapper.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-phase-researcher",
        "sourceRel": "agents/gsd-phase-researcher.md"
      },
      {
        "title": "GSD（Get Shit Done）工作流文档",
        "rel": "agents-gsd-plan-checker",
        "sourceRel": "agents/gsd-plan-checker.md"
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
        "title": "Enterprise-grade, agentic RAG over complex real-world docs",
        "rel": "agentic_rag_deepseek",
        "sourceRel": "agentic_rag_deepseek/README.md"
      },
      {
        "title": "Agentic RAG using CrewAI",
        "rel": "agentic_rag",
        "sourceRel": "agentic_rag/README.md"
      },
      {
        "title": "AI News generator",
        "rel": "ai_news_generator",
        "sourceRel": "ai_news_generator/README.md"
      },
      {
        "title": "Zep Documentation Data Directory",
        "rel": "ai-avatar-demo-data",
        "sourceRel": "ai-avatar-demo/data/README.md"
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
        "title": "{{crewname}} Crew",
        "rel": "book-writer-flow-book_flow-book_writing_flow",
        "sourceRel": "book-writer-flow/book_flow/book_writing_flow/README.md"
      },
      {
        "title": "Chapter 1: Introduction to Astronomy in 2025",
        "rel": "book-writer-flow-book_flow-book_writing_flow-src-book",
        "sourceRel": "book-writer-flow/book_flow/book_writing_flow/src/book.md"
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
        "title": "Awesome OpenClaw 使用案例",
        "rel": "README_CN",
        "sourceRel": "README_CN.md"
      },
      {
        "title": "Awesome OpenClaw 활용 사례",
        "rel": "README_KR",
        "sourceRel": "README_KR.md"
      },
      {
        "title": "AI Video Editing via Chat",
        "rel": "usecases-ai-video-editing",
        "sourceRel": "usecases/ai-video-editing.md"
      },
      {
        "title": "OpenClaw as Desktop Cowork (AionUi) — Remote Rescue & Multi-Agent Hub",
        "rel": "usecases-aionui-cowork-desktop",
        "sourceRel": "usecases/aionui-cowork-desktop.md"
      },
      {
        "title": "arXiv Paper Reader",
        "rel": "usecases-arxiv-paper-reader",
        "sourceRel": "usecases/arxiv-paper-reader.md"
      },
      {
        "title": "Autonomous Educational Game Development Pipeline",
        "rel": "usecases-autonomous-game-dev-pipeline",
        "sourceRel": "usecases/autonomous-game-dev-pipeline.md"
      },
      {
        "title": "Autonomous Project Management with Subagents",
        "rel": "usecases-autonomous-project-management",
        "sourceRel": "usecases/autonomous-project-management.md"
      },
      {
        "title": "Multi-Agent Content Factory",
        "rel": "usecases-content-factory",
        "sourceRel": "usecases/content-factory.md"
      },
      {
        "title": "Custom Morning Brief",
        "rel": "usecases-custom-morning-brief",
        "sourceRel": "usecases/custom-morning-brief.md"
      },
      {
        "title": "Daily Reddit Digest",
        "rel": "usecases-daily-reddit-digest",
        "sourceRel": "usecases/daily-reddit-digest.md"
      },
      {
        "title": "Daily YouTube Digest",
        "rel": "usecases-daily-youtube-digest",
        "sourceRel": "usecases/daily-youtube-digest.md"
      },
      {
        "title": "Dynamic Dashboard with Sub-agent Spawning",
        "rel": "usecases-dynamic-dashboard",
        "sourceRel": "usecases/dynamic-dashboard.md"
      },
      {
        "title": "AI-Powered Earnings Tracker",
        "rel": "usecases-earnings-tracker",
        "sourceRel": "usecases/earnings-tracker.md"
      },
      {
        "title": "Event Guest Confirmation",
        "rel": "usecases-event-guest-confirmation",
        "sourceRel": "usecases/event-guest-confirmation.md"
      },
      {
        "title": "Family Calendar Aggregation & Household Assistant",
        "rel": "usecases-family-calendar-household-assistant",
        "sourceRel": "usecases/family-calendar-household-assistant.md"
      },
      {
        "title": "Habit Tracker & Accountability Coach",
        "rel": "usecases-habit-tracker-accountability-coach",
        "sourceRel": "usecases/habit-tracker-accountability-coach.md"
      },
      {
        "title": "Health & Symptom Tracker",
        "rel": "usecases-health-symptom-tracker",
        "sourceRel": "usecases/health-symptom-tracker.md"
      },
      {
        "title": "HF Papers Research Discovery",
        "rel": "usecases-hf-papers-research-discovery",
        "sourceRel": "usecases/hf-papers-research-discovery.md"
      },
      {
        "title": "Inbox De-clutter",
        "rel": "usecases-inbox-declutter",
        "sourceRel": "usecases/inbox-declutter.md"
      },
      {
        "title": "Personal Knowledge Base (RAG)",
        "rel": "usecases-knowledge-base-rag",
        "sourceRel": "usecases/knowledge-base-rag.md"
      },
      {
        "title": "LaTeX Paper Writing",
        "rel": "usecases-latex-paper-writing",
        "sourceRel": "usecases/latex-paper-writing.md"
      },
      {
        "title": "Local CRM Framework with DenchClaw",
        "rel": "usecases-local-crm-framework",
        "sourceRel": "usecases/local-crm-framework.md"
      },
      {
        "title": "Market Research & Product Factory",
        "rel": "usecases-market-research-product-factory",
        "sourceRel": "usecases/market-research-product-factory.md"
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
        "title": "步骤 00：只是一个聊天循环",
        "rel": "00-chat-loop-README.zh",
        "sourceRel": "00-chat-loop/README.zh.md"
      },
      {
        "title": "Step 01: Give your agent a tool.",
        "rel": "01-tools",
        "sourceRel": "01-tools/README.md"
      },
      {
        "title": "步骤 01：给你的智能体一个工具",
        "rel": "01-tools-README.zh",
        "sourceRel": "01-tools/README.zh.md"
      },
      {
        "title": "Step 02: Skills",
        "rel": "02-skills",
        "sourceRel": "02-skills/README.md"
      },
      {
        "title": "步骤 02：技能",
        "rel": "02-skills-README.zh",
        "sourceRel": "02-skills/README.zh.md"
      },
      {
        "title": "Step 03: Persistence",
        "rel": "03-persistence",
        "sourceRel": "03-persistence/README.md"
      },
      {
        "title": "步骤 03：持久化",
        "rel": "03-persistence-README.zh",
        "sourceRel": "03-persistence/README.zh.md"
      },
      {
        "title": "Step 04: Slash Commands",
        "rel": "04-slash-commands",
        "sourceRel": "04-slash-commands/README.md"
      },
      {
        "title": "步骤 04：斜杠命令",
        "rel": "04-slash-commands-README.zh",
        "sourceRel": "04-slash-commands/README.zh.md"
      },
      {
        "title": "Step 05: Compaction",
        "rel": "05-compaction",
        "sourceRel": "05-compaction/README.md"
      },
      {
        "title": "步骤 05：压缩",
        "rel": "05-compaction-README.zh",
        "sourceRel": "05-compaction/README.zh.md"
      },
      {
        "title": "Step 06: Web Tools",
        "rel": "06-web-tools",
        "sourceRel": "06-web-tools/README.md"
      },
      {
        "title": "步骤 06：Web 工具",
        "rel": "06-web-tools-README.zh",
        "sourceRel": "06-web-tools/README.zh.md"
      },
      {
        "title": "Step 07: Event-Driven Architecture",
        "rel": "07-event-driven",
        "sourceRel": "07-event-driven/README.md"
      },
      {
        "title": "步骤 07：事件驱动架构",
        "rel": "07-event-driven-README.zh",
        "sourceRel": "07-event-driven/README.zh.md"
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
        "rel": "categories-ai-and-llms",
        "sourceRel": "categories/ai-and-llms.md"
      },
      {
        "title": "Apple Apps & Services",
        "rel": "categories-apple-apps-and-services",
        "sourceRel": "categories/apple-apps-and-services.md"
      },
      {
        "title": "Browser & Automation",
        "rel": "categories-browser-and-automation",
        "sourceRel": "categories/browser-and-automation.md"
      },
      {
        "title": "Calendar & Scheduling",
        "rel": "categories-calendar-and-scheduling",
        "sourceRel": "categories/calendar-and-scheduling.md"
      },
      {
        "title": "Clawdbot Tools",
        "rel": "categories-clawdbot-tools",
        "sourceRel": "categories/clawdbot-tools.md"
      },
      {
        "title": "CLI Utilities",
        "rel": "categories-cli-utilities",
        "sourceRel": "categories/cli-utilities.md"
      },
      {
        "title": "Coding Agents & IDEs",
        "rel": "categories-coding-agents-and-ides",
        "sourceRel": "categories/coding-agents-and-ides.md"
      },
      {
        "title": "Communication",
        "rel": "categories-communication",
        "sourceRel": "categories/communication.md"
      },
      {
        "title": "Data & Analytics",
        "rel": "categories-data-and-analytics",
        "sourceRel": "categories/data-and-analytics.md"
      },
      {
        "title": "DevOps & Cloud",
        "rel": "categories-devops-and-cloud",
        "sourceRel": "categories/devops-and-cloud.md"
      },
      {
        "title": "Gaming",
        "rel": "categories-gaming",
        "sourceRel": "categories/gaming.md"
      },
      {
        "title": "Git & GitHub",
        "rel": "categories-git-and-github",
        "sourceRel": "categories/git-and-github.md"
      },
      {
        "title": "Health & Fitness",
        "rel": "categories-health-and-fitness",
        "sourceRel": "categories/health-and-fitness.md"
      },
      {
        "title": "Image & Video Generation",
        "rel": "categories-image-and-video-generation",
        "sourceRel": "categories/image-and-video-generation.md"
      },
      {
        "title": "iOS & macOS Development",
        "rel": "categories-ios-and-macos-development",
        "sourceRel": "categories/ios-and-macos-development.md"
      },
      {
        "title": "Marketing & Sales",
        "rel": "categories-marketing-and-sales",
        "sourceRel": "categories/marketing-and-sales.md"
      },
      {
        "title": "Media & Streaming",
        "rel": "categories-media-and-streaming",
        "sourceRel": "categories/media-and-streaming.md"
      },
      {
        "title": "Moltbook",
        "rel": "categories-moltbook",
        "sourceRel": "categories/moltbook.md"
      },
      {
        "title": "Notes & PKM",
        "rel": "categories-notes-and-pkm",
        "sourceRel": "categories/notes-and-pkm.md"
      },
      {
        "title": "PDF & Documents",
        "rel": "categories-pdf-and-documents",
        "sourceRel": "categories/pdf-and-documents.md"
      },
      {
        "title": "Personal Development",
        "rel": "categories-personal-development",
        "sourceRel": "categories/personal-development.md"
      },
      {
        "title": "Productivity & Tasks",
        "rel": "categories-productivity-and-tasks",
        "sourceRel": "categories/productivity-and-tasks.md"
      },
      {
        "title": "Search & Research",
        "rel": "categories-search-and-research",
        "sourceRel": "categories/search-and-research.md"
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
        "rel": "appendix-A-command-reference",
        "sourceRel": "appendix/A-command-reference.md"
      },
      {
        "title": "附录B 常用Skills清单",
        "rel": "appendix-B-skills-catalog",
        "sourceRel": "appendix/B-skills-catalog.md"
      },
      {
        "title": "附录C API服务商对比",
        "rel": "appendix-C-api-comparison",
        "sourceRel": "appendix/C-api-comparison.md"
      },
      {
        "title": "附录E 社区资源导航",
        "rel": "appendix-D-community-resources",
        "sourceRel": "appendix/D-community-resources.md"
      },
      {
        "title": "附录E：常见访问题速查",
        "rel": "appendix-E-common-problems",
        "sourceRel": "appendix/E-common-problems.md"
      },
      {
        "title": "附录C 配置模板与自定义参考",
        "rel": "appendix-E-config-templates",
        "sourceRel": "appendix/E-config-templates.md"
      },
      {
        "title": "第17章：避坑指南与最佳实践",
        "rel": "appendix-F-best-practices",
        "sourceRel": "appendix/F-best-practices.md"
      },
      {
        "title": "🔥🔥🔥云上OpenClaw实操视频教程合集",
        "rel": "appendix-F-video-tutorials",
        "sourceRel": "appendix/F-video-tutorials.md"
      },
      {
        "title": "附录G：文档链接验证",
        "rel": "appendix-G-links-validation",
        "sourceRel": "appendix/G-links-validation.md"
      },
      {
        "title": "附录H：配置文件模板和示例",
        "rel": "appendix-H-config-templates",
        "sourceRel": "appendix/H-config-templates.md"
      },
      {
        "title": "附录 I：思考题参考答案",
        "rel": "appendix-I-thinking-questions-answers",
        "sourceRel": "appendix/I-thinking-questions-answers.md"
      },
      {
        "title": "飞书Bot配置检查清单",
        "rel": "appendix-J-feishu-checklist",
        "sourceRel": "appendix/J-feishu-checklist.md"
      },
      {
        "title": "附录J：OpenClaw深度解析（腾讯技术工程）",
        "rel": "appendix-J-tencent-deep-dive",
        "sourceRel": "appendix/J-tencent-deep-dive.md"
      },
      {
        "title": "OpenClaw API Key 配置完整指南",
        "rel": "appendix-K-api-key-config-guide",
        "sourceRel": "appendix/K-api-key-config-guide.md"
      },
      {
        "title": "OpenClaw 配置文件结构完整指南",
        "rel": "appendix-L-config-file-structure",
        "sourceRel": "appendix/L-config-file-structure.md"
      },
      {
        "title": "🔍 搜索功能使用指南",
        "rel": "appendix-M-search-guide",
        "sourceRel": "appendix/M-search-guide.md"
      },
      {
        "title": "OpenClaw Skills 生态说明",
        "rel": "appendix-N-skills-ecosystem",
        "sourceRel": "appendix/N-skills-ecosystem.md"
      },
      {
        "title": "第1章：认识OpenClaw",
        "rel": "docs-01-basics-01-introduction",
        "sourceRel": "docs/01-basics/01-introduction.md"
      },
      {
        "title": "第2章节：环境搭建",
        "rel": "docs-01-basics-02-installation",
        "sourceRel": "docs/01-basics/02-installation.md"
      },
      {
        "title": "第3章节：快速上手",
        "rel": "docs-01-basics-03-quick-start",
        "sourceRel": "docs/01-basics/03-quick-start.md"
      },
      {
        "title": "第4章节：本地文件管理",
        "rel": "docs-02-core-features-04-file-management",
        "sourceRel": "docs/02-core-features/04-file-management.md"
      },
      {
        "title": "第5章节 知识库与第二大脑（Active Memory / Memory Wiki / 研究归档）",
        "rel": "docs-02-core-features-05-knowledge-management",
        "sourceRel": "docs/02-core-features/05-knowledge-management.md"
      },
      {
        "title": "第6章节 日程与任务管理",
        "rel": "docs-02-core-features-06-schedule-management",
        "sourceRel": "docs/02-core-features/06-schedule-management.md"
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
        "rel": "config-quick_start_default",
        "sourceRel": "config/quick_start_default.md"
      },
      {
        "title": "macOS Window Capture",
        "rel": "frontend-externals-python-window_capture",
        "sourceRel": "frontend/externals/python/window_capture/README.md"
      },
      {
        "title": "macOS Window Inspector",
        "rel": "frontend-externals-python-window_inspector",
        "sourceRel": "frontend/externals/python/window_inspector/README.md"
      },
      {
        "title": "MineContext",
        "rel": "frontend",
        "sourceRel": "frontend/README.md"
      },
      {
        "title": "👋🏻 MineContext 是什么",
        "rel": "README_zh",
        "sourceRel": "README_zh.md"
      },
      {
        "title": "MineContext 架构概览",
        "rel": "src-architecture-overview-zh",
        "sourceRel": "src/architecture-overview-zh.md"
      },
      {
        "title": "MineContext Architecture Overview",
        "rel": "src-architecture-overview",
        "sourceRel": "src/architecture-overview.md"
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
        "title": "CURSOR.md",
        "rel": "CURSOR",
        "sourceRel": "CURSOR.md"
      },
      {
        "title": "Qclaw（秋芝2046）",
        "rel": "docs-good-first-issues",
        "sourceRel": "docs/good-first-issues.md"
      },
      {
        "title": "Qclaw（秋芝2046）",
        "rel": "README.en",
        "sourceRel": "README.en.md"
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
        "title": "Introduction to Edge AI for Beginners",
        "rel": "introduction",
        "sourceRel": "introduction.md"
      },
      {
        "title": "Section 1: EdgeAI Fundamentals",
        "rel": "Module01-01.EdgeAIFundamentals",
        "sourceRel": "Module01/01.EdgeAIFundamentals.md"
      },
      {
        "title": "Section 2: Real-World Case Studies",
        "rel": "Module01-02.RealWorldCaseStudies",
        "sourceRel": "Module01/02.RealWorldCaseStudies.md"
      },
      {
        "title": "Section 3: Practical Implementation Guide",
        "rel": "Module01-03.PracticalImplementationGuide",
        "sourceRel": "Module01/03.PracticalImplementationGuide.md"
      },
      {
        "title": "Section 4: Edge AI Deployment Hardware Platforms",
        "rel": "Module01-04.EdgeDeployment",
        "sourceRel": "Module01/04.EdgeDeployment.md"
      },
      {
        "title": "Chapter 01: Transforming AI Deployment for the Edge",
        "rel": "Module01",
        "sourceRel": "Module01/README.md"
      },
      {
        "title": "Section 1: Microsoft Phi Model Family Fundamentals",
        "rel": "Module02-01.PhiFamily",
        "sourceRel": "Module02/01.PhiFamily.md"
      },
      {
        "title": "Section 2: Qwen Family Fundamentals",
        "rel": "Module02-02.QwenFamily",
        "sourceRel": "Module02/02.QwenFamily.md"
      },
      {
        "title": "Section 3: Gemma Family Fundamentals",
        "rel": "Module02-03.GemmaFamily",
        "sourceRel": "Module02/03.GemmaFamily.md"
      },
      {
        "title": "Section 4: BitNET Family Fundamentals",
        "rel": "Module02-04.BitNETFamily",
        "sourceRel": "Module02/04.BitNETFamily.md"
      },
      {
        "title": "Section 5: Microsoft Mu Model Fundamentals",
        "rel": "Module02-05.mumodel",
        "sourceRel": "Module02/05.mumodel.md"
      },
      {
        "title": "Section 6: Phi-Silica - Optimized On-Device Language Models",
        "rel": "Module02-06.phisilica",
        "sourceRel": "Module02/06.phisilica.md"
      },
      {
        "title": "Chapter 02: Small Language Model Foundations",
        "rel": "Module02",
        "sourceRel": "Module02/README.md"
      },
      {
        "title": "Section 1: SLM Advanced Learning - Foundations and Optimization",
        "rel": "Module03-01.SLMAdvancedLearning",
        "sourceRel": "Module03/01.SLMAdvancedLearning.md"
      },
      {
        "title": "Section 2: Local Environment Deployment - Privacy-First Solutions",
        "rel": "Module03-02.DeployingSLMinLocalEnv",
        "sourceRel": "Module03/02.DeployingSLMinLocalEnv.md"
      },
      {
        "title": "Containerized Cloud Deployment - Production-Scale Solutions",
        "rel": "Module03-03.DeployingSLMinCloud",
        "sourceRel": "Module03/03.DeployingSLMinCloud.md"
      },
      {
        "title": "Chapter 03: Deploying Small Language Models (SLMs)",
        "rel": "Module03",
        "sourceRel": "Module03/README.md"
      },
      {
        "title": "Section 1: Model Format Conversion and Quantization Foundations",
        "rel": "Module04-01.Introduce",
        "sourceRel": "Module04/01.Introduce.md"
      },
      {
        "title": "Section 2 : Llama.cpp Implementation Guide",
        "rel": "Module04-02.Llamacpp",
        "sourceRel": "Module04/02.Llamacpp.md"
      },
      {
        "title": "Section 3 : Microsoft Olive Optimization Suite",
        "rel": "Module04-03.MicrosoftOlive",
        "sourceRel": "Module04/03.MicrosoftOlive.md"
      },
      {
        "title": "Section 4 : OpenVINO Toolkit Optimization Suite",
        "rel": "Module04-04.openvino",
        "sourceRel": "Module04/04.openvino.md"
      },
      {
        "title": "Section 4 : Apple MLX Framework Deep Dive",
        "rel": "Module04-05.AppleMLX",
        "sourceRel": "Module04/05.AppleMLX.md"
      },
      {
        "title": "Section 6: Edge AI Development Workflow Synthesis",
        "rel": "Module04-06.workflow-synthesis",
        "sourceRel": "Module04/06.workflow-synthesis.md"
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
    "ported": true
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
    "ported": true
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
    "ported": true
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
    "ported": true
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
    "ported": true
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
