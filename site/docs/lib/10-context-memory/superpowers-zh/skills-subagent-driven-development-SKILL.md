---
title: "子智能体驱动开发"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/skills/subagent-driven-development/SKILL.md"
sourceRel: "skills/subagent-driven-development/SKILL.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/skills/subagent-driven-development/SKILL.md"
sourceSha256: "0cb59782ed80022b18abb36a9a909692793fd38e77cad36f40787a0740a844b3"
pageSha256: "0cb59782ed80022b18abb36a9a909692793fd38e77cad36f40787a0740a844b3"
contentMode: "local-full"
zh: ""
---

# 子智能体驱动开发

通过为每个任务分派一个全新的实现子智能体来执行计划：每个任务完成后做一次任务审查（规格合规性 + 代码质量），全部任务结束后再做一次覆盖整个分支的宽范围审查。

**为什么用子智能体：** 你把任务委派给具有隔离上下文的专用智能体。通过精心设计它们的指令和上下文，确保它们专注并成功完成任务。它们绝不应继承你会话的上下文或历史记录——你要精确构造它们所需的一切。这样也能为你自己保留用于协调工作的上下文。

**核心原则：** 每个任务一个全新子智能体 + 任务审查（规格 + 质量）+ 结尾宽范围审查 = 高质量、快速迭代

**旁白：** 工具调用之间最多说一句简短的旁白——进度账本和工具结果本身就是记录。

**持续执行：** 不要在任务之间停下来向你的人类伙伴确认。不间断地执行计划里的所有任务。唯一该停下的理由是：你无法解决的 BLOCKED 状态、确实妨碍推进的歧义，或所有任务已完成。"我该继续吗？"之类的询问和进度小结都在浪费他们的时间——他们让你执行计划，那就执行。

**做裁决，不要停摆。** 一个正在跑的计划不等人。冲突、歧义、计划缺陷、你本来想申请突破的上限——你自己定。规格是有约束力的权威，计划是它的论证，两者都答不上来的部分由你的判断来定。每个决定都以 `Ruling: <你决定了什么> — <为什么> — <如果错了代价是什么>` 记进账本，然后继续。一个错误的裁决，代价是你人类伙伴看得见、也撤得掉的返工；一个停在问题上的会话，代价是他们的一整天，而且什么也换不来。

只有四件事会让你停下，也只有这四件：不可逆或破坏性的操作；涉及安全的动作；这个工作树之外、按惯例应当先问一声的副作用（合并、推送到共享分支、发布）；以及一个坏到每条前进路径都只能靠猜的计划。遇到这四类，停下来问。

## 何时使用

```dot
digraph when_to_use {
    "有实现计划?" [shape=diamond];
    "任务基本独立?" [shape=diamond];
    "留在当前会话?" [shape=diamond];
    "subagent-driven-development" [shape=box];
    "executing-plans" [shape=box];
    "手动执行或先头脑风暴" [shape=box];

    "有实现计划?" -> "任务基本独立?" [label="是"];
    "有实现计划?" -> "手动执行或先头脑风暴" [label="否"];
    "任务基本独立?" -> "留在当前会话?" [label="是"];
    "任务基本独立?" -> "手动执行或先头脑风暴" [label="否 - 紧密耦合"];
    "留在当前会话?" -> "subagent-driven-development" [label="是"];
    "留在当前会话?" -> "executing-plans" [label="否 - 并行会话"];
}
```

**与 Executing Plans（并行会话）的对比：**
- 同一会话（无上下文切换）
- 每个任务全新子智能体（无上下文污染）
- 每个任务后做审查（规格合规性 + 代码质量），结尾做宽范围审查
- 更快的迭代（任务间无需人工介入）

## 流程

```dot
digraph process {
    rankdir=TB;

    subgraph cluster_per_task {
        label="每个任务";
        "分派实现子智能体 (./implementer-prompt.md)" [shape=box];
        "实现者有疑问?" [shape=diamond];
        "回答问题，提供上下文" [shape=box];
        "实现者实现、测试、提交、自审" [shape=box];
        "生成审查包，分派任务审查者 (./task-reviewer-prompt.md)" [shape=box];
        "规格 ✅ 且质量通过?" [shape=diamond];
        "发现与计划原文冲突?" [shape=diamond];
        "对冲突作出裁决, 把裁决记进账本" [shape=box];
        "第 R/5 轮修复: R≤3 唤回原实现者; R≥4 换全新实现者 + 更强模型" [shape=box];
        "分派定向复审 (./re-review-prompt.md)" [shape=box];
        "所有发现都已解决?" [shape=diamond];
        "R = 5?" [shape=diamond];
        "逐条裁定未解决的发现" [shape=box];
        "存在承重的发现?" [shape=diamond];
        "裁决并继续; 只有每条路都靠猜时才停" [shape=box];
        "把发现连同裁定搁置进账本" [shape=box];
        "往账本追加完成行，标记待办完成" [shape=box];
    }

    "准备: 工作树、查账本、读计划、起飞前审查" [shape=box];
    "还有任务?" [shape=diamond];
    "分派最终代码审查者 (../requesting-code-review/code-reviewer.md)" [shape=box];
    "最终审查有发现? 一次修复分派、一次定向复审、裁定残留项" [shape=box];
    "最终审查干净: 删除本计划的工作区" [shape=box];
    "使用 finishing-a-development-branch" [shape=box style=filled fillcolor=lightgreen];

    "准备: 工作树、查账本、读计划、起飞前审查" -> "分派实现子智能体 (./implementer-prompt.md)";
    "分派实现子智能体 (./implementer-prompt.md)" -> "实现者有疑问?";
    "实现者有疑问?" -> "回答问题，提供上下文" [label="是"];
    "回答问题，提供上下文" -> "实现者实现、测试、提交、自审";
    "实现者有疑问?" -> "实现者实现、测试、提交、自审" [label="否"];
    "实现者实现、测试、提交、自审" -> "生成审查包，分派任务审查者 (./task-reviewer-prompt.md)";
    "生成审查包，分派任务审查者 (./task-reviewer-prompt.md)" -> "规格 ✅ 且质量通过?";
    "规格 ✅ 且质量通过?" -> "往账本追加完成行，标记待办完成" [label="是"];
    "规格 ✅ 且质量通过?" -> "发现与计划原文冲突?" [label="否"];
    "发现与计划原文冲突?" -> "对冲突作出裁决, 把裁决记进账本" [label="是"];
    "对冲突作出裁决, 把裁决记进账本" -> "第 R/5 轮修复: R≤3 唤回原实现者; R≥4 换全新实现者 + 更强模型";
    "发现与计划原文冲突?" -> "第 R/5 轮修复: R≤3 唤回原实现者; R≥4 换全新实现者 + 更强模型" [label="否"];
    "第 R/5 轮修复: R≤3 唤回原实现者; R≥4 换全新实现者 + 更强模型" -> "分派定向复审 (./re-review-prompt.md)";
    "分派定向复审 (./re-review-prompt.md)" -> "所有发现都已解决?";
    "所有发现都已解决?" -> "往账本追加完成行，标记待办完成" [label="是"];
    "所有发现都已解决?" -> "R = 5?" [label="否"];
    "R = 5?" -> "第 R/5 轮修复: R≤3 唤回原实现者; R≥4 换全新实现者 + 更强模型" [label="否 - 进入下一轮"];
    "R = 5?" -> "逐条裁定未解决的发现" [label="是 - 熔断触发"];
    "逐条裁定未解决的发现" -> "存在承重的发现?";
    "存在承重的发现?" -> "裁决并继续; 只有每条路都靠猜时才停" [label="是"];
    "存在承重的发现?" -> "把发现连同裁定搁置进账本" [label="否"];
    "把发现连同裁定搁置进账本" -> "往账本追加完成行，标记待办完成";
    "往账本追加完成行，标记待办完成" -> "还有任务?";
    "还有任务?" -> "分派实现子智能体 (./implementer-prompt.md)" [label="是"];
    "还有任务?" -> "分派最终代码审查者 (../requesting-code-review/code-reviewer.md)" [label="否"];
    "分派最终代码审查者 (../requesting-code-review/code-reviewer.md)" -> "最终审查有发现? 一次修复分派、一次定向复审、裁定残留项";
    "最终审查有发现? 一次修复分派、一次定向复审、裁定残留项" -> "最终审查干净: 删除本计划的工作区";
    "最终审查干净: 删除本计划的工作区" -> "使用 finishing-a-development-branch";
}
```

## 准备

确保工作发生在一个隔离的工作区里：用 using-git-worktrees 创建一个，或者核实已有的那个。没有你人类伙伴的明确同意，绝不在 main/master 分支上开始实现。

会话记忆无法在上下文压缩（compaction）中存活。在真实会话里，丢失了位置的控制者曾重新分派整段已经完成的任务序列——这是观察到的最昂贵的失败。把进度记在一个账本文件里，而不只是记在待办里。
