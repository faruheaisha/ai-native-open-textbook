---
title: "AI Engineering Lab: Glossary"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/GLOSSARY.md"
sourceRel: "reference/GLOSSARY.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/GLOSSARY.md"
sourceSha256: "f4ae0a1a0e307b3b4c49c76fe5c2153c0ecec2a990957e252d180247de2783af"
pageSha256: "f4ae0a1a0e307b3b4c49c76fe5c2153c0ecec2a990957e252d180247de2783af"
contentMode: "local-full"
zh: "on"
---

# AI Engineering Lab: Glossary

> Every technical term in the program, in plain language. Terms are grouped by theme
> and ordered for reading; within each group, earlier terms build on later ones'
> prerequisites. Each entry ends with where the program teaches it in depth.
>
> **How to use this file:** don't read it cover to cover. When a week uses a word you
> don't know, jump to it (your editor's search is your friend), read the one-paragraph
> definition, and get back to work.

<div class="tb-zh"><p>课程里每一个技术术语，都用平实的语言解释。术语按主题分组、并按阅读顺序排列；在同一组内，前面的术语会用到后面术语的前提。每条结尾都标明课程在哪里深入讲它。 怎么用这份文件：不要从头读到尾。当某一周用到一个你不认识的词，直接跳过去（用编辑器的搜索就行），读完那段定义，然后回去继续干活。</p></div>

**Part of AI Engineering Lab · Developed by [Zorost Intelligence AI Lab](https://zorost.com) · zorost.com**

<div class="tb-zh"><p>AI Engineering Lab 的一部分 · 由 Zorost Intelligence AI Lab 开发 · zorost.com</p></div>

---

## Foundations: software & data

**API (Application Programming Interface)**: A way for one program to ask another
program to do something and get an answer back, over a fixed contract. When you "call
a model," your code is making an API request. *Week 1; KB-01.*

<div class="tb-zh"><p>API（应用程序接口）：一个程序请另一个程序做事并拿到结果的方式，基于一份固定的约定。当你「调用模型」时，你的代码就是在发一个 API 请求。第 1 周；KB-01。</p></div>

**CLI (Command-Line Interface)**: A program you drive by typing commands into a
terminal instead of clicking buttons. Most AI engineering tools (git, Ollama, Claude
Code) are CLIs. *Week 1.*

<div class="tb-zh"><p>CLI（命令行界面）：通过在终端里输入命令来操作、而不是点按钮的程序。大多数 AI 工程工具（git、Ollama、Claude Code）都是 CLI。第 1 周。</p></div>

**Git / GitHub**: Git is version control: it records every change to your files so
you can undo, compare, and collaborate. GitHub is a website that hosts git
repositories so others can see and copy them. This program lives on GitHub. *Week 1.*

<div class="tb-zh"><p>Git / GitHub：Git 是版本控制，它记录你文件的每一次改动，好让你可以撤销、对比和协作。GitHub 是一个托管 git 仓库的网站，让别人能看到并复制它们。本课程就放在 GitHub 上。第 1 周。</p></div>

**IDE (Integrated Development Environment)**: A code editor with extras: file
browser, terminal, debugger, and extensions in one window. The program uses VS Code;
Cursor is an AI-native IDE. *Week 1; skills/cursor.*

<div class="tb-zh"><p>IDE（集成开发环境）：带附加功能的代码编辑器——文件浏览器、终端、调试器和扩展都在同一个窗口里。本课程使用 VS Code；Cursor 是一个 AI 原生的 IDE。第 1 周；skills/cursor。</p></div>

**Jupyter / notebook**: An interactive document that mixes code cells, their output,
and written explanation. The program's hands-on work all happens in notebooks (`.ipynb`
files) so you can run one cell at a time and see what happened. *Week 1.*

<div class="tb-zh"><p>Jupyter / notebook：一种交互式文档，把代码单元格、它们的输出和文字说明混在一起。本课程的动手工作全都在 notebook（.ipynb 文件）里完成，这样你可以一次跑一个单元格、马上看到发生了什么。第 1 周。</p></div>

**Library / package**: Pre-written code you import instead of writing from scratch.
`pandas` is a data library; `torch` is a deep-learning library. *Week 1.*

<div class="tb-zh"><p>库 / 包：别人预先写好的代码，你直接 import 而不是从零写。pandas 是数据处理库，torch 是深度学习库。第 1 周。</p></div>

**Python**: The programming language of AI engineering, chosen for its readable
syntax and unmatched ecosystem of AI/data libraries. Taught from zero in Week 1.

<div class="tb-zh"><p>Python：AI 工程使用的编程语言，因为它语法可读、且拥有无可比拟的 AI 与数据生态。第 1 周从零教起。</p></div>

**Repository ("repo")**: A folder of code tracked by git. This program is a
repository. *Week 1.*

<div class="tb-zh"><p>仓库（repo）：一个由 git 跟踪的代码文件夹。本课程就是一个仓库。第 1 周。</p></div>

**SQL (Structured Query Language)**: The language for asking questions of tabular
databases: `SELECT column FROM table WHERE condition`. AI engineering runs on data,
and data still speaks SQL. *Week 2; KB-02.*

<div class="tb-zh"><p>SQL（结构化查询语言）：用来向表格式数据库提问的语言：SELECT column FROM table WHERE condition。AI 工程建立在数据之上，而数据至今仍然说 SQL。第 2 周；KB-02。</p></div>

**Terminal / shell**: The text window where you type commands directly to the
operating system (Terminal on macOS, PowerShell/Windows Terminal on Windows). *Week 1.*

<div class="tb-zh"><p>终端 / shell：直接向操作系统输入命令的文本窗口（macOS 上是 Terminal，Windows 上是 PowerShell 或 Windows Terminal）。第 1 周。</p></div>

**Virtual environment**: An isolated folder of Python packages for one project, so
one project's library versions can't break another's. You make one in Week 1 and never
think about it again. *Week 1.*

<div class="tb-zh"><p>虚拟环境：为某个项目单独隔离出来的一个 Python 包文件夹，这样一个项目的库版本不会搞坏另一个项目。你在第 1 周建好它，之后就不用再管了。第 1 周。</p></div>

## Machine learning & deep learning

**Model**: A file of learned numbers (parameters) plus the code shape that uses them.
Given input, it produces output: an ETA, a category, or the next token. *Week 3.*

<div class="tb-zh"><p>模型：一个装着学到的数字（参数）的文件，加上使用这些参数的代码形态。给定输入，它产出输出：一个预计到达时间、一个类别，或者下一个 token。第 3 周。</p></div>

**Training**: The process where a model's parameters are automatically adjusted to
reduce its error on example data. Training is expensive; using a trained model
(inference) is cheap. *Week 3 to 4; KB-02.*

<div class="tb-zh"><p>训练：自动调整模型参数、以降低它在样例数据上误差的过程。训练很贵；使用一个已训练好的模型（推理）很便宜。第 3 到 4 周；KB-02。</p></div>

**Inference**: Using a trained model to make predictions on new input. Most of AI
engineering is inference-side: prompting, serving, evaluating. *Week 3; KB-02.*

<div class="tb-zh"><p>推理：用训练好的模型对新输入做预测。AI 工程的大部分工作都在推理这一侧：写提示词、部署服务、评测。第 3 周；KB-02。</p></div>

**Feature**: An input variable you hand to a model: distance, carrier, day of week.
**Feature engineering** is crafting inputs the model can actually learn from. *Week 3;
Week 23.*

<div class="tb-zh"><p>特征：你交给模型的一个输入变量：距离、承运商、星期几。特征工程就是精心构造出模型真正能学得动的输入。第 3 周；第 23 周。</p></div>

**Label / target**: The answer column in training data: the actual ETA, the true
on-time flag. Models learn by comparing predictions to labels. *Week 3.*

<div class="tb-zh"><p>标签 / 目标：训练数据里的答案列：实际的到达时间、真实的准时与否。模型通过把预测与标签做对比来学习。第 3 周。</p></div>

**Regression vs. classification**: Regression predicts a number (ETA in hours);
classification predicts a category (on-time vs. delayed). Week 3 builds one of each.

<div class="tb-zh"><p>回归与分类：回归预测一个数值（以小时计的到达时间）；分类预测一个类别（准时还是延误）。第 3 周会各做一个。</p></div>

**Train/test split**: Holding out data the model never saw during training, to
measure how it performs on *new* cases, the only performance that matters. *Week 3.*

<div class="tb-zh"><p>训练/测试集划分：留出一部分模型在训练中从未见过的数据，用来衡量它在新样本上的表现——这是唯一真正重要的表现。第 3 周。</p></div>

**Overfitting**: When a model memorizes the training data's noise and performs worse
on new data. The central failure mode of ML; the test split is how you detect it.
*Week 3 to 4; KB-02.*

<div class="tb-zh"><p>过拟合：模型把训练数据里的噪声也背下来了，于是在新数据上表现更差。这是机器学习的核心失效模式；测试集就是发现它的办法。第 3 到 4 周；KB-02。</p></div>

**Neural network**: A model made of layers of simple units that multiply inputs by
learned weights and pass them through a non-linearity. Depth (many layers) lets it
learn complex patterns. *Week 4.*

<div class="tb-zh"><p>神经网络：一种由多层简单单元构成的模型，这些单元把输入乘以学到的权重，再经过一个非线性变换。深度（多层堆叠）让它能学到复杂模式。第 4 周。</p></div>

**PyTorch**: The dominant open-source deep-learning framework. Week 4 builds a small
neural network in it so the "deep learning" in every LLM stops being magic. *Week 4.*

<div class="tb-zh"><p>PyTorch：主流的开源深度学习框架。第 4 周会用它搭一个小神经网络，让每个 LLM 里的「深度学习」不再显得神秘。第 4 周。</p></div>

**Autograd / gradient descent**: The math that makes training work: compute how each
parameter contributed to the error (gradients), then nudge every parameter downhill.
PyTorch's autograd does the calculus for you. *Week 4; KB-02.*

<div class="tb-zh"><p>自动微分 / 梯度下降：让训练跑起来的数学：先算出每个参数对误差的贡献（梯度），再让每个参数往低处挪一点。PyTorch 的 autograd 替你完成微积分。第 4 周；KB-02。</p></div>

**Embedding**: A dense vector of numbers representing meaning, so similar things land
near each other in vector space. Used inside LLMs and, separately, to power semantic
search. *Week 5; KB-03.*

<div class="tb-zh"><p>嵌入（embedding）：一个表示语义的稠密数值向量，让相似的东西在向量空间里彼此靠近。它既用在 LLM 内部，也单独用来支撑语义检索。第 5 周；KB-03。</p></div>

## LLM core

**LLM (Large Language Model)**: A very large neural network trained to predict the
next token in text. That single capability, scaled, produces summarization, extraction,
reasoning, and dialogue. *Week 5; KB-03.*

<div class="tb-zh"><p>LLM（大语言模型）：一个规模极大的神经网络，训练目标是预测文本中的下一个 token。就是这一项能力在规模放大后，产生了摘要、抽取、推理和对话。第 5 周；KB-03。</p></div>

**Token**: The chunk of text a model actually reads, roughly ¾ of an English word.
Costs, context limits, and speed are all measured in tokens. *Week 5; KB-03.*

<div class="tb-zh"><p>Token：模型实际读取的文本片段，大约相当于四分之三个英文单词。成本、上下文上限和速度都以 token 计量。第 5 周；KB-03。</p></div>

**Tokenizer**: The component that cuts text into tokens and maps each to an integer
ID. Different models tokenize differently, so always measure with the actual model's
tokenizer. *Week 5.*

<div class="tb-zh"><p>分词器：把文本切成 token 并把每个 token 映射为整数 ID 的组件。不同模型的分词方式不同，所以始终要用真实模型的分词器来测量。第 5 周。</p></div>

**Transformer**: The neural architecture behind every modern LLM: a stack of blocks,
each mixing self-attention (tokens gathering information from each other) with a small
feed-forward network. *Week 5; KB-03.*

<div class="tb-zh"><p>Transformer：所有现代 LLM 背后的神经网络架构：一叠同样的块，每块把自注意力（token 之间互相收集信息）与一个小型前馈网络混合起来。第 5 周；KB-03。</p></div>

**Attention / self-attention**: The mechanism that lets each token weigh which other
tokens matter to it ("it" in a sentence attending back to its noun). The Q·K·V
projection dance is explained visually in Week 5. *Week 5; KB-03.*

<div class="tb-zh"><p>注意力 / 自注意力：让每个 token 衡量其他哪些 token 对自己重要的机制（句子里的「它」会回头关注它所指的名词）。Q·K·V 投影这套动作在第 5 周有可视化讲解。第 5 周；KB-03。</p></div>

**Context window**: The maximum number of tokens a model can consider at once: your
instructions, the conversation, retrieved documents, and the model's own output all
compete for it. Managing it is *context engineering*. *Week 6; KB-04.*

<div class="tb-zh"><p>上下文窗口：模型一次能考虑的最大 token 数：你的指令、对话、检索到的文档，以及模型自己的输出，都要争抢这个空间。管理它就是上下文工程。第 6 周；KB-04。</p></div>

**KV cache**: A serving optimization that stores each token's key/value vectors so
the model doesn't recompute attention for the whole prompt on every generated token.
Why the first token is slow and the rest stream fast. *Week 5; KB-03.*

<div class="tb-zh"><p>KV 缓存：一种服务端的优化，把每个 token 的 key/value 向量存起来，这样模型在生成每一个新 token 时不必为整个提示词重算注意力。这就是为什么第一个 token 慢、后面会流式地快。第 5 周；KB-03。</p></div>

**Temperature**: A sampling dial: low temperature makes output more predictable
(pick the most likely token); high temperature makes it more varied. Extraction tasks
run near zero. *Week 5 to 6.*

<div class="tb-zh"><p>温度（temperature）：一个采样旋钮：温度低会让输出更可预测（挑最可能的 token）；温度高会让输出更多样。抽取类任务通常设在接近零。第 5 到 6 周。</p></div>

**Hallucination**: When a model states something false with full confidence, because
its job is producing plausible text, not verified fact. The engineering answers are
retrieval (give it the facts), structured output, and evals. *Week 6 to 7; KB-03.*

<div class="tb-zh"><p>幻觉：模型信誓旦旦地说出错误内容，因为它的本职是生成看起来合理的文本，而不是经过核实的事实。工程上的应对是检索（把事实喂给它）、结构化输出和评测。第 6 到 7 周；KB-03。</p></div>

**Prompt**: Everything you put in front of the model: system instructions, examples,
the user's request, retrieved evidence. *Week 6.*

<div class="tb-zh"><p>提示词：你放在模型面前的一切：系统指令、示例、用户的请求、检索到的证据。第 6 周。</p></div>

**System prompt**: The standing instructions sent with every request: role, policy,
output format, guardrails. It is a policy layer, not a security layer. *Week 6; KB-04.*

<div class="tb-zh"><p>系统提示词：随每个请求一起发送的常设指令：角色、策略、输出格式、护栏。它是一层策略，不是一层安全防护。第 6 周；KB-04。</p></div>

**Few-shot prompting**: Including 1 to 3 worked input→output examples in the prompt so
the model copies the *pattern*. One good example beats three mediocre ones. *Week 6.*

<div class="tb-zh"><p>少样本提示（few-shot）：在提示词里放进 1 到 3 个完整的输入→输出示例，让模型照着模仿这个模式。一个好例子胜过三个平庸的例子。第 6 周。</p></div>

**Chain-of-thought**: Asking the model to reason step by step before answering.
Helps multi-step problems; costs tokens on every call. *Week 6; KB-04.*

<div class="tb-zh"><p>思维链：让模型先一步步推理再回答。对多步问题有帮助；每次调用都会多花 token。第 6 周；KB-04。</p></div>

**Structured output**: Constraining the model's answer to a schema (usually JSON) so
code, not a human, can consume it. Remember: a schema constrains shape, never truth.
*Week 6; KB-04.*

<div class="tb-zh"><p>结构化输出：把模型的回答约束到一个 schema（通常是 JSON），好让代码而不是人来消费它。记住：schema 只能约束形状，永远不能约束真假。第 6 周；KB-04。</p></div>

**Prompt injection**: An attack where instructions hidden in *content the system
reads* (a web page, a document field) hijack the model. OWASP's #1 LLM risk; defenses
live outside the prompt. *Week 6; KB-04.*

<div class="tb-zh"><p>提示词注入：一种攻击：藏在系统所读内容（一个网页、某个文档字段）里的指令劫持了模型。这是 OWASP 列出的头号 LLM 风险；防御手段在提示词之外。第 6 周；KB-04。</p></div>

**Prompt caching**: A provider feature that reuses the processed prefix of repeated
requests, cutting cost and latency when your system prompt and context are stable.
*Week 6; KB-04.*

<div class="tb-zh"><p>提示词缓存：某些供应商提供的能力，把重复请求中已处理过的前缀复用起来，当你的系统提示词和上下文稳定时，能显著降低成本和延迟。第 6 周；KB-04。</p></div>

**RAG (Retrieval-Augmented Generation)**: Retrieve relevant documents, put them in
the context window, and ask the model to answer *from them*, with citations. The
default cure for hallucination and stale knowledge. *Week 7; KB-05.*

<div class="tb-zh"><p>RAG（检索增强生成）：检索出相关文档，放进上下文窗口，再让模型根据它们作答、并给出来源引用。这是应对幻觉和知识过时的默认解法。第 7 周；KB-05。</p></div>

**Vector database**: A database that stores embedding vectors and finds the nearest
neighbors to a query vector fast. The retrieval half of RAG. *Week 7; KB-05.*

<div class="tb-zh"><p>向量数据库：存储嵌入向量，并能快速找出与查询向量最近邻的数据库。它是 RAG 中「检索」的那一半。第 7 周；KB-05。</p></div>

**Chunking**: Splitting documents into pieces small enough to embed and retrieve
usefully. Chunk size and overlap are among the highest-leverage RAG decisions. *Week 7.*

<div class="tb-zh"><p>分块（chunking）：把文档切成立即能被有效嵌入和检索的小块。块大小和重叠度是 RAG 里影响最大的决定之一。第 7 周。</p></div>

**Reranking**: A second-pass model that re-orders the vector search's top candidates
by true relevance. Cheap accuracy for RAG pipelines. *Week 7; KB-05.*

<div class="tb-zh"><p>重排序（reranking）：用一个二次处理的模型，按真实相关性重新排列向量检索的前几名候选。为 RAG 流水线以很低成本换到准确率。第 7 周；KB-05。</p></div>

**Knowledge graph**: Data stored as entities and relationships (shipment, *carried_by*→
carrier), enabling multi-hop questions vector search can't answer. Week 7 builds one.

<div class="tb-zh"><p>知识图谱：以实体和关系的形式存储数据（shipment ——carried_by→ carrier），从而支持向量检索答不了的多跳问题。第 7 周会构建一个。</p></div>

## Model engineering

**Open-weight model**: A model whose parameter files you can download and run
yourself (Llama, Qwen, Mistral, DeepSeek…). "Open source" in common speech, though
licenses vary. *Week 8; KB-06.*

<div class="tb-zh"><p>开放权重模型：参数文件可以下载、自行运行的模型（Llama、Qwen、Mistral、DeepSeek……）。俗称「开源」，不过各家的许可证并不一样。第 8 周；KB-06。</p></div>

**Foundation model**: A large model trained on broad data that you adapt to tasks,
by prompting, RAG, or fine-tuning, rather than training from scratch. *Week 8; KB-06.*

<div class="tb-zh"><p>基础模型：在广泛数据上训练出来的大型模型，你通过提示、RAG 或微调把它适配到具体任务，而不是从零训练。第 8 周；KB-06。</p></div>

**Ollama / llama.cpp / MLX**: The three local-inference stacks the program uses:
Ollama for convenience, llama.cpp for control and GGUF, MLX for Apple Silicon. *Week 8;
skills/ollama-llamacpp; KB-08.*

<div class="tb-zh"><p>Ollama / llama.cpp / MLX：本课程使用的三套本地推理栈：Ollama 图方便，llama.cpp 图可控和 GGUF，MLX 面向 Apple Silicon。第 8 周；skills/ollama-llamacpp；KB-08。</p></div>

**GGUF**: The file format llama.cpp uses for quantized models, one file you can
download and run anywhere. *Week 8 to 9.*

<div class="tb-zh"><p>GGUF：llama.cpp 用于量化模型的文件格式，一个文件下载下来就能在任何地方运行。第 8 到 9 周。</p></div>

**Quantization**: Storing model weights at lower precision (16-bit → 8/6/5/4-bit) to
shrink memory and speed up inference, at a small quality cost. Q4_K_M is the classic
sweet spot. *Week 9; KB-06.*

<div class="tb-zh"><p>量化：用更低的精度（16 位 → 8/6/5/4 位）存储模型权重，以缩小内存占用、加快推理，代价是少量质量损失。Q4_K_M 是经典的最佳平衡点。第 9 周；KB-06。</p></div>

**VRAM**: GPU memory. The hard wall for local models: the model's weights, the KV
cache, and the runtime must all fit. Week 8 to 9 teach you to size it before downloading.

<div class="tb-zh"><p>VRAM：显存。本地模型的硬墙：模型的权重、KV 缓存和运行时必须全部装得下。第 8 到 9 周会教你在下载之前先算清楚需要多大。</p></div>

**vLLM**: A high-throughput open-source serving engine for LLMs (paged attention,
continuous batching). What you graduate to when one user becomes fifty. *Week 9; KB-08.*

<div class="tb-zh"><p>vLLM：面向 LLM 的高吞吐开源服务引擎（分页注意力、连续批处理）。当你的用户从一个变成五十个时，就该升级到它。第 9 周；KB-08。</p></div>

**Fine-tuning**: Continuing a model's training on your data to change its behavior:
tone, format, domain vocabulary. *Week 10; KB-06.*

<div class="tb-zh"><p>微调：在你自己数据上继续训练模型，以改变它的行为：语气、格式、领域词汇。第 10 周；KB-06。</p></div>

**SFT (Supervised Fine-Tuning)**: Fine-tuning on input→ideal-output examples. The
first rung of behavior change. *Week 10.*

<div class="tb-zh"><p>SFT（监督微调）：用「输入→理想输出」的样例做微调。这是改变行为的第一级台阶。第 10 周。</p></div>

**LoRA (Low-Rank Adaptation)**: Fine-tuning a small set of added matrices instead of
all parameters: cheap, fast, and the resulting "adapter" file is tiny. *Week 10; KB-06.*

<div class="tb-zh"><p>LoRA（低秩适配）：只微调一小批额外加进去的矩阵，而不是全部参数：便宜、快，产出的「适配器」文件很小。第 10 周；KB-06。</p></div>

**DPO (Direct Preference Optimization)**: Training on pairs of "better vs. worse"
answers to align behavior with preferences, without a separate reward model. *Week 10.*

<div class="tb-zh"><p>DPO（直接偏好优化）：用「较好 vs. 较差」成对的回答来训练，让行为对齐偏好，而不需要单独训练一个奖励模型。第 10 周。</p></div>

**Distillation**: Training a small model to imitate a big model's outputs, trading
capability for speed and cost. *KB-06.*

<div class="tb-zh"><p>蒸馏：训练一个小模型去模仿大模型的输出，用能力换取速度和成本。KB-06。</p></div>

**Eval (evaluation)**: A repeatable measurement of a model or system's quality on a
fixed set of cases, producing a *score*. The discipline that separates AI engineers
from demo builders. *Week 11; KB-07.*

<div class="tb-zh"><p>Eval（评测）：在固定的一组用例上，对模型或系统的质量做可重复的测量，产出一个分数。正是这门功夫把 AI 工程师和「只能做演示的人」区分开。第 11 周；KB-07。</p></div>

**Golden set**: The curated set of inputs with known-good answers that an eval scores
against. Fix the golden set before touching the prompt. *Week 6, 11.*

<div class="tb-zh"><p>黄金集：一份经过挑选的输入集合，配有已知的正确回答，评测就以它为基准打分。在动提示词之前，先把黄金集定下来。第 6、11 周。</p></div>

**LLM-as-judge**: Using a strong model to grade another system's outputs against a
rubric, when correctness is fuzzy (summaries, answers). Cheap and scalable, but must be
calibrated against human grades. *Week 11; KB-07.*

<div class="tb-zh"><p>LLM 当裁判：在正确性比较模糊的场景（摘要、回答）里，用一个强模型按评分细则给另一个系统的输出打分。便宜且可扩展，但必须用人工评分做校准。第 11 周；KB-07。</p></div>

**Error analysis**: Reading real failures by hand, clustering them into categories,
and fixing the largest category first. The highest-ROI habit in the program. *Week 11;
KB-07.*

<div class="tb-zh"><p>误差分析：人工阅读真实失败案例，把它们归成类别，先修最大的那一类。本课程中回报率最高的习惯。第 11 周；KB-07。</p></div>

## Harnesses, loops & agents

**Harness (coding-agent harness)**: The software wrapper that lets an LLM act on your
computer: read files, run commands, edit code, with permissions, rules files, and
context management around it. Claude Code, Cursor, OpenCode, and the DeepSeek Harness
are the four the program compares. *Week 12; KB-09; reference/skills*

<div class="tb-zh"><p>Harness（编程 agent 的 harness）：让 LLM 能在你电脑上行动的那层软件外壳：读文件、跑命令、改代码，并且围绕它配有权限、规则文件和上下文管理。Claude Code、Cursor、OpenCode 和 DeepSeek Harness 是本课程对比的四种。第 12 周；KB-09；reference/skills。</p></div>

**Rules file**: The persistent instruction file a harness reads every session
(`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`): project conventions, commands, and
boundaries. *Week 12; reference/skills*

<div class="tb-zh"><p>规则文件：harness 每次会话都会读取的常驻指令文件（CLAUDE.md、AGENTS.md、.cursor/rules）：项目约定、命令和边界。第 12 周；reference/skills。</p></div>

**Subagent**: A spawned helper agent with its own context window, given a narrow job
(research, review) so the main agent's window stays clean. *Week 12; KB-09.*

<div class="tb-zh"><p>子代理：被派生出来的助手 agent，拥有自己的上下文窗口，被赋予一件很窄的工作（调研、评审），好让主 agent 的上下文保持干净。第 12 周；KB-09。</p></div>

**Verifier**: Anything that checks the agent's work automatically: tests, linters,
type checks, evals. Closing the loop means the agent runs its verifier itself. *Week 13.*

<div class="tb-zh"><p>验证器：任何能自动检查 agent 工作的东西：测试、linter、类型检查、评测。闭环的意思就是让 agent 自己跑它的验证器。第 13 周。</p></div>

**Spec-driven development**: Writing the specification first and steering the agent
to it, so quality is judged against an explicit contract instead of vibes. *Week 13;
KB-01.*

<div class="tb-zh"><p>规格驱动开发：先写规格，再让 agent 照着规格做，这样质量是拿一份明确的契约来衡量，而不是凭感觉。第 13 周；KB-01。</p></div>

**Agent**: A model in a loop with tools: observe → think → act → observe…, until done
or stopped. Agents handle tasks where the steps aren't known in advance. *Week 14;
KB-10.*

<div class="tb-zh"><p>Agent：一个在循环里带工具运行的模型：观察 → 思考 → 行动 → 再观察……直到完成或被停下。Agent 处理那些步骤事先未知的任务。第 14 周；KB-10。</p></div>

**ReAct**: The foundational agent pattern: interleave *reasoning* ("what should I do
next?") with *actions* (tool calls) in one loop. Week 14 builds one from scratch.

<div class="tb-zh"><p>ReAct：最基础的 agent 模式：把推理（「下一步该做什么？」）与行动（工具调用）交错在同一个循环里。第 14 周从零构建一个。</p></div>

**Tool (function calling)**: A function the model can ask the harness to run:
`track_shipment(id)`. The model emits structured intent; your code executes it and
returns the result. *Week 14; KB-10.*

<div class="tb-zh"><p>工具（函数调用）：模型可以请求 harness 去运行的函数：track_shipment(id)。模型输出结构化的意图，你的代码执行它并返回结果。第 14 周；KB-10。</p></div>

**Guardrails**: The hard limits around an agent: max steps, cost caps, refusal rules,
human approval for irreversible actions. *Week 14; KB-10.*

<div class="tb-zh"><p>护栏：围绕 agent 的硬性限制：最大步数、成本上限、拒答规则、不可逆操作需要人工批准。第 14 周；KB-10。</p></div>

**Trace / observability**: A recorded log of every step an agent took, prompts, tool
calls, outputs, costs, so failures are debuggable and evaluable. *Week 17; KB-07, KB-10.*

<div class="tb-zh"><p>Trace / 可观测性：把 agent 走过的每一步都记录下来，提示词、工具调用、输出、成本——这样失败才可调试、可评测。第 17 周；KB-07、KB-10。</p></div>

**LangGraph**: A framework that models agents as explicit state graphs: nodes (steps),
edges (transitions), checkpoints (resumability). *Week 15; KB-10.*

<div class="tb-zh"><p>LangGraph：一个把 agent 建模为显式状态图的框架：节点（步骤）、边（转移）、检查点（可恢复）。第 15 周；KB-10。</p></div>

**Multi-agent system**: Splitting work across specialized agents (router, tracker,
refunds) coordinated by an orchestrator. A measured trade, not a default. *Week 16;
KB-10.*

<div class="tb-zh"><p>多 agent 系统：把工作拆给多个专职 agent（路由、追踪、退款），由编排者协调。这是一次经过权衡的取舍，不是默认选项。第 16 周；KB-10。</p></div>

**MCP (Model Context Protocol)**: An open standard for exposing tools and data to AI
agents: one server, many compatible clients. Week 16 builds an MCP server for
ZoroLogistics. *Week 16; KB-11.*

<div class="tb-zh"><p>MCP（Model Context Protocol）：一个把工具和数据暴露给 AI agent 的开放标准：一个服务器，多种兼容的客户端。第 16 周会为 ZoroLogistics 构建一个 MCP 服务器。第 16 周；KB-11。</p></div>

**A2A (Agent-to-Agent)**: Google's protocol for agents delegating tasks to other
agents across boundaries; complements MCP's agent-to-tools focus. *KB-11.*

<div class="tb-zh"><p>A2A（Agent-to-Agent）：Google 提出的协议，让 agent 跨边界把任务委派给其他 agent；与 MCP 侧重「agent 到工具」形成互补。KB-11。</p></div>

**OpenClaw**: An open-source personal-agent framework the program uses in Week 17 to
run a 24/7 assistant wired into the Week-16 MCP server. *Week 17; agents/openclaw.*

<div class="tb-zh"><p>OpenClaw：一个开源的个人 agent 框架，第 17 周用它跑一个 7×24 的助手，并接上第 16 周做的 MCP 服务器。第 17 周；agents/openclaw。</p></div>

**Router / OpenRouter**: A service that fronts hundreds of models behind one API key,
so you can swap models, compare cost/quality, and use `:free` variants. *Week 12;
skills/openrouter.*

<div class="tb-zh"><p>路由器 / OpenRouter：用一个 API key 把几百个模型摆在身后的服务，让你可以随意换模型、比较成本与质量，还能用 :free 变体。第 12 周；skills/openrouter。</p></div>

## Cloud platforms & Databricks

**Azure AI Foundry**: Microsoft's platform for building, evaluating, and deploying AI
apps and agents, with a model catalog and enterprise governance. *Week 18; KB-12.*

<div class="tb-zh"><p>Azure AI Foundry：微软用于构建、评测和部署 AI 应用与 agent 的平台，带有模型目录和企业级治理。第 18 周；KB-12。</p></div>

**Google Vertex AI**: Google Cloud's ML/GenAI platform: Gemini models, Agent Builder,
evaluation services, and MLOps. *Week 19; KB-12.*

<div class="tb-zh"><p>Google Vertex AI：Google Cloud 的机器学习/生成式 AI 平台：Gemini 模型、Agent Builder、评测服务和 MLOps。第 19 周；KB-12。</p></div>

**AWS Bedrock**: Amazon's managed service offering foundation models (Claude, Llama,
Nova…) via one API, plus Knowledge Bases, Agents, and Guardrails. *Week 20; KB-12.*

<div class="tb-zh"><p>AWS Bedrock：亚马逊的托管服务，通过一个 API 提供基础模型（Claude、Llama、Nova……），另有 Knowledge Bases、Agents 和 Guardrails。第 20 周；KB-12。</p></div>

**Serverless endpoint**: Model hosting where you pay per request and never manage
servers; the opposite of provisioning a GPU instance yourself. *Week 18 to 20.*

<div class="tb-zh"><p>无服务器端点：按请求付费、完全不用自己管服务器的模型托管方式；与你自己开通一台 GPU 实例正好相反。第 18 到 20 周。</p></div>

**Lakehouse**: A data platform combining a data lake's cheap open storage with a data
warehouse's reliability and SQL performance. Databricks' core idea. *Week 21; KB-13.*

<div class="tb-zh"><p>湖仓（Lakehouse）：把数据湖廉价的开放存储与数据仓库的可靠性和 SQL 性能结合在一起的数据平台。Databricks 的核心主张。第 21 周；KB-13。</p></div>

**Delta Lake**: The open storage layer (tables on object storage with ACID
transactions, time travel, schema enforcement) under the lakehouse. *Week 21.*

<div class="tb-zh"><p>Delta Lake：湖仓之下的开放存储层（对象存储上的表，具备 ACID 事务、时间旅行、schema 强制）。第 21 周。</p></div>

**Unity Catalog**: Databricks' governance layer: one place for data, model, and
permission management with lineage. *Week 21; platforms/databricks/01.*

<div class="tb-zh"><p>Unity Catalog：Databricks 的治理层：数据、模型和权限管理集中在一处，并带血缘。第 21 周；platforms/databricks/01。</p></div>

**Medallion architecture**: Organizing data in bronze (raw) → silver (cleaned) →
gold (business-ready) tables. *Week 21 to 22.*

<div class="tb-zh"><p>Medallion 架构：把数据组织成 bronze（原始）→ silver（清洗后）→ gold（可供业务使用）三层表。第 21 到 22 周。</p></div>

**PySpark**: The Python API for Apache Spark, the distributed compute engine that
processes data across a cluster. *Week 22.*

<div class="tb-zh"><p>PySpark：Apache Spark 的 Python API，这个分布式计算引擎能在集群上处理数据。第 22 周。</p></div>

**Lakeflow (DLT & Jobs)**: Databricks' declarative pipeline and orchestration
tooling: declare the tables; it handles dependencies, retries, and monitoring.
*Week 22.*

<div class="tb-zh"><p>Lakeflow（DLT 与 Jobs）：Databricks 的声明式流水线与编排工具：你只声明表，依赖、重试和监控它来管。第 22 周。</p></div>

**MLflow**: The open-source experiment-tracking and model-registry system: every
training run logged with parameters, metrics, and artifacts. *Week 23.*

<div class="tb-zh"><p>MLflow：开源的实验跟踪与模型注册系统：每次训练都记下参数、指标和产物。第 23 周。</p></div>

**Feature store**: A governed home for computed features so training and serving use
identical definitions. *Week 23.*

<div class="tb-zh"><p>特征存储：特征经过治理的统一存放处，让训练和线上服务使用完全一致的定义。第 23 周。</p></div>

**Model serving**: Putting a model behind an endpoint that applications call.
Databricks Model Serving, Foundry endpoints, and Vertex endpoints are the managed
versions. *Week 23; KB-12.*

<div class="tb-zh"><p>模型服务：把模型放在一个端点后面，供应用调用。Databricks Model Serving、Foundry 端点和 Vertex 端点是其托管版本。第 23 周；KB-12。</p></div>

**Vector Search / AI Search**: Databricks' managed vector database for RAG,
governed by Unity Catalog. *Week 23.*

<div class="tb-zh"><p>Vector Search / AI Search：Databricks 面向 RAG 的托管向量数据库，由 Unity Catalog 治理。第 23 周。</p></div>

**Genie**: Databricks' natural-language interface over governed data: ask in English,
get a governed SQL answer. *Week 23.*

<div class="tb-zh"><p>Genie：Databricks 在受治理数据之上的自然语言界面：用英文提问，得到受治理的 SQL 回答。第 23 周。</p></div>

**Agent Bricks**: Databricks' tooling for building and evaluating agents on platform
data. *Week 23 to 24.*

<div class="tb-zh"><p>Agent Bricks：Databricks 用于在平台数据上构建和评测 agent 的工具。第 23 到 24 周。</p></div>

**DABs (Databricks Asset Bundles)**: Infrastructure-as-code for Databricks: the whole
project, jobs, pipelines, endpoints, declared in YAML and deployed with one command.
*Week 24.*

<div class="tb-zh"><p>DABs（Databricks Asset Bundles）：Databricks 的基础设施即代码：整个项目——作业、流水线、端点——都用 YAML 声明，一条命令完成部署。第 24 周。</p></div>

**CI/CD (Continuous Integration / Continuous Deployment)**: Automatically testing and
deploying code on every change, so production is never a manual leap of faith. *Week 24.*

<div class="tb-zh"><p>CI/CD（持续集成 / 持续交付）：每次改动都自动测试并部署代码，让上线永远不是一次靠人赌运气的跳跃。第 24 周。</p></div>

**FinOps**: The discipline of measuring and controlling cloud/AI spend: budgets,
alerts, cost-per-query dashboards. *Week 24; platforms/databricks/17.*

<div class="tb-zh"><p>FinOps：衡量并控制云与 AI 支出的功夫：预算、告警、每次查询成本的看板。第 24 周；platforms/databricks/17。</p></div>

**Governance**: The controls that make data and AI usable *safely* at scale:
permissions, lineage, audit, quality rules. The thread that runs through Week 21 to 24.

<div class="tb-zh"><p>治理：让数据和 AI 能在规模上被安全使用的那些控制手段：权限、血缘、审计、质量规则。这是贯穿第 21 到 24 周的一条主线。</p></div>

---

*Missing a term? That's a bug, open an issue or add it (see
[`.github/CONTRIBUTING.md`](https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/.github/CONTRIBUTING.md)).*

<div class="tb-zh"><p>少了某个术语？那是个 bug——去开一个 issue，或者把它加上（见 .github/CONTRIBUTING.md）。</p></div>

© 2026 Zorost Intelligence LLC · [zorost.com](https://zorost.com)

<div class="tb-zh"><p>© 2026 Zorost Intelligence LLC · zorost.com</p></div>
