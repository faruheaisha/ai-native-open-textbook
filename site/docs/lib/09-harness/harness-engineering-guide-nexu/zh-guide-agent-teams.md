---
title: "Agent Teams：并行 Claude 打造真实软件"
sourceId: "09-harness/harness-engineering-guide-nexu"
sourceTitle: "Harness Engineering 指南（nexu.io）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/nexu-io/harness-engineering-guide"
entryUrl: "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh-guide/agent-teams.md"
sourceRel: "zh-guide/agent-teams.md"
rawUrl: "/raw/09-harness/harness-engineering-guide-nexu/zh-guide/agent-teams.md"
sourceSha256: "b59a7f0e04ae79a24c3c096dd8141574b52674913b896dd14e0fccd9556b1182"
pageSha256: "b59a7f0e04ae79a24c3c096dd8141574b52674913b896dd14e0fccd9556b1182"
contentMode: "local-full"
zh: ""
---

# Agent Teams：并行 Claude 打造真实软件

大多数 Agent 演示看起来令人印象深刻，但毫无用处。一个 to-do list 应用。一个待办爬虫。一个把三个网页总结一下的"个人研究助手"。

然后有人把 16 个 Claude 接进一个循环，它们构建了一个可以编译 Linux 内核的 C 编译器。

本文讲的就是第二件事——具体来说，它底层的 Harness 长什么样。我们会沿着 Nicholas Carlini 项目 *"Building a C compiler with a team of parallel Claudes"*（[Anthropic Engineering](https://www.anthropic.com/engineering/building-c-compiler)，[GitHub](https://github.com/anthropics/claudes-c-compiler)）的架构走一遍，抽出真正起作用的设计原则，并把它们翻译成你可以在自己 Harness 里复用的模式。

---

## Core Insight

> **16 个 Claude 实例，并行运行约两周，生产出了一个用 Rust 写的 10 万行 C 编译器。它在 x86、ARM 和 RISC-V 上都能编译 Linux 6.9。它通过了 GCC torture test suite 99% 的测试。它能编译 QEMU、FFmpeg、SQLite、Postgres 和 Redis。**

再读一遍。再读一遍。

这不是玩具。这是一个真实的产品级编译器，由一个 LLM 团队在比人类团队能容忍的更严苛的约束下写出来：没有互联网访问，没有现成的 compiler crate，不能从 LLVM 或 tcc 抄代码——只有 Rust 标准库，以及 Claude 从 C 规范和它的训练里能推理出的东西。由 Agent 做的一次洁净室实现。

有意思的问题不是"LLM 能不能写编译器"。我们已经知道它能写*其中一部分*。有意思的问题是：

**什么样的 Harness，能把 16 个无状态、健忘的 LLM 调用，变成一支能交付 10 万行代码的连贯工程团队？**

---

## 项目成绩单

在我们深入架构之前，这里是账本：

```
┌─────────────────────────────────────────────────────────────┐
│  Parallel Claudes:     16                                   │
│  Total sessions:       2,000+                               │
│  Wall-clock time:      ~2 weeks                             │
│  API cost:             ~$20,000                             │
│  Human code written:   ~0 lines (harness + prompts only)    │
│  Lines of Rust:        ~100,000                             │
│                                                             │
│  Torture-test pass:    99% (GCC torture suite)              │
│  Self-hosts Linux:     ✅ 6.9 on x86 / ARM / RISC-V         │
│  Also compiles:        QEMU, FFmpeg, SQLite, Postgres,      │
│                        Redis                                │
│                                                             │
│  Net-access for agent: ❌ none                              │
│  External crates:      ❌ std lib only                      │
└─────────────────────────────────────────────────────────────┘
```

按业余爱好者的标准，2 万美元的 C 编译器很贵；按编译器团队的标准，便宜得可笑。一个两人的编译器创业公司在三个工作日里就能烧掉 2 万美元。

---

## Ralph-Loop 架构

Harness 的核心尴尬地简单。每个 Agent 都是一个 bash 循环：

```bash
#!/usr/bin/env bash
# agent.sh — run inside a Docker container
while true; do
  claude --dangerously-skip-permissions -p AGENT_PROMPT.md
done
```

就这样。这就是整个 Agent。

没有 Orchestrator。没有任务队列守护进程。没有 Scheduler。没有 Message Bus。当一个 Claude session 结束——成功、失败、或者 Context Window 崩塌——循环就用同一个 Prompt 文件启动一个新的 Claude。Prompt 告诉新的 Claude：去看看仓库，想清楚下一步该做什么，然后去做。

这种风格有时被称为 "Ralph-Loop"（取自 Ralph Wiggum 的 "I'm helping!"）：一个笨笨的外层循环不停地踢一个聪明的内层进程，直到工作完成。

唯一的管理员级干预是：

```bash
# kill the fleet
pkill -9 bash
```

这就是整个关闭协议。没有 graceful drain，没有"请完成你当前的任务"。你 SIGKILL 掉那些 bash 循环，Agent 就在思考一半时死掉。下次你启动它们时，它们会从 `git pull` 留下的位置继续。

### 为什么这能 work

Ralph-Loop 是 Agent 工作的正确形状，有三个原因：

1. **LLM 在不同 session 之间本来就是无状态的。** 假装它们是长期运行的进程，只会把 Context Window 的崩塌藏在越来越绝望的小把戏后面。
2. **重启是免费的。** 一个新的 Claude 去读仓库，比一个已经用 3 小时失败实验填满 Context 的 stale Claude 更便宜。
3. **失败隔离是免费的。** 如果一个 session 跑偏了，下一个 session 不会继承那些废墟——它继承的是 git 状态，那是唯一的真相来源。

---

## 基于 git 的协调（没有 Orchestrator）

这里是大多数人会惊讶的部分：**没有中心 Orchestrator。** 没有东西在分发任务。没有东西知道谁在做什么。没有写着"agent-7 目前在处理 struct-packing"的仪表盘。

相反，舰队通过两个原语协调：

1. 一个 **bare git repo**，每个容器都往里 push 和从里 pull。
