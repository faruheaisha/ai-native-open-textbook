---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "cd3224690da3227633b7ed306c54a7291faf5d388c1df32669714a55dbea8386"
contentMode: "local-full"
zh: ""
---

## Q：LLaMA-Factory 和 TRL 等 SFT / RL 工具如何对比和选型？

> 来源：[MiniMax 大模型算法岗一面](https://www.nowcoder.com/discuss/926272883872075776)

**新手答**：“LLaMA-Factory 配置简单，TRL 更灵活；做 SFT 用前者，做 RL 用后者。”

**高手答**：两者不是按算法阶段互斥。当前 [LLaMA-Factory 官方仓库](https://github.com/hiyouga/LlamaFactory)强调统一训练入口、模型/数据模板、参数高效微调、量化和可视化配置，适合需要快速覆盖多模型与复现实验配方的团队；[TRL 官方文档](https://huggingface.co/docs/trl/index)提供围绕 Transformers 的 SFT、偏好优化与强化学习 Trainer，适合直接扩展数据 Collator、Reward、Trainer Loop 和研究算法。具体支持列表会变化，选型必须绑定版本验证。

我会先比较数据与模板契约、目标算法是否原生支持、分布式后端、显存优化、断点恢复、评测/日志、扩展点和团队维护能力，再跑同一小数据集的 smoke test。无论选哪个，都要检查 chat template、special token、loss mask、packing、梯度累积和 checkpoint 能否一致；“命令能跑”不代表两套实现训练语义相同。

生产上可以用 LLaMA-Factory 管标准化批量配方，用 TRL 承载需要改 Trainer 的实验，但要共享数据版本、模型制品、评测集和实验追踪。若二次封装过深，升级成本和行为漂移可能超过框架带来的便利，因此还要评估退出路径。

**差距在哪**：新手按“易用 / 灵活”贴标签，高手按训练语义、扩展边界、可复现性和团队生命周期做条件化选择。
