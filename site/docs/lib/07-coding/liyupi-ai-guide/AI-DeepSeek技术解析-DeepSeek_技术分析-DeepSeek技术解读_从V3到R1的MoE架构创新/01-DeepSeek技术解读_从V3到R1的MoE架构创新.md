---
title: "鱼皮 AI 导航（ai-guide）"
sourceId: "07-coding/liyupi-ai-guide"
sourceTitle: "鱼皮 AI 导航（ai-guide）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/liyupi/ai-guide"
entryUrl: "https://github.com/liyupi/ai-guide/blob/539082c1df5743bb34d72a17857a02735b38c866/AI/DeepSeek技术解析/DeepSeek%20技术分析/DeepSeek技术解读：从V3到R1的MoE架构创新.md"
sourceRel: "AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek技术解读：从V3到R1的MoE架构创新.md"
rawUrl: "/raw/07-coding/liyupi-ai-guide/AI/DeepSeek技术解析/DeepSeek 技术分析/DeepSeek技术解读：从V3到R1的MoE架构创新.md"
sourceSha256: "b34e3f64e93ef27166c59749b89e3da0edb2124e6920cabf4655a620a487cc3e"
pageSha256: "ccd8195b5673d9205201bd1e92af553ad7e89a83e5165b6dc1e123002910e1f5"
contentMode: "local-full"
zh: ""
---

## DeepSeek技术解读：从V3到R1的MoE架构创新

首先简单提一下MoE的发展历史，早在1991年一篇名为《[Adaptive Mixtures of Local Experts](https://link.zhihu.com/?target=https%3A//ieeexplore.ieee.org/abstract/document/6797059) 》的研究，最早提出了[Mixture of Experts](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=Mixture+of+Experts&zhida_source=entity)的原型框架，如图1，直至今日，MoE的框架依然保持这种方式。

![img](https://pic.yupi.icu/yuyi/1739504717902-2954b618-90a5-4b46-a6fc-bdc01a8be919.png)

图1、Adaptive Mixtures of Local Experts 框图

**MoE(Mixture of Experts)是一种网络层结构， 网络层主要包括三部分：**

- [**专家网络**](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=专家网络&zhida_source=entity)**(Expert Network)**：[前馈网络](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=前馈网络&zhida_source=entity)，逻辑上一个专家网络擅长处理一类专项的子任务，所有专家都接受相同的输入，来做特定计算处理，产出不同的输出
- [**门控网络**](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=门控网络&zhida_source=entity)**(Gating Network)**：跟专家网络接收一样的输入，负责产出专家偏好的权重。来指示对于一个输入，不同专家的重要程度。
- **选择器(selector)**：根据专家权重来做专家选择的策略。可以选择权重最高的Top1专家或选择TopK专家来融合得到最终的结果。

随后一段时间，主要是Google在主导着MoE的发展。进入Transformer时代后，2020年Google把模型训到了600B的规模，在Transformer上做MoE的经典设计，主要包括Transformer MoE层设计和辅助负载均衡损失。

**Transformer** [**MoE层**](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=2&q=MoE层&zhida_source=entity)：MoE层替换Transformer的FFN层，计算逻辑：对于一个token 分别通过门控网络和专家网络计算门控值和专家输出，然后用门控值加权多个专家输出来产出最终结果。具体如下：

- 门控计算：

(1)[gs,1,gs,2,...,gs,E]=softmax(wg.xs)

- 专家计算（专家就是FFN网络）

(2)FFNe(xs)=Woe.ReLU(Wie.xs)

多专家结果加权就和得到MoE的输出(3)ys=∑e=1Egs,e.FFNe(xs)

注：这里的专家是**token级专家**，而不是样本粒度，每个token都会做专家路由。此外专家是**稀疏激活**的，是根据门控值取topK个专家来融合计算最终的结果。GShard最多激活权重最高的2个专家。

**负载均衡-辅助损失**：引入负载均衡损失，目的是解决多专家token分布不均的问题。因为如果完全按门控权重选取topk专家，容易导致训练过程出现负载不均衡的问题。比如：大多数token被分配到少数几个专家，导致只有少数专家数据通信繁忙造成拥堵，从而减缓训练速度；也会导致其他专家得不到充分训练。为了解决这个问题，定义了一个辅助损失（[aux_loss](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=aux_loss&zhida_source=entity)）来降低负载不均衡问题。

那么怎么定义负载均衡的辅助损失？

考虑每个专家收到的token占总token的比例，分别为： c1S,c2S,...,cES ，其中 S 表示token的数量， \{1,2,...,E\} 表示专家集合， ce 表示第 e 个专家接受的token数量。如果是负载均衡的，那么每个专家收到的token一样多，token比例 ciS 值一样。

我们可以用每个专家收到的token比例的[平方和](https://zhida.zhihu.com/search?content_id=253521716&content_type=Article&match_order=1&q=平方和&zhida_source=entity)来描述负载均衡损失，如下公式 (4) 所示。当所有专家收到token比例都相等时， laux 取最小值。 (4)laux=1E∑e=1E(ceS)2

但由于公式 (1) 是参数无关的量，不可梯度更新。作者用每个专家的门控权重的均值 me 作为 ceS 的近似。如公式 (5)

(5)me=1S∑s=1Sgs,e

其中 gs,e 为公式 (1) 针对token s 计算的专家 e 的门控权重。

在这里要再弄再搞清楚两个问题：

问题1：公式 (5) 计算的 me为什么可以看作是 ceS 的近似？
答：直观理解，我们假设极端情况下每个token最多分配给1个专家，那么可以假设被激活的专家的权重可以是1，其他专家权重都是0，这样对于专家 e 来说， 可以计算得到 me=ceS 。另外从定义上 me=1S∑s=1Sgs,e 表示token集合 S 分配给专家 e 的token概率，如果不考虑token分配的完整性。这其实就是 ceS 的定义。只不过 me 是个soft的计算方式，而 ceS 是取TopK的hard计算的。理解上可再参考下示例图，图示展示有6个专家，在6个token上计算，取Top1专家激活。左图每一行是多专家softmax的结果。左边按列加和计算 ∑s=1Sgs,e=me×S 其实是计算分配给专家 e 的token数，是soft的计算，右边按列加和计算 ce 也是计算分配给专家 i 的token数，是hard的计算。 ci 和 me×S 的值是近似的（四舍五入取整的结果），也就是 ce≈me×S ，所以me可以近似看作是 ceS 。

![img](https://pic.yupi.icu/yuyi/1739504718170-ffbaeed0-4139-45f7-8edd-ee4f686fca0d.png)

问题2：这样近似计算有什么好处？
答：因为 me 计算引入了门控 gs,e 项， gs,e 计算如公式(1)所示，包括的可学习参数 wg ，保证了这个一个可微的计算，可以做梯度更新。

我们用 me 把公式 (4) 改造下，将平方项的一个分量替换成 me ，如公式 (6) :

(6)laux=1E∑e=1E(ceS)×me公式 (6) 就是我们经常看到的负载均衡loss形式。这里也要注意，**对于专家级的负载均衡的loss是加到每个MoE层的，每层都有一个** laux **辅助损失。**

上面对MoE有了基本的认识，我们接下来看看DeepSeek在MoE方面的工作。DeepSeek的最新模型DeepSeek-V3和DeepSeek-R1都属于MoE（混合专家）架构，并在开源世界产生了较大的影响力。特别是2025 年 1 月开源的DeepSeek-R1，模型性能可挑战 OpenAI 闭源的 o1 模型。
