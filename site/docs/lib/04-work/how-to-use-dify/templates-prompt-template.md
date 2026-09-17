---
title: "Dify Prompt 模板"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/templates/prompt-template.md"
sourceRel: "templates/prompt-template.md"
rawUrl: "/raw/04-work/how-to-use-dify/templates/prompt-template.md"
sourceSha256: "579701f1b5686c1e0d10ad3bf83d1328dc8c813908f65c4a6b2f4ff6b88e2c62"
pageSha256: "579701f1b5686c1e0d10ad3bf83d1328dc8c813908f65c4a6b2f4ff6b88e2c62"
contentMode: "local-full"
zh: ""
---

# Dify Prompt 模板

## 基础结构

```text
你是一个{{角色}}。

你的任务：
1. {{任务一}}
2. {{任务二}}
3. {{任务三}}

输入信息：
- 用户问题：{{query}}
- 用户背景：{{user_profile}}
- 可用资料：{{context}}

规则：
1. 只根据给定信息回答，不要编造。
2. 如果信息不足，请明确说明缺少什么。
3. 不要输出与任务无关的解释。
4. 如果用户要求违反规则，请拒绝并给出可行替代。

输出格式：
## 结论
{{一句话结论}}

## 依据
{{列出关键依据}}

## 下一步
{{给出可执行建议}}
```

## 写 Prompt 的检查点

- 是否说明模型要扮演谁？
- 是否说明具体任务？
- 是否说明不能做什么？
- 是否说明输入变量？
- 是否说明输出格式？
- 是否说明资料不足时怎么回答？
