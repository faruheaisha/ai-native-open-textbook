---
title: "WorkBuddy 自动化任务教程：设置定时执行与结果检查"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/README.md"
zh: ""
---

# WorkBuddy 自动化任务教程：设置定时执行与结果检查

整理新闻、生成周报这类工作并不难，麻烦在于每天或每周重复。

可以让 WorkBuddy 按设定时间执行。

## 创建一项自动化任务

进入自动化页面，点击添加定时任务。

页面中需要依次设置任务名称、工作空间、提示词、模型、Skill 和执行时间。

![image-20260805172123577](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122735Z-e82581487f570356-ad2296fe.jpg)

任务名称要让自己一眼看懂，例如“每周一生成产品周报”，以后暂停或修改时不容易选错。

工作空间要和任务对应。

最好准备一个独立空间，集中存放输入材料和生成结果，方便以后查找，也不会干扰临时项目。

## 把提示词写成一份执行说明

定时执行时，人通常不在电脑旁边，WorkBuddy 没办法随时追问。

因此，提示词需要提前写清资料来源、允许动作、输出位置和检查标准。

比如，可以这样安排一项周报任务。

> 每周五下午读取当前工作空间中“本周记录”文件夹里的材料，整理成本周项目周报。
>
> 保留已经完成、正在进行、风险问题和下周计划四部分。
>
> 结果保存到“周报输出”文件夹，文件名带上生成日期。
>
> 只读取资料并新增周报，不修改原始文件。
>
> 资料不足的地方标记为待补充，不要自行猜测。

模型和 Skill 按任务选择。

拿不准时可以先用默认配置，跑通一次以后，再根据结果决定是否需要更换。

![image-20260805172157441](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122734Z-6898fb3e03562559-1e431121.jpg)

## 灵活使用官方模板

官方提供了新闻简报、周报生成等模板。

![image-20260805172241800](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122734Z-b8cdec93fcb80ac4-8407ee36.jpg)

复制模板以后，先逐项检查路径和时间。

尤其要确认输入目录确实有资料，输出目录已经写对，执行频率也符合需求。

否则任务可能准时运行，却读取了旧材料，或者把结果放到意料之外的位置。

![image-20260805172946995](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122735Z-a8da3c013996f47f-ebf5d569.jpg)

## 前两次运行一定要检查

创建完成后，先观察一两次运行结果。

检查资料是否取对、内容有没有遗漏、文件是否存到预期位置，手机小程序能否收到推送。

如果结果不理想，先修改提示词和目录设置，再等待下一次执行。

确认任务能够稳定运行以后，再让它长期工作。

自动化省下的是反复操作的时间，前提是第一次把范围、路径和验收要求交代清楚。

## 相关阅读

- [用 WorkBuddy 生成每日资讯简报](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/03-work-buddy.html)
- [WorkBuddy 定时发送邮件简报](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/06-work-buddy-scheduled-email-digest.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
