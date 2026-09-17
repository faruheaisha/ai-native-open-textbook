---
title: "鱼皮 AI 导航（ai-guide）"
sourceId: "07-coding/liyupi-ai-guide"
sourceTitle: "鱼皮 AI 导航（ai-guide）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/liyupi/ai-guide"
entryUrl: "https://github.com/liyupi/ai-guide/blob/539082c1df5743bb34d72a17857a02735b38c866/Vibe%20Coding%20零基础教程/10%20编程工具/10%20优质%20AI%20编程扩展推荐.md"
sourceRel: "Vibe Coding 零基础教程/10 编程工具/10 优质 AI 编程扩展推荐.md"
rawUrl: "/raw/07-coding/liyupi-ai-guide/Vibe Coding 零基础教程/10 编程工具/10 优质 AI 编程扩展推荐.md"
sourceSha256: "1f11c8380c1e40df83cdbdb66042aadb2ec24e605941a287426d7f8ad0f02bab"
pageSha256: "d7bdb57133c8597306974b346b9bec5ce3f5736bbbf02737ea8c8c20621c1167"
contentMode: "local-full"
zh: ""
---

## 一、MCP 服务器类

MCP 的全称是 Model Context Protocol 模型上下文协议。简单来说，就是让 AI 大模型能够连接外部工具和数据源的一个开放标准。

打个比方，MCP 就像是 AI 的 USB-C 接口，原本 AI 只能根据训练数据来回答问题、生成代码，但有了这个统一接口，它就能连接各种外部工具，比如打开浏览器看网站、搜索并抓取网页内容、部署项目到云端、访问数据库等等，能力一下子就丰富起来了。

![](https://pic.yupi.icu/1/%E6%BC%AB%E7%94%BB%E5%9B%BE1%E5%A4%A7.jpeg)

首先要介绍的是 [Firecrawl MCP](https://www.firecrawl.dev/)，让 AI 能够自动抓取和理解网页内容。

我在开发项目时经常需要从网上获取参考资料、阅读官方文档和技术博客，或者分析竞品的功能实现。如果人工来做这件事，需要先打开网站、再手动复制粘贴内容，或者自己写个爬虫脚本，麻烦得一批。

有了 Firecrawl MCP，这事儿就简单多了。我直接在 AI 编程工具中跟 AI 说：

- 帮我获取这个网站的内容
- 帮我读一下这个文档
- 帮我从网上搜索 XX 相关的信息

它就能自动把网页的内容、结构、甚至是动态加载的数据都给我抓下来。

![](https://pic.yupi.icu/1/image-20260116105912027.png)

**如何使用？**

首先你需要在 [Firecrawl 官网](https://www.firecrawl.dev/app/api-keys) 注册账号，并创建一个调用服务的 API Key。

![](https://pic.yupi.icu/1/image-20260116105955795.png)

然后进入到 AI 编程工具中配置一下 MCP 服务器。这里我以 Cursor 为例，其他 AI 编程工具对接 MCP 的方法可以看各自的官方文档，比如 [Claude Code 接入 MCP 文档](https://docs.anthropic.com/en/docs/claude-code/mcp)。

打开 Cursor 设置，找到 Tools & MCP，点击 `+ New MCP Server`。

![](https://pic.yupi.icu/1/image-20260116110425690.png)

本质上就是修改 MCP 配置文件，添加这样的配置：

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "你的API密钥"
      }
    }
  }
}
```

![](https://pic.yupi.icu/1/image-20260116110454499.png)

这段配置的意思是：通过 npx 命令来运行 firecrawl-mcp 这个工具，并且把你的 API 密钥传给它。如果你电脑上还没有安装 npx，需要先 [到官网安装 Node.js](https://nodejs.org/zh-cn)，npx 会随着 Node.js 一起安装。

配置好之后，看到绿色的成功点点，表示能够正常使用了。

![](https://pic.yupi.icu/1/image-20260116110558199.png)

除了基础的网页抓取，Firecrawl MCP 还支持批量抓取整站内容、递归抓取网站的多层链接、失败自动重试等高级功能。

类似的开源项目还有 [Crawl4AI](https://github.com/unclecode/crawl4ai)，定位是对大模型友好的爬虫工具，同样内置了 MCP Server 和 Agent Skills 技能包，可以作为 Firecrawl 的替代方案。

### Brave Search MCP 隐私搜索

接下来是 [Brave Search MCP](https://github.com/brave/brave-search-mcp-server)，让 AI 能够进行注重隐私保护的网络搜索。

在开发过程中，我经常需要让 AI 帮我搜索最新的技术资料、查找某个库的使用示例、或者了解某个技术问题的解决方案。传统的做法是自己去搜索引擎查，然后把结果复制给 AI，比较麻烦。

有了 Brave Search MCP，我直接跟 AI 说：

- 帮我搜索一下 React 19 的新特性
- 查一下这个错误怎么解决

它就能通过 Brave 搜索引擎去找答案。而且 Brave 搜索不会追踪你的搜索记录，隐私保护做得很好。

![](https://pic.yupi.icu/1/image-20260116111803869.png)

**如何使用？**

首先去 [Brave Search API](https://brave.com/search/api/) 注册账号，然后进入 API Key 管理页面，首先要选择一个订阅计划。必须选择免费版啊！每月有 2000 次查询额度，对于个人开发来说够用了。

![](https://pic.yupi.icu/1/image-20260116110947801.png)

但这里比较坑的一点是，即使订阅免费版，也要填写付款方式，没有海外银行卡的朋友可以撤了。

订阅成功后，创建 API Key：

![](https://pic.yupi.icu/1/image-20260116111311536.png)

拿到 API Key 后，在 Cursor 的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "brave-search-mcp"],
      "env": {
        "BRAVE_API_KEY": "你的API密钥"
      }
    }
  }
}
```

配置好后，AI 就能随时帮你搜索最新信息了。

支持网页、图片、视频、新闻等多种类型的内容搜索，甚至能搜索本地商家信息（比如附近的咖啡店）。

![](https://pic.yupi.icu/1/image-20260116111954334.png)

它还带有 AI 摘要功能，能把搜索结果自动总结成简洁的答案。

[Context7](https://context7.com/) 能帮 AI 获取到最新的技术文档。

我们都知道，AI 的训练数据是有截止时间的，比如 GPT-4 的知识可能只更新到 2023 年。这就导致一个问题，当你问 AI 关于某个框架最新版本的用法时，它给出的答案可能是过时的。

Context7 就是来解决这个问题的。它会自动从官方文档网站抓取最新的、特定版本的文档内容，然后提供给 AI。

![](https://pic.yupi.icu/1/image-20260116112229490.png)

这样一来，AI 给出的代码示例和建议就是基于最新文档的，不会去用已经废弃的写法，大大提高了项目能正常运行的概率。

**如何使用？**

访问 [Context7 Dashboard](https://context7.com/dashboard) 注册账号并获取 API Key，个人使用是免费的。

![](https://pic.yupi.icu/1/image-20260116112322940.png)

然后在 MCP 配置中添加：

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "你的API密钥"
      }
    }
  }
}
```

之后你在 AI 编程工具中跟 AI 对话时，只要跟技术文档相关，或者主动提一嘴 "use context7"，它就会自动去获取最新文档来回复你。

![](https://pic.yupi.icu/1/image-20260116112656483.png)

### Web to MCP 复刻网页组件

[Web to MCP](https://web-to-mcp.com/) 是一个 Chrome 扩展，搭配 MCP 使用，能把网页上的任何 UI 组件直接发送给 AI，让 AI 生成对应的代码，用最快的速度抄作业！

![](https://pic.yupi.icu/1/image-20260116113052973.png)

很多时候，我在浏览网站时看到一个不错的 UI 组件，想让 AI 帮我实现类似的效果。以前的做法是截图，然后跟 AI 描述：“帮我做一个类似这样的按钮，圆角、渐变色、带阴影……” 既费时又不准确。

有了 Web to MCP，我只需要在网页上点击某个想复刻的元素：

![](https://pic.yupi.icu/1/image-20260116113725321.png)

它就会自动捕获组件的 DOM 结构、CSS 样式、甚至是交互效果，并且给你一个让 AI 复刻组件的提示词。

你只需要把提示词发送给 AI，AI 会调用 MCP 拿到完整的组件信息，并生成代码来复刻组件。

![](https://pic.yupi.icu/1/image-20260116114142631.png)

相比于直接给 AI 模糊的截图，生成的代码更准确了。

![](https://pic.yupi.icu/1/image-20260116114426822.png)

**如何使用？**

1）通过官网或者在 Chrome 应用商店搜索 Web to MCP 来安装扩展

![](https://pic.yupi.icu/1/image-20260116113138693.png)

2）用 Google 账号登录，获取你的 MCP 配置：

![](https://pic.yupi.icu/1/image-20260116113241575.png)

3）在 AI 编程工具的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "web-to-mcp": {
      "url": "https://web-to-mcp.com/mcp/你的唯一ID"
    }
  }
}
```

之后浏览网页时，点击扩展图标，选中你想要的组件，就能直接在 AI 编程工具里引用它，并且快速生成风格一致的代码了。

### Chrome DevTools MCP 浏览器调试

[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) 是 Chrome 官方团队开发的 MCP 服务器，让 AI 能够直接控制 Chrome 浏览器进行操作和调试。

在做前端开发时，我经常需要调试页面、查看网络请求、分析性能问题。以前这些都得手动在浏览器的开发者工具里操作，现在有了这个工具，我可以直接让 AI 帮我做这些事。

比如我跟 AI 说：“帮我分析当前这个网站加载慢的原因”，它就能打开 Chrome DevTools，分析网络请求、查看资源加载时间，然后告诉我哪里有问题。

![](https://pic.yupi.icu/1/image-20260116115138719.png)

或者我说：“帮我测试一下这个表单提交功能”，它就能自动填写表单、点击提交按钮、查看请求响应。

**如何使用？**

在 MCP 配置中添加：

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

配置好后，AI 就能帮你自动化测试、调试页面了。工具会自动连接到你正在运行的 Chrome 浏览器，无需额外设置。

这个工具还支持元素定位、网络请求监控、性能分析、页面截图等功能，非常适合前端开发和测试。

### EdgeOne Pages MCP 一键部署

[EdgeOne Pages MCP](https://github.com/TencentEdgeOne/edgeone-pages-mcp) 是腾讯云团队开发的部署工具，能把你的项目一键部署到腾讯云的加速网络，让别人能访问你的网站，并且给你的网站提速。

开发完项目后，你一定会想让别人访问你的网站。传统的部署流程很繁琐，需要人工打包代码、上传代码到服务器、配置域名、设置 HTTPS 安全证书，一套流程下来得花不少时间。

![](https://pic.yupi.icu/1/%E6%BC%AB%E7%94%BB%E5%9B%BE2%E5%A4%A7.jpeg)

有了 EdgeOne Pages MCP，我直接在 AI 编程工具里跟 AI 说：“帮我部署这个项目”，它就能自动完成打包、上传、部署的全过程，最后给我一个可以直接访问的 URL。而且部署到全球加速网络，各地访问速度都很快。

![](https://pic.yupi.icu/1/1752212029384-16cfba8f-babb-49c0-9d41-3b76ee78eecf.png)

**如何使用？**

首先到 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone/pages) 开通 Pages 服务：

![](https://pic.yupi.icu/1/1752209404627-3a3193d9-4c94-4f80-ad02-435ff22f16ed.png)

然后获取 API Token，作为调用服务的凭证：

![](https://pic.yupi.icu/1/1752209504079-6741bbd0-438e-48a4-86be-6eddfc3efa83.png)

在 MCP 配置中添加：

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"],
      "env": {
        "EDGEONE_PAGES_API_TOKEN": "你的API Token"
      }
    }
  }
}
```

配置好后，就能让 AI 帮你一键部署项目了。部署是免费的，支持静态网站、全栈项目、自动配置 HTTPS 和 CDN 加速等功能，非常适合个人项目和小型应用。

![](https://pic.yupi.icu/1/1752211869664-b74dc4d9-57b1-4bb7-9f02-703112b613eb.png)

### COS MCP 对象存储

[COS MCP](https://github.com/Tencent/cos-mcp) 能让 AI 直接操作腾讯云对象存储。

对象存储就是云端的文件存储服务，可以理解为云盘。

![](https://pic.yupi.icu/1/image-20260116120009365.png)

在团队协作开发中，我们经常需要让 AI 参考一些项目规范文档、或者引用一些图片。以前的做法是把这些文件放在本地，然后手动上传给 AI，既不方便，也不利于团队维护、修改和共享。

有了 COS MCP，我可以说一句话把这些需要共享的文件存到云端，然后让 AI 直接去读取。

![](https://pic.yupi.icu/1/image-20260116122211103.png)

比如我跟 AI 说：“按照我们团队 COS 共享的项目规范文档来写这个功能”，它就能自动从 COS 里读取规范文档，然后按照规范来写代码。

![](https://pic.yupi.icu/1/image-20260116122453843.png)

**如何使用？**

1）首先需要开通腾讯云 COS 对象存储服务。访问 [腾讯云 COS 控制台](https://console.cloud.tencent.com/cos)，创建一个存储桶（Bucket）：

![](https://pic.yupi.icu/1/image-20260116120711822.png)

2）然后在 "访问管理" > "API 密钥管理" 中获取 SecretId 和 SecretKey，注意一定不要泄露这些信息！

![](https://pic.yupi.icu/1/image-20260116121022222.png)

3）在 MCP 配置中添加：

```json
{
  "mcpServers": {
    "cos-mcp": {
      "command": "npx",
      "args": [
        "cos-mcp",
        "--Region=你的地域",
        "--Bucket=你的存储桶",
        "--SecretId=你的SecretId",
        "--SecretKey=你的SecretKey"
      ]
    }
  }
}
```

![](https://pic.yupi.icu/1/image-20260116121243549.png)

配置好后，AI 就能读取和管理你云端的文件了，相当于给了 AI 一个网盘。

此外，这个工具还支持图片搜索、图片处理、文档转换、视频封面生成等功能。

![](https://pic.yupi.icu/1/image-20260116121658701.png)

### GitHub MCP 代码仓库管理

[GitHub MCP](https://github.com/github/github-mcp-server) 是 GitHub 官方开发的 MCP 服务器，让 AI 能够直接操作 GitHub 代码仓库。

程序员朋友们对 GitHub 肯定不陌生，这是全球最大的代码托管平台，可以用它来存储代码、团队协作开发。

![](https://pic.yupi.icu/1/image-20260116122621938.png)

在日常开发中，我可能需要搜索 GitHub 代码仓库、创建 Issue 问题反馈、提交 PR 代码合并请求、查看代码变更、分析提交历史等等。以前这些操作都得在 GitHub 网站上手动完成，现在我可以直接让 AI 帮我做。

比如我跟 AI 说：“我最近在 GitHub 上开源了哪些项目？star 数如何？”

![](https://pic.yupi.icu/1/image-20260116123701822.png)

它就能快速给我在 GitHub 上的项目生成一份数据报告：

![](https://pic.yupi.icu/1/image-20260116123734660.png)

或者我说：“帮我看看最近一周的代码变更”，它就能分析 Git 提交记录，告诉我都改了什么。

![](https://pic.yupi.icu/1/image-20260116124022290.png)

**如何使用？**

首先需要在 GitHub 获取到你的 [Access Token](https://github.com/settings/tokens)，作为访问你 GitHub 资源的凭证：

![](https://pic.yupi.icu/1/image-20260116122846165.png)

然后在 MCP 配置中添加：

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer 你的GitHub凭证"
      }
    }
  }
}
```

这个工具还支持代码分析、CI/CD 监控、安全扫描等功能，基本上你在 GitHub 中能做的事，AI 都能帮你做。

![](https://pic.yupi.icu/1/image-20260116123148068.png)
