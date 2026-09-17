---
title: "新任务与执行过程 (/docs/features/super-agent)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/features/super-agent.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/features/super-agent.md"
sourceSha256: "2a9b84d4a4210df979275081b808b37ce354c50f86557fcdc1e6125e29fe6c13"
pageSha256: "2a9b84d4a4210df979275081b808b37ce354c50f86557fcdc1e6125e29fe6c13"
contentMode: "local-full"
zh: ""
---

# 新任务与执行过程 (/docs/features/super-agent)

“新任务”是千问办公的主要工作入口，适合研究、写作、分析、文件处理、网站制作和多模态生成。每次完整对话都是一项围绕目标展开的任务。

## 如何看懂执行过程 [#如何看懂执行过程]

Agent 回复由可展开的执行单元组成：

* **Thinking**：行动前的推理摘要；
* **Plan**：准备执行的步骤；
* **Tool Call**：工具输入与结果，多个调用可能组成一组；
* **AskUserQuestion**：缺少关键条件时向你提问；
* **Authorization Card**：执行敏感动作前请求授权；
* **File Result**：生成或修改的文件。

## 输入框能力 [#输入框能力]

* 点击 `+` 上传本地文件或从个人网盘选择资料；
* 支持的端会在 `+` 菜单中提供多智能体模式；
* 模型选择器用于在高级、基础、经济和 `Qwen3.8-Max` 等当前可见档位之间切换；
* 连接器入口可以快速查看或管理已经接入的外部能力；
* 执行中可以继续补充指令，新消息会按当前任务状态处理。

不同文件类型、数量和大小受当前端与账号限制。模型选择方法见[模型选择与用量优化](https://qwenwork.org)。

## 单智能体与多智能体 [#单智能体与多智能体]

默认模式适合改写文字、制作简单表格和其他单一路径任务。多智能体适合可拆分、需要并行研究或交叉验证的复杂任务，例如：

* 行业调研和竞品分析；
* 多份材料交叉核验；
* 复杂营销方案；
* 完整网站或应用制作；
* 需要不同专业角色复核的任务。

多个智能体需要分别理解和执行子任务，再由主智能体整合结果，通常会增加时间和用量。使用前先定义统一的输出结构、证据规则和验收标准。

## 任务管理 [#任务管理]

* “最近任务”用于返回历史任务并继续查看或补充；
* 长线程开始混乱时，先要求总结目标、进度、结论和待办，再通过新任务继续；
* 任务长时间没有进展时，检查是否在等待授权、补充信息或外部页面；
* 停止或删除的具体影响以当前界面确认信息为准，不假定可以恢复。

  授权前确认目标账号、操作范围和不可逆影响。发送、发布、删除、支付或改写外部系统数据时，应要求 Agent 先展示计划或草稿。
