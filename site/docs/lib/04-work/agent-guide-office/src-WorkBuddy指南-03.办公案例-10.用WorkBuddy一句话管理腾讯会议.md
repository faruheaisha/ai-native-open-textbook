---
title: "WorkBuddy 管理腾讯会议：创建、修改与整理会议纪要"
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

# WorkBuddy 管理腾讯会议：创建、修改与整理会议纪要

开会前临时切到会议软件，填主题、时间和密码，再把会议号复制回来，这些动作单独看都不复杂。

一天里碰上几次，人就会一直在编辑器、会议软件和聊天窗口之间来回切换。

WorkBuddy 安装腾讯会议 Skill 后，可以直接用自然语言预约、修改、取消和查询会议。

会议结束以后，还能继续查看录制、转写内容和智能纪要。

这篇教程从获取授权开始，把安装、创建会议、修改安排和整理会后内容走一遍。

## 先看腾讯会议 Skill 能做什么

腾讯会议 Skill 覆盖了会前、会中和会后的多项操作。

会前可以创建普通会议和周期会议，修改主题、时间与密码，也可以取消会议或查询当天安排。

会议进行中，可以查看参会成员、受邀成员和等候室信息。会议结束后，可以继续获取录制、转写和智能纪要。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122805Z-ed599029acc28774-410570b5.png)

这些功能都通过腾讯会议账号授权。

第一次使用时，需要先获取个人 Token，再回到 WorkBuddy 完成 Skill 安装。

## 获取个人 Token

打开 [腾讯会议 Skill 官方页面](https://meeting.tencent.com/ai-skill.html)，使用自己的腾讯会议账号登录。

授权页面会提供个人 Token。

复制之前先确认登录的是准备交给 WorkBuddy 使用的会议账号，避免把个人账号和工作账号弄混。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122807Z-47d26426fe4d1546-0a0a230b.png)

登录完成后，按照页面中的 WorkBuddy 原生接入流程继续配置。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122806Z-339450883c50d252-e28b3a59.png)

Token 是个人凭证，不要放进公开文章、群聊截图或共享文档，也不要交给无关人员。

后续安装或调用失败时，可以重新打开授权页面，检查原凭证是否失效并获取新 Token。

## 回到 WorkBuddy 安装 Skill

授权页面会给出 WorkBuddy 的安装命令。

复制页面中对应的命令，回到 WorkBuddy 对话窗口后粘贴执行。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122808Z-ca0f67b0d05f8fa7-96f19183.png)

安装过程中，WorkBuddy 会创建任务，并依次完成下载、解析和配置。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122809Z-3dd53d20f6458572-1de067ef.png)

任务结束后，打开已安装技能列表，检查腾讯会议 Skill 是否已经出现。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122808Z-d41c1a4509d28a49-02ac2538.png)

如果技能列表里没有看到它，先查看安装任务的报错信息。

遇到授权错误时，再回到 Token 页面检查凭证。不要反复粘贴旧命令，以免漏掉具体报错。

## 先创建一场测试会议

安装完成后，先用一场普通会议验证。指令里写清主题、开始时间和结束时间。

```text
帮我创建一个腾讯会议，主题是技术方案讨论，今天下午 3 点开始，下午 4 点结束。

创建前先显示会议主题、日期和时间，等我确认后再提交。
```

确认信息无误后再创建。成功结果里应该能看到会议主题、会议时间和会议号。

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122810Z-847955d39381042b-d2e86caa.png)

如果会议需要密码，可以在创建时一起说明。

官方示例提到的常见密码规则为 4 到 6 位数字，设置时仍以当前页面给出的规则为准。

周期会议要多写一项重复规则。

每天、工作日、每周、每两周和每月的含义不同，最好直接说明星期和时间。

```text
帮我创建一个周期性腾讯会议，主题是团队周会。

每周一上午 10 点开始，持续 1 小时。创建前先返回首次会议日期和重复规则，确认后再提交。
```

## 修改和取消前先查会议

改期和取消会影响其他参会者，不能只凭一句「把下午的会取消」。同一天可能有多场会议，名称也可能相近。

先查询当天安排，找到准确的会议号。

```text
查一下我今天有哪些腾讯会议，列出主题、开始时间、结束时间和会议号。
```

确认会议号以后，再进行修改。

```text
请查询会议号 450-743-140 的当前信息。

如果会议主题是技术方案讨论，把开始时间改到下午 4 点，会议时长保持不变。修改前先显示新的起止时间，等我确认后再执行。
```

取消会议也采用同样顺序。先查主题和时间，再明确要求取消。会议号不要直接照抄示例，使用自己查询到的真实编号。

## 在对话里查询参会成员

需要确认人员情况时，可以直接询问某场会议有哪些人参加、邀请了谁，或者等候室里当前有谁。

```text
请查询会议号 450-743-140 的参会情况，分别列出受邀成员、已参会成员和当前等候室成员。
```

成员查询同样要带会议号。只说「这个会议」时，要确保当前对话里只有一个明确的会议对象。对话已经讨论过多场会议，重新写一次编号会更稳妥。

## 会后继续处理录制和纪要

会议结束后，可以在同一个对话里查询最近的会议录制、获取下载链接、查看转写内容，也可以直接获取智能纪要。

```text
请查询最近一场主题为技术方案讨论的腾讯会议。

先返回会议时间和参会成员，再获取转写内容和智能纪要。请从转写中整理已经确定的结论、待办事项、负责人和待确认问题。

找不到负责人或完成时间时保持为空，不要猜测。
```

![](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122809Z-12bd47d5c2f33360-e8e5918a.png)

如果只想核对某个议题，也可以在转写中搜索关键词。

```text
请在这场会议的转写内容中搜索「技术方案」，列出相关发言和所在位置，并附上前后必要内容。
```

自动生成的纪要适合先做整理，正式发给团队前还要对照转写检查。尤其是负责人、完成时间和最终决定，不能只看摘要就直接确认。

## 写在最后

第一次使用腾讯会议 Skill，先完成三个小动作。

安装后创建一场测试会议，查询一次会议详情，再读取一份会后纪要。

等这三个动作都能返回正确结果，再处理周期会议、正式改期和取消。

凡是会影响其他参会者的操作，都先查询当前信息，再显示修改结果，最后执行。

## 相关阅读

- [WorkBuddy 连接器整理会议纪要](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/04-work-buddy-meeting-notes.html)
- [WorkBuddy 定时发送邮件简报](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/06-work-buddy-scheduled-email-digest.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
