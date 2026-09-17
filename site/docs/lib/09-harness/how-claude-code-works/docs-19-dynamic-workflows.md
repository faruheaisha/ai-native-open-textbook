---
title: "第 19 章：Dynamic Workflows——用确定性脚本指挥 agent 舰队"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/19-dynamic-workflows.md"
sourceRel: "docs/19-dynamic-workflows.md"
rawUrl: "/raw/09-harness/how-claude-code-works/docs/19-dynamic-workflows.md"
sourceSha256: "715249518cb752c0b36fe5612be47e869be80297fca748cee4527954a186840d"
pageSha256: "715249518cb752c0b36fe5612be47e869be80297fca748cee4527954a186840d"
contentMode: "local-full"
zh: ""
---

# 第 19 章：Dynamic Workflows——用确定性脚本指挥 agent 舰队

> 第 8 章讲过 Claude Code 的多 Agent：主 Agent 派子 Agent、协调器分派 worker、Swarm 点对点。但那几种编排有个共同点——谁来派、何时派、何时收，都是模型在推理里临场决定的。碰到真正的大活（把一个改动铺到几十个文件、审一整条依赖链、对一大批候选逐一核实），你想要的不是"让模型边想边调度"，而是一套确定性的编排：一段脚本一次性铺开几十到几百个 subagent，带并发上限、token 预算、断点续跑。这就是 Dynamic Workflows，触发词 `ultracode`。
>
> 这一章的主证据是 Workflow 这个工具的描述——那是一段注入主模型、教它"怎么写一个 workflow 脚本"的说明。它就在运行时注入给模型的工具集里，其中的关键句子（并发上限、item 上限、agent 总数上限的原话）在 2.1.201 的二进制里能逐字对上，所以我们手里这份就是它的原文。加上二进制里泄露的运行时常量和一族遥测事件，这一章能落到相当实的地方；至于某一次 workflow 具体怎么分支收敛，那写在脚本里、由模型现写，属于拿不到的部分，后面会讲清楚。

## 19.1 两种编排：模型当协调器，还是脚本当协调器

先接上第 8 章。那一章的三种多 Agent 模式——子 Agent、协调器、Swarm——本质都是模型驱动的编排：由主模型或协调器在每一轮推理里决定"现在派谁去、拿到结果后怎么综合"。协调器那节讲的"提示词设计精要"，讲的就是怎么用提示词引导模型把这个调度judgment 做好。
