---
title: "Using Generative AI Responsibly"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/README.md"
zh: "on"
---

# Using Generative AI Responsibly

[![Using Generative AI Responsibly](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/03-using-generative-ai-responsibly/images/03-lesson-banner.png)](https://youtu.be/YOp-e1GjZdA?si=7Wv4wu3x44L1DCVj)

<div class="tb-zh"><p>本课视频封面（可点击跳转）：Using Generative AI Responsibly。</p></div>

> _Click the image above to view video of this lesson_

<div class="tb-zh"><p>点击上方图片即可观看本课视频。</p></div>

It's easy to be fascinated with AI and generative AI in particular, but you need to consider how you would use it responsibly. You need to consider things like how to ensure the output is fair, non-harmful and more. This chapter aims to provide you with the mentioned context, what to consider, and how to take active steps to improve your AI usage.

<div class="tb-zh"><p>人们很容易对 AI、尤其是生成式 AI 着迷，但你必须考虑如何负责任地使用它：输出是否公平、是否无害，等等。本章旨在提供这些背景，说明需要考虑什么，以及如何主动采取措施改进你的 AI 使用方式。</p></div>

## Introduction

This lesson will cover:

<div class="tb-zh"><p>本课内容包括：</p></div>

- Why you should prioritize Responsible AI when building Generative AI applications.
- Core principles of Responsible AI and how they relate to Generative AI.
- How to put these Responsible AI principles into practice through strategy and tooling.

<div class="tb-zh"><p>为什么在构建生成式 AI 应用时应把负责任 AI 放在优先位置；负责任 AI 的核心原则及其与生成式 AI 的关系；如何通过策略与工具把这些原则落到实处。</p></div>

## Learning Goals

After completing this lesson you will know:

<div class="tb-zh"><p>学完本课，你将了解：</p></div>

- The importance of Responsible AI when building Generative AI applications.
- When to think and apply the core principles of Responsible AI when building Generative AI applications.
- What tools and strategies are available to you to put the concept of Responsible AI into practice.

<div class="tb-zh"><p>构建生成式 AI 应用时负责任 AI 的重要性；在什么时机思考和运用负责任 AI 的核心原则；以及有哪些工具和策略可以把负责任 AI 落到实处。</p></div>

## Responsible AI Principles

The excitement of Generative AI has never been higher. This excitement has brought a lot of new developers, attention, and funding to this space. While this is very positive for anyone looking to build products and companies using Generative AI, it is also important we proceed responsibly.

<div class="tb-zh"><p>生成式 AI 的热度前所未有，也带来了大量新的开发者、关注与资金。这对想用生成式 AI 做产品和公司的人来说是好事，但我们同样必须负责任地推进。</p></div>

Throughout this course, we are focusing on building our startup and our AI education product. We’ll use the principles of Responsible AI: Fairness, Inclusiveness, Reliability/Safety, Security & Privacy, Transparency and Accountability. With these principles, we will explore how they relate to our use of Generative AI in our products.

<div class="tb-zh"><p>整套课程都围绕构建我们的初创公司和 AI 教育产品展开。我们会使用负责任 AI 的原则：公平（Fairness）、包容（Inclusiveness）、可靠/安全（Reliability/Safety）、安全与隐私（Security &amp; Privacy）、透明（Transparency）与问责（Accountability），并探讨它们与产品中使用生成式 AI 的关系。</p></div>

## Why Should You Prioritize Responsible AI

When building a product, taking a human-centric approach by keeping your user's best interest in mind leads to the best results.

<div class="tb-zh"><p>做产品时，以人为本、把用户的最佳利益放在心上，才能得到最好的结果。</p></div>

The uniqueness of Generative AI is its power to create helpful answers, information, guidance, and content for users. This can be done without many manual steps which can lead to very impressive results. Without proper planning and strategies, it can also unfortunately lead to some harmful results for your users, your product, and society as a whole.

<div class="tb-zh"><p>生成式 AI 的独特之处在于能为用户创造出有用的答案、信息、指引和内容，而且不需要多少手工步骤，效果常常令人惊叹。但如果没有恰当的规划与策略，它也可能给用户、产品乃至整个社会带来有害的结果。</p></div>

Let's look at some (but not all) of these potentially harmful results:

<div class="tb-zh"><p>来看其中一部分（并非全部）潜在的有害结果：</p></div>

### Hallucinations

Hallucinations are a term used to describe when an LLM produces content that is either completely nonsensical or something we know is factually wrong based on other sources of information.

<div class="tb-zh"><p>幻觉（hallucination）指的是 LLM 生成的内容完全说不通，或根据其他信息源可知与事实不符。</p></div>

Let's take for example we build a feature for our startup that allows students to ask historical questions to a model. A student asks the question `Who was the sole survivor of Titanic?`

<div class="tb-zh"><p>举个例子：我们为初创公司做一个功能，让学生向模型提历史问题。学生问：Who was the sole survivor of Titanic?（泰坦尼克号唯一的幸存者是谁？）</p></div>

The model produces a response such as the one below:

<div class="tb-zh"><p>模型给出的回答可能像下面这样：</p></div>

![Prompt saying "Who was the sole survivor of the Titanic"](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/03-using-generative-ai-responsibly/images/ChatGPT-titanic-survivor-prompt.webp)

> _(Source: [Flying bisons](https://flyingbisons.com?WT.mc_id=academic-105485-koreyst))_

<div class="tb-zh"><p>（来源：Flying bisons。）</p></div>

This is a very confident and thorough answer. Unfortunately, it is incorrect. Even with a minimal amount of research, one would discover there was more than one survivor of the Titanic disaster. For a student who is just starting to research this topic, this answer can be persuasive enough to not be questioned and treated as fact. The consequences of this can lead to the AI system being unreliable and negatively impact the reputation of our startup.

<div class="tb-zh"><p>这个回答非常自信、详尽，可惜是错的。哪怕只做一点点查证就会发现，泰坦尼克号事故的幸存者不止一人。对一个刚开始研究这个题目的学生来说，这样的回答足够有说服力，以至于不会去质疑，反而会把它当成事实。后果是 AI 系统显得不可靠，也会损害我们初创公司的声誉。</p></div>

With each iteration of any given LLM, we have seen performance improvements around minimizing hallucinations. Even with this improvement, we as application builders and users still need to remain aware of these limitations.

<div class="tb-zh"><p>随着每个 LLM 版本的迭代，减少幻觉方面的表现一直在进步。但即便有这些进步，作为应用开发者和用户，我们仍要清楚这些局限。</p></div>

### Harmful Content

We covered in the earlier section when an LLM produces incorrect or nonsensical responses. Another risk we need to be aware of is when a model responds with harmful content.

<div class="tb-zh"><p>前面讲的是 LLM 给出错误或荒谬回答的情况。另一个需要留意的风险，是模型输出有害内容。</p></div>

Harmful content can be defined as:

<div class="tb-zh"><p>有害内容可以定义为：</p></div>

- Providing instructions or encouraging self-harm or harm to certain groups.
- Hateful or demeaning content.
- Guiding the planning of any type of attack or violent acts.
- Providing instructions on how to find illegal content or commit illegal acts.
- Displaying sexually explicit content.

<div class="tb-zh"><p>提供或鼓励自我伤害或伤害特定群体的指引；仇恨或贬低性内容；指导策划任何形式的攻击或暴力行为；提供寻找非法内容或实施违法行为的说明；展示色情露骨内容。</p></div>

For our startup, we want to make sure we have the right tools and strategies in place to prevent this type of content from being seen by students.

<div class="tb-zh"><p>对我们的初创公司来说，必须确保配备合适的工具与策略，防止学生看到这类内容。</p></div>

### Lack of Fairness

Fairness is defined as “ensuring that an AI system is free from bias and discrimination and that they treat everyone fairly and equally.” In the world of Generative AI, we want to ensure that exclusionary worldviews of marginalized groups are not reinforced by the model’s output.

<div class="tb-zh"><p>公平（fairness）的定义是「确保 AI 系统没有偏见与歧视，公平、平等地对待每一个人」。在生成式 AI 的语境下，我们要确保模型的输出不会强化针对边缘群体的排他性世界观。</p></div>

These types of outputs are not only destructive to building positive product experiences for our users, but they also cause further societal harm. As application builders, we should always keep a wide and diverse user base in mind when building solutions with Generative AI.

<div class="tb-zh"><p>这类输出不仅会破坏我们为用户打造的正面产品体验，还会造成进一步的社会伤害。作为应用开发者，用生成式 AI 做方案时必须始终把广泛而多样的用户群体放在心上。</p></div>

## How to Use Generative AI Responsibly

Now that we have identified the importance of Responsible Generative AI, let's look at 4 steps we can take to build our AI solutions responsibly:

<div class="tb-zh"><p>认识到负责任生成式 AI 的重要性之后，来看看我们可采取的 4 个步骤，把 AI 方案做得负责任：</p></div>

![Mitigate Cycle](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/03-using-generative-ai-responsibly/images/mitigate-cycle.png)

### Measure Potential Harms

In software testing, we test the expected actions of a user on an application. Similarly, testing a diverse set of prompts users are most likely going to use is a good way to measure potential harm.

<div class="tb-zh"><p>软件测试中，我们会测试用户在应用上的预期操作；同理，测试一批用户最可能使用的多样化提示词，是衡量潜在伤害的好办法。</p></div>

Since our startup is building an education product, it would be good to prepare a list of education-related prompts. This could be to cover a certain subject, historical facts, and prompts about student life.

<div class="tb-zh"><p>由于我们的初创公司要做教育产品，最好准备一批教育相关的提示词，例如覆盖某个学科、历史事实，以及围绕学生生活的提问。</p></div>

### Mitigate Potential Harms

It is now time to find ways where we can prevent or limit the potential harm caused by the model and its responses. We can look at this in 4 different layers:

<div class="tb-zh"><p>接下来要找出办法，预防或限制模型及其回答可能造成的伤害。可以从 4 个层次来看：</p></div>

![Mitigation Layers](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/03-using-generative-ai-responsibly/images/mitigation-layers.png)

- **Model**. Choosing the right model for the right use case. Larger and more complex models like GPT-4 can cause more of a risk of harmful content when applied to smaller and more specific use cases. Using your training data to fine-tune also reduces the risk of harmful content.

<div class="tb-zh"><p>模型（Model）：为合适的场景选择合适的模型。像 GPT-4 这样更大、更复杂的模型用于更小、更具体的场景时，反而可能带来更高的有害内容风险。用你的训练数据做微调也能降低有害内容的风险。</p></div>

- **Safety System**. A safety system is a set of tools and configurations on the platform serving the model that help mitigate harm. An example of this is the content filtering system on the Azure OpenAI service. Systems should also detect jailbreak attacks and unwanted activity like requests from bots.

<div class="tb-zh"><p>安全系统（Safety System）：安全系统是模型服务平台上的成套工具与配置，用来帮助降低伤害，例如 Azure OpenAI 服务上的内容过滤系统。系统还应能检测越狱攻击（jailbreak）以及来自机器人的请求等非预期活动。</p></div>

- **Metaprompt**. Metaprompts and grounding are ways we can direct or limit the model based on certain behaviors and information. This could be using system inputs to define certain limits of the model. In addition, providing outputs that are more relevant to the scope or domain of the system.

<div class="tb-zh"><p>元提示（Metaprompt）：元提示与接地（grounding）让我们能够根据特定行为和信息去引导或限制模型。例如用 system 输入为模型设定某些边界；此外，还可以让输出更贴近系统的适用范围或领域。</p></div>

It can also be using techniques like Retrieval Augmented Generation (RAG) to have the model only pull information from a selection of trusted sources. There is a lesson later in this course for [building search applications](/lib/01-foundations/microsoft-generative-ai-for-beginners/08-building-search-applications-README)

<div class="tb-zh"><p>也可以使用检索增强生成（RAG）之类的技术，让模型只从一组可信来源中取信息。本课程后面有一课专门讲构建搜索应用。</p></div>

- **User Experience**. The final layer is where the user interacts directly with the model through our application’s interface in some way. In this way we can design the UI/UX to limit the user on the types of inputs they can send to the model as well as text or images displayed to the user. When deploying the AI application, we also must be transparent about what our Generative AI application can and can’t do.

<div class="tb-zh"><p>用户体验（User Experience）：最后一层是用户通过我们的应用界面直接与模型交互的地方。我们可以通过 UI/UX 设计限制用户能发给模型的输入类型，以及展示给用户的文本或图像。部署 AI 应用时，也必须坦率说明我们的生成式 AI 应用能做什么、不能做什么。</p></div>

We have an entire lesson dedicated to [Designing UX for AI Applications](/lib/01-foundations/microsoft-generative-ai-for-beginners/12-designing-ux-for-ai-applications-README)

<div class="tb-zh"><p>我们有一整课专门讲「为 AI 应用设计用户体验」。</p></div>

- **Evaluate model**. Working with LLMs can be challenging because we don’t always have control over the data the model was trained on. Regardless, we should always evaluate the model’s performance and outputs. It’s still important to measure the model’s accuracy, similarity, groundedness, and relevance of the output. This helps provide transparency and trust to stakeholders and users.

<div class="tb-zh"><p>评估模型（Evaluate model）：与 LLM 打交道有难度，因为我们无法完全掌控模型的训练数据。无论如何，都应该评估模型的表现与输出，衡量其准确性、相似度、有据可依程度（groundedness）以及相关性。这有助于向利益相关方和用户提供透明度与信任。</p></div>

### Operate a Responsible Generative AI solution

Building an operational practice around your AI applications is the final stage. This includes partnering with other parts of our startup like Legal and Security to ensure we are compliant with all regulatory policies. Before launching, we also want to build plans around delivery, handling incidents, and rollback to prevent any harm to our users from growing.

<div class="tb-zh"><p>最后一步是为 AI 应用建立运营实践，包括与法务、安全等部门合作，确保符合各项监管政策；上线前还要制定交付、事件响应与回滚计划，防止对用户的伤害扩大。</p></div>

## Tools

While the work of developing Responsible AI solutions may seem like a lot, it is work well worth the effort. As the area of Generative AI grows, more tooling to help developers efficiently integrate responsibility into their workflows will mature. For example, the [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview?WT.mc_id=academic-105485-koreyst) can help detect harmful content and images via an API request.

<div class="tb-zh"><p>开发负责任 AI 方案看起来工作量很大，但这份付出很值得。随着生成式 AI 领域的发展，帮助开发者把责任高效融入工作流的工具会越来越成熟。例如 Azure AI Content Safety 可以通过一次 API 请求帮助检测有害内容与图像。</p></div>

## Knowledge check

What are some things you need to care about to ensure responsible AI usage?

<div class="tb-zh"><p>要确保负责任地使用 AI，你需要关注哪些方面？</p></div>

1. That the answer is correct.
1. Harmful usage, that AI isn't used for criminal purposes.
1. Ensuring the AI is free from bias and discrimination.

<div class="tb-zh"><p>1. 答案是正确的。2. 防止有害使用，即 AI 不被用于犯罪目的。3. 确保 AI 没有偏见与歧视。</p></div>

A: 2 and 3 are correct. Responsible AI helps you consider how to mitigate harmful effects and biases and more.

<div class="tb-zh"><p>答案：2 和 3。负责任 AI 帮助你思考如何减轻有害影响、偏见等问题。</p></div>

## 🚀 Challenge

Read up on [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview?WT.mc_id=academic-105485-koreyst) and see what you can adopt for your usage.

<div class="tb-zh"><p>进一步了解 Azure AI Content Safety，看看有哪些可以用于你的场景。</p></div>

## Great Work, Continue Your Learning

After completing this lesson, check out our [Generative AI Learning collection](https://aka.ms/genai-collection?WT.mc_id=academic-105485-koreyst) to continue leveling up your Generative AI knowledge!

<div class="tb-zh"><p>学完本课，可以接着看生成式 AI 学习合集，继续提升你的生成式 AI 知识。</p></div>

Head over to Lesson 4 where we will look at [Prompt Engineering Fundamentals](/lib/01-foundations/microsoft-generative-ai-for-beginners/04-prompt-engineering-fundamentals-README)!

<div class="tb-zh"><p>下一课是第 4 课，我们将学习提示工程基础。</p></div>
