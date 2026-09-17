---
title: "深入脚手架内部：编码智能体架构的源代码级分类法"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/inside-the-scaffold-paper-translation.md"
sourceRel: "works/inside-the-scaffold-paper-translation.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/works/inside-the-scaffold-paper-translation.md"
sourceSha256: "1a992825af190f9df14478b1ad81719924ac50bc09d86d87130d636d48ceae4e"
pageSha256: "b671d17d2a4b72f9b213e99fb957352dba7a5313458454f42a7c494431dcdfbc"
contentMode: "local-full"
zh: ""
---

# 深入脚手架内部：编码智能体架构的源代码级分类法

Benjamin Rombaut
华为加拿大软件卓越中心

###### 摘要

基于 LLM 的编码智能体能够定位缺陷、生成补丁并运行测试，且对人工监督的依赖日益减少，然而包裹在语言模型外部的脚手架 (Scaffold) 代码——控制循环、工具定义、状态管理和上下文策略——仍然缺乏充分的理解。现有综述按照抽象能力类别（工具使用、规划、反思）对智能体进行分类，这种方式无法区分架构上截然不同的系统；而轨迹研究观察的是智能体*做了什么*，却未检视决定其行为*原因*的脚手架代码。本文提出了一套源代码级别的架构分类法，该分类法来源于对 13 个开源编码智能体脚手架在固定提交哈希处的分析。每个智能体在 12 个维度上进行表征，这些维度组织为三个层次：控制架构、工具与环境接口以及资源管理。分析表明，脚手架架构难以用离散类别加以划分：控制策略的分布范围从固定流水线到蒙特卡洛树搜索 (Monte Carlo Tree Search, MCTS)，工具数量从 0 到 37 不等，上下文压缩涵盖七种不同的策略。五种循环原语（ReAct、生成-测试-修复、计划-执行、多次重试、树搜索）作为可组合的构建块，被智能体以不同方式分层组合；13 个智能体中有 11 个组合了多种原语，而非依赖单一控制结构。各维度在外部约束占主导的地方趋于收敛（工具能力类别、编辑格式、执行隔离），在开放性设计问题尚存的地方趋于发散（上下文压缩、状态管理、多模型路由）。所有分类法层面的论断均以文件路径和行号为依据，为研究智能体行为的研究者和设计新脚手架的实践者提供了可复用的参考。

## 本篇目录

- [1 引言](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/01-1_引言.md)
- [2 相关工作](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/02-2_相关工作.md)
- [3 研究方法](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/03-3_研究方法.md)
- [4 结果](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/04-4_结果.md)
- [5 讨论](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/05-5_讨论.md)
- [6 效度威胁](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/06-6_效度威胁.md)
- [7 结论](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/07-7_结论.md)
- [致谢](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/08-致谢.md)
- [References](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/09-References.md)
- [Appendix A 候选智能体语料库](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/10-Appendix_A_候选智能体语料库.md)
- [Appendix B 固定提交哈希](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/11-Appendix_B_固定提交哈希.md)
