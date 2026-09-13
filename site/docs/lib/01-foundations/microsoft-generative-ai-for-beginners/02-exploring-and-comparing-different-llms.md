---
title: "Exploring and comparing different LLMs"
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

# Exploring and comparing different LLMs

[![Exploring and comparing different LLMs](/mirror/fe/fe782c58702801906d53e97de0cf64434b9b33af.webp)](https://youtu.be/KIRUeDKscfI?si=8BHX1zvwzQBn-PlK)

<div class="tb-zh"><p>本课视频封面（可点击跳转）：Exploring and comparing different LLMs。</p></div>

> _Click the image above to view video of this lesson_

<div class="tb-zh"><p>点击上方图片即可观看本课视频。</p></div>

With the previous lesson, we have seen how Generative AI is changing the technology landscape, how Large Language Models (LLMs) work and how a business - like our startup - can apply them to their use cases and grow! In this chapter, we're looking to compare and contrast different types of large language models (LLMs) to understand their pros and cons.

<div class="tb-zh"><p>上一课我们看到生成式 AI 如何改变技术格局、大语言模型（LLM）如何工作，以及一家像我们这样的初创公司如何把它用到自己的业务中并成长起来。本章我们要横向比较不同类型的大语言模型，弄清它们各自的长处与短板。</p></div>

The next step in our startup's journey is exploring the current landscape of LLMs and understanding which are suitable for our use case.

<div class="tb-zh"><p>初创公司旅程的下一步，是考察当下 LLM 的整体格局，判断哪些适合我们的场景。</p></div>

## Introduction

This lesson will cover:

<div class="tb-zh"><p>本课内容包括：</p></div>

- Different types of LLMs in the current landscape.
- Testing, iterating, and comparing different models for your use case in Azure.
- How to deploy an LLM.

<div class="tb-zh"><p>当前格局下不同类型的 LLM；在 Azure 上针对自己的场景测试、迭代并比较不同模型；以及如何部署一个 LLM。</p></div>

## Learning Goals

After completing this lesson, you will be able to:

<div class="tb-zh"><p>学完本课，你将能够：</p></div>

- Select the right model for your use case.
- Understand how to test, iterate, and improve the performance of your model.
- Know how businesses deploy models.

<div class="tb-zh"><p>为你的场景挑选合适的模型；理解如何测试、迭代并提升模型表现；了解企业是怎样部署模型的。</p></div>

## Understand different types of LLMs

LLMs can have multiple categorizations based on their architecture, training data, and use case. Understanding these differences will help our startup select the right model for the scenario, and understand how to test, iterate, and improve performance.

<div class="tb-zh"><p>LLM 可以按架构、训练数据和用途分出多种类别。理解这些差异，有助于我们的初创公司为场景选对模型，也知道如何测试、迭代并改进表现。</p></div>

There are many different types of LLM models, your choice of model depends on what you aim to use them for, your data, how much you're ready to pay and more.

<div class="tb-zh"><p>LLM 的类型很多，选哪种取决于你打算拿它做什么、你的数据、你愿意付多少钱，等等。</p></div>

Depending on if you aim to use the models for text, audio, video, image generation and so on, you might opt for a different type of model.

<div class="tb-zh"><p>视目标是文本、音频、视频还是图像生成，你可能会选择不同类型的模型。</p></div>

- **Audio and speech recognition**. Whisper-style models are still useful general-purpose speech recognition models, but production choices now also include newer speech-to-text models such as `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and diarization variants. Evaluate language coverage, diarization, real-time support, latency, and cost for your scenario. Learn more in the [OpenAI speech-to-text documentation](https://platform.openai.com/docs/guides/speech-to-text?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>音频与语音识别：Whisper 一类的模型仍是有用的通用语音识别模型，但生产环境中也可以选更新的语音转文本模型，如 gpt-4o-transcribe、gpt-4o-mini-transcribe 以及带说话人分离（diarization）的变体。评估时要看语言覆盖、说话人分离、实时支持、延迟与成本。详见 OpenAI 的语音转文本文档。</p></div>

- **Image generation**. DALL-E and Midjourney are well-known image generation options, but current OpenAI image APIs center on GPT Image models such as `gpt-image-2`, while Stable Diffusion, Imagen, Flux, and other model families are also common choices. Compare prompt adherence, editing support, style control, safety requirements, and licensing. Learn more in the [OpenAI image generation guide](https://platform.openai.com/docs/guides/images?WT.mc_id=academic-105485-koreyst) and Chapter 9 of this curriculum.

<div class="tb-zh"><p>图像生成：DALL-E 和 Midjourney 是广为人知的图像生成方案，但目前 OpenAI 的图像 API 以 gpt-image-2 这类 GPT Image 模型为主；Stable Diffusion、Imagen、Flux 等模型系列也很常见。比较时关注提示词遵循度、编辑能力、风格控制、安全要求与许可条款。详见 OpenAI 图像生成指南与本课程第 9 章。</p></div>

- **Text generation**. Text models now span frontier models, reasoning models, smaller low-latency models, and open-weight models. Current examples include OpenAI GPT-5.x models, Anthropic Claude 4.x models, Google Gemini 3.x models, Meta Llama 4 models, and Mistral models. Do not choose only by release date or price; compare task quality, latency, context window, tool use, safety behavior, regional availability, and total cost. The [Microsoft Foundry model catalog](https://ai.azure.com/catalog?WT.mc_id=academic-105485-koreyst) is a good place to compare models available on Azure.

<div class="tb-zh"><p>文本生成：文本模型如今涵盖前沿模型、推理模型、更低延迟的小模型以及开放权重模型。当前的代表包括 OpenAI GPT-5.x、Anthropic Claude 4.x、Google Gemini 3.x、Meta Llama 4 与 Mistral 各系列。不要只按发布日期或价格来选；要比较任务质量、延迟、上下文窗口、工具调用能力、安全行为、区域可用性与总成本。Microsoft Foundry 的模型目录很适合用来比较 Azure 上可用的模型。</p></div>

- **Multi-modality**. Many current models can process more than text. Some accept image, audio, or video inputs; some can call tools; and specialized models can generate images, audio, or video. For example, current OpenAI models support text and image input, Gemini models can support text, code, image, audio, and video inputs depending on the variant, and Llama 4 Scout and Maverick are open-weight natively multimodal models. Always check each model card for supported input and output modalities before building a workflow around it.

<div class="tb-zh"><p>多模态：现在很多模型能处理的远不止文本——有的接受图像、音频或视频输入，有的可以调用工具，也有专门模型能生成图像、音频或视频。例如当前的 OpenAI 模型支持文本与图像输入；Gemini 模型视版本可支持文本、代码、图像、音频与视频输入；Llama 4 Scout 与 Maverick 则是开放权重、原生多模态的模型。围绕某个模型搭建工作流之前，务必查看模型卡上写明的输入输出模态。</p></div>

Selecting a model means you get some basic capabilities, that might not be enough however. Often you have company specific data that you somehow need to tell the LLM about. There are a few different choices on how to approach that, more on that in the upcoming sections.

<div class="tb-zh"><p>选定一个模型只是获得了基础能力，往往还不够。企业自有数据怎么让 LLM 知道，有几种不同的做法，后面的小节会展开。</p></div>

### Foundation Models versus LLMs

The term Foundation Model was [coined by Stanford researchers](https://arxiv.org/abs/2108.07258?WT.mc_id=academic-105485-koreyst) and defined as an AI model that follows some criteria, such as:

<div class="tb-zh"><p>基础模型（Foundation Model）一词由斯坦福的研究者提出，用来指符合以下若干条件的 AI 模型：</p></div>

- **They are trained using unsupervised learning or self-supervised learning**, meaning they are trained on unlabeled multi-modal data, and they do not require human annotation or labeling of data for their training process.
- **They are very large models**, based on very deep neural networks trained on billions of parameters.
- **They are normally intended to serve as a ‘foundation’ for other models**, meaning they can be used as a starting point for other models to be built on top of, which can be done by fine-tuning.

<div class="tb-zh"><p>它们使用无监督学习或自监督学习训练，也就是在无标注的多模态数据上训练，训练过程不需要人工注释或打标；它们体量极大，基于在数十亿参数上训练的极深神经网络；它们通常被设计为其他模型的「基础」，可以作为起点在其上继续构建其他模型，例如通过微调实现。</p></div>

![Foundation Models versus LLMs](/mirror/33/33d2ea9a86113cbd5bd332508d0a4f64078d4d22.webp)

Image source: [Essential Guide to Foundation Models and Large Language Models | by Babar M Bhatti | Medium
](https://thebabar.medium.com/essential-guide-to-foundation-models-and-large-language-models-27dab58f7404)

<div class="tb-zh"><p>图片来源：Essential Guide to Foundation Models and Large Language Models | Babar M Bhatti | Medium。</p></div>

To further clarify this distinction, let’s take ChatGPT as a historical example. Early versions of ChatGPT used GPT-3.5 as a foundation model. OpenAI then used chat-specific data and alignment techniques to create a tuned version that performed better in conversational scenarios, such as chatbots. Modern AI services often route between several model variants, so the service name and the underlying model name are not always the same thing.

<div class="tb-zh"><p>为了进一步厘清这一区别，以 ChatGPT 作为历史例子：早期版本的 ChatGPT 以 GPT-3.5 作为基础模型，OpenAI 随后用对话专用数据和对齐技术做出了在对话场景中表现更好的调优版本。如今的 AI 服务常常在多个模型变体之间路由，因此服务名与底层模型名并不总是一回事。</p></div>

![Foundation Model](/mirror/3d/3da55b3a15a31927f61dfaaee459947cbd70ae1b.webp)

Image source: [2108.07258.pdf (arxiv.org)](https://arxiv.org/pdf/2108.07258.pdf?WT.mc_id=academic-105485-koreyst)

<div class="tb-zh"><p>图片来源：2108.07258.pdf (arxiv.org)。</p></div>

### Open-Weight/Open-Source versus Proprietary Models

Another way to categorize LLMs is whether they are open-weight, open-source, or proprietary.

<div class="tb-zh"><p>另一种分类方式，是看 LLM 属于开放权重、开源还是专有（proprietary）。</p></div>

Open-source and open-weight models make model artifacts available for inspection, download, or customization, but their licenses differ. Some are fully open source, while others are open-weight models with usage restrictions. They can be useful when a business needs more control over deployment, data locality, cost, or customization. However, teams still need to review license terms, serving costs, maintenance, security updates, and evaluation quality before using them in production. Examples include [Meta Llama 4](https://ai.meta.com/blog/llama-4-multimodal-intelligence/?WT.mc_id=academic-105485-koreyst), some [Mistral models](https://docs.mistral.ai/models/overview?WT.mc_id=academic-105485-koreyst), and many models hosted on [Hugging Face](https://huggingface.co/models?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>开源与开放权重模型会把模型产物开放出来供检查、下载或定制，但许可证各不相同：有些是完全开源的，有些则是带使用限制的开放权重模型。当企业需要在部署、数据落地位置、成本或定制上拥有更多控制权时，这类模型很有用。但在生产使用前，团队仍需审查许可条款、服务成本、维护、安全更新与评测质量。例子包括 Meta Llama 4、部分 Mistral 模型，以及 Hugging Face 上托管的许多模型。</p></div>

Proprietary models are owned and hosted by a provider. These models are often optimized for managed production use and can offer strong support, safety systems, tool integration, and scale. However, customers usually cannot inspect or modify the model weights, and they must review provider terms for privacy, retention, compliance, and acceptable use. Examples include [OpenAI models](https://platform.openai.com/docs/models?WT.mc_id=academic-105485-koreyst), [Google Gemini](https://deepmind.google/models/gemini/pro/?WT.mc_id=academic-105485-koreyst), and [Anthropic Claude](https://platform.claude.com/docs/en/about-claude/models/overview?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>专有模型由服务商拥有并托管，通常针对托管式生产使用做过优化，能提供较强的支持、安全体系、工具集成与扩展能力；但客户一般无法查看或修改模型权重，也必须审查服务商在隐私、数据保留、合规与可接受使用方面的条款。例子包括 OpenAI 模型、Google Gemini 与 Anthropic Claude。</p></div>

### Embedding versus Image generation versus Text and Code generation

LLMs can also be categorized by the output they generate.

<div class="tb-zh"><p>LLM 也可以按生成的输出类型来分类。</p></div>

Embeddings are a set of models that can convert text into a numerical form, called embedding, which is a numerical representation of the input text. Embeddings make it easier for machines to understand the relationships between words or sentences and can be consumed as inputs by other models, such as classification models, or clustering models that have better performance on numerical data. Embedding models are often used for transfer learning, where a model is built for a surrogate task for which there’s an abundance of data, and then the model weights (embeddings) are re-used for other downstream tasks. An example of this category is [OpenAI embeddings](https://platform.openai.com/docs/models/embeddings?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>嵌入（embedding）模型把文本转换为数值形式，即所谓 embedding——输入文本的数值表示。嵌入让机器更容易理解词与词、句子与句子之间的关系，也可作为其他模型的输入，例如分类模型，或在数值数据上表现更好的聚类模型。嵌入模型常用于迁移学习：先为一个数据充足的中转任务训练模型，再把模型权重（嵌入）复用到其他下游任务上。这一类的例子是 OpenAI embeddings。</p></div>

![Embedding](/mirror/38/382aafa83ef8047f76f3eee982e839ec789296ee.webp)

Image generation models are models that generate images. These models are often used for image editing, image synthesis, and image translation. Image generation models are often trained on large datasets of images, such as [LAION-5B](https://laion.ai/blog/laion-5b/?WT.mc_id=academic-105485-koreyst), and can be used to generate new images or to edit existing images with inpainting, super-resolution, and colorization techniques. Examples include [GPT Image models](https://platform.openai.com/docs/guides/images?WT.mc_id=academic-105485-koreyst), [Stable Diffusion models](https://github.com/Stability-AI/StableDiffusion?WT.mc_id=academic-105485-koreyst), and Imagen models.

<div class="tb-zh"><p>图像生成模型用来生成图像，常用于图像编辑、图像合成与图像翻译。这类模型通常在大型图像数据集上训练（如 LAION-5B），可通过 inpainting、超分辨率与上色等技术生成新图或编辑现有图像。例子包括 GPT Image 模型、Stable Diffusion 模型与 Imagen 模型。</p></div>

![Image generation](/mirror/5a/5a91afdff96ead85598a04661f3c721841eeb597.webp)

Text and code generation models are models that generate text or code. These models are often used for text summarization, translation, and question answering. Text generation models are often trained on large datasets of text, such as [BookCorpus](https://www.cv-foundation.org/openaccess/content_iccv_2015/html/Zhu_Aligning_Books_and_ICCV_2015_paper.html?WT.mc_id=academic-105485-koreyst), and can be used to generate new text, or to answer questions. Code generation models, like [CodeParrot](https://huggingface.co/codeparrot?WT.mc_id=academic-105485-koreyst), are often trained on large datasets of code, such as GitHub, and can be used to generate new code, or to fix bugs in existing code.

<div class="tb-zh"><p>文本与代码生成模型用来生成文本或代码，常用于文本摘要、翻译与问答。文本生成模型常在大型文本数据集（如 BookCorpus）上训练，可生成新文本或回答问题；代码生成模型如 CodeParrot 通常在 GitHub 等大型代码数据集上训练，可生成新代码或修复已有代码中的 bug。</p></div>

![Text and code generation](/mirror/31/3167e57a61fbd2721f3ca0851ddf8854b10ca8d3.webp)

### Encoder-Decoder versus Decoder-only

To talk about the different types of architectures of LLMs, let's use an analogy.

<div class="tb-zh"><p>要讲 LLM 不同的架构类型，先打个比方。</p></div>

Imagine your manager gave you a task for writing a quiz for the students. You have two colleagues; one oversees creating the content and the other oversees reviewing them.

<div class="tb-zh"><p>假设主管交给你一个任务：为学生出一套测验题。你有两位同事，一位负责出题，另一位负责审题。</p></div>

The content creator is like a decoder-only model: they can look at the topic, see what you already wrote, and then continue generating content based on that context. They are very good at writing engaging and informative content, but they are not always the best choice when the task is only to classify, retrieve, or encode information. Examples of decoder-only model families include GPT and Llama models.

<div class="tb-zh"><p>出题人像 decoder-only（仅解码器）模型：他们看主题、看你已经写了什么，再基于这些上下文继续写下去。这类模型非常擅长写出有吸引力、信息量足的内容，但若任务只是分类、检索或编码信息，它们往往不是最佳选择。decoder-only 模型系列的例子有 GPT 与 Llama。</p></div>

The reviewer is like an Encoder only model, they look at the course written and the answers, noticing the relationship between them and understanding context, but they are not good at generating content. An example of Encoder only model would be BERT.

<div class="tb-zh"><p>审题人像 encoder-only（仅编码器）模型：他们看已写好的课程内容和答案，注意到两者之间的关系、理解上下文，但不擅长生成内容。encoder-only 模型的例子是 BERT。</p></div>

Imagine that we can have someone as well who could create and review the quiz, this is an Encoder-Decoder model. Some examples would be BART and T5.

<div class="tb-zh"><p>再想象有个人既能出题也能审题，这就是 encoder-decoder（编码器—解码器）模型，例子有 BART 和 T5。</p></div>

### Service versus Model

Now, let's talk about the difference between a service and a model. A service is a product that is offered by a Cloud Service Provider, and is often a combination of models, data, and other components. A model is the core component of a service, and is often a foundation model, such as an LLM.

<div class="tb-zh"><p>接下来说说服务与模型的区别。服务是云服务商提供的产品，通常是模型、数据与其他组件的组合；模型是服务的核心组件，往往是像 LLM 这样的基础模型。</p></div>

Services are often optimized for production use and are often easier to use than models, via a graphical user interface. However, services are not always available for free, and may require a subscription or payment to use, in exchange for leveraging the service owner’s equipment and resources, optimizing expenses and scaling easily. An example of a service is [Azure OpenAI Service](https://learn.microsoft.com/azure/ai-foundry/openai/overview?WT.mc_id=academic-105485-koreyst), which offers a pay-as-you-go rate plan, meaning users are charged proportionally to how much they use the service. Azure OpenAI Service also offers enterprise-grade security and a responsible AI framework on top of the models' capabilities.

<div class="tb-zh"><p>服务通常为生产使用做过优化，借助图形界面往往比直接用模型更好上手；但它未必免费，可能需要订阅或付费，用来换取服务商的计算资源，从而优化开支并轻松扩展。服务的一个例子是 Azure OpenAI Service：它提供按用量计费（pay-as-you-go）的方案，用户按实际使用量付费；在模型能力之上，还提供企业级安全与负责任 AI 框架。</p></div>

Models are the neural network artifacts: parameters, weights, architecture, tokenizer, and supporting configuration. Running a model locally or in a private environment requires suitable hardware, serving infrastructure, monitoring, and either a compatible open-source/open-weight license or a commercial license. Open-weight models such as Llama 4 or Mistral models can be self-hosted, but they still require computational power and operational expertise.

<div class="tb-zh"><p>模型则是神经网络的产物：参数、权重、架构、分词器以及配套配置。要本地或在私有环境中运行模型，需要合适的硬件、服务基础设施、监控，以及兼容的开源/开放权重许可或商业许可。像 Llama 4 或 Mistral 这样的开放权重模型可以自托管，但仍然需要算力和运维能力。</p></div>

## How to test and iterate with different models to understand performance on Azure

Once our team has explored the current LLMs landscape and identified some good candidates for their scenarios, the next step is testing them on their data and on their workload. This is an iterative process, done by experiments and measures.
Most of the models we mentioned in previous paragraphs (OpenAI models, open-weight models like Llama 4 and Mistral, and Hugging Face models) are available in [Microsoft Foundry Models](https://learn.microsoft.com/azure/foundry/concepts/foundry-models-overview?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>团队考察完当前的 LLM 格局、挑出适合自身场景的候选之后，下一步就是在自己的数据与工作负载上做测试——这是一个由实验和度量驱动的迭代过程。前文提到的多数模型（OpenAI 模型、Llama 4 与 Mistral 这类开放权重模型、Hugging Face 上的模型）都可以在 Microsoft Foundry Models 中找到。</p></div>

[Microsoft Foundry](https://learn.microsoft.com/azure/foundry/what-is-foundry?WT.mc_id=academic-105485-koreyst), formerly Azure AI Studio/Azure AI Foundry, is a unified Azure platform for building AI apps and agents. It helps developers manage the lifecycle from experimentation and evaluation to deployment, monitoring, and governance. The model catalog in Microsoft Foundry enables the user to:

<div class="tb-zh"><p>Microsoft Foundry（前身是 Azure AI Studio / Azure AI Foundry）是 Azure 上用于构建 AI 应用与智能体的统一平台，帮助开发者管理从实验、评估到部署、监控与治理的整个生命周期。它的模型目录让用户可以：</p></div>

- Find the foundation model of interest in the catalog, including models sold by Azure and models from partners and community providers. Users can filter by task, provider, license, deployment option, or name.

<div class="tb-zh"><p>在目录中查找感兴趣的基础模型，既有 Azure 自售的模型，也有来自合作伙伴与社区提供方的模型；可以按任务、提供方、许可证、部署方式或名称筛选。</p></div>

![Model catalog](/mirror/11/11a89fc3a02b3476d45a3e885af1f259b85b580e.webp)

- Review the model card, including a detailed description of intended use and training data, code samples and evaluation results on the internal evaluations library.

<div class="tb-zh"><p>查看模型卡，包括预期用途、训练数据的详细说明，以及代码示例和在内部评估库上的评测结果。</p></div>

![Model card](/mirror/90/907eb984beb7d6f6dc141c4c66aa128cd54d5353.webp)

- Compare benchmarks across models and datasets available in the industry to assess which one meets the business scenario, through the [Model Benchmarks](https://learn.microsoft.com/azure/ai-foundry/concepts/model-benchmarks?WT.mc_id=academic-105485-koreyst) pane.

<div class="tb-zh"><p>通过 Model Benchmarks 面板，比较业界可用的模型与数据集上的基准成绩，判断哪个模型更契合业务场景。</p></div>

![Model benchmarks](/mirror/f6/f674031283918d12c652a729410e472450670384.webp)

- Fine-tune supported models on custom training data to improve model performance in a specific workload, leveraging the experimentation and tracking capabilities of Microsoft Foundry.

<div class="tb-zh"><p>用自定义训练数据微调受支持的模型，借助 Microsoft Foundry 的实验与追踪能力提升模型在特定工作负载上的表现。</p></div>

![Model fine-tuning](/mirror/48/4843d71f30a5085a1e8d5ba5f01bbcbff9167394.webp)

- Deploy the original pre-trained model or the fine-tuned version to a remote real-time inference endpoint, using managed compute or serverless deployment options, to enable applications to consume it.

<div class="tb-zh"><p>把原始预训练模型或微调后的版本部署到远程实时推理端点，可选择托管算力或无服务器（serverless）部署方式，供应用调用。</p></div>

![Model deployment](/mirror/ef/ef49c77f19be8c35a46d727790123a271477989c.webp)

> [!NOTE]
> Not all models in the catalog are currently available for fine-tuning and/or pay-as-you-go deployment. Check the model card for details on the model's capabilities and limitations.

<div class="tb-zh"><p>注意：目录中并非所有模型都支持微调和/或按用量计费部署；模型能力与限制请以模型卡为准。</p></div>

## Improving LLM results

We’ve explored with our startup team different kinds of LLMs and a cloud platform (Microsoft Foundry) that enables us to compare different models, evaluate them on test data, improve performance, and deploy them on inference endpoints.

<div class="tb-zh"><p>我们和初创团队一起考察了不同类型的 LLM，以及一个能让我们比较模型、在测试数据上评估、改进表现并把模型部署到推理端点的云平台（Microsoft Foundry）。</p></div>

But when shall they consider fine-tuning a model rather than using a pre-trained one? Are there other approaches to improve model performance on specific workloads?

<div class="tb-zh"><p>但什么时候该考虑微调模型，而不是直接用预训练模型？针对特定工作负载提升模型表现，还有别的方法吗？</p></div>

There are several approaches a business can use to get the results they need from an LLM. You can select different types of models with different degrees of training when deploying an LLM in production, with different levels of complexity, cost, and quality. Here are some different approaches:

<div class="tb-zh"><p>企业要让 LLM 给出想要的结果，有几条路可以走。在生产中部署 LLM 时，可以选择不同训练程度的模型，复杂度、成本与质量各不相同。常见做法有：</p></div>

- **Prompt engineering with context**. The idea is to provide enough context when you prompt to ensure you get the responses you need.

<div class="tb-zh"><p>带上下文的提示工程（prompt engineering with context）：在写提示词时提供足够的上下文，确保拿到需要的回答。</p></div>

- **Retrieval Augmented Generation, RAG**. Your data might exist in a database or web endpoint for example, to ensure this data, or a subset of it, is included at the time of prompting, you can fetch the relevant data and make that part of the user's prompt.

<div class="tb-zh"><p>检索增强生成（Retrieval Augmented Generation，RAG）：数据可能存放在数据库或 Web 端点里；为了在提示时把这份数据（或其子集）一并纳入，可以先取回相关数据，再把它放进用户的提示词中。</p></div>

- **Fine-tuned model**. Here, you trained the model further on your own data which led to the model being more exact and responsive to your needs but might be costly.

<div class="tb-zh"><p>微调模型（fine-tuned model）：在你自己的数据上继续训练模型，使结果更精确、更贴合需求，但成本可能较高。</p></div>

![LLMs deployment](/mirror/76/7623107fe8f99a83c7eda66b563a89fd36bb17af.webp)

Img source: [Four Ways that Enterprises Deploy LLMs | Fiddler AI Blog](https://www.fiddler.ai/blog/four-ways-that-enterprises-deploy-llms?WT.mc_id=academic-105485-koreyst)

<div class="tb-zh"><p>图片来源：Four Ways that Enterprises Deploy LLMs | Fiddler AI Blog。</p></div>

### Prompt Engineering with Context

Pre-trained LLMs work very well on generalized natural language tasks, even by calling them with a short prompt, like a sentence to complete or a question – the so-called “zero-shot” learning.

<div class="tb-zh"><p>预训练 LLM 在通用自然语言任务上表现很好，哪怕只用一句简短的提示去调用它——比如补全一句话或提一个问题——也就是所谓的「zero-shot」零样本学习。</p></div>

However, the more the user can frame their query, with a detailed request and examples – the Context – the more accurate and closest to user’s expectations the answer will be. In this case, we talk about “one-shot” learning if the prompt includes only one example and “few shot learning” if it includes multiple examples.
Prompt engineering with context is the most cost-effective approach to kick-off with.

<div class="tb-zh"><p>然而，用户把请求描述得越具体、给出的细节和示例（即上下文）越多，回答就越准确、越贴近预期。提示词里只含一个示例时叫「one-shot」单样本学习，含多个示例时叫「few-shot」少样本学习。带上下文的提示工程是最省钱的起步方式。</p></div>

### Retrieval Augmented Generation (RAG)

LLMs have the limitation that they can use only the data that has been used during their training to generate an answer. This means that they don’t know anything about the facts that happened after their training process, and they cannot access non-public information (like company data).
This can be overcome through RAG, a technique that augments prompt with external data in the form of chunks of documents, considering prompt length limits. This is supported by Vector database tools (like [Azure Vector Search](https://learn.microsoft.com/azure/search/vector-search-overview?WT.mc_id=academic-105485-koreyst)) that retrieve the useful chunks from varied pre-defined data sources and add them to the prompt Context.

<div class="tb-zh"><p>LLM 的局限之一在于：它只能使用训练时见过的数据来生成回答。这意味着它对训练之后发生的事实一无所知，也无法访问非公开信息（如公司内部数据）。RAG 可以绕过这一限制：它把外部数据以文档片段的形式补充进提示词，同时兼顾提示词长度上限。这一做法依赖向量数据库工具（如 Azure Vector Search），从各种预先定义的数据源中检索有用的片段，加入提示词的上下文中。</p></div>

This technique is very helpful when a business doesn’t have enough data, enough time, or resources to fine-tune an LLM, but still wishes to improve performance on a specific workload and reduce risks of hallucinated, outdated, or unsupported answers.

<div class="tb-zh"><p>当企业没有足够的数据、时间或资源去微调 LLM，但仍希望提升特定工作负载的表现、降低答案虚构、过时或缺乏依据的风险时，这项技术特别有用。</p></div>

### Fine-tuned model

Fine-tuning is a process that leverages transfer learning to ‘adapt’ the model to a downstream task or to solve a specific problem. Differently from few-shot learning and RAG, it results in a new model being generated, with updated weights and biases. It requires a set of training examples consisting of a single input (the prompt) and its associated output (the completion).
This would be the preferred approach if:

<div class="tb-zh"><p>微调借助迁移学习，把模型「适配」到某个下游任务或特定问题上。与少样本学习和 RAG 不同，微调会产出一个新的模型，权重与偏置都被更新。它需要一组训练示例，每条由一个输入（prompt）和对应输出（completion）组成。出现以下情况时，微调是更合适的选择：</p></div>

- **Using smaller task-specific models**. A business would like to fine-tune a smaller model for a narrow task rather than repeatedly prompt a larger frontier model, resulting in a more cost-effective and faster solution.

<div class="tb-zh"><p>使用更小的专用模型：企业宁愿为范围很窄的任务微调一个小模型，也不想反复调用更大的前沿模型，这样成本更低、速度更快。</p></div>

- **Considering latency**. Latency is important for a specific use-case, so it’s not possible to use very long prompts or the number of examples that should be learned from the model doesn’t fit with the prompt length limit.

<div class="tb-zh"><p>考虑延迟：某些场景对延迟很敏感，无法使用很长的提示词，或者模型需要学习的示例数量超出了提示词长度上限。</p></div>

- **Adapting stable behavior**. A business has many high-quality examples and wants the model to consistently follow a task pattern, output format, tone, or domain-specific style. If the main problem is fresh facts or private knowledge that changes often, use RAG instead of relying on fine-tuning alone.

<div class="tb-zh"><p>固化稳定行为：企业手头有大量高质量示例，希望模型始终遵循同一种任务模式、输出格式、语气或特定领域的风格。如果主要问题是不断变化的新事实或私有知识，应该用 RAG，而不是只依赖微调。</p></div>

### Trained model

Training an LLM from scratch is without a doubt the most difficult and the most complex approach to adopt, requiring massive amounts of data, skilled resources, and appropriate computational power. This option should be considered only in a scenario where a business has a domain-specific use case and a large amount of domain-centric data.

<div class="tb-zh"><p>从零训练一个 LLM 无疑是难度最高、最复杂的做法，需要海量数据、专业人才和相应的算力，只有在企业拥有特定领域的场景且掌握大量领域数据时才值得考虑。</p></div>

## Knowledge check

What could be a good approach to improve LLM completion results?

<div class="tb-zh"><p>要改善 LLM 的补全结果，哪种做法比较好？</p></div>

1. Prompt engineering with context
1. RAG
1. Fine-tuned model

<div class="tb-zh"><p>1. 带上下文的提示工程；2. RAG；3. 微调模型。</p></div>

A: All three can help. Start with prompt engineering and context for quick improvements, and use RAG when the model needs current facts or private business data. Choose fine-tuning when you have enough high-quality examples and need the model to consistently follow a task, format, tone, or domain pattern.

<div class="tb-zh"><p>答案：三者都有帮助。先做提示工程和上下文，快速见效；当模型需要最新事实或企业私有数据时用 RAG；当你拥有足够多高质量示例、且需要模型稳定遵循某种任务、格式、语气或领域模式时，选择微调。</p></div>

## 🚀 Challenge

Read up more on how you can [use RAG](https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview?WT.mc_id=academic-105485-koreyst) for your business.

<div class="tb-zh"><p>进一步了解如何把 RAG 用在自己的业务中。</p></div>

## Great Work, Continue Your Learning

After completing this lesson, check out our [Generative AI Learning collection](https://aka.ms/genai-collection?WT.mc_id=academic-105485-koreyst) to continue leveling up your Generative AI knowledge!

<div class="tb-zh"><p>学完本课，可以接着看生成式 AI 学习合集，继续提升你的生成式 AI 知识。</p></div>

Head over to Lesson 3 where we will look at how to [build with Generative AI Responsibly](/lib/01-foundations/microsoft-generative-ai-for-beginners/03-using-generative-ai-responsibly)!

<div class="tb-zh"><p>下一课是第 3 课，我们将探讨如何负责任地构建生成式 AI 应用。</p></div>
