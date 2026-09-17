---
title: "Prompt Engineering Guide"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/README.md"
sourceRel: "README.md"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/README.md"
sourceSha256: "5c1f0fcf7bdd37761249708969b17923a0995e4734ca5ab3713e1acb4d6f6ad9"
pageSha256: "5c1f0fcf7bdd37761249708969b17923a0995e4734ca5ab3713e1acb4d6f6ad9"
contentMode: "local-full"
zh: "on"
---

# Prompt Engineering Guide

<h5 align="center">
  Sponsored by&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://serpapi.com/"><img src="https://cdn.rawgit.com/standard/standard/master/docs/logos/serpapi.png" height=35 valign="middle"></a>
</h5>

Prompt engineering is a relatively new discipline for developing and optimizing prompts to efficiently use language models (LMs) for a wide variety of applications and research topics. Prompt engineering skills help to better understand the capabilities and limitations of large language models (LLMs). Researchers use prompt engineering to improve the capacity of LLMs on a wide range of common and complex tasks such as question answering and arithmetic reasoning. Developers use prompt engineering to design robust and effective prompting techniques that interface with LLMs and other tools.

<div class="tb-zh"><p>提示词工程是一门相对较新的学科，研究如何开发并优化提示词，以便在各种应用和研究课题中高效使用语言模型（LM）。提示词工程技能有助于更好地理解大语言模型（LLM）的能力与局限。研究者用提示词工程提升 LLM 在问答、算术推理等各类常见与复杂任务上的表现；开发者用它设计稳健、有效的提示技术，让 LLM 与其他工具顺畅对接。</p></div>

Motivated by the high interest in developing with LLMs, we have created this new prompt engineering guide that contains all the latest papers, learning guides, lectures, references, and tools related to prompt engineering for LLMs.

<div class="tb-zh"><p>出于大家对 LLM 开发的高度兴趣，我们编写了这份新的提示词工程指南，收录了与 LLM 提示词工程相关的全部最新论文、学习指南、讲座、参考资料与工具。</p></div>

🌐 [Prompt Engineering Guide (Web Version)](https://www.promptingguide.ai/)

<div class="tb-zh"><p>🌐 提示词工程指南（网页版）</p></div>

🎉 We are excited to launch our new prompt engineering, RAG, and AI Agents courses under the DAIR.AI Academy. [Join Now](https://academy.dair.ai/pricing)!

<div class="tb-zh"><p>🎉 我们很高兴在 DAIR.AI Academy 下推出新的提示词工程、RAG 和 AI Agents 课程。立即加入！</p></div>

The courses are meant to compliment this guide and provide a more hands-on approach to learning about prompt engineering, context engineering, and AI Agents. 

<div class="tb-zh"><p>这些课程旨在与这份指南互补，用更偏动手的方式学习提示词工程、上下文工程和 AI Agents。</p></div>

Use code PROMPTING20 to get an extra 20% off.

<div class="tb-zh"><p>使用优惠码 PROMPTING20 可额外享受 20% 折扣。</p></div>

Happy Prompting!

<div class="tb-zh"><p>祝你提示愉快！</p></div>

---

## Announcements / Updates

- 🎓 We now offer self-paced prompt engineering courses under our DAIR.AI Academy. [Join Now](https://academy.dair.ai/pricing)! 
- 🎓 New course on Prompt Engineering for LLMs announced! [Enroll here](https://academy.dair.ai/courses/introduction-prompt-engineering)!
- 💼 We now offer several [services](https://www.promptingguide.ai/services) like corporate training, consulting, and talks.
- 🌐 We now support 13 languages! Welcoming more translations.
- 👩‍🎓 We crossed 3 million learners in January 2024!
- 🎉 We have launched a new web version of the guide [here](https://www.promptingguide.ai/)
- 🔥 We reached #1 on Hacker News on 21 Feb 2023
- 🎉 The First Prompt Engineering Lecture went live [here](https://youtu.be/dOxUroR57xs)

<div class="tb-zh"><p>🎓 我们现在在 DAIR.AI Academy 提供可自定进度的提示词工程课程，立即加入！🎓 面向 LLM 的提示词工程新课程已发布，点此报名！💼 我们现提供企业培训、咨询和演讲等服务。🌐 我们现在支持 13 种语言，欢迎更多翻译。👩‍🎓 2024 年 1 月我们的学习者突破 300 万！🎉 我们上线了指南的新网页版。🔥 2023 年 2 月 21 日我们登上 Hacker News 第一。🎉 首场提示词工程讲座已上线。</p></div>

[Join our Discord](https://discord.gg/YbMT8k6GfX)

<div class="tb-zh"><p>加入我们的 Discord</p></div>

[Follow us on Twitter](https://twitter.com/dair_ai)

<div class="tb-zh"><p>在 Twitter 上关注我们</p></div>

[Subscribe to our YouTube](https://www.youtube.com/channel/UCyna_OxOWL7IEuOwb7WhmxQ)

<div class="tb-zh"><p>订阅我们的 YouTube</p></div>

[Subscribe to our Newsletter](https://nlpnews.substack.com/)

<div class="tb-zh"><p>订阅我们的通讯</p></div>

---

## Guides
You can also find the most up-to-date guides on our new website [https://www.promptingguide.ai/](https://www.promptingguide.ai/).

- [Prompt Engineering - Introduction](https://www.promptingguide.ai/introduction)
  - [Prompt Engineering - LLM Settings](https://www.promptingguide.ai/introduction/settings)
  - [Prompt Engineering - Basics of Prompting](https://www.promptingguide.ai/introduction/basics)
  - [Prompt Engineering - Prompt Elements](https://www.promptingguide.ai/introduction/elements)
  - [Prompt Engineering - General Tips for Designing Prompts](https://www.promptingguide.ai/introduction/tips)
  - [Prompt Engineering - Examples of Prompts](https://www.promptingguide.ai/introduction/examples)
- [Prompt Engineering - Techniques](https://www.promptingguide.ai/techniques)
  - [Prompt Engineering - Zero-Shot Prompting](https://www.promptingguide.ai/techniques/zeroshot)
  - [Prompt Engineering - Few-Shot Prompting](https://www.promptingguide.ai/techniques/fewshot)
  - [Prompt Engineering - Chain-of-Thought Prompting](https://www.promptingguide.ai/techniques/cot)
  - [Prompt Engineering - Self-Consistency](https://www.promptingguide.ai/techniques/consistency)
  - [Prompt Engineering - Generate Knowledge Prompting](https://www.promptingguide.ai/techniques/knowledge)
  - [Prompt Engineering - Prompt Chaining](https://www.promptingguide.ai/techniques/prompt_chaining)
  - [Prompt Engineering - Tree of Thoughts (ToT)](https://www.promptingguide.ai/techniques/tot)
  - [Prompt Engineering - Retrieval Augmented Generation](https://www.promptingguide.ai/techniques/rag)
  - [Prompt Engineering - Automatic Reasoning and Tool-use (ART)](https://www.promptingguide.ai/techniques/art)
  - [Prompt Engineering - Automatic Prompt Engineer](https://www.promptingguide.ai/techniques/ape)
  - [Prompt Engineering - Active-Prompt](https://www.promptingguide.ai/techniques/activeprompt)
  - [Prompt Engineering - Directional Stimulus Prompting](https://www.promptingguide.ai/techniques/dsp)
  - [Prompt Engineering - Program-Aided Language Models](https://www.promptingguide.ai/techniques/pal)
  - [Prompt Engineering - ReAct Prompting](https://www.promptingguide.ai/techniques/react)
  - [Prompt Engineering - Multimodal CoT Prompting](https://www.promptingguide.ai/techniques/multimodalcot)
  - [Prompt Engineering - Graph Prompting](https://www.promptingguide.ai/techniques/graph)
- [Prompt Engineering - Applications](https://www.promptingguide.ai/applications)
  - [Prompt Engineering - Function Calling](https://www.promptingguide.ai/applications/function_calling)
  - [Prompt Engineering - Generating Data](https://www.promptingguide.ai/applications/generating)
  - [Prompt Engineering - Generating Synthetic Dataset for RAG](https://www.promptingguide.ai/applications/synthetic_rag)
  - [Prompt Engineering - Takling Generated Datasets Diversity](https://www.promptingguide.ai/applications/generating_textbooks)
  - [Prompt Engineering - Generating Code](https://www.promptingguide.ai/applications/coding)
  - [Prompt Engineering - Graduate Job Classification Case Study](https://www.promptingguide.ai/applications/workplace_casestudy)
- [Prompt Engineering - Prompt Hub](https://www.promptingguide.ai/prompts)
  - [Prompt Engineering - Classification](https://www.promptingguide.ai/prompts/classification)
  - [Prompt Engineering - Coding](https://www.promptingguide.ai/prompts/coding)
  - [Prompt Engineering - Creativity](https://www.promptingguide.ai/prompts/creativity)
  - [Prompt Engineering - Evaluation](https://www.promptingguide.ai/prompts/evaluation)
  - [Prompt Engineering - Information Extraction](https://www.promptingguide.ai/prompts/information-extraction)
  - [Prompt Engineering - Image Generation](https://www.promptingguide.ai/prompts/image-generation)
  - [Prompt Engineering - Mathematics](https://www.promptingguide.ai/prompts/mathematics)
  - [Prompt Engineering - Question Answering](https://www.promptingguide.ai/prompts/question-answering)
  - [Prompt Engineering - Reasoning](https://www.promptingguide.ai/prompts/reasoning)
  - [Prompt Engineering - Text Summarization](https://www.promptingguide.ai/prompts/text-summarization)
  - [Prompt Engineering - Truthfulness](https://www.promptingguide.ai/prompts/truthfulness)
  - [Prompt Engineering - Adversarial Prompting](https://www.promptingguide.ai/prompts/adversarial-prompting)
- [Prompt Engineering - Models](https://www.promptingguide.ai/models)
  - [Prompt Engineering - ChatGPT](https://www.promptingguide.ai/models/chatgpt)
  - [Prompt Engineering - Code Llama](https://www.promptingguide.ai/models/code-llama)
  - [Prompt Engineering - Flan](https://www.promptingguide.ai/models/flan)
  - [Prompt Engineering - Gemini](https://www.promptingguide.ai/models/gemini)
  - [Prompt Engineering - GPT-4](https://www.promptingguide.ai/models/gpt-4)
  - [Prompt Engineering - LLaMA](https://www.promptingguide.ai/models/llama)
  - [Prompt Engineering - Mistral 7B](https://www.promptingguide.ai/models/mistral-7b)
  - [Prompt Engineering - Mixtral](https://www.promptingguide.ai/models/mixtral)
  - [Prompt Engineering - OLMo](https://www.promptingguide.ai/models/olmo)
  - [Prompt Engineering - Phi-2](https://www.promptingguide.ai/models/phi-2)
  - [Prompt Engineering - Model Collection](https://www.promptingguide.ai/models/collection)
- [Prompt Engineering - Risks and Misuses](https://www.promptingguide.ai/risks)
  - [Prompt Engineering - Adversarial Prompting](https://www.promptingguide.ai/risks/adversarial)
  - [Prompt Engineering - Factuality](https://www.promptingguide.ai/risks/factuality)
  - [Prompt Engineering - Biases](https://www.promptingguide.ai/risks/biases)
- [Prompt Engineering - Papers](https://www.promptingguide.ai/papers)
  - [Prompt Engineering - Overviews](https://www.promptingguide.ai/papers#overviews)
  - [Prompt Engineering - Approaches](https://www.promptingguide.ai/papers#approaches)
  - [Prompt Engineering - Applications](https://www.promptingguide.ai/papers#applications)
  - [Prompt Engineering - Collections](https://www.promptingguide.ai/papers#collections)
- [Prompt Engineering - Tools](https://www.promptingguide.ai/tools)
- [Prompt Engineering - Notebooks](https://www.promptingguide.ai/notebooks)
- [Prompt Engineering - Datasets](https://www.promptingguide.ai/datasets)
- [Prompt Engineering - Additional Readings](https://www.promptingguide.ai/readings)

<div class="tb-zh"><p>提示词工程——导论：LLM 设置；提示词基础；提示词要素；设计提示词的通用技巧；提示词示例。提示词工程——技术：零样本提示；少样本提示；思维链提示；自洽性；生成知识提示；提示链；思维树（ToT）；检索增强生成；自动推理与工具使用（ART）；自动提示工程师；主动提示；方向性刺激提示；程序辅助语言模型；ReAct 提示；多模态 CoT 提示；图提示。提示词工程——应用：函数调用；生成数据；为 RAG 生成合成数据集；应对生成数据集的多样性；生成代码；毕业生岗位分类案例研究。提示词工程——提示词库：分类；编程；创造力；评估；信息抽取；图像生成；数学；问答；推理；文本摘要；真实性；对抗性提示。提示词工程——模型：ChatGPT；Code Llama；Flan；Gemini；GPT-4；LLaMA；Mistral 7B；Mixtral；OLMo；Phi-2；模型合集。提示词工程——风险与误用：对抗性提示；事实性；偏见。提示词工程——论文：综述；方法；应用；合集。提示词工程——工具；提示词工程——notebook；提示词工程——数据集；提示词工程——延伸阅读。</p></div>

---

## Lecture

We have published a 1 hour lecture that provides a comprehensive overview of prompting techniques, applications, and tools.
- [Video Lecture](https://youtu.be/dOxUroR57xs)
- [Notebook with code](https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/notebooks/pe-lecture.ipynb)
- [Slides](https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/lecture/Prompt-Engineering-Lecture-Elvis.pdf)

<div class="tb-zh"><p>我们发布了一场 1 小时的讲座，全面概览提示技术、应用与工具。视频讲座；带代码的 notebook；幻灯片。</p></div>

---

## Running the guide locally

To run the guide locally, for example to check the correct implementation of a new translation, you will need to:

<div class="tb-zh"><p>如果想在本地运行这份指南——例如核对某个新翻译的正确实现——你需要：</p></div>

1. Install Node >=18.0.0
1. Install `pnpm` if not present in your system. Check [here](https://pnpm.io/installation) for detailed instructions.
1. Install the dependencies: `pnpm i next react react-dom nextra nextra-theme-docs`
1. Boot the guide with `pnpm dev`
2. Browse the guide at `http://localhost:3000/`

<div class="tb-zh"><p>1）安装 Node &gt;=18.0.0；2）如果系统里没有 pnpm，先安装它，详细说明见 pnpm 官网；3）安装依赖：pnpm i next react react-dom nextra nextra-theme-docs；4）用 pnpm dev 启动指南；5）在 http://localhost:3000/ 浏览指南。</p></div>

---

## Appearances
Some places where we have been featured:
- Wall Street Journal - [ChatGPT Can Give Great Answers. But Only If You Know How to Ask the Right Question](https://www.wsj.com/articles/chatgpt-ask-the-right-question-12d0f035)
- Forbes - [Mom, Dad, I Want To Be A Prompt Engineer](https://www.forbes.com/sites/craigsmith/2023/04/05/mom-dad-i-want-to-be-a-prompt-engineer/?sh=7f1213159c8e)
- Markettechpost - [Best Free Prompt Engineering Resources (2023)](https://www.marktechpost.com/2023/04/04/best-free-prompt-engineering-resources-2023/)

---
If you are using the guide for your work or research, please cite us as follows:

<div class="tb-zh"><p>如果你在工作中或研究中使用了这份指南，请按以下方式引用我们：</p></div>

```
@article{Saravia_Prompt_Engineering_Guide_2022,
author = {Saravia, Elvis},
journal = {https://github.com/dair-ai/Prompt-Engineering-Guide},
month = {12},
title = {{Prompt Engineering Guide}},
year = {2022}
}
```
