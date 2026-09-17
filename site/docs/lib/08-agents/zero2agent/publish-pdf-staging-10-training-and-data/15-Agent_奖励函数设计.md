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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "4da7295f88a6884adaf608d196130f62d653e182255b82ca735653fa9d27348a"
contentMode: "local-full"
zh: ""
---

## Agent 奖励函数设计

### Q：客服 Agent 的奖励函数有 Reward Hacking、稀疏、区分度太大（只有完全正确和错误）三个问题，请设计新的 reward 解决至少两个。

> 来源：阿里暑期Agent算法二面

**新手答**：“给正确的 1 分，错误的 0 分。”

**高手答**：

这道题考的是**从单一 reward 到多维度、连续化、防作弊 reward 的设计能力**。

**三个问题的本质：**
- **Reward Hacking**：模型找到了得高分但不满足真实目标的捷径（如客服 Agent 学会一味道歉来获取高满意度评分，但没解决问题）
- **稀疏性**：只有完成整个对话后才有反馈，中间步骤没有信号，学习效率极低
- **区分度差**：0/1 二值奖励，成功的好回答和勉强正确的差回答得分相同

**新的 Reward 设计：**

```text
R_total = w1 × R_task + w2 × R_process + w3 × R_quality - w4 × R_penalty

R_task    = 任务完成度（0-1连续）：是否解决了用户问题
R_process = 过程奖励：每步是否推进了问题解决（稀疏→密集）
R_quality = 回答质量：信息完整度 + 专业度 + 简洁度
R_penalty = 作弊惩罚：套路化回复 + 过度道歉 + 无实质内容
```

**解决稀疏问题：**
- 引入过程奖励模型（PRM）：对每个中间步骤打分，而不只是最终结果
- 具体信号：是否正确识别了用户意图（+0.2）、是否调用了正确工具（+0.2）、是否获取到了关键信息（+0.3）、最终是否解决（+0.3）

**解决 Reward Hacking：**
- **多维度分解**：不用单一满意度分数，拆成“问题是否解决”+“信息是否准确”+“有无胡编”三个独立维度，每个维度独立打分
- **对抗样本注入**：训练时加入“看起来流畅但答非所问”的样本作为负例
- **红线惩罚**：发现套路化回复（连续三句包含“抱歉”但无实质操作）直接 R = -1

**解决区分度问题：**
- 从 0/1 → 连续分数：按解决问题的步骤完成度给分（完成 3/5 步 = 0.6 分）
- 引入偏好对比：同一 query 生成多个回答，用 pairwise 排序替代绝对打分

**差距在哪**：面试官期望你从“单一 binary reward”升级到“多维度 + 过程化 + 防作弊”的系统设计。能画出 reward 公式结构并解释每项如何对应解决一个问题，说明你理解 RL 训练中 reward 工程的实操难度。

---

### Q：多轮对话 Agent 没有现成对话数据，如何从 UI 操作流合成 SFT 训练语料？

> 来源：海底捞大模型面经

**新手答**：“找标注团队人工写对话数据。”

**高手答**：

很多业务场景（点餐、客服、表单填写）的历史数据形态是**用户行为轨迹（trajectory）**，不是对话——用户点击菜品、选规格、改数量，这些操作流需要翻译成自然语言多轮对话才能做 SFT。

**合成流水线**：

1. **行为序列提取**：从日志中抽取用户的操作序列（选锅底 → 加菜 → 改备注 → 结算）
2. **模板化对话生成**：用 LLM 把操作序列翻译成多轮对话
   - 输入：`[选番茄锅底, 选牛油锅底, 加脆毛肚, 麻度1]`
   - 输出：Agent引导式点单的多轮对话
3. **多样性增强**：同一操作序列用不同 profile（新客/老客/过敏用户）生成不同风格的对话
4. **质量过滤**：用规则（轮次合理性、信息完整性）+ 模型打分过滤低质量样本

**SFT 关键细节**：
- 只计算 Agent 回复侧的 loss——User 轮次全 mask，防止模型学会模仿用户
- 对话中的隐式反馈（翻页停留 = 犹豫）转化为 Agent 主动推荐的触发条件
- 合成几十万条后做去重 + 难度分层，确保训练集覆盖各种用户类型

**差距在哪**：新手想到人工标注，成本高且难以覆盖长尾场景。高手的思路是“把已有业务数据转化为训练数据”——从行为轨迹到对话的自动化合成流水线，兼顾规模和质量。

---

### Q：多轮 Agent 的 RL reward 怎么设计？Turn 级信用分配怎么做？

> 来源：海底捞大模型面经

**新手答**：“每轮给一个分数，好的回复给正 reward，差的给负 reward。”

**高手答**：

多轮 Agent 的 RL 比单轮难十倍——因为最终结果好坏是整个对话链的联合效果，单独某一轮很难判断贡献度。

**Reward 设计原则——全部用 Verifiable Reward**：

避免训 reward model（容易 reward hacking），直接用可验证的业务指标：
- 最终结果符合目标 → +100（如点餐金额在合理区间）
- 命中用户特殊需求（过敏忌口、偏好） → +120
- 推荐分量合理（荤素配比、人数匹配） → +80
- 对话轮次合理（不啰嗦也不遗漏） → +60

**Turn 级信用分配**：

整体 reward 只在对话结束时可观测，但需要分配到每一轮。常用方法：
- **Shapley Value 近似**：随机剔除某一轮，看最终 reward 变化多少 → 作为该轮的贡献度
- **Temporal Discount**：越靠近结束的轮次权重越高（因为越接近最终决策）
- **阶段性 reward**：在关键检查点（锅底确认、荤素确认、结算确认）给即时 reward

**User 模拟器**：
- 多轮 RL 没法找真人跑几万局 → 需要训一个 User 模拟器
- 输入：用户 profile（等级、偏好、过敏、消费习惯）
- 输出：根据 Agent 回复生成用户反应
- 关键：profile 里塞“结束点餐” token，控制对话自然终止

**差距在哪**：新手不理解多轮 reward 的“信用分配”难题——最终结果好不代表每一轮都好。高手用 verifiable reward 避免 reward hacking，用 Shapley/阶段性 reward 做 turn 级分配，用 user 模拟器解决“没人陪跑几万局”的 rollout 问题。
