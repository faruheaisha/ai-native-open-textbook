---
title: "Codex 实践指南（CodexGuide）"
sourceId: "09-harness/codex-guide-freestylefly"
sourceTitle: "Codex 实践指南（CodexGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/freestylefly/CodexGuide"
entryUrl: "https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/README.md"
zh: ""
---

# Codex 实践指南（CodexGuide）

<h3 align="center">面向全球初学者、创作者、开发者与团队的 Codex 实践指南</h3>

  
  
  
  
  
  

  简体中文
  ·
[English](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/README_en.md)
  ·
[在线阅读](https://codexguide.ai/)
  ·
[主题皮肤](https://theme.codexguide.ai/)
  ·
[学习路线](/lib/09-harness/codex-guide-freestylefly/docs-guide)
  ·
[快速上手](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/00-index.md)
  ·
[进阶教程](/lib/09-harness/codex-guide-freestylefly/docs-advanced-00-)
  ·
[实战案例](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/recipes/00-index.md)
  ·
[参考手册](/lib/09-harness/codex-guide-freestylefly/docs-manual-00-)
  ·
[社区共建图](/lib/09-harness/codex-guide-freestylefly/docs-community-roadmap)

> 从第一次上手，到把 Codex 接入真实工作流；帮助不同背景的人用 Codex 完成开发、创作、研究、自动化与团队协作。
> 如果这个项目帮你节省了摸索时间，欢迎点亮 Star，让更多人看到它。

<p align="right">感谢<a href="https://www.packyapi.ai/register?aff=CV0c">packyapi</a>的独家赞助</p>

## 在线网站

**CodexGuide 的在线阅读地址是 [codexguide.ai](https://codexguide.ai/)。**

    <img src="https://cdn.canghecode.com/codexguide/assets/homepage-preview.png" alt="CodexGuide 网站首页预览" width="920" />

GitHub README 适合快速了解项目，真正学习时更推荐打开网站阅读：网站里有更完整的导航、搜索、侧边栏目录、截图、设置速查图、学习路线和实战案例。每篇关键资料都会尽量标注最后核对日期，方便你判断内容是否需要回到 OpenAI 官方资料重新确认。

如果你正在第一次接触 Codex，可以直接从网站的 [学习路线](https://codexguide.ai/guide/) 开始；如果你已经知道自己要用 CLI、桌面 App、Cloud 或 IDE，可以先看 [快速上手](https://codexguide.ai/start/) 和 [进阶教程](https://codexguide.ai/advanced/)。

## 主题皮肤

**CodexGuide 的主题皮肤站地址是 [theme.codexguide.ai](https://theme.codexguide.ai/)。**

    <img src="/mirror/fc/fc07ee78ff818070e98c4632ad46a0c74d26ccc5.png" alt="CodexGuide 主题皮肤网站截图" width="920" />

这里可以预览 Codex Themes 的官方主题、使用方法和下载入口，适合想给 Codex 桌面工作区换上个性化视觉风格的用户。

## 项目愿景

Codex 正在从“帮你写代码的工具”，演进为一套覆盖 CLI、Cloud/Web、IDE extension、桌面 App、移动端协同、浏览器和自动化能力的 AI 工作流系统。

CodexGuide 想做的不是命令速查表，而是一份面向真实任务的实践知识库。它关注三个问题：

- **怎么开始**：初学者应该从哪个入口、哪个任务、哪个设置开始。
- **怎么交付**：如何把需求讲清楚，让 Codex 读项目、改文件、跑命令、给出可检查结果。
- **怎么沉淀**：如何把一次成功任务变成团队可复用的模板、规则、案例和安全边界。

这份教程主要以中文组织内容，但目标并不局限在中文用户或开发者。它也会覆盖创作者、研究者、产品、运营、技术写作者、团队负责人，以及需要把 Codex 接入日常工作的非开发场景。

## 适合谁

- **第一次使用 Codex 的小白**：跟着桌面 App、订阅、设置、手机协同和第一个任务跑通完整闭环。
- **想把 Codex 用进项目的开发者**：学习 CLI、IDE、Git、测试、CI、AGENTS.md、沙盒与审批。
- **内容创作者与知识工作者**：把 Codex 用在写作、PPT、资料整理、知识库、浏览器和工作流自动化里。
- **团队负责人和工具建设者**：建立团队规则、任务模板、权限边界、复盘结构和可迁移案例库。
- **正在选入口的人**：对比桌面 App、CLI、Cloud、IDE、ChatGPT 手机端和插件生态的适用场景。

## 你会在这里看到什么

| 内容 | 说明 |
| --- | --- |
| 入门路线 | 从安装、登录、订阅、设置、手机协同、API 连接到第一个低风险任务 |
| 入口地图 | 解释桌面 App、CLI、Cloud、IDE、ChatGPT 和集成生态该怎么选 |
| 配置专题 | 覆盖 CLI 选项、`config.toml` 和项目规则配置 |
| 工作流方法 | 任务设计、验证方式、团队 playbook |
| 实战案例 | PPT、Draw.io、浏览器、Obsidian、临床文献综述、飞书、Figma、Notion、CI 修复等场景 |
| 官方资料索引 | 汇总 OpenAI 官方资料、GitHub 仓库和关键事实来源 |

## 推荐阅读路径

### 1. 第一次上手

先读 [学习路线](/lib/09-harness/codex-guide-freestylefly/docs-guide)，再完成 [桌面 App 下载与安装](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/02-app-installation.md)、[订阅 Plus / Pro](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/03-account-plan.md)、[桌面 App 总览](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/05-app-overview.md) 和 [第一个任务](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/06-first-task.md)。

### 2. 想用 Codex 改真实项目

从 [CLI 安装与登录](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/10-cli-installation.md) 开始，接着看 [第一次让 Codex 改代码](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/11-cli-first-run.md)、[AGENTS.md](/lib/09-harness/codex-guide-freestylefly/docs-advanced-02-agents-md)、[沙盒与审批](/lib/09-harness/codex-guide-freestylefly/docs-advanced-07-sandbox-approvals)。

### 3. 想把 Codex 放进团队

先看 [团队 playbook](/lib/09-harness/codex-guide-freestylefly/docs-advanced-10-team-playbook)，再补齐 [参考手册](/lib/09-harness/codex-guide-freestylefly/docs-manual-00-)、[沙盒与审批](/lib/09-harness/codex-guide-freestylefly/docs-advanced-07-sandbox-approvals)、[排障手册](/lib/09-harness/codex-guide-freestylefly/docs-advanced-11-troubleshooting) 和 [实战案例库](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/recipes/00-index.md)。

## 快速入口

| 模块 | 适合解决什么问题 |
| --- | --- |
| [学习路线](/lib/09-harness/codex-guide-freestylefly/docs-guide) | 从入门、进阶到团队化的阅读顺序 |
| [快速上手](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/00-index.md) | 桌面 App、账号、首个任务和任务闭环 |
| [手机端协同桌面任务](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/09-mobile-control.md) | 用 ChatGPT 手机 App 中的 Codex 入口跟进桌面任务 |
| [CLI 安装与登录](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/10-cli-installation.md) | 在本地终端安装 Codex CLI 并完成登录 |
| [第一次让 Codex 改代码](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/11-cli-first-run.md) | 用 CLI 进入真实仓库，完成一次可检查的代码任务 |
| [进阶教程](/lib/09-harness/codex-guide-freestylefly/docs-advanced-00-) | CLI、IDE、Cloud、权限、AGENTS.md、自动化和团队实践 |
| [参考手册](/lib/09-harness/codex-guide-freestylefly/docs-manual-00-) | OpenAI 官方资料、Codex 更新记录和参考来源 |
| [AGENTS.md](/lib/09-harness/codex-guide-freestylefly/docs-advanced-02-agents-md) | 给 Codex 编写项目级规则和协作边界 |
| [沙盒与审批](/lib/09-harness/codex-guide-freestylefly/docs-advanced-07-sandbox-approvals) | 文件、命令、网络、凭据和生产资源的安全边界 |
| [自动线程管理](/lib/09-harness/codex-guide-freestylefly/docs-advanced-08-thread-management) | 继续、分叉、移交和整理 Codex 任务 |
| [Cloud、IDE 与桌面 App](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/14-cloud.md) | 不同 Codex 使用入口的适用场景 |
| [实战案例库](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/recipes/00-index.md) | 可复制到真实项目的任务模板和复盘结构 |

## 内容框架

```text
CodexGuide
├─ guide         # 学习路线
├─ start         # 快速上手
├─ advanced      # 进阶教程
├─ recipes       # 实战案例
├─ manual        # 参考手册
└─ community     # 社区共建图与贡献方向
```

当前已搭建：

- Codex 桌面 App 入门路径。
- ChatGPT 手机 App 协同桌面任务。
- Codex CLI 和 IDE 使用路径。
- Codex 多入口使用地图和选择建议。
- Codex 配置与扩展专题。
- 任务说明、提示词模板和验证方法。
- 团队实践方法。
- `AGENTS.md` 项目规则模板。
- 沙盒、审批和安全边界说明。
- Cloud、IDE、桌面 App、ChatGPT 使用场景对照。
- 内容生产、知识库、浏览器、CI 修复等案例模板。
- 在线文档站、官方资料索引和社区贡献模板。

## 本地预览

环境要求：

- Node.js 22.12+，且低于 25
- pnpm 10.33.0

```bash
pnpm install
pnpm dev
```

构建静态站点：

```bash
pnpm build
```

默认开发服务会启动 VuePress 文档站。线上版本会发布到 [codexguide.ai](https://codexguide.ai/)。

## 设计原则

- **官方优先**：功能、价格、可用性、安全策略以 OpenAI 官方资料为准。
- **小白友好**：每个入门章节尽量说明“为什么这样做”和“什么时候不要这样做”。
- **真实任务导向**：减少抽象概念堆砌，多给可复制的任务流程、输入、输出和验证方式。
- **安全边界清晰**：涉及文件写入、命令执行、联网、凭据、浏览器和电脑操控时明确风险。
- **可沉淀**：鼓励把一次成功任务整理成 AGENTS.md、模板、案例、复盘和团队规范。

## Star 趋势图

## 社区共建

欢迎加入 CodexGuide 交流群，与同频伙伴一起交流 Codex 使用经验、实践案例和最新动态。点击[加入 Codex 交流群](https://codexguide.ai/community/join)即可加入，也欢迎微信扫码关注公众号 **苍何**，获取更多 AI 工具与效率实践。

  <img src="/mirror/34/3447f478347ba75a5424698afc4b9a95c40d804e.png" alt="微信扫码关注公众号苍何" width="720" />

## 事实来源

本仓库优先引用官方资料，并会在关键页面标注“最后核对日期”。当前骨架参考：

- [OpenAI Codex 产品页](https://openai.com/codex/)
- [Codex in ChatGPT Help Center](https://help.openai.com/en/articles/11369540-codex-in-chatgpt)
- [OpenAI Codex CLI Getting Started](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started)
- [Codex cloud docs](https://platform.openai.com/docs/codex)
- [openai/codex GitHub repository](https://github.com/openai/codex)

## 参与贡献

欢迎提交：

- 新手友好的教程改写。
- 可复现的真实案例。
- 常见错误和解决方案。
- 团队实践、模板和工作流。
- 官方文档变更同步。

请先阅读 [贡献指南](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/CONTRIBUTING.md)。如果你还不确定怎么贡献，可以从 [社区共建图](/lib/09-harness/codex-guide-freestylefly/docs-community-roadmap) 或 `good first issue` 开始。

## 开源协议

本项目采用 [MIT License](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/LICENSE/README.md) 开源。你可以在保留许可声明的前提下自由使用、修改、分发与二次开发。

## 声明

本项目是社区维护的 Codex 实践知识库，并非 OpenAI 官方项目。涉及功能、计划、价格、可用性和安全策略等时间敏感信息时，请以 OpenAI 官方资料为准。
