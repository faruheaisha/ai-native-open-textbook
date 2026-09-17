---
title: "AI 代理设计原则"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/03-agentic-design-patterns/README.md"
sourceRel: "translations/zh-CN/03-agentic-design-patterns/README.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/03-agentic-design-patterns/README.md"
sourceSha256: "db2c16f7353c685022316775b7d56541bb3697227f606f9dfef99c49c5dea783"
pageSha256: "db2c16f7353c685022316775b7d56541bb3697227f606f9dfef99c49c5dea783"
contentMode: "local-full"
zh: ""
---

# AI 代理设计原则

## 介绍

构建 AI 代理系统有许多不同的思考方式。考虑到模糊性是生成式 AI 设计的一个特性而非缺陷，工程师们有时很难弄清从哪里开始。我们制定了一套以人为中心的用户体验设计原则，帮助开发者构建以客户为中心的代理系统以满足其业务需求。这些设计原则不是一套规范性的架构，而是为定义和构建代理体验的团队提供的一个起点。

一般来说，代理应当：

- 扩展和放大人的能力（头脑风暴、解决问题、自动化等）
- 弥补知识空白（让我快速了解知识领域、翻译等）
- 促进并支持以我们个人喜好的方式与他人协作
- 让我们成为更好的自己（例如，生活教练/任务管理者，帮助我们学习情绪调节和正念技能，建立韧性等）

## 本课内容

- 什么是代理设计原则
- 实施这些设计原则时应遵循的一些指导方针
- 使用设计原则的一些示例

## 学习目标

完成本课后，您将能够：

1. 解释什么是代理设计原则
2. 说明使用代理设计原则的指导方针
3. 理解如何使用代理设计原则构建代理

## 代理设计原则

![代理设计原则](/mirror/07/07ec9233ce9373d1ba319bee366f7438fea9d1d1.webp)

### 代理（空间）

这是代理操作的环境。这些原则指导我们如何设计用于参与物理和数字世界的代理。

- **连接，而非替代** — 帮助将人们与其他人、事件以及可执行的知识连接起来，促进协作和联结。
- 代理帮助连接事件、知识和人。
- 代理使人们更加紧密。它们不是用来替代或贬低人的。
- <strong>易于访问且偶尔隐形</strong> — 代理大部分时间在后台运行，只有在相关且适当时才提醒我们。
  - 代理对授权用户来说在任何设备或平台上都易于发现和访问。
  - 代理支持多模态输入输出（声音、语音、文本等）。
  - 代理可以在前台与后台、主动与被动之间无缝切换，依据对用户需求的感知而定。
  - 代理可能以隐形形式运行，但其后台进程路径及与其他代理的协作对用户是透明且可控的。

### 代理（时间）

这是指代理如何随时间操作。这些原则指导我们如何设计在过去、现在与未来之间互动的代理。

- <strong>过去</strong>：反映包含状态与上下文的历史。
  - 代理基于对更丰富历史数据的分析，提供更相关的结果，而不仅限于事件、人或状态本身。
  - 代理从过去事件中建立联系，主动反思记忆以应对当前情况。
- <strong>现在</strong>：推动提醒多于单纯通知。
  - 代理体现与人全面互动的方式。当事件发生时，代理超越静态通知或其他形式的正规通知。代理可以简化流程或动态生成提示，引导用户在恰当时刻关注重点。
  - 代理基于环境上下文、社会文化变化及用户意图传递信息。
  - 代理交互可以渐进、在复杂度上演变/增长，从而长期赋能用户。
- <strong>未来</strong>：适应与进化。
  - 代理适应各种设备、平台和交互方式。
  - 代理适应用户行为、无障碍需求，且可自由定制。
  - 代理通过持续用户交互被塑造并演变。

### 代理（核心）

这些是构成代理设计核心的关键元素。

- <strong>拥抱不确定性但建立信任</strong>。
  - 预期代理存在一定的不确定性。不确定性是代理设计的关键要素。
  - 信任与透明是代理设计的基础层。
  - 人类掌控代理的开启/关闭状态，代理状态始终清晰可见。

## 实施这些原则的指导方针

使用上述设计原则时，请遵循以下指导方针：

1. <strong>透明度</strong>：告知用户 AI 的参与，如何运作（包括过去的行为），以及如何反馈和修改系统。
2. <strong>控制</strong>：允许用户自定义、指定偏好和个性化，控制系统及其属性（包括忘记能力）。
3. <strong>一致性</strong>：追求跨设备和端点一致的多模态体验。尽可能使用熟悉的用户界面/体验元素（如麦克风图标表示语音交互），并尽可能减轻用户认知负担（如简洁回应、视觉辅助和“了解更多”内容）。

## 如何使用这些原则与指导方针设计旅游代理

想象你正在设计一个旅游代理，可以如下思考如何应用设计原则和指导方针：

1. <strong>透明度</strong> — 让用户知道旅游代理是一个 AI 驱动的代理。提供一些基本使用说明（如“你好”信息、示例提示）。在产品页面上清晰记录。展示用户过去提出的提示列表。明确如何反馈（点赞/点踩、发送反馈按钮等）。明确指出代理是否有使用或主题限制。
2. <strong>控制</strong> — 确保用户清楚如何通过系统提示等机制修改代理。允许用户选择代理的详细程度、写作风格以及关于代理不应谈论内容的任何注意事项。允许用户查看并删除相关文件或数据、提示及过去对话。
3. <strong>一致性</strong> — 确保“分享提示”、添加文件或照片、标记某人或事物的图标标准且易识别。使用回形针图标表示文件上传/与代理共享，使用图片图标表示图像上传。

## 示例代码

- Python: [代理框架](https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/03-agentic-design-patterns/code_samples/03-python-agent-framework.ipynb)
- .NET: [代理框架](/lib/08-agents/microsoft-ai-agents-for-beginners/translations-zh-CN-03-agentic-design-patterns-code_samples-03-dotnet-agent-framework)

## 关于 AI 代理设计模式还有更多问题？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，与其他学习者交流，参加办公时间并获得 AI 代理相关问题的解答。

## 补充资源

- <a href="https://openai.com" target="_blank">代理式 AI 系统治理实践 | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX 工具箱项目 - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">责任 AI 工具箱</a>

## 上一课

## 下一课
