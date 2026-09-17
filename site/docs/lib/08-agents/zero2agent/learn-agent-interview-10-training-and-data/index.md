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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "3d8e04d6115ece0e9d5a8688c1e65ab288cb3752da457b368ed69497858e01d9"
contentMode: "local-full"
zh: ""
---

# 训练、数据与模型优化：从数据清洗到 LoRA

Agent 岗位面试不只考“会不会用 Agent”，还考**“Agent 背后的模型是怎么训出来的”**。数据怎么洗、训练集怎么构造、微调用什么方法、对齐算法怎么选——这些问题考的是你对 Agent 全链路的理解深度。

---

## 本篇目录

- [数据工程与清洗](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/01-数据工程与清洗.md)
- [微调与对齐训练](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/02-微调与对齐训练.md)
- [Transformer 基础](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/03-Transformer_基础.md)
- [模型能力与部署](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/04-模型能力与部署.md)
- [注意力机制与复杂度](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/05-注意力机制与复杂度.md)
- [训练策略与实践](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/06-训练策略与实践.md)
- [Q：超长上下文是怎么实现的？（如 Kimi 这类模型）](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/07-Q_超长上下文是怎么实现的_如_Kimi_这类模型.md)
- [Q：Agent 在细分场景（比如法律、医疗）落地时，微调策略和通用场景有什么不同？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/08-Q_Agent_在细分场景_比如法律_医疗_落地时_微调策略和通用场景有什么不同.md)
- [微调 vs Prompt 做代码生成](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/09-微调_vs_Prompt_做代码生成.md)
- [模型参数大小与 Agent 能力](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/10-模型参数大小与_Agent_能力.md)
- [Rerank 模型蒸馏](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/11-Rerank_模型蒸馏.md)
- [BERT 与 GPT 架构对比](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/12-BERT_与_GPT_架构对比.md)
- [为什么大模型都是 Decoder-only](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/13-为什么大模型都是_Decoder-only.md)
- [训练 AI Coding Agent 的策略](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/14-训练_AI_Coding_Agent_的策略.md)
- [Agent 奖励函数设计](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/15-Agent_奖励函数设计.md)
- [Q：Agentic RL 与普通 LLM RL 的核心差异是什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/16-Q_Agentic_RL_与普通_LLM_RL_的核心差异是什么.md)
- [Q：为什么 Step-level SFT 之后再进行 GRPO，通常比直接从基座模型开始做 GRPO 稳定？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/17-Q_为什么_Step-level_SFT_之后再进行_GRPO_通常比直接从基座.md)
- [Q：训练后量化的完整流程是什么？粒度、校准方法和离群值如何共同影响精度？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/18-Q_训练后量化的完整流程是什么_粒度_校准方法和离群值如何共同影响精度.md)
- [Q：GPTQ、AWQ、SmoothQuant 与 AdaQuant 的核心思路有什么不同？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/19-Q_GPTQ_AWQ_SmoothQuant_与_AdaQuant_的核心思路有.md)
- [Q：长时序任务中的 Agent RL 为什么容易训练失稳？如何缓解？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/20-Q_长时序任务中的_Agent_RL_为什么容易训练失稳_如何缓解.md)
- [Q：Agentic CPT、SFT、RL 三阶段分别训练什么能力？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/21-Q_Agentic_CPT_SFT_RL_三阶段分别训练什么能力.md)
- [Q：LoRA 应该挂在哪些层？rank、alpha 和 dropout 如何共同影响效果？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/22-Q_LoRA_应该挂在哪些层_rank_alpha_和_dropout_如何共同.md)
- [Q：Agentic CFT 与 SFT、RL 的目标有何不同？为什么训练时要 Mask Observation Token？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/23-Q_Agentic_CFT_与_SFT_RL_的目标有何不同_为什么训练时要_M.md)
- [Q：DAPO 为什么可以不使用额外 KL 惩罚？它如何维持策略更新稳定？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/24-Q_DAPO_为什么可以不使用额外_KL_惩罚_它如何维持策略更新稳定.md)
- [Q：Tool-use SFT 训练时，长轨迹采用截断、切分还是掩码？如何避免破坏工具依赖关系？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/25-Q_Tool-use_SFT_训练时_长轨迹采用截断_切分还是掩码_如何避免破坏.md)
- [Q：GRPO 中相对奖励是如何计算的？同一组奖励方差接近零时如何处理？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/26-Q_GRPO_中相对奖励是如何计算的_同一组奖励方差接近零时如何处理.md)
- [Q：Tool-use 轨迹长度与任务复杂度有什么关系？训练数据应如何分布？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/27-Q_Tool-use_轨迹长度与任务复杂度有什么关系_训练数据应如何分布.md)
- [Q：Tool-use 强化学习中的内容奖励应如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/28-Q_Tool-use_强化学习中的内容奖励应如何设计.md)
- [Q：多工具调用存在依赖关系时，Reward 应如何做信用分配？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/29-Q_多工具调用存在依赖关系时_Reward_应如何做信用分配.md)
- [Q：Agent 交互轨迹与普通语言模型语料有什么区别？如何仿真高质量轨迹？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/30-Q_Agent_交互轨迹与普通语言模型语料有什么区别_如何仿真高质量轨迹.md)
- [Q：多轮对话 RL 如何设计过程奖励与终局奖励，并避免用户模拟器过拟合？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/31-Q_多轮对话_RL_如何设计过程奖励与终局奖励_并避免用户模拟器过拟合.md)
- [Q：为什么 SFT 后继续做 DPO/PPO 等偏好优化可能导致基础能力退化？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/32-Q_为什么_SFT_后继续做_DPO_PPO_等偏好优化可能导致基础能力退化.md)
- [Q：KV Cache Block 的哈希和逻辑到物理映射应该怎么设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/33-Q_KV_Cache_Block_的哈希和逻辑到物理映射应该怎么设计.md)
- [Q：Agent 动作空间过大导致探索低效时，如何裁剪和分层？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/34-Q_Agent_动作空间过大导致探索低效时_如何裁剪和分层.md)
- [Q：训练实验如何对 YAML 配置做规范化哈希，并保证单变量变化可复现？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/35-Q_训练实验如何对_YAML_配置做规范化哈希_并保证单变量变化可复现.md)
- [Q：如何训练模型做高精度抽取式摘要？数据、目标、Loss 和评测如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/36-Q_如何训练模型做高精度抽取式摘要_数据_目标_Loss_和评测如何设计.md)
- [Q：预训练与 SFT 在数据、目标函数、计算形态和基础设施上有什么区别？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/37-Q_预训练与_SFT_在数据_目标函数_计算形态和基础设施上有什么区别.md)
- [Q：Agentic RL 数据筛选为什么会排除部分学生错误轨迹？哪些可恢复错误反而值得保留？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/38-Q_Agentic_RL_数据筛选为什么会排除部分学生错误轨迹_哪些可恢复错误反.md)
- [Q：TTS 音频如何被离散化为 Token，语义与音色信息如何取舍？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/39-Q_TTS_音频如何被离散化为_Token_语义与音色信息如何取舍.md)
- [Q：LLaMA-Factory 和 TRL 等 SFT / RL 工具如何对比和选型？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/40-Q_LLaMA-Factory_和_TRL_等_SFT_RL_工具如何对比和选型.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/41-这类题的答题模式.md)
