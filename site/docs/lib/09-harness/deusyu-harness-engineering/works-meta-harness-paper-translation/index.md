---
title: "Meta-Harness：模型 Harness 的端到端优化"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/meta-harness-paper-translation.md"
sourceRel: "works/meta-harness-paper-translation.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/works/meta-harness-paper-translation.md"
sourceSha256: "2d3b9292d18a25f2cdd30d1b8b53fc99ece7842ce2086beebf400ba05b2a38c4"
pageSha256: "923727fbbfe606bb97cb2fb217ace402497b238db8fef1ca8a902eca73bae06e"
contentMode: "local-full"
zh: ""
---

# Meta-Harness：模型 Harness 的端到端优化

###### 摘要

大语言模型（LLM）系统的性能不仅取决于模型权重，还取决于其 Harness：决定存储、检索和呈现给模型哪些信息的代码。然而，Harness 在很大程度上仍然依赖手工设计，而现有的文本优化器（text optimizer）与该场景匹配不佳，因为它们对反馈的压缩过于激进：要么无记忆，要么仅依赖标量分数，要么将反馈限制在简短模板或摘要中。我们提出 Meta-Harness，一个通过搜索 LLM 应用的 Harness 代码来进行优化的外循环（outer loop）系统。它使用一个智能体式提议器（agentic proposer），通过文件系统（filesystem）访问所有先前候选方案的源代码、分数和执行轨迹（execution traces）。在在线文本分类（online text classification）任务上，Meta-Harness 比最先进的上下文工程（Context Engineering）管理系统提高了 7.7 个百分点，同时使用的上下文 token（context tokens）减少了 4 ×。在检索增强数学推理（retrieval-augmented math reasoning）任务上，单个发现的 Harness 在 200 道 IMO 难度的问题上平均提高了 4.7 个百分点的准确率，该结果在五个未参与搜索的模型上保持一致。在智能体编码（agentic coding）任务上，发现的 Harness 超越了最佳的手工工程化基线（baseline）。总之，这些结果表明，更丰富的先验经验访问能够赋能自动化 Harness Engineering。

项目页面及交互式演示：[https://yoonholee.com/meta-harness/](https://yoonholee.com/meta-harness/)

优化后的 Harness：[https://github.com/stanford-iris-lab/meta-harness-tbench2-artifact](https://github.com/stanford-iris-lab/meta-harness-tbench2-artifact)

![Refer to caption](https://arxiv.org/html/2603.28052v1/x1.png)

![Refer to caption](https://arxiv.org/html/2603.28052v1/x2.png)

Figure 1：（左）在文本分类任务上，Meta-Harness 优于现有最佳的手工设计 Harness（ACE）和现有文本优化器（TTT-Discover、OpenEvolve），仅经过 4 次评估即达到次优方法的最终准确率。（右）在 TerminalBench-2 上，Meta-Harness 优于所有已报告的 Claude Haiku 4.5 Harness。

## 本篇目录

- [1 引言](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/01-1_引言.md)
- [2 相关工作](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/02-2_相关工作.md)
- [3 Meta-Harness：优化 Harness 的 Harness](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/03-3_Meta-Harness_优化_Harness_的_Harness.md)
- [4 实验](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/04-4_实验.md)
- [5 讨论](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/05-5_讨论.md)
- [致谢](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/06-致谢.md)
- [参考文献](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/07-参考文献.md)
- [附录 A 提议器的定性行为](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/08-附录_A_提议器的定性行为.md)
- [附录 B 发现的 Harness](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/09-附录_B_发现的_Harness.md)
- [附录 C 数据集详情](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/10-附录_C_数据集详情.md)
- [附录 D 实践实施建议](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/11-附录_D_实践实施建议.md)
- [附录 E 扩展相关工作](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/12-附录_E_扩展相关工作.md)
