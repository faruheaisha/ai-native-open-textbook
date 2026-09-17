---
title: "前言"
sourceId: "04-work/zhijian-ai-bluebook-workbuddy-harness"
sourceTitle: "智见 AI 蓝皮书：WorkBuddy Harness"
sourceKind: "实践案例集"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/zjp1997720/zhijian-ai-bluebook-workbuddy-harness"
entryUrl: "https://github.com/zjp1997720/zhijian-ai-bluebook-workbuddy-harness/blob/6ac68cd42a01add16568d1ab9cf2399822467fad/01-前言.md"
sourceRel: "01-前言.md"
rawUrl: "/raw/04-work/zhijian-ai-bluebook-workbuddy-harness/01-前言.md"
sourceSha256: "300ee1d12b8cacf9bd7b818e31f9fc70252312a59b8464645a9c5ffd8be9b3f2"
pageSha256: "300ee1d12b8cacf9bd7b818e31f9fc70252312a59b8464645a9c5ffd8be9b3f2"
contentMode: "local-full"
zh: ""
---

# 前言

版本：公开测试版候选 · `as_of 2026-08-15` · 适用 WorkBuddy 5.3.13（build 20fd9da5，macOS）

署名：大鹏主编｜智见 AI 出品

这本书写一件简单的事：把 WorkBuddy 打开给你看。

WorkBuddy 是那种上手快得不像话的产品——装上就能用，按钮清楚，谁都指挥得动。但用得越久你越会撞上一堵看不见的墙：它有时记得你三周前的一句话，有时忘了你昨天定的规矩；装个插件能力暴涨，也偶尔「变笨」；专家中心里一百多个名字，分不清哪个真有用。墙的后面是这套产品的真实身体：一套提示词模板、三层记忆、五个插件市场、身份文件、技能库、会话流水——全部落在你电脑上一个安静的目录里。

这本书带你走进那个目录。方法只有一条：**看到什么行为，就去找实现它的文件**。UI 上的每个按钮，都能翻译成本地的一个文件或一个字段；每次对话，都是一次可以拆解的拼装过程。全书十五章按这个方法走完 WorkBuddy 的 Harness：从一次对话的五环拆解，到五层心智模型，到记忆、提示词、身份三大件，到专家、插件、技能三层扩展系统，到会话证据与安全边界，最后落到实战排查与教学复用。

三个写作承诺。**第一，全部机制描述有证据**：来自本机文件实测（版本与指纹已冻结）、官方已取证文档或注明属性的推断，每处标注来源，做不到的地方明说。**第二，主路径不需要编程背景**：会打开终端复制粘贴命令就够了，深层细节都框在技术框里。**第三，不教破坏**：本书讲机制与治理，不讲绕过与破解。

读法建议：只想用好产品的读者，走第 1—3、5、7、12、14 章主线；想深度定制的实践者，补全第 4、6、8、9、10 章；要讲课的人，第 13、15 章为你写。所有动手环节只读或可逆，放心跟做。

一个诚实的前提：这个产品平均两天发布一个版本。书里的路径、字段、机制会过时——这是拆解快速演进产品的宿命，我们用版本冻结与更新方法（附录 D）来对抗它。但拆解的方法不过时：五层模型、「UI → 文件 → 请求」的追问路径、证据意识。带着这三样，你在任何 Agent 产品里都不会迷路。

智见 AI 蓝皮书系列 · 第三册

大鹏 2026 年 8 月，深圳
