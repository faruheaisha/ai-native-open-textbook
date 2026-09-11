---
title: "GitHub Copilot 云端 AI 自动开发实战"
sourceId: "07-coding/liyupi-ai-guide"
sourceTitle: "鱼皮 AI 导航（ai-guide）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/liyupi/ai-guide"
entryUrl: "https://github.com/liyupi/ai-guide/blob/539082c1df5743bb34d72a17857a02735b38c866/README.md"
zh: ""
---

# GitHub Copilot 云端 AI 自动开发实战

本文介绍如何利用 GitHub Copilot Coding Agent 在云端自动完成从需求分析到全栈开发、测试、部署上线、代码审查、Issue 处理、定时任务的全流程。全程不需要打开 IDE，在 GitHub 网页版即可完成。

大家好，我是程序员鱼皮。

前两天，我受邀参加了微软 AI Tour 大会，还在会上做了一场演讲。

主题是「带你看 GitHub Copilot 的另一面：智能体装机，不只在 IDE」。这名字是大会方包装的，说实话我自己看着都一头雾水。。。

![](https://pic.yupi.icu/1/image-20260422215325862.png)

简单来说就是：**手把手教大家如何用 GitHub + Copilot，打造属于自己的 AI 智能体。**

真没想到有这么多人来听分享，看来大家对这个选题确实很感兴趣。

![](https://pic.yupi.icu/1/mmexport1776762414702_%E5%89%AF%E6%9C%AC.jpg)

这篇文章就是演讲的完整文字版，希望能给大家一些启发和帮助。

## 背景和思考

最近「一人公司」和「龙虾」的概念特别火，很多人都在玩 AI 智能体，比如 OpenClaw 养虾、Hermes Agent 养马什么的。

现在的 AI 智能体不只是聊天，能持续干活、越用越懂你、随处使用。

但是，你有没有想过，扒开所有花哨的包装，**一个 AI 智能体的本质到底是什么？**

我觉得是四样东西：**角色、记忆、技能、工作空间**。

没有工作空间，角色无处定义、记忆无处存储、技能无处挂载。

![](https://pic.yupi.icu/1/image-20260423162031832.png)

除了自己的电脑之外，还有其他的工作空间吗？

作为一名开源作者，我本能地想到 GitHub 这个全球最大的代码托管平台，它的仓库天然就是 **持久化的文件空间**；而 GitHub Copilot 又提供了强大的 AI 代理执行能力，还支持网页版使用。

那干脆把 GitHub 仓库当成养 AI 智能体的「个人电脑」，不就可以了么？

所以下面我要手把手教大家：**怎么用 GitHub 打造一只你自己的 AI 小龙虾。**

我把它称为「给虾」：

![](https://pic.yupi.icu/1/image-20260423162442682.png)

接下来我会一步步演示，如何利用 GitHub 搭建一个超级智能体，不需要打开 IDE，也能完成从需求分析到全栈开发、测试、文档生成、部署上线、SEO 优化、代码审查、自动处理 Issues、定时任务的全流程。

## 1、初始化 Agent

打开 GitHub 网页版，你会发现 GitHub Copilot 的对话入口随处可见，已经融入到 GitHub 的各个角落了。

![](https://pic.yupi.icu/1/1774936826720-d8fb03a7-3f53-4674-8d37-d1abbd873565.png)

我们先新建一个叫 `github-claw` 的仓库，作为 AI 智能体的工作空间。

创建仓库时就可以填入初始化的提示词，这其实就是我们给这只 AI 小龙虾注入灵魂的过程。

![](https://pic.yupi.icu/1/1774936859388-895eba7a-1a5a-45d8-b510-b2c2b5402efa.png)

在开始之前，建议先从右上角进入 GitHub Copilot 的设置，开启联网搜索功能，这样 AI 能获取更新的信息。

![](https://pic.yupi.icu/1/image-20260423162530594.png)

然后我们填入初始化 Agent 的提示词。这段提示词定义了龙虾的角色、行为规则和记忆机制：

```markdown
你是这个仓库中长期驻留的个人 AI 助手与主要代理，像 OpenClaw 一样，不只是回答问题，还要持续做事、积累记忆、维护角色，并让这个仓库逐渐成为可长期演化的个人 AI 空间。

请先参考 OpenClaw 官方文档，理解它作为 "能做事的个人 AI 助手" 的定位，以及角色、记忆、技能和工作空间的思路：https://docs.openclaw.ai

然后把这个仓库初始化为适合 GitHub Copilot 网页版长期使用的个人 AI 工作空间，让我以后在新的 Copilot 对话里，也能继续沿用同一个角色、记忆和工作方式。

请先创建并提交一个简洁、可长期复用的 AGENTS.md，在里面定义：
- 你是谁
- 你如何在这个仓库中工作
- 你如何管理任务与记忆
- 你每次完成任务后要做的收尾动作

要求：
- 把仓库当作持久化的文件与记忆空间，可保存任何有用文件
- 用文件作为记忆的真实来源，不把重要信息只留在当前对话里
- 将长期记忆与每日/临时记录区分开
- 规则简洁、实用、可扩展，不要过度设计

如果确有必要，可以补充最少量的 MEMORY.md、memory/ 或 SOUL.md，但请保持轻量，并以 AGENTS.md 为核心。
```

可以看到，Copilot 自动初始化了一个工作空间，还自动集成了 GitHub 的 MCP 工具：

![](https://pic.yupi.icu/1/1774937227476-47848347-e4ba-4d4f-855f-b5921ea4eb59.png)

任务完成后，它会自动创建一个 PR。我们人工检查一下，没问题就合并。

![](https://pic.yupi.icu/1/1774937109998-7080c68f-b049-4fe9-9c4d-860a0ddf2484.png)

对了，如果你发现有「网络连接失败」的提示，是因为 Copilot coding agent 默认有防火墙限制。需要到仓库设置里关闭防火墙：

![](https://pic.yupi.icu/1/1774937329485-d4936387-abd0-464a-b808-a20f8cf6167d.png)

Agent 初始化完成后，你可以跟它打个招呼，它会通过文档获取到记忆：

![](https://pic.yupi.icu/1/image-20260423162709389.png)

## 2、开发上线网站

Agent 初始化好了，接下来让它干活。

让它帮我的开源 AI 知识库项目 `ai-guide` 开发一个高颜值的导航官网，提示词如下：

```markdown
请为我开源的 AI 知识库项目（ai-guide）开发并部署一个高颜值的导航官网，突出项目介绍、精选内容、路线图、更新日志、增长趋势等，吸引更多人关注我的开源仓库。必须使用 UI-UX-PRO-MAX 技能全面优化前端界面，完成后直接给出可上线访问的地址。必须自主完成任务
```

在仓库的 Agents 面板中，可以直接发起新的对话任务。

Copilot 会通过 GitHub MCP 获取我的开源项目信息，然后自动开始开发网站：

![](https://pic.yupi.icu/1/1774937381654-bde29eb7-3d0f-4869-a065-f7ddb09950dd.png)

生成代码后，它还会自动执行代码检查，发现问题就自主修复：

![](https://pic.yupi.icu/1/1774937517424-6099472c-eb6c-4688-a02d-79b3ed37ca8e.png)

接着它会自动创建 GitHub Actions 工作流，利用 GitHub Pages 完成静态网站的部署：

![](https://pic.yupi.icu/1/1774937463974-f0f1cf86-da67-40ee-8cf9-abee42b66807.png)

合并 PR 后，还需要进入仓库设置里的 GitHub Pages，选择「从工作流部署」（注意仓库必须是公开的）：

![](https://pic.yupi.icu/1/1774937811979-b3b187f8-f23c-42b1-be46-363d9f9a2457.png)

然后手动触发一次工作流，后续每次推送代码都会自动触发部署：

> 注意检查 workflow 里的分支名配置，要和你仓库的默认分支一致（比如 `master` 还是 `main`）。

![](https://pic.yupi.icu/1/1774937756522-a4fd8522-7891-4e7c-9825-67a6473dbb3a.png)

成功部署后，页面就可以正常访问了：

![](https://pic.yupi.icu/1/1774937885356-5d43735f-8c35-42de-a89e-b868612e5448.png)

## 3、使用技能

不过你可能注意到了，虽然我在提示词里提到了要用 `UI-UX-PRO-MAX` 技能，但 AI 并没有真正安装它。

当我命令它用技能时，它反而自己造了一个，这就不对了。

![](https://pic.yupi.icu/1/1774937618640-576f8005-f62f-44f4-9483-e1734d8555cd.png)

所以我们需要新开一个对话，通过提示词教会 AI 如何正确发现、安装和使用技能：

```markdown
请优化当前仓库的工作流与 AGENTS.md，让这个仓库中的主要 AI 代理具备稳定的技能发现、安装和使用机制。

明确约定如下：
- 项目级技能统一保存在 .agents/skills/
