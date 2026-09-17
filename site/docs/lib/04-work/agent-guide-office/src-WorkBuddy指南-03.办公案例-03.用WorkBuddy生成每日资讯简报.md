---
title: "用 WorkBuddy 生成每日资讯简报：收集、筛选与定时执行"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/WorkBuddy指南/03.办公案例/03.用WorkBuddy生成每日资讯简报.md"
sourceRel: "src/WorkBuddy指南/03.办公案例/03.用WorkBuddy生成每日资讯简报.md"
rawUrl: "/raw/04-work/agent-guide-office/src/WorkBuddy指南/03.办公案例/03.用WorkBuddy生成每日资讯简报.md"
sourceSha256: "79cb305704d145f11cfeefd96e40e28db4d2a988b974d7a20f6d47f430f4a868"
pageSha256: "79cb305704d145f11cfeefd96e40e28db4d2a988b974d7a20f6d47f430f4a868"
contentMode: "local-full"
zh: ""
---

# 用 WorkBuddy 生成每日资讯简报：收集、筛选与定时执行

每天整理资讯，最容易走向两个极端。

一种是什么都想收，最后攒下几十条链接，没有时间点开。

另一种是把提醒设得太勤，手机不断弹出消息，没过几天就开始忽略通知。

WorkBuddy 可以把收集、筛选、摘要和定时发送接在一起。

配置完成后，每天固定时间收到一份简报，点开就能看到当天值得关注的内容和原始链接。

这件事要做好，重点不在收集得多。

每天留下多少条、为什么留下、消息是否有可靠来源，这些规则更重要。

## 先选一个明确的信息源

打开 SkillHub 的信息资讯分类，可以看到新闻、AI 行业、GitHub 项目、论文、博客监控、公众号搜索和事实核查等 Skill。

![image-20260806141659281](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122737Z-88e3b9fd2a979496-28bc286b.jpg)

第一次配置时，不必把所有来源一起接上。

先选一个和工作场景直接相关的来源，把任务跑顺，再考虑增加其他渠道。

例如，你关注AI行业发展，可以从 GitHub 热门AI项目开始。

可以先搜索并手动安装「GitHub AI趋势追踪」技能。

![image-20260806142801906](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122737Z-0181d71d6ae1655b-f42694ea.jpg)

然后，告诉WorkBuddy 每天获取一次榜单，按主题或语言筛选，再给每个项目补上链接和简介。

```text
/GitHub AI趋势追踪 每天早上 7 点获取 GitHub 当日热门 AI 项目。

先收集候选项目，再按主题、主要语言、Star 数、Fork 数和近期活跃情况整理，保留前 10 个。

每个项目写明排名、项目名称、GitHub 链接、主要语言、Star 数、Fork 数和一句中文简介。

没有可靠信息的字段留空，不要猜测。
```

![image-20260806141908106](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122738Z-737d030809c978a6-389e41ce.jpg)

![image-20260806142319266](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122736Z-15e492cd4c2d8e78-b32c0181.jpg)

任务创建成功后，WorkBuddy还会先手动运行一次。

结果里应该能看到项目排名、仓库链接、主要语言和简介。

内容若太长，可以把数量从 10 个减到 5 个。

某种语言与团队无关，也可以直接排除。

![image-20260806142346433](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122736Z-7ecb14b7621cfae7-85f5f0e3.jpg)

## 写在最后

资讯任务建好以后，先连续看几天结果，别急着彻底放手。

每天检查一下有没有重复项目，仓库链接能否打开，推荐内容和自己的工作是否相关。

十条总是看不完，就减到五条。

某种语言或某类项目连续几天都被跳过，可以直接写进排除条件。

抓取失败或字段缺失时，也让 WorkBuddy 如实说明。

当天没有合适的内容，少发几条没有关系，不要用旧榜单补足数量。

一份日报不需要覆盖整个 GitHub。

它只要在固定时间，把少数值得关注的项目送到眼前，已经完成了任务。

等这份 GitHub 日报稳定运行后，再增加 AI 新闻、论文或博客。

一次增加一个来源，观察几天，再决定留下还是停掉。

最终每天收到的内容应该帮你少开几个网站，也更快找到那一两个值得点进去的项目。

## 相关阅读

- [WorkBuddy 自动化任务设置方法](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/07-work-buddy-automation.html)
- [WorkBuddy 定时发送邮件简报](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/06-work-buddy-scheduled-email-digest.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
