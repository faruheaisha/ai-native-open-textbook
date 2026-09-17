---
title: "职场人最头疼的问题，用 WorkBuddy 10分钟搞定，保姆级实操教程！"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/WorkBuddy指南/03.办公案例/11.用WorkBuddy搭一套每天自动送到邮箱的资讯简报.md"
sourceRel: "src/WorkBuddy指南/03.办公案例/11.用WorkBuddy搭一套每天自动送到邮箱的资讯简报.md"
rawUrl: "/raw/04-work/agent-guide-office/src/WorkBuddy指南/03.办公案例/11.用WorkBuddy搭一套每天自动送到邮箱的资讯简报.md"
sourceSha256: "f5af565fa5d1404a7cf27c90b8604f6b577c309e829c85a5f6c2f3dc9b69e956"
pageSha256: "f5af565fa5d1404a7cf27c90b8604f6b577c309e829c85a5f6c2f3dc9b69e956"
contentMode: "local-full"
zh: ""
---

# 职场人最头疼的问题，用 WorkBuddy 10分钟搞定，保姆级实操教程！

大家好，我是汤师爷。

每天早上，你是不是也在重复这套动作？

先看一眼天气，再翻当天的 AI 行业动态和重点新闻，接着打开 GitHub，看看有没有值得关注的 AI 项目。

每个地方只看一会儿，来回切上几次，注意力已经散了。

看到有用的内容再顺手收藏，链接越攒越多，最后读完的却没有几条。

可完全不看又不放心，总怕漏掉和工作有关的消息。

能不能让这些信息先被筛一遍，再在固定时间送到邮箱？这就是这篇要用WorkBuddy做的事。

每天早上 8 点 30 分，一封简报进入 QQ 邮箱。

里面有杭州当天的天气、最近值得看的 AI 行业动态、几条重点新闻，还有 GitHub 当日热门 AI 项目。

打开邮件，几分钟看完。想继续了解的内容，再点原文链接往下读。

## 先从一个信息源开始

打开 WorkBuddy 的 SkillHub，进入信息资讯分类，可以看到新闻、AI 行业动态、GitHub 项目、论文、博客、公众号搜索和事实核查等 Skill。

![SkillHub 中的信息资讯类 Skill](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122742Z-88e3b9fd2a979496-4f6eee8e.jpg)

可选的 Skill 很多，我们先从 GitHub 热门 AI 项目开始。

这个来源的好处是内容结构比较明确，项目名称、仓库链接、主要语言、Star 数和 Fork 数都可以直接整理，结果也容易检查。

在 SkillHub 里搜索并安装「GitHub AI趋势追踪」。

![在 SkillHub 中找到 GitHub AI趋势追踪](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122742Z-0181d71d6ae1655b-885c2376.jpg)

安装以后，先测试一下。

```text
/GitHub AI趋势追踪 获取 GitHub 当日热门 AI 项目。

先收集候选项目，再按主题、主要语言、Star 数、Fork 数和近期活跃情况整理，保留前 10 个。

每个项目写明排名、项目名称、GitHub 链接、主题、主要语言、Star 数、Fork 数和近期活跃情况。

近期活跃情况用最近一次能够确认的提交日期或版本发布日期说明。

无法确认仓库链接或核心数据的项目不要写入结果，拿不准的主题归类要明确说明，不要猜测。
```

![WorkBuddy 开始执行 GitHub AI 趋势任务](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122741Z-737d030809c978a6-d7f420c2.jpg)

![WorkBuddy 整理 GitHub 热门 AI 项目](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122751Z-15e492cd4c2d8e78-a1d0b29a.jpg)

指令发出后，WorkBuddy 会先生成一版结果。

这个时候不用急着往下走，先检查项目是不是 AI 相关，仓库链接能不能打开，主题和主要语言是否对应，Star 数、Fork 数及近期活跃情况有没有依据。

这一步看起来有点笨，但很有用。

后面每天收到的内容是否可信，很大程度上取决于这一轮有没有把规则试清楚。

这一版先保留十个项目，和后面的完整简报保持一致。

至于某种语言要不要排除、十条能不能看完，等实际收到几天邮件以后再调整。

![GitHub AI 项目日报的整理结果](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122743Z-7ecb14b7621cfae7-02e9c23a.jpg)

简报里的 GitHub 栏目到这里就跑通了。

## 再把邮箱接进来

内容可以正常生成出来，下一步才是发送。

这篇用 QQ 邮箱演示，先打开 WorkBuddy 的连接器，完成 QQ 邮箱配置。

![image-20260808172656027](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122744Z-66592da8966f50c6-54588607.jpg)

邮箱连好以后，不要立刻创建长期自动任务，先手动发一封。

在发送邮件之前，再添加几个需要用到的 Skill，包括天气查询、AIHOT 和腾讯新闻。

![image-20260808172858292](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122750Z-9dc80cbb39525d64-65c16557.jpg)

这次手动运行有两个目的。一是检查简报内容是否符合要求，二是确认 QQ 邮箱能否正常收到邮件。

可以这样输入。

```text
请生成今天的资讯简报，并发送到我已经连接的 QQ 邮箱。

简报包含杭州今天天气、AI 行业动态、重点新闻和 GitHub 当日热门 AI 项目。

天气注明城市、日期和出行提醒。AI 行业动态和重点新闻各保留 5 条，写明标题、发布日期、两句摘要和原文链接。

GitHub 先收集候选 AI 项目，再按主题、主要语言、Star 数、Fork 数和近期活跃情况整理，保留前 10 个。

近期活跃情况用最近一次能够确认的提交日期或版本发布日期说明。

无法确认来源或发布日期的资讯不要写入简报。如果 AI 行业动态、重点新闻或 GitHub 项目没有足够的有效内容，请按实际数量输出并说明，不要使用旧内容补足数量。

发送前先显示邮件标题和正文预览。
```

![image-20260808173243259](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122748Z-ef0198278fc4d05e-de6d1e39.jpg)

WorkBuddy 会先拆出任务列表，依次查询天气、AI 行业动态、重点新闻和 GitHub 项目。

![image-20260808173648870](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122743Z-aba80d4cfe8b3f52-c989951b.jpg)

我这次执行到腾讯新闻 CLI 时暂停了一次，因为这个 Skill 需要 AppKey。

按照页面提示领取后，把 AppKey 提交给 WorkBuddy，任务就会从中断的位置继续执行。

配置成功以后，后面再次运行通常可以直接复用。

![image-20260808173921657](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122745Z-6fe1badd3402f7b0-c527055c.jpg)

大概 2 到 3 分钟后，WorkBuddy 完成了检索和排版，先把邮件标题和正文预览显示出来。

包括杭州今日天气。

![image-20260808174628473](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122746Z-8b36074575313a9b-f46c139e.jpg)

AI 行业动态。

![image-20260808174649149](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122747Z-cacbffddbcc3e2b7-fb745560.jpg)

重点新闻。

![image-20260808174705939](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122751Z-bdecdbeee5ff9c67-28632d9c.jpg)

GitHub 当日热门 AI 项目。

![image-20260808174720395](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122749Z-2e2fd1a87a1166b0-58fd9bef.jpg)

四个栏目都生成以后，我先核对数量、发布日期、摘要和原文链接，再检查 GitHub 项目的主题、语言和仓库数据。

WorkBuddy 随后会询问是否确认发送，需要修改时可以直接指出，内容没有问题就回复「发送」。

我确认预览没有问题后输入「发送」，大概再等 2 到 3 分钟，QQ 邮箱就收到了这封简报。

![image-20260808180235563](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122745Z-f154bb1f78402da8-7ed6172f.jpg)

收到邮件还不算结束。

点开几条原文链接，核对标题、日期和摘要。

再看天气是否对应杭州，GitHub 项目的仓库链接、主题、主要语言、Star 数、Fork 数和近期活跃情况能否对上。

如果邮件迟迟没到，先检查垃圾邮件目录、收件地址和连接器状态。

这封测试邮件读起来舒服，里面的信息也经得起核对，才值得每天发送。

## 手动跑通以后再设置定时任务

测试完成，就可以把同一套要求改成自动化任务。

```text
请创建一个自动化任务。

每天北京时间 8 点 30 分生成资讯简报，并发送到已经连接的 QQ 邮箱。

简报包含杭州今天天气、AI 行业动态、重点新闻和 GitHub 当日热门 AI 项目。

天气注明城市、日期和出行提醒。AI 行业动态和重点新闻各保留 5 条，写明标题、发布日期、两句摘要和原文链接。

GitHub 先收集候选 AI 项目，再按主题、主要语言、Star 数、Fork 数和近期活跃情况整理，保留前 10 个。

近期活跃情况用最近一次能够确认的提交日期或版本发布日期说明。

无法确认来源或发布日期的资讯不要写入简报。如果 AI 行业动态、重点新闻或 GitHub 项目没有足够的有效内容，请按实际数量输出并在邮件中说明，不要使用旧内容补足数量。

生成完成后直接发送，不再等待人工确认。
```

这里和前面的手动测试有一处区别。手动测试需要先看预览，再确认发送。

定时任务如果继续等待回复，邮件就不能按时自动送达，所以我在测试通过后取消了人工确认。

如果你更看重逐封审核，也可以保留预览要求。代价是每天都要回到 WorkBuddy 里确认一次，整套流程只能算半自动。

执行时间要写清小时、分钟和时区。只说「每天早上」太宽，WorkBuddy 仍然要猜具体执行时间。

关于资讯条数的补充也很重要。某个资讯栏目当天只有两条符合要求的消息，那就发两条。自动任务没有必要每天填满固定数量，用旧内容凑数只会让人更快忽略它。

任务创建后，可以在左侧边栏的自动化目录中查看。

![image-20260808180805845](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122744Z-300dd7d190ecf399-8195586d.jpg)

打开任务详情，检查执行时间、重复周期、邮箱账号、四个栏目及直接发送设置。这里发现问题，直接修改任务就行，不用从头再建一遍。

![image-20260808180705999](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122749Z-749ec2981aa2d856-6cb1dd25.jpg)

到这里，基础版本已经搭好。

但坦率地讲，自动化任务创建成功，只能说明配置保存了。

它是否值得长期保留，还要看接下来几次实际发送。

## 写在最后

跑完整套流程以后，会发现定时发送并不难。

每天留下什么，才最考验人的判断。

一份好简报不需要替你读完整个互联网。

它只要在固定时间，把那几条值得点开的内容送到眼前，就已经够了。

感谢你看到这里，如果觉得不错，随手点个赞、在看、转发三连~
