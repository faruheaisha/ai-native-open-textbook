---
title: "扣子Coze实战：一键打造自己的口播数字人视频"
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

# 扣子Coze实战：一键打造自己的口播数字人视频

大家好，我是汤师爷，专注AI智能体分享~

相信有不少朋友在问，有没有办法不出境，也能拍出专业的口播视频？

毕竟很多时候，我们想分享内容，却因为不敢出镜，迟迟不敢开始。

录制视频时总是觉得自己表情不自然，一遍遍重录。

新手拍摄常见的三大难题，让很多人望而却步：

**1. 镜头恐惧**

面对镜头时容易紧张、结巴，甚至完全忘记准备好的台词。

很多人需要反复拍摄几十次才能完成一个简单的片段，这严重影响了拍摄效率。
**2. 表现力不足**

即使克服了紧张感，很多新手在镜头前依然显得生硬、不自然。

语气平淡、表情僵硬、肢体动作不协调等问题需要大量练习才能改善，这个过程往往需要几个月甚至更长时间。
**3. 成本压力**

想要制作优质视频，投入成本远超很多人的想象。

不仅要租用专业的场地和设备（如补光灯、摄像机、收音设备等），还需要聘请专业团队（包括化妆师、摄像师、剪辑师等），这些支出加起来往往让创作者望而却步。

今天我就教你搭建一个口播数字人智能体，不露脸也能轻松搞定。

借助Coze工作流，直接用文案就能生成逼真的数字人口播视频。

篇幅不短，欢迎先收藏，再慢慢看。如果觉得有帮助，也请顺手点个赞、在看、转发支持一下~

### 1.选择数字人插件

Coze本身并没有提供官方的数字人插件，但市面上却有很多第三方插件可以用。

今天我们要用到的，就是「飞影数字人插件」。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122530Z-b8722e2f39939c93-ef1aa5a1.jpg)

插件这么多，我们怎么选呢？

建议大家关注几个核心指标：智能体使用数、调用量、成功率、执行时间。

这些数据，可以帮助我们快速筛选出优质的插件。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122534Z-ac3b27c503f7dc9e-e7e0b911.jpg)

## 2. 前期准备阶段

在搭建口播数字人智能体之前，需要准备以下任务：

1. 登陆飞影官网（[https://hifly.cc?promoterCode=XmcyWURYbnVW77Vn](https://hifly.cc/?promoterCode=XmcyWURYbnVW77Vn)）
2. 克隆自己的专属数字人形象备用。
3. 克隆自己的声音备用。

完成数字人和声音克隆后，我们就可以开始搭建口播数字人智能体了。

## 3.智能体的搭建流程

智能体的搭建流程主要分为两个步骤：梳理工作流、设置智能体。

### **3.1 梳理工作流**

将口播数字人视频创作流程，转化为可自动化运行的工作流节点。

1. 通过开始节点，收集必要的参数
2. 使用飞影数字人插件，一键生成数字人视频
3. 监控数字人的任务状态，直到任务完成
4. 输出数字人的视频链接

### 3.2 设置智能体

1. 设置人设与逻辑：配置口播数字人智能体的决策逻辑
2. 设置快捷指令：配置智能化的快捷指令，让智能体更快速、便捷地响应用户的需求
3. 测试并发布：全面的功能测试，确认正常后，将智能体正式发布到生产环境

## 4.创建工作流

登录Coze官网，在“资源库-工作流”里新建一个空白工作流，取名“spoken_digital_human”。

### 3.1 开始节点

- 输入：
    - hifly_id：hifly_agent_token，飞影数字人产品的秘钥
    - speaker_id：克隆声音 ID
    - digital_human_id：克隆数字人 ID
    - text：视频文案

**关于hifly_id、speaker_id、digital_human_id如何获取，下文会重点介绍。**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122531Z-368bcb39694acba8-ac2e2a2e.jpg)

### 3.2 一键生成数字人视频

我们将使用【飞影数字人】插件的create_lipsync_video2功能。

通过这个功能，我们可以一键生成口播数字人视频。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122533Z-f256e2efb0631f03-456f770b.jpg)

我们选择飞影数字人插件的create_lipsync_video2功能，插件节点命名为【一键生成数字人视频】

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122526Z-e2fc1ae7dca0a728-3ee710c8.jpg)

- 输入：
    - hifly_id：开始 - hifly_id
    - speaker_id：开始 - speaker_id
    - digital_human_id：开始 - digital_human_id
    - text：开始 - text

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122535Z-a72ceee4ce48b575-bd6cd110.jpg)

### 3.3 设定循环，每10S监控任务的状态

数字人视频生成通常需要几分钟，我们会用任务查询插件，设定一个无限循环，每隔10秒就自动检查一次。

当插件返回任务完成状态时，就会自动停止循环，生成的视频链接就能顺利拿到。

我们将设定【循环】节点，每10S监控任务的状态。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122532Z-1e5f7e4c40cffc31-b2eb4ed5.jpg)

- 循环设置：无限循环
- 输出：
    - output：监控数字人的任务状态 - video_Url

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122527Z-adb6bd10b3589490-40a710e7.jpg)

### 3.5 配置循环体

**1.我们将使用【飞影数字人】插件的inspect_video_creation_status功能。**

监控任务的状态，当任务完成后，输出数字人视频的链接。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122526Z-881da644aeac64ad-3364335c.jpg)

- 输入：
    - job_id：作品ID，一键生成数字人视频-job_id
    - hifly_id：开始-hifly_id

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122535Z-dacaeb709dc90d9b-5783ae7d.jpg)

**2.通过选择器节点，判断任务是否完成。**

如果监控数字人的任务状态 - status = 2，说明视频还在生成中。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122529Z-9982bd7973045cab-90ee2ffd.jpg)

**3.如果视频还在生成中，则使用【定时器】插件，等待10秒。**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122530Z-947a0776991a7b52-36a27c0e.jpg)

- 输入：
    - seconds：等待时间

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122618Z-7698c579d39cf289-f9813aa5.jpg)

**4.如果视频生成完成，则使用【终止循环】插件。**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122618Z-df6c5bd151f67a14-5d2e3fc2.jpg)

### 3.6 结束节点：输出数字人视频链接

- 输出：
    - output：设定循环，每10S监控任务的状态-output

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122616Z-d9eee6325d3fbeb0-89916a76.jpg)

这样，工作流就搭建好了，最后点击发布工作流。

## 4.创建智能体

### 4.1 新建智能体

在Coze平台创建一个新的智能体，命名“口播数字人智能体”。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122529Z-62e053f635ffd4ab-d6b6e097.jpg)

### 4.2 设置人设与逻辑

配置智能体的特征、回复风格和决策逻辑。

```markdown
# 角色
你是口播视频生成神器，负责处理用户上传的视频、文本或音频，生成专属定制数字人视频，并提供相关服务。

## 技能
### 技能 1: 生成并反馈视频
1. 接收用户上传的视频、文本或音频后，启动名为“数字人视频生成”的工作流进行处理。
2. 在工作流运行完毕后，向用户展示生成的视频链接，并建议用户复制链接下载视频。

## 限制
- 严格在“数字人视频生成”工作流运行结束后，按要求展示视频链接并给出下载建议。
- 将“数字人视频生成”工作流添加进智能体。 
```

### 4.3 设置快捷指令

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122536Z-c9d467939a0d3c51-411fd0ac.jpg)

**1.按钮名称：根据文本，生成口播数字人视频**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122617Z-c52d37faa1e686c7-6c58cabb.jpg)

**2.指令名称：digital_human**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122616Z-af81d8cac144d78b-43c2bdf8.jpg)

**3.工具：直接使用工作流**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122531Z-b8151ac660c516c8-e03d746d.jpg)

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122529Z-bbc5a8530289a1d8-10ce144e.jpg)

**4.指令内容：生成数字人视频 &#123;&#123;digital_human_id&#125;&#125;&#123;&#123;hifly_id&#125;&#125;&#123;&#123;speaker_id&#125;&#125;&#123;&#123;text&#125;&#125;**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122533Z-dd96bcc353a20457-38b0a61b.jpg)

### 4.4 测试并发布

全面的功能测试，确认正常后，将智能体正式发布到生产环境。

**1.点击快捷按钮：根据文本，生成口播数字人视频**

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122616Z-d38933e73f37007c-68ed6460.jpg)

**2.获取hifly_id**

hifly_id就是飞影数字人会员的秘钥，hifly_agent_token，在个人中心获取。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122528Z-30d40b0e9afd5f00-194818eb.jpg)

**3.获取speaker_id**

speaker_id是克隆声音 ID，在声音克隆菜单下，获取声音 ID。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122617Z-b0f6ed58fd9e8c61-1a693c9c.jpg)

**4.获取digital_human_id**

digital_human_id是克隆数字人 ID，在数字人菜单下，获取素材 ID。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122532Z-3a555980cfafb27c-782926cc.jpg)

**5.填写所有参数，并测试智能体**

- hifly_id：hifly_agent_token，飞影数字人产品的秘钥
- speaker_id：克隆声音 ID
- digital_human_id：克隆数字人 ID
- text：视频文案

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122528Z-d4736c72fad65973-dcaaa692.jpg)

执行后，会输出数字人视频的链接：

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122534Z-c4c08e1d4afa1a09-541ae6bb.jpg)

最后，用剪映给视频加上音乐和字幕，就可以生成最终的口播视频啦~

## 5.总结

通过本文的介绍，我们学会了如何使用Coze工作流和飞影数字人插件，轻松打造一个专业的口播数字人智能体。

这套方案不仅让我们摆脱了出镜的困扰，还能大大提升内容创作的效率。

希望这个方法能帮助你更好地传递价值，创作出更多优质的内容。

如果你觉得这篇文章对你有帮助，欢迎点赞、收藏，不迷路，并转发给有需要的朋友

你的每一次互动都是我持续创作的动力！感谢支持～
