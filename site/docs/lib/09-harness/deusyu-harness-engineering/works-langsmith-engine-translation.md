---
title: "我们如何构建 LangSmith Engine：一个用于改进智能体的智能体"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/langsmith-engine-translation.md"
sourceRel: "works/langsmith-engine-translation.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/works/langsmith-engine-translation.md"
sourceSha256: "0f0519d52bde3bbbf8476af02a86cc1705463e15a262c37c416b0dbead0f1b2c"
pageSha256: "0f0519d52bde3bbbf8476af02a86cc1705463e15a262c37c416b0dbead0f1b2c"
contentMode: "local-full"
zh: ""
---

# 我们如何构建 LangSmith Engine：一个用于改进智能体的智能体

[![LangSmith Engine 文章首图](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cab710767bbc0f61dc9_Screenshot%202026-05-19%20at%208.05.40%E2%80%AFAM.png)](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cab710767bbc0f61dc9_Screenshot%202026-05-19%20at%208.05.40%E2%80%AFAM.png)

上周我们发布了 LangSmith Engine。Engine 是一个位于你的智能体 trace 之上的智能体：它发现重复出现的问题，并建议下一步该做什么。

这篇文章会深入介绍我们如何构建它：为什么要构建 Engine，它处理哪些输入和输出，以及哪些架构决策让它能够分析大量 trace。

## 为什么构建 Engine

LangSmith 是智能体改进循环的家。构建、测试、部署和监控，是驱动智能体开发的四个支柱。

随着你部署的智能体数量增加，它们生成的 trace 数量也会增加。结果是，你会花越来越多时间梳理 trace，弄清楚智能体在哪里出错。

基础工具错误相对容易捕捉。整体轨迹也可以从 trace 视图中看到。但许多智能体问题很难发现，除非你逐条 trace 做细粒度检查：

- 智能体在同样的工具调用中循环。
- 它使用了错误的工具参数。
- 它执行效率低。
- 它漏掉了本应使用的工具。
- 它在不同运行（run）中反复失败于同一种请求。

在 LangChain 内部遇到这个问题后，我们开始构建 LangSmith Engine。

Engine 有三个任务：

1. 在 trace 中发现重复失败。
2. 把这些失败转化为可行动的 issue。
3. 把这些 issue 转化为持久改进：评测器、数据集样本和修复。

Engine 本身就是一个智能体：一个使用专门组件端到端运行改进循环的编排器。它拉取 trace，在连接了仓库时读取代码，把失败归类成 issue，提出评测器和数据集样本，并随时间更新它对你的智能体的理解。

[![LangSmith Engine 从 trace 中发现问题并提出改进](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cc1e8a99f7c78059582_Screenshot%202026-05-19%20at%208.05.26%E2%80%AFAM.png)](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cc1e8a99f7c78059582_Screenshot%202026-05-19%20at%208.05.26%E2%80%AFAM.png)

## Engine 产出什么：issue

Engine 的核心产物是 issue。

一个 issue 是一种重复失败模式，有证据 trace 支撑，并带有建议的后续动作。Issue 会在 Issue Board（问题看板）中呈现给用户：它是一组 Engine 在追踪项目中发现的问题列表。

一个 issue 包含：

- **名称（Name）：** issue 标题。
- **描述（Description）：** 对 issue 的段落式描述。
- **类别（Category）：** 预定义智能体失败类别之一。
- **严重程度（Severity）：** low、medium 或 high。
- **证据 trace（Traces）：** 与 issue 相关、能提供发生证据的 trace。
- **建议动作（Proposed actions）：** 防止 issue 再次发生的建议下一步。
- **标签（Tags）：** 用于驱动后续工作流的元数据，例如 `needs_fix`。

建议动作可以包括：

- **建议的在线评测器（Proposed online evaluator）：** 如果 issue 再次发生，会标记它的评测器。
- **建议的数据集样本（Proposed dataset examples）：** 加入离线数据集的样本，代表这个 issue。
- **建议的修复（Proposed fix）：** 修复底层问题的代码或 prompt 变更。

关键在于，Engine 不只是指向一条坏 trace。它试图把生产失败转化为你的团队未来可以行动和测试的东西。

## Engine 消费什么

Engine 接收或能够获取四类主要输入。

###### 指令（Instructions）

Engine 由 Agent Overview 引导。这类似于一个 `AGENTS.md` 文件：它是一份活的说明，描述你的智能体做什么、应该期待什么 trace 结构、需要关注哪些失败模式，以及你的团队表达过哪些偏好。

第一次运行会由上手引导（onboarding）回答和项目上下文启动。在初始运行期间，Engine 分析 trace，并使用学到的内容创建第一版 Agent Overview。后续运行中，Agent Overview 会成为 Engine 读取并更新的持久输入。

你也可以随时手动编辑 Agent Overview。

###### 轨迹数据（Traces）

Engine 通过 LangSmith CLI 从相关 LangSmith 追踪项目拉取 trace。

完整 trace 包括一次智能体运行（run）的消息和轨迹。为了扩展，Engine 并不总是一开始就加载每条 trace 的完整内容。它通常从紧凑的轨迹摘要开始，然后只在某条 trace 需要更深入调查时，有选择地加载完整 trace 内容。

###### 现有 issue（Existing issues）

Engine 会获取当前 Issue Board，包括开放 issue 和之前关闭的 issue。

这让 Engine 能看到项目当前状态。它可以避免重复创建已知 issue，把证据添加到既有 issue，并理解哪些内容已经被解决或关闭。

###### 代码库（Codebase，可选）

你可以选择把 Engine 连接到代码库。这让 Engine 能更精确地诊断问题，并启用一个独立的修复智能体来提出变更。

如果连接了仓库，仓库会被检出到沙箱中。设置期间，你可以指定 Engine 应该使用哪个分支或子目录。

## Engine 更新什么

Engine 运行时可以更新几个输出。

###### Issue Board

Engine 的主要角色是更新 Issue Board。它可以创建新 issue、更新现有 issue、附加证据 trace、修改 issue 元数据。

对于每个 issue，Engine 可以提出一个评测器，用来在未来 trace 中捕捉同一模式。它还可以根据证据 trace 提出回归样本，让生产中观察到的失败变成离线测试覆盖。它也可以建议 prompt 或代码变更来修复底层问题。

###### Agent Overview

Engine 可以记录它发现的内容，并更新 Agent Overview 供未来运行使用。

这就是 Engine 随时间记住项目特定信息的方式：常见失败模式、trace 模式、工具行为和用户偏好。

## 高层架构

Engine 构建在 Deep Agents 之上，并连接到一个沙箱，在那里它可以写文件、检查 trace、执行代码，并处理已经检出的仓库。

[![LangSmith Engine 架构概览](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cab710767bbc0f61dc9_Screenshot%202026-05-19%20at%208.05.40%E2%80%AFAM.png)](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cab710767bbc0f61dc9_Screenshot%202026-05-19%20at%208.05.40%E2%80%AFAM.png)

在高层，Engine 由以下部分驱动：

- **系统 prompt 和指令：** 包括 Agent Overview。
- **沙箱：** Engine 工作的环境。
- **LangSmith CLI：** Engine 用来获取数据并把更新推回 LangSmith 的主要接口。
- **自定义工具：** 尤其是测试评测器和提出回归样本的工具。
- **子智能体：** 用来筛查 trace，并调查可能的问题，而不会撑爆主智能体上下文。
- **记忆：** 通过 Agent Overview 维护，并根据用户动作更新。

本文剩余部分会走过核心循环：

1. 准备智能体上下文。
2. 大规模筛查 trace。
3. 调查可能的 issue。
4. 创建 issue、评测器和数据集样本。
5. 需要时把修复交接给独立智能体。
6. 为下一次运行更新记忆。

## 1\. 准备智能体上下文

在 Engine 能分析 trace 之前，它需要一个工作环境，以及足够理解被检查智能体的上下文。

### 沙箱设置

Engine 连接到沙箱运行。我们使用 LangSmith Sandboxes。

运行 Engine 之前，我们会设置智能体环境。首先，我们拉取基础 Engine Docker 镜像。这个镜像包含所需库和 LangSmith CLI，Engine 用它与 LangSmith 数据交互。

如果 Engine 连接到了 GitHub 仓库，我们也会拉取相关代码产物（artifact）。用户可以在设置时指定要使用哪个分支或子目录。

沙箱很重要，因为 Engine 经常需要检查 trace 数据、写中间文件、测试评测器代码，并迭代建议输出。给智能体一个受控工作环境，可以让这个工作流可靠得多。

### Agent Overview

Agent Overview 既是指令文件，也是记忆层。

设置 Engine 时，你会回答一组基础的上手引导（onboarding）问题。Engine 使用这些回答，以及它在第一次运行中发现的内容，创建初始 Agent Overview。

这份 Agent Overview 帮助 Engine 维护一份连续记录：

- 你的智能体做什么。
- 应该期待什么 trace 结构。
- 需要关注哪些常见陷阱。
- 项目特定上下文。
- 用户偏好。

Engine 会在连续运行中读取并更新这个文件。

### LangSmith CLI

Engine 与 LangSmith 交互的主要方式是 LangSmith CLI。

大多数情况下，相比为每个 LangSmith 操作创建一个自定义工具，我们更偏好这种方式。CLI 为 Engine 提供了一个通用接口，用来拉取 trace、查询 issue、创建 issue、附加 trace、更新 issue 元数据，并提出产物（artifact）。

它也让 Engine 更容易调试和复现。CLI 是同一个可下载接口，也可以交给本地编码智能体使用。如果 Engine 通过 CLI 做了某件事，通常也可以在 Engine 之外理解并复现这个操作。

## 2\. 大规模筛查 trace

构建 Engine 最大的架构挑战是 trace 量。

让一个智能体一次调查和整理 50 条 trace 相对容易。但当我们把系统连接到生产智能体后，在这个量级可行的技术开始失效。生产项目在一个回看窗口中可能有几千甚至几万条 trace。

把所有完整 trace 内容加载进主智能体上下文不可行。即使是 10 条长时间运行智能体的 trace，也可能包含数百次工具调用和消息。

所以我们把问题拆成两个阶段：

1. 宽筛阶段，快速识别可疑 trace。
2. 深入调查阶段，只为可能重要的 trace 加载完整上下文。

[![LangSmith Engine 的 trace 筛选和深入调查流程](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7ce1e5b1d0aaeb6996c9_Screenshot%202026-05-19%20at%208.05.58%E2%80%AFAM.png)](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7ce1e5b1d0aaeb6996c9_Screenshot%202026-05-19%20at%208.05.58%E2%80%AFAM.png)

### 轨迹格式

为了让筛查成为可能，我们需要每条 trace 的压缩表示。

问题是：

如何压缩 trace 中的信息，同时保留导航回 trace 所需的信息？

答案是智能体轨迹：trace 的紧凑骨架。

[![智能体轨迹的紧凑骨架格式](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cec8be3af470cc3b7dc_Screenshot%202026-05-19%20at%208.06.23%E2%80%AFAM.png)](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a0c7cec8be3af470cc3b7dc_Screenshot%202026-05-19%20at%208.06.23%E2%80%AFAM.png)

一条轨迹每轮有一个条目，包含角色、可选工具名、延迟和内容大小。它不包括完整内容。

```bash
{ role: "human", chars: 142 }

{ role: "ai", latency_ms: 1820, chars: 89 }

{ role: "tool", tool_name: "search_db", latency_ms: 340, chars: 2100 }

{ role: "tool", tool_name: "search_db", latency_ms: 312, chars: 1980 }

{ role: "tool", tool_name: "search_db", latency_ms: 298, chars: 2040 }

{ role: "ai", latency_ms: 2100, chars: 210 }
```

轨迹充当导航工具。它让筛查器能快速发现可疑形状，然后在完整 trace 周围 grep，只把需要的信息加载进上下文。

### 筛查子智能体

核心筛查问题是：

给定这条 trace，其中是否存在值得进一步调查的 issue？

Engine 使用一个专门的筛查子智能体来做这件事。筛查器是一个基于 Haiku 的子智能体，主智能体会把它分派到每组约 20 条 trace 上。

筛查器的工作刻意保持狭窄。它不创建 issue。它不诊断根因。它只是在表层判断一条 trace 是干净的，还是可能包含 issue。

筛查器会向主智能体返回结构化响应。响应中每条被标记的 trace 占一行，包含 trace ID、类别和一句简短原因，最后跟上干净 trace 的数量。

```bash
