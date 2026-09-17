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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/.claude/skills/classify-interview-questions/question-index.md"
sourceRel: ".claude/skills/classify-interview-questions/question-index.md"
rawUrl: "/raw/08-agents/zero2agent/.claude/skills/classify-interview-questions/question-index.md"
sourceSha256: "8c0501b7d449991c01fe556083296af4f2a174f68accc5bd27df904bb334a33d"
pageSha256: "6cbdeeedecc61299dd1bcd111cdff036b33c77acb86d71c3a7509cc3734df215"
contentMode: "local-full"
zh: ""
---

## 10-training-and-data（77题）

1. 构造数据集遇到过什么难点？ — 腾讯AI应用开发【CVTE AI应用工程师一面追问：合成数据集质量达不到预期怎么办】【[字节 Seed 具身数据一面](https://www.nowcoder.com/feed/main/detail/657dfac8ca5c49f28492a1110b95f7cd)追问：标注一致性与自动质检】【[Momenta 大模型算法工程师一面](https://www.nowcoder.com/feed/main/detail/f7518c865e07491cb1518d288698813c)追问：长尾样本对齐】
2. 预训练数据清洗方法？ — 字节一面【[MiniMax - 大模型算法岗（后训练 / SFT / RL 方向，独角兽）](https://www.nowcoder.com/discuss/925527528259743744)追问：数据清洗时，你如何筛选低质量样本？用过哪些启发式规则或模型过滤？】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：低质数据筛选的启发式规则或模型过滤方法？】
3. 自动标注系统的主要难点是什么？如何设计模型预标注、置信度分流和人工复核闭环？ — [字节 Seed 具身数据一面](https://www.nowcoder.com/feed/main/detail/657dfac8ca5c49f28492a1110b95f7cd)（新增）【[百度具身研发一面](https://www.nowcoder.com/feed/main/detail/258695ecdfbb464790fc8ae55c9f1661)追问：标注相关，有做过自动化标注吗？】
4. SFT 数据字段如何映射？instruction 与 input 重叠时如何定义清洗和拼接契约？ — [大方云图研发实习一面](https://www.nowcoder.com/feed/main/detail/a9a40feb4e1e4d0ca7c3f8c3ba67d487)（新增）【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：SFT 数据中指令与输入字段重叠的处理？】
5. Agent 工具调用怎么训练？训练集包含什么？ — 腾讯二面
6. 训练数据标注粒度应该越细越好还是按任务适配？如何权衡成本、信息量和泛化？ — [字节 Seed 具身数据一面](https://www.nowcoder.com/feed/main/detail/657dfac8ca5c49f28492a1110b95f7cd)（新增）
7. DPO、PPO、GRPO 的区别和优缺点？ — 高频题 【阿里国际一面追问：PPO vs GRPO 深度对比】【淘天AI应用开发一面追问：DPO不需要在线采样的原因+数据格式】【美团Keeta一面追问：chosen/rejected数据生成实操与常见坑】【阿里国际一面追问：重要性采样在策略差异大时失效+GRPO vs PPO KL散度区别】【[快手广告大模型一面](https://www.nowcoder.com/discuss/923996140154953728)】【[MiniMax - 大模型算法岗（后训练 / SFT / RL 方向，独角兽）](https://www.nowcoder.com/discuss/925527528259743744)追问：GRPO 和 DPO 在代码实现上的区别是什么？】【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：PPO vs GRPO 优劣势？】【[8.13 百度一面挂 百度多模态算法工程师-北京](https://www.nowcoder.com/discuss/926467109717118976)追问：PPO 和 GRPO 的区别是什么？】
8. 微调方法有哪些？LoRA 和全参数微调？ — 高频题 【阿里国际二面追问：微调经验与全流程认知】【淘天AI应用开发一面追问：LoRA A/B矩阵初始化+秩选择+权重Merge】【[百度正式批：一面结束第二天就约二面了](https://www.nowcoder.com/discuss/925108144831725568)追问：你微调具体微调哪一部分，不太可能是全量微调吧？】
9. 给定时间序列，如何用 ML 筛选特征再基于规则建模？ — 字节一面【[OPPO 大模型算法面经](https://www.nowcoder.com/feed/main/detail/685479ec75b542bebf1156c47f1d4e88)追问：组合特征盲点】
10. kernel 级别的优化，CUTE DSL 或手写 CUDA？ — 字节一面
11. XGBoost 相比单棵决策树，在目标函数、正则和集成机制上做了什么改进？ — [OPPO 大模型算法面经](https://www.nowcoder.com/feed/main/detail/685479ec75b542bebf1156c47f1d4e88)（新增）
12. 手撕 Multi-Head Attention — 手撕题【[0907 百度一面 （AI Infra）](https://www.nowcoder.com/feed/main/detail/91f5187146864de5878349a2ecf497ce)追问：你对 AI 算法或模型架构有一定了解吗？Transformer、Attention 如何计算？】
13. 位置编码的作用？ — 高频题 【字节二面同题：QKV机制+为什么引入位置编码和多头注意力】
14. 绝对位置编码和相对位置编码的区别？ — 高频题 【爱奇艺大模型算法追问：RoPE/MRoPE长文本位置编码原理】
15. 常用解决过拟合的方法？ — 高频题
16. LayerNorm 和 BatchNorm 的区别？ — 高频题
17. RLHF 中奖励模型训练数据如何构建？ — 后端AI八股 【快手一面+荣耀一面追问：奖励函数设计逻辑和打分规则】【阿里国际AI应用算法追问：reward hacking 识别与防范】【阿里国际AI算法一面追问：RL训练质量达标判断方法】
18. 大模型推理加速技术有哪些？ — 后端AI八股 【阿里国际二面追问：推理服务部署/算子融合/IO 优化】【阿里国际AI算法一面追问：Flash Attention与稀疏注意力原理】
19. 多模态是怎么实现的？图片怎么编码？ — 后端AI八股 【爱奇艺大模型算法追问：CLIP图文对齐+图像Token冗余解决方案】【[美团 - Agent 开发岗（场景设计方向）](https://www.nowcoder.com/discuss/926273749555376128)追问：多模态（图片）输入与文本的融合方案？】
20. 你了解哪些多模态大模型？ — 蚂蚁一面
21. 有没有了解过端侧部署的模型？ — 蚂蚁一面
22. OCR、多模态模型、YOLO 与 ONNX 分别处于任务、模型和运行时哪个层次？如何组合？ — [北京金蝶二面](https://www.nowcoder.com/feed/main/detail/6edec13bc5f34f0ca137b4a4911dcb10)（新增）
23. 如何优化长文本生成中的显存占用？ — 后端AI八股
24. Transformer 中梯度消失/爆炸怎么解决？ — 后端AI八股
25. Token 过长导致的 Attention 稀释现象为什么会导致 Agent 的指令遵循能力下降？ — 淘天一面
26. 在 Agent 多轮对话任务中，标准 Attention 机制的平方复杂度在工程落地上主要引发了哪些问题？ — 淘天一面
27. SFT、蒸馏、GRPO 的技术选型——什么时候用什么？ — 阿里国际一面 【快手二面追问：SFT为什么不够，什么时候必须上RL】【腾讯金融科技一面追问：蒸馏时防止小模型学到错误推理链】
28. GRPO 的 Loss 函数、Advantages 计算与信用分配机制 — 阿里国际一面 【快手一面+美团一面追问：全0全1 reward处理 + 单步问题是否需要GRPO】【阿里国际一面追问：GRPO训练中观测什么指标】
29. vLLM 的 PagedAttention 原理是什么？解决了什么问题？ — 快手AI应用开发算法一面【[华为 - 大模型算法岗（AI Infra / 训练优化）](https://www.nowcoder.com/discuss/926272625410674688)追问：vLLM PagedAttention 如何解决碎片？】【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：vLLM 的 PagedAttention 如何解决显存碎片问题？】
30. DP、DDP、TP、PP——分布式训练并行策略的区别与选型 — 荣耀一面【[0907 百度一面 （AI Infra）](https://www.nowcoder.com/feed/main/detail/91f5187146864de5878349a2ecf497ce)追问：大模型中的大矩阵乘法，例如流水线并行或张量并行，你了解吗？】
31. 深度学习网络中的「残差连接」解决了什么问题？其物理含义是什么？ — 字节二面 【淘天Agent开发同题：传统CNN痛点+ResNet核心思想】
32. 什么是灾难性遗忘？微调时如何缓解？ — 字节大模型测开一面【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：后训练中避免灾难性遗忘的方法？】
33. Text-to-SQL 训练集构建——500 样本覆盖 200+ 查询模式的数据生产流设计 — 淘天一面
34. Token 和字符有什么区别？ — 淘宝闪购一面
35. QLoRA 的核心设计是什么？NF4、双重量化、分页优化器分别解决什么问题？ — 淘天AI应用开发一面
36. 垂直领域微调后，模型通用能力严重退化怎么办？ — 淘天AI应用开发一面
37. 现有的大模型性能为什么这么好？ — 字节二面
38. GQA 和 MLA 的原理是什么？各自解决什么问题？ — 阿里国际AI算法一面
39. MoE 架构下为什么参数量大但单 Token 推理成本不一定高？ — 字节大模型测开一面
40. BF16 与 FP32 精度差异及训练推理选型？ — 爱奇艺大模型算法岗二面
41. 模型推理慢，排查思路是什么？ — 阿里国际AI算法一面
42. 超长上下文是怎么实现的？（如 Kimi 这类模型） — 百度大模型实习
43. Agent 在细分场景（比如法律、医疗）落地时，微调策略和通用场景有什么不同？ — 字节TikTok AI应用开发一面
44. 为什么要通过微调模型来做代码生成？为什么不用纯 Prompt 或 Spec Coding？ — 小米AI Agent一面 【字节Agent开发实习生一面追问：spec coding/SDD为什么达不到Agent效果】
45. 外部模型参数更大，14B 在 Agent 层面会不会不够？ — 小米AI Agent一面
46. Rerank 模型蒸馏的数据是什么样的？训练数据大概有多少条？ — 同程Agent开发实习一面
47. BERT 和 GPT 架构的区别是什么？ — 同程Agent开发实习一面
48. 为什么现在的大模型都是 Decoder-only 架构？ — 淘天AI Agent暑期实习一面
49. 训练 AI Coding Agent，端到端还是分阶段训练？ — 淘天AI Agent暑期实习一面
50. 客服 Agent 奖励函数的 Reward Hacking/稀疏/区分度问题，如何设计新 reward？ — 阿里暑期Agent算法二面【[百度正式批：一面结束第二天就约二面了](https://www.nowcoder.com/discuss/925108144831725568)追问：reward是如何设计的呢？；奖励函数怎么写的？；你的奖励函数具体设计是比较稀疏还是稠密的？】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：RL reward 曲线上升但效果变差的原因是什么？】【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：Reward Hacking 的检测与纠正？】【[百度 正式批 二面 端到端决策规划控制算法工程师](https://www.nowcoder.com/feed/main/detail/af692c37e31d437292d4881b58b24e56)追问：对于DDPG项目的reward，你是如何设计的？】
51. 多轮对话 Agent 没有现成对话数据，如何从 UI 操作流合成 SFT 训练语料？ — 海底捞大模型面经（新增）
52. 多轮 Agent 的 RL reward 怎么设计？Turn 级信用分配怎么做？ — 海底捞大模型面经（新增）
53. Agentic RL 与普通 LLM RL 的核心差异是什么？ — 腾讯大模型算法岗一二面（新增）【[腾讯（WXG）- 大模型算法岗（一面）](https://www.nowcoder.com/discuss/925163074921709568)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[字节跳动 - 大模型算法岗（强化学习方向）](https://www.nowcoder.com/discuss/925523582761857024)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[腾讯（CSIG）- 大模型算法岗（RLHF 与多模态）](https://www.nowcoder.com/discuss/925526785003909120)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[字节跳动 - 大模型算法岗（RL/后训练方向）](https://www.nowcoder.com/discuss/926272098744438784)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异？】
54. 为什么 Step-level SFT 之后再进行 GRPO，通常比直接从基座模型开始做 GRPO 稳定？ — 唯品会NLP算法实习一面（新增）【[百度正式批：一面结束第二天就约二面了](https://www.nowcoder.com/discuss/925108144831725568)追问：SFT和GRPO是分两阶段的吗？】【[MiniMax - 大模型算法岗（后训练 / SFT / RL 方向，独角兽）](https://www.nowcoder.com/discuss/925527528259743744)追问：SFT 的作用是什么？为什么通常先做 SFT 再做强化学习？】【[MiniMax - 大模型算法岗（后训练 / SFT / RL）](https://www.nowcoder.com/discuss/926272883872075776)追问：SFT 的作用及为何先 SFT 后 RL？】
55. 训练后量化的完整流程是什么？粒度、校准方法和离群值如何共同影响精度？ — 摩尔线程/智谱/百度 AI Infra 面经（新增）
56. GPTQ、AWQ、SmoothQuant 与 AdaQuant 的核心思路有什么不同？ — 智谱/后摩智能/AI Infra 小厂面经（新增）
57. 长时序任务中的 Agent RL 为什么容易训练失稳？如何缓解？ — [字节大模型算法岗](https://www.nowcoder.com/discuss/926272098744438784)、[腾讯 CSIG 大模型算法岗](https://www.nowcoder.com/discuss/925526785003909120)、[腾讯 WXG 大模型算法岗](https://www.nowcoder.com/discuss/925163074921709568)（新增）
58. Agentic CPT、SFT、RL 三阶段分别训练什么能力？ — 字节跳动AI Agent秋招一面（新增）【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：后训练全链路（数据→SFT→RL）详细介绍？】
59. LoRA 应该挂在哪些层？rank、alpha 和 dropout 如何共同影响效果？ — Shopee 大模型一面（新增）【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：LoRA 的 rank 值越大越好吗？为什么？】
60. Agentic CFT 与 SFT、RL 的目标有何不同？为什么训练时要 Mask Observation Token？ — [Shopee Agent 开发一面](https://www.nowcoder.com/feed/main/detail/79fe3fc8f8cb4c4d9beca478f4279e3a)（2026-08-24）【[腾讯一面微调 Mask 追问](https://www.nowcoder.com/discuss/924026569318727680)】
61. DAPO 为什么可以不使用额外 KL 惩罚？它如何维持策略更新稳定？ — [字节大模型算法岗](https://www.nowcoder.com/discuss/926272098744438784)、[字节强化学习岗](https://www.nowcoder.com/discuss/925523582761857024)（新增）
62. Tool-use SFT 训练时，长轨迹采用截断、切分还是掩码？如何避免破坏工具依赖关系？ — 唯品会NLP算法实习一面（新增）
63. GRPO 中相对奖励是如何计算的？同一组奖励方差接近零时如何处理？ — 唯品会NLP算法实习一面（新增）
64. Tool-use 轨迹长度与任务复杂度有什么关系？训练数据应如何分布？ — 唯品会大模型算法实习一面（新增）
65. Tool-use 强化学习中的内容奖励应如何设计？ — 唯品会大模型算法实习一面（新增）
66. 多工具调用存在依赖关系时，Reward 应如何做信用分配？ — 唯品会大模型算法实习一面（新增）
67. Agent 交互轨迹与普通语言模型语料有什么区别？如何仿真高质量轨迹？ — 字节Agent算法实习一面（新增）
68. 多轮对话 RL 如何设计过程奖励与终局奖励，并避免用户模拟器过拟合？ — [阿里云 AI Infer 一面](https://www.nowcoder.com/discuss/921086976030150656)（2026-08-23）
69. 为什么 SFT 后继续做 DPO/PPO 等偏好优化可能导致基础能力退化？ — 哔哩哔哩 AI 后端开发凉经（新增）
70. KV Cache Block 的哈希和逻辑到物理映射应该怎么设计？ — 智象未来 AI Infra一面（新增）
71. Agent 动作空间过大导致探索低效时，如何裁剪和分层？ — 阿里千问 C端算法实习一面（新增）
72. 训练实验如何对 YAML 配置做规范化哈希，并保证单变量变化可复现？ — [大方云图研发实习一面](https://www.nowcoder.com/feed/main/detail/a9a40feb4e1e4d0ca7c3f8c3ba67d487)（2026-08-24）
73. 如何训练模型做高精度抽取式摘要？数据、目标、Loss 和评测如何设计？ — 百度大模型实习 Agent 面经（新增）
74. 预训练与 SFT 在数据、目标函数、计算形态和基础设施上有什么区别？ — AI Infra 小厂实习面经（新增）
75. Agentic RL 数据筛选为什么会排除部分学生错误轨迹？哪些可恢复错误反而值得保留？ — [阿里云 AI Infer 一面](https://www.nowcoder.com/discuss/921086976030150656)（新增）
76. TTS 音频如何被离散化为 Token，语义与音色信息如何取舍？ — [MiniMax 大模型算法岗一面](https://www.nowcoder.com/discuss/926272883872075776)（新增）
77. LLaMA-Factory 和 TRL 等 SFT / RL 工具如何对比和选型？ — [MiniMax 大模型算法岗一面](https://www.nowcoder.com/discuss/926272883872075776)（新增）
