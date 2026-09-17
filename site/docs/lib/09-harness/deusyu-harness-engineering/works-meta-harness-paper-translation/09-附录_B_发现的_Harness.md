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
pageSha256: "16ce70f8f04e6f6268c3cc0b9bd3d945dd614a71050c0e5f6ed589479a058073"
contentMode: "local-full"
zh: ""
---

## 附录 B 发现的 Harness

Meta-Harness 发现的是特定于当前问题设置的可执行推理时程序。这些 Harness 是结构化的、领域特定的策略，通常具有非平凡的控制流（如路由、过滤和条件性上下文构造），仅通过是否改进搜索集性能来进行选择。本节呈现代表性 Harness 的紧凑方法级抽象，总结驱动推理时行为的主要行为和控制流决策。作为参考，每个发现的 Harness 的完整实现大约为 100-1000 行代码。

### B.1 文本分类 Harness

在在线文本分类中，Meta-Harness 发现了一系列基于记忆的 Harness，而非单一的规范策略。Table 9 报告了主搜索中非支配变体的 Pareto 前沿，所有变体均仅通过搜索集性能进行选择。我们在此重点介绍两个代表性端点：Meta-Harness (Draft Verification)——最低上下文的前沿点，以及 Meta-Harness (Label-Primed Query)——正文中使用的最高准确率前沿点。

#### 概述。

两种 Harness 都维护一个不断增长的过去带标签样本的记忆，并在推理时从该记忆中构建提示。区别在于用于查询记忆的控制流。Meta-Harness (Draft Verification) 使用两次简短调用，明确地将模型的初始猜测与检索到的反例进行测试；而 Meta-Harness (Label-Primed Query) 将更大的单次调用预算用于明确标签空间和局部决策边界。Figures 5 和 6 总结了这两个程序。

#### Meta-Harness（草稿验证）

对应的发现文件为 draft\_verification.py。这一轻量变体将预测转化为两次调用的过程。它首先检索 5 个最相似的已标注样本并进行草稿预测（draft prediction）。随后基于该草稿标签重新查询同一记忆库，检索 5 个具有相同标签的*确认样本*（confirmers）和 5 个具有不同标签的*挑战样本*（challengers），并询问模型是否维持或修正其初始答案。该方案发现的关键行为是：第二次检索同时依赖于查询和草稿预测，因此 Harness 能够针对模型当前猜测浮现有针对性的反例，而非仅仅是通用的近邻样本。如果累积的已标注样本数量不足，程序将回退为标准的单次调用少样本提示（few-shot prompt）。

Figure 5：草稿验证分类 Harness。第一次调用根据短检索上下文产生草稿标签。第二次调用检索支持和反对该草稿的证据，然后返回最终预测。

- 阶段 1：草稿。检索 5 个最近邻的已标注样本，请求初始预测。
- 阶段 2：验证。基于草稿标签进行条件检索，然后同时展示支持和挑战性样本，再做出最终预测。
- 冷启动。如果可用的已标注样本少于 5 个，跳过两阶段流程，使用标准的单次调用少样本提示。
- 低成本原因。两次调用均使用短检索上下文，因此即使进行两次模型调用，整体上下文开销仍接近前沿方案的低端水平。

#### Meta-Harness（标签引导查询）

对应的发现文件为 label\_primed\_query\_anchored.py。这一最强变体使用由三部分构建的单次较大调用。它首先以*标签引导*（label primer）列出有效的输出标签，然后构建一个*覆盖*（coverage）部分——每个标签包含一个与查询相关的示例，最后添加*查询锚定的对比对*（query-anchored contrastive pairs），将高度相似但标签不同的示例并排放置。覆盖模块暴露了完整的标签空间，而对比模块则锐化了当前查询周围的局部决策边界。在代码实现中，该 Harness 使用 TF-IDF 检索过往已标注样本，并采用查询锚定的配对规则从相同的局部邻域中选取对比样本。

Figure 6：标签引导查询锚定分类 Harness。该程序构建一个暴露标签空间的单一提示，然后用与查询相关的覆盖示例和局部对比对填充。

- 标签引导。在展示任何示例之前先列出有效的输出标签，使模型预先看到完整的答案空间。
- 覆盖模块。对每个已知标签，检索与查询最相关的已标注样本，每个类别包含一个代表性示例。
- 对比模块。构建高度相似但标签不同的示例对，使提示暴露当前查询附近的局部决策边界。
- 检索规则。使用 TF-IDF 相似度和查询锚定的配对选择，而非标签无关的最近邻方法。

|  | 数据集 |  |  | 平均指标 |  |
| --- | --- | --- | --- | --- | --- |
| 变体 | USPTO ↑ | Symptom ↑ | LawBench ↑ | Avg ↑ | Ctx ↓ |
| Meta-Harness (Draft Verification) | 18.0 | 85.4 | 17.0 | 40.1 | 5.4 |
| Meta-Harness (Error-Annotated) | 9.0 | 87.7 | 24.0 | 40.2 | 22.3 |
| Meta-Harness (CoT Replay) | 13.0 | 88.2 | 25.0 | 42.1 | 23.3 |
| Meta-Harness (Cluster Coverage) | 12.0 | 86.8 | 33.0 | 43.9 | 31.2 |
| Meta-Harness (Cascade Retrieval) | 12.0 | 86.8 | 36.0 | 44.9 | 39.2 |
| Meta-Harness (RRF + Contrastive) | 18.0 | 89.6 | 35.0 | 47.5 | 41.4 |
| Meta-Harness (Relevance + Contrastive) | 18.0 | 90.6 | 36.0 | 48.2 | 43.9 |
| Meta-Harness (Label-Primed Query) | 14.0 | 86.8 | 45.0 | 48.6 | 45.5 |

Table 9：主文本分类搜索中发现的帕累托最优变体，在平均准确率和上下文开销之间进行权衡。正文中选定的系统为 Meta-Harness (Label-Primed Query)。Ctx 表示输入上下文中额外字符的平均数量（单位：千字符）。

![Refer to caption](https://arxiv.org/html/2603.28052v1/figures/val_vs_test_by_dataset.png)

Figure 7：各数据集上搜索集与测试集准确率的对比。每个粉色点代表一个发现的策略；基线（Baseline）已标注。虚线对角线为 y=x。

### B.2 数学检索 Harness

本小节描述 Meta-Harness 为数学推理（第 4.2 节）发现的检索 Harness。最终的 Harness 是一个紧凑的四路由 BM25 程序，其结构通过搜索涌现而非事后手动指定。以下所有设计选择——路由谓词、重排序项、去重阈值和每条路由的示例数量——均由外循环在 40 轮进化迭代中选定。

#### 概述

在推理时，该 Harness 将每个问题精确分配到四条路由之一：组合数学、几何、数论，或用于代数及其他问题的默认路由。路由门（gates）实现为对问题陈述的轻量级词法谓词（lexical predicates），包括关键词集合和少量用于几何符号的正则表达式特征。该 Harness 不跨路由聚合输出：一旦选定某条路由，仅该路由为最终提示检索示例。所有路由均使用 BM25 作为底层检索机制，检索范围为上述经过筛选的语料库。BM25 索引使用数学感知的分词器（math-aware tokenizer），将 LaTeX token（如 \\frac, ˆ\{2\}）作为原子单元保留。选定的 Harness 是两条成功搜索谱系的合并，由提议器（Proposer）在搜索过程中自主组合：一条贡献了基于原始 BM25 的更强几何路由，另一条贡献了基于去重和难度重排序的更强组合数学路由。Figure 8 给出了最终程序的紧凑流程图。

Figure 8：发现的数学检索 Harness。词法路由器将每个查询分配到四个学科专属检索策略之一。选定的策略检索示例，并将其插入最终提示中。

- 组合数学：获取 20 个 BM25 候选项，去重至 8 个，按词法分数和难度重排序，然后返回前 3 个。这是 Harness 显式权衡多样性与高难度问题匹配的主要路由。
- 几何：返回 1 个高难度 NuminaMath 参考题和 2 个原始 BM25 近邻。搜索过程中一致地偏好原始结构匹配而非难度重排序。
- 数论：获取 12 个 BM25 候选项，使用词法分数、难度和对在解答开头就陈述解题技巧的解答给予小额加分进行重排序。这有利于选取证明策略明确的示例。
- 默认：获取 10 个 BM25 候选项，按词法分数和难度重排序，并根据检索分数的集中程度自适应地选择示例数量。

### B.3 TerminalBench-2 Harness

发现的 TerminalBench-2 Harness 基于 Terminus-KIRA [^24] 构建，继承了其原生工具调用（取代 Terminus 2 基于 ICL 的 JSON 解析）、30KB 输出上限和多视角完成检查清单。Meta-Harness 发现的主要修改是环境引导（environment bootstrapping）：在智能体循环开始之前，Harness 运行一条复合 shell 命令来收集沙箱环境的快照，并将其注入初始提示中。提议器的假设——逐字记录自搜索日志——如下：

> Hypothesis: ''Injecting an environment snapshot (OS, installed languages, package managers, /app contents) before the first LLM turn will reduce wasted exploration episodes by 3--5 turns on dependency-heavy tasks'' Changes: ''Added _gather_env_snapshot() that runs a single compound shell command to collect working directory, /app listing, available languages (python, gcc, node, java, rustc, go), package managers (pip, apt) […] and injects as [Environment Snapshot] block''

该快照包含：工作目录、/app 的文件列表（大目录截断为 20 个条目）、可用的编程语言及其版本（Python、GCC、G++、Node、Java、Rust、Go）、已安装的包管理器（pip、apt-get），以及可用内存。这消除了智能体通常需要花费 2-4 轮探索性回合来发现可用工具和文件的过程，使模型能够立即开始有效工作。引导命令受 15 秒超时保护且静默失败，因此不会在异常环境中导致智能体崩溃。完整实现在 Terminus-KIRA 基础上增加了约 80 行代码。Figure 9 总结了 Harness 的结构。

#### 逐任务分析

与 Terminus-KIRA 相比，发现的 Harness 在 89 个任务中的 7 个上取得了提升，最大的改进出现在 protein-assembly 和 path-tracing 任务上。取得提升的任务有一个共同特征：它们需要特定领域的工具链，而这些工具链的可用性无法提前假定（生物信息学库、渲染管线、国际象棋引擎、密码学工具、CoreWars 模拟器）。没有引导机制时，智能体会在前 2-4 轮探测环境；在回合预算紧张或早期错误假设会产生级联效应的任务上，这些浪费的回合可能就是通过与失败之间的差距。这表明引导机制在环境不明显、且任务要求智能体根据实际安装的工具匹配策略时价值最大。

Figure 9：发现的 TerminalBench-2 Harness。该 Harness 继承了 Terminus-KIRA 的原生工具调用、输出上限和完成检查清单（绿色部分）。环境引导（红色部分）是 Meta-Harness 发现的组件：它在智能体循环开始前收集沙箱快照，消除了早期探索性回合。
