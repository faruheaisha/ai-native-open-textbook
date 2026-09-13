---
title: "Introduction to Generative AI and Large Language Models"
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

# Introduction to Generative AI and Large Language Models

[![Introduction to Generative AI and Large Language Models](/mirror/df/df3e5ff58e4f1e16263e54c37fb88423f14d71b2.png)](https://youtu.be/lFXQkBvEe0o?si=6ZBcQTwLJJDpnX0K)

<div class="tb-zh"><p>本课视频封面（可点击跳转）：Introduction to Generative AI and Large Language Models。</p></div>

_(Click the image above to view video of this lesson)_

<div class="tb-zh"><p>点击上方图片即可观看本课视频。</p></div>

Generative AI is artificial intelligence capable of generating text, images and other types of content. What makes it a fantastic technology is that it democratizes AI, anyone can use it with as little as a text prompt, a sentence written in a natural language. There's no need for you to learn a language like Java or SQL to accomplish something worthwhile, all you need is to use your language, state what you want and out comes a suggestion from an AI model. The applications and impact for this are huge, you write or understand reports, write applications and much more, all in seconds.

<div class="tb-zh"><p>生成式 AI（generative AI）是能够生成文本、图像及其他类型内容的人工智能。它真正了不起的地方在于把 AI 平民化：任何人都能用它，只要给出一条文本提示——一句用自然语言写下的话。你不必先学会 Java 或 SQL 才能做成一件有价值的事，只要用自己的语言说明想要什么，AI 模型就会给出建议。它的应用与影响极其广泛：撰写或理解报告、编写应用程序，等等，都在几秒内完成。</p></div>

In this curriculum, we’ll explore how our startup leverages generative AI to unlock new scenarios in the education world and how we address the inevitable challenges associated with the social implications of its application and the technology limitations.

<div class="tb-zh"><p>在本套课程中，我们会看看「我们的初创公司」如何借助生成式 AI 打开教育领域的新场景，以及如何应对随之而来的社会影响与技术局限方面的挑战。</p></div>

## Introduction

This lesson will cover:

<div class="tb-zh"><p>本课内容包括：</p></div>

- Introduction to the business scenario: our startup idea and mission.
- Generative AI and how we landed on the current technology landscape.
- Inner working of a large language model.
- Main capabilities and practical use cases of Large Language Models.

<div class="tb-zh"><p>商业场景介绍：我们的创业设想与使命；生成式 AI 以及我们如何走到今天的技术格局；大语言模型的内部工作原理；大语言模型的主要能力与实用场景。</p></div>

## Learning Goals

After completing this lesson, you will understand:

<div class="tb-zh"><p>学完本课，你将理解：</p></div>

- What generative AI is and how Large Language Models work.
- How you can leverage large language models for different use cases, with a focus on education scenarios.

<div class="tb-zh"><p>什么是生成式 AI、大语言模型如何工作；以及如何针对不同场景——尤其是教育场景——使用大语言模型。</p></div>

## Scenario: our educational startup

Generative Artificial Intelligence (AI) represents the pinnacle of AI technology, pushing the boundaries of what was once thought impossible. Generative AI models have several capabilities and applications, but for this curriculum we'll explore how it's revolutionizing education through a fictional startup. We'll refer to this startup as _our startup_. Our startup works in the education domain with the ambitious mission statement of

<div class="tb-zh"><p>生成式人工智能（AI）代表着 AI 技术的顶峰，把曾经被认为不可能的事情推到了边界之外。生成式 AI 模型有多种能力和应用，而在本套课程里，我们会通过一家虚构的初创公司来看它如何革新教育。这家公司下文称作「我们的初创公司」。它深耕教育领域，使命宣言相当宏大：</p></div>

> _improving accessibility in learning, on a global scale, ensuring equitable access to education and providing personalized learning experiences to every learner, according to their needs_.

<div class="tb-zh"><p>在全球范围内提升学习的可及性，保障教育机会的公平，并根据每位学习者的需求提供个性化学习体验。</p></div>

Our startup team is aware we’ll not be able to achieve this goal without leveraging one of the most powerful tools of modern times – Large Language Models (LLMs).

<div class="tb-zh"><p>我们的团队清楚，若不借助当代最强大的工具之一——大语言模型（LLM）——这个目标无法实现。</p></div>

Generative AI is expected to revolutionize the way we learn and teach today, with students having at their disposal virtual teachers 24 hours a day who provide vast amounts of information and examples, and teachers able to leverage innovative tools to assess their students and give feedback.

<div class="tb-zh"><p>生成式 AI 有望彻底改变今天的学习与教学方式：学生身边随时有一位 24 小时在线的虚拟老师，提供海量信息与示例；教师也能借助创新工具评估学生并给出反馈。</p></div>

![Five young students looking at a monitor - image by DALLE2](/mirror/1e/1e4888695e19e11bf2fa58f7ba7f4a0490ca995f.png)

To start, let’s define some basic concepts and terminology we’ll be using throughout the curriculum.

<div class="tb-zh"><p>先来定义几个贯穿整套课程的基本概念和术语。</p></div>

## How did we get Generative AI?

Despite the extraordinary _hype_ created lately by the announcement of generative AI models, this technology is decades in the making, with the first research efforts dating back to the 60s. We're now at a point with AI having human cognitive capabilities, like conversation as shown by for example [OpenAI ChatGPT](https://openai.com/chatgpt) or [Microsoft Copilot](https://copilot.microsoft.com/?WT.mc_id=academic-105485-koreyst), which also uses a GPT model for its conversational web search experience.

<div class="tb-zh"><p>尽管生成式 AI 模型近来的发布带来了空前的热度，这项技术其实已经酝酿了几十年，最早的研究可以追溯到 60 年代。如今 AI 已具备人类的认知能力，例如对话——OpenAI ChatGPT 或 Microsoft Copilot 就是例子，后者在其对话式网页搜索体验中也使用了 GPT 模型。</p></div>

Backing up a bit, the very first prototypes of AI consisted of typewritten chatbots, relying on a knowledge base extracted from a group of experts and represented into a computer. The answers in the knowledge base were triggered by keywords appearing in the input text.
However, it soon became clear that such an approach, using typewritten chatbots, did not scale well.

<div class="tb-zh"><p>再往前看，最早期的 AI 原型是打字式聊天机器人，它们依赖从专家群体中提取并录入计算机的知识库；知识库中的答案由输入文本里出现的关键词触发。但人们很快发现，这种打字式聊天机器人的做法难以规模化。</p></div>

### A statistical approach to AI: Machine Learning

A turning point arrived during the 90s, with the application of a statistical approach to text analysis. This led to the development of new algorithms – known as machine learning – capable of learning patterns from data without being explicitly programmed. This approach allows machines to simulate human language understanding: a statistical model is trained on text-label pairings, enabling the model to classify unknown input text with a pre-defined label representing the intention of the message.

<div class="tb-zh"><p>转折点出现在 90 年代，统计方法被应用于文本分析。由此发展出一批新算法——即机器学习（machine learning）——它们能从数据中学习模式，而不必被显式地编写规则。这一方法让机器得以模拟人类对语言的理解：在「文本—标签」配对上训练统计模型，模型就能为未知的输入文本分配一个预先定义的标签，用该标签表示消息的意图。</p></div>

### Neural networks and modern virtual assistants

In recent years, the technological evolution of hardware, capable of handling larger amounts of data and more complex computations, encouraged research in AI, leading to the development of advanced machine learning algorithms known as neural networks or deep learning algorithms.

<div class="tb-zh"><p>近几年，硬件的技术进步——能够处理更大的数据量与更复杂的计算——推动了 AI 研究，催生出被称为神经网络或深度学习的先进机器学习算法。</p></div>

Neural networks (and in particular Recurrent Neural Networks – RNNs) significantly enhanced natural language processing, enabling the representation of the meaning of text in a more meaningful way, valuing the context of a word in a sentence.

<div class="tb-zh"><p>神经网络（尤其是循环神经网络 RNN）显著提升了自然语言处理能力，使文本含义能以更有意义的方式被表示，并且重视词在句子中的上下文。</p></div>

This is the technology that powered the virtual assistants born in the first decade of the new century, very proficient in interpreting human language, identifying a need, and performing an action to satisfy it – like answering with a pre-defined script or consuming a 3rd party service.

<div class="tb-zh"><p>正是这项技术支撑了新世纪头十年诞生的虚拟助手：它们非常擅长解读人类语言、识别需求并执行动作来满足需求——比如按预设脚本作答，或调用第三方服务。</p></div>

### Present day, Generative AI

So that’s how we came to Generative AI today, which can be seen as a subset of deep learning.

<div class="tb-zh"><p>于是就走到今天生成式 AI 这一步，它可以看作是深度学习的一个子集。</p></div>

![AI, ML, DL and Generative AI](/mirror/b1/b1c16105266411cff42050aa296195eca19c63c4.png)

After decades of research in the AI field, a new model architecture – called _Transformer_ – overcame the limits of RNNs, being able to get much longer sequences of text as input. Transformers are based on the attention mechanism, enabling the model to give different weights to the inputs it receives, ‘paying more attention’ where the most relevant information is concentrated, regardless of their order in the text sequence.

<div class="tb-zh"><p>在 AI 领域数十年的研究之后，一种新的模型架构——Transformer——突破了 RNN 的局限，能够接收长得多的文本序列作为输入。Transformer 基于注意力机制（attention mechanism），使模型可以对收到的输入赋予不同权重，把「注意力」更多地放在信息最集中之处，而不论它们在文本序列中的先后顺序。</p></div>

Most of the recent generative AI models – also known as Large Language Models (LLMs), since they work with textual inputs and outputs – are indeed based on this architecture. What’s interesting about these models – trained on a huge amount of unlabeled data from diverse sources like books, articles and websites – is that they can be adapted to a wide variety of tasks and generate grammatically correct text with a semblance of creativity. So, not only did they incredibly enhance the capacity of a machine to ‘understand’ an input text, but they enabled their capacity to generate an original response in human language.

<div class="tb-zh"><p>近几年大多数生成式 AI 模型——由于处理文本输入输出，也被称为大语言模型（LLM）——正是基于这一架构。这类模型的有趣之处在于：它们在来自书籍、文章、网站等多样来源的海量无标注数据上训练，却能适配各种各样的任务，并生成语法正确、带几分创造力的文本。因此它们不仅极大提升了机器「理解」输入文本的能力，也获得了用人类语言生成原创回应的能力。</p></div>

## How do large language models work?

In the next chapter we are going to explore different types of Generative AI models, but for now let’s have a look at how large language models work, with a focus on OpenAI GPT (Generative Pre-trained Transformer) models.

<div class="tb-zh"><p>下一章我们会探讨不同类型的生成式 AI 模型；现在先看看大语言模型是如何工作的，重点是 OpenAI 的 GPT（Generative Pre-trained Transformer）模型。</p></div>

- **Tokenizer, text to numbers**: Large Language Models receive a text as input and generate a text as output. However, being statistical models, they work much better with numbers than text sequences. That’s why every input to the model is processed by a tokenizer, before being used by the core model. A token is a chunk of text – consisting of a variable number of characters, so the tokenizer's main task is splitting the input into an array of tokens. Then, each token is mapped with a token index, which is the integer encoding of the original text chunk.

<div class="tb-zh"><p>分词器（tokenizer）：把文本变成数字。大语言模型以文本为输入、以文本为输出，但作为统计模型，它们处理数字远好于处理文本序列。因此每个输入在进入核心模型之前，都会先经过分词器处理。token 是文本的一个片段，字符数可多可少；分词器的主要任务就是把输入切分成一个 token 数组。随后每个 token 会映射到一个 token 索引，也就是该文本片段的整数编码。</p></div>

![Example of tokenization](/mirror/3b/3b36eea62cb19851a4205e0a2d135f7d9f5011ac.png)

- **Predicting output tokens**: Given n tokens as input (with max n varying from one model to another), the model is able to predict one token as output. This token is then incorporated into the input of the next iteration, in an expanding window pattern, enabling a better user experience of getting one (or multiple) sentence as an answer. This explains why, if you ever played with ChatGPT, you might have noticed that sometimes it looks like it stops in the middle of a sentence.

<div class="tb-zh"><p>预测输出 token：给定 n 个 token 作为输入（最大 n 因模型而异），模型能够预测出作为输出的一个 token。这个 token 会被并入下一轮的输入，形成不断扩大的窗口，让用户逐步拿到一句或几句回答，获得更好的体验。这也解释了为什么玩过 ChatGPT 的人有时会觉得它话说到一半突然停住。</p></div>

- **Selection process, probability distribution**: The output token is chosen by the model according to its probability of occurring after the current text sequence. This is because the model predicts a probability distribution over all possible ‘next tokens’, calculated based on its training. However, not always is the token with the highest probability chosen from the resulting distribution. A degree of randomness is added to this choice, in a way that the model acts in a non-deterministic fashion - we do not get the exact same output for the same input. This degree of randomness is added to simulate the process of creative thinking and it can be tuned using a model parameter called temperature.

<div class="tb-zh"><p>选择过程与概率分布：输出 token 由模型根据它在当前文本序列之后出现的概率来挑选。模型会基于训练，预测所有可能「下一个 token」的概率分布；但最终选中的并不总是概率最高的那个。选择过程中加入了随机性，使模型表现为非确定性的——同样的输入不会得到完全相同的输出。这种随机性用来模拟创造性思考，并可通过一个叫 temperature 的模型参数来调节。</p></div>

## How can our startup leverage Large Language Models?

Now that we have a better understanding of the inner working of a large language model, let’s see some practical examples of the most common tasks they can perform pretty well, with an eye to our business scenario.
We said that the main capability of a Large Language Model is _generating a text from scratch, starting from a textual input, written in natural language_.

<div class="tb-zh"><p>弄清了大语言模型的内部机制，接下来看看它最擅长的一些常见任务的实际例子，并结合我们的商业场景。前面说过，大语言模型的核心能力是：从一段用自然语言写成的文本输入出发，从零生成文本。</p></div>

But what kind of textual input and output?
The input of a large language model is known as a prompt, while the output is known as a completion, term that refers to the model mechanism of generating the next token to complete the current input. We are going to dive deep into what is a prompt and how to design it in a way to get the most out of our model. But for now, let’s just say that a prompt may include:

<div class="tb-zh"><p>那么，都是什么样的输入和输出？大语言模型的输入叫作 prompt（提示词），输出叫作 completion（补全）——这个说法指的是模型通过生成下一个 token 来补全当前输入的机制。提示词本身是什么、如何设计才能榨出模型的最大能力，后面会深入讲；这里先说明提示词可以包含：</p></div>

- An **instruction** specifying the type of output we expect from the model. This instruction sometimes might embed some examples or some additional data.

<div class="tb-zh"><p>一条 instruction（指令），用来指定我们期望模型给出什么类型的输出；指令里有时还会附带若干示例或额外数据。</p></div>

  1. Summarization of an article, book, product reviews and more, along with extraction of insights from unstructured data.

<div class="tb-zh"><p>1. 对文章、书籍、产品评论等做摘要，并从非结构化数据中提取要点。</p></div>

    ![Example of summarization](/mirror/19/19745eaf2e55498bec11bcf60dcc736bbf012053.png)

  2. Creative ideation and design of an article, an essay, an assignment or more.

<div class="tb-zh"><p>2. 为文章、论文、作业等做创意构思与设计。</p></div>

     ![Example of creative writing](/mirror/af/afc25e30e90a75c3137b86a592c04b2865980d7c.png)

- A **question**, asked in the form of a conversation with an agent.

<div class="tb-zh"><p>一个 question（问题），以与智能体对话的形式提出。</p></div>

  ![Example of conversation](/mirror/14/146f47d10ab34a9481fcb03614f630154ce7e8fc.png)

- A chunk of **text to complete**, which implicitly is an ask for writing assistance.

<div class="tb-zh"><p>一段待补全的 text（文本），隐含的请求是写作协助。</p></div>

  ![Example of text completion](/mirror/90/90b283a9ae83179843cb891a39db0682bb6f12c8.png)

- A chunk of **code** together with the ask of explaining and documenting it, or a comment asking to generate a piece of code performing a specific task.

<div class="tb-zh"><p>一段代码，并要求解释和补充文档；或者一条注释，要求生成完成某个特定任务的代码。</p></div>

  ![Coding example](/mirror/a1/a1576deb4eebf37d3fce01c5eeea63bb7d620aaf.png)

The examples above are quite simple and are not intended to be an exhaustive demonstration of Large Language Models' capabilities. They are meant to show the potential of using generative AI, in particular but not limited to educational contexts.

<div class="tb-zh"><p>上面的例子都很简单，并非要穷举大语言模型的能力，只是想展示使用生成式 AI 的潜力，尤其是在教育场景中（但不限于此）。</p></div>

Also, the output of a generative AI model is not perfect and sometimes the creativity of the model can work against it, resulting in an output which is a combination of words that the human user can interpret as a mystification of reality, or it can be offensive. Generative AI is not intelligent - at least in the more comprehensive definition of intelligence, including critical and creative reasoning or emotional intelligence; it is not deterministic, and it is not trustworthy, since fabrications, such as erroneous references, content, and statements, may be combined with correct information, and presented in a persuasive and confident manner. In the following lessons, we’ll be dealing with all these limitations and we’ll see what we can do to mitigate them.

<div class="tb-zh"><p>另外，生成式 AI 模型的输出并不完美，有时它的「创造力」反而帮倒忙：输出的词句组合会被人解读为对现实的歪曲，也可能带有冒犯性。生成式 AI 并不智能——至少按更完整的智能定义（包含批判性与创造性推理、情绪智力）来说是这样；它既不是确定性的，也不可信：虚构内容（如错误的引用、内容与陈述）可能与正确信息混在一起，并以有说服力、自信的口吻呈现。后面的课程会处理这些局限，并讨论可以采取哪些缓解措施。</p></div>

## Assignment

Your assignment is to read up more on [generative AI](https://en.wikipedia.org/wiki/Generative_artificial_intelligence?WT.mc_id=academic-105485-koreyst) and try to identify an area where you would add generative AI today that doesn't have it. How would the impact be different from doing it the "old way", can you do something you couldn't before, or are you faster? Write a 300 word summary on what your dream AI startup would look like and include headers like "Problem", "How I would use AI", "Impact" and optionally a business plan.

<div class="tb-zh"><p>作业：进一步阅读关于生成式 AI 的资料，并找出一处你今天就会想引入生成式 AI、但目前还没有的地方。这种影响与「老办法」相比有何不同？你能做到以前做不到的事，还是只是更快？写一篇 300 字的总结，描述你理想中的 AI 初创公司，包含「Problem（问题）」「How I would use AI（我会怎么用 AI）」「Impact（影响）」这样的小标题，也可以附上一份商业计划。</p></div>

If you did this task, you might even be ready to apply to Microsoft's incubator, [Microsoft for Startups Founders Hub](https://www.microsoft.com/startups?WT.mc_id=academic-105485-koreyst) we offer credits for both Azure, OpenAI, mentoring and much more, check it out!

<div class="tb-zh"><p>如果完成了这个任务，你甚至可能已经具备申请微软孵化器 Microsoft for Startups Founders Hub 的准备：我们提供 Azure、OpenAI 额度以及导师辅导等等，不妨看看。</p></div>

## Knowledge check

What's true about large language models?

<div class="tb-zh"><p>关于大语言模型，下面哪种说法是正确的？</p></div>

1. You get the exact same response every time.
1. It does things perfectly, great at adding numbers, produce working code etc.
1. The response may vary despite using the same prompt. It's also great at giving you a first draft of something, be it text or code. But you need to improve on the results.

<div class="tb-zh"><p>1. 每次都会得到完全相同的回答。2. 它做事完美无缺，尤其擅长做加法、写出能用的代码等。3. 即使使用同样的提示词，回答也可能不同。它很擅长给出初稿——无论是文字还是代码——但结果需要你继续打磨。</p></div>

A: 3, an LLM is non-deterministic, the response varies, however, you can control its variance via a temperature setting. You also shouldn't expect it to do things perfectly, it's here to do the heavy-lifting for you which often means you get a good first attempt at something that you need to gradually improve.

<div class="tb-zh"><p>答案：3。LLM 是非确定性的，回答会变化，不过你可以通过 temperature 设置控制其波动幅度。也不该指望它把事情做得完美：它的作用是为你先扛下繁重的初稿工作，通常意味着你拿到一个不错的起点，然后逐步改进。</p></div>

## Great Work! Continue the Journey

After completing this lesson, check out our [Generative AI Learning collection](https://aka.ms/genai-collection?WT.mc_id=academic-105485-koreyst) to continue leveling up your Generative AI knowledge!

<div class="tb-zh"><p>学完本课，可以接着看生成式 AI 学习合集，继续提升你的生成式 AI 知识。</p></div>

Head over to Lesson 2 where we will look at how to [explore and compare different LLM types](/lib/01-foundations/microsoft-generative-ai-for-beginners/02-exploring-and-comparing-different-llms)!

<div class="tb-zh"><p>下一课是第 2 课，我们将探讨如何探索并比较不同的 LLM 类型。</p></div>
