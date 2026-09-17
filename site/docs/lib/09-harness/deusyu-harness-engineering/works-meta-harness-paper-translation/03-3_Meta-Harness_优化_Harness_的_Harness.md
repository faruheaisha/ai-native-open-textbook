---
title: "Harness Engineering 学习指南"
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
pageSha256: "6d099f7c44cf95b549cd284c8a2dbfc15128c2cf572ebba189656e07d430d94b"
contentMode: "local-full"
zh: ""
---

## 3 Meta-Harness：优化 Harness 的 Harness

本节描述 Meta-Harness，即我们用于搜索任务特定 Harness 的外循环程序。Meta-Harness 建立在这样一个理念之上：Harness 优化受益于允许提议器通过文件系统访问来选择性地检查先前代码和执行轨迹，而非从有损摘要或额外的手工设计搜索结构中进行优化。在高层面上，它反复提出、评估和记录新的 Harness。

Meta-Harness 本身在广义上也是一种 Harness（因此得名），因为它决定了提议器模型在搜索过程中看到哪些信息。除非另有说明，我们使用 *Harness* 指代正在被优化的任务特定程序。

**目标。** Harness 是一个有状态的程序，它包装语言模型并决定模型在每一步看到什么上下文。目标很简单：找到使底层模型在目标任务分布上表现最佳的 Harness。形式化地，设 M 为一个固定的语言模型，𝒳 为一个任务分布。对于 Harness H 和任务实例 x∼𝒳，我们执行一条 Rollout 轨迹 τ∼p_M(H,x)。Harness 为 M 构造提示，模型做出响应，Harness 在每次交互后更新其状态。一个任务特定的奖励函数（reward function）r(τ,x) 对该轨迹进行评分。Harness 优化的目标是找到使期望最终奖励最大化的 Harness：

$$
H^{*}=\operatorname*{arg\,max}_{H}\mathbb{E}_{x\sim\mathcal{X},\tau\sim p_{M}(H,x)}\;r(\tau,x),
$$

当存在多个目标（例如准确率和上下文代价）时，我们在 Pareto 支配关系下评估候选方案并报告由此产生的前沿。在实践中，这种搜索传统上由人类工程师和研究人员执行，他们手动迭代改进提示、上下文管理规则和工具使用逻辑。

**Meta-Harness 搜索循环。** Meta-Harness 使用单个编码智能体提议器，该提议器可以访问一个不断增长的文件系统 𝒟，作为其反馈通道 ^1^。这里，编码智能体是一个基于语言模型的系统，能够调用开发者工具并修改代码。与先前将改进逻辑外化到手工设计搜索循环中的系统不同，Meta-Harness 将诊断和提议委托给编码智能体本身：由它决定检查哪些先前制品、解决哪些失败模式，以及是进行局部编辑还是更大规模的重写。等价地说，提议器不是一个在由外循环组装的固定提示上运行的原始 next-token 模型；它是一个智能体，能够检索信息、浏览先前制品、并作为搜索过程的一部分来编辑代码。每个已评估的 Harness 贡献一个目录，包含其源代码、分数和执行轨迹（如提示、工具调用、模型输出和状态更新）。文件系统通常远大于提议器的上下文窗口，因此提议器通过终端工具（如 grep 和 cat）查询文件系统，而非将其作为单个提示来消化。在每次迭代中，提议器首先检查先前的代码、分数和执行轨迹，然后推理可能的失败模式，最后生成新的 Harness。

Meta-Harness 维护一个种群 ℋ 和已评估 Harness 上的 Pareto 前沿，但不施加父代选择规则：提议器在提出新 Harness 时可以自由检查任何先前的 Harness 及其执行轨迹。我们运行固定次数的演化迭代，并对 Pareto 前沿进行最终的测试集评估。这种简洁性是刻意为之的：通过将诊断和编辑决策留给提议器，而非硬编码搜索启发式规则，Meta-Harness 可以随着编码智能体能力的增强而自动改进。提议器永远不会看到测试集结果；其唯一反馈来自搜索集——即在搜索过程中用于评估候选 Harness 并为改进生成反馈信号的任务实例子集——以及这些搜索运行期间记录的执行轨迹。

**代码空间搜索的优势。** Harness 优化发生在代码空间中，其中检索、记忆或提示构造逻辑的微小变化可能在许多步骤之后才影响行为，使得局部搜索启发式方法与该问题匹配不佳。通过检查执行轨迹，提议器通常可以推断 Harness *为何*失败以及哪些早期设计选择可能导致了失败，而不仅仅是*它失败了*，正如 Appendices A 和 A.2 中的搜索轨迹所示。在那里，我们看到提议器广泛阅读先前的代码和日志，然后利用这些轨迹来识别混淆编辑、隔离可能的因果变化，并在反复回退后转向更安全的修改。因此，提议器可以在算法结构层面修改 Harness——从检索、记忆或提示构造逻辑的变更到完整的程序重写——而非填充模板或应用预定义的变异算子。在实践中，它通常从一个强大的先验 Harness 开始，但这是一种涌现策略而非硬编码规则。尽管搜索空间很大，但将 Harness 表示为程序提供了一种自然的正则化偏差：编码模型倾向于提出连贯的算法而非脆弱的硬编码解决方案，这使搜索偏向于可复用的上下文管理程序。这种动作空间与前沿编码助手所训练的读-写-执行工作流紧密对齐。

**实际实现。** 在我们的实验中，每个 Harness 是一个单文件 Python 程序，修改特定任务的提示、检索、记忆和编排逻辑。在我们的实验中，提议器 P 是配备 Opus-4.6 的 Claude Code [^4]。提议器由一个最小化的领域特定技能（skill）引导，该技能描述了在哪里写入新 Harness、如何检查先前 Harness 及其执行轨迹，以及哪些文件可以修改、哪些不可以。基础模型 M 因领域而异，始终保持冻结；详见 Section 4。在我们的实验中，典型的一次运行在 20 次迭代中大约评估 60 个 Harness。我们在 Appendix D 中提供了在新领域实现 Meta-Harness 的额外建议。

Algorithm 1 Meta-Harness Harness 外循环

输入：任务 𝒳，LLM M，提议器 P，迭代次数 N

初始化：种群 ℋ ▷ 有效 Harness 的初始集合

初始化：文件系统 𝒟 ← ∅ ▷ 存储代码、分数、轨迹

for H ∈ ℋ do

   E_H ← Evaluate(H, M, 𝒳)    𝒟 ← 𝒟 ∪ \{(H, E_H)\}

for t = 1…N do

  提议器 P 查询文件系统 𝒟 ▷ 检查先前 Harness 和分数

  提议器 P 提出 k 个新 Harness \{H₁, …, Hₖ\}

  for H in \{H₁, …, Hₖ\} do

   if H 通过接口验证 then

      𝒟 ← 𝒟 ∪ \{(H, Evaluate(H, M, 𝒳))\}

返回 𝒟 中存储的 Harness 的 Pareto 前沿
