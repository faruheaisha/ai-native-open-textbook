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
pageSha256: "b8adc25b4609680fe7631d28c5915360f6f7b3f94975d4e580828026cda84970"
contentMode: "local-full"
zh: ""
---

## 三、Agent Skills 技能类

Agent Skills 是给 AI 装备的技能包，让 AI 在特定任务上表现得更专业。和 MCP 一样，Agent Skills 现在也是 AI 编程生态中不可或缺的一部分，而且它是跨工具通用的开放标准，不绑定特定的编辑器。

详细的 Agent Skills 入门教程可以阅读工具实战目录下的《Agent Skills：通用 AI 技能库》。

### Agent Skills 通用 AI 技能库

[Agent Skills](https://claude.com/blog/skills) 是 Anthropic 新推出的 AI 技能系统。

它定义了一种 **封装 AI 工作流** 的标准：开发者可以把复杂的任务指令、脚本和资源打包成一个 **技能（Skill）**；作为用户，你只需要安装这些技能，AI 就能立刻学会这项本事，不用重复造轮子。

![](https://pic.yupi.icu/1/%E6%BC%AB%E7%94%BB%E5%9B%BE7%E5%A4%A7.jpeg)

让我们来实战一下，利用 [frontend-design](https://www.claudeskill.site/en/skills/anthropic-agent-skills:frontend-design)  这个 Agent Skills 来优化生成网站的界面。

1）安装 Agent Skills

首先打开 Claude Code，输入一行命令，把官方提供的 Skills 注册为插件市场：

```markdown
/plugin marketplace add anthropics/skills
```

![](https://pic.yupi.icu/1/image-20260116145357194.png)

然后输入 `/plugin`，通过 Tab 键切换到 Marketplaces 界面，批量安装官方提供的 Skills。包括：

- document-skills：文档技能包，可以处理 Excel、Word、PPT、PDF 等文档。
- example-skills：示例技能包 ，可以处理技能创建、构建 MCP、视觉设计、算法艺术、网页测试、动图制作、主题样式等。

![](https://pic.yupi.icu/1/claudecode%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85.png)

安装好之后，输入 `/skills` 命令，就能看到所有已经安装完成的技能了，我们要的 `frontend-design` 也在其中。

![](https://pic.yupi.icu/1/image-20260116145938235.png)

可以在本地找到 Skills 的安装位置，你会发现，SKills 的本质就是一组封装好的提示词文档 + 脚本文件等：

![](https://pic.yupi.icu/1/image-20260116151949110.png)

还有另外一种安装方式，也可以在 Claude Code 中输入一行命令来安装 [frontend-design](https://www.claudeskill.site/en/skills/anthropic-agent-skills:frontend-design) 技能。

```markdown
skill install anthropic-agent-skills:frontend-design
```

2）安装完 SKills 后，你只需要和之前一样跟 AI 对话，程序会自动根据你的任务选择使用什么 Skills。

比如我让 AI 开发一个精美的狼人杀网页游戏，它会询问我是否要使用 `frontend-design`  技能。

![](https://pic.yupi.icu/1/image-20260116152325220.png)

使用这个技能后，AI 会选择独特的设计风格，生成的界面既有个性又专业，告别千篇一律的蓝紫渐变色。而且不需要你每次都重复输入一堆设计要求，非常方便！

![](https://pic.yupi.icu/1/image-20260116153402176.png)

不用技能是这样的，对比一下：

![](https://pic.yupi.icu/1/image-20260116155623890.png)

目前 [Anthropic 官方技能仓库](https://github.com/anthropics/skills) 已经提供了丰富的技能集合，涵盖编程相关的数据库优化、API 安全、测试策略、代码审查、文档生成，还有办公相关的 PPT 制作、Excel 处理、Word 文档、PDF 生成等各个方面。

如果官方提供的技能不够用，你还可以上传自定义技能，或者访问以下平台下载社区贡献的技能：

- [Claude Skills Hub](https://www.claudeskill.site/)：社区技能市场

![](https://pic.yupi.icu/1/image-20260201150711260.png)

值得一提的是，Agent Skills 现已成为 [通用标准](https://agentskills.io)。除了 Claude，[Cursor](https://cursor.com/docs/context/skills) 等主流 AI 编程工具也会陆续提供支持。也就是说，你在一个工具里用的技能，在另一个工具里也能复用。

### Skills 安装管理工具

**skills CLI**：Vercel 官方出品的命令行工具，一行命令就能安装任何 Skills，简单好用。

用法是 `npx skills add <owner/repo>`，比如 `npx skills add vercel-labs/agent-skills` 就能装上 Vercel 官方的所有 Skills。

> 指路：https://www.npmjs.com/package/skills

![](https://pic.yupi.icu/1/image-20260204114830800.png)

**find-skills**：Vercel 出品的 Skills 发现工具，帮你快速找到和安装需要的 Skills。支持交互式搜索和关键词搜索，用 `npx skills find` 命令即可启动。

> 指路：通过 `npx skills add vercel-labs/skills` 安装

![](https://pic.yupi.icu/1/image-20260204144654011.png)

**skill-creator**：Anthropic 官方的 Skill 创建工具，教你怎么创建自定义 Skill。会引导你按照最佳实践编写 SKILL.md 文件，包括技能描述、触发条件、执行步骤等。

> 指路：通过 `npx skills add anthropics/skills` 安装

![](https://pic.yupi.icu/1/1769307998192-27ac24c2-c732-401d-a19e-ebe07086d73b-20260204144825800.png)

**Skill Seeker**：这个工具牛了，能自动抓取文档网站、GitHub 仓库、PDF 文件，然后直接转换成 Agent Skills，省去了手写技能说明文档的麻烦。支持多源抓取、代码深度分析、一键打包，特别适合给自己常用的库或框架快速生成 Skills。

> 指路：https://github.com/yusufkaraaslan/Skill_Seekers

![](https://pic.yupi.icu/1/image-20260204115524485.png)

**everything-claude-code**：Anthropic 黑客松冠军的完整配置集合，包括 agents、skills、hooks、commands、rules、MCPs，都是实战验证过的配置，拿来就能用。想一次性配置好 Claude Code 的话装这个就够了。

> 指路：https://github.com/affaan-m/everything-claude-code

![](https://pic.yupi.icu/1/image-20260204121536989.png)

### Skills 资源平台

**skills.sh**：Vercel 官方出品的 Skills 排行榜，能看到每个 Skill 的安装量、使用趋势，还支持一键安装。想知道哪些 Skills 最火，来这里看就对了。

> 指路：https://skills.sh

![](https://pic.yupi.icu/1/image-20260204115906122.png)

**鱼皮 AI 导航 - Skills 专区**：我的中文 Agent Skills 导航网站，按分类整理好了几百个 Skills，界面友好、查找方便，适合国内的朋友们使用。

> 指路：https://ai.codefather.cn/skills

![](https://pic.yupi.icu/1/image-20260201150711260.png)

**skillsmp**：自动抓取 GitHub 上所有 Skills 项目，按分类、更新时间、Star 数量整理，数据更新及时。

> 指路：https://skillsmp.com/zh

![](https://pic.yupi.icu/1/image-20260204120006396.png)

**MCP Market**：MCP Market 的每日 Skills 榜单，能看到每天最热门的 Skills 排名，帮你发现新趋势。

> 指路：https://mcpmarket.com/daily/skills

![](https://pic.yupi.icu/1/image-20260204120133997.png)

### Skills 开源合集

**anthropics/skills**：Anthropic 官方 Skills 仓库，包含文档处理（PDF、Word、PPT、Excel）、前端设计、MCP 构建、算法艺术等十几个高质量的 Skills。建议刚开始玩 Skills 的朋友首先安装这个。

> 指路：https://github.com/anthropics/skills

![](https://pic.yupi.icu/1/1769307079120-6aaf2999-fee5-4fdb-a5e3-2ba66824b4de-20260204142715111.png)

**awesome-claude-skills**：Skills 精选列表，收录了各种类型的 Skills，分类清晰，是目前最全的 Skills 合集之一。

> 指路：https://github.com/ComposioHQ/awesome-claude-skills

![](https://pic.yupi.icu/1/image-20260204120329382.png)

**mattpocock/skills**：TypeScript 领域知名教育者 Matt Pocock 的个人 Skills 仓库，不到半年就拿到了 18 万 Star。它的特点是把真实的软件工程方法论封装成了 Skill，比如测试驱动开发、Bug 诊断、代码架构改进、大项目决策拆分等。

其中最火的是 `/grill-me`，作用是让 AI 反过来拷问你的需求，核心内容只有几句话，但安装量长期排在全网前 3。

安装命令是 `npx skills@latest add mattpocock/skills`，详细介绍可以阅读工具实战目录下的《Matt Pocock Skills：真实工程技能库》和经验技巧板块中的《用 grill-me 让 AI 拷问你的需求》。

> 指路：https://github.com/mattpocock/skills

**openai/skills**：OpenAI 官方的 Codex Skills 目录。可以通过 Codex 内置的 `$skill-installer` 命令一键安装，让 Codex 在特定任务上表现更专业。

> 指路：https://github.com/openai/skills

**vercel-labs/agent-skills**：Vercel 出品的 React/Next.js 最佳实践，包括 React 开发规范、Web 设计指南、组件组合模式等，做前端的同学必装。

> 指路：https://github.com/vercel-labs/agent-skills

**expo/skills**：Expo 官方的 React Native 开发 Skills。Expo 是一个基于 React Native 的移动应用开发框架，可以让你用 JavaScript / TypeScript 开发 iOS 和 Android 应用。这个 Skills 包括原生 UI 构建、数据获取、部署、CI/CD 等，做移动端开发的朋友可以装上。

> 指路：https://github.com/expo/skills

**kepano/obsidian-skills**：Obsidian 出品的 Skills 集合。Obsidian 是一款基于本地 Markdown 文件的知识管理和笔记应用，深受程序员和知识创作者喜爱。

这些 Skills 能增强 Obsidian 的功能，让 AI Agent 能更好地管理你的笔记和知识库。

> 指路：https://github.com/kepano/obsidian-skills

![](https://pic.yupi.icu/1/image-20260204125639748.png)

**stripe/ai**：Stripe 官方 AI Skills。Stripe 是全球领先的在线支付处理平台，被无数互联网公司用于收款。

这个 Skills 包含金融支付相关的最佳实践，比如优先使用 Checkout Sessions API、动态支付方式配置、订阅计费集成等，做支付功能的朋友可以参考。

> 指路：https://github.com/stripe/ai

**trailofbits/skills**：Trail of Bits 安全公司出品的 Skills，专注安全研究和漏洞检测。内容非常丰富，包含智能合约安全审计、Burp Suite 项目解析、Semgrep 规则创建、YARA 恶意软件检测规则编写、差异化代码审查、常量时间分析、属性测试等 20+ 个安全相关插件，强烈推荐给安全方向的朋友。

> 指路：https://github.com/trailofbits/skills

**Notion Skills**：Notion 官方出品的 Skills，让 AI 能更好地与 Notion 工作区交互。可以帮你自动整理会议记录和待办事项、帮你整理和组织研究资料等，适合重度使用 Notion 的朋友。

> 指路：https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0

![](https://pic.yupi.icu/1/image-20260204143151405.png)

### 项目开发 Skills

**superpowers**：一套完整的 AI 编程技能框架和软件开发方法论。它包含十几个可组合的编程技能，比如头脑风暴、编写计划、执行计划、TDD 测试驱动开发、系统性调试、代码审查等。

装了它之后，AI 不会直接开始写代码，而是会先问清楚需求、出设计方案让你确认、制定详细执行计划，最后才分步骤实现。适合开发大型项目、需要高质量代码的场景。

> 指路：https://github.com/obra/superpowers

![](https://pic.yupi.icu/1/01-AI%E8%8E%B7%E5%BE%97%E8%B6%85%E8%83%BD%E5%8A%9B%E6%A2%97%E5%9B%BE.jpeg)

**planning-with-files**：被 X 上的开发者评为最强 Skill！它借鉴了被 Meta 以 20 亿美元收购的 Manus AI 的核心工作模式：用 Markdown 文件作为 AI 的外部记忆，解决 AI 上下文丢失的问题。适合多步骤任务、研究任务、跨多次对话的项目开发，让 AI 在复杂项目中也能保持清醒不跑偏。

> 指路：https://github.com/OthmanAdi/planning-with-files

**ui-ux-pro-max**：专业前端设计 Skill，让 AI Agent 具备专业设计师的能力，生成的界面不再是千篇一律的 AI 风格。支持各种主流 AI 编程工具，强烈推荐。

> 指路：https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

![](https://pic.yupi.icu/1/image-20260204143423578.png)

**vercel-react-best-practices**：Vercel 出品的 React 最佳实践，让 AI 按照 React 官方推荐的模式来写代码，包括组件设计、状态管理、性能优化等规范，避免写出反模式的代码。做 React 项目必装。

> 指路：通过 `npx skills add vercel-labs/agent-skills` 命令安装

**web-design-guidelines**：Web 设计规范 Skill，包含间距、颜色、排版、响应式设计等专业设计规范，让 AI 生成的页面更加美观，而不是千篇一律的 AI 风格。

> 指路：通过 `npx skills add vercel-labs/agent-skills` 命令安装

**frontend-design**：Anthropic 官方的前端设计 Skill，帮你开发独具辨识度的生产级前端界面。

> 指路：通过 `npx skills add anthropics/skills` 安装

**vue-skills**：Vue.js 最佳实践 Skills，尤雨溪团队成员维护。让 AI 按照 Vue 生态的最佳实践来写代码，包括 Vue 3 组合式 API、Vite 构建配置、Vitest 单元测试、Pinia 状态管理、UnoCSS 样式方案等。做 Vue 项目必装。

> 指路：https://github.com/vuejs-ai/skills

**supabase-postgres-best-practices**：Supabase 出品的 PostgreSQL 数据库最佳实践，教 AI Agent 怎么写出高质量的数据库代码，包括查询优化、索引设计等。

> 指路：https://github.com/supabase/agent-skills

![](https://pic.yupi.icu/1/image-20260204143740866.png)

### 浏览器自动化 Skills

**browser-use**：让 AI Agent 能访问和操作网站的工具（不仅是 Skill，也可以独立使用），功能强大，可以用来做自动化测试、数据抓取、网页操作等。

> 指路：https://github.com/browser-use/browser-use

**agent-browser**：Vercel 出品的浏览器自动化 Skill，让 AI Agent 能操作浏览器。比如可以自动填表单、点击按钮、截图、抓取动态渲染的内容等，非常适合做端到端测试、自动化爬虫、网页监控等场景。

> 指路：https://github.com/vercel-labs/agent-browser

### 内容创作 Skills

**remotion-dev/skills**：Remotion 官方出品的视频动画制作 Skills，能用 Claude Code 一句话生成可编辑的动画视频，几分钟就能做出专业效果，最近特别火。

> 指路：https://github.com/remotion-dev/skills

![](https://pic.yupi.icu/1/68747470733a2f2f7075622d36343664383038643963623234306365613533626564633736646433636430632e72322e6465762f66697265736869702d717569636b2e676966.gif)

**baoyu-skills**：宝玉老师自用的 Skills 集合，包括公众号文章写作、PPT 制作、封面图生成、小红书配图、漫画生成等，对内容创作者非常有帮助，直接把大佬的创作工作流复制过来用。

> 指路：https://github.com/JimLiu/baoyu-skills

![小红书配图技能](https://pic.yupi.icu/1/image-20260204144449881.png)

**humanizer**：去除 AI 生成痕迹的 Skill，让 AI 写的文章更像人写的。

> 指路：https://github.com/blader/humanizer

**heygen-com/skills**：HeyGen 官方的 Skills。HeyGen 是一个 AI 数字人视频生成平台，可以用虚拟人物来制作视频。这个 Skills 让 AI 能调用 HeyGen API 生成数字人视频，包括选择虚拟形象、配置语音、生成透明背景视频、视频翻译配音等功能，还支持和 Remotion 集成做程序化视频合成。

> 指路：https://github.com/heygen-com/skills

### 网站审计 Skills

**seo-audit**：SEO 审计 Skill，帮你分析网站的 SEO 问题并给出优化建议。来自 marketingskills 仓库，该仓库还有 25+ 个营销相关技能，涵盖转化优化、文案撰写、数据分析、增长策略等。

> 指路：https://github.com/coreyhaines31/marketingskills

**audit-website**：网站安全审计 Skill，基于 squirrelscan 工具，包含 230+ 条审计规则，覆盖 SEO、性能、可访问性、内容和安全等 21 个类别，还能检测 96 种泄露的密钥。

> 指路：https://github.com/squirrelscan/skills
