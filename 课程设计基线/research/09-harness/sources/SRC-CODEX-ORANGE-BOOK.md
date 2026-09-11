---
source_id: SRC-CODEX-ORANGE-BOOK
title: ChatGPT 橙皮书：从安装到实战案例的全链路使用指南
publisher: 个人开源（bozhouDev / bozhou_ai、Vinkyu567）
author: "@Vinkyu567、@bozhou_ai（X/Twitter）"
source_tier: T2
source_type: community_guide_with_pdf_and_site
canonical_url: https://github.com/bozhouDev/codex-orange-book
published_at: 2026-07-13（v0.2.0 校验日期）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 6c72add96c319507da65f963abfd9618d0c9ea0f；正文自标 v0.2.0（2026-07-13）
status: accepted
license: MIT（`LICENSE`，Copyright (c) 2026 ChatGPT Orange Book contributors）
rights_status: mit
language: 中文
---

# Source Record：ChatGPT 橙皮书

## 身份核验

- 原始身份依据：README 首句自述“一本写给开发者、独立开发者和 AI 工具重度用户的 ChatGPT 智能体与 Codex **非官方**开源指南”。
- 版本或发布日期：正文首表标注 `v0.2.0 | 2026-07-13 | 非官方指南`；并声明“以 2026-07-13 可访问的 ChatGPT 桌面应用、ChatGPT Work、Codex、Codex CLI、Codex IDE Extension、Sites 和浏览器能力为参考”。
- 是否仍维护：需按提交复核。
- 替代/迁移关系：无官方对应；与 `codex-cli-best-practice`（英文、CLI 向）互补。

## 本地快照

- 本地路径：`upstream/09-harness/codex-orange-book/`
- Pinned commit：`6c72add96c319507da65f963abfd9618d0c9ea0f`
- 迁入范围：仓库全部文本与代码（20 个文件），含：
  - 正文 Markdown：`ChatGPT橙皮书.md`（231 KB）
  - 发行 PDF：`ChatGPT橙皮书.pdf`（40.5 MB）、`ChatGPT橙皮书.preview.pdf`（14.1 MB）
  - 站点产物：`book.html`（302 KB）、`site/index.html`（310 KB）、`site/assets/site.css|site.js`、`index.html`、`cover.html`
  - 构建工具链：`tools/build_pdf.py`、`tools/build_site.py`、`tools/test_build_pdf.py`、`tools/test_reader_links.py`、`tools/requirements.txt`
  - CI：`.github/workflows/deploy-pages.yml`
- 校验：Git blob 逐文件比对，`ok=18 bad=0 missing=0`（18 个文本文件全部一致）

## 内容范围

- 解决的问题：把 Codex（及并行的 ChatGPT Work / Sites / 浏览器能力）从“装得上”带到“能放进真实工作流并交付”。
- 快照实读结构（自标五篇）：
  - 第 0 篇 使用说明：重要声明、适合谁、阅读路线
  - 第一篇 先搞懂 Codex 是什么：基础认知、使用入口
  - 第二篇 安装、配置与环境准备：安装前准备、Codex App、Codex CLI、Codex IDE Extension、Codex Web
  - 第三篇 核心功能详解：自动化、插件、Skill、MCP、Work、站点（Sites）、Git 与 GitHub 工作流、云端运行、记忆系统、Chrome 插件
  - 第四篇 标准工作流：从需求到交付的完整链路、Codex 任务模板库
  - 第五篇 实战案例库：前端页面、功能优化、管理后台、PPT、宣传视频等
  - 附录：第三方模型接入（CC Switch、DeepSeek 等）等非官方玩法
- **版本纪律示范**：正文以表格声明 `版本 / 最后校验 / 资料性质`，并显式声明“产品更新很快，安装方式、模型名称、额度、入口位置和命令参数都可能变化；以 OpenAI 官方文档与账号实际显示为准”。这是本项目可借鉴的写法。
- 不覆盖的内容：不代表 OpenAI 官方立场；不承诺功能与价格稳定。

## 权利与复用

- 正文许可：MIT。
- 代码许可：MIT（构建脚本与站点代码）。
- PDF 与站点产物：同仓库 MIT，但体积大（40.5 MB），**不进入发布物**。
- Attribution 要求：标注作者（@Vinkyu567、@bozhou_ai）与仓库链接。
- 处理建议：结构可 CURATE；**书中涉及的具体产品入口、模型名称、额度与命令参数一律视为 Live Facts**，引用前必须回到 OpenAI 官方文档重新核验并标注日期。

## 教材价值

- 映射卷册：09（主）；04（Work 类任务与办公场景）；10（Skill、MCP、记忆系统、Chrome 扩展）；07（需求到交付链路）。
- 映射 Concepts：Harness、Codex、Agent Runtime、Skill、MCP、Plugin、Automation、Memory、Cloud Execution、Task Template、Delivery。
- 映射 Tasks：Code、Research、Automation、Analysis。
- 结构复用 S1：高——“认知 → 安装 → 功能 → 工作流 → 案例”的五段式，适合作为卷 09 产品章节的编排对照。
- 知识复用 S2：中——具体功能描述时效性强，**不能直接进正文**；可复用的是**编排方式**与**声明纪律**。
- 案例/资产复用 S3：中——第五篇案例库可作选题线索，需自行复现。
- 建议处理：CURATE（结构、声明纪律）+ INDEX（所有产品细节）。

## 质量与风险

- Authority：个人开源指南，作者自述非官方；无机构背书。
- Freshness：正文自标 2026-07-13 校验，至本轮检索已近两个月，**Codex 相关能力变化快**，时效风险高。
- Educational Value：中高——是目前中文侧覆盖面最完整的 Codex 使用指南之一。
- Reproducibility：中——步骤可跟随，但依赖账号与当前版本。
- Maintenance：需复核最近提交。
- 已知错误/过时项：**未实测**；书中所述桌面端整合、Sites、Chrome 扩展等功能状态需回到官方来源确认。
- 厂商 Claim 与独立证据的区别：书中对产品能力的描述属使用观察，不作为能力背书；“第三方模型接入”为作者记录的扩展玩法，非官方功能。

## 提取的 Claims

1. 本书为非官方开源指南，不代表 OpenAI 官方文档或产品承诺。位置：`README.md`「这是什么」、正文第 0.1 节。
2. 正文自标版本 v0.2.0，最后校验 2026-07-13。位置：`ChatGPT橙皮书.md` 首表。
3. 2026 年 7 月 Codex 的桌面体验并入新版 ChatGPT 桌面应用，Codex 作为面向软件开发的独立工作入口与 Chat / Work 并列。位置：`ChatGPT橙皮书.md`「本次更新」。
4. 内容包含自动化、插件、Skill、MCP、Work、Sites、Git 工作流、云端运行、记忆系统、Chrome 扩展。位置：`README.md`「内容包括」与正文目录。
5. 仓库许可为 MIT，版权人 ChatGPT Orange Book contributors。位置：`LICENSE`。
