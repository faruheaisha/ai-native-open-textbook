---
title: "训练、数据与模型优化：从数据清洗到 LoRA"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "b1b15064166be8c9fc15b72f4221514f973f896dc717c51dbb78a429208baa6a"
contentMode: "local-full"
zh: ""
---

# 训练、数据与模型优化：从数据清洗到 LoRA

Agent 岗位面试不只考“会不会用 Agent”，还考**“Agent 背后的模型是怎么训出来的”**。数据怎么洗、训练集怎么构造、微调用什么方法、对齐算法怎么选——这些问题考的是你对 Agent 全链路的理解深度。

---

## 本篇目录

- [数据工程与清洗](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-数据工程与清洗.md)
- [微调与对齐训练](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-微调与对齐训练.md)
- [Transformer 基础](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-Transformer_基础.md)
- [模型能力与部署](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-模型能力与部署.md)
- [注意力机制与复杂度](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-注意力机制与复杂度.md)
- [训练策略与实践](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-训练策略与实践.md)
- [Q：超长上下文是怎么实现的？（如 Kimi 这类模型）](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_超长上下文是怎么实现的_如_Kimi_这类模型.md)
- [Q：Agent 在细分场景（比如法律、医疗）落地时，微调策略和通用场景有什么不同？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_Agent_在细分场景_比如法律_医疗_落地时_微调策略和通用场景有什么不同.md)
- [微调 vs Prompt 做代码生成](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-微调_vs_Prompt_做代码生成.md)
- [模型参数大小与 Agent 能力](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-模型参数大小与_Agent_能力.md)
- [Rerank 模型蒸馏](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Rerank_模型蒸馏.md)
- [BERT 与 GPT 架构对比](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-BERT_与_GPT_架构对比.md)
- [为什么大模型都是 Decoder-only](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-为什么大模型都是_Decoder-only.md)
- [训练 AI Coding Agent 的策略](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-训练_AI_Coding_Agent_的策略.md)
- [Agent 奖励函数设计](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Agent_奖励函数设计.md)
- [Q：训练后量化的完整流程是什么？粒度、校准方法和离群值如何共同影响精度？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_训练后量化的完整流程是什么_粒度_校准方法和离群值如何共同影响精度.md)
- [Q：GPTQ、AWQ、SmoothQuant 与 AdaQuant 的核心思路有什么不同？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_GPTQ_AWQ_SmoothQuant_与_AdaQuant_的核心思路有.md)
- [Q：Tool-use SFT 训练时，长轨迹采用截断、切分还是掩码？如何避免破坏工具依赖关系？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_Tool-use_SFT_训练时_长轨迹采用截断_切分还是掩码_如何避免破坏.md)
- [Q：为什么 Step-level SFT 之后再进行 GRPO，通常比直接从基座模型开始做 GRPO 稳定？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-Q_为什么_Step-level_SFT_之后再进行_GRPO_通常比直接从基座.md)
- [Q：GRPO 中相对奖励是如何计算的？同一组奖励方差接近零时如何处理？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/20-Q_GRPO_中相对奖励是如何计算的_同一组奖励方差接近零时如何处理.md)
- [Q：Tool-use 轨迹长度与任务复杂度有什么关系？训练数据应如何分布？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/21-Q_Tool-use_轨迹长度与任务复杂度有什么关系_训练数据应如何分布.md)
- [Q：Tool-use 强化学习中的内容奖励应如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/22-Q_Tool-use_强化学习中的内容奖励应如何设计.md)
- [Q：多工具调用存在依赖关系时，Reward 应如何做信用分配？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/23-Q_多工具调用存在依赖关系时_Reward_应如何做信用分配.md)
- [Q：Agent 交互轨迹与普通语言模型语料有什么区别？如何仿真高质量轨迹？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/24-Q_Agent_交互轨迹与普通语言模型语料有什么区别_如何仿真高质量轨迹.md)
- [Q：Agentic CPT、SFT、RL 三阶段分别训练什么能力？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/25-Q_Agentic_CPT_SFT_RL_三阶段分别训练什么能力.md)
- [Q：多轮对话 RL 如何设计过程奖励与终局奖励，并避免用户模拟器过拟合？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/26-Q_多轮对话_RL_如何设计过程奖励与终局奖励_并避免用户模拟器过拟合.md)
- [Q：为什么 SFT 后继续做 DPO/PPO 等偏好优化可能导致基础能力退化？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/27-Q_为什么_SFT_后继续做_DPO_PPO_等偏好优化可能导致基础能力退化.md)
- [Q：LoRA 应该挂在哪些层？rank、alpha 和 dropout 如何共同影响效果？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/28-Q_LoRA_应该挂在哪些层_rank_alpha_和_dropout_如何共同.md)
- [Q：KV Cache Block 的哈希和逻辑到物理映射应该怎么设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/29-Q_KV_Cache_Block_的哈希和逻辑到物理映射应该怎么设计.md)
- [Q：Agent 动作空间过大导致探索低效时，如何裁剪和分层？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/30-Q_Agent_动作空间过大导致探索低效时_如何裁剪和分层.md)
- [Q：Agentic RL 与普通 LLM RL 的核心差异是什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/31-Q_Agentic_RL_与普通_LLM_RL_的核心差异是什么.md)
- [Q：Agentic CFT 与 SFT、RL 的目标有何不同？为什么训练时要 Mask Observation Token？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/32-Q_Agentic_CFT_与_SFT_RL_的目标有何不同_为什么训练时要_M.md)
- [Q：训练实验如何对 YAML 配置做规范化哈希，并保证单变量变化可复现？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/33-Q_训练实验如何对_YAML_配置做规范化哈希_并保证单变量变化可复现.md)
- [Q：如何训练模型做高精度抽取式摘要？数据、目标、Loss 和评测如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/34-Q_如何训练模型做高精度抽取式摘要_数据_目标_Loss_和评测如何设计.md)
- [Q：预训练与 SFT 在数据、目标函数、计算形态和基础设施上有什么区别？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/35-Q_预训练与_SFT_在数据_目标函数_计算形态和基础设施上有什么区别.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/36-这类题的答题模式.md)
