---
title: "WorkBuddy 是什么？核心功能、适用场景与入门方法"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/WorkBuddy指南/01.基础入门/01.初始WorkBuddy.md"
sourceRel: "src/WorkBuddy指南/01.基础入门/01.初始WorkBuddy.md"
rawUrl: "/raw/04-work/agent-guide-office/src/WorkBuddy指南/01.基础入门/01.初始WorkBuddy.md"
sourceSha256: "7ae39b5842bf88a1df7ecd168c19bd8515e1b463bfec3afc5e01e2a892253980"
pageSha256: "7ae39b5842bf88a1df7ecd168c19bd8515e1b463bfec3afc5e01e2a892253980"
contentMode: "local-full"
zh: ""
---

# WorkBuddy 是什么？核心功能、适用场景与入门方法

WorkBuddy 是一款运行在电脑上的通用 AI Agent。

它能在你授权的工作空间里读取文件、整理资料、分析表格、生成文档、制作 PPT，也能通过连接器调用腾讯会议、邮箱等外部服务。

和普通聊天机器人相比，WorkBuddy 会直接处理本地文件，并把结果写回电脑。

刚装好 WorkBuddy，很多人会直接在空白对话框里丢下一句话，然后等它把活干完。

这当然能用。只是任务一复杂，问题很快就出来了。

它读错文件，选错模式，做到一半频繁确认，最后交来的东西看着完整，拿到手里却要重做。

WorkBuddy 上手时需要先弄懂的东西没有那么多。

场景模式、工作模式、工作空间，这三处看明白，后面的连接器、专家、Skill、手机远程和自动化任务才容易用顺。

## 安装以后，先认清主界面

安装很简单。进入 WorkBuddy 官网，按自己的操作系统下载桌面端，完成安装并登录。

![image-20260805141743462](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122715Z-695159c0a852a89d-632a5712.jpg)

登录后的界面分成两块。

左侧放任务、工作空间和功能入口，右侧是主要对话区。

![image-20260805141821577](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122721Z-c3fbb0ffd4294cee-1b54878f.jpg)

先别急着发任务。

对话框附近有几组选项，它们会直接改变 WorkBuddy 接活后的做法。

## 三种场景模式怎么选

WorkBuddy 把常见需求分成代码开发、日常办公和设计创意三种场景。

日常办公适合处理文档、表格、数据分析、深度研究和幻灯片。

写报告、整理资料、做经营分析，通常从这里开始。

![image-20260805141902160](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122716Z-02dfb52b20ba384c-69cb0f02.jpg)

代码开发用于网站、程序、Agent 应用和 Skill 开发。

它会更主动地读取项目文件、修改代码、运行命令并检查结果。

![image-20260805141921836](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122716Z-da47108c7ba1830e-33ae60b9.jpg)

设计创意偏向网站视觉、移动端页面、交互原型、PPT 和品牌设计。

![image-20260805141937800](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122718Z-58d41482aba008cd-be4e6ef9.jpg)

这些入口下面还有更细的任务模板。

以日常办公里的文档处理为例，继续选择竞品对比分析，页面会给出一份已经写好的提示词。

把占位内容换成自己的材料就能发送。

![image-20260805142057526](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122718Z-f106667f3cc1943e-4a793b54.jpg)

简单任务可以直接套模板。

任务涉及公司口径、固定格式或敏感文件时，还是要把规则补全。

模板只能帮你起步，它不知道你的领导在意什么，也不知道哪张表才是最终版本。

## 仅问答、计划和默认执行

场景模式决定它擅长用哪类能力，工作模式决定它现在要不要动手。

「仅问答」只读取和回答，不修改文件。

你想让它读一份合同、解释一张表、盘点目录里有什么，可以先用这个模式。

「计划」会先整理做法，等你确认以后再执行。

任务需要多个步骤，或者你自己还没想清楚结果长什么样，计划模式会更稳。

没有选择任何工作模式时，WorkBuddy 会进入默认执行状态。

需求已经明确，文件范围也清楚，可以直接让它开始做。

![image-20260805142159112](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122717Z-366a60de3f29e410-8c12e515.jpg)

判断起来很简单。只想知道答案，用仅问答。要做两步以上，或者结果还需要讨论，用计划。

任务边界、文件范围和验收条件已经写清，就直接执行。

## 模型和权限，别随手乱选

对话框右下角可以切换模型。

不同模型的上下文长度、图像理解和生成能力会有差别。

长文档任务优先考虑上下文容量，带截图和图片的材料要确认模型支持视觉输入。

![image-20260805142256029](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122720Z-dd6603cecb5cd96f-337fb527.jpg)

设置里也能接入自己的模型服务。

![image-20260805142315603](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122717Z-b2b84b751ab7d23d-6b8d9529.jpg)

权限设置更值得注意。

默认状态下，WorkBuddy 可以在已授权的工作空间里读写文件，遇到删除等敏感动作会停下来确认。

扩大权限以后，操作会省事一些，风险也会跟着增加。

公司电脑里有重要资料时，先保持默认设置。

等工作空间整理好，任务也跑熟了，再决定是否扩大权限。

![image-20260805142356127](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122720Z-d77ba64fdf3c8795-60ed2e08.jpg)

## 加号里藏着资料和连接器

对话框旁边的加号有两类入口。

一类负责添加资料，包括本地文件、腾讯文档、ima 知识库和乐享知识库。

资料已经放在这些服务里时，可以直接选取，无需下载后再上传。

![image-20260805142445559](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122720Z-249a17ed02f9addb-d906621f.jpg)

另一类是连接器，也就是让 WorkBuddy 调用外部服务。

飞书、QQ 邮箱、腾讯会议、腾讯文档、腾讯乐享和 TAPD 都可以从这里授权。

![image-20260805142516225](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122717Z-6530dc6c4f4f8095-854f7957.jpg)

连接器解决的是取数据和做动作的问题。

读取会议转写、查腾讯文档、发送邮件，都要先完成对应服务的授权。

## 工作空间决定它能看见什么

工作空间可以理解为一个项目文件夹。

WorkBuddy 在这里读取材料，也把生成的文档、表格和代码写回这里。

![image-20260805142606753](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122719Z-c931f885e515635c-743446a1.jpg)

这一步最影响结果。

一个项目最好对应一个文件夹。

里面只放当前任务需要的资料，旧版本、无关截图和其他项目的文件先移出去。

WorkBuddy 看见的材料越杂，它越难判断该信哪一份。

文件夹整理好以后，再用「打开本地文件夹」创建工作空间。建好的任务会出现在左侧列表里。

![image-20260805142639211](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122715Z-5f3bb29306545975-74a8195a.jpg)

如果你只准备记住一条基础规则，就记这一条。

先收拾项目文件夹，再开新任务。

## 正式开工前，改好三项设置

设置入口在左下角头像旁边。

![image-20260805142731103](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122719Z-dbd6237fa31650bc-73873171.jpg)

系统设置里可以打开 Skill 自动更新。后面装的 Skill 有新版本时，它会自动更新。

准备使用手机远程，还要打开锁屏远程。电脑锁屏后能否继续工作，取决于这里的设置以及电脑本身的电源状态。

![image-20260805142806213](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122719Z-9135e305cfa98fdb-8772af6b.jpg)

个性化设置里可以打开对话记忆。它会根据后续对话记录偏好。涉及公司资料或多人共用设备时，先了解所在组织的隐私要求，再决定是否开启。

![image-20260805142828218](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122718Z-1df840cfb1de1ff1-39d966a6.jpg)

自定义指令适合放长期有效的规矩。常见内容包括不确定时先问、只修改任务要求的文件、不得编造数据、完成后按指定标准检查。

![image-20260805142928931](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122716Z-1a800fdcbb00a996-8ee3885b.jpg)

规则不用写成几千字。

长期有效的几条留下，项目特有的要求放在项目说明或当前任务里。

## 写在最后

到这里，WorkBuddy 开工前的准备就差不多了。

现在最合适的动作，是新建一个测试文件夹，放进两三份不敏感的资料，再把它打开为工作空间。先切到「仅问答」，发出下面这句话。

```text
请先只读这个文件夹，告诉我有哪些文件、每份文件主要讲什么、哪些内容可能重复。不要修改任何文件。
```

看完它的盘点结果，再切到「计划」模式，让它给出一份整理方案。方案确认以后，才让它开始改文件。

这两个动作走完，你会很快明白模式、权限和工作空间是怎样配合的。后面无论整理文档、分析表格，还是制作 PPT，用的都是同一套思路。

先让它在一个小范围里把事情做对，再把更重要的工作交给它。

## 相关阅读

- [WorkBuddy Skill、专家和专家团怎么用？](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/02-work-buddy-skill.html)
- [用 WorkBuddy 批量整理图片](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/03-work-buddy-images.html)
- [WorkBuddy 手机版远程控制电脑](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/06-work-buddy.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
