---
title: "20 · 用 MCP 接外部工具：给 Codex 装上「外接口」"
sourceId: "07-coding/ai-coding-guide-stormzhang"
sourceTitle: "面向小白的 AI 编程 CLI 教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/stormzhang/ai-coding-guide"
entryUrl: "https://github.com/stormzhang/ai-coding-guide/blob/d187dbdb83fa1be051a850074eb518e30e2eb47c/codex/20-mcp.md"
sourceRel: "codex/20-mcp.md"
rawUrl: "/raw/07-coding/ai-coding-guide-stormzhang/codex/20-mcp.md"
sourceSha256: "16d2a900eeb40c9e13bfed6eb734eeb6775b6c8cba48477b268be294d03a0660"
pageSha256: "16d2a900eeb40c9e13bfed6eb734eeb6775b6c8cba48477b268be294d03a0660"
contentMode: "local-full"
zh: ""
---

# 20 · 用 MCP 接外部工具：给 Codex 装上「外接口」

> 📚 **系列导航**：上一篇〔[19 记忆系统 Chronicle](/lib/07-coding/ai-coding-guide-stormzhang/codex-19-memory) 〕讲的是让 Codex「记住跨会话的东西」——那是往里灌记忆。这一篇换个方向往外接：**Codex 默认只能摸你本地的文件和命令行，碰不到你的数据库、Figma、第三方文档。MCP，就是让它一次接上一堆外部工具和数据源的那个统一对接口。** 下一篇〔[21 子代理（Subagents）](/lib/07-coding/ai-coding-guide-stormzhang/codex-21-subagents) 〕再讲怎么把活拆给一队带独立上下文的小弟去并行干。

说个我刚接 MCP 时栽的跟头，挺典型的。

我是从 Claude Code 那边过来的，手里早练出了肌肉记忆——加个 server 就 `claude mcp add --scope user xxx`，`--scope` 决定它在哪些项目生效。换到 Codex，我想都没想就敲了句类似的，加了个 `--scope`，终端直接给我报参数不认。我第一反应是「版本太老」，跑去升级，没用；又怀疑是拼写，把命令翻来覆去改了好几遍，**还是不认**。

折腾了快二十分钟，翻官方文档才反应过来：**Codex 根本没有 `--scope` 这个概念。** 它把所有 MCP 配置统一写进一个 `config.toml` 文件，「在哪些项目生效」是靠这个文件放在哪决定的——放全局的 `~/.codex/config.toml` 就处处生效，放项目里的 `.codex/config.toml` 就只在那个项目生效。**我是拿 Claude Code 的脑子去套 Codex 的命令，自然处处碰壁。**

说这个坑是想让你少走那二十分钟弯路：**MCP 这个协议本身两边是同一个，但 Codex 怎么配，跟 Claude Code 是两套写法。** 今天就把 Codex 这套讲透，最后带你亲手接一个真 server 跑通。

**看完这一篇，你会拿到：**

- 一句话讲明白 MCP 是什么、它到底补上了 Codex 的哪块短板
- 两种 server 形态（本地 STDIO、远程 Streamable HTTP）分别什么时候用，一张表说清
- 两条配置路子——`codex mcp add` 命令式 vs 手写 `config.toml`，以及配置文件放哪决定「全局还是项目级」
- `enabled` / `disabled_tools` / `default_tools_approval_mode` 这些字段怎么收口一个 server 的工具和权限
- 一个能照着跑、给了预期输出的实战：几分钟接上 Context7 文档 server 并验证

> ⚠️ 下文凡涉及具体命令、配置项、默认值，都以 Codex [官方文档](https://developers.openai.com/codex/mcp) 为准；包名、模型名这类会随更新变的东西，看到时以你本地实际显示为准，本篇不写死。

---

## 01 先搞懂：MCP 到底补上了 Codex 哪块短板

先给结论：**Codex 默认是个「只会本地干活」的助手，MCP 就是给它统一外接各路工具和数据源的那个口子。**

你回想一下前面十几篇里 Codex 都在干啥——读你的文件、改你的代码、跑你的命令。**全是本地的事。** 它再聪明，也碰不到设计师在 Figma 上画的稿、查不了某个库最新版的 API 文档、控制不了你的浏览器去点一个页面。这些东西它够不着，你只能自己复制粘贴、截图描述，再喂给它。

**类比：给手机插上一个多功能转接头。** 现在的手机机身上可能就剩一个 Type-C 口，想插 U 盘、接 HDMI 投屏、插 SD 卡读照片，全都插不上。怎么办？买个多功能转接头——**一头插进手机，另一头 USB、HDMI、读卡器全冒出来了。** MCP（Model Context Protocol，模型上下文协议，一套规定「AI 怎么调外部工具」的开放标准）之于 Codex 就是这个转接头：**接一次，一堆外部工具就全摆到了它面前。**

官方对它的定义很直白：

> Model Context Protocol（MCP） 把模型连到工具和上下文。用它给 Codex 接上第三方文档，或者让它跟你的浏览器、Figma 这类开发者工具交互。

这里有个关键词——**标准**。MCP 不是 OpenAI 关起门来自己玩的私有协议，而是一套公开规范。**好处是「一次对接，到处能用」**：你给某个工具写的 MCP server，Codex 能用，别的支持 MCP 的客户端（Claude Code、Cursor……）也能用。**同一个 MCP 协议，Codex 这边也认**，只是配法不同（这正是开头我栽跟头的地方，下面第 03 节专门讲）。

还有一个 Codex 特有、值得记一句的细节：**Codex 会读 server 在初始化时返回的 `instructions`（说明）字段，当成这个 server 的「使用须知」**——里面通常写着这个 server 跨工具的工作流、约束、限流提示。说白了，**好的 server 会自带一份「该怎么用我」的说明书**，Codex 会一并读进去。

什么时候你该想起 MCP？判断特别朴素：**当你发现自己又在「从另一个工具里复制东西、再贴给 Codex」时，就该给它接个 server 了。** 举几个你大概率会遇到的场景：

- **「照 Figma 上那版新设计，把这个登录页的样式改一下」**——它自己去读设计稿，不用你一张张截图
- **「用最新版的某个库的 API 把这段代码重写一遍」**——它直接查最新文档，不用你担心它记的是过时写法
- **「打开浏览器，把这个页面在手机尺寸下的样子截下来看看」**——它直接驱动浏览器，不用你手动点

> 💡 一句话总结：Codex 默认只会碰本地文件和命令，**够不着你的设计稿、最新文档、浏览器**；MCP 是那个统一外接口，接一次就把一堆外部工具摆到它面前，而且会读 server 自带的 `instructions` 当使用须知。

![MCP：统一对接外部工具](/mirror/0f/0fcde3cb5638959fc896b2ed5ba04f452983aa8f.png)

> 图：Codex 本地只能碰文件和命令；MCP 像 USB hub，一头插进 Codex，另一头把 GitHub、数据库、Figma 这类外部 server 统一接进来。

---

## 02 两种 server 形态：跑在本地，还是连到云上

MCP server 不止一种。理解它们的区别，你才知道抄来的配置该往哪填。**核心就一个问题：这个 server 是跑在你自己机器上，还是托管在某个网址上？**

**类比：你家里的电器，有的靠插座供电，有的靠 Wi-Fi 联网。** 台灯、风扇是插在你家插座上、就在屋里的本地设备；而智能音箱要查天气、放歌，得连到云端的服务器上。MCP server 也分这两类——**一类作为本地进程跑在你机器上，一类是远端托管、你连过去。**

官方明确支持两种 server 形态：

| 形态 | 跑在哪 | 怎么启动 | 适合 |
|------|--------|----------|------|
| **STDIO**（本地进程） | 你自己机器上，由一条命令拉起来 | 给一条启动命令（如 `npx ...`） | 要直接读本地文件、控制本地浏览器、连本地工具的 server |
| **Streamable HTTP**（远程托管） | 某个网址上 | 给一个 URL | 云服务、远程托管的文档 / 设计 server，**带鉴权** |

几个新手最容易踩的点，挑出来说清楚：

**STDIO server 的精髓是那条「启动命令」。** 它本质是「Codex 帮你在后台拉起一个小程序」——你给它一条命令（比如 `npx -y @upstash/context7-mcp`），Codex 启动会话时就照着这条命令把 server 跑起来。**所以它能跑的前提是你机器上有对应环境**（比如用 `npx` 启动的就需要装了 Node.js）。STDIO server 还能给它单独传环境变量（`--env` 或配置里的 `env`），用来塞 token 之类的东西。

**HTTP server 是连云服务的路子，鉴权方式有两种。** 官方写明 Streamable HTTP server 支持两种认证：

- **Bearer token**：在配置里指定一个存 token 的环境变量名
