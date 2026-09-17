---
title: "WorkBuddy 连接器教程：读取转写并整理会议纪要"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/WorkBuddy指南/01.基础入门/04.用WorkBuddy连接器整理会议纪要.md"
sourceRel: "src/WorkBuddy指南/01.基础入门/04.用WorkBuddy连接器整理会议纪要.md"
rawUrl: "/raw/04-work/agent-guide-office/src/WorkBuddy指南/01.基础入门/04.用WorkBuddy连接器整理会议纪要.md"
sourceSha256: "7e0bc0d89be70f963de976d258990e37b7e6bb29f8ab17d9bc6357bd24415bf0"
pageSha256: "7e0bc0d89be70f963de976d258990e37b7e6bb29f8ab17d9bc6357bd24415bf0"
contentMode: "local-full"
zh: ""
---

# WorkBuddy 连接器教程：读取转写并整理会议纪要

开完会以后，最费时间的往往是重新听录音、找结论，再把负责人和截止日期逐项抄出来。

如果会议已经产生转写内容，可以让 WorkBuddy 通过连接器读取，再按照固定格式整理。

## 先连接腾讯会议

先在连接器列表中找到腾讯会议，完成授权。

授权使用的账号需要能够访问目标会议，否则即使会议号正确，WorkBuddy 也读不到对应内容。

![image-20260805154448745](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122729Z-30bdb44dcba90dd5-4f15a156.jpg)

这里有一个硬条件。

会议必须开启录制，系统才有转写内容可供读取。

没有录制，WorkBuddy 无法还原会上说过什么，也不能根据会议号凭空生成纪要。

如果连接器已经授权，但始终找不到会议，可以检查会议号是否正确，再确认当前账号是否有访问权限。

## 把输出要求一次说清楚

会议结束后，把会议号和输出要求一起交给 WorkBuddy。

只说「帮我整理会议纪要」，得到的内容可能很长，也可能把讨论过程和最终决定混在一起。

提前规定结构，后面核对会轻松很多。

可以直接使用下面这段要求。

```text
使用腾讯会议连接器，读取会议号 xxx 的转写和纪要。

请整理三部分内容。

用三句话概括会议结论。

制作决策表，列出确定的事项和作出决定的人。

制作待办表，列出事项、负责人和截止日期。

会上没有明确负责人的项目标记为待认领，不得推测。
```

![image-20260805154534213](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122728Z-5d009fa070b9bd49-b93e66ce.jpg)

这段要求把结果拆成三个部分。三句话结论概括会议结果，决策表记录确定事项，待办表单独列出后续行动。

![image-20260805154644850](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122728Z-9f84fb8382656a61-14aa71fa.jpg)

任务生成以后，先核对决策事项，再重点检查负责人和截止日期。

会上只讨论过、还没有确定的内容，不应该写进决策表。

提到任务却没有指定负责人的项目，应当保留为待认领。

截止日期没有明确说出，就留空或标记为未确定。

## 写在最后

这套流程跑通以后，可以把上面的提示词保存成常用模板。

以后整理同类会议，只需要更换会议号，再根据会议类型调整表格字段。

周会可以保留负责人和截止日期，评审会则可以增加评审结论和待补材料。

这样整理出来的纪要，后续可以直接拿去跟进。

## 相关阅读

- [用 WorkBuddy 管理腾讯会议和会后纪要](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/10-work-buddy-tencent-meeting.html)
- [WorkBuddy 定时发送邮件简报](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/06-work-buddy-scheduled-email-digest.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
