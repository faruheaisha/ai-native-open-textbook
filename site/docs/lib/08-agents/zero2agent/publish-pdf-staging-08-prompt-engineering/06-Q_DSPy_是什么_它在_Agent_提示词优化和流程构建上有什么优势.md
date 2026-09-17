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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "b59cbc8d57c74ce20a07d31d945cf69c5bfe2664e1d5669b0e246e2b0fa8efba"
contentMode: "local-full"
zh: ""
---

## Q：DSPy 是什么？它在 Agent 提示词优化和流程构建上有什么优势？

> 来源：Agent开发八股合集（南京大学）

**新手答**：“DSPy 是一个 Prompt 模板工具，帮你管理不同的提示词版本。”

**高手答**：

DSPy 是斯坦福 NLP 实验室推出的框架，核心理念是**把 Prompt Engineering 变成 Programming**——用声明式模块替代手写 Prompt，用编译器自动优化 Prompt 内容。

**DSPy 的核心设计：**

1. **Signature（签名）**：用 Python 类型注解声明输入输出语义，如 `"question -> answer"`，而不是手写 Prompt 文本
2. **Module（模块）**：预定义的推理模式（如 ChainOfThought、ReAct、ProgramOfThought），组合就像搭积木
3. **Teleprompter/Optimizer（编译器）**：给定少量示例和评估函数，自动搜索最优 Prompt（包括 few-shot 示例选择、指令措辞、格式约束）
4. **Metric（评估）**：内置评估管线，优化过程数据驱动而非直觉驱动

**对 Agent 开发的优势：**

- **可复现**：Prompt 不是字符串拼接的黑箱，而是版本化的模块组合，团队协作时不会“改坏别人的 Prompt”
- **自动调优**：当模型升级或数据分布变化时，重新编译即可得到新的最优 Prompt，无需手动逐句调
- **组合性**：多个模块可以串联成 Pipeline（如 Retrieve → Rerank → Generate），每个环节独立优化
- **模型无关**：换底层模型时只需重新编译，Signature 和 Module 结构不变

**局限性（也要说）：**

- 对简单任务（单轮 QA）引入了不必要的抽象
- 编译器搜索空间大时优化耗时长，需要足够的评估数据
- 与 LangGraph/LangChain 等框架的集成不够原生，生态还在早期
- 调试时“为什么优化出这个 Prompt”的可解释性有限

**适用场景**：多步推理管线、需要频繁迭代 Prompt 的生产系统、团队协作场景。不适合：简单的一次性脚本或高度定制的 Prompt Hack。

**差距在哪**：面试官考的是你对“Prompt 工程工具化”趋势的认知。新手把 DSPy 等同于模板管理，高手能说出“声明式 + 自动编译”的范式区别，并能客观评价优势与局限，说明你对 Prompt 工程不只是“写 Prompt”这个层次。

---

### Q：单看 Prompt 层面，有哪些办法能让模型回答更快、更稳定？

> 来源：视频面经汇总

**新手答**：“写清楚需求，给几个 few-shot 示例。”

**高手答**：

“更快”和“更稳定”是两个维度，Prompt 层面的优化手段：

**提速手段（减少输出 token）：**
1. **限定输出格式**：要求 JSON/结构化输出比自由文本短 3-5 倍。加 `"只输出结果，不要解释过程"` 可削减 50%+ token
2. **预填充（Prefill）**：在 assistant 消息开头预设格式前缀（如 `\{"action":`），模型只需补全剩余部分
3. **精简 System Prompt**：删除冗余描述，把规则压缩到最少 token。10 条规则能合并成 3 条就合并
4. **分步拆解**：一个复杂 Prompt 拆成多次短调用，每次上下文更小，单次响应更快

**稳定手段（减少输出波动）：**
1. **Temperature 调低**：创造性任务用 0.7，结构化输出用 0-0.1
2. **输出 Schema 约束**：用 Structured Output / Function Calling 而非让模型自由输出 JSON
3. **负面指令**：告诉模型“不要做什么”比“要做什么”更能约束行为边界
4. **Few-shot 锚定**：给 2-3 个风格一致的示例，锚定输出模式。示例要覆盖边界情况
5. **输出前置思考**：让模型先 `<thinking>` 再输出答案，思考过程稳定推理链路

**差距在哪**：新手把“快”和“稳定”混在一起回答。高手分开处理——“快”是减 token 的工程问题，“稳定”是减波动的约束问题。能给出 prefill、structured output、负面指令这类具体手段，说明你在生产中调过 Prompt 性能。

---

### Q：你觉得一个 Skill 写得好不好，应该看哪些标准？

> 来源：视频面经汇总

**新手答**：“看模型能不能正确触发它。”

**高手答**：

评估一个 Skill 的质量，我会看五个维度：

| 维度 | 好的 Skill | 差的 Skill |
|------|-----------|-----------|
| 触发精度 | 描述清晰，该触发时触发，不该触发时沉默 | 描述模糊，频繁误触发或漏触发 |
| 输出稳定性 | 同类输入产出一致，格式可预期 | 输出波动大，时对时错 |
| 边界明确 | 明确声明“能做什么、不能做什么” | 什么都想覆盖，边界模糊 |
| 可组合性 | 输入输出 Schema 标准化，能被其他 Skill 调用 | 硬编码逻辑，无法嵌套 |
| 可维护性 | 指令简洁，改一个参数不影响整体 | 指令冗长纠缠，牵一发动全身 |

**量化评估方法**：
1. **触发准确率**：构造正例（应触发）和负例（不应触发）测试集，统计 Precision/Recall
2. **输出一致性**：同一输入跑 10 次，看输出结构的方差（JSON 字段是否稳定、关键信息是否丢失）
3. **端到端成功率**：从用户意图到最终结果的全链路成功比例
4. **Token 效率**：完成同一任务消耗的 token 数——越少说明指令越精炼

**差距在哪**：新手只关注“能不能用”，高手构建了一个多维评估体系。面试官考的是你对 Skill 作为工程产物的理解——它不是写完就完了，需要持续评估和迭代，就像代码需要单测一样。
