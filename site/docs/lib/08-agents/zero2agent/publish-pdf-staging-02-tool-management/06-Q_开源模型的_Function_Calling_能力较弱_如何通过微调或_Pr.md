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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-tool-management.md"
sourceRel: "publish-pdf/staging/02-tool-management.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/02-tool-management.md"
sourceSha256: "ff29c62f7add4777020864a28d5f388f5a1eb17b853650aa8e6eba538c7c00c1"
pageSha256: "283efcc11bfe5179dd1f3d15d85201bbb41390323f9a44a05b9bc970193c6e85"
contentMode: "local-full"
zh: ""
---

## Q：开源模型的 Function Calling 能力较弱，如何通过微调或 Prompt Engineering 提升？

> 来源：Agent开发八股合集（南京大学）

**新手答**：“换更大的模型就好了，或者加几个 few-shot 示例。”

**高手答**：

开源模型（如 Qwen、Llama、Mistral）的 FC 能力弱主要表现在三个层面：**工具选择错误、参数格式错误、幻觉调用不存在的工具**。优化手段分 Prompt 侧和训练侧两条路：

**Prompt 侧（零成本，立即生效）：**

1. **Schema 精简**：工具描述越短越好，去掉冗余字段；参数用 enum 约束可选值而非自由文本
2. **格式强约束**：在 system prompt 中用 JSON Schema + 严格示例约束输出格式，加 `"你只能使用以下工具，不可编造工具名"` 的硬约束
3. **Few-shot 对齐**：给 2-3 个“用户意图 → 正确工具调用”的示例，尤其覆盖参数边界情况
4. **ReAct 格式引导**：让模型先输出 Thought（思考为什么选这个工具），再输出 Action，推理链降低盲目调用概率
5. **结构化输出**：用 `response_format: json_object` 或 Outlines/Guidance 等约束解码库强制格式合法

**训练侧（效果更稳，需要数据和算力）：**

1. **FC-SFT 数据构造**：
   - 从业务日志中提取“用户 query → 正确工具调用”对
   - 用强模型（如 GPT-4/Claude）生成 FC 标注数据，覆盖正例 + 负例（不该调用的场景也要标注为“不调用”）
   - 数据格式要和推理时的 Prompt 格式完全一致

2. **LoRA 微调**：
   - 在基座模型上用 LoRA r=16-32 微调，只训 FC 相关能力
   - 训练集要覆盖：工具选择、参数提取、多工具串联、拒绝调用四类场景
   - 加入 “none” 类样本，防止模型对所有 query 都硬调工具

3. **Constrained Decoding（约束解码）**：
   - 不改模型权重，在解码阶段用 Grammar/FSM 约束只能输出合法的工具名和参数结构
   - 工具：Outlines、llama.cpp 的 GBNF grammar、vLLM 的 guided decoding

**工程组合拳（实际生产推荐）：**

Prompt 强约束 + Few-shot → 解决 80% 的格式和选择问题
LoRA 微调 → 解决模型“理解不了复杂意图”的根本能力问题
约束解码 → 兜底，保证输出格式 100% 合法

**差距在哪**：面试官考的是你对“FC 能力不足”的拆解能力——不是一句“换大模型”，而是能区分格式问题、选择问题、能力问题，分别用 Prompt/约束解码/微调三层手段组合解决。
