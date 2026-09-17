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
pageSha256: "e35c9eda3b8feaf14152c4f81e3de1908f2e2e14b46ac955650fb40834042262"
contentMode: "local-full"
zh: ""
---

## 二、IDE 扩展插件类

MCP 服务器讲完了，接下来聊聊 IDE 扩展插件。

IDE 就是集成开发环境，简单理解就是写代码的软件，比如 VS Code、JetBrains IDEA 这些，可以通过安装插件来增强编辑器的能力，让你的开发体验更上一层楼。

值得一提的是，现在很多有图形界面的 AI 编程工具（比如 Cursor）都是基于 VS Code 开发的，自然也支持 VS Code 的插件，所以下面我也主要分享 VS Code 插件，装上就能用。

![](https://pic.yupi.icu/1/image-20260116124127539.png)

### Claude Code 官方扩展

Claude Code 是 Anthropic 推出的 AI 编程助手，原本是独立的命令行工具。而 [Claude Code VS Code 扩展](https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously) 能让你在代码编辑器中直接使用 Claude Code，不用额外打开终端。

在 VS Code 或 Cursor 的扩展商店搜索 "Claude Code" 即可安装：

![](https://pic.yupi.icu/1/image-20260116124255886.png)

这个扩展的优点是提供了图形界面，你可以通过侧边栏面板和 Claude 对话，能够灵活输入文字。

![](https://pic.yupi.icu/1/image-20260116124614180.png)

当 AI 修改代码时，你能在编辑器里实时看到变化，并且自动显示 diff 对比，让你清楚地知道 AI 改了哪些地方。

![](https://pic.yupi.icu/1/image-20260116124700221.png)

我经常用它来重构代码、修复 Bug、添加新功能。它还支持多会话并行，也就是说你可以同时让多个 Claude 代理处理不同的任务，比如一个负责前端，一个负责后端，大大提高开发效率。

![](https://pic.yupi.icu/1/image-20260116124928547.png)

顺带一提，类似的插件还有 Cline、GitHub Copilot 等，功能都差不多，大家可以根据自己的喜好选择。

### GitLens Git 可视化

[GitLens](https://www.gitkraken.com/gitlens) 能让你更直观地查看 Git 代码的修改历史。

![](https://pic.yupi.icu/1/image-20260116125249627.png)

Git 是程序员用来管理代码版本的工具，简单理解就是能记录代码的每一次修改，包括谁改的、什么时候改的、为什么改。

有了这些记录，出了 Bug 时我就能快速找到 “凶手” 追责。

![](https://pic.yupi.icu/1/%E6%BC%AB%E7%94%BB%E5%9B%BE3%E5%A4%A7.jpeg)

但 Git 只是个命令行工具，想查看历史记录还需要手敲命令，看起来也不太舒服。

![](https://pic.yupi.icu/1/image-20260116125146713.png)

当我通过编辑器的扩展商店安装了 GitLens 后，把鼠标放到任意代码行上，GitLens 就会自动显示这行代码的作者、相关的 PR 合并请求等等。

![](https://pic.yupi.icu/1/image-20260116125445257.png)

进入 Git 管理面板，整个项目的提交记录一目了然。

![](https://pic.yupi.icu/1/image-20260116125736701.png)

此外，它还支持 AI 功能，能自动生成提交信息、解释代码变更、生成变更日志、用 AI 解释某次改动的目的。

![](https://pic.yupi.icu/1/image-20260116130129466.png)

[Office Viewer](https://github.com/cweijan/vscode-office) 能帮你在编辑器里直接预览和编辑各种文档。

![](https://pic.yupi.icu/1/image-20260116130347383.png)

我们知道，AI 输出的文档内容以 Markdown 格式为主，默认的编辑器中打开 Markdown 文件只能看到原始的标记语法，不够直观。

![](https://pic.yupi.icu/1/image-20260116130450441.png)

看长文的时候，我还要用 Typora 等专业的 Markdown 编辑器打开文档，比较麻烦。

在扩展商店搜索 "Office Viewer" 并安装后，可以直接在编辑器中使用所见即所得的 Markdown 编辑器，看文档、写文档都很方便，不用来回切换窗口。

![](https://pic.yupi.icu/1/image-20260116130527681.png)

此外，这个插件支持 Excel 表格、Word 文档、PDF 文档、SVG、字体文件、压缩包等多种格式，堪称编辑器里的万能文档查看器。

[ESLint](https://eslint.org/) 是前端 JavaScript / TypeScript 项目必备的代码检查工具。

![](https://pic.yupi.icu/1/image-20260116130608877.png)

虽然编辑器本身也能检查一些基本的语法错误，但对于代码规范、潜在的逻辑漏洞等问题，就需要专业的代码检查工具来把关了。

现在很多 AI 生成的项目代码都会自带 ESLint 配置文件（比如 `.eslintrc.js` 或者 `eslint.config.js`），定义好团队统一的代码检查规则。

![](https://pic.yupi.icu/1/image-20260116131035221.png)

在扩展商店搜索 "ESLint" 并安装后，插件会自动检测项目中的规则配置文件，然后实时检查代码中的问题，并给出修复建议。

![](https://pic.yupi.icu/1/image-20260116131356553.png)

这样一来，AI 写的代码如果有不规范的地方，你立刻就能发现并让 AI 修正，避免埋下隐患。

[Prettier](https://prettier.io/) 是一个代码格式化工具，能自动统一代码风格。

![](https://pic.yupi.icu/1/image-20260116130633473.png)

团队协作时，每个人的编码习惯不同，有的代码缩进 4 格、有的缩进 2 格；有的用单引号、有的用双引号。大家的代码风格五花八门，看着就很乱，代码审查时也容易出现 Beef。

这时就需要统一的格式化规范了。现在很多 AI 生成的项目代码都会自带 Prettier 配置文件（比如 `.prettierrc`），定义好统一的格式化规则。

![](https://pic.yupi.icu/1/image-20260116131553797.png)

在扩展商店搜索 "Prettier" 并安装后，就可以用快捷键一键格式化代码。

![](https://pic.yupi.icu/1/image-20260116131725960.png)

还可以在 VS Code 的设置里搜索 "Format On Save" 并开启，这样每次保存代码时就会自动格式化，保证整个项目的代码风格一致。

![](https://pic.yupi.icu/1/image-20260116132036643.png)

### Error Lens 错误实时显示

[Error Lens](https://github.com/usernamehw/vscode-error-lens) 能让你一眼看到代码中的错误。

![](https://pic.yupi.icu/1/image-20260116130706384.png)

一般情况下，如果代码中有错误，你得把鼠标移到红色波浪线上才能看到错误提示，不够直观。

![](https://pic.yupi.icu/1/image-20260116140447236.png)

在扩展商店搜索 "Error Lens" 并安装后，错误信息会直接高亮显示在代码行尾，你一眼就能看到哪里有问题。

![](https://pic.yupi.icu/1/image-20260116140619858.png)

### Console Ninja 控制台日志显示

[Console Ninja](https://github.com/wallabyjs/console-ninja) 能让你在编辑器里直接看到代码的运行结果。

![](https://pic.yupi.icu/1/image-20260116130745078.png)

在调试前端代码时，我经常需要看 `console.log` 打印出来的日志输出。要先切换到浏览器，再按 F12 打开开发者工具来查看控制台，比较麻烦。

![](https://pic.yupi.icu/1/image-20260116140819516.png)

在扩展商店搜索 "Console Ninja" 并安装后，直接在编辑器里就能看到输出结果，看到每个日志是从哪个文件哪一行输出的，还能显示网络请求和错误堆栈。

![](https://pic.yupi.icu/1/image-20260116141109420.png)

有了它，不用频繁切换窗口了，调试效率大大提升。
