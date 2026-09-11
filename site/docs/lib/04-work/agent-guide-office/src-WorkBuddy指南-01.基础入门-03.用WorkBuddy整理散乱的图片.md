---
title: "用 WorkBuddy 批量整理图片：分类、重命名与检查方法"
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

# 用 WorkBuddy 批量整理图片：分类、重命名与检查方法

整理型任务很适合第一次上手 WorkBuddy。

任务做完以后，文件去了哪里、数量有没有变化，打开文件夹就能看到。

即使结果不符合预期，也容易找到是哪条要求没有说清楚。

下载文件夹通常最容易变乱。

网页截图、聊天图片、文章配图和临时下载的素材混在一起，文件名还常常是一串数字。

图片积累得多了，找一张刚下载的图都要来回翻好几遍。

这次让 WorkBuddy 找到下载文件夹顶层的图片，把它们集中移动到一个新文件夹。

## 先把任务范围说清楚

开始前，先确认 WorkBuddy 已经获得下载文件夹的访问权限。

移动和复制不同，执行以后，图片会离开原来的位置。

因此第一次练习最好把范围收紧，只处理下载文件夹顶层，不进入任何已经整理好的子文件夹。

可以直接输入下面这段要求。

```text
帮我整理下载文件夹里散乱的图片。

在下载文件夹中新建「图片整理结果」文件夹。

只处理下载文件夹顶层的 JPG、JPEG、PNG、WebP 和 GIF 文件，不要进入任何子文件夹，也不要处理子文件夹中的图片。

把符合条件的图片直接移动到「图片整理结果」文件夹，不需要分类，也不需要等我确认。

不要删除或改动图片内容，也不要修改原文件名。如果目标文件夹中已经存在同名文件，就跳过该文件，不能覆盖。

完成后告诉我成功移动了多少张图片，以及哪些图片因为同名被跳过。
```

![image-20260805155317065](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122726Z-144192703e811263-23d6ed67.jpg)

## 查看图片移动结果

WorkBuddy 会扫描下载文件夹顶层，把符合格式的图片直接移动到「图片整理结果」。

![image-20260805152921020](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122727Z-bd361801a31f82f1-bc5041e9.jpg)

移动完成后，原来散落在下载文件夹顶层的图片会集中到「图片整理结果」中。

图片内容和文件名保持不变，变化的只有文件所在位置。

原有子文件夹及其中的图片不会受到影响。

如果目标文件夹里已经有同名文件，WorkBuddy 会保留现有文件，同时跳过准备移动的那一张。

被跳过的图片仍然留在下载文件夹顶层，不会丢失，也不会被改名。

![image-20260805152600799](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122727Z-6f0450308c12cffe-b9eadbf3.jpg)

## 完成后检查三个地方

先打开「图片整理结果」，确认图片数量和 WorkBuddy 汇报的移动数量一致。

再随机打开几张图片，检查文件能否正常读取。

最后看一眼下载文件夹里的原有子目录，确认这些目录没有变化。

以后整理文档、课件和项目资料，也可以沿用这套写法。

先限定目录层级和文件类型，再说明移动还是复制，同时规定同名文件不能覆盖，最后要求它汇报实际处理结果。

任务边界写清楚以后，WorkBuddy 才知道哪些文件可以碰，哪些地方要停下来。

## 相关阅读

- [WorkBuddy 文件处理：批量重命名、纪要与视频翻译](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/05-work-buddy-file-management.html)
- [用 WorkBuddy 整理桌面发票](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/02-work-buddy.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
